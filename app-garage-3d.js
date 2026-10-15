(()=>{var kc=0,Zo=1,Vc=2;var Jo=1,Fa=2,ni=3,Er=0,Nn=1,Bt=2,Di=0,vs=1,Ko=2,$o=3,Qo=4,Hc=5,Ar=100,Wc=101,Xc=102,jc=103,qc=104,Yc=200,Zc=201,Jc=202,Kc=203,$c=204,Qc=205,eh=206,th=207,nh=208,ih=209,rh=210,sh=211,ah=212,oh=213,lh=214,Oa=0,Ba=1,za=2,_s=3,Ga=4,ka=5,Va=6,Ha=7,ch=0,hh=1,uh=2,Mi=0,dh=1,ph=2,mh=3,ii=4,fh=5,gh=6,vh=7,Bo="attached",_h="detached",el=300,Cr=301,ji=302,Wa=303,Xa=304,ys=306,qn=1e3,mr=1001,ta=1002,ei=1003,yh=1004;var xs=1005;var ti=1006,ja=1007;var qi=1008;var ri=1009,tl=1010,nl=1011,Rr=1012,qa=1013,Yi=1014,kn=1015,Ui=1016,Ya=1017,Za=1018,Pr=1020,il=35902,rl=35899,xh=1021,Mh=1022,Vn=1023,Ms=1026,Ss=1027,Ja=1028,Ka=1029,Sh=1030,sl=1031;var al=1033,$a=33776,Qa=33777,eo=33778,to=33779,ol=35840,ll=35841,cl=35842,hl=35843,ul=36196,dl=37492,pl=37496,ml=37808,fl=37809,gl=37810,vl=37811,_l=37812,yl=37813,xl=37814,Ml=37815,Sl=37816,Tl=37817,bl=37818,wl=37819,El=37820,Al=37821,Cl=36492,Rl=36494,Pl=36495,Il=36283,Ll=36284,Dl=36285,Ul=36286;var jr=2300,na=2301,Qs=2302,zo=2400,Go=2401,ko=2402;var Th=3201;var bh=0,wh=1,Zi="",ct="srgb",Gi="srgb-linear",qr="linear",Et="srgb";var zi=7680;var Eh=512,Ah=513,Ch=514,Nl=515,Rh=516,Ph=517,Ih=518,Lh=519,Vo=35044;var Fl="300 es",gi=2e3,Yr=2001;var vi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ea=Math.PI/180,ia=180/Math.PI;function Ji(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(ln[255&r]+ln[r>>8&255]+ln[r>>16&255]+ln[r>>24&255]+"-"+ln[255&e]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[63&t|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[255&n]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function lt(r,e,t){return Math.max(e,Math.min(t,r))}function wu(r,e){return(r%e+e)%e}function ao(r,e,t){return(1-t)*r+t*e}function Nr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function xn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ue=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],p=s[a+2],v=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=f,e[t+2]=p,void(e[t+3]=v);if(u!==v||c!==d||l!==f||h!==p){let m=1-o,g=c*d+l*f+h*p+u*v,_=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let T=Math.sqrt(y),C=Math.atan2(T,g*_);m=Math.sin(m*C)/T,o=Math.sin(o*C)/T}let x=o*_;if(c=c*m+d*x,l=l*m+f*x,h=h*m+p*x,u=u*m+v*x,m===1-o){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*f-l*d,e[t+1]=c*p+h*d+l*u-o*f,e[t+2]=l*p+h*f+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),f=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oo.copy(this).projectOnVector(e),this.sub(oo)}reflect(e){return this.sub(oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},oo=new w,oc=new Pn,rt=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],m=i[3],g=i[6],_=i[1],y=i[4],x=i[7],T=i[2],C=i[5],O=i[8];return s[0]=a*v+o*_+c*T,s[3]=a*m+o*y+c*C,s[6]=a*g+o*x+c*O,s[1]=l*v+h*_+u*T,s[4]=l*m+h*y+u*C,s[7]=l*g+h*x+u*O,s[2]=d*v+f*_+p*T,s[5]=d*m+f*y+p*C,s[8]=d*g+f*x+p*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lo.makeScale(e,t)),this}rotate(e){return this.premultiply(lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lo=new rt;function Ol(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Zr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Dh(){let r=Zr("canvas");return r.style.display="block",r}var lc={};function fr(r){r in lc||(lc[r]=!0,console.warn(r))}function Uh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var cc=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hc=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eu(){let r={enabled:!0,workingColorSpace:Gi,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Et&&(i.r=fi(i.r),i.g=fi(i.g),i.b=fi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(i.r=pr(i.r),i.g=pr(i.g),i.b=pr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return fr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return fr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Gi]:{primaries:e,whitePoint:n,transfer:qr,toXYZ:cc,fromXYZ:hc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ct},outputColorSpaceConfig:{drawingBufferColorSpace:ct}},[ct]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:cc,fromXYZ:hc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ct}}}),r}var _t=Eu();function fi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function pr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var tr,ra=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{tr===void 0&&(tr=Zr("canvas")),tr.width=e.width,tr.height=e.height;let i=tr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=tr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Zr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*fi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*fi(t[n]/255)):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Au=0,gr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=Ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(co(i[a].image)):s.push(co(i[a]))}else s=co(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function co(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ra.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Cu=0,ho=new w,gn=class r extends vi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Ji(),this.name="",this.source=new gr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ho).x}get height(){return this.source.getSize(ho).y}get depth(){return this.source.getSize(ho).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==el)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qn:e.x=e.x-Math.floor(e.x);break;case mr:e.x=e.x<0?0:1;break;case ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case qn:e.y=e.y-Math.floor(e.y);break;case mr:e.y=e.y<0?0:1;break;case ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null,gn.DEFAULT_MAPPING=el,gn.DEFAULT_ANISOTROPY=1;var xt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(f+1)/2,T=(g+1)/2,C=(h+d)/4,O=(u+v)/4,W=(p+m)/4;return y>x&&y>T?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=C/n,s=O/n):x>T?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=C/i,s=W/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=O/s,i=W/s),this.set(n,i,s,t),this}let _=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},sa=class extends vi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new gn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ti,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new gr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends sa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Jr=class extends gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ei,this.minFilter=ei,this.wrapR=mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var aa=class extends gn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ei,this.minFilter=ei,this.wrapR=mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var In=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(s,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),As.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),As.copy(n.boundingBox)),As.applyMatrix4(e.matrixWorld),this.union(As)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),Cs.subVectors(this.max,Fr),nr.subVectors(e.a,Fr),ir.subVectors(e.b,Fr),rr.subVectors(e.c,Fr),Ti.subVectors(ir,nr),bi.subVectors(rr,ir),Ni.subVectors(nr,rr);let t=[0,-Ti.z,Ti.y,0,-bi.z,bi.y,0,-Ni.z,Ni.y,Ti.z,0,-Ti.x,bi.z,0,-bi.x,Ni.z,0,-Ni.x,-Ti.y,Ti.x,0,-bi.y,bi.x,0,-Ni.y,Ni.x,0];return!!uo(t,nr,ir,rr,Cs)&&(t=[1,0,0,0,1,0,0,0,1],!!uo(t,nr,ir,rr,Cs)&&(Rs.crossVectors(Ti,bi),t=[Rs.x,Rs.y,Rs.z],uo(t,nr,ir,rr,Cs)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Wn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new w,new w,new w,new w,new w,new w,new w,new w],Wn=new w,As=new In,nr=new w,ir=new w,rr=new w,Ti=new w,bi=new w,Ni=new w,Fr=new w,Cs=new w,Rs=new w,Fi=new w;function uo(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Fi.fromArray(r,s);let o=i.x*Math.abs(Fi.x)+i.y*Math.abs(Fi.y)+i.z*Math.abs(Fi.z),c=e.dot(Fi),l=t.dot(Fi),h=n.dot(Fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ru=new In,Or=new w,po=new w,Ln=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ru.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Or,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(po)),this.expandByPoint(Or.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},hi=new w,mo=new w,Ps=new w,wi=new w,fo=new w,Is=new w,go=new w,ki=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mo.copy(e).add(t).multiplyScalar(.5),Ps.copy(t).sub(e).normalize(),wi.copy(this.origin).sub(mo);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ps),o=wi.dot(this.direction),c=-wi.dot(Ps),l=wi.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(mo).addScaledVector(Ps,d),f}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),i=hi.dot(hi)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,i,s){fo.subVectors(t,e),Is.subVectors(n,e),go.crossVectors(fo,Is);let a,o=this.direction.dot(go);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}wi.subVectors(this.origin,e);let c=a*this.direction.dot(Is.crossVectors(wi,Is));if(c<0)return null;let l=a*this.direction.dot(fo.cross(wi));if(l<0||c+l>o)return null;let h=-a*wi.dot(go);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Je=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,f,p,v,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,f,p,v,m)}set(e,t,n,i,s,a,o,c,l,h,u,d,f,p,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/sr.setFromMatrixColumn(e,0).length(),s=1/sr.setFromMatrixColumn(e,1).length(),a=1/sr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,f=a*u,p=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+p*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=p+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,p=l*h,v=l*u;t[0]=d+v*o,t[4]=p*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,p=l*h,v=l*u;t[0]=d-v*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,p=o*h,v=o*u;t[0]=c*h,t[4]=p*l-f,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=f*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,p=o*c,v=o*l;t[0]=c*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*c,f=a*l,p=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pu,e,Iu)}lookAt(e,t,n){let i=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Ei.crossVectors(n,An),Ei.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Ei.crossVectors(n,An)),Ei.normalize(),Ls.crossVectors(An,Ei),i[0]=Ei.x,i[4]=Ls.x,i[8]=An.x,i[1]=Ei.y,i[5]=Ls.y,i[9]=An.y,i[2]=Ei.z,i[6]=Ls.z,i[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],m=n[10],g=n[14],_=n[3],y=n[7],x=n[11],T=n[15],C=i[0],O=i[4],W=i[8],D=i[12],L=i[1],z=i[5],N=i[9],j=i[13],V=i[2],te=i[6],ne=i[10],ge=i[14],ce=i[3],Te=i[7],Q=i[11],oe=i[15];return s[0]=a*C+o*L+c*V+l*ce,s[4]=a*O+o*z+c*te+l*Te,s[8]=a*W+o*N+c*ne+l*Q,s[12]=a*D+o*j+c*ge+l*oe,s[1]=h*C+u*L+d*V+f*ce,s[5]=h*O+u*z+d*te+f*Te,s[9]=h*W+u*N+d*ne+f*Q,s[13]=h*D+u*j+d*ge+f*oe,s[2]=p*C+v*L+m*V+g*ce,s[6]=p*O+v*z+m*te+g*Te,s[10]=p*W+v*N+m*ne+g*Q,s[14]=p*D+v*j+m*ge+g*oe,s[3]=_*C+y*L+x*V+T*ce,s[7]=_*O+y*z+x*te+T*Te,s[11]=_*W+y*N+x*ne+T*Q,s[15]=_*D+y*j+x*ge+T*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*f-n*c*f)+e[7]*(+t*c*f-t*l*d+s*a*d-i*a*f+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],m=e[14],g=e[15],_=u*m*l-v*d*l+v*c*f-o*m*f-u*c*g+o*d*g,y=p*d*l-h*m*l-p*c*f+a*m*f+h*c*g-a*d*g,x=h*v*l-p*u*l+p*o*f-a*v*f-h*o*g+a*u*g,T=p*u*c-h*v*c-p*o*d+a*v*d+h*o*m-a*u*m,C=t*_+n*y+i*x+s*T;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/C;return e[0]=_*O,e[1]=(v*d*s-u*m*s-v*i*f+n*m*f+u*i*g-n*d*g)*O,e[2]=(o*m*s-v*c*s+v*i*l-n*m*l-o*i*g+n*c*g)*O,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*f-n*c*f)*O,e[4]=y*O,e[5]=(h*m*s-p*d*s+p*i*f-t*m*f-h*i*g+t*d*g)*O,e[6]=(p*c*s-a*m*s-p*i*l+t*m*l+a*i*g-t*c*g)*O,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*f+t*c*f)*O,e[8]=x*O,e[9]=(p*u*s-h*v*s-p*n*f+t*v*f+h*n*g-t*u*g)*O,e[10]=(a*v*s-p*o*s+p*n*l-t*v*l-a*n*g+t*o*g)*O,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*f-t*o*f)*O,e[12]=T*O,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*m+t*u*m)*O,e[14]=(p*o*i-a*v*i-p*n*c+t*v*c+a*n*m-t*o*m)*O,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*O,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,p=s*u,v=a*h,m=a*u,g=o*u,_=c*l,y=c*h,x=c*u,T=n.x,C=n.y,O=n.z;return i[0]=(1-(v+g))*T,i[1]=(f+x)*T,i[2]=(p-y)*T,i[3]=0,i[4]=(f-x)*C,i[5]=(1-(d+g))*C,i[6]=(m+_)*C,i[7]=0,i[8]=(p+y)*O,i[9]=(m-_)*O,i[10]=(1-(d+v))*O,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=sr.set(i[0],i[1],i[2]).length(),a=sr.set(i[4],i[5],i[6]).length(),o=sr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Xn.copy(this);let c=1/s,l=1/a,h=1/o;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=l,Xn.elements[5]*=l,Xn.elements[6]*=l,Xn.elements[8]*=h,Xn.elements[9]*=h,Xn.elements[10]*=h,t.setFromRotationMatrix(Xn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,v;if(c)p=s/(a-s),v=a*s/(a-s);else if(o===gi)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==Yr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),v=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,v;if(c)p=1/(a-s),v=a/(a-s);else if(o===gi)p=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==Yr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),v=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},sr=new w,Xn=new Je,Pu=new w(0,0,0),Iu=new w(1,1,1),Ei=new w,Ls=new w,An=new w,uc=new Je,dc=new Pn,Yn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dc.setFromEuler(this),this.setFromQuaternion(dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Lu=0,pc=new w,ar=new Pn,ui=new Je,Ds=new w,Br=new w,Du=new w,Uu=new Pn,mc=new w(1,0,0),fc=new w(0,1,0),gc=new w(0,0,1),vc={type:"added"},Nu={type:"removed"},or={type:"childadded",child:null},vo={type:"childremoved",child:null},rn=class r extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=Ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new Yn,n=new Pn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Je},normalMatrix:{value:new rt}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.multiply(ar),this}rotateOnWorldAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.premultiply(ar),this}rotateX(e){return this.rotateOnAxis(mc,e)}rotateY(e){return this.rotateOnAxis(fc,e)}rotateZ(e){return this.rotateOnAxis(gc,e)}translateOnAxis(e,t){return pc.copy(e).applyQuaternion(this.quaternion),this.position.add(pc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mc,e)}translateY(e){return this.translateOnAxis(fc,e)}translateZ(e){return this.translateOnAxis(gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ds.copy(e):Ds.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Br,Ds,this.up):ui.lookAt(Ds,Br,this.up),this.quaternion.setFromRotationMatrix(ui),i&&(ui.extractRotation(i.matrixWorld),ar.setFromRotationMatrix(ui),this.quaternion.premultiply(ar.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vc),or.child=e,this.dispatchEvent(or),or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nu),vo.child=e,this.dispatchEvent(vo),vo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vc),or.child=e,this.dispatchEvent(or),or.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,e,Du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,Uu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};rn.DEFAULT_UP=new w(0,1,0),rn.DEFAULT_MATRIX_AUTO_UPDATE=!0,rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=new w,di=new w,_o=new w,pi=new w,lr=new w,cr=new w,_c=new w,yo=new w,xo=new w,Mo=new w,So=new xt,To=new xt,bo=new xt,mi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),jn.subVectors(e,t),i.cross(jn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){jn.subVectors(i,t),di.subVectors(n,t),_o.subVectors(e,t);let a=jn.dot(jn),o=jn.dot(di),c=jn.dot(_o),l=di.dot(di),h=di.dot(_o),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,pi)!==null&&pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return So.setScalar(0),To.setScalar(0),bo.setScalar(0),So.fromBufferAttribute(e,t),To.fromBufferAttribute(e,n),bo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(So,s.x),a.addScaledVector(To,s.y),a.addScaledVector(bo,s.z),a}static isFrontFacing(e,t,n,i){return jn.subVectors(n,t),di.subVectors(e,t),jn.cross(di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),.5*jn.cross(di).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;lr.subVectors(i,n),cr.subVectors(s,n),yo.subVectors(e,n);let c=lr.dot(yo),l=cr.dot(yo);if(c<=0&&l<=0)return t.copy(n);xo.subVectors(e,i);let h=lr.dot(xo),u=cr.dot(xo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(lr,a);Mo.subVectors(e,s);let f=lr.dot(Mo),p=cr.dot(Mo);if(p>=0&&f<=p)return t.copy(s);let v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(cr,o);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return _c.subVectors(s,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(_c,o);let g=1/(m+v+d);return a=v*g,o=d*g,t.copy(n).addScaledVector(lr,a).addScaledVector(cr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Us={h:0,s:0,l:0};function wo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=wu(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=wo(a,s,e+1/3),this.g=wo(a,s,e),this.b=wo(a,s,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){let n=Nh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return _t.workingToColorSpace(cn.copy(this),e),65536*Math.round(lt(255*cn.r,0,255))+256*Math.round(lt(255*cn.g,0,255))+Math.round(lt(255*cn.b,0,255))}getHexString(e=ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(cn.copy(this),t);let n=cn.r,i=cn.g,s=cn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=ct){_t.workingToColorSpace(cn.copy(this),e);let t=cn.r,n=cn.g,i=cn.b;return e!==ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Us);let n=ao(Ai.h,Us.h,t),i=ao(Ai.s,Us.s,t),s=ao(Ai.l,Us.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new Ye;Ye.NAMES=Nh;var Fu=0,_i=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Ji(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zn=class extends _i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Gp=Ou();function Ou(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var Zt=new w,Ns=new ue,Bu=0,Mn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vo,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ns.fromBufferAttribute(this,t),Ns.applyMatrix3(e),this.setXY(t,Ns.x,Ns.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=xn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=xn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=xn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xn(t,this.array),n=xn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=xn(t,this.array),n=xn(n,this.array),i=xn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=xn(t,this.array),n=xn(n,this.array),i=xn(i,this.array),s=xn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vo&&(e.usage=this.usage),e}};var Vi=class extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $r=class extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Pe=class extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}},zu=0,On=new Je,Eo=new rn,hr=new w,Cn=new In,zr=new In,en=new w,ht=class r extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ol(e)?$r:Vi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hr).negate(),this.translate(hr.x,hr.y,hr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];zr.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(Cn.min,zr.min),Cn.expandByPoint(en),en.addVectors(Cn.max,zr.max),Cn.expandByPoint(en)):(Cn.expandByPoint(zr.min),Cn.expandByPoint(zr.max))}Cn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)en.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(en));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)en.fromBufferAttribute(o,l),c&&(hr.fromBufferAttribute(e,l),en.add(hr)),i=Math.max(i,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let W=0;W<n.count;W++)o[W]=new w,c[W]=new w;let l=new w,h=new w,u=new w,d=new ue,f=new ue,p=new ue,v=new w,m=new w;function g(W,D,L){l.fromBufferAttribute(n,W),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,L),d.fromBufferAttribute(s,W),f.fromBufferAttribute(s,D),p.fromBufferAttribute(s,L),h.sub(l),u.sub(l),f.sub(d),p.sub(d);let z=1/(f.x*p.y-p.x*f.y);isFinite(z)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(z),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(z),o[W].add(v),o[D].add(v),o[L].add(v),c[W].add(m),c[D].add(m),c[L].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let W=0,D=_.length;W<D;++W){let L=_[W],z=L.start;for(let N=z,j=z+L.count;N<j;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let y=new w,x=new w,T=new w,C=new w;function O(W){T.fromBufferAttribute(i,W),C.copy(T);let D=o[W];y.copy(D),y.sub(T.multiplyScalar(T.dot(D))).normalize(),x.crossVectors(C,D);let L=x.dot(c[W])<0?-1:1;a.setXYZW(W,y.x,y.y,y.z,L)}for(let W=0,D=_.length;W<D;++W){let L=_[W],z=L.start;for(let N=z,j=z+L.count;N<j;N+=3)O(e.getX(N+0)),O(e.getX(N+1)),O(e.getX(N+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,p=0;for(let v=0,m=c.length;v<m;v++){f=o.isInterleavedBufferAttribute?c[v]*o.data.stride+o.offset:c[v]*h;for(let g=0;g<h;g++)d[p++]=l[f++]}return new Mn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},yc=new Je,Oi=new ki,Fs=new Ln,xc=new w,Os=new w,Bs=new w,zs=new w,Ao=new w,Gs=new w,Mc=new w,ks=new w,at=class extends rn{constructor(e=new ht,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Gs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Ao.fromBufferAttribute(u,e),a?Gs.addScaledVector(Ao,h):Gs.addScaledVector(Ao.sub(t),h))}t.add(Gs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),Fs.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(Fs,xc)===null||Oi.origin.distanceToSquared(xc)>(e.far-e.near)**2))return;yc.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(yc),n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Oi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let m=d[p],g=a[m.materialIndex];for(let _=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));_<y;_+=3)i=Vs(this,g,e,n,l,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);p<v;p+=3)i=Vs(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let m=d[p],g=a[m.materialIndex];for(let _=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));_<y;_+=3)i=Vs(this,g,e,n,l,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);p<v;p+=3)i=Vs(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function Vs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Os),r.getVertexPosition(c,Bs),r.getVertexPosition(l,zs);let h=(function(u,d,f,p,v,m,g,_){let y;if(y=d.side===1?p.intersectTriangle(g,m,v,!0,_):p.intersectTriangle(v,m,g,d.side===0,_),y===null)return null;ks.copy(_),ks.applyMatrix4(u.matrixWorld);let x=f.ray.origin.distanceTo(ks);return x<f.near||x>f.far?null:{distance:x,point:ks.clone(),object:u}})(r,e,t,n,Os,Bs,zs,Mc);if(h){let u=new w;mi.getBarycoord(Mc,Os,Bs,zs,u),i&&(h.uv=mi.getInterpolatedAttribute(i,o,c,l,u,new ue)),s&&(h.uv1=mi.getInterpolatedAttribute(s,o,c,l,u,new ue)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};mi.getNormal(Os,Bs,zs,d.normal),h.face=d,h.barycoord=u}return h}var ut=class r extends ht{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;function p(v,m,g,_,y,x,T,C,O,W,D){let L=x/O,z=T/W,N=x/2,j=T/2,V=C/2,te=O+1,ne=W+1,ge=0,ce=0,Te=new w;for(let Q=0;Q<ne;Q++){let oe=Q*z-j;for(let Ae=0;Ae<te;Ae++){let le=Ae*L-N;Te[v]=le*_,Te[m]=oe*y,Te[g]=V,l.push(Te.x,Te.y,Te.z),Te[v]=0,Te[m]=0,Te[g]=C>0?1:-1,h.push(Te.x,Te.y,Te.z),u.push(Ae/O),u.push(1-Q/W),ge+=1}}for(let Q=0;Q<W;Q++)for(let oe=0;oe<O;oe++){let Ae=d+oe+te*Q,le=d+oe+te*(Q+1),Me=d+(oe+1)+te*(Q+1),_e=d+(oe+1)+te*Q;c.push(Ae,le,_e),c.push(le,Me,_e),ce+=6}o.addGroup(f,ce,D),f+=ce,d+=ge}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Pe(l,3)),this.setAttribute("normal",new Pe(h,3)),this.setAttribute("uv",new Pe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ki(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function un(r){let e={};for(let t=0;t<r.length;t++){let n=Ki(r[t]);for(let i in n)e[i]=n[i]}return e}function Bl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Fh={clone:Ki,merge:un},hn=class extends _i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},vr=class extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ci=new w,Sc=new ue,Tc=new ue,Vt=class extends vr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*ia*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ea*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*ia*Math.atan(Math.tan(.5*ea*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Sc,Tc),t.subVectors(Tc,Sc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ea*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ur=-90,oa=class extends rn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Vt(ur,1,e,t);i.layers=this.layers,this.add(i);let s=new Vt(ur,1,e,t);s.layers=this.layers,this.add(s);let a=new Vt(ur,1,e,t);a.layers=this.layers,this.add(a);let o=new Vt(ur,1,e,t);o.layers=this.layers,this.add(o);let c=new Vt(ur,1,e,t);c.layers=this.layers,this.add(c);let l=new Vt(ur,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Yr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Qr=class extends gn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},la=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Qr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ut(5,5,5),s=new hn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new at(i,s),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=ti),new oa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},qe=class extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gu={type:"move"},_r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(l,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var vn=class extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var kp=new w;var Vp=new w,Hp=new w,Wp=new w,Xp=new ue,jp=new ue,qp=new Je,Yp=new w,Zp=new w,Jp=new w,Kp=new ue,$p=new ue,Qp=new ue;var em=new w,tm=new w;var bc=new w,wc=new xt,Ec=new xt,ku=new w,Ac=new Je,Hs=new w,Co=new Ln,Cc=new Je,Ro=new ki,es=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bo,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new In),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hs),this.boundingBox.expandByPoint(Hs)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hs),this.boundingSphere.expandByPoint(Hs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Co.copy(this.boundingSphere),Co.applyMatrix4(i),e.ray.intersectsSphere(Co)!==!1&&(Cc.copy(i).invert(),Ro.copy(e.ray).applyMatrix4(Cc),this.boundingBox!==null&&Ro.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Ro)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Bo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_h?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;wc.fromBufferAttribute(i.attributes.skinIndex,e),Ec.fromBufferAttribute(i.attributes.skinWeight,e),bc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Ec.getComponent(s);if(a!==0){let o=wc.getComponent(s);Ac.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(ku.copy(bc).applyMatrix4(Ac),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},yr=class extends rn{constructor(){super(),this.isBone=!0,this.type="Bone"}},ts=class extends gn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Rc=new Je,Vu=new Je,ns=class r{constructor(e=[],t=[]){this.uuid=Ji(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Vu;Rc.multiplyMatrices(o,t[s]),Rc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ts(t,e,e,Vn,kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new yr),this.bones.push(a),this.boneInverses.push(new Je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},is=class extends Mn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},dr=new Je,Pc=new Je,Ws=[],Ic=new In,Hu=new Je,Gr=new at,kr=new Ln,rs=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new is(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Hu)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new In),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),Ic.copy(e.boundingBox).applyMatrix4(dr),this.boundingBox.union(Ic)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),kr.copy(e.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),e.ray.intersectsSphere(kr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,dr),Pc.multiplyMatrices(n,dr),Gr.matrixWorld=Pc,Gr.raycast(e,Ws);for(let a=0,o=Ws.length;a<o;a++){let c=Ws[a];c.instanceId=s,c.object=this,t.push(c)}Ws.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new is(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ts(new Float32Array(i*this.count),i,this.count,Ja,kn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Po=new w,Wu=new w,Xu=new rt,$n=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Po.subVectors(n,t).cross(Wu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Po),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Xu.getNormalMatrix(e),i=this.coplanarPoint(Po).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new Ln,ju=new ue(.5,.5),Xs=new w,Ii=class{constructor(e=new $n,t=new $n,n=new $n,i=new $n,s=new $n,a=new $n){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],v=s[9],m=s[10],g=s[11],_=s[12],y=s[13],x=s[14],T=s[15];if(i[0].setComponents(l-a,f-h,g-p,T-_).normalize(),i[1].setComponents(l+a,f+h,g+p,T+_).normalize(),i[2].setComponents(l+o,f+u,g+v,T+y).normalize(),i[3].setComponents(l-o,f-u,g-v,T-y).normalize(),n)i[4].setComponents(c,d,m,x).normalize(),i[5].setComponents(l-c,f-d,g-m,T-x).normalize();else if(i[4].setComponents(l-c,f-d,g-m,T-x).normalize(),t===gi)i[5].setComponents(l+c,f+d,g+m,T+x).normalize();else{if(t!==Yr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,m,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=ju.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Xs.x=i.normal.x>0?e.max.x:e.min.x,Xs.y=i.normal.y>0?e.max.y:e.min.y,Xs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Jn=new Je,Kn=new Ii,ca=class r{constructor(){this.coordinateSystem=gi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Jn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(Jn,i.coordinateSystem,i.reversedDepth),Kn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Jn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(Jn,i.coordinateSystem,i.reversedDepth),Kn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Jn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(Jn,i.coordinateSystem,i.reversedDepth),Kn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Jn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(Jn,i.coordinateSystem,i.reversedDepth),Kn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Jn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(Jn,i.coordinateSystem,i.reversedDepth),Kn.containsPoint(e))return!0}return!1}clone(){return new r}};var Ho=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},nm=new Je,im=new Ye(1,1,1),rm=new Ii,sm=new ca,am=new In,om=new Ln,lm=new w,cm=new w,hm=new w,um=new Ho,dm=new at;var pm=new w,mm=new w,fm=new Je,gm=new ki,vm=new Ln,_m=new w,ym=new w;var xm=new w,Mm=new w;var Sm=new Je,Tm=new ki,bm=new Ln,wm=new w;var Tt=class extends gn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ss=class extends gn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Ms&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},as=class extends gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},xr=class r extends ht{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=2*n+s,v=i+1,m=new w,g=new w;for(let _=0;_<=p;_++){let y=0,x=0,T=0,C=0;if(_<=n){let D=_/n,L=D*Math.PI/2;x=-h-e*Math.cos(L),T=e*Math.sin(L),C=-e*Math.cos(L),y=D*u}else if(_<=n+s){let D=(_-n)/s;x=D*t-h,T=e,C=0,y=u+D*d}else{let D=(_-n-s)/n,L=D*Math.PI/2;x=h+e*Math.sin(L),T=e*Math.cos(L),C=e*Math.sin(L),y=u+d+D*u}let O=Math.max(0,Math.min(1,y/f)),W=0;_===0?W=.5/i:_===p&&(W=-.5/i);for(let D=0;D<=i;D++){let L=D/i,z=L*Math.PI*2,N=Math.sin(z),j=Math.cos(z);g.x=-T*j,g.y=x,g.z=T*N,o.push(g.x,g.y,g.z),m.set(-T*j,C,T*N),m.normalize(),c.push(m.x,m.y,m.z),l.push(L+W,O)}if(_>0){let D=(_-1)*v;for(let L=0;L<i;L++){let z=D+L,N=D+L+1,j=_*v+L,V=_*v+L+1;a.push(z,N,j),a.push(N,V,j)}}}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Gn=class r extends ht{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("normal",new Pe(o,3)),this.setAttribute("uv",new Pe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ze=class r extends ht{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],p=0,v=[],m=n/2,g=0;function _(y){let x=p,T=new ue,C=new w,O=0,W=y===!0?e:t,D=y===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,m*D,0),d.push(0,D,0),f.push(.5,.5),p++;let L=p;for(let z=0;z<=i;z++){let N=z/i*c+o,j=Math.cos(N),V=Math.sin(N);C.x=W*V,C.y=m*D,C.z=W*j,u.push(C.x,C.y,C.z),d.push(0,D,0),T.x=.5*j+.5,T.y=.5*V*D+.5,f.push(T.x,T.y),p++}for(let z=0;z<i;z++){let N=x+z,j=L+z;y===!0?h.push(j,j+1,N):h.push(j+1,j,N),O+=3}l.addGroup(g,O,y===!0?1:2),g+=O}(function(){let y=new w,x=new w,T=0,C=(t-e)/n;for(let O=0;O<=s;O++){let W=[],D=O/s,L=D*(t-e)+e;for(let z=0;z<=i;z++){let N=z/i,j=N*c+o,V=Math.sin(j),te=Math.cos(j);x.x=L*V,x.y=-D*n+m,x.z=L*te,u.push(x.x,x.y,x.z),y.set(V,C,te).normalize(),d.push(y.x,y.y,y.z),f.push(N,1-D),W.push(p++)}v.push(W)}for(let O=0;O<i;O++)for(let W=0;W<s;W++){let D=v[W][O],L=v[W+1][O],z=v[W+1][O+1],N=v[W][O+1];(e>0||W!==0)&&(h.push(D,L,N),T+=3),(t>0||W!==s-1)&&(h.push(L,z,N),T+=3)}l.addGroup(g,T,0),g+=T})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ha=class r extends Ze{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Li=class r extends ht{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(f,p,v,m){let g=m+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let x=f.clone().lerp(v,y/g),T=p.clone().lerp(v,y/g),C=g-y;for(let O=0;O<=C;O++)_[y][O]=O===0&&y===g?x:x.clone().lerp(T,O/C)}for(let y=0;y<g;y++)for(let x=0;x<2*(g-y)-1;x++){let T=Math.floor(x/2);x%2==0?(c(_[y][T+1]),c(_[y+1][T]),c(_[y][T])):(c(_[y][T+1]),c(_[y+1][T+1]),c(_[y+1][T]))}}function c(f){s.push(f.x,f.y,f.z)}function l(f,p){let v=3*f;p.x=e[v+0],p.y=e[v+1],p.z=e[v+2]}function h(f,p,v,m){m<0&&f.x===1&&(a[p]=f.x-1),v.x===0&&v.z===0&&(a[p]=m/2/Math.PI+.5)}function u(f){return Math.atan2(f.z,-f.x)}function d(f){return Math.atan2(-f.y,Math.sqrt(f.x*f.x+f.z*f.z))}(function(f){let p=new w,v=new w,m=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],v),l(t[g+2],m),o(p,v,m,f)})(i),(function(f){let p=new w;for(let v=0;v<s.length;v+=3)p.x=s[v+0],p.y=s[v+1],p.z=s[v+2],p.normalize().multiplyScalar(f),s[v+0]=p.x,s[v+1]=p.y,s[v+2]=p.z})(n),(function(){let f=new w;for(let p=0;p<s.length;p+=3){f.x=s[p+0],f.y=s[p+1],f.z=s[p+2];let v=u(f)/2/Math.PI+.5,m=d(f)/Math.PI+.5;a.push(v,1-m)}(function(){let p=new w,v=new w,m=new w,g=new w,_=new ue,y=new ue,x=new ue;for(let T=0,C=0;T<s.length;T+=9,C+=6){p.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),m.set(s[T+6],s[T+7],s[T+8]),_.set(a[C+0],a[C+1]),y.set(a[C+2],a[C+3]),x.set(a[C+4],a[C+5]),g.copy(p).add(v).add(m).divideScalar(3);let O=u(g);h(_,C+0,p,O),h(y,C+2,v,O),h(x,C+4,m,O)}})(),(function(){for(let p=0;p<a.length;p+=6){let v=a[p+0],m=a[p+2],g=a[p+4],_=Math.max(v,m,g),y=Math.min(v,m,g);_>.9&&y<.1&&(v<.2&&(a[p+0]+=1),m<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Pe(s,3)),this.setAttribute("normal",new Pe(s.slice(),3)),this.setAttribute("uv",new Pe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},ua=class r extends Li{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},js=new w,qs=new w,Io=new w,Ys=new mi,da=class extends ht{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(ea*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:v,b:m,c:g}=Ys;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Ys.getNormal(Io),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let y=(_+1)%3,x=u[_],T=u[y],C=Ys[h[_]],O=Ys[h[y]],W=`${x}_${T}`,D=`${T}_${x}`;D in d&&d[D]?(Io.dot(d[D].normal)<=s&&(f.push(C.x,C.y,C.z),f.push(O.x,O.y,O.z)),d[D]=null):W in d||(d[W]={index0:l[_],index1:l[y],normal:Io.clone()})}}for(let p in d)if(d[p]){let{index0:v,index1:m}=d[p];js.fromBufferAttribute(o,v),qs.fromBufferAttribute(o,m),f.push(js.x,js.y,js.z),f.push(qs.x,qs.y,qs.z)}this.setAttribute("position",new Pe(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ue:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new Je;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(lt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,p))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(lt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Mr=class extends Dn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},pa=class extends Mr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function zl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var Zs=new w,Lo=new zl,Do=new zl,Uo=new zl,bt=class extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(Zs.subVectors(i[0],i[1]).add(i[0]),o=Zs);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(Zs.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=Zs),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(c),f);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Lo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,v,m),Do.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,v,m),Uo.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,v,m)}else this.curveType==="catmullrom"&&(Lo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Do.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),Uo.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Lo.calc(h),Do.calc(h),Uo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Lc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Wr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Xr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var os=class extends Dn{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Xr(e,i.x,s.x,a.x,o.x),Xr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ma=class extends Dn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Xr(e,i.x,s.x,a.x,o.x),Xr(e,i.y,s.y,a.y,o.y),Xr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ls=class extends Dn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fa=class extends Dn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},cs=class extends Dn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Wr(e,i.x,s.x,a.x),Wr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hs=class extends Dn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Wr(e,i.x,s.x,a.x),Wr(e,i.y,s.y,a.y),Wr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},us=class extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Lc(o,c.x,l.x,h.x,u.x),Lc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ue().fromArray(i))}return this}},ga=Object.freeze({__proto__:null,ArcCurve:pa,CatmullRomCurve3:bt,CubicBezierCurve:os,CubicBezierCurve3:ma,EllipseCurve:Mr,LineCurve:ls,LineCurve3:fa,QuadraticBezierCurve:cs,QuadraticBezierCurve3:hs,SplineCurve:us}),va=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ga[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ga[i.type]().fromJSON(i))}return this}},Sn=class extends va{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ls(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new cs(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new os(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new us(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Mr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Jt=class extends Sn{constructor(e){super(e),this.uuid=Ji(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Sn().fromJSON(i))}return this}};function qu(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Dc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,f){let p=[];for(let v=0,m=u.length;v<m;v++){let g=Dc(h,u[v]*f,v<m-1?u[v+1]*f:h.length,f,!1);g===g.next&&(g.steiner=!0),p.push(td(g))}p.sort($u);for(let v=0;v<p.length;v++)d=Qu(p[v],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=r[d],p=r[d+1];f<o&&(o=f),p<c&&(c=p),f>h&&(h=f),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return ds(s,a,t,o,c,l,0),a}function Dc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Uc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Uc(a/n|0,r[a],r[a+1],s);return s&&Sr(s,s.next)&&(ms(s),s=s.next),s}function Hi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Sr(n,n.next)&&Ht(n.prev,n,n.next)!==0)n=n.next;else{if(ms(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ds(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Wo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(f){let p,v=1;do{let m,g=f;f=null;let _=null;for(p=0;g;){p++;let y=g,x=0;for(let C=0;C<v&&(x++,y=y.nextZ,y);C++);let T=v;for(;x>0||T>0&&y;)x!==0&&(T===0||!y||g.z<=y.z)?(m=g,g=g.nextZ,x--):(m=y,y=y.nextZ,T--),_?_.nextZ=m:f=m,m.prevZ=_,_=m;g=y}_.nextZ=null,v*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Zu(r,n,i,s):Yu(r))e.push(c.i,r.i,l.i),ms(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?ds(r=Ju(Hi(r),e),e,t,n,i,s,2):a===2&&Ku(r,e,t,n,i,s):ds(Hi(r),e,t,n,i,s,1);break}}}function Yu(r){let e=r.prev,t=r,n=r.next;if(Ht(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),f=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Hr(i,o,s,c,a,l,p.x,p.y)&&Ht(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Zu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Ht(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,f=Math.min(o,c,l),p=Math.min(h,u,d),v=Math.max(o,c,l),m=Math.max(h,u,d),g=Wo(f,p,e,t,n),_=Wo(v,m,e,t,n),y=r.prevZ,x=r.nextZ;for(;y&&y.z>=g&&x&&x.z<=_;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=m&&y!==i&&y!==a&&Hr(o,h,c,u,l,d,y.x,y.y)&&Ht(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=v&&x.y>=p&&x.y<=m&&x!==i&&x!==a&&Hr(o,h,c,u,l,d,x.x,x.y)&&Ht(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=g;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=m&&y!==i&&y!==a&&Hr(o,h,c,u,l,d,y.x,y.y)&&Ht(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=m&&x!==i&&x!==a&&Hr(o,h,c,u,l,d,x.x,x.y)&&Ht(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Ju(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Sr(n,i)&&Bh(n,t,t.next,i)&&ps(n,i)&&ps(i,n)&&(e.push(n.i,t.i,i.i),ms(t),ms(t.next),t=r=i),t=t.next}while(t!==r);return Hi(t)}function Ku(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&nd(a,o)){let c=zh(a,o);return a=Hi(a,a.next),c=Hi(c,c.next),ds(a,e,t,n,i,s,0),void ds(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function $u(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Qu(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Sr(i,a))return a;do{if(Sr(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let v=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,l=a.x<a.next.x?a:a.next,v===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,f=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Oh(c<f?o:h,c,d,f,c<f?h:o,c,a.x,a.y)){let v=Math.abs(c-a.y)/(o-a.x);ps(a,i)&&(v<p||v===p&&(a.x>l.x||a.x===l.x&&ed(l,a)))&&(l=a,p=v)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=zh(t,r);return Hi(n,n.next),Hi(t,t.next)}function ed(r,e){return Ht(r.prev,r,e.prev)<0&&Ht(e.next,r,r.next)<0}function Wo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function td(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Oh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Hr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Oh(r,e,t,n,i,s,a,o)}function nd(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&Bh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(ps(r,e)&&ps(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Ht(r.prev,r,e.prev)||Ht(r,e.prev,e))||Sr(r,e)&&Ht(r.prev,r,r.next)>0&&Ht(e.prev,e,e.next)>0)}function Ht(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Sr(r,e){return r.x===e.x&&r.y===e.y}function Bh(r,e,t,n){let i=Ks(Ht(r,e,t)),s=Ks(Ht(r,e,n)),a=Ks(Ht(t,n,r)),o=Ks(Ht(t,n,e));return i!==s&&a!==o||!(i!==0||!Js(r,t,e))||!(s!==0||!Js(r,n,e))||!(a!==0||!Js(t,r,n))||!(o!==0||!Js(t,e,n))}function Js(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ks(r){return r>0?1:r<0?-1:0}function ps(r,e){return Ht(r.prev,r,r.next)<0?Ht(r,e,r.next)>=0&&Ht(r,r.prev,e)>=0:Ht(r,e,r.prev)<0||Ht(r,r.next,e)<0}function zh(r,e){let t=Xo(r.i,r.x,r.y),n=Xo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Uc(r,e,t,n){let i=Xo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ms(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Xo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var jo=class{static triangulate(e,t,n=2){return qu(e,t,n)}},Qn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Nc(e),Fc(n,e);let a=e.length;t.forEach(Nc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Fc(n,t[c]);let o=jo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Nc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Fc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var jt=class r extends ht{constructor(e=new Jt([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:id,y,x,T,C,O,W=!1;g&&(y=g.getSpacedPoints(h),W=!0,d=!1,x=g.computeFrenetFrames(h,!1),T=new w,C=new w,O=new w),d||(m=0,f=0,p=0,v=0);let D=o.extractPoints(l),L=D.shape,z=D.holes;if(!Qn.isClockWise(L)){L=L.reverse();for(let B=0,S=z.length;B<S;B++){let P=z[B];Qn.isClockWise(P)&&(z[B]=P.reverse())}}function N(B){let S=10000000000000001e-36,P=B[0];for(let k=1;k<=B.length;k++){let F=k%B.length,ae=B[F],q=ae.x-P.x,J=ae.y-P.y,ve=q*q+J*J,Re=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(P.x),Math.abs(P.y));ve<=S*Re*Re?(B.splice(F,1),k--):P=ae}}N(L),z.forEach(N);let j=z.length,V=L;for(let B=0;B<j;B++){let S=z[B];L=L.concat(S)}function te(B,S,P){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),B.clone().addScaledVector(S,P)}let ne=L.length;function ge(B,S,P){let k,F,ae,q=B.x-S.x,J=B.y-S.y,ve=P.x-B.x,Re=P.y-B.y,Se=q*q+J*J,Fe=q*Re-J*ve;if(Math.abs(Fe)>Number.EPSILON){let Ge=Math.sqrt(Se),pe=Math.sqrt(ve*ve+Re*Re),Le=S.x-J/Ge,Ce=S.y+q/Ge,Ve=((P.x-Re/pe-Le)*Re-(P.y+ve/pe-Ce)*ve)/(q*Re-J*ve);k=Le+q*Ve-B.x,F=Ce+J*Ve-B.y;let be=k*k+F*F;if(be<=2)return new ue(k,F);ae=Math.sqrt(be/2)}else{let Ge=!1;q>Number.EPSILON?ve>Number.EPSILON&&(Ge=!0):q<-Number.EPSILON?ve<-Number.EPSILON&&(Ge=!0):Math.sign(J)===Math.sign(Re)&&(Ge=!0),Ge?(k=-J,F=q,ae=Math.sqrt(Se)):(k=q,F=J,ae=Math.sqrt(Se/2))}return new ue(k/ae,F/ae)}let ce=[];for(let B=0,S=V.length,P=S-1,k=B+1;B<S;B++,P++,k++)P===S&&(P=0),k===S&&(k=0),ce[B]=ge(V[B],V[P],V[k]);let Te=[],Q,oe,Ae=ce.concat();for(let B=0,S=j;B<S;B++){let P=z[B];Q=[];for(let k=0,F=P.length,ae=F-1,q=k+1;k<F;k++,ae++,q++)ae===F&&(ae=0),q===F&&(q=0),Q[k]=ge(P[k],P[ae],P[q]);Te.push(Q),Ae=Ae.concat(Q)}if(m===0)oe=Qn.triangulateShape(V,z);else{let B=[],S=[];for(let P=0;P<m;P++){let k=P/m,F=f*Math.cos(k*Math.PI/2),ae=p*Math.sin(k*Math.PI/2)+v;for(let q=0,J=V.length;q<J;q++){let ve=te(V[q],ce[q],ae);Y(ve.x,ve.y,-F),k===0&&B.push(ve)}for(let q=0,J=j;q<J;q++){let ve=z[q];Q=Te[q];let Re=[];for(let Se=0,Fe=ve.length;Se<Fe;Se++){let Ge=te(ve[Se],Q[Se],ae);Y(Ge.x,Ge.y,-F),k===0&&Re.push(Ge)}k===0&&S.push(Re)}}oe=Qn.triangulateShape(B,S)}let le=oe.length,Me=p+v;for(let B=0;B<ne;B++){let S=d?te(L[B],Ae[B],Me):L[B];W?(C.copy(x.normals[0]).multiplyScalar(S.x),T.copy(x.binormals[0]).multiplyScalar(S.y),O.copy(y[0]).add(C).add(T),Y(O.x,O.y,O.z)):Y(S.x,S.y,0)}for(let B=1;B<=h;B++)for(let S=0;S<ne;S++){let P=d?te(L[S],Ae[S],Me):L[S];W?(C.copy(x.normals[B]).multiplyScalar(P.x),T.copy(x.binormals[B]).multiplyScalar(P.y),O.copy(y[B]).add(C).add(T),Y(O.x,O.y,O.z)):Y(P.x,P.y,u/h*B)}for(let B=m-1;B>=0;B--){let S=B/m,P=f*Math.cos(S*Math.PI/2),k=p*Math.sin(S*Math.PI/2)+v;for(let F=0,ae=V.length;F<ae;F++){let q=te(V[F],ce[F],k);Y(q.x,q.y,u+P)}for(let F=0,ae=z.length;F<ae;F++){let q=z[F];Q=Te[F];for(let J=0,ve=q.length;J<ve;J++){let Re=te(q[J],Q[J],k);W?Y(Re.x,Re.y+y[h-1].y,y[h-1].x+P):Y(Re.x,Re.y,u+P)}}}function _e(B,S){let P=B.length;for(;--P>=0;){let k=P,F=P-1;F<0&&(F=B.length-1);for(let ae=0,q=h+2*m;ae<q;ae++){let J=ne*ae,ve=ne*(ae+1);A(S+k+J,S+F+J,S+F+ve,S+k+ve)}}}function Y(B,S,P){c.push(B),c.push(S),c.push(P)}function we(B,S,P){E(B),E(S),E(P);let k=i.length/3,F=_.generateTopUV(n,i,k-3,k-2,k-1);H(F[0]),H(F[1]),H(F[2])}function A(B,S,P,k){E(B),E(S),E(k),E(S),E(P),E(k);let F=i.length/3,ae=_.generateSideWallUV(n,i,F-6,F-3,F-2,F-1);H(ae[0]),H(ae[1]),H(ae[3]),H(ae[1]),H(ae[2]),H(ae[3])}function E(B){i.push(c[3*B+0]),i.push(c[3*B+1]),i.push(c[3*B+2])}function H(B){s.push(B.x),s.push(B.y)}(function(){let B=i.length/3;if(d){let S=0,P=ne*S;for(let k=0;k<le;k++){let F=oe[k];we(F[2]+P,F[1]+P,F[0]+P)}S=h+2*m,P=ne*S;for(let k=0;k<le;k++){let F=oe[k];we(F[0]+P,F[1]+P,F[2]+P)}}else{for(let S=0;S<le;S++){let P=oe[S];we(P[2],P[1],P[0])}for(let S=0;S<le;S++){let P=oe[S];we(P[0]+ne*h,P[1]+ne*h,P[2]+ne*h)}}n.addGroup(B,i.length/3-B,0)})(),(function(){let B=i.length/3,S=0;_e(V,S),S+=V.length;for(let P=0,k=z.length;P<k;P++){let F=z[P];_e(F,S),S+=F.length}n.addGroup(B,i.length/3-B,1)})()}this.setAttribute("position",new Pe(i,3)),this.setAttribute("uv",new Pe(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ga[i.type]().fromJSON(i)),new r(n,e.options)}},id={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ue(s,a),new ue(o,c),new ue(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],f=e[3*i+1],p=e[3*i+2],v=e[3*s],m=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ue(a,1-c),new ue(l,1-u),new ue(d,1-p),new ue(v,1-g)]:[new ue(o,1-c),new ue(h,1-u),new ue(f,1-p),new ue(m,1-g)]}},_a=class r extends Li{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yi=class r extends ht{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=lt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new ue,f=new w,p=new w,v=new w,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,f.x=1*g,f.y=-m,f.z=0*g,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,f.x=1*g,f.y=-m,f.z=0*g,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(p)}for(let _=0;_<=t;_++){let y=n+_*h*i,x=Math.sin(y),T=Math.cos(y);for(let C=0;C<=e.length-1;C++){u.x=e[C].x*x,u.y=e[C].y,u.z=e[C].x*T,a.push(u.x,u.y,u.z),d.x=_/t,d.y=C/(e.length-1),o.push(d.x,d.y);let O=c[3*C+0]*x,W=c[3*C+1],D=c[3*C+0]*T;l.push(O,W,D)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let x=y+_*e.length,T=x,C=x+e.length,O=x+e.length+1,W=x+1;s.push(T,C,W),s.push(O,W,C)}this.setIndex(s),this.setAttribute("position",new Pe(a,3)),this.setAttribute("uv",new Pe(o,2)),this.setAttribute("normal",new Pe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Tr=class r extends Li{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},qt=class r extends ht{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],p=[],v=[],m=[];for(let g=0;g<h;g++){let _=g*d-a;for(let y=0;y<l;y++){let x=y*u-s;p.push(x,-_,0),v.push(0,0,1),m.push(y/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,x=_+l*(g+1),T=_+1+l*(g+1),C=_+1+l*g;f.push(y,x,C),f.push(x,T,C)}this.setIndex(f),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(v,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},ya=class r extends ht{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),f=new w,p=new ue;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){let g=s+m/n*a;f.x=u*Math.cos(g),f.y=u*Math.sin(g),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){let m=v*(n+1);for(let g=0;g<n;g++){let _=g+m,y=_,x=_+n+1,T=_+n+2,C=_+1;o.push(y,x,C),o.push(x,T,C)}}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Wi=class r extends ht{constructor(e=new Jt([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;Qn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){let _=p[m];Qn.isClockWise(_)===!0&&(p[m]=_.reverse())}let v=Qn.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){let _=p[m];f=f.concat(_)}for(let m=0,g=f.length;m<g;m++){let _=f[m];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],y=_[0]+u,x=_[1]+u,T=_[2]+u;n.push(y,x,T),c+=3}}this.setIndex(n),this.setAttribute("position",new Pe(i,3)),this.setAttribute("normal",new Pe(s,3)),this.setAttribute("uv",new Pe(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},sn=class r extends ht{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,f=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){let _=[],y=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let C=T/t;u.x=-e*Math.cos(i+C*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+C*s)*Math.sin(a+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(C+x,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],x=h[g][_],T=h[g+1][_],C=h[g+1][_+1];(g!==0||a>0)&&f.push(y,x,C),(g!==n-1||c<Math.PI)&&f.push(x,T,C)}this.setIndex(f),this.setAttribute("position",new Pe(p,3)),this.setAttribute("normal",new Pe(v,3)),this.setAttribute("uv",new Pe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},xa=class r extends Li{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},yt=class r extends ht{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){let v=p/i*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){let v=(i+1)*f+p-1,m=(i+1)*(f-1)+p-1,g=(i+1)*(f-1)+p,_=(i+1)*f+p;a.push(v,m,_),a.push(m,g,_)}this.setIndex(a),this.setAttribute("position",new Pe(o,3)),this.setAttribute("normal",new Pe(c,3)),this.setAttribute("uv",new Pe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Ma=class r extends ht{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,f=new w,p=new w,v=new w,m=new w,g=new w;for(let y=0;y<=n;++y){let x=y/n*s*Math.PI*2;_(x,s,a,e,f),_(x+.01,s,a,e,p),m.subVectors(p,f),g.addVectors(p,f),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize();for(let T=0;T<=i;++T){let C=T/i*Math.PI*2,O=-t*Math.cos(C),W=t*Math.sin(C);u.x=f.x+(O*g.x+W*v.x),u.y=f.y+(O*g.y+W*v.y),u.z=f.z+(O*g.z+W*v.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(T/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){let T=(i+1)*(y-1)+(x-1),C=(i+1)*y+(x-1),O=(i+1)*y+x,W=(i+1)*(y-1)+x;o.push(T,C,W),o.push(C,O,W)}function _(y,x,T,C,O){let W=Math.cos(y),D=Math.sin(y),L=T/x*y,z=Math.cos(L);O.x=C*(2+z)*.5*W,O.y=C*(2+z)*D*.5,O.z=C*Math.sin(L)*.5}this.setIndex(o),this.setAttribute("position",new Pe(c,3)),this.setAttribute("normal",new Pe(l,3)),this.setAttribute("uv",new Pe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},St=class r extends ht{constructor(e=new hs(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new ue,h=new w,u=[],d=[],f=[],p=[];function v(m){h=e.getPointAt(m/t,h);let g=a.normals[m],_=a.binormals[m];for(let y=0;y<=i;y++){let x=y/i*Math.PI*2,T=Math.sin(x),C=-Math.cos(x);c.x=C*g.x+T*_.x,c.y=C*g.y+T*_.y,c.z=C*g.z+T*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)v(m);v(s===!1?t:0),(function(){for(let m=0;m<=t;m++)for(let g=0;g<=i;g++)l.x=m/t,l.y=g/i,f.push(l.x,l.y)})(),(function(){for(let m=1;m<=t;m++)for(let g=1;g<=i;g++){let _=(i+1)*(m-1)+(g-1),y=(i+1)*m+(g-1),x=(i+1)*m+g,T=(i+1)*(m-1)+g;p.push(_,y,T),p.push(y,x,T)}})()})(),this.setIndex(p),this.setAttribute("position",new Pe(u,3)),this.setAttribute("normal",new Pe(d,3)),this.setAttribute("uv",new Pe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new ga[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Sa=class extends ht{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let f=d,p=d+u.count;f<p;f+=3)for(let v=0;v<3;v++){let m=o.getX(f+v),g=o.getX(f+(v+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,g),Oc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Oc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Pe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Oc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var Em=Object.freeze({__proto__:null,BoxGeometry:ut,CapsuleGeometry:xr,CircleGeometry:Gn,ConeGeometry:ha,CylinderGeometry:Ze,DodecahedronGeometry:ua,EdgesGeometry:da,ExtrudeGeometry:jt,IcosahedronGeometry:_a,LatheGeometry:yi,OctahedronGeometry:Tr,PlaneGeometry:qt,PolyhedronGeometry:Li,RingGeometry:ya,ShapeGeometry:Wi,SphereGeometry:sn,TetrahedronGeometry:xa,TorusGeometry:yt,TorusKnotGeometry:Ma,TubeGeometry:St,WireframeGeometry:Sa}),fs=class extends _i{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Rt=class extends _i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_n=class extends Rt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ta=class extends _i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ba=class extends _i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function $s(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function rd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Xi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},wa=class extends Xi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zo,endingEnd:zo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Go:s=e,o=2*t-n;break;case ko:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Go:a=e,c=2*n-t;break;case ko:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,m=v*p,g=-d*m+2*d*v-d*p,_=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*p+1,y=(-1-f)*m+(1.5+f)*v+.5*p,x=f*m-f*v;for(let T=0;T!==o;++T)s[T]=g*a[h+T]+_*a[l+T]+y*a[c+T]+x*a[u+T];return s}},Ea=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Aa=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Rn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$s(t,this.TimeBufferType),this.values=$s(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$s(e.times,Array),values:$s(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case jr:t=this.InterpolantFactoryMethodDiscrete;break;case na:t=this.InterpolantFactoryMethodLinear;break;case Qs:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return jr;case this.InterpolantFactoryMethodLinear:return na;case this.InterpolantFactoryMethodSmooth:return Qs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&rd(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Qs,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let p=t[h+f];if(p!==t[u+f]||p!==t[d+f]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Rn.prototype.ValueTypeName="",Rn.prototype.TimeBufferType=Float32Array,Rn.prototype.ValueBufferType=Float32Array,Rn.prototype.DefaultInterpolation=na;var Ri=class extends Rn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool",Ri.prototype.ValueBufferType=Array,Ri.prototype.DefaultInterpolation=jr,Ri.prototype.InterpolantFactoryMethodLinear=void 0,Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Ca=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Ca.prototype.ValueTypeName="color";var Ra=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Ra.prototype.ValueTypeName="number";var Pa=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Pn.slerpFlat(s,0,a,l-o,a,l,c);return s}},gs=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Pa(this.times,this.values,this.getValueSize(),e)}};gs.prototype.ValueTypeName="quaternion",gs.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends Rn{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="string",Pi.prototype.ValueBufferType=Array,Pi.prototype.DefaultInterpolation=jr,Pi.prototype.InterpolantFactoryMethodLinear=void 0,Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ia=class extends Rn{constructor(e,t,n,i){super(e,t,n,i)}};Ia.prototype.ValueTypeName="vector";var La=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Gh=new La,Da=class{constructor(e){this.manager=e!==void 0?e:Gh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Da.DEFAULT_MATERIAL_NAME="__DEFAULT";var br=class extends rn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Un=class extends br{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},No=new Je,Bc=new w,zc=new w,Ua=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ii,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bc),zc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zc),t.updateMatrixWorld(),No.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(No,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(No)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Gc=new Je,Vr=new w,Fo=new w,qo=class extends Ua{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vr),Fo.copy(n.position),Fo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fo),n.updateMatrixWorld(),i.makeTranslation(-Vr.x,-Vr.y,-Vr.z),Gc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gc,n.coordinateSystem,n.reversedDepth)}},wr=class extends br{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new qo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},xi=class extends vr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Yo=class extends Ua{constructor(){super(new xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Tn=class extends br{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new Yo}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Am=new Je,Cm=new Je,Rm=new Je;var Na=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Pm=new w,Im=new Pn,Lm=new w,Dm=new w,Um=new w;var Nm=new w,Fm=new Pn,Om=new w,Bm=new w;var Gl="\\[\\]\\.:\\/",sd=new RegExp("["+Gl+"]","g"),Oo="[^"+Gl+"]",ad="[^"+Gl.replace("\\.","")+"]",od=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Oo)+/(WCOD+)?/.source.replace("WCOD",ad)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oo)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oo)+"$"),ld=["material","materials","bones","map"],Ot=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(sd,"")}static parseTrackName(e){let t=od.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);ld.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ot.Composite=class{constructor(r,e,t){let n=t||Ot.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray],Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zm=new Float32Array(1);var Gm=new Je;var km=new ue;var Vm=new w,Hm=new w,Wm=new w,Xm=new w,jm=new w,qm=new w,Ym=new w;var Zm=new w;var Jm=new w,Km=new Je,$m=new Je;var Qm=new w,ef=new Ye,tf=new Ye;var nf=new w,rf=new w,sf=new w;var af=new w,of=new vr;var lf=new In;var cf=new w;function kl(r,e,t,n){let i=(function(s){switch(s){case ri:case tl:return{byteLength:1,components:1};case Rr:case nl:case Ui:return{byteLength:2,components:1};case Ya:case Za:return{byteLength:2,components:4};case Yi:case qa:case kn:return{byteLength:4,components:1};case il:case rl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Ja:case Ka:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Vn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function hu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function hd(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],f=l[u];f.start<=d.start+d.count+1?d.count=Math.max(d.count,f.start+f.count-d.start):(++h,l[h]=f)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let f=l[u];r.bufferSubData(o,f.start*c.BYTES_PER_ELEMENT,c,f.start,f.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var ot={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ie={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},si={basic:{uniforms:un([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:un([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:un([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:un([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:un([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:un([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:un([Ie.points,Ie.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:un([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:un([Ie.common,Ie.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:un([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:un([Ie.sprite,Ie.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:un([Ie.common,Ie.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:un([Ie.lights,Ie.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};si.physical={uniforms:un([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var no={r:0,b:0,g:0},$i=new Yn,ud=new Je;function dd(r,e,t,n,i,s,a){let o=new Ye(0),c,l,h=s===!0?0:1,u=null,d=0,f=null;function p(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function v(m,g){m.getRGB(no,Bl(r)),n.buffers.color.setClear(no.r,no.g,no.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,v(o,h)},render:function(m){let g=!1,_=p(m);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(m,g){let _=p(g);_&&(_.isCubeTexture||_.mapping===ys)?(l===void 0&&(l=new at(new ut(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Ki(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,x,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),$i.copy(g.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),l.material.uniforms.envMap.value=_,l.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ud.makeRotationFromEuler($i)),l.material.toneMapped=_t.getTransfer(_.colorSpace)!==Et,u===_&&d===_.version&&f===r.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new at(new qt(2,2),new hn({name:"BackgroundMaterial",uniforms:Ki(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=_t.getTransfer(_.colorSpace)!==Et,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&f===r.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function pd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let _=[],y=[],x=[];for(let T=0;T<t;T++)_[T]=0,y[T]=0,x[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function u(g){d(g,0)}function d(g,_){let y=s.newAttributes,x=s.enabledAttributes,T=s.attributeDivisors;y[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),T[g]!==_&&(r.vertexAttribDivisor(g,_),T[g]=_)}function f(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,x=_.length;y<x;y++)_[y]!==g[y]&&(r.disableVertexAttribArray(y),_[y]=0)}function p(g,_,y,x,T,C,O){O===!0?r.vertexAttribIPointer(g,_,y,T,C):r.vertexAttribPointer(g,_,y,x,T,C)}function v(){m(),a=!0,s!==i&&(s=i,o(s.object))}function m(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,y,x,T){let C=!1,O=(function(W,D,L){let z=L.wireframe===!0,N=n[W.id];N===void 0&&(N={},n[W.id]=N);let j=N[D.id];j===void 0&&(j={},N[D.id]=j);let V=j[z];return V===void 0&&(V=l(r.createVertexArray()),j[z]=V),V})(x,y,_);s!==O&&(s=O,o(s.object)),C=(function(W,D,L,z){let N=s.attributes,j=D.attributes,V=0,te=L.getAttributes();for(let ne in te)if(te[ne].location>=0){let ge=N[ne],ce=j[ne];if(ce===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(ce=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(ce=W.instanceColor)),ge===void 0||ge.attribute!==ce||ce&&ge.data!==ce.data)return!0;V++}return s.attributesNum!==V||s.index!==z})(g,x,y,T),C&&(function(W,D,L,z){let N={},j=D.attributes,V=0,te=L.getAttributes();for(let ne in te)if(te[ne].location>=0){let ge=j[ne];ge===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(ge=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(ge=W.instanceColor));let ce={};ce.attribute=ge,ge&&ge.data&&(ce.data=ge.data),N[ne]=ce,V++}s.attributes=N,s.attributesNum=V,s.index=z})(g,x,y,T),T!==null&&e.update(T,r.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,(function(W,D,L,z){h();let N=z.attributes,j=L.getAttributes(),V=D.defaultAttributeValues;for(let te in j){let ne=j[te];if(ne.location>=0){let ge=N[te];if(ge===void 0&&(te==="instanceMatrix"&&W.instanceMatrix&&(ge=W.instanceMatrix),te==="instanceColor"&&W.instanceColor&&(ge=W.instanceColor)),ge!==void 0){let ce=ge.normalized,Te=ge.itemSize,Q=e.get(ge);if(Q===void 0)continue;let oe=Q.buffer,Ae=Q.type,le=Q.bytesPerElement,Me=Ae===r.INT||Ae===r.UNSIGNED_INT||ge.gpuType===qa;if(ge.isInterleavedBufferAttribute){let _e=ge.data,Y=_e.stride,we=ge.offset;if(_e.isInstancedInterleavedBuffer){for(let A=0;A<ne.locationSize;A++)d(ne.location+A,_e.meshPerAttribute);W.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let A=0;A<ne.locationSize;A++)u(ne.location+A);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let A=0;A<ne.locationSize;A++)p(ne.location+A,Te/ne.locationSize,Ae,ce,Y*le,(we+Te/ne.locationSize*A)*le,Me)}else{if(ge.isInstancedBufferAttribute){for(let _e=0;_e<ne.locationSize;_e++)d(ne.location+_e,ge.meshPerAttribute);W.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let _e=0;_e<ne.locationSize;_e++)u(ne.location+_e);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let _e=0;_e<ne.locationSize;_e++)p(ne.location+_e,Te/ne.locationSize,Ae,ce,Te*le,Te/ne.locationSize*_e*le,Me)}}else if(V!==void 0){let ce=V[te];if(ce!==void 0)switch(ce.length){case 2:r.vertexAttrib2fv(ne.location,ce);break;case 3:r.vertexAttrib3fv(ne.location,ce);break;case 4:r.vertexAttrib4fv(ne.location,ce);break;default:r.vertexAttrib1fv(ne.location,ce)}}}}f()})(g,_,y,x),T!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:v,resetDefaultState:m,dispose:function(){v();for(let g in n){let _=n[g];for(let y in _){let x=_[y];for(let T in x)c(x[T].object),delete x[T];delete _[y]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let x=_[y];for(let T in x)c(x[T].object),delete x[T];delete _[y]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];if(y[g.id]===void 0)continue;let x=y[g.id];for(let T in x)c(x[T].object),delete x[T];delete y[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:f}}function md(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function fd(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Vn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let f=d===Ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==ri&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==kn&&!f)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function gd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new $n,o=new rt,c={value:null,needsUpdate:!1};function l(h,u,d,f){let p=h!==null?h.length:0,v=null;if(p!==0){if(v=c.value,f!==!0||v===null){let m=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<m)&&(v=new Float32Array(m));for(let _=0,y=d;_!==p;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,y),v[y+3]=a.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,v}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let f=h.clippingPlanes,p=h.clipIntersection,v=h.clipShadows,m=r.get(h);if(!i||f===null||f.length===0||s&&!v)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=m.clippingState||null;c.value=y,y=l(f,u,_,d);for(let x=0;x!==_;++x)y[x]=t[x];m.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function vd(r){let e=new WeakMap;function t(i,s){return s===Wa?i.mapping=Cr:s===Xa&&(i.mapping=ji),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Wa||s===Xa){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new la(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var kh=[.125,.215,.35,.446,.526,.582],Ts=20,Vl=new xi,Vh=new Ye,Hl=null,Wl=0,Xl=0,jl=!1,er=(1+Math.sqrt(5))/2,Ir=1/er,Hh=[new w(-er,Ir,0),new w(er,Ir,0),new w(-Ir,0,er),new w(Ir,0,er),new w(0,er,-Ir),new w(0,er,Ir),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],_d=new w,Dr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=_d}=s;Hl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hl,Wl,Xl),this._renderer.xr.enabled=jl,e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cr||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ti,minFilter:ti,generateMipmaps:!1,type:Ui,format:Vn,colorSpace:Gi,depthBuffer:!1},i=Wh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+kh.length;for(let d=0;d<u;d++){let f=Math.pow(2,h);c.push(f);let p=1/f;d>a-4?p=kh[d-a+4-1]:d===0&&(p=0),l.push(p);let v=1/(f-2),m=-v,g=1+v,_=[m,m,g,m,g,g,m,m,g,g,m,g],y=6,x=6,T=3,C=2,O=1,W=new Float32Array(T*x*y),D=new Float32Array(C*x*y),L=new Float32Array(O*x*y);for(let N=0;N<y;N++){let j=N%3*2/3-1,V=N>2?0:-1,te=[j,V,0,j+2/3,V,0,j+2/3,V+1,0,j,V,0,j+2/3,V+1,0,j,V+1,0];W.set(te,T*x*N),D.set(_,C*x*N);let ne=[N,N,N,N,N,N];L.set(ne,O*x*N)}let z=new ht;z.setAttribute("position",new Mn(W,T)),z.setAttribute("uv",new Mn(D,C)),z.setAttribute("faceIndex",new Mn(L,O)),o.push(z),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(Ts),h=new w(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:Ts,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,Vl)}_sceneToCubeUV(e,t,n,i,s){let a=new Vt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Vh),l.toneMapping=Mi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new zn({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),f=new at(new ut,d),p=!1,v=e.background;v?v.isColor&&(d.color.copy(v),e.background=null,p=!0):(d.color.copy(Vh),p=!0);for(let m=0;m<6;m++){let g=m%3;g===0?(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[m],s.y,s.z)):g===1?(a.up.set(0,0,o[m]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[m],s.z)):(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[m]));let _=this._cubeSize;io(i,g*_,m>2?_:0,_,_),l.setRenderTarget(i),p&&l.render(f,a),l.render(e,a)}f.geometry.dispose(),f.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Cr||e.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;io(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Vl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Hh[(i-s-1)%Hh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new at(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/f,v=isFinite(s)?1+Math.floor(3*p):Ts;v>Ts&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let m=[],g=0;for(let x=0;x<Ts;++x){let T=x/p,C=Math.exp(-T*T/2);m.push(C),x===0?g+=C:x<v&&(g+=2*C)}for(let x=0;x<m.length;x++)m[x]=m[x]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let y=this._sizeLods[i];io(t,3*y*(i>_-4?i-_+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Vl)}};function Wh(r,e,t){let n=new Bn(r,e,t);return n.texture.mapping=ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Xh(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function jh(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function nc(){return`

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
	`}function yd(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Wa||s===Xa,o=s===Cr||s===ji;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Dr(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,f=6;for(let p=0;p<f;p++)u[p]!==void 0&&d++;return d===f})(h)?(t===null&&(t=new Dr(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function xd(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&fr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Md(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let v=h.array;d=h.version;for(let m=0,g=v.length;m<g;m+=3){let _=v[m+0],y=v[m+1],x=v[m+2];l.push(_,y,y,x,x,_)}}else{if(u===void 0)return;{let v=u.array;d=u.version;for(let m=0,g=v.length/3-1;m<g;m+=3){let _=m+0,y=m+1,x=m+2;l.push(_,y,y,x,x,_)}}}let f=new(Ol(l)?$r:Vi)(l,1);f.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,f)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Sd(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let f=0;f<l;f++)d+=c[f]*h[f];t.update(d,n,1)}}}function Td(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function bd(r,e,t){let n=new WeakMap,i=new xt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let W=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",W)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),f===!0&&(_=2),p===!0&&(_=3);let y=a.attributes.position.count*_,x=1;y>e.maxTextureSize&&(x=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*x*4*h),C=new Jr(T,y,x,h);C.type=kn,C.needsUpdate=!0;let O=4*_;for(let D=0;D<h;D++){let L=v[D],z=m[D],N=g[D],j=y*x*4*D;for(let V=0;V<L.count;V++){let te=V*O;d===!0&&(i.fromBufferAttribute(L,V),T[j+te+0]=i.x,T[j+te+1]=i.y,T[j+te+2]=i.z,T[j+te+3]=0),f===!0&&(i.fromBufferAttribute(z,V),T[j+te+4]=i.x,T[j+te+5]=i.y,T[j+te+6]=i.z,T[j+te+7]=0),p===!0&&(i.fromBufferAttribute(N,V),T[j+te+8]=i.x,T[j+te+9]=i.y,T[j+te+10]=i.z,T[j+te+11]=N.itemSize===4?i.w:1)}}u={count:h,texture:C,size:new ue(y,x)},n.set(a,u),a.addEventListener("dispose",W)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let f=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",f),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function wd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var uu=new gn,qh=new ss(1,1),du=new Jr,pu=new aa,mu=new Qr,Yh=[],Zh=[],Jh=new Float32Array(16),Kh=new Float32Array(9),$h=new Float32Array(4);function Ur(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Yh[i];if(s===void 0&&(s=new Float32Array(i),Yh[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Kt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function $t(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function so(r,e){let t=Zh[e];t===void 0&&(t=new Int32Array(e),Zh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Ed(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Ad(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2fv(this.addr,e),$t(t,e)}}function Cd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;r.uniform3fv(this.addr,e),$t(t,e)}}function Rd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4fv(this.addr,e),$t(t,e)}}function Pd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Kt(t,n))return;$h.set(n),r.uniformMatrix2fv(this.addr,!1,$h),$t(t,n)}}function Id(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Kt(t,n))return;Kh.set(n),r.uniformMatrix3fv(this.addr,!1,Kh),$t(t,n)}}function Ld(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Kt(t,n))return;Jh.set(n),r.uniformMatrix4fv(this.addr,!1,Jh),$t(t,n)}}function Dd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Ud(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2iv(this.addr,e),$t(t,e)}}function Nd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3iv(this.addr,e),$t(t,e)}}function Fd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4iv(this.addr,e),$t(t,e)}}function Od(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Bd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2uiv(this.addr,e),$t(t,e)}}function zd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3uiv(this.addr,e),$t(t,e)}}function Gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4uiv(this.addr,e),$t(t,e)}}function kd(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(qh.compareFunction=Nl,s=qh):s=uu,t.setTexture2D(e||s,i)}function Vd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||pu,i)}function Hd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||mu,i)}function Wd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||du,i)}function Xd(r,e){r.uniform1fv(this.addr,e)}function jd(r,e){let t=Ur(e,this.size,2);r.uniform2fv(this.addr,t)}function qd(r,e){let t=Ur(e,this.size,3);r.uniform3fv(this.addr,t)}function Yd(r,e){let t=Ur(e,this.size,4);r.uniform4fv(this.addr,t)}function Zd(r,e){let t=Ur(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Jd(r,e){let t=Ur(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Kd(r,e){let t=Ur(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function $d(r,e){r.uniform1iv(this.addr,e)}function Qd(r,e){r.uniform2iv(this.addr,e)}function ep(r,e){r.uniform3iv(this.addr,e)}function tp(r,e){r.uniform4iv(this.addr,e)}function np(r,e){r.uniform1uiv(this.addr,e)}function ip(r,e){r.uniform2uiv(this.addr,e)}function rp(r,e){r.uniform3uiv(this.addr,e)}function sp(r,e){r.uniform4uiv(this.addr,e)}function ap(r,e,t){let n=this.cache,i=e.length,s=so(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),$t(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||uu,s[a])}function op(r,e,t){let n=this.cache,i=e.length,s=so(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),$t(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||pu,s[a])}function lp(r,e,t){let n=this.cache,i=e.length,s=so(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),$t(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||mu,s[a])}function cp(r,e,t){let n=this.cache,i=e.length,s=so(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),$t(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||du,s[a])}var Yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Ed;case 35664:return Ad;case 35665:return Cd;case 35666:return Rd;case 35674:return Pd;case 35675:return Id;case 35676:return Ld;case 5124:case 35670:return Dd;case 35667:case 35671:return Ud;case 35668:case 35672:return Nd;case 35669:case 35673:return Fd;case 5125:return Od;case 36294:return Bd;case 36295:return zd;case 36296:return Gd;case 35678:case 36198:case 36298:case 36306:case 35682:return kd;case 35679:case 36299:case 36307:return Vd;case 35680:case 36300:case 36308:case 36293:return Hd;case 36289:case 36303:case 36311:case 36292:return Wd}})(t.type)}},Zl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Xd;case 35664:return jd;case 35665:return qd;case 35666:return Yd;case 35674:return Zd;case 35675:return Jd;case 35676:return Kd;case 5124:case 35670:return $d;case 35667:case 35671:return Qd;case 35668:case 35672:return ep;case 35669:case 35673:return tp;case 5125:return np;case 36294:return ip;case 36295:return rp;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return ap;case 35679:case 36299:case 36307:return op;case 35680:case 36300:case 36308:case 36293:return lp;case 36289:case 36303:case 36311:case 36292:return cp}})(t.type)}},Jl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},ql=/(\w+)(\])?(\[|\.)?/g;function Qh(r,e){r.seq.push(e),r.map[e.id]=e}function hp(r,e,t){let n=r.name,i=n.length;for(ql.lastIndex=0;;){let s=ql.exec(n),a=ql.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){Qh(t,l===void 0?new Yl(o,r,e):new Zl(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Jl(o),Qh(t,h)),t=h}}}var Lr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);hp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function eu(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var up=0,tu=new rt;function nu(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let f=u;f<d;f++){let p=f+1;h.push(`${p===c?">":" "} ${p}: ${l[f]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function dp(r,e){let t=(function(n){_t._getMatrix(tu,_t.workingColorSpace,n);let i=`mat3( ${tu.elements.map(s=>s.toFixed(4))} )`;switch(_t.getTransfer(n)){case qr:return[i,"LinearTransferOETF"];case Et:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function pp(r,e){let t;switch(e){case dh:t="Linear";break;case ph:t="Reinhard";break;case mh:t="Cineon";break;case ii:t="ACESFilmic";break;case gh:t="AgX";break;case vh:t="Neutral";break;case fh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ro=new w;function mp(){return _t.getLuminanceCoefficients(ro),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ro.x.toFixed(4)}, ${ro.y.toFixed(4)}, ${ro.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bs(r){return r!==""}function iu(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ru(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(r){return r.replace(fp,vp)}var gp=new Map;function vp(r,e){let t=ot[e];if(t===void 0){let n=gp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Kl(t)}var _p=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function su(r){return r.replace(_p,yp)}function yp(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function au(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function xp(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(z){let N="SHADOWMAP_TYPE_BASIC";return z.shadowMapType===Jo?N="SHADOWMAP_TYPE_PCF":z.shadowMapType===Fa?N="SHADOWMAP_TYPE_PCF_SOFT":z.shadowMapType===ni&&(N="SHADOWMAP_TYPE_VSM"),N})(t),l=(function(z){let N="ENVMAP_TYPE_CUBE";if(z.envMap)switch(z.envMapMode){case Cr:case ji:N="ENVMAP_TYPE_CUBE";break;case ys:N="ENVMAP_TYPE_CUBE_UV"}return N})(t),h=(function(z){let N="ENVMAP_MODE_REFLECTION";return z.envMap&&z.envMapMode===ji&&(N="ENVMAP_MODE_REFRACTION"),N})(t),u=(function(z){let N="ENVMAP_BLENDING_NONE";if(z.envMap)switch(z.combine){case ch:N="ENVMAP_BLENDING_MULTIPLY";break;case hh:N="ENVMAP_BLENDING_MIX";break;case uh:N="ENVMAP_BLENDING_ADD"}return N})(t),d=(function(z){let N=z.envMapCubeUVHeight;if(N===null)return null;let j=Math.log2(N)-2,V=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,j),112)),texelHeight:V,maxMip:j}})(t),f=(function(z){return[z.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",z.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)})(t),p=(function(z){let N=[];for(let j in z){let V=z[j];V!==!1&&N.push("#define "+j+" "+V)}return N.join(`
`)})(s),v=i.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(bs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(bs).join(`
`),g.length>0&&(g+=`
`)):(m=[au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),g=[au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?ot.tonemapping_pars_fragment:"",t.toneMapping!==Mi?pp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,dp("linearToOutputTexel",t.outputColorSpace),mp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bs).join(`
`)),a=Kl(a),a=iu(a,t),a=ru(a,t),o=Kl(o),o=iu(o,t),o=ru(o,t),a=su(a),o=su(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+m+a,x=_+g+o,T=eu(i,i.VERTEX_SHADER,y),C=eu(i,i.FRAGMENT_SHADER,x);function O(z){if(r.debug.checkShaderErrors){let N=i.getProgramInfoLog(v)||"",j=i.getShaderInfoLog(T)||"",V=i.getShaderInfoLog(C)||"",te=N.trim(),ne=j.trim(),ge=V.trim(),ce=!0,Te=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(ce=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,T,C);else{let Q=nu(i,T,"vertex"),oe=nu(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+te+`
`+Q+`
`+oe)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):ne!==""&&ge!==""||(Te=!1);Te&&(z.diagnostics={runnable:ce,programLog:te,vertexShader:{log:ne,prefix:m},fragmentShader:{log:ge,prefix:g}})}i.deleteShader(T),i.deleteShader(C),W=new Lr(i,v),D=(function(N,j){let V={},te=N.getProgramParameter(j,N.ACTIVE_ATTRIBUTES);for(let ne=0;ne<te;ne++){let ge=N.getActiveAttrib(j,ne),ce=ge.name,Te=1;ge.type===N.FLOAT_MAT2&&(Te=2),ge.type===N.FLOAT_MAT3&&(Te=3),ge.type===N.FLOAT_MAT4&&(Te=4),V[ce]={type:ge.type,location:N.getAttribLocation(j,ce),locationSize:Te}}return V})(i,v)}let W,D;i.attachShader(v,T),i.attachShader(v,C),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return W===void 0&&O(this),W},this.getAttributes=function(){return D===void 0&&O(this),D};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(v,37297)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=up++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=C,this}var Mp=0,$l=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ql(e),t.set(e,n)),n}},Ql=class{constructor(e){this.id=Mp++,this.code=e,this.usedTimes=0}};function Sp(r,e,t,n,i,s,a){let o=new Kr,c=new $l,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,y,x){let T=y.fog,C=x.geometry,O=m.isMeshStandardMaterial?y.environment:null,W=(m.isMeshStandardMaterial?t:e).get(m.envMap||O),D=W&&W.mapping===ys?W.image.height:null,L=p[m.type];m.precision!==null&&(f=i.getMaxPrecision(m.precision),f!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",f,"instead."));let z=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,N=z!==void 0?z.length:0,j,V,te,ne,ge=0;if(C.morphAttributes.position!==void 0&&(ge=1),C.morphAttributes.normal!==void 0&&(ge=2),C.morphAttributes.color!==void 0&&(ge=3),L){let gt=si[L];j=gt.vertexShader,V=gt.fragmentShader}else j=m.vertexShader,V=m.fragmentShader,c.update(m),te=c.getVertexShaderID(m),ne=c.getFragmentShaderID(m);let ce=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),Q=x.isInstancedMesh===!0,oe=x.isBatchedMesh===!0,Ae=!!m.map,le=!!m.matcap,Me=!!W,_e=!!m.aoMap,Y=!!m.lightMap,we=!!m.bumpMap,A=!!m.normalMap,E=!!m.displacementMap,H=!!m.emissiveMap,B=!!m.metalnessMap,S=!!m.roughnessMap,P=m.anisotropy>0,k=m.clearcoat>0,F=m.dispersion>0,ae=m.iridescence>0,q=m.sheen>0,J=m.transmission>0,ve=P&&!!m.anisotropyMap,Re=k&&!!m.clearcoatMap,Se=k&&!!m.clearcoatNormalMap,Fe=k&&!!m.clearcoatRoughnessMap,Ge=ae&&!!m.iridescenceMap,pe=ae&&!!m.iridescenceThicknessMap,Le=q&&!!m.sheenColorMap,Ce=q&&!!m.sheenRoughnessMap,Ve=!!m.specularMap,be=!!m.specularColorMap,Ue=!!m.specularIntensityMap,He=J&&!!m.transmissionMap,At=J&&!!m.thicknessMap,Be=!!m.gradientMap,dt=!!m.alphaMap,tt=m.alphaTest>0,an=!!m.alphaHash,Pt=!!m.extensions,G=Mi;m.toneMapped&&(ce!==null&&ce.isXRRenderTarget!==!0||(G=r.toneMapping));let Nt={shaderID:L,shaderType:m.type,shaderName:m.name,vertexShader:j,fragmentShader:V,defines:m.defines,customVertexShaderID:te,customFragmentShaderID:ne,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:f,batching:oe,batchingColor:oe&&x._colorsTexture!==null,instancing:Q,instancingColor:Q&&x.instanceColor!==null,instancingMorph:Q&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?r.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Gi,alphaToCoverage:!!m.alphaToCoverage,map:Ae,matcap:le,envMap:Me,envMapMode:Me&&W.mapping,envMapCubeUVHeight:D,aoMap:_e,lightMap:Y,bumpMap:we,normalMap:A,displacementMap:d&&E,emissiveMap:H,normalMapObjectSpace:A&&m.normalMapType===wh,normalMapTangentSpace:A&&m.normalMapType===bh,metalnessMap:B,roughnessMap:S,anisotropy:P,anisotropyMap:ve,clearcoat:k,clearcoatMap:Re,clearcoatNormalMap:Se,clearcoatRoughnessMap:Fe,dispersion:F,iridescence:ae,iridescenceMap:Ge,iridescenceThicknessMap:pe,sheen:q,sheenColorMap:Le,sheenRoughnessMap:Ce,specularMap:Ve,specularColorMap:be,specularIntensityMap:Ue,transmission:J,transmissionMap:He,thicknessMap:At,gradientMap:Be,opaque:m.transparent===!1&&m.blending===vs&&m.alphaToCoverage===!1,alphaMap:dt,alphaTest:tt,alphaHash:an,combine:m.combine,mapUv:Ae&&v(m.map.channel),aoMapUv:_e&&v(m.aoMap.channel),lightMapUv:Y&&v(m.lightMap.channel),bumpMapUv:we&&v(m.bumpMap.channel),normalMapUv:A&&v(m.normalMap.channel),displacementMapUv:E&&v(m.displacementMap.channel),emissiveMapUv:H&&v(m.emissiveMap.channel),metalnessMapUv:B&&v(m.metalnessMap.channel),roughnessMapUv:S&&v(m.roughnessMap.channel),anisotropyMapUv:ve&&v(m.anisotropyMap.channel),clearcoatMapUv:Re&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:Se&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(m.sheenRoughnessMap.channel),specularMapUv:Ve&&v(m.specularMap.channel),specularColorMapUv:be&&v(m.specularColorMap.channel),specularIntensityMapUv:Ue&&v(m.specularIntensityMap.channel),transmissionMapUv:He&&v(m.transmissionMap.channel),thicknessMapUv:At&&v(m.thicknessMap.channel),alphaMapUv:dt&&v(m.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(A||P),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!C.attributes.uv&&(Ae||dt),fog:!!T,useFog:m.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Te,skinning:x.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:ge,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:G,decodeVideoTexture:Ae&&m.map.isVideoTexture===!0&&_t.getTransfer(m.map.colorSpace)===Et,decodeVideoTextureEmissive:H&&m.emissiveMap.isVideoTexture===!0&&_t.getTransfer(m.emissiveMap.colorSpace)===Et,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Bt,flipSided:m.side===Nn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Pt&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&m.extensions.multiDraw===!0||oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Nt.vertexUv1s=l.has(1),Nt.vertexUv2s=l.has(2),Nt.vertexUv3s=l.has(3),l.clear(),Nt},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&((function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)})(g,m),(function(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,m),g.push(r.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=p[m.type],_;if(g){let y=si[g];_=Fh.clone(y.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let y=0,x=h.length;y<x;y++){let T=h[y];if(T.cacheKey===g){_=T,++_.usedTimes;break}}return _===void 0&&(_=new xp(r,g,m,s),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes===0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){c.remove(m)},programs:h,dispose:function(){c.dispose()}}}function Tp(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function bp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ou(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function lu(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||bp),n.length>1&&n.sort(o||ou),i.length>1&&i.sort(o||ou)}}}function wp(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new lu,r.set(e,[i])):t>=n.length?(i=new lu,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Ep(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ye};break;case"SpotLight":t={position:new w,direction:new w,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var Ap=0;function Cp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Rp(r){let e=new Ep,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new Je,a=new Je;return{setup:function(o){let c=0,l=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let u=0,d=0,f=0,p=0,v=0,m=0,g=0,_=0,y=0,x=0,T=0;o.sort(Cp);for(let O=0,W=o.length;O<W;O++){let D=o[O],L=D.color,z=D.intensity,N=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=L.r*z,l+=L.g*z,h+=L.b*z;else if(D.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(D.sh.coefficients[V],z);T++}else if(D.isDirectionalLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let te=D.shadow,ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.directionalShadow[u]=ne,n.directionalShadowMap[u]=j,n.directionalShadowMatrix[u]=D.shadow.matrix,m++}n.directional[u]=V,u++}else if(D.isSpotLight){let V=e.get(D);V.position.setFromMatrixPosition(D.matrixWorld),V.color.copy(L).multiplyScalar(z),V.distance=N,V.coneCos=Math.cos(D.angle),V.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),V.decay=D.decay,n.spot[f]=V;let te=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,te.updateMatrices(D),D.castShadow&&x++),n.spotLightMatrix[f]=te.matrix,D.castShadow){let ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.spotShadow[f]=ne,n.spotShadowMap[f]=j,_++}f++}else if(D.isRectAreaLight){let V=e.get(D);V.color.copy(L).multiplyScalar(z),V.halfWidth.set(.5*D.width,0,0),V.halfHeight.set(0,.5*D.height,0),n.rectArea[p]=V,p++}else if(D.isPointLight){let V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),V.distance=D.distance,V.decay=D.decay,D.castShadow){let te=D.shadow,ne=t.get(D);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,ne.shadowCameraNear=te.camera.near,ne.shadowCameraFar=te.camera.far,n.pointShadow[d]=ne,n.pointShadowMap[d]=j,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=V,d++}else if(D.isHemisphereLight){let V=e.get(D);V.skyColor.copy(D.color).multiplyScalar(z),V.groundColor.copy(D.groundColor).multiplyScalar(z),n.hemi[v]=V,v++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let C=n.hash;C.directionalLength===u&&C.pointLength===d&&C.spotLength===f&&C.rectAreaLength===p&&C.hemiLength===v&&C.numDirectionalShadows===m&&C.numPointShadows===g&&C.numSpotShadows===_&&C.numSpotMaps===y&&C.numLightProbes===T||(n.directional.length=u,n.spot.length=f,n.rectArea.length=p,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+y-x,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=T,C.directionalLength=u,C.pointLength=d,C.spotLength=f,C.rectAreaLength=p,C.hemiLength=v,C.numDirectionalShadows=m,C.numPointShadows=g,C.numSpotShadows=_,C.numSpotMaps=y,C.numLightProbes=T,n.version=Ap++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,f=0,p=c.matrixWorldInverse;for(let v=0,m=o.length;v<m;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[l];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),l++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let _=n.hemi[f];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(p),f++}}},state:n}}function cu(r){let e=new Rp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Pp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new cu(r),e.set(t,[s])):n>=i.length?(s=new cu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Ip(r,e,t){let n=new Ii,i=new ue,s=new ue,a=new xt,o=new Ta({depthPacking:Th}),c=new ba,l={},h=t.maxTextureSize,u={[Er]:Nn,[Nn]:Er,[Bt]:Bt},d=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:`void main() {
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
}`}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new ht;p.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new at(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let g=this.type;function _(C,O){let W=e.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Bn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(O,null,W,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(O,null,W,f,v,null)}function y(C,O,W,D){let L=null,z=W.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(z!==void 0)L=z;else if(L=W.isPointLight===!0?c:o,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){let N=L.uuid,j=O.uuid,V=l[N];V===void 0&&(V={},l[N]=V);let te=V[j];te===void 0&&(te=L.clone(),V[j]=te,O.addEventListener("dispose",T)),L=te}return L.visible=O.visible,L.wireframe=O.wireframe,L.side=D===ni?O.shadowSide!==null?O.shadowSide:O.side:O.shadowSide!==null?O.shadowSide:u[O.side],L.alphaMap=O.alphaMap,L.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,L.map=O.map,L.clipShadows=O.clipShadows,L.clippingPlanes=O.clippingPlanes,L.clipIntersection=O.clipIntersection,L.displacementMap=O.displacementMap,L.displacementScale=O.displacementScale,L.displacementBias=O.displacementBias,L.wireframeLinewidth=O.wireframeLinewidth,L.linewidth=O.linewidth,W.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(r.properties.get(L).light=W),L}function x(C,O,W,D,L){if(C.visible===!1)return;if(C.layers.test(O.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&L===ni)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,C.matrixWorld);let N=e.update(C),j=C.material;if(Array.isArray(j)){let V=N.groups;for(let te=0,ne=V.length;te<ne;te++){let ge=V[te],ce=j[ge.materialIndex];if(ce&&ce.visible){let Te=y(C,ce,D,L);C.onBeforeShadow(r,C,O,W,N,Te,ge),r.renderBufferDirect(W,null,N,Te,C,ge),C.onAfterShadow(r,C,O,W,N,Te,ge)}}}else if(j.visible){let V=y(C,j,D,L);C.onBeforeShadow(r,C,O,W,N,V,null),r.renderBufferDirect(W,null,N,V,C,null),C.onAfterShadow(r,C,O,W,N,V,null)}}let z=C.children;for(let N=0,j=z.length;N<j;N++)x(z[N],O,W,D,L)}function T(C){C.target.removeEventListener("dispose",T);for(let O in l){let W=l[O],D=C.target.uuid;D in W&&(W[D].dispose(),delete W[D])}}this.render=function(C,O,W){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let D=r.getRenderTarget(),L=r.getActiveCubeFace(),z=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Di),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let j=g!==ni&&this.type===ni,V=g===ni&&this.type!==ni;for(let te=0,ne=C.length;te<ne;te++){let ge=C[te],ce=ge.shadow;if(ce===void 0){console.warn("THREE.WebGLShadowMap:",ge,"has no shadow.");continue}if(ce.autoUpdate===!1&&ce.needsUpdate===!1)continue;i.copy(ce.mapSize);let Te=ce.getFrameExtents();if(i.multiply(Te),s.copy(ce.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Te.x),i.x=s.x*Te.x,ce.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Te.y),i.y=s.y*Te.y,ce.mapSize.y=s.y)),ce.map===null||j===!0||V===!0){let oe=this.type!==ni?{minFilter:ei,magFilter:ei}:{};ce.map!==null&&ce.map.dispose(),ce.map=new Bn(i.x,i.y,oe),ce.map.texture.name=ge.name+".shadowMap",ce.camera.updateProjectionMatrix()}r.setRenderTarget(ce.map),r.clear();let Q=ce.getViewportCount();for(let oe=0;oe<Q;oe++){let Ae=ce.getViewport(oe);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),N.viewport(a),ce.updateMatrices(ge,oe),n=ce.getFrustum(),x(O,W,ce.camera,ge,this.type)}ce.isPointLightShadow!==!0&&this.type===ni&&_(ce,W),ce.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(D,L,z)}}var Lp={[Oa]:Ba,[za]:Va,[Ga]:Ha,[_s]:ka,[Ba]:Oa,[Va]:za,[Ha]:Ga,[ka]:_s};function Dp(r,e){let t=new function(){let S=!1,P=new xt,k=null,F=new xt(0,0,0,0);return{setMask:function(ae){k===ae||S||(r.colorMask(ae,ae,ae,ae),k=ae)},setLocked:function(ae){S=ae},setClear:function(ae,q,J,ve,Re){Re===!0&&(ae*=ve,q*=ve,J*=ve),P.set(ae,q,J,ve),F.equals(P)===!1&&(r.clearColor(ae,q,J,ve),F.copy(P))},reset:function(){S=!1,k=null,F.set(-1,0,0,0)}}},n=new function(){let S=!1,P=!1,k=null,F=null,ae=null;return{setReversed:function(q){if(P!==q){let J=e.get("EXT_clip_control");q?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),P=q;let ve=ae;ae=null,this.setClear(ve)}},getReversed:function(){return P},setTest:function(q){q?Me(r.DEPTH_TEST):_e(r.DEPTH_TEST)},setMask:function(q){k===q||S||(r.depthMask(q),k=q)},setFunc:function(q){if(P&&(q=Lp[q]),F!==q){switch(q){case Oa:r.depthFunc(r.NEVER);break;case Ba:r.depthFunc(r.ALWAYS);break;case za:r.depthFunc(r.LESS);break;case _s:r.depthFunc(r.LEQUAL);break;case Ga:r.depthFunc(r.EQUAL);break;case ka:r.depthFunc(r.GEQUAL);break;case Va:r.depthFunc(r.GREATER);break;case Ha:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}F=q}},setLocked:function(q){S=q},setClear:function(q){ae!==q&&(P&&(q=1-q),r.clearDepth(q),ae=q)},reset:function(){S=!1,k=null,F=null,ae=null,P=!1}}},i=new function(){let S=!1,P=null,k=null,F=null,ae=null,q=null,J=null,ve=null,Re=null;return{setTest:function(Se){S||(Se?Me(r.STENCIL_TEST):_e(r.STENCIL_TEST))},setMask:function(Se){P===Se||S||(r.stencilMask(Se),P=Se)},setFunc:function(Se,Fe,Ge){k===Se&&F===Fe&&ae===Ge||(r.stencilFunc(Se,Fe,Ge),k=Se,F=Fe,ae=Ge)},setOp:function(Se,Fe,Ge){q===Se&&J===Fe&&ve===Ge||(r.stencilOp(Se,Fe,Ge),q=Se,J=Fe,ve=Ge)},setLocked:function(Se){S=Se},setClear:function(Se){Re!==Se&&(r.clearStencil(Se),Re=Se)},reset:function(){S=!1,P=null,k=null,F=null,ae=null,q=null,J=null,ve=null,Re=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,f=null,p=null,v=null,m=null,g=null,_=null,y=null,x=new Ye(0,0,0),T=0,C=!1,O=null,W=null,D=null,L=null,z=null,N=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,V=0,te=r.getParameter(r.VERSION);te.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(te)[1]),j=V>=1):te.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),j=V>=2);let ne=null,ge={},ce=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),Q=new xt().fromArray(ce),oe=new xt().fromArray(Te);function Ae(S,P,k,F){let ae=new Uint8Array(4),q=r.createTexture();r.bindTexture(S,q),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let J=0;J<k;J++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,F,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(P+J,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return q}let le={};function Me(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function _e(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}le[r.TEXTURE_2D]=Ae(r.TEXTURE_2D,r.TEXTURE_2D,1),le[r.TEXTURE_CUBE_MAP]=Ae(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[r.TEXTURE_2D_ARRAY]=Ae(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),le[r.TEXTURE_3D]=Ae(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),Me(r.DEPTH_TEST),n.setFunc(_s),E(!1),H(Zo),Me(r.CULL_FACE),A(Di);let Y={[Ar]:r.FUNC_ADD,[Wc]:r.FUNC_SUBTRACT,[Xc]:r.FUNC_REVERSE_SUBTRACT};Y[jc]=r.MIN,Y[qc]=r.MAX;let we={[Yc]:r.ZERO,[Zc]:r.ONE,[Jc]:r.SRC_COLOR,[$c]:r.SRC_ALPHA,[rh]:r.SRC_ALPHA_SATURATE,[nh]:r.DST_COLOR,[eh]:r.DST_ALPHA,[Kc]:r.ONE_MINUS_SRC_COLOR,[Qc]:r.ONE_MINUS_SRC_ALPHA,[ih]:r.ONE_MINUS_DST_COLOR,[th]:r.ONE_MINUS_DST_ALPHA,[sh]:r.CONSTANT_COLOR,[ah]:r.ONE_MINUS_CONSTANT_COLOR,[oh]:r.CONSTANT_ALPHA,[lh]:r.ONE_MINUS_CONSTANT_ALPHA};function A(S,P,k,F,ae,q,J,ve,Re,Se){if(S!==Di){if(d===!1&&(Me(r.BLEND),d=!0),S===Hc)ae=ae||P,q=q||k,J=J||F,P===p&&ae===g||(r.blendEquationSeparate(Y[P],Y[ae]),p=P,g=ae),k===v&&F===m&&q===_&&J===y||(r.blendFuncSeparate(we[k],we[F],we[q],we[J]),v=k,m=F,_=q,y=J),ve.equals(x)!==!1&&Re===T||(r.blendColor(ve.r,ve.g,ve.b,Re),x.copy(ve),T=Re),f=S,C=!1;else if(S!==f||Se!==C){if(p===Ar&&g===Ar||(r.blendEquation(r.FUNC_ADD),p=Ar,g=Ar),Se)switch(S){case vs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ko:r.blendFunc(r.ONE,r.ONE);break;case $o:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Qo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case vs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ko:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case $o:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}v=null,m=null,_=null,y=null,x.set(0,0,0),T=0,f=S,C=Se}}else d===!0&&(_e(r.BLEND),d=!1)}function E(S){O!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),O=S)}function H(S){S!==kc?(Me(r.CULL_FACE),S!==W&&(S===Zo?r.cullFace(r.BACK):S===Vc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):_e(r.CULL_FACE),W=S}function B(S,P,k){S?(Me(r.POLYGON_OFFSET_FILL),L===P&&z===k||(r.polygonOffset(P,k),L=P,z=k)):_e(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:Me,disable:_e,bindFramebuffer:function(S,P){return c[S]!==P&&(r.bindFramebuffer(S,P),c[S]=P,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(S,P){let k=h,F=!1;if(S){k=l.get(P),k===void 0&&(k=[],l.set(P,k));let ae=S.textures;if(k.length!==ae.length||k[0]!==r.COLOR_ATTACHMENT0){for(let q=0,J=ae.length;q<J;q++)k[q]=r.COLOR_ATTACHMENT0+q;k.length=ae.length,F=!0}}else k[0]!==r.BACK&&(k[0]=r.BACK,F=!0);F&&r.drawBuffers(k)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:A,setMaterial:function(S,P){S.side===Bt?_e(r.CULL_FACE):Me(r.CULL_FACE);let k=S.side===Nn;P&&(k=!k),E(k),S.blending===vs&&S.transparent===!1?A(Di):A(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let F=S.stencilWrite;i.setTest(F),F&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),B(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?Me(r.SAMPLE_ALPHA_TO_COVERAGE):_e(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:H,setLineWidth:function(S){S!==D&&(j&&r.lineWidth(S),D=S)},setPolygonOffset:B,setScissorTest:function(S){S?Me(r.SCISSOR_TEST):_e(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+N-1),ne!==S&&(r.activeTexture(S),ne=S)},bindTexture:function(S,P,k){k===void 0&&(k=ne===null?r.TEXTURE0+N-1:ne);let F=ge[k];F===void 0&&(F={type:void 0,texture:void 0},ge[k]=F),F.type===S&&F.texture===P||(ne!==k&&(r.activeTexture(k),ne=k),r.bindTexture(S,P||le[S]),F.type=S,F.texture=P)},unbindTexture:function(){let S=ge[ne];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,P){let k=a.get(P);k===void 0&&(k=new WeakMap,a.set(P,k));let F=k.get(S);F===void 0&&(F=r.getUniformBlockIndex(P,S.name),k.set(S,F))},uniformBlockBinding:function(S,P){let k=a.get(P).get(S);s.get(P)!==k&&(r.uniformBlockBinding(P,k,S.__bindingPointIndex),s.set(P,k))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){Q.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),Q.copy(S))},viewport:function(S){oe.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),oe.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ne=null,ge={},c={},l=new WeakMap,h=[],u=null,d=!1,f=null,p=null,v=null,m=null,g=null,_=null,y=null,x=new Ye(0,0,0),T=0,C=!1,O=null,W=null,D=null,L=null,z=null,Q.set(0,0,r.canvas.width,r.canvas.height),oe.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function Up(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return f?new OffscreenCanvas(A,E):Zr("canvas")}function v(A,E,H){let B=1,S=we(A);if((S.width>H||S.height>H)&&(B=H/Math.max(S.width,S.height)),B<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let P=Math.floor(B*S.width),k=Math.floor(B*S.height);u===void 0&&(u=p(P,k));let F=E?p(P,k):u;return F.width=P,F.height=k,F.getContext("2d").drawImage(A,0,0,P,k),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+P+"x"+k+")."),F}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),A}return A}function m(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(A,E,H,B,S=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let P=E;if(E===r.RED&&(H===r.FLOAT&&(P=r.R32F),H===r.HALF_FLOAT&&(P=r.R16F),H===r.UNSIGNED_BYTE&&(P=r.R8)),E===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.R8UI),H===r.UNSIGNED_SHORT&&(P=r.R16UI),H===r.UNSIGNED_INT&&(P=r.R32UI),H===r.BYTE&&(P=r.R8I),H===r.SHORT&&(P=r.R16I),H===r.INT&&(P=r.R32I)),E===r.RG&&(H===r.FLOAT&&(P=r.RG32F),H===r.HALF_FLOAT&&(P=r.RG16F),H===r.UNSIGNED_BYTE&&(P=r.RG8)),E===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RG8UI),H===r.UNSIGNED_SHORT&&(P=r.RG16UI),H===r.UNSIGNED_INT&&(P=r.RG32UI),H===r.BYTE&&(P=r.RG8I),H===r.SHORT&&(P=r.RG16I),H===r.INT&&(P=r.RG32I)),E===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RGB8UI),H===r.UNSIGNED_SHORT&&(P=r.RGB16UI),H===r.UNSIGNED_INT&&(P=r.RGB32UI),H===r.BYTE&&(P=r.RGB8I),H===r.SHORT&&(P=r.RGB16I),H===r.INT&&(P=r.RGB32I)),E===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),H===r.UNSIGNED_INT&&(P=r.RGBA32UI),H===r.BYTE&&(P=r.RGBA8I),H===r.SHORT&&(P=r.RGBA16I),H===r.INT&&(P=r.RGBA32I)),E===r.RGB&&(H===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),E===r.RGBA){let k=S?qr:_t.getTransfer(B);H===r.FLOAT&&(P=r.RGBA32F),H===r.HALF_FLOAT&&(P=r.RGBA16F),H===r.UNSIGNED_BYTE&&(P=k===Et?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function x(A,E){let H;return A?E===null||E===Yi||E===Pr?H=r.DEPTH24_STENCIL8:E===kn?H=r.DEPTH32F_STENCIL8:E===Rr&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Yi||E===Pr?H=r.DEPTH_COMPONENT24:E===kn?H=r.DEPTH_COMPONENT32F:E===Rr&&(H=r.DEPTH_COMPONENT16),H}function T(A,E){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==ei&&A.minFilter!==ti?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function C(A){let E=A.target;E.removeEventListener("dispose",C),(function(H){let B=n.get(H);if(B.__webglInit===void 0)return;let S=H.source,P=d.get(S);if(P){let k=P[B.__cacheKey];k.usedTimes--,k.usedTimes===0&&W(H),Object.keys(P).length===0&&d.delete(S)}n.remove(H)})(E),E.isVideoTexture&&h.delete(E)}function O(A){let E=A.target;E.removeEventListener("dispose",O),(function(H){let B=n.get(H);if(H.depthTexture&&(H.depthTexture.dispose(),n.remove(H.depthTexture)),H.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(B.__webglFramebuffer[P]))for(let k=0;k<B.__webglFramebuffer[P].length;k++)r.deleteFramebuffer(B.__webglFramebuffer[P][k]);else r.deleteFramebuffer(B.__webglFramebuffer[P]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[P])}else{if(Array.isArray(B.__webglFramebuffer))for(let P=0;P<B.__webglFramebuffer.length;P++)r.deleteFramebuffer(B.__webglFramebuffer[P]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let P=0;P<B.__webglColorRenderbuffer.length;P++)B.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[P]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}let S=H.textures;for(let P=0,k=S.length;P<k;P++){let F=n.get(S[P]);F.__webglTexture&&(r.deleteTexture(F.__webglTexture),a.memory.textures--),n.remove(S[P])}n.remove(H)})(E)}function W(A){let E=n.get(A);r.deleteTexture(E.__webglTexture);let H=A.source;delete d.get(H)[E.__cacheKey],a.memory.textures--}let D=0;function L(A,E){let H=n.get(A);if(A.isVideoTexture&&(function(B){let S=a.render.frame;h.get(B)!==S&&(h.set(B,S),B.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){let B=A.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(B.complete!==!1)return void ge(H,A,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+E)}let z={[qn]:r.REPEAT,[mr]:r.CLAMP_TO_EDGE,[ta]:r.MIRRORED_REPEAT},N={[ei]:r.NEAREST,[yh]:r.NEAREST_MIPMAP_NEAREST,[xs]:r.NEAREST_MIPMAP_LINEAR,[ti]:r.LINEAR,[ja]:r.LINEAR_MIPMAP_NEAREST,[qi]:r.LINEAR_MIPMAP_LINEAR},j={[Eh]:r.NEVER,[Lh]:r.ALWAYS,[Ah]:r.LESS,[Nl]:r.LEQUAL,[Ch]:r.EQUAL,[Ih]:r.GEQUAL,[Rh]:r.GREATER,[Ph]:r.NOTEQUAL};function V(A,E){if(E.type!==kn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ti&&E.magFilter!==ja&&E.magFilter!==xs&&E.magFilter!==qi&&E.minFilter!==ti&&E.minFilter!==ja&&E.minFilter!==xs&&E.minFilter!==qi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,z[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,z[E.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,z[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,N[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,N[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ei||E.minFilter!==xs&&E.minFilter!==qi||E.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function te(A,E){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",C));let B=E.source,S=d.get(B);S===void 0&&(S={},d.set(B,S));let P=(function(k){let F=[];return F.push(k.wrapS),F.push(k.wrapT),F.push(k.wrapR||0),F.push(k.magFilter),F.push(k.minFilter),F.push(k.anisotropy),F.push(k.internalFormat),F.push(k.format),F.push(k.type),F.push(k.generateMipmaps),F.push(k.premultiplyAlpha),F.push(k.flipY),F.push(k.unpackAlignment),F.push(k.colorSpace),F.join()})(E);if(P!==A.__cacheKey){S[P]===void 0&&(S[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,H=!0),S[P].usedTimes++;let k=S[A.__cacheKey];k!==void 0&&(S[A.__cacheKey].usedTimes--,k.usedTimes===0&&W(E)),A.__cacheKey=P,A.__webglTexture=S[P].texture}return H}function ne(A,E,H){return Math.floor(Math.floor(A/H)/E)}function ge(A,E,H){let B=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(B=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(B=r.TEXTURE_3D);let S=te(A,E),P=E.source;t.bindTexture(B,A.__webglTexture,r.TEXTURE0+H);let k=n.get(P);if(P.version!==k.__version||S===!0){t.activeTexture(r.TEXTURE0+H);let F=_t.getPrimaries(_t.workingColorSpace),ae=E.colorSpace===Zi?null:_t.getPrimaries(E.colorSpace),q=E.colorSpace===Zi||F===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let J=v(E.image,!1,i.maxTextureSize);J=Y(E,J);let ve=s.convert(E.format,E.colorSpace),Re=s.convert(E.type),Se,Fe=y(E.internalFormat,ve,Re,E.colorSpace,E.isVideoTexture);V(B,E);let Ge=E.mipmaps,pe=E.isVideoTexture!==!0,Le=k.__version===void 0||S===!0,Ce=P.dataReady,Ve=T(E,J);if(E.isDepthTexture)Fe=x(E.format===Ss,E.type),Le&&(pe?t.texStorage2D(r.TEXTURE_2D,1,Fe,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,Fe,J.width,J.height,0,ve,Re,null));else if(E.isDataTexture)if(Ge.length>0){pe&&Le&&t.texStorage2D(r.TEXTURE_2D,Ve,Fe,Ge[0].width,Ge[0].height);for(let be=0,Ue=Ge.length;be<Ue;be++)Se=Ge[be],pe?Ce&&t.texSubImage2D(r.TEXTURE_2D,be,0,0,Se.width,Se.height,ve,Re,Se.data):t.texImage2D(r.TEXTURE_2D,be,Fe,Se.width,Se.height,0,ve,Re,Se.data);E.generateMipmaps=!1}else pe?(Le&&t.texStorage2D(r.TEXTURE_2D,Ve,Fe,J.width,J.height),Ce&&(function(be,Ue,He,At){let Be=be.updateRanges;if(Be.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ue.width,Ue.height,He,At,Ue.data);else{Be.sort((G,Nt)=>G.start-Nt.start);let dt=0;for(let G=1;G<Be.length;G++){let Nt=Be[dt],gt=Be[G],wt=Nt.start+Nt.count,yn=ne(gt.start,Ue.width,4),zt=ne(Nt.start,Ue.width,4);gt.start<=wt+1&&yn===zt&&ne(gt.start+gt.count-1,Ue.width,4)===yn?Nt.count=Math.max(Nt.count,gt.start+gt.count-Nt.start):(++dt,Be[dt]=gt)}Be.length=dt+1;let tt=r.getParameter(r.UNPACK_ROW_LENGTH),an=r.getParameter(r.UNPACK_SKIP_PIXELS),Pt=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Ue.width);for(let G=0,Nt=Be.length;G<Nt;G++){let gt=Be[G],wt=Math.floor(gt.start/4),yn=Math.ceil(gt.count/4),zt=wt%Ue.width,Wt=Math.floor(wt/Ue.width),it=yn;r.pixelStorei(r.UNPACK_SKIP_PIXELS,zt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Wt),t.texSubImage2D(r.TEXTURE_2D,0,zt,Wt,it,1,He,At,Ue.data)}be.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,tt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,an),r.pixelStorei(r.UNPACK_SKIP_ROWS,Pt)}})(E,J,ve,Re)):t.texImage2D(r.TEXTURE_2D,0,Fe,J.width,J.height,0,ve,Re,J.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){pe&&Le&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ve,Fe,Ge[0].width,Ge[0].height,J.depth);for(let be=0,Ue=Ge.length;be<Ue;be++)if(Se=Ge[be],E.format!==Vn)if(ve!==null)if(pe){if(Ce)if(E.layerUpdates.size>0){let He=kl(Se.width,Se.height,E.format,E.type);for(let At of E.layerUpdates){let Be=Se.data.subarray(At*He/Se.data.BYTES_PER_ELEMENT,(At+1)*He/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,At,Se.width,Se.height,1,ve,Be)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Se.width,Se.height,J.depth,ve,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,be,Fe,Se.width,Se.height,J.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pe?Ce&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Se.width,Se.height,J.depth,ve,Re,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,be,Fe,Se.width,Se.height,J.depth,0,ve,Re,Se.data)}else{pe&&Le&&t.texStorage2D(r.TEXTURE_2D,Ve,Fe,Ge[0].width,Ge[0].height);for(let be=0,Ue=Ge.length;be<Ue;be++)Se=Ge[be],E.format!==Vn?ve!==null?pe?Ce&&t.compressedTexSubImage2D(r.TEXTURE_2D,be,0,0,Se.width,Se.height,ve,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,be,Fe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?Ce&&t.texSubImage2D(r.TEXTURE_2D,be,0,0,Se.width,Se.height,ve,Re,Se.data):t.texImage2D(r.TEXTURE_2D,be,Fe,Se.width,Se.height,0,ve,Re,Se.data)}else if(E.isDataArrayTexture)if(pe){if(Le&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ve,Fe,J.width,J.height,J.depth),Ce)if(E.layerUpdates.size>0){let be=kl(J.width,J.height,E.format,E.type);for(let Ue of E.layerUpdates){let He=J.data.subarray(Ue*be/J.data.BYTES_PER_ELEMENT,(Ue+1)*be/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ue,J.width,J.height,1,ve,Re,He)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ve,Re,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,J.width,J.height,J.depth,0,ve,Re,J.data);else if(E.isData3DTexture)pe?(Le&&t.texStorage3D(r.TEXTURE_3D,Ve,Fe,J.width,J.height,J.depth),Ce&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ve,Re,J.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,J.width,J.height,J.depth,0,ve,Re,J.data);else if(E.isFramebufferTexture){if(Le)if(pe)t.texStorage2D(r.TEXTURE_2D,Ve,Fe,J.width,J.height);else{let be=J.width,Ue=J.height;for(let He=0;He<Ve;He++)t.texImage2D(r.TEXTURE_2D,He,Fe,be,Ue,0,ve,Re,null),be>>=1,Ue>>=1}}else if(Ge.length>0){if(pe&&Le){let be=we(Ge[0]);t.texStorage2D(r.TEXTURE_2D,Ve,Fe,be.width,be.height)}for(let be=0,Ue=Ge.length;be<Ue;be++)Se=Ge[be],pe?Ce&&t.texSubImage2D(r.TEXTURE_2D,be,0,0,ve,Re,Se):t.texImage2D(r.TEXTURE_2D,be,Fe,ve,Re,Se);E.generateMipmaps=!1}else if(pe){if(Le){let be=we(J);t.texStorage2D(r.TEXTURE_2D,Ve,Fe,be.width,be.height)}Ce&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,Re,J)}else t.texImage2D(r.TEXTURE_2D,0,Fe,ve,Re,J);m(E)&&g(B),k.__version=P.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ce(A,E,H,B,S,P){let k=s.convert(H.format,H.colorSpace),F=s.convert(H.type),ae=y(H.internalFormat,k,F,H.colorSpace),q=n.get(E),J=n.get(H);if(J.__renderTarget=E,!q.__hasExternalTextures){let ve=Math.max(1,E.width>>P),Re=Math.max(1,E.height>>P);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,P,ae,ve,Re,E.depth,0,k,F,null):t.texImage2D(S,P,ae,ve,Re,0,k,F,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),_e(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,B,S,J.__webglTexture,0,Me(E)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,B,S,J.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(A,E,H){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let B=E.depthTexture,S=B&&B.isDepthTexture?B.type:null,P=x(E.stencilBuffer,S),k=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,F=Me(E);_e(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,F,P,E.width,E.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,F,P,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,P,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,k,r.RENDERBUFFER,A)}else{let B=E.textures;for(let S=0;S<B.length;S++){let P=B[S],k=s.convert(P.format,P.colorSpace),F=s.convert(P.type),ae=y(P.internalFormat,k,F,P.colorSpace),q=Me(E);H&&_e(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,q,ae,E.width,E.height):_e(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,q,ae,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ae,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Q(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let H=n.get(E.depthTexture);H.__renderTarget=E,H.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),L(E.depthTexture,0);let B=H.__webglTexture,S=Me(E);if(E.depthTexture.format===Ms)_e(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,B,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,B,0);else{if(E.depthTexture.format!==Ss)throw new Error("Unknown depthTexture format");_e(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,B,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,B,0)}}function oe(A){let E=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let B=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),B){let S=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,B.removeEventListener("dispose",S)};B.addEventListener("dispose",S),E.__depthDisposeCallback=S}E.__boundDepthTexture=B}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let B=A.texture.mipmaps;B&&B.length>0?Q(E.__webglFramebuffer[0],A):Q(E.__webglFramebuffer,A)}else if(H){E.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[B]),E.__webglDepthbuffer[B]===void 0)E.__webglDepthbuffer[B]=r.createRenderbuffer(),Te(E.__webglDepthbuffer[B],A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer[B];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}else{let B=A.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),Te(E.__webglDepthbuffer,A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Ae=[],le=[];function Me(A){return Math.min(i.maxSamples,A.samples)}function _e(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Y(A,E){let H=A.colorSpace,B=A.format,S=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==Gi&&H!==Zi&&(_t.getTransfer(H)===Et?B===Vn&&S===ri||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function we(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A},this.resetTextureUnits=function(){D=0},this.setTexture2D=L,this.setTexture2DArray=function(A,E){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?ge(H,A,E):t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(A,E){let H=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version?ge(H,A,E):t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(A,E){let H=n.get(A);A.version>0&&H.__version!==A.version?(function(B,S,P){if(S.image.length!==6)return;let k=te(B,S),F=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+P);let ae=n.get(F);if(F.version!==ae.__version||k===!0){t.activeTexture(r.TEXTURE0+P);let q=_t.getPrimaries(_t.workingColorSpace),J=S.colorSpace===Zi?null:_t.getPrimaries(S.colorSpace),ve=S.colorSpace===Zi||q===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let Re=S.isCompressedTexture||S.image[0].isCompressedTexture,Se=S.image[0]&&S.image[0].isDataTexture,Fe=[];for(let Be=0;Be<6;Be++)Fe[Be]=Re||Se?Se?S.image[Be].image:S.image[Be]:v(S.image[Be],!0,i.maxCubemapSize),Fe[Be]=Y(S,Fe[Be]);let Ge=Fe[0],pe=s.convert(S.format,S.colorSpace),Le=s.convert(S.type),Ce=y(S.internalFormat,pe,Le,S.colorSpace),Ve=S.isVideoTexture!==!0,be=ae.__version===void 0||k===!0,Ue=F.dataReady,He,At=T(S,Ge);if(V(r.TEXTURE_CUBE_MAP,S),Re){Ve&&be&&t.texStorage2D(r.TEXTURE_CUBE_MAP,At,Ce,Ge.width,Ge.height);for(let Be=0;Be<6;Be++){He=Fe[Be].mipmaps;for(let dt=0;dt<He.length;dt++){let tt=He[dt];S.format!==Vn?pe!==null?Ve?Ue&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt,0,0,tt.width,tt.height,pe,tt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt,Ce,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?Ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt,0,0,tt.width,tt.height,pe,Le,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt,Ce,tt.width,tt.height,0,pe,Le,tt.data)}}}else{if(He=S.mipmaps,Ve&&be){He.length>0&&At++;let Be=we(Fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,At,Ce,Be.width,Be.height)}for(let Be=0;Be<6;Be++)if(Se){Ve?Ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Fe[Be].width,Fe[Be].height,pe,Le,Fe[Be].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Ce,Fe[Be].width,Fe[Be].height,0,pe,Le,Fe[Be].data);for(let dt=0;dt<He.length;dt++){let tt=He[dt].image[Be].image;Ve?Ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt+1,0,0,tt.width,tt.height,pe,Le,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt+1,Ce,tt.width,tt.height,0,pe,Le,tt.data)}}else{Ve?Ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,pe,Le,Fe[Be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Ce,pe,Le,Fe[Be]);for(let dt=0;dt<He.length;dt++){let tt=He[dt];Ve?Ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt+1,0,0,pe,Le,tt.image[Be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Be,dt+1,Ce,pe,Le,tt.image[Be])}}}m(S)&&g(r.TEXTURE_CUBE_MAP),ae.__version=F.version,S.onUpdate&&S.onUpdate(S)}B.__version=S.version})(H,A,E):t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(A,E,H){let B=n.get(A);E!==void 0&&ce(B.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&oe(A)},this.setupRenderTarget=function(A){let E=A.texture,H=n.get(A),B=n.get(E);A.addEventListener("dispose",O);let S=A.textures,P=A.isWebGLCubeRenderTarget===!0,k=S.length>1;if(k||(B.__webglTexture===void 0&&(B.__webglTexture=r.createTexture()),B.__version=E.version,a.memory.textures++),P){H.__webglFramebuffer=[];for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[F]=[];for(let ae=0;ae<E.mipmaps.length;ae++)H.__webglFramebuffer[F][ae]=r.createFramebuffer()}else H.__webglFramebuffer[F]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let F=0;F<E.mipmaps.length;F++)H.__webglFramebuffer[F]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(k)for(let F=0,ae=S.length;F<ae;F++){let q=n.get(S[F]);q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&_e(A)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let F=0;F<S.length;F++){let ae=S[F];H.__webglColorRenderbuffer[F]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[F]);let q=s.convert(ae.format,ae.colorSpace),J=s.convert(ae.type),ve=y(ae.internalFormat,q,J,ae.colorSpace,A.isXRRenderTarget===!0),Re=Me(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,ve,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+F,r.RENDERBUFFER,H.__webglColorRenderbuffer[F])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(H.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture),V(r.TEXTURE_CUBE_MAP,E);for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ce(H.__webglFramebuffer[F][ae],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,ae);else ce(H.__webglFramebuffer[F],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);m(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let F=0,ae=S.length;F<ae;F++){let q=S[F],J=n.get(q),ve=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ve=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ve,J.__webglTexture),V(ve,q),ce(H.__webglFramebuffer,A,q,r.COLOR_ATTACHMENT0+F,ve,0),m(q)&&g(ve)}t.unbindTexture()}else{let F=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(F=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(F,B.__webglTexture),V(F,E),E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ce(H.__webglFramebuffer[ae],A,E,r.COLOR_ATTACHMENT0,F,ae);else ce(H.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,F,0);m(E)&&g(F),t.unbindTexture()}A.depthBuffer&&oe(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let H=0,B=E.length;H<B;H++){let S=E[H];if(m(S)){let P=_(A),k=n.get(S).__webglTexture;t.bindTexture(P,k),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(_e(A)===!1){let E=A.textures,H=A.width,B=A.height,S=r.COLOR_BUFFER_BIT,P=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=n.get(A),F=E.length>1;if(F)for(let q=0;q<E.length;q++)t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);let ae=A.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let q=0;q<E.length;q++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),F){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,k.__webglColorRenderbuffer[q]);let J=n.get(E[q]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,H,B,0,0,H,B,S,r.NEAREST),c===!0&&(Ae.length=0,le.length=0,Ae.push(r.COLOR_ATTACHMENT0+q),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ae.push(P),le.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,le)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ae))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),F)for(let q=0;q<E.length;q++){t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.RENDERBUFFER,k.__webglColorRenderbuffer[q]);let J=n.get(E[q]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,k.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+q,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=_e}function Np(r,e){return{convert:function(t,n=Zi){let i,s=_t.getTransfer(n);if(t===ri)return r.UNSIGNED_BYTE;if(t===Ya)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Za)return r.UNSIGNED_SHORT_5_5_5_1;if(t===il)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===rl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===tl)return r.BYTE;if(t===nl)return r.SHORT;if(t===Rr)return r.UNSIGNED_SHORT;if(t===qa)return r.INT;if(t===Yi)return r.UNSIGNED_INT;if(t===kn)return r.FLOAT;if(t===Ui)return r.HALF_FLOAT;if(t===xh)return r.ALPHA;if(t===Mh)return r.RGB;if(t===Vn)return r.RGBA;if(t===Ms)return r.DEPTH_COMPONENT;if(t===Ss)return r.DEPTH_STENCIL;if(t===Ja)return r.RED;if(t===Ka)return r.RED_INTEGER;if(t===Sh)return r.RG;if(t===sl)return r.RG_INTEGER;if(t===al)return r.RGBA_INTEGER;if(t===$a||t===Qa||t===eo||t===to)if(s===Et){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===$a)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Qa)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===eo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===to)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===$a)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Qa)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===eo)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===to)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===ol||t===ll||t===cl||t===hl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===ol)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===ll)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===cl)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===hl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===ul||t===dl||t===pl){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===ul||t===dl)return s===Et?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===pl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===ml||t===fl||t===gl||t===vl||t===_l||t===yl||t===xl||t===Ml||t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===ml)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===fl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===gl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===vl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===_l)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===yl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===xl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ml)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Sl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Tl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===bl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===wl)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===El)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Al)return s===Et?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Cl||t===Rl||t===Pl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Cl)return s===Et?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Rl)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Pl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Il||t===Ll||t===Dl||t===Ul){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Il)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Ll)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Dl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Ul)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Pr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var ec=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new as(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new hn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new qt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},tc=class extends vi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null,v=typeof XRWebGLBinding<"u",m=new ec,g={},_=t.getContextAttributes(),y=null,x=null,T=[],C=[],O=new ue,W=null,D=new Vt;D.viewport=new xt;let L=new Vt;L.viewport=new xt;let z=[D,L],N=new Na,j=null,V=null;function te(le){let Me=C.indexOf(le.inputSource);if(Me===-1)return;let _e=T[Me];_e!==void 0&&(_e.update(le.inputSource,le.frame,l||a),_e.dispatchEvent({type:le.type,data:le.inputSource}))}function ne(){i.removeEventListener("select",te),i.removeEventListener("selectstart",te),i.removeEventListener("selectend",te),i.removeEventListener("squeeze",te),i.removeEventListener("squeezestart",te),i.removeEventListener("squeezeend",te),i.removeEventListener("end",ne),i.removeEventListener("inputsourceschange",ge);for(let le=0;le<T.length;le++){let Me=C[le];Me!==null&&(C[le]=null,T[le].disconnect(Me))}j=null,V=null,m.reset();for(let le in g)delete g[le];e.setRenderTarget(y),f=null,d=null,u=null,i=null,x=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(W),e.setSize(O.width,O.height,!1),n.dispatchEvent({type:"sessionend"})}function ge(le){for(let Me=0;Me<le.removed.length;Me++){let _e=le.removed[Me],Y=C.indexOf(_e);Y>=0&&(C[Y]=null,T[Y].disconnect(_e))}for(let Me=0;Me<le.added.length;Me++){let _e=le.added[Me],Y=C.indexOf(_e);if(Y===-1){for(let A=0;A<T.length;A++){if(A>=C.length){C.push(_e),Y=A;break}if(C[A]===null){C[A]=_e,Y=A;break}}if(Y===-1)break}let we=T[Y];we&&we.connect(_e)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let Me=T[le];return Me===void 0&&(Me=new _r,T[le]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(le){let Me=T[le];return Me===void 0&&(Me=new _r,T[le]=Me),Me.getGripSpace()},this.getHand=function(le){let Me=T[le];return Me===void 0&&(Me=new _r,T[le]=Me),Me.getHandSpace()},this.setFramebufferScaleFactor=function(le){s=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(le){l=le},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(le){if(i=le,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",te),i.addEventListener("selectstart",te),i.addEventListener("selectend",te),i.addEventListener("squeeze",te),i.addEventListener("squeezestart",te),i.addEventListener("squeezeend",te),i.addEventListener("end",ne),i.addEventListener("inputsourceschange",ge),_.xrCompatible!==!0&&await t.makeXRCompatible(),W=e.getPixelRatio(),e.getSize(O),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,_e=null,Y=null;_.depth&&(Y=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=_.stencil?Ss:Ms,_e=_.stencil?Pr:Yi);let we={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(we),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Bn(d.textureWidth,d.textureHeight,{format:Vn,type:ri,depthTexture:new ss(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Bn(f.framebufferWidth,f.framebufferHeight,{format:Vn,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ae.setContext(i),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let ce=new w,Te=new w;function Q(le,Me){Me===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(Me.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(i===null)return;let Me=le.near,_e=le.far;m.texture!==null&&(m.depthNear>0&&(Me=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),N.near=L.near=D.near=Me,N.far=L.far=D.far=_e,j===N.near&&V===N.far||(i.updateRenderState({depthNear:N.near,depthFar:N.far}),j=N.near,V=N.far),N.layers.mask=6|le.layers.mask,D.layers.mask=3&N.layers.mask,L.layers.mask=5&N.layers.mask;let Y=le.parent,we=N.cameras;Q(N,Y);for(let A=0;A<we.length;A++)Q(we[A],Y);we.length===2?(function(A,E,H){ce.setFromMatrixPosition(E.matrixWorld),Te.setFromMatrixPosition(H.matrixWorld);let B=ce.distanceTo(Te),S=E.projectionMatrix.elements,P=H.projectionMatrix.elements,k=S[14]/(S[10]-1),F=S[14]/(S[10]+1),ae=(S[9]+1)/S[5],q=(S[9]-1)/S[5],J=(S[8]-1)/S[0],ve=(P[8]+1)/P[0],Re=k*J,Se=k*ve,Fe=B/(-J+ve),Ge=Fe*-J;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ge),A.translateZ(Fe),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),S[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let pe=k+Fe,Le=F+Fe,Ce=Re-Ge,Ve=Se+(B-Ge),be=ae*F/Le*pe,Ue=q*F/Le*pe;A.projectionMatrix.makePerspective(Ce,Ve,be,Ue,pe,Le),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(N,D,L):N.projectionMatrix.copy(D.projectionMatrix),(function(A,E,H){H===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(H.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*ia*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(le,N,Y)},this.getCamera=function(){return N},this.getFoveation=function(){if(d!==null||f!==null)return c},this.setFoveation=function(le){c=le,d!==null&&(d.fixedFoveation=le),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=le)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(le){return g[le]};let oe=null,Ae=new hu;Ae.setAnimationLoop(function(le,Me){if(h=Me.getViewerPose(l||a),p=Me,h!==null){let _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Y=!1;_e.length!==N.cameras.length&&(N.cameras.length=0,Y=!0);for(let A=0;A<_e.length;A++){let E=_e[A],H=null;if(f!==null)H=f.getViewport(E);else{let S=u.getViewSubImage(d,E);H=S.viewport,A===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let B=z[A];B===void 0&&(B=new Vt,B.layers.enable(A),B.viewport=new xt,z[A]=B),B.matrix.fromArray(E.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(E.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(H.x,H.y,H.width,H.height),A===0&&(N.matrix.copy(B.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Y===!0&&N.cameras.push(B)}let we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let A=u.getDepthInformation(_e[0]);A&&A.isValid&&A.texture&&m.init(A,i.renderState)}if(we&&we.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<_e.length;A++){let E=_e[A].camera;if(E){let H=g[E];H||(H=new as,g[E]=H);let B=u.getCameraImage(E);H.sourceTexture=B}}}}for(let _e=0;_e<T.length;_e++){let Y=C[_e],we=T[_e];Y!==null&&we!==void 0&&we.update(Y,Me,l||a)}oe&&oe(le,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),p=null}),this.setAnimationLoop=function(le){oe=le},this.dispose=function(){}}},Qi=new Yn,Fp=new Je;function Op(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Nn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Nn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,Qi.copy(c),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),i.envMapRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(Qi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Bl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Nn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Bp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,f,p){let v=u.value,m=d+"_"+f;if(p[m]===void 0)return p[m]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=p[m];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return p[m]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let f=a.indexOf(d.__bindingPointIndex);a.splice(f,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let f=d.program;n.uniformBlockBinding(u,f)},update:function(u,d){let f=i[u.id];f===void 0&&((function(m){let g=m.uniforms,_=0,y=16;for(let T=0,C=g.length;T<C;T++){let O=Array.isArray(g[T])?g[T]:[g[T]];for(let W=0,D=O.length;W<D;W++){let L=O[W],z=Array.isArray(L.value)?L.value:[L.value];for(let N=0,j=z.length;N<j;N++){let V=l(z[N]),te=_%y,ne=te%V.boundary,ge=te+ne;_+=ne,ge!==0&&y-ge<V.storage&&(_+=y-ge),L.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=_,_+=V.storage}}}let x=_%y;x>0&&(_+=y-x),m.__size=_,m.__cache={}})(u),f=(function(m){let g=(function(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;let _=r.createBuffer(),y=m.__size,x=m.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,y,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,_),_})(u),i[u.id]=f,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let v=e.render.frame;s[u.id]!==v&&((function(m){let g=i[m.id],_=m.uniforms,y=m.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,T=_.length;x<T;x++){let C=Array.isArray(_[x])?_[x]:[_[x]];for(let O=0,W=C.length;O<W;O++){let D=C[O];if(c(D,x,O,y)===!0){let L=D.__offset,z=Array.isArray(D.value)?D.value:[D.value],N=0;for(let j=0;j<z.length;j++){let V=z[j],te=l(V);typeof V=="number"||typeof V=="boolean"?(D.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,L+N,D.__data)):V.isMatrix3?(D.__data[0]=V.elements[0],D.__data[1]=V.elements[1],D.__data[2]=V.elements[2],D.__data[3]=0,D.__data[4]=V.elements[3],D.__data[5]=V.elements[4],D.__data[6]=V.elements[5],D.__data[7]=0,D.__data[8]=V.elements[6],D.__data[9]=V.elements[7],D.__data[10]=V.elements[8],D.__data[11]=0):(V.toArray(D.__data,N),N+=te.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Hn=class{constructor(e={}){let{canvas:t=Dh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,f;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let p=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=ct;let C=0,O=0,W=null,D=-1,L=null,z=new xt,N=new xt,j=null,V=new Ye(0),te=0,ne=t.width,ge=t.height,ce=1,Te=null,Q=null,oe=new xt(0,0,ne,ge),Ae=new xt(0,0,ne,ge),le=!1,Me=new Ii,_e=!1,Y=!1,we=new Je,A=new w,E=new xt,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},B=!1;function S(){return W===null?ce:1}let P,k,F,ae,q,J,ve,Re,Se,Fe,Ge,pe,Le,Ce,Ve,be,Ue,He,At,Be,dt,tt,an,Pt,G=n;function Nt(R,K){return t.getContext(R,K)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",yn,!1),t.addEventListener("webglcontextrestored",zt,!1),t.addEventListener("webglcontextcreationerror",Wt,!1),G===null){let K="webgl2";if(G=Nt(K,R),G===null)throw Nt(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function gt(){P=new xd(G),P.init(),tt=new Np(G,P),k=new fd(G,P,e,tt),F=new Dp(G,P),k.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),ae=new Td(G),q=new Tp,J=new Up(G,P,F,q,k,tt,ae),ve=new vd(x),Re=new yd(x),Se=new hd(G),an=new pd(G,Se),Fe=new Md(G,Se,ae,an),Ge=new wd(G,Fe,Se,ae),At=new bd(G,k,J),be=new gd(q),pe=new Sp(x,ve,Re,P,k,an,be),Le=new Op(x,q),Ce=new wp,Ve=new Pp(P),He=new dd(x,ve,Re,F,Ge,f,c),Ue=new Ip(x,Ge,k),Pt=new Bp(G,ae,k,F),Be=new md(G,P,ae),dt=new Sd(G,P,ae),ae.programs=pe.programs,x.capabilities=k,x.extensions=P,x.properties=q,x.renderLists=Ce,x.shadowMap=Ue,x.state=F,x.info=ae}gt();let wt=new tc(x,G);function yn(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function zt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let R=ae.autoReset,K=Ue.enabled,re=Ue.autoUpdate,de=Ue.needsUpdate,ie=Ue.type;gt(),ae.autoReset=R,Ue.enabled=K,Ue.autoUpdate=re,Ue.needsUpdate=de,Ue.type=ie}function Wt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function it(R){let K=R.target;K.removeEventListener("dispose",it),(function(re){(function(de){let ie=q.get(de).programs;ie!==void 0&&(ie.forEach(function(xe){pe.releaseProgram(xe)}),de.isShaderMaterial&&pe.releaseShaderCache(de))})(re),q.remove(re)})(K)}function Yt(R,K,re){R.transparent===!0&&R.side===Bt&&R.forceSinglePass===!1?(R.side=Nn,R.needsUpdate=!0,mt(R,K,re),R.side=Er,R.needsUpdate=!0,mt(R,K,re),R.side=Bt):mt(R,K,re)}this.xr=wt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(R){R!==void 0&&(ce=R,this.setSize(ne,ge,!1))},this.getSize=function(R){return R.set(ne,ge)},this.setSize=function(R,K,re=!0){wt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ne=R,ge=K,t.width=Math.floor(R*ce),t.height=Math.floor(K*ce),re===!0&&(t.style.width=R+"px",t.style.height=K+"px"),this.setViewport(0,0,R,K))},this.getDrawingBufferSize=function(R){return R.set(ne*ce,ge*ce).floor()},this.setDrawingBufferSize=function(R,K,re){ne=R,ge=K,ce=re,t.width=Math.floor(R*re),t.height=Math.floor(K*re),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(oe)},this.setViewport=function(R,K,re,de){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,K,re,de),F.viewport(z.copy(oe).multiplyScalar(ce).round())},this.getScissor=function(R){return R.copy(Ae)},this.setScissor=function(R,K,re,de){R.isVector4?Ae.set(R.x,R.y,R.z,R.w):Ae.set(R,K,re,de),F.scissor(N.copy(Ae).multiplyScalar(ce).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(R){F.setScissorTest(le=R)},this.setOpaqueSort=function(R){Te=R},this.setTransparentSort=function(R){Q=R},this.getClearColor=function(R){return R.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(R=!0,K=!0,re=!0){let de=0;if(R){let ie=!1;if(W!==null){let xe=W.texture.format;ie=xe===al||xe===sl||xe===Ka}if(ie){let xe=W.texture.type,De=xe===ri||xe===Yi||xe===Rr||xe===Pr||xe===Ya||xe===Za,Oe=He.getClearColor(),Xe=He.getClearAlpha(),Ke=Oe.r,ke=Oe.g,$e=Oe.b;De?(p[0]=Ke,p[1]=ke,p[2]=$e,p[3]=Xe,G.clearBufferuiv(G.COLOR,0,p)):(v[0]=Ke,v[1]=ke,v[2]=$e,v[3]=Xe,G.clearBufferiv(G.COLOR,0,v))}else de|=G.COLOR_BUFFER_BIT}K&&(de|=G.DEPTH_BUFFER_BIT),re&&(de|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(de)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",yn,!1),t.removeEventListener("webglcontextrestored",zt,!1),t.removeEventListener("webglcontextcreationerror",Wt,!1),He.dispose(),Ce.dispose(),Ve.dispose(),q.dispose(),ve.dispose(),Re.dispose(),Ge.dispose(),an.dispose(),Pt.dispose(),pe.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",tn),wt.removeEventListener("sessionend",nn),kt.stop()},this.renderBufferDirect=function(R,K,re,de,ie,xe){K===null&&(K=H);let De=ie.isMesh&&ie.matrixWorld.determinant()<0,Oe=(function(pt,Dt,M,b,I){Dt.isScene!==!0&&(Dt=H),J.resetTextureUnits();let Z=Dt.fog,U=b.isMeshStandardMaterial?Dt.environment:null,ee=W===null?x.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Gi,X=(b.isMeshStandardMaterial?Re:ve).get(b.envMap||U),$=b.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,he=!!M.attributes.tangent&&(!!b.normalMap||b.anisotropy>0),ze=!!M.morphAttributes.position,se=!!M.morphAttributes.normal,me=!!M.morphAttributes.color,ye=Mi;b.toneMapped&&(W!==null&&W.isXRRenderTarget!==!0||(ye=x.toneMapping));let Ne=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,je=Ne!==void 0?Ne.length:0,fe=q.get(b),Ee=g.state.lights;if(_e===!0&&(Y===!0||pt!==L)){let It=pt===L&&b.id===D;be.setState(b,pt,It)}let We=!1;b.version===fe.__version?fe.needsLights&&fe.lightsStateVersion!==Ee.state.version||fe.outputColorSpace!==ee||I.isBatchedMesh&&fe.batching===!1?We=!0:I.isBatchedMesh||fe.batching!==!0?I.isBatchedMesh&&fe.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&fe.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&fe.instancing===!1?We=!0:I.isInstancedMesh||fe.instancing!==!0?I.isSkinnedMesh&&fe.skinning===!1?We=!0:I.isSkinnedMesh||fe.skinning!==!0?I.isInstancedMesh&&fe.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&fe.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&fe.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&fe.instancingMorph===!1&&I.morphTexture!==null||fe.envMap!==X||b.fog===!0&&fe.fog!==Z?We=!0:fe.numClippingPlanes===void 0||fe.numClippingPlanes===be.numPlanes&&fe.numIntersection===be.numIntersection?(fe.vertexAlphas!==$||fe.vertexTangents!==he||fe.morphTargets!==ze||fe.morphNormals!==se||fe.morphColors!==me||fe.toneMapping!==ye||fe.morphTargetsCount!==je)&&(We=!0):We=!0:We=!0:We=!0:We=!0:(We=!0,fe.__version=b.version);let st=fe.currentProgram;We===!0&&(st=mt(b,Dt,I));let mn=!1,fn=!1,Si=!1,Ut=st.getUniforms(),Zn=fe.uniforms;if(F.useProgram(st.program)&&(mn=!0,fn=!0,Si=!0),b.id!==D&&(D=b.id,fn=!0),mn||L!==pt){F.buffers.depth.getReversed()&&pt.reversedDepth!==!0&&(pt._reversedDepth=!0,pt.updateProjectionMatrix()),Ut.setValue(G,"projectionMatrix",pt.projectionMatrix),Ut.setValue(G,"viewMatrix",pt.matrixWorldInverse);let It=Ut.map.cameraPosition;It!==void 0&&It.setValue(G,A.setFromMatrixPosition(pt.matrixWorld)),k.logarithmicDepthBuffer&&Ut.setValue(G,"logDepthBufFC",2/(Math.log(pt.far+1)/Math.LN2)),(b.isMeshPhongMaterial||b.isMeshToonMaterial||b.isMeshLambertMaterial||b.isMeshBasicMaterial||b.isMeshStandardMaterial||b.isShaderMaterial)&&Ut.setValue(G,"isOrthographic",pt.isOrthographicCamera===!0),L!==pt&&(L=pt,fn=!0,Si=!0)}if(I.isSkinnedMesh){Ut.setOptional(G,I,"bindMatrix"),Ut.setOptional(G,I,"bindMatrixInverse");let It=I.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),Ut.setValue(G,"boneTexture",It.boneTexture,J))}I.isBatchedMesh&&(Ut.setOptional(G,I,"batchingTexture"),Ut.setValue(G,"batchingTexture",I._matricesTexture,J),Ut.setOptional(G,I,"batchingIdTexture"),Ut.setValue(G,"batchingIdTexture",I._indirectTexture,J),Ut.setOptional(G,I,"batchingColorTexture"),I._colorsTexture!==null&&Ut.setValue(G,"batchingColorTexture",I._colorsTexture,J));let ws=M.morphAttributes;ws.position===void 0&&ws.normal===void 0&&ws.color===void 0||At.update(I,M,st),(fn||fe.receiveShadow!==I.receiveShadow)&&(fe.receiveShadow=I.receiveShadow,Ut.setValue(G,"receiveShadow",I.receiveShadow)),b.isMeshGouraudMaterial&&b.envMap!==null&&(Zn.envMap.value=X,Zn.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1),b.isMeshStandardMaterial&&b.envMap===null&&Dt.environment!==null&&(Zn.envMapIntensity.value=Dt.environmentIntensity),fn&&(Ut.setValue(G,"toneMappingExposure",x.toneMappingExposure),fe.needsLights&&(En=Si,(Fn=Zn).ambientLightColor.needsUpdate=En,Fn.lightProbe.needsUpdate=En,Fn.directionalLights.needsUpdate=En,Fn.directionalLightShadows.needsUpdate=En,Fn.pointLights.needsUpdate=En,Fn.pointLightShadows.needsUpdate=En,Fn.spotLights.needsUpdate=En,Fn.spotLightShadows.needsUpdate=En,Fn.rectAreaLights.needsUpdate=En,Fn.hemisphereLights.needsUpdate=En),Z&&b.fog===!0&&Le.refreshFogUniforms(Zn,Z),Le.refreshMaterialUniforms(Zn,b,ce,ge,g.state.transmissionRenderTarget[pt.id]),Lr.upload(G,ft(fe),Zn,J));var Fn,En;if(b.isShaderMaterial&&b.uniformsNeedUpdate===!0&&(Lr.upload(G,ft(fe),Zn,J),b.uniformsNeedUpdate=!1),b.isSpriteMaterial&&Ut.setValue(G,"center",I.center),Ut.setValue(G,"modelViewMatrix",I.modelViewMatrix),Ut.setValue(G,"normalMatrix",I.normalMatrix),Ut.setValue(G,"modelMatrix",I.matrixWorld),b.isShaderMaterial||b.isRawShaderMaterial){let It=b.uniformsGroups;for(let on=0,Es=It.length;on<Es;on++){let li=It[on];Pt.update(li,st),Pt.bind(li,st)}}return st})(R,K,re,de,ie);F.setMaterial(de,De);let Xe=re.index,Ke=1;if(de.wireframe===!0){if(Xe=Fe.getWireframeAttribute(re),Xe===void 0)return;Ke=2}let ke=re.drawRange,$e=re.attributes.position,nt=ke.start*Ke,Qe=(ke.start+ke.count)*Ke;xe!==null&&(nt=Math.max(nt,xe.start*Ke),Qe=Math.min(Qe,(xe.start+xe.count)*Ke)),Xe!==null?(nt=Math.max(nt,0),Qe=Math.min(Qe,Xe.count)):$e!=null&&(nt=Math.max(nt,0),Qe=Math.min(Qe,$e.count));let Ft=Qe-nt;if(Ft<0||Ft===1/0)return;let Xt;an.setup(ie,de,Oe,re,Xe);let Ct=Be;if(Xe!==null&&(Xt=Se.get(Xe),Ct=dt,Ct.setIndex(Xt)),ie.isMesh)de.wireframe===!0?(F.setLineWidth(de.wireframeLinewidth*S()),Ct.setMode(G.LINES)):Ct.setMode(G.TRIANGLES);else if(ie.isLine){let pt=de.linewidth;pt===void 0&&(pt=1),F.setLineWidth(pt*S()),ie.isLineSegments?Ct.setMode(G.LINES):ie.isLineLoop?Ct.setMode(G.LINE_LOOP):Ct.setMode(G.LINE_STRIP)}else ie.isPoints?Ct.setMode(G.POINTS):ie.isSprite&&Ct.setMode(G.TRIANGLES);if(ie.isBatchedMesh)if(ie._multiDrawInstances!==null)fr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount,ie._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))Ct.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let pt=ie._multiDrawStarts,Dt=ie._multiDrawCounts,M=ie._multiDrawCount,b=Xe?Se.get(Xe).bytesPerElement:1,I=q.get(de).currentProgram.getUniforms();for(let Z=0;Z<M;Z++)I.setValue(G,"_gl_DrawID",Z),Ct.render(pt[Z]/b,Dt[Z])}else if(ie.isInstancedMesh)Ct.renderInstances(nt,Ft,ie.count);else if(re.isInstancedBufferGeometry){let pt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,Dt=Math.min(re.instanceCount,pt);Ct.renderInstances(nt,Ft,Dt)}else Ct.render(nt,Ft)},this.compile=function(R,K,re=null){re===null&&(re=R),g=Ve.get(re),g.init(K),y.push(g),re.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),R!==re&&R.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(g.pushLight(ie),ie.castShadow&&g.pushShadow(ie))}),g.setupLights();let de=new Set;return R.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let xe=ie.material;if(xe)if(Array.isArray(xe))for(let De=0;De<xe.length;De++){let Oe=xe[De];Yt(Oe,re,ie),de.add(Oe)}else Yt(xe,re,ie),de.add(xe)}),g=y.pop(),de},this.compileAsync=function(R,K,re=null){let de=this.compile(R,K,re);return new Promise(ie=>{function xe(){de.forEach(function(De){q.get(De).currentProgram.isReady()&&de.delete(De)}),de.size!==0?setTimeout(xe,10):ie(R)}P.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Gt=null;function tn(){kt.stop()}function nn(){kt.start()}let kt=new hu;function Qt(R,K,re,de){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)re=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Me.intersectsSprite(R)){de&&E.setFromMatrixPosition(R.matrixWorld).applyMatrix4(we);let xe=Ge.update(R),De=R.material;De.visible&&m.push(R,xe,De,re,E.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Me.intersectsObject(R))){let xe=Ge.update(R),De=R.material;if(de&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),E.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),E.copy(xe.boundingSphere.center)),E.applyMatrix4(R.matrixWorld).applyMatrix4(we)),Array.isArray(De)){let Oe=xe.groups;for(let Xe=0,Ke=Oe.length;Xe<Ke;Xe++){let ke=Oe[Xe],$e=De[ke.materialIndex];$e&&$e.visible&&m.push(R,xe,$e,re,E.z,ke)}}else De.visible&&m.push(R,xe,De,re,E.z,null)}}let ie=R.children;for(let xe=0,De=ie.length;xe<De;xe++)Qt(ie[xe],K,re,de)}function dn(R,K,re,de){let ie=R.opaque,xe=R.transmissive,De=R.transparent;g.setupLightsView(re),_e===!0&&be.setGlobalState(x.clippingPlanes,re),de&&F.viewport(z.copy(de)),ie.length>0&&bn(ie,K,re),xe.length>0&&bn(xe,K,re),De.length>0&&bn(De,K,re),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function pn(R,K,re,de){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[de.id]===void 0&&(g.state.transmissionRenderTarget[de.id]=new Bn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Ui:ri,minFilter:qi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace}));let ie=g.state.transmissionRenderTarget[de.id],xe=de.viewport||z;ie.setSize(xe.z*x.transmissionResolutionScale,xe.w*x.transmissionResolutionScale);let De=x.getRenderTarget(),Oe=x.getActiveCubeFace(),Xe=x.getActiveMipmapLevel();x.setRenderTarget(ie),x.getClearColor(V),te=x.getClearAlpha(),te<1&&x.setClearColor(16777215,.5),x.clear(),B&&He.render(re);let Ke=x.toneMapping;x.toneMapping=Mi;let ke=de.viewport;if(de.viewport!==void 0&&(de.viewport=void 0),g.setupLightsView(de),_e===!0&&be.setGlobalState(x.clippingPlanes,de),bn(R,re,de),J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie),P.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let nt=0,Qe=K.length;nt<Qe;nt++){let Ft=K[nt],Xt=Ft.object,Ct=Ft.geometry,pt=Ft.material,Dt=Ft.group;if(pt.side===Bt&&Xt.layers.test(de.layers)){let M=pt.side;pt.side=Nn,pt.needsUpdate=!0,Mt(Xt,re,de,Ct,pt,Dt),pt.side=M,pt.needsUpdate=!0,$e=!0}}$e===!0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie))}x.setRenderTarget(De,Oe,Xe),x.setClearColor(V,te),ke!==void 0&&(de.viewport=ke),x.toneMapping=Ke}function bn(R,K,re){let de=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,xe=R.length;ie<xe;ie++){let De=R[ie],Oe=De.object,Xe=De.geometry,Ke=De.group,ke=De.material;ke.allowOverride===!0&&de!==null&&(ke=de),Oe.layers.test(re.layers)&&Mt(Oe,K,re,Xe,ke,Ke)}}function Mt(R,K,re,de,ie,xe){R.onBeforeRender(x,K,re,de,ie,xe),R.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ie.onBeforeRender(x,K,re,de,R,xe),ie.transparent===!0&&ie.side===Bt&&ie.forceSinglePass===!1?(ie.side=Nn,ie.needsUpdate=!0,x.renderBufferDirect(re,K,de,ie,R,xe),ie.side=Er,ie.needsUpdate=!0,x.renderBufferDirect(re,K,de,ie,R,xe),ie.side=Bt):x.renderBufferDirect(re,K,de,ie,R,xe),R.onAfterRender(x,K,re,de,ie,xe)}function mt(R,K,re){K.isScene!==!0&&(K=H);let de=q.get(R),ie=g.state.lights,xe=g.state.shadowsArray,De=ie.state.version,Oe=pe.getParameters(R,ie.state,xe,K,re),Xe=pe.getProgramCacheKey(Oe),Ke=de.programs;de.environment=R.isMeshStandardMaterial?K.environment:null,de.fog=K.fog,de.envMap=(R.isMeshStandardMaterial?Re:ve).get(R.envMap||de.environment),de.envMapRotation=de.environment!==null&&R.envMap===null?K.environmentRotation:R.envMapRotation,Ke===void 0&&(R.addEventListener("dispose",it),Ke=new Map,de.programs=Ke);let ke=Ke.get(Xe);if(ke!==void 0){if(de.currentProgram===ke&&de.lightsStateVersion===De)return wn(R,Oe),ke}else Oe.uniforms=pe.getUniforms(R),R.onBeforeCompile(Oe,x),ke=pe.acquireProgram(Oe,Xe),Ke.set(Xe,ke),de.uniforms=Oe.uniforms;let $e=de.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||($e.clippingPlanes=be.uniform),wn(R,Oe),de.needsLights=(function(nt){return nt.isMeshLambertMaterial||nt.isMeshToonMaterial||nt.isMeshPhongMaterial||nt.isMeshStandardMaterial||nt.isShadowMaterial||nt.isShaderMaterial&&nt.lights===!0})(R),de.lightsStateVersion=De,de.needsLights&&($e.ambientLightColor.value=ie.state.ambient,$e.lightProbe.value=ie.state.probe,$e.directionalLights.value=ie.state.directional,$e.directionalLightShadows.value=ie.state.directionalShadow,$e.spotLights.value=ie.state.spot,$e.spotLightShadows.value=ie.state.spotShadow,$e.rectAreaLights.value=ie.state.rectArea,$e.ltc_1.value=ie.state.rectAreaLTC1,$e.ltc_2.value=ie.state.rectAreaLTC2,$e.pointLights.value=ie.state.point,$e.pointLightShadows.value=ie.state.pointShadow,$e.hemisphereLights.value=ie.state.hemi,$e.directionalShadowMap.value=ie.state.directionalShadowMap,$e.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,$e.spotShadowMap.value=ie.state.spotShadowMap,$e.spotLightMatrix.value=ie.state.spotLightMatrix,$e.spotLightMap.value=ie.state.spotLightMap,$e.pointShadowMap.value=ie.state.pointShadowMap,$e.pointShadowMatrix.value=ie.state.pointShadowMatrix),de.currentProgram=ke,de.uniformsList=null,ke}function ft(R){if(R.uniformsList===null){let K=R.currentProgram.getUniforms();R.uniformsList=Lr.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function wn(R,K){let re=q.get(R);re.outputColorSpace=K.outputColorSpace,re.batching=K.batching,re.batchingColor=K.batchingColor,re.instancing=K.instancing,re.instancingColor=K.instancingColor,re.instancingMorph=K.instancingMorph,re.skinning=K.skinning,re.morphTargets=K.morphTargets,re.morphNormals=K.morphNormals,re.morphColors=K.morphColors,re.morphTargetsCount=K.morphTargetsCount,re.numClippingPlanes=K.numClippingPlanes,re.numIntersection=K.numClipIntersection,re.vertexAlphas=K.vertexAlphas,re.vertexTangents=K.vertexTangents,re.toneMapping=K.toneMapping}kt.setAnimationLoop(function(R){Gt&&Gt(R)}),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(R){Gt=R,wt.setAnimationLoop(R),R===null?kt.stop():kt.start()},wt.addEventListener("sessionstart",tn),wt.addEventListener("sessionend",nn),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(K),K=wt.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,K,W),g=Ve.get(R,y.length),g.init(K),y.push(g),we.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Me.setFromProjectionMatrix(we,gi,K.reversedDepth),Y=this.localClippingEnabled,_e=be.init(this.clippingPlanes,Y),m=Ce.get(R,_.length),m.init(),_.push(m),wt.enabled===!0&&wt.isPresenting===!0){let xe=x.xr.getDepthSensingMesh();xe!==null&&Qt(xe,K,-1/0,x.sortObjects)}Qt(R,K,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Te,Q),B=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,B&&He.addToRenderList(m,R),this.info.render.frame++,_e===!0&&be.beginShadows();let re=g.state.shadowsArray;Ue.render(re,R,K),_e===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();let de=m.opaque,ie=m.transmissive;if(g.setupLights(),K.isArrayCamera){let xe=K.cameras;if(ie.length>0)for(let De=0,Oe=xe.length;De<Oe;De++)pn(de,ie,R,xe[De]);B&&He.render(R);for(let De=0,Oe=xe.length;De<Oe;De++){let Xe=xe[De];dn(m,R,Xe,Xe.viewport)}}else ie.length>0&&pn(de,ie,R,K),B&&He.render(R),dn(m,R,K);W!==null&&O===0&&(J.updateMultisampleRenderTarget(W),J.updateRenderTargetMipmap(W)),R.isScene===!0&&R.onAfterRender(x,R,K),an.resetDefaultState(),D=-1,L=null,y.pop(),y.length>0?(g=y[y.length-1],_e===!0&&be.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(R,K,re){let de=q.get(R);de.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,de.__autoAllocateDepthBuffer===!1&&(de.__useRenderToTexture=!1),q.get(R.texture).__webglTexture=K,q.get(R.depthTexture).__webglTexture=de.__autoAllocateDepthBuffer?void 0:re,de.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,K){let re=q.get(R);re.__webglFramebuffer=K,re.__useDefaultFramebuffer=K===void 0};let Lt=G.createFramebuffer();this.setRenderTarget=function(R,K=0,re=0){W=R,C=K,O=re;let de=!0,ie=null,xe=!1,De=!1;if(R){let Oe=q.get(R);if(Oe.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(G.FRAMEBUFFER,null),de=!1;else if(Oe.__webglFramebuffer===void 0)J.setupRenderTarget(R);else if(Oe.__hasExternalTextures)J.rebindTextures(R,q.get(R.texture).__webglTexture,q.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let ke=R.depthTexture;if(Oe.__boundDepthTexture!==ke){if(ke!==null&&q.has(ke)&&(R.width!==ke.image.width||R.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(R)}}let Xe=R.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(De=!0);let Ke=q.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ie=Array.isArray(Ke[K])?Ke[K][re]:Ke[K],xe=!0):ie=R.samples>0&&J.useMultisampledRTT(R)===!1?q.get(R).__webglMultisampledFramebuffer:Array.isArray(Ke)?Ke[re]:Ke,z.copy(R.viewport),N.copy(R.scissor),j=R.scissorTest}else z.copy(oe).multiplyScalar(ce).floor(),N.copy(Ae).multiplyScalar(ce).floor(),j=le;if(re!==0&&(ie=Lt),F.bindFramebuffer(G.FRAMEBUFFER,ie)&&de&&F.drawBuffers(R,ie),F.viewport(z),F.scissor(N),F.setScissorTest(j),xe){let Oe=q.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+K,Oe.__webglTexture,re)}else if(De){let Oe=K;for(let Xe=0;Xe<R.textures.length;Xe++){let Ke=q.get(R.textures[Xe]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Xe,Ke.__webglTexture,re,Oe)}}else if(R!==null&&re!==0){let Oe=q.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Oe.__webglTexture,re)}D=-1},this.readRenderTargetPixels=function(R,K,re,de,ie,xe,De,Oe=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Xe=Xe[De]),Xe){F.bindFramebuffer(G.FRAMEBUFFER,Xe);try{let Ke=R.textures[Oe],ke=Ke.format,$e=Ke.type;if(!k.textureFormatReadable(ke))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable($e))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");K>=0&&K<=R.width-de&&re>=0&&re<=R.height-ie&&(R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Oe),G.readPixels(K,re,de,ie,tt.convert(ke),tt.convert($e),xe))}finally{let Ke=W!==null?q.get(W).__webglFramebuffer:null;F.bindFramebuffer(G.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(R,K,re,de,ie,xe,De,Oe=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Xe=Xe[De]),Xe){if(K>=0&&K<=R.width-de&&re>=0&&re<=R.height-ie){F.bindFramebuffer(G.FRAMEBUFFER,Xe);let Ke=R.textures[Oe],ke=Ke.format,$e=Ke.type;if(!k.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,nt),G.bufferData(G.PIXEL_PACK_BUFFER,xe.byteLength,G.STREAM_READ),R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Oe),G.readPixels(K,re,de,ie,tt.convert(ke),tt.convert($e),0);let Qe=W!==null?q.get(W).__webglFramebuffer:null;F.bindFramebuffer(G.FRAMEBUFFER,Qe);let Ft=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Uh(G,Ft,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,nt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,xe),G.deleteBuffer(nt),G.deleteSync(Ft),xe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,K=null,re=0){let de=Math.pow(2,-re),ie=Math.floor(R.image.width*de),xe=Math.floor(R.image.height*de),De=K!==null?K.x:0,Oe=K!==null?K.y:0;J.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,re,0,0,De,Oe,ie,xe),F.unbindTexture()};let et=G.createFramebuffer(),vt=G.createFramebuffer();this.copyTextureToTexture=function(R,K,re=null,de=null,ie=0,xe=null){let De,Oe,Xe,Ke,ke,$e,nt,Qe,Ft;xe===null&&(ie!==0?(fr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=ie,ie=0):xe=0);let Xt=R.isCompressedTexture?R.mipmaps[xe]:R.image;if(re!==null)De=re.max.x-re.min.x,Oe=re.max.y-re.min.y,Xe=re.isBox3?re.max.z-re.min.z:1,Ke=re.min.x,ke=re.min.y,$e=re.isBox3?re.min.z:0;else{let $=Math.pow(2,-ie);De=Math.floor(Xt.width*$),Oe=Math.floor(Xt.height*$),Xe=R.isDataArrayTexture?Xt.depth:R.isData3DTexture?Math.floor(Xt.depth*$):1,Ke=0,ke=0,$e=0}de!==null?(nt=de.x,Qe=de.y,Ft=de.z):(nt=0,Qe=0,Ft=0);let Ct=tt.convert(K.format),pt=tt.convert(K.type),Dt;K.isData3DTexture?(J.setTexture3D(K,0),Dt=G.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(J.setTexture2DArray(K,0),Dt=G.TEXTURE_2D_ARRAY):(J.setTexture2D(K,0),Dt=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,K.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,K.unpackAlignment);let M=G.getParameter(G.UNPACK_ROW_LENGTH),b=G.getParameter(G.UNPACK_IMAGE_HEIGHT),I=G.getParameter(G.UNPACK_SKIP_PIXELS),Z=G.getParameter(G.UNPACK_SKIP_ROWS),U=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,Xt.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Xt.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Ke),G.pixelStorei(G.UNPACK_SKIP_ROWS,ke),G.pixelStorei(G.UNPACK_SKIP_IMAGES,$e);let ee=R.isDataArrayTexture||R.isData3DTexture,X=K.isDataArrayTexture||K.isData3DTexture;if(R.isDepthTexture){let $=q.get(R),he=q.get(K),ze=q.get($.__renderTarget),se=q.get(he.__renderTarget);F.bindFramebuffer(G.READ_FRAMEBUFFER,ze.__webglFramebuffer),F.bindFramebuffer(G.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let me=0;me<Xe;me++)ee&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(R).__webglTexture,ie,$e+me),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(K).__webglTexture,xe,Ft+me)),G.blitFramebuffer(Ke,ke,De,Oe,nt,Qe,De,Oe,G.DEPTH_BUFFER_BIT,G.NEAREST);F.bindFramebuffer(G.READ_FRAMEBUFFER,null),F.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(ie!==0||R.isRenderTargetTexture||q.has(R)){let $=q.get(R),he=q.get(K);F.bindFramebuffer(G.READ_FRAMEBUFFER,et),F.bindFramebuffer(G.DRAW_FRAMEBUFFER,vt);for(let ze=0;ze<Xe;ze++)ee?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,$.__webglTexture,ie,$e+ze):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,$.__webglTexture,ie),X?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,he.__webglTexture,xe,Ft+ze):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,he.__webglTexture,xe),ie!==0?G.blitFramebuffer(Ke,ke,De,Oe,nt,Qe,De,Oe,G.COLOR_BUFFER_BIT,G.NEAREST):X?G.copyTexSubImage3D(Dt,xe,nt,Qe,Ft+ze,Ke,ke,De,Oe):G.copyTexSubImage2D(Dt,xe,nt,Qe,Ke,ke,De,Oe);F.bindFramebuffer(G.READ_FRAMEBUFFER,null),F.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else X?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(Dt,xe,nt,Qe,Ft,De,Oe,Xe,Ct,pt,Xt.data):K.isCompressedArrayTexture?G.compressedTexSubImage3D(Dt,xe,nt,Qe,Ft,De,Oe,Xe,Ct,Xt.data):G.texSubImage3D(Dt,xe,nt,Qe,Ft,De,Oe,Xe,Ct,pt,Xt):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,xe,nt,Qe,De,Oe,Ct,pt,Xt.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,xe,nt,Qe,Xt.width,Xt.height,Ct,Xt.data):G.texSubImage2D(G.TEXTURE_2D,xe,nt,Qe,De,Oe,Ct,pt,Xt);G.pixelStorei(G.UNPACK_ROW_LENGTH,M),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(G.UNPACK_SKIP_PIXELS,I),G.pixelStorei(G.UNPACK_SKIP_ROWS,Z),G.pixelStorei(G.UNPACK_SKIP_IMAGES,U),xe===0&&K.generateMipmaps&&G.generateMipmap(Dt),F.unbindTexture()},this.initRenderTarget=function(R){q.get(R).__webglFramebuffer===void 0&&J.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?J.setTextureCube(R,0):R.isData3DTexture?J.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?J.setTexture2DArray(R,0):J.setTexture2D(R,0),F.unbindTexture()},this.resetState=function(){C=0,O=0,W=null,F.reset(),an.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};function fu(r,e,t){let n=[],i=[],s=new Rt({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),a=new Rt({color:new Ye(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),o=new Rt({color:"#e8e5db",roughness:.88}),c=new Rt({color:"#1b1f22",roughness:.8}),l=new Rt({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(s,a,o,c,l);function h(p,v,m){let g=p.getAttribute("position"),_=[],y=[];for(let x=0;x<g.count;x++)_.push(.5+g.getX(x)/2.55,.5-g.getY(x)/3.825),y.push(m);return p.setAttribute("bodyUv",new Pe(_,2)),p.setAttribute("surface",new Pe(y,1)),n.push(p),r.mesh(p,v)}function u(p,v,m,g=.003){let _=new bt(p.map(y=>new w(...y)));return h(new St(_,24,g,6,!1),v,m)}function d(p,v,m){let g=new ht,_=p.flat();g.setAttribute("position",new Pe(_,3));let y=[];for(let x=1;x<p.length-1;x++)y.push(0,x,x+1);return g.setIndex(y),g.computeVertexNormals(),v.side=Bt,h(g,v,m)}if(["classic","ruby","midnight"].includes(e.suit)){for(let p of[-1,1]){let v=[[p*.12,1.15,.205],[p*.28,.99,.272],[p*.2,.82,.29],[p*.27,.72,.285],[p*.075,.35,.265],[p*.1,.83,.285]];d(v,s,1),u(v.slice(0,5),a,1,.004),d([[p*.24,.22,.267],[p*.39,.24,.248],[p*.39,.17,.253],[p*.24,.15,.271]],s,1),u([[p*.24,.15,.272],[p*.39,.17,.254]],a,1),u([[p*.2,1.05,-.207],[p*.35,.82,-.254],[p*.38,.38,-.244],[p*.3,.14,-.201]],a,1,.0025)}u([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],a,1,.003);for(let p of[.37,.17]){let v=new Ze(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,p,.275),h(v,c,1)}}for(let p of[-1,1]){let v=p*.45;d([[v-.065,-1.34,.185],[v+.065,-1.34,.185],[v+.075,-1.6,.34],[v-.075,-1.6,.34]],l,5);for(let m=0;m<6;m++){let g=-1.39-m*.035,_=.225+m*.023;u([[v-.067,g,_],[v,g-.015,_+.013],[v+.067,g-.022,_]],o,5,.005),u([[v+.067,g,_+.001],[v,g-.015,_+.014],[v-.067,g-.022,_+.001]],o,5,.005)}u([[v-.135,-1.78,.1],[v-.145,-1.78,.3],[v,-1.78,.445],[v+.145,-1.78,.3],[v+.135,-1.78,.1]],c,5,.007),u([[v-.1,-1.42,-.075],[v,-1.4,-.09],[v+.1,-1.42,-.075]],l,5,.008)}return{dispose(){n.forEach(p=>p.dispose()),i.forEach(p=>p.dispose())}}}var oi=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function gu(r){let e=[],t={};function n(v,m,g,_,y=0){let x=new yr;x.name=v;let T=m?m.userData.rest:[0,0,0];return x.position.set(g-T[0],_-T[1],y-T[2]),x.userData.rest=[g,_,y],(m||r).add(x),e.push(x),t[v]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[v,m]of[["left",-1],["right",1]]){let g=n(v+"Shoulder",a,m*.49,1.09),_=n(v+"Elbow",g,m*.66,.57),y=n(v+"Wrist",_,m*.78,.04,.035),x=n(v+"Hand",y,m*.79,-.15,.07);for(let O=0;O<4;O++)n(v+"Finger"+O,x,m*(.5-(.175+O*.019))*2.55,-.17-O*.007,.07);n(v+"Thumb",x,m*.63,-.13,.11);let T=n(v+"Hip",i,m*.23,-.2,-.01),C=n(v+"Knee",T,m*.34,-.77,-.01);n(v+"Ankle",C,m*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new ns(e);function h(v,m,g){let _=m<.5?"left":"right",y=i,x=i,T=0;if(v===1)y=s,x=a,T=1-oi(.25,.44,g);else if(v===2||v===9)g<.25?(y=a,x=t[_+"Shoulder"],T=oi(.175,.245,g)):g<.4?(y=t[_+"Shoulder"],x=t[_+"Elbow"],T=oi(.29,.38,g)):(y=t[_+"Elbow"],x=t[_+"Wrist"],T=oi(.43,.49,g));else if(v===3){let C=m<.5?m:1-m;g>.54?(y=t[_+"Hand"],x=t[_+(C>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((C-.175)/.019))))],T=oi(.54,.566,g)):(y=t[_+"Wrist"],x=t[_+"Hand"],T=oi(.49,.53,g))}else v===4?g<.57?(y=i,x=t[_+"Hip"],T=oi(.5,.57,g)):g<.76?(y=t[_+"Hip"],x=t[_+"Knee"],T=oi(.66,.74,g)):(y=t[_+"Knee"],x=t[_+"Ankle"],T=oi(.79,.84,g)):v===5||v===8?y=x=t[_+"Ankle"]:v===6?y=x=c:v===7&&(y=a,x=o,T=1-oi(.17,.225,g));return{indices:[e.indexOf(y),e.indexOf(x),0,0],weights:[1-T,T,0,0]}}function u(v,m){let g=v.getAttribute("bodyUv"),_=v.getAttribute("surface"),y=[],x=[];for(let C=0;C<g.count;C++){let O=h(_.getX(C),g.getX(C),g.getY(C));y.push(...O.indices),x.push(...O.weights)}v.setAttribute("skinIndex",new Vi(y,4)),v.setAttribute("skinWeight",new Pe(x,4));let T=new es(v,m);return r.add(T),T.bind(l,new Je),T.frustumCulled=!1,T}let d=0;function f(v,m,g){d+=(Number(m)-d)*(1-Math.exp(-Math.min(.1,g)*9));let _=Math.sin(v*1.55)*d;a.scale.set(1+_*.003,1+_*.003,1+_*.007),c.rotation.set(Math.sin(v*.57)*.01*d,Math.sin(v*.36)*.024*d,Math.sin(v*.41)*.008*d);for(let[y,x]of[["left",-1],["right",1]]){t[y+"Shoulder"].rotation.z=(Math.sin(v*.79+x*.5)*.009+x*.005)*d,t[y+"Elbow"].rotation.x=(Math.sin(v*.67+x*.4)*.012-.025)*d,t[y+"Hand"].rotation.x=Math.sin(v*.61+x)*.01*d;for(let T=0;T<4;T++)t[y+"Finger"+T].rotation.x=(.035+Math.sin(v*.53+T*.25+x)*.012)*d}r.updateMatrixWorld(!0),l.update()}function p(v,m){r.updateMatrixWorld(!0),t[m].attach(v)}return{skeleton:l,bones:t,mesh:u,update:f,attach:p,weights:h,dispose(){l.dispose()}}}function vu(r,e="#c5b899"){let t=new qe;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new Rt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new Rt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,T,C,O,W)=>{let D=new at(x,T);return D.position.set(C,O,W),t.add(D),D},o=a(new yt(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let T=x*Math.PI/9,C=a(new ut(.026,.049,.016),i,Math.cos(T)*.083,0,Math.sin(T)*.105);C.rotation.y=-T}let c=a(new Ze(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new yt(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),f=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":f?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":f?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=f?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let v=(x,T,C)=>{u.save(),u.rotate(x),u.strokeStyle=f?"#203337":"#f4e4bb",u.lineWidth=C,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-T),u.stroke(),u.restore()};v(-Math.PI/3,112,13),v(Math.PI/3,168,9),v(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=f?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let m=new Tt(h);m.colorSpace=ct,m.anisotropy=4;let g=a(new Gn(.066,64),new Rt({map:m,roughness:.34,metalness:.1}),0,0,.139),_=a(new Gn(.066,64),new _n({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),y=a(new Ze(.012,.012,.019,16),i,.085,0,.12);return y.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(T=>{T.geometry?.dispose(),T.material&&x.add(T.material)});for(let T of x)T.dispose();m.dispose()}}}function _u(r="#d3b15b"){let e=new qe;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new Rt({color:"#c5a14d",metalness:.9,roughness:.24}),n=new Rt({color:r,metalness:.25,roughness:.13}),i=new at(new yt(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new at(new ut(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new at(new Tr(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function yu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let pe=n.loadHelmet(!0,e.visor,!0,e.helmet);pe.naturalWidth||await new Promise((Le,Ce)=>{pe.addEventListener("load",Le,{once:!0}),pe.addEventListener("error",Ce,{once:!0})})}let s=n.renderCharacter(i,{...e,watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let f=d.getContext("2d");f.drawImage(u,0,0,1024,1536);let p=f.getImageData(0,0,1024,1536).data,v=o.getImageData(0,0,1024,1536).data,m=h.getImageData(0,0,1024,1536).data;function g(pe,Le,Ce){let Ve=Math.max(0,Math.min(1535,Math.round(Ce*1535))),be=Math.max(0,Math.min(1023,Math.round(Le*1023)));if(pe[(Ve*1024+be)*4+3]>220)return Le;for(let Ue=1;Ue<180;Ue++)for(let He of[be-Ue,be+Ue])if(He>=0&&He<1024&&pe[(Ve*1024+He)*4+3]>220)return He/1023;return Le}let _=new Tt(a),y=new Tt(l),x=new Tt(d);for(let pe of[_,y,x])pe.colorSpace=ct,pe.anisotropy=4;let T=n.wardrobeSubcategory("pants",e.pants)==="shorts",C=e.suit?.endsWith("Tank"),O=e.suit?.endsWith("Tee"),W=["classic","ruby","midnight"].includes(e.suit),D=!!e.helmet&&e.helmet!=="none",L=new hn({uniforms:{helmetColor:{value:new Ye(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new Ye(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},helmetOn:{value:D?1:0},shorts:{value:T?1:0},sleeveEnd:{value:C?.19:O?.29:.49},club:{value:W?1:0},portrait:{value:_},rear:{value:y},profile:{value:x},jacketColor:{value:new Ye(n.item("suit",e.suit).color)},pantsColor:{value:new Ye(n.item("pants",e.pants).color)},shoeColor:{value:new Ye(n.item("shoes",e.shoes).color)}},side:Bt,vertexShader:`
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
}`}),z=new qe,N=[],j=gu(z);function V(pe,{rings:Le=70,sides:Ce=80,muzzle:Ve=!1,folds:be=0,z:Ue=0,surface:He=0}={}){let At=[],Be=[],dt=[],tt=[],an=[],Pt=[],G=[],Nt=[],gt=pe[0][0],wt=pe.at(-1)[0];function yn(Wt){let it=0;for(;it<pe.length-2&&pe[it+1][0]<Wt;)it++;let Yt=pe[it],Gt=pe[it+1],tn=Math.max(0,Math.min(1,(Wt-Yt[0])/(Gt[0]-Yt[0])));return Yt.map((nn,kt)=>{if(kt===0)return Wt;let Qt=pe[Math.max(0,it-1)][kt]||0,dn=pe[Math.min(pe.length-1,it+2)][kt]||0,pn=Gt[kt]||0;return Math.max(Math.min(nn,pn),Math.min(Math.max(nn,pn),.5*(2*nn+(-Qt+pn)*tn+(2*Qt-5*nn+4*pn-dn)*tn*tn+(-Qt+3*nn-3*pn+dn)*tn*tn*tn)))})}for(let Wt=0;Wt<=Le;Wt++){let it=gt+(wt-gt)*Wt/Le,[,Yt,Gt,tn,nn=0]=yn(it),kt=(Yt+Gt)/2,Qt=(Gt-Yt)/2;for(let dn=0;dn<=Ce;dn++){let pn=2*Math.PI*dn/Ce,bn=Math.cos(pn),Mt=Math.sin(pn),mt=kt+Qt*bn,ft=tn*(1+be*Math.sin(it*260+pn*4)*Math.sin(Math.PI*Wt/Le)),wn=Ue+nn+ft*Mt;if(Ve&&Mt>0){let de=(mt-.507)/.085;wn+=.17*Math.exp(-(de*de)-((it-.126)/.031)**2)*Mt*Mt,wn+=.045*Math.exp(-(((mt-.505)/.05)**2)-((it-.104)/.015)**2)*Mt,wn-=.028*(Math.exp(-(((mt-.466)/.024)**2))+Math.exp(-(((mt-.55)/.024)**2)))*Math.exp(-(((it-.077)/.013)**2))*Mt}At.push(((He===5?kt+(mt-kt)*.88:mt)-.5)*2.55,(.5-it)*3.825,He===5?wn*.84:wn),Pt.push(mt,it),G.push(He);let Lt=mt,et=it;He===3&&(Lt=(mt<.5?.2:.8)+(mt-(Yt+Gt)/2)*.45,et=Math.min(it,.545)),Be.push(g(v,Lt,et),1-et);let vt=it,R=mt;Ve?vt=.008+(it-.008)*.74:gt<.24&&wt>.4&&Yt>.29&&Gt<.72&&(vt=.14+(it-.165)*1.08),gt>.82&&(R=kt+(mt-kt)*.8),dt.push(g(m,R,vt),1-vt);let K=Ve?it*.92:it,re=(Ve?.45:.49)+wn*.4;if(gt>=.45&&wt>.62&&it>.49&&it<.62&&(re=Math.min(re,.43)),tt.push(g(p,re,K),1-K),an.push(Mt),Wt<Le&&dn<Ce){let de=Wt*(Ce+1)+dn,ie=de+Ce+1;Nt.push(de,de+1,ie,de+1,ie+1,ie)}}}for(let Wt of[0,Le]){let it=Wt*(Ce+1),Yt=At.length/3;for(let[Gt,tn]of[[At,3],[Be,2],[dt,2],[tt,2],[Pt,2]])for(let nn=0;nn<tn;nn++){let kt=0;for(let Qt=0;Qt<Ce;Qt++)kt+=Gt[(it+Qt)*tn+nn];Gt.push(kt/Ce)}G.push(He),an.push(0);for(let Gt=0;Gt<Ce;Gt++)Wt===0?Nt.push(Yt,it+Gt+1,it+Gt):Nt.push(Yt,it+Gt,it+Gt+1)}let zt=new ht;zt.setAttribute("bodyUv",new Pe(Pt,2)),zt.setAttribute("surface",new Pe(G,1)),zt.setAttribute("position",new Pe(At,3)),zt.setAttribute("uv",new Pe(Be,2)),zt.setAttribute("rearUv",new Pe(dt,2)),zt.setAttribute("profileUv",new Pe(tt,2)),zt.setAttribute("frontWeight",new Pe(an,1)),zt.setIndex(Nt),zt.computeVertexNormals(),j.mesh(zt,L),N.push(zt)}V([[.165,.435,.575,.1],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.4,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025,surface:1}),V([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),V(D?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!D,z:.1,rings:110,sides:112,surface:6}),D||(V([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),V([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let pe of[-1,1]){let Le=Ce=>pe<0?Ce:Ce.map(([Ve,be,Ue,He,At])=>[Ve,1-Ue,1-be,He,At||0]);V(Le([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100,surface:2}),V(Le([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}),W&&V(Le([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),V(Le([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.535,.153,.247,.085],[.548,.166,.241,.065],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Ce=0;Ce<4;Ce++){let Ve=.166+Ce*.019,be=.54+Ce*.002,Ue=[.039,.046,.043,.034][Ce];V(Le([[be,Ve,Ve+.019,.024,0],[be+Ue*.35,Ve-.001,Ve+.02,.027,.004],[be+Ue*.72,Ve+.001,Ve+.018,.021,.012],[be+Ue,Ve+.005,Ve+.014,.007,.006]]),{z:.07,rings:22,sides:24,surface:3})}V(Le([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}V([[.454,.36,.65,.17],[.48,.303,.7,.24],[.53,.29,.713,.25],[.58,.3,.7,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let pe of[-1,1]){let Le=Ce=>pe<0?Ce:Ce.map(([Ve,be,Ue,He,At])=>[Ve,1-Ue,1-be,He,At||0]);V(Le([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,T?.3:.271,T?.425:.44,T?.145:.19],[.74,T?.285:.252,T?.405:.423,T?.14:.185],[.79,T?.275:.242,T?.385:.397,T?.12:.165],[.826,T?.28:.254,T?.375:.39,T?.11:.155],[.843,.283,.372,.105]]),{z:-.01,folds:.012,rings:110,surface:4}),V(Le([[.829,.285,.365,.085,0],[.848,.278,.372,.11,.005],[.875,.268,.38,.145,.035],[.907,.265,.386,.2,.07],[.944,.263,.387,.255,.09],[.961,.267,.384,.26,.095],[.97,.282,.37,.2,.085]]),{z:.035,rings:70,surface:5}),V(Le([[.958,.267,.384,.25,.09],[.967,.261,.389,.265,.09],[.978,.265,.385,.255,.09],[.983,.275,.375,.235,.09]]),{z:.035,rings:12,surface:8})}let te=fu(j,e,n),ne=e.ring&&e.ring!=="none"?_u(n.item("ring",e.ring).color):null;ne&&(z.add(ne.group),j.attach(ne.group,"rightHand"));let ge=e.watch&&e.watch!=="none"?vu(e.watch,n.item("watch",e.watch).color):null;ge&&(z.add(ge.group),j.attach(ge.group,"rightWrist"));let ce=new vn;ce.add(z);{ce.add(new Un("#fff0d4","#283849",2.1));let pe=new Tn("#fff0dc",3.5);pe.position.set(-2,4,5),ce.add(pe);let Le=new Tn("#9cc3ed",1.2);Le.position.set(3,1,-2),ce.add(Le)}let Te=new Hn({alpha:!0,antialias:!0});Te.setPixelRatio(Math.min(devicePixelRatio,2)),Te.outputColorSpace=ct,r.append(Te.domElement),Te.domElement.setAttribute("role","img"),Te.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let Q=new xi(-1.5,1.5,2.05,-2.05,.1,30);Q.position.set(0,0,8);let oe=t.yaw||0,Ae=t.pitch||0,le=null,Me,_e=!1,Y=!1,we=0,A=window.matchMedia?.("(prefers-reduced-motion: reduce)"),E="full",H=t.focusOrbit||null,B=2.05,S=0,P=0;function k(pe){pe=pe==="watch"?"watch":"full",pe!==E&&(pe==="watch"?(H=H||{yaw:oe,pitch:Ae},t.focusOrbit=H,oe=0,Ae=0):H&&(oe=H.yaw,Ae=H.pitch,H=null,delete t.focusOrbit),t.yaw=oe,t.pitch=Ae,E=pe,r.dataset.focus=E)}function F(pe){let Le=r.clientWidth/Math.max(1,r.clientHeight),Ce=E==="watch",Ve=Ce?Math.max(.4,.3/Le):Math.max(2.05,1.17/Le),be=Ce?.76*Math.cos(oe)+.1*Math.sin(oe):0,Ue=Ce?.04*Math.cos(Ae)-(.1*Math.cos(oe)-.76*Math.sin(oe))*Math.sin(Ae):0,He=1-Math.exp(-pe*12);B+=(Ve-B)*He,S+=(be-S)*He,P+=(Ue-P)*He,Q.left=S-B*Le,Q.right=S+B*Le,Q.top=P+B,Q.bottom=P-B,Q.updateProjectionMatrix()}let ae=()=>{!r.clientWidth||!r.clientHeight||(F(1),Te.setSize(r.clientWidth,r.clientHeight,!1))},q=new ResizeObserver(ae);q.observe(r),ae();let J=pe=>{Y=!1,le={id:pe.pointerId,x:pe.clientX,y:pe.clientY},r.setPointerCapture(pe.pointerId),pe.preventDefault()},ve=pe=>{!le||le.id!==pe.pointerId||(oe+=(pe.clientX-le.x)*.012,Ae=Math.max(-.35,Math.min(.35,Ae+(pe.clientY-le.y)*.006)),le.x=pe.clientX,le.y=pe.clientY)},Re=()=>{le=null},Se=pe=>{["ArrowLeft","ArrowRight"].includes(pe.key)&&(oe+=pe.key==="ArrowLeft"?-.15:.15,pe.preventDefault())};r.addEventListener("pointerdown",J),r.addEventListener("pointermove",ve),r.addEventListener("pointerup",Re),r.addEventListener("pointercancel",Re),r.addEventListener("keydown",Se);function Fe(pe=0){if(_e)return;if(!r.isConnected){Ge();return}Y&&!le&&we&&(oe+=Math.min(.05,(pe-we)/1e3)*.35),L.uniforms.idleTime.value=pe/1e3,L.uniforms.idleStrength.value=!A?.matches&&!le&&E==="full"?1:0;let Le=we?Math.min(.05,(pe-we)/1e3):.016;j.update(pe/1e3,L.uniforms.idleStrength.value,Le),F(Le),we=pe,z.rotation.set(Ae,oe,0),t.yaw=oe,t.pitch=Ae,r.dataset.yaw=String(oe),Te.render(ce,Q),Me=requestAnimationFrame(Fe)}return Fe(),{state:t,setFocus:k,setYaw(pe){oe=pe},setAutoRotate(pe){Y=!!pe},dispose:Ge};function Ge(){if(!_e){_e=!0,cancelAnimationFrame(Me),q.disconnect();for(let[pe,Le]of[["pointerdown",J],["pointermove",ve],["pointerup",Re],["pointercancel",Re],["keydown",Se]])r.removeEventListener(pe,Le);for(let pe of N)pe.dispose();ge?.dispose(),ne?.dispose(),te.dispose(),j.dispose(),L.dispose(),_.dispose(),y.dispose(),x.dispose(),Te.dispose(),Te.forceContextLoss(),Te.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new vn,s=new qe;i.add(s);let a=new Hn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=ct,a.toneMapping=ii,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new Vt(34,1,.1,40);i.add(new Un("#dcecff","#50402b",2));for(let[Y,we,A,E]of[[3,6,5,4],[-3,3,-3,3]]){let H=new Tn("#fff0dd",E);H.position.set(Y,we,A),i.add(H)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let Y=0;Y<128;Y+=2)l.fillStyle=Y%4?"#808080":"#b0b0b0",l.fillRect(0,Y,128,1);for(let Y=0;Y<128;Y+=3)l.fillStyle="#888888",l.fillRect(Y,0,1,128);let h=new Tt(c);h.wrapS=h.wrapT=qn,h.repeat.set(8,8);let u=(Y,we=0,A=.7)=>new Rt({color:Y,metalness:we,roughness:A}),d=u("#32251d"),f=u("#96715a"),p=u("#11161b"),v=u("#e0dfd4"),m=u("#d9ac4c",.8,.25),g=u("#a22c3b"),_=u("#171b20"),y=u("#171b20"),x=u("#826222",.9,.18);for(let Y of[g,_,p])Y.bumpMap=h,Y.bumpScale=.012;function T(Y,we,A,E,H,B,S,P=s){let k=new at(new sn(1,40,28),Y);return k.position.set(we,A,E),k.scale.set(H,B,S),P.add(k),k}function C(Y,we,A,E,H=E){let B=new w(...we),S=new w(...A),P=S.clone().sub(B),k=new at(E>.1?new xr((E+H)/2,Math.max(.01,P.length()-(E+H)),10,32):new Ze(H,E,P.length(),16),Y);return k.position.copy(B.add(S).multiplyScalar(.5)),k.quaternion.setFromUnitVectors(new w(0,1,0),P.normalize()),s.add(k),k}T(_,0,1.64,0,.47,.36,.26),T(g,0,2.32,0,.59,.65,.32),T(p,0,2.35,.29,.27,.49,.055);for(let Y of[-1,1]){C(_,[Y*.27,1.67,0],[Y*.29,.92,.015],.23,.25),T(_,Y*.29,.92,.015,.23,.24,.24),C(_,[Y*.29,.94,.015],[Y*.32,.28,0],.16,.22),C(v,[Y*.45,1.55,.03],[Y*.48,.36,.03],.025,.032),T(y,Y*.32,.18,.15,.22,.19,.39),T(v,Y*.32,.075,.15,.235,.065,.4),T(v,Y*.32,.27,.12,.135,.08,.2);for(let we=0;we<5;we++)C(v,[Y*.32-.1,.29,.08+we*.04],[Y*.32+.1,.29,.08+we*.04],.009);T(g,Y*.55,2.63,0,.26,.27,.29),C(g,[Y*.57,2.63,0],[Y*.76,2.12,.02],.19,.23),T(g,Y*.76,2.12,.02,.19,.2,.2),C(g,[Y*.76,2.12,.02],[Y*.88,1.65,.08],.13,.18),C(v,[Y*.71,2.6,.15],[Y*.99,1.72,.15],.035),T(p,Y*.88,1.67,.08,.145,.09,.15),T(d,Y*.89,1.48,.1,.16,.22,.12);for(let we=0;we<4;we++)T(f,Y*(.79+we*.065),1.36,.15,.035,.13,.045);T(f,Y*.75,1.48,.2,.06,.12,.06)}T(d,0,3.04,0,.25,.27,.24),T(d,0,3.39,0,.36,.43,.31);for(let Y of[-1,1])T(f,Y*.36,3.4,.01,.12,.17,.09),T(d,Y*.36,3.4,.065,.065,.1,.035),T(f,Y*.15,3.43,.258,.15,.12,.075),T(p,Y*.14,3.44,.32,.045,.035,.02),T(v,Y*.13,3.45,.335,.009,.01,.006),T(d,Y*.15,3.53,.28,.18,.05,.07);T(f,0,3.23,.27,.26,.18,.13),T(f,0,3.34,.34,.14,.08,.08),T(p,0,3.17,.375,.17,.017,.018),T(f,0,3.13,.36,.17,.035,.025);let O=new qe;s.add(O),T(p,0,3.51,-.02,.41,.42,.35,O),T(m,0,3.64,.015,.07,.3,.36,O);for(let Y of[-1,1])T(p,Y*.32,3.29,.015,.1,.31,.24,O),T(m,Y*.39,3.43,.07,.025,.05,.05,O);let W=T(x,0,3.44,.27,.38,.19,.14,O);for(let Y of[-1,1])C(p,[Y*.28,2.88,.25],[Y*.1,2.58,.33],.035),C(p,[Y*.3,2.28,.3],[Y*.39,2.09,.26],.018);for(let Y=0;Y<6;Y++)T(m,0,2.03+Y*.14,.35,.015,.015,.01);let D=document.createElement("canvas");D.width=512,D.height=256;let L=D.getContext("2d"),z=new Tt(D);z.colorSpace=ct;let N=new at(new qt(.28,.12),new Rt({map:z,roughness:.9}));N.position.set(-.27,2.46,.317),s.add(N);let j=new qe;for(let Y=0;Y<3;Y++)for(let we=0;we<5;we++){let A=new at(new qt(.048,.048),(we+Y)%2?p:v);A.position.set(-.36+we*.048,2.62+Y*.048,.318),j.add(A)}s.add(j);function V(Y){g.color.set(n.item("suit",Y.suit).color),_.color.set(n.item("pants",Y.pants).color),y.color.set(n.item("shoes",Y.shoes).color),O.visible=Y.helmet!=="none",W.position.y=Y.visor==="open"?3.71:3.44,W.rotation.x=Y.visor==="open"?-.8:0,N.visible=Y.patch!=="none",L.fillStyle="#22282b",L.fillRect(0,0,512,256),L.strokeStyle="#c9af74",L.lineWidth=12,L.strokeRect(8,8,496,240),L.fillStyle="#eee0b5",L.font="bold 72px Arial",L.textAlign="center",L.fillText(Y.patch==="name"?Y.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":Y.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),z.needsUpdate=!0}V(e),t.yaw??=0,t.pitch??=.07;let te=null,ne,ge=!1;function ce(){let Y=r.clientWidth,we=r.clientHeight;!Y||!we||(a.setSize(Y,we,!1),o.aspect=Y/we,o.updateProjectionMatrix())}let Te=new ResizeObserver(ce);Te.observe(r),ce();let Q=Y=>{te={id:Y.pointerId,x:Y.clientX,y:Y.clientY},r.setPointerCapture(Y.pointerId),Y.preventDefault()},oe=Y=>{!te||te.id!==Y.pointerId||(t.yaw-=(Y.clientX-te.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(Y.clientY-te.y)*.006)),te.x=Y.clientX,te.y=Y.clientY)},Ae=()=>{te=null},le=Y=>{(Y.key==="ArrowLeft"||Y.key==="ArrowRight")&&(t.yaw+=Y.key==="ArrowLeft"?.15:-.15,Y.preventDefault())};r.addEventListener("pointerdown",Q),r.addEventListener("pointermove",oe),r.addEventListener("pointerup",Ae),r.addEventListener("pointercancel",Ae),r.addEventListener("keydown",le);function Me(){if(ge)return;ge=!0,cancelAnimationFrame(ne),Te.disconnect();for(let[we,A]of[["pointerdown",Q],["pointermove",oe],["pointerup",Ae],["pointercancel",Ae],["keydown",le]])r.removeEventListener(we,A);let Y=new Set;i.traverse(we=>{we.geometry?.dispose(),we.material&&Y.add(we.material)});for(let we of Y)we.dispose();z.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function _e(){if(ge)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){Me();return}let Y=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Y,1.95+Math.sin(t.pitch)*Y,Math.cos(t.yaw)*Math.cos(t.pitch)*Y),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ne=requestAnimationFrame(_e)}return _e(),{update:V,dispose:Me,state:t}};function rc(r){let e=new qe;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(D,L,z)=>new _n({color:D,metalness:L,roughness:z,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(D,L,z=0,N=0,j=0)=>{let V=new at(D,L);return V.position.set(z,N,j),V.castShadow=V.receiveShadow=!0,e.add(V),V},h=(D,L,z,N=!0)=>{let j=new Sn;return j.absarc(L,z,D,0,Math.PI*2,N),j},u=t?.395:.437,d=new Jt;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let D=0;D<24;D++)for(let[L,z]of[[.28,0],[.36,.045]]){let N=D*Math.PI/12+z;d.holes.push(h(n?.009:.011,Math.cos(N)*L,Math.sin(N)*L))}for(let D of[0,.033])l(new jt(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,D);let f=new ut(.22,.014,.025),p=new rs(f,a,32),v=new Je;for(let D=0;D<32;D++){let L=D*Math.PI/16;v.compose(new w(Math.cos(L)*.31,Math.sin(L)*.31,.021),new Pn().setFromAxisAngle(new w(0,0,1),L+.18),new w(1,1,1)),p.setMatrixAt(D,v)}e.add(p);let m=l(new Ze(.184,.16,.045,48),a,0,0,.018);m.rotation.x=Math.PI/2;let g=l(new Ze(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let D=0;D<10;D++){let L=D*Math.PI/5,z=l(new Ze(.017,.017,.015,12),s,Math.cos(L)*.18,Math.sin(L)*.18,.05);z.rotation.x=Math.PI/2;let N=l(new Ze(.009,.009,.018,6),a,Math.cos(L)*.18,Math.sin(L)*.18,.058);N.rotation.x=Math.PI/2}for(let D of[.235,.26,.31,.335,.39,.414])if(D<u){let L=l(new yt(D,.0012,3,96),a,0,0,.042);L.castShadow=!1}if(!t)for(let D=0;D<8;D++){let L=D*Math.PI/4,z=[.25,.29,.34,.395].map((j,V)=>new w(Math.cos(L+V*.075)*j,Math.sin(L+V*.075)*j,.043)),N=l(new St(new bt(z),12,.0024,3,!1),a);N.castShadow=!1}let _=new Jt;_.moveTo(-.08,-.2),_.quadraticCurveTo(-.13,-.15,-.115,-.06),_.lineTo(-.115,.1),_.quadraticCurveTo(-.12,.19,-.05,.215),_.lineTo(.055,.19),_.quadraticCurveTo(.11,.14,.105,.06),_.lineTo(.105,-.1),_.quadraticCurveTo(.1,-.19,.04,-.21),_.closePath();let y=l(new jt(_,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&y.scale.set(.8,.8,.8),l(new ut(.09,.31,.032),a,.27,0,.005);for(let D of[-.125,0,.125]){let L=l(new Ze(.055,.055,.028,24),c,.354,D,.07);L.rotation.x=Math.PI/2}for(let D of[-.155,.155]){let L=l(new Ze(.014,.014,.025,6),s,.325,D,.094);L.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let T=x.getContext("2d");T.fillStyle="#f5f0df",T.translate(64,192),T.rotate(-Math.PI/2),T.textAlign="center",T.font="italic bold 60px Arial",T.fillText(t?"P21":"P21 SPORT",0,20);let C=new Tt(x);C.colorSpace=ct;let O=l(new qt(.075,.24),new zn({map:C,transparent:!0,depthWrite:!1}),.329,0,.1);O.castShadow=!1;let W=l(new Ze(.012,.014,.047,6),s,.36,.217,.042);return W.rotation.z=.2,e}var ic;function xu(r,e){if(!r.isConnected)return;if(!ic){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ct,a.toneMapping=ii,a.toneMappingExposure=1.15;let o=new vn;o.add(new Un("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let f=new Tn("#ffffff",d);f.position.set(l,h,u),o.add(f)}let c=new Vt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),ic={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=ic;s[e]||(s[e]=rc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Mu(r){let e=new qe;e.name="tyre-"+r;let t=new Rt({color:"#15181b",roughness:.86}),n=new Rt({color:"#050708",roughness:.96}),i=new Rt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new at(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new yi([new ue(.56,-.19),new ue(.63,-.25),new ue(.72,-.23),new ue(.79,-.15),new ue(.8,-.1),new ue(.8,.1),new ue(.79,.15),new ue(.72,.23),new ue(.63,.25),new ue(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new yt(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,f=s(new ut(.018,.036,.006),i);f.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),f.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,f)=>{let p=-.2+f/15*.4,v=.8-.045*(Math.abs(p)/.2)**3,m=h+(o?.18:.08)*Math.sin(f/15*Math.PI);return new w(Math.sin(m)*v,Math.cos(m)*v,p)});s(new St(new bt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new yt(.798,.004,8,80),n);h.position.z=l}}return e}function Su(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r==="formulaPro",o=new qe;o.name="front-wing-"+r;let c=a?3.32:3.1,l=a?4:2,h=(v,m,g)=>{let _=new at(v,m);return _.name=g,_.castShadow=_.receiveShadow=!0,o.add(_),_};for(let v=0;v<l;v++){let m=[],g=[];for(let T=0;T<=72;T++){let C=T/72*2-1,O=C*c/2,W=(v?a?.36:.46:.76)*(1-.22*C*C),D=(v?2.86+v*.055:3.02)-.13*C*C,L=.43+v*.095+.1*Math.pow(Math.abs(C),3);for(let z=0;z<=28;z++){let N=z/28*Math.PI*2,j=Math.cos(N);m.push(D+j*W/2,L+.035*(1-j*j)+Math.sin(N)*(v?.024:.035),O)}if(T<72)for(let z=0;z<28;z++){let N=T*29+z,j=N+28+1;g.push(N,N+1,j,N+1,j+1,j)}}let x=new ht;x.setAttribute("position",new Pe(m,3)),x.setIndex(g),x.computeVertexNormals(),h(x,v===0?n:t,"wing-element-"+v)}let u=[],d=[],f=[[2.13,1.04,.33,.13],[2.43,.98,.28,.12],[2.72,.83,.2,.1],[3.02,.7,.115,.075]];for(let[v,m,g,_]of f)for(let y=0;y<24;y++){let x=y/24*Math.PI*2;u.push(v,m+Math.sin(x)*_,Math.cos(x)*g)}for(let v=0;v<f.length-1;v++)for(let m=0;m<24;m++){let g=v*24+m,_=v*24+(m+1)%24;d.push(g,g+24,_,_,g+24,_+24)}for(let v=1;v<23;v++){d.push(0,v,v+1);let m=(f.length-1)*24;d.push(m,m+v+1,m+v)}let p=new ht;p.setAttribute("position",new Pe(u,3)),p.setIndex(d),p.computeVertexNormals(),h(p,t,"tapered-nose");for(let v of[-1,1]){let m=h(new ut(.13,.37,.065),n,"nose-pylon");m.position.set(2.9,.61,v*.13),m.rotation.z=-.15;let g=new Jt;g.moveTo(2.57,.38),g.lineTo(3.43,.38),g.quadraticCurveTo(3.53,.42,3.43,.61),g.lineTo(3.14,a?.95:.82),g.quadraticCurveTo(2.79,a?.97:.84,2.61,.69),g.closePath();let _=h(new jt(g,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");_.position.z=v*c/2-.017,h(new ut(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,v*(c/2+.055));let x=new bt([[2.65,.7],[2.9,a?.94:.81],[3.13,a?.94:.81],[3.4,.61]].map(([T,C])=>new w(T,C,v*(c/2+.025))));if(h(new St(x,28,.009,6,!1),s,"endplate-trim"),a)for(let T=0;T<3;T++){let C=h(new ut(.27,.13,.018),n,"flow-fin");C.position.set(2.86+T*.07,.58+T*.07,v*(1.1+T*.1)),C.rotation.z=.15}}return o}function ac(r){let e=new qe;e.name="sport-seat-"+r;let t=(L,z=.8,N=0)=>new _n({color:L,roughness:z,metalness:N,clearcoat:N?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),f=document.createElement("canvas");f.width=f.height=64;let p=f.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let L=0;L<64;L+=8)for(let z=0;z<64;z+=8)p.fillStyle=(z+L)%16?"#121820":"#626973",p.fillRect(z,L,7,3),p.fillStyle="#252b33",p.fillRect(z,L+4,3,4);let v=new Tt(f);v.wrapS=v.wrapT=qn,v.repeat.set(3,5),v.colorSpace=ct,c.map=v,c.bumpMap=v,c.bumpScale=.004;let m=(L,z,N=0,j=0,V=0,te=e)=>{let ne=new at(L,z);return ne.position.set(N,j,V),ne.castShadow=ne.receiveShadow=!0,te.add(ne),ne},g=(L,z,N,j,V,te,ne,ge,ce=e)=>{let Te=new Jt,Q=-L/2,oe=-z/2;return j=Math.min(j,L/2,z/2,N/2),Te.moveTo(Q+j,oe),Te.lineTo(Q+L-j,oe),Te.quadraticCurveTo(Q+L,oe,Q+L,oe+j),Te.lineTo(Q+L,oe+z-j),Te.quadraticCurveTo(Q+L,oe+z,Q+L-j,oe+z),Te.lineTo(Q+j,oe+z),Te.quadraticCurveTo(Q,oe+z,Q,oe+z-j),Te.lineTo(Q,oe+j),Te.quadraticCurveTo(Q,oe,Q+j,oe),m(new jt(Te,{depth:N-2*j,bevelEnabled:!0,bevelSize:j,bevelThickness:j,bevelSegments:4,curveSegments:12}),V,te,ne,ge-N/2+j,ce)},_=(L,z,N,j=e)=>m(new St(new bt(L.map(V=>new w(...V))),32,z,6,!1),N,0,0,0,j),y=new qe;y.rotation.x=-.14,y.position.set(0,.2,0),e.add(y);let x=new Jt;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let L of[-.135,.135]){let z=new Sn;z.moveTo(L-.075,1.24),z.lineTo(L+.075,1.24),z.lineTo(L+.075,1.34),z.lineTo(L-.075,1.34),z.closePath(),x.holes.push(z)}m(new jt(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,y),m(new jt(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,y).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,y),g(.46,.5,.12,.035,o,0,.85,.065,y),g(.45,.31,.17,.04,o,0,.4,.1,y);for(let L of[-1,1]){let z=g(.17,.42,.19,.055,a,L*.34,.98,.1,y);z.rotation.z=L*.28,z.rotation.y=-L*.25;let N=g(.13,.55,.23,.045,a,L*.3,.49,.14,y);N.rotation.z=-L*.12,_([[L*.27,.18,.28],[L*.34,.52,.28],[L*.4,.93,.24],[L*.3,1.17,.2]],.005,l,y);let j=L*.135;for(let V of[1.235,1.345])g(.16,.014,.022,.004,h,j,V,.015,y);for(let V of[j-.08,j+.08])g(.014,.12,.022,.004,h,V,1.29,.015,y)}let C=g(n?.86:.77,.18,.84,.055,c,0,.38,.34);C.name="seat-base";let O=g(n?.61:.54,.17,i?.74:.67,.05,o,0,.535,.39);O.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let L of[-.28,.28])g(.07,.3,.65,.018,h,L,.16,.34);for(let L of[.2,.33,.46,.59])_([[-.23,.625,L],[0,.635,L+.015],[.23,.625,L]],.003,l);if(n){for(let L of[-1,1])g(.14,.13,.64,.04,a,L*.45,.65,.32),g(.045,.23,.1,.01,h,L*.45,.48,.16);for(let L=.45;L<1.1;L+=.15)for(let z of[-.1,.1])_([[z-.1,L,.18],[z,L+.07,.18],[z+.1,L,.18]],.003,l,y)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),_([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let L of[-1,1]){let z=g(.16,.26,.74,.055,a,L*(n?.365:.325),.54,.39);z.rotation.z=-L*.12,_([[L*.26,.63,.03],[L*.26,.66,.35],[L*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,L*.28,-.015,.34);for(let N of[.02,.65])g(.13,.09,.12,.015,c,L*.28,-.055,N),m(new Ze(.022,.022,.015,12),h,L*.28,-.002,N)}for(let L=.3;L<1.08;L+=.11)_([[-.19,L,.16],[0,L-.015,.17],[.19,L,.16]],.0025,l,y);for(let L of[-1,1]){let z=[[L*.135,1.5,-.13],[L*.135,1.15,-.03],[L*.13,.78,.08],[L*.1,.66,.4]],N=[],j=[];z.forEach(([ge,ce,Te],Q)=>{N.push(ge-.033,ce,Te,ge+.033,ce,Te),Q&&j.push(Q*2-2,Q*2-1,Q*2,Q*2-1,Q*2+1,Q*2)});let V=new ht;V.setAttribute("position",new Pe(N,3)),V.setIndex(j),V.computeVertexNormals();let te=u.clone();te.side=Bt,m(V,te);let ne=g(.27,.055,.025,.008,u,L*.18,.64,.45);ne.rotation.z=-L*.2}let W=m(new Ze(.065,.065,.035,24),h,0,.66,.48);W.rotation.x=Math.PI/2;let D=m(new Ze(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);return D.rotation.x=Math.PI/2,e}var sc;function Tu(r,e){if(!r.isConnected||e==="none")return;if(!sc){let a=new Hn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=ct,a.toneMapping=ii,a.toneMappingExposure=1.25;let o=new vn;o.add(new Un("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let f=new Tn("#ffffff",d);f.position.set(l,h,u),o.add(f)}let c=new Vt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),sc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=sc;s[e]||(s[e]=ac(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=yu;window.pokerPaintBrakePreview=xu;window.pokerPaintSeatPreview=Tu;var bu=(r,e,t)=>Math.max(e,Math.min(t,r));function zp(r,e){let t=window.PokerGarage,n=new qe;r.add(n),n.scale.set(1.24,.86,.95);let i=(M,b,I)=>new _n({color:M,metalness:b,roughness:I,clearcoat:b>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),f=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(M,b,I=0,Z=0,U=0,ee=n){let X=new at(M,b);return X.position.set(I,Z,U),X.castShadow=!0,X.receiveShadow=!0,ee.add(X),X}let v=(M,b,I,Z,U,ee,X)=>p(new ut(M,b,I),Z,U,ee,X);function m(M,b,I,Z,U,ee,X="y"){let $=p(new Ze(M,M,b,64),I,Z,U,ee);return X==="z"&&($.rotation.x=Math.PI/2),X==="x"&&($.rotation.z=Math.PI/2),$}function g(M,b,I,Z,U,ee,X="z"){let $=p(new yt(M,b,12,80),I,Z,U,ee);return X==="y"&&($.rotation.x=Math.PI/2),X==="x"&&($.rotation.y=Math.PI/2),$}function _(M,b,I,Z=Jt){let U=new Z,ee=-M/2,X=-b/2;return I=Math.min(I,b/2-.001),U.moveTo(ee+I,X),U.lineTo(ee+M-I,X),U.quadraticCurveTo(ee+M,X,ee+M,X+I),U.lineTo(ee+M,X+b-I),U.quadraticCurveTo(ee+M,X+b,ee+M-I,X+b),U.lineTo(ee+I,X+b),U.quadraticCurveTo(ee,X+b,ee,X+b-I),U.lineTo(ee,X+I),U.quadraticCurveTo(ee,X,ee+I,X),U}function y(M,b,I,Z,U,ee,X=null,$=.025){let he=_(M,b,Z);if(X){let se=_(X[0],X[1],X[2],Sn),me=new Sn(se.getPoints(40).map(ye=>new ue(ye.x+(X[3]||0),ye.y)));he.holes.push(me)}let ze=p(new jt(he,{depth:I,bevelEnabled:$>0,bevelSize:$,bevelThickness:$,bevelSegments:4,curveSegments:40}),U,0,ee,0);return ze.rotation.x=-Math.PI/2,ze}let x=[3.02,1.51,.65,-.28],T=_(4.96,2.44,1.15).getSpacedPoints(128),C=[],O=[],W=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[M,b]of W)for(let I=0;I<128;I++){let Z=T[I];C.push(Z.x*b,M,-Z.y*b)}for(let M=0;M<3;M++)for(let b=0;b<128;b++){let I=M*128+b,Z=M*128+(b+1)%128;O.push(I,Z,I+128,Z,Z+128,I+128)}let D=new ht;D.setAttribute("position",new Pe(C,3)),D.setIndex(O),D.computeVertexNormals(),s.side=Bt,p(D,s),y(5.03,2.51,.065,1.19,o,.58,null,.035),y(5.1,2.58,.09,1.22,o,1.25,x,.035);let L=new bt(_(4.94,2.42,1.15).getPoints(40).map(M=>new w(M.x,1.44,-M.y)),!0,"centripetal");p(new St(L,240,.125,16,!0),u);for(let M of[-1,1]){let b=Array.from({length:21},(I,Z)=>{let U=.26+Z*.25/20;return new w(1.32+1.15*Math.cos(U),1.44,M*(.06+1.15*Math.sin(U)))});p(new St(new bt(b),32,.132,20,!1),o)}y(4.65,2.14,.035,1.03,o,1.39,x,.015),y(4.52,2.01,.025,.97,a,1.43,x,.01);let z=y(2.98,1.47,.025,.63,a,.94);z.position.x=-.28;let N=new _n({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Bt,polygonOffset:!0,polygonOffsetFactor:-1}),j=new Wi(_(2.9,1.4,.6)),V=j.attributes.position,te=j.attributes.uv;for(let M=0;M<V.count;M++)te.setXY(M,(V.getX(M)+1.45)/2.9,(V.getY(M)+.7)/1.4);let ne=p(j,N,-.28,1.005,0);ne.rotation.x=-Math.PI/2,ne.castShadow=!1;let ge=N.clone(),ce=[];for(let M of[-1,1]){let b=p(new qt(3.05,.3),ge,0,1.04,M*1.329);M<0&&(b.rotation.y=Math.PI),b.castShadow=!1,ce.push(b)}function Te(M){let b=M.vinyl||"none";ne.visible=b!=="none",ce.forEach(Z=>Z.visible=b!=="none");let I=b+":"+(M.vinylText||"");if(N.userData.id!==I){N.map?.dispose(),ge.map?.dispose(),N.map=new Tt(t.vinylCanvas(b,!1,M.vinylText)),ge.map=new Tt(t.vinylCanvas(b,!0,M.vinylText));for(let Z of[N,ge]){Z.map.colorSpace=ct,Z.map.anisotropy=16;let U=Z.map;U.image.addEventListener("vinyl-ready",()=>{U.needsUpdate=!0},{once:!0}),Z.needsUpdate=!0,Z.userData.id=I}}}let Q=y(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);Q.position.x=-.28;let oe=y(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);oe.position.x=-.28;for(let M of[-1,-.35,.35])for(let b of[-.75,.75])v(.011,.4,.009,h,M,1.2,b);function Ae(M,b){let I=document.createElement("canvas");I.width=I.height=256;let Z=I.getContext("2d");Z.fillStyle=M,Z.fillRect(0,0,256,256);let U=17;for(let X=0;X<18e3;X++)U=U*1664525+1013904223>>>0,Z.fillStyle="rgba(0,0,0,"+b+")",Z.fillRect(U%256,(U>>>8)%256,1,1);let ee=new Tt(I);return ee.colorSpace=ct,ee.wrapS=ee.wrapT=qn,ee}a.map=Ae("#e8e8e8",.035),a.bumpMap=Ae("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=Ae("#888888",.12),c.bumpScale=.003,u.bumpMap=Ae("#888888",.3),u.bumpScale=.001;function le(M,b,I,Z,U,ee=!1,X=n){let $=new Jt;$.moveTo(0,.5),$.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),$.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),$.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),$.bezierCurveTo(.48,.12,.12,.28,0,.5),$.moveTo(-.12,-.3),$.lineTo(0,-.06),$.lineTo(.12,-.3),$.closePath();let he=p(new jt($,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),b,I,Z,U,X);return he.scale.setScalar(M),ee&&(he.rotation.y=Math.PI),he}let Me=[],_e=[],Y=[],we=null;for(let M of[-1.72,1.72])for(let b of[-1,1]){let I=b*1.36,Z=b*1.57,U=new qe;U.position.set(M,.81,I),n.add(U),U.userData.groundWheel=!0;let ee=n.children.length,X=p(new yi([new ue(.56,-.19),new ue(.61,-.245),new ue(.67,-.25),new ue(.76,-.19),new ue(.8,-.1),new ue(.8,.1),new ue(.76,.19),new ue(.67,.25),new ue(.61,.245),new ue(.56,.19)],80),c,M,.81,I);X.rotation.x=Math.PI/2;for(let se=-2;se<=2;se++)g(.798-Math.abs(se)*.012,.0035,h,M,.81,I+se*.071);for(let se=0;se<28;se++){let me=se*Math.PI/14,ye=Array.from({length:17},(Ne,je)=>{let fe=je/16,Ee=-.205+fe*.41,We=.799-.044*Math.pow(Math.abs(Ee)/.205,3),st=me+.13*Math.sin(fe*Math.PI);return new w(M+Math.sin(st)*We,.81+Math.cos(st)*We,I+Ee)});p(new St(new bt(ye),20,.0045,5,!1),h)}for(let se of[-1,1])for(let me of[.625,.654,.681])g(me,.0035,h,M,.81,I+se*.244);let $=n.children.slice(ee);g(.548,.023,l,M,.81,Z+b*.035),g(.505,.016,l,M,.81,Z+b*.043),m(.14,.045,h,M,.81,Z+b*.045,"z"),g(.14,.012,l,M,.81,Z+b*.069);let he=le(.2,l,M,.8,Z+b*.075,b<0);_e.push(he);for(let se of t.wheelDesign()){let me=new bt(se.map(([ye,Ne])=>new w(M+ye,.81+Ne,Z+b*(.04+.025*(1-Math.hypot(ye,Ne)/.51)))));Me.push(p(new St(me,20,.007,6,!1),l))}for(let se=0;se<20;se++){let me=se*Math.PI/10;m(.006,.009,l,M+Math.sin(me)*.526,.81+Math.cos(me)*.526,Z+b*.06,"z")}n.updateMatrixWorld(!0);for(let se of n.children.slice(ee))U.attach(se);U.scale.set(.88/1.24,.88/.86,1/.95),U.position.y=.715/.86;let ze={standard:$};for(let se of["soft","medium","hard","semi","wet"]){let me=Mu(se);me.visible=!1,U.add(me),ze[se]=[me]}Y.push({wheelGroup:U,x:M,out:Z,sign:b,tyres:ze})}let A=[];for(let M of[-1,1])A.push(v(1.35,.43,.04,o,.05,.94,M*1.3));for(let M of[-1,1]){let b=m(.275,.27,h,2.16,.945,M*.97,"z");g(.278,.035,o,2.16,.945,M*1.11)}for(let M of[-1.72,1.72])m(.07,2.8,h,M,.7,0,"z");v(3.6,.08,.8,h,0,.57,0);let E=[];function H(M,b,I){let Z=document.createElement("canvas");Z.width=M,Z.height=b,I(Z.getContext("2d"),M,b);let U=new Tt(Z);return U.colorSpace=ct,U.anisotropy=8,E.push(U),U}let B=H(768,256,(M,b,I)=>{M.fillStyle="#101b18",M.fillRect(0,0,b,I),M.strokeStyle="#d9b35b",M.lineWidth=7,M.strokeRect(10,10,b-20,I-20),M.fillStyle="#ebc66c",M.textAlign="center",M.font="italic 116px Georgia",M.fillText("Two Aces",b/2,137),M.font="38px Georgia",M.fillText("\u2660 Poker21 \u2660",b/2,209)}),S=[];for(let M of[-1,1]){let b=new _n({map:B,metalness:.55,roughness:.2,clearcoat:1});S.push(b);let I=p(new qt(1.28,.4),b,.05,.94,M*1.326);b.userData.plane=I,M<0&&(I.rotation.y=Math.PI)}let P=[];for(let M of[-1,1])for(let b=0;b<3;b++){let I=new qe;I.position.set((b-1)*.7+.05,1,M*1.365),M<0&&(I.rotation.y=Math.PI),n.add(I);let Z=p(new ut(.1,.1,.025),o,0,0,0,I),U=new Rt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ee=p(new qt(.65,.65),U,0,0,.035,I);ee.castShadow=!1,ee.receiveShadow=!1,P.push({group:I,mat:U,back:Z,n:b})}for(let M of[-1,1])for(let b of[-.54,.64])for(let I of[.78,1.1]){let Z=m(.014,.018,o,b,I,M*1.35,"z")}for(let M of[-1.7,-.35,1.48])for(let b of[-1.21,1.21]){let I=m(.128,.13,o,M,1.44,b,"x")}for(let M of[-1.7,-.35,1.48])for(let b of[-1,1])g(.125,.004,h,M+.08,1.44,b*1.21,"x"),g(.125,.004,h,M-.08,1.44,b*1.21,"x");for(let M of[-1.7,-.35,1.48])for(let b of[-.96,.96])m(.135,.08,o,M,1.49,b),m(.108,.082,h,M,1.498,b),g(.125,.015,o,M,1.54,b,"y"),g(.111,.006,o,M,1.535,b,"y");let k=[],F=[],ae=["#ab2338","#1b684b","#2455a5"].map(M=>i(M,.08,.55)),q=i("#eee9d6",.04,.6);for(let[M,b,I,Z]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let U=0;U<Z;U++){m(.104,.033,ae[I],M,1.49+U*.037,b);for(let ee=0;ee<6;ee++){let X=ee*Math.PI/3,$=v(.024,.021,.012,q,M+Math.cos(X)*.103,1.49+U*.037,b+Math.sin(X)*.103);$.rotation.y=Math.PI/2-X,$.castShadow=!1,$.receiveShadow=!1,k.push($)}if(U===Z-1){let ee=new Rt({transparent:!0,alphaTest:.1,roughness:.65}),X=p(new qt(.208,.208),ee,M,1.511+U*.037,b);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,F.push({mat:ee,n:I})}}let J=new qe;J.position.set(.89,1.96,0),J.scale.set(1/1.24,1/.86,1/.95),n.add(J);let ve=new qe;J.add(ve);let Re=new w((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),Se=new w(0,0,1),Fe=new w().crossVectors(Re,Se).normalize();ve.quaternion.setFromRotationMatrix(new Je().makeBasis(Se,Fe,Re));let Ge=u.clone();p(new yt(.53,.06,16,80),Ge,0,0,0,ve),p(new yt(.473,.014,10,64),o,0,0,-.02,ve);for(let M of[Math.PI]){let b=p(new ut(.09,.39,.045),o,Math.sin(M)*.26,Math.cos(M)*.26,0,ve);b.rotation.z=-M}for(let M of[-1,1]){let b=p(new ut(.35,.075,.06),o,M*.265,0,0,ve);p(new ut(.32,.035,.064),h,M*.265,0,.006,ve)}let pe=p(new Ze(.195,.195,.075,64),o,0,0,.035,ve);pe.rotation.x=Math.PI/2;let Le=p(new Gn(.177,64),new Rt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,ve);Le.receiveShadow=!1,le(.38,o,0,-.025,.105,!1,ve);let Ce={classic:new qe,sport:new qe,formula:new qe};for(let M of ve.children.slice())Ce.classic.add(M);Object.values(Ce).forEach(M=>ve.add(M));function Ve(M,b,I,Z){let U=new bt(b.map(([ee,X])=>new w(ee,X,0)),!0);p(new St(U,72,I,12,!0),Z,0,0,0,M)}Ve(Ce.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,Ge);for(let M of[-1,1])p(new ut(.35,.065,.045),l,M*.27,0,0,Ce.sport),p(new ut(.065,.3,.045),l,M*.12,-.22,0,Ce.sport);p(new yt(.5,.018,8,64,.22),d,0,0,.005,Ce.sport),Ve(Ce.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,Ge),p(new ut(.6,.23,.065),h,0,0,0,Ce.formula);for(let M of[-1,1])p(new sn(.035,12,8),d,M*.25,.055,.06,Ce.formula),p(new ut(.08,.29,.025),l,M*.37,0,-.07,Ce.formula);for(let M of["sport","formula"]){let b=p(new Ze(.15,.15,.07,48),l,0,0,.035,Ce[M]);b.rotation.x=Math.PI/2,p(new Gn(.13,48),h,0,0,.078,Ce[M]),le(.25,l,0,-.018,.09,!1,Ce[M])}for(let[M,b]of Object.entries(t.steeringDesigns)){let I=new qe;ve.add(I),Ce[M]=I;let Z=i(b.color,M==="woodHeritage"?.3:.55,.35);b.shape==="round"?p(new yt(.53,.065,16,80),Z,0,0,0,I):b.shape==="flat"?Ve(I,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Z):vt([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Z,I);for(let ee=0;ee<b.spokes;ee++){let X=ee*Math.PI*2/b.spokes,$=p(new ut(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,I);$.rotation.z=X}let U=p(new Ze(.15,.15,.075,40),h,0,0,.05,I);U.rotation.x=Math.PI/2,le(.23,l,0,-.015,.095,!1,I),p(new ut(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,I)}let be=i("#b9ab8a",.15,.8),Ue=i("#171c20",.02,.85);for(let[M,b]of Object.entries(Ce)){let I=M==="classic"?.53:M==="sport"?.51:.47;for(let U of[-1,1]){if(M!=="formula"){let ee=p(new yt(I,.072,12,30,.64),Ue,0,0,.003,b);ee.rotation.z=U<0?Math.PI-.32:-.32}for(let ee=0;ee<9;ee++){let X=(U<0?Math.PI:0)-.28+ee*.07;p(new sn(.007,6,4),be,Math.cos(X)*(I-.045),Math.sin(X)*(I-.045),.063,b)}}let Z=p(new ut(.065,.1,.035),M==="classic"?o:d,0,M==="formula"?.16:.51,.045,b);for(let U=0;U<6;U++){let ee=U*Math.PI/3,X=p(new Ze(.012,.012,.012,6),l,Math.cos(ee)*.13,Math.sin(ee)*.13,.099,b);X.rotation.x=Math.PI/2}}let He=new w(1.3,1.48,0),At=new w(.89,1.96,0),Be=At.clone().sub(He),dt=He.clone().add(At).multiplyScalar(.5),tt=v(.12,Be.length(),.095,o,...dt.toArray());tt.quaternion.setFromUnitVectors(new w(0,1,0),Be.normalize()),v(.075,tt.geometry.parameters.height-.04,.1,h,...dt.toArray()).quaternion.copy(tt.quaternion);let Pt=-1.84,G=1.99,Nt=.74,gt=new qe;gt.position.set(Pt,G,0),n.add(gt);let wt=n.children.length;m(Nt,.51,o,Pt,G,0,"z"),m(.67,.54,h,Pt,G,0,"z");for(let M of[-1,1]){let b=M*.29;g(.72,.055,h,Pt,G,b),g(.75,.022,o,Pt,G,b+M*.03),g(.665,.012,d,Pt,G,b+M*.025);for(let I=0;I<14;I++){let Z=I*Math.PI/7,U=[],ee=[];for(let he=0;he<=16;he++){let ze=he/16,se=.22+ze*.44,me=Z+.55*ze;for(let ye of[-.15,.15])U.push(Pt+Math.sin(me+ye)*se,G+Math.cos(me+ye)*se,b+M*(.018+Math.sin(ze*Math.PI)*.12))}for(let he=0;he<16;he++){let ze=he*2;ee.push(ze,ze+1,ze+2,ze+1,ze+3,ze+2)}let X=new ht;X.setAttribute("position",new Pe(U,3)),X.setIndex(ee),X.computeVertexNormals(),f.side=Bt,p(X,f);let $=new bt(Array.from({length:17},(he,ze)=>{let se=ze/16,me=.22+se*.44,ye=Z+.55*se-.15;return new w(Pt+Math.sin(ye)*me,G+Math.cos(ye)*me,b+M*(.025+Math.sin(se*Math.PI)*.12))}));p(new St($,20,.009,6,!1),d)}m(.215,.07,o,Pt,G,b+M*.085,"z"),m(.18,.085,h,Pt,G,b+M*.11,"z")}for(let M=0;M<12;M++){let b=M*Math.PI/6,I=v(.045,.15,.2,h,Pt+Math.cos(b)*.735,G+Math.sin(b)*.735,0);I.rotation.z=b}n.updateMatrixWorld(!0);for(let M of n.children.slice(wt))gt.attach(M);gt.rotation.set(0,Math.PI/2,0),gt.scale.set(.96/1.24,.96/.86,.96/.95);let yn=gt.clone(!0);n.add(yn);let zt=new qe;gt.add(zt);let Wt=i("#829aaa",.92,.24);for(let M of[-.24,-.08,.08,.24])p(new yt(.765,.028,10,80),Wt,0,0,M,zt);for(let M=0;M<8;M++){let b=M*Math.PI/4,I=p(new Ze(.025,.025,.025,6),Wt,Math.sin(b)*.73,Math.cos(b)*.73,.35,zt);I.rotation.x=Math.PI/2}let it={classic:new qe,dual:new qe,titanium:new qe},Yt=i("#a9b7c4",.92,.23),Gt=i("#668bb5",.88,.25);Object.values(it).forEach(M=>n.add(M));for(let[M,b]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let I of b){let Z=M==="titanium"?Gt:Yt,U=p(new Ze(.105,.105,.5,32),Z,-2.42,.76,I,it[M]);U.rotation.z=Math.PI/2;let ee=p(new Ze(.079,.079,.012,32),h,-2.678,.76,I,it[M]);ee.rotation.z=Math.PI/2;let X=p(new yt(.094,.012,8,32),Z,-2.69,.76,I,it[M]);X.rotation.y=Math.PI/2}for(let[M,b]of Object.entries(it)){let I=M==="classic"?[0]:[-.67,.67];for(let U of I){let ee=p(new Ze(.18,.18,.52,40),Yt,-2.19,.76,U,b);ee.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let $=p(new yt(.184,.016,8,40),h,X,.76,U,b);$.rotation.y=Math.PI/2,p(new ut(.07,.19,.07),Yt,X,.94,U,b)}}let Z=M==="classic"?[0]:M==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let U of Z){let ee=p(new Ze(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,U,b);ee.rotation.z=Math.PI/2;let X=p(new yt(.107,.018,10,40),M==="titanium"?Gt:Yt,-2.57,.76,U,b);if(X.rotation.y=Math.PI/2,M==="titanium")for(let[$,he]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let ze=p(new yt(.106,.008,6,40),i(he,.85,.3),$,.76,U,b);ze.rotation.y=Math.PI/2}}}for(let M of[-1,1]){let b=new bt([new w(-2.16,1.46,M*.65),new w(-1.94,1.66,M*.69),new w(-1.3,1.59,M*.64),new w(-.98,1.47,M*.7)]);p(new St(b,32,.022,8,!1),o),v(.34,.06,.14,o,-1.84,1.48,M*.4)}for(let M of[-1,1]){let b=new bt([new w(-2.45,1.1,M*.7),new w(-2.43,1.36,M*.72),new w(-2.19,1.55,M*.7),new w(-1.9,1.55,M*.68)]);p(new St(b,40,.075,14,!1),h),p(new St(b,40,.019,10,!1),o);for(let I of[-2.2,-1.96]){let Z=new bt([new w(I,1.43,M*.48),new w(I,1.63,M*.6),new w(I+.24,1.57,M*.82)]);p(new St(Z,24,.017,8,!1),o)}}let tn=[],nn=[],kt=[];for(let M=0;M<=48;M++){let b=-.92+M*1.84/48;for(let I of[.64,1.23])nn.push(2.57-.28*(Math.sin(b)*1.25/1.1)**2,I,Math.sin(b)*1.25)}for(let M=0;M<48;M++){let b=M*2;kt.push(b,b+2,b+1,b+1,b+2,b+3)}let Qt=new ht;Qt.setAttribute("position",new Pe(nn,3)),Qt.setIndex(kt),Qt.computeVertexNormals();let dn=i("#00453f",.72,.14);dn.clearcoat=1,dn.side=Bt,p(Qt,dn);for(let M of[.635,1.225]){let b=Array.from({length:65},(I,Z)=>{let U=-1.04+Z*2.08/64;return new w(2.57-.28*(U/1.1)**2,M,U)});p(new St(new bt(b),80,.034,12,!1),o)}for(let M of[-1,1]){let b=M*1,I=2.57-.28*(b/1.1)**2,Z=new bt([new w(I-.04,.635,b),new w(I+.05,.78,b),new w(I+.065,1.12,b),new w(I-.04,1.25,b)]);p(new St(Z,32,.065,12,!1),o);for(let U of[.91,1.065]){let ee=Array.from({length:16},(X,$)=>{let he=M*(.51+$*.41/15);return new w(2.57-.28*(he/1.1)**2+.018,U,he)});tn.push(p(new St(new bt(ee),24,.017,8,!1),d))}}let pn=[];for(let M=0;M<2;M++){let b=new Tt(t.cardCanvas(e.cards,M));b.colorSpace=ct,b.anisotropy=16;let I=new zn({map:b,transparent:!0,toneMapped:!1});pn.push(I);let Z=1.65,U=M?.34:-.34,ee=v(.47,.008,.63,i("#ddd9cf",0,.95),Z,1.474+M*.003,U);ee.rotation.y=-(M?-.08:.08);let X=p(new qt(.5,.67),I,Z,1.48+M*.003,U);X.rotation.x=-Math.PI/2,X.rotation.z=M?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}let bn=new Rt({map:new Tt(t.plateCanvas(e)),roughness:.6});for(let M of[-1,1]){let b=p(new qt(.79,.463),bn,M*2.605,1.01,0);b.rotation.y=M*Math.PI/2}let Mt={},mt=i("#7d8c98",.82,.28),ft=i("#202a32",.45,.38),wn=i("#a7c6d5",.98,.055),Lt=i("#182029",.35,.48);Lt.bumpMap=Ae("#888888",.2),Lt.bumpScale=.001;function et(M,b,I,Z,U,ee,X,$,he){let ze=new jt(_(M,b,Z),{depth:I,bevelEnabled:!0,bevelSize:Math.min(.012,I*.2),bevelThickness:Math.min(.012,I*.2),bevelSegments:3,curveSegments:12});return ze.translate(0,0,-I/2),p(ze,U,ee,X,$,he)}function vt(M,b,I,Z){return p(new St(new bt(M.map(U=>new w(...U))),40,b,12,!1),I,0,0,0,Z)}function R(M,b,I,Z){let U=p(new Ze(.014,.014,.014,6),mt,M,b,I,Z);U.rotation.x=Math.PI/2}function K(M,b,I,Z,U,ee){let X=new Jt;X.moveTo(-Z*.5,0),X.bezierCurveTo(-Z*.52,.055,-Z*.12,.07,Z*.5,.008),X.quadraticCurveTo(Z*.05,-.025,-Z*.5,0);let $=new jt(X,{depth:I,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});$.translate(0,0,-I/2);let he=p($,U,M,b,0,ee);return he.rotation.z=-.08,he}for(let M of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){Mt[M]={};for(let b of M==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let I=new qe;n.add(I),Mt[M][b]=I;let Z=["sport","aero"].includes(b)?Lt:mt;if(M==="spoiler"){let U=b==="lip"?1.43:b==="sport"?1.78:2.08,ee=b==="gt"||b==="double"?1.98:1.72,X=-2.39;for(let $ of[-.62,.62]){if(et(.25,.055,.22,.045,ft,-2.24,1.31,$,I),b!=="lip"){let he=et(.15,U-1.32,.065,.035,ft,-2.32,(U+1.32)/2,$,I);he.rotation.z=-.19}for(let he of[-.065,.065]){let ze=p(new Ze(.012,.012,.015,6),mt,-2.24,1.35,$+he,I)}}if(K(X,U,ee,b==="lip"?.22:.36,Z,I),b!=="lip")for(let $ of[-1,1]){let he=et(.43,.19,.025,.055,Z,X,U+.055,$*ee/2,I);he.rotation.z=-.12,R(X-.1,U+.045,$*(ee/2+.02),I),R(X+.1,U+.045,$*(ee/2+.02),I)}if(b==="double"){K(X+.025,U+.24,ee*.94,.27,Lt,I);for(let $ of[-1,1])et(.08,.28,.025,.02,ft,X,U+.13,$*ee*.47,I)}continue}if(M==="mirrors")for(let U of[-1,1]){let ee=b==="aero",X=ee?1.77:1.86,$=U*(ee?1.47:1.53),he=.77;et(.18,.08,.15,.035,ft,.64,1.46,U*1.19,I),vt([[.64,1.47,U*1.19],[.62,1.62,U*1.32],[he,X-.07,$]],ee?.023:.029,Z,I);let ze=p(new sn(.046,16,12),ft,he,X-.065,$,I);if(b==="round"){p(new sn(1,32,20),mt,he,X,$,I).scale.set(.065,.15,.15);let me=p(new Gn(.13,48),wn,he-.056,X,$,I);me.rotation.y=-Math.PI/2,me.castShadow=!1;let ye=p(new yt(.136,.009,8,48),mt,he-.06,X,$,I);ye.rotation.y=Math.PI/2}else{let se=ee?.31:b==="sport"?.35:.38,me=ee?.16:.22,ye=et(se,me,.095,.065,b==="club"?ft:Lt,he,X,$,I);ye.rotation.y=Math.PI/2;let Ne=p(new Wi(_(se-.045,me-.035,.05)),wn,he-.061,X,$,I);Ne.rotation.y=-Math.PI/2,Ne.castShadow=!1,Ne.receiveShadow=!1;let je=_(se-.028,me-.018,.055).getPoints(24).map(fe=>[he-.058,X+fe.y,$+fe.x]);je.push(je[0]),vt(je,.006,mt,I)}}else if(M==="sideSkirts")for(let U of[-1,1]){let ee=et(2.3,b==="aero"?.17:.12,b==="rally"?.27:.13,.05,Z,0,.59,U*1.24,I);if(b==="rally")for(let X of[-.84,-.42,0,.42,.84]){let $=et(.13,.018,.25,.018,ft,X,.67,U*1.24,I)}else vt([[-1.08,.54,U*1.3],[0,.53,U*1.32],[1.08,.54,U*1.3]],.009,d,I);for(let X of[-.87,.87])et(.12,.14,.16,.025,ft,X,.65,U*1.2,I),R(X,.61,U*1.33,I);if(b==="aero")for(let X of[-.95,.95]){let $=et(.24,.12,.025,.025,Lt,X,.57,U*1.35,I);$.rotation.z=X>0?.2:-.2}}else{let U=M==="frontBumper"?1:-1,ee=[[U*2.26,.66,-.92],[U*2.58,.65,-.7],[U*2.67,.65,0],[U*2.58,.65,.7],[U*2.26,.66,.92]];vt(ee,b==="sport"?.061:.047,Z,I);for(let X of[-.67,.67]){vt([[U*2.31,.74,X],[U*2.5,.68,X]],.032,ft,I);let $=et(.16,.12,.13,.035,ft,U*2.51,.67,X,I)}if(b==="aero"){let X=et(.38,.045,1.94,.07,Lt,U*2.48,.5,0,I);for(let $ of[-.7,-.27,.27,.7])et(.27,.12,.022,.025,ft,U*2.48,.55,$,I);vt([[U*2.4,.52,-.91],[U*2.64,.52,0],[U*2.4,.52,.91]],.008,mt,I)}if(b==="rally")for(let X of[-.72,.72])vt([[U*2.53,.65,X-.14],[U*2.56,.94,X-.14],[U*2.55,1.04,X],[U*2.56,.94,X+.14],[U*2.53,.65,X+.14]],.036,mt,I);if(b==="sport")for(let X of[-.67,.67]){let $=et(.2,.13,.14,.045,ft,U*2.56,.66,X,I)}if(M==="rearBumper"&&b==="aero")for(let X of[-.7,-.35,0,.35,.7]){let $=et(.27,.15,.025,.025,Lt,-2.46,.48,X,I);$.rotation.z=.12}}}}let re=i("#b9e4f5",.28,.17);re.emissive.set("#b9e4f5"),re.emissiveIntensity=1.8;let de=i("#ffdda0",.2,.2);de.emissive.set("#ffe0a8"),de.emissiveIntensity=1.25;for(let M of["frontBumper","rearBumper"])for(let[b,I,Z]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let U=new qe;n.add(U),Mt[M][b]=U;let ee=M==="frontBumper"?1:-1,X=b==="trackGT"?.34:.29,$=.59,he=_(I,X,.1);for(let[fe,Ee]of[[0,.94],[-.79,.32],[.79,.32]]){let We=_(Ee,.115,.045,Sn);he.holes.push(new Sn(We.getPoints(24).map(st=>new ue(st.x+fe,st.y))))}let ze=new jt(he,{depth:Z,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),se=ze.attributes.position;for(let fe=0;fe<se.count;fe++){let Ee=se.getX(fe),We=se.getY(fe),st=se.getZ(fe);se.setXYZ(fe,ee*(2.43+st-.24*(Ee/(I/2))**2),$+We,Ee)}ze.computeVertexNormals(),p(ze,s,0,0,0,U);for(let[fe,Ee]of[[0,.94],[-.79,.32],[.79,.32]]){let We=ee*(2.43-.24*(fe/(I/2))**2);et(.025,.14,Ee+.02,.04,h,We,$,fe,U);for(let st of[-.032,.012,.045])et(.012,.006,Ee-.035,.003,ft,We+ee*.022,$+st,fe,U)}let me=Array.from({length:41},(fe,Ee)=>{let We=-I/2+Ee*I/40;return[ee*(2.44+Z+.045-.24*(We/(I/2))**2),$-X/2-.025,We]});vt(me,b==="trackGT"?.028:.019,Lt,U);let ye=new ht,Ne=[],je=[];for(let[fe,Ee,We]of me)Ne.push(fe,Ee,We,fe-ee*.17,Ee+.005,We);for(let fe=0;fe<40;fe++){let Ee=fe*2;je.push(Ee,Ee+1,Ee+2,Ee+1,Ee+3,Ee+2)}if(ye.setAttribute("position",new Pe(Ne,3)),ye.setIndex(je),ye.computeVertexNormals(),p(ye,Lt,0,0,0,U),M==="rearBumper")for(let fe=0;fe<(b==="trackGT"?5:3);fe++){let Ee=(fe-(b==="trackGT"?2:1))*.3,We=et(.24,.075,.014,.008,Lt,-2.48,$-X/2-.035,Ee,U);We.rotation.z=-.12}else if(b==="trackGT")for(let fe of[-.92,.92]){let Ee=et(.18,.05,.018,.008,Lt,2.43,$-X/2,fe,U);Ee.rotation.z=.08}}for(let M of["formula","formulaPro","formulaElite"]){let b=Su(M==="formulaElite"?"formulaPro":M,{paint:s,carbon:Lt,metal:mt,accent:o});M==="formulaElite"&&(b.scale.z=1.07,b.scale.x=1.05),n.add(b),Mt.frontBumper[M]=b}for(let M of["rearBumper","sideSkirts","spoiler"])for(let b of["formula","formulaPro"]){let I=new qe;I.name=M+"-"+b,n.add(I),Mt[M][b]=I;let Z=b==="formulaPro";if(M==="rearBumper"){et(.48,.16,Z?2.3:2.05,.03,Lt,-2.47,.45,0,I);for(let U=-3;U<=3;U++){let ee=et(.64,.23,.025,.01,Lt,-2.48,.44,U*.3,I);ee.rotation.z=-.15}for(let U of[-1,1])vt([[-2.2,.54,U*1],[-2.65,.62,U*1.1]],.025,s,I)}else if(M==="sideSkirts")for(let U of[-1,1]){let ee=et(2.35,Z?.42:.33,.34,.08,s,-.15,.83,U*1.3,I);ee.rotation.z=-.045,et(2.65,.055,.48,.025,Lt,-.06,.58,U*1.3,I),et(.07,.21,.24,.035,h,.96,.87,U*1.3,I);for(let X=0;X<(Z?3:1);X++)et(.35,.11,.025,.01,Lt,.48-X*.32,.65,U*1.53,I)}else{let U=Z?2.3:2.02,ee=Z?2.36:2.16;for(let X of[-1,1])et(.1,U-.82,.09,.025,Lt,-2.23,(U+.82)/2,X*.42,I),et(.54,.49,.035,.03,s,-2.28,U-.04,X*ee/2,I);K(-2.26,U,ee,.56,Lt,I),K(-2.36,U-.18,ee,.33,s,I),Z&&K(-2.39,U-.31,ee,.24,Lt,I)}}Mt.headlights={};for(let M of["round","projector","rally","matrix"]){let b=new qe;n.add(b),Mt.headlights[M]=b;for(let I of[-1,1]){let Z=I*.74,U=2.57-.28*(Z/1.1)**2+.07,ee=1.075;if(M==="matrix"){let X=et(.4,.2,.075,.045,ft,U,ee,Z,b);X.rotation.y=Math.PI/2;let $=et(.35,.15,.01,.035,h,U+.05,ee,Z,b);$.rotation.y=Math.PI/2;for(let he=0;he<4;he++){let ze=et(.06,.1,.012,.017,re,U+.065,ee,Z-.128+he*.085,b);ze.rotation.y=Math.PI/2,ze.castShadow=!1}}else{let X=M==="rally"?.16:M==="round"?.14:.135,$=p(new Ze(X+.027,X+.02,.095,48),ft,U,ee,Z,b);$.rotation.z=Math.PI/2;let he=p(new yt(X+.008,.01,10,48),mt,U+.054,ee,Z,b);he.rotation.y=Math.PI/2;let ze=p(new sn(1,32,20),M==="round"||M==="rally"?de:re,U+.055,ee,Z,b);if(ze.scale.set(.025,X,X),ze.castShadow=!1,M==="projector"){let se=p(new yt(X*.8,.008,8,48),re,U+.076,ee,Z,b);se.rotation.y=Math.PI/2,p(new sn(1,24,16),wn,U+.081,ee,Z,b).scale.set(.022,X*.53,X*.53)}if(M==="rally")for(let se of[-.07,0,.07]){let me=Math.sqrt(X*X-se*se);vt([[U+.09,ee-me,Z+se],[U+.1,ee,Z+se],[U+.09,ee+me,Z+se]],.009,ft,b)}}}}for(let[M,b]of Object.entries(t.streetHeadlights)){let I=new qe;n.add(I),Mt.headlights[M]=I;let Z=i(b.color,.12,.22);Z.emissive.set(b.color),Z.emissiveIntensity=b.smoke?.35:1.1;let U=i(b.smoke?"#1c3348":"#83b6d5",.45,.12);for(let ee of[-1,1]){let X=ee*.72,$=2.57-.28*(X/1.1)**2+.07,he=1.075;if(b.shape==="sportHousing"){let me=new Jt;me.moveTo(-.29,.12),me.lineTo(.23,.09),me.quadraticCurveTo(.32,.02,.26,-.13),me.lineTo(-.25,-.14),me.closePath();let ye=p(new jt(me,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),ft,$+.02,he,X,I);ye.rotation.y=Math.PI/2;for(let Ne=0;Ne<2;Ne++){let je=X+(Ne-.5)*.24;if(p(new sn(1,24,16),U,$+.13,he,je,I).scale.set(.022,.067,.067),b.signature==="rings"){let Ee=p(new yt(.086,.01,10,48),Z,$+.155,he,je,I);Ee.rotation.y=Math.PI/2}if(b.signature==="doubleL"&&vt([[$+.155,he+.075,je-.085],[$+.155,he-.075,je-.085],[$+.155,he-.075,je+.075]],.012,Z,I),b.signature==="pixels")for(let Ee=0;Ee<3;Ee++)p(new ut(.014,.026,.026),Z,$+.155,he+.09,je-.055+Ee*.055,I)}b.signature==="arc"&&vt([[$+.155,he-.09,X-.25],[$+.155,he+.1,X-.25],[$+.155,he+.12,X],[$+.155,he+.07,X+.25]],.012,Z,I);continue}let ze=et(.47,.25,.1,.04,ft,$,he,X,I);ze.rotation.y=Math.PI/2;for(let me of[-.18,.18]){p(new ut(.1,.07,.035),mt,$-.035,he-.15,X+me,I);let ye=p(new Ze(.012,.012,.018,12),o,$+.02,he-.13,X+me,I);ye.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(b.shape)){let me=b.shape==="doubleU"?2:1;for(let ye=0;ye<me;ye++){let Ne=X+(ye-(me-1)/2)*.21;if(p(new sn(1,24,16),U,$+.073,he,Ne,I).scale.set(.019,.067,.067),b.shape==="doubleU")vt([[$+.1,he+.075,Ne-.08],[$+.1,he-.04,Ne-.08],[$+.1,he-.08,Ne-.045],[$+.1,he-.08,Ne+.045],[$+.1,he-.04,Ne+.08],[$+.1,he+.075,Ne+.08]],.01,Z,I);else if(b.shape==="brow"){vt([[$+.1,he+.055,Ne-.19],[$+.1,he+.093,Ne-.14],[$+.1,he+.093,Ne+.19]],.011,Z,I);let fe=p(new yt(.068,.006,8,32),Z,$+.095,he-.015,Ne,I);fe.rotation.y=Math.PI/2}else for(let fe=0;fe<3;fe++){let Ee=fe*Math.PI*2/3-Math.PI/2;vt([[$+.102,he+Math.sin(Ee)*.025,Ne+Math.cos(Ee)*.025],[$+.102,he+Math.sin(Ee)*.1,Ne+Math.cos(Ee)*.1]],.011,Z,I)}}continue}if(b.shape==="bar"){for(let[me,ye,Ne]of[[.035,.41,.025],[-.045,.33,.012]]){let je=et(ye,Ne,.014,.006,Z,$+.064,he+me,X,I);je.rotation.y=Math.PI/2,je.castShadow=!1}continue}if(b.shape==="square"){let me=et(.37,.17,.024,.015,Z,$+.065,he,X,I);me.rotation.y=Math.PI/2;for(let ye=0;ye<7;ye++)p(new ut(.006,.16,.004),U,$+.082,he,X-.15+ye*.05,I);continue}let se=b.count===3?.062:b.count===2?.087:.106;for(let me=0;me<b.count;me++){let ye=X+(me-(b.count-1)/2)*(b.count===3?.14:.205),Ne=p(new Ze(se+.014,se+.02,.09,b.shape==="hex"?6:40),h,$+.035,he,ye,I);Ne.rotation.z=Math.PI/2;let je=p(new yt(se,.009,8,b.shape==="hex"?6:48),Z,$+.09,he,ye,I);je.rotation.y=Math.PI/2,je.castShadow=!1;let fe=p(new sn(1,24,16),b.projector?U:Z,$+.077,he,ye,I);if(fe.scale.set(.018,se*.74,se*.74),fe.castShadow=!1,b.projector&&p(new sn(1,16,12),Z,$+.092,he,ye,I).scale.set(.006,se*.31,se*.31),b.cross||b.guard)for(let Ee of[-1,1])vt([[$+.11,he-se*.74,ye-Ee*se*.74],[$+.115,he,ye],[$+.11,he+se*.74,ye+Ee*se*.74]],.009,ft,I)}}}let ie={};for(let M of["club","sport","rally","chrome"]){let b=[];ie[M]=b;for(let{wheelGroup:I,sign:Z}of Y){let U=new qe;I.add(U),b.push(U);let ee=M==="rally"?.91:.87,X=M==="rally"?.64:M==="sport"?.49:.57,$=M==="sport"?1:1.23,he=[],ze=[];for(let Ne=0;Ne<=48;Ne++){let je=-$+Ne*$*2/48;for(let fe of[-X/2,X/2])he.push(Math.sin(je)*ee,Math.cos(je)*ee,fe)}for(let Ne=0;Ne<48;Ne++){let je=Ne*2;ze.push(je,je+1,je+2,je+1,je+3,je+2)}let se=new ht;se.setAttribute("position",new Pe(he,3)),se.setIndex(ze),se.computeVertexNormals();let ye=(M==="chrome"?mt:M==="club"?s:Lt).clone();ye.side=Bt,p(se,ye,0,0,0,U);for(let Ne of[-1,1]){let je=Array.from({length:49},(fe,Ee)=>{let We=-$+Ee*$*2/48;return[Math.sin(We)*ee,Math.cos(We)*ee,Ne*X/2]});vt(je,.012,M==="chrome"?mt:ft,U)}for(let Ne of[-1,1])vt([[0,0,-Z*.28],[Ne*.28,.42,-Z*.31],[Ne*.49,.68,-Z*.31]],.022,ft,U),R(Ne*.49,.68,-Z*.32,U);if(M==="rally"){let Ne=et(.13,.25,X*.9,.025,ft,-.83,.2,0,U)}U.userData.shell=ye}}Mt.windshield={};for(let[M,b,I,Z]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let ee=function(fe,Ee){let We=.92*(1-.13*Ee),st=1-fe*fe;return[1.97+.23*st-b*.32*Ee,1.5+b*Ee*(.84+.16*st),fe*We]},U=new qe;n.add(U),Mt.windshield[M]=U;let X=[],$=[],he=40,ze=16;for(let fe=0;fe<=ze;fe++)for(let Ee=0;Ee<=he;Ee++)X.push(...ee(-1+Ee*2/he,fe/ze));for(let fe=0;fe<ze;fe++)for(let Ee=0;Ee<he;Ee++){let We=fe*(he+1)+Ee;$.push(We,We+1,We+he+1,We+1,We+he+2,We+he+1)}let se=new ht;se.setAttribute("position",new Pe(X,3)),se.setIndex($),se.computeVertexNormals();let me=new _n({color:I,metalness:.05,roughness:.075,transparent:!0,opacity:Z,depthWrite:!1,side:Bt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});U.userData.glass=me,U.userData.originalTint={color:I,opacity:Z};let ye=p(se,me,0,0,0,U);ye.castShadow=!1,ye.receiveShadow=!1,ye.renderOrder=3;let Ne=["smoke","highSmoke"].includes(M)?ft:mt;for(let fe of[0,1])vt(Array.from({length:41},(Ee,We)=>ee(-1+We/20,fe)),fe===0?.017:.009,Ne,U);for(let fe of[-1,1]){vt(Array.from({length:17},(st,mn)=>ee(fe,mn/16)),.011,Ne,U);let Ee=ee(fe,0);et(.19,.055,.14,.025,ft,Ee[0],Ee[1]-.025,Ee[2],U);let We=p(new Ze(.013,.013,.018,6),mt,Ee[0]+.04,Ee[1]+.014,Ee[2],U)}let je=new zn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let fe of[-.77,-.69]){let Ee=Array.from({length:13},(st,mn)=>{let fn=ee(fe,.18+mn*.058);return fn[0]+=.004,fn}),We=vt(Ee,.003,je,U);We.castShadow=!1,We.receiveShadow=!1,We.renderOrder=4}}let xe=new qe;for(let M of n.children.slice())M.userData.groundWheel||xe.add(M);n.add(xe);let De=i("#b8c7d6",.72,.27),Oe=new qe,Xe=[];n.add(Oe);for(let M of[-1.72,1.72])for(let b of[-1,1]){let I=new qe;I.position.set(M,.52,b*1.12),Oe.add(I);let Z=Array.from({length:193},(me,ye)=>{let Ne=ye/192,je=Ne*Math.PI*14;return new w(Math.cos(je)*.071,.055+Ne*.36,Math.sin(je)*.071)}),U=p(new St(new bt(Z),192,.014,10,!1),De,0,0,0,I);p(new Ze(.039,.039,.23,24),ft,0,.14,0,I);let ee=p(new Ze(.018,.018,.28,20),mt,0,.34,0,I),X=new qe;X.position.y=.47,I.add(X);for(let[me,ye]of[[I,.04],[X,-.015]])p(new Ze(.095,.095,.026,32),mt,0,ye,0,me),p(new Ze(.068,.068,.018,24),ft,0,ye+.02,0,me);p(new ut(.14,.075,.18),ft,0,.025,b*.035,I),p(new ut(.16,.075,.22),ft,0,0,-b*.075,X);let $=new w(M,.56,b*1.12),he=new w(M,.81,b*1.43),ze=he.clone().sub($);p(new Ze(.026,.026,ze.length(),16),ft,...$.clone().add(he).multiplyScalar(.5).toArray(),Oe).quaternion.setFromUnitVectors(new w(0,1,0),ze.normalize()),Xe.push({coil:U,rod:ee,upper:X})}Mt.brakes={};for(let M of["stock","red","gold","ceramic"]){let b=new qe;n.add(b),Mt.brakes[M]=b;for(let{wheelGroup:I,sign:Z}of Y){let U=rc(M);U.position.z=Z*.165,Z<0&&(U.rotation.y=Math.PI),I.add(U),b.userData.brakeAssemblies??=[],b.userData.brakeAssemblies.push(U)}}Mt.nitrous={};let Ke=document.createElement("canvas");Ke.width=512,Ke.height=256;let ke=Ke.getContext("2d");ke.fillStyle="#101923",ke.fillRect(0,0,512,256),ke.strokeStyle="#e8e1cc",ke.lineWidth=8,ke.strokeRect(10,10,492,236),ke.fillStyle="#f5f2e8",ke.textAlign="center",ke.font="italic bold 106px Arial",ke.fillText("N\u2082O",256,117),ke.font="bold 24px Arial",ke.fillText("NITROUS OXIDE",256,159),ke.fillStyle="#d9b36b",ke.font="bold 18px Arial",ke.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let M=0;M<42;M++)ke.fillRect(165+M*4,212,M%3+1,17);let $e=new Tt(Ke);$e.colorSpace=ct,$e.anisotropy=8;let nt=document.createElement("canvas");nt.width=nt.height=128;let Qe=nt.getContext("2d");Qe.fillStyle="#eee9dc",Qe.fillRect(0,0,128,128),Qe.translate(64,64),Qe.strokeStyle="#17202a";for(let M=0;M<=20;M++){let b=-Math.PI*.8+M*Math.PI*1.6/20;Qe.lineWidth=M%5?2:4,Qe.beginPath(),Qe.moveTo(Math.sin(b)*43,-Math.cos(b)*43),Qe.lineTo(Math.sin(b)*(M%5?49:53),-Math.cos(b)*(M%5?49:53)),Qe.stroke()}Qe.fillStyle="#293541",Qe.textAlign="center",Qe.font="bold 14px Arial",Qe.fillText("PSI",0,30),Qe.strokeStyle="#c92737",Qe.lineWidth=4,Qe.beginPath(),Qe.moveTo(-9,12),Qe.lineTo(26,-31),Qe.stroke(),Qe.fillStyle="#25313a",Qe.beginPath(),Qe.arc(0,0,6,0,Math.PI*2),Qe.fill();let Ft=new Tt(nt);Ft.colorSpace=ct;for(let M of["blue","twin","triple"]){let b=new qe;b.name="nitrous-"+M,n.add(b),Mt.nitrous[M]=b;let I=i(t.item("nitrous",M).color,.65,.27),Z=M==="triple"?3:M==="twin"?2:1,U=1.49,ee=-1.3,X=.37,$=i("#b4924f",.8,.3),he=i("#a5b2bd",.85,.24),ze=i("#1b2028",.08,.85),se=i("#ab2635",.35,.4);for(let me of[-1.52,-1.13]){et(.095,.05,Z*X+.04,.015,h,me,1.29,0,b);for(let ye of[-1,1]){let Ne=ye*(Z*X/2-.02);p(new Ze(.024,.024,.023,6),he,me,1.327,Ne,b)}}for(let me=0;me<Z;me++){let ye=(me-(Z-1)/2)*X,Ne=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([It,on])=>new ue(It,on)),je=p(new yi(Ne,40),I,ee,U,ye,b);je.rotation.z=-Math.PI/2;for(let It of[-1.52,-1.13]){et(.11,.095,.27,.025,ze,It,1.35,ye,b);let on=p(new yt(.152,.013,8,40),he,It,U,ye,b);on.rotation.y=Math.PI/2,et(.08,.025,.055,.008,he,It,U+.155,ye,b),p(new Ze(.013,.013,.018,6),h,It,U+.179,ye,b)}let fe=[],Ee=[],We=[];for(let It=0;It<2;It++)for(let on=0;on<=16;on++){let Es=-.91+on*1.82/16;if(fe.push(ee+(It?.12:-.12),U+Math.cos(Es)*.147,ye+Math.sin(Es)*.147),Ee.push(It,on/16),It&&on){let li=17+on;We.push(li-18,li-17,li,li-18,li,li-1)}}let st=new ht;st.setAttribute("position",new Pe(fe,3)),st.setAttribute("uv",new Pe(Ee,2)),st.setIndex(We),st.computeVertexNormals();let mn=new _n({map:$e,roughness:.55,metalness:.05,side:Bt});p(st,mn,0,0,0,b);let fn=p(new Ze(.046,.046,.055,24),$,-.89,U,ye,b);fn.rotation.z=Math.PI/2,et(.075,.07,.065,.012,$,-.845,U,ye,b),p(new Ze(.016,.016,.065,16),he,-.845,U+.045,ye,b);let Si=p(new yt(.052,.012,8,24),se,-.845,U+.092,ye,b);Si.rotation.x=Math.PI/2;for(let It of[0,Math.PI/3,Math.PI*2/3]){let on=et(.106,.014,.014,.004,se,-.845,U+.092,ye,b);on.rotation.y=It}let Ut=new qe;Ut.position.set(-.84,U+.065,ye+.075),Ut.rotation.x=-Math.PI*.32,b.add(Ut);let Zn=p(new Ze(.057,.057,.03,32),he,0,0,0,Ut);Zn.rotation.x=Math.PI/2;let ws=p(new Gn(.047,32),new zn({map:Ft}),0,0,.017,Ut),Fn=p(new Ze(.024,.024,.055,6),$,-.79,U,ye,b);Fn.rotation.z=Math.PI/2,vt([[-.76,U,ye],[-.7,U-.02,ye],[-.71,1.3,ye],[-.91,1.24,ye]],.014,ze,b);let En=p(new Ze(.021,.021,.055,12),he,-.74,U,ye,b);En.rotation.z=Math.PI/2}et(.07,.07,Z*X,.015,$,-.91,1.24,0,b),vt([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,ze,b)}Mt.seat={};for(let M of["red","carbon","emerald","ivory"]){let b=ac(M);b.rotation.y=Math.PI/2,b.position.set(-.8,1.04,0),n.add(b),Mt.seat[M]=b}function Xt(M){Te(M);let b=t.glassTints[M.glassTint]||t.glassTints.original;for(let se of Object.values(Mt.windshield)){let me=se.userData.originalTint;se.userData.glass.color.set(b.opacity===null?me.color:b.color),se.userData.glass.opacity=b.opacity??me.opacity}let I={standard:1,large:1.15,max:1.25}[M.wheelSize]||1,Z=(I-1)*(.715/.86),U={standard:1,wide:1.25,ultra:1.45}[M.tyreWidth]||1;for(let{wheelGroup:se,sign:me,tyres:ye}of Y){se.scale.set(.88/1.24*I,.88/.86*I,U/.95),se.position.y=.715/.86*I,se.position.z=me*(1.36+.25*(U-1));for(let[Ne,je]of Object.entries(ye))for(let fe of je)fe.visible=Ne===(M.tyres||"standard")}let ee=Z+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[M.suspension]||0);for(let[se,me]of Object.entries(Mt))if(se!=="brakes")for(let ye of Object.values(me))ye.parent===n&&(ye.userData.mountBaseY??=ye.position.y,ye.position.y=ye.userData.mountBaseY+ee);tn.forEach(se=>se.visible=!M.headlights||M.headlights==="classic");for(let[se,me]of Object.entries(ie))for(let ye of me)ye.visible=M.fenders===se,se==="club"&&ye.userData.shell.color.set(t.item("paint",M.paint).color);De.color.set(t.item("suspension",M.suspension).color),xe.position.y=ee,Oe.visible=ee>0,Xe.forEach(({coil:se,rod:me,upper:ye})=>{se.scale.y=1+ee/.415,me.scale.y=1+ee/.28,me.position.y=.34+ee/2,ye.position.y=.47+ee});for(let[se,me]of Object.entries(Mt))for(let[ye,Ne]of Object.entries(me))Ne.visible=M[se]===ye;for(let[se,me]of Object.entries(Mt.brakes))for(let ye of me.userData.brakeAssemblies||[])ye.visible=(M.brakes||"stock")===se;Object.entries(Ce).forEach(([se,me])=>me.visible=se===(M.steering||"classic")),Object.entries(it).forEach(([se,me])=>me.visible=se===(M.exhaust||"classic")),zt.visible=M.turbine==="boost";let X=["twin","twinBig"].includes(M.turbine),$=M.turbine==="twinBig",he=$?.9:X?.52:M.turbine==="boost"?.96:.9;gt.scale.set(he/1.24,he/.86,he/.95),gt.position.set(Pt,G+($?.06:X?-.2:-.04),X?$?-.7:-.44:0),yn.visible=X,yn.scale.copy(gt.scale),yn.position.set(Pt,G+($?.06:-.2),$?.7:.44);let ze=M.badges||[];if(A.forEach(se=>se.visible=!ze.length),S.forEach(se=>se.userData.plane.visible=!ze.length),P.forEach(({group:se,mat:me,back:ye,n:Ne})=>{let je=ze[Ne];se.visible=!!je;let fe=je+":"+(M.prizeTotal||0);if(!je||me.userData.badge===fe)return;let Ee=new Jt,We=.65/512,st=(mn,fn)=>[(mn-256)*We,(256-fn)*We];if(je==="millionaire"||je==="day-hero")Ee.absarc(0,0,204*We,0,Math.PI*2,!1);else if(je==="rating-top10"){for(let mn=0;mn<6;mn++){let fn=mn*Math.PI/3-Math.PI/2,Si=st(256+Math.cos(fn)*215,256+Math.sin(fn)*215);mn?Ee.lineTo(...Si):Ee.moveTo(...Si)}Ee.closePath()}else Ee.moveTo(...st(80,88)),Ee.quadraticCurveTo(...st(256,0),...st(432,88)),Ee.lineTo(...st(420,296)),Ee.quadraticCurveTo(...st(390,400),...st(256,465)),Ee.quadraticCurveTo(...st(122,400),...st(92,296)),Ee.closePath();ye.geometry.dispose(),ye.geometry=new jt(Ee,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),me.map?.dispose(),me.map=new Tt(t.badgeCanvas(je,M)),me.map.colorSpace=ct,me.map.anisotropy=16,me.emissive.set("#ffffff"),me.emissiveMap=me.map,me.emissiveIntensity=.35,me.userData.badge=fe,me.needsUpdate=!0}),s.color.set(t.item("paint",M.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(M)),we!==M.wheels){for(let se of Me)se.removeFromParent(),se.geometry.dispose();Me.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:se,x:me,out:ye,sign:Ne}of Y)for(let je of t.wheelDesign(M.wheels)){let fe=new bt(je.map(([We,st])=>new w(We,st,Ne*(.25+.025*(1-Math.hypot(We,st)/.51))))),Ee=p(new St(fe,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[M.wheels]||(["fiveSpoke","legend"].includes(M.wheels)?.023:.009),8,!1),l,0,0,0,se);Me.push(Ee)}we=M.wheels}o.color.set(t.item("trim",M.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(M.trim)?.48:["cobalt","anodizedRed","champagne"].includes(M.trim)?.3:.135,o.metalness=.95,u.userData.style!==M.upholstery&&(u.map?.dispose(),u.map=new Tt(t.upholsteryCanvas(M.upholstery)),u.map.colorSpace=ct,u.map.wrapS=u.map.wrapT=qn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(M.upholstery)?.95:M.upholstery==="carbonWeave"?.28:.38,u.userData.style=M.upholstery,u.needsUpdate=!0),t.chipPalette(M.chips).forEach((se,me)=>{ae[me].color.set(se),ae[me].roughness=M.chips==="ceramic"?.25:.55}),k.forEach(se=>se.visible=M.chips!=="ceramic"),F.forEach(({mat:se,n:me})=>{se.userData.style!==M.chips&&(se.map?.dispose(),se.map=new Tt(t.chipCanvas(M.chips,me)),se.map.colorSpace=ct,se.map.anisotropy=8,se.userData.style=M.chips,se.needsUpdate=!0)}),pn.forEach((se,me)=>{se.userData.style!==M.cards&&(se.map?.dispose(),se.map=new Tt(t.cardCanvas(M.cards,me)),se.map.colorSpace=ct,se.map.anisotropy=16,se.userData.style=M.cards,se.needsUpdate=!0)}),Me.forEach(se=>se.visible=!0),_e.forEach(se=>se.visible=!0),d.color.set(t.item("light",M.light).color),d.emissive.copy(d.color),f.color.copy(d.color).multiplyScalar(.075),f.emissive.copy(d.color),f.emissiveIntensity=.045,bn.userData.number!==M.number+M.region&&(bn.map?.dispose(),bn.map=new Tt(t.plateCanvas(M)),bn.userData.number=M.number+M.region,bn.needsUpdate=!0)}for(let M of[-1,1])vt([[-1.64,.43,M*.94],[0,.4,M*1.02],[1.66,.43,M*.94]],.027,d,xe),vt([[M*1.91,.43,-.66],[M*2.05,.43,0],[M*1.91,.43,.66]],.023,d,xe);let Ct=new wr(d.color,.45,2,2);Ct.position.set(-1.9,2,.48),xe.add(Ct);let pt=Xt;function Dt(M){pt(M),Ct.color.copy(d.color)}return Dt(e),{car:n,update:Dt}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Hn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ct,n.toneMapping=ii,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Fa,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new vn,s=new Vt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Un("#c6d9ef","#44311e",1.25));for(let[Q,oe,Ae,le,Me]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let _e=new Tn(Q,oe);_e.position.set(Ae,le,Me),_e.castShadow=Q==="#fff0d0",_e.shadow.bias=-2e-4,_e.shadow.normalBias=.025,_e.shadow.mapSize.set(2048,2048),_e.shadow.camera.left=-5,_e.shadow.camera.right=5,_e.shadow.camera.top=5,_e.shadow.camera.bottom=-5,i.add(_e)}let a=new vn;a.background=new Ye("#48505b");for(let[Q,oe,Ae,le,Me,_e]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let Y=new at(new ut(le,Me,_e),new zn({color:"#ffffff"}));Y.position.set(Q,oe,Ae),a.add(Y)}let o=new Dr(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(Q=>{Q.geometry?.dispose(),Q.material?.dispose()}),o.dispose();let l=new at(new qt(30,30),new fs({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=zp(i,e),u=new hn({transparent:!0,depthWrite:!1,side:Bt,toneMapped:!1,uniforms:{color:{value:new Ye(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new at(new qt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let f=[];for(let Q of[-.9,.9]){let oe=new wr(u.uniforms.color.value,1.8,3,2);oe.position.set(0,.32,Q),i.add(oe),f.push(oe)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function v(Q){t.night=!!Q;for(let oe of i.children)oe.isHemisphereLight&&(oe.intensity=Q?.26:1.25),oe.isDirectionalLight&&(oe.userData.dayIntensity??=oe.intensity,oe.intensity=oe.userData.dayIntensity*(Q?.13:1));i.environmentIntensity=Q?.24:1.5,u.uniforms.strength.value=Q?1.35:.95}v(t.night);let m=Q=>{p&&v(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",m);let g=Q=>{h.update(Q),u.uniforms.color.value.set(window.PokerGarage.item("light",Q.light).color),f.forEach(oe=>oe.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let _=!1,y=null,x=0,T=0,C=()=>{let Q=r.clientWidth,oe=r.clientHeight;Q&&oe&&(n.setSize(Q,oe,!1),s.aspect=Q/oe,s.updateProjectionMatrix())},O=new ResizeObserver(C);O.observe(r),C();let W=new Bn(1,1,{type:Ui,depthBuffer:!0});W.samples=4;let D=new vn,L=new xi(-1,1,1,-1,0,1),z=new hn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:W.texture},stepSize:{value:new ue}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),N=new at(new qt(2,2),z);D.add(N);function j(){let Q=n.getDrawingBufferSize(new ue);(W.width!==Q.x||W.height!==Q.y)&&W.setSize(Q.x,Q.y),z.uniforms.stepSize.value.set(3/Q.x,3/Q.y),n.setRenderTarget(W),n.render(i,s),n.setRenderTarget(null),n.render(D,L)}let V=Q=>{Q.button&&Q.button!==0||(t.manual=!0,y={id:Q.pointerId,x:Q.clientX,y:Q.clientY},r.setPointerCapture(Q.pointerId),Q.preventDefault())},te=Q=>{!y||y.id!==Q.pointerId||(t.yaw-=(Q.clientX-y.x)*.011,t.pitch=bu(t.pitch+(Q.clientY-y.y)*.009,-.24,1.35),y.x=Q.clientX,y.y=Q.clientY,Q.preventDefault())},ne=Q=>{y&&y.id===Q.pointerId&&(y=null,r.hasPointerCapture(Q.pointerId)&&r.releasePointerCapture(Q.pointerId))},ge=Q=>{let oe={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};oe[Q.key]&&(t.manual=!0,t.yaw+=oe[Q.key][0],t.pitch=bu(t.pitch+oe[Q.key][1],-.24,1.35),Q.preventDefault())};r.addEventListener("keydown",ge),r.addEventListener("pointerdown",V),r.addEventListener("pointermove",te),r.addEventListener("pointerup",ne),r.addEventListener("pointercancel",ne),r.addEventListener("lostpointercapture",ne);function ce(){if(_)return;_=!0,window.removeEventListener("poker-garage-lighting",m),cancelAnimationFrame(x),O.disconnect(),r.removeEventListener("keydown",ge),r.removeEventListener("pointerdown",V),r.removeEventListener("pointermove",te),r.removeEventListener("pointerup",ne),r.removeEventListener("pointercancel",ne),r.removeEventListener("lostpointercapture",ne);let Q=new Set,oe=new Set,Ae=new Set;i.traverse(le=>{le.geometry&&Ae.add(le.geometry),le.material&&oe.add(le.material)}),oe.forEach(le=>{for(let Me of Object.values(le))Me&&Me.isTexture&&Q.add(Me);le.dispose()}),Q.forEach(le=>le.dispose()),Ae.forEach(le=>le.dispose()),c.dispose(),W.dispose(),z.dispose(),N.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function Te(Q){if(_)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){ce();return}let oe=T?Math.min(.05,(Q-T)/1e3):0;if(T=Q,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=oe*.13);let Ae=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Ae,1.15+Math.sin(t.pitch)*Ae,Math.cos(t.yaw)*Math.cos(t.pitch)*Ae),s.lookAt(0,1.2,0),j(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}x=requestAnimationFrame(Te)}return t.snapshotOnly||(x=requestAnimationFrame(Te)),{update:g,setNight:v,dispose:ce,state:t,snapshot(){let Q=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Q,1.15+Math.sin(t.pitch)*Q,Math.cos(t.yaw)*Math.cos(t.pitch)*Q),s.lookAt(0,1.2,0),j();let oe=document.createElement("canvas");return oe.width=n.domElement.width,oe.height=n.domElement.height,oe.getContext("2d").drawImage(n.domElement,0,0),oe}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
