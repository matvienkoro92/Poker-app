(()=>{var $c=0,il=1,Qc=2;var rl=1,ka=2,ri=3,Lr=0,Dn=1,Ot=2,Fi=0,bs=1,sl=2,al=3,ol=4,eh=5,Dr=100,th=101,nh=102,ih=103,rh=104,sh=200,ah=201,oh=202,lh=203,ch=204,hh=205,uh=206,dh=207,ph=208,mh=209,fh=210,gh=211,vh=212,_h=213,yh=214,Va=0,Ha=1,Wa=2,ws=3,Xa=4,ja=5,qa=6,Ya=7,xh=0,Mh=1,Sh=2,bi=0,Th=1,bh=2,wh=3,si=4,Eh=5,Ah=6,Ch=7,jo="attached",Rh="detached",ll=300,Ur=301,Zi=302,Za=303,Ja=304,Es=306,qn=1e3,yr=1001,oa=1002,ni=1003,Ph=1004;var As=1005;var ii=1006,Ka=1007;var Ji=1008;var ai=1009,cl=1010,hl=1011,Nr=1012,$a=1013,Ki=1014,Gn=1015,Bi=1016,Qa=1017,eo=1018,Fr=1020,ul=35902,dl=35899,Ih=1021,Lh=1022,kn=1023,Cs=1026,Rs=1027,to=1028,no=1029,Dh=1030,pl=1031;var ml=1033,io=33776,ro=33777,so=33778,ao=33779,fl=35840,gl=35841,vl=35842,_l=35843,yl=36196,xl=37492,Ml=37496,Sl=37808,Tl=37809,bl=37810,wl=37811,El=37812,Al=37813,Cl=37814,Rl=37815,Pl=37816,Il=37817,Ll=37818,Dl=37819,Ul=37820,Nl=37821,Fl=36492,Bl=36494,Ol=36495,zl=36283,Gl=36284,kl=36285,Vl=36286;var Qr=2300,la=2301,sa=2302,qo=2400,Yo=2401,Zo=2402;var oo=3201;var Uh=0,Nh=1,$i="",ft="srgb",Hi="srgb-linear",es="linear",Ct="srgb";var Vi=7680;var Fh=512,Bh=513,Oh=514,Hl=515,zh=516,Gh=517,kh=518,Vh=519,Jo=35044;var Wl="300 es",yi=2e3,ts=2001;var xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var aa=Math.PI/180,ca=180/Math.PI;function Qi(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(hn[255&r]+hn[r>>8&255]+hn[r>>16&255]+hn[r>>24&255]+"-"+hn[255&e]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[63&t|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[255&n]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function mt(r,e,t){return Math.max(e,Math.min(t,r))}function Vu(r,e){return(r%e+e)%e}function fo(r,e,t){return(1-t)*r+t*e}function Vr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Tn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var pe=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Rn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],_=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=_);if(u!==_||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*_,v=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let M=Math.sqrt(y),b=Math.atan2(M,g*v);f=Math.sin(f*b)/M,o=Math.sin(o*b)/M}let x=o*v;if(c=c*f+d*x,l=l*f+m*x,h=h*f+p*x,u=u*f+_*x,f===1-o){let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_c.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return go.copy(this).projectOnVector(e),this.sub(go)}reflect(e){return this.sub(go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},go=new w,_c=new Rn,lt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],_=i[0],f=i[3],g=i[6],v=i[1],y=i[4],x=i[7],M=i[2],b=i[5],L=i[8];return s[0]=a*_+o*v+c*M,s[3]=a*f+o*y+c*b,s[6]=a*g+o*x+c*L,s[1]=l*_+h*v+u*M,s[4]=l*f+h*y+u*b,s[7]=l*g+h*x+u*L,s[2]=d*_+m*v+p*M,s[5]=d*f+m*y+p*b,s[8]=d*g+m*x+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(vo.makeScale(e,t)),this}rotate(e){return this.premultiply(vo.makeRotation(-e)),this}translate(e,t){return this.premultiply(vo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vo=new lt;function Xl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ns(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Hh(){let r=ns("canvas");return r.style.display="block",r}var yc={};function xr(r){r in yc||(yc[r]=!0,console.warn(r))}function Wh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var xc=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mc=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hu(){let r={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Ct&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ct&&(i.r=_r(i.r),i.g=_r(i.g),i.b=_r(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?es:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return xr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return xr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Hi]:{primaries:e,whitePoint:n,transfer:es,toXYZ:xc,fromXYZ:Mc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ft},outputColorSpaceConfig:{drawingBufferColorSpace:ft}},[ft]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:xc,fromXYZ:Mc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ft}}}),r}var Mt=Hu();function _i(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function _r(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var ar,ha=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ar===void 0&&(ar=ns("canvas")),ar.width=e.width,ar.height=e.height;let i=ar.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ar}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ns("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*_i(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*_i(t[n]/255)):t[n]=_i(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wu=0,Mr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(_o(i[a].image)):s.push(_o(i[a]))}else s=_o(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function _o(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ha.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xu=0,yo=new w,_n=class r extends xi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Qi(),this.name="",this.source=new Mr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yo).x}get height(){return this.source.getSize(yo).y}get depth(){return this.source.getSize(yo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ll)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qn:e.x=e.x-Math.floor(e.x);break;case yr:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case qn:e.y=e.y-Math.floor(e.y);break;case yr:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};_n.DEFAULT_IMAGE=null,_n.DEFAULT_MAPPING=ll,_n.DEFAULT_ANISOTROPY=1;var Tt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],_=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(m+1)/2,M=(g+1)/2,b=(h+d)/4,L=(u+_)/4,O=(p+f)/4;return y>x&&y>M?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=b/n,s=L/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=O/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=L/s,i=O/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ua=class extends xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new _n(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Mr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends ua{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},is=class extends _n{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var da=class extends _n{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var an=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(s,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),Us.subVectors(this.max,Hr),or.subVectors(e.a,Hr),lr.subVectors(e.b,Hr),cr.subVectors(e.c,Hr),Ei.subVectors(lr,or),Ai.subVectors(cr,lr),Oi.subVectors(or,cr);let t=[0,-Ei.z,Ei.y,0,-Ai.z,Ai.y,0,-Oi.z,Oi.y,Ei.z,0,-Ei.x,Ai.z,0,-Ai.x,Oi.z,0,-Oi.x,-Ei.y,Ei.x,0,-Ai.y,Ai.x,0,-Oi.y,Oi.x,0];return!!xo(t,or,lr,cr,Us)&&(t=[1,0,0,0,1,0,0,0,1],!!xo(t,or,lr,cr,Us)&&(Ns.crossVectors(Ei,Ai),t=[Ns.x,Ns.y,Ns.z],xo(t,or,lr,cr,Us)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Wn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},di=[new w,new w,new w,new w,new w,new w,new w,new w],Wn=new w,Ds=new an,or=new w,lr=new w,cr=new w,Ei=new w,Ai=new w,Oi=new w,Hr=new w,Us=new w,Ns=new w,zi=new w;function xo(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){zi.fromArray(r,s);let o=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),c=e.dot(zi),l=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var ju=new an,Wr=new w,Mo=new w,Pn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ju.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wr.subVectors(e,this.center);let t=Wr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Wr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wr.copy(e.center).add(Mo)),this.expandByPoint(Wr.copy(e.center).sub(Mo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pi=new w,So=new w,Fs=new w,Ci=new w,To=new w,Bs=new w,bo=new w,Wi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){So.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Ci.copy(this.origin).sub(So);let s=.5*e.distanceTo(t),a=-this.direction.dot(Fs),o=Ci.dot(this.direction),c=-Ci.dot(Fs),l=Ci.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(So).addScaledVector(Fs,d),m}intersectSphere(e,t){pi.subVectors(e.center,this.origin);let n=pi.dot(this.direction),i=pi.dot(pi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,i,s){To.subVectors(t,e),Bs.subVectors(n,e),bo.crossVectors(To,Bs);let a,o=this.direction.dot(bo);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Ci.subVectors(this.origin,e);let c=a*this.direction.dot(Bs.crossVectors(Ci,Bs));if(c<0)return null;let l=a*this.direction.dot(To.cross(Ci));if(l<0||c+l>o)return null;let h=-a*Ci.dot(bo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qe=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,_,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=_,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/hr.setFromMatrixColumn(e,0).length(),s=1/hr.setFromMatrixColumn(e,1).length(),a=1/hr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d+_*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,_=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qu,e,Yu)}lookAt(e,t,n){let i=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Ri.crossVectors(n,En),Ri.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Ri.crossVectors(n,En)),Ri.normalize(),Os.crossVectors(En,Ri),i[0]=Ri.x,i[4]=Os.x,i[8]=En.x,i[1]=Ri.y,i[5]=Os.y,i[9]=En.y,i[2]=Ri.z,i[6]=Os.z,i[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],_=n[6],f=n[10],g=n[14],v=n[3],y=n[7],x=n[11],M=n[15],b=i[0],L=i[4],O=i[8],D=i[12],V=i[1],I=i[5],U=i[9],K=i[13],H=i[2],Z=i[6],ne=i[10],de=i[14],le=i[3],Te=i[7],Ae=i[11],Q=i[15];return s[0]=a*b+o*V+c*H+l*le,s[4]=a*L+o*I+c*Z+l*Te,s[8]=a*O+o*U+c*ne+l*Ae,s[12]=a*D+o*K+c*de+l*Q,s[1]=h*b+u*V+d*H+m*le,s[5]=h*L+u*I+d*Z+m*Te,s[9]=h*O+u*U+d*ne+m*Ae,s[13]=h*D+u*K+d*de+m*Q,s[2]=p*b+_*V+f*H+g*le,s[6]=p*L+_*I+f*Z+g*Te,s[10]=p*O+_*U+f*ne+g*Ae,s[14]=p*D+_*K+f*de+g*Q,s[3]=v*b+y*V+x*H+M*le,s[7]=v*L+y*I+x*Z+M*Te,s[11]=v*O+y*U+x*ne+M*Ae,s[15]=v*D+y*K+x*de+M*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],_=e[13],f=e[14],g=e[15],v=u*f*l-_*d*l+_*c*m-o*f*m-u*c*g+o*d*g,y=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,x=h*_*l-p*u*l+p*o*m-a*_*m-h*o*g+a*u*g,M=p*u*c-h*_*c-p*o*d+a*_*d+h*o*f-a*u*f,b=t*v+n*y+i*x+s*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/b;return e[0]=v*L,e[1]=(_*d*s-u*f*s-_*i*m+n*f*m+u*i*g-n*d*g)*L,e[2]=(o*f*s-_*c*s+_*i*l-n*f*l-o*i*g+n*c*g)*L,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*L,e[4]=y*L,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*L,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*L,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*L,e[8]=x*L,e[9]=(p*u*s-h*_*s-p*n*m+t*_*m+h*n*g-t*u*g)*L,e[10]=(a*_*s-p*o*s+p*n*l-t*_*l-a*n*g+t*o*g)*L,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*L,e[12]=M*L,e[13]=(h*_*i-p*u*i+p*n*d-t*_*d-h*n*f+t*u*f)*L,e[14]=(p*o*i-a*_*i-p*n*c+t*_*c+a*n*f-t*o*f)*L,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,_=a*h,f=a*u,g=o*u,v=c*l,y=c*h,x=c*u,M=n.x,b=n.y,L=n.z;return i[0]=(1-(_+g))*M,i[1]=(m+x)*M,i[2]=(p-y)*M,i[3]=0,i[4]=(m-x)*b,i[5]=(1-(d+g))*b,i[6]=(f+v)*b,i[7]=0,i[8]=(p+y)*L,i[9]=(f-v)*L,i[10]=(1-(d+_))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=hr.set(i[0],i[1],i[2]).length(),a=hr.set(i[4],i[5],i[6]).length(),o=hr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Xn.copy(this);let c=1/s,l=1/a,h=1/o;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=l,Xn.elements[5]*=l,Xn.elements[6]*=l,Xn.elements[8]*=h,Xn.elements[9]*=h,Xn.elements[10]*=h,t.setFromRotationMatrix(Xn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,_;if(c)p=s/(a-s),_=a*s/(a-s);else if(o===yi)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else{if(o!==ts)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),_=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,_;if(c)p=1/(a-s),_=a/(a-s);else if(o===yi)p=-2/(a-s),_=-(a+s)/(a-s);else{if(o!==ts)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),_=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},hr=new w,Xn=new qe,qu=new w(0,0,0),Yu=new w(1,1,1),Ri=new w,Os=new w,En=new w,Sc=new qe,Tc=new Rn,Yn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tc.setFromEuler(this),this.setFromQuaternion(Tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var rs=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Zu=0,bc=new w,ur=new Rn,mi=new qe,zs=new w,Xr=new w,Ju=new w,Ku=new Rn,wc=new w(1,0,0),Ec=new w(0,1,0),Ac=new w(0,0,1),Cc={type:"added"},$u={type:"removed"},dr={type:"childadded",child:null},wo={type:"childremoved",child:null},sn=class r extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new Yn,n=new Rn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new qe},normalMatrix:{value:new lt}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.multiply(ur),this}rotateOnWorldAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.premultiply(ur),this}rotateX(e){return this.rotateOnAxis(wc,e)}rotateY(e){return this.rotateOnAxis(Ec,e)}rotateZ(e){return this.rotateOnAxis(Ac,e)}translateOnAxis(e,t){return bc.copy(e).applyQuaternion(this.quaternion),this.position.add(bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wc,e)}translateY(e){return this.translateOnAxis(Ec,e)}translateZ(e){return this.translateOnAxis(Ac,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zs.copy(e):zs.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Xr,zs,this.up):mi.lookAt(zs,Xr,this.up),this.quaternion.setFromRotationMatrix(mi),i&&(mi.extractRotation(i.matrixWorld),ur.setFromRotationMatrix(mi),this.quaternion.premultiply(ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cc),dr.child=e,this.dispatchEvent(dr),dr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($u),wo.child=e,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cc),dr.child=e,this.dispatchEvent(dr),dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,e,Ju),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,Ku,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};sn.DEFAULT_UP=new w(0,1,0),sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=new w,fi=new w,Eo=new w,gi=new w,pr=new w,mr=new w,Rc=new w,Ao=new w,Co=new w,Ro=new w,Po=new Tt,Io=new Tt,Lo=new Tt,vi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),jn.subVectors(e,t),i.cross(jn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){jn.subVectors(i,t),fi.subVectors(n,t),Eo.subVectors(e,t);let a=jn.dot(jn),o=jn.dot(fi),c=jn.dot(Eo),l=fi.dot(fi),h=fi.dot(Eo),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gi)!==null&&gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,gi.x),c.addScaledVector(a,gi.y),c.addScaledVector(o,gi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Po.setScalar(0),Io.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,n),Lo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Po,s.x),a.addScaledVector(Io,s.y),a.addScaledVector(Lo,s.z),a}static isFrontFacing(e,t,n,i){return jn.subVectors(n,t),fi.subVectors(e,t),jn.cross(fi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),.5*jn.cross(fi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;pr.subVectors(i,n),mr.subVectors(s,n),Ao.subVectors(e,n);let c=pr.dot(Ao),l=mr.dot(Ao);if(c<=0&&l<=0)return t.copy(n);Co.subVectors(e,i);let h=pr.dot(Co),u=mr.dot(Co);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(pr,a);Ro.subVectors(e,s);let m=pr.dot(Ro),p=mr.dot(Ro);if(p>=0&&m<=p)return t.copy(s);let _=m*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(mr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return Rc.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(Rc,o);let g=1/(f+_+d);return a=_*g,o=d*g,t.copy(n).addScaledVector(pr,a).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Do(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=Vu(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Do(a,s,e+1/3),this.g=Do(a,s,e),this.b=Do(a,s,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){let n=Xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return Mt.workingToColorSpace(un.copy(this),e),65536*Math.round(mt(255*un.r,0,255))+256*Math.round(mt(255*un.g,0,255))+Math.round(mt(255*un.b,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(un.copy(this),t);let n=un.r,i=un.g,s=un.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=ft){Mt.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,i=un.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Gs);let n=fo(Pi.h,Gs.h,t),i=fo(Pi.s,Gs.s,t),s=fo(Pi.l,Gs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new Ye;Ye.NAMES=Xh;var Qu=0,Mi=class extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},On=class extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},sm=ed();function ed(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var qt=new w,ks=new pe,td=0,bn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:td++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jo,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ks.fromBufferAttribute(this,t),ks.applyMatrix3(e),this.setXY(t,ks.x,ks.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Vr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),n=Tn(n,this.array),i=Tn(i,this.array),s=Tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jo&&(e.usage=this.usage),e}};var Xi=class extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ss=class extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Pe=class extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}},nd=0,Fn=new qe,Uo=new sn,fr=new w,An=new an,jr=new an,nn=new w,ht=class r extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xl(e)?ss:Xi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new lt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,n){return Fn.makeTranslation(e,t,n),this.applyMatrix4(Fn),this}scale(e,t,n){return Fn.makeScale(e,t,n),this.applyMatrix4(Fn),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];An.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];jr.setFromBufferAttribute(o),this.morphTargetsRelative?(nn.addVectors(An.min,jr.min),An.expandByPoint(nn),nn.addVectors(An.max,jr.max),An.expandByPoint(nn)):(An.expandByPoint(jr.min),An.expandByPoint(jr.max))}An.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)nn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(nn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)nn.fromBufferAttribute(o,l),c&&(fr.fromBufferAttribute(e,l),nn.add(fr)),i=Math.max(i,n.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new w,c[O]=new w;let l=new w,h=new w,u=new w,d=new pe,m=new pe,p=new pe,_=new w,f=new w;function g(O,D,V){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,V),d.fromBufferAttribute(s,O),m.fromBufferAttribute(s,D),p.fromBufferAttribute(s,V),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let I=1/(m.x*p.y-p.x*m.y);isFinite(I)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(I),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(I),o[O].add(_),o[D].add(_),o[V].add(_),c[O].add(f),c[D].add(f),c[V].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let O=0,D=v.length;O<D;++O){let V=v[O],I=V.start;for(let U=I,K=I+V.count;U<K;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let y=new w,x=new w,M=new w,b=new w;function L(O){M.fromBufferAttribute(i,O),b.copy(M);let D=o[O];y.copy(D),y.sub(M.multiplyScalar(M.dot(D))).normalize(),x.crossVectors(b,D);let V=x.dot(c[O])<0?-1:1;a.setXYZW(O,y.x,y.y,y.z,V)}for(let O=0,D=v.length;O<D;++O){let V=v[O],I=V.start;for(let U=I,K=I+V.count;U<K;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),_=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)nn.fromBufferAttribute(e,t),nn.normalize(),e.setXYZ(t,nn.x,nn.y,nn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let _=0,f=c.length;_<f;_++){m=o.isInterleavedBufferAttribute?c[_]*o.data.stride+o.offset:c[_]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new bn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pc=new qe,Gi=new Wi,Vs=new Pn,Ic=new w,Hs=new w,Ws=new w,Xs=new w,No=new w,js=new w,Lc=new w,qs=new w,Je=class extends sn{constructor(e=new ht,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){js.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(No.fromBufferAttribute(u,e),a?js.addScaledVector(No,h):js.addScaledVector(No.sub(t),h))}t.add(js)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),Gi.copy(e.ray).recast(e.near),Vs.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(Vs,Ic)===null||Gi.origin.distanceToSquared(Ic)>(e.far-e.near)**2))return;Pc.copy(s).invert(),Gi.copy(e.ray).applyMatrix4(Pc),n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Gi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Ys(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);p<_;p+=3)i=Ys(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),y=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<y;v+=3)i=Ys(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);p<_;p+=3)i=Ys(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Ys(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Hs),r.getVertexPosition(c,Ws),r.getVertexPosition(l,Xs);let h=(function(u,d,m,p,_,f,g,v){let y;if(y=d.side===1?p.intersectTriangle(g,f,_,!0,v):p.intersectTriangle(_,f,g,d.side===0,v),y===null)return null;qs.copy(v),qs.applyMatrix4(u.matrixWorld);let x=m.ray.origin.distanceTo(qs);return x<m.near||x>m.far?null:{distance:x,point:qs.clone(),object:u}})(r,e,t,n,Hs,Ws,Xs,Lc);if(h){let u=new w;vi.getBarycoord(Lc,Hs,Ws,Xs,u),i&&(h.uv=vi.getInterpolatedAttribute(i,o,c,l,u,new pe)),s&&(h.uv1=vi.getInterpolatedAttribute(s,o,c,l,u,new pe)),a&&(h.normal=vi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};vi.getNormal(Hs,Ws,Xs,d.normal),h.face=d,h.barycoord=u}return h}var Ke=class r extends ht{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(_,f,g,v,y,x,M,b,L,O,D){let V=x/L,I=M/O,U=x/2,K=M/2,H=b/2,Z=L+1,ne=O+1,de=0,le=0,Te=new w;for(let Ae=0;Ae<ne;Ae++){let Q=Ae*I-K;for(let ge=0;ge<Z;ge++){let he=ge*V-U;Te[_]=he*v,Te[f]=Q*y,Te[g]=H,l.push(Te.x,Te.y,Te.z),Te[_]=0,Te[f]=0,Te[g]=b>0?1:-1,h.push(Te.x,Te.y,Te.z),u.push(ge/L),u.push(1-Ae/O),de+=1}}for(let Ae=0;Ae<O;Ae++)for(let Q=0;Q<L;Q++){let ge=d+Q+Z*Ae,he=d+Q+Z*(Ae+1),fe=d+(Q+1)+Z*(Ae+1),ve=d+(Q+1)+Z*Ae;c.push(ge,he,ve),c.push(he,fe,ve),le+=6}o.addGroup(m,le,D),m+=le,d+=de}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Pe(l,3)),this.setAttribute("normal",new Pe(h,3)),this.setAttribute("uv",new Pe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function er(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function mn(r){let e={};for(let t=0;t<r.length;t++){let n=er(r[t]);for(let i in n)e[i]=n[i]}return e}function jl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}var jh={clone:er,merge:mn},dn=class extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Sr=class extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ii=new w,Dc=new pe,Uc=new pe,Gt=class extends Sr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*ca*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*aa*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*ca*Math.atan(Math.tan(.5*aa*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,t){return this.getViewBounds(e,Dc,Uc),t.subVectors(Uc,Dc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*aa*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},gr=-90,pa=class extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Gt(gr,1,e,t);i.layers=this.layers,this.add(i);let s=new Gt(gr,1,e,t);s.layers=this.layers,this.add(s);let a=new Gt(gr,1,e,t);a.layers=this.layers,this.add(a);let o=new Gt(gr,1,e,t);o.layers=this.layers,this.add(o);let c=new Gt(gr,1,e,t);c.layers=this.layers,this.add(c);let l=new Gt(gr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==ts)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},as=class extends _n{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ma=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new as(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ke(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new Je(i,s),o=t.minFilter;return t.minFilter===Ji&&(t.minFilter=ii),new pa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ve=class extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}},id={type:"move"},Tr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let f=t.getJointPose(_,n),g=this._getHandJoint(l,_);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(id)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ve;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var yn=class extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var am=new w;var om=new w,lm=new w,cm=new w,hm=new pe,um=new pe,dm=new qe,pm=new w,mm=new w,fm=new w,gm=new pe,vm=new pe,_m=new pe;var ym=new w,xm=new w;var Nc=new w,Fc=new Tt,Bc=new Tt,rd=new w,Oc=new qe,Zs=new w,Fo=new Pn,zc=new qe,Bo=new Wi,os=class extends Je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jo,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new an),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingBox.expandByPoint(Zs)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingSphere.expandByPoint(Zs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fo.copy(this.boundingSphere),Fo.applyMatrix4(i),e.ray.intersectsSphere(Fo)!==!1&&(zc.copy(i).invert(),Bo.copy(e.ray).applyMatrix4(zc),this.boundingBox!==null&&Bo.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Bo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Fc.fromBufferAttribute(i.attributes.skinIndex,e),Bc.fromBufferAttribute(i.attributes.skinWeight,e),Nc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Bc.getComponent(s);if(a!==0){let o=Fc.getComponent(s);Oc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(rd.copy(Nc).applyMatrix4(Oc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},br=class extends sn{constructor(){super(),this.isBone=!0,this.type="Bone"}},ls=class extends _n{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Gc=new qe,sd=new qe,cs=class r{constructor(e=[],t=[]){this.uuid=Qi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:sd;Gc.multiplyMatrices(o,t[s]),Gc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ls(t,e,e,kn,Gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new br),this.bones.push(a),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},hs=class extends bn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},vr=new qe,kc=new qe,Js=[],Vc=new an,ad=new qe,qr=new Je,Yr=new Pn,us=class extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hs(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ad)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new an),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vr),Vc.copy(e.boundingBox).applyMatrix4(vr),this.boundingBox.union(Vc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vr),Yr.copy(e.boundingSphere).applyMatrix4(vr),this.boundingSphere.union(Yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(qr.geometry=this.geometry,qr.material=this.material,qr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(n),e.ray.intersectsSphere(Yr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,vr),kc.multiplyMatrices(n,vr),qr.matrixWorld=kc,qr.raycast(e,Js);for(let a=0,o=Js.length;a<o;a++){let c=Js[a];c.instanceId=s,c.object=this,t.push(c)}Js.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hs(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ls(new Float32Array(i*this.count),i,this.count,to,Gn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Oo=new w,od=new w,ld=new lt,ei=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Oo.subVectors(n,t).cross(od.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Oo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ld.getNormalMatrix(e),i=this.coplanarPoint(Oo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ki=new Pn,cd=new pe(.5,.5),Ks=new w,Ui=class{constructor(e=new ei,t=new ei,n=new ei,i=new ei,s=new ei,a=new ei){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],_=s[9],f=s[10],g=s[11],v=s[12],y=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-a,m-h,g-p,M-v).normalize(),i[1].setComponents(l+a,m+h,g+p,M+v).normalize(),i[2].setComponents(l+o,m+u,g+_,M+y).normalize(),i[3].setComponents(l-o,m-u,g-_,M-y).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,m-d,g-f,M-x).normalize();else if(i[4].setComponents(l-c,m-d,g-f,M-x).normalize(),t===yi)i[5].setComponents(l+c,m+d,g+f,M+x).normalize();else{if(t!==ts)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=cd.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ks.x=i.normal.x>0?e.max.x:e.min.x,Ks.y=i.normal.y>0?e.max.y:e.min.y,Ks.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},$n=new qe,Qn=new Ui,fa=class r{constructor(){this.coordinateSystem=yi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.containsPoint(e))return!0}return!1}clone(){return new r}};var Ko=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Mm=new qe,Sm=new Ye(1,1,1),Tm=new Ui,bm=new fa,wm=new an,Em=new Pn,Am=new w,Cm=new w,Rm=new w,Pm=new Ko,Im=new Je;var Lm=new w,Dm=new w,Um=new qe,Nm=new Wi,Fm=new Pn,Bm=new w,Om=new w;var zm=new w,Gm=new w;var km=new qe,Vm=new Wi,Hm=new Pn,Wm=new w;var Et=class extends _n{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ds=class extends _n{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Cs&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Mr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ps=class extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},wr=class r extends ht{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,_=i+1,f=new w,g=new w;for(let v=0;v<=p;v++){let y=0,x=0,M=0,b=0;if(v<=n){let D=v/n,V=D*Math.PI/2;x=-h-e*Math.cos(V),M=e*Math.sin(V),b=-e*Math.cos(V),y=D*u}else if(v<=n+s){let D=(v-n)/s;x=D*t-h,M=e,b=0,y=u+D*d}else{let D=(v-n-s)/n,V=D*Math.PI/2;x=h+e*Math.sin(V),M=e*Math.cos(V),b=e*Math.sin(V),y=u+d+D*u}let L=Math.max(0,Math.min(1,y/m)),O=0;v===0?O=.5/i:v===p&&(O=-.5/i);for(let D=0;D<=i;D++){let V=D/i,I=V*Math.PI*2,U=Math.sin(I),K=Math.cos(I);g.x=-M*K,g.y=x,g.z=M*U,o.push(g.x,g.y,g.z),f.set(-M*K,b,M*U),f.normalize(),c.push(f.x,f.y,f.z),l.push(V+O,L)}if(v>0){let D=(v-1)*_;for(let V=0;V<i;V++){let I=D+V,U=D+V+1,K=v*_+V,H=v*_+V+1;a.push(I,U,K),a.push(U,H,K)}}}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},zn=class r extends ht{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new pe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("normal",new Pe(o,3)),this.setAttribute("uv",new Pe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Xe=class r extends ht{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,_=[],f=n/2,g=0;function v(y){let x=p,M=new pe,b=new w,L=0,O=y===!0?e:t,D=y===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,f*D,0),d.push(0,D,0),m.push(.5,.5),p++;let V=p;for(let I=0;I<=i;I++){let U=I/i*c+o,K=Math.cos(U),H=Math.sin(U);b.x=O*H,b.y=f*D,b.z=O*K,u.push(b.x,b.y,b.z),d.push(0,D,0),M.x=.5*K+.5,M.y=.5*H*D+.5,m.push(M.x,M.y),p++}for(let I=0;I<i;I++){let U=x+I,K=V+I;y===!0?h.push(K,K+1,U):h.push(K+1,K,U),L+=3}l.addGroup(g,L,y===!0?1:2),g+=L}(function(){let y=new w,x=new w,M=0,b=(t-e)/n;for(let L=0;L<=s;L++){let O=[],D=L/s,V=D*(t-e)+e;for(let I=0;I<=i;I++){let U=I/i,K=U*c+o,H=Math.sin(K),Z=Math.cos(K);x.x=V*H,x.y=-D*n+f,x.z=V*Z,u.push(x.x,x.y,x.z),y.set(H,b,Z).normalize(),d.push(y.x,y.y,y.z),m.push(U,1-D),O.push(p++)}_.push(O)}for(let L=0;L<i;L++)for(let O=0;O<s;O++){let D=_[O][L],V=_[O+1][L],I=_[O+1][L+1],U=_[O][L+1];(e>0||O!==0)&&(h.push(D,V,U),M+=3),(t>0||O!==s-1)&&(h.push(V,I,U),M+=3)}l.addGroup(g,M,0),g+=M})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ga=class r extends Xe{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ni=class r extends ht{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,_,f){let g=f+1,v=[];for(let y=0;y<=g;y++){v[y]=[];let x=m.clone().lerp(_,y/g),M=p.clone().lerp(_,y/g),b=g-y;for(let L=0;L<=b;L++)v[y][L]=L===0&&y===g?x:x.clone().lerp(M,L/b)}for(let y=0;y<g;y++)for(let x=0;x<2*(g-y)-1;x++){let M=Math.floor(x/2);x%2==0?(c(v[y][M+1]),c(v[y+1][M]),c(v[y][M])):(c(v[y][M+1]),c(v[y+1][M+1]),c(v[y+1][M]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let _=3*m;p.x=e[_+0],p.y=e[_+1],p.z=e[_+2]}function h(m,p,_,f){f<0&&m.x===1&&(a[p]=m.x-1),_.x===0&&_.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new w,_=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],_),l(t[g+2],f),o(p,_,f,m)})(i),(function(m){let p=new w;for(let _=0;_<s.length;_+=3)p.x=s[_+0],p.y=s[_+1],p.z=s[_+2],p.normalize().multiplyScalar(m),s[_+0]=p.x,s[_+1]=p.y,s[_+2]=p.z})(n),(function(){let m=new w;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let _=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(_,1-f)}(function(){let p=new w,_=new w,f=new w,g=new w,v=new pe,y=new pe,x=new pe;for(let M=0,b=0;M<s.length;M+=9,b+=6){p.set(s[M+0],s[M+1],s[M+2]),_.set(s[M+3],s[M+4],s[M+5]),f.set(s[M+6],s[M+7],s[M+8]),v.set(a[b+0],a[b+1]),y.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),g.copy(p).add(_).add(f).divideScalar(3);let L=u(g);h(v,b+0,p,L),h(y,b+2,_,L),h(x,b+4,f,L)}})(),(function(){for(let p=0;p<a.length;p+=6){let _=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(_,f,g),y=Math.min(_,f,g);v>.9&&y<.1&&(_<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Pe(s,3)),this.setAttribute("normal",new Pe(s.slice(),3)),this.setAttribute("uv",new Pe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},va=class r extends Ni{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},$s=new w,Qs=new w,zo=new w,ea=new vi,_a=class extends ht{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(aa*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:_,b:f,c:g}=ea;if(_.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),ea.getNormal(zo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let y=(v+1)%3,x=u[v],M=u[y],b=ea[h[v]],L=ea[h[y]],O=`${x}_${M}`,D=`${M}_${x}`;D in d&&d[D]?(zo.dot(d[D].normal)<=s&&(m.push(b.x,b.y,b.z),m.push(L.x,L.y,L.z)),d[D]=null):O in d||(d[O]={index0:l[v],index1:l[y],normal:zo.clone()})}}for(let p in d)if(d[p]){let{index0:_,index1:f}=d[p];$s.fromBufferAttribute(o,_),Qs.fromBufferAttribute(o,f),m.push($s.x,$s.y,$s.z),m.push(Qs.x,Qs.y,Qs.z)}this.setAttribute("position",new Pe(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},In=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new pe:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new qe;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(mt(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(mt(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Er=class extends In{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new pe){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ya=class extends Er{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ql(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var ta=new w,Go=new ql,ko=new ql,Vo=new ql,yt=class extends In{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(ta.subVectors(i[0],i[1]).add(i[0]),o=ta);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(ta.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=ta),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);_<1e-4&&(_=1),p<1e-4&&(p=_),f<1e-4&&(f=_),Go.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,_,f),ko.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,_,f),Vo.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,_,f)}else this.curveType==="catmullrom"&&(Go.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),ko.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Vo.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Go.calc(h),ko.calc(h),Vo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Hc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Kr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function $r(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var ms=class extends In{constructor(e=new pe,t=new pe,n=new pe,i=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new pe){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set($r(e,i.x,s.x,a.x,o.x),$r(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xa=class extends In{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set($r(e,i.x,s.x,a.x,o.x),$r(e,i.y,s.y,a.y,o.y),$r(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fs=class extends In{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ma=class extends In{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},gs=class extends In{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Kr(e,i.x,s.x,a.x),Kr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vs=class extends In{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Kr(e,i.x,s.x,a.x),Kr(e,i.y,s.y,a.y),Kr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_s=class extends In{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Hc(o,c.x,l.x,h.x,u.x),Hc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new pe().fromArray(i))}return this}},Sa=Object.freeze({__proto__:null,ArcCurve:ya,CatmullRomCurve3:yt,CubicBezierCurve:ms,CubicBezierCurve3:xa,EllipseCurve:Er,LineCurve:fs,LineCurve3:Ma,QuadraticBezierCurve:gs,QuadraticBezierCurve3:vs,SplineCurve:_s}),Ta=class extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Sa[i.type]().fromJSON(i))}return this}},pn=class extends Ta{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new fs(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new gs(this.currentPoint.clone(),new pe(e,t),new pe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new ms(this.currentPoint.clone(),new pe(e,t),new pe(n,i),new pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new _s(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Er(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Vt=class extends pn{constructor(e){super(e),this.uuid=Qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new pn().fromJSON(i))}return this}};function hd(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Wc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let _=0,f=u.length;_<f;_++){let g=Wc(h,u[_]*m,_<f-1?u[_+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(_d(g))}p.sort(fd);for(let _=0;_<p.length;_++)d=gd(p[_],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return ys(s,a,t,o,c,l,0),a}function Wc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Xc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Xc(a/n|0,r[a],r[a+1],s);return s&&Ar(s,s.next)&&(Ms(s),s=s.next),s}function ji(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Ar(n,n.next)&&kt(n.prev,n,n.next)!==0)n=n.next;else{if(Ms(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ys(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=$o(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,_=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let y=g,x=0;for(let b=0;b<_&&(x++,y=y.nextZ,y);b++);let M=_;for(;x>0||M>0&&y;)x!==0&&(M===0||!y||g.z<=y.z)?(f=g,g=g.nextZ,x--):(f=y,y=y.nextZ,M--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=y}v.nextZ=null,_*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?dd(r,n,i,s):ud(r))e.push(c.i,r.i,l.i),Ms(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?ys(r=pd(ji(r),e),e,t,n,i,s,2):a===2&&md(r,e,t,n,i,s):ys(ji(r),e,t,n,i,s,1);break}}}function ud(r){let e=r.prev,t=r,n=r.next;if(kt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&Jr(i,o,s,c,a,l,p.x,p.y)&&kt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function dd(r,e,t,n){let i=r.prev,s=r,a=r.next;if(kt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),_=Math.max(o,c,l),f=Math.max(h,u,d),g=$o(m,p,e,t,n),v=$o(_,f,e,t,n),y=r.prevZ,x=r.nextZ;for(;y&&y.z>=g&&x&&x.z<=v;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Jr(o,h,c,u,l,d,y.x,y.y)&&kt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=m&&x.x<=_&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&Jr(o,h,c,u,l,d,x.x,x.y)&&kt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=g;){if(y.x>=m&&y.x<=_&&y.y>=p&&y.y<=f&&y!==i&&y!==a&&Jr(o,h,c,u,l,d,y.x,y.y)&&kt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=m&&x.x<=_&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&Jr(o,h,c,u,l,d,x.x,x.y)&&kt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function pd(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Ar(n,i)&&Yh(n,t,t.next,i)&&xs(n,i)&&xs(i,n)&&(e.push(n.i,t.i,i.i),Ms(t),Ms(t.next),t=r=i),t=t.next}while(t!==r);return ji(t)}function md(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&yd(a,o)){let c=Zh(a,o);return a=ji(a,a.next),c=ji(c,c.next),ys(a,e,t,n,i,s,0),void ys(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function fd(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function gd(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Ar(i,a))return a;do{if(Ar(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let _=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(_<=o&&_>h&&(h=_,l=a.x<a.next.x?a:a.next,_===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&qh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let _=Math.abs(c-a.y)/(o-a.x);xs(a,i)&&(_<p||_===p&&(a.x>l.x||a.x===l.x&&vd(l,a)))&&(l=a,p=_)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=Zh(t,r);return ji(n,n.next),ji(t,t.next)}function vd(r,e){return kt(r.prev,r,e.prev)<0&&kt(e.next,r,r.next)<0}function $o(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function _d(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function qh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Jr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&qh(r,e,t,n,i,s,a,o)}function yd(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Yh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(xs(r,e)&&xs(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(kt(r.prev,r,e.prev)||kt(r,e.prev,e))||Ar(r,e)&&kt(r.prev,r,r.next)>0&&kt(e.prev,e,e.next)>0)}function kt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ar(r,e){return r.x===e.x&&r.y===e.y}function Yh(r,e,t,n){let i=ia(kt(r,e,t)),s=ia(kt(r,e,n)),a=ia(kt(t,n,r)),o=ia(kt(t,n,e));return i!==s&&a!==o||!(i!==0||!na(r,t,e))||!(s!==0||!na(r,n,e))||!(a!==0||!na(t,r,n))||!(o!==0||!na(t,e,n))}function na(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ia(r){return r>0?1:r<0?-1:0}function xs(r,e){return kt(r.prev,r,r.next)<0?kt(r,e,r.next)>=0&&kt(r,r.prev,e)>=0:kt(r,e,r.prev)<0||kt(r,r.next,e)<0}function Zh(r,e){let t=Qo(r.i,r.x,r.y),n=Qo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Xc(r,e,t,n){let i=Qo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ms(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Qo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var el=class{static triangulate(e,t,n=2){return hd(e,t,n)}},ti=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];jc(e),qc(n,e);let a=e.length;t.forEach(jc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,qc(n,t[c]);let o=el.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function jc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function qc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Bt=class r extends ht{constructor(e=new Vt([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:xd,y,x,M,b,L,O=!1;g&&(y=g.getSpacedPoints(h),O=!0,d=!1,x=g.computeFrenetFrames(h,!1),M=new w,b=new w,L=new w),d||(f=0,m=0,p=0,_=0);let D=o.extractPoints(l),V=D.shape,I=D.holes;if(!ti.isClockWise(V)){V=V.reverse();for(let z=0,T=I.length;z<T;z++){let P=I[z];ti.isClockWise(P)&&(I[z]=P.reverse())}}function U(z){let T=10000000000000001e-36,P=z[0];for(let k=1;k<=z.length;k++){let N=k%z.length,re=z[N],J=re.x-P.x,$=re.y-P.y,xe=J*J+$*$,Ie=Math.max(Math.abs(re.x),Math.abs(re.y),Math.abs(P.x),Math.abs(P.y));xe<=T*Ie*Ie?(z.splice(N,1),k--):P=re}}U(V),I.forEach(U);let K=I.length,H=V;for(let z=0;z<K;z++){let T=I[z];V=V.concat(T)}function Z(z,T,P){return T||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(T,P)}let ne=V.length;function de(z,T,P){let k,N,re,J=z.x-T.x,$=z.y-T.y,xe=P.x-z.x,Ie=P.y-z.y,Me=J*J+$*$,Ne=J*Ie-$*xe;if(Math.abs(Ne)>Number.EPSILON){let Oe=Math.sqrt(Me),je=Math.sqrt(xe*xe+Ie*Ie),rt=T.x-$/Oe,_e=T.y+J/Oe,Fe=((P.x-Ie/je-rt)*Ie-(P.y+xe/je-_e)*xe)/(J*Ie-$*xe);k=rt+J*Fe-z.x,N=_e+$*Fe-z.y;let ye=k*k+N*N;if(ye<=2)return new pe(k,N);re=Math.sqrt(ye/2)}else{let Oe=!1;J>Number.EPSILON?xe>Number.EPSILON&&(Oe=!0):J<-Number.EPSILON?xe<-Number.EPSILON&&(Oe=!0):Math.sign($)===Math.sign(Ie)&&(Oe=!0),Oe?(k=-$,N=J,re=Math.sqrt(Me)):(k=J,N=$,re=Math.sqrt(Me/2))}return new pe(k/re,N/re)}let le=[];for(let z=0,T=H.length,P=T-1,k=z+1;z<T;z++,P++,k++)P===T&&(P=0),k===T&&(k=0),le[z]=de(H[z],H[P],H[k]);let Te=[],Ae,Q,ge=le.concat();for(let z=0,T=K;z<T;z++){let P=I[z];Ae=[];for(let k=0,N=P.length,re=N-1,J=k+1;k<N;k++,re++,J++)re===N&&(re=0),J===N&&(J=0),Ae[k]=de(P[k],P[re],P[J]);Te.push(Ae),ge=ge.concat(Ae)}if(f===0)Q=ti.triangulateShape(H,I);else{let z=[],T=[];for(let P=0;P<f;P++){let k=P/f,N=m*Math.cos(k*Math.PI/2),re=p*Math.sin(k*Math.PI/2)+_;for(let J=0,$=H.length;J<$;J++){let xe=Z(H[J],le[J],re);q(xe.x,xe.y,-N),k===0&&z.push(xe)}for(let J=0,$=K;J<$;J++){let xe=I[J];Ae=Te[J];let Ie=[];for(let Me=0,Ne=xe.length;Me<Ne;Me++){let Oe=Z(xe[Me],Ae[Me],re);q(Oe.x,Oe.y,-N),k===0&&Ie.push(Oe)}k===0&&T.push(Ie)}}Q=ti.triangulateShape(z,T)}let he=Q.length,fe=p+_;for(let z=0;z<ne;z++){let T=d?Z(V[z],ge[z],fe):V[z];O?(b.copy(x.normals[0]).multiplyScalar(T.x),M.copy(x.binormals[0]).multiplyScalar(T.y),L.copy(y[0]).add(b).add(M),q(L.x,L.y,L.z)):q(T.x,T.y,0)}for(let z=1;z<=h;z++)for(let T=0;T<ne;T++){let P=d?Z(V[T],ge[T],fe):V[T];O?(b.copy(x.normals[z]).multiplyScalar(P.x),M.copy(x.binormals[z]).multiplyScalar(P.y),L.copy(y[z]).add(b).add(M),q(L.x,L.y,L.z)):q(P.x,P.y,u/h*z)}for(let z=f-1;z>=0;z--){let T=z/f,P=m*Math.cos(T*Math.PI/2),k=p*Math.sin(T*Math.PI/2)+_;for(let N=0,re=H.length;N<re;N++){let J=Z(H[N],le[N],k);q(J.x,J.y,u+P)}for(let N=0,re=I.length;N<re;N++){let J=I[N];Ae=Te[N];for(let $=0,xe=J.length;$<xe;$++){let Ie=Z(J[$],Ae[$],k);O?q(Ie.x,Ie.y+y[h-1].y,y[h-1].x+P):q(Ie.x,Ie.y,u+P)}}}function ve(z,T){let P=z.length;for(;--P>=0;){let k=P,N=P-1;N<0&&(N=z.length-1);for(let re=0,J=h+2*f;re<J;re++){let $=ne*re,xe=ne*(re+1);A(T+k+$,T+N+$,T+N+xe,T+k+xe)}}}function q(z,T,P){c.push(z),c.push(T),c.push(P)}function be(z,T,P){E(z),E(T),E(P);let k=i.length/3,N=v.generateTopUV(n,i,k-3,k-2,k-1);X(N[0]),X(N[1]),X(N[2])}function A(z,T,P,k){E(z),E(T),E(k),E(T),E(P),E(k);let N=i.length/3,re=v.generateSideWallUV(n,i,N-6,N-3,N-2,N-1);X(re[0]),X(re[1]),X(re[3]),X(re[1]),X(re[2]),X(re[3])}function E(z){i.push(c[3*z+0]),i.push(c[3*z+1]),i.push(c[3*z+2])}function X(z){s.push(z.x),s.push(z.y)}(function(){let z=i.length/3;if(d){let T=0,P=ne*T;for(let k=0;k<he;k++){let N=Q[k];be(N[2]+P,N[1]+P,N[0]+P)}T=h+2*f,P=ne*T;for(let k=0;k<he;k++){let N=Q[k];be(N[0]+P,N[1]+P,N[2]+P)}}else{for(let T=0;T<he;T++){let P=Q[T];be(P[2],P[1],P[0])}for(let T=0;T<he;T++){let P=Q[T];be(P[0]+ne*h,P[1]+ne*h,P[2]+ne*h)}}n.addGroup(z,i.length/3-z,0)})(),(function(){let z=i.length/3,T=0;ve(H,T),T+=H.length;for(let P=0,k=I.length;P<k;P++){let N=I[P];ve(N,T),T+=N.length}n.addGroup(z,i.length/3-z,1)})()}this.setAttribute("position",new Pe(i,3)),this.setAttribute("uv",new Pe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Sa[i.type]().fromJSON(i)),new r(n,e.options)}},xd={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new pe(s,a),new pe(o,c),new pe(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],_=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new pe(a,1-c),new pe(l,1-u),new pe(d,1-p),new pe(_,1-g)]:[new pe(o,1-c),new pe(h,1-u),new pe(m,1-p),new pe(f,1-g)]}},ba=class r extends Ni{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Si=class r extends ht{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=mt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new pe,m=new w,p=new w,_=new w,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,_.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),c.push(m.x,m.y,m.z),_.copy(p)}for(let v=0;v<=t;v++){let y=n+v*h*i,x=Math.sin(y),M=Math.cos(y);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*M,a.push(u.x,u.y,u.z),d.x=v/t,d.y=b/(e.length-1),o.push(d.x,d.y);let L=c[3*b+0]*x,O=c[3*b+1],D=c[3*b+0]*M;l.push(L,O,D)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let x=y+v*e.length,M=x,b=x+e.length,L=x+e.length+1,O=x+1;s.push(M,b,O),s.push(L,O,b)}this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("uv",new Pe(o,2)),this.setAttribute("normal",new Pe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Cr=class r extends Ni{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Wt=class r extends ht{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],_=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let y=0;y<l;y++){let x=y*u-s;p.push(x,-v,0),_.push(0,0,1),f.push(y/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let y=v+l*g,x=v+l*(g+1),M=v+1+l*(g+1),b=v+1+l*g;m.push(y,x,b),m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(_,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},wa=class r extends ht{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new w,p=new pe;for(let _=0;_<=i;_++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){let f=_*(n+1);for(let g=0;g<n;g++){let v=g+f,y=v,x=v+n+1,M=v+n+2,b=v+1;o.push(y,x,b),o.push(x,M,b)}}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},qi=class r extends ht{constructor(e=new Vt([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;ti.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];ti.isClockWise(v)===!0&&(p[f]=v.reverse())}let _=ti.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=_.length;f<g;f++){let v=_[f],y=v[0]+u,x=v[1]+u,M=v[2]+u;n.push(y,x,M),c+=3}}this.setIndex(n),this.setAttribute("position",new Pe(i,3)),this.setAttribute("normal",new Pe(s,3)),this.setAttribute("uv",new Pe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Xt=class r extends ht{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,m=[],p=[],_=[],f=[];for(let g=0;g<=n;g++){let v=[],y=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let b=M/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),f.push(b+x,1-y),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let y=h[g][v+1],x=h[g][v],M=h[g+1][v],b=h[g+1][v+1];(g!==0||a>0)&&m.push(y,x,b),(g!==n-1||c<Math.PI)&&m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(_,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ea=class r extends Ni{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},St=class r extends ht{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let _=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(_),u.y=(e+t*Math.cos(f))*Math.sin(_),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let _=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(_,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Aa=class r extends ht{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,m=new w,p=new w,_=new w,f=new w,g=new w;for(let y=0;y<=n;++y){let x=y/n*s*Math.PI*2;v(x,s,a,e,m),v(x+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),_.crossVectors(f,g),g.crossVectors(_,f),_.normalize(),g.normalize();for(let M=0;M<=i;++M){let b=M/i*Math.PI*2,L=-t*Math.cos(b),O=t*Math.sin(b);u.x=m.x+(L*g.x+O*_.x),u.y=m.y+(L*g.y+O*_.y),u.z=m.z+(L*g.z+O*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(M/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){let M=(i+1)*(y-1)+(x-1),b=(i+1)*y+(x-1),L=(i+1)*y+x,O=(i+1)*(y-1)+x;o.push(M,b,O),o.push(b,L,O)}function v(y,x,M,b,L){let O=Math.cos(y),D=Math.sin(y),V=M/x*y,I=Math.cos(V);L.x=b*(2+I)*.5*O,L.y=b*(2+I)*D*.5,L.z=b*Math.sin(V)*.5}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},xt=class r extends ht{constructor(e=new vs(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new pe,h=new w,u=[],d=[],m=[],p=[];function _(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let y=0;y<=i;y++){let x=y/i*Math.PI*2,M=Math.sin(x),b=-Math.cos(x);c.x=b*g.x+M*v.x,c.y=b*g.y+M*v.y,c.z=b*g.z+M*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)_(f);_(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),y=(i+1)*f+(g-1),x=(i+1)*f+g,M=(i+1)*(f-1)+g;p.push(v,y,M),p.push(y,x,M)}})()})(),this.setIndex(p),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Sa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Ca=class extends ht{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let _=0;_<3;_++){let f=o.getX(m+_),g=o.getX(m+(_+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),Yc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Yc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Pe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Yc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var Xm=Object.freeze({__proto__:null,BoxGeometry:Ke,CapsuleGeometry:wr,CircleGeometry:zn,ConeGeometry:ga,CylinderGeometry:Xe,DodecahedronGeometry:va,EdgesGeometry:_a,ExtrudeGeometry:Bt,IcosahedronGeometry:ba,LatheGeometry:Si,OctahedronGeometry:Cr,PlaneGeometry:Wt,PolyhedronGeometry:Ni,RingGeometry:wa,ShapeGeometry:qi,SphereGeometry:Xt,TetrahedronGeometry:Ea,TorusGeometry:St,TorusKnotGeometry:Aa,TubeGeometry:xt,WireframeGeometry:Ca}),Ss=class extends Mi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var _t=class extends Mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends _t{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Rr=class extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ra=class extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ra(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function Md(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Yi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Pa=class extends Yi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qo,endingEnd:qo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yo:s=e,o=2*t-n;break;case Zo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Yo:a=e,c=2*n-t;break;case Zo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),_=p*p,f=_*p,g=-d*f+2*d*_-d*p,v=(1+d)*f+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-m)*f+(1.5+m)*_+.5*p,x=m*f-m*_;for(let M=0;M!==o;++M)s[M]=g*a[h+M]+v*a[l+M]+y*a[c+M]+x*a[u+M];return s}},Ia=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},La=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Cn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new La(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Qr:t=this.InterpolantFactoryMethodDiscrete;break;case la:t=this.InterpolantFactoryMethodLinear;break;case sa:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qr;case this.InterpolantFactoryMethodLinear:return la;case this.InterpolantFactoryMethodSmooth:return sa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Md(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===sa,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Cn.prototype.ValueTypeName="",Cn.prototype.TimeBufferType=Float32Array,Cn.prototype.ValueBufferType=Float32Array,Cn.prototype.DefaultInterpolation=la;var Li=class extends Cn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="bool",Li.prototype.ValueBufferType=Array,Li.prototype.DefaultInterpolation=Qr,Li.prototype.InterpolantFactoryMethodLinear=void 0,Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Da=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};Da.prototype.ValueTypeName="color";var Ua=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};Ua.prototype.ValueTypeName="number";var Na=class extends Yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Rn.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ts=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Na(this.times,this.values,this.getValueSize(),e)}};Ts.prototype.ValueTypeName="quaternion",Ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends Cn{constructor(e,t,n){super(e,t,n)}};Di.prototype.ValueTypeName="string",Di.prototype.ValueBufferType=Array,Di.prototype.DefaultInterpolation=Qr,Di.prototype.InterpolantFactoryMethodLinear=void 0,Di.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};Fa.prototype.ValueTypeName="vector";var Ba=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Jh=new Ba,Oa=class{constructor(e){this.manager=e!==void 0?e:Jh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Oa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pr=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ln=class extends Pr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ho=new qe,Zc=new w,Jc=new w,za=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Zc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zc),Jc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jc),t.updateMatrixWorld(),Ho.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ho,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ho)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Kc=new qe,Zr=new w,Wo=new w,tl=class extends za{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Zr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Zr),Wo.copy(n.position),Wo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wo),n.updateMatrixWorld(),i.makeTranslation(-Zr.x,-Zr.y,-Zr.z),Kc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc,n.coordinateSystem,n.reversedDepth)}},Ir=class extends Pr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new tl}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ti=class extends Sr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},nl=class extends za{constructor(){super(new Ti(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wn=class extends Pr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new nl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var jm=new qe,qm=new qe,Ym=new qe;var Ga=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Zm=new w,Jm=new Rn,Km=new w,$m=new w,Qm=new w;var ef=new w,tf=new Rn,nf=new w,rf=new w;var Yl="\\[\\]\\.:\\/",Sd=new RegExp("["+Yl+"]","g"),Xo="[^"+Yl+"]",Td="[^"+Yl.replace("\\.","")+"]",bd=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Xo)+/(WCOD+)?/.source.replace("WCOD",Td)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xo)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xo)+"$"),wd=["material","materials","bones","map"],Ft=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Sd,"")}static parseTrackName(e){let t=bd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);wd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=class{constructor(r,e,t){let n=t||Ft.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray],Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var sf=new Float32Array(1);var af=new qe;var of=new pe;var lf=new w,cf=new w,hf=new w,uf=new w,df=new w,pf=new w,mf=new w;var ff=new w;var gf=new w,vf=new qe,_f=new qe;var yf=new w,xf=new Ye,Mf=new Ye;var Sf=new w,Tf=new w,bf=new w;var wf=new w,Ef=new Sr;var Af=new an;var Cf=new w;function Zl(r,e,t,n){let i=(function(s){switch(s){case ai:case cl:return{byteLength:1,components:1};case Nr:case hl:case Bi:return{byteLength:2,components:1};case Qa:case eo:return{byteLength:2,components:4};case Ki:case $a:case Gn:return{byteLength:4,components:1};case ul:case dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case to:case no:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case kn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function xu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ad(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var pt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ue={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},oi={basic:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ye(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:mn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:mn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:mn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Ye(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:mn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:mn([Ue.points,Ue.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:mn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:mn([Ue.common,Ue.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:mn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:mn([Ue.sprite,Ue.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:mn([Ue.common,Ue.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:mn([Ue.lights,Ue.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};oi.physical={uniforms:mn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var lo={r:0,b:0,g:0},tr=new Yn,Cd=new qe;function Rd(r,e,t,n,i,s,a){let o=new Ye(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function _(f,g){f.getRGB(lo,jl(r)),n.buffers.color.setClear(lo.r,lo.g,lo.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,_(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,_(o,h)},render:function(f){let g=!1,v=p(f);v===null?_(o,h):v&&v.isColor&&(_(v,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===Es)?(l===void 0&&(l=new Je(new Ke(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:er(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),tr.copy(g.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cd.makeRotationFromEuler(tr)),l.material.toneMapped=Mt.getTransfer(v.colorSpace)!==Ct,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Je(new Wt(2,2),new dn({name:"BackgroundMaterial",uniforms:er(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(v.colorSpace)!==Ct,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Pd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],y=[],x=[];for(let M=0;M<t;M++)v[M]=0,y[M]=0,x[M]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:y,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,y=g.length;v<y;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let y=s.newAttributes,x=s.enabledAttributes,M=s.attributeDivisors;y[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),M[g]!==v&&(r.vertexAttribDivisor(g,v),M[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let y=0,x=v.length;y<x;y++)v[y]!==g[y]&&(r.disableVertexAttribArray(y),v[y]=0)}function p(g,v,y,x,M,b,L){L===!0?r.vertexAttribIPointer(g,v,y,M,b):r.vertexAttribPointer(g,v,y,x,M,b)}function _(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,y,x,M){let b=!1,L=(function(O,D,V){let I=V.wireframe===!0,U=n[O.id];U===void 0&&(U={},n[O.id]=U);let K=U[D.id];K===void 0&&(K={},U[D.id]=K);let H=K[I];return H===void 0&&(H=l(r.createVertexArray()),K[I]=H),H})(x,y,v);s!==L&&(s=L,o(s.object)),b=(function(O,D,V,I){let U=s.attributes,K=D.attributes,H=0,Z=V.getAttributes();for(let ne in Z)if(Z[ne].location>=0){let de=U[ne],le=K[ne];if(le===void 0&&(ne==="instanceMatrix"&&O.instanceMatrix&&(le=O.instanceMatrix),ne==="instanceColor"&&O.instanceColor&&(le=O.instanceColor)),de===void 0||de.attribute!==le||le&&de.data!==le.data)return!0;H++}return s.attributesNum!==H||s.index!==I})(g,x,y,M),b&&(function(O,D,V,I){let U={},K=D.attributes,H=0,Z=V.getAttributes();for(let ne in Z)if(Z[ne].location>=0){let de=K[ne];de===void 0&&(ne==="instanceMatrix"&&O.instanceMatrix&&(de=O.instanceMatrix),ne==="instanceColor"&&O.instanceColor&&(de=O.instanceColor));let le={};le.attribute=de,de&&de.data&&(le.data=de.data),U[ne]=le,H++}s.attributes=U,s.attributesNum=H,s.index=I})(g,x,y,M),M!==null&&e.update(M,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,D,V,I){h();let U=I.attributes,K=V.getAttributes(),H=D.defaultAttributeValues;for(let Z in K){let ne=K[Z];if(ne.location>=0){let de=U[Z];if(de===void 0&&(Z==="instanceMatrix"&&O.instanceMatrix&&(de=O.instanceMatrix),Z==="instanceColor"&&O.instanceColor&&(de=O.instanceColor)),de!==void 0){let le=de.normalized,Te=de.itemSize,Ae=e.get(de);if(Ae===void 0)continue;let Q=Ae.buffer,ge=Ae.type,he=Ae.bytesPerElement,fe=ge===r.INT||ge===r.UNSIGNED_INT||de.gpuType===$a;if(de.isInterleavedBufferAttribute){let ve=de.data,q=ve.stride,be=de.offset;if(ve.isInstancedInterleavedBuffer){for(let A=0;A<ne.locationSize;A++)d(ne.location+A,ve.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let A=0;A<ne.locationSize;A++)u(ne.location+A);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let A=0;A<ne.locationSize;A++)p(ne.location+A,Te/ne.locationSize,ge,le,q*he,(be+Te/ne.locationSize*A)*he,fe)}else{if(de.isInstancedBufferAttribute){for(let ve=0;ve<ne.locationSize;ve++)d(ne.location+ve,de.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ve=0;ve<ne.locationSize;ve++)u(ne.location+ve);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let ve=0;ve<ne.locationSize;ve++)p(ne.location+ve,Te/ne.locationSize,ge,le,Te*he,Te/ne.locationSize*ve*he,fe)}}else if(H!==void 0){let le=H[Z];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(ne.location,le);break;case 3:r.vertexAttrib3fv(ne.location,le);break;case 4:r.vertexAttrib4fv(ne.location,le);break;default:r.vertexAttrib1fv(ne.location,le)}}}}m()})(g,v,y,x),M!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(M).buffer))},reset:_,resetDefaultState:f,dispose:function(){_();for(let g in n){let v=n[g];for(let y in v){let x=v[y];for(let M in x)c(x[M].object),delete x[M];delete v[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let y in v){let x=v[y];for(let M in x)c(x[M].object),delete x[M];delete v[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let y=n[v];if(y[g.id]===void 0)continue;let x=y[g.id];for(let M in x)c(x[M].object),delete x[M];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Id(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Ld(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===kn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==ai&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Gn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Dd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new ei,o=new lt,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,_=null;if(p!==0){if(_=c.value,m!==!0||_===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(_===null||_.length<f)&&(_=new Float32Array(f));for(let v=0,y=d;v!==p;++v,y+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(_,y),_[y+3]=a.constant}c.value=_,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,_}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,_=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!_)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,y=f.clippingState||null;c.value=y,y=l(m,u,v,d);for(let x=0;x!==v;++x)y[x]=t[x];f.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Ud(r){let e=new WeakMap;function t(i,s){return s===Za?i.mapping=Ur:s===Ja&&(i.mapping=Zi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Za||s===Ja){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new ma(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Kh=[.125,.215,.35,.446,.526,.582],Ps=20,Jl=new Ti,$h=new Ye,Kl=null,$l=0,Ql=0,ec=!1,ir=(1+Math.sqrt(5))/2,Br=1/ir,Qh=[new w(-ir,Br,0),new w(ir,Br,0),new w(-Br,0,ir),new w(Br,0,ir),new w(0,ir,-Br),new w(0,ir,Br),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Nd=new w,zr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Nd}=s;Kl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),Ql=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kl,$l,Ql),this._renderer.xr.enabled=ec,e.scissorTest=!1,co(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ur||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),Ql=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Bi,format:kn,colorSpace:Hi,depthBuffer:!1},i=eu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eu(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Kh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Kh[d-a+4-1]:d===0&&(p=0),l.push(p);let _=1/(m-2),f=-_,g=1+_,v=[f,f,g,f,g,g,f,f,g,g,f,g],y=6,x=6,M=3,b=2,L=1,O=new Float32Array(M*x*y),D=new Float32Array(b*x*y),V=new Float32Array(L*x*y);for(let U=0;U<y;U++){let K=U%3*2/3-1,H=U>2?0:-1,Z=[K,H,0,K+2/3,H,0,K+2/3,H+1,0,K,H,0,K+2/3,H+1,0,K,H+1,0];O.set(Z,M*x*U),D.set(v,b*x*U);let ne=[U,U,U,U,U,U];V.set(ne,L*x*U)}let I=new ht;I.setAttribute("position",new bn(O,M)),I.setAttribute("uv",new bn(D,b)),I.setAttribute("faceIndex",new bn(V,L)),o.push(I),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(Ps),h=new w(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:hc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new Je(this._lodPlanes[0],e);this._renderer.compile(t,Jl)}_sceneToCubeUV(e,t,n,i,s){let a=new Gt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor($h),l.toneMapping=bi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new On({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),m=new Je(new Ke,d),p=!1,_=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,p=!0):(d.color.copy($h),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;co(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=_}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ur||e.mapping===Zi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=nu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tu());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;co(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Jl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Qh[(i-s-1)%Qh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Je(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,_=isFinite(s)?1+Math.floor(3*p):Ps;_>Ps&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<Ps;++x){let M=x/p,b=Math.exp(-M*M/2);f.push(b),x===0?g+=b:x<_&&(g+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let y=this._sizeLods[i];co(t,3*y*(i>v-4?i-v+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Jl)}};function eu(r,e,t){let n=new Bn(r,e,t);return n.texture.mapping=Es,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function co(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function tu(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function nu(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function hc(){return`

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
	`}function Fd(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Za||s===Ja,o=s===Ur||s===Zi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new zr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new zr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Bd(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&xr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Od(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let _=h.array;d=h.version;for(let f=0,g=_.length;f<g;f+=3){let v=_[f+0],y=_[f+1],x=_[f+2];l.push(v,y,y,x,x,v)}}else{if(u===void 0)return;{let _=u.array;d=u.version;for(let f=0,g=_.length/3-1;f<g;f+=3){let v=f+0,y=f+1,x=f+2;l.push(v,y,y,x,x,v)}}}let m=new(Xl(l)?ss:Xi)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function zd(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function Gd(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function kd(r,e,t){let n=new WeakMap,i=new Tt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let y=a.attributes.position.count*v,x=1;y>e.maxTextureSize&&(x=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*x*4*h),b=new is(M,y,x,h);b.type=Gn,b.needsUpdate=!0;let L=4*v;for(let D=0;D<h;D++){let V=_[D],I=f[D],U=g[D],K=y*x*4*D;for(let H=0;H<V.count;H++){let Z=H*L;d===!0&&(i.fromBufferAttribute(V,H),M[K+Z+0]=i.x,M[K+Z+1]=i.y,M[K+Z+2]=i.z,M[K+Z+3]=0),m===!0&&(i.fromBufferAttribute(I,H),M[K+Z+4]=i.x,M[K+Z+5]=i.y,M[K+Z+6]=i.z,M[K+Z+7]=0),p===!0&&(i.fromBufferAttribute(U,H),M[K+Z+8]=i.x,M[K+Z+9]=i.y,M[K+Z+10]=i.z,M[K+Z+11]=U.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new pe(y,x)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Vd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Mu=new _n,iu=new ds(1,1),Su=new is,Tu=new da,bu=new as,ru=[],su=[],au=new Float32Array(16),ou=new Float32Array(9),lu=new Float32Array(4);function Gr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=ru[i];if(s===void 0&&(s=new Float32Array(i),ru[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Qt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function en(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function uo(r,e){let t=su[e];t===void 0&&(t=new Int32Array(e),su[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Hd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Wd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2fv(this.addr,e),en(t,e)}}function Xd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;r.uniform3fv(this.addr,e),en(t,e)}}function jd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4fv(this.addr,e),en(t,e)}}function qd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;lu.set(n),r.uniformMatrix2fv(this.addr,!1,lu),en(t,n)}}function Yd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;ou.set(n),r.uniformMatrix3fv(this.addr,!1,ou),en(t,n)}}function Zd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,n))return;au.set(n),r.uniformMatrix4fv(this.addr,!1,au),en(t,n)}}function Jd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Kd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2iv(this.addr,e),en(t,e)}}function $d(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3iv(this.addr,e),en(t,e)}}function Qd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4iv(this.addr,e),en(t,e)}}function ep(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tp(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2uiv(this.addr,e),en(t,e)}}function np(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3uiv(this.addr,e),en(t,e)}}function ip(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4uiv(this.addr,e),en(t,e)}}function rp(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(iu.compareFunction=Hl,s=iu):s=Mu,t.setTexture2D(e||s,i)}function sp(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Tu,i)}function ap(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||bu,i)}function op(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Su,i)}function lp(r,e){r.uniform1fv(this.addr,e)}function cp(r,e){let t=Gr(e,this.size,2);r.uniform2fv(this.addr,t)}function hp(r,e){let t=Gr(e,this.size,3);r.uniform3fv(this.addr,t)}function up(r,e){let t=Gr(e,this.size,4);r.uniform4fv(this.addr,t)}function dp(r,e){let t=Gr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pp(r,e){let t=Gr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mp(r,e){let t=Gr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function fp(r,e){r.uniform1iv(this.addr,e)}function gp(r,e){r.uniform2iv(this.addr,e)}function vp(r,e){r.uniform3iv(this.addr,e)}function _p(r,e){r.uniform4iv(this.addr,e)}function yp(r,e){r.uniform1uiv(this.addr,e)}function xp(r,e){r.uniform2uiv(this.addr,e)}function Mp(r,e){r.uniform3uiv(this.addr,e)}function Sp(r,e){r.uniform4uiv(this.addr,e)}function Tp(r,e,t){let n=this.cache,i=e.length,s=uo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Mu,s[a])}function bp(r,e,t){let n=this.cache,i=e.length,s=uo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Tu,s[a])}function wp(r,e,t){let n=this.cache,i=e.length,s=uo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||bu,s[a])}function Ep(r,e,t){let n=this.cache,i=e.length,s=uo(t,i);Qt(n,s)||(r.uniform1iv(this.addr,s),en(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Su,s[a])}var nc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Hd;case 35664:return Wd;case 35665:return Xd;case 35666:return jd;case 35674:return qd;case 35675:return Yd;case 35676:return Zd;case 5124:case 35670:return Jd;case 35667:case 35671:return Kd;case 35668:case 35672:return $d;case 35669:case 35673:return Qd;case 5125:return ep;case 36294:return tp;case 36295:return np;case 36296:return ip;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return sp;case 35680:case 36300:case 36308:case 36293:return ap;case 36289:case 36303:case 36311:case 36292:return op}})(t.type)}},ic=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return lp;case 35664:return cp;case 35665:return hp;case 35666:return up;case 35674:return dp;case 35675:return pp;case 35676:return mp;case 5124:case 35670:return fp;case 35667:case 35671:return gp;case 35668:case 35672:return vp;case 35669:case 35673:return _p;case 5125:return yp;case 36294:return xp;case 36295:return Mp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return Tp;case 35679:case 36299:case 36307:return bp;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Ep}})(t.type)}},rc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},tc=/(\w+)(\])?(\[|\.)?/g;function cu(r,e){r.seq.push(e),r.map[e.id]=e}function Ap(r,e,t){let n=r.name,i=n.length;for(tc.lastIndex=0;;){let s=tc.exec(n),a=tc.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){cu(t,l===void 0?new nc(o,r,e):new ic(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new rc(o),cu(t,h)),t=h}}}var Or=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Ap(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function hu(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Cp=0,uu=new lt;function du(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function Rp(r,e){let t=(function(n){Mt._getMatrix(uu,Mt.workingColorSpace,n);let i=`mat3( ${uu.elements.map(s=>s.toFixed(4))} )`;switch(Mt.getTransfer(n)){case es:return[i,"LinearTransferOETF"];case Ct:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Pp(r,e){let t;switch(e){case Th:t="Linear";break;case bh:t="Reinhard";break;case wh:t="Cineon";break;case si:t="ACESFilmic";break;case Ah:t="AgX";break;case Ch:t="Neutral";break;case Eh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ho=new w;function Ip(){return Mt.getLuminanceCoefficients(ho),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ho.x.toFixed(4)}, ${ho.y.toFixed(4)}, ${ho.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Is(r){return r!==""}function pu(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mu(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Lp=/^[ \t]*#include +<([\w\d./]+)>/gm;function sc(r){return r.replace(Lp,Up)}var Dp=new Map;function Up(r,e){let t=pt[e];if(t===void 0){let n=Dp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return sc(t)}var Np=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(r){return r.replace(Np,Fp)}function Fp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gu(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Bp(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(I){let U="SHADOWMAP_TYPE_BASIC";return I.shadowMapType===rl?U="SHADOWMAP_TYPE_PCF":I.shadowMapType===ka?U="SHADOWMAP_TYPE_PCF_SOFT":I.shadowMapType===ri&&(U="SHADOWMAP_TYPE_VSM"),U})(t),l=(function(I){let U="ENVMAP_TYPE_CUBE";if(I.envMap)switch(I.envMapMode){case Ur:case Zi:U="ENVMAP_TYPE_CUBE";break;case Es:U="ENVMAP_TYPE_CUBE_UV"}return U})(t),h=(function(I){let U="ENVMAP_MODE_REFLECTION";return I.envMap&&I.envMapMode===Zi&&(U="ENVMAP_MODE_REFRACTION"),U})(t),u=(function(I){let U="ENVMAP_BLENDING_NONE";if(I.envMap)switch(I.combine){case xh:U="ENVMAP_BLENDING_MULTIPLY";break;case Mh:U="ENVMAP_BLENDING_MIX";break;case Sh:U="ENVMAP_BLENDING_ADD"}return U})(t),d=(function(I){let U=I.envMapCubeUVHeight;if(U===null)return null;let K=Math.log2(U)-2,H=1/U;return{texelWidth:1/(3*Math.max(Math.pow(2,K),112)),texelHeight:H,maxMip:K}})(t),m=(function(I){return[I.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",I.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Is).join(`
`)})(t),p=(function(I){let U=[];for(let K in I){let H=I[K];H!==!1&&U.push("#define "+K+" "+H)}return U.join(`
`)})(s),_=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Is).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Is).join(`
`),g.length>0&&(g+=`
`)):(f=[gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),g=[gu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?pt.tonemapping_pars_fragment:"",t.toneMapping!==bi?Pp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,Rp("linearToOutputTexel",t.outputColorSpace),Ip(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Is).join(`
`)),a=sc(a),a=pu(a,t),a=mu(a,t),o=sc(o),o=pu(o,t),o=mu(o,t),a=fu(a),o=fu(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=v+f+a,x=v+g+o,M=hu(i,i.VERTEX_SHADER,y),b=hu(i,i.FRAGMENT_SHADER,x);function L(I){if(r.debug.checkShaderErrors){let U=i.getProgramInfoLog(_)||"",K=i.getShaderInfoLog(M)||"",H=i.getShaderInfoLog(b)||"",Z=U.trim(),ne=K.trim(),de=H.trim(),le=!0,Te=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,M,b);else{let Ae=du(i,M,"vertex"),Q=du(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Z+`
`+Ae+`
`+Q)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):ne!==""&&de!==""||(Te=!1);Te&&(I.diagnostics={runnable:le,programLog:Z,vertexShader:{log:ne,prefix:f},fragmentShader:{log:de,prefix:g}})}i.deleteShader(M),i.deleteShader(b),O=new Or(i,_),D=(function(U,K){let H={},Z=U.getProgramParameter(K,U.ACTIVE_ATTRIBUTES);for(let ne=0;ne<Z;ne++){let de=U.getActiveAttrib(K,ne),le=de.name,Te=1;de.type===U.FLOAT_MAT2&&(Te=2),de.type===U.FLOAT_MAT3&&(Te=3),de.type===U.FLOAT_MAT4&&(Te=4),H[le]={type:de.type,location:U.getAttribLocation(K,le),locationSize:Te}}return H})(i,_)}let O,D;i.attachShader(_,M),i.attachShader(_,b),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_),this.getUniforms=function(){return O===void 0&&L(this),O},this.getAttributes=function(){return D===void 0&&L(this),D};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(_,37297)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=b,this}var Op=0,ac=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new oc(e),t.set(e,n)),n}},oc=class{constructor(e){this.id=Op++,this.code=e,this.usedTimes=0}};function zp(r,e,t,n,i,s,a){let o=new rs,c=new ac,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,y,x){let M=y.fog,b=x.geometry,L=f.isMeshStandardMaterial?y.environment:null,O=(f.isMeshStandardMaterial?t:e).get(f.envMap||L),D=O&&O.mapping===Es?O.image.height:null,V=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let I=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,U=I!==void 0?I.length:0,K,H,Z,ne,de=0;if(b.morphAttributes.position!==void 0&&(de=1),b.morphAttributes.normal!==void 0&&(de=2),b.morphAttributes.color!==void 0&&(de=3),V){let Ht=oi[V];K=Ht.vertexShader,H=Ht.fragmentShader}else K=f.vertexShader,H=f.fragmentShader,c.update(f),Z=c.getVertexShaderID(f),ne=c.getFragmentShaderID(f);let le=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),Ae=x.isInstancedMesh===!0,Q=x.isBatchedMesh===!0,ge=!!f.map,he=!!f.matcap,fe=!!O,ve=!!f.aoMap,q=!!f.lightMap,be=!!f.bumpMap,A=!!f.normalMap,E=!!f.displacementMap,X=!!f.emissiveMap,z=!!f.metalnessMap,T=!!f.roughnessMap,P=f.anisotropy>0,k=f.clearcoat>0,N=f.dispersion>0,re=f.iridescence>0,J=f.sheen>0,$=f.transmission>0,xe=P&&!!f.anisotropyMap,Ie=k&&!!f.clearcoatMap,Me=k&&!!f.clearcoatNormalMap,Ne=k&&!!f.clearcoatRoughnessMap,Oe=re&&!!f.iridescenceMap,je=re&&!!f.iridescenceThicknessMap,rt=J&&!!f.sheenColorMap,_e=J&&!!f.sheenRoughnessMap,Fe=!!f.specularMap,ye=!!f.specularColorMap,Le=!!f.specularIntensityMap,ze=$&&!!f.transmissionMap,gt=$&&!!f.thicknessMap,we=!!f.gradientMap,st=!!f.alphaMap,it=f.alphaTest>0,tn=!!f.alphaHash,on=!!f.extensions,W=bi;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(W=r.toneMapping));let It={shaderID:V,shaderType:f.type,shaderName:f.name,vertexShader:K,fragmentShader:H,defines:f.defines,customVertexShaderID:Z,customFragmentShaderID:ne,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:Q,batchingColor:Q&&x._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&x.instanceColor!==null,instancingMorph:Ae&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Hi,alphaToCoverage:!!f.alphaToCoverage,map:ge,matcap:he,envMap:fe,envMapMode:fe&&O.mapping,envMapCubeUVHeight:D,aoMap:ve,lightMap:q,bumpMap:be,normalMap:A,displacementMap:d&&E,emissiveMap:X,normalMapObjectSpace:A&&f.normalMapType===Nh,normalMapTangentSpace:A&&f.normalMapType===Uh,metalnessMap:z,roughnessMap:T,anisotropy:P,anisotropyMap:xe,clearcoat:k,clearcoatMap:Ie,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ne,dispersion:N,iridescence:re,iridescenceMap:Oe,iridescenceThicknessMap:je,sheen:J,sheenColorMap:rt,sheenRoughnessMap:_e,specularMap:Fe,specularColorMap:ye,specularIntensityMap:Le,transmission:$,transmissionMap:ze,thicknessMap:gt,gradientMap:we,opaque:f.transparent===!1&&f.blending===bs&&f.alphaToCoverage===!1,alphaMap:st,alphaTest:it,alphaHash:tn,combine:f.combine,mapUv:ge&&_(f.map.channel),aoMapUv:ve&&_(f.aoMap.channel),lightMapUv:q&&_(f.lightMap.channel),bumpMapUv:be&&_(f.bumpMap.channel),normalMapUv:A&&_(f.normalMap.channel),displacementMapUv:E&&_(f.displacementMap.channel),emissiveMapUv:X&&_(f.emissiveMap.channel),metalnessMapUv:z&&_(f.metalnessMap.channel),roughnessMapUv:T&&_(f.roughnessMap.channel),anisotropyMapUv:xe&&_(f.anisotropyMap.channel),clearcoatMapUv:Ie&&_(f.clearcoatMap.channel),clearcoatNormalMapUv:Me&&_(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&_(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&_(f.iridescenceMap.channel),iridescenceThicknessMapUv:je&&_(f.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&_(f.sheenColorMap.channel),sheenRoughnessMapUv:_e&&_(f.sheenRoughnessMap.channel),specularMapUv:Fe&&_(f.specularMap.channel),specularColorMapUv:ye&&_(f.specularColorMap.channel),specularIntensityMapUv:Le&&_(f.specularIntensityMap.channel),transmissionMapUv:ze&&_(f.transmissionMap.channel),thicknessMapUv:gt&&_(f.thicknessMap.channel),alphaMapUv:st&&_(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||P),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(ge||st),fog:!!M,useFog:f.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:de,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:W,decodeVideoTexture:ge&&f.map.isVideoTexture===!0&&Mt.getTransfer(f.map.colorSpace)===Ct,decodeVideoTextureEmissive:X&&f.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(f.emissiveMap.colorSpace)===Ct,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ot,flipSided:f.side===Dn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:on&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(on&&f.extensions.multiDraw===!0||Q)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)})(g,f),(function(v,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let y=oi[g];v=jh.clone(y.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let y=0,x=h.length;y<x;y++){let M=h[y];if(M.cacheKey===g){v=M,++v.usedTimes;break}}return v===void 0&&(v=new Bp(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function Gp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function kp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function vu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function _u(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||kp),n.length>1&&n.sort(o||vu),i.length>1&&i.sort(o||vu)}}}function Vp(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new _u,r.set(e,[i])):t>=n.length?(i=new _u,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Hp(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ye};break;case"SpotLight":t={position:new w,direction:new w,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var Wp=0;function Xp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function jp(r){let e=new Hp,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new qe,a=new qe;return{setup:function(o){let c=0,l=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,d=0,m=0,p=0,_=0,f=0,g=0,v=0,y=0,x=0,M=0;o.sort(Xp);for(let L=0,O=o.length;L<O;L++){let D=o[L],V=D.color,I=D.intensity,U=D.distance,K=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=V.r*I,l+=V.g*I,h+=V.b*I;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],I);M++}else if(D.isDirectionalLight){let H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Z=D.shadow,ne=t.get(D);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,n.directionalShadow[u]=ne,n.directionalShadowMap[u]=K,n.directionalShadowMatrix[u]=D.shadow.matrix,f++}n.directional[u]=H,u++}else if(D.isSpotLight){let H=e.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(V).multiplyScalar(I),H.distance=U,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[m]=H;let Z=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,Z.updateMatrices(D),D.castShadow&&x++),n.spotLightMatrix[m]=Z.matrix,D.castShadow){let ne=t.get(D);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,n.spotShadow[m]=ne,n.spotShadowMap[m]=K,v++}m++}else if(D.isRectAreaLight){let H=e.get(D);H.color.copy(V).multiplyScalar(I),H.halfWidth.set(.5*D.width,0,0),H.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=H,p++}else if(D.isPointLight){let H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){let Z=D.shadow,ne=t.get(D);ne.shadowIntensity=Z.intensity,ne.shadowBias=Z.bias,ne.shadowNormalBias=Z.normalBias,ne.shadowRadius=Z.radius,ne.shadowMapSize=Z.mapSize,ne.shadowCameraNear=Z.camera.near,ne.shadowCameraFar=Z.camera.far,n.pointShadow[d]=ne,n.pointShadowMap[d]=K,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=H,d++}else if(D.isHemisphereLight){let H=e.get(D);H.skyColor.copy(D.color).multiplyScalar(I),H.groundColor.copy(D.groundColor).multiplyScalar(I),n.hemi[_]=H,_++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===m&&b.rectAreaLength===p&&b.hemiLength===_&&b.numDirectionalShadows===f&&b.numPointShadows===g&&b.numSpotShadows===v&&b.numSpotMaps===y&&b.numLightProbes===M||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=_,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+y-x,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=M,b.directionalLength=u,b.pointLength=d,b.spotLength=m,b.rectAreaLength=p,b.hemiLength=_,b.numDirectionalShadows=f,b.numPointShadows=g,b.numSpotShadows=v,b.numSpotMaps=y,b.numLightProbes=M,n.version=Wp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let _=0,f=o.length;_<f;_++){let g=o[_];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function yu(r){let e=new jp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function qp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new yu(r),e.set(t,[s])):n>=i.length?(s=new yu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Yp(r,e,t){let n=new Ui,i=new pe,s=new pe,a=new Tt,o=new Rr({depthPacking:oo}),c=new Ra,l={},h=t.maxTextureSize,u={[Lr]:Dn,[Dn]:Lr,[Ot]:Ot},d=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new ht;p.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Je(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rl;let g=this.type;function v(b,L){let O=e.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Bn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(L,null,O,d,_,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(L,null,O,m,_,null)}function y(b,L,O,D){let V=null,I=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)V=I;else if(V=O.isPointLight===!0?c:o,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let U=V.uuid,K=L.uuid,H=l[U];H===void 0&&(H={},l[U]=H);let Z=H[K];Z===void 0&&(Z=V.clone(),H[K]=Z,L.addEventListener("dispose",M)),V=Z}return V.visible=L.visible,V.wireframe=L.wireframe,V.side=D===ri?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:u[L.side],V.alphaMap=L.alphaMap,V.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,V.map=L.map,V.clipShadows=L.clipShadows,V.clippingPlanes=L.clippingPlanes,V.clipIntersection=L.clipIntersection,V.displacementMap=L.displacementMap,V.displacementScale=L.displacementScale,V.displacementBias=L.displacementBias,V.wireframeLinewidth=L.wireframeLinewidth,V.linewidth=L.linewidth,O.isPointLight===!0&&V.isMeshDistanceMaterial===!0&&(r.properties.get(V).light=O),V}function x(b,L,O,D,V){if(b.visible===!1)return;if(b.layers.test(L.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&V===ri)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let U=e.update(b),K=b.material;if(Array.isArray(K)){let H=U.groups;for(let Z=0,ne=H.length;Z<ne;Z++){let de=H[Z],le=K[de.materialIndex];if(le&&le.visible){let Te=y(b,le,D,V);b.onBeforeShadow(r,b,L,O,U,Te,de),r.renderBufferDirect(O,null,U,Te,b,de),b.onAfterShadow(r,b,L,O,U,Te,de)}}}else if(K.visible){let H=y(b,K,D,V);b.onBeforeShadow(r,b,L,O,U,H,null),r.renderBufferDirect(O,null,U,H,b,null),b.onAfterShadow(r,b,L,O,U,H,null)}}let I=b.children;for(let U=0,K=I.length;U<K;U++)x(I[U],L,O,D,V)}function M(b){b.target.removeEventListener("dispose",M);for(let L in l){let O=l[L],D=b.target.uuid;D in O&&(O[D].dispose(),delete O[D])}}this.render=function(b,L,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let D=r.getRenderTarget(),V=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Fi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let K=g!==ri&&this.type===ri,H=g===ri&&this.type!==ri;for(let Z=0,ne=b.length;Z<ne;Z++){let de=b[Z],le=de.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",de,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let Te=le.getFrameExtents();if(i.multiply(Te),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Te.x),i.x=s.x*Te.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Te.y),i.y=s.y*Te.y,le.mapSize.y=s.y)),le.map===null||K===!0||H===!0){let Q=this.type!==ri?{minFilter:ni,magFilter:ni}:{};le.map!==null&&le.map.dispose(),le.map=new Bn(i.x,i.y,Q),le.map.texture.name=de.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let Ae=le.getViewportCount();for(let Q=0;Q<Ae;Q++){let ge=le.getViewport(Q);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),U.viewport(a),le.updateMatrices(de,Q),n=le.getFrustum(),x(L,O,le.camera,de,this.type)}le.isPointLightShadow!==!0&&this.type===ri&&v(le,O),le.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(D,V,I)}}var Zp={[Va]:Ha,[Wa]:qa,[Xa]:Ya,[ws]:ja,[Ha]:Va,[qa]:Wa,[Ya]:Xa,[ja]:ws};function Jp(r,e){let t=new function(){let T=!1,P=new Tt,k=null,N=new Tt(0,0,0,0);return{setMask:function(re){k===re||T||(r.colorMask(re,re,re,re),k=re)},setLocked:function(re){T=re},setClear:function(re,J,$,xe,Ie){Ie===!0&&(re*=xe,J*=xe,$*=xe),P.set(re,J,$,xe),N.equals(P)===!1&&(r.clearColor(re,J,$,xe),N.copy(P))},reset:function(){T=!1,k=null,N.set(-1,0,0,0)}}},n=new function(){let T=!1,P=!1,k=null,N=null,re=null;return{setReversed:function(J){if(P!==J){let $=e.get("EXT_clip_control");J?$.clipControlEXT($.LOWER_LEFT_EXT,$.ZERO_TO_ONE_EXT):$.clipControlEXT($.LOWER_LEFT_EXT,$.NEGATIVE_ONE_TO_ONE_EXT),P=J;let xe=re;re=null,this.setClear(xe)}},getReversed:function(){return P},setTest:function(J){J?fe(r.DEPTH_TEST):ve(r.DEPTH_TEST)},setMask:function(J){k===J||T||(r.depthMask(J),k=J)},setFunc:function(J){if(P&&(J=Zp[J]),N!==J){switch(J){case Va:r.depthFunc(r.NEVER);break;case Ha:r.depthFunc(r.ALWAYS);break;case Wa:r.depthFunc(r.LESS);break;case ws:r.depthFunc(r.LEQUAL);break;case Xa:r.depthFunc(r.EQUAL);break;case ja:r.depthFunc(r.GEQUAL);break;case qa:r.depthFunc(r.GREATER);break;case Ya:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}N=J}},setLocked:function(J){T=J},setClear:function(J){re!==J&&(P&&(J=1-J),r.clearDepth(J),re=J)},reset:function(){T=!1,k=null,N=null,re=null,P=!1}}},i=new function(){let T=!1,P=null,k=null,N=null,re=null,J=null,$=null,xe=null,Ie=null;return{setTest:function(Me){T||(Me?fe(r.STENCIL_TEST):ve(r.STENCIL_TEST))},setMask:function(Me){P===Me||T||(r.stencilMask(Me),P=Me)},setFunc:function(Me,Ne,Oe){k===Me&&N===Ne&&re===Oe||(r.stencilFunc(Me,Ne,Oe),k=Me,N=Ne,re=Oe)},setOp:function(Me,Ne,Oe){J===Me&&$===Ne&&xe===Oe||(r.stencilOp(Me,Ne,Oe),J=Me,$=Ne,xe=Oe)},setLocked:function(Me){T=Me},setClear:function(Me){Ie!==Me&&(r.clearStencil(Me),Ie=Me)},reset:function(){T=!1,P=null,k=null,N=null,re=null,J=null,$=null,xe=null,Ie=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,x=new Ye(0,0,0),M=0,b=!1,L=null,O=null,D=null,V=null,I=null,U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,H=0,Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(Z)[1]),K=H>=1):Z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),K=H>=2);let ne=null,de={},le=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),Ae=new Tt().fromArray(le),Q=new Tt().fromArray(Te);function ge(T,P,k,N){let re=new Uint8Array(4),J=r.createTexture();r.bindTexture(T,J),r.texParameteri(T,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(T,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $=0;$<k;$++)T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,N,0,r.RGBA,r.UNSIGNED_BYTE,re):r.texImage2D(P+$,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,re);return J}let he={};function fe(T){o[T]!==!0&&(r.enable(T),o[T]=!0)}function ve(T){o[T]!==!1&&(r.disable(T),o[T]=!1)}he[r.TEXTURE_2D]=ge(r.TEXTURE_2D,r.TEXTURE_2D,1),he[r.TEXTURE_CUBE_MAP]=ge(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[r.TEXTURE_2D_ARRAY]=ge(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),he[r.TEXTURE_3D]=ge(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),fe(r.DEPTH_TEST),n.setFunc(ws),E(!1),X(il),fe(r.CULL_FACE),A(Fi);let q={[Dr]:r.FUNC_ADD,[th]:r.FUNC_SUBTRACT,[nh]:r.FUNC_REVERSE_SUBTRACT};q[ih]=r.MIN,q[rh]=r.MAX;let be={[sh]:r.ZERO,[ah]:r.ONE,[oh]:r.SRC_COLOR,[ch]:r.SRC_ALPHA,[fh]:r.SRC_ALPHA_SATURATE,[ph]:r.DST_COLOR,[uh]:r.DST_ALPHA,[lh]:r.ONE_MINUS_SRC_COLOR,[hh]:r.ONE_MINUS_SRC_ALPHA,[mh]:r.ONE_MINUS_DST_COLOR,[dh]:r.ONE_MINUS_DST_ALPHA,[gh]:r.CONSTANT_COLOR,[vh]:r.ONE_MINUS_CONSTANT_COLOR,[_h]:r.CONSTANT_ALPHA,[yh]:r.ONE_MINUS_CONSTANT_ALPHA};function A(T,P,k,N,re,J,$,xe,Ie,Me){if(T!==Fi){if(d===!1&&(fe(r.BLEND),d=!0),T===eh)re=re||P,J=J||k,$=$||N,P===p&&re===g||(r.blendEquationSeparate(q[P],q[re]),p=P,g=re),k===_&&N===f&&J===v&&$===y||(r.blendFuncSeparate(be[k],be[N],be[J],be[$]),_=k,f=N,v=J,y=$),xe.equals(x)!==!1&&Ie===M||(r.blendColor(xe.r,xe.g,xe.b,Ie),x.copy(xe),M=Ie),m=T,b=!1;else if(T!==m||Me!==b){if(p===Dr&&g===Dr||(r.blendEquation(r.FUNC_ADD),p=Dr,g=Dr),Me)switch(T){case bs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case sl:r.blendFunc(r.ONE,r.ONE);break;case al:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ol:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}else switch(T){case bs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case sl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case al:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ol:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",T)}_=null,f=null,v=null,y=null,x.set(0,0,0),M=0,m=T,b=Me}}else d===!0&&(ve(r.BLEND),d=!1)}function E(T){L!==T&&(T?r.frontFace(r.CW):r.frontFace(r.CCW),L=T)}function X(T){T!==$c?(fe(r.CULL_FACE),T!==O&&(T===il?r.cullFace(r.BACK):T===Qc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ve(r.CULL_FACE),O=T}function z(T,P,k){T?(fe(r.POLYGON_OFFSET_FILL),V===P&&I===k||(r.polygonOffset(P,k),V=P,I=k)):ve(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:fe,disable:ve,bindFramebuffer:function(T,P){return c[T]!==P&&(r.bindFramebuffer(T,P),c[T]=P,T===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),T===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(T,P){let k=h,N=!1;if(T){k=l.get(P),k===void 0&&(k=[],l.set(P,k));let re=T.textures;if(k.length!==re.length||k[0]!==r.COLOR_ATTACHMENT0){for(let J=0,$=re.length;J<$;J++)k[J]=r.COLOR_ATTACHMENT0+J;k.length=re.length,N=!0}}else k[0]!==r.BACK&&(k[0]=r.BACK,N=!0);N&&r.drawBuffers(k)},useProgram:function(T){return u!==T&&(r.useProgram(T),u=T,!0)},setBlending:A,setMaterial:function(T,P){T.side===Ot?ve(r.CULL_FACE):fe(r.CULL_FACE);let k=T.side===Dn;P&&(k=!k),E(k),T.blending===bs&&T.transparent===!1?A(Fi):A(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),n.setFunc(T.depthFunc),n.setTest(T.depthTest),n.setMask(T.depthWrite),t.setMask(T.colorWrite);let N=T.stencilWrite;i.setTest(N),N&&(i.setMask(T.stencilWriteMask),i.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),i.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),z(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?fe(r.SAMPLE_ALPHA_TO_COVERAGE):ve(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:X,setLineWidth:function(T){T!==D&&(K&&r.lineWidth(T),D=T)},setPolygonOffset:z,setScissorTest:function(T){T?fe(r.SCISSOR_TEST):ve(r.SCISSOR_TEST)},activeTexture:function(T){T===void 0&&(T=r.TEXTURE0+U-1),ne!==T&&(r.activeTexture(T),ne=T)},bindTexture:function(T,P,k){k===void 0&&(k=ne===null?r.TEXTURE0+U-1:ne);let N=de[k];N===void 0&&(N={type:void 0,texture:void 0},de[k]=N),N.type===T&&N.texture===P||(ne!==k&&(r.activeTexture(k),ne=k),r.bindTexture(T,P||he[T]),N.type=T,N.texture=P)},unbindTexture:function(){let T=de[ne];T!==void 0&&T.type!==void 0&&(r.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},updateUBOMapping:function(T,P){let k=a.get(P);k===void 0&&(k=new WeakMap,a.set(P,k));let N=k.get(T);N===void 0&&(N=r.getUniformBlockIndex(P,T.name),k.set(T,N))},uniformBlockBinding:function(T,P){let k=a.get(P).get(T);s.get(P)!==k&&(r.uniformBlockBinding(P,k,T.__bindingPointIndex),s.set(P,k))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}},scissor:function(T){Ae.equals(T)===!1&&(r.scissor(T.x,T.y,T.z,T.w),Ae.copy(T))},viewport:function(T){Q.equals(T)===!1&&(r.viewport(T.x,T.y,T.z,T.w),Q.copy(T))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ne=null,de={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,_=null,f=null,g=null,v=null,y=null,x=new Ye(0,0,0),M=0,b=!1,L=null,O=null,D=null,V=null,I=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Q.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Kp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new pe,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return m?new OffscreenCanvas(A,E):ns("canvas")}function _(A,E,X){let z=1,T=be(A);if((T.width>X||T.height>X)&&(z=X/Math.max(T.width,T.height)),z<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let P=Math.floor(z*T.width),k=Math.floor(z*T.height);u===void 0&&(u=p(P,k));let N=E?p(P,k):u;return N.width=P,N.height=k,N.getContext("2d").drawImage(A,0,0,P,k),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+P+"x"+k+")."),N}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,E,X,z,T=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let P=E;if(E===r.RED&&(X===r.FLOAT&&(P=r.R32F),X===r.HALF_FLOAT&&(P=r.R16F),X===r.UNSIGNED_BYTE&&(P=r.R8)),E===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(P=r.R8UI),X===r.UNSIGNED_SHORT&&(P=r.R16UI),X===r.UNSIGNED_INT&&(P=r.R32UI),X===r.BYTE&&(P=r.R8I),X===r.SHORT&&(P=r.R16I),X===r.INT&&(P=r.R32I)),E===r.RG&&(X===r.FLOAT&&(P=r.RG32F),X===r.HALF_FLOAT&&(P=r.RG16F),X===r.UNSIGNED_BYTE&&(P=r.RG8)),E===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(P=r.RG8UI),X===r.UNSIGNED_SHORT&&(P=r.RG16UI),X===r.UNSIGNED_INT&&(P=r.RG32UI),X===r.BYTE&&(P=r.RG8I),X===r.SHORT&&(P=r.RG16I),X===r.INT&&(P=r.RG32I)),E===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(P=r.RGB8UI),X===r.UNSIGNED_SHORT&&(P=r.RGB16UI),X===r.UNSIGNED_INT&&(P=r.RGB32UI),X===r.BYTE&&(P=r.RGB8I),X===r.SHORT&&(P=r.RGB16I),X===r.INT&&(P=r.RGB32I)),E===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),X===r.UNSIGNED_INT&&(P=r.RGBA32UI),X===r.BYTE&&(P=r.RGBA8I),X===r.SHORT&&(P=r.RGBA16I),X===r.INT&&(P=r.RGBA32I)),E===r.RGB&&(X===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),E===r.RGBA){let k=T?es:Mt.getTransfer(z);X===r.FLOAT&&(P=r.RGBA32F),X===r.HALF_FLOAT&&(P=r.RGBA16F),X===r.UNSIGNED_BYTE&&(P=k===Ct?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function x(A,E){let X;return A?E===null||E===Ki||E===Fr?X=r.DEPTH24_STENCIL8:E===Gn?X=r.DEPTH32F_STENCIL8:E===Nr&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ki||E===Fr?X=r.DEPTH_COMPONENT24:E===Gn?X=r.DEPTH_COMPONENT32F:E===Nr&&(X=r.DEPTH_COMPONENT16),X}function M(A,E){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==ni&&A.minFilter!==ii?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){let E=A.target;E.removeEventListener("dispose",b),(function(X){let z=n.get(X);if(z.__webglInit===void 0)return;let T=X.source,P=d.get(T);if(P){let k=P[z.__cacheKey];k.usedTimes--,k.usedTimes===0&&O(X),Object.keys(P).length===0&&d.delete(T)}n.remove(X)})(E),E.isVideoTexture&&h.delete(E)}function L(A){let E=A.target;E.removeEventListener("dispose",L),(function(X){let z=n.get(X);if(X.depthTexture&&(X.depthTexture.dispose(),n.remove(X.depthTexture)),X.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(z.__webglFramebuffer[P]))for(let k=0;k<z.__webglFramebuffer[P].length;k++)r.deleteFramebuffer(z.__webglFramebuffer[P][k]);else r.deleteFramebuffer(z.__webglFramebuffer[P]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[P])}else{if(Array.isArray(z.__webglFramebuffer))for(let P=0;P<z.__webglFramebuffer.length;P++)r.deleteFramebuffer(z.__webglFramebuffer[P]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let P=0;P<z.__webglColorRenderbuffer.length;P++)z.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[P]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let T=X.textures;for(let P=0,k=T.length;P<k;P++){let N=n.get(T[P]);N.__webglTexture&&(r.deleteTexture(N.__webglTexture),a.memory.textures--),n.remove(T[P])}n.remove(X)})(E)}function O(A){let E=n.get(A);r.deleteTexture(E.__webglTexture);let X=A.source;delete d.get(X)[E.__cacheKey],a.memory.textures--}let D=0;function V(A,E){let X=n.get(A);if(A.isVideoTexture&&(function(z){let T=a.render.frame;h.get(z)!==T&&(h.set(z,T),z.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){let z=A.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(z.complete!==!1)return void de(X,A,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+E)}let I={[qn]:r.REPEAT,[yr]:r.CLAMP_TO_EDGE,[oa]:r.MIRRORED_REPEAT},U={[ni]:r.NEAREST,[Ph]:r.NEAREST_MIPMAP_NEAREST,[As]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[Ka]:r.LINEAR_MIPMAP_NEAREST,[Ji]:r.LINEAR_MIPMAP_LINEAR},K={[Fh]:r.NEVER,[Vh]:r.ALWAYS,[Bh]:r.LESS,[Hl]:r.LEQUAL,[Oh]:r.EQUAL,[kh]:r.GEQUAL,[zh]:r.GREATER,[Gh]:r.NOTEQUAL};function H(A,E){if(E.type!==Gn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ii&&E.magFilter!==Ka&&E.magFilter!==As&&E.magFilter!==Ji&&E.minFilter!==ii&&E.minFilter!==Ka&&E.minFilter!==As&&E.minFilter!==Ji||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,I[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,I[E.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,I[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,U[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,U[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,K[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ni||E.minFilter!==As&&E.minFilter!==Ji||E.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Z(A,E){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));let z=E.source,T=d.get(z);T===void 0&&(T={},d.set(z,T));let P=(function(k){let N=[];return N.push(k.wrapS),N.push(k.wrapT),N.push(k.wrapR||0),N.push(k.magFilter),N.push(k.minFilter),N.push(k.anisotropy),N.push(k.internalFormat),N.push(k.format),N.push(k.type),N.push(k.generateMipmaps),N.push(k.premultiplyAlpha),N.push(k.flipY),N.push(k.unpackAlignment),N.push(k.colorSpace),N.join()})(E);if(P!==A.__cacheKey){T[P]===void 0&&(T[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),T[P].usedTimes++;let k=T[A.__cacheKey];k!==void 0&&(T[A.__cacheKey].usedTimes--,k.usedTimes===0&&O(E)),A.__cacheKey=P,A.__webglTexture=T[P].texture}return X}function ne(A,E,X){return Math.floor(Math.floor(A/X)/E)}function de(A,E,X){let z=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(z=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(z=r.TEXTURE_3D);let T=Z(A,E),P=E.source;t.bindTexture(z,A.__webglTexture,r.TEXTURE0+X);let k=n.get(P);if(P.version!==k.__version||T===!0){t.activeTexture(r.TEXTURE0+X);let N=Mt.getPrimaries(Mt.workingColorSpace),re=E.colorSpace===$i?null:Mt.getPrimaries(E.colorSpace),J=E.colorSpace===$i||N===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let $=_(E.image,!1,i.maxTextureSize);$=q(E,$);let xe=s.convert(E.format,E.colorSpace),Ie=s.convert(E.type),Me,Ne=y(E.internalFormat,xe,Ie,E.colorSpace,E.isVideoTexture);H(z,E);let Oe=E.mipmaps,je=E.isVideoTexture!==!0,rt=k.__version===void 0||T===!0,_e=P.dataReady,Fe=M(E,$);if(E.isDepthTexture)Ne=x(E.format===Rs,E.type),rt&&(je?t.texStorage2D(r.TEXTURE_2D,1,Ne,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,Ne,$.width,$.height,0,xe,Ie,null));else if(E.isDataTexture)if(Oe.length>0){je&&rt&&t.texStorage2D(r.TEXTURE_2D,Fe,Ne,Oe[0].width,Oe[0].height);for(let ye=0,Le=Oe.length;ye<Le;ye++)Me=Oe[ye],je?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Ie,Me.data):t.texImage2D(r.TEXTURE_2D,ye,Ne,Me.width,Me.height,0,xe,Ie,Me.data);E.generateMipmaps=!1}else je?(rt&&t.texStorage2D(r.TEXTURE_2D,Fe,Ne,$.width,$.height),_e&&(function(ye,Le,ze,gt){let we=ye.updateRanges;if(we.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Le.width,Le.height,ze,gt,Le.data);else{we.sort((W,It)=>W.start-It.start);let st=0;for(let W=1;W<we.length;W++){let It=we[st],Ht=we[W],At=It.start+It.count,Pt=ne(Ht.start,Le.width,4),Dt=ne(It.start,Le.width,4);Ht.start<=At+1&&Pt===Dt&&ne(Ht.start+Ht.count-1,Le.width,4)===Pt?It.count=Math.max(It.count,Ht.start+Ht.count-It.start):(++st,we[st]=Ht)}we.length=st+1;let it=r.getParameter(r.UNPACK_ROW_LENGTH),tn=r.getParameter(r.UNPACK_SKIP_PIXELS),on=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Le.width);for(let W=0,It=we.length;W<It;W++){let Ht=we[W],At=Math.floor(Ht.start/4),Pt=Math.ceil(Ht.count/4),Dt=At%Le.width,ci=Math.floor(At/Le.width),bt=Pt;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Dt),r.pixelStorei(r.UNPACK_SKIP_ROWS,ci),t.texSubImage2D(r.TEXTURE_2D,0,Dt,ci,bt,1,ze,gt,Le.data)}ye.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,it),r.pixelStorei(r.UNPACK_SKIP_PIXELS,tn),r.pixelStorei(r.UNPACK_SKIP_ROWS,on)}})(E,$,xe,Ie)):t.texImage2D(r.TEXTURE_2D,0,Ne,$.width,$.height,0,xe,Ie,$.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){je&&rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Fe,Ne,Oe[0].width,Oe[0].height,$.depth);for(let ye=0,Le=Oe.length;ye<Le;ye++)if(Me=Oe[ye],E.format!==kn)if(xe!==null)if(je){if(_e)if(E.layerUpdates.size>0){let ze=Zl(Me.width,Me.height,E.format,E.type);for(let gt of E.layerUpdates){let we=Me.data.subarray(gt*ze/Me.data.BYTES_PER_ELEMENT,(gt+1)*ze/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,gt,Me.width,Me.height,1,xe,we)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,Me.width,Me.height,$.depth,xe,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ye,Ne,Me.width,Me.height,$.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?_e&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ye,0,0,0,Me.width,Me.height,$.depth,xe,Ie,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ye,Ne,Me.width,Me.height,$.depth,0,xe,Ie,Me.data)}else{je&&rt&&t.texStorage2D(r.TEXTURE_2D,Fe,Ne,Oe[0].width,Oe[0].height);for(let ye=0,Le=Oe.length;ye<Le;ye++)Me=Oe[ye],E.format!==kn?xe!==null?je?_e&&t.compressedTexSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,ye,Ne,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,Me.width,Me.height,xe,Ie,Me.data):t.texImage2D(r.TEXTURE_2D,ye,Ne,Me.width,Me.height,0,xe,Ie,Me.data)}else if(E.isDataArrayTexture)if(je){if(rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Fe,Ne,$.width,$.height,$.depth),_e)if(E.layerUpdates.size>0){let ye=Zl($.width,$.height,E.format,E.type);for(let Le of E.layerUpdates){let ze=$.data.subarray(Le*ye/$.data.BYTES_PER_ELEMENT,(Le+1)*ye/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Le,$.width,$.height,1,xe,Ie,ze)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,xe,Ie,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ne,$.width,$.height,$.depth,0,xe,Ie,$.data);else if(E.isData3DTexture)je?(rt&&t.texStorage3D(r.TEXTURE_3D,Fe,Ne,$.width,$.height,$.depth),_e&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,xe,Ie,$.data)):t.texImage3D(r.TEXTURE_3D,0,Ne,$.width,$.height,$.depth,0,xe,Ie,$.data);else if(E.isFramebufferTexture){if(rt)if(je)t.texStorage2D(r.TEXTURE_2D,Fe,Ne,$.width,$.height);else{let ye=$.width,Le=$.height;for(let ze=0;ze<Fe;ze++)t.texImage2D(r.TEXTURE_2D,ze,Ne,ye,Le,0,xe,Ie,null),ye>>=1,Le>>=1}}else if(Oe.length>0){if(je&&rt){let ye=be(Oe[0]);t.texStorage2D(r.TEXTURE_2D,Fe,Ne,ye.width,ye.height)}for(let ye=0,Le=Oe.length;ye<Le;ye++)Me=Oe[ye],je?_e&&t.texSubImage2D(r.TEXTURE_2D,ye,0,0,xe,Ie,Me):t.texImage2D(r.TEXTURE_2D,ye,Ne,xe,Ie,Me);E.generateMipmaps=!1}else if(je){if(rt){let ye=be($);t.texStorage2D(r.TEXTURE_2D,Fe,Ne,ye.width,ye.height)}_e&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,xe,Ie,$)}else t.texImage2D(r.TEXTURE_2D,0,Ne,xe,Ie,$);f(E)&&g(z),k.__version=P.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function le(A,E,X,z,T,P){let k=s.convert(X.format,X.colorSpace),N=s.convert(X.type),re=y(X.internalFormat,k,N,X.colorSpace),J=n.get(E),$=n.get(X);if($.__renderTarget=E,!J.__hasExternalTextures){let xe=Math.max(1,E.width>>P),Ie=Math.max(1,E.height>>P);T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY?t.texImage3D(T,P,re,xe,Ie,E.depth,0,k,N,null):t.texImage2D(T,P,re,xe,Ie,0,k,N,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),ve(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,z,T,$.__webglTexture,0,fe(E)):(T===r.TEXTURE_2D||T>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,z,T,$.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(A,E,X){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let z=E.depthTexture,T=z&&z.isDepthTexture?z.type:null,P=x(E.stencilBuffer,T),k=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=fe(E);ve(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,N,P,E.width,E.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,N,P,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,P,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,A)}else{let z=E.textures;for(let T=0;T<z.length;T++){let P=z[T],k=s.convert(P.format,P.colorSpace),N=s.convert(P.type),re=y(P.internalFormat,k,N,P.colorSpace),J=fe(E);X&&ve(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,J,re,E.width,E.height):ve(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,J,re,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,re,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(E.depthTexture);X.__renderTarget=E,X.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),V(E.depthTexture,0);let z=X.__webglTexture,T=fe(E);if(E.depthTexture.format===Cs)ve(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0);else{if(E.depthTexture.format!==Rs)throw new Error("Unknown depthTexture format");ve(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0,T):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0)}}function Q(A){let E=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let z=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),z){let T=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,z.removeEventListener("dispose",T)};z.addEventListener("dispose",T),E.__depthDisposeCallback=T}E.__boundDepthTexture=z}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let z=A.texture.mipmaps;z&&z.length>0?Ae(E.__webglFramebuffer[0],A):Ae(E.__webglFramebuffer,A)}else if(X){E.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[z]),E.__webglDepthbuffer[z]===void 0)E.__webglDepthbuffer[z]=r.createRenderbuffer(),Te(E.__webglDepthbuffer[z],A,!1);else{let T=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer[z];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,P)}}else{let z=A.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),Te(E.__webglDepthbuffer,A,!1);else{let T=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,T,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let ge=[],he=[];function fe(A){return Math.min(i.maxSamples,A.samples)}function ve(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function q(A,E){let X=A.colorSpace,z=A.format,T=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==Hi&&X!==$i&&(Mt.getTransfer(X)===Ct?z===kn&&T===ai||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A},this.resetTextureUnits=function(){D=0},this.setTexture2D=V,this.setTexture2DArray=function(A,E){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?de(X,A,E):t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(A,E){let X=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version?de(X,A,E):t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(A,E){let X=n.get(A);A.version>0&&X.__version!==A.version?(function(z,T,P){if(T.image.length!==6)return;let k=Z(z,T),N=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+P);let re=n.get(N);if(N.version!==re.__version||k===!0){t.activeTexture(r.TEXTURE0+P);let J=Mt.getPrimaries(Mt.workingColorSpace),$=T.colorSpace===$i?null:Mt.getPrimaries(T.colorSpace),xe=T.colorSpace===$i||J===$?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Ie=T.isCompressedTexture||T.image[0].isCompressedTexture,Me=T.image[0]&&T.image[0].isDataTexture,Ne=[];for(let we=0;we<6;we++)Ne[we]=Ie||Me?Me?T.image[we].image:T.image[we]:_(T.image[we],!0,i.maxCubemapSize),Ne[we]=q(T,Ne[we]);let Oe=Ne[0],je=s.convert(T.format,T.colorSpace),rt=s.convert(T.type),_e=y(T.internalFormat,je,rt,T.colorSpace),Fe=T.isVideoTexture!==!0,ye=re.__version===void 0||k===!0,Le=N.dataReady,ze,gt=M(T,Oe);if(H(r.TEXTURE_CUBE_MAP,T),Ie){Fe&&ye&&t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,_e,Oe.width,Oe.height);for(let we=0;we<6;we++){ze=Ne[we].mipmaps;for(let st=0;st<ze.length;st++){let it=ze[st];T.format!==kn?je!==null?Fe?Le&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st,0,0,it.width,it.height,je,it.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st,_e,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?Le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st,0,0,it.width,it.height,je,rt,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st,_e,it.width,it.height,0,je,rt,it.data)}}}else{if(ze=T.mipmaps,Fe&&ye){ze.length>0&&gt++;let we=be(Ne[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,gt,_e,we.width,we.height)}for(let we=0;we<6;we++)if(Me){Fe?Le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Ne[we].width,Ne[we].height,je,rt,Ne[we].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_e,Ne[we].width,Ne[we].height,0,je,rt,Ne[we].data);for(let st=0;st<ze.length;st++){let it=ze[st].image[we].image;Fe?Le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st+1,0,0,it.width,it.height,je,rt,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st+1,_e,it.width,it.height,0,je,rt,it.data)}}else{Fe?Le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,je,rt,Ne[we]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_e,je,rt,Ne[we]);for(let st=0;st<ze.length;st++){let it=ze[st];Fe?Le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st+1,0,0,je,rt,it.image[we]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,st+1,_e,je,rt,it.image[we])}}}f(T)&&g(r.TEXTURE_CUBE_MAP),re.__version=N.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version})(X,A,E):t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(A,E,X){let z=n.get(A);E!==void 0&&le(z.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&Q(A)},this.setupRenderTarget=function(A){let E=A.texture,X=n.get(A),z=n.get(E);A.addEventListener("dispose",L);let T=A.textures,P=A.isWebGLCubeRenderTarget===!0,k=T.length>1;if(k||(z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture()),z.__version=E.version,a.memory.textures++),P){X.__webglFramebuffer=[];for(let N=0;N<6;N++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[N]=[];for(let re=0;re<E.mipmaps.length;re++)X.__webglFramebuffer[N][re]=r.createFramebuffer()}else X.__webglFramebuffer[N]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let N=0;N<E.mipmaps.length;N++)X.__webglFramebuffer[N]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(k)for(let N=0,re=T.length;N<re;N++){let J=n.get(T[N]);J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&ve(A)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let N=0;N<T.length;N++){let re=T[N];X.__webglColorRenderbuffer[N]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[N]);let J=s.convert(re.format,re.colorSpace),$=s.convert(re.type),xe=y(re.internalFormat,J,$,re.colorSpace,A.isXRRenderTarget===!0),Ie=fe(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,xe,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+N,r.RENDERBUFFER,X.__webglColorRenderbuffer[N])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(X.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture),H(r.TEXTURE_CUBE_MAP,E);for(let N=0;N<6;N++)if(E.mipmaps&&E.mipmaps.length>0)for(let re=0;re<E.mipmaps.length;re++)le(X.__webglFramebuffer[N][re],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+N,re);else le(X.__webglFramebuffer[N],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+N,0);f(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let N=0,re=T.length;N<re;N++){let J=T[N],$=n.get(J),xe=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(xe,$.__webglTexture),H(xe,J),le(X.__webglFramebuffer,A,J,r.COLOR_ATTACHMENT0+N,xe,0),f(J)&&g(xe)}t.unbindTexture()}else{let N=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(N=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(N,z.__webglTexture),H(N,E),E.mipmaps&&E.mipmaps.length>0)for(let re=0;re<E.mipmaps.length;re++)le(X.__webglFramebuffer[re],A,E,r.COLOR_ATTACHMENT0,N,re);else le(X.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,N,0);f(E)&&g(N),t.unbindTexture()}A.depthBuffer&&Q(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let X=0,z=E.length;X<z;X++){let T=E[X];if(f(T)){let P=v(A),k=n.get(T).__webglTexture;t.bindTexture(P,k),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(ve(A)===!1){let E=A.textures,X=A.width,z=A.height,T=r.COLOR_BUFFER_BIT,P=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=n.get(A),N=E.length>1;if(N)for(let J=0;J<E.length;J++)t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);let re=A.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let J=0;J<E.length;J++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(T|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(T|=r.STENCIL_BUFFER_BIT)),N){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,k.__webglColorRenderbuffer[J]);let $=n.get(E[J]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0)}r.blitFramebuffer(0,0,X,z,0,0,X,z,T,r.NEAREST),c===!0&&(ge.length=0,he.length=0,ge.push(r.COLOR_ATTACHMENT0+J),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ge.push(P),he.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,he)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),N)for(let J=0;J<E.length;J++){t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,k.__webglColorRenderbuffer[J]);let $=n.get(E[J]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.TEXTURE_2D,$,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ve}function $p(r,e){return{convert:function(t,n=$i){let i,s=Mt.getTransfer(n);if(t===ai)return r.UNSIGNED_BYTE;if(t===Qa)return r.UNSIGNED_SHORT_4_4_4_4;if(t===eo)return r.UNSIGNED_SHORT_5_5_5_1;if(t===ul)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===dl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===cl)return r.BYTE;if(t===hl)return r.SHORT;if(t===Nr)return r.UNSIGNED_SHORT;if(t===$a)return r.INT;if(t===Ki)return r.UNSIGNED_INT;if(t===Gn)return r.FLOAT;if(t===Bi)return r.HALF_FLOAT;if(t===Ih)return r.ALPHA;if(t===Lh)return r.RGB;if(t===kn)return r.RGBA;if(t===Cs)return r.DEPTH_COMPONENT;if(t===Rs)return r.DEPTH_STENCIL;if(t===to)return r.RED;if(t===no)return r.RED_INTEGER;if(t===Dh)return r.RG;if(t===pl)return r.RG_INTEGER;if(t===ml)return r.RGBA_INTEGER;if(t===io||t===ro||t===so||t===ao)if(s===Ct){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===io)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===ro)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===so)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===ao)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===io)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===ro)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===so)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===ao)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===fl||t===gl||t===vl||t===_l){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===fl)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===gl)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===vl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===_l)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===yl||t===xl||t===Ml){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===yl||t===xl)return s===Ct?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Ml)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al||t===Cl||t===Rl||t===Pl||t===Il||t===Ll||t===Dl||t===Ul||t===Nl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Sl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Tl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===bl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===wl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===El)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Al)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Cl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Rl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Pl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Il)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Ll)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Dl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Ul)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Nl)return s===Ct?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Fl||t===Bl||t===Ol){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Fl)return s===Ct?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Bl)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Ol)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===zl||t===Gl||t===kl||t===Vl){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===zl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Gl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===kl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Vl)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Fr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var lc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ps(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Wt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cc=class extends xi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,_=typeof XRWebGLBinding<"u",f=new lc,g={},v=t.getContextAttributes(),y=null,x=null,M=[],b=[],L=new pe,O=null,D=new Gt;D.viewport=new Tt;let V=new Gt;V.viewport=new Tt;let I=[D,V],U=new Ga,K=null,H=null;function Z(he){let fe=b.indexOf(he.inputSource);if(fe===-1)return;let ve=M[fe];ve!==void 0&&(ve.update(he.inputSource,he.frame,l||a),ve.dispatchEvent({type:he.type,data:he.inputSource}))}function ne(){i.removeEventListener("select",Z),i.removeEventListener("selectstart",Z),i.removeEventListener("selectend",Z),i.removeEventListener("squeeze",Z),i.removeEventListener("squeezestart",Z),i.removeEventListener("squeezeend",Z),i.removeEventListener("end",ne),i.removeEventListener("inputsourceschange",de);for(let he=0;he<M.length;he++){let fe=b[he];fe!==null&&(b[he]=null,M[he].disconnect(fe))}K=null,H=null,f.reset();for(let he in g)delete g[he];e.setRenderTarget(y),m=null,d=null,u=null,i=null,x=null,ge.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}function de(he){for(let fe=0;fe<he.removed.length;fe++){let ve=he.removed[fe],q=b.indexOf(ve);q>=0&&(b[q]=null,M[q].disconnect(ve))}for(let fe=0;fe<he.added.length;fe++){let ve=he.added[fe],q=b.indexOf(ve);if(q===-1){for(let A=0;A<M.length;A++){if(A>=b.length){b.push(ve),q=A;break}if(b[A]===null){b[A]=ve,q=A;break}}if(q===-1)break}let be=M[q];be&&be.connect(ve)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let fe=M[he];return fe===void 0&&(fe=new Tr,M[he]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(he){let fe=M[he];return fe===void 0&&(fe=new Tr,M[he]=fe),fe.getGripSpace()},this.getHand=function(he){let fe=M[he];return fe===void 0&&(fe=new Tr,M[he]=fe),fe.getHandSpace()},this.setFramebufferScaleFactor=function(he){s=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",ne),i.addEventListener("inputsourceschange",de),v.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,ve=null,q=null;v.depth&&(q=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=v.stencil?Rs:Cs,ve=v.stencil?Fr:Ki);let be={colorFormat:t.RGBA8,depthFormat:q,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(be),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Bn(d.textureWidth,d.textureHeight,{format:kn,type:ai,depthTexture:new ds(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let fe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,fe),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Bn(m.framebufferWidth,m.framebufferHeight,{format:kn,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ge.setContext(i),ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let le=new w,Te=new w;function Ae(he,fe){fe===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(fe.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;let fe=he.near,ve=he.far;f.texture!==null&&(f.depthNear>0&&(fe=f.depthNear),f.depthFar>0&&(ve=f.depthFar)),U.near=V.near=D.near=fe,U.far=V.far=D.far=ve,K===U.near&&H===U.far||(i.updateRenderState({depthNear:U.near,depthFar:U.far}),K=U.near,H=U.far),U.layers.mask=6|he.layers.mask,D.layers.mask=3&U.layers.mask,V.layers.mask=5&U.layers.mask;let q=he.parent,be=U.cameras;Ae(U,q);for(let A=0;A<be.length;A++)Ae(be[A],q);be.length===2?(function(A,E,X){le.setFromMatrixPosition(E.matrixWorld),Te.setFromMatrixPosition(X.matrixWorld);let z=le.distanceTo(Te),T=E.projectionMatrix.elements,P=X.projectionMatrix.elements,k=T[14]/(T[10]-1),N=T[14]/(T[10]+1),re=(T[9]+1)/T[5],J=(T[9]-1)/T[5],$=(T[8]-1)/T[0],xe=(P[8]+1)/P[0],Ie=k*$,Me=k*xe,Ne=z/(-$+xe),Oe=Ne*-$;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Oe),A.translateZ(Ne),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),T[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let je=k+Ne,rt=N+Ne,_e=Ie-Oe,Fe=Me+(z-Oe),ye=re*N/rt*je,Le=J*N/rt*je;A.projectionMatrix.makePerspective(_e,Fe,ye,Le,je,rt),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(U,D,V):U.projectionMatrix.copy(D.projectionMatrix),(function(A,E,X){X===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(X.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*ca*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(he,U,q)},this.getCamera=function(){return U},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=he)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(U)},this.getCameraTexture=function(he){return g[he]};let Q=null,ge=new xu;ge.setAnimationLoop(function(he,fe){if(h=fe.getViewerPose(l||a),p=fe,h!==null){let ve=h.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let q=!1;ve.length!==U.cameras.length&&(U.cameras.length=0,q=!0);for(let A=0;A<ve.length;A++){let E=ve[A],X=null;if(m!==null)X=m.getViewport(E);else{let T=u.getViewSubImage(d,E);X=T.viewport,A===0&&(e.setRenderTargetTextures(x,T.colorTexture,T.depthStencilTexture),e.setRenderTarget(x))}let z=I[A];z===void 0&&(z=new Gt,z.layers.enable(A),z.viewport=new Tt,I[A]=z),z.matrix.fromArray(E.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(E.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(X.x,X.y,X.width,X.height),A===0&&(U.matrix.copy(z.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),q===!0&&U.cameras.push(z)}let be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let A=u.getDepthInformation(ve[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(be&&be.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<ve.length;A++){let E=ve[A].camera;if(E){let X=g[E];X||(X=new ps,g[E]=X);let z=u.getCameraImage(E);X.sourceTexture=z}}}}for(let ve=0;ve<M.length;ve++){let q=b[ve],be=M[ve];q!==null&&be!==void 0&&be.update(q,fe,l||a)}Q&&Q(he,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),p=null}),this.setAnimationLoop=function(he){Q=he},this.dispose=function(){}}},nr=new Yn,Qp=new qe;function em(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Dn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Dn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,nr.copy(c),nr.x*=-1,nr.y*=-1,nr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),i.envMapRotation.value.setFromMatrix4(Qp.makeRotationFromEuler(nr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,jl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Dn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function tm(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let _=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{let g=p[f];if(typeof _=="number"||typeof _=="boolean"){if(g!==_)return p[f]=_,!0}else if(g.equals(_)===!1)return g.copy(_),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,y=16;for(let M=0,b=g.length;M<b;M++){let L=Array.isArray(g[M])?g[M]:[g[M]];for(let O=0,D=L.length;O<D;O++){let V=L[O],I=Array.isArray(V.value)?V.value:[V.value];for(let U=0,K=I.length;U<K;U++){let H=l(I[U]),Z=v%y,ne=Z%H.boundary,de=Z+ne;v+=ne,de!==0&&y-de<H.storage&&(v+=y-de),V.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=H.storage}}}let x=v%y;x>0&&(v+=y-x),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),y=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,y,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let _=e.render.frame;s[u.id]!==_&&((function(f){let g=i[f.id],v=f.uniforms,y=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,M=v.length;x<M;x++){let b=Array.isArray(v[x])?v[x]:[v[x]];for(let L=0,O=b.length;L<O;L++){let D=b[L];if(c(D,x,L,y)===!0){let V=D.__offset,I=Array.isArray(D.value)?D.value:[D.value],U=0;for(let K=0;K<I.length;K++){let H=I[K],Z=l(H);typeof H=="number"||typeof H=="boolean"?(D.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,V+U,D.__data)):H.isMatrix3?(D.__data[0]=H.elements[0],D.__data[1]=H.elements[1],D.__data[2]=H.elements[2],D.__data[3]=0,D.__data[4]=H.elements[3],D.__data[5]=H.elements[4],D.__data[6]=H.elements[5],D.__data[7]=0,D.__data[8]=H.elements[6],D.__data[9]=H.elements[7],D.__data[10]=H.elements[8],D.__data[11]=0):(H.toArray(D.__data,U),U+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=_)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Vn=class{constructor(e={}){let{canvas:t=Hh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),_=new Int32Array(4),f=null,g=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=ft;let b=0,L=0,O=null,D=-1,V=null,I=new Tt,U=new Tt,K=null,H=new Ye(0),Z=0,ne=t.width,de=t.height,le=1,Te=null,Ae=null,Q=new Tt(0,0,ne,de),ge=new Tt(0,0,ne,de),he=!1,fe=new Ui,ve=!1,q=!1,be=new qe,A=new w,E=new Tt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},z=!1;function T(){return O===null?le:1}let P,k,N,re,J,$,xe,Ie,Me,Ne,Oe,je,rt,_e,Fe,ye,Le,ze,gt,we,st,it,tn,on,W=n;function It(C,j){return t.getContext(C,j)}try{let C={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",Dt,!1),t.addEventListener("webglcontextcreationerror",ci,!1),W===null){let j="webgl2";if(W=It(j,C),W===null)throw It(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}function Ht(){P=new Bd(W),P.init(),it=new $p(W,P),k=new Ld(W,P,e,it),N=new Jp(W,P),k.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),re=new Gd(W),J=new Gp,$=new Kp(W,P,N,J,k,it,re),xe=new Ud(x),Ie=new Fd(x),Me=new Ad(W),tn=new Pd(W,Me),Ne=new Od(W,Me,re,tn),Oe=new Vd(W,Ne,Me,re),gt=new kd(W,k,$),ye=new Dd(J),je=new zp(x,xe,Ie,P,k,tn,ye),rt=new em(x,J),_e=new Vp,Fe=new qp(P),ze=new Rd(x,xe,Ie,N,Oe,m,c),Le=new Yp(x,Oe,k),on=new tm(W,re,k,N),we=new Id(W,P,re),st=new zd(W,P,re),re.programs=je.programs,x.capabilities=k,x.extensions=P,x.properties=J,x.renderLists=_e,x.shadowMap=Le,x.state=N,x.info=re}Ht();let At=new cc(x,W);function Pt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let C=re.autoReset,j=Le.enabled,ie=Le.autoUpdate,ae=Le.needsUpdate,Y=Le.type;Ht(),re.autoReset=C,Le.enabled=j,Le.autoUpdate=ie,Le.needsUpdate=ae,Le.type=Y}function ci(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function bt(C){let j=C.target;j.removeEventListener("dispose",bt),(function(ie){(function(ae){let Y=J.get(ae).programs;Y!==void 0&&(Y.forEach(function(ce){je.releaseProgram(ce)}),ae.isShaderMaterial&&je.releaseShaderCache(ae))})(ie),J.remove(ie)})(j)}function Yt(C,j,ie){C.transparent===!0&&C.side===Ot&&C.forceSinglePass===!1?(C.side=Dn,C.needsUpdate=!0,hi(C,j,ie),C.side=Lr,C.needsUpdate=!0,hi(C,j,ie),C.side=Ot):hi(C,j,ie)}this.xr=At,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let C=P.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=P.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(C){C!==void 0&&(le=C,this.setSize(ne,de,!1))},this.getSize=function(C){return C.set(ne,de)},this.setSize=function(C,j,ie=!0){At.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ne=C,de=j,t.width=Math.floor(C*le),t.height=Math.floor(j*le),ie===!0&&(t.style.width=C+"px",t.style.height=j+"px"),this.setViewport(0,0,C,j))},this.getDrawingBufferSize=function(C){return C.set(ne*le,de*le).floor()},this.setDrawingBufferSize=function(C,j,ie){ne=C,de=j,le=ie,t.width=Math.floor(C*ie),t.height=Math.floor(j*ie),this.setViewport(0,0,C,j)},this.getCurrentViewport=function(C){return C.copy(I)},this.getViewport=function(C){return C.copy(Q)},this.setViewport=function(C,j,ie,ae){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,j,ie,ae),N.viewport(I.copy(Q).multiplyScalar(le).round())},this.getScissor=function(C){return C.copy(ge)},this.setScissor=function(C,j,ie,ae){C.isVector4?ge.set(C.x,C.y,C.z,C.w):ge.set(C,j,ie,ae),N.scissor(U.copy(ge).multiplyScalar(le).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(C){N.setScissorTest(he=C)},this.setOpaqueSort=function(C){Te=C},this.setTransparentSort=function(C){Ae=C},this.getClearColor=function(C){return C.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(C=!0,j=!0,ie=!0){let ae=0;if(C){let Y=!1;if(O!==null){let ce=O.texture.format;Y=ce===ml||ce===pl||ce===no}if(Y){let ce=O.texture.type,Be=ce===ai||ce===Ki||ce===Nr||ce===Fr||ce===Qa||ce===eo,De=ze.getClearColor(),ke=ze.getClearAlpha(),$e=De.r,Qe=De.g,Ze=De.b;Be?(p[0]=$e,p[1]=Qe,p[2]=Ze,p[3]=ke,W.clearBufferuiv(W.COLOR,0,p)):(_[0]=$e,_[1]=Qe,_[2]=Ze,_[3]=ke,W.clearBufferiv(W.COLOR,0,_))}else ae|=W.COLOR_BUFFER_BIT}j&&(ae|=W.DEPTH_BUFFER_BIT),ie&&(ae|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",Dt,!1),t.removeEventListener("webglcontextcreationerror",ci,!1),ze.dispose(),_e.dispose(),Fe.dispose(),J.dispose(),xe.dispose(),Ie.dispose(),Oe.dispose(),tn.dispose(),on.dispose(),je.dispose(),At.dispose(),At.removeEventListener("sessionstart",Zt),At.removeEventListener("sessionend",zt),Lt.stop()},this.renderBufferDirect=function(C,j,ie,ae,Y,ce){j===null&&(j=X);let Be=Y.isMesh&&Y.matrixWorld.determinant()<0,De=(function(dt,Rt,ct,ot,nt){Rt.isScene!==!0&&(Rt=X),$.resetTextureUnits();let rn=Rt.fog,kr=ot.isMeshStandardMaterial?Rt.environment:null,wi=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Hi,Jn=(ot.isMeshStandardMaterial?Ie:xe).get(ot.envMap||kr),Un=ot.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,ui=!!ct.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),S=!!ct.morphAttributes.position,R=!!ct.morphAttributes.normal,F=!!ct.morphAttributes.color,ee=bi;ot.toneMapped&&(O!==null&&O.isXRRenderTarget!==!0||(ee=x.toneMapping));let B=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,oe=B!==void 0?B.length:0,G=J.get(ot),se=g.state.lights;if(ve===!0&&(q===!0||dt!==V)){let et=dt===V&&ot.id===D;ye.setState(ot,dt,et)}let ue=!1;ot.version===G.__version?G.needsLights&&G.lightsStateVersion!==se.state.version||G.outputColorSpace!==wi||nt.isBatchedMesh&&G.batching===!1?ue=!0:nt.isBatchedMesh||G.batching!==!0?nt.isBatchedMesh&&G.batchingColor===!0&&nt.colorTexture===null||nt.isBatchedMesh&&G.batchingColor===!1&&nt.colorTexture!==null||nt.isInstancedMesh&&G.instancing===!1?ue=!0:nt.isInstancedMesh||G.instancing!==!0?nt.isSkinnedMesh&&G.skinning===!1?ue=!0:nt.isSkinnedMesh||G.skinning!==!0?nt.isInstancedMesh&&G.instancingColor===!0&&nt.instanceColor===null||nt.isInstancedMesh&&G.instancingColor===!1&&nt.instanceColor!==null||nt.isInstancedMesh&&G.instancingMorph===!0&&nt.morphTexture===null||nt.isInstancedMesh&&G.instancingMorph===!1&&nt.morphTexture!==null||G.envMap!==Jn||ot.fog===!0&&G.fog!==rn?ue=!0:G.numClippingPlanes===void 0||G.numClippingPlanes===ye.numPlanes&&G.numIntersection===ye.numIntersection?(G.vertexAlphas!==Un||G.vertexTangents!==ui||G.morphTargets!==S||G.morphNormals!==R||G.morphColors!==F||G.toneMapping!==ee||G.morphTargetsCount!==oe)&&(ue=!0):ue=!0:ue=!0:ue=!0:ue=!0:(ue=!0,G.__version=ot.version);let He=G.currentProgram;ue===!0&&(He=hi(ot,Rt,nt));let Ce=!1,Re=!1,te=!1,me=He.getUniforms(),Ge=G.uniforms;if(N.useProgram(He.program)&&(Ce=!0,Re=!0,te=!0),ot.id!==D&&(D=ot.id,Re=!0),Ce||V!==dt){N.buffers.depth.getReversed()&&dt.reversedDepth!==!0&&(dt._reversedDepth=!0,dt.updateProjectionMatrix()),me.setValue(W,"projectionMatrix",dt.projectionMatrix),me.setValue(W,"viewMatrix",dt.matrixWorldInverse);let et=me.map.cameraPosition;et!==void 0&&et.setValue(W,A.setFromMatrixPosition(dt.matrixWorld)),k.logarithmicDepthBuffer&&me.setValue(W,"logDepthBufFC",2/(Math.log(dt.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&me.setValue(W,"isOrthographic",dt.isOrthographicCamera===!0),V!==dt&&(V=dt,Re=!0,te=!0)}if(nt.isSkinnedMesh){me.setOptional(W,nt,"bindMatrix"),me.setOptional(W,nt,"bindMatrixInverse");let et=nt.skeleton;et&&(et.boneTexture===null&&et.computeBoneTexture(),me.setValue(W,"boneTexture",et.boneTexture,$))}nt.isBatchedMesh&&(me.setOptional(W,nt,"batchingTexture"),me.setValue(W,"batchingTexture",nt._matricesTexture,$),me.setOptional(W,nt,"batchingIdTexture"),me.setValue(W,"batchingIdTexture",nt._indirectTexture,$),me.setOptional(W,nt,"batchingColorTexture"),nt._colorsTexture!==null&&me.setValue(W,"batchingColorTexture",nt._colorsTexture,$));let Ee=ct.morphAttributes;Ee.position===void 0&&Ee.normal===void 0&&Ee.color===void 0||gt.update(nt,ct,He),(Re||G.receiveShadow!==nt.receiveShadow)&&(G.receiveShadow=nt.receiveShadow,me.setValue(W,"receiveShadow",nt.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(Ge.envMap.value=Jn,Ge.flipEnvMap.value=Jn.isCubeTexture&&Jn.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&Rt.environment!==null&&(Ge.envMapIntensity.value=Rt.environmentIntensity),Re&&(me.setValue(W,"toneMappingExposure",x.toneMappingExposure),G.needsLights&&(We=te,(Se=Ge).ambientLightColor.needsUpdate=We,Se.lightProbe.needsUpdate=We,Se.directionalLights.needsUpdate=We,Se.directionalLightShadows.needsUpdate=We,Se.pointLights.needsUpdate=We,Se.pointLightShadows.needsUpdate=We,Se.spotLights.needsUpdate=We,Se.spotLightShadows.needsUpdate=We,Se.rectAreaLights.needsUpdate=We,Se.hemisphereLights.needsUpdate=We),rn&&ot.fog===!0&&rt.refreshFogUniforms(Ge,rn),rt.refreshMaterialUniforms(Ge,ot,le,de,g.state.transmissionRenderTarget[dt.id]),Or.upload(W,vn(G),Ge,$));var Se,We;if(ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Or.upload(W,vn(G),Ge,$),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&me.setValue(W,"center",nt.center),me.setValue(W,"modelViewMatrix",nt.modelViewMatrix),me.setValue(W,"normalMatrix",nt.normalMatrix),me.setValue(W,"modelMatrix",nt.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){let et=ot.uniformsGroups;for(let cn=0,$t=et.length;cn<$t;cn++){let Hn=et[cn];on.update(Hn,He),on.bind(Hn,He)}}return He})(C,j,ie,ae,Y);N.setMaterial(ae,Be);let ke=ie.index,$e=1;if(ae.wireframe===!0){if(ke=Ne.getWireframeAttribute(ie),ke===void 0)return;$e=2}let Qe=ie.drawRange,Ze=ie.attributes.position,at=Qe.start*$e,wt=(Qe.start+Qe.count)*$e;ce!==null&&(at=Math.max(at,ce.start*$e),wt=Math.min(wt,(ce.start+ce.count)*$e)),ke!==null?(at=Math.max(at,0),wt=Math.min(wt,ke.count)):Ze!=null&&(at=Math.max(at,0),wt=Math.min(wt,Ze.count));let Ut=wt-at;if(Ut<0||Ut===1/0)return;let Nt;tn.setup(Y,ae,De,ie,ke);let ut=we;if(ke!==null&&(Nt=Me.get(ke),ut=st,ut.setIndex(Nt)),Y.isMesh)ae.wireframe===!0?(N.setLineWidth(ae.wireframeLinewidth*T()),ut.setMode(W.LINES)):ut.setMode(W.TRIANGLES);else if(Y.isLine){let dt=ae.linewidth;dt===void 0&&(dt=1),N.setLineWidth(dt*T()),Y.isLineSegments?ut.setMode(W.LINES):Y.isLineLoop?ut.setMode(W.LINE_LOOP):ut.setMode(W.LINE_STRIP)}else Y.isPoints?ut.setMode(W.POINTS):Y.isSprite&&ut.setMode(W.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)xr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))ut.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let dt=Y._multiDrawStarts,Rt=Y._multiDrawCounts,ct=Y._multiDrawCount,ot=ke?Me.get(ke).bytesPerElement:1,nt=J.get(ae).currentProgram.getUniforms();for(let rn=0;rn<ct;rn++)nt.setValue(W,"_gl_DrawID",rn),ut.render(dt[rn]/ot,Rt[rn])}else if(Y.isInstancedMesh)ut.renderInstances(at,Ut,Y.count);else if(ie.isInstancedBufferGeometry){let dt=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Rt=Math.min(ie.instanceCount,dt);ut.renderInstances(at,Ut,Rt)}else ut.render(at,Ut)},this.compile=function(C,j,ie=null){ie===null&&(ie=C),g=Fe.get(ie),g.init(j),y.push(g),ie.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),C!==ie&&C.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),g.setupLights();let ae=new Set;return C.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let ce=Y.material;if(ce)if(Array.isArray(ce))for(let Be=0;Be<ce.length;Be++){let De=ce[Be];Yt(De,ie,Y),ae.add(De)}else Yt(ce,ie,Y),ae.add(ce)}),g=y.pop(),ae},this.compileAsync=function(C,j,ie=null){let ae=this.compile(C,j,ie);return new Promise(Y=>{function ce(){ae.forEach(function(Be){J.get(Be).currentProgram.isReady()&&ae.delete(Be)}),ae.size!==0?setTimeout(ce,10):Y(C)}P.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let tt=null;function Zt(){Lt.stop()}function zt(){Lt.start()}let Lt=new xu;function jt(C,j,ie,ae){if(C.visible===!1)return;if(C.layers.test(j.layers)){if(C.isGroup)ie=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(j);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||fe.intersectsSprite(C)){ae&&E.setFromMatrixPosition(C.matrixWorld).applyMatrix4(be);let ce=Oe.update(C),Be=C.material;Be.visible&&f.push(C,ce,Be,ie,E.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||fe.intersectsObject(C))){let ce=Oe.update(C),Be=C.material;if(ae&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),E.copy(C.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),E.copy(ce.boundingSphere.center)),E.applyMatrix4(C.matrixWorld).applyMatrix4(be)),Array.isArray(Be)){let De=ce.groups;for(let ke=0,$e=De.length;ke<$e;ke++){let Qe=De[ke],Ze=Be[Qe.materialIndex];Ze&&Ze.visible&&f.push(C,ce,Ze,ie,E.z,Qe)}}else Be.visible&&f.push(C,ce,Be,ie,E.z,null)}}let Y=C.children;for(let ce=0,Be=Y.length;ce<Be;ce++)jt(Y[ce],j,ie,ae)}function Jt(C,j,ie,ae){let Y=C.opaque,ce=C.transmissive,Be=C.transparent;g.setupLightsView(ie),ve===!0&&ye.setGlobalState(x.clippingPlanes,ie),ae&&N.viewport(I.copy(ae)),Y.length>0&&ln(Y,j,ie),ce.length>0&&ln(ce,j,ie),Be.length>0&&ln(Be,j,ie),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function Mn(C,j,ie,ae){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ae.id]===void 0&&(g.state.transmissionRenderTarget[ae.id]=new Bn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Bi:ai,minFilter:Ji,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));let Y=g.state.transmissionRenderTarget[ae.id],ce=ae.viewport||I;Y.setSize(ce.z*x.transmissionResolutionScale,ce.w*x.transmissionResolutionScale);let Be=x.getRenderTarget(),De=x.getActiveCubeFace(),ke=x.getActiveMipmapLevel();x.setRenderTarget(Y),x.getClearColor(H),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),z&&ze.render(ie);let $e=x.toneMapping;x.toneMapping=bi;let Qe=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),g.setupLightsView(ae),ve===!0&&ye.setGlobalState(x.clippingPlanes,ae),ln(C,ie,ae),$.updateMultisampleRenderTarget(Y),$.updateRenderTargetMipmap(Y),P.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let at=0,wt=j.length;at<wt;at++){let Ut=j[at],Nt=Ut.object,ut=Ut.geometry,dt=Ut.material,Rt=Ut.group;if(dt.side===Ot&&Nt.layers.test(ae.layers)){let ct=dt.side;dt.side=Dn,dt.needsUpdate=!0,gn(Nt,ie,ae,ut,dt,Rt),dt.side=ct,dt.needsUpdate=!0,Ze=!0}}Ze===!0&&($.updateMultisampleRenderTarget(Y),$.updateRenderTargetMipmap(Y))}x.setRenderTarget(Be,De,ke),x.setClearColor(H,Z),Qe!==void 0&&(ae.viewport=Qe),x.toneMapping=$e}function ln(C,j,ie){let ae=j.isScene===!0?j.overrideMaterial:null;for(let Y=0,ce=C.length;Y<ce;Y++){let Be=C[Y],De=Be.object,ke=Be.geometry,$e=Be.group,Qe=Be.material;Qe.allowOverride===!0&&ae!==null&&(Qe=ae),De.layers.test(ie.layers)&&gn(De,j,ie,ke,Qe,$e)}}function gn(C,j,ie,ae,Y,ce){C.onBeforeRender(x,j,ie,ae,Y,ce),C.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Y.onBeforeRender(x,j,ie,ae,C,ce),Y.transparent===!0&&Y.side===Ot&&Y.forceSinglePass===!1?(Y.side=Dn,Y.needsUpdate=!0,x.renderBufferDirect(ie,j,ae,Y,C,ce),Y.side=Lr,Y.needsUpdate=!0,x.renderBufferDirect(ie,j,ae,Y,C,ce),Y.side=Ot):x.renderBufferDirect(ie,j,ae,Y,C,ce),C.onAfterRender(x,j,ie,ae,Y,ce)}function hi(C,j,ie){j.isScene!==!0&&(j=X);let ae=J.get(C),Y=g.state.lights,ce=g.state.shadowsArray,Be=Y.state.version,De=je.getParameters(C,Y.state,ce,j,ie),ke=je.getProgramCacheKey(De),$e=ae.programs;ae.environment=C.isMeshStandardMaterial?j.environment:null,ae.fog=j.fog,ae.envMap=(C.isMeshStandardMaterial?Ie:xe).get(C.envMap||ae.environment),ae.envMapRotation=ae.environment!==null&&C.envMap===null?j.environmentRotation:C.envMapRotation,$e===void 0&&(C.addEventListener("dispose",bt),$e=new Map,ae.programs=$e);let Qe=$e.get(ke);if(Qe!==void 0){if(ae.currentProgram===Qe&&ae.lightsStateVersion===Be)return Kt(C,De),Qe}else De.uniforms=je.getUniforms(C),C.onBeforeCompile(De,x),Qe=je.acquireProgram(De,ke),$e.set(ke,Qe),ae.uniforms=De.uniforms;let Ze=ae.uniforms;return(C.isShaderMaterial||C.isRawShaderMaterial)&&C.clipping!==!0||(Ze.clippingPlanes=ye.uniform),Kt(C,De),ae.needsLights=(function(at){return at.isMeshLambertMaterial||at.isMeshToonMaterial||at.isMeshPhongMaterial||at.isMeshStandardMaterial||at.isShadowMaterial||at.isShaderMaterial&&at.lights===!0})(C),ae.lightsStateVersion=Be,ae.needsLights&&(Ze.ambientLightColor.value=Y.state.ambient,Ze.lightProbe.value=Y.state.probe,Ze.directionalLights.value=Y.state.directional,Ze.directionalLightShadows.value=Y.state.directionalShadow,Ze.spotLights.value=Y.state.spot,Ze.spotLightShadows.value=Y.state.spotShadow,Ze.rectAreaLights.value=Y.state.rectArea,Ze.ltc_1.value=Y.state.rectAreaLTC1,Ze.ltc_2.value=Y.state.rectAreaLTC2,Ze.pointLights.value=Y.state.point,Ze.pointLightShadows.value=Y.state.pointShadow,Ze.hemisphereLights.value=Y.state.hemi,Ze.directionalShadowMap.value=Y.state.directionalShadowMap,Ze.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ze.spotShadowMap.value=Y.state.spotShadowMap,Ze.spotLightMatrix.value=Y.state.spotLightMatrix,Ze.spotLightMap.value=Y.state.spotLightMap,Ze.pointShadowMap.value=Y.state.pointShadowMap,Ze.pointShadowMatrix.value=Y.state.pointShadowMatrix),ae.currentProgram=Qe,ae.uniformsList=null,Qe}function vn(C){if(C.uniformsList===null){let j=C.currentProgram.getUniforms();C.uniformsList=Or.seqWithValue(j.seq,C.uniforms)}return C.uniformsList}function Kt(C,j){let ie=J.get(C);ie.outputColorSpace=j.outputColorSpace,ie.batching=j.batching,ie.batchingColor=j.batchingColor,ie.instancing=j.instancing,ie.instancingColor=j.instancingColor,ie.instancingMorph=j.instancingMorph,ie.skinning=j.skinning,ie.morphTargets=j.morphTargets,ie.morphNormals=j.morphNormals,ie.morphColors=j.morphColors,ie.morphTargetsCount=j.morphTargetsCount,ie.numClippingPlanes=j.numClippingPlanes,ie.numIntersection=j.numClipIntersection,ie.vertexAlphas=j.vertexAlphas,ie.vertexTangents=j.vertexTangents,ie.toneMapping=j.toneMapping}Lt.setAnimationLoop(function(C){tt&&tt(C)}),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(C){tt=C,At.setAnimationLoop(C),C===null?Lt.stop():Lt.start()},At.addEventListener("sessionstart",Zt),At.addEventListener("sessionend",zt),this.render=function(C,j){if(j!==void 0&&j.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(At.cameraAutoUpdate===!0&&At.updateCamera(j),j=At.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,j,O),g=Fe.get(C,y.length),g.init(j),y.push(g),be.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),fe.setFromProjectionMatrix(be,yi,j.reversedDepth),q=this.localClippingEnabled,ve=ye.init(this.clippingPlanes,q),f=_e.get(C,v.length),f.init(),v.push(f),At.enabled===!0&&At.isPresenting===!0){let ce=x.xr.getDepthSensingMesh();ce!==null&&jt(ce,j,-1/0,x.sortObjects)}jt(C,j,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(Te,Ae),z=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,z&&ze.addToRenderList(f,C),this.info.render.frame++,ve===!0&&ye.beginShadows();let ie=g.state.shadowsArray;Le.render(ie,C,j),ve===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();let ae=f.opaque,Y=f.transmissive;if(g.setupLights(),j.isArrayCamera){let ce=j.cameras;if(Y.length>0)for(let Be=0,De=ce.length;Be<De;Be++)Mn(ae,Y,C,ce[Be]);z&&ze.render(C);for(let Be=0,De=ce.length;Be<De;Be++){let ke=ce[Be];Jt(f,C,ke,ke.viewport)}}else Y.length>0&&Mn(ae,Y,C,j),z&&ze.render(C),Jt(f,C,j);O!==null&&L===0&&($.updateMultisampleRenderTarget(O),$.updateRenderTargetMipmap(O)),C.isScene===!0&&C.onAfterRender(x,C,j),tn.resetDefaultState(),D=-1,V=null,y.pop(),y.length>0?(g=y[y.length-1],ve===!0&&ye.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(C,j,ie){let ae=J.get(C);ae.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),J.get(C.texture).__webglTexture=j,J.get(C.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:ie,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,j){let ie=J.get(C);ie.__webglFramebuffer=j,ie.__useDefaultFramebuffer=j===void 0};let rr=W.createFramebuffer();this.setRenderTarget=function(C,j=0,ie=0){O=C,b=j,L=ie;let ae=!0,Y=null,ce=!1,Be=!1;if(C){let De=J.get(C);if(De.__useDefaultFramebuffer!==void 0)N.bindFramebuffer(W.FRAMEBUFFER,null),ae=!1;else if(De.__webglFramebuffer===void 0)$.setupRenderTarget(C);else if(De.__hasExternalTextures)$.rebindTextures(C,J.get(C.texture).__webglTexture,J.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Qe=C.depthTexture;if(De.__boundDepthTexture!==Qe){if(Qe!==null&&J.has(Qe)&&(C.width!==Qe.image.width||C.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(C)}}let ke=C.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Be=!0);let $e=J.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Y=Array.isArray($e[j])?$e[j][ie]:$e[j],ce=!0):Y=C.samples>0&&$.useMultisampledRTT(C)===!1?J.get(C).__webglMultisampledFramebuffer:Array.isArray($e)?$e[ie]:$e,I.copy(C.viewport),U.copy(C.scissor),K=C.scissorTest}else I.copy(Q).multiplyScalar(le).floor(),U.copy(ge).multiplyScalar(le).floor(),K=he;if(ie!==0&&(Y=rr),N.bindFramebuffer(W.FRAMEBUFFER,Y)&&ae&&N.drawBuffers(C,Y),N.viewport(I),N.scissor(U),N.setScissorTest(K),ce){let De=J.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+j,De.__webglTexture,ie)}else if(Be){let De=j;for(let ke=0;ke<C.textures.length;ke++){let $e=J.get(C.textures[ke]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+ke,$e.__webglTexture,ie,De)}}else if(C!==null&&ie!==0){let De=J.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,De.__webglTexture,ie)}D=-1},this.readRenderTargetPixels=function(C,j,ie,ae,Y,ce,Be,De=0){if(!C||!C.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=J.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ke=ke[Be]),ke){N.bindFramebuffer(W.FRAMEBUFFER,ke);try{let $e=C.textures[De],Qe=$e.format,Ze=$e.type;if(!k.textureFormatReadable(Qe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Ze))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");j>=0&&j<=C.width-ae&&ie>=0&&ie<=C.height-Y&&(C.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De),W.readPixels(j,ie,ae,Y,it.convert(Qe),it.convert(Ze),ce))}finally{let $e=O!==null?J.get(O).__webglFramebuffer:null;N.bindFramebuffer(W.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(C,j,ie,ae,Y,ce,Be,De=0){if(!C||!C.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=J.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ke=ke[Be]),ke){if(j>=0&&j<=C.width-ae&&ie>=0&&ie<=C.height-Y){N.bindFramebuffer(W.FRAMEBUFFER,ke);let $e=C.textures[De],Qe=$e.format,Ze=$e.type;if(!k.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,at),W.bufferData(W.PIXEL_PACK_BUFFER,ce.byteLength,W.STREAM_READ),C.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De),W.readPixels(j,ie,ae,Y,it.convert(Qe),it.convert(Ze),0);let wt=O!==null?J.get(O).__webglFramebuffer:null;N.bindFramebuffer(W.FRAMEBUFFER,wt);let Ut=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Wh(W,Ut,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,at),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,ce),W.deleteBuffer(at),W.deleteSync(Ut),ce}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,j=null,ie=0){let ae=Math.pow(2,-ie),Y=Math.floor(C.image.width*ae),ce=Math.floor(C.image.height*ae),Be=j!==null?j.x:0,De=j!==null?j.y:0;$.setTexture2D(C,0),W.copyTexSubImage2D(W.TEXTURE_2D,ie,0,0,Be,De,Y,ce),N.unbindTexture()};let Zn=W.createFramebuffer(),vt=W.createFramebuffer();this.copyTextureToTexture=function(C,j,ie=null,ae=null,Y=0,ce=null){let Be,De,ke,$e,Qe,Ze,at,wt,Ut;ce===null&&(Y!==0?(xr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=Y,Y=0):ce=0);let Nt=C.isCompressedTexture?C.mipmaps[ce]:C.image;if(ie!==null)Be=ie.max.x-ie.min.x,De=ie.max.y-ie.min.y,ke=ie.isBox3?ie.max.z-ie.min.z:1,$e=ie.min.x,Qe=ie.min.y,Ze=ie.isBox3?ie.min.z:0;else{let Un=Math.pow(2,-Y);Be=Math.floor(Nt.width*Un),De=Math.floor(Nt.height*Un),ke=C.isDataArrayTexture?Nt.depth:C.isData3DTexture?Math.floor(Nt.depth*Un):1,$e=0,Qe=0,Ze=0}ae!==null?(at=ae.x,wt=ae.y,Ut=ae.z):(at=0,wt=0,Ut=0);let ut=it.convert(j.format),dt=it.convert(j.type),Rt;j.isData3DTexture?($.setTexture3D(j,0),Rt=W.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?($.setTexture2DArray(j,0),Rt=W.TEXTURE_2D_ARRAY):($.setTexture2D(j,0),Rt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,j.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,j.unpackAlignment);let ct=W.getParameter(W.UNPACK_ROW_LENGTH),ot=W.getParameter(W.UNPACK_IMAGE_HEIGHT),nt=W.getParameter(W.UNPACK_SKIP_PIXELS),rn=W.getParameter(W.UNPACK_SKIP_ROWS),kr=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,Nt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Nt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,$e),W.pixelStorei(W.UNPACK_SKIP_ROWS,Qe),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Ze);let wi=C.isDataArrayTexture||C.isData3DTexture,Jn=j.isDataArrayTexture||j.isData3DTexture;if(C.isDepthTexture){let Un=J.get(C),ui=J.get(j),S=J.get(Un.__renderTarget),R=J.get(ui.__renderTarget);N.bindFramebuffer(W.READ_FRAMEBUFFER,S.__webglFramebuffer),N.bindFramebuffer(W.DRAW_FRAMEBUFFER,R.__webglFramebuffer);for(let F=0;F<ke;F++)wi&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,J.get(C).__webglTexture,Y,Ze+F),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,J.get(j).__webglTexture,ce,Ut+F)),W.blitFramebuffer($e,Qe,Be,De,at,wt,Be,De,W.DEPTH_BUFFER_BIT,W.NEAREST);N.bindFramebuffer(W.READ_FRAMEBUFFER,null),N.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(Y!==0||C.isRenderTargetTexture||J.has(C)){let Un=J.get(C),ui=J.get(j);N.bindFramebuffer(W.READ_FRAMEBUFFER,Zn),N.bindFramebuffer(W.DRAW_FRAMEBUFFER,vt);for(let S=0;S<ke;S++)wi?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Un.__webglTexture,Y,Ze+S):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Un.__webglTexture,Y),Jn?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ui.__webglTexture,ce,Ut+S):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,ui.__webglTexture,ce),Y!==0?W.blitFramebuffer($e,Qe,Be,De,at,wt,Be,De,W.COLOR_BUFFER_BIT,W.NEAREST):Jn?W.copyTexSubImage3D(Rt,ce,at,wt,Ut+S,$e,Qe,Be,De):W.copyTexSubImage2D(Rt,ce,at,wt,$e,Qe,Be,De);N.bindFramebuffer(W.READ_FRAMEBUFFER,null),N.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Jn?C.isDataTexture||C.isData3DTexture?W.texSubImage3D(Rt,ce,at,wt,Ut,Be,De,ke,ut,dt,Nt.data):j.isCompressedArrayTexture?W.compressedTexSubImage3D(Rt,ce,at,wt,Ut,Be,De,ke,ut,Nt.data):W.texSubImage3D(Rt,ce,at,wt,Ut,Be,De,ke,ut,dt,Nt):C.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,ce,at,wt,Be,De,ut,dt,Nt.data):C.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,ce,at,wt,Nt.width,Nt.height,ut,Nt.data):W.texSubImage2D(W.TEXTURE_2D,ce,at,wt,Be,De,ut,dt,Nt);W.pixelStorei(W.UNPACK_ROW_LENGTH,ct),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ot),W.pixelStorei(W.UNPACK_SKIP_PIXELS,nt),W.pixelStorei(W.UNPACK_SKIP_ROWS,rn),W.pixelStorei(W.UNPACK_SKIP_IMAGES,kr),ce===0&&j.generateMipmaps&&W.generateMipmap(Rt),N.unbindTexture()},this.initRenderTarget=function(C){J.get(C).__webglFramebuffer===void 0&&$.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?$.setTextureCube(C,0):C.isData3DTexture?$.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?$.setTexture2DArray(C,0):$.setTexture2D(C,0),N.unbindTexture()},this.resetState=function(){b=0,L=0,O=null,N.reset(),tn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};function nm(r){let e=Math.max(0,Math.min(1,(r+.65)/2.25));return 1.1-.68*e*e*(3-2*e)}function wu(r,e=[]){let t=!1,n=new Map,i=new Set(e),s=new w;function a(o){for(let c=o;c&&c!==r;c=c.parent)if(i.has(c)||c.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(c.name)||c.name.startsWith("front-wing-")&&o.name!=="tapered-nose")return!0;return!1}return{set(o){if(o=!!o,o===t)return;t=o,r.updateWorldMatrix(!0,!0);let c=r.matrixWorld.clone().invert();r.traverse(l=>{if(!l.geometry||a(l))return;let h=l.geometry,u=h.getAttribute("position");if(!u)return;n.has(h)||n.set(h,new Float32Array(u.array));let d=n.get(h);if(u.array.set(d),o){let m=new qe().multiplyMatrices(c,l.matrixWorld),p=m.clone().invert();for(let _=0;_<u.count;_++)s.fromBufferAttribute(u,_).applyMatrix4(m),s.z*=nm(s.x),s.y>1.08&&(s.y=1.08+(s.y-1.08)*.68),s.applyMatrix4(p),u.setXYZ(_,s.x,s.y,s.z)}u.needsUpdate=!0,h.computeVertexNormals(),h.computeBoundingBox(),h.computeBoundingSphere()})}}}function Eu({paint:r,carbon:e,metal:t}){let n=new Ve;n.name="formula-cockpit";function i(d,m,p,_){let f=new Je(new xt(new yt(d.map(g=>new w(...g))),40,m,10,!1),p);return f.name=_,f.castShadow=f.receiveShadow=!0,n.add(f),f}i([[-1.03,1.47,-.64],[-.99,2.48,-.64],[-.38,2.55,-.65],[.53,2.49,-.46],[1,2.4,0],[.53,2.49,.46],[-.38,2.55,.65],[-.99,2.48,.64],[-1.03,1.47,.64]],.043,e,"halo-ring"),i([[1,2.4,0],[1.13,1.93,0],[1.22,1.44,0]],.038,t,"halo-pillar"),i([[-1.25,1.4,-.34],[-1.27,2.53,-.28],[-1.22,2.65,0],[-1.27,2.53,.28],[-1.25,1.4,.34]],.048,e,"roll-hoop");for(let d of[-1,1])for(let m of[.67,.94])i([[1.19,m,d*.34],[1.92,m-.12,d*1.24],[2.22,m,d*.31]],.024,e,"front-wishbone");let s=new Ve;s.name="formula-engine-cover";let a=[],o=[],c=[[-2.43,.98,.18,.1],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.4],[-1.26,1.4,.41,.44],[-.99,1.26,.32,.25]],l=32;c.forEach(([d,m,p,_],f)=>{for(let g=0;g<=l;g++){let v=g/l*Math.PI*2;if(a.push(d,m+Math.sin(v)*_,Math.cos(v)*p),f<c.length-1&&g<l){let y=f*(l+1)+g,x=y+l+1;o.push(y,x,y+1,y+1,x,x+1)}}});for(let d of[0,c.length-1])for(let m=1;m<l-1;m++){let p=d*(l+1);d===0?o.push(p,p+m,p+m+1):o.push(p,p+m+1,p+m)}let h=new ht;h.setAttribute("position",new Pe(a,3)),h.setIndex(o),h.computeVertexNormals();let u=new Je(h,r);u.castShadow=u.receiveShadow=!0,s.add(u);for(let d of[-1,1])for(let m=0;m<5;m++){let p=new Je(new Ke(.025,.07,.19),e);p.position.set(-1.48-m*.13,1.57-m*.055,d*.31),p.rotation.z=-.2,s.add(p)}return n.add(s),{group:n,engine:s}}var po=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function mo(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=po(o,.25,.12),u=po(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*po(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*po(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}function Au(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new _t({color:i[t]||"#30241d",roughness:.96}),a=new Ve;function o(c,l,h,u,d,m,p=0){let _=new Xt(1,12,10);n.push(_);let f=new Je(_,s);f.position.set(c,l,h),f.scale.set(u,d,m),f.rotation.z=p,a.add(f)}if(t!=="hairBald"){let c=t==="hairBuzz",l=t==="hairAfro",h=t==="hairMohawk"||t==="hairBlue",u=t==="hairDreads",d=t==="hairRocker";for(let m=0;m<7;m++)for(let p=0;p<12;p++){let _=p/12*Math.PI*2,f=m/7*Math.PI*.57;if(h&&Math.abs(Math.cos(_))>.27)continue;let g=Math.cos(_)*Math.sin(f)*.23,v=.1+Math.sin(_)*Math.sin(f)*.24,y=t==="hairCurly"||l,x=c?.026:y?.067:.045,M=c?.018:l?.12:h?.16:y?.065:.075,b=1.62+Math.cos(f)*.29;t==="hairPompadour"&&(M+=Math.max(0,Math.sin(_))*.1,b+=Math.max(0,Math.sin(_))*.04),(t==="hairSidePart"||t==="hairSilver")&&(b+=g*.16),(u||d)&&(M=m>3?.18:.065,b-=m>3?.07:0),o(g,b,v,x,M,x,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(a),a.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),{dispose(){a.removeFromParent(),n.forEach(c=>c.dispose()),s.dispose()}}}function Cu(r,e,t){let n=[],i=[],s=mo(e.body),a=new _t({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),o=new _t({color:new Ye(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),c=new _t({color:"#e8e5db",roughness:.88}),l=new _t({color:"#1b1f22",roughness:.8}),h=new _t({color:new Ye(t.item("pants",e.pants).color).multiplyScalar(.62),roughness:.95}),u=new _t({color:"#ad8c70",roughness:.72}),d=new _t({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(a,o,c,l,d,h,u);function m(g,v,y){let x=g.getAttribute("position"),M=[],b=[];for(let L=0;L<x.count;L++){let O=s(x.getX(L),.5-x.getY(L)/3.825,x.getZ(L),y);x.setXYZ(L,O[0],(.5-O[1])*3.825,O[2]),M.push(.5+x.getX(L)/2.55,.5-x.getY(L)/3.825),b.push(y)}return g.setAttribute("bodyUv",new Pe(M,2)),g.setAttribute("surface",new Pe(b,1)),n.push(g),r.mesh(g,v)}function p(g,v,y,x=.003){let M=new yt(g.map(b=>new w(...b)));return m(new xt(M,24,x,6,!1),v,y)}function _(g,v,y){let x=new ht,M=g.flat();x.setAttribute("position",new Pe(M,3));let b=[];for(let L=1;L<g.length-1;L++)b.push(0,L,L+1);return x.setIndex(b),x.computeVertexNormals(),v.side=Ot,m(x,v,y)}if(["classic","ruby","midnight"].includes(e.suit)){for(let g of[-1,1])p([[g*.2,1.05,-.207],[g*.35,.82,-.254],[g*.38,.38,-.244],[g*.3,.14,-.201]],o,1,.0025);p([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],o,1,.003);for(let g of[.37,.17]){let v=new Xe(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,g,.275),m(v,l,1)}}for(let g of[-1,1])for(let v=0;v<4;v++){let y=new Xt(1,10,8),x=.166+v*.019,M=[.039,.046,.043,.034][v],b=.54+v*.002;y.scale(.013,.022,.006),y.translate(g*(.5-(x+.009))*2.55,(.5-(b+M*.72))*3.825,.117),m(y,u,3)}for(let g of[-1,1]){let v=g*.45;_([[v-.064,-1.54,.113],[v+.064,-1.54,.113],[v+.077,-1.69,.315],[v-.077,-1.69,.315]],d,5);for(let y=0;y<5;y++){let x=-1.56-y*.026,M=.14+y*.043;p([[v-.062,x,M],[v,x-.008,M+.01],[v+.062,x-.014,M]],c,5,.0035),p([[v+.062,x,M+.001],[v,x-.008,M+.011],[v-.062,x-.014,M+.001]],c,5,.0035)}p([[v-.115,-1.77,.21],[v-.11,-1.77,.35],[v,-1.77,.38],[v+.11,-1.77,.35],[v+.115,-1.77,.21]],d,5,.003),p([[v-.08,-1.55,-.07],[v,-1.52,-.087],[v+.08,-1.55,-.07]],l,5,.006)}return{dispose(){n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}var li=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function Ru(r){let e=[],t={};function n(_,f,g,v,y=0){let x=new br;x.name=_;let M=f?f.userData.rest:[0,0,0];return x.position.set(g-M[0],v-M[1],y-M[2]),x.userData.rest=[g,v,y],(f||r).add(x),e.push(x),t[_]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[_,f]of[["left",-1],["right",1]]){let g=n(_+"Shoulder",a,f*.49,1.09),v=n(_+"Elbow",g,f*.66,.57),y=n(_+"Wrist",v,f*.78,.04,.035),x=n(_+"Hand",y,f*.79,-.15,.07);for(let L=0;L<4;L++)n(_+"Finger"+L,x,f*(.5-(.175+L*.019))*2.55,-.17-L*.007,.07);n(_+"Thumb",x,f*.63,-.13,.11);let M=n(_+"Hip",i,f*.23,-.2,-.01),b=n(_+"Knee",M,f*.34,-.77,-.01);n(_+"Ankle",b,f*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new cs(e);function h(_,f,g){let v=f<.5?"left":"right",y=i,x=i,M=0;if(_===1)y=s,x=a,M=1-li(.25,.44,g);else if(_===2||_===9)g<.25?(y=a,x=t[v+"Shoulder"],M=li(.175,.245,g)):g<.4?(y=t[v+"Shoulder"],x=t[v+"Elbow"],M=li(.29,.38,g)):(y=t[v+"Elbow"],x=t[v+"Wrist"],M=li(.43,.49,g));else if(_===3){let b=f<.5?f:1-f;g>.54?(y=t[v+"Hand"],x=t[v+(b>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((b-.175)/.019))))],M=li(.54,.566,g)):(y=t[v+"Wrist"],x=t[v+"Hand"],M=li(.49,.53,g))}else _===4?g<.57?(y=i,x=t[v+"Hip"],M=li(.5,.57,g)):g<.76?(y=t[v+"Hip"],x=t[v+"Knee"],M=li(.66,.74,g)):(y=t[v+"Knee"],x=t[v+"Ankle"],M=li(.79,.84,g)):_===5||_===8?y=x=t[v+"Ankle"]:_===6?y=x=c:_===7&&(y=a,x=o,M=1-li(.17,.225,g));return{indices:[e.indexOf(y),e.indexOf(x),0,0],weights:[1-M,M,0,0]}}function u(_,f){let g=_.getAttribute("bodyUv"),v=_.getAttribute("surface"),y=[],x=[];for(let b=0;b<g.count;b++){let L=h(v.getX(b),g.getX(b),g.getY(b));y.push(...L.indices),x.push(...L.weights)}_.setAttribute("skinIndex",new Xi(y,4)),_.setAttribute("skinWeight",new Pe(x,4));let M=new os(_,f);return r.add(M),M.bind(l,new qe),M.frustumCulled=!1,M}let d=0;function m(_,f,g){d+=(Number(f)-d)*(1-Math.exp(-Math.min(.1,g)*9));let v=Math.sin(_*1.55)*d;a.scale.set(1+v*.003,1+v*.003,1+v*.007),c.rotation.set(Math.sin(_*.57)*.01*d,Math.sin(_*.36)*.024*d,Math.sin(_*.41)*.008*d);for(let[y,x]of[["left",-1],["right",1]]){t[y+"Shoulder"].rotation.z=(Math.sin(_*.79+x*.5)*.009+x*.005)*d,t[y+"Elbow"].rotation.x=(Math.sin(_*.67+x*.4)*.012-.025)*d,t[y+"Hand"].rotation.x=Math.sin(_*.61+x)*.01*d;for(let M=0;M<4;M++)t[y+"Finger"+M].rotation.x=(.035+Math.sin(_*.53+M*.25+x)*.012)*d}r.updateMatrixWorld(!0),l.update()}function p(_,f){r.updateMatrixWorld(!0),t[f].attach(_)}return{skeleton:l,bones:t,mesh:u,update:m,attach:p,weights:h,dispose(){l.dispose()}}}function Pu(r,e="#c5b899"){let t=new Ve;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new _t({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new _t({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,M,b,L,O)=>{let D=new Je(x,M);return D.position.set(b,L,O),t.add(D),D},o=a(new St(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let M=x*Math.PI/9,b=a(new Ke(.026,.049,.016),i,Math.cos(M)*.083,0,Math.sin(M)*.105);b.rotation.y=-M}let c=a(new Xe(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new St(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),m=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":m?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":m?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=m?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let _=(x,M,b)=>{u.save(),u.rotate(x),u.strokeStyle=m?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-M),u.stroke(),u.restore()};_(-Math.PI/3,112,13),_(Math.PI/3,168,9),_(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=m?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let f=new Et(h);f.colorSpace=ft,f.anisotropy=4;let g=a(new zn(.066,64),new _t({map:f,roughness:.34,metalness:.1}),0,0,.139),v=a(new zn(.066,64),new xn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),y=a(new Xe(.012,.012,.019,16),i,.085,0,.12);return y.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(M=>{M.geometry?.dispose(),M.material&&x.add(M.material)});for(let M of x)M.dispose();f.dispose()}}}function Iu(r="#d3b15b"){let e=new Ve;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new _t({color:"#c5a14d",metalness:.9,roughness:.24}),n=new _t({color:r,metalness:.25,roughness:.13}),i=new Je(new St(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new Je(new Ke(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new Je(new Cr(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function Lu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let _e=n.loadHelmet(!0,e.visor,!0,e.helmet);_e.naturalWidth||await new Promise((Fe,ye)=>{_e.addEventListener("load",Fe,{once:!0}),_e.addEventListener("error",ye,{once:!0})})}let s=n.renderCharacter(i,{...e,hair:"hairNatural",watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,_=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(_e,Fe,ye){let Le=Math.max(0,Math.min(1535,Math.round(ye*1535))),ze=Math.max(0,Math.min(1023,Math.round(Fe*1023)));if(_e[(Le*1024+ze)*4+3]>220)return Fe;for(let gt=1;gt<180;gt++)for(let we of[ze-gt,ze+gt])if(we>=0&&we<1024&&_e[(Le*1024+we)*4+3]>220)return we/1023;return Fe}let v=new Et(a),y=new Et(l),x=new Et(d);for(let _e of[v,y,x])_e.colorSpace=ft,_e.anisotropy=4;let M=n.wardrobeSubcategory("pants",e.pants)==="shorts",b=e.suit?.endsWith("Tank"),L=e.suit?.endsWith("Tee"),O=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",V=new dn({uniforms:{helmetColor:{value:new Ye(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new Ye(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},palmPattern:{value:e.suit==="palmTank"?1:0},hairChanged:{value:!D&&(!e.hat||e.hat==="none")&&e.hair&&e.hair!=="hairNatural"?1:0},helmetOn:{value:D?1:0},shorts:{value:M?1:0},sleeveEnd:{value:b?.165:L?.29:.49},club:{value:O?1:0},portrait:{value:v},rear:{value:y},profile:{value:x},jacketColor:{value:new Ye(n.item("suit",e.suit).color)},pantsColor:{value:new Ye(n.item("pants",e.pants).color)},shoeColor:{value:new Ye(n.item("shoes",e.shoes).color)}},side:Ot,vertexShader:`
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
}`}),I=new Ve,U=[],K=Ru(I),H=mo(e.body);function Z(_e,{rings:Fe=70,sides:ye=80,muzzle:Le=!1,folds:ze=0,z:gt=0,surface:we=0}={}){let st=[],it=[],tn=[],on=[],W=[],It=[],Ht=[],At=[],Pt=_e[0][0],Dt=_e.at(-1)[0];function ci(Yt){let tt=0;for(;tt<_e.length-2&&_e[tt+1][0]<Yt;)tt++;let Zt=_e[tt],zt=_e[tt+1],Lt=Math.max(0,Math.min(1,(Yt-Zt[0])/(zt[0]-Zt[0])));return Zt.map((jt,Jt)=>{if(Jt===0)return Yt;let Mn=_e[Math.max(0,tt-1)][Jt]||0,ln=_e[Math.min(_e.length-1,tt+2)][Jt]||0,gn=zt[Jt]||0;return Math.max(Math.min(jt,gn),Math.min(Math.max(jt,gn),.5*(2*jt+(-Mn+gn)*Lt+(2*Mn-5*jt+4*gn-ln)*Lt*Lt+(-Mn+3*jt-3*gn+ln)*Lt*Lt*Lt)))})}for(let Yt=0;Yt<=Fe;Yt++){let tt=Pt+(Dt-Pt)*Yt/Fe,[,Zt,zt,Lt,jt=0]=ci(tt),Jt=(Zt+zt)/2,Mn=(zt-Zt)/2;for(let ln=0;ln<=ye;ln++){let gn=2*Math.PI*ln/ye,hi=Math.cos(gn),vn=Math.sin(gn),Kt=Jt+Mn*hi,rr=we===1||we===2&&tt<(b?.165:L?.29:.49)||we===4&&(!M||tt<.65),Zn=Lt*(1+(rr?ze:0)*Math.sin(tt*65+gn*3)*Math.sin(Math.PI*Yt/Fe)),vt=gt+jt+Zn*vn;if(Le&&vn>0){let De=(Kt-.507)/.085;vt+=.17*Math.exp(-(De*De)-((tt-.126)/.031)**2)*vn*vn,vt+=.045*Math.exp(-(((Kt-.505)/.05)**2)-((tt-.104)/.015)**2)*vn,vt-=.028*(Math.exp(-(((Kt-.466)/.024)**2))+Math.exp(-(((Kt-.55)/.024)**2)))*Math.exp(-(((tt-.077)/.013)**2))*vn}let C=H(((we===5?Jt+(Kt-Jt)*.88:Kt)-.5)*2.55,tt,we===5?vt*.84:vt,we);if(Le&&e.hair&&e.hair!=="hairNatural"&&tt<.065){let De=1-tt/.065;C[0]*=1-.12*De,C[2]=.1+(C[2]-.1)*(1-.1*De),C[1]+=.008*De}st.push(C[0],(.5-C[1])*3.825,C[2]),It.push(Kt,tt),Ht.push(we);let j=Kt,ie=tt;we===3&&(j=(Kt<.5?.2:.8)+(Kt-(Zt+zt)/2)*.45,ie=Math.min(tt,.545)),it.push(g(_,j,ie),1-ie);let ae=tt,Y=Kt;Le?ae=.008+(tt-.008)*.74:Pt<.24&&Dt>.4&&Zt>.29&&zt<.72&&(ae=.14+(tt-.165)*1.08),Pt>.82&&(Y=Jt+(Kt-Jt)*.8),tn.push(g(f,Y,ae),1-ae);let ce=Le?tt*.92:tt,Be=(Le?.45:.49)+vt*.4;if(Pt>=.45&&Dt>.62&&tt>.49&&tt<.62&&(Be=Math.min(Be,.43)),on.push(g(p,Be,ce),1-ce),W.push(vn),Yt<Fe&&ln<ye){let De=Yt*(ye+1)+ln,ke=De+ye+1;At.push(De,De+1,ke,De+1,ke+1,ke)}}}for(let Yt of[0,Fe]){let tt=Yt*(ye+1),Zt=st.length/3;for(let[zt,Lt]of[[st,3],[it,2],[tn,2],[on,2],[It,2]])for(let jt=0;jt<Lt;jt++){let Jt=0;for(let Mn=0;Mn<ye;Mn++)Jt+=zt[(tt+Mn)*Lt+jt];zt.push(Jt/ye)}Ht.push(we),W.push(0);for(let zt=0;zt<ye;zt++)Yt===0?At.push(Zt,tt+zt+1,tt+zt):At.push(Zt,tt+zt,tt+zt+1)}let bt=new ht;bt.setAttribute("bodyUv",new Pe(It,2)),bt.setAttribute("surface",new Pe(Ht,1)),bt.setAttribute("position",new Pe(st,3)),bt.setAttribute("uv",new Pe(it,2)),bt.setAttribute("rearUv",new Pe(tn,2)),bt.setAttribute("profileUv",new Pe(on,2)),bt.setAttribute("frontWeight",new Pe(W,1)),bt.setIndex(At),bt.computeVertexNormals(),K.mesh(bt,V),U.push(bt)}Z([[.165,.435,.575,.1],[.19,b?.405:.35,b?.605:.65,b?.15:.21],[.245,b?.335:.313,b?.675:.69,.235],[.32,.33,.68,.225],[.4,.33,.67,.21],[.455,.33,.67,.195],[.475,.37,.63,.18]],{folds:.025,surface:1}),Z([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),Z(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(Z([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),Z([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let _e of[-1,1]){let Fe=ye=>_e<0?ye:ye.map(([Le,ze,gt,we,st])=>[Le,1-gt,1-ze,we,st||0]);Z(Fe([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.305,.194,.305,.121,.005],[.34,.185,.283,.103,-.018],[.375,.17,.272,.132,.004],[.41,.153,.256,.128,.018],[.455,.149,.241,.1,.018],[.49,.158,.23,.079,.01]]),{z:-.025,folds:.025,rings:100,surface:2}),!L&&!b?Z(Fe([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}):L&&Z(Fe([[.279,.205,.317,.143],[.288,.201,.314,.144]]),{z:-.025,rings:8,surface:2}),O&&Z(Fe([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),Z(Fe([[.478,.168,.221,.055],[.493,.151,.23,.08],[.515,.151,.241,.082],[.531,.153,.245,.086],[.545,.165,.241,.066],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let ye=0;ye<4;ye++){let Le=.166+ye*.019,ze=.54+ye*.002,gt=[.039,.046,.043,.034][ye];Z(Fe([[ze,Le,Le+.019,.024,0],[ze+gt*.35,Le-.001,Le+.02,.025,.008],[ze+gt*.72,Le+.001,Le+.018,.021,.026],[ze+gt,Le+.005,Le+.014,.007,.035]]),{z:.07,rings:22,sides:24,surface:3})}Z(Fe([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}Z([[.454,.36,.65,.17],[.48,.313,.69,.205],[.53,.3,.703,.215],[.58,.31,.69,.205],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let _e of[-1,1]){let Fe=ye=>_e<0?ye:ye.map(([Le,ze,gt,we,st])=>[Le,1-gt,1-ze,we,st||0]);Z(Fe([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,M?.302:.271,M?.428:.44,M?.14:.19],[.72,M?.292:.262,M?.416:.432,M?.155:.19],[.77,M?.286:.247,M?.396:.41,M?.135:.175],[.81,M?.294:.248,M?.387:.393,M?.115:.16],[.843,M?.3:.27,M?.379:.385,M?.095:.13],[.884,.304,.368,.078],[.92,.308,.361,.07]]),{z:-.01,folds:.012,rings:110,surface:4}),Z(Fe([[.893,.304,.352,.075,-.015],[.908,.284,.373,.12,.015],[.929,.269,.386,.215,.095],[.95,.263,.389,.275,.145],[.963,.265,.387,.281,.15],[.972,.272,.38,.267,.15]]),{z:.015,rings:54,surface:5}),Z(Fe([[.968,.269,.383,.269,.15],[.974,.265,.387,.277,.15],[.982,.267,.385,.272,.15],[.986,.276,.376,.251,.15]]),{z:.015,rings:14,surface:8})}let ne=Cu(K,e,n),de=Au(K,e),le=e.ring&&e.ring!=="none"?Iu(n.item("ring",e.ring).color):null;le&&(I.add(le.group),K.attach(le.group,"rightHand"));let Te=e.watch&&e.watch!=="none"?Pu(e.watch,n.item("watch",e.watch).color):null;Te&&(I.add(Te.group),K.attach(Te.group,"rightWrist"));let Ae=new yn;Ae.add(I);{Ae.add(new Ln("#fff0d4","#283849",2.1));let _e=new wn("#fff0dc",3.5);_e.position.set(-2,4,5),Ae.add(_e);let Fe=new wn("#9cc3ed",1.2);Fe.position.set(3,1,-2),Ae.add(Fe)}let Q=new Vn({alpha:!0,antialias:!0});Q.setPixelRatio(Math.min(devicePixelRatio,2)),Q.outputColorSpace=ft,r.append(Q.domElement),Q.domElement.setAttribute("role","img"),Q.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let ge=new Ti(-1.5,1.5,2.05,-2.05,.1,30);ge.position.set(0,0,8);let he=t.yaw||0,fe=t.pitch||0,ve=null,q,be=!1,A=!1,E=0,X=window.matchMedia?.("(prefers-reduced-motion: reduce)"),z="full",T=t.focusOrbit||null,P=2.05,k=0,N=0;function re(_e){_e=_e==="watch"?"watch":"full",_e!==z&&(_e==="watch"?(T=T||{yaw:he,pitch:fe},t.focusOrbit=T,he=0,fe=0):T&&(he=T.yaw,fe=T.pitch,T=null,delete t.focusOrbit),t.yaw=he,t.pitch=fe,z=_e,r.dataset.focus=z)}function J(_e){let Fe=r.clientWidth/Math.max(1,r.clientHeight),ye=z==="watch",Le=ye?Math.max(.4,.3/Fe):Math.max(2.4,1.17/Fe),ze=ye?.76*Math.cos(he)+.1*Math.sin(he):0,gt=ye?.04*Math.cos(fe)-(.1*Math.cos(he)-.76*Math.sin(he))*Math.sin(fe):-.22,we=1-Math.exp(-_e*12);P+=(Le-P)*we,k+=(ze-k)*we,N+=(gt-N)*we,ge.left=k-P*Fe,ge.right=k+P*Fe,ge.top=N+P,ge.bottom=N-P,ge.updateProjectionMatrix()}let $=()=>{!r.clientWidth||!r.clientHeight||(J(1),Q.setSize(r.clientWidth,r.clientHeight,!1))},xe=new ResizeObserver($);xe.observe(r),$();let Ie=_e=>{A=!1,ve={id:_e.pointerId,x:_e.clientX,y:_e.clientY},r.setPointerCapture(_e.pointerId),_e.preventDefault()},Me=_e=>{!ve||ve.id!==_e.pointerId||(he+=(_e.clientX-ve.x)*.012,fe=Math.max(-.35,Math.min(.35,fe+(_e.clientY-ve.y)*.006)),ve.x=_e.clientX,ve.y=_e.clientY)},Ne=()=>{ve=null},Oe=_e=>{["ArrowLeft","ArrowRight"].includes(_e.key)&&(he+=_e.key==="ArrowLeft"?-.15:.15,_e.preventDefault())};r.addEventListener("pointerdown",Ie),r.addEventListener("pointermove",Me),r.addEventListener("pointerup",Ne),r.addEventListener("pointercancel",Ne),r.addEventListener("keydown",Oe);function je(_e=0){if(be)return;if(!r.isConnected){rt();return}A&&!ve&&E&&(he+=Math.min(.05,(_e-E)/1e3)*.35),V.uniforms.idleTime.value=_e/1e3,V.uniforms.idleStrength.value=!X?.matches&&!ve&&z==="full"?1:0;let Fe=E?Math.min(.05,(_e-E)/1e3):.016;K.update(_e/1e3,V.uniforms.idleStrength.value,Fe),J(Fe),E=_e,I.rotation.set(fe,he,0),t.yaw=he,t.pitch=fe,r.dataset.yaw=String(he),Q.render(Ae,ge),q=requestAnimationFrame(je)}return je(),{state:t,setFocus:re,setYaw(_e){he=_e},setAutoRotate(_e){A=!!_e},dispose:rt};function rt(){if(!be){be=!0,cancelAnimationFrame(q),xe.disconnect();for(let[_e,Fe]of[["pointerdown",Ie],["pointermove",Me],["pointerup",Ne],["pointercancel",Ne],["keydown",Oe]])r.removeEventListener(_e,Fe);for(let _e of U)_e.dispose();Te?.dispose(),le?.dispose(),ne.dispose(),de.dispose(),K.dispose(),V.dispose(),v.dispose(),y.dispose(),x.dispose(),Q.dispose(),Q.forceContextLoss(),Q.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new yn,s=new Ve;i.add(s);let a=new Vn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ft,a.toneMapping=si,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new Gt(34,1,.1,40);i.add(new Ln("#dcecff","#50402b",2));for(let[q,be,A,E]of[[3,6,5,4],[-3,3,-3,3]]){let X=new wn("#fff0dd",E);X.position.set(q,be,A),i.add(X)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let q=0;q<128;q+=2)l.fillStyle=q%4?"#808080":"#b0b0b0",l.fillRect(0,q,128,1);for(let q=0;q<128;q+=3)l.fillStyle="#888888",l.fillRect(q,0,1,128);let h=new Et(c);h.wrapS=h.wrapT=qn,h.repeat.set(8,8);let u=(q,be=0,A=.7)=>new _t({color:q,metalness:be,roughness:A}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),_=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),y=u("#171b20"),x=u("#826222",.9,.18);for(let q of[g,v,p])q.bumpMap=h,q.bumpScale=.012;function M(q,be,A,E,X,z,T,P=s){let k=new Je(new Xt(1,40,28),q);return k.position.set(be,A,E),k.scale.set(X,z,T),P.add(k),k}function b(q,be,A,E,X=E){let z=new w(...be),T=new w(...A),P=T.clone().sub(z),k=new Je(E>.1?new wr((E+X)/2,Math.max(.01,P.length()-(E+X)),10,32):new Xe(X,E,P.length(),16),q);return k.position.copy(z.add(T).multiplyScalar(.5)),k.quaternion.setFromUnitVectors(new w(0,1,0),P.normalize()),s.add(k),k}M(v,0,1.64,0,.47,.36,.26),M(g,0,2.32,0,.59,.65,.32),M(p,0,2.35,.29,.27,.49,.055);for(let q of[-1,1]){b(v,[q*.27,1.67,0],[q*.29,.92,.015],.23,.25),M(v,q*.29,.92,.015,.23,.24,.24),b(v,[q*.29,.94,.015],[q*.32,.28,0],.16,.22),b(_,[q*.45,1.55,.03],[q*.48,.36,.03],.025,.032),M(y,q*.32,.18,.15,.22,.19,.39),M(_,q*.32,.075,.15,.235,.065,.4),M(_,q*.32,.27,.12,.135,.08,.2);for(let be=0;be<5;be++)b(_,[q*.32-.1,.29,.08+be*.04],[q*.32+.1,.29,.08+be*.04],.009);M(g,q*.55,2.63,0,.26,.27,.29),b(g,[q*.57,2.63,0],[q*.76,2.12,.02],.19,.23),M(g,q*.76,2.12,.02,.19,.2,.2),b(g,[q*.76,2.12,.02],[q*.88,1.65,.08],.13,.18),b(_,[q*.71,2.6,.15],[q*.99,1.72,.15],.035),M(p,q*.88,1.67,.08,.145,.09,.15),M(d,q*.89,1.48,.1,.16,.22,.12);for(let be=0;be<4;be++)M(m,q*(.79+be*.065),1.36,.15,.035,.13,.045);M(m,q*.75,1.48,.2,.06,.12,.06)}M(d,0,3.04,0,.25,.27,.24),M(d,0,3.39,0,.36,.43,.31);for(let q of[-1,1])M(m,q*.36,3.4,.01,.12,.17,.09),M(d,q*.36,3.4,.065,.065,.1,.035),M(m,q*.15,3.43,.258,.15,.12,.075),M(p,q*.14,3.44,.32,.045,.035,.02),M(_,q*.13,3.45,.335,.009,.01,.006),M(d,q*.15,3.53,.28,.18,.05,.07);M(m,0,3.23,.27,.26,.18,.13),M(m,0,3.34,.34,.14,.08,.08),M(p,0,3.17,.375,.17,.017,.018),M(m,0,3.13,.36,.17,.035,.025);let L=new Ve;s.add(L),M(p,0,3.51,-.02,.41,.42,.35,L),M(f,0,3.64,.015,.07,.3,.36,L);for(let q of[-1,1])M(p,q*.32,3.29,.015,.1,.31,.24,L),M(f,q*.39,3.43,.07,.025,.05,.05,L);let O=M(x,0,3.44,.27,.38,.19,.14,L);for(let q of[-1,1])b(p,[q*.28,2.88,.25],[q*.1,2.58,.33],.035),b(p,[q*.3,2.28,.3],[q*.39,2.09,.26],.018);for(let q=0;q<6;q++)M(f,0,2.03+q*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let V=D.getContext("2d"),I=new Et(D);I.colorSpace=ft;let U=new Je(new Wt(.28,.12),new _t({map:I,roughness:.9}));U.position.set(-.27,2.46,.317),s.add(U);let K=new Ve;for(let q=0;q<3;q++)for(let be=0;be<5;be++){let A=new Je(new Wt(.048,.048),(be+q)%2?p:_);A.position.set(-.36+be*.048,2.62+q*.048,.318),K.add(A)}s.add(K);function H(q){g.color.set(n.item("suit",q.suit).color),v.color.set(n.item("pants",q.pants).color),y.color.set(n.item("shoes",q.shoes).color),L.visible=q.helmet!=="none",O.position.y=q.visor==="open"?3.71:3.44,O.rotation.x=q.visor==="open"?-.8:0,U.visible=q.patch!=="none",V.fillStyle="#22282b",V.fillRect(0,0,512,256),V.strokeStyle="#c9af74",V.lineWidth=12,V.strokeRect(8,8,496,240),V.fillStyle="#eee0b5",V.font="bold 72px Arial",V.textAlign="center",V.fillText(q.patch==="name"?q.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":q.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),I.needsUpdate=!0}H(e),t.yaw??=0,t.pitch??=.07;let Z=null,ne,de=!1;function le(){let q=r.clientWidth,be=r.clientHeight;!q||!be||(a.setSize(q,be,!1),o.aspect=q/be,o.updateProjectionMatrix())}let Te=new ResizeObserver(le);Te.observe(r),le();let Ae=q=>{Z={id:q.pointerId,x:q.clientX,y:q.clientY},r.setPointerCapture(q.pointerId),q.preventDefault()},Q=q=>{!Z||Z.id!==q.pointerId||(t.yaw-=(q.clientX-Z.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(q.clientY-Z.y)*.006)),Z.x=q.clientX,Z.y=q.clientY)},ge=()=>{Z=null},he=q=>{(q.key==="ArrowLeft"||q.key==="ArrowRight")&&(t.yaw+=q.key==="ArrowLeft"?.15:-.15,q.preventDefault())};r.addEventListener("pointerdown",Ae),r.addEventListener("pointermove",Q),r.addEventListener("pointerup",ge),r.addEventListener("pointercancel",ge),r.addEventListener("keydown",he);function fe(){if(de)return;de=!0,cancelAnimationFrame(ne),Te.disconnect();for(let[be,A]of[["pointerdown",Ae],["pointermove",Q],["pointerup",ge],["pointercancel",ge],["keydown",he]])r.removeEventListener(be,A);let q=new Set;i.traverse(be=>{be.geometry?.dispose(),be.material&&q.add(be.material)});for(let be of q)be.dispose();I.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function ve(){if(de)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){fe();return}let q=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*q,1.95+Math.sin(t.pitch)*q,Math.cos(t.yaw)*Math.cos(t.pitch)*q),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ne=requestAnimationFrame(ve)}return ve(),{update:H,dispose:fe,state:t}};function dc(r){let e=new Ve;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,V,I)=>new xn({color:D,metalness:V,roughness:I,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,V,I=0,U=0,K=0)=>{let H=new Je(D,V);return H.position.set(I,U,K),H.castShadow=H.receiveShadow=!0,e.add(H),H},h=(D,V,I,U=!0)=>{let K=new pn;return K.absarc(V,I,D,0,Math.PI*2,U),K},u=t?.395:.437,d=new Vt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[V,I]of[[.28,0],[.36,.045]]){let U=D*Math.PI/12+I;d.holes.push(h(n?.009:.011,Math.cos(U)*V,Math.sin(U)*V))}for(let D of[0,.033])l(new Bt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let m=new Ke(.22,.014,.025),p=new us(m,a,32),_=new qe;for(let D=0;D<32;D++){let V=D*Math.PI/16;_.compose(new w(Math.cos(V)*.31,Math.sin(V)*.31,.021),new Rn().setFromAxisAngle(new w(0,0,1),V+.18),new w(1,1,1)),p.setMatrixAt(D,_)}e.add(p);let f=l(new Xe(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new Xe(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let V=D*Math.PI/5,I=l(new Xe(.017,.017,.015,12),s,Math.cos(V)*.18,Math.sin(V)*.18,.05);I.rotation.x=Math.PI/2;let U=l(new Xe(.009,.009,.018,6),a,Math.cos(V)*.18,Math.sin(V)*.18,.058);U.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let V=l(new St(D,.0012,3,96),a,0,0,.042);V.castShadow=!1}if(!t)for(let D=0;D<8;D++){let V=D*Math.PI/4,I=[.25,.29,.34,.395].map((K,H)=>new w(Math.cos(V+H*.075)*K,Math.sin(V+H*.075)*K,.043)),U=l(new xt(new yt(I),12,.0024,3,!1),a);U.castShadow=!1}let v=new Vt;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let y=l(new Bt(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new Ke(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let V=l(new Xe(.055,.055,.028,24),c,.354,D,.07);V.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let V=l(new Xe(.014,.014,.025,6),s,.325,D,.094);V.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let M=x.getContext("2d");M.fillStyle="#f5f0df",M.translate(64,192),M.rotate(-Math.PI/2),M.textAlign="center",M.font="italic bold 60px Arial",M.fillText(t?"P21":"P21 SPORT",0,20);let b=new Et(x);b.colorSpace=ft;let L=l(new Wt(.075,.24),new On({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);L.castShadow=!1;let O=l(new Xe(.012,.014,.047,6),s,.36,.217,.042);return O.rotation.z=.2,e}var uc;function Du(r,e){if(!r.isConnected)return;if(!uc){let a=new Vn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ft,a.toneMapping=si,a.toneMappingExposure=1.15;let o=new yn;o.add(new Ln("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Gt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),uc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=uc;s[e]||(s[e]=dc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Uu(r){let e=new Ve;e.name="tyre-"+r;let t=new _t({color:"#15181b",roughness:.86}),n=new _t({color:"#050708",roughness:.96}),i=new _t({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new Je(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new Si([new pe(.56,-.19),new pe(.63,-.25),new pe(.72,-.23),new pe(.79,-.15),new pe(.8,-.1),new pe(.8,.1),new pe(.79,.15),new pe(.72,.23),new pe(.63,.25),new pe(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new St(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,m=s(new Ke(.018,.036,.006),i);m.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),m.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,m)=>{let p=-.2+m/15*.4,_=.8-.045*(Math.abs(p)/.2)**3,f=h+(o?.18:.08)*Math.sin(m/15*Math.PI);return new w(Math.sin(f)*_,Math.cos(f)*_,p)});s(new xt(new yt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new St(.798,.004,8,80),n);h.position.z=l}}return e}function Nu(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Pe(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new Rr({depthPacking:oo});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Fu(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new Ve;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(M,b,L)=>{let O=new Je(M,b);return O.name=L,O.castShadow=O.receiveShadow=!0,c.add(O),O};for(let M=0;M<h;M++){let b=[],L=[];for(let I=0;I<=72;I++){let U=I/72*2-1,K=U*l/2,H=(M?a?.36:.46:.76)*(1-.22*U*U),Z=(M?2.86+M*.055:3.02)-.13*U*U,ne=.43+M*.095+.1*Math.pow(Math.abs(U),3);for(let de=0;de<=28;de++){let le=de/28*Math.PI*2,Te=Math.cos(le);b.push(Z+Te*H/2,ne+.035*(1-Te*Te)+Math.sin(le)*(M?.024:.035),K)}if(I<72)for(let de=0;de<28;de++){let le=I*29+de,Te=le+28+1;L.push(le,le+1,Te,le+1,Te+1,Te)}}let V=new ht;V.setAttribute("position",new Pe(b,3)),V.setIndex(L),V.computeVertexNormals(),u(V,M===0?n:t,"wing-element-"+M)}let d=[[1.06,1.04,1.22,.31],[1.3,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1,.27,.17],[2.39,.97,a?.22:.19,.13],[2.7,.93,a?.18:.15,.1],[2.94,.9,a?.15:.12,.08],[3.06,.89,a?.12:.09,.055]],m=[0,1,2,3].map(M=>new yt(d.map((b,L)=>new w(b[M],L,0)),!1,"catmullrom",.35)),p=[],_=[],f=96,g=48;for(let M=0;M<=f;M++){let b=M/f,[L,O,D,V]=m.map(I=>I.getPoint(b).x);for(let I=0;I<=g;I++){let U=I/g*Math.PI*2,K=Math.cos(U),H=Math.sin(U),Z=a?.7:.82;p.push(L,O+Math.sign(H)*Math.pow(Math.abs(H),Z)*V,Math.sign(K)*Math.pow(Math.abs(K),Z)*D)}if(M<f)for(let I=0;I<g;I++){let U=M*(g+1)+I,K=U+1;_.push(U,U+g+1,K,K,U+g+1,K+g+1)}}let v=_.length;for(let M of[0,f]){let b=M*(g+1);for(let L=1;L<g-1;L++)M===0?_.push(b,b+L,b+L+1):_.push(b,b+L+1,b+L)}let y=new ht;y.setAttribute("position",new Pe(p,3)),y.setIndex(_),y.computeVertexNormals();let x=Math.floor(f*.89)*g*6;y.addGroup(0,x,0),y.addGroup(x,v-x,a?1:0),y.addGroup(v,_.length-v,0),u(y,[t,s],"tapered-nose");for(let M of[-1,1]){let b=u(new Ke(.15,.4,.035),n,"nose-pylon");b.position.set(2.94,.69,M*.1),b.rotation.z=-.15;let L=new Vt;L.moveTo(2.57,.38),L.lineTo(3.43,.38),L.quadraticCurveTo(3.53,.42,3.43,.61),L.lineTo(3.14,a?.69:.64),L.quadraticCurveTo(2.79,a?.71:.66,2.61,.57),L.closePath();let O=u(new Bt(L,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");O.position.z=M*l/2-.017,u(new Ke(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,M*(l/2+.055));let V=new yt([[2.65,.57],[2.9,a?.68:.63],[3.13,a?.68:.63],[3.4,.61]].map(([I,U])=>new w(I,U,M*(l/2+.025))));if(u(new xt(V,28,.009,6,!1),s,"endplate-trim"),a)for(let I=0;I<3;I++){let U=u(new Ke(.27,.075,.018),n,"flow-fin");U.position.set(2.86+I*.07,.54+I*.045,M*(1.1+I*.1)),U.rotation.z=.15}}for(let M of c.children){let b=M.geometry?.getAttribute("position");if(b){for(let L=0;L<b.count;L++)b.setX(L,b.getX(L)*.78);M.geometry.computeVertexNormals()}M.position.x=.2332+M.position.x*.78}return c}function pc(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new an;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new qe().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function mc(r,{paint:e,carbon:t,metal:n}){let i=new Ve;i.name="rear-wing-"+r;let s=new Ve;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(g,v,y,x,M,b,L=i){let O=new Je(g,v);return O.name=y,O.position.set(x,M,b),O.castShadow=O.receiveShadow=!0,L.add(O),O}function m(g,v,y,x,M){let b=new Vt;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let L=new Bt(b,{depth:y,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});L.translate(0,0,-y/2);let O=d(L,M,"rear-wing-blade",g,v,0,s);O.rotation.z=-.08}if(m(0,l,h,u,o||r==="sport"?t:n),c&&m(.025,l+.23,h*.96,u*.7,t),a&&m(-.05,l-.18,h,.3,e),r!=="lip")for(let g of[-1,1])d(new Ke(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),g*h/2,s);let p=[];for(let g of[-.72,.72]){d(new Ke(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,g);for(let x of[-2.36,-2.22])d(new Xe(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,g);let v=d(new Ke(1,.075,.085),t,"rearward-mount-arm",0,1.015,g),y=d(new Ke(.085,1,.075),t,"rear-wing-upright",0,0,g);p.push({lower:v,post:y,z:g})}let _=pc([s],i).max.x;function f(g){let v=Math.min(-2.85,g&&!g.isEmpty()?g.min.x-.24-_:-2.85);s.position.x=v;for(let{lower:y,post:x}of p)y.position.x=(-2.29+v)/2,y.scale.x=Math.abs(v+2.29),x.position.set(v,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=v,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function Bu(r="classic"){let e=new Ve;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new _t({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new _t({color:"#161d23",roughness:.83,metalness:.15}),a=new _t({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,m,p=e){let _=new Je(c,l);return _.name=h,_.position.set(u,d,m),_.castShadow=_.receiveShadow=!0,p.add(_),_}o(new Ke(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new Xe(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new Xe(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),m=new w(1.1,1.31,l),p=m.clone().sub(d),_=d.clone().add(m).multiplyScalar(.5);o(new Ke(.055,p.length(),.035),i,c+"-lever",..._.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),p.normalize());let g=c==="brake"?.24:.32,v=new Vt,y=h/2,x=g/2,M=.025;if(v.moveTo(-y+M,-x),v.lineTo(y-M,-x),v.quadraticCurveTo(y,-x,y,-x+M),v.lineTo(y,x-M),v.quadraticCurveTo(y,x,y-M,x),v.lineTo(-y+M,x),v.quadraticCurveTo(-y,x,-y,x-M),v.lineTo(-y,-x+M),v.quadraticCurveTo(-y,-x,-y+M,-x),n)for(let O of[-.065,0,.065])for(let D of c==="brake"?[-.055,.055]:[0]){let V=new pn;V.absarc(D,O,.014,0,Math.PI*2,!0),v.holes.push(V)}let b=o(new Bt(v,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let O of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new Ke(h*.76,.009,.007),n?a:i,c+"-grip",0,O,-.007,b);let L=Array.from({length:65},(O,D)=>{let V=D/64,I=V*Math.PI*12;return new w(.77+V*.23,1.095+V*.15+Math.sin(I)*.018,l+.045+Math.cos(I)*.018)});if(o(new xt(new yt(L),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let O=o(new Xe(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);O.rotation.z=-1.05}}return e}function gc(r){let e=new Ve;e.name="sport-seat-"+r;let t=(I,U=.8,K=0)=>new xn({color:I,roughness:U,metalness:K,clearcoat:K?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let U=0;U<64;U+=8)p.fillStyle=(U+I)%16?"#121820":"#626973",p.fillRect(U,I,7,3),p.fillStyle="#252b33",p.fillRect(U,I+4,3,4);let _=new Et(m);_.wrapS=_.wrapT=qn,_.repeat.set(3,5),_.colorSpace=ft,c.map=_,c.bumpMap=_,c.bumpScale=.004;let f=(I,U,K=0,H=0,Z=0,ne=e)=>{let de=new Je(I,U);return de.position.set(K,H,Z),de.castShadow=de.receiveShadow=!0,ne.add(de),de},g=(I,U,K,H,Z,ne,de,le,Te=e)=>{let Ae=new Vt,Q=-I/2,ge=-U/2;return H=Math.min(H,I/2,U/2,K/2),Ae.moveTo(Q+H,ge),Ae.lineTo(Q+I-H,ge),Ae.quadraticCurveTo(Q+I,ge,Q+I,ge+H),Ae.lineTo(Q+I,ge+U-H),Ae.quadraticCurveTo(Q+I,ge+U,Q+I-H,ge+U),Ae.lineTo(Q+H,ge+U),Ae.quadraticCurveTo(Q,ge+U,Q,ge+U-H),Ae.lineTo(Q,ge+H),Ae.quadraticCurveTo(Q,ge,Q+H,ge),f(new Bt(Ae,{depth:K-2*H,bevelEnabled:!0,bevelSize:H,bevelThickness:H,bevelSegments:4,curveSegments:12}),Z,ne,de,le-K/2+H,Te)},v=(I,U,K,H=e)=>f(new xt(new yt(I.map(Z=>new w(...Z))),32,U,6,!1),K,0,0,0,H),y=new Ve;y.rotation.x=-.14,y.position.set(0,.2,0),e.add(y);let x=new Vt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let I of[-.135,.135]){let U=new pn;U.moveTo(I-.075,1.24),U.lineTo(I+.075,1.24),U.lineTo(I+.075,1.34),U.lineTo(I-.075,1.34),U.closePath(),x.holes.push(U)}f(new Bt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,y),f(new Bt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,y).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,y),g(.46,.5,.12,.035,o,0,.85,.065,y),g(.45,.31,.17,.04,o,0,.4,.1,y);for(let I of[-1,1]){let U=g(.17,.42,.19,.055,a,I*.34,.98,.1,y);U.rotation.z=I*.28,U.rotation.y=-I*.25;let K=g(.13,.55,.23,.045,a,I*.3,.49,.14,y);K.rotation.z=-I*.12,v([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,y);let H=I*.135;for(let Z of[1.235,1.345])g(.16,.014,.022,.004,h,H,Z,.015,y);for(let Z of[H-.08,H+.08])g(.014,.12,.022,.004,h,Z,1.29,.015,y)}let b=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let L=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);L.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])v([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])g(.14,.13,.64,.04,a,I*.45,.65,.32),g(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let U of[-.1,.1])v([[U-.1,I,.18],[U,I+.07,.18],[U+.1,I,.18]],.003,l,y)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),v([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let U=g(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);U.rotation.z=-I*.12,v([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let K of[.02,.65])g(.13,.09,.12,.015,c,I*.28,-.055,K),f(new Xe(.022,.022,.015,12),h,I*.28,-.002,K)}for(let I=.3;I<1.08;I+=.11)v([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,y);for(let I of[-1,1]){let U=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],K=[],H=[];U.forEach(([le,Te,Ae],Q)=>{K.push(le-.033,Te,Ae,le+.033,Te,Ae),Q&&H.push(Q*2-2,Q*2-1,Q*2,Q*2-1,Q*2+1,Q*2)});let Z=new ht;Z.setAttribute("position",new Pe(K,3)),Z.setIndex(H),Z.computeVertexNormals();let ne=u.clone();ne.side=Ot,f(Z,ne);let de=g(.27,.055,.025,.008,u,I*.18,.64,.45);de.rotation.z=-I*.2}let O=f(new Xe(.065,.065,.035,24),h,0,.66,.48);O.rotation.x=Math.PI/2;let D=f(new Xe(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);D.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let V=new an().setFromObject(b).min.y;for(let I of e.children)I.position.y-=V;return e.userData.floorContact=0,e}var fc;function Ou(r,e){if(!r.isConnected||e==="none")return;if(!fc){let a=new Vn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ft,a.toneMapping=si,a.toneMappingExposure=1.25;let o=new yn;o.add(new Ln("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new wn("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new Gt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),fc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=fc;s[e]||(s[e]=gc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Lu;window.pokerPaintBrakePreview=Du;window.pokerPaintSeatPreview=Ou;var zu=(r,e,t)=>Math.max(e,Math.min(t,r));function im(r,e){let t=window.PokerGarage,n=new Ve;r.add(n),n.scale.set(1.24,.86,.95);let i=(S,R,F)=>new xn({color:S,metalness:R,roughness:F,clearcoat:R>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(S,R,F=0,ee=0,B=0,oe=n){let G=new Je(S,R);return G.position.set(F,ee,B),G.castShadow=!0,G.receiveShadow=!0,oe.add(G),G}let _=(S,R,F,ee,B,oe,G)=>p(new Ke(S,R,F),ee,B,oe,G);function f(S,R,F,ee,B,oe,G="y"){let se=p(new Xe(S,S,R,64),F,ee,B,oe);return G==="z"&&(se.rotation.x=Math.PI/2),G==="x"&&(se.rotation.z=Math.PI/2),se}function g(S,R,F,ee,B,oe,G="z"){let se=p(new St(S,R,12,80),F,ee,B,oe);return G==="y"&&(se.rotation.x=Math.PI/2),G==="x"&&(se.rotation.y=Math.PI/2),se}function v(S,R,F,ee=Vt){let B=new ee,oe=-S/2,G=-R/2;return F=Math.min(F,R/2-.001),B.moveTo(oe+F,G),B.lineTo(oe+S-F,G),B.quadraticCurveTo(oe+S,G,oe+S,G+F),B.lineTo(oe+S,G+R-F),B.quadraticCurveTo(oe+S,G+R,oe+S-F,G+R),B.lineTo(oe+F,G+R),B.quadraticCurveTo(oe,G+R,oe,G+R-F),B.lineTo(oe,G+F),B.quadraticCurveTo(oe,G,oe+F,G),B}function y(S,R,F,ee,B,oe,G=null,se=.025){let ue=v(S,R,ee);if(G){let Ce=v(G[0],G[1],G[2],pn),Re=new pn(Ce.getPoints(40).map(te=>new pe(te.x+(G[3]||0),te.y)));ue.holes.push(Re)}let He=p(new Bt(ue,{depth:F,bevelEnabled:se>0,bevelSize:se,bevelThickness:se,bevelSegments:4,curveSegments:40}),B,0,oe,0);return He.rotation.x=-Math.PI/2,He}let x=[],M=n.children.length,b=[3.02,1.51,.65,-.28],L=v(4.96,2.44,1.15).getSpacedPoints(128),O=[],D=[],V=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[S,R]of V)for(let F=0;F<128;F++){let ee=L[F];O.push(ee.x*R,S,-ee.y*R)}for(let S=0;S<3;S++)for(let R=0;R<128;R++){let F=S*128+R,ee=S*128+(R+1)%128;D.push(F,ee,F+128,ee,ee+128,F+128)}let I=new ht;I.setAttribute("position",new Pe(O,3)),I.setIndex(D),I.computeVertexNormals(),s.side=Ot,p(I,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,b,.035);let U=new yt(v(4.94,2.42,1.15).getPoints(40).map(S=>new w(S.x,1.44,-S.y)),!0,"centripetal");p(new xt(U,240,.125,16,!0),u);for(let S of[-1,1]){let R=Array.from({length:21},(F,ee)=>{let B=.26+ee*.25/20;return new w(1.32+1.15*Math.cos(B),1.44,S*(.06+1.15*Math.sin(B)))});p(new xt(new yt(R),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,b,.015),y(4.52,2.01,.025,.97,a,1.43,b,.01),x.push(...n.children.slice(M));let K=y(2.98,1.47,.025,.63,a,.94);K.position.x=-.28;let H=new xn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Ot,polygonOffset:!0,polygonOffsetFactor:-1}),Z=new qi(v(2.9,1.4,.6)),ne=Z.attributes.position,de=Z.attributes.uv;for(let S=0;S<ne.count;S++)de.setXY(S,(ne.getX(S)+1.45)/2.9,(ne.getY(S)+.7)/1.4);let le=p(Z,H,-.28,1.005,0);le.rotation.x=-Math.PI/2,le.castShadow=!1;let Te=H.clone(),Ae=[];for(let S of[-1,1]){let R=p(new Wt(3.05,.3),Te,0,1.04,S*1.329);S<0&&(R.rotation.y=Math.PI),R.castShadow=!1,Ae.push(R)}function Q(S){let R=S.vinyl||"none";le.visible=R!=="none",Ae.forEach(ee=>ee.visible=R!=="none");let F=R+":"+(S.vinylText||"");if(H.userData.id!==F){H.map?.dispose(),Te.map?.dispose(),H.map=new Et(t.vinylCanvas(R,!1,S.vinylText)),Te.map=new Et(t.vinylCanvas(R,!0,S.vinylText));for(let ee of[H,Te]){ee.map.colorSpace=ft,ee.map.anisotropy=16;let B=ee.map;B.image.addEventListener("vinyl-ready",()=>{B.needsUpdate=!0},{once:!0}),ee.needsUpdate=!0,ee.userData.id=F}}}let ge=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);ge.position.x=-.28;let he=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);he.position.x=-.28;for(let S of[-1,-.35,.35])for(let R of[-.75,.75])_(.011,.4,.009,h,S,1.2,R);function fe(S,R){let F=document.createElement("canvas");F.width=F.height=256;let ee=F.getContext("2d");ee.fillStyle=S,ee.fillRect(0,0,256,256);let B=17;for(let G=0;G<18e3;G++)B=B*1664525+1013904223>>>0,ee.fillStyle="rgba(0,0,0,"+R+")",ee.fillRect(B%256,(B>>>8)%256,1,1);let oe=new Et(F);return oe.colorSpace=ft,oe.wrapS=oe.wrapT=qn,oe}a.map=fe("#e8e8e8",.035),a.bumpMap=fe("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=fe("#888888",.12),c.bumpScale=.003,u.bumpMap=fe("#888888",.3),u.bumpScale=.001;function ve(S,R,F,ee,B,oe=!1,G=n){let se=new Vt;se.moveTo(0,.5),se.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),se.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),se.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),se.bezierCurveTo(.48,.12,.12,.28,0,.5),se.moveTo(-.12,-.3),se.lineTo(0,-.06),se.lineTo(.12,-.3),se.closePath();let ue=p(new Bt(se,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),R,F,ee,B,G);return ue.scale.setScalar(S),oe&&(ue.rotation.y=Math.PI),ue}let q=[],be=[],A=[],E=null;for(let S of[-1.72,1.72])for(let R of[-1,1]){let F=R*1.36,ee=R*1.57,B=new Ve;B.position.set(S,.81,F),n.add(B),B.userData.groundWheel=!0;let oe=n.children.length,G=p(new Si([new pe(.56,-.19),new pe(.61,-.245),new pe(.67,-.25),new pe(.76,-.19),new pe(.8,-.1),new pe(.8,.1),new pe(.76,.19),new pe(.67,.25),new pe(.61,.245),new pe(.56,.19)],80),c,S,.81,F);G.rotation.x=Math.PI/2;for(let Ce=-2;Ce<=2;Ce++)g(.798-Math.abs(Ce)*.012,.0035,h,S,.81,F+Ce*.071);for(let Ce=0;Ce<28;Ce++){let Re=Ce*Math.PI/14,te=Array.from({length:17},(me,Ge)=>{let Ee=Ge/16,Se=-.205+Ee*.41,We=.799-.044*Math.pow(Math.abs(Se)/.205,3),et=Re+.13*Math.sin(Ee*Math.PI);return new w(S+Math.sin(et)*We,.81+Math.cos(et)*We,F+Se)});p(new xt(new yt(te),20,.0045,5,!1),h)}for(let Ce of[-1,1])for(let Re of[.625,.654,.681])g(Re,.0035,h,S,.81,F+Ce*.244);let se=n.children.slice(oe);g(.548,.023,l,S,.81,ee+R*.035),g(.505,.016,l,S,.81,ee+R*.043),f(.14,.045,h,S,.81,ee+R*.045,"z"),g(.14,.012,l,S,.81,ee+R*.069);let ue=ve(.2,l,S,.8,ee+R*.075,R<0);be.push(ue);for(let Ce of t.wheelDesign()){let Re=new yt(Ce.map(([te,me])=>new w(S+te,.81+me,ee+R*(.04+.025*(1-Math.hypot(te,me)/.51)))));q.push(p(new xt(Re,20,.007,6,!1),l))}for(let Ce=0;Ce<20;Ce++){let Re=Ce*Math.PI/10;f(.006,.009,l,S+Math.sin(Re)*.526,.81+Math.cos(Re)*.526,ee+R*.06,"z")}n.updateMatrixWorld(!0);for(let Ce of n.children.slice(oe))B.attach(Ce);B.scale.set(.88/1.24,.88/.86,1/.95),B.position.y=.715/.86;let He={standard:se};for(let Ce of["soft","medium","hard","semi","wet"]){let Re=Uu(Ce);Re.visible=!1,B.add(Re),He[Ce]=[Re]}A.push({wheelGroup:B,x:S,out:ee,sign:R,tyres:He})}let X=[];for(let S of[-1,1])X.push(_(1.35,.43,.04,o,.05,.94,S*1.3));let z=[];for(let S of[-1,1])z.push(f(.275,.27,h,2.16,.945,S*.97,"z"),g(.278,.035,o,2.16,.945,S*1.11));for(let S of[-1.72,1.72])f(.07,2.8,h,S,.7,0,"z");_(3.6,.08,.8,h,0,.57,0);let T=[];function P(S,R,F){let ee=document.createElement("canvas");ee.width=S,ee.height=R,F(ee.getContext("2d"),S,R);let B=new Et(ee);return B.colorSpace=ft,B.anisotropy=8,T.push(B),B}let k=P(768,256,(S,R,F)=>{S.fillStyle="#101b18",S.fillRect(0,0,R,F),S.strokeStyle="#d9b35b",S.lineWidth=7,S.strokeRect(10,10,R-20,F-20),S.fillStyle="#ebc66c",S.textAlign="center",S.font="italic 116px Georgia",S.fillText("Two Aces",R/2,137),S.font="38px Georgia",S.fillText("\u2660 Poker21 \u2660",R/2,209)}),N=[];for(let S of[-1,1]){let R=new xn({map:k,metalness:.55,roughness:.2,clearcoat:1});N.push(R);let F=p(new Wt(1.28,.4),R,.05,.94,S*1.326);R.userData.plane=F,S<0&&(F.rotation.y=Math.PI)}let re=[];for(let S of[-1,1])for(let R=0;R<3;R++){let F=new Ve;F.position.set((R-1)*.7+.05,1,S*1.365),S<0&&(F.rotation.y=Math.PI),n.add(F);let ee=p(new Ke(.1,.1,.025),o,0,0,0,F),B=new _t({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),oe=p(new Wt(.65,.65),B,0,0,.035,F);oe.castShadow=!1,oe.receiveShadow=!1,re.push({group:F,mat:B,back:ee,n:R})}for(let S of[-1,1])for(let R of[-.54,.64])for(let F of[.78,1.1]){let ee=f(.014,.018,o,R,F,S*1.35,"z")}let J=n.children.length;for(let S of[-1.7,-.35,1.48])for(let R of[-1.21,1.21]){let F=f(.128,.13,o,S,1.44,R,"x")}for(let S of[-1.7,-.35,1.48])for(let R of[-1,1])g(.125,.004,h,S+.08,1.44,R*1.21,"x"),g(.125,.004,h,S-.08,1.44,R*1.21,"x");for(let S of[-1.7,-.35,1.48])for(let R of[-.96,.96])f(.135,.08,o,S,1.49,R),f(.108,.082,h,S,1.498,R),g(.125,.015,o,S,1.54,R,"y"),g(.111,.006,o,S,1.535,R,"y");let $=[],xe=[],Ie=["#ab2338","#1b684b","#2455a5"].map(S=>i(S,.08,.55)),Me=i("#eee9d6",.04,.6);for(let[S,R,F,ee]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let B=0;B<ee;B++){f(.104,.033,Ie[F],S,1.49+B*.037,R);for(let oe=0;oe<6;oe++){let G=oe*Math.PI/3,se=_(.024,.021,.012,Me,S+Math.cos(G)*.103,1.49+B*.037,R+Math.sin(G)*.103);se.rotation.y=Math.PI/2-G,se.castShadow=!1,se.receiveShadow=!1,$.push(se)}if(B===ee-1){let oe=new _t({transparent:!0,alphaTest:.1,roughness:.65}),G=p(new Wt(.208,.208),oe,S,1.511+B*.037,R);G.rotation.x=-Math.PI/2,G.castShadow=!1,G.receiveShadow=!1,xe.push({mat:oe,n:F})}}x.push(...n.children.slice(J));let Ne=new Ve;Ne.position.set(.47,1.78,0),Ne.scale.set(.82/1.24,.82/.86,.82/.95),n.add(Ne);let Oe=new Ve;Ne.add(Oe);let je=new w((.47-.96)*1.24,(1.78-1.42)*.86,0).normalize(),rt=new w(0,0,1),_e=new w().crossVectors(je,rt).normalize();Oe.quaternion.setFromRotationMatrix(new qe().makeBasis(rt,_e,je));let Fe=u.clone();p(new St(.53,.06,16,80),Fe,0,0,0,Oe),p(new St(.473,.014,10,64),o,0,0,-.02,Oe);for(let S of[Math.PI]){let R=p(new Ke(.09,.39,.045),o,Math.sin(S)*.26,Math.cos(S)*.26,0,Oe);R.rotation.z=-S}for(let S of[-1,1]){let R=p(new Ke(.35,.075,.06),o,S*.265,0,0,Oe);p(new Ke(.32,.035,.064),h,S*.265,0,.006,Oe)}let ye=p(new Xe(.195,.195,.075,64),o,0,0,.035,Oe);ye.rotation.x=Math.PI/2;let Le=p(new zn(.177,64),new _t({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Oe);Le.receiveShadow=!1,ve(.38,o,0,-.025,.105,!1,Oe);let ze={classic:new Ve,sport:new Ve,formula:new Ve};for(let S of Oe.children.slice())ze.classic.add(S);Object.values(ze).forEach(S=>Oe.add(S));function gt(S,R,F,ee){let B=new yt(R.map(([oe,G])=>new w(oe,G,0)),!0);p(new xt(B,72,F,12,!0),ee,0,0,0,S)}gt(ze.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Fe);for(let S of[-1,1])p(new Ke(.35,.065,.045),l,S*.27,0,0,ze.sport),p(new Ke(.065,.3,.045),l,S*.12,-.22,0,ze.sport);p(new St(.5,.018,8,64,.22),d,0,0,.005,ze.sport),gt(ze.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Fe),p(new Ke(.6,.23,.065),h,0,0,0,ze.formula);for(let S of[-1,1])p(new Xt(.035,12,8),d,S*.25,.055,.06,ze.formula),p(new Ke(.08,.29,.025),l,S*.37,0,-.07,ze.formula);for(let S of["sport","formula"]){let R=p(new Xe(.15,.15,.07,48),l,0,0,.035,ze[S]);R.rotation.x=Math.PI/2,p(new zn(.13,48),h,0,0,.078,ze[S]),ve(.25,l,0,-.018,.09,!1,ze[S])}for(let[S,R]of Object.entries(t.steeringDesigns)){let F=new Ve;Oe.add(F),ze[S]=F;let ee=i(R.color,S==="woodHeritage"?.3:.55,.35);R.shape==="round"?p(new St(.53,.065,16,80),ee,0,0,0,F):R.shape==="flat"?gt(F,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,ee):ce([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,ee,F);for(let oe=0;oe<R.spokes;oe++){let G=oe*Math.PI*2/R.spokes,se=p(new Ke(.39,.065,.05),l,Math.cos(G)*.25,Math.sin(G)*.25,.015,F);se.rotation.z=G}let B=p(new Xe(.15,.15,.075,40),h,0,0,.05,F);B.rotation.x=Math.PI/2,ve(.23,l,0,-.015,.095,!1,F),p(new Ke(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,F)}let we=i("#b9ab8a",.15,.8),st=i("#171c20",.02,.85);for(let[S,R]of Object.entries(ze)){let F=S==="classic"?.53:S==="sport"?.51:.47;for(let B of[-1,1]){if(S!=="formula"){let oe=p(new St(F,.072,12,30,.64),st,0,0,.003,R);oe.rotation.z=B<0?Math.PI-.32:-.32}for(let oe=0;oe<9;oe++){let G=(B<0?Math.PI:0)-.28+oe*.07;p(new Xt(.007,6,4),we,Math.cos(G)*(F-.045),Math.sin(G)*(F-.045),.063,R)}}let ee=p(new Ke(.065,.1,.035),S==="classic"?o:d,0,S==="formula"?.16:.51,.045,R);for(let B=0;B<6;B++){let oe=B*Math.PI/3,G=p(new Xe(.012,.012,.012,6),l,Math.cos(oe)*.13,Math.sin(oe)*.13,.099,R);G.rotation.x=Math.PI/2}}let it=new w(.96,1.42,0),tn=new w(.47,1.78,0),on=tn.clone().sub(it),W=it.clone().add(tn).multiplyScalar(.5),It=_(.12,on.length(),.095,o,...W.toArray());It.quaternion.setFromUnitVectors(new w(0,1,0),on.normalize());let Ht=_(.24,.12,1.62,h,.96,1.42,0);Ht.name="steering-chassis-mount",_(.075,It.geometry.parameters.height-.04,.1,h,...W.toArray()).quaternion.copy(It.quaternion);let Pt=-1.84,Dt=1.99,ci=.74,bt=new Ve;bt.name="garage-turbine-primary",bt.position.set(Pt,Dt,0),n.add(bt);let Yt=n.children.length;f(ci,.51,o,Pt,Dt,0,"z"),f(.67,.54,h,Pt,Dt,0,"z");for(let S of[-1,1]){let R=S*.29;g(.72,.055,h,Pt,Dt,R),g(.75,.022,o,Pt,Dt,R+S*.03),g(.665,.012,d,Pt,Dt,R+S*.025);for(let F=0;F<14;F++){let ee=F*Math.PI/7,B=[],oe=[];for(let ue=0;ue<=16;ue++){let He=ue/16,Ce=.22+He*.44,Re=ee+.55*He;for(let te of[-.15,.15])B.push(Pt+Math.sin(Re+te)*Ce,Dt+Math.cos(Re+te)*Ce,R+S*(.018+Math.sin(He*Math.PI)*.12))}for(let ue=0;ue<16;ue++){let He=ue*2;oe.push(He,He+1,He+2,He+1,He+3,He+2)}let G=new ht;G.setAttribute("position",new Pe(B,3)),G.setIndex(oe),G.computeVertexNormals(),m.side=Ot,p(G,m);let se=new yt(Array.from({length:17},(ue,He)=>{let Ce=He/16,Re=.22+Ce*.44,te=ee+.55*Ce-.15;return new w(Pt+Math.sin(te)*Re,Dt+Math.cos(te)*Re,R+S*(.025+Math.sin(Ce*Math.PI)*.12))}));p(new xt(se,20,.009,6,!1),d)}f(.215,.07,o,Pt,Dt,R+S*.085,"z"),f(.18,.085,h,Pt,Dt,R+S*.11,"z")}for(let S=0;S<12;S++){let R=S*Math.PI/6,F=_(.045,.15,.2,h,Pt+Math.cos(R)*.735,Dt+Math.sin(R)*.735,0);F.rotation.z=R}n.updateMatrixWorld(!0);for(let S of n.children.slice(Yt))bt.attach(S);bt.rotation.set(0,Math.PI/2,0),bt.scale.set(.96/1.24,.96/.86,.96/.95);let tt=bt.clone(!0);tt.name="garage-turbine-secondary",n.add(tt);let Zt=new Ve;bt.add(Zt);let zt=i("#829aaa",.92,.24);for(let S of[-.24,-.08,.08,.24])p(new St(.765,.028,10,80),zt,0,0,S,Zt);for(let S=0;S<8;S++){let R=S*Math.PI/4,F=p(new Xe(.025,.025,.025,6),zt,Math.sin(R)*.73,Math.cos(R)*.73,.35,Zt);F.rotation.x=Math.PI/2}let Lt={classic:new Ve,dual:new Ve,titanium:new Ve},jt=i("#a9b7c4",.92,.23),Jt=i("#668bb5",.88,.25);Object.values(Lt).forEach(S=>n.add(S));for(let[S,R]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let F of R){let ee=S==="titanium"?Jt:jt,B=p(new Xe(.105,.105,.5,32),ee,-2.42,.76,F,Lt[S]);B.rotation.z=Math.PI/2;let oe=p(new Xe(.079,.079,.012,32),h,-2.678,.76,F,Lt[S]);oe.rotation.z=Math.PI/2;let G=p(new St(.094,.012,8,32),ee,-2.69,.76,F,Lt[S]);G.rotation.y=Math.PI/2}for(let[S,R]of Object.entries(Lt)){let F=S==="classic"?[0]:[-.67,.67];for(let B of F){let oe=p(new Xe(.18,.18,.52,40),jt,-2.19,.76,B,R);oe.rotation.z=Math.PI/2;for(let G of[-2.36,-2.04]){let se=p(new St(.184,.016,8,40),h,G,.76,B,R);se.rotation.y=Math.PI/2,p(new Ke(.07,.19,.07),jt,G,.94,B,R)}}let ee=S==="classic"?[0]:S==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let B of ee){let oe=p(new Xe(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,B,R);oe.rotation.z=Math.PI/2;let G=p(new St(.107,.018,10,40),S==="titanium"?Jt:jt,-2.57,.76,B,R);if(G.rotation.y=Math.PI/2,S==="titanium")for(let[se,ue]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let He=p(new St(.106,.008,6,40),i(ue,.85,.3),se,.76,B,R);He.rotation.y=Math.PI/2}}}for(let S of[-1,1]){let R=new yt([new w(-2.16,1.46,S*.65),new w(-1.94,1.66,S*.69),new w(-1.3,1.59,S*.64),new w(-.98,1.47,S*.7)]);p(new xt(R,32,.022,8,!1),o),_(.34,.06,.14,o,-1.84,1.48,S*.4)}for(let S of[-1,1]){let R=new yt([new w(-2.45,1.1,S*.7),new w(-2.43,1.36,S*.72),new w(-2.19,1.55,S*.7),new w(-1.9,1.55,S*.68)]);p(new xt(R,40,.075,14,!1),h),p(new xt(R,40,.019,10,!1),o);for(let F of[-2.2,-1.96]){let ee=new yt([new w(F,1.43,S*.48),new w(F,1.63,S*.6),new w(F+.24,1.57,S*.82)]);p(new xt(ee,24,.017,8,!1),o)}}let Mn=n.children.length,ln=[],gn=[],hi=[];for(let S=0;S<=48;S++){let R=-.92+S*1.84/48;for(let F of[.64,1.23])gn.push(2.57-.28*(Math.sin(R)*1.25/1.1)**2,F,Math.sin(R)*1.25)}for(let S=0;S<48;S++){let R=S*2;hi.push(R,R+2,R+1,R+1,R+2,R+3)}let vn=new ht;vn.setAttribute("position",new Pe(gn,3)),vn.setIndex(hi),vn.computeVertexNormals();let Kt=i("#00453f",.72,.14);Kt.clearcoat=1,Kt.side=Ot,p(vn,Kt);for(let S of[.635,1.225]){let R=Array.from({length:65},(F,ee)=>{let B=-1.04+ee*2.08/64;return new w(2.57-.28*(B/1.1)**2,S,B)});p(new xt(new yt(R),80,.034,12,!1),o)}for(let S of[-1,1]){let R=S*1,F=2.57-.28*(R/1.1)**2,ee=new yt([new w(F-.04,.635,R),new w(F+.05,.78,R),new w(F+.065,1.12,R),new w(F-.04,1.25,R)]);p(new xt(ee,32,.065,12,!1),o);for(let B of[.91,1.065]){let oe=Array.from({length:16},(G,se)=>{let ue=S*(.51+se*.41/15);return new w(2.57-.28*(ue/1.1)**2+.018,B,ue)});ln.push(p(new xt(new yt(oe),24,.017,8,!1),d))}}let rr=[];for(let S=0;S<2;S++){let R=new Et(t.cardCanvas(e.cards,S));R.colorSpace=ft,R.anisotropy=16;let F=new On({map:R,transparent:!0,toneMapped:!1});rr.push(F);let ee=1.65,B=S?.34:-.34,oe=_(.47,.008,.63,i("#ddd9cf",0,.95),ee,1.474+S*.003,B);oe.rotation.y=-(S?-.08:.08);let G=p(new Wt(.5,.67),F,ee,1.48+S*.003,B);G.rotation.x=-Math.PI/2,G.rotation.z=S?-.08:.08,G.castShadow=!1,G.receiveShadow=!1}x.push(...n.children.slice(Mn));let Zn=new _t({map:new Et(t.plateCanvas(e)),roughness:.6});for(let S of[-1,1]){let R=p(new Wt(.79,.463),Zn,S*2.605,1.01,0);R.rotation.y=S*Math.PI/2,S>0&&x.push(R)}let vt={},C=i("#7d8c98",.82,.28),j=i("#202a32",.45,.38),ie=i("#a7c6d5",.98,.055),ae=i("#182029",.35,.48);ae.bumpMap=fe("#888888",.2),ae.bumpScale=.001;function Y(S,R,F,ee,B,oe,G,se,ue){let He=new Bt(v(S,R,ee),{depth:F,bevelEnabled:!0,bevelSize:Math.min(.012,F*.2),bevelThickness:Math.min(.012,F*.2),bevelSegments:3,curveSegments:12});return He.translate(0,0,-F/2),p(He,B,oe,G,se,ue)}function ce(S,R,F,ee){return p(new xt(new yt(S.map(B=>new w(...B))),40,R,12,!1),F,0,0,0,ee)}function Be(S,R,F,ee){let B=p(new Xe(.014,.014,.014,6),C,S,R,F,ee);B.rotation.x=Math.PI/2}function De(S,R,F,ee,B,oe){let G=new Vt;G.moveTo(-ee*.5,0),G.bezierCurveTo(-ee*.52,.055,-ee*.12,.07,ee*.5,.008),G.quadraticCurveTo(ee*.05,-.025,-ee*.5,0);let se=new Bt(G,{depth:F,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});se.translate(0,0,-F/2);let ue=p(se,B,S,R,0,oe);return ue.rotation.z=-.08,ue}for(let S of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){vt[S]={};for(let R of S==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let F=new Ve;n.add(F),vt[S][R]=F;let ee=["sport","aero"].includes(R)?ae:C;if(S==="spoiler"){n.remove(F);let B=mc(R,{paint:s,carbon:ae,metal:C});n.add(B),vt.spoiler[R]=B;continue}if(S==="mirrors")for(let B of[-1,1]){let oe=R==="aero",G=oe?1.77:1.86,se=B*(oe?1.47:1.53),ue=.77;Y(.18,.08,.15,.035,j,.64,1.46,B*1.19,F),ce([[.64,1.47,B*1.19],[.62,1.62,B*1.32],[ue,G-.07,se]],oe?.023:.029,ee,F);let He=p(new Xt(.046,16,12),j,ue,G-.065,se,F);if(R==="round"){p(new Xt(1,32,20),C,ue,G,se,F).scale.set(.065,.15,.15);let Re=p(new zn(.13,48),ie,ue-.056,G,se,F);Re.rotation.y=-Math.PI/2,Re.castShadow=!1;let te=p(new St(.136,.009,8,48),C,ue-.06,G,se,F);te.rotation.y=Math.PI/2}else{let Ce=oe?.31:R==="sport"?.35:.38,Re=oe?.16:.22,te=Y(Ce,Re,.095,.065,R==="club"?j:ae,ue,G,se,F);te.rotation.y=Math.PI/2;let me=p(new qi(v(Ce-.045,Re-.035,.05)),ie,ue-.061,G,se,F);me.rotation.y=-Math.PI/2,me.castShadow=!1,me.receiveShadow=!1;let Ge=v(Ce-.028,Re-.018,.055).getPoints(24).map(Ee=>[ue-.058,G+Ee.y,se+Ee.x]);Ge.push(Ge[0]),ce(Ge,.006,C,F)}}else if(S==="sideSkirts")for(let B of[-1,1]){let oe=Y(2.3,R==="aero"?.17:.12,R==="rally"?.27:.13,.05,ee,0,.59,B*1.24,F);if(R==="rally")for(let G of[-.84,-.42,0,.42,.84]){let se=Y(.13,.018,.25,.018,j,G,.67,B*1.24,F)}else ce([[-1.08,.54,B*1.3],[0,.53,B*1.32],[1.08,.54,B*1.3]],.009,d,F);for(let G of[-.87,.87])Y(.12,.14,.16,.025,j,G,.65,B*1.2,F),Be(G,.61,B*1.33,F);if(R==="aero")for(let G of[-.95,.95]){let se=Y(.24,.12,.025,.025,ae,G,.57,B*1.35,F);se.rotation.z=G>0?.2:-.2}}else{let B=S==="frontBumper"?1:-1,oe=[[B*2.26,.66,-.92],[B*2.58,.65,-.7],[B*2.67,.65,0],[B*2.58,.65,.7],[B*2.26,.66,.92]];ce(oe,R==="sport"?.061:.047,ee,F);for(let G of[-.67,.67]){ce([[B*2.31,.74,G],[B*2.5,.68,G]],.032,j,F);let se=Y(.16,.12,.13,.035,j,B*2.51,.67,G,F)}if(R==="aero"){let G=Y(.38,.045,1.94,.07,ae,B*2.48,.5,0,F);for(let se of[-.7,-.27,.27,.7])Y(.27,.12,.022,.025,j,B*2.48,.55,se,F);ce([[B*2.4,.52,-.91],[B*2.64,.52,0],[B*2.4,.52,.91]],.008,C,F)}if(R==="rally")for(let G of[-.72,.72])ce([[B*2.53,.65,G-.14],[B*2.56,.94,G-.14],[B*2.55,1.04,G],[B*2.56,.94,G+.14],[B*2.53,.65,G+.14]],.036,C,F);if(R==="sport")for(let G of[-.67,.67]){let se=Y(.2,.13,.14,.045,j,B*2.56,.66,G,F)}if(S==="rearBumper"&&R==="aero")for(let G of[-.7,-.35,0,.35,.7]){let se=Y(.27,.15,.025,.025,ae,-2.46,.48,G,F);se.rotation.z=.12}}}}let ke=i("#b9e4f5",.28,.17);ke.emissive.set("#b9e4f5"),ke.emissiveIntensity=1.8;let $e=i("#ffdda0",.2,.2);$e.emissive.set("#ffe0a8"),$e.emissiveIntensity=1.25;for(let S of["frontBumper","rearBumper"])for(let[R,F,ee]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let B=new Ve;n.add(B),vt[S][R]=B;let oe=S==="frontBumper"?1:-1,G=R==="trackGT"?.34:.29,se=.59,ue=v(F,G,.1);for(let[Ee,Se]of[[0,.94],[-.79,.32],[.79,.32]]){let We=v(Se,.115,.045,pn);ue.holes.push(new pn(We.getPoints(24).map(et=>new pe(et.x+Ee,et.y))))}let He=new Bt(ue,{depth:ee,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),Ce=He.attributes.position;for(let Ee=0;Ee<Ce.count;Ee++){let Se=Ce.getX(Ee),We=Ce.getY(Ee),et=Ce.getZ(Ee);Ce.setXYZ(Ee,oe*(2.43+et-.24*(Se/(F/2))**2),se+We,Se)}He.computeVertexNormals(),p(He,s,0,0,0,B);for(let[Ee,Se]of[[0,.94],[-.79,.32],[.79,.32]]){let We=oe*(2.43-.24*(Ee/(F/2))**2);Y(.025,.14,Se+.02,.04,h,We,se,Ee,B);for(let et of[-.032,.012,.045])Y(.012,.006,Se-.035,.003,j,We+oe*.022,se+et,Ee,B)}let Re=Array.from({length:41},(Ee,Se)=>{let We=-F/2+Se*F/40;return[oe*(2.44+ee+.045-.24*(We/(F/2))**2),se-G/2-.025,We]});ce(Re,R==="trackGT"?.028:.019,ae,B);let te=new ht,me=[],Ge=[];for(let[Ee,Se,We]of Re)me.push(Ee,Se,We,Ee-oe*.17,Se+.005,We);for(let Ee=0;Ee<40;Ee++){let Se=Ee*2;Ge.push(Se,Se+1,Se+2,Se+1,Se+3,Se+2)}if(te.setAttribute("position",new Pe(me,3)),te.setIndex(Ge),te.computeVertexNormals(),p(te,ae,0,0,0,B),S==="rearBumper")for(let Ee=0;Ee<(R==="trackGT"?5:3);Ee++){let Se=(Ee-(R==="trackGT"?2:1))*.3,We=Y(.24,.075,.014,.008,ae,-2.48,se-G/2-.035,Se,B);We.rotation.z=-.12}else if(R==="trackGT")for(let Ee of[-.92,.92]){let Se=Y(.18,.05,.018,.008,ae,2.43,se-G/2,Ee,B);Se.rotation.z=.08}}for(let S of["formula","formulaPro","formulaElite"]){let R=Fu(S,{paint:s,carbon:ae,metal:C,accent:o});n.add(R),vt.frontBumper[S]=R}for(let S of["rearBumper","sideSkirts","spoiler"])for(let R of["formula","formulaPro"]){let F=new Ve;F.name=S+"-"+R,n.add(F),vt[S][R]=F;let ee=R==="formulaPro";if(S==="rearBumper"){Y(.48,.16,ee?2.3:2.05,.03,ae,-2.47,.45,0,F);for(let B=-3;B<=3;B++){let oe=Y(.64,.23,.025,.01,ae,-2.48,.44,B*.3,F);oe.rotation.z=-.15}for(let B of[-1,1])ce([[-2.2,.54,B*1],[-2.65,.62,B*1.1]],.025,s,F)}else if(S==="sideSkirts")for(let B of[-1,1]){let oe=Y(2.35,ee?.42:.33,.34,.08,s,-.15,.83,B*1.3,F);oe.rotation.z=-.045,Y(2.65,.055,.48,.025,ae,-.06,.58,B*1.3,F),Y(.07,.21,.24,.035,h,.96,.87,B*1.3,F);for(let G=0;G<(ee?3:1);G++)Y(.35,.11,.025,.01,ae,.48-G*.32,.65,B*1.53,F)}else{n.remove(F);let B=mc(R,{paint:s,carbon:ae,metal:C});n.add(B),vt.spoiler[R]=B}}vt.headlights={};for(let S of["round","projector","rally","matrix"]){let R=new Ve;n.add(R),vt.headlights[S]=R;for(let F of[-1,1]){let ee=F*.74,B=2.57-.28*(ee/1.1)**2+.07,oe=1.075;if(S==="matrix"){let G=Y(.4,.2,.075,.045,j,B,oe,ee,R);G.rotation.y=Math.PI/2;let se=Y(.35,.15,.01,.035,h,B+.05,oe,ee,R);se.rotation.y=Math.PI/2;for(let ue=0;ue<4;ue++){let He=Y(.06,.1,.012,.017,ke,B+.065,oe,ee-.128+ue*.085,R);He.rotation.y=Math.PI/2,He.castShadow=!1}}else{let G=S==="rally"?.16:S==="round"?.14:.135,se=p(new Xe(G+.027,G+.02,.095,48),j,B,oe,ee,R);se.rotation.z=Math.PI/2;let ue=p(new St(G+.008,.01,10,48),C,B+.054,oe,ee,R);ue.rotation.y=Math.PI/2;let He=p(new Xt(1,32,20),S==="round"||S==="rally"?$e:ke,B+.055,oe,ee,R);if(He.scale.set(.025,G,G),He.castShadow=!1,S==="projector"){let Ce=p(new St(G*.8,.008,8,48),ke,B+.076,oe,ee,R);Ce.rotation.y=Math.PI/2,p(new Xt(1,24,16),ie,B+.081,oe,ee,R).scale.set(.022,G*.53,G*.53)}if(S==="rally")for(let Ce of[-.07,0,.07]){let Re=Math.sqrt(G*G-Ce*Ce);ce([[B+.09,oe-Re,ee+Ce],[B+.1,oe,ee+Ce],[B+.09,oe+Re,ee+Ce]],.009,j,R)}}}}for(let[S,R]of Object.entries(t.streetHeadlights)){let F=new Ve;n.add(F),vt.headlights[S]=F;let ee=i(R.color,.12,.22);ee.emissive.set(R.color),ee.emissiveIntensity=R.smoke?.35:1.1;let B=i(R.smoke?"#1c3348":"#83b6d5",.45,.12);for(let oe of[-1,1]){let G=oe*.72,se=2.57-.28*(G/1.1)**2+.07,ue=1.075;if(R.shape==="sportHousing"){let Re=new Vt;Re.moveTo(-.29,.12),Re.lineTo(.23,.09),Re.quadraticCurveTo(.32,.02,.26,-.13),Re.lineTo(-.25,-.14),Re.closePath();let te=p(new Bt(Re,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),j,se+.02,ue,G,F);te.rotation.y=Math.PI/2;for(let me=0;me<2;me++){let Ge=G+(me-.5)*.24;if(p(new Xt(1,24,16),B,se+.13,ue,Ge,F).scale.set(.022,.067,.067),R.signature==="rings"){let Se=p(new St(.086,.01,10,48),ee,se+.155,ue,Ge,F);Se.rotation.y=Math.PI/2}if(R.signature==="doubleL"&&ce([[se+.155,ue+.075,Ge-.085],[se+.155,ue-.075,Ge-.085],[se+.155,ue-.075,Ge+.075]],.012,ee,F),R.signature==="pixels")for(let Se=0;Se<3;Se++)p(new Ke(.014,.026,.026),ee,se+.155,ue+.09,Ge-.055+Se*.055,F)}R.signature==="arc"&&ce([[se+.155,ue-.09,G-.25],[se+.155,ue+.1,G-.25],[se+.155,ue+.12,G],[se+.155,ue+.07,G+.25]],.012,ee,F);continue}let He=Y(.47,.25,.1,.04,j,se,ue,G,F);He.rotation.y=Math.PI/2;for(let Re of[-.18,.18]){p(new Ke(.1,.07,.035),C,se-.035,ue-.15,G+Re,F);let te=p(new Xe(.012,.012,.018,12),o,se+.02,ue-.13,G+Re,F);te.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(R.shape)){let Re=R.shape==="doubleU"?2:1;for(let te=0;te<Re;te++){let me=G+(te-(Re-1)/2)*.21;if(p(new Xt(1,24,16),B,se+.073,ue,me,F).scale.set(.019,.067,.067),R.shape==="doubleU")ce([[se+.1,ue+.075,me-.08],[se+.1,ue-.04,me-.08],[se+.1,ue-.08,me-.045],[se+.1,ue-.08,me+.045],[se+.1,ue-.04,me+.08],[se+.1,ue+.075,me+.08]],.01,ee,F);else if(R.shape==="brow"){ce([[se+.1,ue+.055,me-.19],[se+.1,ue+.093,me-.14],[se+.1,ue+.093,me+.19]],.011,ee,F);let Ee=p(new St(.068,.006,8,32),ee,se+.095,ue-.015,me,F);Ee.rotation.y=Math.PI/2}else for(let Ee=0;Ee<3;Ee++){let Se=Ee*Math.PI*2/3-Math.PI/2;ce([[se+.102,ue+Math.sin(Se)*.025,me+Math.cos(Se)*.025],[se+.102,ue+Math.sin(Se)*.1,me+Math.cos(Se)*.1]],.011,ee,F)}}continue}if(R.shape==="bar"){for(let[Re,te,me]of[[.035,.41,.025],[-.045,.33,.012]]){let Ge=Y(te,me,.014,.006,ee,se+.064,ue+Re,G,F);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1}continue}if(R.shape==="square"){let Re=Y(.37,.17,.024,.015,ee,se+.065,ue,G,F);Re.rotation.y=Math.PI/2;for(let te=0;te<7;te++)p(new Ke(.006,.16,.004),B,se+.082,ue,G-.15+te*.05,F);continue}let Ce=R.count===3?.062:R.count===2?.087:.106;for(let Re=0;Re<R.count;Re++){let te=G+(Re-(R.count-1)/2)*(R.count===3?.14:.205),me=p(new Xe(Ce+.014,Ce+.02,.09,R.shape==="hex"?6:40),h,se+.035,ue,te,F);me.rotation.z=Math.PI/2;let Ge=p(new St(Ce,.009,8,R.shape==="hex"?6:48),ee,se+.09,ue,te,F);Ge.rotation.y=Math.PI/2,Ge.castShadow=!1;let Ee=p(new Xt(1,24,16),R.projector?B:ee,se+.077,ue,te,F);if(Ee.scale.set(.018,Ce*.74,Ce*.74),Ee.castShadow=!1,R.projector&&p(new Xt(1,16,12),ee,se+.092,ue,te,F).scale.set(.006,Ce*.31,Ce*.31),R.cross||R.guard)for(let Se of[-1,1])ce([[se+.11,ue-Ce*.74,te-Se*Ce*.74],[se+.115,ue,te],[se+.11,ue+Ce*.74,te+Se*Ce*.74]],.009,j,F)}}}let Qe={};for(let S of["club","sport","rally","chrome"]){let R=[];Qe[S]=R;for(let{wheelGroup:F,sign:ee}of A){let B=new Ve;F.add(B),R.push(B);let oe=S==="rally"?.91:.87,G=S==="rally"?.64:S==="sport"?.49:.57,se=S==="sport"?1:1.23,ue=[],He=[];for(let me=0;me<=48;me++){let Ge=-se+me*se*2/48;for(let Ee of[-G/2,G/2])ue.push(Math.sin(Ge)*oe,Math.cos(Ge)*oe,Ee)}for(let me=0;me<48;me++){let Ge=me*2;He.push(Ge,Ge+1,Ge+2,Ge+1,Ge+3,Ge+2)}let Ce=new ht;Ce.setAttribute("position",new Pe(ue,3)),Ce.setIndex(He),Ce.computeVertexNormals();let te=(S==="chrome"?C:S==="club"?s:ae).clone();te.side=Ot,p(Ce,te,0,0,0,B);for(let me of[-1,1]){let Ge=Array.from({length:49},(Ee,Se)=>{let We=-se+Se*se*2/48;return[Math.sin(We)*oe,Math.cos(We)*oe,me*G/2]});ce(Ge,.012,S==="chrome"?C:j,B)}for(let me of[-1,1])ce([[0,0,-ee*.28],[me*.28,.42,-ee*.31],[me*.49,.68,-ee*.31]],.022,j,B),Be(me*.49,.68,-ee*.32,B);if(S==="rally"){let me=Y(.13,.25,G*.9,.025,j,-.83,.2,0,B)}B.userData.shell=te}}vt.windshield={};for(let[S,R,F,ee]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let oe=function(Ee,Se){let We=.92*(1-.13*Se),et=1-Ee*Ee;return[1.32+.23*et-R*.32*Se,1.5+R*Se*(.84+.16*et),Ee*We]},B=new Ve;n.add(B),vt.windshield[S]=B;let G=[],se=[],ue=40,He=16;for(let Ee=0;Ee<=He;Ee++)for(let Se=0;Se<=ue;Se++)G.push(...oe(-1+Se*2/ue,Ee/He));for(let Ee=0;Ee<He;Ee++)for(let Se=0;Se<ue;Se++){let We=Ee*(ue+1)+Se;se.push(We,We+1,We+ue+1,We+1,We+ue+2,We+ue+1)}let Ce=new ht;Ce.setAttribute("position",new Pe(G,3)),Ce.setIndex(se),Ce.computeVertexNormals();let Re=new xn({color:F,metalness:.05,roughness:.075,transparent:!0,opacity:ee,depthWrite:!1,side:Ot,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});B.userData.glass=Re,B.userData.originalTint={color:F,opacity:ee};let te=p(Ce,Re,0,0,0,B);te.castShadow=!1,te.receiveShadow=!1,te.renderOrder=3;let me=["smoke","highSmoke"].includes(S)?j:C;ce(Array.from({length:41},(Ee,Se)=>{let We=oe(-1+Se/20,0);return We[1]-=.04,We}),.045,j,B);for(let Ee of[0,1])ce(Array.from({length:41},(Se,We)=>oe(-1+We/20,Ee)),Ee===0?.017:.009,me,B);for(let Ee of[-1,1]){ce(Array.from({length:17},(et,cn)=>oe(Ee,cn/16)),.011,me,B);let Se=oe(Ee,0);Y(.26,.12,.23,.025,j,Se[0],Se[1]-.06,Se[2],B),ce([[.99,1.44,Ee*1.12],[1.18,1.44,Ee*1.02],Se],.032,me,B);let We=p(new Xe(.013,.013,.018,6),C,Se[0]+.04,Se[1]+.014,Se[2],B)}let Ge=new On({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Ee of[-.77,-.69]){let Se=Array.from({length:13},(et,cn)=>{let $t=oe(Ee,.18+cn*.058);return $t[0]+=.004,$t}),We=ce(Se,.003,Ge,B);We.castShadow=!1,We.receiveShadow=!1,We.renderOrder=4}}let Ze=new Ve;for(let S of n.children.slice())S.userData.groundWheel||Ze.add(S);n.add(Ze);let at=i("#b8c7d6",.72,.27),wt=new Ve,Ut=[];n.add(wt);for(let S of[-1.72,1.72])for(let R of[-1,1]){let F=new Ve;F.position.set(S,.52,R*1.12),wt.add(F);let ee=Array.from({length:193},(Re,te)=>{let me=te/192,Ge=me*Math.PI*14;return new w(Math.cos(Ge)*.071,.055+me*.36,Math.sin(Ge)*.071)}),B=p(new xt(new yt(ee),192,.014,10,!1),at,0,0,0,F);p(new Xe(.039,.039,.23,24),j,0,.14,0,F);let oe=p(new Xe(.018,.018,.28,20),C,0,.34,0,F),G=new Ve;G.position.y=.47,F.add(G);for(let[Re,te]of[[F,.04],[G,-.015]])p(new Xe(.095,.095,.026,32),C,0,te,0,Re),p(new Xe(.068,.068,.018,24),j,0,te+.02,0,Re);p(new Ke(.14,.075,.18),j,0,.025,R*.035,F),p(new Ke(.16,.075,.22),j,0,0,-R*.075,G);let se=new w(S,.56,R*1.12),ue=new w(S,.81,R*1.43),He=ue.clone().sub(se);p(new Xe(.026,.026,He.length(),16),j,...se.clone().add(ue).multiplyScalar(.5).toArray(),wt).quaternion.setFromUnitVectors(new w(0,1,0),He.normalize()),Ut.push({coil:B,rod:oe,upper:G})}vt.brakes={};for(let S of["stock","red","gold","ceramic"]){let R=new Ve;n.add(R),vt.brakes[S]=R;for(let{wheelGroup:F,sign:ee}of A){let B=dc(S);B.position.z=ee*.165,ee<0&&(B.rotation.y=Math.PI),F.add(B),R.userData.brakeAssemblies??=[],R.userData.brakeAssemblies.push(B)}}vt.nitrous={};let Nt=document.createElement("canvas");Nt.width=512,Nt.height=256;let ut=Nt.getContext("2d");ut.fillStyle="#101923",ut.fillRect(0,0,512,256),ut.strokeStyle="#e8e1cc",ut.lineWidth=8,ut.strokeRect(10,10,492,236),ut.fillStyle="#f5f2e8",ut.textAlign="center",ut.font="italic bold 106px Arial",ut.fillText("N\u2082O",256,117),ut.font="bold 24px Arial",ut.fillText("NITROUS OXIDE",256,159),ut.fillStyle="#d9b36b",ut.font="bold 18px Arial",ut.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let S=0;S<42;S++)ut.fillRect(165+S*4,212,S%3+1,17);let dt=new Et(Nt);dt.colorSpace=ft,dt.anisotropy=8;let Rt=document.createElement("canvas");Rt.width=Rt.height=128;let ct=Rt.getContext("2d");ct.fillStyle="#eee9dc",ct.fillRect(0,0,128,128),ct.translate(64,64),ct.strokeStyle="#17202a";for(let S=0;S<=20;S++){let R=-Math.PI*.8+S*Math.PI*1.6/20;ct.lineWidth=S%5?2:4,ct.beginPath(),ct.moveTo(Math.sin(R)*43,-Math.cos(R)*43),ct.lineTo(Math.sin(R)*(S%5?49:53),-Math.cos(R)*(S%5?49:53)),ct.stroke()}ct.fillStyle="#293541",ct.textAlign="center",ct.font="bold 14px Arial",ct.fillText("PSI",0,30),ct.strokeStyle="#c92737",ct.lineWidth=4,ct.beginPath(),ct.moveTo(-9,12),ct.lineTo(26,-31),ct.stroke(),ct.fillStyle="#25313a",ct.beginPath(),ct.arc(0,0,6,0,Math.PI*2),ct.fill();let ot=new Et(Rt);ot.colorSpace=ft;for(let S of["blue","twin","triple"]){let R=new Ve;R.name="nitrous-"+S,n.add(R),vt.nitrous[S]=R;let F=i(t.item("nitrous",S).color,.65,.27),ee=S==="triple"?3:S==="twin"?2:1,B=1.49,oe=-1.3,G=.37,se=i("#b4924f",.8,.3),ue=i("#a5b2bd",.85,.24),He=i("#1b2028",.08,.85),Ce=i("#ab2635",.35,.4);for(let Re of[-1.52,-1.13]){Y(.095,.05,ee*G+.04,.015,h,Re,1.29,0,R);for(let te of[-1,1]){let me=te*(ee*G/2-.02);p(new Xe(.024,.024,.023,6),ue,Re,1.327,me,R)}}for(let Re=0;Re<ee;Re++){let te=(Re-(ee-1)/2)*G,me=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Sn,Nn])=>new pe(Sn,Nn)),Ge=p(new Si(me,40),F,oe,B,te,R);Ge.rotation.z=-Math.PI/2;for(let Sn of[-1.52,-1.13]){Y(.11,.095,.27,.025,He,Sn,1.35,te,R);let Nn=p(new St(.152,.013,8,40),ue,Sn,B,te,R);Nn.rotation.y=Math.PI/2,Y(.08,.025,.055,.008,ue,Sn,B+.155,te,R),p(new Xe(.013,.013,.018,6),h,Sn,B+.179,te,R)}let Ee=[],Se=[],We=[];for(let Sn=0;Sn<2;Sn++)for(let Nn=0;Nn<=16;Nn++){let vc=-.91+Nn*1.82/16;if(Ee.push(oe+(Sn?.12:-.12),B+Math.cos(vc)*.147,te+Math.sin(vc)*.147),Se.push(Sn,Nn/16),Sn&&Nn){let sr=17+Nn;We.push(sr-18,sr-17,sr,sr-18,sr,sr-1)}}let et=new ht;et.setAttribute("position",new Pe(Ee,3)),et.setAttribute("uv",new Pe(Se,2)),et.setIndex(We),et.computeVertexNormals();let cn=new xn({map:dt,roughness:.55,metalness:.05,side:Ot});p(et,cn,0,0,0,R);let $t=p(new Xe(.046,.046,.055,24),se,-.89,B,te,R);$t.rotation.z=Math.PI/2,Y(.075,.07,.065,.012,se,-.845,B,te,R),p(new Xe(.016,.016,.065,16),ue,-.845,B+.045,te,R);let Hn=p(new St(.052,.012,8,24),Ce,-.845,B+.092,te,R);Hn.rotation.x=Math.PI/2;for(let Sn of[0,Math.PI/3,Math.PI*2/3]){let Nn=Y(.106,.014,.014,.004,Ce,-.845,B+.092,te,R);Nn.rotation.y=Sn}let Kn=new Ve;Kn.position.set(-.84,B+.065,te+.075),Kn.rotation.x=-Math.PI*.32,R.add(Kn);let Ls=p(new Xe(.057,.057,.03,32),ue,0,0,0,Kn);Ls.rotation.x=Math.PI/2;let rm=p(new zn(.047,32),new On({map:ot}),0,0,.017,Kn),Gu=p(new Xe(.024,.024,.055,6),se,-.79,B,te,R);Gu.rotation.z=Math.PI/2,ce([[-.76,B,te],[-.7,B-.02,te],[-.71,1.3,te],[-.91,1.24,te]],.014,He,R);let ku=p(new Xe(.021,.021,.055,12),ue,-.74,B,te,R);ku.rotation.z=Math.PI/2}Y(.07,.07,ee*G,.015,se,-.91,1.24,0,R),ce([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,He,R)}vt.pedals={};for(let S of["classic","aluminium","formula"]){let R=Bu(S);n.add(R),vt.pedals[S]=R}vt.seat={};for(let S of["red","carbon","emerald","ivory"]){let R=gc(S);R.rotation.y=Math.PI/2,R.position.set(-.8,1,0),n.add(R),vt.seat[S]=R}let nt=Nu(x),rn=Eu({paint:s,carbon:ae,metal:C});n.add(rn.group);function kr(S){let R=["formula","formulaPro","formulaElite"].includes(S.frontBumper);nt.set(R),z.forEach(te=>te.visible=!R),rn.group.visible=R||S.turbine==="formula",rn.engine.visible=S.turbine==="formula",Q(S);let F=t.glassTints[S.glassTint]||t.glassTints.original;for(let te of Object.values(vt.windshield)){let me=te.userData.originalTint;te.userData.glass.color.set(F.opacity===null?me.color:F.color),te.userData.glass.opacity=F.opacity??me.opacity}let ee=(t.wheelDiameters[S.wheelSize]||16)/16,B=(ee-1)*(.715/.86),oe={standard:1,wide:1.25,ultra:1.45}[S.tyreWidth]||1;for(let{wheelGroup:te,sign:me,tyres:Ge}of A){te.scale.set(.88/1.24*ee,.88/.86*ee,oe/.95),te.position.y=.715/.86*ee,te.position.z=me*(1.36+.25*(oe-1));for(let[Ee,Se]of Object.entries(Ge))for(let We of Se)We.visible=Ee===(S.tyres||"standard")}let G=B+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[S.suspension]||0);for(let[te,me]of Object.entries(vt))if(te!=="brakes")for(let Ge of Object.values(me))Ge.parent===n&&(Ge.userData.mountBaseY??=Ge.position.y,Ge.position.y=Ge.userData.mountBaseY+G);ln.forEach(te=>te.visible=!S.headlights||S.headlights==="classic");for(let[te,me]of Object.entries(Qe))for(let Ge of me)Ge.visible=S.fenders===te,te==="club"&&Ge.userData.shell.color.set(t.item("paint",S.paint).color);at.color.set(t.item("suspension",S.suspension).color),Ze.position.y=G,rn.group.position.y=G-(S.chassis==="formula"?.18:0),wt.visible=G>0,Ut.forEach(({coil:te,rod:me,upper:Ge})=>{te.scale.y=1+G/.415,me.scale.y=1+G/.28,me.position.y=.34+G/2,Ge.position.y=.47+G});for(let[te,me]of Object.entries(vt))for(let[Ge,Ee]of Object.entries(me))Ee.visible=(te==="pedals"?S.pedals||"classic":S[te])===Ge;R&&Object.values(vt.headlights).forEach(te=>te.visible=!1);for(let[te,me]of Object.entries(vt.brakes))for(let Ge of me.userData.brakeAssemblies||[])Ge.visible=(S.brakes||"stock")===te;Object.entries(ze).forEach(([te,me])=>me.visible=te===(S.steering||"classic")),Object.entries(Lt).forEach(([te,me])=>me.visible=te===(S.exhaust||"classic")),Zt.visible=S.turbine==="boost",bt.visible=S.turbine!=="formula";let se=["twin","twinBig"].includes(S.turbine),ue=S.turbine==="twinBig",He=ue?.9:se?.52:S.turbine==="boost"?.96:.9;bt.scale.set(He/1.24,He/.86,He/.95),bt.position.set(Pt,Dt+(ue?.06:se?-.2:-.04),se?ue?-.7:-.44:0),tt.visible=se,tt.scale.copy(bt.scale),tt.position.set(Pt,Dt+(ue?.06:-.2),ue?.7:.44);let Ce=pc(S.turbine==="formula"?[rn.engine]:[bt,tt],Ze);for(let te of Object.values(vt.spoiler))te.userData.fitTurbines(Ce);let Re=S.badges||[];if(X.forEach(te=>te.visible=!Re.length),N.forEach(te=>te.userData.plane.visible=!Re.length),re.forEach(({group:te,mat:me,back:Ge,n:Ee})=>{let Se=Re[Ee];te.visible=!!Se;let We=Se+":"+(S.prizeTotal||0);if(!Se||me.userData.badge===We)return;let et=new Vt,cn=.65/512,$t=(Hn,Kn)=>[(Hn-256)*cn,(256-Kn)*cn];if(Se==="millionaire"||Se==="day-hero")et.absarc(0,0,204*cn,0,Math.PI*2,!1);else if(Se==="rating-top10"){for(let Hn=0;Hn<6;Hn++){let Kn=Hn*Math.PI/3-Math.PI/2,Ls=$t(256+Math.cos(Kn)*215,256+Math.sin(Kn)*215);Hn?et.lineTo(...Ls):et.moveTo(...Ls)}et.closePath()}else et.moveTo(...$t(80,88)),et.quadraticCurveTo(...$t(256,0),...$t(432,88)),et.lineTo(...$t(420,296)),et.quadraticCurveTo(...$t(390,400),...$t(256,465)),et.quadraticCurveTo(...$t(122,400),...$t(92,296)),et.closePath();Ge.geometry.dispose(),Ge.geometry=new Bt(et,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),me.map?.dispose(),me.map=new Et(t.badgeCanvas(Se,S)),me.map.colorSpace=ft,me.map.anisotropy=16,me.emissive.set("#ffffff"),me.emissiveMap=me.map,me.emissiveIntensity=.35,me.userData.badge=We,me.needsUpdate=!0}),s.color.set(t.item("paint",S.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(S)),E!==S.wheels){for(let te of q)te.removeFromParent(),te.geometry.dispose();q.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:te,x:me,out:Ge,sign:Ee}of A)for(let Se of t.wheelDesign(S.wheels)){let We=new yt(Se.map(([cn,$t])=>new w(cn,$t,Ee*(.25+.025*(1-Math.hypot(cn,$t)/.51))))),et=p(new xt(We,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[S.wheels]||(["fiveSpoke","legend"].includes(S.wheels)?.023:.009),8,!1),l,0,0,0,te);q.push(et)}E=S.wheels}o.color.set(t.item("trim",S.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(S.trim)?.48:["cobalt","anodizedRed","champagne"].includes(S.trim)?.3:.135,o.metalness=.95,u.userData.style!==S.upholstery&&(u.map?.dispose(),u.map=new Et(t.upholsteryCanvas(S.upholstery)),u.map.colorSpace=ft,u.map.wrapS=u.map.wrapT=qn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(S.upholstery)?.95:S.upholstery==="carbonWeave"?.28:.38,u.userData.style=S.upholstery,u.needsUpdate=!0),t.chipPalette(S.chips).forEach((te,me)=>{Ie[me].color.set(te),Ie[me].roughness=S.chips==="ceramic"?.25:.55}),$.forEach(te=>te.visible=S.chips!=="ceramic"),xe.forEach(({mat:te,n:me})=>{te.userData.style!==S.chips&&(te.map?.dispose(),te.map=new Et(t.chipCanvas(S.chips,me)),te.map.colorSpace=ft,te.map.anisotropy=8,te.userData.style=S.chips,te.needsUpdate=!0)}),rr.forEach((te,me)=>{te.userData.style!==S.cards&&(te.map?.dispose(),te.map=new Et(t.cardCanvas(S.cards,me)),te.map.colorSpace=ft,te.map.anisotropy=16,te.userData.style=S.cards,te.needsUpdate=!0)}),q.forEach(te=>te.visible=!0),be.forEach(te=>te.visible=!0),d.color.set(t.item("light",S.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,Zn.userData.number!==S.number+S.region&&(Zn.map?.dispose(),Zn.map=new Et(t.plateCanvas(S)),Zn.userData.number=S.number+S.region,Zn.needsUpdate=!0)}for(let S of[-1,1])ce([[-1.64,.43,S*.94],[0,.4,S*1.02],[1.66,.43,S*.94]],.027,d,Ze),ce([[S*1.91,.43,-.66],[S*2.05,.43,0],[S*1.91,.43,.66]],.023,d,Ze);let wi=new Ir(d.color,.45,2,2);wi.position.set(-1.9,2,.48),Ze.add(wi);let Jn=wu(n,[Ne,bt,tt,wt,...Object.values(vt.seat)]),Un=kr;function ui(S){Un(S),Jn.set(S.chassis==="formula"),wi.color.copy(d.color)}return ui(e),{car:n,update:ui}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Vn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ft,n.toneMapping=si,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=ka,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new yn,s=new Gt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Ln("#c6d9ef","#44311e",1.25));for(let[Q,ge,he,fe,ve]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let q=new wn(Q,ge);q.position.set(he,fe,ve),q.castShadow=Q==="#fff0d0",q.shadow.bias=-2e-4,q.shadow.normalBias=.025,q.shadow.mapSize.set(2048,2048),q.shadow.camera.left=-5,q.shadow.camera.right=5,q.shadow.camera.top=5,q.shadow.camera.bottom=-5,i.add(q)}let a=new yn;a.background=new Ye("#48505b");for(let[Q,ge,he,fe,ve,q]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let be=new Je(new Ke(fe,ve,q),new On({color:"#ffffff"}));be.position.set(Q,ge,he),a.add(be)}let o=new zr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(Q=>{Q.geometry?.dispose(),Q.material?.dispose()}),o.dispose();let l=new Je(new Wt(30,30),new Ss({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=im(i,e),u=new dn({transparent:!0,depthWrite:!1,side:Ot,toneMapped:!1,uniforms:{color:{value:new Ye(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new Je(new Wt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let Q of[-.9,.9]){let ge=new Ir(u.uniforms.color.value,1.8,3,2);ge.position.set(0,.32,Q),i.add(ge),m.push(ge)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function _(Q){t.night=!!Q;for(let ge of i.children)ge.isHemisphereLight&&(ge.intensity=Q?.26:1.25),ge.isDirectionalLight&&(ge.userData.dayIntensity??=ge.intensity,ge.intensity=ge.userData.dayIntensity*(Q?.13:1));i.environmentIntensity=Q?.24:1.5,u.uniforms.strength.value=Q?1.35:.95}_(t.night);let f=Q=>{p&&_(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=["formula","formulaPro","formulaElite"].includes(e.frontBumper),v=Q=>{g=["formula","formulaPro","formulaElite"].includes(Q.frontBumper),h.update(Q),u.uniforms.color.value.set(window.PokerGarage.item("light",Q.light).color),m.forEach(ge=>ge.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let y=!1,x=null,M=0,b=0,L=()=>{let Q=r.clientWidth,ge=r.clientHeight;Q&&ge&&(n.setSize(Q,ge,!1),s.aspect=Q/ge,s.updateProjectionMatrix())},O=new ResizeObserver(L);O.observe(r),L();let D=new Bn(1,1,{type:Bi,depthBuffer:!0});D.samples=4;let V=new yn,I=new Ti(-1,1,1,-1,0,1),U=new dn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:D.texture},stepSize:{value:new pe}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),K=new Je(new Wt(2,2),U);V.add(K);function H(){let Q=n.getDrawingBufferSize(new pe);(D.width!==Q.x||D.height!==Q.y)&&D.setSize(Q.x,Q.y),U.uniforms.stepSize.value.set(3/Q.x,3/Q.y),n.setRenderTarget(D),n.render(i,s),n.setRenderTarget(null),n.render(V,I)}let Z=Q=>{Q.button&&Q.button!==0||(t.manual=!0,x={id:Q.pointerId,x:Q.clientX,y:Q.clientY},r.setPointerCapture(Q.pointerId),Q.preventDefault())},ne=Q=>{!x||x.id!==Q.pointerId||(t.yaw-=(Q.clientX-x.x)*.011,t.pitch=zu(t.pitch+(Q.clientY-x.y)*.009,-.24,1.35),x.x=Q.clientX,x.y=Q.clientY,Q.preventDefault())},de=Q=>{x&&x.id===Q.pointerId&&(x=null,r.hasPointerCapture(Q.pointerId)&&r.releasePointerCapture(Q.pointerId))},le=Q=>{let ge={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};ge[Q.key]&&(t.manual=!0,t.yaw+=ge[Q.key][0],t.pitch=zu(t.pitch+ge[Q.key][1],-.24,1.35),Q.preventDefault())};r.addEventListener("keydown",le),r.addEventListener("pointerdown",Z),r.addEventListener("pointermove",ne),r.addEventListener("pointerup",de),r.addEventListener("pointercancel",de),r.addEventListener("lostpointercapture",de);function Te(){if(y)return;y=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(M),O.disconnect(),r.removeEventListener("keydown",le),r.removeEventListener("pointerdown",Z),r.removeEventListener("pointermove",ne),r.removeEventListener("pointerup",de),r.removeEventListener("pointercancel",de),r.removeEventListener("lostpointercapture",de);let Q=new Set,ge=new Set,he=new Set;i.traverse(fe=>{fe.geometry&&he.add(fe.geometry),fe.material&&ge.add(fe.material)}),ge.forEach(fe=>{for(let ve of Object.values(fe))ve&&ve.isTexture&&Q.add(ve);fe.dispose()}),Q.forEach(fe=>fe.dispose()),he.forEach(fe=>fe.dispose()),c.dispose(),D.dispose(),U.dispose(),K.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Ae(Q){if(y)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Te();return}let ge=b?Math.min(.05,(Q-b)/1e3):0;if(b=Q,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=ge*.13);let he=Math.max(t.snapshotOnly?g?15:13:g?10.5:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*he,1.15+Math.sin(t.pitch)*he,Math.cos(t.yaw)*Math.cos(t.pitch)*he),s.lookAt(0,1.2,0),H(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}M=requestAnimationFrame(Ae)}return t.snapshotOnly||(M=requestAnimationFrame(Ae)),{update:v,setNight:_,dispose:Te,state:t,snapshot(){let Q=Math.max(t.snapshotOnly?g?15:13:g?10.5:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Q,1.15+Math.sin(t.pitch)*Q,Math.cos(t.yaw)*Math.cos(t.pitch)*Q),s.lookAt(0,1.2,0),H();let ge=document.createElement("canvas");return ge.width=n.domElement.width,ge.height=n.domElement.height,ge.getContext("2d").drawImage(n.domElement,0,0),ge}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
