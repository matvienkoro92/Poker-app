(()=>{var Kh=0,Kl=1,$h=2;var $l=1,us=2,Ai=3,ds=0,ni=1,Ot=2,rr=0,ca=1,Ql=2,ec=3,tc=4,Qh=5,ps=100,eu=101,tu=102,nu=103,iu=104,ru=200,su=201,au=202,ou=203,lu=204,cu=205,hu=206,uu=207,du=208,pu=209,fu=210,mu=211,gu=212,vu=213,yu=214,Do=0,Uo=1,No=2,ha=3,Bo=4,Fo=5,Oo=6,zo=7,_u=0,xu=1,Mu=2,Hi=0,Tu=1,bu=2,Su=3,Zn=4,wu=5,Eu=6,Au=7,zl="attached",Cu="detached",nc=300,fs=301,Sr=302,Go=303,ko=304,ua=306,Rn=1e3,$r=1001,Ka=1002,wi=1003,Ru=1004;var da=1005;var qn=1006,Vo=1007;var yi=1008;var Ci=1009,ic=1010,rc=1011,ms=1012,Ho=1013,wr=1014,li=1015,sr=1016,Wo=1017,Xo=1018,gs=1020,sc=35902,ac=35899,Pu=1021,Iu=1022,ci=1023,pa=1026,fa=1027,jo=1028,qo=1029,Lu=1030,oc=1031;var lc=1033,Yo=33776,Zo=33777,Jo=33778,Ko=33779,cc=35840,hc=35841,uc=35842,dc=35843,pc=36196,fc=37492,mc=37496,gc=37808,vc=37809,yc=37810,_c=37811,xc=37812,Mc=37813,Tc=37814,bc=37815,Sc=37816,wc=37817,Ec=37818,Ac=37819,Cc=37820,Rc=37821,Pc=36492,Ic=36494,Lc=36495,Dc=36283,Uc=36284,Nc=36285,Bc=36286;var Ns=2300,$a=2301,Ya=2302,Gl=2400,kl=2401,Vl=2402;var vs=3201;var Du=0,Uu=1,Er="",xt="srgb",mr="srgb-linear",Bs="linear",Qt="srgb";var fr=7680;var Nu=512,Bu=513,Fu=514,Fc=515,Ou=516,zu=517,Gu=518,ku=519,Hl=35044,Oc=35048;var zc="300 es",zi=2e3,Fs=2001;var Gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Za=Math.PI/180,Os=180/Math.PI;function Ar(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Un[255&r]+Un[r>>8&255]+Un[r>>16&255]+Un[r>>24&255]+"-"+Un[255&e]+Un[e>>8&255]+"-"+Un[e>>16&15|64]+Un[e>>24&255]+"-"+Un[63&t|128]+Un[t>>8&255]+"-"+Un[t>>16&255]+Un[t>>24&255]+Un[255&n]+Un[n>>8&255]+Un[n>>16&255]+Un[n>>24&255]).toLowerCase()}function Bt(r,e,t){return Math.max(e,Math.min(t,r))}function jd(r,e){return(r%e+e)%e}function ol(r,e,t){return(1-t)*r+t*e}function bs(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function jn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var we=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Bt(this.x,e.x,t.x),this.y=Bt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Bt(this.x,e,t),this.y=Bt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],g=s[a+2],m=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=f,e[t+2]=g,void(e[t+3]=m);if(u!==m||c!==d||l!==f||h!==g){let p=1-o,v=c*d+l*f+h*g+u*m,y=v>=0?1:-1,_=1-v*v;if(_>Number.EPSILON){let T=Math.sqrt(_),b=Math.atan2(T,v*y);p=Math.sin(p*b)/T,o=Math.sin(o*b)/T}let x=o*y;if(c=c*p+d*x,l=l*p+f*x,h=h*p+g*x,u=u*p+m*x,p===1-o){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),f=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ph.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ph.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Bt(this.x,e.x,t.x),this.y=Bt(this.y,e.y,t.y),this.z=Bt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Bt(this.x,e,t),this.y=Bt(this.y,e,t),this.z=Bt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ll.copy(this).projectOnVector(e),this.sub(ll)}reflect(e){return this.sub(ll.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ll=new w,ph=new Fn,Pt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],m=i[0],p=i[3],v=i[6],y=i[1],_=i[4],x=i[7],T=i[2],b=i[5],I=i[8];return s[0]=a*m+o*y+c*T,s[3]=a*p+o*_+c*b,s[6]=a*v+o*x+c*I,s[1]=l*m+h*y+u*T,s[4]=l*p+h*_+u*b,s[7]=l*v+h*x+u*I,s[2]=d*m+f*y+g*T,s[5]=d*p+f*_+g*b,s[8]=d*v+f*x+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/g;return e[0]=u*m,e[1]=(i*l-h*n)*m,e[2]=(o*n-i*a)*m,e[3]=d*m,e[4]=(h*t-i*c)*m,e[5]=(i*s-o*t)*m,e[6]=f*m,e[7]=(n*c-l*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(cl.makeScale(e,t)),this}rotate(e){return this.premultiply(cl.makeRotation(-e)),this}translate(e,t){return this.premultiply(cl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},cl=new Pt;function Gc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Vu(){let r=Qr("canvas");return r.style.display="block",r}var fh={};function es(r){r in fh||(fh[r]=!0,console.warn(r))}function Hu(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var mh=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gh=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qd(){let r={enabled:!0,workingColorSpace:mr,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Qt&&(i.r=Oi(i.r),i.g=Oi(i.g),i.b=Oi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(i.r=Kr(i.r),i.g=Kr(i.g),i.b=Kr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Bs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return es("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return es("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[mr]:{primaries:e,whitePoint:n,transfer:Bs,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xt},outputColorSpaceConfig:{drawingBufferColorSpace:xt}},[xt]:{primaries:e,whitePoint:n,transfer:Qt,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xt}}}),r}var jt=qd();function Oi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Kr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var Or,Qa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Or===void 0&&(Or=Qr("canvas")),Or.width=e.width,Or.height=e.height;let i=Or.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Or}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*Oi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Oi(t[n]/255)):t[n]=Oi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Yd=0,ts=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Ar(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(hl(i[a].image)):s.push(hl(i[a]))}else s=hl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function hl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Qa.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Zd=0,ul=new w,Bn=class r extends Gi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Ar(),this.name="",this.source=new ts(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ul).x}get height(){return this.source.getSize(ul).y}get depth(){return this.source.getSize(ul).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rn:e.x=e.x-Math.floor(e.x);break;case $r:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Rn:e.y=e.y-Math.floor(e.y);break;case $r:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bn.DEFAULT_IMAGE=null,Bn.DEFAULT_MAPPING=nc,Bn.DEFAULT_ANISOTROPY=1;var Yt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],m=c[2],p=c[6],v=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,x=(f+1)/2,T=(v+1)/2,b=(h+d)/4,I=(u+m)/4,F=(g+p)/4;return _>x&&_>T?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=I/n):x>T?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=F/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=I/s,i=F/s),this.set(n,i,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-m)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+v-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Bt(this.x,e.x,t.x),this.y=Bt(this.y,e.y,t.y),this.z=Bt(this.z,e.z,t.z),this.w=Bt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Bt(this.x,e,t),this.y=Bt(this.y,e,t),this.z=Bt(this.z,e,t),this.w=Bt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Bt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},eo=class extends Gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Bn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:qn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ts(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},oi=class extends eo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zs=class extends Bn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wi,this.minFilter=wi,this.wrapR=$r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var to=class extends Bn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wi,this.minFilter=wi,this.wrapR=$r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pi):pi.fromBufferAttribute(s,a),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xa.copy(n.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ss),Ma.subVectors(this.max,Ss),zr.subVectors(e.a,Ss),Gr.subVectors(e.b,Ss),kr.subVectors(e.c,Ss),qi.subVectors(Gr,zr),Yi.subVectors(kr,Gr),hr.subVectors(zr,kr);let t=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-hr.z,hr.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,hr.z,0,-hr.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-hr.y,hr.x,0];return!!dl(t,zr,Gr,kr,Ma)&&(t=[1,0,0,0,1,0,0,0,1],!!dl(t,zr,Gr,kr,Ma)&&(Ta.crossVectors(qi,Yi),t=[Ta.x,Ta.y,Ta.z],dl(t,zr,Gr,kr,Ma)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(pi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Li=[new w,new w,new w,new w,new w,new w,new w,new w],pi=new w,xa=new Sn,zr=new w,Gr=new w,kr=new w,qi=new w,Yi=new w,hr=new w,Ss=new w,Ma=new w,Ta=new w,ur=new w;function dl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ur.fromArray(r,s);let o=i.x*Math.abs(ur.x)+i.y*Math.abs(ur.y)+i.z*Math.abs(ur.z),c=e.dot(ur),l=t.dot(ur),h=n.dot(ur);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Jd=new Sn,ws=new w,pl=new w,ei=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ws.subVectors(e,this.center);let t=ws.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(ws,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ws.copy(e.center).add(pl)),this.expandByPoint(ws.copy(e.center).sub(pl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Di=new w,fl=new w,ba=new w,Zi=new w,ml=new w,Sa=new w,gl=new w,gr=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fl.copy(e).add(t).multiplyScalar(.5),ba.copy(t).sub(e).normalize(),Zi.copy(this.origin).sub(fl);let s=.5*e.distanceTo(t),a=-this.direction.dot(ba),o=Zi.dot(this.direction),c=-Zi.dot(ba),l=Zi.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){let m=1/h;u*=m,d*=m,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(fl).addScaledVector(ba,d),f}intersectSphere(e,t){Di.subVectors(e.center,this.origin);let n=Di.dot(this.direction),i=Di.dot(Di)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,i,s){ml.subVectors(t,e),Sa.subVectors(n,e),gl.crossVectors(ml,Sa);let a,o=this.direction.dot(gl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Zi.subVectors(this.origin,e);let c=a*this.direction.dot(Sa.crossVectors(Zi,Sa));if(c<0)return null;let l=a*this.direction.dot(ml.cross(Zi));if(l<0||c+l>o)return null;let h=-a*Zi.dot(gl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},dt=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,f,g,m,p){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,f,g,m,p)}set(e,t,n,i,s,a,o,c,l,h,u,d,f,g,m,p){let v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=a,v[9]=o,v[13]=c,v[2]=l,v[6]=h,v[10]=u,v[14]=d,v[3]=f,v[7]=g,v[11]=m,v[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Vr.setFromMatrixColumn(e,0).length(),s=1/Vr.setFromMatrixColumn(e,1).length(),a=1/Vr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,m=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-m*l,t[9]=-o*c,t[2]=m-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,m=l*u;t[0]=d+m*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=m+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,m=l*u;t[0]=d-m*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=m-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,m=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+m,t[1]=c*u,t[5]=m*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,g=o*c,m=o*l;t[0]=c*h,t[4]=m-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-m*u}else if(e.order==="XZY"){let d=a*c,f=a*l,g=o*c,m=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+m,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kd,e,$d)}lookAt(e,t,n){let i=this.elements;return Kn.subVectors(e,t),Kn.lengthSq()===0&&(Kn.z=1),Kn.normalize(),Ji.crossVectors(n,Kn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?Kn.x+=1e-4:Kn.z+=1e-4,Kn.normalize(),Ji.crossVectors(n,Kn)),Ji.normalize(),wa.crossVectors(Kn,Ji),i[0]=Ji.x,i[4]=wa.x,i[8]=Kn.x,i[1]=Ji.y,i[5]=wa.y,i[9]=Kn.y,i[2]=Ji.z,i[6]=wa.z,i[10]=Kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],m=n[6],p=n[10],v=n[14],y=n[3],_=n[7],x=n[11],T=n[15],b=i[0],I=i[4],F=i[8],U=i[12],z=i[1],R=i[5],L=i[9],Z=i[13],H=i[2],ie=i[6],te=i[10],K=i[14],de=i[3],Le=i[7],ze=i[11],Se=i[15];return s[0]=a*b+o*z+c*H+l*de,s[4]=a*I+o*R+c*ie+l*Le,s[8]=a*F+o*L+c*te+l*ze,s[12]=a*U+o*Z+c*K+l*Se,s[1]=h*b+u*z+d*H+f*de,s[5]=h*I+u*R+d*ie+f*Le,s[9]=h*F+u*L+d*te+f*ze,s[13]=h*U+u*Z+d*K+f*Se,s[2]=g*b+m*z+p*H+v*de,s[6]=g*I+m*R+p*ie+v*Le,s[10]=g*F+m*L+p*te+v*ze,s[14]=g*U+m*Z+p*K+v*Se,s[3]=y*b+_*z+x*H+T*de,s[7]=y*I+_*R+x*ie+T*Le,s[11]=y*F+_*L+x*te+T*ze,s[15]=y*U+_*Z+x*K+T*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*f-n*c*f)+e[7]*(+t*c*f-t*l*d+s*a*d-i*a*f+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],m=e[13],p=e[14],v=e[15],y=u*p*l-m*d*l+m*c*f-o*p*f-u*c*v+o*d*v,_=g*d*l-h*p*l-g*c*f+a*p*f+h*c*v-a*d*v,x=h*m*l-g*u*l+g*o*f-a*m*f-h*o*v+a*u*v,T=g*u*c-h*m*c-g*o*d+a*m*d+h*o*p-a*u*p,b=t*y+n*_+i*x+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/b;return e[0]=y*I,e[1]=(m*d*s-u*p*s-m*i*f+n*p*f+u*i*v-n*d*v)*I,e[2]=(o*p*s-m*c*s+m*i*l-n*p*l-o*i*v+n*c*v)*I,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*f-n*c*f)*I,e[4]=_*I,e[5]=(h*p*s-g*d*s+g*i*f-t*p*f-h*i*v+t*d*v)*I,e[6]=(g*c*s-a*p*s-g*i*l+t*p*l+a*i*v-t*c*v)*I,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*f+t*c*f)*I,e[8]=x*I,e[9]=(g*u*s-h*m*s-g*n*f+t*m*f+h*n*v-t*u*v)*I,e[10]=(a*m*s-g*o*s+g*n*l-t*m*l-a*n*v+t*o*v)*I,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*f-t*o*f)*I,e[12]=T*I,e[13]=(h*m*i-g*u*i+g*n*d-t*m*d-h*n*p+t*u*p)*I,e[14]=(g*o*i-a*m*i-g*n*c+t*m*c+a*n*p-t*o*p)*I,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*I,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,g=s*u,m=a*h,p=a*u,v=o*u,y=c*l,_=c*h,x=c*u,T=n.x,b=n.y,I=n.z;return i[0]=(1-(m+v))*T,i[1]=(f+x)*T,i[2]=(g-_)*T,i[3]=0,i[4]=(f-x)*b,i[5]=(1-(d+v))*b,i[6]=(p+y)*b,i[7]=0,i[8]=(g+_)*I,i[9]=(p-y)*I,i[10]=(1-(d+m))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Vr.set(i[0],i[1],i[2]).length(),a=Vr.set(i[4],i[5],i[6]).length(),o=Vr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],fi.copy(this);let c=1/s,l=1/a,h=1/o;return fi.elements[0]*=c,fi.elements[1]*=c,fi.elements[2]*=c,fi.elements[4]*=l,fi.elements[5]*=l,fi.elements[6]*=l,fi.elements[8]*=h,fi.elements[9]*=h,fi.elements[10]*=h,t.setFromRotationMatrix(fi),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),g,m;if(c)g=s/(a-s),m=a*s/(a-s);else if(o===zi)g=-(a+s)/(a-s),m=-2*a*s/(a-s);else{if(o!==Fs)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);g=-a/(a-s),m=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),g,m;if(c)g=1/(a-s),m=a/(a-s);else if(o===zi)g=-2/(a-s),m=-(a+s)/(a-s);else{if(o!==Fs)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);g=-1/(a-s),m=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Vr=new w,fi=new dt,Kd=new w(0,0,0),$d=new w(1,1,1),Ji=new w,wa=new w,Kn=new w,vh=new dt,yh=new Fn,gi=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yh.setFromEuler(this),this.setFromQuaternion(yh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gi.DEFAULT_ORDER="XYZ";var Gs=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Qd=0,_h=new w,Hr=new Fn,Ui=new dt,Ea=new w,Es=new w,ep=new w,tp=new Fn,xh=new w(1,0,0),Mh=new w(0,1,0),Th=new w(0,0,1),bh={type:"added"},np={type:"removed"},Wr={type:"childadded",child:null},vl={type:"childremoved",child:null},vn=class r extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Ar(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new gi,n=new Fn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dt},normalMatrix:{value:new Pt}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.multiply(Hr),this}rotateOnWorldAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.premultiply(Hr),this}rotateX(e){return this.rotateOnAxis(xh,e)}rotateY(e){return this.rotateOnAxis(Mh,e)}rotateZ(e){return this.rotateOnAxis(Th,e)}translateOnAxis(e,t){return _h.copy(e).applyQuaternion(this.quaternion),this.position.add(_h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xh,e)}translateY(e){return this.translateOnAxis(Mh,e)}translateZ(e){return this.translateOnAxis(Th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ea.copy(e):Ea.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(Es,Ea,this.up):Ui.lookAt(Ea,Es,this.up),this.quaternion.setFromRotationMatrix(Ui),i&&(Ui.extractRotation(i.matrixWorld),Hr.setFromRotationMatrix(Ui),this.quaternion.premultiply(Hr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bh),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(np),vl.child=e,this.dispatchEvent(vl),vl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bh),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,e,ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,tp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};vn.DEFAULT_UP=new w(0,1,0),vn.DEFAULT_MATRIX_AUTO_UPDATE=!0,vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mi=new w,Ni=new w,yl=new w,Bi=new w,Xr=new w,jr=new w,Sh=new w,_l=new w,xl=new w,Ml=new w,Tl=new Yt,bl=new Yt,Sl=new Yt,Fi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),mi.subVectors(e,t),i.cross(mi);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){mi.subVectors(i,t),Ni.subVectors(n,t),yl.subVectors(e,t);let a=mi.dot(mi),o=mi.dot(Ni),c=mi.dot(yl),l=Ni.dot(Ni),h=Ni.dot(yl),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bi)!==null&&Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Bi.x),c.addScaledVector(a,Bi.y),c.addScaledVector(o,Bi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Tl.setScalar(0),bl.setScalar(0),Sl.setScalar(0),Tl.fromBufferAttribute(e,t),bl.fromBufferAttribute(e,n),Sl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Tl,s.x),a.addScaledVector(bl,s.y),a.addScaledVector(Sl,s.z),a}static isFrontFacing(e,t,n,i){return mi.subVectors(n,t),Ni.subVectors(e,t),mi.cross(Ni).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),.5*mi.cross(Ni).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Xr.subVectors(i,n),jr.subVectors(s,n),_l.subVectors(e,n);let c=Xr.dot(_l),l=jr.dot(_l);if(c<=0&&l<=0)return t.copy(n);xl.subVectors(e,i);let h=Xr.dot(xl),u=jr.dot(xl);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Xr,a);Ml.subVectors(e,s);let f=Xr.dot(Ml),g=jr.dot(Ml);if(g>=0&&f<=g)return t.copy(s);let m=f*l-c*g;if(m<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(jr,o);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Sh.subVectors(s,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Sh,o);let v=1/(p+m+d);return a=m*v,o=d*v,t.copy(n).addScaledVector(Xr,a).addScaledVector(jr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Aa={h:0,s:0,l:0};function wl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var lt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,jt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=jt.workingColorSpace){if(e=jd(e,1),t=Bt(t,0,1),n=Bt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=wl(a,s,e+1/3),this.g=wl(a,s,e),this.b=wl(a,s,e-1/3)}return jt.colorSpaceToWorking(this,i),this}setStyle(e,t=xt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xt){let n=Wu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Kr(e.r),this.g=Kr(e.g),this.b=Kr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xt){return jt.workingToColorSpace(Nn.copy(this),e),65536*Math.round(Bt(255*Nn.r,0,255))+256*Math.round(Bt(255*Nn.g,0,255))+Math.round(Bt(255*Nn.b,0,255))}getHexString(e=xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.workingToColorSpace(Nn.copy(this),t);let n=Nn.r,i=Nn.g,s=Nn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=jt.workingColorSpace){return jt.workingToColorSpace(Nn.copy(this),t),e.r=Nn.r,e.g=Nn.g,e.b=Nn.b,e}getStyle(e=xt){jt.workingToColorSpace(Nn.copy(this),e);let t=Nn.r,n=Nn.g,i=Nn.b;return e!==xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+t,Ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ki),e.getHSL(Aa);let n=ol(Ki.h,Aa.h,t),i=ol(Ki.s,Aa.s,t),s=ol(Ki.l,Aa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nn=new lt;lt.NAMES=Wu;var ip=0,Ei=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Ar(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Pn=class extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},hm=rp();function rp(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var gn=new w,Ca=new we,sp=0,dn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hl,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ca.fromBufferAttribute(this,t),Ca.applyMatrix3(e),this.setXY(t,Ca.x,Ca.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix3(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bs(t,this.array)),t}setX(e,t){return this.normalized&&(t=jn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bs(t,this.array)),t}setY(e,t){return this.normalized&&(t=jn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bs(t,this.array)),t}setW(e,t){return this.normalized&&(t=jn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=jn(t,this.array),n=jn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=jn(t,this.array),n=jn(n,this.array),i=jn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=jn(t,this.array),n=jn(n,this.array),i=jn(i,this.array),s=jn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hl&&(e.usage=this.usage),e}};var vr=class extends dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ks=class extends dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ie=class extends dn{constructor(e,t,n){super(new Float32Array(e),t,n)}},ap=0,ai=new dt,El=new vn,qr=new w,$n=new Sn,As=new Sn,Cn=new w,ut=class r extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Ar(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gc(e)?ks:vr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Pt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,n){return ai.makeTranslation(e,t,n),this.applyMatrix4(ai),this}scale(e,t,n){return ai.makeScale(e,t,n),this.applyMatrix4(ai),this}lookAt(e){return El.lookAt(e),El.updateMatrix(),this.applyMatrix4(El.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ie(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];$n.setFromBufferAttribute(s),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if($n.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];As.setFromBufferAttribute(o),this.morphTargetsRelative?(Cn.addVectors($n.min,As.min),$n.expandByPoint(Cn),Cn.addVectors($n.max,As.max),$n.expandByPoint(Cn)):($n.expandByPoint(As.min),$n.expandByPoint(As.max))}$n.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Cn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Cn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Cn.fromBufferAttribute(o,l),c&&(qr.fromBufferAttribute(e,l),Cn.add(qr)),i=Math.max(i,n.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let F=0;F<n.count;F++)o[F]=new w,c[F]=new w;let l=new w,h=new w,u=new w,d=new we,f=new we,g=new we,m=new w,p=new w;function v(F,U,z){l.fromBufferAttribute(n,F),h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,z),d.fromBufferAttribute(s,F),f.fromBufferAttribute(s,U),g.fromBufferAttribute(s,z),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(m.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[F].add(m),o[U].add(m),o[z].add(m),c[F].add(p),c[U].add(p),c[z].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let F=0,U=y.length;F<U;++F){let z=y[F],R=z.start;for(let L=R,Z=R+z.count;L<Z;L+=3)v(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let _=new w,x=new w,T=new w,b=new w;function I(F){T.fromBufferAttribute(i,F),b.copy(T);let U=o[F];_.copy(U),_.sub(T.multiplyScalar(T.dot(U))).normalize(),x.crossVectors(b,U);let z=x.dot(c[F])<0?-1:1;a.setXYZW(F,_.x,_.y,_.z,z)}for(let F=0,U=y.length;F<U;++F){let z=y[F],R=z.start;for(let L=R,Z=R+z.count;L<Z;L+=3)I(e.getX(L+0)),I(e.getX(L+1)),I(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new dn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),m=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,p),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Cn.fromBufferAttribute(e,t),Cn.normalize(),e.setXYZ(t,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let m=0,p=c.length;m<p;m++){f=o.isInterleavedBufferAttribute?c[m]*o.data.stride+o.offset:c[m]*h;for(let v=0;v<h;v++)d[g++]=l[f++]}return new dn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},wh=new dt,dr=new gr,Ra=new ei,Eh=new w,Pa=new w,Ia=new w,La=new w,Al=new w,Da=new w,Ah=new w,Ua=new w,Ze=class extends vn{constructor(e=new ut,t=new Pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Da.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Al.fromBufferAttribute(u,e),a?Da.addScaledVector(Al,h):Da.addScaledVector(Al.sub(t),h))}t.add(Da)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(s),dr.copy(e.ray).recast(e.near),Ra.containsPoint(dr.origin)===!1&&(dr.intersectSphere(Ra,Eh)===null||dr.origin.distanceToSquared(Eh)>(e.far-e.near)**2))return;wh.copy(s).invert(),dr.copy(e.ray).applyMatrix4(wh),n.boundingBox!==null&&dr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,dr)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let p=d[g],v=a[p.materialIndex];for(let y=Math.max(p.start,f.start),_=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));y<_;y+=3)i=Na(this,v,e,n,l,h,u,o.getX(y),o.getX(y+1),o.getX(y+2)),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}else for(let g=Math.max(0,f.start),m=Math.min(o.count,f.start+f.count);g<m;g+=3)i=Na(this,a,e,n,l,h,u,o.getX(g),o.getX(g+1),o.getX(g+2)),i&&(i.faceIndex=Math.floor(g/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){let p=d[g],v=a[p.materialIndex];for(let y=Math.max(p.start,f.start),_=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));y<_;y+=3)i=Na(this,v,e,n,l,h,u,y,y+1,y+2),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}else for(let g=Math.max(0,f.start),m=Math.min(c.count,f.start+f.count);g<m;g+=3)i=Na(this,a,e,n,l,h,u,g,g+1,g+2),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}};function Na(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Pa),r.getVertexPosition(c,Ia),r.getVertexPosition(l,La);let h=(function(u,d,f,g,m,p,v,y){let _;if(_=d.side===1?g.intersectTriangle(v,p,m,!0,y):g.intersectTriangle(m,p,v,d.side===0,y),_===null)return null;Ua.copy(y),Ua.applyMatrix4(u.matrixWorld);let x=f.ray.origin.distanceTo(Ua);return x<f.near||x>f.far?null:{distance:x,point:Ua.clone(),object:u}})(r,e,t,n,Pa,Ia,La,Ah);if(h){let u=new w;Fi.getBarycoord(Ah,Pa,Ia,La,u),i&&(h.uv=Fi.getInterpolatedAttribute(i,o,c,l,u,new we)),s&&(h.uv1=Fi.getInterpolatedAttribute(s,o,c,l,u,new we)),a&&(h.normal=Fi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};Fi.getNormal(Pa,Ia,La,d.normal),h.face=d,h.barycoord=u}return h}var et=class r extends ut{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;function g(m,p,v,y,_,x,T,b,I,F,U){let z=x/I,R=T/F,L=x/2,Z=T/2,H=b/2,ie=I+1,te=F+1,K=0,de=0,Le=new w;for(let ze=0;ze<te;ze++){let Se=ze*R-Z;for(let Ee=0;Ee<ie;Ee++){let ee=Ee*z-L;Le[m]=ee*y,Le[p]=Se*_,Le[v]=H,l.push(Le.x,Le.y,Le.z),Le[m]=0,Le[p]=0,Le[v]=b>0?1:-1,h.push(Le.x,Le.y,Le.z),u.push(Ee/I),u.push(1-ze/F),K+=1}}for(let ze=0;ze<F;ze++)for(let Se=0;Se<I;Se++){let Ee=d+Se+ie*ze,ee=d+Se+ie*(ze+1),Te=d+(Se+1)+ie*(ze+1),be=d+(Se+1)+ie*ze;c.push(Ee,ee,be),c.push(ee,Te,be),de+=6}o.addGroup(f,de,U),f+=de,d+=K}g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ie(l,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Cr(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Gn(r){let e={};for(let t=0;t<r.length;t++){let n=Cr(r[t]);for(let i in n)e[i]=n[i]}return e}function kc(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:jt.workingColorSpace}var Xu={clone:Cr,merge:Gn},Yn=class extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cr(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ns=class extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$i=new w,Ch=new we,Rh=new we,tn=class extends ns{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Os*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Za*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Os*Math.atan(Math.tan(.5*Za*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,Ch,Rh),t.subVectors(Rh,Ch)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Za*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yr=-90,no=class extends vn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new tn(Yr,1,e,t);i.layers=this.layers,this.add(i);let s=new tn(Yr,1,e,t);s.layers=this.layers,this.add(s);let a=new tn(Yr,1,e,t);a.layers=this.layers,this.add(a);let o=new tn(Yr,1,e,t);o.layers=this.layers,this.add(o);let c=new tn(Yr,1,e,t);c.layers=this.layers,this.add(c);let l=new tn(Yr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Fs)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Vs=class extends Bn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},io=class extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Vs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new et(5,5,5),s=new Yn({name:"CubemapFromEquirect",uniforms:Cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new Ze(i,s),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=qn),new no(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},ke=class extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}},op={type:"move"},is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let m of e.hand.values()){let p=t.getJointPose(m,n),v=this._getHandJoint(l,m);p!==null&&(v.matrix.fromArray(p.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=p.radius),v.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(op)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Hs=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new lt(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},yn=class extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var um=new w;var dm=new w,pm=new w,fm=new w,mm=new we,gm=new we,vm=new dt,ym=new w,_m=new w,xm=new w,Mm=new we,Tm=new we,bm=new we;var Sm=new w,wm=new w;var Ph=new w,Ih=new Yt,Lh=new Yt,lp=new w,Dh=new dt,Ba=new w,Cl=new ei,Uh=new dt,Rl=new gr,Ws=class extends Ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zl,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ba),this.boundingBox.expandByPoint(Ba)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ei),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ba),this.boundingSphere.expandByPoint(Ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cl.copy(this.boundingSphere),Cl.applyMatrix4(i),e.ray.intersectsSphere(Cl)!==!1&&(Uh.copy(i).invert(),Rl.copy(e.ray).applyMatrix4(Uh),this.boundingBox!==null&&Rl.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Rl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Ih.fromBufferAttribute(i.attributes.skinIndex,e),Lh.fromBufferAttribute(i.attributes.skinWeight,e),Ph.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Lh.getComponent(s);if(a!==0){let o=Ih.getComponent(s);Dh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(lp.copy(Ph).applyMatrix4(Dh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},rs=class extends vn{constructor(){super(),this.isBone=!0,this.type="Bone"}},ki=class extends Bn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Nh=new dt,cp=new dt,Xs=class r{constructor(e=[],t=[]){this.uuid=Ar(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new dt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:cp;Nh.multiplyMatrices(o,t[s]),Nh.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ki(t,e,e,ci,li);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new rs),this.bones.push(a),this.boneInverses.push(new dt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},js=class extends dn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Zr=new dt,Bh=new dt,Fa=[],Fh=new Sn,hp=new dt,Cs=new Ze,Rs=new ei,yr=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new js(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,hp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zr),Fh.copy(e.boundingBox).applyMatrix4(Zr),this.boundingBox.union(Fh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zr),Rs.copy(e.boundingSphere).applyMatrix4(Zr),this.boundingSphere.union(Rs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),e.ray.intersectsSphere(Rs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Zr),Bh.multiplyMatrices(n,Zr),Cs.matrixWorld=Bh,Cs.raycast(e,Fa);for(let a=0,o=Fa.length;a<o;a++){let c=Fa[a];c.instanceId=s,c.object=this,t.push(c)}Fa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new js(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ki(new Float32Array(i*this.count),i,this.count,jo,li));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Pl=new w,up=new w,dp=new Pt,bi=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Pl.subVectors(n,t).cross(up.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Pl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||dp.getNormalMatrix(e),i=this.coplanarPoint(Pl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},pr=new ei,pp=new we(.5,.5),Oa=new w,tr=class{constructor(e=new bi,t=new bi,n=new bi,i=new bi,s=new bi,a=new bi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],m=s[9],p=s[10],v=s[11],y=s[12],_=s[13],x=s[14],T=s[15];if(i[0].setComponents(l-a,f-h,v-g,T-y).normalize(),i[1].setComponents(l+a,f+h,v+g,T+y).normalize(),i[2].setComponents(l+o,f+u,v+m,T+_).normalize(),i[3].setComponents(l-o,f-u,v-m,T-_).normalize(),n)i[4].setComponents(c,d,p,x).normalize(),i[5].setComponents(l-c,f-d,v-p,T-x).normalize();else if(i[4].setComponents(l-c,f-d,v-p,T-x).normalize(),t===zi)i[5].setComponents(l+c,f+d,v+p,T+x).normalize();else{if(t!==Fs)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,p,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pr)}intersectsSprite(e){pr.center.set(0,0,0);let t=pp.distanceTo(e.center);return pr.radius=.7071067811865476+t,pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(pr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Oa.x=i.normal.x>0?e.max.x:e.min.x,Oa.y=i.normal.y>0?e.max.y:e.min.y,Oa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Oa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Mi=new dt,Ti=new tr,ro=class r{constructor(){this.coordinateSystem=zi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Mi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ti.setFromProjectionMatrix(Mi,i.coordinateSystem,i.reversedDepth),Ti.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Mi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ti.setFromProjectionMatrix(Mi,i.coordinateSystem,i.reversedDepth),Ti.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Mi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ti.setFromProjectionMatrix(Mi,i.coordinateSystem,i.reversedDepth),Ti.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Mi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ti.setFromProjectionMatrix(Mi,i.coordinateSystem,i.reversedDepth),Ti.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Mi.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Ti.setFromProjectionMatrix(Mi,i.coordinateSystem,i.reversedDepth),Ti.containsPoint(e))return!0}return!1}clone(){return new r}};var Wl=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Em=new dt,Am=new lt(1,1,1),Cm=new tr,Rm=new ro,Pm=new Sn,Im=new ei,Lm=new w,Dm=new w,Um=new w,Nm=new Wl,Bm=new Ze;var ss=class extends Ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},so=new w,ao=new w,Oh=new dt,Ps=new gr,za=new ei,Il=new w,zh=new w,oo=class extends vn{constructor(e=new ut,t=new ss){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)so.fromBufferAttribute(t,i-1),ao.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=so.distanceTo(ao);e.setAttribute("lineDistance",new Ie(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(i),za.radius+=s,e.ray.intersectsSphere(za)===!1)return;Oh.copy(i).invert(),Ps.copy(e.ray).applyMatrix4(Oh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,m=f-1;g<m;g+=l){let p=h.getX(g),v=h.getX(g+1),y=Ga(this,e,Ps,c,p,v,g);y&&t.push(y)}if(this.isLineLoop){let g=h.getX(f-1),m=h.getX(d),p=Ga(this,e,Ps,c,g,m,f-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,m=f-1;g<m;g+=l){let p=Ga(this,e,Ps,c,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){let g=Ga(this,e,Ps,c,f-1,d,f-1);g&&t.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Ga(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(so.fromBufferAttribute(o,i),ao.fromBufferAttribute(o,s),t.distanceSqToSegment(so,ao,Il,zh)>n)return;Il.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Il);return c<e.near||c>e.far?void 0:{distance:c,point:zh.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var Gh=new w,kh=new w,qs=class extends oo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Gh.fromBufferAttribute(t,i),kh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Gh.distanceTo(kh);e.setAttribute("lineDistance",new Ie(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Fm=new dt,Om=new gr,zm=new ei,Gm=new w;var Gt=class extends Bn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ys=class extends Bn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==pa&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ts(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Zs=class extends Bn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},as=class r extends ut{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=2*n+s,m=i+1,p=new w,v=new w;for(let y=0;y<=g;y++){let _=0,x=0,T=0,b=0;if(y<=n){let U=y/n,z=U*Math.PI/2;x=-h-e*Math.cos(z),T=e*Math.sin(z),b=-e*Math.cos(z),_=U*u}else if(y<=n+s){let U=(y-n)/s;x=U*t-h,T=e,b=0,_=u+U*d}else{let U=(y-n-s)/n,z=U*Math.PI/2;x=h+e*Math.sin(z),T=e*Math.cos(z),b=e*Math.sin(z),_=u+d+U*u}let I=Math.max(0,Math.min(1,_/f)),F=0;y===0?F=.5/i:y===g&&(F=-.5/i);for(let U=0;U<=i;U++){let z=U/i,R=z*Math.PI*2,L=Math.sin(R),Z=Math.cos(R);v.x=-T*Z,v.y=x,v.z=T*L,o.push(v.x,v.y,v.z),p.set(-T*Z,b,T*L),p.normalize(),c.push(p.x,p.y,p.z),l.push(z+F,I)}if(y>0){let U=(y-1)*m;for(let z=0;z<i;z++){let R=U+z,L=U+z+1,Z=y*m+z,H=y*m+z+1;a.push(R,L,Z),a.push(L,H,Z)}}}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},In=class r extends ut{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("normal",new Ie(o,3)),this.setAttribute("uv",new Ie(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Je=class r extends ut{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],g=0,m=[],p=n/2,v=0;function y(_){let x=g,T=new we,b=new w,I=0,F=_===!0?e:t,U=_===!0?1:-1;for(let R=1;R<=i;R++)u.push(0,p*U,0),d.push(0,U,0),f.push(.5,.5),g++;let z=g;for(let R=0;R<=i;R++){let L=R/i*c+o,Z=Math.cos(L),H=Math.sin(L);b.x=F*H,b.y=p*U,b.z=F*Z,u.push(b.x,b.y,b.z),d.push(0,U,0),T.x=.5*Z+.5,T.y=.5*H*U+.5,f.push(T.x,T.y),g++}for(let R=0;R<i;R++){let L=x+R,Z=z+R;_===!0?h.push(Z,Z+1,L):h.push(Z+1,Z,L),I+=3}l.addGroup(v,I,_===!0?1:2),v+=I}(function(){let _=new w,x=new w,T=0,b=(t-e)/n;for(let I=0;I<=s;I++){let F=[],U=I/s,z=U*(t-e)+e;for(let R=0;R<=i;R++){let L=R/i,Z=L*c+o,H=Math.sin(Z),ie=Math.cos(Z);x.x=z*H,x.y=-U*n+p,x.z=z*ie,u.push(x.x,x.y,x.z),_.set(H,b,ie).normalize(),d.push(_.x,_.y,_.z),f.push(L,1-U),F.push(g++)}m.push(F)}for(let I=0;I<i;I++)for(let F=0;F<s;F++){let U=m[F][I],z=m[F+1][I],R=m[F+1][I+1],L=m[F][I+1];(e>0||F!==0)&&(h.push(U,z,L),T+=3),(t>0||F!==s-1)&&(h.push(z,R,L),T+=3)}l.addGroup(v,T,0),v+=T})(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},lo=class r extends Je{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},nr=class r extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(f,g,m,p){let v=p+1,y=[];for(let _=0;_<=v;_++){y[_]=[];let x=f.clone().lerp(m,_/v),T=g.clone().lerp(m,_/v),b=v-_;for(let I=0;I<=b;I++)y[_][I]=I===0&&_===v?x:x.clone().lerp(T,I/b)}for(let _=0;_<v;_++)for(let x=0;x<2*(v-_)-1;x++){let T=Math.floor(x/2);x%2==0?(c(y[_][T+1]),c(y[_+1][T]),c(y[_][T])):(c(y[_][T+1]),c(y[_+1][T+1]),c(y[_+1][T]))}}function c(f){s.push(f.x,f.y,f.z)}function l(f,g){let m=3*f;g.x=e[m+0],g.y=e[m+1],g.z=e[m+2]}function h(f,g,m,p){p<0&&f.x===1&&(a[g]=f.x-1),m.x===0&&m.z===0&&(a[g]=p/2/Math.PI+.5)}function u(f){return Math.atan2(f.z,-f.x)}function d(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}(function(f){let g=new w,m=new w,p=new w;for(let v=0;v<t.length;v+=3)l(t[v+0],g),l(t[v+1],m),l(t[v+2],p),o(g,m,p,f)})(i),(function(f){let g=new w;for(let m=0;m<s.length;m+=3)g.x=s[m+0],g.y=s[m+1],g.z=s[m+2],g.normalize().multiplyScalar(f),s[m+0]=g.x,s[m+1]=g.y,s[m+2]=g.z})(n),(function(){let f=new w;for(let g=0;g<s.length;g+=3){f.x=s[g+0],f.y=s[g+1],f.z=s[g+2];let m=u(f)/2/Math.PI+.5,p=d(f)/Math.PI+.5;a.push(m,1-p)}(function(){let g=new w,m=new w,p=new w,v=new w,y=new we,_=new we,x=new we;for(let T=0,b=0;T<s.length;T+=9,b+=6){g.set(s[T+0],s[T+1],s[T+2]),m.set(s[T+3],s[T+4],s[T+5]),p.set(s[T+6],s[T+7],s[T+8]),y.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),v.copy(g).add(m).add(p).divideScalar(3);let I=u(v);h(y,b+0,g,I),h(_,b+2,m,I),h(x,b+4,p,I)}})(),(function(){for(let g=0;g<a.length;g+=6){let m=a[g+0],p=a[g+2],v=a[g+4],y=Math.max(m,p,v),_=Math.min(m,p,v);y>.9&&_<.1&&(m<.2&&(a[g+0]+=1),p<.2&&(a[g+2]+=1),v<.2&&(a[g+4]+=1))}})()})(),this.setAttribute("position",new Ie(s,3)),this.setAttribute("normal",new Ie(s.slice(),3)),this.setAttribute("uv",new Ie(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},co=class r extends nr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},ka=new w,Va=new w,Ll=new w,Ha=new Fi,ho=class extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Za*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:m,b:p,c:v}=Ha;if(m.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),v.fromBufferAttribute(o,l[2]),Ha.getNormal(Ll),u[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,u[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let y=0;y<3;y++){let _=(y+1)%3,x=u[y],T=u[_],b=Ha[h[y]],I=Ha[h[_]],F=`${x}_${T}`,U=`${T}_${x}`;U in d&&d[U]?(Ll.dot(d[U].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(I.x,I.y,I.z)),d[U]=null):F in d||(d[F]={index0:l[y],index1:l[_],normal:Ll.clone()})}}for(let g in d)if(d[g]){let{index0:m,index1:p}=d[g];ka.fromBufferAttribute(o,m),Va.fromBufferAttribute(o,p),f.push(ka.x,ka.y,ka.z),f.push(Va.x,Va.y,Va.z)}this.setAttribute("position",new Ie(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},ti=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new we:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new dt;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Bt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Bt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},os=class extends ti{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new we){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},uo=class extends os{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vc(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Wa=new w,Dl=new Vc,Ul=new Vc,Nl=new Vc,At=class extends ti{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Wa.subVectors(i[0],i[1]).add(i[0]),o=Wa);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Wa.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Wa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(o.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(c),f);m<1e-4&&(m=1),g<1e-4&&(g=m),p<1e-4&&(p=m),Dl.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,g,m,p),Ul.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,g,m,p),Nl.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,g,m,p)}else this.curveType==="catmullrom"&&(Dl.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Ul.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Nl.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Dl.calc(h),Ul.calc(h),Nl.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vh(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Ds(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Us(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Js=class extends ti{constructor(e=new we,t=new we,n=new we,i=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new we){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Us(e,i.x,s.x,a.x,o.x),Us(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},po=class extends ti{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Us(e,i.x,s.x,a.x,o.x),Us(e,i.y,s.y,a.y,o.y),Us(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ks=class extends ti{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fo=class extends ti{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$s=class extends ti{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ds(e,i.x,s.x,a.x),Ds(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qs=class extends ti{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ds(e,i.x,s.x,a.x),Ds(e,i.y,s.y,a.y),Ds(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ea=class extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Vh(o,c.x,l.x,h.x,u.x),Vh(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new we().fromArray(i))}return this}},mo=Object.freeze({__proto__:null,ArcCurve:uo,CatmullRomCurve3:At,CubicBezierCurve:Js,CubicBezierCurve3:po,EllipseCurve:os,LineCurve:Ks,LineCurve3:fo,QuadraticBezierCurve:$s,QuadraticBezierCurve3:Qs,SplineCurve:ea}),go=class extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new mo[i.type]().fromJSON(i))}return this}},On=class extends go{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ks(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new $s(this.currentPoint.clone(),new we(e,t),new we(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Js(this.currentPoint.clone(),new we(e,t),new we(n,i),new we(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ea(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new os(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Wt=class extends On{constructor(e){super(e),this.uuid=Ar(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new On().fromJSON(i))}return this}};function fp(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Hh(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,f){let g=[];for(let m=0,p=u.length;m<p;m++){let v=Hh(h,u[m]*f,m<p-1?u[m+1]*f:h.length,f,!1);v===v.next&&(v.steiner=!0),g.push(Tp(v))}g.sort(_p);for(let m=0;m<g.length;m++)d=xp(g[m],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=r[d],g=r[d+1];f<o&&(o=f),g<c&&(c=g),f>h&&(h=f),g>u&&(u=g)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return ta(s,a,t,o,c,l,0),a}function Hh(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Wh(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Wh(a/n|0,r[a],r[a+1],s);return s&&ls(s,s.next)&&(ia(s),s=s.next),s}function _r(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!ls(n,n.next)&&hn(n.prev,n,n.next)!==0)n=n.next;else{if(ia(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ta(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Xl(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(f){let g,m=1;do{let p,v=f;f=null;let y=null;for(g=0;v;){g++;let _=v,x=0;for(let b=0;b<m&&(x++,_=_.nextZ,_);b++);let T=m;for(;x>0||T>0&&_;)x!==0&&(T===0||!_||v.z<=_.z)?(p=v,v=v.nextZ,x--):(p=_,_=_.nextZ,T--),y?y.nextZ=p:f=p,p.prevZ=y,y=p;v=_}y.nextZ=null,m*=2}while(g>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?gp(r,n,i,s):mp(r))e.push(c.i,r.i,l.i),ia(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?ta(r=vp(_r(r),e),e,t,n,i,s,2):a===2&&yp(r,e,t,n,i,s):ta(_r(r),e,t,n,i,s,1);break}}}function mp(r){let e=r.prev,t=r,n=r.next;if(hn(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),f=Math.max(o,c,l),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ls(i,o,s,c,a,l,g.x,g.y)&&hn(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function gp(r,e,t,n){let i=r.prev,s=r,a=r.next;if(hn(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,f=Math.min(o,c,l),g=Math.min(h,u,d),m=Math.max(o,c,l),p=Math.max(h,u,d),v=Xl(f,g,e,t,n),y=Xl(m,p,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=v&&x&&x.z<=y;){if(_.x>=f&&_.x<=m&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&Ls(o,h,c,u,l,d,_.x,_.y)&&hn(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&Ls(o,h,c,u,l,d,x.x,x.y)&&hn(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=v;){if(_.x>=f&&_.x<=m&&_.y>=g&&_.y<=p&&_!==i&&_!==a&&Ls(o,h,c,u,l,d,_.x,_.y)&&hn(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&Ls(o,h,c,u,l,d,x.x,x.y)&&hn(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function vp(r,e){let t=r;do{let n=t.prev,i=t.next.next;!ls(n,i)&&qu(n,t,t.next,i)&&na(n,i)&&na(i,n)&&(e.push(n.i,t.i,i.i),ia(t),ia(t.next),t=r=i),t=t.next}while(t!==r);return _r(t)}function yp(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&bp(a,o)){let c=Yu(a,o);return a=_r(a,a.next),c=_r(c,c.next),ta(a,e,t,n,i,s,0),void ta(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function _p(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function xp(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(ls(i,a))return a;do{if(ls(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let m=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,l=a.x<a.next.x?a:a.next,m===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,f=l.y,g=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&ju(c<f?o:h,c,d,f,c<f?h:o,c,a.x,a.y)){let m=Math.abs(c-a.y)/(o-a.x);na(a,i)&&(m<g||m===g&&(a.x>l.x||a.x===l.x&&Mp(l,a)))&&(l=a,g=m)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=Yu(t,r);return _r(n,n.next),_r(t,t.next)}function Mp(r,e){return hn(r.prev,r,e.prev)<0&&hn(e.next,r,r.next)<0}function Xl(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Tp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function ju(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Ls(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&ju(r,e,t,n,i,s,a,o)}function bp(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&qu(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(na(r,e)&&na(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(hn(r.prev,r,e.prev)||hn(r,e.prev,e))||ls(r,e)&&hn(r.prev,r,r.next)>0&&hn(e.prev,e,e.next)>0)}function hn(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ls(r,e){return r.x===e.x&&r.y===e.y}function qu(r,e,t,n){let i=ja(hn(r,e,t)),s=ja(hn(r,e,n)),a=ja(hn(t,n,r)),o=ja(hn(t,n,e));return i!==s&&a!==o||!(i!==0||!Xa(r,t,e))||!(s!==0||!Xa(r,n,e))||!(a!==0||!Xa(t,r,n))||!(o!==0||!Xa(t,e,n))}function Xa(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ja(r){return r>0?1:r<0?-1:0}function na(r,e){return hn(r.prev,r,r.next)<0?hn(r,e,r.next)>=0&&hn(r,r.prev,e)>=0:hn(r,e,r.prev)<0||hn(r,r.next,e)<0}function Yu(r,e){let t=jl(r.i,r.x,r.y),n=jl(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Wh(r,e,t,n){let i=jl(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ia(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function jl(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var ql=class{static triangulate(e,t,n=2){return fp(e,t,n)}},Si=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Xh(e),jh(n,e);let a=e.length;t.forEach(Xh);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,jh(n,t[c]);let o=ql.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Xh(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function jh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Vt=class r extends ut{constructor(e=new Wt([new we(.5,.5),new we(-.5,.5),new we(-.5,-.5),new we(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,v=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Sp,_,x,T,b,I,F=!1;v&&(_=v.getSpacedPoints(h),F=!0,d=!1,x=v.computeFrenetFrames(h,!1),T=new w,b=new w,I=new w),d||(p=0,f=0,g=0,m=0);let U=o.extractPoints(l),z=U.shape,R=U.holes;if(!Si.isClockWise(z)){z=z.reverse();for(let V=0,S=R.length;V<S;V++){let B=R[V];Si.isClockWise(B)&&(R[V]=B.reverse())}}function L(V){let S=10000000000000001e-36,B=V[0];for(let W=1;W<=V.length;W++){let k=W%V.length,ve=V[k],ae=ve.x-B.x,le=ve.y-B.y,Ce=ae*ae+le*le,We=Math.max(Math.abs(ve.x),Math.abs(ve.y),Math.abs(B.x),Math.abs(B.y));Ce<=S*We*We?(V.splice(k,1),W--):B=ve}}L(z),R.forEach(L);let Z=R.length,H=z;for(let V=0;V<Z;V++){let S=R[V];z=z.concat(S)}function ie(V,S,B){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),V.clone().addScaledVector(S,B)}let te=z.length;function K(V,S,B){let W,k,ve,ae=V.x-S.x,le=V.y-S.y,Ce=B.x-V.x,We=B.y-V.y,De=ae*ae+le*le,Xe=ae*We-le*Ce;if(Math.abs(Xe)>Number.EPSILON){let at=Math.sqrt(De),pt=Math.sqrt(Ce*Ce+We*We),Ct=S.x-le/at,Tt=S.y+ae/at,Ae=((B.x-We/pt-Ct)*We-(B.y+Ce/pt-Tt)*Ce)/(ae*We-le*Ce);W=Ct+ae*Ae-V.x,k=Tt+le*Ae-V.y;let D=W*W+k*k;if(D<=2)return new we(W,k);ve=Math.sqrt(D/2)}else{let at=!1;ae>Number.EPSILON?Ce>Number.EPSILON&&(at=!0):ae<-Number.EPSILON?Ce<-Number.EPSILON&&(at=!0):Math.sign(le)===Math.sign(We)&&(at=!0),at?(W=-le,k=ae,ve=Math.sqrt(De)):(W=ae,k=le,ve=Math.sqrt(De/2))}return new we(W/ve,k/ve)}let de=[];for(let V=0,S=H.length,B=S-1,W=V+1;V<S;V++,B++,W++)B===S&&(B=0),W===S&&(W=0),de[V]=K(H[V],H[B],H[W]);let Le=[],ze,Se,Ee=de.concat();for(let V=0,S=Z;V<S;V++){let B=R[V];ze=[];for(let W=0,k=B.length,ve=k-1,ae=W+1;W<k;W++,ve++,ae++)ve===k&&(ve=0),ae===k&&(ae=0),ze[W]=K(B[W],B[ve],B[ae]);Le.push(ze),Ee=Ee.concat(ze)}if(p===0)Se=Si.triangulateShape(H,R);else{let V=[],S=[];for(let B=0;B<p;B++){let W=B/p,k=f*Math.cos(W*Math.PI/2),ve=g*Math.sin(W*Math.PI/2)+m;for(let ae=0,le=H.length;ae<le;ae++){let Ce=ie(H[ae],de[ae],ve);Y(Ce.x,Ce.y,-k),W===0&&V.push(Ce)}for(let ae=0,le=Z;ae<le;ae++){let Ce=R[ae];ze=Le[ae];let We=[];for(let De=0,Xe=Ce.length;De<Xe;De++){let at=ie(Ce[De],ze[De],ve);Y(at.x,at.y,-k),W===0&&We.push(at)}W===0&&S.push(We)}}Se=Si.triangulateShape(V,S)}let ee=Se.length,Te=g+m;for(let V=0;V<te;V++){let S=d?ie(z[V],Ee[V],Te):z[V];F?(b.copy(x.normals[0]).multiplyScalar(S.x),T.copy(x.binormals[0]).multiplyScalar(S.y),I.copy(_[0]).add(b).add(T),Y(I.x,I.y,I.z)):Y(S.x,S.y,0)}for(let V=1;V<=h;V++)for(let S=0;S<te;S++){let B=d?ie(z[S],Ee[S],Te):z[S];F?(b.copy(x.normals[V]).multiplyScalar(B.x),T.copy(x.binormals[V]).multiplyScalar(B.y),I.copy(_[V]).add(b).add(T),Y(I.x,I.y,I.z)):Y(B.x,B.y,u/h*V)}for(let V=p-1;V>=0;V--){let S=V/p,B=f*Math.cos(S*Math.PI/2),W=g*Math.sin(S*Math.PI/2)+m;for(let k=0,ve=H.length;k<ve;k++){let ae=ie(H[k],de[k],W);Y(ae.x,ae.y,u+B)}for(let k=0,ve=R.length;k<ve;k++){let ae=R[k];ze=Le[k];for(let le=0,Ce=ae.length;le<Ce;le++){let We=ie(ae[le],ze[le],W);F?Y(We.x,We.y+_[h-1].y,_[h-1].x+B):Y(We.x,We.y,u+B)}}}function be(V,S){let B=V.length;for(;--B>=0;){let W=B,k=B-1;k<0&&(k=V.length-1);for(let ve=0,ae=h+2*p;ve<ae;ve++){let le=te*ve,Ce=te*(ve+1);A(S+W+le,S+k+le,S+k+Ce,S+W+Ce)}}}function Y(V,S,B){c.push(V),c.push(S),c.push(B)}function Ue(V,S,B){P(V),P(S),P(B);let W=i.length/3,k=y.generateTopUV(n,i,W-3,W-2,W-1);X(k[0]),X(k[1]),X(k[2])}function A(V,S,B,W){P(V),P(S),P(W),P(S),P(B),P(W);let k=i.length/3,ve=y.generateSideWallUV(n,i,k-6,k-3,k-2,k-1);X(ve[0]),X(ve[1]),X(ve[3]),X(ve[1]),X(ve[2]),X(ve[3])}function P(V){i.push(c[3*V+0]),i.push(c[3*V+1]),i.push(c[3*V+2])}function X(V){s.push(V.x),s.push(V.y)}(function(){let V=i.length/3;if(d){let S=0,B=te*S;for(let W=0;W<ee;W++){let k=Se[W];Ue(k[2]+B,k[1]+B,k[0]+B)}S=h+2*p,B=te*S;for(let W=0;W<ee;W++){let k=Se[W];Ue(k[0]+B,k[1]+B,k[2]+B)}}else{for(let S=0;S<ee;S++){let B=Se[S];Ue(B[2],B[1],B[0])}for(let S=0;S<ee;S++){let B=Se[S];Ue(B[0]+te*h,B[1]+te*h,B[2]+te*h)}}n.addGroup(V,i.length/3-V,0)})(),(function(){let V=i.length/3,S=0;be(H,S),S+=H.length;for(let B=0,W=R.length;B<W;B++){let k=R[B];be(k,S),S+=k.length}n.addGroup(V,i.length/3-V,1)})()}this.setAttribute("position",new Ie(i,3)),this.setAttribute("uv",new Ie(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new mo[i.type]().fromJSON(i)),new r(n,e.options)}},Sp={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new we(s,a),new we(o,c),new we(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],f=e[3*i+1],g=e[3*i+2],m=e[3*s],p=e[3*s+1],v=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new we(a,1-c),new we(l,1-u),new we(d,1-g),new we(m,1-v)]:[new we(o,1-c),new we(h,1-u),new we(f,1-g),new we(p,1-v)]}},vo=class r extends nr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},vi=class r extends ut{constructor(e=[new we(0,-.5),new we(.5,0),new we(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Bt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new we,f=new w,g=new w,m=new w,p=0,v=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,f.x=1*v,f.y=-p,f.z=0*v,m.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(m.x,m.y,m.z);break;default:p=e[y+1].x-e[y].x,v=e[y+1].y-e[y].y,f.x=1*v,f.y=-p,f.z=0*v,g.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),c.push(f.x,f.y,f.z),m.copy(g)}for(let y=0;y<=t;y++){let _=n+y*h*i,x=Math.sin(_),T=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*T,a.push(u.x,u.y,u.z),d.x=y/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=c[3*b+0]*x,F=c[3*b+1],U=c[3*b+0]*T;l.push(I,F,U)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){let x=_+y*e.length,T=x,b=x+e.length,I=x+e.length+1,F=x+1;s.push(T,b,F),s.push(I,F,b)}this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("uv",new Ie(o,2)),this.setAttribute("normal",new Ie(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},cs=class r extends nr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},qt=class r extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],m=[],p=[];for(let v=0;v<h;v++){let y=v*d-a;for(let _=0;_<l;_++){let x=_*u-s;g.push(x,-y,0),m.push(0,0,1),p.push(_/o),p.push(1-v/c)}}for(let v=0;v<c;v++)for(let y=0;y<o;y++){let _=y+l*v,x=y+l*(v+1),T=y+1+l*(v+1),b=y+1+l*v;f.push(_,x,b),f.push(x,T,b)}this.setIndex(f),this.setAttribute("position",new Ie(g,3)),this.setAttribute("normal",new Ie(m,3)),this.setAttribute("uv",new Ie(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},yo=class r extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),f=new w,g=new we;for(let m=0;m<=i;m++){for(let p=0;p<=n;p++){let v=s+p/n*a;f.x=u*Math.cos(v),f.y=u*Math.sin(v),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let m=0;m<i;m++){let p=m*(n+1);for(let v=0;v<n;v++){let y=v+p,_=y,x=y+n+1,T=y+n+2,b=y+1;o.push(_,x,b),o.push(x,T,b)}}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Vi=class r extends ut{constructor(e=new Wt([new we(0,.5),new we(-.5,-.5),new we(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;Si.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,v=g.length;p<v;p++){let y=g[p];Si.isClockWise(y)===!0&&(g[p]=y.reverse())}let m=Si.triangulateShape(f,g);for(let p=0,v=g.length;p<v;p++){let y=g[p];f=f.concat(y)}for(let p=0,v=f.length;p<v;p++){let y=f[p];i.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let p=0,v=m.length;p<v;p++){let y=m[p],_=y[0]+u,x=y[1]+u,T=y[2]+u;n.push(_,x,T),c+=3}}this.setIndex(n),this.setAttribute("position",new Ie(i,3)),this.setAttribute("normal",new Ie(s,3)),this.setAttribute("uv",new Ie(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Ft=class r extends ut{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,f=[],g=[],m=[],p=[];for(let v=0;v<=n;v++){let y=[],_=v/n,x=0;v===0&&a===0?x=.5/t:v===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let b=T/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),p.push(b+x,1-_),y.push(l++)}h.push(y)}for(let v=0;v<n;v++)for(let y=0;y<t;y++){let _=h[v][y+1],x=h[v][y],T=h[v+1][y],b=h[v+1][y+1];(v!==0||a>0)&&f.push(_,x,b),(v!==n-1||c<Math.PI)&&f.push(x,T,b)}this.setIndex(f),this.setAttribute("position",new Ie(g,3)),this.setAttribute("normal",new Ie(m,3)),this.setAttribute("uv",new Ie(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},_o=class r extends nr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ut=class r extends ut{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let m=g/i*s,p=f/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(m),u.y=(e+t*Math.cos(p))*Math.sin(m),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(m),h.y=e*Math.sin(m),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let m=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,v=(i+1)*(f-1)+g,y=(i+1)*f+g;a.push(m,p,y),a.push(p,v,y)}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},xo=class r extends ut{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,f=new w,g=new w,m=new w,p=new w,v=new w;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;y(x,s,a,e,f),y(x+.01,s,a,e,g),p.subVectors(g,f),v.addVectors(g,f),m.crossVectors(p,v),v.crossVectors(m,p),m.normalize(),v.normalize();for(let T=0;T<=i;++T){let b=T/i*Math.PI*2,I=-t*Math.cos(b),F=t*Math.sin(b);u.x=f.x+(I*v.x+F*m.x),u.y=f.y+(I*v.y+F*m.y),u.z=f.z+(I*v.z+F*m.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(T/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let T=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),I=(i+1)*_+x,F=(i+1)*(_-1)+x;o.push(T,b,F),o.push(b,I,F)}function y(_,x,T,b,I){let F=Math.cos(_),U=Math.sin(_),z=T/x*_,R=Math.cos(z);I.x=b*(2+R)*.5*F,I.y=b*(2+R)*U*.5,I.z=b*Math.sin(z)*.5}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},wt=class r extends ut{constructor(e=new Qs(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new we,h=new w,u=[],d=[],f=[],g=[];function m(p){h=e.getPointAt(p/t,h);let v=a.normals[p],y=a.binormals[p];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,T=Math.sin(x),b=-Math.cos(x);c.x=b*v.x+T*y.x,c.y=b*v.y+T*y.y,c.z=b*v.z+T*y.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let p=0;p<t;p++)m(p);m(s===!1?t:0),(function(){for(let p=0;p<=t;p++)for(let v=0;v<=i;v++)l.x=p/t,l.y=v/i,f.push(l.x,l.y)})(),(function(){for(let p=1;p<=t;p++)for(let v=1;v<=i;v++){let y=(i+1)*(p-1)+(v-1),_=(i+1)*p+(v-1),x=(i+1)*p+v,T=(i+1)*(p-1)+v;g.push(y,_,T),g.push(_,x,T)}})()})(),this.setIndex(g),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(d,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new mo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Mo=class extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let f=d,g=d+u.count;f<g;f+=3)for(let m=0;m<3;m++){let p=o.getX(f+m),v=o.getX(f+(m+1)%3);i.fromBufferAttribute(a,p),s.fromBufferAttribute(a,v),qh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),qh(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ie(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function qh(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var km=Object.freeze({__proto__:null,BoxGeometry:et,CapsuleGeometry:as,CircleGeometry:In,ConeGeometry:lo,CylinderGeometry:Je,DodecahedronGeometry:co,EdgesGeometry:ho,ExtrudeGeometry:Vt,IcosahedronGeometry:vo,LatheGeometry:vi,OctahedronGeometry:cs,PlaneGeometry:qt,PolyhedronGeometry:nr,RingGeometry:yo,ShapeGeometry:Vi,SphereGeometry:Ft,TetrahedronGeometry:_o,TorusGeometry:Ut,TorusKnotGeometry:xo,TubeGeometry:wt,WireframeGeometry:Mo}),xr=class extends Ei{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new lt(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Et=class extends Ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_n=class extends Et{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ir=class extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},To=class extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qa(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function wp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Mr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},bo=class extends Mr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gl,endingEnd:Gl}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case kl:s=e,o=2*t-n;break;case Vl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case kl:a=e,c=2*n-t;break;case Vl:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),m=g*g,p=m*g,v=-d*p+2*d*m-d*g,y=(1+d)*p+(-1.5-2*d)*m+(-.5+d)*g+1,_=(-1-f)*p+(1.5+f)*m+.5*g,x=f*p-f*m;for(let T=0;T!==o;++T)s[T]=v*a[h+T]+y*a[l+T]+_*a[c+T]+x*a[u+T];return s}},So=class extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},wo=class extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Qn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qa(t,this.TimeBufferType),this.values=qa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qa(e.times,Array),values:qa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case $a:t=this.InterpolantFactoryMethodLinear;break;case Ya:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return $a;case this.InterpolantFactoryMethodSmooth:return Ya}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&wp(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ya,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let g=t[h+f];if(g!==t[u+f]||g!==t[d+f]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Qn.prototype.ValueTypeName="",Qn.prototype.TimeBufferType=Float32Array,Qn.prototype.ValueBufferType=Float32Array,Qn.prototype.DefaultInterpolation=$a;var Qi=class extends Qn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool",Qi.prototype.ValueBufferType=Array,Qi.prototype.DefaultInterpolation=Ns,Qi.prototype.InterpolantFactoryMethodLinear=void 0,Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Eo=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};Eo.prototype.ValueTypeName="color";var Ao=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};Ao.prototype.ValueTypeName="number";var Co=class extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Fn.slerpFlat(s,0,a,l-o,a,l,c);return s}},ra=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Co(this.times,this.values,this.getValueSize(),e)}};ra.prototype.ValueTypeName="quaternion",ra.prototype.InterpolantFactoryMethodSmooth=void 0;var er=class extends Qn{constructor(e,t,n){super(e,t,n)}};er.prototype.ValueTypeName="string",er.prototype.ValueBufferType=Array,er.prototype.DefaultInterpolation=Ns,er.prototype.InterpolantFactoryMethodLinear=void 0,er.prototype.InterpolantFactoryMethodSmooth=void 0;var Ro=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};Ro.prototype.ValueTypeName="vector";var Ja={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Po=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Zu=new Po,hs=class{constructor(e){this.manager=e!==void 0?e:Zu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};hs.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jr=new WeakMap,Io=class extends hs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ja.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Jr.get(a);u===void 0&&(u=[],Jr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Qr("img");function c(){h(),t&&t(this);let u=Jr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Jr.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),Ja.remove(`image:${e}`);let d=Jr.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Jr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ja.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var sa=class extends hs{constructor(e){super(e)}load(e,t,n,i){let s=new Bn,a=new Io(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Tr=class extends vn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Vn=class extends Tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new lt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Bl=new dt,Yh=new w,Zh=new w,aa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Ci,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Zh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zh),t.updateMatrixWorld(),Bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Yl=class extends aa{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Os*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},oa=class extends Tr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vn.DEFAULT_UP),this.updateMatrix(),this.target=new vn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Yl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Jh=new dt,Is=new w,Fl=new w,Zl=class extends aa{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new Yt(2,1,1,1),new Yt(0,1,1,1),new Yt(3,1,1,1),new Yt(1,1,1,1),new Yt(3,0,1,1),new Yt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Is.setFromMatrixPosition(e.matrixWorld),n.position.copy(Is),Fl.copy(n.position),Fl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fl),n.updateMatrixWorld(),i.makeTranslation(-Is.x,-Is.y,-Is.z),Jh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jh,n.coordinateSystem,n.reversedDepth)}},la=class extends Tr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Zl}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},br=class extends ns{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Jl=class extends aa{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zn=class extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vn.DEFAULT_UP),this.updateMatrix(),this.target=new vn,this.shadow=new Jl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Vm=new dt,Hm=new dt,Wm=new dt;var Lo=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Xm=new w,jm=new Fn,qm=new w,Ym=new w,Zm=new w;var Jm=new w,Km=new Fn,$m=new w,Qm=new w;var Hc="\\[\\]\\.:\\/",Ep=new RegExp("["+Hc+"]","g"),Ol="[^"+Hc+"]",Ap="[^"+Hc.replace("\\.","")+"]",Cp=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Ol)+/(WCOD+)?/.source.replace("WCOD",Ap)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ol)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ol)+"$"),Rp=["material","materials","bones","map"],on=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ep,"")}static parseTrackName(e){let t=Cp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Rp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};on.Composite=class{constructor(r,e,t){let n=t||on.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},on.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},on.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},on.prototype.GetterByBindingType=[on.prototype._getValue_direct,on.prototype._getValue_array,on.prototype._getValue_arrayElement,on.prototype._getValue_toArray],on.prototype.SetterByBindingTypeAndVersioning=[[on.prototype._setValue_direct,on.prototype._setValue_direct_setNeedsUpdate,on.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[on.prototype._setValue_array,on.prototype._setValue_array_setNeedsUpdate,on.prototype._setValue_array_setMatrixWorldNeedsUpdate],[on.prototype._setValue_arrayElement,on.prototype._setValue_arrayElement_setNeedsUpdate,on.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[on.prototype._setValue_fromArray,on.prototype._setValue_fromArray_setNeedsUpdate,on.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var e0=new Float32Array(1);var t0=new dt;var n0=new we;var i0=new w,r0=new w,s0=new w,a0=new w,o0=new w,l0=new w,c0=new w;var h0=new w;var u0=new w,d0=new dt,p0=new dt;var f0=new w,m0=new lt,g0=new lt;var v0=new w,y0=new w,_0=new w;var x0=new w,M0=new ns;var T0=new Sn;var b0=new w;function Wc(r,e,t,n){let i=(function(s){switch(s){case Ci:case ic:return{byteLength:1,components:1};case ms:case rc:case sr:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case wr:case Ho:case li:return{byteLength:4,components:1};case sc:case ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case jo:case qo:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case ci:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function _d(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ip(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],f=l[u];f.start<=d.start+d.count+1?d.count=Math.max(d.count,f.start+f.count-d.start):(++h,l[h]=f)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let f=l[u];r.bufferSubData(o,f.start*c.BYTES_PER_ELEMENT,c,f.start,f.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Nt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},qe={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},Ri={basic:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new lt(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Gn([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Gn([qe.common,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.roughnessmap,qe.metalnessmap,qe.fog,qe.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Gn([qe.common,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.gradientmap,qe.fog,qe.lights,{emissive:{value:new lt(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Gn([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Gn([qe.points,qe.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Gn([qe.common,qe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Gn([qe.common,qe.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Gn([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Gn([qe.sprite,qe.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Gn([qe.common,qe.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Gn([qe.lights,qe.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Ri.physical={uniforms:Gn([Ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};var $o={r:0,b:0,g:0},Rr=new gi,Lp=new dt;function Dp(r,e,t,n,i,s,a){let o=new lt(0),c,l,h=s===!0?0:1,u=null,d=0,f=null;function g(p){let v=p.isScene===!0?p.background:null;return v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v}function m(p,v){p.getRGB($o,kc(r)),n.buffers.color.setClear($o.r,$o.g,$o.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(p,v=1){o.set(p),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(p){h=p,m(o,h)},render:function(p){let v=!1,y=g(p);y===null?m(o,h):y&&y.isColor&&(m(y,1),v=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(p,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===ua)?(l===void 0&&(l=new Ze(new et(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Cr(Ri.backgroundCube.uniforms),vertexShader:Ri.backgroundCube.vertexShader,fragmentShader:Ri.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,x,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Rr.copy(v.backgroundRotation),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Lp.makeRotationFromEuler(Rr)),l.material.toneMapped=jt.getTransfer(y.colorSpace)!==Qt,u===y&&d===y.version&&f===r.toneMapping||(l.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ze(new qt(2,2),new Yn({name:"BackgroundMaterial",uniforms:Cr(Ri.background.uniforms),vertexShader:Ri.background.vertexShader,fragmentShader:Ri.background.fragmentShader,side:ds,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=jt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),u===y&&d===y.version&&f===r.toneMapping||(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Up(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(v){return r.bindVertexArray(v)}function c(v){return r.deleteVertexArray(v)}function l(v){let y=[],_=[],x=[];for(let T=0;T<t;T++)y[T]=0,_[T]=0,x[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:_,attributeDivisors:x,object:v,attributes:{},index:null}}function h(){let v=s.newAttributes;for(let y=0,_=v.length;y<_;y++)v[y]=0}function u(v){d(v,0)}function d(v,y){let _=s.newAttributes,x=s.enabledAttributes,T=s.attributeDivisors;_[v]=1,x[v]===0&&(r.enableVertexAttribArray(v),x[v]=1),T[v]!==y&&(r.vertexAttribDivisor(v,y),T[v]=y)}function f(){let v=s.newAttributes,y=s.enabledAttributes;for(let _=0,x=y.length;_<x;_++)y[_]!==v[_]&&(r.disableVertexAttribArray(_),y[_]=0)}function g(v,y,_,x,T,b,I){I===!0?r.vertexAttribIPointer(v,y,_,T,b):r.vertexAttribPointer(v,y,_,x,T,b)}function m(){p(),a=!0,s!==i&&(s=i,o(s.object))}function p(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(v,y,_,x,T){let b=!1,I=(function(F,U,z){let R=z.wireframe===!0,L=n[F.id];L===void 0&&(L={},n[F.id]=L);let Z=L[U.id];Z===void 0&&(Z={},L[U.id]=Z);let H=Z[R];return H===void 0&&(H=l(r.createVertexArray()),Z[R]=H),H})(x,_,y);s!==I&&(s=I,o(s.object)),b=(function(F,U,z,R){let L=s.attributes,Z=U.attributes,H=0,ie=z.getAttributes();for(let te in ie)if(ie[te].location>=0){let K=L[te],de=Z[te];if(de===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(de=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(de=F.instanceColor)),K===void 0||K.attribute!==de||de&&K.data!==de.data)return!0;H++}return s.attributesNum!==H||s.index!==R})(v,x,_,T),b&&(function(F,U,z,R){let L={},Z=U.attributes,H=0,ie=z.getAttributes();for(let te in ie)if(ie[te].location>=0){let K=Z[te];K===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(K=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(K=F.instanceColor));let de={};de.attribute=K,K&&K.data&&(de.data=K.data),L[te]=de,H++}s.attributes=L,s.attributesNum=H,s.index=R})(v,x,_,T),T!==null&&e.update(T,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(F,U,z,R){h();let L=R.attributes,Z=z.getAttributes(),H=U.defaultAttributeValues;for(let ie in Z){let te=Z[ie];if(te.location>=0){let K=L[ie];if(K===void 0&&(ie==="instanceMatrix"&&F.instanceMatrix&&(K=F.instanceMatrix),ie==="instanceColor"&&F.instanceColor&&(K=F.instanceColor)),K!==void 0){let de=K.normalized,Le=K.itemSize,ze=e.get(K);if(ze===void 0)continue;let Se=ze.buffer,Ee=ze.type,ee=ze.bytesPerElement,Te=Ee===r.INT||Ee===r.UNSIGNED_INT||K.gpuType===Ho;if(K.isInterleavedBufferAttribute){let be=K.data,Y=be.stride,Ue=K.offset;if(be.isInstancedInterleavedBuffer){for(let A=0;A<te.locationSize;A++)d(te.location+A,be.meshPerAttribute);F.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let A=0;A<te.locationSize;A++)u(te.location+A);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let A=0;A<te.locationSize;A++)g(te.location+A,Le/te.locationSize,Ee,de,Y*ee,(Ue+Le/te.locationSize*A)*ee,Te)}else{if(K.isInstancedBufferAttribute){for(let be=0;be<te.locationSize;be++)d(te.location+be,K.meshPerAttribute);F.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let be=0;be<te.locationSize;be++)u(te.location+be);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let be=0;be<te.locationSize;be++)g(te.location+be,Le/te.locationSize,Ee,de,Le*ee,Le/te.locationSize*be*ee,Te)}}else if(H!==void 0){let de=H[ie];if(de!==void 0)switch(de.length){case 2:r.vertexAttrib2fv(te.location,de);break;case 3:r.vertexAttrib3fv(te.location,de);break;case 4:r.vertexAttrib4fv(te.location,de);break;default:r.vertexAttrib1fv(te.location,de)}}}}f()})(v,y,_,x),T!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:m,resetDefaultState:p,dispose:function(){m();for(let v in n){let y=n[v];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[v]}},releaseStatesOfGeometry:function(v){if(n[v.id]===void 0)return;let y=n[v.id];for(let _ in y){let x=y[_];for(let T in x)c(x[T].object),delete x[T];delete y[_]}delete n[v.id]},releaseStatesOfProgram:function(v){for(let y in n){let _=n[y];if(_[v.id]===void 0)continue;let x=_[v.id];for(let T in x)c(x[T].object),delete x[T];delete _[v.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:f}}function Np(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Bp(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===ci||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let f=d===sr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Ci&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==li&&!f)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Fp(r){let e=this,t=null,n=0,i=!1,s=!1,a=new bi,o=new Pt,c={value:null,needsUpdate:!1};function l(h,u,d,f){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=c.value,f!==!0||m===null){let p=d+4*g,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==g;++y,_+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let f=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||f===null||f.length===0||s&&!m)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let v=s?0:n,y=4*v,_=p.clippingState||null;c.value=_,_=l(f,u,y,d);for(let x=0;x!==y;++x)_[x]=t[x];p.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}}}function Op(r){let e=new WeakMap;function t(i,s){return s===Go?i.mapping=fs:s===ko&&(i.mapping=Sr),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Go||s===ko){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new io(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Ju=[.125,.215,.35,.446,.526,.582],ma=20,Xc=new br,Ku=new lt,jc=null,qc=0,Yc=0,Zc=!1,Ir=(1+Math.sqrt(5))/2,ys=1/Ir,$u=[new w(-Ir,ys,0),new w(Ir,ys,0),new w(-ys,0,Ir),new w(ys,0,Ir),new w(0,Ir,-ys),new w(0,Ir,ys),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],zp=new w,ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=zp}=s;jc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=td(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jc,qc,Yc),this._renderer.xr.enabled=Zc,e.scissorTest=!1,Qo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:sr,format:ci,colorSpace:mr,depthBuffer:!1},i=Qu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qu(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Ju.length;for(let d=0;d<u;d++){let f=Math.pow(2,h);c.push(f);let g=1/f;d>a-4?g=Ju[d-a+4-1]:d===0&&(g=0),l.push(g);let m=1/(f-2),p=-m,v=1+m,y=[p,p,v,p,v,v,p,p,v,v,p,v],_=6,x=6,T=3,b=2,I=1,F=new Float32Array(T*x*_),U=new Float32Array(b*x*_),z=new Float32Array(I*x*_);for(let L=0;L<_;L++){let Z=L%3*2/3-1,H=L>2?0:-1,ie=[Z,H,0,Z+2/3,H,0,Z+2/3,H+1,0,Z,H,0,Z+2/3,H+1,0,Z,H+1,0];F.set(ie,T*x*L),U.set(y,b*x*L);let te=[L,L,L,L,L,L];z.set(te,I*x*L)}let R=new ut;R.setAttribute("position",new dn(F,T)),R.setAttribute("uv",new dn(U,b)),R.setAttribute("faceIndex",new dn(z,I)),o.push(R),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(ma),h=new w(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:ma,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:sh(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,Xc)}_sceneToCubeUV(e,t,n,i,s){let a=new tn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Ku),l.toneMapping=Hi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new Pn({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1}),f=new Ze(new et,d),g=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,g=!0):(d.color.copy(Ku),g=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,o[p],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[p],s.y,s.z)):v===1?(a.up.set(0,0,o[p]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[p],s.z)):(a.up.set(0,o[p],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[p]));let y=this._cubeSize;Qo(i,v*y,p>2?y:0,y,y),l.setRenderTarget(i),g&&l.render(f,a),l.render(e,a)}f.geometry.dispose(),f.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===fs||e.mapping===Sr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=td()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ed());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Ze(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Qo(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Xc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=$u[(i-s-1)%$u.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Ze(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,g=s/f,m=isFinite(s)?1+Math.floor(3*g):ma;m>ma&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);let p=[],v=0;for(let x=0;x<ma;++x){let T=x/g,b=Math.exp(-T*T/2);p.push(b),x===0?v+=b:x<m&&(v+=2*b)}for(let x=0;x<p.length;x++)p[x]=p[x]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=f,u.mipInt.value=y-n;let _=this._sizeLods[i];Qo(t,3*_*(i>y-4?i-y+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,Xc)}};function Qu(r,e,t){let n=new oi(r,e,t);return n.texture.mapping=ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function ed(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sh(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})}function td(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function sh(){return`

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
	`}function Gp(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Go||s===ko,o=s===fs||s===Sr;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new ar(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,f=6;for(let g=0;g<f;g++)u[g]!==void 0&&d++;return d===f})(h)?(t===null&&(t=new ar(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function kp(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Vp(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let m=h.array;d=h.version;for(let p=0,v=m.length;p<v;p+=3){let y=m[p+0],_=m[p+1],x=m[p+2];l.push(y,_,_,x,x,y)}}else{if(u===void 0)return;{let m=u.array;d=u.version;for(let p=0,v=m.length/3-1;p<v;p+=3){let y=p+0,_=p+1,x=p+2;l.push(y,_,_,x,x,y)}}}let f=new(Gc(l)?ks:vr)(l,1);f.version=d;let g=s.get(c);g&&e.remove(g),s.set(c,f)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Hp(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let f=0;f<l;f++)d+=c[f]*h[f];t.update(d,n,1)}}}function Wp(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Xp(r,e,t){let n=new WeakMap,i=new Yt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let F=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",F)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),f===!0&&(y=2),g===!0&&(y=3);let _=a.attributes.position.count*y,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*x*4*h),b=new zs(T,_,x,h);b.type=li,b.needsUpdate=!0;let I=4*y;for(let U=0;U<h;U++){let z=m[U],R=p[U],L=v[U],Z=_*x*4*U;for(let H=0;H<z.count;H++){let ie=H*I;d===!0&&(i.fromBufferAttribute(z,H),T[Z+ie+0]=i.x,T[Z+ie+1]=i.y,T[Z+ie+2]=i.z,T[Z+ie+3]=0),f===!0&&(i.fromBufferAttribute(R,H),T[Z+ie+4]=i.x,T[Z+ie+5]=i.y,T[Z+ie+6]=i.z,T[Z+ie+7]=0),g===!0&&(i.fromBufferAttribute(L,H),T[Z+ie+8]=i.x,T[Z+ie+9]=i.y,T[Z+ie+10]=i.z,T[Z+ie+11]=L.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new we(_,x)},n.set(a,u),a.addEventListener("dispose",F)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let g=0;g<c.length;g++)d+=c[g];let f=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",f),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function jp(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var xd=new Bn,nd=new Ys(1,1),Md=new zs,Td=new to,bd=new Vs,id=[],rd=[],sd=new Float32Array(16),ad=new Float32Array(9),od=new Float32Array(4);function xs(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=id[i];if(s===void 0&&(s=new Float32Array(i),id[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function wn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function En(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function tl(r,e){let t=rd[e];t===void 0&&(t=new Int32Array(e),rd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function qp(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Yp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wn(t,e))return;r.uniform2fv(this.addr,e),En(t,e)}}function Zp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wn(t,e))return;r.uniform3fv(this.addr,e),En(t,e)}}function Jp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wn(t,e))return;r.uniform4fv(this.addr,e),En(t,e)}}function Kp(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),En(t,e)}else{if(wn(t,n))return;od.set(n),r.uniformMatrix2fv(this.addr,!1,od),En(t,n)}}function $p(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),En(t,e)}else{if(wn(t,n))return;ad.set(n),r.uniformMatrix3fv(this.addr,!1,ad),En(t,n)}}function Qp(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),En(t,e)}else{if(wn(t,n))return;sd.set(n),r.uniformMatrix4fv(this.addr,!1,sd),En(t,n)}}function ef(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function tf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wn(t,e))return;r.uniform2iv(this.addr,e),En(t,e)}}function nf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wn(t,e))return;r.uniform3iv(this.addr,e),En(t,e)}}function rf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wn(t,e))return;r.uniform4iv(this.addr,e),En(t,e)}}function sf(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function af(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wn(t,e))return;r.uniform2uiv(this.addr,e),En(t,e)}}function of(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wn(t,e))return;r.uniform3uiv(this.addr,e),En(t,e)}}function lf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wn(t,e))return;r.uniform4uiv(this.addr,e),En(t,e)}}function cf(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(nd.compareFunction=Fc,s=nd):s=xd,t.setTexture2D(e||s,i)}function hf(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Td,i)}function uf(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||bd,i)}function df(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Md,i)}function pf(r,e){r.uniform1fv(this.addr,e)}function ff(r,e){let t=xs(e,this.size,2);r.uniform2fv(this.addr,t)}function mf(r,e){let t=xs(e,this.size,3);r.uniform3fv(this.addr,t)}function gf(r,e){let t=xs(e,this.size,4);r.uniform4fv(this.addr,t)}function vf(r,e){let t=xs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function yf(r,e){let t=xs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function _f(r,e){let t=xs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function xf(r,e){r.uniform1iv(this.addr,e)}function Mf(r,e){r.uniform2iv(this.addr,e)}function Tf(r,e){r.uniform3iv(this.addr,e)}function bf(r,e){r.uniform4iv(this.addr,e)}function Sf(r,e){r.uniform1uiv(this.addr,e)}function wf(r,e){r.uniform2uiv(this.addr,e)}function Ef(r,e){r.uniform3uiv(this.addr,e)}function Af(r,e){r.uniform4uiv(this.addr,e)}function Cf(r,e,t){let n=this.cache,i=e.length,s=tl(t,i);wn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||xd,s[a])}function Rf(r,e,t){let n=this.cache,i=e.length,s=tl(t,i);wn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Td,s[a])}function Pf(r,e,t){let n=this.cache,i=e.length,s=tl(t,i);wn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||bd,s[a])}function If(r,e,t){let n=this.cache,i=e.length,s=tl(t,i);wn(n,s)||(r.uniform1iv(this.addr,s),En(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Md,s[a])}var Kc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return qp;case 35664:return Yp;case 35665:return Zp;case 35666:return Jp;case 35674:return Kp;case 35675:return $p;case 35676:return Qp;case 5124:case 35670:return ef;case 35667:case 35671:return tf;case 35668:case 35672:return nf;case 35669:case 35673:return rf;case 5125:return sf;case 36294:return af;case 36295:return of;case 36296:return lf;case 35678:case 36198:case 36298:case 36306:case 35682:return cf;case 35679:case 36299:case 36307:return hf;case 35680:case 36300:case 36308:case 36293:return uf;case 36289:case 36303:case 36311:case 36292:return df}})(t.type)}},$c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return pf;case 35664:return ff;case 35665:return mf;case 35666:return gf;case 35674:return vf;case 35675:return yf;case 35676:return _f;case 5124:case 35670:return xf;case 35667:case 35671:return Mf;case 35668:case 35672:return Tf;case 35669:case 35673:return bf;case 5125:return Sf;case 36294:return wf;case 36295:return Ef;case 36296:return Af;case 35678:case 36198:case 36298:case 36306:case 35682:return Cf;case 35679:case 36299:case 36307:return Rf;case 35680:case 36300:case 36308:case 36293:return Pf;case 36289:case 36303:case 36311:case 36292:return If}})(t.type)}},Qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Jc=/(\w+)(\])?(\[|\.)?/g;function ld(r,e){r.seq.push(e),r.map[e.id]=e}function Lf(r,e,t){let n=r.name,i=n.length;for(Jc.lastIndex=0;;){let s=Jc.exec(n),a=Jc.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){ld(t,l===void 0?new Kc(o,r,e):new $c(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Qc(o),ld(t,h)),t=h}}}var _s=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Lf(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function cd(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Df=0,hd=new Pt;function ud(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let f=u;f<d;f++){let g=f+1;h.push(`${g===c?">":" "} ${g}: ${l[f]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Uf(r,e){let t=(function(n){jt._getMatrix(hd,jt.workingColorSpace,n);let i=`mat3( ${hd.elements.map(s=>s.toFixed(4))} )`;switch(jt.getTransfer(n)){case Bs:return[i,"LinearTransferOETF"];case Qt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Nf(r,e){let t;switch(e){case Tu:t="Linear";break;case bu:t="Reinhard";break;case Su:t="Cineon";break;case Zn:t="ACESFilmic";break;case Eu:t="AgX";break;case Au:t="Neutral";break;case wu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var el=new w;function Bf(){return jt.getLuminanceCoefficients(el),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${el.x.toFixed(4)}, ${el.y.toFixed(4)}, ${el.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ga(r){return r!==""}function dd(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ff=/^[ \t]*#include +<([\w\d./]+)>/gm;function eh(r){return r.replace(Ff,zf)}var Of=new Map;function zf(r,e){let t=Nt[e];if(t===void 0){let n=Of.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return eh(t)}var Gf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(r){return r.replace(Gf,kf)}function kf(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function md(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Vf(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(R){let L="SHADOWMAP_TYPE_BASIC";return R.shadowMapType===$l?L="SHADOWMAP_TYPE_PCF":R.shadowMapType===us?L="SHADOWMAP_TYPE_PCF_SOFT":R.shadowMapType===Ai&&(L="SHADOWMAP_TYPE_VSM"),L})(t),l=(function(R){let L="ENVMAP_TYPE_CUBE";if(R.envMap)switch(R.envMapMode){case fs:case Sr:L="ENVMAP_TYPE_CUBE";break;case ua:L="ENVMAP_TYPE_CUBE_UV"}return L})(t),h=(function(R){let L="ENVMAP_MODE_REFLECTION";return R.envMap&&R.envMapMode===Sr&&(L="ENVMAP_MODE_REFRACTION"),L})(t),u=(function(R){let L="ENVMAP_BLENDING_NONE";if(R.envMap)switch(R.combine){case _u:L="ENVMAP_BLENDING_MULTIPLY";break;case xu:L="ENVMAP_BLENDING_MIX";break;case Mu:L="ENVMAP_BLENDING_ADD"}return L})(t),d=(function(R){let L=R.envMapCubeUVHeight;if(L===null)return null;let Z=Math.log2(L)-2,H=1/L;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:H,maxMip:Z}})(t),f=(function(R){return[R.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",R.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)})(t),g=(function(R){let L=[];for(let Z in R){let H=R[Z];H!==!1&&L.push("#define "+Z+" "+H)}return L.join(`
`)})(s),m=i.createProgram(),p,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ga).join(`
`),p.length>0&&(p+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ga).join(`
`),v.length>0&&(v+=`
`)):(p=[md(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),v=[md(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?Nt.tonemapping_pars_fragment:"",t.toneMapping!==Hi?Nf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,Uf("linearToOutputTexel",t.outputColorSpace),Bf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ga).join(`
`)),a=eh(a),a=dd(a,t),a=pd(a,t),o=eh(o),o=dd(o,t),o=pd(o,t),a=fd(a),o=fd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["#define varying in",t.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let _=y+p+a,x=y+v+o,T=cd(i,i.VERTEX_SHADER,_),b=cd(i,i.FRAGMENT_SHADER,x);function I(R){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(m)||"",Z=i.getShaderInfoLog(T)||"",H=i.getShaderInfoLog(b)||"",ie=L.trim(),te=Z.trim(),K=H.trim(),de=!0,Le=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(de=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,b);else{let ze=ud(i,T,"vertex"),Se=ud(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+ie+`
`+ze+`
`+Se)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):te!==""&&K!==""||(Le=!1);Le&&(R.diagnostics={runnable:de,programLog:ie,vertexShader:{log:te,prefix:p},fragmentShader:{log:K,prefix:v}})}i.deleteShader(T),i.deleteShader(b),F=new _s(i,m),U=(function(L,Z){let H={},ie=L.getProgramParameter(Z,L.ACTIVE_ATTRIBUTES);for(let te=0;te<ie;te++){let K=L.getActiveAttrib(Z,te),de=K.name,Le=1;K.type===L.FLOAT_MAT2&&(Le=2),K.type===L.FLOAT_MAT3&&(Le=3),K.type===L.FLOAT_MAT4&&(Le=4),H[de]={type:K.type,location:L.getAttribLocation(Z,de),locationSize:Le}}return H})(i,m)}let F,U;i.attachShader(m,T),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),this.getUniforms=function(){return F===void 0&&I(this),F},this.getAttributes=function(){return U===void 0&&I(this),U};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=i.getProgramParameter(m,37297)),z},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Df++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=b,this}var Hf=0,th=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nh(e),t.set(e,n)),n}},nh=class{constructor(e){this.id=Hf++,this.code=e,this.usedTimes=0}};function Wf(r,e,t,n,i,s,a){let o=new Gs,c=new th,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(p){return l.add(p),p===0?"uv":`uv${p}`}return{getParameters:function(p,v,y,_,x){let T=_.fog,b=x.geometry,I=p.isMeshStandardMaterial?_.environment:null,F=(p.isMeshStandardMaterial?t:e).get(p.envMap||I),U=F&&F.mapping===ua?F.image.height:null,z=g[p.type];p.precision!==null&&(f=i.getMaxPrecision(p.precision),f!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",f,"instead."));let R=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,L=R!==void 0?R.length:0,Z,H,ie,te,K=0;if(b.morphAttributes.position!==void 0&&(K=1),b.morphAttributes.normal!==void 0&&(K=2),b.morphAttributes.color!==void 0&&(K=3),z){let Re=Ri[z];Z=Re.vertexShader,H=Re.fragmentShader}else Z=p.vertexShader,H=p.fragmentShader,c.update(p),ie=c.getVertexShaderID(p),te=c.getFragmentShaderID(p);let de=r.getRenderTarget(),Le=r.state.buffers.depth.getReversed(),ze=x.isInstancedMesh===!0,Se=x.isBatchedMesh===!0,Ee=!!p.map,ee=!!p.matcap,Te=!!F,be=!!p.aoMap,Y=!!p.lightMap,Ue=!!p.bumpMap,A=!!p.normalMap,P=!!p.displacementMap,X=!!p.emissiveMap,V=!!p.metalnessMap,S=!!p.roughnessMap,B=p.anisotropy>0,W=p.clearcoat>0,k=p.dispersion>0,ve=p.iridescence>0,ae=p.sheen>0,le=p.transmission>0,Ce=B&&!!p.anisotropyMap,We=W&&!!p.clearcoatMap,De=W&&!!p.clearcoatNormalMap,Xe=W&&!!p.clearcoatRoughnessMap,at=ve&&!!p.iridescenceMap,pt=ve&&!!p.iridescenceThicknessMap,Ct=ae&&!!p.sheenColorMap,Tt=ae&&!!p.sheenRoughnessMap,Ae=!!p.specularMap,D=!!p.specularColorMap,j=!!p.specularIntensityMap,Q=le&&!!p.transmissionMap,oe=le&&!!p.thicknessMap,q=!!p.gradientMap,J=!!p.alphaMap,re=p.alphaTest>0,ce=!!p.alphaHash,me=!!p.extensions,C=Hi;p.toneMapped&&(de!==null&&de.isXRRenderTarget!==!0||(C=r.toneMapping));let pe={shaderID:z,shaderType:p.type,shaderName:p.name,vertexShader:Z,fragmentShader:H,defines:p.defines,customVertexShaderID:ie,customFragmentShaderID:te,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:f,batching:Se,batchingColor:Se&&x._colorsTexture!==null,instancing:ze,instancingColor:ze&&x.instanceColor!==null,instancingMorph:ze&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:de===null?r.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:mr,alphaToCoverage:!!p.alphaToCoverage,map:Ee,matcap:ee,envMap:Te,envMapMode:Te&&F.mapping,envMapCubeUVHeight:U,aoMap:be,lightMap:Y,bumpMap:Ue,normalMap:A,displacementMap:d&&P,emissiveMap:X,normalMapObjectSpace:A&&p.normalMapType===Uu,normalMapTangentSpace:A&&p.normalMapType===Du,metalnessMap:V,roughnessMap:S,anisotropy:B,anisotropyMap:Ce,clearcoat:W,clearcoatMap:We,clearcoatNormalMap:De,clearcoatRoughnessMap:Xe,dispersion:k,iridescence:ve,iridescenceMap:at,iridescenceThicknessMap:pt,sheen:ae,sheenColorMap:Ct,sheenRoughnessMap:Tt,specularMap:Ae,specularColorMap:D,specularIntensityMap:j,transmission:le,transmissionMap:Q,thicknessMap:oe,gradientMap:q,opaque:p.transparent===!1&&p.blending===ca&&p.alphaToCoverage===!1,alphaMap:J,alphaTest:re,alphaHash:ce,combine:p.combine,mapUv:Ee&&m(p.map.channel),aoMapUv:be&&m(p.aoMap.channel),lightMapUv:Y&&m(p.lightMap.channel),bumpMapUv:Ue&&m(p.bumpMap.channel),normalMapUv:A&&m(p.normalMap.channel),displacementMapUv:P&&m(p.displacementMap.channel),emissiveMapUv:X&&m(p.emissiveMap.channel),metalnessMapUv:V&&m(p.metalnessMap.channel),roughnessMapUv:S&&m(p.roughnessMap.channel),anisotropyMapUv:Ce&&m(p.anisotropyMap.channel),clearcoatMapUv:We&&m(p.clearcoatMap.channel),clearcoatNormalMapUv:De&&m(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xe&&m(p.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&m(p.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&m(p.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&m(p.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&m(p.sheenRoughnessMap.channel),specularMapUv:Ae&&m(p.specularMap.channel),specularColorMapUv:D&&m(p.specularColorMap.channel),specularIntensityMapUv:j&&m(p.specularIntensityMap.channel),transmissionMapUv:Q&&m(p.transmissionMap.channel),thicknessMapUv:oe&&m(p.thicknessMap.channel),alphaMapUv:J&&m(p.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||B),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(Ee||J),fog:!!T,useFog:p.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:p.flatShading===!0&&p.wireframe===!1,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Le,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:K,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:p.dithering,shadowMapEnabled:r.shadowMap.enabled&&y.length>0,shadowMapType:r.shadowMap.type,toneMapping:C,decodeVideoTexture:Ee&&p.map.isVideoTexture===!0&&jt.getTransfer(p.map.colorSpace)===Qt,decodeVideoTextureEmissive:X&&p.emissiveMap.isVideoTexture===!0&&jt.getTransfer(p.emissiveMap.colorSpace)===Qt,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===Ot,flipSided:p.side===ni,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:me&&p.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&p.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return pe.vertexUv1s=l.has(1),pe.vertexUv2s=l.has(2),pe.vertexUv3s=l.has(3),l.clear(),pe},getProgramCacheKey:function(p){let v=[];if(p.shaderID?v.push(p.shaderID):(v.push(p.customVertexShaderID),v.push(p.customFragmentShaderID)),p.defines!==void 0)for(let y in p.defines)v.push(y),v.push(p.defines[y]);return p.isRawShaderMaterial===!1&&((function(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)})(v,p),(function(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)})(v,p),v.push(r.outputColorSpace)),v.push(p.customProgramCacheKey),v.join()},getUniforms:function(p){let v=g[p.type],y;if(v){let _=Ri[v];y=Xu.clone(_.uniforms)}else y=p.uniforms;return y},acquireProgram:function(p,v){let y;for(let _=0,x=h.length;_<x;_++){let T=h[_];if(T.cacheKey===v){y=T,++y.usedTimes;break}}return y===void 0&&(y=new Vf(r,v,p,s),h.push(y)),y},releaseProgram:function(p){if(--p.usedTimes===0){let v=h.indexOf(p);h[v]=h[h.length-1],h.pop(),p.destroy()}},releaseShaderCache:function(p){c.remove(p)},programs:h,dispose:function(){c.dispose()}}}function Xf(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function jf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function gd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function vd(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||jf),n.length>1&&n.sort(o||gd),i.length>1&&i.sort(o||gd)}}}function qf(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new vd,r.set(e,[i])):t>=n.length?(i=new vd,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Yf(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new lt};break;case"SpotLight":t={position:new w,direction:new w,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var Zf=0;function Jf(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Kf(r){let e=new Yf,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new dt,a=new dt;return{setup:function(o){let c=0,l=0,h=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let u=0,d=0,f=0,g=0,m=0,p=0,v=0,y=0,_=0,x=0,T=0;o.sort(Jf);for(let I=0,F=o.length;I<F;I++){let U=o[I],z=U.color,R=U.intensity,L=U.distance,Z=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)c+=z.r*R,l+=z.g*R,h+=z.b*R;else if(U.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(U.sh.coefficients[H],R);T++}else if(U.isDirectionalLight){let H=e.get(U);if(H.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ie=U.shadow,te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,n.directionalShadow[u]=te,n.directionalShadowMap[u]=Z,n.directionalShadowMatrix[u]=U.shadow.matrix,p++}n.directional[u]=H,u++}else if(U.isSpotLight){let H=e.get(U);H.position.setFromMatrixPosition(U.matrixWorld),H.color.copy(z).multiplyScalar(R),H.distance=L,H.coneCos=Math.cos(U.angle),H.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),H.decay=U.decay,n.spot[f]=H;let ie=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,ie.updateMatrices(U),U.castShadow&&x++),n.spotLightMatrix[f]=ie.matrix,U.castShadow){let te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,n.spotShadow[f]=te,n.spotShadowMap[f]=Z,y++}f++}else if(U.isRectAreaLight){let H=e.get(U);H.color.copy(z).multiplyScalar(R),H.halfWidth.set(.5*U.width,0,0),H.halfHeight.set(0,.5*U.height,0),n.rectArea[g]=H,g++}else if(U.isPointLight){let H=e.get(U);if(H.color.copy(U.color).multiplyScalar(U.intensity),H.distance=U.distance,H.decay=U.decay,U.castShadow){let ie=U.shadow,te=t.get(U);te.shadowIntensity=ie.intensity,te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,te.shadowCameraNear=ie.camera.near,te.shadowCameraFar=ie.camera.far,n.pointShadow[d]=te,n.pointShadowMap[d]=Z,n.pointShadowMatrix[d]=U.shadow.matrix,v++}n.point[d]=H,d++}else if(U.isHemisphereLight){let H=e.get(U);H.skyColor.copy(U.color).multiplyScalar(R),H.groundColor.copy(U.groundColor).multiplyScalar(R),n.hemi[m]=H,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=qe.LTC_FLOAT_1,n.rectAreaLTC2=qe.LTC_FLOAT_2):(n.rectAreaLTC1=qe.LTC_HALF_1,n.rectAreaLTC2=qe.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===f&&b.rectAreaLength===g&&b.hemiLength===m&&b.numDirectionalShadows===p&&b.numPointShadows===v&&b.numSpotShadows===y&&b.numSpotMaps===_&&b.numLightProbes===T||(n.directional.length=u,n.spot.length=f,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=p,n.directionalShadowMap.length=p,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=p,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=T,b.directionalLength=u,b.pointLength=d,b.spotLength=f,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=p,b.numPointShadows=v,b.numSpotShadows=y,b.numSpotMaps=_,b.numLightProbes=T,n.version=Zf++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,f=0,g=c.matrixWorldInverse;for(let m=0,p=o.length;m<p;m++){let v=o[m];if(v.isDirectionalLight){let y=n.directional[l];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),l++}else if(v.isSpotLight){let y=n.spot[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(v.isRectAreaLight){let y=n.rectArea[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(v.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(.5*v.width,0,0),y.halfHeight.set(0,.5*v.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),d++}else if(v.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){let y=n.hemi[f];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),f++}}},state:n}}function yd(r){let e=new Kf(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function $f(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new yd(r),e.set(t,[s])):n>=i.length?(s=new yd(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Qf(r,e,t){let n=new tr,i=new we,s=new we,a=new Yt,o=new ir({depthPacking:vs}),c=new To,l={},h=t.maxTextureSize,u={[ds]:ni,[ni]:ds,[Ot]:Ot},d=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:`void main() {
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
}`}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ut;g.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new Ze(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$l;let v=this.type;function y(b,I){let F=e.update(m);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new oi(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(I,null,F,d,m,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(I,null,F,f,m,null)}function _(b,I,F,U){let z=null,R=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)z=R;else if(z=F.isPointLight===!0?c:o,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let L=z.uuid,Z=I.uuid,H=l[L];H===void 0&&(H={},l[L]=H);let ie=H[Z];ie===void 0&&(ie=z.clone(),H[Z]=ie,I.addEventListener("dispose",T)),z=ie}return z.visible=I.visible,z.wireframe=I.wireframe,z.side=U===Ai?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:u[I.side],z.alphaMap=I.alphaMap,z.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,z.map=I.map,z.clipShadows=I.clipShadows,z.clippingPlanes=I.clippingPlanes,z.clipIntersection=I.clipIntersection,z.displacementMap=I.displacementMap,z.displacementScale=I.displacementScale,z.displacementBias=I.displacementBias,z.wireframeLinewidth=I.wireframeLinewidth,z.linewidth=I.linewidth,F.isPointLight===!0&&z.isMeshDistanceMaterial===!0&&(r.properties.get(z).light=F),z}function x(b,I,F,U,z){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&z===Ai)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);let L=e.update(b),Z=b.material;if(Array.isArray(Z)){let H=L.groups;for(let ie=0,te=H.length;ie<te;ie++){let K=H[ie],de=Z[K.materialIndex];if(de&&de.visible){let Le=_(b,de,U,z);b.onBeforeShadow(r,b,I,F,L,Le,K),r.renderBufferDirect(F,null,L,Le,b,K),b.onAfterShadow(r,b,I,F,L,Le,K)}}}else if(Z.visible){let H=_(b,Z,U,z);b.onBeforeShadow(r,b,I,F,L,H,null),r.renderBufferDirect(F,null,L,H,b,null),b.onAfterShadow(r,b,I,F,L,H,null)}}let R=b.children;for(let L=0,Z=R.length;L<Z;L++)x(R[L],I,F,U,z)}function T(b){b.target.removeEventListener("dispose",T);for(let I in l){let F=l[I],U=b.target.uuid;U in F&&(F[U].dispose(),delete F[U])}}this.render=function(b,I,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;let U=r.getRenderTarget(),z=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),L=r.state;L.setBlending(rr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let Z=v!==Ai&&this.type===Ai,H=v===Ai&&this.type!==Ai;for(let ie=0,te=b.length;ie<te;ie++){let K=b[ie],de=K.shadow;if(de===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(de.autoUpdate===!1&&de.needsUpdate===!1)continue;i.copy(de.mapSize);let Le=de.getFrameExtents();if(i.multiply(Le),s.copy(de.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Le.x),i.x=s.x*Le.x,de.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Le.y),i.y=s.y*Le.y,de.mapSize.y=s.y)),de.map===null||Z===!0||H===!0){let Se=this.type!==Ai?{minFilter:wi,magFilter:wi}:{};de.map!==null&&de.map.dispose(),de.map=new oi(i.x,i.y,Se),de.map.texture.name=K.name+".shadowMap",de.camera.updateProjectionMatrix()}r.setRenderTarget(de.map),r.clear();let ze=de.getViewportCount();for(let Se=0;Se<ze;Se++){let Ee=de.getViewport(Se);a.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),L.viewport(a),de.updateMatrices(K,Se),n=de.getFrustum(),x(I,F,de.camera,K,this.type)}de.isPointLightShadow!==!0&&this.type===Ai&&y(de,F),de.needsUpdate=!1}v=this.type,p.needsUpdate=!1,r.setRenderTarget(U,z,R)}}var em={[Do]:Uo,[No]:Oo,[Bo]:zo,[ha]:Fo,[Uo]:Do,[Oo]:No,[zo]:Bo,[Fo]:ha};function tm(r,e){let t=new function(){let S=!1,B=new Yt,W=null,k=new Yt(0,0,0,0);return{setMask:function(ve){W===ve||S||(r.colorMask(ve,ve,ve,ve),W=ve)},setLocked:function(ve){S=ve},setClear:function(ve,ae,le,Ce,We){We===!0&&(ve*=Ce,ae*=Ce,le*=Ce),B.set(ve,ae,le,Ce),k.equals(B)===!1&&(r.clearColor(ve,ae,le,Ce),k.copy(B))},reset:function(){S=!1,W=null,k.set(-1,0,0,0)}}},n=new function(){let S=!1,B=!1,W=null,k=null,ve=null;return{setReversed:function(ae){if(B!==ae){let le=e.get("EXT_clip_control");ae?le.clipControlEXT(le.LOWER_LEFT_EXT,le.ZERO_TO_ONE_EXT):le.clipControlEXT(le.LOWER_LEFT_EXT,le.NEGATIVE_ONE_TO_ONE_EXT),B=ae;let Ce=ve;ve=null,this.setClear(Ce)}},getReversed:function(){return B},setTest:function(ae){ae?Te(r.DEPTH_TEST):be(r.DEPTH_TEST)},setMask:function(ae){W===ae||S||(r.depthMask(ae),W=ae)},setFunc:function(ae){if(B&&(ae=em[ae]),k!==ae){switch(ae){case Do:r.depthFunc(r.NEVER);break;case Uo:r.depthFunc(r.ALWAYS);break;case No:r.depthFunc(r.LESS);break;case ha:r.depthFunc(r.LEQUAL);break;case Bo:r.depthFunc(r.EQUAL);break;case Fo:r.depthFunc(r.GEQUAL);break;case Oo:r.depthFunc(r.GREATER);break;case zo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}k=ae}},setLocked:function(ae){S=ae},setClear:function(ae){ve!==ae&&(B&&(ae=1-ae),r.clearDepth(ae),ve=ae)},reset:function(){S=!1,W=null,k=null,ve=null,B=!1}}},i=new function(){let S=!1,B=null,W=null,k=null,ve=null,ae=null,le=null,Ce=null,We=null;return{setTest:function(De){S||(De?Te(r.STENCIL_TEST):be(r.STENCIL_TEST))},setMask:function(De){B===De||S||(r.stencilMask(De),B=De)},setFunc:function(De,Xe,at){W===De&&k===Xe&&ve===at||(r.stencilFunc(De,Xe,at),W=De,k=Xe,ve=at)},setOp:function(De,Xe,at){ae===De&&le===Xe&&Ce===at||(r.stencilOp(De,Xe,at),ae=De,le=Xe,Ce=at)},setLocked:function(De){S=De},setClear:function(De){We!==De&&(r.clearStencil(De),We=De)},reset:function(){S=!1,B=null,W=null,k=null,ve=null,ae=null,le=null,Ce=null,We=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,f=null,g=null,m=null,p=null,v=null,y=null,_=null,x=new lt(0,0,0),T=0,b=!1,I=null,F=null,U=null,z=null,R=null,L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,H=0,ie=r.getParameter(r.VERSION);ie.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(ie)[1]),Z=H>=1):ie.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),Z=H>=2);let te=null,K={},de=r.getParameter(r.SCISSOR_BOX),Le=r.getParameter(r.VIEWPORT),ze=new Yt().fromArray(de),Se=new Yt().fromArray(Le);function Ee(S,B,W,k){let ve=new Uint8Array(4),ae=r.createTexture();r.bindTexture(S,ae),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let le=0;le<W;le++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(B,0,r.RGBA,1,1,k,0,r.RGBA,r.UNSIGNED_BYTE,ve):r.texImage2D(B+le,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ve);return ae}let ee={};function Te(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function be(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}ee[r.TEXTURE_2D]=Ee(r.TEXTURE_2D,r.TEXTURE_2D,1),ee[r.TEXTURE_CUBE_MAP]=Ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[r.TEXTURE_2D_ARRAY]=Ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ee[r.TEXTURE_3D]=Ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Te(r.DEPTH_TEST),n.setFunc(ha),P(!1),X(Kl),Te(r.CULL_FACE),A(rr);let Y={[ps]:r.FUNC_ADD,[eu]:r.FUNC_SUBTRACT,[tu]:r.FUNC_REVERSE_SUBTRACT};Y[nu]=r.MIN,Y[iu]=r.MAX;let Ue={[ru]:r.ZERO,[su]:r.ONE,[au]:r.SRC_COLOR,[lu]:r.SRC_ALPHA,[fu]:r.SRC_ALPHA_SATURATE,[du]:r.DST_COLOR,[hu]:r.DST_ALPHA,[ou]:r.ONE_MINUS_SRC_COLOR,[cu]:r.ONE_MINUS_SRC_ALPHA,[pu]:r.ONE_MINUS_DST_COLOR,[uu]:r.ONE_MINUS_DST_ALPHA,[mu]:r.CONSTANT_COLOR,[gu]:r.ONE_MINUS_CONSTANT_COLOR,[vu]:r.CONSTANT_ALPHA,[yu]:r.ONE_MINUS_CONSTANT_ALPHA};function A(S,B,W,k,ve,ae,le,Ce,We,De){if(S!==rr){if(d===!1&&(Te(r.BLEND),d=!0),S===Qh)ve=ve||B,ae=ae||W,le=le||k,B===g&&ve===v||(r.blendEquationSeparate(Y[B],Y[ve]),g=B,v=ve),W===m&&k===p&&ae===y&&le===_||(r.blendFuncSeparate(Ue[W],Ue[k],Ue[ae],Ue[le]),m=W,p=k,y=ae,_=le),Ce.equals(x)!==!1&&We===T||(r.blendColor(Ce.r,Ce.g,Ce.b,We),x.copy(Ce),T=We),f=S,b=!1;else if(S!==f||De!==b){if(g===ps&&v===ps||(r.blendEquation(r.FUNC_ADD),g=ps,v=ps),De)switch(S){case ca:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ql:r.blendFunc(r.ONE,r.ONE);break;case ec:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case ca:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ql:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ec:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}m=null,p=null,y=null,_=null,x.set(0,0,0),T=0,f=S,b=De}}else d===!0&&(be(r.BLEND),d=!1)}function P(S){I!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),I=S)}function X(S){S!==Kh?(Te(r.CULL_FACE),S!==F&&(S===Kl?r.cullFace(r.BACK):S===$h?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):be(r.CULL_FACE),F=S}function V(S,B,W){S?(Te(r.POLYGON_OFFSET_FILL),z===B&&R===W||(r.polygonOffset(B,W),z=B,R=W)):be(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Te,disable:be,bindFramebuffer:function(S,B){return c[S]!==B&&(r.bindFramebuffer(S,B),c[S]=B,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=B),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=B),!0)},drawBuffers:function(S,B){let W=h,k=!1;if(S){W=l.get(B),W===void 0&&(W=[],l.set(B,W));let ve=S.textures;if(W.length!==ve.length||W[0]!==r.COLOR_ATTACHMENT0){for(let ae=0,le=ve.length;ae<le;ae++)W[ae]=r.COLOR_ATTACHMENT0+ae;W.length=ve.length,k=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,k=!0);k&&r.drawBuffers(W)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:A,setMaterial:function(S,B){S.side===Ot?be(r.CULL_FACE):Te(r.CULL_FACE);let W=S.side===ni;B&&(W=!W),P(W),S.blending===ca&&S.transparent===!1?A(rr):A(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let k=S.stencilWrite;i.setTest(k),k&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),V(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Te(r.SAMPLE_ALPHA_TO_COVERAGE):be(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:P,setCullFace:X,setLineWidth:function(S){S!==U&&(Z&&r.lineWidth(S),U=S)},setPolygonOffset:V,setScissorTest:function(S){S?Te(r.SCISSOR_TEST):be(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+L-1),te!==S&&(r.activeTexture(S),te=S)},bindTexture:function(S,B,W){W===void 0&&(W=te===null?r.TEXTURE0+L-1:te);let k=K[W];k===void 0&&(k={type:void 0,texture:void 0},K[W]=k),k.type===S&&k.texture===B||(te!==W&&(r.activeTexture(W),te=W),r.bindTexture(S,B||ee[S]),k.type=S,k.texture=B)},unbindTexture:function(){let S=K[te];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,B){let W=a.get(B);W===void 0&&(W=new WeakMap,a.set(B,W));let k=W.get(S);k===void 0&&(k=r.getUniformBlockIndex(B,S.name),W.set(S,k))},uniformBlockBinding:function(S,B){let W=a.get(B).get(S);s.get(B)!==W&&(r.uniformBlockBinding(B,W,S.__bindingPointIndex),s.set(B,W))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){ze.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),ze.copy(S))},viewport:function(S){Se.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),Se.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},te=null,K={},c={},l=new WeakMap,h=[],u=null,d=!1,f=null,g=null,m=null,p=null,v=null,y=null,_=null,x=new lt(0,0,0),T=0,b=!1,I=null,F=null,U=null,z=null,R=null,ze.set(0,0,r.canvas.width,r.canvas.height),Se.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function nm(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,P){return f?new OffscreenCanvas(A,P):Qr("canvas")}function m(A,P,X){let V=1,S=Ue(A);if((S.width>X||S.height>X)&&(V=X/Math.max(S.width,S.height)),V<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let B=Math.floor(V*S.width),W=Math.floor(V*S.height);u===void 0&&(u=g(B,W));let k=P?g(B,W):u;return k.width=B,k.height=W,k.getContext("2d").drawImage(A,0,0,B,W),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+B+"x"+W+")."),k}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),A}return A}function p(A){return A.generateMipmaps}function v(A){r.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,P,X,V,S=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let B=P;if(P===r.RED&&(X===r.FLOAT&&(B=r.R32F),X===r.HALF_FLOAT&&(B=r.R16F),X===r.UNSIGNED_BYTE&&(B=r.R8)),P===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(B=r.R8UI),X===r.UNSIGNED_SHORT&&(B=r.R16UI),X===r.UNSIGNED_INT&&(B=r.R32UI),X===r.BYTE&&(B=r.R8I),X===r.SHORT&&(B=r.R16I),X===r.INT&&(B=r.R32I)),P===r.RG&&(X===r.FLOAT&&(B=r.RG32F),X===r.HALF_FLOAT&&(B=r.RG16F),X===r.UNSIGNED_BYTE&&(B=r.RG8)),P===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(B=r.RG8UI),X===r.UNSIGNED_SHORT&&(B=r.RG16UI),X===r.UNSIGNED_INT&&(B=r.RG32UI),X===r.BYTE&&(B=r.RG8I),X===r.SHORT&&(B=r.RG16I),X===r.INT&&(B=r.RG32I)),P===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(B=r.RGB8UI),X===r.UNSIGNED_SHORT&&(B=r.RGB16UI),X===r.UNSIGNED_INT&&(B=r.RGB32UI),X===r.BYTE&&(B=r.RGB8I),X===r.SHORT&&(B=r.RGB16I),X===r.INT&&(B=r.RGB32I)),P===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(B=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(B=r.RGBA16UI),X===r.UNSIGNED_INT&&(B=r.RGBA32UI),X===r.BYTE&&(B=r.RGBA8I),X===r.SHORT&&(B=r.RGBA16I),X===r.INT&&(B=r.RGBA32I)),P===r.RGB&&(X===r.UNSIGNED_INT_5_9_9_9_REV&&(B=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(B=r.R11F_G11F_B10F)),P===r.RGBA){let W=S?Bs:jt.getTransfer(V);X===r.FLOAT&&(B=r.RGBA32F),X===r.HALF_FLOAT&&(B=r.RGBA16F),X===r.UNSIGNED_BYTE&&(B=W===Qt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(B=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(B=r.RGB5_A1)}return B!==r.R16F&&B!==r.R32F&&B!==r.RG16F&&B!==r.RG32F&&B!==r.RGBA16F&&B!==r.RGBA32F||e.get("EXT_color_buffer_float"),B}function x(A,P){let X;return A?P===null||P===wr||P===gs?X=r.DEPTH24_STENCIL8:P===li?X=r.DEPTH32F_STENCIL8:P===ms&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===wr||P===gs?X=r.DEPTH_COMPONENT24:P===li?X=r.DEPTH_COMPONENT32F:P===ms&&(X=r.DEPTH_COMPONENT16),X}function T(A,P){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==wi&&A.minFilter!==qn?Math.log2(Math.max(P.width,P.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?P.mipmaps.length:1}function b(A){let P=A.target;P.removeEventListener("dispose",b),(function(X){let V=n.get(X);if(V.__webglInit===void 0)return;let S=X.source,B=d.get(S);if(B){let W=B[V.__cacheKey];W.usedTimes--,W.usedTimes===0&&F(X),Object.keys(B).length===0&&d.delete(S)}n.remove(X)})(P),P.isVideoTexture&&h.delete(P)}function I(A){let P=A.target;P.removeEventListener("dispose",I),(function(X){let V=n.get(X);if(X.depthTexture&&(X.depthTexture.dispose(),n.remove(X.depthTexture)),X.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(V.__webglFramebuffer[B]))for(let W=0;W<V.__webglFramebuffer[B].length;W++)r.deleteFramebuffer(V.__webglFramebuffer[B][W]);else r.deleteFramebuffer(V.__webglFramebuffer[B]);V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer[B])}else{if(Array.isArray(V.__webglFramebuffer))for(let B=0;B<V.__webglFramebuffer.length;B++)r.deleteFramebuffer(V.__webglFramebuffer[B]);else r.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&r.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let B=0;B<V.__webglColorRenderbuffer.length;B++)V.__webglColorRenderbuffer[B]&&r.deleteRenderbuffer(V.__webglColorRenderbuffer[B]);V.__webglDepthRenderbuffer&&r.deleteRenderbuffer(V.__webglDepthRenderbuffer)}let S=X.textures;for(let B=0,W=S.length;B<W;B++){let k=n.get(S[B]);k.__webglTexture&&(r.deleteTexture(k.__webglTexture),a.memory.textures--),n.remove(S[B])}n.remove(X)})(P)}function F(A){let P=n.get(A);r.deleteTexture(P.__webglTexture);let X=A.source;delete d.get(X)[P.__cacheKey],a.memory.textures--}let U=0;function z(A,P){let X=n.get(A);if(A.isVideoTexture&&(function(V){let S=a.render.frame;h.get(V)!==S&&(h.set(V,S),V.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){let V=A.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(V.complete!==!1)return void K(X,A,P);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+P)}let R={[Rn]:r.REPEAT,[$r]:r.CLAMP_TO_EDGE,[Ka]:r.MIRRORED_REPEAT},L={[wi]:r.NEAREST,[Ru]:r.NEAREST_MIPMAP_NEAREST,[da]:r.NEAREST_MIPMAP_LINEAR,[qn]:r.LINEAR,[Vo]:r.LINEAR_MIPMAP_NEAREST,[yi]:r.LINEAR_MIPMAP_LINEAR},Z={[Nu]:r.NEVER,[ku]:r.ALWAYS,[Bu]:r.LESS,[Fc]:r.LEQUAL,[Fu]:r.EQUAL,[Gu]:r.GEQUAL,[Ou]:r.GREATER,[zu]:r.NOTEQUAL};function H(A,P){if(P.type!==li||e.has("OES_texture_float_linear")!==!1||P.magFilter!==qn&&P.magFilter!==Vo&&P.magFilter!==da&&P.magFilter!==yi&&P.minFilter!==qn&&P.minFilter!==Vo&&P.minFilter!==da&&P.minFilter!==yi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,R[P.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,R[P.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,R[P.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,L[P.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,L[P.minFilter]),P.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,Z[P.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===wi||P.minFilter!==da&&P.minFilter!==yi||P.type===li&&e.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,i.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function ie(A,P){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,P.addEventListener("dispose",b));let V=P.source,S=d.get(V);S===void 0&&(S={},d.set(V,S));let B=(function(W){let k=[];return k.push(W.wrapS),k.push(W.wrapT),k.push(W.wrapR||0),k.push(W.magFilter),k.push(W.minFilter),k.push(W.anisotropy),k.push(W.internalFormat),k.push(W.format),k.push(W.type),k.push(W.generateMipmaps),k.push(W.premultiplyAlpha),k.push(W.flipY),k.push(W.unpackAlignment),k.push(W.colorSpace),k.join()})(P);if(B!==A.__cacheKey){S[B]===void 0&&(S[B]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),S[B].usedTimes++;let W=S[A.__cacheKey];W!==void 0&&(S[A.__cacheKey].usedTimes--,W.usedTimes===0&&F(P)),A.__cacheKey=B,A.__webglTexture=S[B].texture}return X}function te(A,P,X){return Math.floor(Math.floor(A/X)/P)}function K(A,P,X){let V=r.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(V=r.TEXTURE_2D_ARRAY),P.isData3DTexture&&(V=r.TEXTURE_3D);let S=ie(A,P),B=P.source;t.bindTexture(V,A.__webglTexture,r.TEXTURE0+X);let W=n.get(B);if(B.version!==W.__version||S===!0){t.activeTexture(r.TEXTURE0+X);let k=jt.getPrimaries(jt.workingColorSpace),ve=P.colorSpace===Er?null:jt.getPrimaries(P.colorSpace),ae=P.colorSpace===Er||k===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,P.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,P.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let le=m(P.image,!1,i.maxTextureSize);le=Y(P,le);let Ce=s.convert(P.format,P.colorSpace),We=s.convert(P.type),De,Xe=_(P.internalFormat,Ce,We,P.colorSpace,P.isVideoTexture);H(V,P);let at=P.mipmaps,pt=P.isVideoTexture!==!0,Ct=W.__version===void 0||S===!0,Tt=B.dataReady,Ae=T(P,le);if(P.isDepthTexture)Xe=x(P.format===fa,P.type),Ct&&(pt?t.texStorage2D(r.TEXTURE_2D,1,Xe,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Xe,le.width,le.height,0,Ce,We,null));else if(P.isDataTexture)if(at.length>0){pt&&Ct&&t.texStorage2D(r.TEXTURE_2D,Ae,Xe,at[0].width,at[0].height);for(let D=0,j=at.length;D<j;D++)De=at[D],pt?Tt&&t.texSubImage2D(r.TEXTURE_2D,D,0,0,De.width,De.height,Ce,We,De.data):t.texImage2D(r.TEXTURE_2D,D,Xe,De.width,De.height,0,Ce,We,De.data);P.generateMipmaps=!1}else pt?(Ct&&t.texStorage2D(r.TEXTURE_2D,Ae,Xe,le.width,le.height),Tt&&(function(D,j,Q,oe){let q=D.updateRanges;if(q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,j.width,j.height,Q,oe,j.data);else{q.sort((C,pe)=>C.start-pe.start);let J=0;for(let C=1;C<q.length;C++){let pe=q[J],Re=q[C],ye=pe.start+pe.count,Ge=te(Re.start,j.width,4),rt=te(pe.start,j.width,4);Re.start<=ye+1&&Ge===rt&&te(Re.start+Re.count-1,j.width,4)===Ge?pe.count=Math.max(pe.count,Re.start+Re.count-pe.start):(++J,q[J]=Re)}q.length=J+1;let re=r.getParameter(r.UNPACK_ROW_LENGTH),ce=r.getParameter(r.UNPACK_SKIP_PIXELS),me=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,j.width);for(let C=0,pe=q.length;C<pe;C++){let Re=q[C],ye=Math.floor(Re.start/4),Ge=Math.ceil(Re.count/4),rt=ye%j.width,Oe=Math.floor(ye/j.width),ft=Ge;r.pixelStorei(r.UNPACK_SKIP_PIXELS,rt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Oe),t.texSubImage2D(r.TEXTURE_2D,0,rt,Oe,ft,1,Q,oe,j.data)}D.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,re),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ce),r.pixelStorei(r.UNPACK_SKIP_ROWS,me)}})(P,le,Ce,We)):t.texImage2D(r.TEXTURE_2D,0,Xe,le.width,le.height,0,Ce,We,le.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){pt&&Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,Xe,at[0].width,at[0].height,le.depth);for(let D=0,j=at.length;D<j;D++)if(De=at[D],P.format!==ci)if(Ce!==null)if(pt){if(Tt)if(P.layerUpdates.size>0){let Q=Wc(De.width,De.height,P.format,P.type);for(let oe of P.layerUpdates){let q=De.data.subarray(oe*Q/De.data.BYTES_PER_ELEMENT,(oe+1)*Q/De.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,D,0,0,oe,De.width,De.height,1,Ce,q)}P.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,D,0,0,0,De.width,De.height,le.depth,Ce,De.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,D,Xe,De.width,De.height,le.depth,0,De.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pt?Tt&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,D,0,0,0,De.width,De.height,le.depth,Ce,We,De.data):t.texImage3D(r.TEXTURE_2D_ARRAY,D,Xe,De.width,De.height,le.depth,0,Ce,We,De.data)}else{pt&&Ct&&t.texStorage2D(r.TEXTURE_2D,Ae,Xe,at[0].width,at[0].height);for(let D=0,j=at.length;D<j;D++)De=at[D],P.format!==ci?Ce!==null?pt?Tt&&t.compressedTexSubImage2D(r.TEXTURE_2D,D,0,0,De.width,De.height,Ce,De.data):t.compressedTexImage2D(r.TEXTURE_2D,D,Xe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?Tt&&t.texSubImage2D(r.TEXTURE_2D,D,0,0,De.width,De.height,Ce,We,De.data):t.texImage2D(r.TEXTURE_2D,D,Xe,De.width,De.height,0,Ce,We,De.data)}else if(P.isDataArrayTexture)if(pt){if(Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,Xe,le.width,le.height,le.depth),Tt)if(P.layerUpdates.size>0){let D=Wc(le.width,le.height,P.format,P.type);for(let j of P.layerUpdates){let Q=le.data.subarray(j*D/le.data.BYTES_PER_ELEMENT,(j+1)*D/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,j,le.width,le.height,1,Ce,We,Q)}P.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ce,We,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Xe,le.width,le.height,le.depth,0,Ce,We,le.data);else if(P.isData3DTexture)pt?(Ct&&t.texStorage3D(r.TEXTURE_3D,Ae,Xe,le.width,le.height,le.depth),Tt&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ce,We,le.data)):t.texImage3D(r.TEXTURE_3D,0,Xe,le.width,le.height,le.depth,0,Ce,We,le.data);else if(P.isFramebufferTexture){if(Ct)if(pt)t.texStorage2D(r.TEXTURE_2D,Ae,Xe,le.width,le.height);else{let D=le.width,j=le.height;for(let Q=0;Q<Ae;Q++)t.texImage2D(r.TEXTURE_2D,Q,Xe,D,j,0,Ce,We,null),D>>=1,j>>=1}}else if(at.length>0){if(pt&&Ct){let D=Ue(at[0]);t.texStorage2D(r.TEXTURE_2D,Ae,Xe,D.width,D.height)}for(let D=0,j=at.length;D<j;D++)De=at[D],pt?Tt&&t.texSubImage2D(r.TEXTURE_2D,D,0,0,Ce,We,De):t.texImage2D(r.TEXTURE_2D,D,Xe,Ce,We,De);P.generateMipmaps=!1}else if(pt){if(Ct){let D=Ue(le);t.texStorage2D(r.TEXTURE_2D,Ae,Xe,D.width,D.height)}Tt&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ce,We,le)}else t.texImage2D(r.TEXTURE_2D,0,Xe,Ce,We,le);p(P)&&v(V),W.__version=B.version,P.onUpdate&&P.onUpdate(P)}A.__version=P.version}function de(A,P,X,V,S,B){let W=s.convert(X.format,X.colorSpace),k=s.convert(X.type),ve=_(X.internalFormat,W,k,X.colorSpace),ae=n.get(P),le=n.get(X);if(le.__renderTarget=P,!ae.__hasExternalTextures){let Ce=Math.max(1,P.width>>B),We=Math.max(1,P.height>>B);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,B,ve,Ce,We,P.depth,0,W,k,null):t.texImage2D(S,B,ve,Ce,We,0,W,k,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),be(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,V,S,le.__webglTexture,0,Te(P)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,V,S,le.__webglTexture,B),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Le(A,P,X){if(r.bindRenderbuffer(r.RENDERBUFFER,A),P.depthBuffer){let V=P.depthTexture,S=V&&V.isDepthTexture?V.type:null,B=x(P.stencilBuffer,S),W=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=Te(P);be(P)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,k,B,P.width,P.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,k,B,P.width,P.height):r.renderbufferStorage(r.RENDERBUFFER,B,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,W,r.RENDERBUFFER,A)}else{let V=P.textures;for(let S=0;S<V.length;S++){let B=V[S],W=s.convert(B.format,B.colorSpace),k=s.convert(B.type),ve=_(B.internalFormat,W,k,B.colorSpace),ae=Te(P);X&&be(P)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,ve,P.width,P.height):be(P)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,ve,P.width,P.height):r.renderbufferStorage(r.RENDERBUFFER,ve,P.width,P.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ze(A,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!P.depthTexture||!P.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(P.depthTexture);X.__renderTarget=P,X.__webglTexture&&P.depthTexture.image.width===P.width&&P.depthTexture.image.height===P.height||(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),z(P.depthTexture,0);let V=X.__webglTexture,S=Te(P);if(P.depthTexture.format===pa)be(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,V,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,V,0);else{if(P.depthTexture.format!==fa)throw new Error("Unknown depthTexture format");be(P)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,V,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,V,0)}}function Se(A){let P=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==A.depthTexture){let V=A.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),V){let S=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,V.removeEventListener("dispose",S)};V.addEventListener("dispose",S),P.__depthDisposeCallback=S}P.__boundDepthTexture=V}if(A.depthTexture&&!P.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let V=A.texture.mipmaps;V&&V.length>0?ze(P.__webglFramebuffer[0],A):ze(P.__webglFramebuffer,A)}else if(X){P.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer[V]),P.__webglDepthbuffer[V]===void 0)P.__webglDepthbuffer[V]=r.createRenderbuffer(),Le(P.__webglDepthbuffer[V],A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,B=P.__webglDepthbuffer[V];r.bindRenderbuffer(r.RENDERBUFFER,B),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,B)}}else{let V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=r.createRenderbuffer(),Le(P.__webglDepthbuffer,A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,B=P.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,B),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,B)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ee=[],ee=[];function Te(A){return Math.min(i.maxSamples,A.samples)}function be(A){let P=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function Y(A,P){let X=A.colorSpace,V=A.format,S=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==mr&&X!==Er&&(jt.getTransfer(X)===Qt?V===ci&&S===Ci||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),P}function Ue(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=U;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),U+=1,A},this.resetTextureUnits=function(){U=0},this.setTexture2D=z,this.setTexture2DArray=function(A,P){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?K(X,A,P):t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+P)},this.setTexture3D=function(A,P){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?K(X,A,P):t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+P)},this.setTextureCube=function(A,P){let X=n.get(A);A.version>0&&X.__version!==A.version?(function(V,S,B){if(S.image.length!==6)return;let W=ie(V,S),k=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+B);let ve=n.get(k);if(k.version!==ve.__version||W===!0){t.activeTexture(r.TEXTURE0+B);let ae=jt.getPrimaries(jt.workingColorSpace),le=S.colorSpace===Er?null:jt.getPrimaries(S.colorSpace),Ce=S.colorSpace===Er||ae===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let We=S.isCompressedTexture||S.image[0].isCompressedTexture,De=S.image[0]&&S.image[0].isDataTexture,Xe=[];for(let q=0;q<6;q++)Xe[q]=We||De?De?S.image[q].image:S.image[q]:m(S.image[q],!0,i.maxCubemapSize),Xe[q]=Y(S,Xe[q]);let at=Xe[0],pt=s.convert(S.format,S.colorSpace),Ct=s.convert(S.type),Tt=_(S.internalFormat,pt,Ct,S.colorSpace),Ae=S.isVideoTexture!==!0,D=ve.__version===void 0||W===!0,j=k.dataReady,Q,oe=T(S,at);if(H(r.TEXTURE_CUBE_MAP,S),We){Ae&&D&&t.texStorage2D(r.TEXTURE_CUBE_MAP,oe,Tt,at.width,at.height);for(let q=0;q<6;q++){Q=Xe[q].mipmaps;for(let J=0;J<Q.length;J++){let re=Q[J];S.format!==ci?pt!==null?Ae?j&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J,0,0,re.width,re.height,pt,re.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J,Tt,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ae?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J,0,0,re.width,re.height,pt,Ct,re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J,Tt,re.width,re.height,0,pt,Ct,re.data)}}}else{if(Q=S.mipmaps,Ae&&D){Q.length>0&&oe++;let q=Ue(Xe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,oe,Tt,q.width,q.height)}for(let q=0;q<6;q++)if(De){Ae?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Xe[q].width,Xe[q].height,pt,Ct,Xe[q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Tt,Xe[q].width,Xe[q].height,0,pt,Ct,Xe[q].data);for(let J=0;J<Q.length;J++){let re=Q[J].image[q].image;Ae?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J+1,0,0,re.width,re.height,pt,Ct,re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J+1,Tt,re.width,re.height,0,pt,Ct,re.data)}}else{Ae?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,pt,Ct,Xe[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Tt,pt,Ct,Xe[q]);for(let J=0;J<Q.length;J++){let re=Q[J];Ae?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J+1,0,0,pt,Ct,re.image[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,J+1,Tt,pt,Ct,re.image[q])}}}p(S)&&v(r.TEXTURE_CUBE_MAP),ve.__version=k.version,S.onUpdate&&S.onUpdate(S)}V.__version=S.version})(X,A,P):t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+P)},this.rebindTextures=function(A,P,X){let V=n.get(A);P!==void 0&&de(V.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&Se(A)},this.setupRenderTarget=function(A){let P=A.texture,X=n.get(A),V=n.get(P);A.addEventListener("dispose",I);let S=A.textures,B=A.isWebGLCubeRenderTarget===!0,W=S.length>1;if(W||(V.__webglTexture===void 0&&(V.__webglTexture=r.createTexture()),V.__version=P.version,a.memory.textures++),B){X.__webglFramebuffer=[];for(let k=0;k<6;k++)if(P.mipmaps&&P.mipmaps.length>0){X.__webglFramebuffer[k]=[];for(let ve=0;ve<P.mipmaps.length;ve++)X.__webglFramebuffer[k][ve]=r.createFramebuffer()}else X.__webglFramebuffer[k]=r.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){X.__webglFramebuffer=[];for(let k=0;k<P.mipmaps.length;k++)X.__webglFramebuffer[k]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(W)for(let k=0,ve=S.length;k<ve;k++){let ae=n.get(S[k]);ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&be(A)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let k=0;k<S.length;k++){let ve=S[k];X.__webglColorRenderbuffer[k]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[k]);let ae=s.convert(ve.format,ve.colorSpace),le=s.convert(ve.type),Ce=_(ve.internalFormat,ae,le,ve.colorSpace,A.isXRRenderTarget===!0),We=Te(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,We,Ce,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.RENDERBUFFER,X.__webglColorRenderbuffer[k])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Le(X.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(B){t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture),H(r.TEXTURE_CUBE_MAP,P);for(let k=0;k<6;k++)if(P.mipmaps&&P.mipmaps.length>0)for(let ve=0;ve<P.mipmaps.length;ve++)de(X.__webglFramebuffer[k][ve],A,P,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+k,ve);else de(X.__webglFramebuffer[k],A,P,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);p(P)&&v(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(W){for(let k=0,ve=S.length;k<ve;k++){let ae=S[k],le=n.get(ae),Ce=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ce=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Ce,le.__webglTexture),H(Ce,ae),de(X.__webglFramebuffer,A,ae,r.COLOR_ATTACHMENT0+k,Ce,0),p(ae)&&v(Ce)}t.unbindTexture()}else{let k=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(k=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(k,V.__webglTexture),H(k,P),P.mipmaps&&P.mipmaps.length>0)for(let ve=0;ve<P.mipmaps.length;ve++)de(X.__webglFramebuffer[ve],A,P,r.COLOR_ATTACHMENT0,k,ve);else de(X.__webglFramebuffer,A,P,r.COLOR_ATTACHMENT0,k,0);p(P)&&v(k),t.unbindTexture()}A.depthBuffer&&Se(A)},this.updateRenderTargetMipmap=function(A){let P=A.textures;for(let X=0,V=P.length;X<V;X++){let S=P[X];if(p(S)){let B=y(A),W=n.get(S).__webglTexture;t.bindTexture(B,W),v(B),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(be(A)===!1){let P=A.textures,X=A.width,V=A.height,S=r.COLOR_BUFFER_BIT,B=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,W=n.get(A),k=P.length>1;if(k)for(let ae=0;ae<P.length;ae++)t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,W.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,W.__webglMultisampledFramebuffer);let ve=A.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,W.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,W.__webglFramebuffer);for(let ae=0;ae<P.length;ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),k){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,W.__webglColorRenderbuffer[ae]);let le=n.get(P[ae]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,X,V,0,0,X,V,S,r.NEAREST),c===!0&&(Ee.length=0,ee.length=0,Ee.push(r.COLOR_ATTACHMENT0+ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ee.push(B),ee.push(B),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ee)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),k)for(let ae=0;ae<P.length;ae++){t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,W.__webglColorRenderbuffer[ae]);let le=n.get(P[ae]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,W.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,W.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let P=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[P])}}},this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=de,this.useMultisampledRTT=be}function im(r,e){return{convert:function(t,n=Er){let i,s=jt.getTransfer(n);if(t===Ci)return r.UNSIGNED_BYTE;if(t===Wo)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Xo)return r.UNSIGNED_SHORT_5_5_5_1;if(t===sc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===ac)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===ic)return r.BYTE;if(t===rc)return r.SHORT;if(t===ms)return r.UNSIGNED_SHORT;if(t===Ho)return r.INT;if(t===wr)return r.UNSIGNED_INT;if(t===li)return r.FLOAT;if(t===sr)return r.HALF_FLOAT;if(t===Pu)return r.ALPHA;if(t===Iu)return r.RGB;if(t===ci)return r.RGBA;if(t===pa)return r.DEPTH_COMPONENT;if(t===fa)return r.DEPTH_STENCIL;if(t===jo)return r.RED;if(t===qo)return r.RED_INTEGER;if(t===Lu)return r.RG;if(t===oc)return r.RG_INTEGER;if(t===lc)return r.RGBA_INTEGER;if(t===Yo||t===Zo||t===Jo||t===Ko)if(s===Qt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===Yo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Zo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Jo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ko)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===Yo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Zo)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Jo)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ko)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===cc||t===hc||t===uc||t===dc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===cc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===hc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===uc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===dc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===pc||t===fc||t===mc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===pc||t===fc)return s===Qt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===mc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===gc||t===vc||t===yc||t===_c||t===xc||t===Mc||t===Tc||t===bc||t===Sc||t===wc||t===Ec||t===Ac||t===Cc||t===Rc){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===gc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===vc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===yc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===_c)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===xc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Mc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Tc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===bc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Sc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===wc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Ec)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Ac)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Cc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Rc)return s===Qt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Pc||t===Ic||t===Lc){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Pc)return s===Qt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ic)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Lc)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Dc||t===Uc||t===Nc||t===Bc){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Dc)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Uc)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Nc)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Bc)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===gs?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Zs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Yn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new qt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rh=class extends Gi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,m=typeof XRWebGLBinding<"u",p=new ih,v={},y=t.getContextAttributes(),_=null,x=null,T=[],b=[],I=new we,F=null,U=new tn;U.viewport=new Yt;let z=new tn;z.viewport=new Yt;let R=[U,z],L=new Lo,Z=null,H=null;function ie(ee){let Te=b.indexOf(ee.inputSource);if(Te===-1)return;let be=T[Te];be!==void 0&&(be.update(ee.inputSource,ee.frame,l||a),be.dispatchEvent({type:ee.type,data:ee.inputSource}))}function te(){i.removeEventListener("select",ie),i.removeEventListener("selectstart",ie),i.removeEventListener("selectend",ie),i.removeEventListener("squeeze",ie),i.removeEventListener("squeezestart",ie),i.removeEventListener("squeezeend",ie),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",K);for(let ee=0;ee<T.length;ee++){let Te=b[ee];Te!==null&&(b[ee]=null,T[ee].disconnect(Te))}Z=null,H=null,p.reset();for(let ee in v)delete v[ee];e.setRenderTarget(_),f=null,d=null,u=null,i=null,x=null,Ee.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}function K(ee){for(let Te=0;Te<ee.removed.length;Te++){let be=ee.removed[Te],Y=b.indexOf(be);Y>=0&&(b[Y]=null,T[Y].disconnect(be))}for(let Te=0;Te<ee.added.length;Te++){let be=ee.added[Te],Y=b.indexOf(be);if(Y===-1){for(let A=0;A<T.length;A++){if(A>=b.length){b.push(be),Y=A;break}if(b[A]===null){b[A]=be,Y=A;break}}if(Y===-1)break}let Ue=T[Y];Ue&&Ue.connect(be)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Te=T[ee];return Te===void 0&&(Te=new is,T[ee]=Te),Te.getTargetRaySpace()},this.getControllerGrip=function(ee){let Te=T[ee];return Te===void 0&&(Te=new is,T[ee]=Te),Te.getGripSpace()},this.getHand=function(ee){let Te=T[ee];return Te===void 0&&(Te=new is,T[ee]=Te),Te.getHandSpace()},this.setFramebufferScaleFactor=function(ee){s=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",ie),i.addEventListener("selectstart",ie),i.addEventListener("selectend",ie),i.addEventListener("squeeze",ie),i.addEventListener("squeezestart",ie),i.addEventListener("squeezeend",ie),i.addEventListener("end",te),i.addEventListener("inputsourceschange",K),y.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(I),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,be=null,Y=null;y.depth&&(Y=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=y.stencil?fa:pa,be=y.stencil?gs:wr);let Ue={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new oi(d.textureWidth,d.textureHeight,{format:ci,type:Ci,depthTexture:new Ys(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new oi(f.framebufferWidth,f.framebufferHeight,{format:ci,type:Ci,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ee.setContext(i),Ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};let de=new w,Le=new w;function ze(ee,Te){Te===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Te.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let Te=ee.near,be=ee.far;p.texture!==null&&(p.depthNear>0&&(Te=p.depthNear),p.depthFar>0&&(be=p.depthFar)),L.near=z.near=U.near=Te,L.far=z.far=U.far=be,Z===L.near&&H===L.far||(i.updateRenderState({depthNear:L.near,depthFar:L.far}),Z=L.near,H=L.far),L.layers.mask=6|ee.layers.mask,U.layers.mask=3&L.layers.mask,z.layers.mask=5&L.layers.mask;let Y=ee.parent,Ue=L.cameras;ze(L,Y);for(let A=0;A<Ue.length;A++)ze(Ue[A],Y);Ue.length===2?(function(A,P,X){de.setFromMatrixPosition(P.matrixWorld),Le.setFromMatrixPosition(X.matrixWorld);let V=de.distanceTo(Le),S=P.projectionMatrix.elements,B=X.projectionMatrix.elements,W=S[14]/(S[10]-1),k=S[14]/(S[10]+1),ve=(S[9]+1)/S[5],ae=(S[9]-1)/S[5],le=(S[8]-1)/S[0],Ce=(B[8]+1)/B[0],We=W*le,De=W*Ce,Xe=V/(-le+Ce),at=Xe*-le;if(P.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(at),A.translateZ(Xe),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),S[10]===-1)A.projectionMatrix.copy(P.projectionMatrix),A.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{let pt=W+Xe,Ct=k+Xe,Tt=We-at,Ae=De+(V-at),D=ve*k/Ct*pt,j=ae*k/Ct*pt;A.projectionMatrix.makePerspective(Tt,Ae,D,j,pt,Ct),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(L,U,z):L.projectionMatrix.copy(U.projectionMatrix),(function(A,P,X){X===null?A.matrix.copy(P.matrixWorld):(A.matrix.copy(X.matrixWorld),A.matrix.invert(),A.matrix.multiply(P.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(P.projectionMatrix),A.projectionMatrixInverse.copy(P.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Os*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(ee,L,Y)},this.getCamera=function(){return L},this.getFoveation=function(){if(d!==null||f!==null)return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(ee){return v[ee]};let Se=null,Ee=new _d;Ee.setAnimationLoop(function(ee,Te){if(h=Te.getViewerPose(l||a),g=Te,h!==null){let be=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Y=!1;be.length!==L.cameras.length&&(L.cameras.length=0,Y=!0);for(let A=0;A<be.length;A++){let P=be[A],X=null;if(f!==null)X=f.getViewport(P);else{let S=u.getViewSubImage(d,P);X=S.viewport,A===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let V=R[A];V===void 0&&(V=new tn,V.layers.enable(A),V.viewport=new Yt,R[A]=V),V.matrix.fromArray(P.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(P.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(X.x,X.y,X.width,X.height),A===0&&(L.matrix.copy(V.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Y===!0&&L.cameras.push(V)}let Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){u=n.getBinding();let A=u.getDepthInformation(be[0]);A&&A.isValid&&A.texture&&p.init(A,i.renderState)}if(Ue&&Ue.includes("camera-access")&&m){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<be.length;A++){let P=be[A].camera;if(P){let X=v[P];X||(X=new Zs,v[P]=X);let V=u.getCameraImage(P);X.sourceTexture=V}}}}for(let be=0;be<T.length;be++){let Y=b[be],Ue=T[be];Y!==null&&Ue!==void 0&&Ue.update(Y,Te,l||a)}Se&&Se(ee,Te),Te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Te}),g=null}),this.setAnimationLoop=function(ee){Se=ee},this.dispose=function(){}}},Pr=new gi,rm=new dt;function sm(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===ni&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===ni&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Pr.copy(c),Pr.x*=-1,Pr.y*=-1,Pr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Pr.y*=-1,Pr.z*=-1),i.envMapRotation.value.setFromMatrix4(rm.makeRotationFromEuler(Pr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,kc(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ni&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function am(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,f,g){let m=u.value,p=d+"_"+f;if(g[p]===void 0)return g[p]=typeof m=="number"||typeof m=="boolean"?m:m.clone(),!0;{let v=g[p];if(typeof m=="number"||typeof m=="boolean"){if(v!==m)return g[p]=m,!0}else if(v.equals(m)===!1)return v.copy(m),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let f=a.indexOf(d.__bindingPointIndex);a.splice(f,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let f=d.program;n.uniformBlockBinding(u,f)},update:function(u,d){let f=i[u.id];f===void 0&&((function(p){let v=p.uniforms,y=0,_=16;for(let T=0,b=v.length;T<b;T++){let I=Array.isArray(v[T])?v[T]:[v[T]];for(let F=0,U=I.length;F<U;F++){let z=I[F],R=Array.isArray(z.value)?z.value:[z.value];for(let L=0,Z=R.length;L<Z;L++){let H=l(R[L]),ie=y%_,te=ie%H.boundary,K=ie+te;y+=te,K!==0&&_-K<H.storage&&(y+=_-K),z.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=H.storage}}}let x=y%_;x>0&&(y+=_-x),p.__size=y,p.__cache={}})(u),f=(function(p){let v=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();p.__bindingPointIndex=v;let y=r.createBuffer(),_=p.__size,x=p.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y})(u),i[u.id]=f,u.addEventListener("dispose",h));let g=d.program;n.updateUBOMapping(u,g);let m=e.render.frame;s[u.id]!==m&&((function(p){let v=i[p.id],y=p.uniforms,_=p.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let x=0,T=y.length;x<T;x++){let b=Array.isArray(y[x])?y[x]:[y[x]];for(let I=0,F=b.length;I<F;I++){let U=b[I];if(c(U,x,I,_)===!0){let z=U.__offset,R=Array.isArray(U.value)?U.value:[U.value],L=0;for(let Z=0;Z<R.length;Z++){let H=R[Z],ie=l(H);typeof H=="number"||typeof H=="boolean"?(U.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,z+L,U.__data)):H.isMatrix3?(U.__data[0]=H.elements[0],U.__data[1]=H.elements[1],U.__data[2]=H.elements[2],U.__data[3]=0,U.__data[4]=H.elements[3],U.__data[5]=H.elements[4],U.__data[6]=H.elements[5],U.__data[7]=0,U.__data[8]=H.elements[6],U.__data[9]=H.elements[7],U.__data[10]=H.elements[8],U.__data[11]=0):(H.toArray(U.__data,L),L+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,z,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=m)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Jn=class{constructor(e={}){let{canvas:t=Vu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,f;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let g=new Uint32Array(4),m=new Int32Array(4),p=null,v=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=xt;let b=0,I=0,F=null,U=-1,z=null,R=new Yt,L=new Yt,Z=null,H=new lt(0),ie=0,te=t.width,K=t.height,de=1,Le=null,ze=null,Se=new Yt(0,0,te,K),Ee=new Yt(0,0,te,K),ee=!1,Te=new tr,be=!1,Y=!1,Ue=new dt,A=new w,P=new Yt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},V=!1;function S(){return F===null?de:1}let B,W,k,ve,ae,le,Ce,We,De,Xe,at,pt,Ct,Tt,Ae,D,j,Q,oe,q,J,re,ce,me,C=n;function pe(N,he){return t.getContext(N,he)}try{let N={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ge,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Oe,!1),C===null){let he="webgl2";if(C=pe(he,N),C===null)throw pe(he)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}function Re(){B=new kp(C),B.init(),re=new im(C,B),W=new Bp(C,B,e,re),k=new tm(C,B),W.reversedDepthBuffer&&d&&k.buffers.depth.setReversed(!0),ve=new Wp(C),ae=new Xf,le=new nm(C,B,k,ae,W,re,ve),Ce=new Op(x),We=new Gp(x),De=new Ip(C),ce=new Up(C,De),Xe=new Vp(C,De,ve,ce),at=new jp(C,Xe,De,ve),oe=new Xp(C,W,le),D=new Fp(ae),pt=new Wf(x,Ce,We,B,W,ce,D),Ct=new sm(x,ae),Tt=new qf,Ae=new $f(B),Q=new Dp(x,Ce,We,k,at,f,c),j=new Qf(x,at,W),me=new am(C,ve,W,k),q=new Np(C,B,ve),J=new Hp(C,B,ve),ve.programs=pt.programs,x.capabilities=W,x.extensions=B,x.properties=ae,x.renderLists=Tt,x.shadowMap=j,x.state=k,x.info=ve}Re();let ye=new rh(x,C);function Ge(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let N=ve.autoReset,he=j.enabled,xe=j.autoUpdate,Pe=j.needsUpdate,ge=j.type;Re(),ve.autoReset=N,j.enabled=he,j.autoUpdate=xe,j.needsUpdate=Pe,j.type=ge}function Oe(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function ft(N){let he=N.target;he.removeEventListener("dispose",ft),(function(xe){(function(Pe){let ge=ae.get(Pe).programs;ge!==void 0&&(ge.forEach(function(Be){pt.releaseProgram(Be)}),Pe.isShaderMaterial&&pt.releaseShaderCache(Pe))})(xe),ae.remove(xe)})(he)}function ot(N,he,xe){N.transparent===!0&&N.side===Ot&&N.forceSinglePass===!1?(N.side=ni,N.needsUpdate=!0,Ln(N,he,xe),N.side=ds,N.needsUpdate=!0,Ln(N,he,xe),N.side=Ot):Ln(N,he,xe)}this.xr=ye,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let N=B.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){let N=B.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(N){N!==void 0&&(de=N,this.setSize(te,K,!1))},this.getSize=function(N){return N.set(te,K)},this.setSize=function(N,he,xe=!0){ye.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(te=N,K=he,t.width=Math.floor(N*de),t.height=Math.floor(he*de),xe===!0&&(t.style.width=N+"px",t.style.height=he+"px"),this.setViewport(0,0,N,he))},this.getDrawingBufferSize=function(N){return N.set(te*de,K*de).floor()},this.setDrawingBufferSize=function(N,he,xe){te=N,K=he,de=xe,t.width=Math.floor(N*xe),t.height=Math.floor(he*xe),this.setViewport(0,0,N,he)},this.getCurrentViewport=function(N){return N.copy(R)},this.getViewport=function(N){return N.copy(Se)},this.setViewport=function(N,he,xe,Pe){N.isVector4?Se.set(N.x,N.y,N.z,N.w):Se.set(N,he,xe,Pe),k.viewport(R.copy(Se).multiplyScalar(de).round())},this.getScissor=function(N){return N.copy(Ee)},this.setScissor=function(N,he,xe,Pe){N.isVector4?Ee.set(N.x,N.y,N.z,N.w):Ee.set(N,he,xe,Pe),k.scissor(L.copy(Ee).multiplyScalar(de).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(N){k.setScissorTest(ee=N)},this.setOpaqueSort=function(N){Le=N},this.setTransparentSort=function(N){ze=N},this.getClearColor=function(N){return N.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor(...arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha(...arguments)},this.clear=function(N=!0,he=!0,xe=!0){let Pe=0;if(N){let ge=!1;if(F!==null){let Be=F.texture.format;ge=Be===lc||Be===oc||Be===qo}if(ge){let Be=F.texture.type,$e=Be===Ci||Be===wr||Be===ms||Be===gs||Be===Wo||Be===Xo,Ne=Q.getClearColor(),He=Q.getClearAlpha(),Ke=Ne.r,bt=Ne.g,je=Ne.b;$e?(g[0]=Ke,g[1]=bt,g[2]=je,g[3]=He,C.clearBufferuiv(C.COLOR,0,g)):(m[0]=Ke,m[1]=bt,m[2]=je,m[3]=He,C.clearBufferiv(C.COLOR,0,m))}else Pe|=C.COLOR_BUFFER_BIT}he&&(Pe|=C.DEPTH_BUFFER_BIT),xe&&(Pe|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(Pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Oe,!1),Q.dispose(),Tt.dispose(),Ae.dispose(),ae.dispose(),Ce.dispose(),We.dispose(),at.dispose(),ce.dispose(),me.dispose(),pt.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",gt),ye.removeEventListener("sessionend",vt),mt.stop()},this.renderBufferDirect=function(N,he,xe,Pe,ge,Be){he===null&&(he=X);let $e=ge.isMesh&&ge.matrixWorld.determinant()<0,Ne=(function(It,an,en,Rt,Mt){an.isScene!==!0&&(an=X),le.resetTextureUnits();let Hn=an.fog,Xi=Rt.isMeshStandardMaterial?an.environment:null,mn=F===null?x.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:mr,ii=(Rt.isMeshStandardMaterial?We:Ce).get(Rt.envMap||Xi),kn=Rt.vertexColors===!0&&!!en.attributes.color&&en.attributes.color.itemSize===4,Jt=!!en.attributes.tangent&&(!!Rt.normalMap||Rt.anisotropy>0),ri=!!en.morphAttributes.position,Ms=!!en.morphAttributes.normal,si=!!en.morphAttributes.color,ya=Hi;Rt.toneMapped&&(F!==null&&F.isXRRenderTarget!==!0||(ya=x.toneMapping));let Nr=en.morphAttributes.position||en.morphAttributes.normal||en.morphAttributes.color,ji=Nr!==void 0?Nr.length:0,Lt=ae.get(Rt),Wn=v.state.lights;if(be===!0&&(Y===!0||It!==z)){let Tn=It===z&&Rt.id===U;D.setState(Rt,It,Tn)}let An=!1;Rt.version===Lt.__version?Lt.needsLights&&Lt.lightsStateVersion!==Wn.state.version||Lt.outputColorSpace!==mn||Mt.isBatchedMesh&&Lt.batching===!1?An=!0:Mt.isBatchedMesh||Lt.batching!==!0?Mt.isBatchedMesh&&Lt.batchingColor===!0&&Mt.colorTexture===null||Mt.isBatchedMesh&&Lt.batchingColor===!1&&Mt.colorTexture!==null||Mt.isInstancedMesh&&Lt.instancing===!1?An=!0:Mt.isInstancedMesh||Lt.instancing!==!0?Mt.isSkinnedMesh&&Lt.skinning===!1?An=!0:Mt.isSkinnedMesh||Lt.skinning!==!0?Mt.isInstancedMesh&&Lt.instancingColor===!0&&Mt.instanceColor===null||Mt.isInstancedMesh&&Lt.instancingColor===!1&&Mt.instanceColor!==null||Mt.isInstancedMesh&&Lt.instancingMorph===!0&&Mt.morphTexture===null||Mt.isInstancedMesh&&Lt.instancingMorph===!1&&Mt.morphTexture!==null||Lt.envMap!==ii||Rt.fog===!0&&Lt.fog!==Hn?An=!0:Lt.numClippingPlanes===void 0||Lt.numClippingPlanes===D.numPlanes&&Lt.numIntersection===D.numIntersection?(Lt.vertexAlphas!==kn||Lt.vertexTangents!==Jt||Lt.morphTargets!==ri||Lt.morphNormals!==Ms||Lt.morphColors!==si||Lt.toneMapping!==ya||Lt.morphTargetsCount!==ji)&&(An=!0):An=!0:An=!0:An=!0:An=!0:(An=!0,Lt.__version=Rt.version);let Ii=Lt.currentProgram;An===!0&&(Ii=Ln(Rt,an,Mt));let cr=!1,Br=!1,Ts=!1,nn=Ii.getUniforms(),xi=Lt.uniforms;if(k.useProgram(Ii.program)&&(cr=!0,Br=!0,Ts=!0),Rt.id!==U&&(U=Rt.id,Br=!0),cr||z!==It){k.buffers.depth.getReversed()&&It.reversedDepth!==!0&&(It._reversedDepth=!0,It.updateProjectionMatrix()),nn.setValue(C,"projectionMatrix",It.projectionMatrix),nn.setValue(C,"viewMatrix",It.matrixWorldInverse);let Tn=nn.map.cameraPosition;Tn!==void 0&&Tn.setValue(C,A.setFromMatrixPosition(It.matrixWorld)),W.logarithmicDepthBuffer&&nn.setValue(C,"logDepthBufFC",2/(Math.log(It.far+1)/Math.LN2)),(Rt.isMeshPhongMaterial||Rt.isMeshToonMaterial||Rt.isMeshLambertMaterial||Rt.isMeshBasicMaterial||Rt.isMeshStandardMaterial||Rt.isShaderMaterial)&&nn.setValue(C,"isOrthographic",It.isOrthographicCamera===!0),z!==It&&(z=It,Br=!0,Ts=!0)}if(Mt.isSkinnedMesh){nn.setOptional(C,Mt,"bindMatrix"),nn.setOptional(C,Mt,"bindMatrixInverse");let Tn=Mt.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),nn.setValue(C,"boneTexture",Tn.boneTexture,le))}Mt.isBatchedMesh&&(nn.setOptional(C,Mt,"batchingTexture"),nn.setValue(C,"batchingTexture",Mt._matricesTexture,le),nn.setOptional(C,Mt,"batchingIdTexture"),nn.setValue(C,"batchingIdTexture",Mt._indirectTexture,le),nn.setOptional(C,Mt,"batchingColorTexture"),Mt._colorsTexture!==null&&nn.setValue(C,"batchingColorTexture",Mt._colorsTexture,le));let Dn=en.morphAttributes;Dn.position===void 0&&Dn.normal===void 0&&Dn.color===void 0||oe.update(Mt,en,Ii),(Br||Lt.receiveShadow!==Mt.receiveShadow)&&(Lt.receiveShadow=Mt.receiveShadow,nn.setValue(C,"receiveShadow",Mt.receiveShadow)),Rt.isMeshGouraudMaterial&&Rt.envMap!==null&&(xi.envMap.value=ii,xi.flipEnvMap.value=ii.isCubeTexture&&ii.isRenderTargetTexture===!1?-1:1),Rt.isMeshStandardMaterial&&Rt.envMap===null&&an.environment!==null&&(xi.envMapIntensity.value=an.environmentIntensity),Br&&(nn.setValue(C,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&(Xn=Ts,(cn=xi).ambientLightColor.needsUpdate=Xn,cn.lightProbe.needsUpdate=Xn,cn.directionalLights.needsUpdate=Xn,cn.directionalLightShadows.needsUpdate=Xn,cn.pointLights.needsUpdate=Xn,cn.pointLightShadows.needsUpdate=Xn,cn.spotLights.needsUpdate=Xn,cn.spotLightShadows.needsUpdate=Xn,cn.rectAreaLights.needsUpdate=Xn,cn.hemisphereLights.needsUpdate=Xn),Hn&&Rt.fog===!0&&Ct.refreshFogUniforms(xi,Hn),Ct.refreshMaterialUniforms(xi,Rt,de,K,v.state.transmissionRenderTarget[It.id]),_s.upload(C,or(Lt),xi,le));var cn,Xn;if(Rt.isShaderMaterial&&Rt.uniformsNeedUpdate===!0&&(_s.upload(C,or(Lt),xi,le),Rt.uniformsNeedUpdate=!1),Rt.isSpriteMaterial&&nn.setValue(C,"center",Mt.center),nn.setValue(C,"modelViewMatrix",Mt.modelViewMatrix),nn.setValue(C,"normalMatrix",Mt.normalMatrix),nn.setValue(C,"modelMatrix",Mt.matrixWorld),Rt.isShaderMaterial||Rt.isRawShaderMaterial){let Tn=Rt.uniformsGroups;for(let _a=0,Fr=Tn.length;_a<Fr;_a++){let al=Tn[_a];me.update(al,Ii),me.bind(al,Ii)}}return Ii})(N,he,xe,Pe,ge);k.setMaterial(Pe,$e);let He=xe.index,Ke=1;if(Pe.wireframe===!0){if(He=Xe.getWireframeAttribute(xe),He===void 0)return;Ke=2}let bt=xe.drawRange,je=xe.attributes.position,Fe=bt.start*Ke,nt=(bt.start+bt.count)*Ke;Be!==null&&(Fe=Math.max(Fe,Be.start*Ke),nt=Math.min(nt,(Be.start+Be.count)*Ke)),He!==null?(Fe=Math.max(Fe,0),nt=Math.min(nt,He.count)):je!=null&&(Fe=Math.max(Fe,0),nt=Math.min(nt,je.count));let sn=nt-Fe;if(sn<0||sn===1/0)return;let pn;ce.setup(ge,Pe,Ne,xe,He);let Zt=q;if(He!==null&&(pn=De.get(He),Zt=J,Zt.setIndex(pn)),ge.isMesh)Pe.wireframe===!0?(k.setLineWidth(Pe.wireframeLinewidth*S()),Zt.setMode(C.LINES)):Zt.setMode(C.TRIANGLES);else if(ge.isLine){let It=Pe.linewidth;It===void 0&&(It=1),k.setLineWidth(It*S()),ge.isLineSegments?Zt.setMode(C.LINES):ge.isLineLoop?Zt.setMode(C.LINE_LOOP):Zt.setMode(C.LINE_STRIP)}else ge.isPoints?Zt.setMode(C.POINTS):ge.isSprite&&Zt.setMode(C.TRIANGLES);if(ge.isBatchedMesh)if(ge._multiDrawInstances!==null)es("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Zt.renderMultiDrawInstances(ge._multiDrawStarts,ge._multiDrawCounts,ge._multiDrawCount,ge._multiDrawInstances);else if(B.get("WEBGL_multi_draw"))Zt.renderMultiDraw(ge._multiDrawStarts,ge._multiDrawCounts,ge._multiDrawCount);else{let It=ge._multiDrawStarts,an=ge._multiDrawCounts,en=ge._multiDrawCount,Rt=He?De.get(He).bytesPerElement:1,Mt=ae.get(Pe).currentProgram.getUniforms();for(let Hn=0;Hn<en;Hn++)Mt.setValue(C,"_gl_DrawID",Hn),Zt.render(It[Hn]/Rt,an[Hn])}else if(ge.isInstancedMesh)Zt.renderInstances(Fe,sn,ge.count);else if(xe.isInstancedBufferGeometry){let It=xe._maxInstanceCount!==void 0?xe._maxInstanceCount:1/0,an=Math.min(xe.instanceCount,It);Zt.renderInstances(Fe,sn,an)}else Zt.render(Fe,sn)},this.compile=function(N,he,xe=null){xe===null&&(xe=N),v=Ae.get(xe),v.init(he),_.push(v),xe.traverseVisible(function(ge){ge.isLight&&ge.layers.test(he.layers)&&(v.pushLight(ge),ge.castShadow&&v.pushShadow(ge))}),N!==xe&&N.traverseVisible(function(ge){ge.isLight&&ge.layers.test(he.layers)&&(v.pushLight(ge),ge.castShadow&&v.pushShadow(ge))}),v.setupLights();let Pe=new Set;return N.traverse(function(ge){if(!(ge.isMesh||ge.isPoints||ge.isLine||ge.isSprite))return;let Be=ge.material;if(Be)if(Array.isArray(Be))for(let $e=0;$e<Be.length;$e++){let Ne=Be[$e];ot(Ne,xe,ge),Pe.add(Ne)}else ot(Be,xe,ge),Pe.add(Be)}),v=_.pop(),Pe},this.compileAsync=function(N,he,xe=null){let Pe=this.compile(N,he,xe);return new Promise(ge=>{function Be(){Pe.forEach(function($e){ae.get($e).currentProgram.isReady()&&Pe.delete($e)}),Pe.size!==0?setTimeout(Be,10):ge(N)}B.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Ye=null;function gt(){mt.stop()}function vt(){mt.start()}let mt=new _d;function _t(N,he,xe,Pe){if(N.visible===!1)return;if(N.layers.test(he.layers)){if(N.isGroup)xe=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(he);else if(N.isLight)v.pushLight(N),N.castShadow&&v.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||Te.intersectsSprite(N)){Pe&&P.setFromMatrixPosition(N.matrixWorld).applyMatrix4(Ue);let Be=at.update(N),$e=N.material;$e.visible&&p.push(N,Be,$e,xe,P.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||Te.intersectsObject(N))){let Be=at.update(N),$e=N.material;if(Pe&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),P.copy(N.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),P.copy(Be.boundingSphere.center)),P.applyMatrix4(N.matrixWorld).applyMatrix4(Ue)),Array.isArray($e)){let Ne=Be.groups;for(let He=0,Ke=Ne.length;He<Ke;He++){let bt=Ne[He],je=$e[bt.materialIndex];je&&je.visible&&p.push(N,Be,je,xe,P.z,bt)}}else $e.visible&&p.push(N,Be,$e,xe,P.z,null)}}let ge=N.children;for(let Be=0,$e=ge.length;Be<$e;Be++)_t(ge[Be],he,xe,Pe)}function kt(N,he,xe,Pe){let ge=N.opaque,Be=N.transmissive,$e=N.transparent;v.setupLightsView(xe),be===!0&&D.setGlobalState(x.clippingPlanes,xe),Pe&&k.viewport(R.copy(Pe)),ge.length>0&&Kt(ge,he,xe),Be.length>0&&Kt(Be,he,xe),$e.length>0&&Kt($e,he,xe),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function Ht(N,he,xe,Pe){if((xe.isScene===!0?xe.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[Pe.id]===void 0&&(v.state.transmissionRenderTarget[Pe.id]=new oi(1,1,{generateMipmaps:!0,type:B.has("EXT_color_buffer_half_float")||B.has("EXT_color_buffer_float")?sr:Ci,minFilter:yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let ge=v.state.transmissionRenderTarget[Pe.id],Be=Pe.viewport||R;ge.setSize(Be.z*x.transmissionResolutionScale,Be.w*x.transmissionResolutionScale);let $e=x.getRenderTarget(),Ne=x.getActiveCubeFace(),He=x.getActiveMipmapLevel();x.setRenderTarget(ge),x.getClearColor(H),ie=x.getClearAlpha(),ie<1&&x.setClearColor(16777215,.5),x.clear(),V&&Q.render(xe);let Ke=x.toneMapping;x.toneMapping=Hi;let bt=Pe.viewport;if(Pe.viewport!==void 0&&(Pe.viewport=void 0),v.setupLightsView(Pe),be===!0&&D.setGlobalState(x.clippingPlanes,Pe),Kt(N,xe,Pe),le.updateMultisampleRenderTarget(ge),le.updateRenderTargetMipmap(ge),B.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let Fe=0,nt=he.length;Fe<nt;Fe++){let sn=he[Fe],pn=sn.object,Zt=sn.geometry,It=sn.material,an=sn.group;if(It.side===Ot&&pn.layers.test(Pe.layers)){let en=It.side;It.side=ni,It.needsUpdate=!0,ln(pn,xe,Pe,Zt,It,an),It.side=en,It.needsUpdate=!0,je=!0}}je===!0&&(le.updateMultisampleRenderTarget(ge),le.updateRenderTargetMipmap(ge))}x.setRenderTarget($e,Ne,He),x.setClearColor(H,ie),bt!==void 0&&(Pe.viewport=bt),x.toneMapping=Ke}function Kt(N,he,xe){let Pe=he.isScene===!0?he.overrideMaterial:null;for(let ge=0,Be=N.length;ge<Be;ge++){let $e=N[ge],Ne=$e.object,He=$e.geometry,Ke=$e.group,bt=$e.material;bt.allowOverride===!0&&Pe!==null&&(bt=Pe),Ne.layers.test(xe.layers)&&ln(Ne,he,xe,He,bt,Ke)}}function ln(N,he,xe,Pe,ge,Be){N.onBeforeRender(x,he,xe,Pe,ge,Be),N.modelViewMatrix.multiplyMatrices(xe.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),ge.onBeforeRender(x,he,xe,Pe,N,Be),ge.transparent===!0&&ge.side===Ot&&ge.forceSinglePass===!1?(ge.side=ni,ge.needsUpdate=!0,x.renderBufferDirect(xe,he,Pe,ge,N,Be),ge.side=ds,ge.needsUpdate=!0,x.renderBufferDirect(xe,he,Pe,ge,N,Be),ge.side=Ot):x.renderBufferDirect(xe,he,Pe,ge,N,Be),N.onAfterRender(x,he,xe,Pe,ge,Be)}function Ln(N,he,xe){he.isScene!==!0&&(he=X);let Pe=ae.get(N),ge=v.state.lights,Be=v.state.shadowsArray,$e=ge.state.version,Ne=pt.getParameters(N,ge.state,Be,he,xe),He=pt.getProgramCacheKey(Ne),Ke=Pe.programs;Pe.environment=N.isMeshStandardMaterial?he.environment:null,Pe.fog=he.fog,Pe.envMap=(N.isMeshStandardMaterial?We:Ce).get(N.envMap||Pe.environment),Pe.envMapRotation=Pe.environment!==null&&N.envMap===null?he.environmentRotation:N.envMapRotation,Ke===void 0&&(N.addEventListener("dispose",ft),Ke=new Map,Pe.programs=Ke);let bt=Ke.get(He);if(bt!==void 0){if(Pe.currentProgram===bt&&Pe.lightsStateVersion===$e)return Mn(N,Ne),bt}else Ne.uniforms=pt.getUniforms(N),N.onBeforeCompile(Ne,x),bt=pt.acquireProgram(Ne,He),Ke.set(He,bt),Pe.uniforms=Ne.uniforms;let je=Pe.uniforms;return(N.isShaderMaterial||N.isRawShaderMaterial)&&N.clipping!==!0||(je.clippingPlanes=D.uniform),Mn(N,Ne),Pe.needsLights=(function(Fe){return Fe.isMeshLambertMaterial||Fe.isMeshToonMaterial||Fe.isMeshPhongMaterial||Fe.isMeshStandardMaterial||Fe.isShadowMaterial||Fe.isShaderMaterial&&Fe.lights===!0})(N),Pe.lightsStateVersion=$e,Pe.needsLights&&(je.ambientLightColor.value=ge.state.ambient,je.lightProbe.value=ge.state.probe,je.directionalLights.value=ge.state.directional,je.directionalLightShadows.value=ge.state.directionalShadow,je.spotLights.value=ge.state.spot,je.spotLightShadows.value=ge.state.spotShadow,je.rectAreaLights.value=ge.state.rectArea,je.ltc_1.value=ge.state.rectAreaLTC1,je.ltc_2.value=ge.state.rectAreaLTC2,je.pointLights.value=ge.state.point,je.pointLightShadows.value=ge.state.pointShadow,je.hemisphereLights.value=ge.state.hemi,je.directionalShadowMap.value=ge.state.directionalShadowMap,je.directionalShadowMatrix.value=ge.state.directionalShadowMatrix,je.spotShadowMap.value=ge.state.spotShadowMap,je.spotLightMatrix.value=ge.state.spotLightMatrix,je.spotLightMap.value=ge.state.spotLightMap,je.pointShadowMap.value=ge.state.pointShadowMap,je.pointShadowMatrix.value=ge.state.pointShadowMatrix),Pe.currentProgram=bt,Pe.uniformsList=null,bt}function or(N){if(N.uniformsList===null){let he=N.currentProgram.getUniforms();N.uniformsList=_s.seqWithValue(he.seq,N.uniforms)}return N.uniformsList}function Mn(N,he){let xe=ae.get(N);xe.outputColorSpace=he.outputColorSpace,xe.batching=he.batching,xe.batchingColor=he.batchingColor,xe.instancing=he.instancing,xe.instancingColor=he.instancingColor,xe.instancingMorph=he.instancingMorph,xe.skinning=he.skinning,xe.morphTargets=he.morphTargets,xe.morphNormals=he.morphNormals,xe.morphColors=he.morphColors,xe.morphTargetsCount=he.morphTargetsCount,xe.numClippingPlanes=he.numClippingPlanes,xe.numIntersection=he.numClipIntersection,xe.vertexAlphas=he.vertexAlphas,xe.vertexTangents=he.vertexTangents,xe.toneMapping=he.toneMapping}mt.setAnimationLoop(function(N){Ye&&Ye(N)}),typeof self<"u"&&mt.setContext(self),this.setAnimationLoop=function(N){Ye=N,ye.setAnimationLoop(N),N===null?mt.stop():mt.start()},ye.addEventListener("sessionstart",gt),ye.addEventListener("sessionend",vt),this.render=function(N,he){if(he!==void 0&&he.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),he.parent===null&&he.matrixWorldAutoUpdate===!0&&he.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(he),he=ye.getCamera()),N.isScene===!0&&N.onBeforeRender(x,N,he,F),v=Ae.get(N,_.length),v.init(he),_.push(v),Ue.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),Te.setFromProjectionMatrix(Ue,zi,he.reversedDepth),Y=this.localClippingEnabled,be=D.init(this.clippingPlanes,Y),p=Tt.get(N,y.length),p.init(),y.push(p),ye.enabled===!0&&ye.isPresenting===!0){let Be=x.xr.getDepthSensingMesh();Be!==null&&_t(Be,he,-1/0,x.sortObjects)}_t(N,he,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(Le,ze),V=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,V&&Q.addToRenderList(p,N),this.info.render.frame++,be===!0&&D.beginShadows();let xe=v.state.shadowsArray;j.render(xe,N,he),be===!0&&D.endShadows(),this.info.autoReset===!0&&this.info.reset();let Pe=p.opaque,ge=p.transmissive;if(v.setupLights(),he.isArrayCamera){let Be=he.cameras;if(ge.length>0)for(let $e=0,Ne=Be.length;$e<Ne;$e++)Ht(Pe,ge,N,Be[$e]);V&&Q.render(N);for(let $e=0,Ne=Be.length;$e<Ne;$e++){let He=Be[$e];kt(p,N,He,He.viewport)}}else ge.length>0&&Ht(Pe,ge,N,he),V&&Q.render(N),kt(p,N,he);F!==null&&I===0&&(le.updateMultisampleRenderTarget(F),le.updateRenderTargetMipmap(F)),N.isScene===!0&&N.onAfterRender(x,N,he),ce.resetDefaultState(),U=-1,z=null,_.pop(),_.length>0?(v=_[_.length-1],be===!0&&D.setGlobalState(x.clippingPlanes,v.state.camera)):v=null,y.pop(),p=y.length>0?y[y.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(N,he,xe){let Pe=ae.get(N);Pe.__autoAllocateDepthBuffer=N.resolveDepthBuffer===!1,Pe.__autoAllocateDepthBuffer===!1&&(Pe.__useRenderToTexture=!1),ae.get(N.texture).__webglTexture=he,ae.get(N.depthTexture).__webglTexture=Pe.__autoAllocateDepthBuffer?void 0:xe,Pe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(N,he){let xe=ae.get(N);xe.__webglFramebuffer=he,xe.__useDefaultFramebuffer=he===void 0};let _i=C.createFramebuffer();this.setRenderTarget=function(N,he=0,xe=0){F=N,b=he,I=xe;let Pe=!0,ge=null,Be=!1,$e=!1;if(N){let Ne=ae.get(N);if(Ne.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(C.FRAMEBUFFER,null),Pe=!1;else if(Ne.__webglFramebuffer===void 0)le.setupRenderTarget(N);else if(Ne.__hasExternalTextures)le.rebindTextures(N,ae.get(N.texture).__webglTexture,ae.get(N.depthTexture).__webglTexture);else if(N.depthBuffer){let bt=N.depthTexture;if(Ne.__boundDepthTexture!==bt){if(bt!==null&&ae.has(bt)&&(N.width!==bt.image.width||N.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");le.setupDepthRenderbuffer(N)}}let He=N.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&($e=!0);let Ke=ae.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(ge=Array.isArray(Ke[he])?Ke[he][xe]:Ke[he],Be=!0):ge=N.samples>0&&le.useMultisampledRTT(N)===!1?ae.get(N).__webglMultisampledFramebuffer:Array.isArray(Ke)?Ke[xe]:Ke,R.copy(N.viewport),L.copy(N.scissor),Z=N.scissorTest}else R.copy(Se).multiplyScalar(de).floor(),L.copy(Ee).multiplyScalar(de).floor(),Z=ee;if(xe!==0&&(ge=_i),k.bindFramebuffer(C.FRAMEBUFFER,ge)&&Pe&&k.drawBuffers(N,ge),k.viewport(R),k.scissor(L),k.setScissorTest(Z),Be){let Ne=ae.get(N.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne.__webglTexture,xe)}else if($e){let Ne=he;for(let He=0;He<N.textures.length;He++){let Ke=ae.get(N.textures[He]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+He,Ke.__webglTexture,xe,Ne)}}else if(N!==null&&xe!==0){let Ne=ae.get(N.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ne.__webglTexture,xe)}U=-1},this.readRenderTargetPixels=function(N,he,xe,Pe,ge,Be,$e,Ne=0){if(!N||!N.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ae.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&$e!==void 0&&(He=He[$e]),He){k.bindFramebuffer(C.FRAMEBUFFER,He);try{let Ke=N.textures[Ne],bt=Ke.format,je=Ke.type;if(!W.textureFormatReadable(bt))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!W.textureTypeReadable(je))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");he>=0&&he<=N.width-Pe&&xe>=0&&xe<=N.height-ge&&(N.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ne),C.readPixels(he,xe,Pe,ge,re.convert(bt),re.convert(je),Be))}finally{let Ke=F!==null?ae.get(F).__webglFramebuffer:null;k.bindFramebuffer(C.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(N,he,xe,Pe,ge,Be,$e,Ne=0){if(!N||!N.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=ae.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&$e!==void 0&&(He=He[$e]),He){if(he>=0&&he<=N.width-Pe&&xe>=0&&xe<=N.height-ge){k.bindFramebuffer(C.FRAMEBUFFER,He);let Ke=N.textures[Ne],bt=Ke.format,je=Ke.type;if(!W.textureFormatReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!W.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Fe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Fe),C.bufferData(C.PIXEL_PACK_BUFFER,Be.byteLength,C.STREAM_READ),N.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ne),C.readPixels(he,xe,Pe,ge,re.convert(bt),re.convert(je),0);let nt=F!==null?ae.get(F).__webglFramebuffer:null;k.bindFramebuffer(C.FRAMEBUFFER,nt);let sn=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Hu(C,sn,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Fe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Be),C.deleteBuffer(Fe),C.deleteSync(sn),Be}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(N,he=null,xe=0){let Pe=Math.pow(2,-xe),ge=Math.floor(N.image.width*Pe),Be=Math.floor(N.image.height*Pe),$e=he!==null?he.x:0,Ne=he!==null?he.y:0;le.setTexture2D(N,0),C.copyTexSubImage2D(C.TEXTURE_2D,xe,0,0,$e,Ne,ge,Be),k.unbindTexture()};let lr=C.createFramebuffer(),Wi=C.createFramebuffer();this.copyTextureToTexture=function(N,he,xe=null,Pe=null,ge=0,Be=null){let $e,Ne,He,Ke,bt,je,Fe,nt,sn;Be===null&&(ge!==0?(es("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Be=ge,ge=0):Be=0);let pn=N.isCompressedTexture?N.mipmaps[Be]:N.image;if(xe!==null)$e=xe.max.x-xe.min.x,Ne=xe.max.y-xe.min.y,He=xe.isBox3?xe.max.z-xe.min.z:1,Ke=xe.min.x,bt=xe.min.y,je=xe.isBox3?xe.min.z:0;else{let kn=Math.pow(2,-ge);$e=Math.floor(pn.width*kn),Ne=Math.floor(pn.height*kn),He=N.isDataArrayTexture?pn.depth:N.isData3DTexture?Math.floor(pn.depth*kn):1,Ke=0,bt=0,je=0}Pe!==null?(Fe=Pe.x,nt=Pe.y,sn=Pe.z):(Fe=0,nt=0,sn=0);let Zt=re.convert(he.format),It=re.convert(he.type),an;he.isData3DTexture?(le.setTexture3D(he,0),an=C.TEXTURE_3D):he.isDataArrayTexture||he.isCompressedArrayTexture?(le.setTexture2DArray(he,0),an=C.TEXTURE_2D_ARRAY):(le.setTexture2D(he,0),an=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,he.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,he.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,he.unpackAlignment);let en=C.getParameter(C.UNPACK_ROW_LENGTH),Rt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Mt=C.getParameter(C.UNPACK_SKIP_PIXELS),Hn=C.getParameter(C.UNPACK_SKIP_ROWS),Xi=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,pn.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,pn.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ke),C.pixelStorei(C.UNPACK_SKIP_ROWS,bt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,je);let mn=N.isDataArrayTexture||N.isData3DTexture,ii=he.isDataArrayTexture||he.isData3DTexture;if(N.isDepthTexture){let kn=ae.get(N),Jt=ae.get(he),ri=ae.get(kn.__renderTarget),Ms=ae.get(Jt.__renderTarget);k.bindFramebuffer(C.READ_FRAMEBUFFER,ri.__webglFramebuffer),k.bindFramebuffer(C.DRAW_FRAMEBUFFER,Ms.__webglFramebuffer);for(let si=0;si<He;si++)mn&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ae.get(N).__webglTexture,ge,je+si),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ae.get(he).__webglTexture,Be,sn+si)),C.blitFramebuffer(Ke,bt,$e,Ne,Fe,nt,$e,Ne,C.DEPTH_BUFFER_BIT,C.NEAREST);k.bindFramebuffer(C.READ_FRAMEBUFFER,null),k.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ge!==0||N.isRenderTargetTexture||ae.has(N)){let kn=ae.get(N),Jt=ae.get(he);k.bindFramebuffer(C.READ_FRAMEBUFFER,lr),k.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wi);for(let ri=0;ri<He;ri++)mn?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,kn.__webglTexture,ge,je+ri):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,kn.__webglTexture,ge),ii?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Jt.__webglTexture,Be,sn+ri):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Jt.__webglTexture,Be),ge!==0?C.blitFramebuffer(Ke,bt,$e,Ne,Fe,nt,$e,Ne,C.COLOR_BUFFER_BIT,C.NEAREST):ii?C.copyTexSubImage3D(an,Be,Fe,nt,sn+ri,Ke,bt,$e,Ne):C.copyTexSubImage2D(an,Be,Fe,nt,Ke,bt,$e,Ne);k.bindFramebuffer(C.READ_FRAMEBUFFER,null),k.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ii?N.isDataTexture||N.isData3DTexture?C.texSubImage3D(an,Be,Fe,nt,sn,$e,Ne,He,Zt,It,pn.data):he.isCompressedArrayTexture?C.compressedTexSubImage3D(an,Be,Fe,nt,sn,$e,Ne,He,Zt,pn.data):C.texSubImage3D(an,Be,Fe,nt,sn,$e,Ne,He,Zt,It,pn):N.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Be,Fe,nt,$e,Ne,Zt,It,pn.data):N.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Be,Fe,nt,pn.width,pn.height,Zt,pn.data):C.texSubImage2D(C.TEXTURE_2D,Be,Fe,nt,$e,Ne,Zt,It,pn);C.pixelStorei(C.UNPACK_ROW_LENGTH,en),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Rt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Mt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Hn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Xi),Be===0&&he.generateMipmaps&&C.generateMipmap(an),k.unbindTexture()},this.initRenderTarget=function(N){ae.get(N).__webglFramebuffer===void 0&&le.setupRenderTarget(N)},this.initTexture=function(N){N.isCubeTexture?le.setTextureCube(N,0):N.isData3DTexture?le.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?le.setTexture2DArray(N,0):le.setTexture2D(N,0),k.unbindTexture()},this.resetState=function(){b=0,I=0,F=null,k.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=jt._getUnpackColorSpace()}};function Lr(r){let e=new Set,t=new Set,n=new Set,i=s=>{Array.isArray(s)?s.forEach(i):s?.isMaterial&&t.add(s)};r.traverse(s=>{s.geometry&&e.add(s.geometry),i(s.material),i(s.customDepthMaterial),i(s.customDistanceMaterial)});for(let s of t){for(let a of Object.values(s))a?.isTexture&&n.add(a);s.dispose()}n.forEach(s=>s.dispose()),e.forEach(s=>s.dispose())}function Sd(r,e,t=.18){return Math.max(0,r+t-e)}function nl(r){let e=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.3],[1.25,.19],[1.65,.17]];if(r<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++){let[n,i]=e[t],[s,a]=e[t-1];if(r<=n){let o=(r-s)/(n-s),c=o*o*(3-2*o);return a+(i-a)*c}}return e.at(-1)[1]}function wd(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new w;function a(o){for(let c=o;c&&c!==r;c=c.parent)if(i.has(c)||c.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(c.name)||c.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){o=!!o;let c=o!==t;if(!c&&!o)return;t=o,r.updateWorldMatrix(!0,!0);let l=r.matrixWorld.clone().invert();r.traverse(h=>{if(!h.geometry||a(h))return;let u=h.geometry,d=u.getAttribute("position");if(!d||!c&&n.has(u))return;n.has(u)||n.set(u,new Float32Array(d.array));let f=n.get(u);if(d.array.set(f),o){let g=new dt().multiplyMatrices(l,h.matrixWorld),m=g.clone().invert();for(let p=0;p<d.count;p++)s.fromBufferAttribute(d,p).applyMatrix4(g),s.z*=nl(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(m),d.setXYZ(p,s.x,s.y,s.z)}d.needsUpdate=!0,u.computeVertexNormals(),u.computeBoundingBox(),u.computeBoundingSphere()})}}}function Ed({paint:r,carbon:e,metal:t}){let n=new ke;n.name="formula-cockpit";function i(d,f,g,m){let p=new Ze(new wt(new At(d.map(v=>new w(...v))),40,f,10,!1),g);return p.name=m,p.castShadow=p.receiveShadow=!0,n.add(p),p}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let f of[.67,.94])i([[1.19,f,d*.34],[1.92,f-.12,d*1.24],[2.22,f,d*.31]],.024,e,"front-wishbone");let s=new ke;s.name="formula-engine-cover";let a=[],o=[],c=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],l=32;c.forEach(([d,f,g,m],p)=>{for(let v=0;v<=l;v++){let y=v/l*Math.PI*2;if(a.push(d,f+Math.sin(y)*m,Math.cos(y)*g),p<c.length-1&&v<l){let _=p*(l+1)+v,x=_+l+1;o.push(_,x,_+1,_+1,x,x+1)}}});for(let d of[0,c.length-1])for(let f=1;f<l-1;f++){let g=d*(l+1);d===0?o.push(g,g+f,g+f+1):o.push(g,g+f+1,g+f)}let h=new ut;h.setAttribute("position",new Ie(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new Ze(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let f=0;f<5;f++){let g=new Ze(new et(.025,.07,.19),e);g.position.set(-1.48-f*.13,1.57-f*.055,d*.31),g.rotation.z=-.2,s.add(g)}return n.add(s),{group:n,engine:s}}function Ad(r,e,t){let n=e.hat,i=new ke,s=[],a=[],o=[];if(!n||n==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};i.name="headwear:"+n;let c=(v,y=.88,_=0)=>{let x=new Et({color:v,roughness:y,metalness:_,side:Ot});return a.push(x),x},l=c(t.item("hat",n).color),h=c(new lt(t.item("hat",n).color).multiplyScalar(.66)),u=c("#a79672"),d=c("#242422"),f=(v,y)=>{s.push(v);let _=new Ze(v,y);return _.castShadow=_.receiveShadow=!0,i.add(_),_},g=(v,y,_,x=!1)=>f(new wt(new At(v.map(T=>new w(...T)),x),64,y,8,x),_);function m(v,y,_,x,T){let b=[];for(let I=0;I<64;I++){let F=I/64*Math.PI*2;b.push([Math.cos(F)*y,v,.015+Math.sin(F)*_])}g(b,x,T,!0)}function p(v,y,_,x,T){let b=[],I=[],F=[];for(let L=0;L<=12;L++)for(let Z=0;Z<=96;Z++){let H=Z/96*Math.PI*2,ie=L/12,te=v+(y-v)*ie;if(b.push(te*Math.cos(H),_-x*ie*ie,.015+te*.92*Math.sin(H)),I.push(Z/96,L/12),L<12&&Z<96){let K=L*97+Z;F.push(K,K+1,K+96+1,K+1,K+96+2,K+96+1)}}let R=new ut;R.setAttribute("position",new Ie(b,3)),R.setAttribute("uv",new Ie(I,2)),R.setIndex(F),R.computeVertexNormals(),f(R,T),m(_-x,y,y*.92,.004,h)}if(/straw/i.test(n)){let v=new Je(.245,.282,.245,64,8);v.translate(0,1.955,.015),f(v,l),p(.27,.48,1.836,.03,l),m(1.854,.285,.269,.017,d);for(let y=1.86;y<2.075;y+=.012)m(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,u);for(let y=.3;y<.48;y+=.013)m(1.836-.03*((y-.27)/.21)**2,y,y*.92,.0012,u)}else if(/bucket|duck/i.test(n)){let v=new Je(.255,.293,.215,64,8);v.translate(0,1.952,.015),f(v,l),p(.29,.363,1.845,.053,l),m(1.85,.294,.276,.0025,h),m(2.054,.255,.245,.002,h);let y=document.createElement("canvas");y.width=y.height=256;let _=y.getContext("2d");_.fillStyle=t.item("hat",n).color,_.fillRect(0,0,256,256);for(let T=30;T<256;T+=70)for(let b=20;b<256;b+=80)_.fillStyle="#d9ad42",_.beginPath(),_.ellipse(b,T,12,8,0,0,Math.PI*2),_.fill(),_.beginPath(),_.arc(b+9,T-7,6,0,Math.PI*2),_.fill(),_.fillStyle="#e89c34",_.fillRect(b+13,T-8,6,3),_.fillStyle="#201a13",_.fillRect(b+10,T-9,2,2);let x=new Gt(y);x.colorSpace=xt,x.wrapS=x.wrapT=Rn,x.repeat.set(4,1),o.push(x),l.map=x}else{let v=new Ft(1,64,36,0,Math.PI*2,0,Math.PI*.51);v.scale(.305,.235,.288),v.translate(0,1.82,.015),f(v,l),m(1.818,.305,.288,.007,h);let y=[],_=[],x=[],T=32,b=16;for(let z=0;z<=b;z++)for(let R=0;R<=T;R++){let L=R/T*2-1,Z=z/b,H=L*(.292-.018*Z),ie=.17+.4*Math.sqrt(Math.max(.08,1-L*L))*Z,te=1.814-.028*Z-.027*L*L*Z;if(y.push(H,te,ie),_.push(R/T,z/b),R<T&&z<b){let K=z*(T+1)+R;x.push(K,K+1,K+T+1,K+1,K+T+2,K+T+1)}}let I=new ut;I.setAttribute("position",new Ie(y,3)),I.setAttribute("uv",new Ie(_,2)),I.setIndex(x),I.computeVertexNormals(),f(I,l);let F=[];for(let z=0;z<=T;z++){let R=z/T*2-1;F.push([R*.274,1.786-.027*R*R,.17+.4*Math.sqrt(Math.max(.08,1-R*R))])}g(F,.004,h);for(let z=0;z<6;z++){let R=z/6*Math.PI*2,L=[];for(let Z=0;Z<=24;Z++){let H=Z/24*Math.PI/2;L.push([.307*Math.sin(H)*Math.cos(R),1.82+.237*Math.cos(H),.015+.29*Math.sin(H)*Math.sin(R)])}g(L,.0017,h)}let U=new Ft(.015,20,12);if(U.translate(0,2.058,.015),f(U,h),/propeller/i.test(n)){let z=c("#c7c4b9",.35,.8),R=new Je(.006,.006,.065,12);R.translate(0,2.09,.015),f(R,z);for(let L=0;L<3;L++){let Z=new Ft(1,20,12);Z.scale(.115,.007,.027),Z.translate(.086,0,0),Z.rotateY(L/3*Math.PI*2),Z.translate(0,2.126,.015),f(Z,c(["#ba3847","#3e83ae","#d4b74a"][L]))}}else{let z=document.createElement("canvas");z.width=256,z.height=128;let R=z.getContext("2d");R.clearRect(0,0,256,128),R.fillStyle="#d0b77a",R.font="bold 62px Arial",R.textAlign="center",R.fillText("P21",128,88);let L=new Gt(z);L.colorSpace=xt,o.push(L);let Z=new Et({map:L,transparent:!0,alphaTest:.1,roughness:.9});a.push(Z);let H=new qt(.12,.06);H.translate(0,1.945,.265),f(H,Z)}}return r.bones.head.add(i),i.position.copy(new w(...r.bones.head.userData.rest).negate()),{dispose(){i.removeFromParent(),s.forEach(v=>v.dispose()),a.forEach(v=>v.dispose()),o.forEach(v=>v.dispose())}}}var Pi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Cd(r){let e=[],t={};function n(p,v,y,_,x=0){let T=new rs;T.name=p;let b=v?v.userData.rest:[0,0,0];return T.position.set(y-b[0],_-b[1],x-b[2]),T.userData.rest=[y,_,x],(v||r).add(T),e.push(T),t[p]=T,T}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[p,v]of[["left",-1],["right",1]]){let y=n(p+"Shoulder",a,v*.49,1.09),_=n(p+"Elbow",y,v*.66,.57),x=n(p+"Wrist",_,v*.78,.04,.035),T=n(p+"Hand",x,v*.79,-.15,.07);for(let F=0;F<4;F++)n(p+"Finger"+F,T,v*(.5-(.175+F*.019))*2.55,-.17-F*.007,.07);n(p+"Thumb",T,v*.63,-.13,.11);let b=n(p+"Hip",i,v*.23,-.2,-.01),I=n(p+"Knee",b,v*.34,-.77,-.01);n(p+"Ankle",I,v*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new Xs(e);function h(p,v,y){let _=v<.5?"left":"right",x=i,T=i,b=0;if(p===1)x=s,T=a,b=1-Pi(.25,.44,y);else if(p===2||p===9)y<.25?(x=a,T=t[_+"Shoulder"],b=Pi(.175,.245,y)):y<.4?(x=t[_+"Shoulder"],T=t[_+"Elbow"],b=Pi(.29,.38,y)):(x=t[_+"Elbow"],T=t[_+"Wrist"],b=Pi(.43,.49,y));else if(p===3){let I=v<.5?v:1-v;y>.54?(x=t[_+"Hand"],T=t[_+(I>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((I-.175)/.019))))],b=Pi(.54,.566,y)):(x=t[_+"Wrist"],T=t[_+"Hand"],b=Pi(.49,.53,y))}else p===4?y<.57?(x=i,T=t[_+"Hip"],b=Pi(.5,.57,y)):y<.76?(x=t[_+"Hip"],T=t[_+"Knee"],b=Pi(.66,.74,y)):(x=t[_+"Knee"],T=t[_+"Ankle"],b=Pi(.79,.84,y)):p===5||p===8?x=T=t[_+"Ankle"]:p===6||p===10?x=T=c:p===7&&(x=a,T=o,b=1-Pi(.17,.225,y));return{indices:[e.indexOf(x),e.indexOf(T),0,0],weights:[1-b,b,0,0]}}function u(p,v){let y=p.getAttribute("bodyUv"),_=p.getAttribute("surface"),x=[],T=[];for(let I=0;I<y.count;I++){let F=h(_.getX(I),y.getX(I),y.getY(I));x.push(...F.indices),T.push(...F.weights)}p.setAttribute("skinIndex",new vr(x,4)),p.setAttribute("skinWeight",new Ie(T,4));let b=new Ws(p,v);return r.add(b),b.bind(l,new dt),b.frustumCulled=!1,b}let d=0,f=!1;function g(p,v,y){d+=(Number(v)-d)*(1-Math.exp(-Math.min(.1,y)*9));let _=Math.sin(p*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(p*.57)*.01*d,(f?.025:0)+Math.sin(p*.36)*.024*d,(f?-.016:0)+Math.sin(p*.41)*.008*d);for(let[x,T]of[["left",-1],["right",1]]){t[x+"Shoulder"].rotation.z=(f?T*.026:0)+(Math.sin(p*.79+T*.5)*.009+T*.005)*d,t[x+"Elbow"].rotation.x=(f?T<0?-.045:-.085:0)+(Math.sin(p*.67+T*.4)*.012-.025)*d,t[x+"Hand"].rotation.x=(f?.025:0)+Math.sin(p*.61+T)*.01*d;for(let b=0;b<4;b++)t[x+"Finger"+b].rotation.x=(.035+Math.sin(p*.53+b*.25+T)*.012)*d}r.updateMatrixWorld(!0),l.update()}function m(p,v){r.updateMatrixWorld(!0),t[v].attach(p)}return{skeleton:l,bones:t,mesh:u,update:g,attach:m,weights:h,setRelaxedPose(p){f=!!p},dispose(){l.dispose()}}}var il=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function Rd(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=il(o,.25,.12),u=il(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*il(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*il(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}function Pd(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new Et({color:i[t]||"#30241d",roughness:.96}),a=new Uint8Array(16384*4);for(let u=0;u<128;u++)for(let d=0;d<128;d++){let f=(u*128+d)*4,g=Math.sin(d*127.1+u*311.7)*43758.5453,m=128+Math.round(28*Math.sin(u*1.7)+28*(g-Math.floor(g)-.5));a[f]=a[f+1]=a[f+2]=m,a[f+3]=255}let o=new ki(a,128,128);o.wrapS=o.wrapT=Rn,o.repeat.set(3,3),o.magFilter=qn,o.minFilter=yi,o.generateMipmaps=!0,o.needsUpdate=!0,s.bumpMap=o,s.bumpScale=.002;let c=e.sculptHairTexture?.clone();c&&(c.center.set(.5,.5),c.rotation=Math.PI/2,c.repeat.set(2,2),c.needsUpdate=!0,s.bumpMap=c,s.bumpScale=.0024,i[t]||(s.map=c,s.color.set("#c7b9a4")));let l=new ke;l.name="hairstyle:"+t;function h(u,d,f,g,m,p,v=0){let y=new Ft(1,12,10);n.push(y);let _=new Ze(y,s);_.position.set(u,d,f),_.scale.set(g,m,p),_.rotation.z=v,l.add(_)}if(t==="hairDreads"){let u=new Ft(1,48,24,0,Math.PI*2,0,Math.PI*.62);u.scale(.275,.292,.278),u.translate(0,1.62,.1),n.push(u),l.add(new Ze(u,s));for(let d=0;d<5;d++)for(let f=0;f<11;f++){let g=(f+d%2*.5)/11*Math.PI*2,m=.3+d*.28,p=Math.cos(g)*Math.sin(m)*.278,v=.1+Math.sin(g)*Math.sin(m)*.285,y=1.62+Math.cos(m)*.299;if(Math.sin(g)>.25&&d===4)continue;let _=Math.sin(g)>.25?Math.min(.1+d*.035,Math.max(.035,y-1.7)):.1+d*.035,x=[new w(p,y,v),new w(p*1.1,y-.035,.1+(v-.1)*1.12),new w(p*1.16,y-_*.65,.1+(v-.1)*1.17),new w(p*1.12,y-_,.1+(v-.1)*1.18)],T=new wt(new At(x),16,.02,8,!1),b=T.getAttribute("position");for(let I=0;I<=16;I++){let F=new w;for(let z=0;z<=8;z++)F.add(new w().fromBufferAttribute(b,I*9+z));F.multiplyScalar(1/9);let U=(1-.6*Math.pow(I/16,5))*(1+.045*Math.sin(I*2.4+f));for(let z=0;z<=8;z++){let R=I*9+z,L=new w().fromBufferAttribute(b,R).sub(F).multiplyScalar(U).add(F);b.setXYZ(R,L.x,L.y,L.z)}}T.computeVertexNormals(),n.push(T),l.add(new Ze(T,s))}}else if(t!=="hairBald"){let u=t==="hairBuzz",d=t==="hairAfro",f=t==="hairMohawk"||t==="hairBlue",g=t==="hairDreads",m=t==="hairRocker";for(let p=0;p<7;p++)for(let v=0;v<12;v++){let y=v/12*Math.PI*2,_=p/7*Math.PI*.57;if(f&&Math.abs(Math.cos(y))>.27)continue;let x=Math.cos(y)*Math.sin(_)*.23,T=.1+Math.sin(y)*Math.sin(_)*.24,b=t==="hairCurly"||d,I=u?.026:b?.067:.045,F=u?.018:d?.12:f?.16:b?.065:.075,U=1.62+Math.cos(_)*.29;t==="hairPompadour"&&(F+=Math.max(0,Math.sin(y))*.1,U+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(U+=x*.16),(g||m)&&(F=p>3?.18:.065,U-=p>3?.07:0),h(x,U,T,I,F,I,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(l),l.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),l.position.y+=e.sculptHairOffset||0,l.position.z+=e.sculptHairDepth||0,{dispose(){l.removeFromParent(),n.forEach(u=>u.dispose()),s.dispose(),o.dispose(),c?.dispose()}}}function Id(r,e,t){let n=[],i=[],s=new ke;if(!e.glasses||e.glasses==="none"||e.helmet&&e.helmet!=="none")return{dispose(){}};s.name="eyewear:"+e.glasses;let a=e.glasses,o=/round|rimless/.test(a),c=/sport/.test(a),l=/Gold|Silver|browline/.test(a),h=new Et({color:t.item("glasses",a).color,metalness:l?.85:.08,roughness:l?.28:.38}),u=new _n({color:c?"#406d80":"#182322",metalness:c?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:!0,opacity:.94,side:Ot});i.push(h,u);let d=(g,m)=>{n.push(g);let p=new Ze(g,m);return s.add(p),p},f=(g,m)=>d(new wt(new At(g.map(p=>new w(...p))),32,m,8,!1),h);for(let g of[-1,1]){let m=g*.125,p=1.63,v=.391,y=c?.127:.112,_=o?.079:c?.06:.067,x=[],T=new Wt;for(let F=0;F<=64;F++){let U=F/64*Math.PI*2,z=Math.cos(U),R=Math.sin(U),L=y*(o?z:Math.sign(z)*Math.pow(Math.abs(z),.65)),Z=_*(o?R:Math.sign(R)*Math.pow(Math.abs(R),.65));F===0?T.moveTo(L,Z):T.lineTo(L,Z),x.push(new w(m+L,p+Z,v-Math.abs(L)*.16))}let b=new Vi(T,32);b.translate(m,p,v-.005),d(b,u),d(new wt(new At(x,!0),64,l?.0045:.0085,8,!0),h),f([[g*.233,p+.008,.376],[g*.256,p+.004,.3],[g*.273,p-.005,.17],[g*.282,p-.024,.085]],l?.0045:.008);let I=new Ft(.011,16,10);I.translate(g*.237,p+.009,.374),d(I,h)}return f([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],l?.004:.006),r.bones.head.add(s),s.position.copy(new w(...r.bones.head.userData.rest).negate()),s.position.z+=e.sculptEyewearDepth||0,{dispose(){s.removeFromParent(),n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}function Ld(r,e="#c5b899"){let t=new ke;t.name="wardrobe-wrist-watch",t.position.set(.744,.015,.026),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Et({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Et({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,T,b,I,F)=>{let U=new Ze(x,T);return U.position.set(b,I,F),t.add(U),U},o=a(new Ut(.072,.012,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.9,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let T=x*Math.PI/9,b=a(new et(.026,.049,.016),i,Math.cos(T)*.065,0,Math.sin(T)*.072);b.rotation.y=-T}let c=/square|smart/i.test(r),l=a(c?new et(.147,.153,.022):new Je(.078,.073,.022,64),i,0,0,.078);if(c||(l.rotation.x=Math.PI/2),!c)a(new Ut(.069,.006,12,64),i,0,0,.095);else for(let[x,T,b,I]of[[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])a(new et(b,I,.009),i,x,T,.095);let h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),f=/Daytona|square|rose/i.test(r),g=u.createRadialGradient(190,170,20,256,256,256);g.addColorStop(0,d?"#237050":f?"#fff7db":"#294559"),g.addColorStop(1,d?"#072b20":f?"#c7c4b4":"#06121c"),u.fillStyle=g,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=f?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let m=(x,T,b)=>{u.save(),u.rotate(x),u.strokeStyle=f?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-T),u.stroke(),u.restore()};if(m(-Math.PI/3,112,13),m(Math.PI/3,168,9),m(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=f?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80),/GMT/i.test(r)){for(let x=0;x<24;x++)u.beginPath(),u.strokeStyle=x<12?"#a52d40":"#274e9a",u.lineWidth=24,u.arc(0,0,240,x*Math.PI/12,(x+1)*Math.PI/12),u.stroke();m(-Math.PI*.55,172,6)}if(/Daytona/i.test(r))for(let[x,T]of[[-91,35],[91,35],[0,128]])u.fillStyle="#182027",u.beginPath(),u.arc(x,T,48,0,Math.PI*2),u.fill(),u.strokeStyle="#e3dfd3",u.lineWidth=3,u.beginPath(),u.moveTo(x,T),u.lineTo(x+17,T-28),u.stroke();if(/Skeleton/i.test(r))for(let[x,T,b]of[[-60,60,65],[80,45,43],[15,-115,40]]){u.strokeStyle="#d6b783",u.lineWidth=9,u.beginPath(),u.arc(x,T,b,0,Math.PI*2),u.stroke();for(let I=0;I<8;I++){let F=I*Math.PI/4;u.beginPath(),u.moveTo(x+Math.cos(F)*15,T+Math.sin(F)*15),u.lineTo(x+Math.cos(F)*b,T+Math.sin(F)*b),u.stroke()}}/smart/i.test(r)&&(u.fillStyle="#06131d",u.fillRect(-256,-256,512,512),u.fillStyle="#8ae9c7",u.font="bold 100px Arial",u.fillText("10:10",0,10),u.font="32px Arial",u.fillText("POKER21",0,88));let p=new Gt(h);p.colorSpace=xt,p.anisotropy=4;let v=a(c?new qt(.13,.13):new In(.066,64),new Et({map:p,roughness:.34,metalness:.1}),0,0,.098),y=a(c?new qt(.13,.13):new In(.066,64),new _n({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.101),_=a(new Je(.012,.012,.019,16),i,.085,0,.08);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(T=>{T.geometry?.dispose(),T.material&&x.add(T.material)});for(let T of x)T.dispose();p.dispose()}}}function Dd(r="#d3b15b",e="rubyLion"){let t=new ke;t.name="wardrobe-finger-ring",t.position.set(.731,-.225,.07);let n=["silverSpade","clubSignet","diamondKing"].includes(e),i=new Et({color:n?"#c6d3df":"#c5a14d",metalness:.9,roughness:.24}),s=new _n({color:e==="rubyLion"?"#a51c39":e==="emeraldCrown"?"#167953":e==="diamondKing"?"#e8f7ff":r,metalness:.08,roughness:.1,clearcoat:1}),a=new Ze(new Ut(.026,.006,12,48),i);a.name="ring-band",a.rotation.x=Math.PI/2,t.add(a);let o=new Ze(e==="clubSignet"?new Je(.021,.019,.012,8):new et(.029,.029,.012),i);e==="clubSignet"&&(o.rotation.x=Math.PI/2),o.name="ring-bezel",o.position.z=.028,t.add(o);let c;if(e==="silverSpade"){let h=new Wt;h.moveTo(0,.019),h.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009),h.quadraticCurveTo(-.004,-.014,0,-.006),h.quadraticCurveTo(.004,-.014,.012,-.009),h.bezierCurveTo(.022,-.002,.008,.007,0,.019),h.lineTo(.006,-.017),h.lineTo(-.006,-.017),h.closePath(),c=new Vt(h,{depth:.003,bevelEnabled:!1})}else e==="clubSignet"||e==="goldAces"?c=new et(.022,.025,.004):c=e==="emeraldCrown"?new et(.02,.024,.012):new cs(e==="diamondKing"?.021:.017);let l=new Ze(c,e==="silverSpade"||e==="goldAces"?i:s);if(l.name="ring-face:"+e,l.scale.z=.5,l.position.z=.039,t.add(l),["clubSignet","goldAces"].includes(e)){let h=document.createElement("canvas");h.width=h.height=128;let u=h.getContext("2d");u.fillStyle=n?"#24343d":"#45341a",u.fillRect(0,0,128,128),u.fillStyle=n?"#e1eaf1":"#edce83",u.font="bold 48px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText(e==="goldAces"?"AA":"P21",64,66,116),s.map=new Gt(h),s.map.colorSpace=xt,l.material=s}return{group:t,dispose(){t.traverse(h=>h.geometry?.dispose()),s.map?.dispose(),i.dispose(),s.dispose()}}}var rl=new Map;async function om(r){rl.has(r)||rl.set(r,fetch("./assets/player-hall/character-3d/sculpt/"+r+".bin").then(a=>{if(!a.ok)throw Error("Character anatomy: "+a.status);return a.arrayBuffer()}).catch(a=>{throw rl.delete(r),a}));let e=await rl.get(r),t=new DataView(e).getUint32(0,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,t))),i=4+t,s=new ut;return s.setAttribute("position",new dn(new Float32Array(e.slice(i,i+n.vertices*12)),3)),s.setAttribute("normal",new dn(new Float32Array(e.slice(i+n.vertices*12,i+n.vertices*24)),3)),s.setIndex(new dn(new Uint32Array(e.slice(i+n.vertices*24)),1)),s}var va=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},Dr=r=>{let e=Math.sin(r*127.1+311.7)*43758.5453;return e-Math.floor(e)};async function sl(r,e){let t=new ke,n=Cd(t),i=[],s=[],a=[],o=Rd(e.body),c=r.wardrobeSubcategory("pants",e.pants)==="shorts",l=e.suit?.endsWith("Tee"),h=e.suit?.endsWith("Tank"),u=e.helmet&&e.helmet!=="none",d=!u||e.visor==="open",f=Promise.all(["head","face","hand-left","hand-right","shirt-"+(h?"tank":l?"tee":"jacket"),c?"shorts":"pants",...u?["helmet-shell"]:[]].map(om)),g=(D,j=.8,Q=0,oe=!1)=>{let q=oe?_n:Et,J=new q({color:D,roughness:j,metalness:Q});return s.push(J),J},m=g("#ffffff",.96),p=g("#ffffff",.73),v=g("#6b4735",.84),y=g("#73503c",.59),_=g("#453127",.51),x=g("#241b14",.21),T=g("#433627",.55),b=g("#0b0908",.15),I=g("#efe6d2",.32),F=g("#6e5341",.42),U=g(r.item("suit",e.suit).color,.94,0,!0),z=g(new lt(r.item("suit",e.suit).color).multiplyScalar(.7),.92),R=g(r.item("pants",e.pants).color,.96),L=g(new lt(r.item("pants",e.pants).color).multiplyScalar(.68),.94),Z=g(r.item("shoes",e.shoes).color,.49,0,!0),H=g(new lt(r.item("shoes",e.shoes).color).multiplyScalar(.78),.64),ie=g("#dedbd3",.84),te=g("#b1afa8",.93),K=g("#c5a259",.3,.88);U.clearcoat=/leather|Biker/i.test(e.suit)?.25:0,U.roughness=/leather|Biker/i.test(e.suit)?.46:.94,U.sheen=/Knit|velvet/i.test(e.suit)?.65:.12,U.sheenRoughness=.85,Z.clearcoat=.18,Z.clearcoatRoughness=.48,Z.color.r>Z.color.g*1.8&&Z.color.r>Z.color.b*1.4&&(Z.color.multiplyScalar(.62),H.color.multiplyScalar(.62));let de=["classic","ruby","midnight"].includes(e.pants);de&&(R.color.set("#171b20"),L.color.set("#101317"));let Le=g("#ffffff",.97);Le.vertexColors=!0,Le.side=Ot;function ze(D){let j=new Uint8Array(65536);for(let oe=0;oe<128;oe++)for(let q=0;q<128;q++){let J=(oe*128+q)*4,re=D==="cloth"?128+24*Math.cos(q*Math.PI)+20*Math.sin(oe*Math.PI/2)+Dr(J)*15:128+(Dr(J)-.5)*48;j[J]=j[J+1]=j[J+2]=re,j[J+3]=255}let Q=new ki(j,128,128);return Q.wrapS=Q.wrapT=Rn,Q.repeat.set(D==="cloth"?4:8,D==="cloth"?4:8),Q.magFilter=qn,Q.minFilter=yi,Q.generateMipmaps=!0,Q.anisotropy=4,Q.needsUpdate=!0,a.push(Q),Q}let[Se,[Ee,ee]]=await Promise.all([f,Promise.all(["fur","skin"].map(D=>new sa().loadAsync("./assets/player-hall/character-3d/sculpt/"+D+"-albedo-v1.webp")))]);for(let D of[Ee,ee])D.colorSpace=xt,D.wrapS=D.wrapT=Rn,D.anisotropy=4,a.push(D);Ee.repeat.set(2,3),ee.repeat.set(2,2),m.map=Ee,m.bumpMap=Ee,m.bumpScale=.0024,p.map=ee,m.onBeforeCompile=D=>{D.vertexShader=`attribute float surface;varying float furRegion;varying float furHeight;
`+D.vertexShader,D.vertexShader=D.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
furRegion=surface;furHeight=position.y;`),D.fragmentShader=`varying float furRegion;varying float furHeight;
`+D.fragmentShader,D.fragmentShader=D.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `)},m.customProgramCacheKey=()=>"sculpted-chimp-beard-v1";let Te=ze("cloth"),be=ze("skin");for(let D of[U,z,R,L])D.bumpMap=Te,D.bumpScale=8e-4;for(let D of[p,y,_])D.bumpMap=be,D.bumpScale=65e-5;function Y(D,j,Q,oe,q=!0){let J=D.getAttribute("position"),re=[],ce=[];for(let C=0;C<J.count;C++){let pe=J.getX(C),Re=J.getY(C),ye=J.getZ(C),Ge=typeof Q=="function"?Q(pe,Re,ye):Q;if(q){let rt=o(pe,.5-Re/3.825,ye,Ge);if(oe==="shirt-body"){let Oe=o(pe,.5-Re/3.825,ye,1),ft=o(pe,.5-Re/3.825,ye,2),ot=va(.45,.6,Math.abs(pe));rt=Oe.map((Ye,gt)=>Ye+(ft[gt]-Ye)*ot)}pe=rt[0],Re=(.5-rt[1])*3.825,ye=rt[2],J.setXYZ(C,pe,Re,ye)}re.push(.5+pe/2.55,.5-Re/3.825),ce.push(Ge)}D.setAttribute("bodyUv",new Ie(re,2)),D.setAttribute("surface",new Ie(ce,1)),D.getAttribute("uv")||D.setAttribute("uv",new Ie(re,2)),(!D.getAttribute("normal")||q&&e.body&&e.body!=="bodyNormal")&&D.computeVertexNormals(),i.push(D);let me=n.mesh(D,j);return me.name=oe||"",me.castShadow=me.receiveShadow=!0,me}function Ue(D,j,Q,oe,q){let J=new Ft(1,40,28);return J.scale(...Q),J.translate(...j),Y(J,D,oe,q)}function A(D,j,Q,oe,q,J=!1){return Y(new wt(new At(D.map(re=>new w(...re)),J),Math.max(24,D.length*5),j,8,J),Q,oe,q)}function P(D,j,Q,oe,q,J,re,ce,me){let C=[];for(let pe=0;pe<64;pe++){let Re=pe/64*Math.PI*2;C.push([D+oe*Math.cos(Re),j,Q+q*Math.sin(Re)])}return A(C,J,re,ce,me,!0)}function X(D,j,Q,oe,q,J,re,ce,me=.023){V([[D,j+me,Q,oe+.003,q+.003],[D,j+.007,Q,oe+.001,q+.001],[D,j,Q,oe,q]],J,re,ce,{rings:12,sides:64,capTop:!1,capBottom:!1});let C=[],pe=[],Re=64;for(let Ge=0;Ge<=Re;Ge++){let rt=Ge/Re*Math.PI*2;if(C.push(D+oe*Math.cos(rt),j,Q+q*Math.sin(rt),D+(oe-.011)*Math.cos(rt),j+.001,Q+(q-.011)*Math.sin(rt)),Ge<Re){let Oe=Ge*2;pe.push(Oe,Oe+2,Oe+1,Oe+2,Oe+3,Oe+1)}}let ye=new ut;ye.setAttribute("position",new Ie(C,3)),ye.setIndex(pe),ye.computeVertexNormals(),Y(ye,J,re,ce+"-inside")}function V(D,j,Q,oe,{sides:q=64,rings:J=80,clothFolds:re=0,capTop:ce=!0,capBottom:me=!0,fork:C=!1}={}){let pe=[],Re=[],ye=[],Ge=D[0][1],rt=D.at(-1)[1];function Oe(Ye){let gt=0;for(;gt<D.length-2&&D[gt+1][1]>Ye;)gt++;let vt=D[gt],mt=D[gt+1],_t=Math.max(0,Math.min(1,(vt[1]-Ye)/(vt[1]-mt[1])));return vt.map((kt,Ht)=>{if(Ht===1)return Ye;let Kt=D[Math.max(0,gt-1)][Ht],ln=D[Math.min(D.length-1,gt+2)][Ht];return .5*(2*kt+(-Kt+mt[Ht])*_t+(2*Kt-5*kt+4*mt[Ht]-ln)*_t*_t+(-Kt+3*kt-3*mt[Ht]+ln)*_t*_t*_t)})}for(let Ye=0;Ye<=J;Ye++){let gt=Ge+(rt-Ge)*Ye/J,[vt,,mt,_t,kt]=Oe(gt);for(let Ht=0;Ht<=q;Ht++){let Kt=Ht/q*Math.PI*2+(C?Math.PI/2:0),ln=vt+_t*Math.cos(Kt),Ln=mt+kt*Math.sin(Kt),or=gt;if(C){let Mn=Ht/q,_i=Mn<=.5,lr=_i?Mn*4*Math.PI:Math.PI+(Mn-.5)*4*Math.PI,Wi=vt+(_i?-1:1)*_t/2+_t/2*Math.cos(lr),N=mt+kt*Math.sin(lr),he=va(.02,-.28,gt);ln+=(Wi-ln)*he,Ln+=(N-Ln)*he}if(re){let Mn=Math.sin(Math.PI*Ye/J)*(.25+.75*Math.exp(-Math.pow((gt-.3)/.24,2))),_i=Math.sin(gt*26+Kt*3)*Math.sin(Kt*2+.4)*Mn;Ln+=re*_i*Math.sin(Kt),ln+=re*_i*Math.cos(Kt),or+=re*.35*Math.sin(Kt*5+gt*10)*Mn}if(pe.push(ln,or,Ln),Re.push(Ht/q,Ye/J),Ye<J&&Ht<q){let Mn=Ye*(q+1)+Ht;ye.push(Mn,Mn+1,Mn+q+1,Mn+1,Mn+q+2,Mn+q+1)}}}for(let Ye of[0,J]){if(Ye===0&&!ce||Ye===J&&!me)continue;let gt=Ye*(q+1),vt=pe.length/3,mt=new w;for(let _t=0;_t<q;_t++)mt.add(new w(...pe.slice((gt+_t)*3,(gt+_t)*3+3)));mt.multiplyScalar(1/q),pe.push(mt.x,mt.y,mt.z),Re.push(.5,Ye/J);for(let _t=0;_t<q;_t++)ye.push(vt,gt+_t+(Ye===0?1:0),gt+_t+(Ye===0?0:1))}let ft=new ut;ft.setAttribute("position",new Ie(pe,3)),ft.setAttribute("uv",new Ie(Re,2)),ft.setIndex(ye),ft.computeVertexNormals();let ot=ft.getAttribute("normal");for(let Ye=0;Ye<=J;Ye++){let gt=Ye*(q+1),vt=gt+q,mt=new w().fromBufferAttribute(ot,gt).add(new w().fromBufferAttribute(ot,vt)).normalize();ot.setXYZ(gt,mt.x,mt.y,mt.z),ot.setXYZ(vt,mt.x,mt.y,mt.z)}return Y(ft,j,Q,oe)}if(d){let D=[],j=[],Q=Se[0].getAttribute("position"),oe=Se[1].getAttribute("position");for(let q=0;q<Q.count;q++)D.push((Math.atan2(Q.getZ(q)-.015,Q.getX(q))+Math.PI)/(2*Math.PI),(Q.getY(q)-1.17)/.84);for(let q=0;q<oe.count;q++)j.push((oe.getX(q)+.26)/.52,(oe.getY(q)-1.29)/.48);Se[0].setAttribute("uv",new Ie(D,2)),Se[1].setAttribute("uv",new Ie(j,2)),Y(Se[0],m,6,"sculpt-cranium",!1),Y(Se[1],p,6,"sculpt-facial-mask",!1)}else Se[0].dispose(),Se[1].dispose();for(let D=0;D<2;D++)Y(Se[D+2],p,3,D?"sculpt-right-hand":"sculpt-left-hand",!1);if(d){for(let j of[-1,1]){Ue(x,[j*.112,1.64,.277],[.04,.022,.032],6,"eye-socket"),Ue(T,[j*.112,1.641,.311],[.015,.016,.008],6,"amber-iris"),Ue(b,[j*.112,1.642,.32],[.009,.012,.003],6,"pupil"),Ue(I,[j*.104,1.65,.324],[.002,.002,.001],6,"eye-catchlight");let Q=[];for(let oe=0;oe<=36;oe++){let q=oe/36*Math.PI*2;Q.push([j*.112+.044*Math.cos(q),1.64+.025*Math.sin(q),.281+.017*Math.sin(q)**2])}A(Q,.0035,p,6,"eyelid",!0),A([[j*.045,1.688,.273],[j*.09,1.689,.281],[j*.14,1.693,.265],[j*.185,1.68,.238]],.03,m,6,"brow-ridge"),A([[j*.059,1.597,.31],[j*.103,1.593,.304],[j*.151,1.61,.276]],.0016,v,6,"orbital-fold"),Ue(b,[j*.029,1.55,.369],[.012,.007,.004],6,"nostril-cavity"),A([[j*.075,1.515,.34],[j*.116,1.49,.34],[j*.139,1.453,.323]],.0016,v,6,"muzzle-fold")}let D=[[-.15,1.438,.32],[-.086,1.431,.353],[0,1.429,.37],[.086,1.431,.353],[.15,1.438,.32]];A(D,.008,y,6,"upper-lip"),A(D.map(([j,Q,oe])=>[j,Q-.012,oe-.003]),.009,y,6,"lower-lip"),A(D.map(([j,Q,oe])=>[j,Q-.004,oe+.005]),.0026,v,6,"mouth-opening"),A([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,v,6,"chin-fold");for(let j of[-1,1]){let Q=[],oe=[],q=[];for(let pe=0;pe<=16;pe++)for(let Re=0;Re<=64;Re++){let ye=pe/16,Ge=Re/64*Math.PI*2,rt=j*(.295+.082*ye*Math.cos(Ge)),Oe=1.674+.119*ye*Math.sin(Ge),ft=.035+.04*ye*ye+.009*Math.cos(Ge)*ye;Q.push(rt,Oe,ft);let ot=new lt("#8e6045").lerp(new lt("#b18361"),ye*ye);if(oe.push(ot.r,ot.g,ot.b),pe<16&&Re<64){let Ye=pe*65+Re;q.push(Ye,Ye+1,Ye+64+1,Ye+1,Ye+64+2,Ye+64+1)}}let ce=new ut;ce.setAttribute("position",new Ie(Q,3)),ce.setAttribute("color",new Ie(oe,3)),ce.setIndex(q);let me=g("#ffffff",.78);me.vertexColors=!0,me.side=Ot,Y(ce,me,10,"ear-bowl");let C=[];for(let pe=0;pe<64;pe++){let Re=pe/64*Math.PI*2;C.push([j*(.295+.082*Math.cos(Re)),1.674+.119*Math.sin(Re),.075+.009*Math.cos(Re)])}A(C,.011,p,10,"ear-helix",!0),A([[j*.311,1.607,.056],[j*.332,1.649,.057],[j*.323,1.697,.057],[j*.294,1.716,.052]],.007,v,10,"ear-antihelix"),Ue(p,[j*.307,1.562,.047],[.035,.032,.027],10,"ear-lobe")}}V([[0,1.43,0,.12,.13],[0,1.3,0,.15,.145],[0,1.15,0,.18,.155]],m,7,"fur-neck");for(let D of[-1,1]){let j=h?[[D*.44,1.15,-.015,.11,.13],[D*.51,1.04,-.012,.16,.155]]:l?[[D*.57,.83,-.005,.134,.132]]:[[D*.744,.07,.026,.065,.061]];(h||l)&&j.push([D*.57,.8,-.005,.134,.132],[D*.64,.59,.01,.116,.122],[D*.675,.43,.025,.139,.132],[D*.714,.22,.035,.116,.105]),j.push([D*.744,.015,.026,.066,.061]),V(j,m,2,"fur-arm-"+D);let Q=c?[[D*.285,-.655,-.02,.126,.125],[D*.315,-.74,-.02,.135,.13],[D*.34,-.91,-.008,.119,.112],[D*.37,-1.09,-.01,.127,.106],[D*.395,-1.34,-.015,.087,.081],[D*.41,-1.61,.01,.061,.064]]:[[D*.41,-1.52,.01,.061,.064],[D*.41,-1.61,.01,.061,.064]];V(Q,m,4,"fur-leg-"+D);for(let oe=0;oe<4;oe++){let q=[-.06,-.02,.022,.06][oe],J=[.139,.178,.167,.127][oe],re=D*(.755+q*1.12),ce=-.245-J*.84,me=new Ft(1,20,14);me.scale(.01,.018,.0035),me.translate(re,ce,.124),Y(me,F,3,"fingernail"),A([[re-.014,ce+.049,.107],[re,ce+.051,.111],[re+.014,ce+.049,.107]],.0013,v,3,"finger-crease")}A([[D*.71,-.032,.071],[D*.75,-.039,.077],[D*.794,-.032,.068]],.0016,v,3,"wrist-fold")}let S=[],B=Se[4].getAttribute("position");for(let D=0;D<B.count;D++)S.push(Math.abs(B.getX(D))>.49?1:0);Se[4].setAttribute("seamRegion",new Ie(S,1));let W=U.clone(),k=new ir({depthPacking:vs});s.push(W,k);let ve=D=>{D.vertexShader=`attribute float seamRegion;varying vec2 garmentHemCoords;
`+D.vertexShader,D.vertexShader=D.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
garmentHemCoords=vec2(seamRegion,position.y);`),D.fragmentShader=`varying vec2 garmentHemCoords;
`+D.fragmentShader,D.fragmentShader=D.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<`+(l?.798:.033).toFixed(3)+"))discard;")};W.onBeforeCompile=ve,k.onBeforeCompile=ve,W.customProgramCacheKey=()=>"sculpt-sewn-hem-"+(l?"tee":h?"tank":"jacket"),k.customProgramCacheKey=()=>"sculpt-sewn-depth-"+(l?"tee":h?"tank":"jacket");let ae=Y(Se[4],W,(D,j)=>Math.abs(D)>.52&&j>.015?2:1,"shirt-body");ae.customDepthMaterial=k;for(let D of[-1,1])h||X(D*(l?.57:.744),l?.773:.014,l?.01:.026,l?.165:.08,l?.161:.076,z,2,"sewn-sleeve-hem",l?.026:.019);let le=[];for(let D=0;D<64;D++){let j=D/64*Math.PI*2;le.push([.183*Math.cos(j),1.234-.034*Math.sin(j)**2,.132*Math.sin(j)])}A(le,.012,z,1,"ribbed-collar",!0),X(0,.097,.006,.415,.229,z,1,"sewn-shirt-hem",.021);function Ce(D,j,Q=!0){let oe=Q?-1/0:1/0;for(let q of t.children){if(!q.name.startsWith("pants-")&&q.name!=="shirt-body")continue;let J=q.geometry.getAttribute("position"),re=q.geometry.index.array;for(let ce=0;ce<re.length;ce+=3){let me=re[ce],C=re[ce+1],pe=re[ce+2],Re=J.getX(me),ye=J.getY(me),Ge=J.getX(C),rt=J.getY(C),Oe=J.getX(pe),ft=J.getY(pe),ot=(rt-ft)*(Re-Oe)+(Oe-Ge)*(ye-ft);if(Math.abs(ot)<1e-10)continue;let Ye=((rt-ft)*(D-Oe)+(Oe-Ge)*(j-ft))/ot,gt=((ft-ye)*(D-Oe)+(Re-Oe)*(j-ft))/ot,vt=1-Ye-gt;if(Ye<-1e-4||gt<-1e-4||vt<-1e-4)continue;let mt=J.getZ(me)*Ye+J.getZ(C)*gt+J.getZ(pe)*vt;(Q?mt>oe:mt<oe)&&(oe=mt)}}return Number.isFinite(oe)?oe:Q?.2:-.2}function We(D,j,Q,oe=!0,q=.0016){return A(D.map(([J,re])=>[J,re,Ce(J,re,oe)+(oe?.0025:-.0065)]),q,j,4,Q)}Y(Se[5],R,4,"pants-body");for(let D of[-1,1]){c?X(D*.245,-.676,-.02,.183,.174,R,4,"sewn-shorts-hem",.018):X(D*.41,-1.548,-.02,.102,.092,L,4,"sewn-pants-hem",.02),We([[D*.32,-.035],[D*.36,-.13],[D*.392,-.23]],L,"front-pocket");let j=[],Q=[],oe=[],q=12,J=12;for(let me=0;me<=J;me++)for(let C=0;C<=q;C++){let pe=C/q,Re=me/J,ye=D*.24+(pe-.5)*.15,Ge=-.055-Re*(.155+.022*(1-Math.abs(pe-.5)*2)),rt=Ce(ye,Ge,!1)-.002-.003*Math.sin(pe*Math.PI)*Math.sin(Re*Math.PI);if(j.push(ye,Ge,rt),Q.push(pe,Re),C<q&&me<J){let Oe=me*(q+1)+C;oe.push(Oe,Oe+1,Oe+q+1,Oe+1,Oe+q+2,Oe+q+1)}}let re=new ut;re.setAttribute("position",new Ie(j,3)),re.setAttribute("uv",new Ie(Q,2)),re.setIndex(oe),Y(re,R,4,"rear-pocket-patch",!1);let ce=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([me,C])=>[D*.24+me,-.061+C]);We(ce,L,"rear-pocket-stitch",!1,.0012)}if(We([[0,.08],[0,-.06],[.019,-.19]],L,"fly-stitch"),!l&&!h&&!/Knit|Puffer|Hoodie/i.test(e.suit)){let D=g("#171b1d",.92),j=g("#303432",.84),Q=[],oe=[],q=[],J=8,re=36;for(let me=0;me<=re;me++)for(let C=0;C<=J;C++){let pe=.2+me/re*.96,Re=(C/J-.5)*(.15+.055*me/re);if(Q.push(Re,pe,Ce(Re,pe,!0)+.002),oe.push(C/J,me/re),C<J&&me<re){let ye=me*(J+1)+C;q.push(ye,ye+1,ye+J+1,ye+1,ye+J+2,ye+J+1)}}let ce=new ut;ce.setAttribute("position",new Ie(Q,3)),ce.setAttribute("uv",new Ie(oe,2)),ce.setIndex(q),Y(ce,D,1,"jacket-inner-shirt",!1);for(let me of[-1,1]){let C=[[me*.092,1.16],[me*.11,.95],[me*.105,.6],[me*.075,.2]].map(([Re,ye])=>[Re,ye,Ce(Re,ye,!0)+.005]);A(C,.004,z,1,"jacket-front-edge");let pe=[[me*.27,.59],[me*.35,.44]].map(([Re,ye])=>[Re,ye,Ce(Re,ye,!0)+.003]);A(pe,.003,z,1,"jacket-pocket-welt")}if(/Blazer|Dinner|Biker/i.test(e.suit)){for(let me of[-1,1]){let C=[[me*.1,1.19],[me*.2,1.02],[me*.105,.77],[me*.067,1.02]],pe=C.flatMap(([ye,Ge])=>[ye,Ge,Ce(ye,Ge,!0)+.012]),Re=new ut;Re.setAttribute("position",new Ie(pe,3)),Re.setIndex([0,1,2,0,2,3]),Re.computeVertexNormals(),Y(Re,U,1,"folded-lapel",!1),A(C.map(([ye,Ge])=>[ye,Ge,Ce(ye,Ge,!0)+.014]),.0014,z,1,"lapel-stitch")}for(let me of[.48,.31]){let C=new Je(.009,.009,.006,20);C.rotateX(Math.PI/2),C.translate(.1,me,Ce(.1,me,!0)+.008),Y(C,K,1,"jacket-button",!1)}}else{if(["classic","ruby","midnight"].includes(e.suit))for(let me of[-1,1])A([[me*.53,1.04,.16],[me*.6,.8,.15],[me*.65,.56,.14],[me*.7,.28,.12]],.008,ie,2,"racing-sleeve-piping");for(let me=.25;me<1.15;me+=.026){let C=new et(.008,.008,.004);C.translate(.08,me,Ce(.08,me,!0)+.007),Y(C,K,1,"zipper-tooth",!1)}if(["classic","ruby","midnight"].includes(e.suit))for(let me=0;me<3;me++)for(let C=0;C<4;C++){let pe=-.32+C*.033,Re=.92+me*.033,ye=new qt(.032,.032);ye.translate(pe,Re,Ce(pe,Re,!0)+.004),Y(ye,(me+C)%2?D:ie,1,"club-checker-patch",!1)}}}if(/Hoodie/i.test(e.suit)){let D=new Ft(1,48,32,0,Math.PI*2,0,Math.PI*.68);D.scale(.24,.24,.16),D.rotateX(Math.PI/2),D.translate(0,1.08,-.2);let j=U.clone();j.side=Ot,s.push(j),Y(D,j,1,"folded-hood");for(let Q of[-1,1])A([[Q*.1,1.17,.16],[Q*.09,1.04,.23],[Q*.11,.88,.235]],.0035,ie,1,"hood-drawstring")}if(/Puffer/i.test(e.suit))for(let D=.26;D<1.17;D+=.14){let j=[];for(let oe=0;oe<=24;oe++){let q=-.37+oe*.74/24;j.push([q,D,Ce(q,D,!0)+.004])}let Q=new wt(new At(j.map(oe=>new w(...oe))),32,.004,6,!1);Y(Q,z,1,"quilted-puffer-seam",!1)}if(e.necklace&&e.necklace!=="none"){let D=g(r.item("necklace",e.necklace).color,.26,.88),j=new At([[-.16,1.24,.04],[-.16,1.14,.2],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.2],[.16,1.24,.04],[0,1.25,-.145]].map(re=>new w(...re)),!0),Q=[],oe=[],q=[];for(let re=0;re<56;re++){let ce=re/56,me=j.getPointAt(ce),C=j.getTangentAt(ce).normalize(),pe=new w(me.x,0,me.z).normalize(),Re=new w().crossVectors(pe,C).normalize();pe.crossVectors(C,Re).normalize();let ye=new dt().makeBasis(C,Re,pe),Ge=new Fn().setFromRotationMatrix(ye);re%2&&Ge.multiply(new Fn().setFromAxisAngle(new w(1,0,0),Math.PI/2));let rt=/Beads|pearl/.test(e.necklace),Oe=rt?new Ft(.01,12,8):new Ut(.0105,.003,6,12);rt||Oe.scale(1.2,.8,1),Oe.applyQuaternion(Ge),Oe.translate(me.x,me.y,me.z);let ft=Oe.getAttribute("position"),ot=Oe.getAttribute("normal"),Ye=Q.length/3;Q.push(...ft.array),oe.push(...ot.array),q.push(...Array.from(Oe.index.array,gt=>gt+Ye)),Oe.dispose()}let J=new ut;if(J.setAttribute("position",new Ie(Q,3)),J.setAttribute("normal",new Ie(oe,3)),J.setIndex(q),Y(J,D,1,"interlocked-necklace-links"),!["silverChain","goldChain","blackBeads","pearl"].includes(e.necklace)){let re=e.necklace,ce=new Wt,me=re==="nicknameBling",C=me?.11:.045,pe=me?.032:.055;re==="spadeDiamond"?(ce.moveTo(0,pe),ce.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026),ce.quadraticCurveTo(-.016,-.04,0,-.018),ce.quadraticCurveTo(.016,-.04,.041,-.026),ce.bezierCurveTo(.069,0,.016,.028,0,pe),ce.lineTo(.016,-pe),ce.lineTo(-.016,-pe),ce.closePath()):re==="crownPendant"?(ce.moveTo(-C,-pe),ce.lineTo(C,-pe),ce.lineTo(C,pe*.55),ce.lineTo(C*.48,0),ce.lineTo(0,pe),ce.lineTo(-C*.48,0),ce.lineTo(-C,pe*.55),ce.closePath()):(ce.moveTo(-C,-pe),ce.lineTo(C,-pe),ce.lineTo(C,pe),ce.lineTo(-C,pe),ce.closePath());let Re=new Vt(ce,{depth:.008,bevelEnabled:!0,bevelSize:.003,bevelThickness:.002,bevelSegments:3});if(Re.translate(0,.755,.279),Y(Re,D,1,"necklace-pendant:"+re),["silverTag","acesPendant","poker21Pendant","nicknameBling"].includes(re)){let ye=document.createElement("canvas");ye.width=512,ye.height=192;let Ge=ye.getContext("2d");Ge.clearRect(0,0,512,192),Ge.fillStyle="#f7e7b5",Ge.font="bold 100px Arial",Ge.textAlign="center",Ge.textBaseline="middle",Ge.fillText(re==="nicknameBling"?e.patchText||"POKER21":re==="acesPendant"?"A\u2660 A\u2665":re==="silverTag"?"\u2660":"P21",256,100,480);let rt=new Gt(ye);rt.colorSpace=xt,a.push(rt);let Oe=new Et({map:rt,transparent:!0,alphaTest:.1,roughness:.32,metalness:.3});s.push(Oe);let ft=new qt(C*1.85,pe*1.7);ft.translate(0,.755,.291),Y(ft,Oe,1,"pendant-engraving:"+re)}}}if(de&&!c){let re=function(ce,me,C){let pe=C>0?-1/0:1/0;for(let Re=0;Re<J.length;Re+=3){let ye=J[Re],Ge=J[Re+1],rt=J[Re+2],Oe=q.getY(ye),ft=q.getZ(ye),ot=q.getY(Ge),Ye=q.getZ(Ge),gt=q.getY(rt),vt=q.getZ(rt),mt=(Ye-vt)*(Oe-gt)+(gt-ot)*(ft-vt);if(Math.abs(mt)<1e-10)continue;let _t=((Ye-vt)*(ce-gt)+(gt-ot)*(me-vt))/mt,kt=((vt-ft)*(ce-gt)+(Oe-gt)*(me-vt))/mt,Ht=1-_t-kt;if(_t<-1e-4||kt<-1e-4||Ht<-1e-4)continue;let Kt=q.getX(ye)*_t+q.getX(Ge)*kt+q.getX(rt)*Ht;(C>0?Kt>pe:Kt<pe)&&(pe=Kt)}return Number.isFinite(pe)?pe:C*.42},D=g("#ffffff",.93);D.vertexColors=!0;let j=new lt(r.item("pants",e.pants).color),Q=new lt("#e5e1d7"),oe=t.children.find(ce=>ce.name==="pants-body"),q=oe.geometry.getAttribute("position"),J=oe.geometry.index.array;for(let ce of[-1,1]){let me=[],C=[],pe=[];for(let rt=0;rt<=64;rt++)for(let Oe=0;Oe<=6;Oe++){let ft=Oe/6*2-1,ot=.05-rt/64*1.58,Ye=-.02+ft*.041,gt=re(ot,Ye,ce)+ce*.0025,vt=Math.abs(ft)<.5?j:Q;if(me.push(gt,ot,Ye),C.push(vt.r,vt.g,vt.b),rt<64&&Oe<6){let mt=rt*7+Oe;pe.push(mt,mt+1,mt+6+1,mt+1,mt+6+2,mt+6+1)}}let Ge=new ut;Ge.setAttribute("position",new Ie(me,3)),Ge.setAttribute("color",new Ie(C,3)),Ge.setIndex(pe),Ge.computeVertexNormals(),D.side=Ot,Y(Ge,D,4,"club-pants-side-stripe",!1)}}if(/Cargo/i.test(e.pants))for(let D of[-1,1]){let j=D*.3,Q=-.43,oe=Ce(j,Q,!0)+.023,q=new et(.15,.19,.035);q.translate(j,Q,oe),Y(q,R,4,"cargo-thigh-pocket",!1);let J=new et(.17,.045,.015);J.translate(j,Q+.08,oe+.024),Y(J,L,4,"cargo-pocket-flap",!1)}if(e.patch&&e.patch!=="none"){let D=new Gt(r.patchCanvas(e));D.colorSpace=xt,a.push(D);let j=new Et({map:D,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(j);let Q=[],oe=[],q=[],J=12,re=6;for(let me=0;me<=re;me++)for(let C=0;C<=J;C++){let pe=-.285+C/J*.235,Re=.91-me/re*.088;if(Q.push(pe,Re,Ce(pe,Re,!0)+.004),oe.push(C/J,1-me/re),C<J&&me<re){let ye=me*(J+1)+C;q.push(ye,ye+J+1,ye+1,ye+1,ye+J+1,ye+J+2)}}let ce=new ut;ce.setAttribute("position",new Ie(Q,3)),ce.setAttribute("uv",new Ie(oe,2)),ce.setIndex(q),ce.computeVertexNormals(),Y(ce,j,1,"sewn-word-patch",!1)}for(let D of[-1,1]){let re=function(C,pe,Re){let ye=[],Ge=[],rt=[];for(let ot=0;ot<C.length;ot++){let[Ye,gt,vt,mt]=C[ot];for(let _t=0;_t<=48;_t++){let kt=_t/48*Math.PI*2;if(ye.push(q+gt*Math.cos(kt),Re==="leather-sneaker"?vt+(mt-vt)*Math.max(0,Math.sin(kt)):(vt+mt)/2+(mt-vt)/2*Math.sin(kt),Ye),Ge.push(_t/48,ot/(C.length-1)),ot<C.length-1&&_t<48){let Ht=ot*49+_t;rt.push(Ht,Ht+1,Ht+48+1,Ht+1,Ht+48+2,Ht+48+1)}}}for(let ot of[0,C.length-1]){let[Ye,,gt,vt]=C[ot],mt=ot*49,_t=ye.length/3;ye.push(q,(gt+vt)/2,Ye),Ge.push(.5,ot/(C.length-1));for(let kt=0;kt<48;kt++)rt.push(_t,mt+(ot===0?kt+1:kt),mt+(ot===0?kt:kt+1))}let ft=new ut;return ft.setAttribute("position",new Ie(ye,3)),ft.setAttribute("uv",new Ie(Ge,2)),ft.setIndex(rt),ft.computeVertexNormals(),Y(ft,pe,5,Re,!1)},ce=function(C,pe=0){let Re=0;for(;Re<J.length-2&&J[Re+1][0]<C;)Re++;let ye=J[Re],Ge=J[Re+1],rt=Math.max(0,Math.min(1,(C-ye[0])/(Ge[0]-ye[0]))),Oe=ye[1]+(Ge[1]-ye[1])*rt,ft=ye[2]+(Ge[2]-ye[2])*rt,ot=ye[3]+(Ge[3]-ye[3])*rt;return ft+(ot-ft)*Math.sqrt(Math.max(0,1-(pe/Oe)**2))},j=/Chelsea|combat|desert|hiking|canvasHigh/i.test(e.shoes),Q=/Oxford|Loafer|Brogue/i.test(e.shoes),oe=/Chelsea|Loafer/i.test(e.shoes),q=D*.41,J=[[-.115,.06,-1.8,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.2,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.8,-1.755],[.448,.004,-1.785,-1.78]];if(j)for(let C of J)C[0]<.06&&(C[3]+=.19*(1-Math.max(0,C[0])/.12));Q&&(ie.color.set("#302923"),te.color.set("#1b1918")),re(J,Z,"leather-sneaker"),re([[-.124,.065,-1.848,-1.805],[-.1,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.4,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],ie,"rubber-midsole"),re([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.87,-1.846],[.02,.145,-1.87,-1.846],[.2,.156,-1.87,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],te,"outsole");for(let C of[-1,1]){A([[q+C*.098,-1.558,-.045],[q+C*.135,-1.63,.08],[q+C*.154,-1.735,.275],[q+C*.125,-1.765,.392]],.003,H,5,"quarter-panel-seam"),A([[q+C*.093,-1.579,-.04],[q+C*.131,-1.65,.1],[q+C*.148,-1.752,.275]],.0013,ie,5,"quarter-stitch");for(let pe=0;pe<(oe?0:6);pe++){let Re=.06+pe*.042,ye=ce(Re,.06)+.002,Ge=new Ut(.0055,.0018,6,12);Ge.rotateX(-.95),Ge.translate(q+C*.06,ye,Re),Y(Ge,H,5,"lace-eyelet",!1)}}for(let C=0;C<(oe?0:6);C++){let pe=.062+C*.042;A([[q-.06,ce(pe,.06)+.004,pe],[q,ce(pe+.009)+.005,pe+.009],[q+.06,ce(pe,.06)+.004,pe]],.0032,ie,5,"woven-lace"),A([[q+.06,ce(pe+.004,.06)+.005,pe+.004],[q,ce(pe+.012)+.006,pe+.012],[q-.06,ce(pe+.004,.06)+.005,pe+.004]],.0032,ie,5,"woven-lace-cross")}oe&&A([[q-.1,ce(.14,.1)+.006,.14],[q,ce(.14)+.009,.14],[q+.1,ce(.14,.1)+.006,.14]],.008,H,5,"slip-on-vamp-band"),A([[q-.108,-1.777,.29],[q-.12,-1.762,.36],[q,-1.749,.421],[q+.12,-1.762,.36],[q+.108,-1.777,.29]],.0018,ie,5,"toe-stitch");let me=new et(.065,.1,.018);me.translate(q,-1.6,-.107),Y(me,H,5,"heel-pull-tab",!1);for(let C=0;C<12;C++)for(let pe of[-1,1])A([[q+pe*.15,-1.827,.02+C*.027],[q+pe*.15,-1.842,.02+C*.027]],.0013,te,5,"sole-groove")}function De(D,j,Q,oe,q=.024){let J=D.geometry.getAttribute("position"),re=D.geometry.getAttribute("normal"),ce=[],me=[],C=[];for(let ye=0;ye<j;ye++){let Ge=Math.floor(Dr(ye+Q*521)*J.count),rt=new w().fromBufferAttribute(J,Ge),Oe=new w().fromBufferAttribute(re,Ge);if(oe&&!oe(rt,Oe))continue;let ft=new w(.08*Math.sin(ye*2.1),-1,.1*Math.cos(ye*1.3));ft.addScaledVector(Oe,-ft.dot(Oe)).normalize();let ot=new w().crossVectors(Oe,ft).normalize(),Ye=q*(.65+Dr(ye*2.7)*.75),gt=35e-5+Dr(ye*3.1)*4e-4,vt=ce.length/3,mt=rt.y<1.53&&Q===6?Dr(ye*2.2)>.5:!1,_t=new lt(mt?"#5d554b":"#362b23").multiplyScalar(.75+Dr(ye*8.7)*.35);for(let kt=0;kt<4;kt++){let Ht=kt/3,Kt=rt.clone().addScaledVector(Oe,.001+Ye*.3*Math.sin(Ht*Math.PI/2)).addScaledVector(ft,Ye*Ht);for(let ln of[-1,1]){let Ln=Kt.clone().addScaledVector(ot,ln*gt*(1-Ht*.92));ce.push(Ln.x,Ln.y,Ln.z),me.push(_t.r,_t.g,_t.b)}if(kt<3){let ln=vt+kt*2;C.push(ln,ln+1,ln+2,ln+1,ln+3,ln+2)}}}if(!ce.length)return;let pe=new ut;pe.setAttribute("position",new Ie(ce,3)),pe.setAttribute("color",new Ie(me,3)),pe.setIndex(C),pe.computeVertexNormals();let Re=Y(pe,Le,Q,"individual-fur-strands",!1);Re.castShadow=!1}if(d){let D=t.children.find(j=>j.name==="sculpt-cranium");De(D,3800,6,(j,Q)=>!(j.z>.12&&j.y>1.33&&j.y<1.78&&Math.abs(j.x)<.235)&&(!e.hair||e.hair==="hairNatural"||j.y<1.76),.027)}if(d)for(let D of t.children.filter(j=>j.name==="brow-ridge"))De(D,300,6,null,.01);let Xe=t.children.filter(D=>D.name.startsWith("fur-arm-")||D.name.startsWith("fur-leg-"));for(let D of Xe){let j=D.name.startsWith("fur-arm");De(D,1800,j?2:4,Q=>j?Q.y<(h?1.1:l?.8:.015):c&&Q.y<-.68,.021)}if(l||h){let D={...e,hair:"hairNatural",glasses:"none",watch:"none",ring:"none",necklace:"none",body:"bodyNormal",helmet:"none",hat:"none",patch:"none"};await r.loadWardrobe(D);let j=new Image;j.src="./assets/player-hall/standing-monkey-v1.webp",await j.decode();let Q=r.renderCharacter(j,D),oe=document.createElement("canvas");oe.width=1024,oe.height=1536;let q=oe.getContext("2d",{willReadFrequently:!0});q.drawImage(Q,0,1536-Q.height);let J=q.getImageData(0,0,1024,1536);for(let Oe=0;Oe<1536;Oe++)for(let ft=0;ft<1024;ft++){let ot=(Oe*1024+ft)*4,Ye=J.data[ot]/255,gt=J.data[ot+1]/255,vt=J.data[ot+2]/255,mt=(Ye+gt+vt)/3,_t=Math.max(va(.23,.5,mt),va(.15,.3,Ye)*va(.02,.12,Ye-gt));J.data[ot+3]*=ft>340&&ft<684&&Oe>315&&Oe<663?_t:0}q.putImageData(J,0,0);let re=new Gt(oe);re.colorSpace=xt,re.anisotropy=4,a.push(re);let ce=new Et({map:re,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:.96,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-1});s.push(ce);let me=t.children.find(Oe=>Oe.name==="shirt-body"),C=me.geometry.clone(),pe=C.getAttribute("position"),Re=C.getAttribute("normal"),ye=[],Ge=[];for(let Oe=0;Oe<pe.count;Oe++)ye.push(.5+pe.getX(Oe)/2.55,.5+pe.getY(Oe)/3.825),pe.setXYZ(Oe,pe.getX(Oe)+Re.getX(Oe)*.001,pe.getY(Oe)+Re.getY(Oe)*.001,pe.getZ(Oe)+Re.getZ(Oe)*.001);let rt=C.index.array;for(let Oe=0;Oe<rt.length;Oe+=3)rt.slice(Oe,Oe+3).every(ft=>pe.getZ(ft)>.03)&&Ge.push(...rt.slice(Oe,Oe+3));C.setAttribute("uv",new Ie(ye,2)),C.setIndex(Ge),Y(C,ce,1,"screen-printed-shirt",!1)}if(u){for(let me of[...t.children])me.name.startsWith("ear-")&&me.removeFromParent();let D=g(r.item("helmet",e.helmet).color,.25,.45,!0);D.clearcoat=.7,D.clearcoatRoughness=.16;let j=g("#152731",.1,.55,!0);j.clearcoat=1,j.transparent=!0,j.opacity=.91,j.side=Ot,Y(Se[6],D,6,"helmet-shell",!1),A([[-.28,1.43,.16],[-.2,1.39,.3],[0,1.36,.36],[.2,1.39,.3],[.28,1.43,.16]],.03,D,6,"helmet-chin-bar");let Q=[],oe=[],q=[],J=48,re=20;for(let me=0;me<=re;me++)for(let C=0;C<=J;C++){let pe=(C/J-.5)*1.9,Re=(me/re-.5)*2.4,ye=new w(.35*Math.sin(pe),1.665+.26*Math.sin(Re),.2+.19*Math.cos(pe)*Math.cos(Re));if(e.visor==="open"&&ye.sub(new w(0,1.84,.13)).applyAxisAngle(new w(1,0,0),-1.1).add(new w(0,1.84,.13)),Q.push(ye.x,ye.y,ye.z),oe.push(C/J,me/re),C<J&&me<re){let Ge=me*(J+1)+C;q.push(Ge,Ge+1,Ge+J+1,Ge+1,Ge+J+2,Ge+J+1)}}let ce=new ut;ce.setAttribute("position",new Ie(Q,3)),ce.setAttribute("uv",new Ie(oe,2)),ce.setIndex(q),ce.computeVertexNormals(),Y(ce,j,6,"hinged-helmet-visor",!1);for(let me of[-1,1]){let C=new Je(.027,.027,.012,32);C.rotateZ(Math.PI/2),C.translate(me*.327,1.73,.035),Y(C,K,6,"visor-hinge",!1);for(let pe=0;pe<4;pe++)Ue(_,[me*.322,1.48+pe*.022,-.02],[.007,.006,.036],6,"helmet-vent")}A([[0,1.9,-.2],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,K,6,"helmet-racing-stripe")}let at=Ad(n,e,r),pt=Pd(n,{...e,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:Ee}),Ct=Id(n,{...e,helmet:d?"none":e.helmet,sculptEyewearDepth:-.025},r),Tt=e.watch&&e.watch!=="none"?Ld(e.watch,r.item("watch",e.watch).color):null;Tt&&(t.add(Tt.group),n.attach(Tt.group,"rightWrist"));let Ae=e.ring&&e.ring!=="none"?Dd(r.item("ring",e.ring).color,e.ring):null;return Ae&&(t.add(Ae.group),n.attach(Ae.group,"rightHand")),n.setRelaxedPose(!0),{root:t,rig:n,geometries:i,materials:s,textures:a,dispose(){at.dispose(),pt.dispose(),Ct.dispose(),Tt?.dispose(),Ae?.dispose(),i.forEach(D=>D.dispose()),s.forEach(D=>D.dispose()),a.forEach(D=>D.dispose()),n.dispose()}}}async function Ud(r,e,t={}){let n=await sl(window.PokerGarage,e),{root:i,rig:s}=n,a=new yn;a.add(i);{a.add(new Vn("#fff0d4","#283849",2.1));let K=new zn("#fff0dc",3.5);K.position.set(-2,4,5),a.add(K);let de=new zn("#9cc3ed",1.2);de.position.set(3,1,-2),a.add(de)}let o=new Jn({alpha:!0,antialias:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=xt,o.toneMapping=Zn,o.toneMappingExposure=1.05;let c=null;if(o.shadowMap){o.shadowMap.enabled=!0,o.shadowMap.type=us;let K=a.children.find(Se=>Se.isDirectionalLight);K.castShadow=!0,K.shadow.mapSize.set(1024,1024),K.shadow.normalBias=.012,K.shadow.bias=-15e-5,K.shadow.camera.left=-2,K.shadow.camera.right=2,K.shadow.camera.top=2.2,K.shadow.camera.bottom=-2.2;let de=new Ze(new qt(8,8),new xr({opacity:.2}));de.rotation.x=-Math.PI/2,de.position.y=-1.875,de.receiveShadow=!0,a.add(de),n.geometries.push(de.geometry),n.materials.push(de.material);let Le=new yn;Le.background=new lt("#333842");for(let[Se,Ee,ee,Te,be,Y]of[[0,4,0,5,.1,3],[-3,2,2,.1,3,2],[3,1,-2,.1,2,3]]){let Ue=new Ze(new et(Te,be,Y),new Pn({color:"#ffffff"}));Ue.position.set(Se,Ee,ee),Le.add(Ue)}let ze=new ar(o);c=ze.fromScene(Le,.05),a.environment=c.texture,a.environmentIntensity=.55,ze.dispose(),Le.traverse(Se=>{Se.geometry?.dispose(),Se.material?.dispose()})}r.append(o.domElement),o.domElement.setAttribute("role","img"),o.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let l=new tn(30,1,.1,30);l.position.set(0,0,9);let h=t.yaw||0,u=t.pitch||0,d=null,f,g=!1,m=!1,p=0,v=window.matchMedia?.("(prefers-reduced-motion: reduce)"),y="full",_=t.focusOrbit||null,x=2.05,T=0,b=0;function I(K){K=["watch","ring"].includes(K)?K:"full",K!==y&&(K!=="full"?(_=_||{yaw:h,pitch:u},t.focusOrbit=_,h=0,u=0):_&&(h=_.yaw,u=_.pitch,_=null,delete t.focusOrbit),t.yaw=h,t.pitch=u,y=K,r.dataset.focus=y)}function F(K){let de=r.clientWidth/Math.max(1,r.clientHeight),Le=y!=="full",ze=y==="ring",Se=Le?Math.max(ze?.25:.4,(ze?.18:.3)/de):Math.max(2.4,1.17/de),Ee=Le?.76*Math.cos(h)+.1*Math.sin(h):0,ee=Le?(ze?-.27:.04)*Math.cos(u)-(.1*Math.cos(h)-.76*Math.sin(h))*Math.sin(u):-.22,Te=1-Math.exp(-K*12);x+=(Se-x)*Te,T+=(Ee-T)*Te,b+=(ee-b)*Te,l.aspect=de;let be=x/Math.tan(l.fov*Math.PI/360);l.position.set(T,b+x*.16,be),l.lookAt(T,b,0),l.updateProjectionMatrix()}let U=()=>{!r.clientWidth||!r.clientHeight||(F(1),o.setSize(r.clientWidth,r.clientHeight,!1))},z=new ResizeObserver(U);z.observe(r),U();let R=K=>{m=!1,d={id:K.pointerId,x:K.clientX,y:K.clientY},r.setPointerCapture(K.pointerId),K.preventDefault()},L=K=>{!d||d.id!==K.pointerId||(h+=(K.clientX-d.x)*.012,u=Math.max(-.35,Math.min(.35,u+(K.clientY-d.y)*.006)),d.x=K.clientX,d.y=K.clientY)},Z=()=>{d=null},H=K=>{["ArrowLeft","ArrowRight"].includes(K.key)&&(h+=K.key==="ArrowLeft"?-.15:.15,K.preventDefault())};r.addEventListener("pointerdown",R),r.addEventListener("pointermove",L),r.addEventListener("pointerup",Z),r.addEventListener("pointercancel",Z),r.addEventListener("keydown",H);function ie(K=0){if(g)return;if(!r.isConnected){te();return}m&&!d&&p&&(h+=Math.min(.05,(K-p)/1e3)*.35);let de=!v?.matches&&!d&&y==="full"?1:0,Le=p?Math.min(.05,(K-p)/1e3):.016;s.update(K/1e3,de,Le),F(Le),p=K,i.rotation.set(u,h,0),t.yaw=h,t.pitch=u,r.dataset.yaw=String(h),o.render(a,l),t.snapshotOnly||(f=requestAnimationFrame(ie))}return ie(),{state:t,setFocus:I,snapshot(){F(1),i.rotation.set(u,h,0),o.render(a,l);let K=document.createElement("canvas");return K.width=o.domElement.width,K.height=o.domElement.height,K.getContext("2d").drawImage(o.domElement,0,0),K},setYaw(K){h=K,t.snapshotOnly&&(F(1),ie())},setAutoRotate(K){m=!!K},dispose:te};function te(){if(!g){g=!0,cancelAnimationFrame(f),z.disconnect();for(let[K,de]of[["pointerdown",R],["pointermove",L],["pointerup",Z],["pointercancel",Z],["keydown",H]])r.removeEventListener(K,de);n.dispose(),c?.dispose(),o.dispose(),o.forceContextLoss(),o.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new yn,s=new ke;i.add(s);let a=new Jn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=xt,a.toneMapping=Zn,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new tn(34,1,.1,40);i.add(new Vn("#dcecff","#50402b",2));for(let[Y,Ue,A,P]of[[3,6,5,4],[-3,3,-3,3]]){let X=new zn("#fff0dd",P);X.position.set(Y,Ue,A),i.add(X)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let Y=0;Y<128;Y+=2)l.fillStyle=Y%4?"#808080":"#b0b0b0",l.fillRect(0,Y,128,1);for(let Y=0;Y<128;Y+=3)l.fillStyle="#888888",l.fillRect(Y,0,1,128);let h=new Gt(c);h.wrapS=h.wrapT=Rn,h.repeat.set(8,8);let u=(Y,Ue=0,A=.7)=>new Et({color:Y,metalness:Ue,roughness:A}),d=u("#32251d"),f=u("#96715a"),g=u("#11161b"),m=u("#e0dfd4"),p=u("#d9ac4c",.8,.25),v=u("#a22c3b"),y=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let Y of[v,y,g])Y.bumpMap=h,Y.bumpScale=.012;function T(Y,Ue,A,P,X,V,S,B=s){let W=new Ze(new Ft(1,40,28),Y);return W.position.set(Ue,A,P),W.scale.set(X,V,S),B.add(W),W}function b(Y,Ue,A,P,X=P){let V=new w(...Ue),S=new w(...A),B=S.clone().sub(V),W=new Ze(P>.1?new as((P+X)/2,Math.max(.01,B.length()-(P+X)),10,32):new Je(X,P,B.length(),16),Y);return W.position.copy(V.add(S).multiplyScalar(.5)),W.quaternion.setFromUnitVectors(new w(0,1,0),B.normalize()),s.add(W),W}T(y,0,1.64,0,.47,.36,.26),T(v,0,2.32,0,.59,.65,.32),T(g,0,2.35,.29,.27,.49,.055);for(let Y of[-1,1]){b(y,[Y*.27,1.67,0],[Y*.29,.92,.015],.23,.25),T(y,Y*.29,.92,.015,.23,.24,.24),b(y,[Y*.29,.94,.015],[Y*.32,.28,0],.16,.22),b(m,[Y*.45,1.55,.03],[Y*.48,.36,.03],.025,.032),T(_,Y*.32,.18,.15,.22,.19,.39),T(m,Y*.32,.075,.15,.235,.065,.4),T(m,Y*.32,.27,.12,.135,.08,.2);for(let Ue=0;Ue<5;Ue++)b(m,[Y*.32-.1,.29,.08+Ue*.04],[Y*.32+.1,.29,.08+Ue*.04],.009);T(v,Y*.55,2.63,0,.26,.27,.29),b(v,[Y*.57,2.63,0],[Y*.76,2.12,.02],.19,.23),T(v,Y*.76,2.12,.02,.19,.2,.2),b(v,[Y*.76,2.12,.02],[Y*.88,1.65,.08],.13,.18),b(m,[Y*.71,2.6,.15],[Y*.99,1.72,.15],.035),T(g,Y*.88,1.67,.08,.145,.09,.15),T(d,Y*.89,1.48,.1,.16,.22,.12);for(let Ue=0;Ue<4;Ue++)T(f,Y*(.79+Ue*.065),1.36,.15,.035,.13,.045);T(f,Y*.75,1.48,.2,.06,.12,.06)}T(d,0,3.04,0,.25,.27,.24),T(d,0,3.39,0,.36,.43,.31);for(let Y of[-1,1])T(f,Y*.36,3.4,.01,.12,.17,.09),T(d,Y*.36,3.4,.065,.065,.1,.035),T(f,Y*.15,3.43,.258,.15,.12,.075),T(g,Y*.14,3.44,.32,.045,.035,.02),T(m,Y*.13,3.45,.335,.009,.01,.006),T(d,Y*.15,3.53,.28,.18,.05,.07);T(f,0,3.23,.27,.26,.18,.13),T(f,0,3.34,.34,.14,.08,.08),T(g,0,3.17,.375,.17,.017,.018),T(f,0,3.13,.36,.17,.035,.025);let I=new ke;s.add(I),T(g,0,3.51,-.02,.41,.42,.35,I),T(p,0,3.64,.015,.07,.3,.36,I);for(let Y of[-1,1])T(g,Y*.32,3.29,.015,.1,.31,.24,I),T(p,Y*.39,3.43,.07,.025,.05,.05,I);let F=T(x,0,3.44,.27,.38,.19,.14,I);for(let Y of[-1,1])b(g,[Y*.28,2.88,.25],[Y*.1,2.58,.33],.035),b(g,[Y*.3,2.28,.3],[Y*.39,2.09,.26],.018);for(let Y=0;Y<6;Y++)T(p,0,2.03+Y*.14,.35,.015,.015,.01);let U=document.createElement("canvas");U.width=512,U.height=256;let z=U.getContext("2d"),R=new Gt(U);R.colorSpace=xt;let L=new Ze(new qt(.28,.12),new Et({map:R,roughness:.9}));L.position.set(-.27,2.46,.317),s.add(L);let Z=new ke;for(let Y=0;Y<3;Y++)for(let Ue=0;Ue<5;Ue++){let A=new Ze(new qt(.048,.048),(Ue+Y)%2?g:m);A.position.set(-.36+Ue*.048,2.62+Y*.048,.318),Z.add(A)}s.add(Z);function H(Y){v.color.set(n.item("suit",Y.suit).color),y.color.set(n.item("pants",Y.pants).color),_.color.set(n.item("shoes",Y.shoes).color),I.visible=Y.helmet!=="none",F.position.y=Y.visor==="open"?3.71:3.44,F.rotation.x=Y.visor==="open"?-.8:0,L.visible=Y.patch!=="none",z.fillStyle="#22282b",z.fillRect(0,0,512,256),z.strokeStyle="#c9af74",z.lineWidth=12,z.strokeRect(8,8,496,240),z.fillStyle="#eee0b5",z.font="bold 72px Arial",z.textAlign="center",z.fillText(Y.patch==="name"?Y.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":Y.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),R.needsUpdate=!0}H(e),t.yaw??=0,t.pitch??=.07;let ie=null,te,K=!1;function de(){let Y=r.clientWidth,Ue=r.clientHeight;!Y||!Ue||(a.setSize(Y,Ue,!1),o.aspect=Y/Ue,o.updateProjectionMatrix())}let Le=new ResizeObserver(de);Le.observe(r),de();let ze=Y=>{ie={id:Y.pointerId,x:Y.clientX,y:Y.clientY},r.setPointerCapture(Y.pointerId),Y.preventDefault()},Se=Y=>{!ie||ie.id!==Y.pointerId||(t.yaw-=(Y.clientX-ie.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(Y.clientY-ie.y)*.006)),ie.x=Y.clientX,ie.y=Y.clientY)},Ee=()=>{ie=null},ee=Y=>{(Y.key==="ArrowLeft"||Y.key==="ArrowRight")&&(t.yaw+=Y.key==="ArrowLeft"?.15:-.15,Y.preventDefault())};r.addEventListener("pointerdown",ze),r.addEventListener("pointermove",Se),r.addEventListener("pointerup",Ee),r.addEventListener("pointercancel",Ee),r.addEventListener("keydown",ee);function Te(){if(K)return;K=!0,cancelAnimationFrame(te),Le.disconnect();for(let[Ue,A]of[["pointerdown",ze],["pointermove",Se],["pointerup",Ee],["pointercancel",Ee],["keydown",ee]])r.removeEventListener(Ue,A);let Y=new Set;i.traverse(Ue=>{Ue.geometry?.dispose(),Ue.material&&Y.add(Ue.material)});for(let Ue of Y)Ue.dispose();R.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function be(){if(K)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Te();return}let Y=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Y,1.95+Math.sin(t.pitch)*Y,Math.cos(t.yaw)*Math.cos(t.pitch)*Y),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),te=requestAnimationFrame(be)}return be(),{update:H,dispose:Te,state:t}};function oh(r){let e=new ke;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(U,z,R)=>new _n({color:U,metalness:z,roughness:R,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(U,z,R=0,L=0,Z=0)=>{let H=new Ze(U,z);return H.position.set(R,L,Z),H.castShadow=H.receiveShadow=!0,e.add(H),H},h=(U,z,R,L=!0)=>{let Z=new On;return Z.absarc(z,R,U,0,Math.PI*2,L),Z},u=t?.395:.437,d=new Wt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let U=0;U<24;U++)for(let[z,R]of[[.28,0],[.36,.045]]){let L=U*Math.PI/12+R;d.holes.push(h(n?.009:.011,Math.cos(L)*z,Math.sin(L)*z))}for(let U of[0,.033])l(new Vt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,U);let f=new et(.22,.014,.025),g=new yr(f,a,32),m=new dt;for(let U=0;U<32;U++){let z=U*Math.PI/16;m.compose(new w(Math.cos(z)*.31,Math.sin(z)*.31,.021),new Fn().setFromAxisAngle(new w(0,0,1),z+.18),new w(1,1,1)),g.setMatrixAt(U,m)}e.add(g);let p=l(new Je(.184,.16,.045,48),a,0,0,.018);p.rotation.x=Math.PI/2;let v=l(new Je(.095,.11,.055,32),s,0,0,.035);v.rotation.x=Math.PI/2;for(let U=0;U<10;U++){let z=U*Math.PI/5,R=l(new Je(.017,.017,.015,12),s,Math.cos(z)*.18,Math.sin(z)*.18,.05);R.rotation.x=Math.PI/2;let L=l(new Je(.009,.009,.018,6),a,Math.cos(z)*.18,Math.sin(z)*.18,.058);L.rotation.x=Math.PI/2}for(let U of[.235,.26,.31,.335,.39,.414])if(U<u){let z=l(new Ut(U,.0012,3,96),a,0,0,.042);z.castShadow=!1}if(!t)for(let U=0;U<8;U++){let z=U*Math.PI/4,R=[.25,.29,.34,.395].map((Z,H)=>new w(Math.cos(z+H*.075)*Z,Math.sin(z+H*.075)*Z,.043)),L=l(new wt(new At(R),12,.0024,3,!1),a);L.castShadow=!1}let y=new Wt;y.moveTo(-.08,-.2),y.quadraticCurveTo(-.13,-.15,-.115,-.06),y.lineTo(-.115,.1),y.quadraticCurveTo(-.12,.19,-.05,.215),y.lineTo(.055,.19),y.quadraticCurveTo(.11,.14,.105,.06),y.lineTo(.105,-.1),y.quadraticCurveTo(.1,-.19,.04,-.21),y.closePath();let _=l(new Vt(y,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new et(.09,.31,.032),a,.27,0,.005);for(let U of[-.125,0,.125]){let z=l(new Je(.055,.055,.028,24),c,.354,U,.07);z.rotation.x=Math.PI/2}for(let U of[-.155,.155]){let z=l(new Je(.014,.014,.025,6),s,.325,U,.094);z.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let T=x.getContext("2d");T.fillStyle="#f5f0df",T.translate(64,192),T.rotate(-Math.PI/2),T.textAlign="center",T.font="italic bold 60px Arial",T.fillText(t?"P21":"P21 SPORT",0,20);let b=new Gt(x);b.colorSpace=xt;let I=l(new qt(.075,.24),new Pn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);I.castShadow=!1;let F=l(new Je(.012,.014,.047,6),s,.36,.217,.042);return F.rotation.z=.2,e}var ah;function Nd(r,e){if(!r.isConnected)return;if(!ah){let a=new Jn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=xt,a.toneMapping=Zn,a.toneMappingExposure=1.15;let o=new yn;o.add(new Vn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let f=new zn("#ffffff",d);f.position.set(l,h,u),o.add(f)}let c=new tn(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),ah={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=ah;s[e]||(s[e]=oh(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Bd(r){let e=new ke;e.name="tyre-"+r;let t=new Et({color:"#15181b",roughness:.86}),n=new Et({color:"#050708",roughness:.96}),i=new Et({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new Ze(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new vi([new we(.56,-.19),new we(.63,-.25),new we(.72,-.23),new we(.79,-.15),new we(.8,-.1),new we(.8,.1),new we(.79,.15),new we(.72,.23),new we(.63,.25),new we(.56,.19)],96),t);if(a.rotation.x=Math.PI/2,r!=="semi")for(let l of[-1,1]){let h=s(new Ut(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,f=s(new et(.018,.036,.006),i);f.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),f.rotation.z=-d}}let o=r==="wet",c=r==="semi";if(o||c){let l=o?34:14;for(let h=0;h<l;h++)for(let u of[-1,1]){let d=h*2*Math.PI/l+(u<0?Math.PI/l*.45:0),f=Array.from({length:23},(m,p)=>{let v=p/22,y=u*((c?.035:.012)+v*(c?.175:.198)),_=.8-.045*(Math.abs(y)/.2)**3,x=d+(c?.25:.19)*(1-v)*(1-v);return new w(Math.sin(x)*_,Math.cos(x)*_,y)}),g=s(new wt(new At(f),28,o?.008:.009,6,!1),n);g.name="tread-shoulder-groove"}if(o)for(let h of[-.14,-.045,.045,.14]){let u=s(new Ut(.798,.007,8,96),n);u.position.z=h,u.name="tread-water-channel"}}return e}function Fd(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Ie(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new ir({depthPacking:vs});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Od(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new ke;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(T,b,I)=>{let F=new Ze(T,b);return F.name=I,F.castShadow=F.receiveShadow=!0,c.add(F),F};for(let T=0;T<h;T++){let b=[],I=[];for(let R=0;R<=72;R++){let L=R/72*2-1,Z=L*l/2,H=(T?a?.36:.46:.76)*(1-.22*L*L),ie=(T?2.86+T*.055:3.02)-.13*L*L,te=.43+T*.095+.1*Math.pow(Math.abs(L),3);for(let K=0;K<=28;K++){let de=K/28*Math.PI*2,Le=Math.cos(de);b.push(ie+Le*H/2,te+.035*(1-Le*Le)+Math.sin(de)*(T?.024:.035),Z)}if(R<72)for(let K=0;K<28;K++){let de=R*29+K,Le=de+28+1;I.push(de,de+1,Le,de+1,Le+1,Le)}}let z=new ut;z.setAttribute("position",new Ie(b,3)),z.setIndex(I),z.computeVertexNormals(),u(z,T===0?n:t,"wing-element-"+T)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],f=[0,1,2,3].map(T=>new At(d.map((b,I)=>new w(b[T],I,0)),!1,"catmullrom",.35)),g=[],m=[],p=96,v=48;for(let T=0;T<=p;T++){let b=T/p,[I,F,U,z]=f.map(R=>R.getPoint(b).x);for(let R=0;R<=v;R++){let L=R/v*Math.PI*2,Z=Math.cos(L),H=Math.sin(L),ie=a?.7:.82;g.push(I,F+Math.sign(H)*Math.pow(Math.abs(H),ie)*z,Math.sign(Z)*Math.pow(Math.abs(Z),ie)*U)}if(T<p)for(let R=0;R<v;R++){let L=T*(v+1)+R,Z=L+1;m.push(L,L+v+1,Z,Z,L+v+1,Z+v+1)}}let y=m.length;for(let T of[0,p]){let b=T*(v+1);for(let I=1;I<v-1;I++)T===0?m.push(b,b+I,b+I+1):m.push(b,b+I+1,b+I)}let _=new ut;_.setAttribute("position",new Ie(g,3)),_.setIndex(m),_.computeVertexNormals();let x=Math.floor(p*.89)*v*6;_.addGroup(0,x,0),_.addGroup(x,y-x,a?1:0),_.addGroup(y,m.length-y,0),u(_,[t,s],"tapered-nose");for(let T of[-1,1]){let b=u(new et(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,T*.1),b.rotation.z=-.15;let I=new Wt;I.moveTo(2.57,.38),I.lineTo(3.43,.38),I.quadraticCurveTo(3.53,.42,3.43,.61),I.lineTo(3.14,a?.69:.64),I.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),I.closePath();let F=u(new Vt(I,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");F.position.z=T*l/2-.017,u(new et(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,T*(l/2+.055));let z=new At([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([R,L])=>new w(R,L,T*(l/2+.025))));if(u(new wt(z,28,.009,6,!1),s,"endplate-trim"),a)for(let R=0;R<3;R++){let L=u(new et(.27,.075,.018),n,"flow-fin");L.position.set(2.86+R*.07,.54+R*.045,T*(1.1+R*.1)),L.rotation.z=.15}}for(let T of c.children){let b=T.geometry?.getAttribute("position");if(b){for(let I=0;I<b.count;I++)b.setX(I,b.getX(I)*.78);T.geometry.computeVertexNormals()}T.position.x=.2332+T.position.x*.78}return c}function Ur(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new Sn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new dt().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function lh(r,{paint:e,carbon:t,metal:n}){let i=new ke;i.name="rear-wing-"+r;let s=new ke;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(v,y,_,x,T,b,I=i){let F=new Ze(v,y);return F.name=_,F.position.set(x,T,b),F.castShadow=F.receiveShadow=!0,I.add(F),F}function f(v,y,_,x,T){let b=new Wt;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let I=new Vt(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});I.translate(0,0,-_/2);let F=d(I,T,"rear-wing-blade",v,y,0,s);F.rotation.z=-.08}if(f(0,l,h,u,o||r==="sport"?t:n),c&&f(.025,l+.23,h*.96,u*.7,t),a&&f(-.05,l-.18,h,.3,e),r!=="lip")for(let v of[-1,1])d(new et(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),v*h/2,s);let g=[];for(let v of[-.72,.72]){d(new et(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,v);for(let x of[-2.36,-2.22])d(new Je(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,v);let y=d(new et(1,.075,.085),t,"rearward-mount-arm",0,1.015,v),_=d(new et(.085,1,.075),t,"rear-wing-upright",0,0,v);g.push({lower:y,post:_,z:v})}let m=Ur([s],i).max.x;function p(v){let y=Math.min(-2.85,v&&!v.isEmpty()?v.min.x-.24-m:-2.85);s.position.x=y;for(let{lower:_,post:x}of g)_.position.x=(-2.29+y)/2,_.scale.x=Math.abs(y+2.29),x.position.set(y,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=y,i.updateMatrixWorld(!0)}return p(),i.userData.fitTurbines=p,i}function zd(r="classic"){let e=new ke;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new Et({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new Et({color:"#161d23",roughness:.83,metalness:.15}),a=new Et({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,f,g=e){let m=new Ze(c,l);return m.name=h,m.position.set(u,d,f),m.castShadow=m.receiveShadow=!0,g.add(m),m}o(new et(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new Je(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new Je(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),f=new w(1.1,1.31,l),g=f.clone().sub(d),m=d.clone().add(f).multiplyScalar(.5);o(new et(.055,g.length(),.035),i,c+"-lever",...m.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),g.normalize());let v=c==="brake"?.24:.32,y=new Wt,_=h/2,x=v/2,T=.025;if(y.moveTo(-_+T,-x),y.lineTo(_-T,-x),y.quadraticCurveTo(_,-x,_,-x+T),y.lineTo(_,x-T),y.quadraticCurveTo(_,x,_-T,x),y.lineTo(-_+T,x),y.quadraticCurveTo(-_,x,-_,x-T),y.lineTo(-_,-x+T),y.quadraticCurveTo(-_,-x,-_+T,-x),n)for(let F of[-.065,0,.065])for(let U of c==="brake"?[-.055,.055]:[0]){let z=new On;z.absarc(U,F,.014,0,Math.PI*2,!0),y.holes.push(z)}let b=o(new Vt(y,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let F of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new et(h*.76,.009,.007),n?a:i,c+"-grip",0,F,-.007,b);let I=Array.from({length:65},(F,U)=>{let z=U/64,R=z*Math.PI*12;return new w(.77+z*.23,1.095+z*.15+Math.sin(R)*.018,l+.045+Math.cos(R)*.018)});if(o(new wt(new At(I),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let F=o(new Je(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);F.rotation.z=-1.05}}return e}function hh(r){let e=new ke;e.name="sport-seat-"+r;let t=(R,L=.8,Z=0)=>new _n({color:R,roughness:L,metalness:Z,clearcoat:Z?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),f=document.createElement("canvas");f.width=f.height=64;let g=f.getContext("2d");g.fillStyle="#30343b",g.fillRect(0,0,64,64);for(let R=0;R<64;R+=8)for(let L=0;L<64;L+=8)g.fillStyle=(L+R)%16?"#121820":"#626973",g.fillRect(L,R,7,3),g.fillStyle="#252b33",g.fillRect(L,R+4,3,4);let m=new Gt(f);m.wrapS=m.wrapT=Rn,m.repeat.set(3,5),m.colorSpace=xt,c.map=m,c.bumpMap=m,c.bumpScale=.004;let p=(R,L,Z=0,H=0,ie=0,te=e)=>{let K=new Ze(R,L);return K.position.set(Z,H,ie),K.castShadow=K.receiveShadow=!0,te.add(K),K},v=(R,L,Z,H,ie,te,K,de,Le=e)=>{let ze=new Wt,Se=-R/2,Ee=-L/2;return H=Math.min(H,R/2,L/2,Z/2),ze.moveTo(Se+H,Ee),ze.lineTo(Se+R-H,Ee),ze.quadraticCurveTo(Se+R,Ee,Se+R,Ee+H),ze.lineTo(Se+R,Ee+L-H),ze.quadraticCurveTo(Se+R,Ee+L,Se+R-H,Ee+L),ze.lineTo(Se+H,Ee+L),ze.quadraticCurveTo(Se,Ee+L,Se,Ee+L-H),ze.lineTo(Se,Ee+H),ze.quadraticCurveTo(Se,Ee,Se+H,Ee),p(new Vt(ze,{depth:Z-2*H,bevelEnabled:!0,bevelSize:H,bevelThickness:H,bevelSegments:4,curveSegments:12}),ie,te,K,de-Z/2+H,Le)},y=(R,L,Z,H=e)=>p(new wt(new At(R.map(ie=>new w(...ie))),32,L,6,!1),Z,0,0,0,H),_=new ke;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new Wt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let R of[-.135,.135]){let L=new On;L.moveTo(R-.075,1.24),L.lineTo(R+.075,1.24),L.lineTo(R+.075,1.34),L.lineTo(R-.075,1.34),L.closePath(),x.holes.push(L)}p(new Vt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),p(new Vt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),v(.41,.18,.095,.025,a,0,1.43,.035,_),v(.46,.5,.12,.035,o,0,.85,.065,_),v(.45,.31,.17,.04,o,0,.4,.1,_);for(let R of[-1,1]){let L=v(.17,.42,.19,.055,a,R*.34,.98,.1,_);L.rotation.z=R*.28,L.rotation.y=-R*.25;let Z=v(.13,.55,.23,.045,a,R*.3,.49,.14,_);Z.rotation.z=-R*.12,y([[R*.27,.18,.28],[R*.34,.52,.28],[R*.4,.93,.24],[R*.3,1.17,.2]],.005,l,_);let H=R*.135;for(let ie of[1.235,1.345])v(.16,.014,.022,.004,h,H,ie,.015,_);for(let ie of[H-.08,H+.08])v(.014,.12,.022,.004,h,ie,1.29,.015,_)}let b=v(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let I=v(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);I.name="seat-cushion",v(.54,.15,.17,.045,a,0,.52,.77);for(let R of[.2,.33,.46,.59])y([[-.23,.625,R],[0,.635,R+.015],[.23,.625,R]],.003,l);if(n){for(let R of[-1,1])v(.14,.13,.64,.04,a,R*.45,.65,.32),v(.045,.23,.1,.01,h,R*.45,.48,.16);for(let R=.45;R<1.1;R+=.15)for(let L of[-.1,.1])y([[L-.1,R,.18],[L,R+.07,.18],[L+.1,R,.18]],.003,l,_)}i&&(v(.47,.1,.22,.035,a,0,.56,.86),y([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let R of[-1,1]){let L=v(.16,.26,.74,.055,a,R*(n?.365:.325),.54,.39);L.rotation.z=-R*.12,y([[R*.26,.63,.03],[R*.26,.66,.35],[R*.26,.63,.73]],.005,l),v(.075,.075,.82,.015,h,R*.28,-.015,.34);for(let Z of[.02,.65])v(.13,.09,.12,.015,c,R*.28,-.055,Z),p(new Je(.022,.022,.015,12),h,R*.28,-.002,Z)}for(let R=.3;R<1.08;R+=.11)y([[-.19,R,.16],[0,R-.015,.17],[.19,R,.16]],.0025,l,_);for(let R of[-1,1]){let L=[[R*.135,1.5,-.13],[R*.135,1.15,-.03],[R*.13,.78,.08],[R*.1,.66,.4]],Z=[],H=[];L.forEach(([de,Le,ze],Se)=>{Z.push(de-.033,Le,ze,de+.033,Le,ze),Se&&H.push(Se*2-2,Se*2-1,Se*2,Se*2-1,Se*2+1,Se*2)});let ie=new ut;ie.setAttribute("position",new Ie(Z,3)),ie.setIndex(H),ie.computeVertexNormals();let te=u.clone();te.side=Ot,p(ie,te);let K=v(.27,.055,.025,.008,u,R*.18,.64,.45);K.rotation.z=-R*.2}let F=p(new Je(.065,.065,.035,24),h,0,.66,.48);F.rotation.x=Math.PI/2;let U=p(new Je(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);U.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let z=new Sn().setFromObject(b).min.y;for(let R of e.children)R.position.y-=z;return e.userData.floorContact=0,e}var ch;function Gd(r,e){if(!r.isConnected||e==="none")return;if(!ch){let a=new Jn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=xt,a.toneMapping=Zn,a.toneMappingExposure=1.25;let o=new yn;o.add(new Vn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let f=new zn("#ffffff",d);f.position.set(l,h,u),o.add(f)}let c=new tn(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),ch={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=ch;s[e]||(s[e]=hh(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Ud;window.pokerPaintBrakePreview=Nd;window.pokerPaintSeatPreview=Gd;var kd=(r,e,t)=>Math.max(e,Math.min(t,r));function uh(r,e,t={}){let n=window.PokerGarage,i=new ke;r.add(i),i.scale.set(1.24,.86,.95);let s=(M,E,G)=>new _n({color:M,metalness:E,roughness:G,clearcoat:E>.3?.65:.12,clearcoatRoughness:.12}),a=s(n.item("paint",e.paint).color,.55,.24),o=s(n.item("paint",e.paint).color,0,.93),c=s("#e5aa28",1,.135),l=s("#171a1e",.04,.76),h=s(n.wheelPaintColor(e),.86,.25),u=s("#0d1417",.35,.3),d=s("#060809",.12,.36),f=s(n.item("light",e.light).color,.45,.2),g=s("#123e47",.86,.22);f.emissive.copy(f.color),f.emissiveIntensity=2;function m(M,E,G=0,se=0,O=0,fe=i){if(t.prepareGeometry){let ue=t.prepareGeometry(M);ue!==M&&(M.dispose(),M=ue)}let $=new Ze(M,E);return $.position.set(G,se,O),$.castShadow=!0,$.receiveShadow=!0,fe.add($),$}let p=(M,E,G,se,O,fe,$)=>m(new et(M,E,G),se,O,fe,$);function v(M,E,G,se,O,fe,$="y"){let ue=m(new Je(M,M,E,64),G,se,O,fe);return $==="z"&&(ue.rotation.x=Math.PI/2),$==="x"&&(ue.rotation.z=Math.PI/2),ue}function y(M,E,G,se,O,fe,$="z"){let ue=m(new Ut(M,E,12,80),G,se,O,fe);return $==="y"&&(ue.rotation.x=Math.PI/2),$==="x"&&(ue.rotation.y=Math.PI/2),ue}function _(M,E,G,se=Wt){let O=new se,fe=-M/2,$=-E/2;return G=Math.min(G,E/2-.001),O.moveTo(fe+G,$),O.lineTo(fe+M-G,$),O.quadraticCurveTo(fe+M,$,fe+M,$+G),O.lineTo(fe+M,$+E-G),O.quadraticCurveTo(fe+M,$+E,fe+M-G,$+E),O.lineTo(fe+G,$+E),O.quadraticCurveTo(fe,$+E,fe,$+E-G),O.lineTo(fe,$+G),O.quadraticCurveTo(fe,$,fe+G,$),O}function x(M,E,G,se,O,fe,$=null,ue=.025){let _e=_(M,E,se);if($){let yt=_($[0],$[1],$[2],On),st=new On(yt.getPoints(40).map(ne=>new we(ne.x+($[3]||0),ne.y)));_e.holes.push(st)}let ct=m(new Vt(_e,{depth:G,bevelEnabled:ue>0,bevelSize:ue,bevelThickness:ue,bevelSegments:4,curveSegments:40}),O,0,fe,0);return ct.rotation.x=-Math.PI/2,ct}let T=[],b=i.children.length,I=[3.02,1.51,.65,-.28],F=_(4.96,2.44,1.15).getSpacedPoints(128),U=[],z=[],R=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,E]of R)for(let G=0;G<128;G++){let se=F[G];U.push(se.x*E,M,-se.y*E)}for(let M=0;M<3;M++)for(let E=0;E<128;E++){let G=M*128+E,se=M*128+(E+1)%128;z.push(G,se,G+128,se,se+128,G+128)}let L=new ut;L.setAttribute("position",new Ie(U,3)),L.setIndex(z),L.computeVertexNormals(),a.side=Ot,m(L,a);let Z=x(5.03,2.51,.065,1.19,c,.58,null,.035);x(5.1,2.58,.09,1.22,c,1.25,I,.035);let H=new At(_(4.94,2.42,1.15).getPoints(40).map(M=>new w(M.x,1.44,-M.y)),!0,"centripetal");m(new wt(H,240,.125,16,!0),d);for(let M of[-1,1]){let E=Array.from({length:21},(G,se)=>{let O=.26+se*.25/20;return new w(1.32+1.15*Math.cos(O),1.44,M*(.06+1.15*Math.sin(O)))});m(new wt(new At(E),32,.132,20,!1),c)}x(4.65,2.14,.035,1.03,c,1.39,I,.015),x(4.52,2.01,.025,.97,o,1.43,I,.01),T.push(...i.children.slice(b));let ie=x(2.98,1.47,.025,.63,o,.94);ie.position.x=-.28;let te=new _n({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Ot,polygonOffset:!0,polygonOffsetFactor:-1}),K=new Vi(_(2.9,1.4,.6)),de=K.attributes.position,Le=K.attributes.uv;for(let M=0;M<de.count;M++)Le.setXY(M,(de.getX(M)+1.45)/2.9,(de.getY(M)+.7)/1.4);let ze=m(K,te,-.28,1.005,0);ze.rotation.x=-Math.PI/2,ze.castShadow=!1;let Se=te.clone(),Ee=[];for(let M of[-1,1]){let E=m(new qt(3.05,.3),Se,0,1.04,M*1.329);M<0&&(E.rotation.y=Math.PI),E.castShadow=!1,Ee.push(E)}function ee(M){let E=M.vinyl||"none";ze.visible=E!=="none",Ee.forEach(se=>se.visible=E!=="none");let G=E+":"+(M.vinylText||"");if(te.userData.id!==G){te.map?.dispose(),Se.map?.dispose(),te.map=new Gt(n.vinylCanvas(E,!1,M.vinylText)),Se.map=new Gt(n.vinylCanvas(E,!0,M.vinylText));for(let se of[te,Se]){se.map.colorSpace=xt,se.map.anisotropy=16;let O=se.map;O.image.addEventListener("vinyl-ready",()=>{O.needsUpdate=!0},{once:!0}),se.needsUpdate=!0,se.userData.id=G}}}let Te=x(3.13,1.62,.018,.7,c,1.46,[3.02,1.51,.65,0],.006);Te.position.x=-.28;let be=x(3.08,1.57,.46,.68,a,.96,[3.02,1.51,.65,0],.005);be.position.x=-.28;for(let M of[-1,-.35,.35])for(let E of[-.75,.75])p(.011,.4,.009,u,M,1.2,E);function Y(M,E){let G=document.createElement("canvas");G.width=G.height=256;let se=G.getContext("2d");se.fillStyle=M,se.fillRect(0,0,256,256);let O=17;for(let $=0;$<18e3;$++)O=O*1664525+1013904223>>>0,se.fillStyle="rgba(0,0,0,"+E+")",se.fillRect(O%256,(O>>>8)%256,1,1);let fe=new Gt(G);return fe.colorSpace=xt,fe.wrapS=fe.wrapT=Rn,fe}o.map=Y("#e8e8e8",.035),o.bumpMap=Y("#888888",.5),o.bumpScale=.0015,o.clearcoat=0,l.bumpMap=Y("#888888",.12),l.bumpScale=.003,d.bumpMap=Y("#888888",.3),d.bumpScale=.001;function Ue(M,E,G,se,O,fe=!1,$=i){let ue=new Wt;ue.moveTo(0,.5),ue.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),ue.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),ue.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),ue.bezierCurveTo(.48,.12,.12,.28,0,.5),ue.moveTo(-.12,-.3),ue.lineTo(0,-.06),ue.lineTo(.12,-.3),ue.closePath();let _e=m(new Vt(ue,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),E,G,se,O,$);return _e.scale.setScalar(M),fe&&(_e.rotation.y=Math.PI),_e}let A=[],P=[],X=[],V=null;for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=E*1.36,se=E*1.57,O=new ke;O.position.set(M,.81,G),i.add(O),O.userData.groundWheel=!0;let fe=i.children.length,$=m(new vi([new we(.56,-.19),new we(.61,-.245),new we(.67,-.25),new we(.76,-.19),new we(.8,-.1),new we(.8,.1),new we(.76,.19),new we(.67,.25),new we(.61,.245),new we(.56,.19)],80),l,M,.81,G);$.rotation.x=Math.PI/2;for(let ne=-2;ne<=2;ne++)y(.798-Math.abs(ne)*.012,.0035,u,M,.81,G+ne*.071);for(let ne=0;ne<28;ne++){let Me=ne*Math.PI/14,Ve=Array.from({length:17},(tt,it)=>{let Dt=it/16,Xt=-.205+Dt*.41,ht=.799-.044*Math.pow(Math.abs(Xt)/.205,3),Qe=Me+.13*Math.sin(Dt*Math.PI);return new w(M+Math.sin(Qe)*ht,.81+Math.cos(Qe)*ht,G+Xt)});m(new wt(new At(Ve),20,.0045,5,!1),u)}for(let ne of[-1,1])for(let Me of[.625,.654,.681])y(Me,.0035,u,M,.81,G+ne*.244);let ue=i.children.slice(fe);y(.548,.023,h,M,.81,se+E*.035),y(.505,.016,h,M,.81,se+E*.043),v(.14,.045,u,M,.81,se+E*.045,"z"),y(.14,.012,h,M,.81,se+E*.069);let _e=s("#39434a",.78,.28);_e.side=Ot;let ct=m(new Je(.544,.544,.44,64,1,!0),_e,M,.81,G);ct.rotation.x=Math.PI/2,y(.548,.025,h,M,.81,G-E*.245),y(.505,.013,h,M,.81,G-E*.253),v(.16,.1,_e,M,.81,G-E*.22,"z"),y(.16,.012,h,M,.81,G-E*.275),v(.075,.13,u,M,.81,G-E*.28,"z");for(let ne=0;ne<5;ne++){let Me=ne*Math.PI*2/5;v(.018,.024,h,M+Math.sin(Me)*.115,.81+Math.cos(Me)*.115,G-E*.282,"z")}let yt=Ue(.2,h,M,.8,se+E*.075,E<0);P.push(yt);for(let ne of n.wheelDesign()){let Me=new At(ne.map(([Ve,tt])=>new w(M+Ve,.81+tt,se+E*(.04+.025*(1-Math.hypot(Ve,tt)/.51)))));A.push(m(new wt(Me,20,.007,6,!1),h))}for(let ne=0;ne<20;ne++){let Me=ne*Math.PI/10;v(.006,.009,h,M+Math.sin(Me)*.526,.81+Math.cos(Me)*.526,se+E*.06,"z")}i.updateMatrixWorld(!0);for(let ne of i.children.slice(fe))O.attach(ne);O.scale.set(.88/1.24,.88/.86,1/.95),O.position.y=.715/.86;let st={standard:ue};for(let ne of["soft","medium","hard","semi","wet"]){let Me=Bd(ne);Me.visible=!1,O.add(Me),st[ne]=[Me]}X.push({wheelGroup:O,x:M,out:se,sign:E,tyres:st})}let S=[];for(let M of[-1,1])S.push(p(1.35,.43,.04,c,.05,.94,M*1.3));let B=[];for(let M of[-1,1])B.push(v(.275,.27,u,2.16,.945,M*.97,"z"),y(.278,.035,c,2.16,.945,M*1.11));for(let M of[-1.72,1.72]){let E=v(.07,2.8,u,M,.7,0,"z");E.userData.groundWheel=!0}p(3.6,.08,.8,u,0,.57,0);let W=[];function k(M,E,G){let se=document.createElement("canvas");se.width=M,se.height=E,G(se.getContext("2d"),M,E);let O=new Gt(se);return O.colorSpace=xt,O.anisotropy=8,W.push(O),O}let ve=k(768,256,(M,E,G)=>{M.fillStyle="#101b18",M.fillRect(0,0,E,G),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,E-20,G-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",E/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",E/2,209)}),ae=[];for(let M of[-1,1]){let E=new _n({map:ve,metalness:.55,roughness:.2,clearcoat:1});ae.push(E);let G=m(new qt(1.28,.4),E,.05,.94,M*1.326);E.userData.plane=G,M<0&&(G.rotation.y=Math.PI)}let le=[];for(let M of[-1,1])for(let E=0;E<3;E++){let G=new ke;G.position.set((E-1)*.82+.05,1,M*1.39),G.userData.side=M,G.scale.setScalar(1.17),M<0&&(G.rotation.y=Math.PI),i.add(G);let se=m(new et(.1,.1,.025),c,0,0,0,G),O=new Et({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),fe=m(new qt(.65,.65,32,8),O,0,0,.047,G);fe.castShadow=!1,fe.receiveShadow=!1,le.push({group:G,mat:O,back:se,n:E})}for(let M of[-1,1])for(let E of[-.54,.64])for(let G of[.78,1.1]){let se=v(.014,.018,c,E,G,M*1.35,"z")}let Ce=i.children.length;for(let M of[-1.7,-.35,1.48])for(let E of[-1.21,1.21]){let G=v(.128,.13,c,M,1.44,E,"x")}for(let M of[-1.7,-.35,1.48])for(let E of[-1,1])y(.125,.004,u,M+.08,1.44,E*1.21,"x"),y(.125,.004,u,M-.08,1.44,E*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let E of[-.96,.96])v(.135,.08,c,M,1.49,E),v(.108,.082,u,M,1.498,E),y(.125,.015,c,M,1.54,E,"y"),y(.111,.006,c,M,1.535,E,"y");let We=[],De=[],Xe=["#ab2338","#1b684b","#2455a5"].map(M=>s(M,.08,.55)),at=s("#eee9d6",.04,.6),pt=i.children.length;for(let[M,E,G,se]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let O=0;O<se;O++){v(.104,.033,Xe[G],M,1.49+O*.037,E);for(let fe=0;fe<6;fe++){let $=fe*Math.PI/3,ue=p(.024,.021,.012,at.clone(),M+Math.cos($)*.103,1.49+O*.037,E+Math.sin($)*.103);ue.rotation.y=Math.PI/2-$,ue.castShadow=!1,ue.receiveShadow=!1,ue.userData.edgeIndex=fe,We.push(ue)}if(O===se-1){let fe=new Et({transparent:!0,alphaTest:.1,roughness:.65}),$=m(new qt(.208,.208),fe,M,1.511+O*.037,E);$.rotation.x=-Math.PI/2,$.castShadow=!1,$.receiveShadow=!1,De.push({mat:fe,n:G})}}let Ct=i.children.slice(pt);T.push(...i.children.slice(Ce));let Tt=new ke;Tt.position.set(.47,1.78,0),Tt.scale.set(.82/1.24,.82/.86,.82/.95),i.add(Tt);let Ae=new ke;Tt.add(Ae);let D=new w((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),j=new w(0,0,1),Q=new w().crossVectors(D,j).normalize();Ae.quaternion.setFromRotationMatrix(new dt().makeBasis(j,Q,D));let oe=d.clone();m(new Ut(.53,.06,16,80),oe,0,0,0,Ae),m(new Ut(.473,.014,10,64),c,0,0,-.02,Ae);for(let M of[Math.PI]){let E=m(new et(.09,.39,.045),c,Math.sin(M)*.26,Math.cos(M)*.26,0,Ae);E.rotation.z=-M}for(let M of[-1,1]){let E=m(new et(.35,.075,.06),c,M*.265,0,0,Ae);m(new et(.32,.035,.064),u,M*.265,0,.006,Ae)}let q=m(new Je(.195,.195,.075,64),c,0,0,.035,Ae);q.rotation.x=Math.PI/2;let J=m(new In(.177,64),new Et({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Ae);J.receiveShadow=!1,Ue(.38,c,0,-.025,.105,!1,Ae);let re={classic:new ke,sport:new ke,formula:new ke};for(let M of Ae.children.slice())re.classic.add(M);Object.values(re).forEach(M=>Ae.add(M));function ce(M,E,G,se){let O=new At(E.map(([fe,$])=>new w(fe,$,0)),!0);m(new wt(O,72,G,12,!0),se,0,0,0,M)}ce(re.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,oe);for(let M of[-1,1])m(new et(.35,.065,.045),h,M*.27,0,0,re.sport),m(new et(.065,.3,.045),h,M*.12,-.22,0,re.sport);m(new Ut(.5,.018,8,64,.22),f,0,0,.005,re.sport),ce(re.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,oe),m(new et(.6,.23,.065),u,0,0,0,re.formula);for(let M of[-1,1])m(new Ft(.035,12,8),f,M*.25,.055,.06,re.formula),m(new et(.08,.29,.025),h,M*.37,0,-.07,re.formula);for(let M of["sport","formula"]){let E=m(new Je(.15,.15,.07,48),h,0,0,.035,re[M]);E.rotation.x=Math.PI/2,m(new In(.13,48),u,0,0,.078,re[M]),Ue(.25,h,0,-.018,.09,!1,re[M])}for(let[M,E]of Object.entries(n.steeringDesigns)){let G=new ke;Ae.add(G),re[M]=G;let se=s(M==="woodHeritage"?E.color:"#14191d",M==="woodHeritage"?.35:.04,M==="woodHeritage"?.24:.82),O=s(M==="drift"?"#c5a14f":M==="rallySuede"?"#292e33":"#b8c2c9",.85,.25);if(M==="trackYoke"){nt([[-.43,.39,0],[-.51,.12,0],[-.47,-.26,0],[0,-.39,0],[.47,-.26,0],[.51,.12,0],[.43,.39,0]],.065,se,G);for(let ue of[-1,1])m(new Ft(1,24,16),se,ue*.46,.15,.01,G).scale.set(.085,.28,.09),m(new et(.25,.1,.055),O,ue*.23,-.07,.015,G);let $=m(new et(.45,.28,.085),s("#20282e",.45,.35),0,-.02,.03,G);m(new et(.2,.085,.012),u,0,.035,.08,G);for(let ue of[-1,1])for(let _e of[-.08,.05])m(new Ft(.023,12,8),O,ue*.15,_e,.085,G);continue}E.shape==="round"?m(new Ut(.53,.065,16,80),se,0,0,0,G):E.shape==="flat"?ce(G,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,se):nt([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,se,G);for(let $=0;$<E.spokes;$++){let ue=$*Math.PI*2/E.spokes,_e=m(new et(.39,.065,.05),O,Math.cos(ue)*.25,Math.sin(ue)*.25,.015,G);_e.rotation.z=ue}let fe=m(new Je(.15,.15,.075,40),u,0,0,.05,G);fe.rotation.x=Math.PI/2,Ue(.23,h,0,-.015,.095,!1,G),(M==="rallySuede"||M==="carbonD")&&m(new et(.045,.09,.025),s("#ed5555",.1,.6),0,.51,.06,G)}let me=s("#b9ab8a",.15,.8),C=s("#171c20",.02,.85);for(let[M,E]of Object.entries(re)){if(M==="trackYoke")continue;let G=M==="classic"?.53:M==="sport"?.51:.47;for(let O of[-1,1]){if(M!=="formula"){let fe=m(new Ut(G,.072,12,30,.64),C,0,0,.003,E);fe.rotation.z=O<0?Math.PI-.32:-.32}for(let fe=0;fe<9;fe++){let $=(O<0?Math.PI:0)-.28+fe*.07;m(new Ft(.007,6,4),me,Math.cos($)*(G-.045),Math.sin($)*(G-.045),.063,E)}}let se=m(new et(.065,.1,.035),M==="classic"?c:f,0,M==="formula"?.16:.51,.045,E);for(let O=0;O<6;O++){let fe=O*Math.PI/3,$=m(new Je(.012,.012,.012,6),h,Math.cos(fe)*.13,Math.sin(fe)*.13,.099,E);$.rotation.x=Math.PI/2}}let pe=new w(.96,1.32,0),Re=new w(.47,1.78,0),ye=Re.clone().sub(pe),Ge=pe.clone().add(Re).multiplyScalar(.5),rt=p(.12,ye.length(),.095,c,...Ge.toArray());rt.quaternion.setFromUnitVectors(new w(0,1,0),ye.normalize());let Oe=Fe(.26,.08,.66,.035,u,.96,1.3,0);for(let M of[-1,1])Fe(.16,.16,.09,.02,u,.96,1.22,M*.26),v(.014,.012,c,.96,1.347,M*.24);Oe.name="steering-chassis-mount",p(.075,rt.geometry.parameters.height-.04,.1,u,...Ge.toArray()).quaternion.copy(rt.quaternion);let ot=-1.84,Ye=1.99,gt=.74,vt=new ke;vt.name="garage-turbine-primary",vt.position.set(ot,Ye,0),i.add(vt);let mt=i.children.length;v(gt,.51,c,ot,Ye,0,"z"),v(.67,.54,u,ot,Ye,0,"z");for(let M of[-1,1]){let E=M*.29;y(.72,.055,u,ot,Ye,E),y(.75,.022,c,ot,Ye,E+M*.03),y(.665,.012,f,ot,Ye,E+M*.025);for(let G=0;G<14;G++){let se=G*Math.PI/7,O=[],fe=[];for(let _e=0;_e<=16;_e++){let ct=_e/16,yt=.22+ct*.44,st=se+.55*ct;for(let ne of[-.15,.15])O.push(ot+Math.sin(st+ne)*yt,Ye+Math.cos(st+ne)*yt,E+M*(.018+Math.sin(ct*Math.PI)*.12))}for(let _e=0;_e<16;_e++){let ct=_e*2;fe.push(ct,ct+1,ct+2,ct+1,ct+3,ct+2)}let $=new ut;$.setAttribute("position",new Ie(O,3)),$.setIndex(fe),$.computeVertexNormals(),g.side=Ot,m($,g);let ue=new At(Array.from({length:17},(_e,ct)=>{let yt=ct/16,st=.22+yt*.44,ne=se+.55*yt-.15;return new w(ot+Math.sin(ne)*st,Ye+Math.cos(ne)*st,E+M*(.025+Math.sin(yt*Math.PI)*.12))}));m(new wt(ue,20,.009,6,!1),f)}v(.215,.07,c,ot,Ye,E+M*.085,"z"),v(.18,.085,u,ot,Ye,E+M*.11,"z")}for(let M=0;M<12;M++){let E=M*Math.PI/6,G=p(.045,.15,.2,u,ot+Math.cos(E)*.735,Ye+Math.sin(E)*.735,0);G.rotation.z=E}i.updateMatrixWorld(!0);for(let M of i.children.slice(mt))vt.attach(M);vt.rotation.set(0,Math.PI/2,0),vt.scale.set(.96/1.24,.96/.86,.96/.95);let _t=vt.clone(!0);_t.name="garage-turbine-secondary",i.add(_t);let kt=new ke;vt.add(kt);let Ht=s("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])m(new Ut(.765,.028,10,80),Ht,0,0,M,kt);for(let M=0;M<8;M++){let E=M*Math.PI/4,G=m(new Je(.025,.025,.025,6),Ht,Math.sin(E)*.73,Math.cos(E)*.73,.35,kt);G.rotation.x=Math.PI/2}let Kt={classic:new ke,dual:new ke,titanium:new ke},ln=s("#a9b7c4",.92,.23),Ln=s("#668bb5",.88,.25);Object.values(Kt).forEach(M=>i.add(M));for(let[M,E]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let G of E){let se=M==="titanium"?Ln:ln,O=m(new Je(.105,.105,.5,32),se,-2.42,.76,G,Kt[M]);O.rotation.z=Math.PI/2;let fe=m(new Je(.079,.079,.012,32),u,-2.678,.76,G,Kt[M]);fe.rotation.z=Math.PI/2;let $=m(new Ut(.094,.012,8,32),se,-2.69,.76,G,Kt[M]);$.rotation.y=Math.PI/2}for(let[M,E]of Object.entries(Kt)){let G=M==="classic"?[0]:[-.67,.67];for(let O of G){let fe=m(new Je(.18,.18,.52,40),ln,-2.19,.76,O,E);fe.rotation.z=Math.PI/2;for(let $ of[-2.36,-2.04]){let ue=m(new Ut(.184,.016,8,40),u,$,.76,O,E);ue.rotation.y=Math.PI/2,m(new et(.07,.19,.07),ln,$,.94,O,E)}}let se=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let O of se){let fe=m(new Je(.077,.077,.11,32,1,!0),s("#151c23",.35,.65),-2.63,.76,O,E);fe.rotation.z=Math.PI/2;let $=m(new Ut(.107,.018,10,40),M==="titanium"?Ln:ln,-2.57,.76,O,E);if($.rotation.y=Math.PI/2,M==="titanium")for(let[ue,_e]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let ct=m(new Ut(.106,.008,6,40),s(_e,.85,.3),ue,.76,O,E);ct.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let E=new At([new w(-2.16,1.46,M*.65),new w(-1.94,1.66,M*.69),new w(-1.3,1.59,M*.64),new w(-.98,1.47,M*.7)]);m(new wt(E,32,.022,8,!1),c),p(.34,.06,.14,c,-1.84,1.48,M*.4)}for(let M of[-1,1]){let E=new At([new w(-2.45,1.1,M*.7),new w(-2.43,1.36,M*.72),new w(-2.19,1.55,M*.7),new w(-1.9,1.55,M*.68)]);m(new wt(E,40,.075,14,!1),u),m(new wt(E,40,.019,10,!1),c);for(let G of[-2.2,-1.96]){let se=new At([new w(G,1.43,M*.48),new w(G,1.63,M*.6),new w(G+.24,1.57,M*.82)]);m(new wt(se,24,.017,8,!1),c)}}let or=i.children.length,Mn=[],_i=[],lr=[];for(let M=0;M<=48;M++){let E=-.92+M*1.84/48;for(let G of[.64,1.23])_i.push(2.57-.28*(Math.sin(E)*1.25/1.1)**2,G,Math.sin(E)*1.25)}for(let M=0;M<48;M++){let E=M*2;lr.push(E,E+2,E+1,E+1,E+2,E+3)}let Wi=new ut;Wi.setAttribute("position",new Ie(_i,3)),Wi.setIndex(lr),Wi.computeVertexNormals();let N=s("#00453f",.72,.14);N.clearcoat=1,N.side=Ot,m(Wi,N);for(let M of[.635,1.225]){let E=Array.from({length:65},(G,se)=>{let O=-1.04+se*2.08/64;return new w(2.57-.28*(O/1.1)**2,M,O)});m(new wt(new At(E),80,.034,12,!1),c)}for(let M of[-1,1]){let E=M*1,G=2.57-.28*(E/1.1)**2,se=new At([new w(G-.04,.635,E),new w(G+.05,.78,E),new w(G+.065,1.12,E),new w(G-.04,1.25,E)]);m(new wt(se,32,.065,12,!1),c);for(let O of[.91,1.065]){let fe=Array.from({length:16},($,ue)=>{let _e=M*(.51+ue*.41/15);return new w(2.57-.28*(_e/1.1)**2+.018,O,_e)});Mn.push(m(new wt(new At(fe),24,.017,8,!1),f))}}let he=i.children.length,xe=[];for(let M=0;M<2;M++){let E=new ke;E.name="hood-playing-card-"+M,E.position.set(1.66+M*.08,1.495+M*.014,M?.23:-.23),E.rotation.set(-Math.PI/2,0,M?-.18:.18),i.add(E);let G=_(.54,.76,.035),se=new Vt(G,{depth:.004,bevelEnabled:!1,curveSegments:10});se.translate(0,0,-.004);let O=m(se,new Et({color:"#e1d8c4",roughness:.94,metalness:0}),0,0,0,E);O.castShadow=!1,O.receiveShadow=!1;let fe=new Gt(n.cardCanvas(e.cards,M));fe.colorSpace=xt,fe.anisotropy=16;let $=new Pn({map:fe,transparent:!0,alphaTest:.1,toneMapped:!1,side:Ot,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});$.userData.style=e.cards,xe.push($);let ue=m(new qt(.54,.76),$,0,0,.0015,E);ue.name="printed-card-face-"+M,ue.castShadow=!1,ue.receiveShadow=!1}let Pe=i.children.slice(he);T.push(...i.children.slice(or));let ge=new Et({map:new Gt(n.plateCanvas(e)),roughness:.6}),Be=[];for(let M of[-1,1]){let E=m(new qt(.79,.463),ge,M*2.605,1.01,0);E.rotation.y=M*Math.PI/2,Be.push({plate:E,sign:M}),M>0&&T.push(E)}let $e=[],Ne={},He=s("#7d8c98",.82,.28),Ke=s("#202a32",.45,.38),bt=s("#a7c6d5",.98,.055),je=s("#182029",.35,.48);je.bumpMap=Y("#888888",.2),je.bumpScale=.001;function Fe(M,E,G,se,O,fe,$,ue,_e){let ct=new Vt(_(M,E,se),{depth:G,bevelEnabled:!0,bevelSize:Math.min(.012,G*.2),bevelThickness:Math.min(.012,G*.2),bevelSegments:3,curveSegments:12});return ct.translate(0,0,-G/2),m(ct,O,fe,$,ue,_e)}function nt(M,E,G,se){return m(new wt(new At(M.map(O=>new w(...O))),40,E,12,!1),G,0,0,0,se)}function sn(M,E,G,se){let O=m(new Je(.014,.014,.014,6),He,M,E,G,se);O.rotation.x=Math.PI/2}function pn(M,E,G,se,O,fe){let $=new Wt;$.moveTo(-se*.5,0),$.bezierCurveTo(-se*.52,.055,-se*.12,.07,se*.5,.008),$.quadraticCurveTo(se*.05,-.025,-se*.5,0);let ue=new Vt($,{depth:G,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});ue.translate(0,0,-G/2);let _e=m(ue,O,M,E,0,fe);return _e.rotation.z=-.08,_e}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Ne[M]={};for(let E of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let G=new ke;i.add(G),Ne[M][E]=G;let se=["sport","aero"].includes(E)?je:He;if(M==="spoiler"){i.remove(G);let O=lh(E,{paint:a,carbon:je,metal:He});i.add(O),Ne.spoiler[E]=O;continue}if(M==="mirrors")for(let O of[-1,1]){let fe=new ke;G.add(fe),$e.push({group:fe,sign:O});let $=E==="aero",ue=$?1.68:E==="round"?1.96:1.86,_e=O*($?1.47:1.53),ct=.77;Fe(.18,.08,.15,.035,Ke,.64,1.46,O*1.19,fe),nt([[.64,1.47,O*1.19],[.62,1.62,O*1.32],[ct,ue-.07,_e]],$?.023:.029,se,fe);let yt=m(new Ft(.046,16,12),Ke,ct,ue-.065,_e,fe);if(E==="round"){m(new Ft(1,32,20),He,ct,ue,_e,fe).scale.set(.065,.15,.15);let ne=m(new In(.13,48),bt,ct-.056,ue,_e,fe);ne.rotation.y=-Math.PI/2,ne.castShadow=!1;let Me=m(new Ut(.136,.009,8,48),He,ct-.06,ue,_e,fe);Me.rotation.y=Math.PI/2}else{let st=$?.52:E==="sport"?.43:.38,ne=$?.11:E==="sport"?.26:.22,Me=Fe(st,ne,.095,E==="sport"?.018:$?.045:.075,E==="club"?He:je,ct,ue,_e,fe);Me.rotation.y=Math.PI/2;let Ve=m(new Vi(_(st-.045,ne-.035,.05)),bt,ct-.061,ue,_e,fe);Ve.rotation.y=-Math.PI/2,Ve.castShadow=!1,Ve.receiveShadow=!1;let tt=_(st-.028,ne-.018,.055).getPoints(24).map(it=>[ct-.058,ue+it.y,_e+it.x]);tt.push(tt[0]),nt(tt,.006,He,fe)}}else if(M==="sideSkirts")for(let O of[-1,1]){let fe=Fe(E==="aero"?2.75:2.3,E==="aero"?.27:E==="sport"?.19:.12,E==="rally"?.48:E==="aero"?.32:E==="sport"?.23:.13,.05,E==="club"||E==="rally"?se:je,0,.59,O*1.24,G);if(E==="rally")for(let $ of[-.84,-.42,0,.42,.84]){let ue=Fe(.13,.018,.25,.018,Ke,$,.67,O*1.24,G)}else nt([[-1.08,.54,O*1.3],[0,.53,O*1.32],[1.08,.54,O*1.3]],.009,f,G);for(let $ of[-.87,.87])Fe(.12,.14,.16,.025,Ke,$,.65,O*1.2,G),sn($,.61,O*1.33,G);if(E==="sport"){let $=Fe(.46,.24,.035,.02,je,-.96,.69,O*1.4,G);$.rotation.z=-.25}if(E==="aero")for(let $ of[-.95,-.4,.25,.95]){let ue=Fe(.24,.12,.025,.025,je,$,.57,O*1.35,G);ue.rotation.z=$>0?.2:-.2}}else{let O=M==="frontBumper"?1:-1,fe=[[O*2.26,.66,-.92],[O*2.58,.65,-.7],[O*2.67,.65,0],[O*2.58,.65,.7],[O*2.26,.66,.92]];E!=="aero"&&nt(fe,E==="sport"?.061:.047,se,G);for(let $ of[-.67,.67]){nt([[O*2.31,.74,$],[O*2.5,.68,$]],.032,Ke,G);let ue=Fe(.16,.12,.13,.035,Ke,O*2.51,.67,$,G)}if(E==="aero"){let $=Fe(.38,.045,1.94,.07,je,O*2.48,.5,0,G);for(let ue of[-.7,-.27,.27,.7])Fe(.27,.12,.022,.025,Ke,O*2.48,.55,ue,G);nt([[O*2.4,.52,-.91],[O*2.64,.52,0],[O*2.4,.52,.91]],.008,He,G)}if(E==="club"||E==="rally"){nt([[O*2.5,.67,-.59],[O*2.58,1.08,-.48],[O*2.61,1.14,.48],[O*2.5,.67,.59]],.04,He,G);let $=Fe(.1,.28,E==="rally"?1.12:.79,.04,se,O*2.6,.64,0,G);for(let ue of[-.3,-.1,.1,.3]){let _e=m(new In(.035,16),u,O*2.66,.64,ue,G);_e.rotation.y=O*Math.PI/2}}if(E==="rally")for(let $ of[-.72,.72])nt([[O*2.53,.65,$-.14],[O*2.56,.94,$-.14],[O*2.55,1.04,$],[O*2.56,.94,$+.14],[O*2.53,.65,$+.14]],.036,He,G);if(E==="sport")for(let $ of[-.67,.67]){let ue=Fe(.2,.13,.14,.045,Ke,O*2.56,.66,$,G)}if(M==="rearBumper"&&E==="aero")for(let $ of[-.7,-.35,0,.35,.7]){let ue=Fe(.27,.15,.025,.025,je,-2.46,.48,$,G);ue.rotation.z=.12}}}}let Zt=s("#b9e4f5",.28,.17);Zt.emissive.set("#b9e4f5"),Zt.emissiveIntensity=1.8;let It=s("#ffdda0",.2,.2);It.emissive.set("#ffe0a8"),It.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[E,G,se]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.36,.22],["sport",2.24,.18]]){let O=new ke;Ne[M][E]&&i.remove(Ne[M][E]),i.add(O),Ne[M][E]=O;let fe=M==="frontBumper"?1:-1,$=M==="rearBumper",ue=E==="trackGT"?.6:E==="driftWide"?.58:.49,_e=.82,ct=$?[[0,E==="trackGT"?1.36:1.08]]:E==="driftWide"?[[0,1.2],[-.94,.32],[.94,.32]]:E==="trackGT"?[[0,1.08],[-.91,.35],[.91,.35]]:[[0,.98],[-.79,.31],[.79,.31]],yt=E==="driftWide"?.35:E==="trackGT"?.33:.27,st=_(G,ue,.1);for(let[ht,Qe]of ct){let St=_(Qe,yt,.045,On);st.holes.push(new On(St.getPoints(24).map(zt=>new we(zt.x+ht,zt.y))))}let ne=new Vt(st,{depth:se,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),Me=ne.attributes.position;for(let ht=0;ht<Me.count;ht++){let Qe=Me.getX(ht),St=Me.getY(ht),zt=Me.getZ(ht);Me.setXYZ(ht,fe*(2.64+zt-.34*(Qe/(G/2))**2),_e+St,Qe)}ne.computeVertexNormals(),m(ne,a,0,0,0,O);for(let[ht,Qe]of ct){let St=_(Qe+.025,yt+.025,.045).getPoints(48).map(fn=>{let rn=fn.x+ht;return[fe*(2.64+se+.022-.34*(rn/(G/2))**2),_e+fn.y,rn]});St.push(St[0]),nt(St,.014,c,O);let zt=[];for(let fn of[-1,1])for(let rn=-Qe;rn<Qe;rn+=.055){let hi=[];for(let $t=0;$t<=20;$t++){let bn=-yt*.43+$t*yt*.86/20,ui=rn+fn*bn;Math.abs(ui)<Qe/2-.035&&hi.push([fe*(2.665-.34*((ht+ui)/(G/2))**2),_e+bn,ht+ui])}for(let $t=1;$t<hi.length;$t++)zt.push(...hi[$t-1],...hi[$t])}let un=new ut;un.setAttribute("position",new Ie(zt,3)),O.add(new qs(un,new ss({color:"#7d8c98"})))}let Ve=Array.from({length:41},(ht,Qe)=>{let St=-G/2+.04+Qe*(G-.08)/40;return[fe*(2.64+se+.018-.34*(St/(G/2))**2),_e+ue/2-.02,St]});nt(Ve,.018,c,O);for(let[ht,Qe]of ct){let St=[],zt=[];for(let fn=0;fn<=24;fn++){let rn=ht-Qe/2-.01+fn*(Qe+.02)/24,hi=fe*(2.64-.34*(rn/(G/2))**2);for(let $t of[-yt/2-.01,yt/2+.01])St.push(hi,_e+$t,rn)}for(let fn=0;fn<24;fn++){let rn=fn*2;zt.push(...fe>0?[rn,rn+1,rn+2,rn+1,rn+3,rn+2]:[rn,rn+2,rn+1,rn+1,rn+2,rn+3])}let un=new ut;un.setAttribute("position",new Ie(St,3)),un.setIndex(zt),un.computeVertexNormals(),m(un,u,0,0,0,O)}let tt=Array.from({length:41},(ht,Qe)=>{let St=-G/2+Qe*G/40;return[fe*(2.65+se+.045-.34*(St/(G/2))**2),_e-ue/2-.025,St]});nt(tt,E==="trackGT"?.028:.019,je,O);let it=new ut,Dt=[],Xt=[];for(let[ht,Qe,St]of tt)Dt.push(ht,Qe,St,ht-fe*.17,Qe+.005,St);for(let ht=0;ht<40;ht++){let Qe=ht*2;Xt.push(Qe,Qe+1,Qe+2,Qe+1,Qe+3,Qe+2)}if(it.setAttribute("position",new Ie(Dt,3)),it.setIndex(Xt),it.computeVertexNormals(),m(it,je,0,0,0,O),M==="rearBumper")for(let ht=0;ht<(E==="trackGT"?5:3);ht++){let Qe=(ht-(E==="trackGT"?2:1))*.3,St=Fe(.46,.19,.025,.008,je,-2.76,_e-ue/2-.035,Qe,O);St.rotation.z=-.12}else if(E==="trackGT"){for(let ht of[-.36,.36]){let Qe=Fe(.38,.27,.035,.012,je,2.94,_e-ue/2+.045,ht,O);Qe.rotation.z=-.32,Fe(.27,.027,.13,.008,je,3.02,_e-ue/2-.075,ht,O)}for(let ht of[-.96,.96]){let Qe=Fe(.29,.16,.025,.008,je,2.78,_e-ue/2+.01,ht,O);Qe.rotation.z=.08}}if($)for(let ht of[-1,1])for(let Qe=0;Qe<(E==="sport"?2:1);Qe++){let St=ht*(.78+Qe*.15),zt=m(new Je(.067,.067,.16,32,1,!0),He,-2.77,.77,St,O);zt.rotation.z=Math.PI/2;let un=m(new In(.056,24),u,-2.86,.77,St,O);un.rotation.y=-Math.PI/2}for(let ht of[-1,1]){let Qe=ht*(G/2-.055),St=fe*(2.64+se-.3);nt([[St,_e-ue/2+.065,Qe],[St-fe*.1,_e,Qe+ht*.035],[St-fe*.2,_e+ue/2-.065,Qe-ht*.015]],.043,a,O),nt([[St+fe*.025,_e-ue/2+.04,Qe-ht*.025],[St+fe*.035,_e,Qe-ht*.025],[St+fe*.025,_e+ue/2-.04,Qe-ht*.025]],.012,c,O)}}for(let M of["formula","formulaPro","formulaElite"]){let E=Od(M,{paint:a,carbon:je,metal:He,accent:c});i.add(E),Ne.frontBumper[M]=E}for(let M of["rearBumper","sideSkirts","spoiler"])for(let E of["formula","formulaPro"]){let G=new ke;G.name=M+"-"+E,i.add(G),Ne[M][E]=G;let se=E==="formulaPro";if(M==="rearBumper"){Fe(.48,.16,se?2.3:2.05,.03,je,-2.47,.45,0,G);for(let O=-3;O<=3;O++){let fe=Fe(.64,.23,.025,.01,je,-2.48,.44,O*.3,G);fe.rotation.z=-.15}for(let O of[-1,1])nt([[-2.2,.54,O*1],[-2.65,.62,O*1.1]],.025,a,G)}else if(M==="sideSkirts")for(let O of[-1,1]){let fe=Fe(2.35,se?.42:.33,.34,.08,a,-.15,.83,O*1.3,G);fe.rotation.z=-.045,Fe(2.65,.055,.48,.025,je,-.06,.58,O*1.3,G),Fe(.07,.21,.24,.035,u,.96,.87,O*1.3,G);for(let $=0;$<(se?3:1);$++)Fe(.35,.11,.025,.01,je,.48-$*.32,.65,O*1.53,G)}else{i.remove(G);let O=lh(E,{paint:a,carbon:je,metal:He});i.add(O),Ne.spoiler[E]=O}}Ne.headlights={};for(let M of["round","projector","rally","matrix"]){let E=new ke;i.add(E),Ne.headlights[M]=E;for(let G of[-1,1]){let se=G*.74,O=2.57-.28*(se/1.1)**2+.07,fe=1.075;if(M==="matrix"){let $=Fe(.4,.2,.075,.045,Ke,O,fe,se,E);$.rotation.y=Math.PI/2;let ue=Fe(.35,.15,.01,.035,u,O+.05,fe,se,E);ue.rotation.y=Math.PI/2;for(let _e=0;_e<4;_e++){let ct=Fe(.06,.1,.012,.017,Zt,O+.065,fe,se-.128+_e*.085,E);ct.rotation.y=Math.PI/2,ct.castShadow=!1}}else{let $=M==="rally"?.16:M==="round"?.14:.135,ue=m(new Je($+.027,$+.02,.095,48),Ke,O,fe,se,E);ue.rotation.z=Math.PI/2;let _e=m(new Ut($+.008,.01,10,48),He,O+.054,fe,se,E);_e.rotation.y=Math.PI/2;let ct=m(new Ft(1,32,20),M==="round"||M==="rally"?It:Zt,O+.055,fe,se,E);if(ct.scale.set(.025,$,$),ct.castShadow=!1,M==="projector"){let yt=m(new Ut($*.8,.008,8,48),Zt,O+.076,fe,se,E);yt.rotation.y=Math.PI/2,m(new Ft(1,24,16),bt,O+.081,fe,se,E).scale.set(.022,$*.53,$*.53)}if(M==="rally")for(let yt of[-.07,0,.07]){let st=Math.sqrt($*$-yt*yt);nt([[O+.09,fe-st,se+yt],[O+.1,fe,se+yt],[O+.09,fe+st,se+yt]],.009,Ke,E)}}}}for(let[M,E]of Object.entries(n.streetHeadlights)){let G=new ke;i.add(G),Ne.headlights[M]=G;let se=s(E.color,.12,.22);se.emissive.set(E.color),se.emissiveIntensity=E.smoke?.35:1.1;let O=s(E.smoke?"#1c3348":"#83b6d5",.45,.12);for(let fe of[-1,1]){let $=fe*.72,ue=2.57-.28*($/1.1)**2+.07,_e=1.075;if(E.shape==="sportHousing"){let st=new Wt;st.moveTo(-.29,.12),st.lineTo(.23,.09),st.quadraticCurveTo(.32,.02,.26,-.13),st.lineTo(-.25,-.14),st.closePath();let ne=m(new Vt(st,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),Ke,ue+.02,_e,$,G);ne.rotation.y=Math.PI/2;for(let Me=0;Me<2;Me++){let Ve=$+(Me-.5)*.24;if(m(new Ft(1,24,16),O,ue+.13,_e,Ve,G).scale.set(.022,.067,.067),E.signature==="rings"){let it=m(new Ut(.086,.01,10,48),se,ue+.155,_e,Ve,G);it.rotation.y=Math.PI/2}if(E.signature==="doubleL"&&nt([[ue+.155,_e+.075,Ve-.085],[ue+.155,_e-.075,Ve-.085],[ue+.155,_e-.075,Ve+.075]],.012,se,G),E.signature==="pixels")for(let it=0;it<3;it++)m(new et(.014,.026,.026),se,ue+.155,_e+.09,Ve-.055+it*.055,G)}E.signature==="arc"&&nt([[ue+.155,_e-.09,$-.25],[ue+.155,_e+.1,$-.25],[ue+.155,_e+.12,$],[ue+.155,_e+.07,$+.25]],.012,se,G);continue}let ct=Fe(.47,.25,.1,.04,Ke,ue,_e,$,G);ct.rotation.y=Math.PI/2;for(let st of[-.18,.18]){m(new et(.1,.07,.035),He,ue-.035,_e-.15,$+st,G);let ne=m(new Je(.012,.012,.018,12),c,ue+.02,_e-.13,$+st,G);ne.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(E.shape)){let st=E.shape==="doubleU"?2:1;for(let ne=0;ne<st;ne++){let Me=$+(ne-(st-1)/2)*.21;if(m(new Ft(1,24,16),O,ue+.073,_e,Me,G).scale.set(.019,.067,.067),E.shape==="doubleU")nt([[ue+.1,_e+.075,Me-.08],[ue+.1,_e-.04,Me-.08],[ue+.1,_e-.08,Me-.045],[ue+.1,_e-.08,Me+.045],[ue+.1,_e-.04,Me+.08],[ue+.1,_e+.075,Me+.08]],.01,se,G);else if(E.shape==="brow"){nt([[ue+.1,_e+.055,Me-.19],[ue+.1,_e+.093,Me-.14],[ue+.1,_e+.093,Me+.19]],.011,se,G);let tt=m(new Ut(.068,.006,8,32),se,ue+.095,_e-.015,Me,G);tt.rotation.y=Math.PI/2}else for(let tt=0;tt<3;tt++){let it=tt*Math.PI*2/3-Math.PI/2;nt([[ue+.102,_e+Math.sin(it)*.025,Me+Math.cos(it)*.025],[ue+.102,_e+Math.sin(it)*.1,Me+Math.cos(it)*.1]],.011,se,G)}}continue}if(E.shape==="bar"){for(let[st,ne,Me]of[[.035,.41,.025],[-.045,.33,.012]]){let Ve=Fe(ne,Me,.014,.006,se,ue+.064,_e+st,$,G);Ve.rotation.y=Math.PI/2,Ve.castShadow=!1}continue}if(E.shape==="square"){let st=Fe(.37,.17,.024,.015,se,ue+.065,_e,$,G);st.rotation.y=Math.PI/2;for(let ne=0;ne<7;ne++)m(new et(.006,.16,.004),O,ue+.082,_e,$-.15+ne*.05,G);continue}let yt=E.count===3?.062:E.count===2?.087:.106;for(let st=0;st<E.count;st++){let ne=$+(st-(E.count-1)/2)*(E.count===3?.14:.205),Me=m(new Je(yt+.014,yt+.02,.09,E.shape==="hex"?6:40),u,ue+.035,_e,ne,G);Me.rotation.z=Math.PI/2;let Ve=m(new Ut(yt,.009,8,E.shape==="hex"?6:48),se,ue+.09,_e,ne,G);Ve.rotation.y=Math.PI/2,Ve.castShadow=!1;let tt=m(new Ft(1,24,16),E.projector?O:se,ue+.077,_e,ne,G);if(tt.scale.set(.018,yt*.74,yt*.74),tt.castShadow=!1,E.projector&&m(new Ft(1,16,12),se,ue+.092,_e,ne,G).scale.set(.006,yt*.31,yt*.31),E.cross||E.guard)for(let it of[-1,1])nt([[ue+.11,_e-yt*.74,ne-it*yt*.74],[ue+.115,_e,ne],[ue+.11,_e+yt*.74,ne+it*yt*.74]],.009,Ke,G)}}}let an={};for(let M of["club","sport","rally","chrome","aero"]){let E=[];an[M]=E;for(let{wheelGroup:G,sign:se}of X){let O=new ke;G.add(O),E.push(O);let fe=M==="aero"?.94:M==="rally"?1.02:M==="chrome"?.85:.88,$=M==="aero"||M==="rally"?.9:M==="sport"?.48:M==="chrome"?.38:.62,ue=M==="aero"?1.65:M==="rally"?1.4:M==="sport"?.66:M==="chrome"?1.03:1.2,_e=[],ct=[];for(let Me=0;Me<=48;Me++){let Ve=-ue+Me*ue*2/48;for(let tt of[-$/2,$/2])_e.push(Math.sin(Ve)*fe,Math.cos(Ve)*fe,tt)}for(let Me=0;Me<48;Me++){let Ve=Me*2;ct.push(Ve,Ve+1,Ve+2,Ve+1,Ve+3,Ve+2)}let yt=new ut;yt.setAttribute("position",new Ie(_e,3)),yt.setIndex(ct),yt.computeVertexNormals();let ne=(M==="chrome"?He:M==="club"?a:je).clone();ne.side=Ot,m(yt,ne,0,0,0,O);for(let Me of[-1,1]){let Ve=Array.from({length:49},(tt,it)=>{let Dt=-ue+it*ue*2/48;return[Math.sin(Dt)*fe,Math.cos(Dt)*fe,Me*$/2]});nt(Ve,.012,M==="aero"?c:M==="chrome"?He:Ke,O)}for(let Me of[-1,1])nt([[0,0,-se*.28],[Me*.28,.42,-se*.31],[Me*.49,.68,-se*.31]],.022,Ke,O),sn(Me*.49,.68,-se*.32,O);if(M==="rally"){Fe(.12,.52,$,.025,Ke,-.97,.12,0,O);for(let Me of[-1,1])for(let Ve of[-$/2,$/2])sn(Me*.64,.76,Ve,O)}if(M==="sport")for(let Me of[-$/2,$/2])nt([[-.5,.73,Me],[0,.9,Me],[.5,.73,Me]],.018,c,O);if(M==="aero"){for(let Me of[-1,1]){let Ve=new Wt;Ve.moveTo(-.91,.1),Ve.quadraticCurveTo(-.97,.94,0,.98),Ve.quadraticCurveTo(.97,.94,.91,.1),Ve.lineTo(.7,.1),Ve.quadraticCurveTo(.66,.72,0,.75),Ve.quadraticCurveTo(-.66,.72,-.7,.1),Ve.closePath(),m(new Vt(Ve,{depth:.025,bevelEnabled:!1}),je,0,0,Me*$/2,O)}for(let Me=0;Me<4;Me++)Fe(.045,.025,$*.65,.006,u,-.28+Me*.18,.948,0,O)}O.userData.shell=ne}}Ne.windshield={};for(let[M,E,G,se]of[["deflector",.42,"#b6e3eb",.18],["sport",.82,"#a9d5e7",.23],["touring",1.08,"#c1e3ed",.17],["smoke",.96,"#455f7a",.4],["iridium",1.08,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let fe=function(tt,it){let Dt=["touring","grandTour"].includes(M),Xt=["sport","iridium"].includes(M),ht=(Dt?1.1:M==="deflector"?.78:Xt?.88:.94)*(1-(Xt?.28:Dt?.04:.13)*it),Qe=1-tt*tt;return[1.32+(Dt?.34:.23)*Qe-E*(Xt?.48:.32)*it,1.5+E*it*(Xt?.72+.28*Qe:.84+.16*Qe),tt*ht]},O=new ke;i.add(O),Ne.windshield[M]=O;let $=[],ue=[],_e=40,ct=16;for(let tt=0;tt<=ct;tt++)for(let it=0;it<=_e;it++)$.push(...fe(-1+it*2/_e,tt/ct));for(let tt=0;tt<ct;tt++)for(let it=0;it<_e;it++){let Dt=tt*(_e+1)+it;ue.push(Dt,Dt+1,Dt+_e+1,Dt+1,Dt+_e+2,Dt+_e+1)}let yt=new ut;yt.setAttribute("position",new Ie($,3)),yt.setIndex(ue),yt.computeVertexNormals();let st=new _n({color:G,metalness:.05,roughness:.075,transparent:!0,opacity:se,depthWrite:!1,side:Ot,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});O.userData.glass=st,O.userData.originalTint={color:G,opacity:se};let ne=m(yt,st,0,0,0,O);ne.castShadow=!1,ne.receiveShadow=!1,ne.renderOrder=3;let Me=["smoke","highSmoke"].includes(M)?Ke:He;nt(Array.from({length:41},(tt,it)=>{let Dt=fe(-1+it/20,0);return Dt[1]-=.04,Dt}),.045,Ke,O);for(let tt of[0,1])nt(Array.from({length:41},(it,Dt)=>fe(-1+Dt/20,tt)),tt===0?.017:.009,Me,O);for(let tt of[-1,1]){nt(Array.from({length:17},(Xt,ht)=>fe(tt,ht/16)),.011,Me,O);let it=fe(tt,0);Fe(.26,.12,.23,.025,Ke,it[0],it[1]-.06,it[2],O),nt([[.99,1.44,tt*1.12],[1.18,1.44,tt*1.02],it],.032,Me,O);let Dt=m(new Je(.013,.013,.018,6),He,it[0]+.04,it[1]+.014,it[2],O)}let Ve=new Pn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let tt of[-.77,-.69]){let it=Array.from({length:13},(Xt,ht)=>{let Qe=fe(tt,.18+ht*.058);return Qe[0]+=.004,Qe}),Dt=nt(it,.003,Ve,O);Dt.castShadow=!1,Dt.receiveShadow=!1,Dt.renderOrder=4}}for(let M of Object.values(Ne.windshield))M.userData.mountRearX=Ur([M],M).min.x;let en=new ke;for(let M of i.children.slice())M.userData.groundWheel||en.add(M);i.add(en);let Rt=s("#b8c7d6",.72,.27),Mt=new ke,Hn=[];i.add(Mt);for(let M of[-1.72,1.72])for(let E of[-1,1]){let G=new ke;G.position.set(M,.52,E*1.12),Mt.add(G);let se=Array.from({length:193},(st,ne)=>{let Me=ne/192,Ve=Me*Math.PI*14;return new w(Math.cos(Ve)*.071,.055+Me*.36,Math.sin(Ve)*.071)}),O=m(new wt(new At(se),192,.014,10,!1),Rt,0,0,0,G);m(new Je(.039,.039,.23,24),Ke,0,.14,0,G);let fe=m(new Je(.018,.018,.28,20),He,0,.34,0,G),$=new ke;$.position.y=.47,G.add($);for(let[st,ne]of[[G,.04],[$,-.015]])m(new Je(.095,.095,.026,32),He,0,ne,0,st),m(new Je(.068,.068,.018,24),Ke,0,ne+.02,0,st);m(new et(.14,.075,.18),Ke,0,.025,E*.035,G),m(new et(.16,.075,.22),Ke,0,0,-E*.075,$);let ue=new w(M,.56,E*1.12),_e=new w(M,.81,E*1.43),ct=_e.clone().sub(ue);m(new Je(.026,.026,ct.length(),16),Ke,...ue.clone().add(_e).multiplyScalar(.5).toArray(),Mt).quaternion.setFromUnitVectors(new w(0,1,0),ct.normalize()),Hn.push({coil:O,rod:fe,upper:$})}Ne.brakes={};for(let M of["stock","red","gold","ceramic"]){let E=new ke;i.add(E),Ne.brakes[M]=E;for(let{wheelGroup:G,sign:se}of X){let O=oh(M);O.position.z=se*.165,se<0&&(O.rotation.y=Math.PI),G.add(O),E.userData.brakeAssemblies??=[],E.userData.brakeAssemblies.push(O)}}Ne.nitrous={};let Xi=document.createElement("canvas");Xi.width=512,Xi.height=256;let mn=Xi.getContext("2d");mn.fillStyle="#101923",mn.fillRect(0,0,512,256),mn.strokeStyle="#e8e1cc",mn.lineWidth=8,mn.strokeRect(10,10,492,236),mn.fillStyle="#f5f2e8",mn.textAlign="center",mn.font="italic bold 106px Arial",mn.fillText("N\u2082O",256,117),mn.font="bold 24px Arial",mn.fillText("NITROUS OXIDE",256,159),mn.fillStyle="#d9b36b",mn.font="bold 18px Arial",mn.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)mn.fillRect(165+M*4,212,M%3+1,17);let ii=new Gt(Xi);ii.colorSpace=xt,ii.anisotropy=8;let kn=document.createElement("canvas");kn.width=kn.height=128;let Jt=kn.getContext("2d");Jt.fillStyle="#eee9dc",Jt.fillRect(0,0,128,128),Jt.translate(64,64),Jt.strokeStyle="#17202a";for(let M=0;M<=20;M++){let E=-Math.PI*.8+M*Math.PI*1.6/20;Jt.lineWidth=M%5?2:4,Jt.beginPath(),Jt.moveTo(Math.sin(E)*43,-Math.cos(E)*43),Jt.lineTo(Math.sin(E)*(M%5?49:53),-Math.cos(E)*(M%5?49:53)),Jt.stroke()}Jt.fillStyle="#293541",Jt.textAlign="center",Jt.font="bold 14px Arial",Jt.fillText("PSI",0,30),Jt.strokeStyle="#c92737",Jt.lineWidth=4,Jt.beginPath(),Jt.moveTo(-9,12),Jt.lineTo(26,-31),Jt.stroke(),Jt.fillStyle="#25313a",Jt.beginPath(),Jt.arc(0,0,6,0,Math.PI*2),Jt.fill();let ri=new Gt(kn);ri.colorSpace=xt;for(let M of["blue","twin","triple"]){let E=new ke;E.name="nitrous-"+M,i.add(E),Ne.nitrous[M]=E;let G=s(n.item("nitrous",M).color,.65,.27),se=M==="triple"?3:M==="twin"?2:1,O=1.49,fe=-1.3,$=.37,ue=s("#b4924f",.8,.3),_e=s("#a5b2bd",.85,.24),ct=s("#1b2028",.08,.85),yt=s("#ab2635",.35,.4);for(let st of[-1.52,-1.13]){Fe(.095,.05,se*$+.04,.015,u,st,1.29,0,E);for(let ne of[-1,1]){let Me=ne*(se*$/2-.02);m(new Je(.024,.024,.023,6),_e,st,1.327,Me,E)}}for(let st=0;st<se;st++){let ne=(st-(se-1)/2)*$,Me=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([$t,bn])=>new we($t,bn)),Ve=m(new vi(Me,40),G,fe,O,ne,E);Ve.rotation.z=-Math.PI/2;for(let $t of[-1.52,-1.13]){Fe(.11,.095,.27,.025,ct,$t,1.35,ne,E);let bn=m(new Ut(.152,.013,8,40),_e,$t,O,ne,E);bn.rotation.y=Math.PI/2,Fe(.08,.025,.055,.008,_e,$t,O+.155,ne,E),m(new Je(.013,.013,.018,6),u,$t,O+.179,ne,E)}let tt=[],it=[],Dt=[];for(let $t=0;$t<2;$t++)for(let bn=0;bn<=16;bn++){let ui=-.91+bn*1.82/16;if(tt.push(fe+($t?.12:-.12),O+Math.cos(ui)*.147,ne+Math.sin(ui)*.147),it.push($t,bn/16),$t&&bn){let di=17+bn;Dt.push(di-18,di-17,di,di-18,di,di-1)}}let Xt=new ut;Xt.setAttribute("position",new Ie(tt,3)),Xt.setAttribute("uv",new Ie(it,2)),Xt.setIndex(Dt),Xt.computeVertexNormals();let ht=new _n({map:ii,roughness:.55,metalness:.05,side:Ot});m(Xt,ht,0,0,0,E);let Qe=m(new Je(.046,.046,.055,24),ue,-.89,O,ne,E);Qe.rotation.z=Math.PI/2,Fe(.075,.07,.065,.012,ue,-.845,O,ne,E),m(new Je(.016,.016,.065,16),_e,-.845,O+.045,ne,E);let St=m(new Ut(.052,.012,8,24),yt,-.845,O+.092,ne,E);St.rotation.x=Math.PI/2;for(let $t of[0,Math.PI/3,Math.PI*2/3]){let bn=Fe(.106,.014,.014,.004,yt,-.845,O+.092,ne,E);bn.rotation.y=$t}let zt=new ke;zt.position.set(-.84,O+.065,ne+.075),zt.rotation.x=-Math.PI*.32,E.add(zt);let un=m(new Je(.057,.057,.03,32),_e,0,0,0,zt);un.rotation.x=Math.PI/2;let fn=m(new In(.047,32),new Pn({map:ri}),0,0,.017,zt),rn=m(new Je(.024,.024,.055,6),ue,-.79,O,ne,E);rn.rotation.z=Math.PI/2,nt([[-.76,O,ne],[-.7,O-.02,ne],[-.71,1.3,ne],[-.91,1.24,ne]],.014,ct,E);let hi=m(new Je(.021,.021,.055,12),_e,-.74,O,ne,E);hi.rotation.z=Math.PI/2}Fe(.07,.07,se*$,.015,ue,-.91,1.24,0,E),nt([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,ct,E)}Ne.pedals={};for(let M of["classic","aluminium","formula"]){let E=zd(M);i.add(E),Ne.pedals[M]=E}Ne.seat={};for(let M of["red","carbon","emerald","ivory"]){let E=hh(M);E.rotation.y=Math.PI/2,E.position.set(-.8,1,0),i.add(E),Ne.seat[M]=E}let Ms=Fd(T),si=Ed({paint:a,carbon:je,metal:He});i.add(si.group);function ya(M){for(let{plate:ne,sign:Me}of Be){let Ve=M[Me>0?"frontBumper":"rearBumper"],tt={streetLow:.12,driftWide:.16,trackGT:.22,sport:.18}[Ve];ne.position.x=Me*(tt===void 0?["club","rally"].includes(Ve)?2.72:2.605:2.64+tt+.055),ne.scale.setScalar(tt===void 0?1:.72),ne.position.y=tt===void 0?1.01:1.3}let E=["formula","formulaPro","formulaElite"].includes(M.frontBumper);Ms.set(E),B.forEach(ne=>ne.visible=!E),si.group.visible=E||M.turbine==="formula",si.engine.visible=M.turbine==="formula",ee(M);let G=n.glassTints[M.glassTint]||n.glassTints.original;for(let ne of Object.values(Ne.windshield)){let Me=ne.userData.originalTint;ne.userData.glass.color.set(G.opacity===null?Me.color:G.color),ne.userData.glass.opacity=G.opacity??Me.opacity,ne.userData.glass.iridescence=M.glassTint==="violet"?1:0,ne.userData.glass.iridescenceIOR=1.35,ne.userData.glass.iridescenceThicknessRange=[180,420],ne.userData.glass.roughness=M.glassTint==="black"?.2:.075}let se=(n.wheelDiameters[M.wheelSize]||16)/16,O=(se-1)*(.715/.86),fe={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:ne,sign:Me,tyres:Ve}of X){ne.scale.set(.88/1.24*se,.88/.86*se,fe/.95),ne.position.y=.715/.86*se,ne.position.z=Me*(1.36+.25*(fe-1));for(let[tt,it]of Object.entries(Ve))for(let Dt of it)Dt.visible=tt===(M.tyres||"standard")}let $=O+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[ne,Me]of Object.entries(Ne))if(ne!=="brakes")for(let Ve of Object.values(Me))Ve.parent===i&&(Ve.userData.mountBaseY??=Ve.position.y,Ve.position.y=Ve.userData.mountBaseY+$);Mn.forEach(ne=>ne.visible=!M.headlights||M.headlights==="classic");for(let[ne,Me]of Object.entries(an))for(let Ve of Me)Ve.visible=M.fenders===ne,ne==="club"&&Ve.userData.shell.color.set(n.item("paint",M.paint).color);Rt.color.set(n.item("suspension",M.suspension).color),en.position.y=$,si.group.position.y=$-(["formula","aeroPrototype"].includes(M.chassis)?.18:0),Mt.visible=$>0,Hn.forEach(({coil:ne,rod:Me,upper:Ve})=>{ne.scale.y=1+$/.415,Me.scale.y=1+$/.28,Me.position.y=.34+$/2,Ve.position.y=.47+$});for(let[ne,Me]of Object.entries(Ne))for(let[Ve,tt]of Object.entries(Me))tt.visible=(ne==="pedals"?M.pedals||"classic":M[ne])===Ve;E&&Object.values(Ne.headlights).forEach(ne=>ne.visible=!1);for(let[ne,Me]of Object.entries(Ne.brakes))for(let Ve of Me.userData.brakeAssemblies||[])Ve.visible=(M.brakes||"stock")===ne;Object.entries(re).forEach(([ne,Me])=>Me.visible=ne===(M.steering||"classic")),Object.entries(Kt).forEach(([ne,Me])=>Me.visible=ne===(M.exhaust||"classic")),kt.visible=M.turbine==="boost",vt.visible=M.turbine!=="formula";let ue=["twin","twinBig"].includes(M.turbine),_e=M.turbine==="twinBig",ct=_e?.9:ue?.52:M.turbine==="boost"?.96:.9;vt.scale.set(ct/1.24,ct/.86,ct/.95),vt.position.set(ot,Ye+(_e?.06:ue?-.2:-.04),ue?_e?-.7:-.44:0),_t.visible=ue,_t.scale.copy(vt.scale),_t.position.set(ot,Ye+(_e?.06:-.2),_e?.7:.44);let yt=Ur(M.turbine==="formula"?[si.engine]:[vt,_t],en);for(let ne of Object.values(Ne.spoiler))ne.userData.fitTurbines(yt);let st=M.badges||[];if(S.forEach(ne=>ne.visible=!st.length&&(!M.vinyl||M.vinyl==="none")),ae.forEach(ne=>ne.userData.plane.visible=!st.length&&(!M.vinyl||M.vinyl==="none")),le.forEach(({group:ne,mat:Me,back:Ve,n:tt})=>{let it=st[tt];ne.position.x=(tt-(st.length-1)/2)*.82+.05,ne.visible=!!it;let Dt=it+":"+(M.prizeTotal||0);if(!it||Me.userData.badge===Dt)return;let Xt=new Wt,ht=.65/512,Qe=(St,zt)=>[(St-256)*ht,(256-zt)*ht];if(it==="millionaire"||it==="day-hero")Xt.absarc(0,0,204*ht,0,Math.PI*2,!1);else if(it==="rating-top10"){for(let St=0;St<6;St++){let zt=St*Math.PI/3-Math.PI/2,un=Qe(256+Math.cos(zt)*215,256+Math.sin(zt)*215);St?Xt.lineTo(...un):Xt.moveTo(...un)}Xt.closePath()}else Xt.moveTo(...Qe(80,88)),Xt.quadraticCurveTo(...Qe(256,0),...Qe(432,88)),Xt.lineTo(...Qe(420,296)),Xt.quadraticCurveTo(...Qe(390,400),...Qe(256,465)),Xt.quadraticCurveTo(...Qe(122,400),...Qe(92,296)),Xt.closePath();Ve.geometry.dispose(),Ve.geometry=new Vt(Xt,{depth:.035,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.014,bevelThickness:.012,curveSegments:24}),Me.map?.dispose(),Me.map=new Gt(n.badgeCanvas(it,M)),Me.map.colorSpace=xt,Me.map.anisotropy=16,Me.emissive.set("#ffffff"),Me.emissiveMap=Me.map,Me.emissiveIntensity=.35,Me.userData.badge=Dt,Me.needsUpdate=!0}),a.color.set(n.item("paint",M.paint).color),o.color.copy(a.color).multiplyScalar(.45),h.color.set(n.wheelPaintColor(M)),V!==M.wheels){for(let ne of A)ne.removeFromParent(),ne.geometry.dispose();A.length=0;for(let{wheelGroup:ne,sign:Me}of X)for(let Ve of[1,-1])for(let tt of n.wheelDesign(M.wheels)){let it={bronzeSix:.029,deepFive:.048,muscleFive:.06,triBlade:.105,turbofan:.037,fiveSpoke:.049,legend:.034,splitY:.024,concaveTen:.026,rallyMulti:.02,crossMesh:.014,copper:.015,splitStar:.022,splitSix:.025,forged:.025}[M.wheels]||.02,Dt=[],Xt=[];tt.forEach(([zt,un],fn)=>{let rn=tt[Math.max(0,fn-1)],hi=tt[Math.min(tt.length-1,fn+1)],$t=hi[0]-rn[0],bn=hi[1]-rn[1],ui=Math.hypot($t,bn)||1,di=it*(.65+.35*fn/(tt.length-1));Dt.push([zt-bn/ui*di,un+$t/ui*di]),Xt.push([zt+bn/ui*di,un-$t/ui*di])});let ht=new Wt;[...Dt,...Xt.reverse()].forEach(([zt,un],fn)=>fn?ht.lineTo(zt,un):ht.moveTo(zt,un)),ht.closePath();let Qe=new Vt(ht,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),St=Qe.attributes.position;for(let zt=0;zt<St.count;zt++){let un=Math.hypot(St.getX(zt),St.getY(zt)),fn=(M.wheels==="deepFive"?.095:M.wheels==="concaveTen"?.075:.025)*(1-Math.min(1,un/.51));St.setZ(zt,Me*Ve*((Ve===1?.255:.235)-fn+St.getZ(zt)))}St.needsUpdate=!0,Qe.computeVertexNormals(),A.push(m(Qe,h,0,0,0,ne))}V=M.wheels}c.color.set(n.item("trim",M.trim).color),c.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,c.metalness=.95,d.userData.style!==M.upholstery&&(d.map?.dispose(),d.map=new Gt(n.upholsteryCanvas(M.upholstery)),d.map.colorSpace=xt,d.map.wrapS=d.map.wrapT=Rn,d.map.repeat.set(12,2),d.color.set("#ffffff"),d.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,d.userData.style=M.upholstery,d.needsUpdate=!0),n.chipPalette(M.chips).forEach((ne,Me)=>{Xe[Me].color.set(ne),Xe[Me].roughness=M.chips==="ceramic"?.25:.55}),at.color.set(n.chipEdgeColor(M.chips)),We.forEach(ne=>{ne.visible=!0,ne.material.color.set(M.chips==="tournament"?["#c6414f","#e1bc3e","#5b9c69","#4c73c5"][ne.userData.edgeIndex%4]:n.chipEdgeColor(M.chips))}),De.forEach(({mat:ne,n:Me})=>{ne.userData.style!==M.chips&&(ne.map?.dispose(),ne.map=new Gt(n.chipCanvas(M.chips,Me)),ne.map.colorSpace=xt,ne.map.anisotropy=8,ne.userData.style=M.chips,ne.needsUpdate=!0)}),xe.forEach((ne,Me)=>{ne.userData.style!==M.cards&&(ne.map?.dispose(),ne.map=new Gt(n.cardCanvas(M.cards,Me)),ne.map.colorSpace=xt,ne.map.anisotropy=16,ne.userData.style=M.cards,ne.needsUpdate=!0)}),A.forEach(ne=>ne.visible=!0),P.forEach(ne=>ne.visible=!0),f.color.set(n.item("light",M.light).color),f.emissive.copy(f.color),g.color.copy(f.color).multiplyScalar(.075),g.emissive.copy(f.color),g.emissiveIntensity=.045,ge.userData.number!==M.number+M.region&&(ge.map?.dispose(),ge.map=new Gt(n.plateCanvas(M)),ge.userData.number=M.number+M.region,ge.needsUpdate=!0)}let Nr=new Et({color:f.color.clone(),emissive:f.color.clone(),emissiveIntensity:.65,roughness:.5}),ji=new ke;en.add(ji);for(let M of[-1,1]){Fe(2.62,.09,.12,.025,u,-.03,.47,M*.76,ji);let E=m(new et(2.48,.018,.075),Nr,-.03,.417,M*.76,ji);for(let G of[-1.13,1.06])Fe(.12,.16,.18,.018,u,G,.53,M*.76,ji)}let Lt=new la(f.color,.45,2,2);Lt.position.set(-1.9,2,.48),en.add(Lt);let Wn=new ke;i.add(Wn);let An=s("#161d22",.34,.56),Ii=s("#917252",.05,.86),cr=new Wt;[[-2.55,-.72],[-1.55,-1.03],[.25,-1.1],[.8,-.67],[1.42,-.24],[2.38,-.17],[2.38,.17],[1.42,.24],[.8,.67],[.25,1.1],[-1.55,1.03],[-2.55,.72]].forEach(([M,E],G)=>G?cr.lineTo(M,E):cr.moveTo(M,E)),cr.closePath();let Ts=m(new Vt(cr,{depth:.055,bevelEnabled:!0,bevelThickness:.008,bevelSize:.012,bevelSegments:2}),An,0,.48,0,Wn);Ts.rotation.x=Math.PI/2,Fe(3.85,.035,.24,.025,Ii,-.08,.395,0,Wn);for(let M of[-1.65,-.8,.15,1.2])for(let E of[-.075,.075]){let G=m(new Je(.018,.018,.008,12),He,M,.373,E,Wn)}for(let M of[-1,1]){nt([[-1.85,.4,M*.68],[-.8,.38,M*.79],[.3,.4,M*.82],[.8,.44,M*.51]],.025,An,Wn),nt([[-1.85,.4,M*.33],[-.8,.37,M*.37],[.3,.4,M*.39],[.8,.44,M*.27]],.022,An,Wn);for(let E=0;E<3;E++){let G=Fe(.32,.11,.022,.008,An,.25+E*.19,.44,M*(.98-E*.1),Wn);G.rotation.y=M*-.24}}let nn=new Wt;nn.moveTo(-2.65,.78),nn.lineTo(-1.65,.44),nn.lineTo(-1.65,.36),nn.lineTo(-2.65,.53),nn.closePath();for(let M=-3;M<=3;M++)m(new Vt(nn,{depth:.022,bevelEnabled:!1}),An,0,0,M*.205,Wn);let xi=m(new et(1.04,.035,1.4),An,-2.15,.6,0,Wn);xi.rotation.z=-.32;let Dn=new ke;i.add(Dn);for(let M of[-1,1]){Fe(2.8,.4,.42,.12,a,-.16,.91,M*1.17,Dn),Fe(2.95,.075,.55,.035,je,-.12,.65,M*1.17,Dn),nt([[-1.55,1.14,M*1.28],[-.2,1.17,M*1.35],[1.15,1.1,M*1.13]],.055,c,Dn),Fe(.1,.24,.27,.035,u,1.16,.94,M*1.18,Dn);for(let E=0;E<3;E++)Fe(.025,.19,.29,.008,c,.82-E*.16,1.1,M*1.39,Dn);nt([[1.87,.65,M*.84],[2.18,.78,M*.74],[2.25,.84,0]],.06,c,Dn),Fe(.09,.48,.08,.025,He,-1.95,1.08,M*.67,Dn)}Fe(.48,.08,1.98,.035,je,-1.96,1.35,0,Dn),nt([[-2.17,1.4,-.97],[-2.17,1.4,.97]],.025,c,Dn);let cn=new ke;i.add(cn);let Xn=s("#e9bd68",.72,.25);for(let M of[-1,1]){m(new Ft(1,32,20),je,-.55,1.01,M*.88,cn).scale.set(1.15,.28,.34);let G=Fe(.12,.32,.45,.07,u,.42,1.04,M*.89,cn);for(let se=0;se<5;se++)Fe(.23,.025,.35,.01,Ke,-.4-se*.16,1.27,M*.88,cn);nt([[-1.62,.72,M*.95],[-.8,.69,M*1.22],[.35,.72,M*1.12],[.65,.79,M*.89]],.025,Xn,cn);for(let se=0;se<3;se++){let O=Fe(.55,.035,.35,.02,je,1.58+se*.17,.55+se*.12,M*(.82+se*.12),cn);O.rotation.z=-.2}}let Tn=new Wt;Tn.moveTo(-1.9,1.2),Tn.lineTo(-1.6,1.92),Tn.lineTo(-.82,1.6),Tn.lineTo(-.6,1.23),Tn.closePath();let _a=m(new Vt(Tn,{depth:.045,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1}),je,0,0,-.022,cn);nt([[-1.9,1.2,0],[-1.6,1.92,0],[-.82,1.6,0]],.018,Xn,cn);let Fr=s("#597480",.35,.13);Fr.transparent=!0,Fr.opacity=.42,Fr.side=Ot,m(new Ft(1,48,24,0,Math.PI*2,0,Math.PI/2),Fr,-.3,1.42,0,cn).scale.set(1.25,.52,.46);for(let M of[-1,1])nt([[-1.48,1.43,M*.12],[-1,1.68,M*.39],[-.25,1.94,M*.33],[.6,1.64,M*.28],[.93,1.43,M*.12]],.025,je,cn);let Wd=wd(i,[Wn,...Object.values(Ne.windshield),...Object.values(Ne.mirrors),...le.map(M=>M.group),ji,...Object.values(Ne.pedals),cn,Tt,vt,_t,Mt,...Object.values(Ne.seat)]),Xd=ya;function dh(M){Xd(M),Dn.visible=M.chassis==="club",Dn.position.y=en.position.y,cn.visible=M.chassis==="aeroPrototype",cn.position.y=en.position.y;let E=["formula","aeroPrototype"].includes(M.chassis),G=E?1.13:1;Wd.set(E);let se=Ur([Tt],i);for(let O of Object.values(Ne.windshield))O.scale.z=E?.72:1,O.position.x=Sd(se.max.x,O.userData.mountRearX),O.position.y=E?-.135:0;for(let{group:O,sign:fe}of $e)O.position.z=E?fe*1.19*(nl(.64)-1):0,O.position.y=E?-.122:0;Z.visible=!E,Wn.visible=E,Wn.position.y=en.position.y;for(let{group:O}of le)O.position.z=O.userData.side*(E?1.365*nl(O.position.x)+.045:M.chassis==="club"?1.44:1.39);ji.scale.z=E?.65:1,Nr.color.copy(f.color),Nr.emissive.copy(f.color);for(let O of[...Ct,...Pe])O.visible=!E;for(let O of Object.values(Ne.pedals))O.position.x=E?-.65:0,O.position.y=en.position.y-.06;i.scale.x=1.24*G;for(let{wheelGroup:O}of X)O.scale.x/=G;Lt.color.copy(f.color)}return dh(e),{car:i,update:dh,measureClearance(){let M=Ur([Tt],i),E=Object.values(Ne.windshield).find(G=>G.visible);return E?Ur([E],i).min.x-M.max.x:null}}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Jn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=xt,n.toneMapping=Zn,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=us,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new yn,s=new tn(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Vn("#c6d9ef","#44311e",1.25));for(let[ee,Te,be,Y,Ue]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let A=new zn(ee,Te);A.position.set(be,Y,Ue),A.castShadow=ee==="#fff0d0",A.shadow.bias=-2e-4,A.shadow.normalBias=.025,A.shadow.mapSize.set(2048,2048),A.shadow.camera.left=-5,A.shadow.camera.right=5,A.shadow.camera.top=5,A.shadow.camera.bottom=-5,i.add(A)}let a=new yn;a.background=new lt("#48505b");for(let[ee,Te,be,Y,Ue,A]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let P=new Ze(new et(Y,Ue,A),new Pn({color:"#ffffff"}));P.position.set(ee,Te,be),a.add(P)}let o=new ar(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(ee=>{ee.geometry?.dispose(),ee.material?.dispose()}),o.dispose();let l=new Ze(new qt(30,30),new xr({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=uh(i,e),u=new Yn({transparent:!0,depthWrite:!1,side:Ot,toneMapped:!1,uniforms:{color:{value:new lt(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=p.x*p.x+p.y*p.y;float halo=exp(-d*3.5);float core=exp(-d*11.);float a=(halo*.42+core*.20)*strength;gl_FragColor=vec4(color,a);}"}),d=new Ze(new qt(7.2,3.8),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let f=[];for(let ee of[-1.15,1.15])for(let Te of[-.68,.68]){let be=new oa(u.uniforms.color.value,3.5,3.4,Math.PI*.42,.9,1.5);be.position.set(ee,.36,Te),be.target.position.set(ee,0,Te),i.add(be,be.target),f.push(be)}let g=r.closest(".player-hall__room");t.night??=g?.dataset.theme==="midnight";function m(ee){t.night=!!ee;for(let be of i.children)be.isHemisphereLight&&(be.intensity=ee?.26:1.25),be.isDirectionalLight&&(be.userData.dayIntensity??=be.intensity,be.intensity=be.userData.dayIntensity*(ee?.13:1));i.environmentIntensity=ee?.24:1.5;let Te=t.neon??window.pokerGarageNeonBrightness?.()??1.5;u.uniforms.strength.value=(ee?2.1:.95)*Te,f.forEach(be=>{be.intensity=3.5*Te*(ee?1.6:1)})}m(t.night);let p=ee=>{g&&(t.neon=window.pokerGarageNeonBrightness?.()??1.5,m(g.dataset.theme==="midnight"))};window.addEventListener("poker-garage-lighting",p);let v=null;function y(){if(!v){v=new Sn,h.car.updateWorldMatrix(!0,!0);let P=X=>{if(X.visible){X.geometry&&(X.geometry.computeBoundingBox(),v.union(X.geometry.boundingBox.clone().applyMatrix4(X.matrixWorld)));for(let V of X.children)P(V)}};P(h.car)}let ee=v.getCenter(new w),Te=new w(Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),Math.cos(t.yaw)*Math.cos(t.pitch)),be=new w(Math.cos(t.yaw),0,-Math.sin(t.yaw)),Y=new w().crossVectors(Te,be),Ue=Math.tan(s.fov*Math.PI/360),A=0;for(let P of[v.min.x,v.max.x])for(let X of[v.min.y,v.max.y])for(let V of[v.min.z,v.max.z]){let S=new w(P,X,V).sub(ee);A=Math.max(A,Math.abs(S.dot(be))/(Ue*s.aspect)+S.dot(Te),Math.abs(S.dot(Y))/Ue+S.dot(Te))}A=Math.max(A*1.1,t.snapshotOnly?_?15:13:_?10.4:9),s.position.copy(ee).addScaledVector(Te,A),s.lookAt(ee)}let _=["formula","formulaPro","formulaElite"].includes(e.frontBumper),x=ee=>{_=["formula","formulaPro","formulaElite"].includes(ee.frontBumper),h.update(ee),v=null,u.uniforms.color.value.set(window.PokerGarage.item("light",ee.light).color),f.forEach(Te=>{Te.color.copy(u.uniforms.color.value),Te.position.y=.36+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[ee.suspension]||0)*.86})};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let T=!1,b=null,I=0,F=0,U=()=>{let ee=r.clientWidth,Te=r.clientHeight;ee&&Te&&(n.setSize(ee,Te,!1),s.aspect=ee/Te,s.updateProjectionMatrix())},z=new ResizeObserver(U);z.observe(r),U();let R=new oi(1,1,{type:sr,depthBuffer:!0});R.samples=4;let L=new yn,Z=new br(-1,1,1,-1,0,1),H=new Yn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:R.texture},stepSize:{value:new we}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),ie=new Ze(new qt(2,2),H);L.add(ie);function te(){let ee=n.getDrawingBufferSize(new we);(R.width!==ee.x||R.height!==ee.y)&&R.setSize(ee.x,ee.y),H.uniforms.stepSize.value.set(3/ee.x,3/ee.y),n.setRenderTarget(R),n.render(i,s),n.setRenderTarget(null),n.render(L,Z)}let K=ee=>{ee.button&&ee.button!==0||(t.manual=!0,b={id:ee.pointerId,x:ee.clientX,y:ee.clientY},r.setPointerCapture(ee.pointerId),ee.preventDefault())},de=ee=>{!b||b.id!==ee.pointerId||(t.yaw-=(ee.clientX-b.x)*.011,t.pitch=kd(t.pitch+(ee.clientY-b.y)*.009,-.24,1.35),b.x=ee.clientX,b.y=ee.clientY,ee.preventDefault())},Le=ee=>{b&&b.id===ee.pointerId&&(b=null,r.hasPointerCapture(ee.pointerId)&&r.releasePointerCapture(ee.pointerId))},ze=ee=>{let Te={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};Te[ee.key]&&(t.manual=!0,t.yaw+=Te[ee.key][0],t.pitch=kd(t.pitch+Te[ee.key][1],-.24,1.35),ee.preventDefault())};r.addEventListener("keydown",ze),r.addEventListener("pointerdown",K),r.addEventListener("pointermove",de),r.addEventListener("pointerup",Le),r.addEventListener("pointercancel",Le),r.addEventListener("lostpointercapture",Le);function Se(){T||(T=!0,window.removeEventListener("poker-garage-lighting",p),cancelAnimationFrame(I),z.disconnect(),r.removeEventListener("keydown",ze),r.removeEventListener("pointerdown",K),r.removeEventListener("pointermove",de),r.removeEventListener("pointerup",Le),r.removeEventListener("pointercancel",Le),r.removeEventListener("lostpointercapture",Le),Lr(i),c.dispose(),R.dispose(),H.dispose(),ie.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove())}function Ee(ee){if(T)return;if(s.zoom=(t.previewScale||1)*(t.zoom||1),s.updateProjectionMatrix(),!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Se();return}let Te=F?Math.min(.05,(ee-F)/1e3):0;F=ee,!document.hidden&&r.getBoundingClientRect().bottom>0&&(t.manual||(t.yaw+=Te*.13),y(),te(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)),I=requestAnimationFrame(Ee)}return t.snapshotOnly||(I=requestAnimationFrame(Ee)),{update:x,setNight:m,dispose:Se,state:t,measureClearance:()=>h.measureClearance(),snapshot(){y(),te();let ee=document.createElement("canvas");return ee.width=n.domElement.width,ee.height=n.domElement.height,ee.getContext("2d").drawImage(n.domElement,0,0),ee}}};function lm(r){let e=r.parameters,t=null;if(!e)return r;switch(r.type){case"SphereGeometry":t=new Ft(e.radius,Math.max(12,Math.round(e.widthSegments*.4)),Math.max(8,Math.round(e.heightSegments*.4)),e.phiStart,e.phiLength,e.thetaStart,e.thetaLength);break;case"CylinderGeometry":t=new Je(e.radiusTop,e.radiusBottom,e.height,Math.max(12,Math.round(e.radialSegments*.4)),e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength);break;case"TorusGeometry":t=new Ut(e.radius,e.tube,Math.max(6,Math.round(e.radialSegments*.4)),Math.max(20,Math.round(e.tubularSegments*.4)),e.arc);break;case"TubeGeometry":t=new wt(e.path,Math.max(12,Math.round(e.tubularSegments*.4)),e.radius,Math.max(5,Math.round(e.radialSegments*.4)),e.closed);break;case"LatheGeometry":t=new vi(e.points,Math.max(16,Math.round(e.segments*.4)),e.phiStart,e.phiLength);break}return t||r}function cm(r){return Object.assign(Object.create(Object.getPrototypeOf(r)),r,{userData:{}}).clone()}function Vd(r){let e=new yn,t=uh(e,r,{prepareGeometry:lm});e.updateMatrixWorld(!0);let n=new ke,i=new ke;i.rotation.y=-Math.PI/2,i.scale.setScalar(.72),n.add(i);let s=[],a=[],o=new Map,c=new Map,l=[];e.traverse(g=>{g.isGroup&&g.userData.groundWheel&&l.push(g)});let h=new Map(l.map(g=>{let m=new ke;return m.position.copy(g.getWorldPosition(new w)),m.userData.spinAxis="z",m.userData.spinSign=-1,i.add(m),s.push(m),g.position.x>0&&a.push(m),[g,m]}));function u(g){for(;g;){if(!g.visible)return!1;g=g.parent}return!0}function d(g){return g.isShaderMaterial?g.uuid:Object.keys(g).sort().filter(m=>!["id","uuid","name","userData","version","_listeners"].includes(m)).flatMap(m=>{let p=g[m];return p===null||["string","number","boolean"].includes(typeof p)?[[m,p]]:p?.isColor?[[m,p.getHexString()]]:p?.isTexture?[[m,p.uuid]]:p?.toArray?[[m,p.toArray()]]:[]}).map(m=>JSON.stringify(m)).join("|")}function f(g){let m=d(g);if(!c.has(m)){let p=cm(g);p.map&&(p.map=g.map.clone()),p.map&&(p.map.needsUpdate=!0,p.map.image?.addEventListener?.("vinyl-ready",()=>p.map.needsUpdate=!0,{once:!0}));for(let v of["normalMap","bumpMap","emissiveMap","roughnessMap","metalnessMap","alphaMap"])g[v]&&(p[v]=g[v].clone(),p[v].needsUpdate=!0);c.set(m,p)}return c.get(m)}e.traverse(g=>{if(!g.isMesh||!u(g))return;let m=g;for(;m&&!h.has(m);)m=m.parent;let p=m?h.get(m):i,v=(m?.uuid||"body")+":"+[].concat(g.material).map(d).join(",");if(Array.isArray(g.material)){let _=g.geometry.clone().applyMatrix4(g.matrixWorld);m&&_.translate(-p.position.x,-p.position.y,-p.position.z);let x=new Ze(_,g.material.map(f));x.castShadow=x.receiveShadow=!0,p.add(x);return}o.has(v)||o.set(v,{parent:p,material:f(g.material),parts:[]});let y=g.geometry.clone().applyMatrix4(g.matrixWorld);m&&y.translate(-p.position.x,-p.position.y,-p.position.z),o.get(v).parts.push(y)});for(let g of o.values()){let m=0;for(let I of g.parts)m+=I.attributes.position.count;let p=new Float32Array(m*3),v=new Float32Array(m*3),y=new Float32Array(m*2),_=[],x=0;for(let I of g.parts){if(p.set(I.attributes.position.array,x*3),v.set(I.attributes.normal.array,x*3),I.attributes.uv&&y.set(I.attributes.uv.array,x*2),I.index)for(let F of I.index.array)_.push(x+F);else for(let F=0;F<I.attributes.position.count;F++)_.push(x+F);x+=I.attributes.position.count,I.dispose()}let T=new ut;T.setAttribute("position",new dn(p,3)),T.setAttribute("normal",new dn(v,3)),T.setAttribute("uv",new dn(y,2)),T.setIndex(_),T.computeBoundingSphere();let b=new Ze(T,g.material);b.castShadow=b.receiveShadow=!0,g.parent.add(b)}return Lr(e),n.userData.garageLook={...r},{root:n,wheels:s,frontWheels:a,seat:{side:0,forward:-.55,height:.94,scale:.49},dispose(){Lr(n)}}}async function Hd(){let r=window.PokerGarage,e=window.pokerReadCityGarage?.(),t=window.pokerApiAuthJsonBody?.({action:"get"})||{};if(t.pwaSession||t.pwaVkSession||t.initData)try{let n=typeof window.getApiBase=="function"?window.getApiBase():location.origin,i=await fetch(n+"/api/player-hall",{method:"POST",headers:{"Content-Type":"application/json"},cache:"no-store",body:JSON.stringify(t),signal:AbortSignal.timeout(8e3)});if(!i.ok)throw Error("Garage unavailable");let s=await i.json(),a=s.hall;if(s.ok&&a?.self&&a.garage?.loadout){let o=window.pokerCaptureCityGarage?.(a);return{look:r.savedLoadout(a.garage.loadout,a.garage.stats||{}),source:"saved",hall:{items:a.items,shelves:a.shelves,featured:a.featured},owner:a.accountId,returnUrl:e?.returnUrl||o?.returnUrl}}throw Error("Own garage not available")}catch{if(!e){let i=Error("Saved garage unavailable");throw i.userMessage="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u0430\u0448\u0443 \u043C\u0430\u0448\u0438\u043D\u043A\u0443. \u041F\u0440\u043E\u0432\u0435\u0440\u044C \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443 \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0433\u0430\u0440\u0430\u0436 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0451\u043D.",i}}return e?{look:r.savedLoadout(e.loadout,e.stats),source:"villa",hall:e.hall,owner:e.accountId,returnUrl:e.returnUrl}:{look:{...r.defaults},source:"preview",owner:null}}window.LastBuyInRace3D={mount(r,e,t,n,i={}){let s=window.LastBuyInRaceEngine,a=s.create(e),o=new AbortController,c=!1,l=!0,h=!1,u=0,d=0,f=0,g,m,p,v,y,_=!1,x={},T=o.signal;r.innerHTML='<div class="race3d-stage"><div class="race3d-view"></div><div class="race3d-hud"><b data-place>4 / 4</b><span data-lap>\u041A\u0440\u0443\u0433 1 / 3</span><button data-pause aria-label="\u041F\u0430\u0443\u0437\u0430">\u2161</button><small data-zone>\u0421\u0442\u0430\u0434\u0438\u043E\u043D TWO ACES</small><strong data-speed>0 \u043A\u043C/\u0447</strong></div><div class="race3d-notice" aria-live="polite"></div><div class="race3d-meter"><i></i><span>\u0414\u0440\u0438\u0444\u0442 \u2192 \u0437\u043E\u043B\u043E\u0442\u043E \u2192 \u0442\u0443\u0440\u0431\u043E</span></div><div class="race3d-controls"><div class="race3d-steering"><button data-key="left" aria-label="\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043B\u0435\u0432\u043E">\u25C0</button><button data-key="right" aria-label="\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043F\u0440\u0430\u0432\u043E">\u25B6</button><button data-key="down">\u0422\u043E\u0440\u043C\u043E\u0437</button></div><div class="race3d-actions"><button data-key="jump">\u0414\u0440\u0438\u0444\u0442 / \u043F\u0440\u044B\u0436\u043E\u043A</button><button data-key="attack">\u041F\u0440\u0435\u0434\u043C\u0435\u0442</button><button data-key="special">\u0422\u0443\u0440\u0431\u043E</button></div></div><div class="race3d-dialog"><h2>\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0441\u0432\u043E\u0451 \u043F\u0435\u0440\u0432\u044B\u043C</h2><p data-loading>\u0412\u044B\u043A\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u043C\u0430\u0448\u0438\u043D\u043A\u0443 \u0438\u0437 \u0433\u0430\u0440\u0430\u0436\u0430\u2026</p><button data-start disabled>\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026</button></div></div>';let b=te=>r.querySelector(te),I=b(".race3d-view"),F=b(".race3d-dialog"),U=b("[data-start]"),z=b(".race3d-notice");function R(){for(let te of Object.keys(x))delete x[te]}function L(){!_||h||(l=!0,R(),F.hidden=!1,U.textContent="\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",b("[data-loading]").textContent="\u0411\u0438\u043B\u0435\u0442\u044B \u0436\u0434\u0443\u0442 \u043D\u0430 \u0444\u0438\u043D\u0438\u0448\u0435. \u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0438 \u0442\u043E\u0436\u0435 \u043F\u0440\u0438\u0442\u043E\u0440\u043C\u043E\u0437\u0438\u043B\u0438.")}U.addEventListener("click",()=>{_&&(l=!1,F.hidden=!0,d=0,I.querySelector("canvas")?.focus())},{signal:T}),b("[data-pause]").addEventListener("click",L,{signal:T});for(let te of r.querySelectorAll("[data-key]")){te.addEventListener("pointerdown",K=>{K.preventDefault(),te.setPointerCapture(K.pointerId),x[te.dataset.key]=!0},{signal:T});for(let K of["pointerup","pointercancel","lostpointercapture"])te.addEventListener(K,()=>{x[te.dataset.key]=!1},{signal:T})}let Z={ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right",ArrowDown:"down",s:"down"," ":"jump",Shift:"jump",x:"attack",Enter:"attack",z:"special"};window.addEventListener("keydown",te=>{if(te.key==="Escape"){L();return}Z[te.key]&&(te.preventDefault(),x[Z[te.key]]=!0)},{signal:T}),window.addEventListener("keyup",te=>{Z[te.key]&&(te.preventDefault(),x[Z[te.key]]=!1)},{signal:T}),window.addEventListener("blur",L,{signal:T}),document.addEventListener("visibilitychange",()=>{document.hidden&&L()},{signal:T});function H(){c||(c=!0,o.abort(),cancelAnimationFrame(u),y?.disconnect(),v?.dispose(),m&&Lr(m),g?.dispose(),g?.forceContextLoss())}async function ie(){let te=await Hd();if(c)return;g=new Jn({antialias:!0,powerPreference:"high-performance"}),g.setPixelRatio(Math.min(devicePixelRatio||1,1.75)),g.outputColorSpace=xt,g.toneMapping=Zn,g.toneMappingExposure=1.25,g.domElement.tabIndex=0,g.domElement.setAttribute("aria-label","\u0422\u0440\u0451\u0445\u043C\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0430\u0434\u0438\u043E\u043D\u043D\u0430\u044F \u0433\u043E\u043D\u043A\u0430"),I.appendChild(g.domElement),I.dataset.garageSource=te.source,m=new yn,m.background=new lt("#91cde5"),m.fog=new Hs("#91cde5",100,245),m.add(new Vn("#d8f4ff","#61705b",2.4));let K=new zn("#fff0ce",3.1);K.position.set(-30,55,-20),m.add(K);let de=new tn(58,1,.1,280),Le=new et(1,1,1),ze=new Map;function Se(Ae){return ze.has(Ae)||ze.set(Ae,new Et({color:Ae,roughness:.72,metalness:.12})),ze.get(Ae)}function Ee(Ae,D,j,Q,oe,q,J,re){let ce=new Ze(Le,Se(D));return ce.position.set(j,Q,oe),ce.scale.set(q,J,re),Ae.add(ce),ce}function ee(){let Ae=new ke;return m.add(Ae),Ae}let Te=[{x:0,z:0,a:0}];for(let Ae=10;Ae<=s.LAP*3+6e3;Ae+=10){let D=Te.at(-1),j=D.a+s.road(Ae-5).curve*.0065;Te.push({x:D.x+Math.sin(j)*.6,z:D.z+Math.cos(j)*.6,a:j})}function be(Ae,D=0){Ae=Math.max(0,Math.min(Te.length*10-11,Ae));let j=Math.floor(Ae/10),Q=Ae/10-j,oe=Te[j],q=Te[j+1],J=oe.a+(q.a-oe.a)*Q,re=s.road(Ae),ce=re.local,me=re.bridge?Math.sin((ce-8500)/1300*Math.PI)*2.8:Math.sin(ce*.0017)*1+Math.sin(ce*.0033)*.45;return{x:oe.x+(q.x-oe.x)*Q+Math.cos(J)*D*6,z:oe.z+(q.z-oe.z)*Q-Math.sin(J)*D*6,y:me,a:J}}function Y(Ae,D,j=0,Q=0){let oe=be(D,j);return Ae.position.set(oe.x,oe.y+Q,oe.z),Ae.rotation.y=oe.a,oe}let Ue=Array.from({length:100},()=>{let Ae=ee();Ee(Ae,"#314550",0,-.16,0,14,.3,2.55);for(let D of[-1,1])Ee(Ae,"#e65c59",D*7,-.03,0,.45,.14,2.55),Ee(Ae,"#f2e2bc",D*6.7,.015,0,.1,.03,2.55),Ee(Ae,"#8bbfa6",D*11,-.3,0,7,.3,2.55);return Ae}),A=Array.from({length:32},(Ae,D)=>{let j=ee(),Q=D%2?-1:1,oe=new ke,q=new ke,J=new ke;j.add(oe,q,J);for(let re=0;re<4;re++){Ee(oe,re%2?"#237488":"#e0aa62",Q*(11+re*1.5),re*.75+.4,0,2,.6,9);for(let ce=0;ce<7;ce++)Ee(oe,["#e3ca87","#153c58","#e86e60"][(ce+D)%3],Q*(11+re*1.5),re*.75+.95,-4+ce*1.25,.45,.45,.45)}Ee(oe,"#d4e8e4",Q*14,5.2,0,.2,7,.2),Ee(oe,"#fff3c4",Q*14,8.5,0,3,.5,.4),Ee(q,["#f1cfad","#71b8bb","#bda7cb"][D%3],Q*15,4+D%5,0,6,8+D%5*2,8);for(let re=0;re<5;re++)for(let ce=0;ce<3;ce++)Ee(q,"#236a83",Q*11.95,re*1.5+1,ce*2-2,.04,.7,1);Ee(q,"#8d7252",Q*9.5,2.3,4,.3,4.6,.3);for(let re=0;re<5;re++){let ce=Ee(q,"#387d65",Q*9.5,4.7,4,.5,.12,4);ce.rotation.y=re*Math.PI/2.5}return Ee(J,"#dce4ce",Q*7.3,.6,0,.25,1.2,9),Ee(J,"#e7c486",Q*7.3,1.3,0,.4,.15,9),Ee(J,"#375c70",Q*7.3,-3.2,0,.7,6,1),{g:j,stadium:oe,city:q,bridge:J}}),P=Ee(m,"#288fa9",0,-4,0,550,.1,550),X=ee();Ee(X,"#123d50",-7.6,3.8,0,.5,7.6,.5),Ee(X,"#123d50",7.6,3.8,0,.5,7.6,.5),Ee(X,"#d9ac52",0,7.5,0,16,1,.7);let V=document.createElement("canvas");V.width=1024,V.height=128;let S=V.getContext("2d");S.fillStyle="#102c40",S.fillRect(0,0,1024,128),S.fillStyle="#ffe7a9",S.font="bold 72px Arial",S.textAlign="center",S.fillText("TWO ACES \xB7 GRAND PRIX",512,89);let B=new Gt(V);B.colorSpace=xt;let W=new Ze(new qt(14,.95),new Pn({map:B,side:Ot}));W.position.set(0,7.5,-.4),W.rotation.y=Math.PI,X.add(W);let k=ee();for(let Ae of[-8,0,8])Ee(k,"#243b53",-7.5,3,Ae,.5,6,.6),Ee(k,"#243b53",7.5,3,Ae,.5,6,.6),Ee(k,"#243b53",0,6,Ae,15.5,.5,.6),Ee(k,"#61dce6",0,5.7,Ae,14,.08,.1);let ve=["box","chips","pad","ramp","barrier","oil","gate","wet","trap","rocket"];function ae(){let Ae=ee(),D={};for(let j of ve){let Q=new ke;if(Q.visible=!1,D[j]=Q,Ae.add(Q),j==="box"){let oe=Ee(Q,"#ab78e1",0,.85,0,1.25,1.25,1.25);oe.rotation.y=.6,Ee(Q,"#ffda75",0,1.55,0,.3,.25,.3)}else if(j==="chips")for(let oe=0;oe<3;oe++){let q=new Ze(new Je(.5,.5,.12,16),Se("#e6b95d"));q.position.set(0,.4+oe*.15,0),Q.add(q)}else if(j==="ramp"){let oe=new ut;oe.setAttribute("position",new Ie([-2,0,-2,2,0,-2,-2,1.1,2,2,0,-2,2,1.1,2,-2,1.1,2],3)),oe.computeVertexNormals(),Q.add(new Ze(oe,new Et({color:"#eba04d",side:Ot})))}else if(j==="pad"){Ee(Q,"#40cedb",0,.05,0,4,.1,3);for(let oe=-1;oe<=1;oe++)Ee(Q,"#e1ffec",0,.12,oe,2,.02,.12)}else if(j==="oil"||j==="wet"){let oe=new Ze(new In(j==="wet"?2.3:1.6,24),new Et({color:j==="wet"?"#5daec5":"#111c37",metalness:.8,roughness:.12,transparent:!0,opacity:.85}));oe.rotation.x=-Math.PI/2,oe.position.y=.04,Q.add(oe)}else if(j==="gate"){Ee(Q,"#e78350",0,.9,0,2.9,1.8,.4);for(let oe=-1;oe<=1;oe++)Ee(Q,"#ffefbc",oe,.95,-.23,.3,1.6,.05)}else if(j==="rocket")Ee(Q,"#ed7851",0,.8,0,.4,.4,1.4);else{Ee(Q,"#e26759",0,.5,0,j==="trap"?1:2.8,1,.65);for(let oe=-1;oe<=1;oe++)Ee(Q,"#ffdf8b",oe*.8,.6,-.34,.3,.5,.03)}}return{g:Ae,types:D}}let le=Array.from({length:60},ae);if(p=Vd(te.look),m.add(p.root),I.dataset.garageLook=JSON.stringify(te.look),v=await sl(window.PokerGarage,te.look),c){v.dispose();return}v.root.scale.setScalar(p.seat.scale),v.root.position.set(0,p.seat.height,p.seat.forward),p.root.add(v.root);for(let Ae of["left","right"]){let D=v.rig.bones;D[Ae+"Hip"].rotation.x=-1.3,D[Ae+"Knee"].rotation.x=1.45,D[Ae+"Shoulder"].rotation.x=-1.05,D[Ae+"Elbow"].rotation.x=-.5}v.root.updateMatrixWorld(!0),v.rig.skeleton.update();let Ce=new Ze(new In(1.6,24),new Pn({color:464677,transparent:!0,opacity:.25,depthWrite:!1}));Ce.rotation.x=-Math.PI/2,Ce.scale.set(1,1.6,1),m.add(Ce);let We=a.rivals.map((Ae,D)=>{let j=ee(),Q=["#d96b5f","#bba4da","#eac75d"][D];function oe(J,re,ce,me,C,pe,Re){let ye=new Ze(new Ft(1,16,10),Se(J));return ye.position.set(re,ce,me),ye.scale.set(C,pe,Re),j.add(ye),ye}oe(Q,0,.65,0,1.15,.36,1.9),oe("#142d3c",0,.92,-.3,.65,.12,.95),Ee(j,"#e1c477",0,.35,0,2.2,.12,3.3),Ee(j,"#1a2d37",0,1.15,-1.55,2.6,.16,.4);for(let J of[-1,1])Ee(j,"#d9c58e",J*.8,.9,-1.55,.12,.6,.12),oe("#fff4c8",J*.65,.7,1.56,.2,.14,.12),oe("#d3655e",J*.65,.7,-1.66,.18,.1,.08);for(let J of[-1,1])for(let re of[-1.2,1.2]){let ce=new Ze(new Je(.47,.47,.4,20),Se("#17232d"));ce.rotation.z=Math.PI/2,ce.position.set(J*1.15,.47,re),j.add(ce);let me=new Ze(new Je(.25,.25,.42,12),Se("#b8cbcd"));me.rotation.z=Math.PI/2,me.position.copy(ce.position),j.add(me)}oe("#213e4d",0,1.25,-.45,.4,.45,.3),oe(Q,0,1.87,-.45,.43,.45,.42),oe("#152b3c",0,1.91,-.1,.35,.16,.12);for(let J of[-1,1]){let re=oe("#213e4d",J*.38,1.3,-.04,.12,.14,.4);re.rotation.x=-.3}let q=new Ze(new Ut(.3,.045,6,16),Se("#17232d"));return q.position.set(0,1.21,.28),q.rotation.x=-.6,j.add(q),j}),De=[];m.traverse(Ae=>{Ae.isMesh&&Ae.geometry===Le&&(De.push(Ae),Ae.visible=!1)});let Xe=new yr(Le,new Et({color:16777215,roughness:.72,metalness:.12}),De.length);Xe.frustumCulled=!1,Xe.instanceMatrix.setUsage(Oc),m.add(Xe);function at(){m.updateMatrixWorld(!0);let Ae=0;for(let D of De){let j=D.parent,Q=!0;for(;j&&j!==m;){if(!j.visible){Q=!1;break}j=j.parent}Q&&(Xe.setMatrixAt(Ae,D.matrixWorld),Xe.setColorAt(Ae,D.material.color),Ae++)}Xe.count=Ae,Xe.instanceMatrix.needsUpdate=!0,Xe.instanceColor&&(Xe.instanceColor.needsUpdate=!0)}function pt(){let Ae=I.getBoundingClientRect();g.setSize(Ae.width,Ae.height),de.aspect=Ae.width/Math.max(1,Ae.height),de.updateProjectionMatrix()}y=new ResizeObserver(pt),y.observe(I),pt();function Ct(){let Ae=Math.floor(a.distance/40)*40;for(let J=0;J<Ue.length;J++){let re=Ae+(J-6)*40,ce=Ue[J];if(ce.visible=re>=0,!ce.visible)continue;let me=be(re),C=be(re+40);ce.position.set((me.x+C.x)/2,(me.y+C.y)/2,(me.z+C.z)/2),ce.rotation.set(-Math.atan2(C.y-me.y,2.4),me.a,0),ce.children[0].material=Se(s.road(re).bridge?"#9a958a":"#314550"),ce.children[1].material=Se(J%2?"#f1e2bd":"#e65c59"),ce.children[4].material=ce.children[1].material}for(let J=0;J<A.length;J++){let re=Math.floor(a.distance/200)*200+(J-2)*200,ce=A[J],me=s.road(re);Y(ce.g,re),ce.g.visible=re>=0,ce.stadium.visible=!me.city,ce.city.visible=me.city&&!me.bridge,ce.bridge.visible=me.bridge}let D=Math.floor(a.distance/s.LAP);Y(X,Math.min(3,D+1)*s.LAP),Y(k,D*s.LAP+5650),k.visible=!s.road(a.distance).city,P.position.set(be(a.distance).x,-4,be(a.distance).z);let j=[...s.trackObjects(a.distance,a.tick).filter(J=>!a.used.has(J.key)),...a.traps.filter(J=>!J.used).map(J=>({...J,kind:"trap"})),...a.enemyShots.map(J=>({...J,kind:"rocket"}))].filter(J=>J.distance>a.distance-100&&J.distance<a.distance+3800);le.forEach((J,re)=>{let ce=j[re];if(J.g.visible=!!ce,!!ce){for(let[me,C]of Object.entries(J.types))C.visible=me===ce.kind;Y(J.g,ce.distance,ce.lateral),ce.kind==="box"&&(J.types.box.rotation.y=a.tick*.025)}});let Q=Y(p.root,a.distance,a.lateral,a.air?Math.sin(a.air/a.airDuration*Math.PI)*3.1:0);p.root.rotation.y+=a.spin?a.spin*.22:a.drift?a.driftSide*.26:-a.steering*.08,p.root.rotation.z=-a.steering*.025,Ce.position.set(Q.x,Q.y+.03,Q.z),Ce.material.opacity=a.air?.1:.25;for(let J of p.wheels)J.rotation.z=-a.distance*.04;for(let J of p.frontWheels)J.rotation.y=-a.steering*.3;We.forEach((J,re)=>{let ce=a.rivals[re];J.visible=Math.abs(ce.distance-a.distance)<3800,Y(J,ce.distance,ce.lateral)}),de.position.set(Q.x-Math.sin(Q.a)*11,Q.y+7.3,Q.z-Math.cos(Q.a)*11);let oe=be(a.distance+140,a.lateral*.3);de.lookAt(oe.x,oe.y+1,oe.z),at(),g.render(m,de),b("[data-place]").textContent=a.position+" / 4",b("[data-lap]").textContent="\u041A\u0440\u0443\u0433 "+a.lap+" / 3 \xB7 \u2660 "+a.picked,b("[data-speed]").textContent=Math.round(a.speed*21)+" \u043A\u043C/\u0447",b("[data-zone]").textContent=s.road(a.distance).name,z.textContent=a.countdown?String(Math.ceil(a.countdown/60)):a.noticeTicks?a.notice:a.hazardWarning?"\u0412\u043F\u0435\u0440\u0435\u0434\u0438 \u043F\u0440\u0435\u043F\u044F\u0442\u0441\u0442\u0432\u0438\u0435 \u2014 \u0441\u043C\u0435\u043D\u0438 \u043B\u0438\u043D\u0438\u044E":"";let q=b(".race3d-meter i");q.style.width=Math.min(100,a.driftMeter)+"%",q.style.background=a.driftMeter>=60?"#ffe184":"#61d9e8",b("[data-key=attack]").textContent=a.itemRoll?"\u2026":{rocket:"\u0420\u0430\u043A\u0435\u0442\u0430",shield:"\u0429\u0438\u0442",turbo:"\u0420\u0430\u0437\u0433\u043E\u043D",trap:"\u041B\u043E\u0432\u0443\u0448\u043A\u0430"}[a.item]||(a.shield?"\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0449\u0438\u0442":"\u041D\u0435\u0442 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430"),I.dataset.distance=Math.round(a.distance),I.dataset.routeZone=a.routeZone}_=!0,U.disabled=!1,U.textContent="\u041D\u0430 \u0441\u0442\u0430\u0440\u0442",b("[data-loading]").textContent=(te.source==="preview"?"\u041F\u0440\u043E\u0431\u043D\u044B\u0439 \u0437\u0430\u0435\u0437\u0434 \u043D\u0430 \u043A\u043B\u0443\u0431\u043D\u043E\u043C \u043A\u0430\u0440\u0442\u0435. ":"\u0422\u0432\u043E\u044F \u043C\u0430\u0448\u0438\u043D\u043A\u0430 \u0438\u0437 \u0433\u0430\u0440\u0430\u0436\u0430 \u0433\u043E\u0442\u043E\u0432\u0430. ")+"\u0422\u0440\u0438 \u043A\u0440\u0443\u0433\u0430 \u0437\u0430 \u043A\u043E\u0440\u043E\u0431\u043A\u0443 \u0431\u0438\u043B\u0435\u0442\u043E\u0432. \u0421\u0442\u0440\u0435\u043B\u043A\u0438 \u2014 \u0440\u0443\u043B\u044C, Shift \u2014 \u0434\u0440\u0438\u0444\u0442, Z \u2014 \u0442\u0443\u0440\u0431\u043E \u0432 \u0437\u043E\u043B\u043E\u0442\u043E\u0439 \u0437\u043E\u043D\u0435, X \u2014 \u043F\u0440\u0435\u0434\u043C\u0435\u0442. \u041D\u0430 \u0442\u0440\u0430\u043C\u043F\u043B\u0438\u043D\u0435 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439 \u043F\u0440\u044B\u0436\u043E\u043A. \u041C\u043E\u043A\u0440\u044B\u0439 \u0430\u0441\u0444\u0430\u043B\u044C\u0442 \u0442\u043E\u0440\u043C\u043E\u0437\u0438\u0442, \u043F\u043E\u0434\u0432\u0438\u0436\u043D\u044B\u0435 \u0432\u043E\u0440\u043E\u0442\u0430 \u043E\u0431\u0445\u043E\u0434\u0438 \u0441\u0431\u043E\u043A\u0443.",g.domElement.addEventListener("webglcontextlost",Ae=>{Ae.preventDefault(),L(),_=!1,U.textContent="\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0433\u043E\u043D\u043A\u0443",U.disabled=!1,b("[data-loading]").textContent="3D-\u0441\u0446\u0435\u043D\u0430 \u043F\u043E\u0442\u0435\u0440\u044F\u043B\u0430 \u0441\u0432\u044F\u0437\u044C \u0441 \u0432\u0438\u0434\u0435\u043E\u043A\u0430\u0440\u0442\u043E\u0439. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438 \u0437\u0430\u0435\u0437\u0434.",U.onclick=()=>{H(),window.LastBuyInRace3D.mount(r,e,t,n,i)}},{signal:T}),I.raceSnapshot=()=>({distance:a.distance,look:{...te.look},source:te.source,triangles:g.info.render.triangles,drawCalls:g.info.render.calls});function Tt(Ae){if(c)return;let D=d?Math.min(100,Ae-d):0;if(d=Ae,!l&&!h){for(f+=D;f>=1e3/60;)if(s.step(a,x),f-=1e3/60,a.won||a.lost){h=!0,R(),a.won?t({chapter:e,score:a.score,hits:a.hits}):n(()=>{s.revive(a),h=!1,l=!0,F.hidden=!1,U.textContent="\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0437\u0430\u0435\u0437\u0434",d=0,f=0});break}}else f=0;c||(Ct(),u=requestAnimationFrame(Tt))}u=requestAnimationFrame(Tt)}return ie().catch(te=>{c||(_=!1,b("[data-loading]").textContent=te.userMessage||"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C 3D-\u0433\u043E\u043D\u043A\u0443. \u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443.",U.textContent="\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",U.disabled=!1,U.onclick=()=>{H(),window.LastBuyInRace3D.mount(r,e,t,n,i)},console.error(te))}),{stop:H}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
