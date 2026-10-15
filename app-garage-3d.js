(()=>{var jc=0,$o=1,qc=2;var Qo=1,Ba=2,ii=3,Rr=0,Nn=1,Dt=2,Li=0,Ms=1,el=2,tl=3,nl=4,Yc=5,Pr=100,Zc=101,Jc=102,Kc=103,$c=104,Qc=200,eh=201,th=202,nh=203,ih=204,rh=205,sh=206,ah=207,oh=208,lh=209,ch=210,hh=211,uh=212,dh=213,ph=214,za=0,Ga=1,ka=2,Ss=3,Va=4,Ha=5,Wa=6,Xa=7,mh=0,fh=1,gh=2,Mi=0,vh=1,_h=2,yh=3,ri=4,xh=5,Mh=6,Sh=7,ko="attached",Th="detached",il=300,Ir=301,ji=302,ja=303,qa=304,Ts=306,Yn=1e3,gr=1001,ra=1002,ti=1003,bh=1004;var bs=1005;var ni=1006,Ya=1007;var qi=1008;var si=1009,rl=1010,sl=1011,Lr=1012,Za=1013,Yi=1014,kn=1015,Di=1016,Ja=1017,Ka=1018,Dr=1020,al=35902,ol=35899,wh=1021,Eh=1022,Vn=1023,ws=1026,Es=1027,$a=1028,Qa=1029,Ah=1030,ll=1031;var cl=1033,eo=33776,to=33777,no=33778,io=33779,hl=35840,ul=35841,dl=35842,pl=35843,ml=36196,fl=37492,gl=37496,vl=37808,_l=37809,yl=37810,xl=37811,Ml=37812,Sl=37813,Tl=37814,bl=37815,wl=37816,El=37817,Al=37818,Cl=37819,Rl=37820,Pl=37821,Il=36492,Ll=36494,Dl=36495,Ul=36283,Nl=36284,Fl=36285,Ol=36286;var Jr=2300,sa=2301,na=2302,Vo=2400,Ho=2401,Wo=2402;var ro=3201;var Ch=0,Rh=1,Zi="",ht="srgb",Gi="srgb-linear",Kr="linear",At="srgb";var zi=7680;var Ph=512,Ih=513,Lh=514,Bl=515,Dh=516,Uh=517,Nh=518,Fh=519,Xo=35044;var zl="300 es",gi=2e3,$r=2001;var vi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ia=Math.PI/180,aa=180/Math.PI;function Ji(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(hn[255&r]+hn[r>>8&255]+hn[r>>16&255]+hn[r>>24&255]+"-"+hn[255&e]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[63&t|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[255&n]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function ct(r,e,t){return Math.max(e,Math.min(t,r))}function Iu(r,e){return(r%e+e)%e}function co(r,e,t){return(1-t)*r+t*e}function zr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var de=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],p=s[a+0],f=s[a+1],d=s[a+2],v=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=p,e[t+1]=f,e[t+2]=d,void(e[t+3]=v);if(u!==v||c!==p||l!==f||h!==d){let m=1-o,g=c*p+l*f+h*d+u*v,_=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let M=Math.sqrt(y),C=Math.atan2(M,g*_);m=Math.sin(m*C)/M,o=Math.sin(o*C)/M}let x=o*_;if(c=c*m+p*x,l=l*m+f*x,h=h*m+d*x,u=u*m+v*x,m===1-o){let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],p=s[a+1],f=s[a+2],d=s[a+3];return e[t]=o*d+h*u+c*f-l*p,e[t+1]=c*d+h*p+l*u-o*f,e[t+2]=l*d+h*f+o*p-c*u,e[t+3]=h*d-o*u-c*p-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),p=c(n/2),f=c(i/2),d=c(s/2);switch(a){case"XYZ":this._x=p*h*u+l*f*d,this._y=l*f*u-p*h*d,this._z=l*h*d+p*f*u,this._w=l*h*u-p*f*d;break;case"YXZ":this._x=p*h*u+l*f*d,this._y=l*f*u-p*h*d,this._z=l*h*d-p*f*u,this._w=l*h*u+p*f*d;break;case"ZXY":this._x=p*h*u-l*f*d,this._y=l*f*u+p*h*d,this._z=l*h*d+p*f*u,this._w=l*h*u-p*f*d;break;case"ZYX":this._x=p*h*u-l*f*d,this._y=l*f*u+p*h*d,this._z=l*h*d-p*f*u,this._w=l*h*u+p*f*d;break;case"YZX":this._x=p*h*u+l*f*d,this._y=l*f*u+p*h*d,this._z=l*h*d-p*f*u,this._w=l*h*u-p*f*d;break;case"XZY":this._x=p*h*u-l*f*d,this._y=l*f*u-p*h*d,this._z=l*h*d+p*f*u,this._w=l*h*u+p*f*d;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,p=Math.sin(t*h)/l;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=i*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},b=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ho.copy(this).projectOnVector(e),this.sub(ho)}reflect(e){return this.sub(ho.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ho=new b,dc=new Pn,it=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],p=n[2],f=n[5],d=n[8],v=i[0],m=i[3],g=i[6],_=i[1],y=i[4],x=i[7],M=i[2],C=i[5],D=i[8];return s[0]=a*v+o*_+c*M,s[3]=a*m+o*y+c*C,s[6]=a*g+o*x+c*D,s[1]=l*v+h*_+u*M,s[4]=l*m+h*y+u*C,s[7]=l*g+h*x+u*D,s[2]=p*v+f*_+d*M,s[5]=p*m+f*y+d*C,s[8]=p*g+f*x+d*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,p=o*c-h*s,f=l*s-a*c,d=t*u+n*p+i*f;if(d===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/d;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=p*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(uo.makeScale(e,t)),this}rotate(e){return this.premultiply(uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},uo=new it;function Gl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Oh(){let r=Qr("canvas");return r.style.display="block",r}var pc={};function vr(r){r in pc||(pc[r]=!0,console.warn(r))}function Bh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var mc=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fc=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lu(){let r={enabled:!0,workingColorSpace:Gi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===At&&(i.r=fi(i.r),i.g=fi(i.g),i.b=fi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(i.r=fr(i.r),i.g=fr(i.g),i.b=fr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return vr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return vr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Gi]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:mc,fromXYZ:fc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ht},outputColorSpaceConfig:{drawingBufferColorSpace:ht}},[ht]:{primaries:e,whitePoint:n,transfer:At,toXYZ:mc,fromXYZ:fc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ht}}}),r}var _t=Lu();function fi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function fr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var ir,oa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ir===void 0&&(ir=Qr("canvas")),ir.width=e.width,ir.height=e.height;let i=ir.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ir}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*fi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*fi(t[n]/255)):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Du=0,_r=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(po(i[a].image)):s.push(po(i[a]))}else s=po(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function po(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?oa.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Uu=0,mo=new b,vn=class r extends vi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Ji(),this.name="",this.source=new _r(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(mo).x}get height(){return this.source.getSize(mo).y}get depth(){return this.source.getSize(mo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yn:e.x=e.x-Math.floor(e.x);break;case gr:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Yn:e.y=e.y-Math.floor(e.y);break;case gr:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null,vn.DEFAULT_MAPPING=il,vn.DEFAULT_ANISOTROPY=1;var xt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],p=c[1],f=c[5],d=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-v)<.01&&Math.abs(d-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+v)<.1&&Math.abs(d+m)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(f+1)/2,M=(g+1)/2,C=(h+p)/4,D=(u+v)/4,V=(d+m)/4;return y>x&&y>M?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=C/n,s=D/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=C/i,s=V/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=D/s,i=V/s),this.set(n,i,s,t),this}let _=Math.sqrt((m-d)*(m-d)+(u-v)*(u-v)+(p-h)*(p-h));return Math.abs(_)<.001&&(_=1),this.x=(m-d)/_,this.y=(u-v)/_,this.z=(p-h)/_,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},la=class extends vi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new vn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new _r(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends la{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},es=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ca=class extends vn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=gr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var In=class{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(s,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gr),Is.subVectors(this.max,Gr),rr.subVectors(e.a,Gr),sr.subVectors(e.b,Gr),ar.subVectors(e.c,Gr),Si.subVectors(sr,rr),Ti.subVectors(ar,sr),Ni.subVectors(rr,ar);let t=[0,-Si.z,Si.y,0,-Ti.z,Ti.y,0,-Ni.z,Ni.y,Si.z,0,-Si.x,Ti.z,0,-Ti.x,Ni.z,0,-Ni.x,-Si.y,Si.x,0,-Ti.y,Ti.x,0,-Ni.y,Ni.x,0];return!!fo(t,rr,sr,ar,Is)&&(t=[1,0,0,0,1,0,0,0,1],!!fo(t,rr,sr,ar,Is)&&(Ls.crossVectors(Si,Ti),t=[Ls.x,Ls.y,Ls.z],fo(t,rr,sr,ar,Is)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Xn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new b,new b,new b,new b,new b,new b,new b,new b],Xn=new b,Ps=new In,rr=new b,sr=new b,ar=new b,Si=new b,Ti=new b,Ni=new b,Gr=new b,Is=new b,Ls=new b,Fi=new b;function fo(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Fi.fromArray(r,s);let o=i.x*Math.abs(Fi.x)+i.y*Math.abs(Fi.y)+i.z*Math.abs(Fi.z),c=e.dot(Fi),l=t.dot(Fi),h=n.dot(Fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Nu=new In,kr=new b,go=new b,Ln=class{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Nu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kr.subVectors(e,this.center);let t=kr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(kr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(go.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kr.copy(e.center).add(go)),this.expandByPoint(kr.copy(e.center).sub(go))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},hi=new b,vo=new b,Ds=new b,bi=new b,_o=new b,Us=new b,yo=new b,ki=class{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vo.copy(e).add(t).multiplyScalar(.5),Ds.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(vo);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ds),o=bi.dot(this.direction),c=-bi.dot(Ds),l=bi.lengthSq(),h=Math.abs(1-a*a),u,p,f,d;if(h>0)if(u=a*c-o,p=a*o-c,d=s*h,u>=0)if(p>=-d)if(p<=d){let v=1/h;u*=v,p*=v,f=u*(u+a*p+2*o)+p*(a*u+p+2*c)+l}else p=s,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*c)+l;else p=-s,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*c)+l;else p<=-d?(u=Math.max(0,-(-a*s+o)),p=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+p*(p+2*c)+l):p<=d?(u=0,p=Math.min(Math.max(-s,-c),s),f=p*(p+2*c)+l):(u=Math.max(0,-(a*s+o)),p=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+p*(p+2*c)+l);else p=a>0?-s:s,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vo).addScaledVector(Ds,p),f}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),i=hi.dot(hi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,i=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,i=(e.min.x-p.x)*l),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-p.z)*u,c=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,c=(e.min.z-p.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,i,s){_o.subVectors(t,e),Us.subVectors(n,e),yo.crossVectors(_o,Us);let a,o=this.direction.dot(yo);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}bi.subVectors(this.origin,e);let c=a*this.direction.dot(Us.crossVectors(bi,Us));if(c<0)return null;let l=a*this.direction.dot(_o.cross(bi));if(l<0||c+l>o)return null;let h=-a*bi.dot(yo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ke=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,p,f,d,v,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,p,f,d,v,m)}set(e,t,n,i,s,a,o,c,l,h,u,p,f,d,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=p,g[3]=f,g[7]=d,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/or.setFromMatrixColumn(e,0).length(),s=1/or.setFromMatrixColumn(e,1).length(),a=1/or.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let p=a*h,f=a*u,d=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+d*l,t[5]=p-v*l,t[9]=-o*c,t[2]=v-p*l,t[6]=d+f*l,t[10]=a*c}else if(e.order==="YXZ"){let p=c*h,f=c*u,d=l*h,v=l*u;t[0]=p+v*o,t[4]=d*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-d,t[6]=v+p*o,t[10]=a*c}else if(e.order==="ZXY"){let p=c*h,f=c*u,d=l*h,v=l*u;t[0]=p-v*o,t[4]=-a*u,t[8]=d+f*o,t[1]=f+d*o,t[5]=a*h,t[9]=v-p*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let p=a*h,f=a*u,d=o*h,v=o*u;t[0]=c*h,t[4]=d*l-f,t[8]=p*l+v,t[1]=c*u,t[5]=v*l+p,t[9]=f*l-d,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let p=a*c,f=a*l,d=o*c,v=o*l;t[0]=c*h,t[4]=v-p*u,t[8]=d*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+d,t[10]=p-v*u}else if(e.order==="XZY"){let p=a*c,f=a*l,d=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=p*u+v,t[5]=a*h,t[9]=f*u-d,t[2]=d*u-f,t[6]=o*h,t[10]=v*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fu,e,Ou)}lookAt(e,t,n){let i=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),wi.crossVectors(n,An),wi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),wi.crossVectors(n,An)),wi.normalize(),Ns.crossVectors(An,wi),i[0]=wi.x,i[4]=Ns.x,i[8]=An.x,i[1]=wi.y,i[5]=Ns.y,i[9]=An.y,i[2]=wi.z,i[6]=Ns.z,i[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],p=n[9],f=n[13],d=n[2],v=n[6],m=n[10],g=n[14],_=n[3],y=n[7],x=n[11],M=n[15],C=i[0],D=i[4],V=i[8],L=i[12],I=i[1],N=i[5],O=i[9],q=i[13],k=i[2],ee=i[6],te=i[10],ge=i[14],le=i[3],_e=i[7],Q=i[11],he=i[15];return s[0]=a*C+o*I+c*k+l*le,s[4]=a*D+o*N+c*ee+l*_e,s[8]=a*V+o*O+c*te+l*Q,s[12]=a*L+o*q+c*ge+l*he,s[1]=h*C+u*I+p*k+f*le,s[5]=h*D+u*N+p*ee+f*_e,s[9]=h*V+u*O+p*te+f*Q,s[13]=h*L+u*q+p*ge+f*he,s[2]=d*C+v*I+m*k+g*le,s[6]=d*D+v*N+m*ee+g*_e,s[10]=d*V+v*O+m*te+g*Q,s[14]=d*L+v*q+m*ge+g*he,s[3]=_*C+y*I+x*k+M*le,s[7]=_*D+y*N+x*ee+M*_e,s[11]=_*V+y*O+x*te+M*Q,s[15]=_*L+y*q+x*ge+M*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],p=e[10],f=e[14];return e[3]*(+s*c*u-i*l*u-s*o*p+n*l*p+i*o*f-n*c*f)+e[7]*(+t*c*f-t*l*p+s*a*p-i*a*f+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*p+i*a*u-n*a*p+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],p=e[10],f=e[11],d=e[12],v=e[13],m=e[14],g=e[15],_=u*m*l-v*p*l+v*c*f-o*m*f-u*c*g+o*p*g,y=d*p*l-h*m*l-d*c*f+a*m*f+h*c*g-a*p*g,x=h*v*l-d*u*l+d*o*f-a*v*f-h*o*g+a*u*g,M=d*u*c-h*v*c-d*o*p+a*v*p+h*o*m-a*u*m,C=t*_+n*y+i*x+s*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/C;return e[0]=_*D,e[1]=(v*p*s-u*m*s-v*i*f+n*m*f+u*i*g-n*p*g)*D,e[2]=(o*m*s-v*c*s+v*i*l-n*m*l-o*i*g+n*c*g)*D,e[3]=(u*c*s-o*p*s-u*i*l+n*p*l+o*i*f-n*c*f)*D,e[4]=y*D,e[5]=(h*m*s-d*p*s+d*i*f-t*m*f-h*i*g+t*p*g)*D,e[6]=(d*c*s-a*m*s-d*i*l+t*m*l+a*i*g-t*c*g)*D,e[7]=(a*p*s-h*c*s+h*i*l-t*p*l-a*i*f+t*c*f)*D,e[8]=x*D,e[9]=(d*u*s-h*v*s-d*n*f+t*v*f+h*n*g-t*u*g)*D,e[10]=(a*v*s-d*o*s+d*n*l-t*v*l-a*n*g+t*o*g)*D,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*f-t*o*f)*D,e[12]=M*D,e[13]=(h*v*i-d*u*i+d*n*p-t*v*p-h*n*m+t*u*m)*D,e[14]=(d*o*i-a*v*i-d*n*c+t*v*c+a*n*m-t*o*m)*D,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*p+t*o*p)*D,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,p=s*l,f=s*h,d=s*u,v=a*h,m=a*u,g=o*u,_=c*l,y=c*h,x=c*u,M=n.x,C=n.y,D=n.z;return i[0]=(1-(v+g))*M,i[1]=(f+x)*M,i[2]=(d-y)*M,i[3]=0,i[4]=(f-x)*C,i[5]=(1-(p+g))*C,i[6]=(m+_)*C,i[7]=0,i[8]=(d+y)*D,i[9]=(m-_)*D,i[10]=(1-(p+v))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=or.set(i[0],i[1],i[2]).length(),a=or.set(i[4],i[5],i[6]).length(),o=or.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],jn.copy(this);let c=1/s,l=1/a,h=1/o;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=l,jn.elements[5]*=l,jn.elements[6]*=l,jn.elements[8]*=h,jn.elements[9]*=h,jn.elements[10]*=h,t.setFromRotationMatrix(jn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),p=(t+e)/(t-e),f=(n+i)/(n-i),d,v;if(c)d=s/(a-s),v=a*s/(a-s);else if(o===gi)d=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);d=-a/(a-s),v=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),p=-(t+e)/(t-e),f=-(n+i)/(n-i),d,v;if(c)d=1/(a-s),v=a/(a-s);else if(o===gi)d=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);d=-1/(a-s),v=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=d,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},or=new b,jn=new Ke,Fu=new b(0,0,0),Ou=new b(1,1,1),wi=new b,Ns=new b,An=new b,gc=new Ke,vc=new Pn,Zn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],p=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ct(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vc.setFromEuler(this),this.setFromQuaternion(vc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zn.DEFAULT_ORDER="XYZ";var ts=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Bu=0,_c=new b,lr=new Pn,ui=new Ke,Fs=new b,Vr=new b,zu=new b,Gu=new Pn,yc=new b(1,0,0),xc=new b(0,1,0),Mc=new b(0,0,1),Sc={type:"added"},ku={type:"removed"},cr={type:"childadded",child:null},xo={type:"childremoved",child:null},an=class r extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=Ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new b,t=new Zn,n=new Pn,i=new b(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ke},normalMatrix:{value:new it}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.multiply(lr),this}rotateOnWorldAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.premultiply(lr),this}rotateX(e){return this.rotateOnAxis(yc,e)}rotateY(e){return this.rotateOnAxis(xc,e)}rotateZ(e){return this.rotateOnAxis(Mc,e)}translateOnAxis(e,t){return _c.copy(e).applyQuaternion(this.quaternion),this.position.add(_c.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yc,e)}translateY(e){return this.translateOnAxis(xc,e)}translateZ(e){return this.translateOnAxis(Mc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fs.copy(e):Fs.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Vr,Fs,this.up):ui.lookAt(Fs,Vr,this.up),this.quaternion.setFromRotationMatrix(ui),i&&(ui.extractRotation(i.matrixWorld),lr.setFromRotationMatrix(ui),this.quaternion.premultiply(lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sc),cr.child=e,this.dispatchEvent(cr),cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ku),xo.child=e,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sc),cr.child=e,this.dispatchEvent(cr),cr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,zu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,Gu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),f=a(e.animations),d=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),d.length>0&&(n.nodes=d)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};an.DEFAULT_UP=new b(0,1,0),an.DEFAULT_MATRIX_AUTO_UPDATE=!0,an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var qn=new b,di=new b,Mo=new b,pi=new b,hr=new b,ur=new b,Tc=new b,So=new b,To=new b,bo=new b,wo=new xt,Eo=new xt,Ao=new xt,mi=class r{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),qn.subVectors(e,t),i.cross(qn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){qn.subVectors(i,t),di.subVectors(n,t),Mo.subVectors(e,t);let a=qn.dot(qn),o=qn.dot(di),c=qn.dot(Mo),l=di.dot(di),h=di.dot(Mo),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let p=1/u,f=(l*c-o*h)*p,d=(a*h-o*c)*p;return s.set(1-f-d,d,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,pi)!==null&&pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return wo.setScalar(0),Eo.setScalar(0),Ao.setScalar(0),wo.fromBufferAttribute(e,t),Eo.fromBufferAttribute(e,n),Ao.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(wo,s.x),a.addScaledVector(Eo,s.y),a.addScaledVector(Ao,s.z),a}static isFrontFacing(e,t,n,i){return qn.subVectors(n,t),di.subVectors(e,t),qn.cross(di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),.5*qn.cross(di).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;hr.subVectors(i,n),ur.subVectors(s,n),So.subVectors(e,n);let c=hr.dot(So),l=ur.dot(So);if(c<=0&&l<=0)return t.copy(n);To.subVectors(e,i);let h=hr.dot(To),u=ur.dot(To);if(h>=0&&u<=h)return t.copy(i);let p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(hr,a);bo.subVectors(e,s);let f=hr.dot(bo),d=ur.dot(bo);if(d>=0&&f<=d)return t.copy(s);let v=f*l-c*d;if(v<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(ur,o);let m=h*d-f*u;if(m<=0&&u-h>=0&&f-d>=0)return Tc.subVectors(s,i),o=(u-h)/(u-h+(f-d)),t.copy(i).addScaledVector(Tc,o);let g=1/(m+v+p);return a=v*g,o=p*g,t.copy(n).addScaledVector(hr,a).addScaledVector(ur,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Co(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=Iu(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Co(a,s,e+1/3),this.g=Co(a,s,e),this.b=Co(a,s,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=ht){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){let n=zh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return _t.workingToColorSpace(un.copy(this),e),65536*Math.round(ct(255*un.r,0,255))+256*Math.round(ct(255*un.g,0,255))+Math.round(ct(255*un.b,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(un.copy(this),t);let n=un.r,i=un.g,s=un.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=ht){_t.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,i=un.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(Os);let n=co(Ei.h,Os.h,t),i=co(Ei.s,Os.s,t),s=co(Ei.l,Os.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new qe;qe.NAMES=zh;var Vu=0,_i=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Ji(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zn=class extends _i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},jp=Hu();function Hu(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Jt=new b,Bs=new de,Wu=0,Tn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xo,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix3(e),this.setXY(t,Bs.x,Bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),i=Sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),i=Sn(i,this.array),s=Sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xo&&(e.usage=this.usage),e}};var Vi=class extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ns=class extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ie=class extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xu=0,On=new Ke,Ro=new an,dr=new b,Cn=new In,Hr=new In,sn=new b,ut=class r extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gl(e)?ns:Vi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new it().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ie(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new b,1/0);if(e){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(Cn.min,Hr.min),Cn.expandByPoint(sn),sn.addVectors(Cn.max,Hr.max),Cn.expandByPoint(sn)):(Cn.expandByPoint(Hr.min),Cn.expandByPoint(Hr.max))}Cn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)sn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(sn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)sn.fromBufferAttribute(o,l),c&&(dr.fromBufferAttribute(e,l),sn.add(dr)),i=Math.max(i,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let V=0;V<n.count;V++)o[V]=new b,c[V]=new b;let l=new b,h=new b,u=new b,p=new de,f=new de,d=new de,v=new b,m=new b;function g(V,L,I){l.fromBufferAttribute(n,V),h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,I),p.fromBufferAttribute(s,V),f.fromBufferAttribute(s,L),d.fromBufferAttribute(s,I),h.sub(l),u.sub(l),f.sub(p),d.sub(p);let N=1/(f.x*d.y-d.x*f.y);isFinite(N)&&(v.copy(h).multiplyScalar(d.y).addScaledVector(u,-f.y).multiplyScalar(N),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-d.x).multiplyScalar(N),o[V].add(v),o[L].add(v),o[I].add(v),c[V].add(m),c[L].add(m),c[I].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let V=0,L=_.length;V<L;++V){let I=_[V],N=I.start;for(let O=N,q=N+I.count;O<q;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let y=new b,x=new b,M=new b,C=new b;function D(V){M.fromBufferAttribute(i,V),C.copy(M);let L=o[V];y.copy(L),y.sub(M.multiplyScalar(M.dot(L))).normalize(),x.crossVectors(C,L);let I=x.dot(c[V])<0?-1:1;a.setXYZW(V,y.x,y.y,y.z,I)}for(let V=0,L=_.length;V<L;++V){let I=_[V],N=I.start;for(let O=N,q=N+I.count;O<q;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);let i=new b,s=new b,a=new b,o=new b,c=new b,l=new b,h=new b,u=new b;if(e)for(let p=0,f=e.count;p<f;p+=3){let d=e.getX(p+0),v=e.getX(p+1),m=e.getX(p+2);i.fromBufferAttribute(t,d),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,d),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(d,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,f=t.count;p<f;p+=3)i.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,p=new l.constructor(c.length*h),f=0,d=0;for(let v=0,m=c.length;v<m;v++){f=o.isInterleavedBufferAttribute?c[v]*o.data.stride+o.offset:c[v]*h;for(let g=0;g<h;g++)p[d++]=l[f++]}return new Tn(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let p=e(l[h],n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let p=0,f=u.length;p<f;p++)h.push(u[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bc=new Ke,Oi=new ki,zs=new Ln,wc=new b,Gs=new b,ks=new b,Vs=new b,Po=new b,Hs=new b,Ec=new b,Ws=new b,ot=class extends an{constructor(e=new ut,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Hs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Po.fromBufferAttribute(u,e),a?Hs.addScaledVector(Po,h):Hs.addScaledVector(Po.sub(t),h))}t.add(Hs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),zs.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(zs,wc)===null||Oi.origin.distanceToSquared(wc)>(e.far-e.near)**2))return;bc.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(bc),n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Oi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let d=0,v=p.length;d<v;d++){let m=p[d],g=a[m.materialIndex];for(let _=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));_<y;_+=3)i=Xs(this,g,e,n,l,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let d=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);d<v;d+=3)i=Xs(this,a,e,n,l,h,u,o.getX(d),o.getX(d+1),o.getX(d+2)),i&&(i.faceIndex=Math.floor(d/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let d=0,v=p.length;d<v;d++){let m=p[d],g=a[m.materialIndex];for(let _=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));_<y;_+=3)i=Xs(this,g,e,n,l,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let d=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);d<v;d+=3)i=Xs(this,a,e,n,l,h,u,d,d+1,d+2),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}};function Xs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Gs),r.getVertexPosition(c,ks),r.getVertexPosition(l,Vs);let h=(function(u,p,f,d,v,m,g,_){let y;if(y=p.side===1?d.intersectTriangle(g,m,v,!0,_):d.intersectTriangle(v,m,g,p.side===0,_),y===null)return null;Ws.copy(_),Ws.applyMatrix4(u.matrixWorld);let x=f.ray.origin.distanceTo(Ws);return x<f.near||x>f.far?null:{distance:x,point:Ws.clone(),object:u}})(r,e,t,n,Gs,ks,Vs,Ec);if(h){let u=new b;mi.getBarycoord(Ec,Gs,ks,Vs,u),i&&(h.uv=mi.getInterpolatedAttribute(i,o,c,l,u,new de)),s&&(h.uv1=mi.getInterpolatedAttribute(s,o,c,l,u,new de)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,c,l,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:c,c:l,normal:new b,materialIndex:0};mi.getNormal(Gs,ks,Vs,p.normal),h.face=p,h.barycoord=u}return h}var dt=class r extends ut{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],p=0,f=0;function d(v,m,g,_,y,x,M,C,D,V,L){let I=x/D,N=M/V,O=x/2,q=M/2,k=C/2,ee=D+1,te=V+1,ge=0,le=0,_e=new b;for(let Q=0;Q<te;Q++){let he=Q*N-q;for(let Pe=0;Pe<ee;Pe++){let ue=Pe*I-O;_e[v]=ue*_,_e[m]=he*y,_e[g]=k,l.push(_e.x,_e.y,_e.z),_e[v]=0,_e[m]=0,_e[g]=C>0?1:-1,h.push(_e.x,_e.y,_e.z),u.push(Pe/D),u.push(1-Q/V),ge+=1}}for(let Q=0;Q<V;Q++)for(let he=0;he<D;he++){let Pe=p+he+ee*Q,ue=p+he+ee*(Q+1),Me=p+(he+1)+ee*(Q+1),ve=p+(he+1)+ee*Q;c.push(Pe,ue,ve),c.push(ue,Me,ve),le+=6}o.addGroup(f,le,L),f+=le,p+=ge}d("z","y","x",-1,-1,n,t,e,a,s,0),d("z","y","x",1,-1,n,t,-e,a,s,1),d("x","z","y",1,1,e,n,t,i,a,2),d("x","z","y",1,-1,e,n,-t,i,a,3),d("x","y","z",1,-1,e,t,n,i,s,4),d("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ie(l,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ki(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function pn(r){let e={};for(let t=0;t<r.length;t++){let n=Ki(r[t]);for(let i in n)e[i]=n[i]}return e}function kl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Gh={clone:Ki,merge:pn},dn=class extends _i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},yr=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ai=new b,Ac=new de,Cc=new de,zt=class extends yr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*aa*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ia*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*aa*Math.atan(Math.tan(.5*ia*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z)}getViewSize(e,t){return this.getViewBounds(e,Ac,Cc),t.subVectors(Cc,Ac)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ia*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},pr=-90,ha=class extends an{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new zt(pr,1,e,t);i.layers=this.layers,this.add(i);let s=new zt(pr,1,e,t);s.layers=this.layers,this.add(s);let a=new zt(pr,1,e,t);a.layers=this.layers,this.add(a);let o=new zt(pr,1,e,t);o.layers=this.layers,this.add(o);let c=new zt(pr,1,e,t);c.layers=this.layers,this.add(c);let l=new zt(pr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==$r)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),d=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,p,f),e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}},is=class extends vn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ua=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new is(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new dt(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ot(i,s),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=ni),new ha(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},je=class extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}},ju={type:"move"},xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(l,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),f=.02,d=.005;l.inputState.pinching&&p>f+d?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=f-d&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ju)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var _n=class extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var qp=new b;var Yp=new b,Zp=new b,Jp=new b,Kp=new de,$p=new de,Qp=new Ke,em=new b,tm=new b,nm=new b,im=new de,rm=new de,sm=new de;var am=new b,om=new b;var Rc=new b,Pc=new xt,Ic=new xt,qu=new b,Lc=new Ke,js=new b,Io=new Ln,Dc=new Ke,Lo=new ki,rs=class extends ot{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ko,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new In),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingBox.expandByPoint(js)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingSphere.expandByPoint(js)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Io.copy(this.boundingSphere),Io.applyMatrix4(i),e.ray.intersectsSphere(Io)!==!1&&(Dc.copy(i).invert(),Lo.copy(e.ray).applyMatrix4(Dc),this.boundingBox!==null&&Lo.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Lo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ko?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Th?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Pc.fromBufferAttribute(i.attributes.skinIndex,e),Ic.fromBufferAttribute(i.attributes.skinWeight,e),Rc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Ic.getComponent(s);if(a!==0){let o=Pc.getComponent(s);Lc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(qu.copy(Rc).applyMatrix4(Lc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Mr=class extends an{constructor(){super(),this.isBone=!0,this.type="Bone"}},ss=class extends vn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,p){super(null,a,o,c,l,h,i,s,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Uc=new Ke,Yu=new Ke,as=class r{constructor(e=[],t=[]){this.uuid=Ji(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Yu;Uc.multiplyMatrices(o,t[s]),Uc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ss(t,e,e,Vn,kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Mr),this.bones.push(a),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},os=class extends Tn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},mr=new Ke,Nc=new Ke,qs=[],Fc=new In,Zu=new Ke,Wr=new ot,Xr=new Ln,ls=class extends ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new os(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Zu)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new In),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),Fc.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(Fc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),Xr.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(Xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(n),e.ray.intersectsSphere(Xr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,mr),Nc.multiplyMatrices(n,mr),Wr.matrixWorld=Nc,Wr.raycast(e,qs);for(let a=0,o=qs.length;a<o;a++){let c=qs[a];c.instanceId=s,c.object=this,t.push(c)}qs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new os(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ss(new Float32Array(i*this.count),i,this.count,$a,kn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Do=new b,Ju=new b,Ku=new it,Qn=class{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Do.subVectors(n,t).cross(Ju.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Do),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ku.getNormalMatrix(e),i=this.coplanarPoint(Do).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new Ln,$u=new de(.5,.5),Ys=new b,Pi=class{constructor(e=new Qn,t=new Qn,n=new Qn,i=new Qn,s=new Qn,a=new Qn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],p=s[6],f=s[7],d=s[8],v=s[9],m=s[10],g=s[11],_=s[12],y=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-a,f-h,g-d,M-_).normalize(),i[1].setComponents(l+a,f+h,g+d,M+_).normalize(),i[2].setComponents(l+o,f+u,g+v,M+y).normalize(),i[3].setComponents(l-o,f-u,g-v,M-y).normalize(),n)i[4].setComponents(c,p,m,x).normalize(),i[5].setComponents(l-c,f-p,g-m,M-x).normalize();else if(i[4].setComponents(l-c,f-p,g-m,M-x).normalize(),t===gi)i[5].setComponents(l+c,f+p,g+m,M+x).normalize();else{if(t!==$r)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,p,m,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=$u.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ys.x=i.normal.x>0?e.max.x:e.min.x,Ys.y=i.normal.y>0?e.max.y:e.min.y,Ys.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ys)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Kn=new Ke,$n=new Pi,da=class r{constructor(){this.coordinateSystem=gi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Kn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Kn,i.coordinateSystem,i.reversedDepth),$n.containsPoint(e))return!0}return!1}clone(){return new r}};var jo=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},lm=new Ke,cm=new qe(1,1,1),hm=new Pi,um=new da,dm=new In,pm=new Ln,mm=new b,fm=new b,gm=new b,vm=new jo,_m=new ot;var ym=new b,xm=new b,Mm=new Ke,Sm=new ki,Tm=new Ln,bm=new b,wm=new b;var Em=new b,Am=new b;var Cm=new Ke,Rm=new ki,Pm=new Ln,Im=new b;var bt=class extends vn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},cs=class extends vn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ws&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _r(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},hs=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Sr=class r extends ut{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,p=t,f=2*u+p,d=2*n+s,v=i+1,m=new b,g=new b;for(let _=0;_<=d;_++){let y=0,x=0,M=0,C=0;if(_<=n){let L=_/n,I=L*Math.PI/2;x=-h-e*Math.cos(I),M=e*Math.sin(I),C=-e*Math.cos(I),y=L*u}else if(_<=n+s){let L=(_-n)/s;x=L*t-h,M=e,C=0,y=u+L*p}else{let L=(_-n-s)/n,I=L*Math.PI/2;x=h+e*Math.sin(I),M=e*Math.cos(I),C=e*Math.sin(I),y=u+p+L*u}let D=Math.max(0,Math.min(1,y/f)),V=0;_===0?V=.5/i:_===d&&(V=-.5/i);for(let L=0;L<=i;L++){let I=L/i,N=I*Math.PI*2,O=Math.sin(N),q=Math.cos(N);g.x=-M*q,g.y=x,g.z=M*O,o.push(g.x,g.y,g.z),m.set(-M*q,C,M*O),m.normalize(),c.push(m.x,m.y,m.z),l.push(I+V,D)}if(_>0){let L=(_-1)*v;for(let I=0;I<i;I++){let N=L+I,O=L+I+1,q=_*v+I,k=_*v+I+1;a.push(N,O,q),a.push(O,k,q)}}}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Gn=class r extends ut{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new b,h=new de;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("normal",new Ie(o,3)),this.setAttribute("uv",new Ie(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ye=class r extends ut{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],p=[],f=[],d=0,v=[],m=n/2,g=0;function _(y){let x=d,M=new de,C=new b,D=0,V=y===!0?e:t,L=y===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,m*L,0),p.push(0,L,0),f.push(.5,.5),d++;let I=d;for(let N=0;N<=i;N++){let O=N/i*c+o,q=Math.cos(O),k=Math.sin(O);C.x=V*k,C.y=m*L,C.z=V*q,u.push(C.x,C.y,C.z),p.push(0,L,0),M.x=.5*q+.5,M.y=.5*k*L+.5,f.push(M.x,M.y),d++}for(let N=0;N<i;N++){let O=x+N,q=I+N;y===!0?h.push(q,q+1,O):h.push(q+1,q,O),D+=3}l.addGroup(g,D,y===!0?1:2),g+=D}(function(){let y=new b,x=new b,M=0,C=(t-e)/n;for(let D=0;D<=s;D++){let V=[],L=D/s,I=L*(t-e)+e;for(let N=0;N<=i;N++){let O=N/i,q=O*c+o,k=Math.sin(q),ee=Math.cos(q);x.x=I*k,x.y=-L*n+m,x.z=I*ee,u.push(x.x,x.y,x.z),y.set(k,C,ee).normalize(),p.push(y.x,y.y,y.z),f.push(O,1-L),V.push(d++)}v.push(V)}for(let D=0;D<i;D++)for(let V=0;V<s;V++){let L=v[V][D],I=v[V+1][D],N=v[V+1][D+1],O=v[V][D+1];(e>0||V!==0)&&(h.push(L,I,O),M+=3),(t>0||V!==s-1)&&(h.push(I,N,O),M+=3)}l.addGroup(g,M,0),g+=M})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(p,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},pa=class r extends Ye{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ii=class r extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(f,d,v,m){let g=m+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let x=f.clone().lerp(v,y/g),M=d.clone().lerp(v,y/g),C=g-y;for(let D=0;D<=C;D++)_[y][D]=D===0&&y===g?x:x.clone().lerp(M,D/C)}for(let y=0;y<g;y++)for(let x=0;x<2*(g-y)-1;x++){let M=Math.floor(x/2);x%2==0?(c(_[y][M+1]),c(_[y+1][M]),c(_[y][M])):(c(_[y][M+1]),c(_[y+1][M+1]),c(_[y+1][M]))}}function c(f){s.push(f.x,f.y,f.z)}function l(f,d){let v=3*f;d.x=e[v+0],d.y=e[v+1],d.z=e[v+2]}function h(f,d,v,m){m<0&&f.x===1&&(a[d]=f.x-1),v.x===0&&v.z===0&&(a[d]=m/2/Math.PI+.5)}function u(f){return Math.atan2(f.z,-f.x)}function p(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}(function(f){let d=new b,v=new b,m=new b;for(let g=0;g<t.length;g+=3)l(t[g+0],d),l(t[g+1],v),l(t[g+2],m),o(d,v,m,f)})(i),(function(f){let d=new b;for(let v=0;v<s.length;v+=3)d.x=s[v+0],d.y=s[v+1],d.z=s[v+2],d.normalize().multiplyScalar(f),s[v+0]=d.x,s[v+1]=d.y,s[v+2]=d.z})(n),(function(){let f=new b;for(let d=0;d<s.length;d+=3){f.x=s[d+0],f.y=s[d+1],f.z=s[d+2];let v=u(f)/2/Math.PI+.5,m=p(f)/Math.PI+.5;a.push(v,1-m)}(function(){let d=new b,v=new b,m=new b,g=new b,_=new de,y=new de,x=new de;for(let M=0,C=0;M<s.length;M+=9,C+=6){d.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),m.set(s[M+6],s[M+7],s[M+8]),_.set(a[C+0],a[C+1]),y.set(a[C+2],a[C+3]),x.set(a[C+4],a[C+5]),g.copy(d).add(v).add(m).divideScalar(3);let D=u(g);h(_,C+0,d,D),h(y,C+2,v,D),h(x,C+4,m,D)}})(),(function(){for(let d=0;d<a.length;d+=6){let v=a[d+0],m=a[d+2],g=a[d+4],_=Math.max(v,m,g),y=Math.min(v,m,g);_>.9&&y<.1&&(v<.2&&(a[d+0]+=1),m<.2&&(a[d+2]+=1),g<.2&&(a[d+4]+=1))}})()})(),this.setAttribute("position",new Ie(s,3)),this.setAttribute("normal",new Ie(s.slice(),3)),this.setAttribute("uv",new Ie(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},ma=class r extends Ii{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Zs=new b,Js=new b,Uo=new b,Ks=new mi,fa=class extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(ia*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),p={},f=[];for(let d=0;d<c;d+=3){a?(l[0]=a.getX(d),l[1]=a.getX(d+1),l[2]=a.getX(d+2)):(l[0]=d,l[1]=d+1,l[2]=d+2);let{a:v,b:m,c:g}=Ks;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Ks.getNormal(Uo),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let y=(_+1)%3,x=u[_],M=u[y],C=Ks[h[_]],D=Ks[h[y]],V=`${x}_${M}`,L=`${M}_${x}`;L in p&&p[L]?(Uo.dot(p[L].normal)<=s&&(f.push(C.x,C.y,C.z),f.push(D.x,D.y,D.z)),p[L]=null):V in p||(p[V]={index0:l[_],index1:l[y],normal:Uo.clone()})}}for(let d in p)if(p[d]){let{index0:v,index1:m}=p[d];Zs.fromBufferAttribute(o,v),Js.fromBufferAttribute(o,m),f.push(Zs.x,Zs.y,Zs.z),f.push(Js.x,Js.y,Js.z)}this.setAttribute("position",new Ie(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new de:new b);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new b,i=[],s=[],a=[],o=new b,c=new Ke;for(let f=0;f<=e;f++){let d=f/e;i[f]=this.getTangentAt(d,new b)}s[0]=new b,a[0]=new b;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),p=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),p<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let d=Math.acos(ct(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,d))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(ct(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let d=1;d<=e;d++)s[d].applyMatrix4(c.makeRotationAxis(i[d],f*d)),a[d].crossVectors(i[d],s[d])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Tr=class extends Dn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new de){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=c-this.aX,f=l-this.aY;c=p*h-f*u+this.aX,l=p*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ga=class extends Tr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let p=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;p*=h,f*=h,i(a,o,p,f)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var $s=new b,No=new Vl,Fo=new Vl,Oo=new Vl,Mt=class extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new b){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:($s.subVectors(i[0],i[1]).add(i[0]),o=$s);let u=i[l%s],p=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:($s.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=$s),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,d=Math.pow(o.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(c),f);v<1e-4&&(v=1),d<1e-4&&(d=v),m<1e-4&&(m=v),No.initNonuniformCatmullRom(o.x,u.x,p.x,c.x,d,v,m),Fo.initNonuniformCatmullRom(o.y,u.y,p.y,c.y,d,v,m),Oo.initNonuniformCatmullRom(o.z,u.z,p.z,c.z,d,v,m)}else this.curveType==="catmullrom"&&(No.initCatmullRom(o.x,u.x,p.x,c.x,this.tension),Fo.initCatmullRom(o.y,u.y,p.y,c.y,this.tension),Oo.initCatmullRom(o.z,u.z,p.z,c.z,this.tension));return n.set(No.calc(h),Fo.calc(h),Oo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new b().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Oc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Yr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Zr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var us=class extends Dn{constructor(e=new de,t=new de,n=new de,i=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},va=class extends Dn{constructor(e=new b,t=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new b){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y),Zr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ds=class extends Dn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends Dn{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ps=class extends Dn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ms=class extends Dn{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y),Yr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fs=class extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Oc(o,c.x,l.x,h.x,u.x),Oc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new de().fromArray(i))}return this}},ya=Object.freeze({__proto__:null,ArcCurve:ga,CatmullRomCurve3:Mt,CubicBezierCurve:us,CubicBezierCurve3:va,EllipseCurve:Tr,LineCurve:ds,LineCurve3:_a,QuadraticBezierCurve:ps,QuadraticBezierCurve3:ms,SplineCurve:fs}),xa=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ya[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ya[i.type]().fromJSON(i))}return this}},bn=class extends xa{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ds(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new ps(this.currentPoint.clone(),new de(e,t),new de(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new us(this.currentPoint.clone(),new de(e,t),new de(n,i),new de(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new fs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Tr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Qt=class extends bn{constructor(e){super(e),this.uuid=Ji(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new bn().fromJSON(i))}return this}};function Qu(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Bc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,p,f){let d=[];for(let v=0,m=u.length;v<m;v++){let g=Bc(h,u[v]*f,v<m-1?u[v+1]*f:h.length,f,!1);g===g.next&&(g.steiner=!0),d.push(od(g))}d.sort(rd);for(let v=0;v<d.length;v++)p=sd(d[v],p);return p})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let p=t;p<i;p+=t){let f=r[p],d=r[p+1];f<o&&(o=f),d<c&&(c=d),f>h&&(h=f),d>u&&(u=d)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return gs(s,a,t,o,c,l,0),a}function Bc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,p=c-l;u<c;u+=l)h+=(a[p]-a[u])*(a[u+1]+a[p+1]),p=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=zc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=zc(a/n|0,r[a],r[a+1],s);return s&&br(s,s.next)&&(_s(s),s=s.next),s}function Hi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!br(n,n.next)&&Gt(n.prev,n,n.next)!==0)n=n.next;else{if(_s(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function gs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let p=c;do p.z===0&&(p.z=qo(p.x,p.y,l,h,u)),p.prevZ=p.prev,p.nextZ=p.next,p=p.next;while(p!==c);p.prevZ.nextZ=null,p.prevZ=null,(function(f){let d,v=1;do{let m,g=f;f=null;let _=null;for(d=0;g;){d++;let y=g,x=0;for(let C=0;C<v&&(x++,y=y.nextZ,y);C++);let M=v;for(;x>0||M>0&&y;)x!==0&&(M===0||!y||g.z<=y.z)?(m=g,g=g.nextZ,x--):(m=y,y=y.nextZ,M--),_?_.nextZ=m:f=m,m.prevZ=_,_=m;g=y}_.nextZ=null,v*=2}while(d>1)})(p)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?td(r,n,i,s):ed(r))e.push(c.i,r.i,l.i),_s(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?gs(r=nd(Hi(r),e),e,t,n,i,s,2):a===2&&id(r,e,t,n,i,s):gs(Hi(r),e,t,n,i,s,1);break}}}function ed(r){let e=r.prev,t=r,n=r.next;if(Gt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),p=Math.max(i,s,a),f=Math.max(o,c,l),d=n.next;for(;d!==e;){if(d.x>=h&&d.x<=p&&d.y>=u&&d.y<=f&&qr(i,o,s,c,a,l,d.x,d.y)&&Gt(d.prev,d,d.next)>=0)return!1;d=d.next}return!0}function td(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Gt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,p=a.y,f=Math.min(o,c,l),d=Math.min(h,u,p),v=Math.max(o,c,l),m=Math.max(h,u,p),g=qo(f,d,e,t,n),_=qo(v,m,e,t,n),y=r.prevZ,x=r.nextZ;for(;y&&y.z>=g&&x&&x.z<=_;){if(y.x>=f&&y.x<=v&&y.y>=d&&y.y<=m&&y!==i&&y!==a&&qr(o,h,c,u,l,p,y.x,y.y)&&Gt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=v&&x.y>=d&&x.y<=m&&x!==i&&x!==a&&qr(o,h,c,u,l,p,x.x,x.y)&&Gt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=g;){if(y.x>=f&&y.x<=v&&y.y>=d&&y.y<=m&&y!==i&&y!==a&&qr(o,h,c,u,l,p,y.x,y.y)&&Gt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=d&&x.y<=m&&x!==i&&x!==a&&qr(o,h,c,u,l,p,x.x,x.y)&&Gt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function nd(r,e){let t=r;do{let n=t.prev,i=t.next.next;!br(n,i)&&Vh(n,t,t.next,i)&&vs(n,i)&&vs(i,n)&&(e.push(n.i,t.i,i.i),_s(t),_s(t.next),t=r=i),t=t.next}while(t!==r);return Hi(t)}function id(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ld(a,o)){let c=Hh(a,o);return a=Hi(a,a.next),c=Hi(c,c.next),gs(a,e,t,n,i,s,0),void gs(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function rd(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function sd(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(br(i,a))return a;do{if(br(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let v=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,l=a.x<a.next.x?a:a.next,v===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,p=l.x,f=l.y,d=1/0;a=l;do{if(o>=a.x&&a.x>=p&&o!==a.x&&kh(c<f?o:h,c,p,f,c<f?h:o,c,a.x,a.y)){let v=Math.abs(c-a.y)/(o-a.x);vs(a,i)&&(v<d||v===d&&(a.x>l.x||a.x===l.x&&ad(l,a)))&&(l=a,d=v)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=Hh(t,r);return Hi(n,n.next),Hi(t,t.next)}function ad(r,e){return Gt(r.prev,r,e.prev)<0&&Gt(e.next,r,r.next)<0}function qo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function od(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function kh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function qr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&kh(r,e,t,n,i,s,a,o)}function ld(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Vh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(vs(r,e)&&vs(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Gt(r.prev,r,e.prev)||Gt(r,e.prev,e))||br(r,e)&&Gt(r.prev,r,r.next)>0&&Gt(e.prev,e,e.next)>0)}function Gt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function br(r,e){return r.x===e.x&&r.y===e.y}function Vh(r,e,t,n){let i=ea(Gt(r,e,t)),s=ea(Gt(r,e,n)),a=ea(Gt(t,n,r)),o=ea(Gt(t,n,e));return i!==s&&a!==o||!(i!==0||!Qs(r,t,e))||!(s!==0||!Qs(r,n,e))||!(a!==0||!Qs(t,r,n))||!(o!==0||!Qs(t,e,n))}function Qs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ea(r){return r>0?1:r<0?-1:0}function vs(r,e){return Gt(r.prev,r,r.next)<0?Gt(r,e,r.next)>=0&&Gt(r,r.prev,e)>=0:Gt(r,e,r.prev)<0||Gt(r,r.next,e)<0}function Hh(r,e){let t=Yo(r.i,r.x,r.y),n=Yo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function zc(r,e,t,n){let i=Yo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function _s(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Yo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Zo=class{static triangulate(e,t,n=2){return Qu(e,t,n)}},ei=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Gc(e),kc(n,e);let a=e.length;t.forEach(Gc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,kc(n,t[c]);let o=Zo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Gc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function kc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var qt=class r extends ut{constructor(e=new Qt([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled===void 0||t.bevelEnabled,f=t.bevelThickness!==void 0?t.bevelThickness:.2,d=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:cd,y,x,M,C,D,V=!1;g&&(y=g.getSpacedPoints(h),V=!0,p=!1,x=g.computeFrenetFrames(h,!1),M=new b,C=new b,D=new b),p||(m=0,f=0,d=0,v=0);let L=o.extractPoints(l),I=L.shape,N=L.holes;if(!ei.isClockWise(I)){I=I.reverse();for(let z=0,S=N.length;z<S;z++){let P=N[z];ei.isClockWise(P)&&(N[z]=P.reverse())}}function O(z){let S=10000000000000001e-36,P=z[0];for(let G=1;G<=z.length;G++){let B=G%z.length,ae=z[B],Z=ae.x-P.x,$=ae.y-P.y,Se=Z*Z+$*$,Le=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(P.x),Math.abs(P.y));Se<=S*Le*Le?(z.splice(B,1),G--):P=ae}}O(I),N.forEach(O);let q=N.length,k=I;for(let z=0;z<q;z++){let S=N[z];I=I.concat(S)}function ee(z,S,P){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(S,P)}let te=I.length;function ge(z,S,P){let G,B,ae,Z=z.x-S.x,$=z.y-S.y,Se=P.x-z.x,Le=P.y-z.y,ye=Z*Z+$*$,Ce=Z*Le-$*Se;if(Math.abs(Ce)>Number.EPSILON){let Ge=Math.sqrt(ye),me=Math.sqrt(Se*Se+Le*Le),Ue=S.x-$/Ge,Oe=S.y+Z/Ge,He=((P.x-Le/me-Ue)*Le-(P.y+Se/me-Oe)*Se)/(Z*Le-$*Se);G=Ue+Z*He-z.x,B=Oe+$*He-z.y;let Te=G*G+B*B;if(Te<=2)return new de(G,B);ae=Math.sqrt(Te/2)}else{let Ge=!1;Z>Number.EPSILON?Se>Number.EPSILON&&(Ge=!0):Z<-Number.EPSILON?Se<-Number.EPSILON&&(Ge=!0):Math.sign($)===Math.sign(Le)&&(Ge=!0),Ge?(G=-$,B=Z,ae=Math.sqrt(ye)):(G=Z,B=$,ae=Math.sqrt(ye/2))}return new de(G/ae,B/ae)}let le=[];for(let z=0,S=k.length,P=S-1,G=z+1;z<S;z++,P++,G++)P===S&&(P=0),G===S&&(G=0),le[z]=ge(k[z],k[P],k[G]);let _e=[],Q,he,Pe=le.concat();for(let z=0,S=q;z<S;z++){let P=N[z];Q=[];for(let G=0,B=P.length,ae=B-1,Z=G+1;G<B;G++,ae++,Z++)ae===B&&(ae=0),Z===B&&(Z=0),Q[G]=ge(P[G],P[ae],P[Z]);_e.push(Q),Pe=Pe.concat(Q)}if(m===0)he=ei.triangulateShape(k,N);else{let z=[],S=[];for(let P=0;P<m;P++){let G=P/m,B=f*Math.cos(G*Math.PI/2),ae=d*Math.sin(G*Math.PI/2)+v;for(let Z=0,$=k.length;Z<$;Z++){let Se=ee(k[Z],le[Z],ae);J(Se.x,Se.y,-B),G===0&&z.push(Se)}for(let Z=0,$=q;Z<$;Z++){let Se=N[Z];Q=_e[Z];let Le=[];for(let ye=0,Ce=Se.length;ye<Ce;ye++){let Ge=ee(Se[ye],Q[ye],ae);J(Ge.x,Ge.y,-B),G===0&&Le.push(Ge)}G===0&&S.push(Le)}}he=ei.triangulateShape(z,S)}let ue=he.length,Me=d+v;for(let z=0;z<te;z++){let S=p?ee(I[z],Pe[z],Me):I[z];V?(C.copy(x.normals[0]).multiplyScalar(S.x),M.copy(x.binormals[0]).multiplyScalar(S.y),D.copy(y[0]).add(C).add(M),J(D.x,D.y,D.z)):J(S.x,S.y,0)}for(let z=1;z<=h;z++)for(let S=0;S<te;S++){let P=p?ee(I[S],Pe[S],Me):I[S];V?(C.copy(x.normals[z]).multiplyScalar(P.x),M.copy(x.binormals[z]).multiplyScalar(P.y),D.copy(y[z]).add(C).add(M),J(D.x,D.y,D.z)):J(P.x,P.y,u/h*z)}for(let z=m-1;z>=0;z--){let S=z/m,P=f*Math.cos(S*Math.PI/2),G=d*Math.sin(S*Math.PI/2)+v;for(let B=0,ae=k.length;B<ae;B++){let Z=ee(k[B],le[B],G);J(Z.x,Z.y,u+P)}for(let B=0,ae=N.length;B<ae;B++){let Z=N[B];Q=_e[B];for(let $=0,Se=Z.length;$<Se;$++){let Le=ee(Z[$],Q[$],G);V?J(Le.x,Le.y+y[h-1].y,y[h-1].x+P):J(Le.x,Le.y,u+P)}}}function ve(z,S){let P=z.length;for(;--P>=0;){let G=P,B=P-1;B<0&&(B=z.length-1);for(let ae=0,Z=h+2*m;ae<Z;ae++){let $=te*ae,Se=te*(ae+1);E(S+G+$,S+B+$,S+B+Se,S+G+Se)}}}function J(z,S,P){c.push(z),c.push(S),c.push(P)}function Ee(z,S,P){w(z),w(S),w(P);let G=i.length/3,B=_.generateTopUV(n,i,G-3,G-2,G-1);W(B[0]),W(B[1]),W(B[2])}function E(z,S,P,G){w(z),w(S),w(G),w(S),w(P),w(G);let B=i.length/3,ae=_.generateSideWallUV(n,i,B-6,B-3,B-2,B-1);W(ae[0]),W(ae[1]),W(ae[3]),W(ae[1]),W(ae[2]),W(ae[3])}function w(z){i.push(c[3*z+0]),i.push(c[3*z+1]),i.push(c[3*z+2])}function W(z){s.push(z.x),s.push(z.y)}(function(){let z=i.length/3;if(p){let S=0,P=te*S;for(let G=0;G<ue;G++){let B=he[G];Ee(B[2]+P,B[1]+P,B[0]+P)}S=h+2*m,P=te*S;for(let G=0;G<ue;G++){let B=he[G];Ee(B[0]+P,B[1]+P,B[2]+P)}}else{for(let S=0;S<ue;S++){let P=he[S];Ee(P[2],P[1],P[0])}for(let S=0;S<ue;S++){let P=he[S];Ee(P[0]+te*h,P[1]+te*h,P[2]+te*h)}}n.addGroup(z,i.length/3-z,0)})(),(function(){let z=i.length/3,S=0;ve(k,S),S+=k.length;for(let P=0,G=N.length;P<G;P++){let B=N[P];ve(B,S),S+=B.length}n.addGroup(z,i.length/3-z,1)})()}this.setAttribute("position",new Ie(i,3)),this.setAttribute("uv",new Ie(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ya[i.type]().fromJSON(i)),new r(n,e.options)}},cd={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new de(s,a),new de(o,c),new de(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],p=e[3*i],f=e[3*i+1],d=e[3*i+2],v=e[3*s],m=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new de(a,1-c),new de(l,1-u),new de(p,1-d),new de(v,1-g)]:[new de(o,1-c),new de(h,1-u),new de(f,1-d),new de(m,1-g)]}},Ma=class r extends Ii{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yi=class r extends ut{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ct(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new b,p=new de,f=new b,d=new b,v=new b,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,f.x=1*g,f.y=-m,f.z=0*g,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,f.x=1*g,f.y=-m,f.z=0*g,d.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(d)}for(let _=0;_<=t;_++){let y=n+_*h*i,x=Math.sin(y),M=Math.cos(y);for(let C=0;C<=e.length-1;C++){u.x=e[C].x*x,u.y=e[C].y,u.z=e[C].x*M,a.push(u.x,u.y,u.z),p.x=_/t,p.y=C/(e.length-1),o.push(p.x,p.y);let D=c[3*C+0]*x,V=c[3*C+1],L=c[3*C+0]*M;l.push(D,V,L)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let x=y+_*e.length,M=x,C=x+e.length,D=x+e.length+1,V=x+1;s.push(M,C,V),s.push(D,V,C)}this.setIndex(s),this.setAttribute("position",new Ie(a,3)),this.setAttribute("uv",new Ie(o,2)),this.setAttribute("normal",new Ie(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},wr=class r extends Ii{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Yt=class r extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,p=t/c,f=[],d=[],v=[],m=[];for(let g=0;g<h;g++){let _=g*p-a;for(let y=0;y<l;y++){let x=y*u-s;d.push(x,-_,0),v.push(0,0,1),m.push(y/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,x=_+l*(g+1),M=_+1+l*(g+1),C=_+1+l*g;f.push(y,x,C),f.push(x,M,C)}this.setIndex(f),this.setAttribute("position",new Ie(d,3)),this.setAttribute("normal",new Ie(v,3)),this.setAttribute("uv",new Ie(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Sa=class r extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,p=(t-e)/(i=Math.max(1,i)),f=new b,d=new de;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){let g=s+m/n*a;f.x=u*Math.cos(g),f.y=u*Math.sin(g),c.push(f.x,f.y,f.z),l.push(0,0,1),d.x=(f.x/t+1)/2,d.y=(f.y/t+1)/2,h.push(d.x,d.y)}u+=p}for(let v=0;v<i;v++){let m=v*(n+1);for(let g=0;g<n;g++){let _=g+m,y=_,x=_+n+1,M=_+n+2,C=_+1;o.push(y,x,C),o.push(x,M,C)}}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Wi=class r extends ut{constructor(e=new Qt([new de(0,.5),new de(-.5,-.5),new de(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,p=h.extractPoints(t),f=p.shape,d=p.holes;ei.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=d.length;m<g;m++){let _=d[m];ei.isClockWise(_)===!0&&(d[m]=_.reverse())}let v=ei.triangulateShape(f,d);for(let m=0,g=d.length;m<g;m++){let _=d[m];f=f.concat(_)}for(let m=0,g=f.length;m<g;m++){let _=f[m];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],y=_[0]+u,x=_[1]+u,M=_[2]+u;n.push(y,x,M),c+=3}}this.setIndex(n),this.setAttribute("position",new Ie(i,3)),this.setAttribute("normal",new Ie(s,3)),this.setAttribute("uv",new Ie(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},on=class r extends ut{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new b,p=new b,f=[],d=[],v=[],m=[];for(let g=0;g<=n;g++){let _=[],y=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let C=M/t;u.x=-e*Math.cos(i+C*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+C*s)*Math.sin(a+y*o),d.push(u.x,u.y,u.z),p.copy(u).normalize(),v.push(p.x,p.y,p.z),m.push(C+x,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],x=h[g][_],M=h[g+1][_],C=h[g+1][_+1];(g!==0||a>0)&&f.push(y,x,C),(g!==n-1||c<Math.PI)&&f.push(x,M,C)}this.setIndex(f),this.setAttribute("position",new Ie(d,3)),this.setAttribute("normal",new Ie(v,3)),this.setAttribute("uv",new Ie(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ta=class r extends Ii{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yt=class r extends ut{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new b,u=new b,p=new b;for(let f=0;f<=n;f++)for(let d=0;d<=i;d++){let v=d/i*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),p.subVectors(u,h).normalize(),c.push(p.x,p.y,p.z),l.push(d/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let d=1;d<=i;d++){let v=(i+1)*f+d-1,m=(i+1)*(f-1)+d-1,g=(i+1)*(f-1)+d,_=(i+1)*f+d;a.push(v,m,_),a.push(m,g,_)}this.setIndex(a),this.setAttribute("position",new Ie(o,3)),this.setAttribute("normal",new Ie(c,3)),this.setAttribute("uv",new Ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},ba=class r extends ut{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new b,p=new b,f=new b,d=new b,v=new b,m=new b,g=new b;for(let y=0;y<=n;++y){let x=y/n*s*Math.PI*2;_(x,s,a,e,f),_(x+.01,s,a,e,d),m.subVectors(d,f),g.addVectors(d,f),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize();for(let M=0;M<=i;++M){let C=M/i*Math.PI*2,D=-t*Math.cos(C),V=t*Math.sin(C);u.x=f.x+(D*g.x+V*v.x),u.y=f.y+(D*g.y+V*v.y),u.z=f.z+(D*g.z+V*v.z),c.push(u.x,u.y,u.z),p.subVectors(u,f).normalize(),l.push(p.x,p.y,p.z),h.push(y/n),h.push(M/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){let M=(i+1)*(y-1)+(x-1),C=(i+1)*y+(x-1),D=(i+1)*y+x,V=(i+1)*(y-1)+x;o.push(M,C,V),o.push(C,D,V)}function _(y,x,M,C,D){let V=Math.cos(y),L=Math.sin(y),I=M/x*y,N=Math.cos(I);D.x=C*(2+N)*.5*V,D.y=C*(2+N)*L*.5,D.z=C*Math.sin(I)*.5}this.setIndex(o),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(l,3)),this.setAttribute("uv",new Ie(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},St=class r extends ut{constructor(e=new ms(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new b,c=new b,l=new de,h=new b,u=[],p=[],f=[],d=[];function v(m){h=e.getPointAt(m/t,h);let g=a.normals[m],_=a.binormals[m];for(let y=0;y<=i;y++){let x=y/i*Math.PI*2,M=Math.sin(x),C=-Math.cos(x);c.x=C*g.x+M*_.x,c.y=C*g.y+M*_.y,c.z=C*g.z+M*_.z,c.normalize(),p.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)v(m);v(s===!1?t:0),(function(){for(let m=0;m<=t;m++)for(let g=0;g<=i;g++)l.x=m/t,l.y=g/i,f.push(l.x,l.y)})(),(function(){for(let m=1;m<=t;m++)for(let g=1;g<=i;g++){let _=(i+1)*(m-1)+(g-1),y=(i+1)*m+(g-1),x=(i+1)*m+g,M=(i+1)*(m-1)+g;d.push(_,y,M),d.push(y,x,M)}})()})(),this.setIndex(d),this.setAttribute("position",new Ie(u,3)),this.setAttribute("normal",new Ie(p,3)),this.setAttribute("uv",new Ie(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ya[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},wa=class extends ut{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new b,s=new b;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],p=u.start;for(let f=p,d=p+u.count;f<d;f+=3)for(let v=0;v<3;v++){let m=o.getX(f+v),g=o.getX(f+(v+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,g),Vc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Vc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ie(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Vc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var Lm=Object.freeze({__proto__:null,BoxGeometry:dt,CapsuleGeometry:Sr,CircleGeometry:Gn,ConeGeometry:pa,CylinderGeometry:Ye,DodecahedronGeometry:ma,EdgesGeometry:fa,ExtrudeGeometry:qt,IcosahedronGeometry:Ma,LatheGeometry:yi,OctahedronGeometry:wr,PlaneGeometry:Yt,PolyhedronGeometry:Ii,RingGeometry:Sa,ShapeGeometry:Wi,SphereGeometry:on,TetrahedronGeometry:Ta,TorusGeometry:yt,TorusKnotGeometry:ba,TubeGeometry:St,WireframeGeometry:wa}),ys=class extends _i{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new qe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Ct=class extends _i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yn=class extends Ct{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Er=class extends _i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ea=class extends _i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ta(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function hd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Xi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Aa=class extends Xi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vo,endingEnd:Vo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ho:s=e,o=2*t-n;break;case Wo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ho:a=e,c=2*n-t;break;case Wo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,f=this._weightNext,d=(n-t)/(i-t),v=d*d,m=v*d,g=-p*m+2*p*v-p*d,_=(1+p)*m+(-1.5-2*p)*v+(-.5+p)*d+1,y=(-1-f)*m+(1.5+f)*v+.5*d,x=f*m-f*v;for(let M=0;M!==o;++M)s[M]=g*a[h+M]+_*a[l+M]+y*a[c+M]+x*a[u+M];return s}},Ca=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let p=0;p!==o;++p)s[p]=a[l+p]*u+a[c+p]*h;return s}},Ra=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Rn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ta(t,this.TimeBufferType),this.values=ta(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ta(e.times,Array),values:ta(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ra(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Aa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case sa:t=this.InterpolantFactoryMethodLinear;break;case na:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return sa;case this.InterpolantFactoryMethodSmooth:return na}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&hd(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===na,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,p=h+n;for(let f=0;f!==n;++f){let d=t[h+f];if(d!==t[u+f]||d!==t[p+f]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Rn.prototype.ValueTypeName="",Rn.prototype.TimeBufferType=Float32Array,Rn.prototype.ValueBufferType=Float32Array,Rn.prototype.DefaultInterpolation=sa;var Ci=class extends Rn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool",Ci.prototype.ValueBufferType=Array,Ci.prototype.DefaultInterpolation=Jr,Ci.prototype.InterpolantFactoryMethodLinear=void 0,Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Pa.prototype.ValueTypeName="color";var Ia=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Ia.prototype.ValueTypeName="number";var La=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Pn.slerpFlat(s,0,a,l-o,a,l,c);return s}},xs=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new La(this.times,this.values,this.getValueSize(),e)}};xs.prototype.ValueTypeName="quaternion",xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends Rn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="string",Ri.prototype.ValueBufferType=Array,Ri.prototype.DefaultInterpolation=Jr,Ri.prototype.InterpolantFactoryMethodLinear=void 0,Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Da=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Da.prototype.ValueTypeName="vector";var Ua=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=l.length;u<p;u+=2){let f=l[u],d=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return d}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Wh=new Ua,Na=class{constructor(e){this.manager=e!==void 0?e:Wh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Na.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ar=class extends an{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Un=class extends Ar{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Bo=new Ke,Hc=new b,Wc=new b,Fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pi,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Hc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hc),Wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wc),t.updateMatrixWorld(),Bo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Xc=new Ke,jr=new b,zo=new b,Jo=class extends Fa{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),jr.setFromMatrixPosition(e.matrixWorld),n.position.copy(jr),zo.copy(n.position),zo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(zo),n.updateMatrixWorld(),i.makeTranslation(-jr.x,-jr.y,-jr.z),Xc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xc,n.coordinateSystem,n.reversedDepth)}},Cr=class extends Ar{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Jo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},xi=class extends yr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ko=class extends Fa{constructor(){super(new xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wn=class extends Ar{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new Ko}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Dm=new Ke,Um=new Ke,Nm=new Ke;var Oa=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Fm=new b,Om=new Pn,Bm=new b,zm=new b,Gm=new b;var km=new b,Vm=new Pn,Hm=new b,Wm=new b;var Hl="\\[\\]\\.:\\/",ud=new RegExp("["+Hl+"]","g"),Go="[^"+Hl+"]",dd="[^"+Hl.replace("\\.","")+"]",pd=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Go)+/(WCOD+)?/.source.replace("WCOD",dd)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Go)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Go)+"$"),md=["material","materials","bones","map"],Lt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ud,"")}static parseTrackName(e){let t=pd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);md.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Lt.Composite=class{constructor(r,e,t){let n=t||Lt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray],Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xm=new Float32Array(1);var jm=new Ke;var qm=new de;var Ym=new b,Zm=new b,Jm=new b,Km=new b,$m=new b,Qm=new b,ef=new b;var tf=new b;var nf=new b,rf=new Ke,sf=new Ke;var af=new b,of=new qe,lf=new qe;var cf=new b,hf=new b,uf=new b;var df=new b,pf=new yr;var mf=new In;var ff=new b;function Wl(r,e,t,n){let i=(function(s){switch(s){case si:case rl:return{byteLength:1,components:1};case Lr:case sl:case Di:return{byteLength:2,components:1};case Ja:case Ka:return{byteLength:2,components:4};case Yi:case Za:case kn:return{byteLength:4,components:1};case al:case ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case $a:case Qa:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Vn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function mu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function gd(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,p)=>u.start-p.start);let h=0;for(let u=1;u<l.length;u++){let p=l[h],f=l[u];f.start<=p.start+p.count+1?p.count=Math.max(p.count,f.start+f.count-p.start):(++h,l[h]=f)}l.length=h+1;for(let u=0,p=l.length;u<p;u++){let f=l[u];r.bufferSubData(o,f.start*c.BYTES_PER_ELEMENT,c,f.start,f.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var lt={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},De={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},ai={basic:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new qe(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:pn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:pn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new qe(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:pn([De.points,De.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:pn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:pn([De.common,De.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:pn([De.sprite,De.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:pn([De.common,De.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:pn([De.lights,De.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};ai.physical={uniforms:pn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var so={r:0,b:0,g:0},$i=new Zn,vd=new Ke;function _d(r,e,t,n,i,s,a){let o=new qe(0),c,l,h=s===!0?0:1,u=null,p=0,f=null;function d(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function v(m,g){m.getRGB(so,kl(r)),n.buffers.color.setClear(so.r,so.g,so.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,v(o,h)},render:function(m){let g=!1,_=d(m);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(m,g){let _=d(g);_&&(_.isCubeTexture||_.mapping===Ts)?(l===void 0&&(l=new ot(new dt(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Ki(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),$i.copy(g.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),l.material.uniforms.envMap.value=_,l.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(vd.makeRotationFromEuler($i)),l.material.toneMapped=_t.getTransfer(_.colorSpace)!==At,u===_&&p===_.version&&f===r.toneMapping||(l.material.needsUpdate=!0,u=_,p=_.version,f=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ot(new Yt(2,2),new dn({name:"BackgroundMaterial",uniforms:Ki(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=_t.getTransfer(_.colorSpace)!==At,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&p===_.version&&f===r.toneMapping||(c.material.needsUpdate=!0,u=_,p=_.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function yd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let _=[],y=[],x=[];for(let M=0;M<t;M++)_[M]=0,y[M]=0,x[M]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function u(g){p(g,0)}function p(g,_){let y=s.newAttributes,x=s.enabledAttributes,M=s.attributeDivisors;y[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),M[g]!==_&&(r.vertexAttribDivisor(g,_),M[g]=_)}function f(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,x=_.length;y<x;y++)_[y]!==g[y]&&(r.disableVertexAttribArray(y),_[y]=0)}function d(g,_,y,x,M,C,D){D===!0?r.vertexAttribIPointer(g,_,y,M,C):r.vertexAttribPointer(g,_,y,x,M,C)}function v(){m(),a=!0,s!==i&&(s=i,o(s.object))}function m(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,y,x,M){let C=!1,D=(function(V,L,I){let N=I.wireframe===!0,O=n[V.id];O===void 0&&(O={},n[V.id]=O);let q=O[L.id];q===void 0&&(q={},O[L.id]=q);let k=q[N];return k===void 0&&(k=l(r.createVertexArray()),q[N]=k),k})(x,y,_);s!==D&&(s=D,o(s.object)),C=(function(V,L,I,N){let O=s.attributes,q=L.attributes,k=0,ee=I.getAttributes();for(let te in ee)if(ee[te].location>=0){let ge=O[te],le=q[te];if(le===void 0&&(te==="instanceMatrix"&&V.instanceMatrix&&(le=V.instanceMatrix),te==="instanceColor"&&V.instanceColor&&(le=V.instanceColor)),ge===void 0||ge.attribute!==le||le&&ge.data!==le.data)return!0;k++}return s.attributesNum!==k||s.index!==N})(g,x,y,M),C&&(function(V,L,I,N){let O={},q=L.attributes,k=0,ee=I.getAttributes();for(let te in ee)if(ee[te].location>=0){let ge=q[te];ge===void 0&&(te==="instanceMatrix"&&V.instanceMatrix&&(ge=V.instanceMatrix),te==="instanceColor"&&V.instanceColor&&(ge=V.instanceColor));let le={};le.attribute=ge,ge&&ge.data&&(le.data=ge.data),O[te]=le,k++}s.attributes=O,s.attributesNum=k,s.index=N})(g,x,y,M),M!==null&&e.update(M,r.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,(function(V,L,I,N){h();let O=N.attributes,q=I.getAttributes(),k=L.defaultAttributeValues;for(let ee in q){let te=q[ee];if(te.location>=0){let ge=O[ee];if(ge===void 0&&(ee==="instanceMatrix"&&V.instanceMatrix&&(ge=V.instanceMatrix),ee==="instanceColor"&&V.instanceColor&&(ge=V.instanceColor)),ge!==void 0){let le=ge.normalized,_e=ge.itemSize,Q=e.get(ge);if(Q===void 0)continue;let he=Q.buffer,Pe=Q.type,ue=Q.bytesPerElement,Me=Pe===r.INT||Pe===r.UNSIGNED_INT||ge.gpuType===Za;if(ge.isInterleavedBufferAttribute){let ve=ge.data,J=ve.stride,Ee=ge.offset;if(ve.isInstancedInterleavedBuffer){for(let E=0;E<te.locationSize;E++)p(te.location+E,ve.meshPerAttribute);V.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let E=0;E<te.locationSize;E++)u(te.location+E);r.bindBuffer(r.ARRAY_BUFFER,he);for(let E=0;E<te.locationSize;E++)d(te.location+E,_e/te.locationSize,Pe,le,J*ue,(Ee+_e/te.locationSize*E)*ue,Me)}else{if(ge.isInstancedBufferAttribute){for(let ve=0;ve<te.locationSize;ve++)p(te.location+ve,ge.meshPerAttribute);V.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let ve=0;ve<te.locationSize;ve++)u(te.location+ve);r.bindBuffer(r.ARRAY_BUFFER,he);for(let ve=0;ve<te.locationSize;ve++)d(te.location+ve,_e/te.locationSize,Pe,le,_e*ue,_e/te.locationSize*ve*ue,Me)}}else if(k!==void 0){let le=k[ee];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(te.location,le);break;case 3:r.vertexAttrib3fv(te.location,le);break;case 4:r.vertexAttrib4fv(te.location,le);break;default:r.vertexAttrib1fv(te.location,le)}}}}f()})(g,_,y,x),M!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(M).buffer))},reset:v,resetDefaultState:m,dispose:function(){v();for(let g in n){let _=n[g];for(let y in _){let x=_[y];for(let M in x)c(x[M].object),delete x[M];delete _[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let x=_[y];for(let M in x)c(x[M].object),delete x[M];delete _[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];if(y[g.id]===void 0)continue;let x=y[g.id];for(let M in x)c(x[M].object),delete x[M];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:f}}function xd(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Md(r,e,t,n){let i;function s(p){if(p==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let p=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(p){return p===Vn||n.convert(p)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(p){let f=p===Di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==si&&n.convert(p)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&p!==kn&&!f)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Sd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Qn,o=new it,c={value:null,needsUpdate:!1};function l(h,u,p,f){let d=h!==null?h.length:0,v=null;if(d!==0){if(v=c.value,f!==!0||v===null){let m=p+4*d,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<m)&&(v=new Float32Array(m));for(let _=0,y=p;_!==d;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,y),v[y+3]=a.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=d,e.numIntersection=0,v}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||i;return i=u,n=h.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,p){let f=h.clippingPlanes,d=h.clipIntersection,v=h.clipShadows,m=r.get(h);if(!i||f===null||f.length===0||s&&!v)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=m.clippingState||null;c.value=y,y=l(f,u,_,p);for(let x=0;x!==_;++x)y[x]=t[x];m.clippingState=y,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=g}}}function Td(r){let e=new WeakMap;function t(i,s){return s===ja?i.mapping=Ir:s===qa&&(i.mapping=ji),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ja||s===qa){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new ua(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Xh=[.125,.215,.35,.446,.526,.582],As=20,Xl=new xi,jh=new qe,jl=null,ql=0,Yl=0,Zl=!1,er=(1+Math.sqrt(5))/2,Ur=1/er,qh=[new b(-er,Ur,0),new b(er,Ur,0),new b(-Ur,0,er),new b(Ur,0,er),new b(0,er,-Ur),new b(0,er,Ur),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)],bd=new b,Fr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=bd}=s;jl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jl,ql,Yl),this._renderer.xr.enabled=Zl,e.scissorTest=!1,ao(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ir||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:Di,format:Vn,colorSpace:Gi,depthBuffer:!1},i=Yh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Xh.length;for(let p=0;p<u;p++){let f=Math.pow(2,h);c.push(f);let d=1/f;p>a-4?d=Xh[p-a+4-1]:p===0&&(d=0),l.push(d);let v=1/(f-2),m=-v,g=1+v,_=[m,m,g,m,g,g,m,m,g,g,m,g],y=6,x=6,M=3,C=2,D=1,V=new Float32Array(M*x*y),L=new Float32Array(C*x*y),I=new Float32Array(D*x*y);for(let O=0;O<y;O++){let q=O%3*2/3-1,k=O>2?0:-1,ee=[q,k,0,q+2/3,k,0,q+2/3,k+1,0,q,k,0,q+2/3,k+1,0,q,k+1,0];V.set(ee,M*x*O),L.set(_,C*x*O);let te=[O,O,O,O,O,O];I.set(te,D*x*O)}let N=new ut;N.setAttribute("position",new Tn(V,M)),N.setAttribute("uv",new Tn(L,C)),N.setAttribute("faceIndex",new Tn(I,D)),o.push(N),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(As),h=new b(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ot(this._lodPlanes[0],e);this._renderer.compile(t,Xl)}_sceneToCubeUV(e,t,n,i,s){let a=new zt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(jh),l.toneMapping=Mi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let p=new zn({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),f=new ot(new dt,p),d=!1,v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,d=!0):(p.color.copy(jh),d=!0);for(let m=0;m<6;m++){let g=m%3;g===0?(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[m],s.y,s.z)):g===1?(a.up.set(0,0,o[m]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[m],s.z)):(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[m]));let _=this._cubeSize;ao(i,g*_,m>2?_:0,_,_),l.setRenderTarget(i),d&&l.render(f,a),l.render(e,a)}f.geometry.dispose(),f.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ir||e.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ot(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;ao(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Xl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=qh[(i-s-1)%qh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ot(this._lodPlanes[i],l),u=l.uniforms,p=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*p):2*Math.PI/39,d=s/f,v=isFinite(s)?1+Math.floor(3*d):As;v>As&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let m=[],g=0;for(let x=0;x<As;++x){let M=x/d,C=Math.exp(-M*M/2);m.push(C),x===0?g+=C:x<v&&(g+=2*C)}for(let x=0;x<m.length;x++)m[x]=m[x]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let y=this._sizeLods[i];ao(t,3*y*(i>_-4?i-_+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Xl)}};function Yh(r,e,t){let n=new Bn(r,e,t);return n.texture.mapping=Ts,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ao(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Zh(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Jh(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function sc(){return`

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
	`}function wd(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ja||s===qa,o=s===Ir||s===ji;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Fr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let p=0,f=6;for(let d=0;d<f;d++)u[d]!==void 0&&p++;return p===f})(h)?(t===null&&(t=new Fr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Ed(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&vr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ad(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,p=0;if(h!==null){let v=h.array;p=h.version;for(let m=0,g=v.length;m<g;m+=3){let _=v[m+0],y=v[m+1],x=v[m+2];l.push(_,y,y,x,x,_)}}else{if(u===void 0)return;{let v=u.array;p=u.version;for(let m=0,g=v.length/3-1;m<g;m+=3){let _=m+0,y=m+1,x=m+2;l.push(_,y,y,x,x,_)}}}let f=new(Gl(l)?ns:Vi)(l,1);f.version=p;let d=s.get(c);d&&e.remove(d),s.set(c,f)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Cd(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<o.length;p++)a(o[p]/s,c[p],h[p]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let p=0;for(let f=0;f<l;f++)p+=c[f]*h[f];t.update(p,n,1)}}}function Rd(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Pd(r,e,t){let n=new WeakMap,i=new xt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let V=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",V)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;p===!0&&(_=1),f===!0&&(_=2),d===!0&&(_=3);let y=a.attributes.position.count*_,x=1;y>e.maxTextureSize&&(x=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*x*4*h),C=new es(M,y,x,h);C.type=kn,C.needsUpdate=!0;let D=4*_;for(let L=0;L<h;L++){let I=v[L],N=m[L],O=g[L],q=y*x*4*L;for(let k=0;k<I.count;k++){let ee=k*D;p===!0&&(i.fromBufferAttribute(I,k),M[q+ee+0]=i.x,M[q+ee+1]=i.y,M[q+ee+2]=i.z,M[q+ee+3]=0),f===!0&&(i.fromBufferAttribute(N,k),M[q+ee+4]=i.x,M[q+ee+5]=i.y,M[q+ee+6]=i.z,M[q+ee+7]=0),d===!0&&(i.fromBufferAttribute(O,k),M[q+ee+8]=i.x,M[q+ee+9]=i.y,M[q+ee+10]=i.z,M[q+ee+11]=O.itemSize===4?i.w:1)}}u={count:h,texture:C,size:new de(y,x)},n.set(a,u),a.addEventListener("dispose",V)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let p=0;for(let d=0;d<c.length;d++)p+=c[d];let f=a.morphTargetsRelative?1:1-p;o.getUniforms().setValue(r,"morphTargetBaseInfluence",f),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Id(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var fu=new vn,Kh=new cs(1,1),gu=new es,vu=new ca,_u=new is,$h=[],Qh=[],eu=new Float32Array(16),tu=new Float32Array(9),nu=new Float32Array(4);function Or(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=$h[i];if(s===void 0&&(s=new Float32Array(i),$h[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function en(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function tn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function lo(r,e){let t=Qh[e];t===void 0&&(t=new Int32Array(e),Qh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Ld(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Dd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2fv(this.addr,e),tn(t,e)}}function Ud(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;r.uniform3fv(this.addr,e),tn(t,e)}}function Nd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4fv(this.addr,e),tn(t,e)}}function Fd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;nu.set(n),r.uniformMatrix2fv(this.addr,!1,nu),tn(t,n)}}function Od(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;tu.set(n),r.uniformMatrix3fv(this.addr,!1,tu),tn(t,n)}}function Bd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;eu.set(n),r.uniformMatrix4fv(this.addr,!1,eu),tn(t,n)}}function zd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2iv(this.addr,e),tn(t,e)}}function kd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;r.uniform3iv(this.addr,e),tn(t,e)}}function Vd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4iv(this.addr,e),tn(t,e)}}function Hd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Wd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;r.uniform2uiv(this.addr,e),tn(t,e)}}function Xd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;r.uniform3uiv(this.addr,e),tn(t,e)}}function jd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;r.uniform4uiv(this.addr,e),tn(t,e)}}function qd(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Kh.compareFunction=Bl,s=Kh):s=fu,t.setTexture2D(e||s,i)}function Yd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||vu,i)}function Zd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_u,i)}function Jd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||gu,i)}function Kd(r,e){r.uniform1fv(this.addr,e)}function $d(r,e){let t=Or(e,this.size,2);r.uniform2fv(this.addr,t)}function Qd(r,e){let t=Or(e,this.size,3);r.uniform3fv(this.addr,t)}function ep(r,e){let t=Or(e,this.size,4);r.uniform4fv(this.addr,t)}function tp(r,e){let t=Or(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function np(r,e){let t=Or(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ip(r,e){let t=Or(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function rp(r,e){r.uniform1iv(this.addr,e)}function sp(r,e){r.uniform2iv(this.addr,e)}function ap(r,e){r.uniform3iv(this.addr,e)}function op(r,e){r.uniform4iv(this.addr,e)}function lp(r,e){r.uniform1uiv(this.addr,e)}function cp(r,e){r.uniform2uiv(this.addr,e)}function hp(r,e){r.uniform3uiv(this.addr,e)}function up(r,e){r.uniform4uiv(this.addr,e)}function dp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||fu,s[a])}function pp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||vu,s[a])}function mp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||_u,s[a])}function fp(r,e,t){let n=this.cache,i=e.length,s=lo(t,i);en(n,s)||(r.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||gu,s[a])}var Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Ld;case 35664:return Dd;case 35665:return Ud;case 35666:return Nd;case 35674:return Fd;case 35675:return Od;case 35676:return Bd;case 5124:case 35670:return zd;case 35667:case 35671:return Gd;case 35668:case 35672:return kd;case 35669:case 35673:return Vd;case 5125:return Hd;case 36294:return Wd;case 36295:return Xd;case 36296:return jd;case 35678:case 36198:case 36298:case 36306:case 35682:return qd;case 35679:case 36299:case 36307:return Yd;case 35680:case 36300:case 36308:case 36293:return Zd;case 36289:case 36303:case 36311:case 36292:return Jd}})(t.type)}},$l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Kd;case 35664:return $d;case 35665:return Qd;case 35666:return ep;case 35674:return tp;case 35675:return np;case 35676:return ip;case 5124:case 35670:return rp;case 35667:case 35671:return sp;case 35668:case 35672:return ap;case 35669:case 35673:return op;case 5125:return lp;case 36294:return cp;case 36295:return hp;case 36296:return up;case 35678:case 36198:case 36298:case 36306:case 35682:return dp;case 35679:case 36299:case 36307:return pp;case 35680:case 36300:case 36308:case 36293:return mp;case 36289:case 36303:case 36311:case 36292:return fp}})(t.type)}},Ql=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Jl=/(\w+)(\])?(\[|\.)?/g;function iu(r,e){r.seq.push(e),r.map[e.id]=e}function gp(r,e,t){let n=r.name,i=n.length;for(Jl.lastIndex=0;;){let s=Jl.exec(n),a=Jl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){iu(t,l===void 0?new Kl(o,r,e):new $l(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Ql(o),iu(t,h)),t=h}}}var Nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);gp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function ru(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var vp=0,su=new it;function au(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),p=Math.min(c+6,l.length);for(let f=u;f<p;f++){let d=f+1;h.push(`${d===c?">":" "} ${d}: ${l[f]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function _p(r,e){let t=(function(n){_t._getMatrix(su,_t.workingColorSpace,n);let i=`mat3( ${su.elements.map(s=>s.toFixed(4))} )`;switch(_t.getTransfer(n)){case Kr:return[i,"LinearTransferOETF"];case At:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function yp(r,e){let t;switch(e){case vh:t="Linear";break;case _h:t="Reinhard";break;case yh:t="Cineon";break;case ri:t="ACESFilmic";break;case Mh:t="AgX";break;case Sh:t="Neutral";break;case xh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var oo=new b;function xp(){return _t.getLuminanceCoefficients(oo),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${oo.x.toFixed(4)}, ${oo.y.toFixed(4)}, ${oo.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cs(r){return r!==""}function ou(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lu(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(r){return r.replace(Mp,Tp)}var Sp=new Map;function Tp(r,e){let t=lt[e];if(t===void 0){let n=Sp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=lt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ec(t)}var bp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cu(r){return r.replace(bp,wp)}function wp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function hu(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Ep(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(N){let O="SHADOWMAP_TYPE_BASIC";return N.shadowMapType===Qo?O="SHADOWMAP_TYPE_PCF":N.shadowMapType===Ba?O="SHADOWMAP_TYPE_PCF_SOFT":N.shadowMapType===ii&&(O="SHADOWMAP_TYPE_VSM"),O})(t),l=(function(N){let O="ENVMAP_TYPE_CUBE";if(N.envMap)switch(N.envMapMode){case Ir:case ji:O="ENVMAP_TYPE_CUBE";break;case Ts:O="ENVMAP_TYPE_CUBE_UV"}return O})(t),h=(function(N){let O="ENVMAP_MODE_REFLECTION";return N.envMap&&N.envMapMode===ji&&(O="ENVMAP_MODE_REFRACTION"),O})(t),u=(function(N){let O="ENVMAP_BLENDING_NONE";if(N.envMap)switch(N.combine){case mh:O="ENVMAP_BLENDING_MULTIPLY";break;case fh:O="ENVMAP_BLENDING_MIX";break;case gh:O="ENVMAP_BLENDING_ADD"}return O})(t),p=(function(N){let O=N.envMapCubeUVHeight;if(O===null)return null;let q=Math.log2(O)-2,k=1/O;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:k,maxMip:q}})(t),f=(function(N){return[N.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",N.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)})(t),d=(function(N){let O=[];for(let q in N){let k=N[q];k!==!1&&O.push("#define "+q+" "+k)}return O.join(`
`)})(s),v=i.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Cs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Cs).join(`
`),g.length>0&&(g+=`
`)):(m=[hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),g=[hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?lt.tonemapping_pars_fragment:"",t.toneMapping!==Mi?yp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,_p("linearToOutputTexel",t.outputColorSpace),xp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=ec(a),a=ou(a,t),a=lu(a,t),o=ec(o),o=ou(o,t),o=lu(o,t),a=cu(a),o=cu(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+m+a,x=_+g+o,M=ru(i,i.VERTEX_SHADER,y),C=ru(i,i.FRAGMENT_SHADER,x);function D(N){if(r.debug.checkShaderErrors){let O=i.getProgramInfoLog(v)||"",q=i.getShaderInfoLog(M)||"",k=i.getShaderInfoLog(C)||"",ee=O.trim(),te=q.trim(),ge=k.trim(),le=!0,_e=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,M,C);else{let Q=au(i,M,"vertex"),he=au(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+ee+`
`+Q+`
`+he)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):te!==""&&ge!==""||(_e=!1);_e&&(N.diagnostics={runnable:le,programLog:ee,vertexShader:{log:te,prefix:m},fragmentShader:{log:ge,prefix:g}})}i.deleteShader(M),i.deleteShader(C),V=new Nr(i,v),L=(function(O,q){let k={},ee=O.getProgramParameter(q,O.ACTIVE_ATTRIBUTES);for(let te=0;te<ee;te++){let ge=O.getActiveAttrib(q,te),le=ge.name,_e=1;ge.type===O.FLOAT_MAT2&&(_e=2),ge.type===O.FLOAT_MAT3&&(_e=3),ge.type===O.FLOAT_MAT4&&(_e=4),k[le]={type:ge.type,location:O.getAttribLocation(q,le),locationSize:_e}}return k})(i,v)}let V,L;i.attachShader(v,M),i.attachShader(v,C),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return V===void 0&&D(this),V},this.getAttributes=function(){return L===void 0&&D(this),L};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(v,37297)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vp++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=C,this}var Ap=0,tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nc(e),t.set(e,n)),n}},nc=class{constructor(e){this.id=Ap++,this.code=e,this.usedTimes=0}};function Cp(r,e,t,n,i,s,a){let o=new ts,c=new tc,l=new Set,h=[],u=i.logarithmicDepthBuffer,p=i.vertexTextures,f=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,y,x){let M=y.fog,C=x.geometry,D=m.isMeshStandardMaterial?y.environment:null,V=(m.isMeshStandardMaterial?t:e).get(m.envMap||D),L=V&&V.mapping===Ts?V.image.height:null,I=d[m.type];m.precision!==null&&(f=i.getMaxPrecision(m.precision),f!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",f,"instead."));let N=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,O=N!==void 0?N.length:0,q,k,ee,te,ge=0;if(C.morphAttributes.position!==void 0&&(ge=1),C.morphAttributes.normal!==void 0&&(ge=2),C.morphAttributes.color!==void 0&&(ge=3),I){let ft=ai[I];q=ft.vertexShader,k=ft.fragmentShader}else q=m.vertexShader,k=m.fragmentShader,c.update(m),ee=c.getVertexShaderID(m),te=c.getFragmentShaderID(m);let le=r.getRenderTarget(),_e=r.state.buffers.depth.getReversed(),Q=x.isInstancedMesh===!0,he=x.isBatchedMesh===!0,Pe=!!m.map,ue=!!m.matcap,Me=!!V,ve=!!m.aoMap,J=!!m.lightMap,Ee=!!m.bumpMap,E=!!m.normalMap,w=!!m.displacementMap,W=!!m.emissiveMap,z=!!m.metalnessMap,S=!!m.roughnessMap,P=m.anisotropy>0,G=m.clearcoat>0,B=m.dispersion>0,ae=m.iridescence>0,Z=m.sheen>0,$=m.transmission>0,Se=P&&!!m.anisotropyMap,Le=G&&!!m.clearcoatMap,ye=G&&!!m.clearcoatNormalMap,Ce=G&&!!m.clearcoatRoughnessMap,Ge=ae&&!!m.iridescenceMap,me=ae&&!!m.iridescenceThicknessMap,Ue=Z&&!!m.sheenColorMap,Oe=Z&&!!m.sheenRoughnessMap,He=!!m.specularMap,Te=!!m.specularColorMap,Ae=!!m.specularIntensityMap,ke=$&&!!m.transmissionMap,Rt=$&&!!m.thicknessMap,ze=!!m.gradientMap,pt=!!m.alphaMap,tt=m.alphaTest>0,nn=!!m.alphaHash,ln=!!m.extensions,H=Mi;m.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(H=r.toneMapping));let Ut={shaderID:I,shaderType:m.type,shaderName:m.name,vertexShader:q,fragmentShader:k,defines:m.defines,customVertexShaderID:ee,customFragmentShaderID:te,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:f,batching:he,batchingColor:he&&x._colorsTexture!==null,instancing:Q,instancingColor:Q&&x.instanceColor!==null,instancingMorph:Q&&x.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Gi,alphaToCoverage:!!m.alphaToCoverage,map:Pe,matcap:ue,envMap:Me,envMapMode:Me&&V.mapping,envMapCubeUVHeight:L,aoMap:ve,lightMap:J,bumpMap:Ee,normalMap:E,displacementMap:p&&w,emissiveMap:W,normalMapObjectSpace:E&&m.normalMapType===Rh,normalMapTangentSpace:E&&m.normalMapType===Ch,metalnessMap:z,roughnessMap:S,anisotropy:P,anisotropyMap:Se,clearcoat:G,clearcoatMap:Le,clearcoatNormalMap:ye,clearcoatRoughnessMap:Ce,dispersion:B,iridescence:ae,iridescenceMap:Ge,iridescenceThicknessMap:me,sheen:Z,sheenColorMap:Ue,sheenRoughnessMap:Oe,specularMap:He,specularColorMap:Te,specularIntensityMap:Ae,transmission:$,transmissionMap:ke,thicknessMap:Rt,gradientMap:ze,opaque:m.transparent===!1&&m.blending===Ms&&m.alphaToCoverage===!1,alphaMap:pt,alphaTest:tt,alphaHash:nn,combine:m.combine,mapUv:Pe&&v(m.map.channel),aoMapUv:ve&&v(m.aoMap.channel),lightMapUv:J&&v(m.lightMap.channel),bumpMapUv:Ee&&v(m.bumpMap.channel),normalMapUv:E&&v(m.normalMap.channel),displacementMapUv:w&&v(m.displacementMap.channel),emissiveMapUv:W&&v(m.emissiveMap.channel),metalnessMapUv:z&&v(m.metalnessMap.channel),roughnessMapUv:S&&v(m.roughnessMap.channel),anisotropyMapUv:Se&&v(m.anisotropyMap.channel),clearcoatMapUv:Le&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:ye&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:me&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&v(m.sheenRoughnessMap.channel),specularMapUv:He&&v(m.specularMap.channel),specularColorMapUv:Te&&v(m.specularColorMap.channel),specularIntensityMapUv:Ae&&v(m.specularIntensityMap.channel),transmissionMapUv:ke&&v(m.transmissionMap.channel),thicknessMapUv:Rt&&v(m.thicknessMap.channel),alphaMapUv:pt&&v(m.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(E||P),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!C.attributes.uv&&(Pe||pt),fog:!!M,useFog:m.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_e,skinning:x.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:ge,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:H,decodeVideoTexture:Pe&&m.map.isVideoTexture===!0&&_t.getTransfer(m.map.colorSpace)===At,decodeVideoTextureEmissive:W&&m.emissiveMap.isVideoTexture===!0&&_t.getTransfer(m.emissiveMap.colorSpace)===At,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Dt,flipSided:m.side===Nn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ln&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ln&&m.extensions.multiDraw===!0||he)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&((function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)})(g,m),(function(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,m),g.push(r.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=d[m.type],_;if(g){let y=ai[g];_=Gh.clone(y.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let y=0,x=h.length;y<x;y++){let M=h[y];if(M.cacheKey===g){_=M,++_.usedTimes;break}}return _===void 0&&(_=new Ep(r,g,m,s),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes===0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){c.remove(m)},programs:h,dispose:function(){c.dispose()}}}function Rp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Pp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function uu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function du(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let p=r[e];return p===void 0?(p={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=p):(p.id=a.id,p.object=a,p.geometry=o,p.material=c,p.groupOrder=l,p.renderOrder=a.renderOrder,p.z=h,p.group=u),e++,p}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let p=s(a,o,c,l,h,u);c.transmission>0?n.push(p):c.transparent===!0?i.push(p):t.push(p)},unshift:function(a,o,c,l,h,u){let p=s(a,o,c,l,h,u);c.transmission>0?n.unshift(p):c.transparent===!0?i.unshift(p):t.unshift(p)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Pp),n.length>1&&n.sort(o||uu),i.length>1&&i.sort(o||uu)}}}function Ip(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new du,r.set(e,[i])):t>=n.length?(i=new du,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Lp(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new qe};break;case"SpotLight":t={position:new b,direction:new b,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new b,halfWidth:new b,halfHeight:new b}}return r[e.id]=t,t}}}var Dp=0;function Up(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Np(r){let e=new Lp,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new b);let i=new b,s=new Ke,a=new Ke;return{setup:function(o){let c=0,l=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let u=0,p=0,f=0,d=0,v=0,m=0,g=0,_=0,y=0,x=0,M=0;o.sort(Up);for(let D=0,V=o.length;D<V;D++){let L=o[D],I=L.color,N=L.intensity,O=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)c+=I.r*N,l+=I.g*N,h+=I.b*N;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],N);M++}else if(L.isDirectionalLight){let k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let ee=L.shadow,te=t.get(L);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,n.directionalShadow[u]=te,n.directionalShadowMap[u]=q,n.directionalShadowMatrix[u]=L.shadow.matrix,m++}n.directional[u]=k,u++}else if(L.isSpotLight){let k=e.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(I).multiplyScalar(N),k.distance=O,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[f]=k;let ee=L.shadow;if(L.map&&(n.spotLightMap[y]=L.map,y++,ee.updateMatrices(L),L.castShadow&&x++),n.spotLightMatrix[f]=ee.matrix,L.castShadow){let te=t.get(L);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,n.spotShadow[f]=te,n.spotShadowMap[f]=q,_++}f++}else if(L.isRectAreaLight){let k=e.get(L);k.color.copy(I).multiplyScalar(N),k.halfWidth.set(.5*L.width,0,0),k.halfHeight.set(0,.5*L.height,0),n.rectArea[d]=k,d++}else if(L.isPointLight){let k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){let ee=L.shadow,te=t.get(L);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,te.shadowCameraNear=ee.camera.near,te.shadowCameraFar=ee.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=q,n.pointShadowMatrix[p]=L.shadow.matrix,g++}n.point[p]=k,p++}else if(L.isHemisphereLight){let k=e.get(L);k.skyColor.copy(L.color).multiplyScalar(N),k.groundColor.copy(L.groundColor).multiplyScalar(N),n.hemi[v]=k,v++}}d>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let C=n.hash;C.directionalLength===u&&C.pointLength===p&&C.spotLength===f&&C.rectAreaLength===d&&C.hemiLength===v&&C.numDirectionalShadows===m&&C.numPointShadows===g&&C.numSpotShadows===_&&C.numSpotMaps===y&&C.numLightProbes===M||(n.directional.length=u,n.spot.length=f,n.rectArea.length=d,n.point.length=p,n.hemi.length=v,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+y-x,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=M,C.directionalLength=u,C.pointLength=p,C.spotLength=f,C.rectAreaLength=d,C.hemiLength=v,C.numDirectionalShadows=m,C.numPointShadows=g,C.numSpotShadows=_,C.numSpotMaps=y,C.numLightProbes=M,n.version=Dp++)},setupView:function(o,c){let l=0,h=0,u=0,p=0,f=0,d=c.matrixWorldInverse;for(let v=0,m=o.length;v<m;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[l];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(d),l++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(d),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(d),u++}else if(g.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(d),a.identity(),s.copy(g.matrixWorld),s.premultiply(d),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(d),h++}else if(g.isHemisphereLight){let _=n.hemi[f];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(d),f++}}},state:n}}function pu(r){let e=new Np(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Fp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new pu(r),e.set(t,[s])):n>=i.length?(s=new pu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Op(r,e,t){let n=new Pi,i=new de,s=new de,a=new xt,o=new Er({depthPacking:ro}),c=new Ea,l={},h=t.maxTextureSize,u={[Rr]:Nn,[Nn]:Rr,[Dt]:Dt},p=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:`void main() {
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
}`}),f=p.clone();f.defines.HORIZONTAL_PASS=1;let d=new ut;d.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ot(d,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qo;let g=this.type;function _(C,D){let V=e.update(v);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Bn(i.x,i.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(D,null,V,p,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(D,null,V,f,v,null)}function y(C,D,V,L){let I=null,N=V.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)I=N;else if(I=V.isPointLight===!0?c:o,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let O=I.uuid,q=D.uuid,k=l[O];k===void 0&&(k={},l[O]=k);let ee=k[q];ee===void 0&&(ee=I.clone(),k[q]=ee,D.addEventListener("dispose",M)),I=ee}return I.visible=D.visible,I.wireframe=D.wireframe,I.side=L===ii?D.shadowSide!==null?D.shadowSide:D.side:D.shadowSide!==null?D.shadowSide:u[D.side],I.alphaMap=D.alphaMap,I.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,I.map=D.map,I.clipShadows=D.clipShadows,I.clippingPlanes=D.clippingPlanes,I.clipIntersection=D.clipIntersection,I.displacementMap=D.displacementMap,I.displacementScale=D.displacementScale,I.displacementBias=D.displacementBias,I.wireframeLinewidth=D.wireframeLinewidth,I.linewidth=D.linewidth,V.isPointLight===!0&&I.isMeshDistanceMaterial===!0&&(r.properties.get(I).light=V),I}function x(C,D,V,L,I){if(C.visible===!1)return;if(C.layers.test(D.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&I===ii)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,C.matrixWorld);let O=e.update(C),q=C.material;if(Array.isArray(q)){let k=O.groups;for(let ee=0,te=k.length;ee<te;ee++){let ge=k[ee],le=q[ge.materialIndex];if(le&&le.visible){let _e=y(C,le,L,I);C.onBeforeShadow(r,C,D,V,O,_e,ge),r.renderBufferDirect(V,null,O,_e,C,ge),C.onAfterShadow(r,C,D,V,O,_e,ge)}}}else if(q.visible){let k=y(C,q,L,I);C.onBeforeShadow(r,C,D,V,O,k,null),r.renderBufferDirect(V,null,O,k,C,null),C.onAfterShadow(r,C,D,V,O,k,null)}}let N=C.children;for(let O=0,q=N.length;O<q;O++)x(N[O],D,V,L,I)}function M(C){C.target.removeEventListener("dispose",M);for(let D in l){let V=l[D],L=C.target.uuid;L in V&&(V[L].dispose(),delete V[L])}}this.render=function(C,D,V){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let L=r.getRenderTarget(),I=r.getActiveCubeFace(),N=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Li),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let q=g!==ii&&this.type===ii,k=g===ii&&this.type!==ii;for(let ee=0,te=C.length;ee<te;ee++){let ge=C[ee],le=ge.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",ge,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let _e=le.getFrameExtents();if(i.multiply(_e),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/_e.x),i.x=s.x*_e.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/_e.y),i.y=s.y*_e.y,le.mapSize.y=s.y)),le.map===null||q===!0||k===!0){let he=this.type!==ii?{minFilter:ti,magFilter:ti}:{};le.map!==null&&le.map.dispose(),le.map=new Bn(i.x,i.y,he),le.map.texture.name=ge.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let Q=le.getViewportCount();for(let he=0;he<Q;he++){let Pe=le.getViewport(he);a.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),O.viewport(a),le.updateMatrices(ge,he),n=le.getFrustum(),x(D,V,le.camera,ge,this.type)}le.isPointLightShadow!==!0&&this.type===ii&&_(le,V),le.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(L,I,N)}}var Bp={[za]:Ga,[ka]:Wa,[Va]:Xa,[Ss]:Ha,[Ga]:za,[Wa]:ka,[Xa]:Va,[Ha]:Ss};function zp(r,e){let t=new function(){let S=!1,P=new xt,G=null,B=new xt(0,0,0,0);return{setMask:function(ae){G===ae||S||(r.colorMask(ae,ae,ae,ae),G=ae)},setLocked:function(ae){S=ae},setClear:function(ae,Z,$,Se,Le){Le===!0&&(ae*=Se,Z*=Se,$*=Se),P.set(ae,Z,$,Se),B.equals(P)===!1&&(r.clearColor(ae,Z,$,Se),B.copy(P))},reset:function(){S=!1,G=null,B.set(-1,0,0,0)}}},n=new function(){let S=!1,P=!1,G=null,B=null,ae=null;return{setReversed:function(Z){if(P!==Z){let $=e.get("EXT_clip_control");Z?$.clipControlEXT($.LOWER_LEFT_EXT,$.ZERO_TO_ONE_EXT):$.clipControlEXT($.LOWER_LEFT_EXT,$.NEGATIVE_ONE_TO_ONE_EXT),P=Z;let Se=ae;ae=null,this.setClear(Se)}},getReversed:function(){return P},setTest:function(Z){Z?Me(r.DEPTH_TEST):ve(r.DEPTH_TEST)},setMask:function(Z){G===Z||S||(r.depthMask(Z),G=Z)},setFunc:function(Z){if(P&&(Z=Bp[Z]),B!==Z){switch(Z){case za:r.depthFunc(r.NEVER);break;case Ga:r.depthFunc(r.ALWAYS);break;case ka:r.depthFunc(r.LESS);break;case Ss:r.depthFunc(r.LEQUAL);break;case Va:r.depthFunc(r.EQUAL);break;case Ha:r.depthFunc(r.GEQUAL);break;case Wa:r.depthFunc(r.GREATER);break;case Xa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}B=Z}},setLocked:function(Z){S=Z},setClear:function(Z){ae!==Z&&(P&&(Z=1-Z),r.clearDepth(Z),ae=Z)},reset:function(){S=!1,G=null,B=null,ae=null,P=!1}}},i=new function(){let S=!1,P=null,G=null,B=null,ae=null,Z=null,$=null,Se=null,Le=null;return{setTest:function(ye){S||(ye?Me(r.STENCIL_TEST):ve(r.STENCIL_TEST))},setMask:function(ye){P===ye||S||(r.stencilMask(ye),P=ye)},setFunc:function(ye,Ce,Ge){G===ye&&B===Ce&&ae===Ge||(r.stencilFunc(ye,Ce,Ge),G=ye,B=Ce,ae=Ge)},setOp:function(ye,Ce,Ge){Z===ye&&$===Ce&&Se===Ge||(r.stencilOp(ye,Ce,Ge),Z=ye,$=Ce,Se=Ge)},setLocked:function(ye){S=ye},setClear:function(ye){Le!==ye&&(r.clearStencil(ye),Le=ye)},reset:function(){S=!1,P=null,G=null,B=null,ae=null,Z=null,$=null,Se=null,Le=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,p=!1,f=null,d=null,v=null,m=null,g=null,_=null,y=null,x=new qe(0,0,0),M=0,C=!1,D=null,V=null,L=null,I=null,N=null,O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,k=0,ee=r.getParameter(r.VERSION);ee.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(ee)[1]),q=k>=1):ee.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),q=k>=2);let te=null,ge={},le=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),Q=new xt().fromArray(le),he=new xt().fromArray(_e);function Pe(S,P,G,B){let ae=new Uint8Array(4),Z=r.createTexture();r.bindTexture(S,Z),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $=0;$<G;$++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,B,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(P+$,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return Z}let ue={};function Me(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function ve(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}ue[r.TEXTURE_2D]=Pe(r.TEXTURE_2D,r.TEXTURE_2D,1),ue[r.TEXTURE_CUBE_MAP]=Pe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[r.TEXTURE_2D_ARRAY]=Pe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ue[r.TEXTURE_3D]=Pe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Me(r.DEPTH_TEST),n.setFunc(Ss),w(!1),W($o),Me(r.CULL_FACE),E(Li);let J={[Pr]:r.FUNC_ADD,[Zc]:r.FUNC_SUBTRACT,[Jc]:r.FUNC_REVERSE_SUBTRACT};J[Kc]=r.MIN,J[$c]=r.MAX;let Ee={[Qc]:r.ZERO,[eh]:r.ONE,[th]:r.SRC_COLOR,[ih]:r.SRC_ALPHA,[ch]:r.SRC_ALPHA_SATURATE,[oh]:r.DST_COLOR,[sh]:r.DST_ALPHA,[nh]:r.ONE_MINUS_SRC_COLOR,[rh]:r.ONE_MINUS_SRC_ALPHA,[lh]:r.ONE_MINUS_DST_COLOR,[ah]:r.ONE_MINUS_DST_ALPHA,[hh]:r.CONSTANT_COLOR,[uh]:r.ONE_MINUS_CONSTANT_COLOR,[dh]:r.CONSTANT_ALPHA,[ph]:r.ONE_MINUS_CONSTANT_ALPHA};function E(S,P,G,B,ae,Z,$,Se,Le,ye){if(S!==Li){if(p===!1&&(Me(r.BLEND),p=!0),S===Yc)ae=ae||P,Z=Z||G,$=$||B,P===d&&ae===g||(r.blendEquationSeparate(J[P],J[ae]),d=P,g=ae),G===v&&B===m&&Z===_&&$===y||(r.blendFuncSeparate(Ee[G],Ee[B],Ee[Z],Ee[$]),v=G,m=B,_=Z,y=$),Se.equals(x)!==!1&&Le===M||(r.blendColor(Se.r,Se.g,Se.b,Le),x.copy(Se),M=Le),f=S,C=!1;else if(S!==f||ye!==C){if(d===Pr&&g===Pr||(r.blendEquation(r.FUNC_ADD),d=Pr,g=Pr),ye)switch(S){case Ms:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case el:r.blendFunc(r.ONE,r.ONE);break;case tl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case Ms:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case el:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case tl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}v=null,m=null,_=null,y=null,x.set(0,0,0),M=0,f=S,C=ye}}else p===!0&&(ve(r.BLEND),p=!1)}function w(S){D!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),D=S)}function W(S){S!==jc?(Me(r.CULL_FACE),S!==V&&(S===$o?r.cullFace(r.BACK):S===qc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ve(r.CULL_FACE),V=S}function z(S,P,G){S?(Me(r.POLYGON_OFFSET_FILL),I===P&&N===G||(r.polygonOffset(P,G),I=P,N=G)):ve(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Me,disable:ve,bindFramebuffer:function(S,P){return c[S]!==P&&(r.bindFramebuffer(S,P),c[S]=P,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(S,P){let G=h,B=!1;if(S){G=l.get(P),G===void 0&&(G=[],l.set(P,G));let ae=S.textures;if(G.length!==ae.length||G[0]!==r.COLOR_ATTACHMENT0){for(let Z=0,$=ae.length;Z<$;Z++)G[Z]=r.COLOR_ATTACHMENT0+Z;G.length=ae.length,B=!0}}else G[0]!==r.BACK&&(G[0]=r.BACK,B=!0);B&&r.drawBuffers(G)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:E,setMaterial:function(S,P){S.side===Dt?ve(r.CULL_FACE):Me(r.CULL_FACE);let G=S.side===Nn;P&&(G=!G),w(G),S.blending===Ms&&S.transparent===!1?E(Li):E(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let B=S.stencilWrite;i.setTest(B),B&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),z(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Me(r.SAMPLE_ALPHA_TO_COVERAGE):ve(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:w,setCullFace:W,setLineWidth:function(S){S!==L&&(q&&r.lineWidth(S),L=S)},setPolygonOffset:z,setScissorTest:function(S){S?Me(r.SCISSOR_TEST):ve(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+O-1),te!==S&&(r.activeTexture(S),te=S)},bindTexture:function(S,P,G){G===void 0&&(G=te===null?r.TEXTURE0+O-1:te);let B=ge[G];B===void 0&&(B={type:void 0,texture:void 0},ge[G]=B),B.type===S&&B.texture===P||(te!==G&&(r.activeTexture(G),te=G),r.bindTexture(S,P||ue[S]),B.type=S,B.texture=P)},unbindTexture:function(){let S=ge[te];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,P){let G=a.get(P);G===void 0&&(G=new WeakMap,a.set(P,G));let B=G.get(S);B===void 0&&(B=r.getUniformBlockIndex(P,S.name),G.set(S,B))},uniformBlockBinding:function(S,P){let G=a.get(P).get(S);s.get(P)!==G&&(r.uniformBlockBinding(P,G,S.__bindingPointIndex),s.set(P,G))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){Q.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),Q.copy(S))},viewport:function(S){he.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),he.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},te=null,ge={},c={},l=new WeakMap,h=[],u=null,p=!1,f=null,d=null,v=null,m=null,g=null,_=null,y=null,x=new qe(0,0,0),M=0,C=!1,D=null,V=null,L=null,I=null,N=null,Q.set(0,0,r.canvas.width,r.canvas.height),he.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Gp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new de,h=new WeakMap,u,p=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(E,w){return f?new OffscreenCanvas(E,w):Qr("canvas")}function v(E,w,W){let z=1,S=Ee(E);if((S.width>W||S.height>W)&&(z=W/Math.max(S.width,S.height)),z<1){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let P=Math.floor(z*S.width),G=Math.floor(z*S.height);u===void 0&&(u=d(P,G));let B=w?d(P,G):u;return B.width=P,B.height=G,B.getContext("2d").drawImage(E,0,0,P,G),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+P+"x"+G+")."),B}return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),E}return E}function m(E){return E.generateMipmaps}function g(E){r.generateMipmap(E)}function _(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(E,w,W,z,S=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let P=w;if(w===r.RED&&(W===r.FLOAT&&(P=r.R32F),W===r.HALF_FLOAT&&(P=r.R16F),W===r.UNSIGNED_BYTE&&(P=r.R8)),w===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.R8UI),W===r.UNSIGNED_SHORT&&(P=r.R16UI),W===r.UNSIGNED_INT&&(P=r.R32UI),W===r.BYTE&&(P=r.R8I),W===r.SHORT&&(P=r.R16I),W===r.INT&&(P=r.R32I)),w===r.RG&&(W===r.FLOAT&&(P=r.RG32F),W===r.HALF_FLOAT&&(P=r.RG16F),W===r.UNSIGNED_BYTE&&(P=r.RG8)),w===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RG8UI),W===r.UNSIGNED_SHORT&&(P=r.RG16UI),W===r.UNSIGNED_INT&&(P=r.RG32UI),W===r.BYTE&&(P=r.RG8I),W===r.SHORT&&(P=r.RG16I),W===r.INT&&(P=r.RG32I)),w===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGB8UI),W===r.UNSIGNED_SHORT&&(P=r.RGB16UI),W===r.UNSIGNED_INT&&(P=r.RGB32UI),W===r.BYTE&&(P=r.RGB8I),W===r.SHORT&&(P=r.RGB16I),W===r.INT&&(P=r.RGB32I)),w===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),W===r.UNSIGNED_INT&&(P=r.RGBA32UI),W===r.BYTE&&(P=r.RGBA8I),W===r.SHORT&&(P=r.RGBA16I),W===r.INT&&(P=r.RGBA32I)),w===r.RGB&&(W===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),w===r.RGBA){let G=S?Kr:_t.getTransfer(z);W===r.FLOAT&&(P=r.RGBA32F),W===r.HALF_FLOAT&&(P=r.RGBA16F),W===r.UNSIGNED_BYTE&&(P=G===At?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function x(E,w){let W;return E?w===null||w===Yi||w===Dr?W=r.DEPTH24_STENCIL8:w===kn?W=r.DEPTH32F_STENCIL8:w===Lr&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Yi||w===Dr?W=r.DEPTH_COMPONENT24:w===kn?W=r.DEPTH_COMPONENT32F:w===Lr&&(W=r.DEPTH_COMPONENT16),W}function M(E,w){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==ti&&E.minFilter!==ni?Math.log2(Math.max(w.width,w.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?w.mipmaps.length:1}function C(E){let w=E.target;w.removeEventListener("dispose",C),(function(W){let z=n.get(W);if(z.__webglInit===void 0)return;let S=W.source,P=p.get(S);if(P){let G=P[z.__cacheKey];G.usedTimes--,G.usedTimes===0&&V(W),Object.keys(P).length===0&&p.delete(S)}n.remove(W)})(w),w.isVideoTexture&&h.delete(w)}function D(E){let w=E.target;w.removeEventListener("dispose",D),(function(W){let z=n.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),n.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(z.__webglFramebuffer[P]))for(let G=0;G<z.__webglFramebuffer[P].length;G++)r.deleteFramebuffer(z.__webglFramebuffer[P][G]);else r.deleteFramebuffer(z.__webglFramebuffer[P]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[P])}else{if(Array.isArray(z.__webglFramebuffer))for(let P=0;P<z.__webglFramebuffer.length;P++)r.deleteFramebuffer(z.__webglFramebuffer[P]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let P=0;P<z.__webglColorRenderbuffer.length;P++)z.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[P]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let S=W.textures;for(let P=0,G=S.length;P<G;P++){let B=n.get(S[P]);B.__webglTexture&&(r.deleteTexture(B.__webglTexture),a.memory.textures--),n.remove(S[P])}n.remove(W)})(w)}function V(E){let w=n.get(E);r.deleteTexture(w.__webglTexture);let W=E.source;delete p.get(W)[w.__cacheKey],a.memory.textures--}let L=0;function I(E,w){let W=n.get(E);if(E.isVideoTexture&&(function(z){let S=a.render.frame;h.get(z)!==S&&(h.set(z,S),z.update())})(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&W.__version!==E.version){let z=E.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(z.complete!==!1)return void ge(W,E,w);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+w)}let N={[Yn]:r.REPEAT,[gr]:r.CLAMP_TO_EDGE,[ra]:r.MIRRORED_REPEAT},O={[ti]:r.NEAREST,[bh]:r.NEAREST_MIPMAP_NEAREST,[bs]:r.NEAREST_MIPMAP_LINEAR,[ni]:r.LINEAR,[Ya]:r.LINEAR_MIPMAP_NEAREST,[qi]:r.LINEAR_MIPMAP_LINEAR},q={[Ph]:r.NEVER,[Fh]:r.ALWAYS,[Ih]:r.LESS,[Bl]:r.LEQUAL,[Lh]:r.EQUAL,[Nh]:r.GEQUAL,[Dh]:r.GREATER,[Uh]:r.NOTEQUAL};function k(E,w){if(w.type!==kn||e.has("OES_texture_float_linear")!==!1||w.magFilter!==ni&&w.magFilter!==Ya&&w.magFilter!==bs&&w.magFilter!==qi&&w.minFilter!==ni&&w.minFilter!==Ya&&w.minFilter!==bs&&w.minFilter!==qi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,N[w.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,N[w.wrapT]),E!==r.TEXTURE_3D&&E!==r.TEXTURE_2D_ARRAY||r.texParameteri(E,r.TEXTURE_WRAP_R,N[w.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,O[w.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,O[w.minFilter]),w.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,q[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ti||w.minFilter!==bs&&w.minFilter!==qi||w.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ee(E,w){let W=!1;E.__webglInit===void 0&&(E.__webglInit=!0,w.addEventListener("dispose",C));let z=w.source,S=p.get(z);S===void 0&&(S={},p.set(z,S));let P=(function(G){let B=[];return B.push(G.wrapS),B.push(G.wrapT),B.push(G.wrapR||0),B.push(G.magFilter),B.push(G.minFilter),B.push(G.anisotropy),B.push(G.internalFormat),B.push(G.format),B.push(G.type),B.push(G.generateMipmaps),B.push(G.premultiplyAlpha),B.push(G.flipY),B.push(G.unpackAlignment),B.push(G.colorSpace),B.join()})(w);if(P!==E.__cacheKey){S[P]===void 0&&(S[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),S[P].usedTimes++;let G=S[E.__cacheKey];G!==void 0&&(S[E.__cacheKey].usedTimes--,G.usedTimes===0&&V(w)),E.__cacheKey=P,E.__webglTexture=S[P].texture}return W}function te(E,w,W){return Math.floor(Math.floor(E/W)/w)}function ge(E,w,W){let z=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(z=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(z=r.TEXTURE_3D);let S=ee(E,w),P=w.source;t.bindTexture(z,E.__webglTexture,r.TEXTURE0+W);let G=n.get(P);if(P.version!==G.__version||S===!0){t.activeTexture(r.TEXTURE0+W);let B=_t.getPrimaries(_t.workingColorSpace),ae=w.colorSpace===Zi?null:_t.getPrimaries(w.colorSpace),Z=w.colorSpace===Zi||B===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let $=v(w.image,!1,i.maxTextureSize);$=J(w,$);let Se=s.convert(w.format,w.colorSpace),Le=s.convert(w.type),ye,Ce=y(w.internalFormat,Se,Le,w.colorSpace,w.isVideoTexture);k(z,w);let Ge=w.mipmaps,me=w.isVideoTexture!==!0,Ue=G.__version===void 0||S===!0,Oe=P.dataReady,He=M(w,$);if(w.isDepthTexture)Ce=x(w.format===Es,w.type),Ue&&(me?t.texStorage2D(r.TEXTURE_2D,1,Ce,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,Ce,$.width,$.height,0,Se,Le,null));else if(w.isDataTexture)if(Ge.length>0){me&&Ue&&t.texStorage2D(r.TEXTURE_2D,He,Ce,Ge[0].width,Ge[0].height);for(let Te=0,Ae=Ge.length;Te<Ae;Te++)ye=Ge[Te],me?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Se,Le,ye.data):t.texImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,Se,Le,ye.data);w.generateMipmaps=!1}else me?(Ue&&t.texStorage2D(r.TEXTURE_2D,He,Ce,$.width,$.height),Oe&&(function(Te,Ae,ke,Rt){let ze=Te.updateRanges;if(ze.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ae.width,Ae.height,ke,Rt,Ae.data);else{ze.sort((H,Ut)=>H.start-Ut.start);let pt=0;for(let H=1;H<ze.length;H++){let Ut=ze[pt],ft=ze[H],rt=Ut.start+Ut.count,Wn=te(ft.start,Ae.width,4),Tt=te(Ut.start,Ae.width,4);ft.start<=rt+1&&Wn===Tt&&te(ft.start+ft.count-1,Ae.width,4)===Wn?Ut.count=Math.max(Ut.count,ft.start+ft.count-Ut.start):(++pt,ze[pt]=ft)}ze.length=pt+1;let tt=r.getParameter(r.UNPACK_ROW_LENGTH),nn=r.getParameter(r.UNPACK_SKIP_PIXELS),ln=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Ae.width);for(let H=0,Ut=ze.length;H<Ut;H++){let ft=ze[H],rt=Math.floor(ft.start/4),Wn=Math.ceil(ft.count/4),Tt=rt%Ae.width,Ht=Math.floor(rt/Ae.width),at=Wn;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Tt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ht),t.texSubImage2D(r.TEXTURE_2D,0,Tt,Ht,at,1,ke,Rt,Ae.data)}Te.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,tt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,nn),r.pixelStorei(r.UNPACK_SKIP_ROWS,ln)}})(w,$,Se,Le)):t.texImage2D(r.TEXTURE_2D,0,Ce,$.width,$.height,0,Se,Le,$.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){me&&Ue&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ce,Ge[0].width,Ge[0].height,$.depth);for(let Te=0,Ae=Ge.length;Te<Ae;Te++)if(ye=Ge[Te],w.format!==Vn)if(Se!==null)if(me){if(Oe)if(w.layerUpdates.size>0){let ke=Wl(ye.width,ye.height,w.format,w.type);for(let Rt of w.layerUpdates){let ze=ye.data.subarray(Rt*ke/ye.data.BYTES_PER_ELEMENT,(Rt+1)*ke/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,Rt,ye.width,ye.height,1,Se,ze)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ye.width,ye.height,$.depth,Se,ye.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Te,Ce,ye.width,ye.height,$.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else me?Oe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ye.width,ye.height,$.depth,Se,Le,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Te,Ce,ye.width,ye.height,$.depth,0,Se,Le,ye.data)}else{me&&Ue&&t.texStorage2D(r.TEXTURE_2D,He,Ce,Ge[0].width,Ge[0].height);for(let Te=0,Ae=Ge.length;Te<Ae;Te++)ye=Ge[Te],w.format!==Vn?Se!==null?me?Oe&&t.compressedTexSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Se,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):me?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ye.width,ye.height,Se,Le,ye.data):t.texImage2D(r.TEXTURE_2D,Te,Ce,ye.width,ye.height,0,Se,Le,ye.data)}else if(w.isDataArrayTexture)if(me){if(Ue&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ce,$.width,$.height,$.depth),Oe)if(w.layerUpdates.size>0){let Te=Wl($.width,$.height,w.format,w.type);for(let Ae of w.layerUpdates){let ke=$.data.subarray(Ae*Te/$.data.BYTES_PER_ELEMENT,(Ae+1)*Te/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ae,$.width,$.height,1,Se,Le,ke)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,Se,Le,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,$.width,$.height,$.depth,0,Se,Le,$.data);else if(w.isData3DTexture)me?(Ue&&t.texStorage3D(r.TEXTURE_3D,He,Ce,$.width,$.height,$.depth),Oe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,Se,Le,$.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,$.width,$.height,$.depth,0,Se,Le,$.data);else if(w.isFramebufferTexture){if(Ue)if(me)t.texStorage2D(r.TEXTURE_2D,He,Ce,$.width,$.height);else{let Te=$.width,Ae=$.height;for(let ke=0;ke<He;ke++)t.texImage2D(r.TEXTURE_2D,ke,Ce,Te,Ae,0,Se,Le,null),Te>>=1,Ae>>=1}}else if(Ge.length>0){if(me&&Ue){let Te=Ee(Ge[0]);t.texStorage2D(r.TEXTURE_2D,He,Ce,Te.width,Te.height)}for(let Te=0,Ae=Ge.length;Te<Ae;Te++)ye=Ge[Te],me?Oe&&t.texSubImage2D(r.TEXTURE_2D,Te,0,0,Se,Le,ye):t.texImage2D(r.TEXTURE_2D,Te,Ce,Se,Le,ye);w.generateMipmaps=!1}else if(me){if(Ue){let Te=Ee($);t.texStorage2D(r.TEXTURE_2D,He,Ce,Te.width,Te.height)}Oe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se,Le,$)}else t.texImage2D(r.TEXTURE_2D,0,Ce,Se,Le,$);m(w)&&g(z),G.__version=P.version,w.onUpdate&&w.onUpdate(w)}E.__version=w.version}function le(E,w,W,z,S,P){let G=s.convert(W.format,W.colorSpace),B=s.convert(W.type),ae=y(W.internalFormat,G,B,W.colorSpace),Z=n.get(w),$=n.get(W);if($.__renderTarget=w,!Z.__hasExternalTextures){let Se=Math.max(1,w.width>>P),Le=Math.max(1,w.height>>P);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,P,ae,Se,Le,w.depth,0,G,B,null):t.texImage2D(S,P,ae,Se,Le,0,G,B,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),ve(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,z,S,$.__webglTexture,0,Me(w)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,z,S,$.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(E,w,W){if(r.bindRenderbuffer(r.RENDERBUFFER,E),w.depthBuffer){let z=w.depthTexture,S=z&&z.isDepthTexture?z.type:null,P=x(w.stencilBuffer,S),G=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,B=Me(w);ve(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,B,P,w.width,w.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,B,P,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,P,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,G,r.RENDERBUFFER,E)}else{let z=w.textures;for(let S=0;S<z.length;S++){let P=z[S],G=s.convert(P.format,P.colorSpace),B=s.convert(P.type),ae=y(P.internalFormat,G,B,P.colorSpace),Z=Me(w);W&&ve(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Z,ae,w.width,w.height):ve(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Z,ae,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ae,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Q(E,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!w.depthTexture||!w.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(w.depthTexture);W.__renderTarget=w,W.__webglTexture&&w.depthTexture.image.width===w.width&&w.depthTexture.image.height===w.height||(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),I(w.depthTexture,0);let z=W.__webglTexture,S=Me(w);if(w.depthTexture.format===ws)ve(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0);else{if(w.depthTexture.format!==Es)throw new Error("Unknown depthTexture format");ve(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0)}}function he(E){let w=n.get(E),W=E.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==E.depthTexture){let z=E.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),z){let S=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,z.removeEventListener("dispose",S)};z.addEventListener("dispose",S),w.__depthDisposeCallback=S}w.__boundDepthTexture=z}if(E.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");let z=E.texture.mipmaps;z&&z.length>0?Q(w.__webglFramebuffer[0],E):Q(w.__webglFramebuffer,E)}else if(W){w.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[z]),w.__webglDepthbuffer[z]===void 0)w.__webglDepthbuffer[z]=r.createRenderbuffer(),_e(w.__webglDepthbuffer[z],E,!1);else{let S=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=w.__webglDepthbuffer[z];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}else{let z=E.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),_e(w.__webglDepthbuffer,E,!1);else{let S=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Pe=[],ue=[];function Me(E){return Math.min(i.maxSamples,E.samples)}function ve(E){let w=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function J(E,w){let W=E.colorSpace,z=E.format,S=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||W!==Gi&&W!==Zi&&(_t.getTransfer(W)===At?z===Vn&&S===si||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}function Ee(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=function(){let E=L;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),L+=1,E},this.resetTextureUnits=function(){L=0},this.setTexture2D=I,this.setTexture2DArray=function(E,w){let W=n.get(E);E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version?ge(W,E,w):t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+w)},this.setTexture3D=function(E,w){let W=n.get(E);E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version?ge(W,E,w):t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+w)},this.setTextureCube=function(E,w){let W=n.get(E);E.version>0&&W.__version!==E.version?(function(z,S,P){if(S.image.length!==6)return;let G=ee(z,S),B=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+P);let ae=n.get(B);if(B.version!==ae.__version||G===!0){t.activeTexture(r.TEXTURE0+P);let Z=_t.getPrimaries(_t.workingColorSpace),$=S.colorSpace===Zi?null:_t.getPrimaries(S.colorSpace),Se=S.colorSpace===Zi||Z===$?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Le=S.isCompressedTexture||S.image[0].isCompressedTexture,ye=S.image[0]&&S.image[0].isDataTexture,Ce=[];for(let ze=0;ze<6;ze++)Ce[ze]=Le||ye?ye?S.image[ze].image:S.image[ze]:v(S.image[ze],!0,i.maxCubemapSize),Ce[ze]=J(S,Ce[ze]);let Ge=Ce[0],me=s.convert(S.format,S.colorSpace),Ue=s.convert(S.type),Oe=y(S.internalFormat,me,Ue,S.colorSpace),He=S.isVideoTexture!==!0,Te=ae.__version===void 0||G===!0,Ae=B.dataReady,ke,Rt=M(S,Ge);if(k(r.TEXTURE_CUBE_MAP,S),Le){He&&Te&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,Oe,Ge.width,Ge.height);for(let ze=0;ze<6;ze++){ke=Ce[ze].mipmaps;for(let pt=0;pt<ke.length;pt++){let tt=ke[pt];S.format!==Vn?me!==null?He?Ae&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt,0,0,tt.width,tt.height,me,tt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt,Oe,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?Ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt,0,0,tt.width,tt.height,me,Ue,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt,Oe,tt.width,tt.height,0,me,Ue,tt.data)}}}else{if(ke=S.mipmaps,He&&Te){ke.length>0&&Rt++;let ze=Ee(Ce[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,Oe,ze.width,ze.height)}for(let ze=0;ze<6;ze++)if(ye){He?Ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,Ce[ze].width,Ce[ze].height,me,Ue,Ce[ze].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,Oe,Ce[ze].width,Ce[ze].height,0,me,Ue,Ce[ze].data);for(let pt=0;pt<ke.length;pt++){let tt=ke[pt].image[ze].image;He?Ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt+1,0,0,tt.width,tt.height,me,Ue,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt+1,Oe,tt.width,tt.height,0,me,Ue,tt.data)}}else{He?Ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,me,Ue,Ce[ze]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,Oe,me,Ue,Ce[ze]);for(let pt=0;pt<ke.length;pt++){let tt=ke[pt];He?Ae&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt+1,0,0,me,Ue,tt.image[ze]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ze,pt+1,Oe,me,Ue,tt.image[ze])}}}m(S)&&g(r.TEXTURE_CUBE_MAP),ae.__version=B.version,S.onUpdate&&S.onUpdate(S)}z.__version=S.version})(W,E,w):t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+w)},this.rebindTextures=function(E,w,W){let z=n.get(E);w!==void 0&&le(z.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&he(E)},this.setupRenderTarget=function(E){let w=E.texture,W=n.get(E),z=n.get(w);E.addEventListener("dispose",D);let S=E.textures,P=E.isWebGLCubeRenderTarget===!0,G=S.length>1;if(G||(z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture()),z.__version=w.version,a.memory.textures++),P){W.__webglFramebuffer=[];for(let B=0;B<6;B++)if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[B]=[];for(let ae=0;ae<w.mipmaps.length;ae++)W.__webglFramebuffer[B][ae]=r.createFramebuffer()}else W.__webglFramebuffer[B]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let B=0;B<w.mipmaps.length;B++)W.__webglFramebuffer[B]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(G)for(let B=0,ae=S.length;B<ae;B++){let Z=n.get(S[B]);Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture(),a.memory.textures++)}if(E.samples>0&&ve(E)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let B=0;B<S.length;B++){let ae=S[B];W.__webglColorRenderbuffer[B]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[B]);let Z=s.convert(ae.format,ae.colorSpace),$=s.convert(ae.type),Se=y(ae.internalFormat,Z,$,ae.colorSpace,E.isXRRenderTarget===!0),Le=Me(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Le,Se,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.RENDERBUFFER,W.__webglColorRenderbuffer[B])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),_e(W.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture),k(r.TEXTURE_CUBE_MAP,w);for(let B=0;B<6;B++)if(w.mipmaps&&w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)le(W.__webglFramebuffer[B][ae],E,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+B,ae);else le(W.__webglFramebuffer[B],E,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);m(w)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let B=0,ae=S.length;B<ae;B++){let Z=S[B],$=n.get(Z),Se=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Se=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Se,$.__webglTexture),k(Se,Z),le(W.__webglFramebuffer,E,Z,r.COLOR_ATTACHMENT0+B,Se,0),m(Z)&&g(Se)}t.unbindTexture()}else{let B=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(B=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(B,z.__webglTexture),k(B,w),w.mipmaps&&w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)le(W.__webglFramebuffer[ae],E,w,r.COLOR_ATTACHMENT0,B,ae);else le(W.__webglFramebuffer,E,w,r.COLOR_ATTACHMENT0,B,0);m(w)&&g(B),t.unbindTexture()}E.depthBuffer&&he(E)},this.updateRenderTargetMipmap=function(E){let w=E.textures;for(let W=0,z=w.length;W<z;W++){let S=w[W];if(m(S)){let P=_(E),G=n.get(S).__webglTexture;t.bindTexture(P,G),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(E){if(E.samples>0){if(ve(E)===!1){let w=E.textures,W=E.width,z=E.height,S=r.COLOR_BUFFER_BIT,P=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,G=n.get(E),B=w.length>1;if(B)for(let Z=0;Z<w.length;Z++)t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Z,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Z,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);let ae=E.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let Z=0;Z<w.length;Z++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),B){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,G.__webglColorRenderbuffer[Z]);let $=n.get(w[Z]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0)}r.blitFramebuffer(0,0,W,z,0,0,W,z,S,r.NEAREST),c===!0&&(Pe.length=0,ue.length=0,Pe.push(r.COLOR_ATTACHMENT0+Z),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Pe.push(P),ue.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ue)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),B)for(let Z=0;Z<w.length;Z++){t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Z,r.RENDERBUFFER,G.__webglColorRenderbuffer[Z]);let $=n.get(w[Z]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Z,r.TEXTURE_2D,$,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let w=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}},this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ve}function kp(r,e){return{convert:function(t,n=Zi){let i,s=_t.getTransfer(n);if(t===si)return r.UNSIGNED_BYTE;if(t===Ja)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Ka)return r.UNSIGNED_SHORT_5_5_5_1;if(t===al)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===ol)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===rl)return r.BYTE;if(t===sl)return r.SHORT;if(t===Lr)return r.UNSIGNED_SHORT;if(t===Za)return r.INT;if(t===Yi)return r.UNSIGNED_INT;if(t===kn)return r.FLOAT;if(t===Di)return r.HALF_FLOAT;if(t===wh)return r.ALPHA;if(t===Eh)return r.RGB;if(t===Vn)return r.RGBA;if(t===ws)return r.DEPTH_COMPONENT;if(t===Es)return r.DEPTH_STENCIL;if(t===$a)return r.RED;if(t===Qa)return r.RED_INTEGER;if(t===Ah)return r.RG;if(t===ll)return r.RG_INTEGER;if(t===cl)return r.RGBA_INTEGER;if(t===eo||t===to||t===no||t===io)if(s===At){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===eo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===to)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===io)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===eo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===to)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===no)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===io)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===hl||t===ul||t===dl||t===pl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===hl)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===ul)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===dl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===pl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===ml||t===fl||t===gl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===ml||t===fl)return s===At?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===gl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===vl||t===_l||t===yl||t===xl||t===Ml||t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al||t===Cl||t===Rl||t===Pl){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===vl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===_l)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===yl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===xl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Ml)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Sl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Tl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===bl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===wl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===El)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Al)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Cl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Rl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Pl)return s===At?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Il||t===Ll||t===Dl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Il)return s===At?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ll)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Dl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Ul||t===Nl||t===Fl||t===Ol){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Ul)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Nl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Fl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Ol)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Dr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new hs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rc=class extends vi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,p=null,f=null,d=null,v=typeof XRWebGLBinding<"u",m=new ic,g={},_=t.getContextAttributes(),y=null,x=null,M=[],C=[],D=new de,V=null,L=new zt;L.viewport=new xt;let I=new zt;I.viewport=new xt;let N=[L,I],O=new Oa,q=null,k=null;function ee(ue){let Me=C.indexOf(ue.inputSource);if(Me===-1)return;let ve=M[Me];ve!==void 0&&(ve.update(ue.inputSource,ue.frame,l||a),ve.dispatchEvent({type:ue.type,data:ue.inputSource}))}function te(){i.removeEventListener("select",ee),i.removeEventListener("selectstart",ee),i.removeEventListener("selectend",ee),i.removeEventListener("squeeze",ee),i.removeEventListener("squeezestart",ee),i.removeEventListener("squeezeend",ee),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",ge);for(let ue=0;ue<M.length;ue++){let Me=C[ue];Me!==null&&(C[ue]=null,M[ue].disconnect(Me))}q=null,k=null,m.reset();for(let ue in g)delete g[ue];e.setRenderTarget(y),f=null,p=null,u=null,i=null,x=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(V),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}function ge(ue){for(let Me=0;Me<ue.removed.length;Me++){let ve=ue.removed[Me],J=C.indexOf(ve);J>=0&&(C[J]=null,M[J].disconnect(ve))}for(let Me=0;Me<ue.added.length;Me++){let ve=ue.added[Me],J=C.indexOf(ve);if(J===-1){for(let E=0;E<M.length;E++){if(E>=C.length){C.push(ve),J=E;break}if(C[E]===null){C[E]=ve,J=E;break}}if(J===-1)break}let Ee=M[J];Ee&&Ee.connect(ve)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ue){let Me=M[ue];return Me===void 0&&(Me=new xr,M[ue]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ue){let Me=M[ue];return Me===void 0&&(Me=new xr,M[ue]=Me),Me.getGripSpace()},this.getHand=function(ue){let Me=M[ue];return Me===void 0&&(Me=new xr,M[ue]=Me),Me.getHandSpace()},this.setFramebufferScaleFactor=function(ue){s=ue,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ue){o=ue,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ue){l=ue},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return d},this.getSession=function(){return i},this.setSession=async function(ue){if(i=ue,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",ee),i.addEventListener("selectstart",ee),i.addEventListener("selectend",ee),i.addEventListener("squeeze",ee),i.addEventListener("squeezestart",ee),i.addEventListener("squeezeend",ee),i.addEventListener("end",te),i.addEventListener("inputsourceschange",ge),_.xrCompatible!==!0&&await t.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(D),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,ve=null,J=null;_.depth&&(J=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=_.stencil?Es:ws,ve=_.stencil?Dr:Yi);let Ee={colorFormat:t.RGBA8,depthFormat:J,scaleFactor:s};u=this.getBinding(),p=u.createProjectionLayer(Ee),i.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new Bn(p.textureWidth,p.textureHeight,{format:Vn,type:si,depthTexture:new cs(p.textureWidth,p.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let Me={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Bn(f.framebufferWidth,f.framebufferHeight,{format:Vn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Pe.setContext(i),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let le=new b,_e=new b;function Q(ue,Me){Me===null?ue.matrixWorld.copy(ue.matrix):ue.matrixWorld.multiplyMatrices(Me.matrixWorld,ue.matrix),ue.matrixWorldInverse.copy(ue.matrixWorld).invert()}this.updateCamera=function(ue){if(i===null)return;let Me=ue.near,ve=ue.far;m.texture!==null&&(m.depthNear>0&&(Me=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),O.near=I.near=L.near=Me,O.far=I.far=L.far=ve,q===O.near&&k===O.far||(i.updateRenderState({depthNear:O.near,depthFar:O.far}),q=O.near,k=O.far),O.layers.mask=6|ue.layers.mask,L.layers.mask=3&O.layers.mask,I.layers.mask=5&O.layers.mask;let J=ue.parent,Ee=O.cameras;Q(O,J);for(let E=0;E<Ee.length;E++)Q(Ee[E],J);Ee.length===2?(function(E,w,W){le.setFromMatrixPosition(w.matrixWorld),_e.setFromMatrixPosition(W.matrixWorld);let z=le.distanceTo(_e),S=w.projectionMatrix.elements,P=W.projectionMatrix.elements,G=S[14]/(S[10]-1),B=S[14]/(S[10]+1),ae=(S[9]+1)/S[5],Z=(S[9]-1)/S[5],$=(S[8]-1)/S[0],Se=(P[8]+1)/P[0],Le=G*$,ye=G*Se,Ce=z/(-$+Se),Ge=Ce*-$;if(w.matrixWorld.decompose(E.position,E.quaternion,E.scale),E.translateX(Ge),E.translateZ(Ce),E.matrixWorld.compose(E.position,E.quaternion,E.scale),E.matrixWorldInverse.copy(E.matrixWorld).invert(),S[10]===-1)E.projectionMatrix.copy(w.projectionMatrix),E.projectionMatrixInverse.copy(w.projectionMatrixInverse);else{let me=G+Ce,Ue=B+Ce,Oe=Le-Ge,He=ye+(z-Ge),Te=ae*B/Ue*me,Ae=Z*B/Ue*me;E.projectionMatrix.makePerspective(Oe,He,Te,Ae,me,Ue),E.projectionMatrixInverse.copy(E.projectionMatrix).invert()}})(O,L,I):O.projectionMatrix.copy(L.projectionMatrix),(function(E,w,W){W===null?E.matrix.copy(w.matrixWorld):(E.matrix.copy(W.matrixWorld),E.matrix.invert(),E.matrix.multiply(w.matrixWorld)),E.matrix.decompose(E.position,E.quaternion,E.scale),E.updateMatrixWorld(!0),E.projectionMatrix.copy(w.projectionMatrix),E.projectionMatrixInverse.copy(w.projectionMatrixInverse),E.isPerspectiveCamera&&(E.fov=2*aa*Math.atan(1/E.projectionMatrix.elements[5]),E.zoom=1)})(ue,O,J)},this.getCamera=function(){return O},this.getFoveation=function(){if(p!==null||f!==null)return c},this.setFoveation=function(ue){c=ue,p!==null&&(p.fixedFoveation=ue),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ue)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(ue){return g[ue]};let he=null,Pe=new mu;Pe.setAnimationLoop(function(ue,Me){if(h=Me.getViewerPose(l||a),d=Me,h!==null){let ve=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let J=!1;ve.length!==O.cameras.length&&(O.cameras.length=0,J=!0);for(let E=0;E<ve.length;E++){let w=ve[E],W=null;if(f!==null)W=f.getViewport(w);else{let S=u.getViewSubImage(p,w);W=S.viewport,E===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let z=N[E];z===void 0&&(z=new zt,z.layers.enable(E),z.viewport=new xt,N[E]=z),z.matrix.fromArray(w.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(w.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(W.x,W.y,W.width,W.height),E===0&&(O.matrix.copy(z.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),J===!0&&O.cameras.push(z)}let Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let E=u.getDepthInformation(ve[0]);E&&E.isValid&&E.texture&&m.init(E,i.renderState)}if(Ee&&Ee.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let E=0;E<ve.length;E++){let w=ve[E].camera;if(w){let W=g[w];W||(W=new hs,g[w]=W);let z=u.getCameraImage(w);W.sourceTexture=z}}}}for(let ve=0;ve<M.length;ve++){let J=C[ve],Ee=M[ve];J!==null&&Ee!==void 0&&Ee.update(J,Me,l||a)}he&&he(ue,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),d=null}),this.setAnimationLoop=function(ue){he=ue},this.dispose=function(){}}},Qi=new Zn,Vp=new Ke;function Hp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Nn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Nn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Qi.copy(c),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),i.envMapRotation.value.setFromMatrix4(Vp.makeRotationFromEuler(Qi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,kl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Nn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,p){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*p,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Wp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,p,f,d){let v=u.value,m=p+"_"+f;if(d[m]===void 0)return d[m]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=d[m];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return d[m]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function l(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),p}function h(u){let p=u.target;p.removeEventListener("dispose",h);let f=a.indexOf(p.__bindingPointIndex);a.splice(f,1),r.deleteBuffer(i[p.id]),delete i[p.id],delete s[p.id]}return{bind:function(u,p){let f=p.program;n.uniformBlockBinding(u,f)},update:function(u,p){let f=i[u.id];f===void 0&&((function(m){let g=m.uniforms,_=0,y=16;for(let M=0,C=g.length;M<C;M++){let D=Array.isArray(g[M])?g[M]:[g[M]];for(let V=0,L=D.length;V<L;V++){let I=D[V],N=Array.isArray(I.value)?I.value:[I.value];for(let O=0,q=N.length;O<q;O++){let k=l(N[O]),ee=_%y,te=ee%k.boundary,ge=ee+te;_+=te,ge!==0&&y-ge<k.storage&&(_+=y-ge),I.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=k.storage}}}let x=_%y;x>0&&(_+=y-x),m.__size=_,m.__cache={}})(u),f=(function(m){let g=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;let _=r.createBuffer(),y=m.__size,x=m.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,y,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,_),_})(u),i[u.id]=f,u.addEventListener("dispose",h));let d=p.program;n.updateUBOMapping(u,d);let v=e.render.frame;s[u.id]!==v&&((function(m){let g=i[m.id],_=m.uniforms,y=m.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,M=_.length;x<M;x++){let C=Array.isArray(_[x])?_[x]:[_[x]];for(let D=0,V=C.length;D<V;D++){let L=C[D];if(c(L,x,D,y)===!0){let I=L.__offset,N=Array.isArray(L.value)?L.value:[L.value],O=0;for(let q=0;q<N.length;q++){let k=N[q],ee=l(k);typeof k=="number"||typeof k=="boolean"?(L.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,I+O,L.__data)):k.isMatrix3?(L.__data[0]=k.elements[0],L.__data[1]=k.elements[1],L.__data[2]=k.elements[2],L.__data[3]=0,L.__data[4]=k.elements[3],L.__data[5]=k.elements[4],L.__data[6]=k.elements[5],L.__data[7]=0,L.__data[8]=k.elements[6],L.__data[9]=k.elements[7],L.__data[10]=k.elements[8],L.__data[11]=0):(k.toArray(L.__data,O),O+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Hn=class{constructor(e={}){let{canvas:t=Oh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e,f;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let d=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=ht;let C=0,D=0,V=null,L=-1,I=null,N=new xt,O=new xt,q=null,k=new qe(0),ee=0,te=t.width,ge=t.height,le=1,_e=null,Q=null,he=new xt(0,0,te,ge),Pe=new xt(0,0,te,ge),ue=!1,Me=new Pi,ve=!1,J=!1,Ee=new Ke,E=new b,w=new xt,W={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},z=!1;function S(){return V===null?le:1}let P,G,B,ae,Z,$,Se,Le,ye,Ce,Ge,me,Ue,Oe,He,Te,Ae,ke,Rt,ze,pt,tt,nn,ln,H=n;function Ut(R,j){return t.getContext(R,j)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Wn,!1),t.addEventListener("webglcontextrestored",Tt,!1),t.addEventListener("webglcontextcreationerror",Ht,!1),H===null){let j="webgl2";if(H=Ut(j,R),H===null)throw Ut(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function ft(){P=new Ed(H),P.init(),tt=new kp(H,P),G=new Md(H,P,e,tt),B=new zp(H,P),G.reversedDepthBuffer&&p&&B.buffers.depth.setReversed(!0),ae=new Rd(H),Z=new Rp,$=new Gp(H,P,B,Z,G,tt,ae),Se=new Td(x),Le=new wd(x),ye=new gd(H),nn=new yd(H,ye),Ce=new Ad(H,ye,ae,nn),Ge=new Id(H,Ce,ye,ae),Rt=new Pd(H,G,$),Te=new Sd(Z),me=new Cp(x,Se,Le,P,G,nn,Te),Ue=new Hp(x,Z),Oe=new Ip,He=new Fp(P),ke=new _d(x,Se,Le,B,Ge,f,c),Ae=new Op(x,Ge,G),ln=new Wp(H,ae,G,B),ze=new xd(H,P,ae),pt=new Cd(H,P,ae),ae.programs=me.programs,x.capabilities=G,x.extensions=P,x.properties=Z,x.renderLists=Oe,x.shadowMap=Ae,x.state=B,x.info=ae}ft();let rt=new rc(x,H);function Wn(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=ae.autoReset,j=Ae.enabled,Y=Ae.autoUpdate,se=Ae.needsUpdate,ne=Ae.type;ft(),ae.autoReset=R,Ae.enabled=j,Ae.autoUpdate=Y,Ae.needsUpdate=se,Ae.type=ne}function Ht(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function at(R){let j=R.target;j.removeEventListener("dispose",at),(function(Y){(function(se){let ne=Z.get(se).programs;ne!==void 0&&(ne.forEach(function(xe){me.releaseProgram(xe)}),se.isShaderMaterial&&me.releaseShaderCache(se))})(Y),Z.remove(Y)})(j)}function Zt(R,j,Y){R.transparent===!0&&R.side===Dt&&R.forceSinglePass===!1?(R.side=Nn,R.needsUpdate=!0,Xt(R,j,Y),R.side=Rr,R.needsUpdate=!0,Xt(R,j,Y),R.side=Dt):Xt(R,j,Y)}this.xr=rt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(te,ge,!1))},this.getSize=function(R){return R.set(te,ge)},this.setSize=function(R,j,Y=!0){rt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(te=R,ge=j,t.width=Math.floor(R*le),t.height=Math.floor(j*le),Y===!0&&(t.style.width=R+"px",t.style.height=j+"px"),this.setViewport(0,0,R,j))},this.getDrawingBufferSize=function(R){return R.set(te*le,ge*le).floor()},this.setDrawingBufferSize=function(R,j,Y){te=R,ge=j,le=Y,t.width=Math.floor(R*Y),t.height=Math.floor(j*Y),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(N)},this.getViewport=function(R){return R.copy(he)},this.setViewport=function(R,j,Y,se){R.isVector4?he.set(R.x,R.y,R.z,R.w):he.set(R,j,Y,se),B.viewport(N.copy(he).multiplyScalar(le).round())},this.getScissor=function(R){return R.copy(Pe)},this.setScissor=function(R,j,Y,se){R.isVector4?Pe.set(R.x,R.y,R.z,R.w):Pe.set(R,j,Y,se),B.scissor(O.copy(Pe).multiplyScalar(le).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(R){B.setScissorTest(ue=R)},this.setOpaqueSort=function(R){_e=R},this.setTransparentSort=function(R){Q=R},this.getClearColor=function(R){return R.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(R=!0,j=!0,Y=!0){let se=0;if(R){let ne=!1;if(V!==null){let xe=V.texture.format;ne=xe===cl||xe===ll||xe===Qa}if(ne){let xe=V.texture.type,Fe=xe===si||xe===Yi||xe===Lr||xe===Dr||xe===Ja||xe===Ka,Be=ke.getClearColor(),We=ke.getClearAlpha(),Ze=Be.r,Qe=Be.g,$e=Be.b;Fe?(d[0]=Ze,d[1]=Qe,d[2]=$e,d[3]=We,H.clearBufferuiv(H.COLOR,0,d)):(v[0]=Ze,v[1]=Qe,v[2]=$e,v[3]=We,H.clearBufferiv(H.COLOR,0,v))}else se|=H.COLOR_BUFFER_BIT}j&&(se|=H.DEPTH_BUFFER_BIT),Y&&(se|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Wn,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",Ht,!1),ke.dispose(),Oe.dispose(),He.dispose(),Z.dispose(),Se.dispose(),Le.dispose(),Ge.dispose(),nn.dispose(),ln.dispose(),me.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Wt),rt.removeEventListener("sessionend",Kt),Ft.stop()},this.renderBufferDirect=function(R,j,Y,se,ne,xe){j===null&&(j=W);let Fe=ne.isMesh&&ne.matrixWorld.determinant()<0,Be=(function(Ve,It,$t,st,et){It.isScene!==!0&&(It=W),$.resetTextureUnits();let En=It.fog,tr=st.isMeshStandardMaterial?It.environment:null,T=V===null?x.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Gi,A=(st.isMeshStandardMaterial?Le:Se).get(st.envMap||tr),U=st.vertexColors===!0&&!!$t.attributes.color&&$t.attributes.color.itemSize===4,K=!!$t.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),F=!!$t.morphAttributes.position,re=!!$t.morphAttributes.normal,X=!!$t.morphAttributes.color,ie=Mi;st.toneMapped&&(V!==null&&V.isXRRenderTarget!==!0||(ie=x.toneMapping));let pe=$t.morphAttributes.position||$t.morphAttributes.normal||$t.morphAttributes.color,Xe=pe!==void 0?pe.length:0,fe=Z.get(st),oe=g.state.lights;if(ve===!0&&(J===!0||Ve!==I)){let jt=Ve===I&&st.id===L;Te.setState(st,Ve,jt)}let ce=!1;st.version===fe.__version?fe.needsLights&&fe.lightsStateVersion!==oe.state.version||fe.outputColorSpace!==T||et.isBatchedMesh&&fe.batching===!1?ce=!0:et.isBatchedMesh||fe.batching!==!0?et.isBatchedMesh&&fe.batchingColor===!0&&et.colorTexture===null||et.isBatchedMesh&&fe.batchingColor===!1&&et.colorTexture!==null||et.isInstancedMesh&&fe.instancing===!1?ce=!0:et.isInstancedMesh||fe.instancing!==!0?et.isSkinnedMesh&&fe.skinning===!1?ce=!0:et.isSkinnedMesh||fe.skinning!==!0?et.isInstancedMesh&&fe.instancingColor===!0&&et.instanceColor===null||et.isInstancedMesh&&fe.instancingColor===!1&&et.instanceColor!==null||et.isInstancedMesh&&fe.instancingMorph===!0&&et.morphTexture===null||et.isInstancedMesh&&fe.instancingMorph===!1&&et.morphTexture!==null||fe.envMap!==A||st.fog===!0&&fe.fog!==En?ce=!0:fe.numClippingPlanes===void 0||fe.numClippingPlanes===Te.numPlanes&&fe.numIntersection===Te.numIntersection?(fe.vertexAlphas!==U||fe.vertexTangents!==K||fe.morphTargets!==F||fe.morphNormals!==re||fe.morphColors!==X||fe.toneMapping!==ie||fe.morphTargetsCount!==Xe)&&(ce=!0):ce=!0:ce=!0:ce=!0:ce=!0:(ce=!0,fe.__version=st.version);let be=fe.currentProgram;ce===!0&&(be=Xt(st,It,et));let Je=!1,we=!1,Re=!1,Ne=be.getUniforms(),vt=fe.uniforms;if(B.useProgram(be.program)&&(Je=!0,we=!0,Re=!0),st.id!==L&&(L=st.id,we=!0),Je||I!==Ve){B.buffers.depth.getReversed()&&Ve.reversedDepth!==!0&&(Ve._reversedDepth=!0,Ve.updateProjectionMatrix()),Ne.setValue(H,"projectionMatrix",Ve.projectionMatrix),Ne.setValue(H,"viewMatrix",Ve.matrixWorldInverse);let jt=Ne.map.cameraPosition;jt!==void 0&&jt.setValue(H,E.setFromMatrixPosition(Ve.matrixWorld)),G.logarithmicDepthBuffer&&Ne.setValue(H,"logDepthBufFC",2/(Math.log(Ve.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Ne.setValue(H,"isOrthographic",Ve.isOrthographicCamera===!0),I!==Ve&&(I=Ve,we=!0,Re=!0)}if(et.isSkinnedMesh){Ne.setOptional(H,et,"bindMatrix"),Ne.setOptional(H,et,"bindMatrixInverse");let jt=et.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),Ne.setValue(H,"boneTexture",jt.boneTexture,$))}et.isBatchedMesh&&(Ne.setOptional(H,et,"batchingTexture"),Ne.setValue(H,"batchingTexture",et._matricesTexture,$),Ne.setOptional(H,et,"batchingIdTexture"),Ne.setValue(H,"batchingIdTexture",et._indirectTexture,$),Ne.setOptional(H,et,"batchingColorTexture"),et._colorsTexture!==null&&Ne.setValue(H,"batchingColorTexture",et._colorsTexture,$));let kt=$t.morphAttributes;kt.position===void 0&&kt.normal===void 0&&kt.color===void 0||Rt.update(et,$t,be),(we||fe.receiveShadow!==et.receiveShadow)&&(fe.receiveShadow=et.receiveShadow,Ne.setValue(H,"receiveShadow",et.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(vt.envMap.value=A,vt.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&It.environment!==null&&(vt.envMapIntensity.value=It.environmentIntensity),we&&(Ne.setValue(H,"toneMappingExposure",x.toneMappingExposure),fe.needsLights&&(rn=Re,(Vt=vt).ambientLightColor.needsUpdate=rn,Vt.lightProbe.needsUpdate=rn,Vt.directionalLights.needsUpdate=rn,Vt.directionalLightShadows.needsUpdate=rn,Vt.pointLights.needsUpdate=rn,Vt.pointLightShadows.needsUpdate=rn,Vt.spotLights.needsUpdate=rn,Vt.spotLightShadows.needsUpdate=rn,Vt.rectAreaLights.needsUpdate=rn,Vt.hemisphereLights.needsUpdate=rn),En&&st.fog===!0&&Ue.refreshFogUniforms(vt,En),Ue.refreshMaterialUniforms(vt,st,le,ge,g.state.transmissionRenderTarget[Ve.id]),Nr.upload(H,Ui(fe),vt,$));var Vt,rn;if(st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(Nr.upload(H,Ui(fe),vt,$),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Ne.setValue(H,"center",et.center),Ne.setValue(H,"modelViewMatrix",et.modelViewMatrix),Ne.setValue(H,"normalMatrix",et.normalMatrix),Ne.setValue(H,"modelMatrix",et.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){let jt=st.uniformsGroups;for(let Br=0,hc=jt.length;Br<hc;Br++){let Rs=jt[Br];ln.update(Rs,be),ln.bind(Rs,be)}}return be})(R,j,Y,se,ne);B.setMaterial(se,Fe);let We=Y.index,Ze=1;if(se.wireframe===!0){if(We=Ce.getWireframeAttribute(Y),We===void 0)return;Ze=2}let Qe=Y.drawRange,$e=Y.attributes.position,nt=Qe.start*Ze,wt=(Qe.start+Qe.count)*Ze;xe!==null&&(nt=Math.max(nt,xe.start*Ze),wt=Math.min(wt,(xe.start+xe.count)*Ze)),We!==null?(nt=Math.max(nt,0),wt=Math.min(wt,We.count)):$e!=null&&(nt=Math.max(nt,0),wt=Math.min(wt,$e.count));let mt=wt-nt;if(mt<0||mt===1/0)return;let Ot;nn.setup(ne,se,Be,Y,We);let Et=ze;if(We!==null&&(Ot=ye.get(We),Et=pt,Et.setIndex(Ot)),ne.isMesh)se.wireframe===!0?(B.setLineWidth(se.wireframeLinewidth*S()),Et.setMode(H.LINES)):Et.setMode(H.TRIANGLES);else if(ne.isLine){let Ve=se.linewidth;Ve===void 0&&(Ve=1),B.setLineWidth(Ve*S()),ne.isLineSegments?Et.setMode(H.LINES):ne.isLineLoop?Et.setMode(H.LINE_LOOP):Et.setMode(H.LINE_STRIP)}else ne.isPoints?Et.setMode(H.POINTS):ne.isSprite&&Et.setMode(H.TRIANGLES);if(ne.isBatchedMesh)if(ne._multiDrawInstances!==null)vr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Et.renderMultiDrawInstances(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount,ne._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))Et.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let Ve=ne._multiDrawStarts,It=ne._multiDrawCounts,$t=ne._multiDrawCount,st=We?ye.get(We).bytesPerElement:1,et=Z.get(se).currentProgram.getUniforms();for(let En=0;En<$t;En++)et.setValue(H,"_gl_DrawID",En),Et.render(Ve[En]/st,It[En])}else if(ne.isInstancedMesh)Et.renderInstances(nt,mt,ne.count);else if(Y.isInstancedBufferGeometry){let Ve=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,It=Math.min(Y.instanceCount,Ve);Et.renderInstances(nt,mt,It)}else Et.render(nt,mt)},this.compile=function(R,j,Y=null){Y===null&&(Y=R),g=He.get(Y),g.init(j),y.push(g),Y.traverseVisible(function(ne){ne.isLight&&ne.layers.test(j.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),R!==Y&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(j.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),g.setupLights();let se=new Set;return R.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let xe=ne.material;if(xe)if(Array.isArray(xe))for(let Fe=0;Fe<xe.length;Fe++){let Be=xe[Fe];Zt(Be,Y,ne),se.add(Be)}else Zt(xe,Y,ne),se.add(xe)}),g=y.pop(),se},this.compileAsync=function(R,j,Y=null){let se=this.compile(R,j,Y);return new Promise(ne=>{function xe(){se.forEach(function(Fe){Z.get(Fe).currentProgram.isReady()&&se.delete(Fe)}),se.size!==0?setTimeout(xe,10):ne(R)}P.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Nt=null;function Wt(){Ft.stop()}function Kt(){Ft.start()}let Ft=new mu;function mn(R,j,Y,se){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Me.intersectsSprite(R)){se&&w.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ee);let xe=Ge.update(R),Fe=R.material;Fe.visible&&m.push(R,xe,Fe,Y,w.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Me.intersectsObject(R))){let xe=Ge.update(R),Fe=R.material;if(se&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),w.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),w.copy(xe.boundingSphere.center)),w.applyMatrix4(R.matrixWorld).applyMatrix4(Ee)),Array.isArray(Fe)){let Be=xe.groups;for(let We=0,Ze=Be.length;We<Ze;We++){let Qe=Be[We],$e=Fe[Qe.materialIndex];$e&&$e.visible&&m.push(R,xe,$e,Y,w.z,Qe)}}else Fe.visible&&m.push(R,xe,Fe,Y,w.z,null)}}let ne=R.children;for(let xe=0,Fe=ne.length;xe<Fe;xe++)mn(ne[xe],j,Y,se)}function xn(R,j,Y,se){let ne=R.opaque,xe=R.transmissive,Fe=R.transparent;g.setupLightsView(Y),ve===!0&&Te.setGlobalState(x.clippingPlanes,Y),se&&B.viewport(N.copy(se)),ne.length>0&&li(ne,j,Y),xe.length>0&&li(xe,j,Y),Fe.length>0&&li(Fe,j,Y),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function fn(R,j,Y,se){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[se.id]===void 0&&(g.state.transmissionRenderTarget[se.id]=new Bn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Di:si,minFilter:qi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace}));let ne=g.state.transmissionRenderTarget[se.id],xe=se.viewport||N;ne.setSize(xe.z*x.transmissionResolutionScale,xe.w*x.transmissionResolutionScale);let Fe=x.getRenderTarget(),Be=x.getActiveCubeFace(),We=x.getActiveMipmapLevel();x.setRenderTarget(ne),x.getClearColor(k),ee=x.getClearAlpha(),ee<1&&x.setClearColor(16777215,.5),x.clear(),z&&ke.render(Y);let Ze=x.toneMapping;x.toneMapping=Mi;let Qe=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),g.setupLightsView(se),ve===!0&&Te.setGlobalState(x.clippingPlanes,se),li(R,Y,se),$.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne),P.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let nt=0,wt=j.length;nt<wt;nt++){let mt=j[nt],Ot=mt.object,Et=mt.geometry,Ve=mt.material,It=mt.group;if(Ve.side===Dt&&Ot.layers.test(se.layers)){let $t=Ve.side;Ve.side=Nn,Ve.needsUpdate=!0,gn(Ot,Y,se,Et,Ve,It),Ve.side=$t,Ve.needsUpdate=!0,$e=!0}}$e===!0&&($.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne))}x.setRenderTarget(Fe,Be,We),x.setClearColor(k,ee),Qe!==void 0&&(se.viewport=Qe),x.toneMapping=Ze}function li(R,j,Y){let se=j.isScene===!0?j.overrideMaterial:null;for(let ne=0,xe=R.length;ne<xe;ne++){let Fe=R[ne],Be=Fe.object,We=Fe.geometry,Ze=Fe.group,Qe=Fe.material;Qe.allowOverride===!0&&se!==null&&(Qe=se),Be.layers.test(Y.layers)&&gn(Be,j,Y,We,Qe,Ze)}}function gn(R,j,Y,se,ne,xe){R.onBeforeRender(x,j,Y,se,ne,xe),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(x,j,Y,se,R,xe),ne.transparent===!0&&ne.side===Dt&&ne.forceSinglePass===!1?(ne.side=Nn,ne.needsUpdate=!0,x.renderBufferDirect(Y,j,se,ne,R,xe),ne.side=Rr,ne.needsUpdate=!0,x.renderBufferDirect(Y,j,se,ne,R,xe),ne.side=Dt):x.renderBufferDirect(Y,j,se,ne,R,xe),R.onAfterRender(x,j,Y,se,ne,xe)}function Xt(R,j,Y){j.isScene!==!0&&(j=W);let se=Z.get(R),ne=g.state.lights,xe=g.state.shadowsArray,Fe=ne.state.version,Be=me.getParameters(R,ne.state,xe,j,Y),We=me.getProgramCacheKey(Be),Ze=se.programs;se.environment=R.isMeshStandardMaterial?j.environment:null,se.fog=j.fog,se.envMap=(R.isMeshStandardMaterial?Le:Se).get(R.envMap||se.environment),se.envMapRotation=se.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,Ze===void 0&&(R.addEventListener("dispose",at),Ze=new Map,se.programs=Ze);let Qe=Ze.get(We);if(Qe!==void 0){if(se.currentProgram===Qe&&se.lightsStateVersion===Fe)return cn(R,Be),Qe}else Be.uniforms=me.getUniforms(R),R.onBeforeCompile(Be,x),Qe=me.acquireProgram(Be,We),Ze.set(We,Qe),se.uniforms=Be.uniforms;let $e=se.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||($e.clippingPlanes=Te.uniform),cn(R,Be),se.needsLights=(function(nt){return nt.isMeshLambertMaterial||nt.isMeshToonMaterial||nt.isMeshPhongMaterial||nt.isMeshStandardMaterial||nt.isShadowMaterial||nt.isShaderMaterial&&nt.lights===!0})(R),se.lightsStateVersion=Fe,se.needsLights&&($e.ambientLightColor.value=ne.state.ambient,$e.lightProbe.value=ne.state.probe,$e.directionalLights.value=ne.state.directional,$e.directionalLightShadows.value=ne.state.directionalShadow,$e.spotLights.value=ne.state.spot,$e.spotLightShadows.value=ne.state.spotShadow,$e.rectAreaLights.value=ne.state.rectArea,$e.ltc_1.value=ne.state.rectAreaLTC1,$e.ltc_2.value=ne.state.rectAreaLTC2,$e.pointLights.value=ne.state.point,$e.pointLightShadows.value=ne.state.pointShadow,$e.hemisphereLights.value=ne.state.hemi,$e.directionalShadowMap.value=ne.state.directionalShadowMap,$e.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,$e.spotShadowMap.value=ne.state.spotShadowMap,$e.spotLightMatrix.value=ne.state.spotLightMatrix,$e.spotLightMap.value=ne.state.spotLightMap,$e.pointShadowMap.value=ne.state.pointShadowMap,$e.pointShadowMatrix.value=ne.state.pointShadowMatrix),se.currentProgram=Qe,se.uniformsList=null,Qe}function Ui(R){if(R.uniformsList===null){let j=R.currentProgram.getUniforms();R.uniformsList=Nr.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function cn(R,j){let Y=Z.get(R);Y.outputColorSpace=j.outputColorSpace,Y.batching=j.batching,Y.batchingColor=j.batchingColor,Y.instancing=j.instancing,Y.instancingColor=j.instancingColor,Y.instancingMorph=j.instancingMorph,Y.skinning=j.skinning,Y.morphTargets=j.morphTargets,Y.morphNormals=j.morphNormals,Y.morphColors=j.morphColors,Y.morphTargetsCount=j.morphTargetsCount,Y.numClippingPlanes=j.numClippingPlanes,Y.numIntersection=j.numClipIntersection,Y.vertexAlphas=j.vertexAlphas,Y.vertexTangents=j.vertexTangents,Y.toneMapping=j.toneMapping}Ft.setAnimationLoop(function(R){Nt&&Nt(R)}),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(R){Nt=R,rt.setAnimationLoop(R),R===null?Ft.stop():Ft.start()},rt.addEventListener("sessionstart",Wt),rt.addEventListener("sessionend",Kt),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(j),j=rt.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,j,V),g=He.get(R,y.length),g.init(j),y.push(g),Ee.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Me.setFromProjectionMatrix(Ee,gi,j.reversedDepth),J=this.localClippingEnabled,ve=Te.init(this.clippingPlanes,J),m=Oe.get(R,_.length),m.init(),_.push(m),rt.enabled===!0&&rt.isPresenting===!0){let xe=x.xr.getDepthSensingMesh();xe!==null&&mn(xe,j,-1/0,x.sortObjects)}mn(R,j,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(_e,Q),z=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,z&&ke.addToRenderList(m,R),this.info.render.frame++,ve===!0&&Te.beginShadows();let Y=g.state.shadowsArray;Ae.render(Y,R,j),ve===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();let se=m.opaque,ne=m.transmissive;if(g.setupLights(),j.isArrayCamera){let xe=j.cameras;if(ne.length>0)for(let Fe=0,Be=xe.length;Fe<Be;Fe++)fn(se,ne,R,xe[Fe]);z&&ke.render(R);for(let Fe=0,Be=xe.length;Fe<Be;Fe++){let We=xe[Fe];xn(m,R,We,We.viewport)}}else ne.length>0&&fn(se,ne,R,j),z&&ke.render(R),xn(m,R,j);V!==null&&D===0&&($.updateMultisampleRenderTarget(V),$.updateRenderTargetMipmap(V)),R.isScene===!0&&R.onAfterRender(x,R,j),nn.resetDefaultState(),L=-1,I=null,y.pop(),y.length>0?(g=y[y.length-1],ve===!0&&Te.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(R,j,Y){let se=Z.get(R);se.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),Z.get(R.texture).__webglTexture=j,Z.get(R.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:Y,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,j){let Y=Z.get(R);Y.__webglFramebuffer=j,Y.__useDefaultFramebuffer=j===void 0};let Pt=H.createFramebuffer();this.setRenderTarget=function(R,j=0,Y=0){V=R,C=j,D=Y;let se=!0,ne=null,xe=!1,Fe=!1;if(R){let Be=Z.get(R);if(Be.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(H.FRAMEBUFFER,null),se=!1;else if(Be.__webglFramebuffer===void 0)$.setupRenderTarget(R);else if(Be.__hasExternalTextures)$.rebindTextures(R,Z.get(R.texture).__webglTexture,Z.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Qe=R.depthTexture;if(Be.__boundDepthTexture!==Qe){if(Qe!==null&&Z.has(Qe)&&(R.width!==Qe.image.width||R.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(R)}}let We=R.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Fe=!0);let Ze=Z.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ne=Array.isArray(Ze[j])?Ze[j][Y]:Ze[j],xe=!0):ne=R.samples>0&&$.useMultisampledRTT(R)===!1?Z.get(R).__webglMultisampledFramebuffer:Array.isArray(Ze)?Ze[Y]:Ze,N.copy(R.viewport),O.copy(R.scissor),q=R.scissorTest}else N.copy(he).multiplyScalar(le).floor(),O.copy(Pe).multiplyScalar(le).floor(),q=ue;if(Y!==0&&(ne=Pt),B.bindFramebuffer(H.FRAMEBUFFER,ne)&&se&&B.drawBuffers(R,ne),B.viewport(N),B.scissor(O),B.setScissorTest(q),xe){let Be=Z.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+j,Be.__webglTexture,Y)}else if(Fe){let Be=j;for(let We=0;We<R.textures.length;We++){let Ze=Z.get(R.textures[We]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+We,Ze.__webglTexture,Y,Be)}}else if(R!==null&&Y!==0){let Be=Z.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Be.__webglTexture,Y)}L=-1},this.readRenderTargetPixels=function(R,j,Y,se,ne,xe,Fe,Be=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=Z.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Fe!==void 0&&(We=We[Fe]),We){B.bindFramebuffer(H.FRAMEBUFFER,We);try{let Ze=R.textures[Be],Qe=Ze.format,$e=Ze.type;if(!G.textureFormatReadable(Qe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable($e))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");j>=0&&j<=R.width-se&&Y>=0&&Y<=R.height-ne&&(R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Be),H.readPixels(j,Y,se,ne,tt.convert(Qe),tt.convert($e),xe))}finally{let Ze=V!==null?Z.get(V).__webglFramebuffer:null;B.bindFramebuffer(H.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(R,j,Y,se,ne,xe,Fe,Be=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=Z.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Fe!==void 0&&(We=We[Fe]),We){if(j>=0&&j<=R.width-se&&Y>=0&&Y<=R.height-ne){B.bindFramebuffer(H.FRAMEBUFFER,We);let Ze=R.textures[Be],Qe=Ze.format,$e=Ze.type;if(!G.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,nt),H.bufferData(H.PIXEL_PACK_BUFFER,xe.byteLength,H.STREAM_READ),R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Be),H.readPixels(j,Y,se,ne,tt.convert(Qe),tt.convert($e),0);let wt=V!==null?Z.get(V).__webglFramebuffer:null;B.bindFramebuffer(H.FRAMEBUFFER,wt);let mt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Bh(H,mt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,nt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,xe),H.deleteBuffer(nt),H.deleteSync(mt),xe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,j=null,Y=0){let se=Math.pow(2,-Y),ne=Math.floor(R.image.width*se),xe=Math.floor(R.image.height*se),Fe=j!==null?j.x:0,Be=j!==null?j.y:0;$.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,Y,0,0,Fe,Be,ne,xe),B.unbindTexture()};let Bt=H.createFramebuffer(),gt=H.createFramebuffer();this.copyTextureToTexture=function(R,j,Y=null,se=null,ne=0,xe=null){let Fe,Be,We,Ze,Qe,$e,nt,wt,mt;xe===null&&(ne!==0?(vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=ne,ne=0):xe=0);let Ot=R.isCompressedTexture?R.mipmaps[xe]:R.image;if(Y!==null)Fe=Y.max.x-Y.min.x,Be=Y.max.y-Y.min.y,We=Y.isBox3?Y.max.z-Y.min.z:1,Ze=Y.min.x,Qe=Y.min.y,$e=Y.isBox3?Y.min.z:0;else{let U=Math.pow(2,-ne);Fe=Math.floor(Ot.width*U),Be=Math.floor(Ot.height*U),We=R.isDataArrayTexture?Ot.depth:R.isData3DTexture?Math.floor(Ot.depth*U):1,Ze=0,Qe=0,$e=0}se!==null?(nt=se.x,wt=se.y,mt=se.z):(nt=0,wt=0,mt=0);let Et=tt.convert(j.format),Ve=tt.convert(j.type),It;j.isData3DTexture?($.setTexture3D(j,0),It=H.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?($.setTexture2DArray(j,0),It=H.TEXTURE_2D_ARRAY):($.setTexture2D(j,0),It=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment);let $t=H.getParameter(H.UNPACK_ROW_LENGTH),st=H.getParameter(H.UNPACK_IMAGE_HEIGHT),et=H.getParameter(H.UNPACK_SKIP_PIXELS),En=H.getParameter(H.UNPACK_SKIP_ROWS),tr=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ot.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ot.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ze),H.pixelStorei(H.UNPACK_SKIP_ROWS,Qe),H.pixelStorei(H.UNPACK_SKIP_IMAGES,$e);let T=R.isDataArrayTexture||R.isData3DTexture,A=j.isDataArrayTexture||j.isData3DTexture;if(R.isDepthTexture){let U=Z.get(R),K=Z.get(j),F=Z.get(U.__renderTarget),re=Z.get(K.__renderTarget);B.bindFramebuffer(H.READ_FRAMEBUFFER,F.__webglFramebuffer),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let X=0;X<We;X++)T&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Z.get(R).__webglTexture,ne,$e+X),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Z.get(j).__webglTexture,xe,mt+X)),H.blitFramebuffer(Ze,Qe,Fe,Be,nt,wt,Fe,Be,H.DEPTH_BUFFER_BIT,H.NEAREST);B.bindFramebuffer(H.READ_FRAMEBUFFER,null),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(ne!==0||R.isRenderTargetTexture||Z.has(R)){let U=Z.get(R),K=Z.get(j);B.bindFramebuffer(H.READ_FRAMEBUFFER,Bt),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,gt);for(let F=0;F<We;F++)T?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,U.__webglTexture,ne,$e+F):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,U.__webglTexture,ne),A?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,K.__webglTexture,xe,mt+F):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,K.__webglTexture,xe),ne!==0?H.blitFramebuffer(Ze,Qe,Fe,Be,nt,wt,Fe,Be,H.COLOR_BUFFER_BIT,H.NEAREST):A?H.copyTexSubImage3D(It,xe,nt,wt,mt+F,Ze,Qe,Fe,Be):H.copyTexSubImage2D(It,xe,nt,wt,Ze,Qe,Fe,Be);B.bindFramebuffer(H.READ_FRAMEBUFFER,null),B.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else A?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(It,xe,nt,wt,mt,Fe,Be,We,Et,Ve,Ot.data):j.isCompressedArrayTexture?H.compressedTexSubImage3D(It,xe,nt,wt,mt,Fe,Be,We,Et,Ot.data):H.texSubImage3D(It,xe,nt,wt,mt,Fe,Be,We,Et,Ve,Ot):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,xe,nt,wt,Fe,Be,Et,Ve,Ot.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,xe,nt,wt,Ot.width,Ot.height,Et,Ot.data):H.texSubImage2D(H.TEXTURE_2D,xe,nt,wt,Fe,Be,Et,Ve,Ot);H.pixelStorei(H.UNPACK_ROW_LENGTH,$t),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,st),H.pixelStorei(H.UNPACK_SKIP_PIXELS,et),H.pixelStorei(H.UNPACK_SKIP_ROWS,En),H.pixelStorei(H.UNPACK_SKIP_IMAGES,tr),xe===0&&j.generateMipmaps&&H.generateMipmap(It),B.unbindTexture()},this.initRenderTarget=function(R){Z.get(R).__webglFramebuffer===void 0&&$.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?$.setTextureCube(R,0):R.isData3DTexture?$.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?$.setTexture2DArray(R,0):$.setTexture2D(R,0),B.unbindTexture()},this.resetState=function(){C=0,D=0,V=null,B.reset(),nn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};function yu(r,e,t){let n=[],i=[],s=new Ct({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),a=new Ct({color:new qe(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),o=new Ct({color:"#e8e5db",roughness:.88}),c=new Ct({color:"#1b1f22",roughness:.8}),l=new Ct({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(s,a,o,c,l);function h(d,v,m){let g=d.getAttribute("position"),_=[],y=[];for(let x=0;x<g.count;x++)_.push(.5+g.getX(x)/2.55,.5-g.getY(x)/3.825),y.push(m);return d.setAttribute("bodyUv",new Ie(_,2)),d.setAttribute("surface",new Ie(y,1)),n.push(d),r.mesh(d,v)}function u(d,v,m,g=.003){let _=new Mt(d.map(y=>new b(...y)));return h(new St(_,24,g,6,!1),v,m)}function p(d,v,m){let g=new ut,_=d.flat();g.setAttribute("position",new Ie(_,3));let y=[];for(let x=1;x<d.length-1;x++)y.push(0,x,x+1);return g.setIndex(y),g.computeVertexNormals(),v.side=Dt,h(g,v,m)}if(["classic","ruby","midnight"].includes(e.suit)){for(let d of[-1,1]){let v=[[d*.12,1.15,.205],[d*.28,.99,.272],[d*.2,.82,.29],[d*.27,.72,.285],[d*.075,.35,.265],[d*.1,.83,.285]];p(v,s,1),u(v.slice(0,5),a,1,.004),p([[d*.24,.22,.267],[d*.39,.24,.248],[d*.39,.17,.253],[d*.24,.15,.271]],s,1),u([[d*.24,.15,.272],[d*.39,.17,.254]],a,1),u([[d*.2,1.05,-.207],[d*.35,.82,-.254],[d*.38,.38,-.244],[d*.3,.14,-.201]],a,1,.0025)}u([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],a,1,.003);for(let d of[.37,.17]){let v=new Ye(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,d,.275),h(v,c,1)}}for(let d of[-1,1]){let v=d*.45;p([[v-.065,-1.34,.185],[v+.065,-1.34,.185],[v+.075,-1.6,.34],[v-.075,-1.6,.34]],l,5);for(let m=0;m<6;m++){let g=-1.39-m*.035,_=.225+m*.023;u([[v-.067,g,_],[v,g-.015,_+.013],[v+.067,g-.022,_]],o,5,.005),u([[v+.067,g,_+.001],[v,g-.015,_+.014],[v-.067,g-.022,_+.001]],o,5,.005)}u([[v-.135,-1.78,.1],[v-.145,-1.78,.3],[v,-1.78,.445],[v+.145,-1.78,.3],[v+.135,-1.78,.1]],c,5,.007),u([[v-.1,-1.42,-.075],[v,-1.4,-.09],[v+.1,-1.42,-.075]],l,5,.008)}return{dispose(){n.forEach(d=>d.dispose()),i.forEach(d=>d.dispose())}}}var oi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function xu(r){let e=[],t={};function n(v,m,g,_,y=0){let x=new Mr;x.name=v;let M=m?m.userData.rest:[0,0,0];return x.position.set(g-M[0],_-M[1],y-M[2]),x.userData.rest=[g,_,y],(m||r).add(x),e.push(x),t[v]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[v,m]of[["left",-1],["right",1]]){let g=n(v+"Shoulder",a,m*.49,1.09),_=n(v+"Elbow",g,m*.66,.57),y=n(v+"Wrist",_,m*.78,.04,.035),x=n(v+"Hand",y,m*.79,-.15,.07);for(let D=0;D<4;D++)n(v+"Finger"+D,x,m*(.5-(.175+D*.019))*2.55,-.17-D*.007,.07);n(v+"Thumb",x,m*.63,-.13,.11);let M=n(v+"Hip",i,m*.23,-.2,-.01),C=n(v+"Knee",M,m*.34,-.77,-.01);n(v+"Ankle",C,m*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new as(e);function h(v,m,g){let _=m<.5?"left":"right",y=i,x=i,M=0;if(v===1)y=s,x=a,M=1-oi(.25,.44,g);else if(v===2||v===9)g<.25?(y=a,x=t[_+"Shoulder"],M=oi(.175,.245,g)):g<.4?(y=t[_+"Shoulder"],x=t[_+"Elbow"],M=oi(.29,.38,g)):(y=t[_+"Elbow"],x=t[_+"Wrist"],M=oi(.43,.49,g));else if(v===3){let C=m<.5?m:1-m;g>.54?(y=t[_+"Hand"],x=t[_+(C>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((C-.175)/.019))))],M=oi(.54,.566,g)):(y=t[_+"Wrist"],x=t[_+"Hand"],M=oi(.49,.53,g))}else v===4?g<.57?(y=i,x=t[_+"Hip"],M=oi(.5,.57,g)):g<.76?(y=t[_+"Hip"],x=t[_+"Knee"],M=oi(.66,.74,g)):(y=t[_+"Knee"],x=t[_+"Ankle"],M=oi(.79,.84,g)):v===5||v===8?y=x=t[_+"Ankle"]:v===6?y=x=c:v===7&&(y=a,x=o,M=1-oi(.17,.225,g));return{indices:[e.indexOf(y),e.indexOf(x),0,0],weights:[1-M,M,0,0]}}function u(v,m){let g=v.getAttribute("bodyUv"),_=v.getAttribute("surface"),y=[],x=[];for(let C=0;C<g.count;C++){let D=h(_.getX(C),g.getX(C),g.getY(C));y.push(...D.indices),x.push(...D.weights)}v.setAttribute("skinIndex",new Vi(y,4)),v.setAttribute("skinWeight",new Ie(x,4));let M=new rs(v,m);return r.add(M),M.bind(l,new Ke),M.frustumCulled=!1,M}let p=0;function f(v,m,g){p+=(Number(m)-p)*(1-Math.exp(-Math.min(.1,g)*9));let _=Math.sin(v*1.55)*p;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(v*.57)*.01*p,Math.sin(v*.36)*.024*p,Math.sin(v*.41)*.008*p);for(let[y,x]of[["left",-1],["right",1]]){t[y+"Shoulder"].rotation.z=(Math.sin(v*.79+x*.5)*.009+x*.005)*p,t[y+"Elbow"].rotation.x=(Math.sin(v*.67+x*.4)*.012-.025)*p,t[y+"Hand"].rotation.x=Math.sin(v*.61+x)*.01*p;for(let M=0;M<4;M++)t[y+"Finger"+M].rotation.x=(.035+Math.sin(v*.53+M*.25+x)*.012)*p}r.updateMatrixWorld(!0),l.update()}function d(v,m){r.updateMatrixWorld(!0),t[m].attach(v)}return{skeleton:l,bones:t,mesh:u,update:f,attach:d,weights:h,dispose(){l.dispose()}}}function Mu(r,e="#c5b899"){let t=new je;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Ct({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Ct({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,M,C,D,V)=>{let L=new ot(x,M);return L.position.set(C,D,V),t.add(L),L},o=a(new yt(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let M=x*Math.PI/9,C=a(new dt(.026,.049,.016),i,Math.cos(M)*.083,0,Math.sin(M)*.105);C.rotation.y=-M}let c=a(new Ye(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new yt(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),p=/green|Submariner|DayDate/i.test(r),f=/Daytona|square|rose/i.test(r),d=u.createRadialGradient(190,170,20,256,256,256);d.addColorStop(0,p?"#237050":f?"#fff7db":"#294559"),d.addColorStop(1,p?"#072b20":f?"#c7c4b4":"#06121c"),u.fillStyle=d,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=f?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let v=(x,M,C)=>{u.save(),u.rotate(x),u.strokeStyle=f?"#203337":"#f4e4bb",u.lineWidth=C,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-M),u.stroke(),u.restore()};v(-Math.PI/3,112,13),v(Math.PI/3,168,9),v(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=f?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let m=new bt(h);m.colorSpace=ht,m.anisotropy=4;let g=a(new Gn(.066,64),new Ct({map:m,roughness:.34,metalness:.1}),0,0,.139),_=a(new Gn(.066,64),new yn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),y=a(new Ye(.012,.012,.019,16),i,.085,0,.12);return y.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(M=>{M.geometry?.dispose(),M.material&&x.add(M.material)});for(let M of x)M.dispose();m.dispose()}}}function Su(r="#d3b15b"){let e=new je;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new Ct({color:"#c5a14d",metalness:.9,roughness:.24}),n=new Ct({color:r,metalness:.25,roughness:.13}),i=new ot(new yt(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new ot(new dt(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new ot(new wr(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function Tu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let me=n.loadHelmet(!0,e.visor,!0,e.helmet);me.naturalWidth||await new Promise((Ue,Oe)=>{me.addEventListener("load",Ue,{once:!0}),me.addEventListener("error",Oe,{once:!0})})}let s=n.renderCharacter(i,{...e,watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let p=document.createElement("canvas");p.width=1024,p.height=1536;let f=p.getContext("2d");f.drawImage(u,0,0,1024,1536);let d=f.getImageData(0,0,1024,1536).data,v=o.getImageData(0,0,1024,1536).data,m=h.getImageData(0,0,1024,1536).data;function g(me,Ue,Oe){let He=Math.max(0,Math.min(1535,Math.round(Oe*1535))),Te=Math.max(0,Math.min(1023,Math.round(Ue*1023)));if(me[(He*1024+Te)*4+3]>220)return Ue;for(let Ae=1;Ae<180;Ae++)for(let ke of[Te-Ae,Te+Ae])if(ke>=0&&ke<1024&&me[(He*1024+ke)*4+3]>220)return ke/1023;return Ue}let _=new bt(a),y=new bt(l),x=new bt(p);for(let me of[_,y,x])me.colorSpace=ht,me.anisotropy=4;let M=n.wardrobeSubcategory("pants",e.pants)==="shorts",C=e.suit?.endsWith("Tank"),D=e.suit?.endsWith("Tee"),V=["classic","ruby","midnight"].includes(e.suit),L=!!e.helmet&&e.helmet!=="none",I=new dn({uniforms:{helmetColor:{value:new qe(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new qe(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},helmetOn:{value:L?1:0},shorts:{value:M?1:0},sleeveEnd:{value:C?.19:D?.29:.49},club:{value:V?1:0},portrait:{value:_},rear:{value:y},profile:{value:x},jacketColor:{value:new qe(n.item("suit",e.suit).color)},pantsColor:{value:new qe(n.item("pants",e.pants).color)},shoeColor:{value:new qe(n.item("shoes",e.shoes).color)}},side:Dt,vertexShader:`
#include <common>
#include <skinning_pars_vertex>
attribute vec2 bodyUv;attribute float surface;attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;
varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;
void main(){vBodyUv=bodyUv;vSurface=surface;vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;
#include <skinbase_vertex>
#include <beginnormal_vertex>
#include <skinnormal_vertex>
vNormal=normalMatrix*objectNormal;
#include <begin_vertex>
#include <skinning_vertex>
gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);
}`,fragmentShader:`uniform vec3 helmetColor;uniform vec3 helmetStripe;uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}vec3 dressed(vec3 c,float y,float x){
 if(vSurface>8.5)return vec3(.85,.86,.84);
 if(vSurface>7.5){float tread=.90+.055*sin(x*460.)*sin(y*900.);return vec3(.78,.79,.77)*tread;}
 if(vSurface>4.5&&vSurface<5.5){float sole=smoothstep(.959,.968,y);float upperPanel=smoothstep(.85,.89,y)*(1.-smoothstep(.93,.95,y));vec3 leather=mix(shoeColor*.60,vec3(.07,.075,.08),upperPanel);float stitch=1.-.12*exp(-pow((y-.945)/.0025,2.));return mix(leather*stitch,vec3(.78,.79,.77),sole);}
 if(vSurface>6.5&&vSurface<7.5&&y>.19)return jacketColor*.75;
 float arm=step(1.5,vSurface)*(1.-step(2.5,vSurface));
 float legs=step(3.5,vSurface)*(1.-step(4.5,vSurface));
 if(vSurface>5.5&&vSurface<6.5&&helmetOn>.5){float stripe=1.-smoothstep(.017,.024,abs(x-.505));vec3 shell=mix(helmetColor,helmetStripe,stripe);float visorBand=smoothstep(.045,.055,y)*(1.-smoothstep(.098,.112,y))*smoothstep(-.65,.15,vFront);shell=mix(shell,vec3(.025,.035,.045),visorBand);float vent=step(.105,y)*(1.-step(.155,y))*(1.-smoothstep(.08,.11,abs(x-.505)));return shell*(1.-vent*.38);}
 if(vSurface>2.5&&vSurface<3.5){return texture2D(portrait,vUv).rgb;}
 if((legs>.5&&shorts>.5&&y>.65)||(arm>.5&&y>sleeveEnd)){return texture2D(portrait,vUv).rgb*.86;}
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));float fabricShade=clamp(dot(c,vec3(.2126,.7152,.0722))/.075,.85,1.22);return jacketColor*weave*seam*fabricShade;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.83+.025*sin(x*44.+y*14.);float inseam=1.-.09*exp(-pow((abs(x-.5)-.07)/.008,2.));fold*=inseam;return pantsColor*fold*clamp(dot(c,vec3(.2126,.7152,.0722))/.35,.9,1.12);}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.38,.86,vFront)*a.a;float shoe=step(4.5,vSurface)*(1.-step(5.5,vSurface));float sole=step(7.5,vSurface);f*=1.-max(shoe,sole);vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-step(6.5,vSurface))*(1.-helmetOn);color=mix(color,s,sideAmount)*light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`}),N=new je,O=[],q=xu(N);function k(me,{rings:Ue=70,sides:Oe=80,muzzle:He=!1,folds:Te=0,z:Ae=0,surface:ke=0}={}){let Rt=[],ze=[],pt=[],tt=[],nn=[],ln=[],H=[],Ut=[],ft=me[0][0],rt=me.at(-1)[0];function Wn(Ht){let at=0;for(;at<me.length-2&&me[at+1][0]<Ht;)at++;let Zt=me[at],Nt=me[at+1],Wt=Math.max(0,Math.min(1,(Ht-Zt[0])/(Nt[0]-Zt[0])));return Zt.map((Kt,Ft)=>{if(Ft===0)return Ht;let mn=me[Math.max(0,at-1)][Ft]||0,xn=me[Math.min(me.length-1,at+2)][Ft]||0,fn=Nt[Ft]||0;return Math.max(Math.min(Kt,fn),Math.min(Math.max(Kt,fn),.5*(2*Kt+(-mn+fn)*Wt+(2*mn-5*Kt+4*fn-xn)*Wt*Wt+(-mn+3*Kt-3*fn+xn)*Wt*Wt*Wt)))})}for(let Ht=0;Ht<=Ue;Ht++){let at=ft+(rt-ft)*Ht/Ue,[,Zt,Nt,Wt,Kt=0]=Wn(at),Ft=(Zt+Nt)/2,mn=(Nt-Zt)/2;for(let xn=0;xn<=Oe;xn++){let fn=2*Math.PI*xn/Oe,li=Math.cos(fn),gn=Math.sin(fn),Xt=Ft+mn*li,Ui=Wt*(1+Te*Math.sin(at*260+fn*4)*Math.sin(Math.PI*Ht/Ue)),cn=Ae+Kt+Ui*gn;if(He&&gn>0){let se=(Xt-.507)/.085;cn+=.17*Math.exp(-(se*se)-((at-.126)/.031)**2)*gn*gn,cn+=.045*Math.exp(-(((Xt-.505)/.05)**2)-((at-.104)/.015)**2)*gn,cn-=.028*(Math.exp(-(((Xt-.466)/.024)**2))+Math.exp(-(((Xt-.55)/.024)**2)))*Math.exp(-(((at-.077)/.013)**2))*gn}Rt.push(((ke===5?Ft+(Xt-Ft)*.88:Xt)-.5)*2.55,(.5-at)*3.825,ke===5?cn*.84:cn),ln.push(Xt,at),H.push(ke);let Pt=Xt,Bt=at;ke===3&&(Pt=(Xt<.5?.2:.8)+(Xt-(Zt+Nt)/2)*.45,Bt=Math.min(at,.545)),ze.push(g(v,Pt,Bt),1-Bt);let gt=at,R=Xt;He?gt=.008+(at-.008)*.74:ft<.24&&rt>.4&&Zt>.29&&Nt<.72&&(gt=.14+(at-.165)*1.08),ft>.82&&(R=Ft+(Xt-Ft)*.8),pt.push(g(m,R,gt),1-gt);let j=He?at*.92:at,Y=(He?.45:.49)+cn*.4;if(ft>=.45&&rt>.62&&at>.49&&at<.62&&(Y=Math.min(Y,.43)),tt.push(g(d,Y,j),1-j),nn.push(gn),Ht<Ue&&xn<Oe){let se=Ht*(Oe+1)+xn,ne=se+Oe+1;Ut.push(se,se+1,ne,se+1,ne+1,ne)}}}for(let Ht of[0,Ue]){let at=Ht*(Oe+1),Zt=Rt.length/3;for(let[Nt,Wt]of[[Rt,3],[ze,2],[pt,2],[tt,2],[ln,2]])for(let Kt=0;Kt<Wt;Kt++){let Ft=0;for(let mn=0;mn<Oe;mn++)Ft+=Nt[(at+mn)*Wt+Kt];Nt.push(Ft/Oe)}H.push(ke),nn.push(0);for(let Nt=0;Nt<Oe;Nt++)Ht===0?Ut.push(Zt,at+Nt+1,at+Nt):Ut.push(Zt,at+Nt,at+Nt+1)}let Tt=new ut;Tt.setAttribute("bodyUv",new Ie(ln,2)),Tt.setAttribute("surface",new Ie(H,1)),Tt.setAttribute("position",new Ie(Rt,3)),Tt.setAttribute("uv",new Ie(ze,2)),Tt.setAttribute("rearUv",new Ie(pt,2)),Tt.setAttribute("profileUv",new Ie(tt,2)),Tt.setAttribute("frontWeight",new Ie(nn,1)),Tt.setIndex(Ut),Tt.computeVertexNormals(),q.mesh(Tt,I),O.push(Tt)}k([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.4,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025,surface:1}),k([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),k(L?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!L,z:.1,rings:110,sides:112,surface:6}),L||(k([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),k([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let me of[-1,1]){let Ue=Oe=>me<0?Oe:Oe.map(([He,Te,Ae,ke,Rt])=>[He,1-Ae,1-Te,ke,Rt||0]);k(Ue([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100,surface:2}),k(Ue([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}),V&&k(Ue([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),k(Ue([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.535,.153,.247,.085],[.548,.166,.241,.065],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Oe=0;Oe<4;Oe++){let He=.166+Oe*.019,Te=.54+Oe*.002,Ae=[.039,.046,.043,.034][Oe];k(Ue([[Te,He,He+.019,.024,0],[Te+Ae*.35,He-.001,He+.02,.027,.004],[Te+Ae*.72,He+.001,He+.018,.021,.012],[Te+Ae,He+.005,He+.014,.007,.006]]),{z:.07,rings:22,sides:24,surface:3})}k(Ue([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}k([[.454,.36,.65,.17],[.48,.303,.7,.24],[.53,.29,.713,.25],[.58,.3,.7,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let me of[-1,1]){let Ue=Oe=>me<0?Oe:Oe.map(([He,Te,Ae,ke,Rt])=>[He,1-Ae,1-Te,ke,Rt||0]);k(Ue([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,M?.3:.271,M?.425:.44,M?.145:.19],[.74,M?.285:.252,M?.405:.423,M?.14:.185],[.79,M?.275:.242,M?.385:.397,M?.12:.165],[.826,M?.28:.254,M?.375:.39,M?.11:.155],[.843,.283,.372,.105]]),{z:-.01,folds:.012,rings:110,surface:4}),k(Ue([[.829,.285,.365,.085,0],[.848,.278,.372,.11,.005],[.875,.268,.38,.145,.035],[.907,.265,.386,.2,.07],[.944,.263,.387,.255,.09],[.961,.267,.384,.26,.095],[.97,.282,.37,.2,.085]]),{z:.035,rings:70,surface:5}),k(Ue([[.958,.267,.384,.25,.09],[.967,.261,.389,.265,.09],[.978,.265,.385,.255,.09],[.983,.275,.375,.235,.09]]),{z:.035,rings:12,surface:8})}let ee=yu(q,e,n),te=e.ring&&e.ring!=="none"?Su(n.item("ring",e.ring).color):null;te&&(N.add(te.group),q.attach(te.group,"rightHand"));let ge=e.watch&&e.watch!=="none"?Mu(e.watch,n.item("watch",e.watch).color):null;ge&&(N.add(ge.group),q.attach(ge.group,"rightWrist"));let le=new _n;le.add(N);{le.add(new Un("#fff0d4","#283849",2.1));let me=new wn("#fff0dc",3.5);me.position.set(-2,4,5),le.add(me);let Ue=new wn("#9cc3ed",1.2);Ue.position.set(3,1,-2),le.add(Ue)}let _e=new Hn({alpha:!0,antialias:!0});_e.setPixelRatio(Math.min(devicePixelRatio,2)),_e.outputColorSpace=ht,r.append(_e.domElement),_e.domElement.setAttribute("role","img"),_e.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let Q=new xi(-1.5,1.5,2.05,-2.05,.1,30);Q.position.set(0,0,8);let he=t.yaw||0,Pe=t.pitch||0,ue=null,Me,ve=!1,J=!1,Ee=0,E=window.matchMedia?.("(prefers-reduced-motion: reduce)"),w="full",W=t.focusOrbit||null,z=2.05,S=0,P=0;function G(me){me=me==="watch"?"watch":"full",me!==w&&(me==="watch"?(W=W||{yaw:he,pitch:Pe},t.focusOrbit=W,he=0,Pe=0):W&&(he=W.yaw,Pe=W.pitch,W=null,delete t.focusOrbit),t.yaw=he,t.pitch=Pe,w=me,r.dataset.focus=w)}function B(me){let Ue=r.clientWidth/Math.max(1,r.clientHeight),Oe=w==="watch",He=Oe?Math.max(.4,.3/Ue):Math.max(2.05,1.17/Ue),Te=Oe?.76*Math.cos(he)+.1*Math.sin(he):0,Ae=Oe?.04*Math.cos(Pe)-(.1*Math.cos(he)-.76*Math.sin(he))*Math.sin(Pe):0,ke=1-Math.exp(-me*12);z+=(He-z)*ke,S+=(Te-S)*ke,P+=(Ae-P)*ke,Q.left=S-z*Ue,Q.right=S+z*Ue,Q.top=P+z,Q.bottom=P-z,Q.updateProjectionMatrix()}let ae=()=>{!r.clientWidth||!r.clientHeight||(B(1),_e.setSize(r.clientWidth,r.clientHeight,!1))},Z=new ResizeObserver(ae);Z.observe(r),ae();let $=me=>{J=!1,ue={id:me.pointerId,x:me.clientX,y:me.clientY},r.setPointerCapture(me.pointerId),me.preventDefault()},Se=me=>{!ue||ue.id!==me.pointerId||(he+=(me.clientX-ue.x)*.012,Pe=Math.max(-.35,Math.min(.35,Pe+(me.clientY-ue.y)*.006)),ue.x=me.clientX,ue.y=me.clientY)},Le=()=>{ue=null},ye=me=>{["ArrowLeft","ArrowRight"].includes(me.key)&&(he+=me.key==="ArrowLeft"?-.15:.15,me.preventDefault())};r.addEventListener("pointerdown",$),r.addEventListener("pointermove",Se),r.addEventListener("pointerup",Le),r.addEventListener("pointercancel",Le),r.addEventListener("keydown",ye);function Ce(me=0){if(ve)return;if(!r.isConnected){Ge();return}J&&!ue&&Ee&&(he+=Math.min(.05,(me-Ee)/1e3)*.35),I.uniforms.idleTime.value=me/1e3,I.uniforms.idleStrength.value=!E?.matches&&!ue&&w==="full"?1:0;let Ue=Ee?Math.min(.05,(me-Ee)/1e3):.016;q.update(me/1e3,I.uniforms.idleStrength.value,Ue),B(Ue),Ee=me,N.rotation.set(Pe,he,0),t.yaw=he,t.pitch=Pe,r.dataset.yaw=String(he),_e.render(le,Q),Me=requestAnimationFrame(Ce)}return Ce(),{state:t,setFocus:G,setYaw(me){he=me},setAutoRotate(me){J=!!me},dispose:Ge};function Ge(){if(!ve){ve=!0,cancelAnimationFrame(Me),Z.disconnect();for(let[me,Ue]of[["pointerdown",$],["pointermove",Se],["pointerup",Le],["pointercancel",Le],["keydown",ye]])r.removeEventListener(me,Ue);for(let me of O)me.dispose();ge?.dispose(),te?.dispose(),ee.dispose(),q.dispose(),I.dispose(),_.dispose(),y.dispose(),x.dispose(),_e.dispose(),_e.forceContextLoss(),_e.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new _n,s=new je;i.add(s);let a=new Hn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ht,a.toneMapping=ri,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new zt(34,1,.1,40);i.add(new Un("#dcecff","#50402b",2));for(let[J,Ee,E,w]of[[3,6,5,4],[-3,3,-3,3]]){let W=new wn("#fff0dd",w);W.position.set(J,Ee,E),i.add(W)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let J=0;J<128;J+=2)l.fillStyle=J%4?"#808080":"#b0b0b0",l.fillRect(0,J,128,1);for(let J=0;J<128;J+=3)l.fillStyle="#888888",l.fillRect(J,0,1,128);let h=new bt(c);h.wrapS=h.wrapT=Yn,h.repeat.set(8,8);let u=(J,Ee=0,E=.7)=>new Ct({color:J,metalness:Ee,roughness:E}),p=u("#32251d"),f=u("#96715a"),d=u("#11161b"),v=u("#e0dfd4"),m=u("#d9ac4c",.8,.25),g=u("#a22c3b"),_=u("#171b20"),y=u("#171b20"),x=u("#826222",.9,.18);for(let J of[g,_,d])J.bumpMap=h,J.bumpScale=.012;function M(J,Ee,E,w,W,z,S,P=s){let G=new ot(new on(1,40,28),J);return G.position.set(Ee,E,w),G.scale.set(W,z,S),P.add(G),G}function C(J,Ee,E,w,W=w){let z=new b(...Ee),S=new b(...E),P=S.clone().sub(z),G=new ot(w>.1?new Sr((w+W)/2,Math.max(.01,P.length()-(w+W)),10,32):new Ye(W,w,P.length(),16),J);return G.position.copy(z.add(S).multiplyScalar(.5)),G.quaternion.setFromUnitVectors(new b(0,1,0),P.normalize()),s.add(G),G}M(_,0,1.64,0,.47,.36,.26),M(g,0,2.32,0,.59,.65,.32),M(d,0,2.35,.29,.27,.49,.055);for(let J of[-1,1]){C(_,[J*.27,1.67,0],[J*.29,.92,.015],.23,.25),M(_,J*.29,.92,.015,.23,.24,.24),C(_,[J*.29,.94,.015],[J*.32,.28,0],.16,.22),C(v,[J*.45,1.55,.03],[J*.48,.36,.03],.025,.032),M(y,J*.32,.18,.15,.22,.19,.39),M(v,J*.32,.075,.15,.235,.065,.4),M(v,J*.32,.27,.12,.135,.08,.2);for(let Ee=0;Ee<5;Ee++)C(v,[J*.32-.1,.29,.08+Ee*.04],[J*.32+.1,.29,.08+Ee*.04],.009);M(g,J*.55,2.63,0,.26,.27,.29),C(g,[J*.57,2.63,0],[J*.76,2.12,.02],.19,.23),M(g,J*.76,2.12,.02,.19,.2,.2),C(g,[J*.76,2.12,.02],[J*.88,1.65,.08],.13,.18),C(v,[J*.71,2.6,.15],[J*.99,1.72,.15],.035),M(d,J*.88,1.67,.08,.145,.09,.15),M(p,J*.89,1.48,.1,.16,.22,.12);for(let Ee=0;Ee<4;Ee++)M(f,J*(.79+Ee*.065),1.36,.15,.035,.13,.045);M(f,J*.75,1.48,.2,.06,.12,.06)}M(p,0,3.04,0,.25,.27,.24),M(p,0,3.39,0,.36,.43,.31);for(let J of[-1,1])M(f,J*.36,3.4,.01,.12,.17,.09),M(p,J*.36,3.4,.065,.065,.1,.035),M(f,J*.15,3.43,.258,.15,.12,.075),M(d,J*.14,3.44,.32,.045,.035,.02),M(v,J*.13,3.45,.335,.009,.01,.006),M(p,J*.15,3.53,.28,.18,.05,.07);M(f,0,3.23,.27,.26,.18,.13),M(f,0,3.34,.34,.14,.08,.08),M(d,0,3.17,.375,.17,.017,.018),M(f,0,3.13,.36,.17,.035,.025);let D=new je;s.add(D),M(d,0,3.51,-.02,.41,.42,.35,D),M(m,0,3.64,.015,.07,.3,.36,D);for(let J of[-1,1])M(d,J*.32,3.29,.015,.1,.31,.24,D),M(m,J*.39,3.43,.07,.025,.05,.05,D);let V=M(x,0,3.44,.27,.38,.19,.14,D);for(let J of[-1,1])C(d,[J*.28,2.88,.25],[J*.1,2.58,.33],.035),C(d,[J*.3,2.28,.3],[J*.39,2.09,.26],.018);for(let J=0;J<6;J++)M(m,0,2.03+J*.14,.35,.015,.015,.01);let L=document.createElement("canvas");L.width=512,L.height=256;let I=L.getContext("2d"),N=new bt(L);N.colorSpace=ht;let O=new ot(new Yt(.28,.12),new Ct({map:N,roughness:.9}));O.position.set(-.27,2.46,.317),s.add(O);let q=new je;for(let J=0;J<3;J++)for(let Ee=0;Ee<5;Ee++){let E=new ot(new Yt(.048,.048),(Ee+J)%2?d:v);E.position.set(-.36+Ee*.048,2.62+J*.048,.318),q.add(E)}s.add(q);function k(J){g.color.set(n.item("suit",J.suit).color),_.color.set(n.item("pants",J.pants).color),y.color.set(n.item("shoes",J.shoes).color),D.visible=J.helmet!=="none",V.position.y=J.visor==="open"?3.71:3.44,V.rotation.x=J.visor==="open"?-.8:0,O.visible=J.patch!=="none",I.fillStyle="#22282b",I.fillRect(0,0,512,256),I.strokeStyle="#c9af74",I.lineWidth=12,I.strokeRect(8,8,496,240),I.fillStyle="#eee0b5",I.font="bold 72px Arial",I.textAlign="center",I.fillText(J.patch==="name"?J.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":J.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),N.needsUpdate=!0}k(e),t.yaw??=0,t.pitch??=.07;let ee=null,te,ge=!1;function le(){let J=r.clientWidth,Ee=r.clientHeight;!J||!Ee||(a.setSize(J,Ee,!1),o.aspect=J/Ee,o.updateProjectionMatrix())}let _e=new ResizeObserver(le);_e.observe(r),le();let Q=J=>{ee={id:J.pointerId,x:J.clientX,y:J.clientY},r.setPointerCapture(J.pointerId),J.preventDefault()},he=J=>{!ee||ee.id!==J.pointerId||(t.yaw-=(J.clientX-ee.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(J.clientY-ee.y)*.006)),ee.x=J.clientX,ee.y=J.clientY)},Pe=()=>{ee=null},ue=J=>{(J.key==="ArrowLeft"||J.key==="ArrowRight")&&(t.yaw+=J.key==="ArrowLeft"?.15:-.15,J.preventDefault())};r.addEventListener("pointerdown",Q),r.addEventListener("pointermove",he),r.addEventListener("pointerup",Pe),r.addEventListener("pointercancel",Pe),r.addEventListener("keydown",ue);function Me(){if(ge)return;ge=!0,cancelAnimationFrame(te),_e.disconnect();for(let[Ee,E]of[["pointerdown",Q],["pointermove",he],["pointerup",Pe],["pointercancel",Pe],["keydown",ue]])r.removeEventListener(Ee,E);let J=new Set;i.traverse(Ee=>{Ee.geometry?.dispose(),Ee.material&&J.add(Ee.material)});for(let Ee of J)Ee.dispose();N.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function ve(){if(ge)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Me();return}let J=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*J,1.95+Math.sin(t.pitch)*J,Math.cos(t.yaw)*Math.cos(t.pitch)*J),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),te=requestAnimationFrame(ve)}return ve(),{update:k,dispose:Me,state:t}};function oc(r){let e=new je;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(L,I,N)=>new yn({color:L,metalness:I,roughness:N,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(L,I,N=0,O=0,q=0)=>{let k=new ot(L,I);return k.position.set(N,O,q),k.castShadow=k.receiveShadow=!0,e.add(k),k},h=(L,I,N,O=!0)=>{let q=new bn;return q.absarc(I,N,L,0,Math.PI*2,O),q},u=t?.395:.437,p=new Qt;if(p.absarc(0,0,u,0,Math.PI*2,!1),p.holes.push(h(.181,0,0)),!t)for(let L=0;L<24;L++)for(let[I,N]of[[.28,0],[.36,.045]]){let O=L*Math.PI/12+N;p.holes.push(h(n?.009:.011,Math.cos(O)*I,Math.sin(O)*I))}for(let L of[0,.033])l(new qt(p,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,L);let f=new dt(.22,.014,.025),d=new ls(f,a,32),v=new Ke;for(let L=0;L<32;L++){let I=L*Math.PI/16;v.compose(new b(Math.cos(I)*.31,Math.sin(I)*.31,.021),new Pn().setFromAxisAngle(new b(0,0,1),I+.18),new b(1,1,1)),d.setMatrixAt(L,v)}e.add(d);let m=l(new Ye(.184,.16,.045,48),a,0,0,.018);m.rotation.x=Math.PI/2;let g=l(new Ye(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let L=0;L<10;L++){let I=L*Math.PI/5,N=l(new Ye(.017,.017,.015,12),s,Math.cos(I)*.18,Math.sin(I)*.18,.05);N.rotation.x=Math.PI/2;let O=l(new Ye(.009,.009,.018,6),a,Math.cos(I)*.18,Math.sin(I)*.18,.058);O.rotation.x=Math.PI/2}for(let L of[.235,.26,.31,.335,.39,.414])if(L<u){let I=l(new yt(L,.0012,3,96),a,0,0,.042);I.castShadow=!1}if(!t)for(let L=0;L<8;L++){let I=L*Math.PI/4,N=[.25,.29,.34,.395].map((q,k)=>new b(Math.cos(I+k*.075)*q,Math.sin(I+k*.075)*q,.043)),O=l(new St(new Mt(N),12,.0024,3,!1),a);O.castShadow=!1}let _=new Qt;_.moveTo(-.08,-.2),_.quadraticCurveTo(-.13,-.15,-.115,-.06),_.lineTo(-.115,.1),_.quadraticCurveTo(-.12,.19,-.05,.215),_.lineTo(.055,.19),_.quadraticCurveTo(.11,.14,.105,.06),_.lineTo(.105,-.1),_.quadraticCurveTo(.1,-.19,.04,-.21),_.closePath();let y=l(new qt(_,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new dt(.09,.31,.032),a,.27,0,.005);for(let L of[-.125,0,.125]){let I=l(new Ye(.055,.055,.028,24),c,.354,L,.07);I.rotation.x=Math.PI/2}for(let L of[-.155,.155]){let I=l(new Ye(.014,.014,.025,6),s,.325,L,.094);I.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let M=x.getContext("2d");M.fillStyle="#f5f0df",M.translate(64,192),M.rotate(-Math.PI/2),M.textAlign="center",M.font="italic bold 60px Arial",M.fillText(t?"P21":"P21 SPORT",0,20);let C=new bt(x);C.colorSpace=ht;let D=l(new Yt(.075,.24),new zn({map:C,transparent:!0,depthWrite:!1}),.329,0,.1);D.castShadow=!1;let V=l(new Ye(.012,.014,.047,6),s,.36,.217,.042);return V.rotation.z=.2,e}var ac;function bu(r,e){if(!r.isConnected)return;if(!ac){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ht,a.toneMapping=ri,a.toneMappingExposure=1.15;let o=new _n;o.add(new Un("#eaf1ff","#342a22",2));for(let[l,h,u,p]of[[2,3,4,4],[-3,0,2,2]]){let f=new wn("#ffffff",p);f.position.set(l,h,u),o.add(f)}let c=new zt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),ac={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=ac;s[e]||(s[e]=oc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function wu(r){let e=new je;e.name="tyre-"+r;let t=new Ct({color:"#15181b",roughness:.86}),n=new Ct({color:"#050708",roughness:.96}),i=new Ct({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new ot(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new yi([new de(.56,-.19),new de(.63,-.25),new de(.72,-.23),new de(.79,-.15),new de(.8,-.1),new de(.8,.1),new de(.79,.15),new de(.72,.23),new de(.63,.25),new de(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new yt(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let p=u*Math.PI/8,f=s(new dt(.018,.036,.006),i);f.position.set(Math.sin(p)*.71,Math.cos(p)*.71,l*.246),f.rotation.z=-p}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(p,f)=>{let d=-.2+f/15*.4,v=.8-.045*(Math.abs(d)/.2)**3,m=h+(o?.18:.08)*Math.sin(f/15*Math.PI);return new b(Math.sin(m)*v,Math.cos(m)*v,d)});s(new St(new Mt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new yt(.798,.004,8,80),n);h.position.z=l}}return e}function Eu(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new b;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Ie(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new Er({depthPacking:ro});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Au(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new je;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(M,C,D)=>{let V=new ot(M,C);return V.name=D,V.castShadow=V.receiveShadow=!0,c.add(V),V};for(let M=0;M<h;M++){let C=[],D=[];for(let N=0;N<=72;N++){let O=N/72*2-1,q=O*l/2,k=(M?a?.36:.46:.76)*(1-.22*O*O),ee=(M?2.86+M*.055:3.02)-.13*O*O,te=.43+M*.095+.1*Math.pow(Math.abs(O),3);for(let ge=0;ge<=28;ge++){let le=ge/28*Math.PI*2,_e=Math.cos(le);C.push(ee+_e*k/2,te+.035*(1-_e*_e)+Math.sin(le)*(M?.024:.035),q)}if(N<72)for(let ge=0;ge<28;ge++){let le=N*29+ge,_e=le+28+1;D.push(le,le+1,_e,le+1,_e+1,_e)}}let I=new ut;I.setAttribute("position",new Ie(C,3)),I.setIndex(D),I.computeVertexNormals(),u(I,M===0?n:t,"wing-element-"+M)}let p=[[1.06,1.06,1.22,.49],[1.3,1.1,1.04,.45],[1.65,1.13,.64,.37],[2.02,1.08,.43,.28],[2.39,.95,a?.34:.3,.2],[2.77,.79,a?.25:.2,.13],[3.13,.66,a?.19:.12,.075],[3.27,.64,a?.16:.075,.045]],f=[0,1,2,3].map(M=>new Mt(p.map((C,D)=>new b(C[M],D,0)),!1,"catmullrom",.35)),d=[],v=[],m=96,g=48;for(let M=0;M<=m;M++){let C=M/m,[D,V,L,I]=f.map(N=>N.getPoint(C).x);for(let N=0;N<=g;N++){let O=N/g*Math.PI*2,q=Math.cos(O),k=Math.sin(O),ee=a?.7:.82;d.push(D,V+Math.sign(k)*Math.pow(Math.abs(k),ee)*I,Math.sign(q)*Math.pow(Math.abs(q),ee)*L)}if(M<m)for(let N=0;N<g;N++){let O=M*(g+1)+N,q=O+1;v.push(O,O+g+1,q,q,O+g+1,q+g+1)}}let _=v.length;for(let M of[0,m]){let C=M*(g+1);for(let D=1;D<g-1;D++)M===0?v.push(C,C+D,C+D+1):v.push(C,C+D+1,C+D)}let y=new ut;y.setAttribute("position",new Ie(d,3)),y.setIndex(v),y.computeVertexNormals();let x=Math.floor(m*.89)*g*6;y.addGroup(0,x,0),y.addGroup(x,_-x,a?1:0),y.addGroup(_,v.length-_,0),u(y,[t,s],"tapered-nose");for(let M of[-1,1]){let C=u(new dt(.19,.22,.035),n,"nose-pylon");C.position.set(3.02,.53,M*.1),C.rotation.z=-.15;let D=new Qt;D.moveTo(2.57,.38),D.lineTo(3.43,.38),D.quadraticCurveTo(3.53,.42,3.43,.61),D.lineTo(3.14,a?.95:.82),D.quadraticCurveTo(2.79,a?.97:.84,2.61,.69),D.closePath();let V=u(new qt(D,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");V.position.z=M*l/2-.017,u(new dt(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,M*(l/2+.055));let I=new Mt([[2.65,.7],[2.9,a?.94:.81],[3.13,a?.94:.81],[3.4,.61]].map(([N,O])=>new b(N,O,M*(l/2+.025))));if(u(new St(I,28,.009,6,!1),s,"endplate-trim"),a)for(let N=0;N<3;N++){let O=u(new dt(.27,.13,.018),n,"flow-fin");O.position.set(2.86+N*.07,.58+N*.07,M*(1.1+N*.1)),O.rotation.z=.15}}return c}function cc(r){let e=new je;e.name="sport-seat-"+r;let t=(I,N=.8,O=0)=>new yn({color:I,roughness:N,metalness:O,clearcoat:O?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),p=t("#070b10"),f=document.createElement("canvas");f.width=f.height=64;let d=f.getContext("2d");d.fillStyle="#30343b",d.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let N=0;N<64;N+=8)d.fillStyle=(N+I)%16?"#121820":"#626973",d.fillRect(N,I,7,3),d.fillStyle="#252b33",d.fillRect(N,I+4,3,4);let v=new bt(f);v.wrapS=v.wrapT=Yn,v.repeat.set(3,5),v.colorSpace=ht,c.map=v,c.bumpMap=v,c.bumpScale=.004;let m=(I,N,O=0,q=0,k=0,ee=e)=>{let te=new ot(I,N);return te.position.set(O,q,k),te.castShadow=te.receiveShadow=!0,ee.add(te),te},g=(I,N,O,q,k,ee,te,ge,le=e)=>{let _e=new Qt,Q=-I/2,he=-N/2;return q=Math.min(q,I/2,N/2,O/2),_e.moveTo(Q+q,he),_e.lineTo(Q+I-q,he),_e.quadraticCurveTo(Q+I,he,Q+I,he+q),_e.lineTo(Q+I,he+N-q),_e.quadraticCurveTo(Q+I,he+N,Q+I-q,he+N),_e.lineTo(Q+q,he+N),_e.quadraticCurveTo(Q,he+N,Q,he+N-q),_e.lineTo(Q,he+q),_e.quadraticCurveTo(Q,he,Q+q,he),m(new qt(_e,{depth:O-2*q,bevelEnabled:!0,bevelSize:q,bevelThickness:q,bevelSegments:4,curveSegments:12}),k,ee,te,ge-O/2+q,le)},_=(I,N,O,q=e)=>m(new St(new Mt(I.map(k=>new b(...k))),32,N,6,!1),O,0,0,0,q),y=new je;y.rotation.x=-.14,y.position.set(0,.2,0),e.add(y);let x=new Qt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let I of[-.135,.135]){let N=new bn;N.moveTo(I-.075,1.24),N.lineTo(I+.075,1.24),N.lineTo(I+.075,1.34),N.lineTo(I-.075,1.34),N.closePath(),x.holes.push(N)}m(new qt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,y),m(new qt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,y).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,y),g(.46,.5,.12,.035,o,0,.85,.065,y),g(.45,.31,.17,.04,o,0,.4,.1,y);for(let I of[-1,1]){let N=g(.17,.42,.19,.055,a,I*.34,.98,.1,y);N.rotation.z=I*.28,N.rotation.y=-I*.25;let O=g(.13,.55,.23,.045,a,I*.3,.49,.14,y);O.rotation.z=-I*.12,_([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,y);let q=I*.135;for(let k of[1.235,1.345])g(.16,.014,.022,.004,h,q,k,.015,y);for(let k of[q-.08,q+.08])g(.014,.12,.022,.004,h,k,1.29,.015,y)}let C=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);C.name="seat-base";let D=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);D.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])_([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])g(.14,.13,.64,.04,a,I*.45,.65,.32),g(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let N of[-.1,.1])_([[N-.1,I,.18],[N,I+.07,.18],[N+.1,I,.18]],.003,l,y)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),_([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let N=g(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);N.rotation.z=-I*.12,_([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let O of[.02,.65])g(.13,.09,.12,.015,c,I*.28,-.055,O),m(new Ye(.022,.022,.015,12),h,I*.28,-.002,O)}for(let I=.3;I<1.08;I+=.11)_([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,y);for(let I of[-1,1]){let N=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],O=[],q=[];N.forEach(([ge,le,_e],Q)=>{O.push(ge-.033,le,_e,ge+.033,le,_e),Q&&q.push(Q*2-2,Q*2-1,Q*2,Q*2-1,Q*2+1,Q*2)});let k=new ut;k.setAttribute("position",new Ie(O,3)),k.setIndex(q),k.computeVertexNormals();let ee=u.clone();ee.side=Dt,m(k,ee);let te=g(.27,.055,.025,.008,u,I*.18,.64,.45);te.rotation.z=-I*.2}let V=m(new Ye(.065,.065,.035,24),h,0,.66,.48);V.rotation.x=Math.PI/2;let L=m(new Ye(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);return L.rotation.x=Math.PI/2,e}var lc;function Cu(r,e){if(!r.isConnected||e==="none")return;if(!lc){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ht,a.toneMapping=ri,a.toneMappingExposure=1.25;let o=new _n;o.add(new Un("#eaf1ff","#3e3028",2));for(let[l,h,u,p]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let f=new wn("#ffffff",p);f.position.set(l,h,u),o.add(f)}let c=new zt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),lc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=lc;s[e]||(s[e]=cc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Tu;window.pokerPaintBrakePreview=bu;window.pokerPaintSeatPreview=Cu;var Ru=(r,e,t)=>Math.max(e,Math.min(t,r));function Xp(r,e){let t=window.PokerGarage,n=new je;r.add(n),n.scale.set(1.24,.86,.95);let i=(T,A,U)=>new yn({color:T,metalness:A,roughness:U,clearcoat:A>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),p=i(t.item("light",e.light).color,.45,.2),f=i("#123e47",.86,.22);p.emissive.copy(p.color),p.emissiveIntensity=2;function d(T,A,U=0,K=0,F=0,re=n){let X=new ot(T,A);return X.position.set(U,K,F),X.castShadow=!0,X.receiveShadow=!0,re.add(X),X}let v=(T,A,U,K,F,re,X)=>d(new dt(T,A,U),K,F,re,X);function m(T,A,U,K,F,re,X="y"){let ie=d(new Ye(T,T,A,64),U,K,F,re);return X==="z"&&(ie.rotation.x=Math.PI/2),X==="x"&&(ie.rotation.z=Math.PI/2),ie}function g(T,A,U,K,F,re,X="z"){let ie=d(new yt(T,A,12,80),U,K,F,re);return X==="y"&&(ie.rotation.x=Math.PI/2),X==="x"&&(ie.rotation.y=Math.PI/2),ie}function _(T,A,U,K=Qt){let F=new K,re=-T/2,X=-A/2;return U=Math.min(U,A/2-.001),F.moveTo(re+U,X),F.lineTo(re+T-U,X),F.quadraticCurveTo(re+T,X,re+T,X+U),F.lineTo(re+T,X+A-U),F.quadraticCurveTo(re+T,X+A,re+T-U,X+A),F.lineTo(re+U,X+A),F.quadraticCurveTo(re,X+A,re,X+A-U),F.lineTo(re,X+U),F.quadraticCurveTo(re,X,re+U,X),F}function y(T,A,U,K,F,re,X=null,ie=.025){let pe=_(T,A,K);if(X){let fe=_(X[0],X[1],X[2],bn),oe=new bn(fe.getPoints(40).map(ce=>new de(ce.x+(X[3]||0),ce.y)));pe.holes.push(oe)}let Xe=d(new qt(pe,{depth:U,bevelEnabled:ie>0,bevelSize:ie,bevelThickness:ie,bevelSegments:4,curveSegments:40}),F,0,re,0);return Xe.rotation.x=-Math.PI/2,Xe}let x=[],M=n.children.length,C=[3.02,1.51,.65,-.28],D=_(4.96,2.44,1.15).getSpacedPoints(128),V=[],L=[],I=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[T,A]of I)for(let U=0;U<128;U++){let K=D[U];V.push(K.x*A,T,-K.y*A)}for(let T=0;T<3;T++)for(let A=0;A<128;A++){let U=T*128+A,K=T*128+(A+1)%128;L.push(U,K,U+128,K,K+128,U+128)}let N=new ut;N.setAttribute("position",new Ie(V,3)),N.setIndex(L),N.computeVertexNormals(),s.side=Dt,d(N,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,C,.035);let O=new Mt(_(4.94,2.42,1.15).getPoints(40).map(T=>new b(T.x,1.44,-T.y)),!0,"centripetal");d(new St(O,240,.125,16,!0),u);for(let T of[-1,1]){let A=Array.from({length:21},(U,K)=>{let F=.26+K*.25/20;return new b(1.32+1.15*Math.cos(F),1.44,T*(.06+1.15*Math.sin(F)))});d(new St(new Mt(A),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,C,.015),y(4.52,2.01,.025,.97,a,1.43,C,.01),x.push(...n.children.slice(M));let q=y(2.98,1.47,.025,.63,a,.94);q.position.x=-.28;let k=new yn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Dt,polygonOffset:!0,polygonOffsetFactor:-1}),ee=new Wi(_(2.9,1.4,.6)),te=ee.attributes.position,ge=ee.attributes.uv;for(let T=0;T<te.count;T++)ge.setXY(T,(te.getX(T)+1.45)/2.9,(te.getY(T)+.7)/1.4);let le=d(ee,k,-.28,1.005,0);le.rotation.x=-Math.PI/2,le.castShadow=!1;let _e=k.clone(),Q=[];for(let T of[-1,1]){let A=d(new Yt(3.05,.3),_e,0,1.04,T*1.329);T<0&&(A.rotation.y=Math.PI),A.castShadow=!1,Q.push(A)}function he(T){let A=T.vinyl||"none";le.visible=A!=="none",Q.forEach(K=>K.visible=A!=="none");let U=A+":"+(T.vinylText||"");if(k.userData.id!==U){k.map?.dispose(),_e.map?.dispose(),k.map=new bt(t.vinylCanvas(A,!1,T.vinylText)),_e.map=new bt(t.vinylCanvas(A,!0,T.vinylText));for(let K of[k,_e]){K.map.colorSpace=ht,K.map.anisotropy=16;let F=K.map;F.image.addEventListener("vinyl-ready",()=>{F.needsUpdate=!0},{once:!0}),K.needsUpdate=!0,K.userData.id=U}}}let Pe=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);Pe.position.x=-.28;let ue=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);ue.position.x=-.28;for(let T of[-1,-.35,.35])for(let A of[-.75,.75])v(.011,.4,.009,h,T,1.2,A);function Me(T,A){let U=document.createElement("canvas");U.width=U.height=256;let K=U.getContext("2d");K.fillStyle=T,K.fillRect(0,0,256,256);let F=17;for(let X=0;X<18e3;X++)F=F*1664525+1013904223>>>0,K.fillStyle="rgba(0,0,0,"+A+")",K.fillRect(F%256,(F>>>8)%256,1,1);let re=new bt(U);return re.colorSpace=ht,re.wrapS=re.wrapT=Yn,re}a.map=Me("#e8e8e8",.035),a.bumpMap=Me("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=Me("#888888",.12),c.bumpScale=.003,u.bumpMap=Me("#888888",.3),u.bumpScale=.001;function ve(T,A,U,K,F,re=!1,X=n){let ie=new Qt;ie.moveTo(0,.5),ie.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),ie.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),ie.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),ie.bezierCurveTo(.48,.12,.12,.28,0,.5),ie.moveTo(-.12,-.3),ie.lineTo(0,-.06),ie.lineTo(.12,-.3),ie.closePath();let pe=d(new qt(ie,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),A,U,K,F,X);return pe.scale.setScalar(T),re&&(pe.rotation.y=Math.PI),pe}let J=[],Ee=[],E=[],w=null;for(let T of[-1.72,1.72])for(let A of[-1,1]){let U=A*1.36,K=A*1.57,F=new je;F.position.set(T,.81,U),n.add(F),F.userData.groundWheel=!0;let re=n.children.length,X=d(new yi([new de(.56,-.19),new de(.61,-.245),new de(.67,-.25),new de(.76,-.19),new de(.8,-.1),new de(.8,.1),new de(.76,.19),new de(.67,.25),new de(.61,.245),new de(.56,.19)],80),c,T,.81,U);X.rotation.x=Math.PI/2;for(let fe=-2;fe<=2;fe++)g(.798-Math.abs(fe)*.012,.0035,h,T,.81,U+fe*.071);for(let fe=0;fe<28;fe++){let oe=fe*Math.PI/14,ce=Array.from({length:17},(be,Je)=>{let we=Je/16,Re=-.205+we*.41,Ne=.799-.044*Math.pow(Math.abs(Re)/.205,3),vt=oe+.13*Math.sin(we*Math.PI);return new b(T+Math.sin(vt)*Ne,.81+Math.cos(vt)*Ne,U+Re)});d(new St(new Mt(ce),20,.0045,5,!1),h)}for(let fe of[-1,1])for(let oe of[.625,.654,.681])g(oe,.0035,h,T,.81,U+fe*.244);let ie=n.children.slice(re);g(.548,.023,l,T,.81,K+A*.035),g(.505,.016,l,T,.81,K+A*.043),m(.14,.045,h,T,.81,K+A*.045,"z"),g(.14,.012,l,T,.81,K+A*.069);let pe=ve(.2,l,T,.8,K+A*.075,A<0);Ee.push(pe);for(let fe of t.wheelDesign()){let oe=new Mt(fe.map(([ce,be])=>new b(T+ce,.81+be,K+A*(.04+.025*(1-Math.hypot(ce,be)/.51)))));J.push(d(new St(oe,20,.007,6,!1),l))}for(let fe=0;fe<20;fe++){let oe=fe*Math.PI/10;m(.006,.009,l,T+Math.sin(oe)*.526,.81+Math.cos(oe)*.526,K+A*.06,"z")}n.updateMatrixWorld(!0);for(let fe of n.children.slice(re))F.attach(fe);F.scale.set(.88/1.24,.88/.86,1/.95),F.position.y=.715/.86;let Xe={standard:ie};for(let fe of["soft","medium","hard","semi","wet"]){let oe=wu(fe);oe.visible=!1,F.add(oe),Xe[fe]=[oe]}E.push({wheelGroup:F,x:T,out:K,sign:A,tyres:Xe})}let W=[];for(let T of[-1,1])W.push(v(1.35,.43,.04,o,.05,.94,T*1.3));for(let T of[-1,1]){let A=m(.275,.27,h,2.16,.945,T*.97,"z");g(.278,.035,o,2.16,.945,T*1.11)}for(let T of[-1.72,1.72])m(.07,2.8,h,T,.7,0,"z");v(3.6,.08,.8,h,0,.57,0);let z=[];function S(T,A,U){let K=document.createElement("canvas");K.width=T,K.height=A,U(K.getContext("2d"),T,A);let F=new bt(K);return F.colorSpace=ht,F.anisotropy=8,z.push(F),F}let P=S(768,256,(T,A,U)=>{T.fillStyle="#101b18",T.fillRect(0,0,A,U),T.strokeStyle="#d9b35b",T.lineWidth=7,T.strokeRect(10,10,A-20,U-20),T.fillStyle="#ebc66c",T.textAlign="center",T.font="italic 116px Georgia",T.fillText("Two Aces",A/2,137),T.font="38px Georgia",T.fillText("\u2660 Poker21 \u2660",A/2,209)}),G=[];for(let T of[-1,1]){let A=new yn({map:P,metalness:.55,roughness:.2,clearcoat:1});G.push(A);let U=d(new Yt(1.28,.4),A,.05,.94,T*1.326);A.userData.plane=U,T<0&&(U.rotation.y=Math.PI)}let B=[];for(let T of[-1,1])for(let A=0;A<3;A++){let U=new je;U.position.set((A-1)*.7+.05,1,T*1.365),T<0&&(U.rotation.y=Math.PI),n.add(U);let K=d(new dt(.1,.1,.025),o,0,0,0,U),F=new Ct({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),re=d(new Yt(.65,.65),F,0,0,.035,U);re.castShadow=!1,re.receiveShadow=!1,B.push({group:U,mat:F,back:K,n:A})}for(let T of[-1,1])for(let A of[-.54,.64])for(let U of[.78,1.1]){let K=m(.014,.018,o,A,U,T*1.35,"z")}let ae=n.children.length;for(let T of[-1.7,-.35,1.48])for(let A of[-1.21,1.21]){let U=m(.128,.13,o,T,1.44,A,"x")}for(let T of[-1.7,-.35,1.48])for(let A of[-1,1])g(.125,.004,h,T+.08,1.44,A*1.21,"x"),g(.125,.004,h,T-.08,1.44,A*1.21,"x");for(let T of[-1.7,-.35,1.48])for(let A of[-.96,.96])m(.135,.08,o,T,1.49,A),m(.108,.082,h,T,1.498,A),g(.125,.015,o,T,1.54,A,"y"),g(.111,.006,o,T,1.535,A,"y");let Z=[],$=[],Se=["#ab2338","#1b684b","#2455a5"].map(T=>i(T,.08,.55)),Le=i("#eee9d6",.04,.6);for(let[T,A,U,K]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let F=0;F<K;F++){m(.104,.033,Se[U],T,1.49+F*.037,A);for(let re=0;re<6;re++){let X=re*Math.PI/3,ie=v(.024,.021,.012,Le,T+Math.cos(X)*.103,1.49+F*.037,A+Math.sin(X)*.103);ie.rotation.y=Math.PI/2-X,ie.castShadow=!1,ie.receiveShadow=!1,Z.push(ie)}if(F===K-1){let re=new Ct({transparent:!0,alphaTest:.1,roughness:.65}),X=d(new Yt(.208,.208),re,T,1.511+F*.037,A);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,$.push({mat:re,n:U})}}x.push(...n.children.slice(ae));let ye=new je;ye.position.set(.89,1.96,0),ye.scale.set(1/1.24,1/.86,1/.95),n.add(ye);let Ce=new je;ye.add(Ce);let Ge=new b((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),me=new b(0,0,1),Ue=new b().crossVectors(Ge,me).normalize();Ce.quaternion.setFromRotationMatrix(new Ke().makeBasis(me,Ue,Ge));let Oe=u.clone();d(new yt(.53,.06,16,80),Oe,0,0,0,Ce),d(new yt(.473,.014,10,64),o,0,0,-.02,Ce);for(let T of[Math.PI]){let A=d(new dt(.09,.39,.045),o,Math.sin(T)*.26,Math.cos(T)*.26,0,Ce);A.rotation.z=-T}for(let T of[-1,1]){let A=d(new dt(.35,.075,.06),o,T*.265,0,0,Ce);d(new dt(.32,.035,.064),h,T*.265,0,.006,Ce)}let He=d(new Ye(.195,.195,.075,64),o,0,0,.035,Ce);He.rotation.x=Math.PI/2;let Te=d(new Gn(.177,64),new Ct({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Ce);Te.receiveShadow=!1,ve(.38,o,0,-.025,.105,!1,Ce);let Ae={classic:new je,sport:new je,formula:new je};for(let T of Ce.children.slice())Ae.classic.add(T);Object.values(Ae).forEach(T=>Ce.add(T));function ke(T,A,U,K){let F=new Mt(A.map(([re,X])=>new b(re,X,0)),!0);d(new St(F,72,U,12,!0),K,0,0,0,T)}ke(Ae.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Oe);for(let T of[-1,1])d(new dt(.35,.065,.045),l,T*.27,0,0,Ae.sport),d(new dt(.065,.3,.045),l,T*.12,-.22,0,Ae.sport);d(new yt(.5,.018,8,64,.22),p,0,0,.005,Ae.sport),ke(Ae.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Oe),d(new dt(.6,.23,.065),h,0,0,0,Ae.formula);for(let T of[-1,1])d(new on(.035,12,8),p,T*.25,.055,.06,Ae.formula),d(new dt(.08,.29,.025),l,T*.37,0,-.07,Ae.formula);for(let T of["sport","formula"]){let A=d(new Ye(.15,.15,.07,48),l,0,0,.035,Ae[T]);A.rotation.x=Math.PI/2,d(new Gn(.13,48),h,0,0,.078,Ae[T]),ve(.25,l,0,-.018,.09,!1,Ae[T])}for(let[T,A]of Object.entries(t.steeringDesigns)){let U=new je;Ce.add(U),Ae[T]=U;let K=i(A.color,T==="woodHeritage"?.3:.55,.35);A.shape==="round"?d(new yt(.53,.065,16,80),K,0,0,0,U):A.shape==="flat"?ke(U,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,K):se([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,K,U);for(let re=0;re<A.spokes;re++){let X=re*Math.PI*2/A.spokes,ie=d(new dt(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,U);ie.rotation.z=X}let F=d(new Ye(.15,.15,.075,40),h,0,0,.05,U);F.rotation.x=Math.PI/2,ve(.23,l,0,-.015,.095,!1,U),d(new dt(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,U)}let Rt=i("#b9ab8a",.15,.8),ze=i("#171c20",.02,.85);for(let[T,A]of Object.entries(Ae)){let U=T==="classic"?.53:T==="sport"?.51:.47;for(let F of[-1,1]){if(T!=="formula"){let re=d(new yt(U,.072,12,30,.64),ze,0,0,.003,A);re.rotation.z=F<0?Math.PI-.32:-.32}for(let re=0;re<9;re++){let X=(F<0?Math.PI:0)-.28+re*.07;d(new on(.007,6,4),Rt,Math.cos(X)*(U-.045),Math.sin(X)*(U-.045),.063,A)}}let K=d(new dt(.065,.1,.035),T==="classic"?o:p,0,T==="formula"?.16:.51,.045,A);for(let F=0;F<6;F++){let re=F*Math.PI/3,X=d(new Ye(.012,.012,.012,6),l,Math.cos(re)*.13,Math.sin(re)*.13,.099,A);X.rotation.x=Math.PI/2}}let pt=new b(1.3,1.48,0),tt=new b(.89,1.96,0),nn=tt.clone().sub(pt),ln=pt.clone().add(tt).multiplyScalar(.5),H=v(.12,nn.length(),.095,o,...ln.toArray());H.quaternion.setFromUnitVectors(new b(0,1,0),nn.normalize()),v(.075,H.geometry.parameters.height-.04,.1,h,...ln.toArray()).quaternion.copy(H.quaternion);let ft=-1.84,rt=1.99,Wn=.74,Tt=new je;Tt.position.set(ft,rt,0),n.add(Tt);let Ht=n.children.length;m(Wn,.51,o,ft,rt,0,"z"),m(.67,.54,h,ft,rt,0,"z");for(let T of[-1,1]){let A=T*.29;g(.72,.055,h,ft,rt,A),g(.75,.022,o,ft,rt,A+T*.03),g(.665,.012,p,ft,rt,A+T*.025);for(let U=0;U<14;U++){let K=U*Math.PI/7,F=[],re=[];for(let pe=0;pe<=16;pe++){let Xe=pe/16,fe=.22+Xe*.44,oe=K+.55*Xe;for(let ce of[-.15,.15])F.push(ft+Math.sin(oe+ce)*fe,rt+Math.cos(oe+ce)*fe,A+T*(.018+Math.sin(Xe*Math.PI)*.12))}for(let pe=0;pe<16;pe++){let Xe=pe*2;re.push(Xe,Xe+1,Xe+2,Xe+1,Xe+3,Xe+2)}let X=new ut;X.setAttribute("position",new Ie(F,3)),X.setIndex(re),X.computeVertexNormals(),f.side=Dt,d(X,f);let ie=new Mt(Array.from({length:17},(pe,Xe)=>{let fe=Xe/16,oe=.22+fe*.44,ce=K+.55*fe-.15;return new b(ft+Math.sin(ce)*oe,rt+Math.cos(ce)*oe,A+T*(.025+Math.sin(fe*Math.PI)*.12))}));d(new St(ie,20,.009,6,!1),p)}m(.215,.07,o,ft,rt,A+T*.085,"z"),m(.18,.085,h,ft,rt,A+T*.11,"z")}for(let T=0;T<12;T++){let A=T*Math.PI/6,U=v(.045,.15,.2,h,ft+Math.cos(A)*.735,rt+Math.sin(A)*.735,0);U.rotation.z=A}n.updateMatrixWorld(!0);for(let T of n.children.slice(Ht))Tt.attach(T);Tt.rotation.set(0,Math.PI/2,0),Tt.scale.set(.96/1.24,.96/.86,.96/.95);let at=Tt.clone(!0);n.add(at);let Zt=new je;Tt.add(Zt);let Nt=i("#829aaa",.92,.24);for(let T of[-.24,-.08,.08,.24])d(new yt(.765,.028,10,80),Nt,0,0,T,Zt);for(let T=0;T<8;T++){let A=T*Math.PI/4,U=d(new Ye(.025,.025,.025,6),Nt,Math.sin(A)*.73,Math.cos(A)*.73,.35,Zt);U.rotation.x=Math.PI/2}let Wt={classic:new je,dual:new je,titanium:new je},Kt=i("#a9b7c4",.92,.23),Ft=i("#668bb5",.88,.25);Object.values(Wt).forEach(T=>n.add(T));for(let[T,A]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let U of A){let K=T==="titanium"?Ft:Kt,F=d(new Ye(.105,.105,.5,32),K,-2.42,.76,U,Wt[T]);F.rotation.z=Math.PI/2;let re=d(new Ye(.079,.079,.012,32),h,-2.678,.76,U,Wt[T]);re.rotation.z=Math.PI/2;let X=d(new yt(.094,.012,8,32),K,-2.69,.76,U,Wt[T]);X.rotation.y=Math.PI/2}for(let[T,A]of Object.entries(Wt)){let U=T==="classic"?[0]:[-.67,.67];for(let F of U){let re=d(new Ye(.18,.18,.52,40),Kt,-2.19,.76,F,A);re.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let ie=d(new yt(.184,.016,8,40),h,X,.76,F,A);ie.rotation.y=Math.PI/2,d(new dt(.07,.19,.07),Kt,X,.94,F,A)}}let K=T==="classic"?[0]:T==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let F of K){let re=d(new Ye(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,F,A);re.rotation.z=Math.PI/2;let X=d(new yt(.107,.018,10,40),T==="titanium"?Ft:Kt,-2.57,.76,F,A);if(X.rotation.y=Math.PI/2,T==="titanium")for(let[ie,pe]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let Xe=d(new yt(.106,.008,6,40),i(pe,.85,.3),ie,.76,F,A);Xe.rotation.y=Math.PI/2}}}for(let T of[-1,1]){let A=new Mt([new b(-2.16,1.46,T*.65),new b(-1.94,1.66,T*.69),new b(-1.3,1.59,T*.64),new b(-.98,1.47,T*.7)]);d(new St(A,32,.022,8,!1),o),v(.34,.06,.14,o,-1.84,1.48,T*.4)}for(let T of[-1,1]){let A=new Mt([new b(-2.45,1.1,T*.7),new b(-2.43,1.36,T*.72),new b(-2.19,1.55,T*.7),new b(-1.9,1.55,T*.68)]);d(new St(A,40,.075,14,!1),h),d(new St(A,40,.019,10,!1),o);for(let U of[-2.2,-1.96]){let K=new Mt([new b(U,1.43,T*.48),new b(U,1.63,T*.6),new b(U+.24,1.57,T*.82)]);d(new St(K,24,.017,8,!1),o)}}let mn=n.children.length,xn=[],fn=[],li=[];for(let T=0;T<=48;T++){let A=-.92+T*1.84/48;for(let U of[.64,1.23])fn.push(2.57-.28*(Math.sin(A)*1.25/1.1)**2,U,Math.sin(A)*1.25)}for(let T=0;T<48;T++){let A=T*2;li.push(A,A+2,A+1,A+1,A+2,A+3)}let gn=new ut;gn.setAttribute("position",new Ie(fn,3)),gn.setIndex(li),gn.computeVertexNormals();let Xt=i("#00453f",.72,.14);Xt.clearcoat=1,Xt.side=Dt,d(gn,Xt);for(let T of[.635,1.225]){let A=Array.from({length:65},(U,K)=>{let F=-1.04+K*2.08/64;return new b(2.57-.28*(F/1.1)**2,T,F)});d(new St(new Mt(A),80,.034,12,!1),o)}for(let T of[-1,1]){let A=T*1,U=2.57-.28*(A/1.1)**2,K=new Mt([new b(U-.04,.635,A),new b(U+.05,.78,A),new b(U+.065,1.12,A),new b(U-.04,1.25,A)]);d(new St(K,32,.065,12,!1),o);for(let F of[.91,1.065]){let re=Array.from({length:16},(X,ie)=>{let pe=T*(.51+ie*.41/15);return new b(2.57-.28*(pe/1.1)**2+.018,F,pe)});xn.push(d(new St(new Mt(re),24,.017,8,!1),p))}}let Ui=[];for(let T=0;T<2;T++){let A=new bt(t.cardCanvas(e.cards,T));A.colorSpace=ht,A.anisotropy=16;let U=new zn({map:A,transparent:!0,toneMapped:!1});Ui.push(U);let K=1.65,F=T?.34:-.34,re=v(.47,.008,.63,i("#ddd9cf",0,.95),K,1.474+T*.003,F);re.rotation.y=-(T?-.08:.08);let X=d(new Yt(.5,.67),U,K,1.48+T*.003,F);X.rotation.x=-Math.PI/2,X.rotation.z=T?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}x.push(...n.children.slice(mn));let cn=new Ct({map:new bt(t.plateCanvas(e)),roughness:.6});for(let T of[-1,1]){let A=d(new Yt(.79,.463),cn,T*2.605,1.01,0);A.rotation.y=T*Math.PI/2,T>0&&x.push(A)}let Pt={},Bt=i("#7d8c98",.82,.28),gt=i("#202a32",.45,.38),R=i("#a7c6d5",.98,.055),j=i("#182029",.35,.48);j.bumpMap=Me("#888888",.2),j.bumpScale=.001;function Y(T,A,U,K,F,re,X,ie,pe){let Xe=new qt(_(T,A,K),{depth:U,bevelEnabled:!0,bevelSize:Math.min(.012,U*.2),bevelThickness:Math.min(.012,U*.2),bevelSegments:3,curveSegments:12});return Xe.translate(0,0,-U/2),d(Xe,F,re,X,ie,pe)}function se(T,A,U,K){return d(new St(new Mt(T.map(F=>new b(...F))),40,A,12,!1),U,0,0,0,K)}function ne(T,A,U,K){let F=d(new Ye(.014,.014,.014,6),Bt,T,A,U,K);F.rotation.x=Math.PI/2}function xe(T,A,U,K,F,re){let X=new Qt;X.moveTo(-K*.5,0),X.bezierCurveTo(-K*.52,.055,-K*.12,.07,K*.5,.008),X.quadraticCurveTo(K*.05,-.025,-K*.5,0);let ie=new qt(X,{depth:U,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});ie.translate(0,0,-U/2);let pe=d(ie,F,T,A,0,re);return pe.rotation.z=-.08,pe}for(let T of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Pt[T]={};for(let A of T==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let U=new je;n.add(U),Pt[T][A]=U;let K=["sport","aero"].includes(A)?j:Bt;if(T==="spoiler"){let F=A==="lip"?1.43:A==="sport"?1.78:2.08,re=A==="gt"||A==="double"?1.98:1.72,X=-2.39;for(let ie of[-.62,.62]){if(Y(.25,.055,.22,.045,gt,-2.24,1.31,ie,U),A!=="lip"){let pe=Y(.15,F-1.32,.065,.035,gt,-2.32,(F+1.32)/2,ie,U);pe.rotation.z=-.19}for(let pe of[-.065,.065]){let Xe=d(new Ye(.012,.012,.015,6),Bt,-2.24,1.35,ie+pe,U)}}if(xe(X,F,re,A==="lip"?.22:.36,K,U),A!=="lip")for(let ie of[-1,1]){let pe=Y(.43,.19,.025,.055,K,X,F+.055,ie*re/2,U);pe.rotation.z=-.12,ne(X-.1,F+.045,ie*(re/2+.02),U),ne(X+.1,F+.045,ie*(re/2+.02),U)}if(A==="double"){xe(X+.025,F+.24,re*.94,.27,j,U);for(let ie of[-1,1])Y(.08,.28,.025,.02,gt,X,F+.13,ie*re*.47,U)}continue}if(T==="mirrors")for(let F of[-1,1]){let re=A==="aero",X=re?1.77:1.86,ie=F*(re?1.47:1.53),pe=.77;Y(.18,.08,.15,.035,gt,.64,1.46,F*1.19,U),se([[.64,1.47,F*1.19],[.62,1.62,F*1.32],[pe,X-.07,ie]],re?.023:.029,K,U);let Xe=d(new on(.046,16,12),gt,pe,X-.065,ie,U);if(A==="round"){d(new on(1,32,20),Bt,pe,X,ie,U).scale.set(.065,.15,.15);let oe=d(new Gn(.13,48),R,pe-.056,X,ie,U);oe.rotation.y=-Math.PI/2,oe.castShadow=!1;let ce=d(new yt(.136,.009,8,48),Bt,pe-.06,X,ie,U);ce.rotation.y=Math.PI/2}else{let fe=re?.31:A==="sport"?.35:.38,oe=re?.16:.22,ce=Y(fe,oe,.095,.065,A==="club"?gt:j,pe,X,ie,U);ce.rotation.y=Math.PI/2;let be=d(new Wi(_(fe-.045,oe-.035,.05)),R,pe-.061,X,ie,U);be.rotation.y=-Math.PI/2,be.castShadow=!1,be.receiveShadow=!1;let Je=_(fe-.028,oe-.018,.055).getPoints(24).map(we=>[pe-.058,X+we.y,ie+we.x]);Je.push(Je[0]),se(Je,.006,Bt,U)}}else if(T==="sideSkirts")for(let F of[-1,1]){let re=Y(2.3,A==="aero"?.17:.12,A==="rally"?.27:.13,.05,K,0,.59,F*1.24,U);if(A==="rally")for(let X of[-.84,-.42,0,.42,.84]){let ie=Y(.13,.018,.25,.018,gt,X,.67,F*1.24,U)}else se([[-1.08,.54,F*1.3],[0,.53,F*1.32],[1.08,.54,F*1.3]],.009,p,U);for(let X of[-.87,.87])Y(.12,.14,.16,.025,gt,X,.65,F*1.2,U),ne(X,.61,F*1.33,U);if(A==="aero")for(let X of[-.95,.95]){let ie=Y(.24,.12,.025,.025,j,X,.57,F*1.35,U);ie.rotation.z=X>0?.2:-.2}}else{let F=T==="frontBumper"?1:-1,re=[[F*2.26,.66,-.92],[F*2.58,.65,-.7],[F*2.67,.65,0],[F*2.58,.65,.7],[F*2.26,.66,.92]];se(re,A==="sport"?.061:.047,K,U);for(let X of[-.67,.67]){se([[F*2.31,.74,X],[F*2.5,.68,X]],.032,gt,U);let ie=Y(.16,.12,.13,.035,gt,F*2.51,.67,X,U)}if(A==="aero"){let X=Y(.38,.045,1.94,.07,j,F*2.48,.5,0,U);for(let ie of[-.7,-.27,.27,.7])Y(.27,.12,.022,.025,gt,F*2.48,.55,ie,U);se([[F*2.4,.52,-.91],[F*2.64,.52,0],[F*2.4,.52,.91]],.008,Bt,U)}if(A==="rally")for(let X of[-.72,.72])se([[F*2.53,.65,X-.14],[F*2.56,.94,X-.14],[F*2.55,1.04,X],[F*2.56,.94,X+.14],[F*2.53,.65,X+.14]],.036,Bt,U);if(A==="sport")for(let X of[-.67,.67]){let ie=Y(.2,.13,.14,.045,gt,F*2.56,.66,X,U)}if(T==="rearBumper"&&A==="aero")for(let X of[-.7,-.35,0,.35,.7]){let ie=Y(.27,.15,.025,.025,j,-2.46,.48,X,U);ie.rotation.z=.12}}}}let Fe=i("#b9e4f5",.28,.17);Fe.emissive.set("#b9e4f5"),Fe.emissiveIntensity=1.8;let Be=i("#ffdda0",.2,.2);Be.emissive.set("#ffe0a8"),Be.emissiveIntensity=1.25;for(let T of["frontBumper","rearBumper"])for(let[A,U,K]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let F=new je;n.add(F),Pt[T][A]=F;let re=T==="frontBumper"?1:-1,X=A==="trackGT"?.34:.29,ie=.59,pe=_(U,X,.1);for(let[we,Re]of[[0,.94],[-.79,.32],[.79,.32]]){let Ne=_(Re,.115,.045,bn);pe.holes.push(new bn(Ne.getPoints(24).map(vt=>new de(vt.x+we,vt.y))))}let Xe=new qt(pe,{depth:K,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),fe=Xe.attributes.position;for(let we=0;we<fe.count;we++){let Re=fe.getX(we),Ne=fe.getY(we),vt=fe.getZ(we);fe.setXYZ(we,re*(2.43+vt-.24*(Re/(U/2))**2),ie+Ne,Re)}Xe.computeVertexNormals(),d(Xe,s,0,0,0,F);for(let[we,Re]of[[0,.94],[-.79,.32],[.79,.32]]){let Ne=re*(2.43-.24*(we/(U/2))**2);Y(.025,.14,Re+.02,.04,h,Ne,ie,we,F);for(let vt of[-.032,.012,.045])Y(.012,.006,Re-.035,.003,gt,Ne+re*.022,ie+vt,we,F)}let oe=Array.from({length:41},(we,Re)=>{let Ne=-U/2+Re*U/40;return[re*(2.44+K+.045-.24*(Ne/(U/2))**2),ie-X/2-.025,Ne]});se(oe,A==="trackGT"?.028:.019,j,F);let ce=new ut,be=[],Je=[];for(let[we,Re,Ne]of oe)be.push(we,Re,Ne,we-re*.17,Re+.005,Ne);for(let we=0;we<40;we++){let Re=we*2;Je.push(Re,Re+1,Re+2,Re+1,Re+3,Re+2)}if(ce.setAttribute("position",new Ie(be,3)),ce.setIndex(Je),ce.computeVertexNormals(),d(ce,j,0,0,0,F),T==="rearBumper")for(let we=0;we<(A==="trackGT"?5:3);we++){let Re=(we-(A==="trackGT"?2:1))*.3,Ne=Y(.24,.075,.014,.008,j,-2.48,ie-X/2-.035,Re,F);Ne.rotation.z=-.12}else if(A==="trackGT")for(let we of[-.92,.92]){let Re=Y(.18,.05,.018,.008,j,2.43,ie-X/2,we,F);Re.rotation.z=.08}}for(let T of["formula","formulaPro","formulaElite"]){let A=Au(T,{paint:s,carbon:j,metal:Bt,accent:o});n.add(A),Pt.frontBumper[T]=A}for(let T of["rearBumper","sideSkirts","spoiler"])for(let A of["formula","formulaPro"]){let U=new je;U.name=T+"-"+A,n.add(U),Pt[T][A]=U;let K=A==="formulaPro";if(T==="rearBumper"){Y(.48,.16,K?2.3:2.05,.03,j,-2.47,.45,0,U);for(let F=-3;F<=3;F++){let re=Y(.64,.23,.025,.01,j,-2.48,.44,F*.3,U);re.rotation.z=-.15}for(let F of[-1,1])se([[-2.2,.54,F*1],[-2.65,.62,F*1.1]],.025,s,U)}else if(T==="sideSkirts")for(let F of[-1,1]){let re=Y(2.35,K?.42:.33,.34,.08,s,-.15,.83,F*1.3,U);re.rotation.z=-.045,Y(2.65,.055,.48,.025,j,-.06,.58,F*1.3,U),Y(.07,.21,.24,.035,h,.96,.87,F*1.3,U);for(let X=0;X<(K?3:1);X++)Y(.35,.11,.025,.01,j,.48-X*.32,.65,F*1.53,U)}else{let F=K?2.3:2.02,re=K?2.36:2.16;for(let X of[-1,1])Y(.1,F-.82,.09,.025,j,-2.23,(F+.82)/2,X*.42,U),Y(.54,.49,.035,.03,s,-2.28,F-.04,X*re/2,U);xe(-2.26,F,re,.56,j,U),xe(-2.36,F-.18,re,.33,s,U),K&&xe(-2.39,F-.31,re,.24,j,U)}}Pt.headlights={};for(let T of["round","projector","rally","matrix"]){let A=new je;n.add(A),Pt.headlights[T]=A;for(let U of[-1,1]){let K=U*.74,F=2.57-.28*(K/1.1)**2+.07,re=1.075;if(T==="matrix"){let X=Y(.4,.2,.075,.045,gt,F,re,K,A);X.rotation.y=Math.PI/2;let ie=Y(.35,.15,.01,.035,h,F+.05,re,K,A);ie.rotation.y=Math.PI/2;for(let pe=0;pe<4;pe++){let Xe=Y(.06,.1,.012,.017,Fe,F+.065,re,K-.128+pe*.085,A);Xe.rotation.y=Math.PI/2,Xe.castShadow=!1}}else{let X=T==="rally"?.16:T==="round"?.14:.135,ie=d(new Ye(X+.027,X+.02,.095,48),gt,F,re,K,A);ie.rotation.z=Math.PI/2;let pe=d(new yt(X+.008,.01,10,48),Bt,F+.054,re,K,A);pe.rotation.y=Math.PI/2;let Xe=d(new on(1,32,20),T==="round"||T==="rally"?Be:Fe,F+.055,re,K,A);if(Xe.scale.set(.025,X,X),Xe.castShadow=!1,T==="projector"){let fe=d(new yt(X*.8,.008,8,48),Fe,F+.076,re,K,A);fe.rotation.y=Math.PI/2,d(new on(1,24,16),R,F+.081,re,K,A).scale.set(.022,X*.53,X*.53)}if(T==="rally")for(let fe of[-.07,0,.07]){let oe=Math.sqrt(X*X-fe*fe);se([[F+.09,re-oe,K+fe],[F+.1,re,K+fe],[F+.09,re+oe,K+fe]],.009,gt,A)}}}}for(let[T,A]of Object.entries(t.streetHeadlights)){let U=new je;n.add(U),Pt.headlights[T]=U;let K=i(A.color,.12,.22);K.emissive.set(A.color),K.emissiveIntensity=A.smoke?.35:1.1;let F=i(A.smoke?"#1c3348":"#83b6d5",.45,.12);for(let re of[-1,1]){let X=re*.72,ie=2.57-.28*(X/1.1)**2+.07,pe=1.075;if(A.shape==="sportHousing"){let oe=new Qt;oe.moveTo(-.29,.12),oe.lineTo(.23,.09),oe.quadraticCurveTo(.32,.02,.26,-.13),oe.lineTo(-.25,-.14),oe.closePath();let ce=d(new qt(oe,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),gt,ie+.02,pe,X,U);ce.rotation.y=Math.PI/2;for(let be=0;be<2;be++){let Je=X+(be-.5)*.24;if(d(new on(1,24,16),F,ie+.13,pe,Je,U).scale.set(.022,.067,.067),A.signature==="rings"){let Re=d(new yt(.086,.01,10,48),K,ie+.155,pe,Je,U);Re.rotation.y=Math.PI/2}if(A.signature==="doubleL"&&se([[ie+.155,pe+.075,Je-.085],[ie+.155,pe-.075,Je-.085],[ie+.155,pe-.075,Je+.075]],.012,K,U),A.signature==="pixels")for(let Re=0;Re<3;Re++)d(new dt(.014,.026,.026),K,ie+.155,pe+.09,Je-.055+Re*.055,U)}A.signature==="arc"&&se([[ie+.155,pe-.09,X-.25],[ie+.155,pe+.1,X-.25],[ie+.155,pe+.12,X],[ie+.155,pe+.07,X+.25]],.012,K,U);continue}let Xe=Y(.47,.25,.1,.04,gt,ie,pe,X,U);Xe.rotation.y=Math.PI/2;for(let oe of[-.18,.18]){d(new dt(.1,.07,.035),Bt,ie-.035,pe-.15,X+oe,U);let ce=d(new Ye(.012,.012,.018,12),o,ie+.02,pe-.13,X+oe,U);ce.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(A.shape)){let oe=A.shape==="doubleU"?2:1;for(let ce=0;ce<oe;ce++){let be=X+(ce-(oe-1)/2)*.21;if(d(new on(1,24,16),F,ie+.073,pe,be,U).scale.set(.019,.067,.067),A.shape==="doubleU")se([[ie+.1,pe+.075,be-.08],[ie+.1,pe-.04,be-.08],[ie+.1,pe-.08,be-.045],[ie+.1,pe-.08,be+.045],[ie+.1,pe-.04,be+.08],[ie+.1,pe+.075,be+.08]],.01,K,U);else if(A.shape==="brow"){se([[ie+.1,pe+.055,be-.19],[ie+.1,pe+.093,be-.14],[ie+.1,pe+.093,be+.19]],.011,K,U);let we=d(new yt(.068,.006,8,32),K,ie+.095,pe-.015,be,U);we.rotation.y=Math.PI/2}else for(let we=0;we<3;we++){let Re=we*Math.PI*2/3-Math.PI/2;se([[ie+.102,pe+Math.sin(Re)*.025,be+Math.cos(Re)*.025],[ie+.102,pe+Math.sin(Re)*.1,be+Math.cos(Re)*.1]],.011,K,U)}}continue}if(A.shape==="bar"){for(let[oe,ce,be]of[[.035,.41,.025],[-.045,.33,.012]]){let Je=Y(ce,be,.014,.006,K,ie+.064,pe+oe,X,U);Je.rotation.y=Math.PI/2,Je.castShadow=!1}continue}if(A.shape==="square"){let oe=Y(.37,.17,.024,.015,K,ie+.065,pe,X,U);oe.rotation.y=Math.PI/2;for(let ce=0;ce<7;ce++)d(new dt(.006,.16,.004),F,ie+.082,pe,X-.15+ce*.05,U);continue}let fe=A.count===3?.062:A.count===2?.087:.106;for(let oe=0;oe<A.count;oe++){let ce=X+(oe-(A.count-1)/2)*(A.count===3?.14:.205),be=d(new Ye(fe+.014,fe+.02,.09,A.shape==="hex"?6:40),h,ie+.035,pe,ce,U);be.rotation.z=Math.PI/2;let Je=d(new yt(fe,.009,8,A.shape==="hex"?6:48),K,ie+.09,pe,ce,U);Je.rotation.y=Math.PI/2,Je.castShadow=!1;let we=d(new on(1,24,16),A.projector?F:K,ie+.077,pe,ce,U);if(we.scale.set(.018,fe*.74,fe*.74),we.castShadow=!1,A.projector&&d(new on(1,16,12),K,ie+.092,pe,ce,U).scale.set(.006,fe*.31,fe*.31),A.cross||A.guard)for(let Re of[-1,1])se([[ie+.11,pe-fe*.74,ce-Re*fe*.74],[ie+.115,pe,ce],[ie+.11,pe+fe*.74,ce+Re*fe*.74]],.009,gt,U)}}}let We={};for(let T of["club","sport","rally","chrome"]){let A=[];We[T]=A;for(let{wheelGroup:U,sign:K}of E){let F=new je;U.add(F),A.push(F);let re=T==="rally"?.91:.87,X=T==="rally"?.64:T==="sport"?.49:.57,ie=T==="sport"?1:1.23,pe=[],Xe=[];for(let be=0;be<=48;be++){let Je=-ie+be*ie*2/48;for(let we of[-X/2,X/2])pe.push(Math.sin(Je)*re,Math.cos(Je)*re,we)}for(let be=0;be<48;be++){let Je=be*2;Xe.push(Je,Je+1,Je+2,Je+1,Je+3,Je+2)}let fe=new ut;fe.setAttribute("position",new Ie(pe,3)),fe.setIndex(Xe),fe.computeVertexNormals();let ce=(T==="chrome"?Bt:T==="club"?s:j).clone();ce.side=Dt,d(fe,ce,0,0,0,F);for(let be of[-1,1]){let Je=Array.from({length:49},(we,Re)=>{let Ne=-ie+Re*ie*2/48;return[Math.sin(Ne)*re,Math.cos(Ne)*re,be*X/2]});se(Je,.012,T==="chrome"?Bt:gt,F)}for(let be of[-1,1])se([[0,0,-K*.28],[be*.28,.42,-K*.31],[be*.49,.68,-K*.31]],.022,gt,F),ne(be*.49,.68,-K*.32,F);if(T==="rally"){let be=Y(.13,.25,X*.9,.025,gt,-.83,.2,0,F)}F.userData.shell=ce}}Pt.windshield={};for(let[T,A,U,K]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let re=function(we,Re){let Ne=.92*(1-.13*Re),vt=1-we*we;return[1.97+.23*vt-A*.32*Re,1.5+A*Re*(.84+.16*vt),we*Ne]},F=new je;n.add(F),Pt.windshield[T]=F;let X=[],ie=[],pe=40,Xe=16;for(let we=0;we<=Xe;we++)for(let Re=0;Re<=pe;Re++)X.push(...re(-1+Re*2/pe,we/Xe));for(let we=0;we<Xe;we++)for(let Re=0;Re<pe;Re++){let Ne=we*(pe+1)+Re;ie.push(Ne,Ne+1,Ne+pe+1,Ne+1,Ne+pe+2,Ne+pe+1)}let fe=new ut;fe.setAttribute("position",new Ie(X,3)),fe.setIndex(ie),fe.computeVertexNormals();let oe=new yn({color:U,metalness:.05,roughness:.075,transparent:!0,opacity:K,depthWrite:!1,side:Dt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});F.userData.glass=oe,F.userData.originalTint={color:U,opacity:K};let ce=d(fe,oe,0,0,0,F);ce.castShadow=!1,ce.receiveShadow=!1,ce.renderOrder=3;let be=["smoke","highSmoke"].includes(T)?gt:Bt;for(let we of[0,1])se(Array.from({length:41},(Re,Ne)=>re(-1+Ne/20,we)),we===0?.017:.009,be,F);for(let we of[-1,1]){se(Array.from({length:17},(vt,kt)=>re(we,kt/16)),.011,be,F);let Re=re(we,0);Y(.19,.055,.14,.025,gt,Re[0],Re[1]-.025,Re[2],F);let Ne=d(new Ye(.013,.013,.018,6),Bt,Re[0]+.04,Re[1]+.014,Re[2],F)}let Je=new zn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let we of[-.77,-.69]){let Re=Array.from({length:13},(vt,kt)=>{let Vt=re(we,.18+kt*.058);return Vt[0]+=.004,Vt}),Ne=se(Re,.003,Je,F);Ne.castShadow=!1,Ne.receiveShadow=!1,Ne.renderOrder=4}}let Ze=new je;for(let T of n.children.slice())T.userData.groundWheel||Ze.add(T);n.add(Ze);let Qe=i("#b8c7d6",.72,.27),$e=new je,nt=[];n.add($e);for(let T of[-1.72,1.72])for(let A of[-1,1]){let U=new je;U.position.set(T,.52,A*1.12),$e.add(U);let K=Array.from({length:193},(oe,ce)=>{let be=ce/192,Je=be*Math.PI*14;return new b(Math.cos(Je)*.071,.055+be*.36,Math.sin(Je)*.071)}),F=d(new St(new Mt(K),192,.014,10,!1),Qe,0,0,0,U);d(new Ye(.039,.039,.23,24),gt,0,.14,0,U);let re=d(new Ye(.018,.018,.28,20),Bt,0,.34,0,U),X=new je;X.position.y=.47,U.add(X);for(let[oe,ce]of[[U,.04],[X,-.015]])d(new Ye(.095,.095,.026,32),Bt,0,ce,0,oe),d(new Ye(.068,.068,.018,24),gt,0,ce+.02,0,oe);d(new dt(.14,.075,.18),gt,0,.025,A*.035,U),d(new dt(.16,.075,.22),gt,0,0,-A*.075,X);let ie=new b(T,.56,A*1.12),pe=new b(T,.81,A*1.43),Xe=pe.clone().sub(ie);d(new Ye(.026,.026,Xe.length(),16),gt,...ie.clone().add(pe).multiplyScalar(.5).toArray(),$e).quaternion.setFromUnitVectors(new b(0,1,0),Xe.normalize()),nt.push({coil:F,rod:re,upper:X})}Pt.brakes={};for(let T of["stock","red","gold","ceramic"]){let A=new je;n.add(A),Pt.brakes[T]=A;for(let{wheelGroup:U,sign:K}of E){let F=oc(T);F.position.z=K*.165,K<0&&(F.rotation.y=Math.PI),U.add(F),A.userData.brakeAssemblies??=[],A.userData.brakeAssemblies.push(F)}}Pt.nitrous={};let wt=document.createElement("canvas");wt.width=512,wt.height=256;let mt=wt.getContext("2d");mt.fillStyle="#101923",mt.fillRect(0,0,512,256),mt.strokeStyle="#e8e1cc",mt.lineWidth=8,mt.strokeRect(10,10,492,236),mt.fillStyle="#f5f2e8",mt.textAlign="center",mt.font="italic bold 106px Arial",mt.fillText("N\u2082O",256,117),mt.font="bold 24px Arial",mt.fillText("NITROUS OXIDE",256,159),mt.fillStyle="#d9b36b",mt.font="bold 18px Arial",mt.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let T=0;T<42;T++)mt.fillRect(165+T*4,212,T%3+1,17);let Ot=new bt(wt);Ot.colorSpace=ht,Ot.anisotropy=8;let Et=document.createElement("canvas");Et.width=Et.height=128;let Ve=Et.getContext("2d");Ve.fillStyle="#eee9dc",Ve.fillRect(0,0,128,128),Ve.translate(64,64),Ve.strokeStyle="#17202a";for(let T=0;T<=20;T++){let A=-Math.PI*.8+T*Math.PI*1.6/20;Ve.lineWidth=T%5?2:4,Ve.beginPath(),Ve.moveTo(Math.sin(A)*43,-Math.cos(A)*43),Ve.lineTo(Math.sin(A)*(T%5?49:53),-Math.cos(A)*(T%5?49:53)),Ve.stroke()}Ve.fillStyle="#293541",Ve.textAlign="center",Ve.font="bold 14px Arial",Ve.fillText("PSI",0,30),Ve.strokeStyle="#c92737",Ve.lineWidth=4,Ve.beginPath(),Ve.moveTo(-9,12),Ve.lineTo(26,-31),Ve.stroke(),Ve.fillStyle="#25313a",Ve.beginPath(),Ve.arc(0,0,6,0,Math.PI*2),Ve.fill();let It=new bt(Et);It.colorSpace=ht;for(let T of["blue","twin","triple"]){let A=new je;A.name="nitrous-"+T,n.add(A),Pt.nitrous[T]=A;let U=i(t.item("nitrous",T).color,.65,.27),K=T==="triple"?3:T==="twin"?2:1,F=1.49,re=-1.3,X=.37,ie=i("#b4924f",.8,.3),pe=i("#a5b2bd",.85,.24),Xe=i("#1b2028",.08,.85),fe=i("#ab2635",.35,.4);for(let oe of[-1.52,-1.13]){Y(.095,.05,K*X+.04,.015,h,oe,1.29,0,A);for(let ce of[-1,1]){let be=ce*(K*X/2-.02);d(new Ye(.024,.024,.023,6),pe,oe,1.327,be,A)}}for(let oe=0;oe<K;oe++){let ce=(oe-(K-1)/2)*X,be=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Mn,Fn])=>new de(Mn,Fn)),Je=d(new yi(be,40),U,re,F,ce,A);Je.rotation.z=-Math.PI/2;for(let Mn of[-1.52,-1.13]){Y(.11,.095,.27,.025,Xe,Mn,1.35,ce,A);let Fn=d(new yt(.152,.013,8,40),pe,Mn,F,ce,A);Fn.rotation.y=Math.PI/2,Y(.08,.025,.055,.008,pe,Mn,F+.155,ce,A),d(new Ye(.013,.013,.018,6),h,Mn,F+.179,ce,A)}let we=[],Re=[],Ne=[];for(let Mn=0;Mn<2;Mn++)for(let Fn=0;Fn<=16;Fn++){let uc=-.91+Fn*1.82/16;if(we.push(re+(Mn?.12:-.12),F+Math.cos(uc)*.147,ce+Math.sin(uc)*.147),Re.push(Mn,Fn/16),Mn&&Fn){let nr=17+Fn;Ne.push(nr-18,nr-17,nr,nr-18,nr,nr-1)}}let vt=new ut;vt.setAttribute("position",new Ie(we,3)),vt.setAttribute("uv",new Ie(Re,2)),vt.setIndex(Ne),vt.computeVertexNormals();let kt=new yn({map:Ot,roughness:.55,metalness:.05,side:Dt});d(vt,kt,0,0,0,A);let Vt=d(new Ye(.046,.046,.055,24),ie,-.89,F,ce,A);Vt.rotation.z=Math.PI/2,Y(.075,.07,.065,.012,ie,-.845,F,ce,A),d(new Ye(.016,.016,.065,16),pe,-.845,F+.045,ce,A);let rn=d(new yt(.052,.012,8,24),fe,-.845,F+.092,ce,A);rn.rotation.x=Math.PI/2;for(let Mn of[0,Math.PI/3,Math.PI*2/3]){let Fn=Y(.106,.014,.014,.004,fe,-.845,F+.092,ce,A);Fn.rotation.y=Mn}let jt=new je;jt.position.set(-.84,F+.065,ce+.075),jt.rotation.x=-Math.PI*.32,A.add(jt);let Br=d(new Ye(.057,.057,.03,32),pe,0,0,0,jt);Br.rotation.x=Math.PI/2;let hc=d(new Gn(.047,32),new zn({map:It}),0,0,.017,jt),Rs=d(new Ye(.024,.024,.055,6),ie,-.79,F,ce,A);Rs.rotation.z=Math.PI/2,se([[-.76,F,ce],[-.7,F-.02,ce],[-.71,1.3,ce],[-.91,1.24,ce]],.014,Xe,A);let Pu=d(new Ye(.021,.021,.055,12),pe,-.74,F,ce,A);Pu.rotation.z=Math.PI/2}Y(.07,.07,K*X,.015,ie,-.91,1.24,0,A),se([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,Xe,A)}Pt.seat={};for(let T of["red","carbon","emerald","ivory"]){let A=cc(T);A.rotation.y=Math.PI/2,A.position.set(-.8,1,0),n.add(A),Pt.seat[T]=A}let $t=Eu(x);function st(T){let A=["formula","formulaPro","formulaElite"].includes(T.frontBumper);$t.set(A),he(T);let U=t.glassTints[T.glassTint]||t.glassTints.original;for(let oe of Object.values(Pt.windshield)){let ce=oe.userData.originalTint;oe.userData.glass.color.set(U.opacity===null?ce.color:U.color),oe.userData.glass.opacity=U.opacity??ce.opacity}let K={standard:1,large:1.15,max:1.25}[T.wheelSize]||1,F=(K-1)*(.715/.86),re={standard:1,wide:1.25,ultra:1.45}[T.tyreWidth]||1;for(let{wheelGroup:oe,sign:ce,tyres:be}of E){oe.scale.set(.88/1.24*K,.88/.86*K,re/.95),oe.position.y=.715/.86*K,oe.position.z=ce*(1.36+.25*(re-1));for(let[Je,we]of Object.entries(be))for(let Re of we)Re.visible=Je===(T.tyres||"standard")}let X=F+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[T.suspension]||0);for(let[oe,ce]of Object.entries(Pt))if(oe!=="brakes")for(let be of Object.values(ce))be.parent===n&&(be.userData.mountBaseY??=be.position.y,be.position.y=be.userData.mountBaseY+X);xn.forEach(oe=>oe.visible=!T.headlights||T.headlights==="classic");for(let[oe,ce]of Object.entries(We))for(let be of ce)be.visible=T.fenders===oe,oe==="club"&&be.userData.shell.color.set(t.item("paint",T.paint).color);Qe.color.set(t.item("suspension",T.suspension).color),Ze.position.y=X,$e.visible=X>0,nt.forEach(({coil:oe,rod:ce,upper:be})=>{oe.scale.y=1+X/.415,ce.scale.y=1+X/.28,ce.position.y=.34+X/2,be.position.y=.47+X});for(let[oe,ce]of Object.entries(Pt))for(let[be,Je]of Object.entries(ce))Je.visible=T[oe]===be;A&&Object.values(Pt.headlights).forEach(oe=>oe.visible=!1);for(let[oe,ce]of Object.entries(Pt.brakes))for(let be of ce.userData.brakeAssemblies||[])be.visible=(T.brakes||"stock")===oe;Object.entries(Ae).forEach(([oe,ce])=>ce.visible=oe===(T.steering||"classic")),Object.entries(Wt).forEach(([oe,ce])=>ce.visible=oe===(T.exhaust||"classic")),Zt.visible=T.turbine==="boost";let ie=["twin","twinBig"].includes(T.turbine),pe=T.turbine==="twinBig",Xe=pe?.9:ie?.52:T.turbine==="boost"?.96:.9;Tt.scale.set(Xe/1.24,Xe/.86,Xe/.95),Tt.position.set(ft,rt+(pe?.06:ie?-.2:-.04),ie?pe?-.7:-.44:0),at.visible=ie,at.scale.copy(Tt.scale),at.position.set(ft,rt+(pe?.06:-.2),pe?.7:.44);let fe=T.badges||[];if(W.forEach(oe=>oe.visible=!fe.length),G.forEach(oe=>oe.userData.plane.visible=!fe.length),B.forEach(({group:oe,mat:ce,back:be,n:Je})=>{let we=fe[Je];oe.visible=!!we;let Re=we+":"+(T.prizeTotal||0);if(!we||ce.userData.badge===Re)return;let Ne=new Qt,vt=.65/512,kt=(Vt,rn)=>[(Vt-256)*vt,(256-rn)*vt];if(we==="millionaire"||we==="day-hero")Ne.absarc(0,0,204*vt,0,Math.PI*2,!1);else if(we==="rating-top10"){for(let Vt=0;Vt<6;Vt++){let rn=Vt*Math.PI/3-Math.PI/2,jt=kt(256+Math.cos(rn)*215,256+Math.sin(rn)*215);Vt?Ne.lineTo(...jt):Ne.moveTo(...jt)}Ne.closePath()}else Ne.moveTo(...kt(80,88)),Ne.quadraticCurveTo(...kt(256,0),...kt(432,88)),Ne.lineTo(...kt(420,296)),Ne.quadraticCurveTo(...kt(390,400),...kt(256,465)),Ne.quadraticCurveTo(...kt(122,400),...kt(92,296)),Ne.closePath();be.geometry.dispose(),be.geometry=new qt(Ne,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),ce.map?.dispose(),ce.map=new bt(t.badgeCanvas(we,T)),ce.map.colorSpace=ht,ce.map.anisotropy=16,ce.emissive.set("#ffffff"),ce.emissiveMap=ce.map,ce.emissiveIntensity=.35,ce.userData.badge=Re,ce.needsUpdate=!0}),s.color.set(t.item("paint",T.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(T)),w!==T.wheels){for(let oe of J)oe.removeFromParent(),oe.geometry.dispose();J.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:oe,x:ce,out:be,sign:Je}of E)for(let we of t.wheelDesign(T.wheels)){let Re=new Mt(we.map(([vt,kt])=>new b(vt,kt,Je*(.25+.025*(1-Math.hypot(vt,kt)/.51))))),Ne=d(new St(Re,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[T.wheels]||(["fiveSpoke","legend"].includes(T.wheels)?.023:.009),8,!1),l,0,0,0,oe);J.push(Ne)}w=T.wheels}o.color.set(t.item("trim",T.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(T.trim)?.48:["cobalt","anodizedRed","champagne"].includes(T.trim)?.3:.135,o.metalness=.95,u.userData.style!==T.upholstery&&(u.map?.dispose(),u.map=new bt(t.upholsteryCanvas(T.upholstery)),u.map.colorSpace=ht,u.map.wrapS=u.map.wrapT=Yn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(T.upholstery)?.95:T.upholstery==="carbonWeave"?.28:.38,u.userData.style=T.upholstery,u.needsUpdate=!0),t.chipPalette(T.chips).forEach((oe,ce)=>{Se[ce].color.set(oe),Se[ce].roughness=T.chips==="ceramic"?.25:.55}),Z.forEach(oe=>oe.visible=T.chips!=="ceramic"),$.forEach(({mat:oe,n:ce})=>{oe.userData.style!==T.chips&&(oe.map?.dispose(),oe.map=new bt(t.chipCanvas(T.chips,ce)),oe.map.colorSpace=ht,oe.map.anisotropy=8,oe.userData.style=T.chips,oe.needsUpdate=!0)}),Ui.forEach((oe,ce)=>{oe.userData.style!==T.cards&&(oe.map?.dispose(),oe.map=new bt(t.cardCanvas(T.cards,ce)),oe.map.colorSpace=ht,oe.map.anisotropy=16,oe.userData.style=T.cards,oe.needsUpdate=!0)}),J.forEach(oe=>oe.visible=!0),Ee.forEach(oe=>oe.visible=!0),p.color.set(t.item("light",T.light).color),p.emissive.copy(p.color),f.color.copy(p.color).multiplyScalar(.075),f.emissive.copy(p.color),f.emissiveIntensity=.045,cn.userData.number!==T.number+T.region&&(cn.map?.dispose(),cn.map=new bt(t.plateCanvas(T)),cn.userData.number=T.number+T.region,cn.needsUpdate=!0)}for(let T of[-1,1])se([[-1.64,.43,T*.94],[0,.4,T*1.02],[1.66,.43,T*.94]],.027,p,Ze),se([[T*1.91,.43,-.66],[T*2.05,.43,0],[T*1.91,.43,.66]],.023,p,Ze);let et=new Cr(p.color,.45,2,2);et.position.set(-1.9,2,.48),Ze.add(et);let En=st;function tr(T){En(T),et.color.copy(p.color)}return tr(e),{car:n,update:tr}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Hn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ht,n.toneMapping=ri,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ba,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new _n,s=new zt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Un("#c6d9ef","#44311e",1.25));for(let[Q,he,Pe,ue,Me]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let ve=new wn(Q,he);ve.position.set(Pe,ue,Me),ve.castShadow=Q==="#fff0d0",ve.shadow.bias=-2e-4,ve.shadow.normalBias=.025,ve.shadow.mapSize.set(2048,2048),ve.shadow.camera.left=-5,ve.shadow.camera.right=5,ve.shadow.camera.top=5,ve.shadow.camera.bottom=-5,i.add(ve)}let a=new _n;a.background=new qe("#48505b");for(let[Q,he,Pe,ue,Me,ve]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let J=new ot(new dt(ue,Me,ve),new zn({color:"#ffffff"}));J.position.set(Q,he,Pe),a.add(J)}let o=new Fr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(Q=>{Q.geometry?.dispose(),Q.material?.dispose()}),o.dispose();let l=new ot(new Yt(30,30),new ys({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Xp(i,e),u=new dn({transparent:!0,depthWrite:!1,side:Dt,toneMapped:!1,uniforms:{color:{value:new qe(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),p=new ot(new Yt(7.5,4.5),u);p.rotation.x=-Math.PI/2,p.position.y=.014,p.renderOrder=1,i.add(p);let f=[];for(let Q of[-.9,.9]){let he=new Cr(u.uniforms.color.value,1.8,3,2);he.position.set(0,.32,Q),i.add(he),f.push(he)}let d=r.closest(".player-hall__room");t.night??=d?.dataset.theme==="midnight";function v(Q){t.night=!!Q;for(let he of i.children)he.isHemisphereLight&&(he.intensity=Q?.26:1.25),he.isDirectionalLight&&(he.userData.dayIntensity??=he.intensity,he.intensity=he.userData.dayIntensity*(Q?.13:1));i.environmentIntensity=Q?.24:1.5,u.uniforms.strength.value=Q?1.35:.95}v(t.night);let m=Q=>{d&&v(d.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",m);let g=Q=>{h.update(Q),u.uniforms.color.value.set(window.PokerGarage.item("light",Q.light).color),f.forEach(he=>he.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let _=!1,y=null,x=0,M=0,C=()=>{let Q=r.clientWidth,he=r.clientHeight;Q&&he&&(n.setSize(Q,he,!1),s.aspect=Q/he,s.updateProjectionMatrix())},D=new ResizeObserver(C);D.observe(r),C();let V=new Bn(1,1,{type:Di,depthBuffer:!0});V.samples=4;let L=new _n,I=new xi(-1,1,1,-1,0,1),N=new dn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:V.texture},stepSize:{value:new de}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),O=new ot(new Yt(2,2),N);L.add(O);function q(){let Q=n.getDrawingBufferSize(new de);(V.width!==Q.x||V.height!==Q.y)&&V.setSize(Q.x,Q.y),N.uniforms.stepSize.value.set(3/Q.x,3/Q.y),n.setRenderTarget(V),n.render(i,s),n.setRenderTarget(null),n.render(L,I)}let k=Q=>{Q.button&&Q.button!==0||(t.manual=!0,y={id:Q.pointerId,x:Q.clientX,y:Q.clientY},r.setPointerCapture(Q.pointerId),Q.preventDefault())},ee=Q=>{!y||y.id!==Q.pointerId||(t.yaw-=(Q.clientX-y.x)*.011,t.pitch=Ru(t.pitch+(Q.clientY-y.y)*.009,-.24,1.35),y.x=Q.clientX,y.y=Q.clientY,Q.preventDefault())},te=Q=>{y&&y.id===Q.pointerId&&(y=null,r.hasPointerCapture(Q.pointerId)&&r.releasePointerCapture(Q.pointerId))},ge=Q=>{let he={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};he[Q.key]&&(t.manual=!0,t.yaw+=he[Q.key][0],t.pitch=Ru(t.pitch+he[Q.key][1],-.24,1.35),Q.preventDefault())};r.addEventListener("keydown",ge),r.addEventListener("pointerdown",k),r.addEventListener("pointermove",ee),r.addEventListener("pointerup",te),r.addEventListener("pointercancel",te),r.addEventListener("lostpointercapture",te);function le(){if(_)return;_=!0,window.removeEventListener("poker-garage-lighting",m),cancelAnimationFrame(x),D.disconnect(),r.removeEventListener("keydown",ge),r.removeEventListener("pointerdown",k),r.removeEventListener("pointermove",ee),r.removeEventListener("pointerup",te),r.removeEventListener("pointercancel",te),r.removeEventListener("lostpointercapture",te);let Q=new Set,he=new Set,Pe=new Set;i.traverse(ue=>{ue.geometry&&Pe.add(ue.geometry),ue.material&&he.add(ue.material)}),he.forEach(ue=>{for(let Me of Object.values(ue))Me&&Me.isTexture&&Q.add(Me);ue.dispose()}),Q.forEach(ue=>ue.dispose()),Pe.forEach(ue=>ue.dispose()),c.dispose(),V.dispose(),N.dispose(),O.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function _e(Q){if(_)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){le();return}let he=M?Math.min(.05,(Q-M)/1e3):0;if(M=Q,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=he*.13);let Pe=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Pe,1.15+Math.sin(t.pitch)*Pe,Math.cos(t.yaw)*Math.cos(t.pitch)*Pe),s.lookAt(0,1.2,0),q(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}x=requestAnimationFrame(_e)}return t.snapshotOnly||(x=requestAnimationFrame(_e)),{update:g,setNight:v,dispose:le,state:t,snapshot(){let Q=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Q,1.15+Math.sin(t.pitch)*Q,Math.cos(t.yaw)*Math.cos(t.pitch)*Q),s.lookAt(0,1.2,0),q();let he=document.createElement("canvas");return he.width=n.domElement.width,he.height=n.domElement.height,he.getContext("2d").drawImage(n.domElement,0,0),he}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
