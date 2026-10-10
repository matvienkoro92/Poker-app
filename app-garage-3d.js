(()=>{var oc=0,_o=1,lc=2;var vo=1,ta=2,pn=3,ki=0,Gt=1,Pt=2,Xn=0,Ur=1,xo=2,yo=3,Mo=4,cc=5,Hi=100,hc=101,uc=102,dc=103,pc=104,mc=200,fc=201,gc=202,_c=203,vc=204,xc=205,yc=206,Mc=207,Sc=208,bc=209,Tc=210,wc=211,Ec=212,Ac=213,Cc=214,na=0,ia=1,ra=2,Nr=3,sa=4,aa=5,oa=6,la=7,Rc=0,Ic=1,Pc=2,Cn=0,Lc=1,Dc=2,Uc=3,ca=4,Nc=5,Fc=6,Oc=7;var So=300,Wi=301,li=302,ha=303,ua=304,Fr=306,Qn=1e3,Pi=1001,_s=1002,hn=1003,Bc=1004;var Or=1005;var un=1006,da=1007;var ci=1008;var mn=1009,bo=1010,To=1011,Xi=1012,pa=1013,hi=1014,fn=1015,jn=1016,ma=1017,fa=1018,ji=1020,wo=35902,Eo=35899,zc=1021,Gc=1022,tn=1023,Br=1026,zr=1027,Ao=1028,ga=1029,Vc=1030,Co=1031;var Ro=1033,_a=33776,va=33777,xa=33778,ya=33779,Io=35840,Po=35841,Lo=35842,Do=35843,Uo=36196,No=37492,Fo=37496,Oo=37808,Bo=37809,zo=37810,Go=37811,Vo=37812,ko=37813,Ho=37814,Wo=37815,Xo=37816,jo=37817,qo=37818,Yo=37819,Zo=37820,Jo=37821,Ko=36492,$o=36494,Qo=36495,el=36283,tl=36284,nl=36285,il=36286;var hr=2300,vs=2301,fs=2302,ao=2400,oo=2401,lo=2402;var kc=3201;var Hc=0,Wc=1,ui="",ot="srgb",ei="srgb-linear",ur="linear",Qe="srgb";var $n=7680;var Xc=512,jc=513,qc=514,rl=515,Yc=516,Zc=517,Jc=518,Kc=519,co=35044;var sl="300 es",wn=2e3,dr=2001;var En=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var gs=Math.PI/180,xs=180/Math.PI;function qi(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(bt[255&r]+bt[r>>8&255]+bt[r>>16&255]+bt[r>>24&255]+"-"+bt[255&e]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[63&t|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[255&n]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function We(r,e,t){return Math.max(e,Math.min(t,r))}function Vh(r,e){return(r%e+e)%e}function Pa(r,e,t){return(1-t)*r+t*e}function tr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Rt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ee=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Jt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],f=s[a+2],v=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=f,void(e[t+3]=v);if(u!==v||c!==d||l!==p||h!==f){let m=1-o,g=c*d+l*p+h*f+u*v,_=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let C=Math.sqrt(x),R=Math.atan2(C,g*_);m=Math.sin(m*R)/C,o=Math.sin(o*R)/C}let M=o*_;if(c=c*m+d*M,l=l*m+p*M,h=h*m+f*M,u=u*m+v*M,m===1-o){let C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],f=s[a+3];return e[t]=o*f+h*u+c*p-l*d,e[t+1]=c*f+h*d+l*u-o*p,e[t+2]=l*f+h*p+o*d-c*u,e[t+3]=h*f-o*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),p=c(i/2),f=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*p*f,this._y=l*p*u-d*h*f,this._z=l*h*f+d*p*u,this._w=l*h*u-d*p*f;break;case"YXZ":this._x=d*h*u+l*p*f,this._y=l*p*u-d*h*f,this._z=l*h*f-d*p*u,this._w=l*h*u+d*p*f;break;case"ZXY":this._x=d*h*u-l*p*f,this._y=l*p*u+d*h*f,this._z=l*h*f+d*p*u,this._w=l*h*u-d*p*f;break;case"ZYX":this._x=d*h*u-l*p*f,this._y=l*p*u+d*h*f,this._z=l*h*f-d*p*u,this._w=l*h*u+d*p*f;break;case"YZX":this._x=d*h*u+l*p*f,this._y=l*p*u+d*h*f,this._z=l*h*f-d*p*u,this._w=l*h*u-d*p*f;break;case"XZY":this._x=d*h*u-l*p*f,this._y=l*p*u-d*h*f,this._z=l*h*f+d*p*u,this._w=l*h*u+d*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return La.copy(this).projectOnVector(e),this.sub(La)}reflect(e){return this.sub(La.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},La=new T,Nl=new Jt,Fe=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],f=n[8],v=i[0],m=i[3],g=i[6],_=i[1],x=i[4],M=i[7],C=i[2],R=i[5],N=i[8];return s[0]=a*v+o*_+c*C,s[3]=a*m+o*x+c*R,s[6]=a*g+o*M+c*N,s[1]=l*v+h*_+u*C,s[4]=l*m+h*x+u*R,s[7]=l*g+h*M+u*N,s[2]=d*v+p*_+f*C,s[5]=d*m+p*x+f*R,s[8]=d*g+p*M+f*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,p=l*s-a*c,f=t*u+n*d+i*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/f;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Da.makeScale(e,t)),this}rotate(e){return this.premultiply(Da.makeRotation(-e)),this}translate(e,t){return this.premultiply(Da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Da=new Fe;function al(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $c(){let r=pr("canvas");return r.style.display="block",r}var Fl={};function Li(r){r in Fl||(Fl[r]=!0,console.warn(r))}function Qc(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Ol=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bl=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kh(){let r={enabled:!0,workingColorSpace:ei,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Qe&&(i.r=Tn(i.r),i.g=Tn(i.g),i.b=Tn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(i.r=Ii(i.r),i.g=Ii(i.g),i.b=Ii(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?ur:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Li("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Li("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ei]:{primaries:e,whitePoint:n,transfer:ur,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ot},outputColorSpaceConfig:{drawingBufferColorSpace:ot}},[ot]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:Ol,fromXYZ:Bl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ot}}}),r}var Je=kh();function Tn(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Ii(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var xi,ys=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xi===void 0&&(xi=pr("canvas")),xi.width=e.width,xi.height=e.height;let i=xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*Tn(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Tn(t[n]/255)):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Hh=0,Di=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ua(i[a].image)):s.push(Ua(i[a]))}else s=Ua(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ua(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ys.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Wh=0,Na=new T,It=class r extends En{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=qi(),this.name="",this.source=new Di(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Na).x}get height(){return this.source.getSize(Na).y}get depth(){return this.source.getSize(Na).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==So)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qn:e.x=e.x-Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case _s:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Qn:e.y=e.y-Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case _s:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};It.DEFAULT_IMAGE=null,It.DEFAULT_MAPPING=So,It.DEFAULT_ANISOTROPY=1;var Ke=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],f=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(f-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(f+m)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(l+1)/2,M=(p+1)/2,C=(g+1)/2,R=(h+d)/4,N=(u+v)/4,B=(f+m)/4;return x>M&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=R/n,s=N/n):M>C?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=R/i,s=B/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=N/s,i=B/s),this.set(n,i,s,t),this}let _=Math.sqrt((m-f)*(m-f)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-f)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ms=class extends En{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ke(0,0,e,t),this.scissorTest=!1,this.viewport=new Ke(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new It(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Di(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ht=class extends Ms{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},mr=class extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ss=class extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Kt=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(s,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xr.copy(n.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),jr.subVectors(this.max,nr),yi.subVectors(e.a,nr),Mi.subVectors(e.b,nr),Si.subVectors(e.c,nr),Pn.subVectors(Mi,yi),Ln.subVectors(Si,Mi),Yn.subVectors(yi,Si);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Yn.z,Yn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Yn.z,0,-Yn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Yn.y,Yn.x,0];return!!Fa(t,yi,Mi,Si,jr)&&(t=[1,0,0,0,1,0,0,0,1],!!Fa(t,yi,Mi,Si,jr)&&(qr.crossVectors(Pn,Ln),t=[qr.x,qr.y,qr.z],Fa(t,yi,Mi,Si,jr)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(qt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},vn=[new T,new T,new T,new T,new T,new T,new T,new T],qt=new T,Xr=new Kt,yi=new T,Mi=new T,Si=new T,Pn=new T,Ln=new T,Yn=new T,nr=new T,jr=new T,qr=new T,Zn=new T;function Fa(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Zn.fromArray(r,s);let o=i.x*Math.abs(Zn.x)+i.y*Math.abs(Zn.y)+i.z*Math.abs(Zn.z),c=e.dot(Zn),l=t.dot(Zn),h=n.dot(Zn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Xh=new Kt,ir=new T,Oa=new T,$t=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xh.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);let t=ir.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(ir,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add(Oa)),this.expandByPoint(ir.copy(e.center).sub(Oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xn=new T,Ba=new T,Yr=new T,Dn=new T,za=new T,Zr=new T,Ga=new T,ti=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ba.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(Ba);let s=.5*e.distanceTo(t),a=-this.direction.dot(Yr),o=Dn.dot(this.direction),c=-Dn.dot(Yr),l=Dn.lengthSq(),h=Math.abs(1-a*a),u,d,p,f;if(h>0)if(u=a*c-o,d=a*o-c,f=s*h,u>=0)if(d>=-f)if(d<=f){let v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d<=-f?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=f?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ba).addScaledVector(Yr,d),p}intersectSphere(e,t){xn.subVectors(e.center,this.origin);let n=xn.dot(this.direction),i=xn.dot(xn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,i,s){za.subVectors(t,e),Zr.subVectors(n,e),Ga.crossVectors(za,Zr);let a,o=this.direction.dot(Ga);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Dn.subVectors(this.origin,e);let c=a*this.direction.dot(Zr.crossVectors(Dn,Zr));if(c<0)return null;let l=a*this.direction.dot(za.cross(Dn));if(l<0||c+l>o)return null;let h=-a*Dn.dot(Ga);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oe=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,p,f,v,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,p,f,v,m)}set(e,t,n,i,s,a,o,c,l,h,u,d,p,f,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=f,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/bi.setFromMatrixColumn(e,0).length(),s=1/bi.setFromMatrixColumn(e,1).length(),a=1/bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,f=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+f*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=f+p*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,f=l*h,v=l*u;t[0]=d+v*o,t[4]=f*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-f,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,f=l*h,v=l*u;t[0]=d-v*o,t[4]=-a*u,t[8]=f+p*o,t[1]=p+f*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,p=a*u,f=o*h,v=o*u;t[0]=c*h,t[4]=f*l-p,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=p*l-f,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,p=a*l,f=o*c,v=o*l;t[0]=c*h,t[4]=v-d*u,t[8]=f*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+f,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*c,p=a*l,f=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-f,t[2]=f*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jh,e,qh)}lookAt(e,t,n){let i=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),Un.crossVectors(n,Lt),Un.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),Un.crossVectors(n,Lt)),Un.normalize(),Jr.crossVectors(Lt,Un),i[0]=Un.x,i[4]=Jr.x,i[8]=Lt.x,i[1]=Un.y,i[5]=Jr.y,i[9]=Lt.y,i[2]=Un.z,i[6]=Jr.z,i[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],f=n[2],v=n[6],m=n[10],g=n[14],_=n[3],x=n[7],M=n[11],C=n[15],R=i[0],N=i[4],B=i[8],D=i[12],H=i[1],W=i[5],O=i[9],G=i[13],z=i[2],Y=i[6],J=i[10],ie=i[14],Q=i[3],ge=i[7],we=i[11],ye=i[15];return s[0]=a*R+o*H+c*z+l*Q,s[4]=a*N+o*W+c*Y+l*ge,s[8]=a*B+o*O+c*J+l*we,s[12]=a*D+o*G+c*ie+l*ye,s[1]=h*R+u*H+d*z+p*Q,s[5]=h*N+u*W+d*Y+p*ge,s[9]=h*B+u*O+d*J+p*we,s[13]=h*D+u*G+d*ie+p*ye,s[2]=f*R+v*H+m*z+g*Q,s[6]=f*N+v*W+m*Y+g*ge,s[10]=f*B+v*O+m*J+g*we,s[14]=f*D+v*G+m*ie+g*ye,s[3]=_*R+x*H+M*z+C*Q,s[7]=_*N+x*W+M*Y+C*ge,s[11]=_*B+x*O+M*J+C*we,s[15]=_*D+x*G+M*ie+C*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*p-n*c*p)+e[7]*(+t*c*p-t*l*d+s*a*d-i*a*p+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*p-s*a*u+n*a*p+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],f=e[12],v=e[13],m=e[14],g=e[15],_=u*m*l-v*d*l+v*c*p-o*m*p-u*c*g+o*d*g,x=f*d*l-h*m*l-f*c*p+a*m*p+h*c*g-a*d*g,M=h*v*l-f*u*l+f*o*p-a*v*p-h*o*g+a*u*g,C=f*u*c-h*v*c-f*o*d+a*v*d+h*o*m-a*u*m,R=t*_+n*x+i*M+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/R;return e[0]=_*N,e[1]=(v*d*s-u*m*s-v*i*p+n*m*p+u*i*g-n*d*g)*N,e[2]=(o*m*s-v*c*s+v*i*l-n*m*l-o*i*g+n*c*g)*N,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*p-n*c*p)*N,e[4]=x*N,e[5]=(h*m*s-f*d*s+f*i*p-t*m*p-h*i*g+t*d*g)*N,e[6]=(f*c*s-a*m*s-f*i*l+t*m*l+a*i*g-t*c*g)*N,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*p+t*c*p)*N,e[8]=M*N,e[9]=(f*u*s-h*v*s-f*n*p+t*v*p+h*n*g-t*u*g)*N,e[10]=(a*v*s-f*o*s+f*n*l-t*v*l-a*n*g+t*o*g)*N,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*p-t*o*p)*N,e[12]=C*N,e[13]=(h*v*i-f*u*i+f*n*d-t*v*d-h*n*m+t*u*m)*N,e[14]=(f*o*i-a*v*i-f*n*c+t*v*c+a*n*m-t*o*m)*N,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,p=s*h,f=s*u,v=a*h,m=a*u,g=o*u,_=c*l,x=c*h,M=c*u,C=n.x,R=n.y,N=n.z;return i[0]=(1-(v+g))*C,i[1]=(p+M)*C,i[2]=(f-x)*C,i[3]=0,i[4]=(p-M)*R,i[5]=(1-(d+g))*R,i[6]=(m+_)*R,i[7]=0,i[8]=(f+x)*N,i[9]=(m-_)*N,i[10]=(1-(d+v))*N,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=bi.set(i[0],i[1],i[2]).length(),a=bi.set(i[4],i[5],i[6]).length(),o=bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Yt.copy(this);let c=1/s,l=1/a,h=1/o;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=l,Yt.elements[5]*=l,Yt.elements[6]*=l,Yt.elements[8]*=h,Yt.elements[9]*=h,Yt.elements[10]*=h,t.setFromRotationMatrix(Yt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),f,v;if(c)f=s/(a-s),v=a*s/(a-s);else if(o===wn)f=-(a+s)/(a-s),v=-2*a*s/(a-s);else{if(o!==dr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);f=-a/(a-s),v=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),f,v;if(c)f=1/(a-s),v=a/(a-s);else if(o===wn)f=-2/(a-s),v=-(a+s)/(a-s);else{if(o!==dr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);f=-1/(a-s),v=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},bi=new T,Yt=new Oe,jh=new T(0,0,0),qh=new T(1,1,1),Un=new T,Jr=new T,Lt=new T,zl=new Oe,Gl=new Jt,Qt=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qt.DEFAULT_ORDER="XYZ";var fr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Yh=0,Vl=new T,Ti=new Jt,yn=new Oe,Kr=new T,rr=new T,Zh=new T,Jh=new Jt,kl=new T(1,0,0),Hl=new T(0,1,0),Wl=new T(0,0,1),Xl={type:"added"},Kh={type:"removed"},wi={type:"childadded",child:null},Va={type:"childremoved",child:null},wt=class r extends En{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new T,t=new Qt,n=new Jt,i=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Fe}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.premultiply(Ti),this}rotateX(e){return this.rotateOnAxis(kl,e)}rotateY(e){return this.rotateOnAxis(Hl,e)}rotateZ(e){return this.rotateOnAxis(Wl,e)}translateOnAxis(e,t){return Vl.copy(e).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kl,e)}translateY(e){return this.translateOnAxis(Hl,e)}translateZ(e){return this.translateOnAxis(Wl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kr.copy(e):Kr.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(rr,Kr,this.up):yn.lookAt(Kr,rr,this.up),this.quaternion.setFromRotationMatrix(yn),i&&(yn.extractRotation(i.matrixWorld),Ti.setFromRotationMatrix(yn),this.quaternion.premultiply(Ti.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xl),wi.child=e,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kh),Va.child=e,this.dispatchEvent(Va),Va.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xl),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,Zh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),f=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),f.length>0&&(n.nodes=f)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};wt.DEFAULT_UP=new T(0,1,0),wt.DEFAULT_MATRIX_AUTO_UPDATE=!0,wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zt=new T,Mn=new T,ka=new T,Sn=new T,Ei=new T,Ai=new T,jl=new T,Ha=new T,Wa=new T,Xa=new T,ja=new Ke,qa=new Ke,Ya=new Ke,bn=class r{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Zt.subVectors(e,t),i.cross(Zt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Zt.subVectors(i,t),Mn.subVectors(n,t),ka.subVectors(e,t);let a=Zt.dot(Zt),o=Zt.dot(Mn),c=Zt.dot(ka),l=Mn.dot(Mn),h=Mn.dot(ka),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(l*c-o*h)*d,f=(a*h-o*c)*d;return s.set(1-p-f,f,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Sn)!==null&&Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Sn.x),c.addScaledVector(a,Sn.y),c.addScaledVector(o,Sn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return ja.setScalar(0),qa.setScalar(0),Ya.setScalar(0),ja.fromBufferAttribute(e,t),qa.fromBufferAttribute(e,n),Ya.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ja,s.x),a.addScaledVector(qa,s.y),a.addScaledVector(Ya,s.z),a}static isFrontFacing(e,t,n,i){return Zt.subVectors(n,t),Mn.subVectors(e,t),Zt.cross(Mn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),.5*Zt.cross(Mn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Ei.subVectors(i,n),Ai.subVectors(s,n),Ha.subVectors(e,n);let c=Ei.dot(Ha),l=Ai.dot(Ha);if(c<=0&&l<=0)return t.copy(n);Wa.subVectors(e,i);let h=Ei.dot(Wa),u=Ai.dot(Wa);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ei,a);Xa.subVectors(e,s);let p=Ei.dot(Xa),f=Ai.dot(Xa);if(f>=0&&p<=f)return t.copy(s);let v=p*l-c*f;if(v<=0&&l>=0&&f<=0)return o=l/(l-f),t.copy(n).addScaledVector(Ai,o);let m=h*f-p*u;if(m<=0&&u-h>=0&&p-f>=0)return jl.subVectors(s,i),o=(u-h)/(u-h+(p-f)),t.copy(i).addScaledVector(jl,o);let g=1/(m+v+d);return a=v*g,o=d*g,t.copy(n).addScaledVector(Ei,a).addScaledVector(Ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},$r={h:0,s:0,l:0};function Za(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Je.workingColorSpace){if(e=Vh(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Za(a,s,e+1/3),this.g=Za(a,s,e),this.b=Za(a,s,e-1/3)}return Je.colorSpaceToWorking(this,i),this}setStyle(e,t=ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){let n=eh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return Je.workingToColorSpace(Tt.copy(this),e),65536*Math.round(We(255*Tt.r,0,255))+256*Math.round(We(255*Tt.g,0,255))+Math.round(We(255*Tt.b,0,255))}getHexString(e=ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Tt.copy(this),t);let n=Tt.r,i=Tt.g,s=Tt.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=ot){Je.workingToColorSpace(Tt.copy(this),e);let t=Tt.r,n=Tt.g,i=Tt.b;return e!==ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL($r);let n=Pa(Nn.h,$r.h,t),i=Pa(Nn.s,$r.s,t),s=Pa(Nn.l,$r.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tt=new Ue;Ue.NAMES=eh;var $h=0,An=class extends En{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zn=class extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ep=Qh();function Qh(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var ut=new T,Qr=new ee,eu=0,Nt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=co,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),i=Rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),i=Rt(i,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==co&&(e.usage=this.usage),e}};var gr=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var _r=class extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ce=class extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}},tu=0,kt=new Oe,Ja=new wt,Ci=new T,Dt=new Kt,sr=new Kt,gt=new T,et=class r extends En{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(al(e)?_r:gr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,n){return kt.makeTranslation(e,t,n),this.applyMatrix4(kt),this}scale(e,t,n){return kt.makeScale(e,t,n),this.applyMatrix4(kt),this}lookAt(e){return Ja.lookAt(e),Ja.updateMatrix(),this.applyMatrix4(Ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ce(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Dt.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $t);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){let n=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];sr.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Dt.min,sr.min),Dt.expandByPoint(gt),gt.addVectors(Dt.max,sr.max),Dt.expandByPoint(gt)):(Dt.expandByPoint(sr.min),Dt.expandByPoint(sr.max))}Dt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)gt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)gt.fromBufferAttribute(o,l),c&&(Ci.fromBufferAttribute(e,l),gt.add(Ci)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let B=0;B<n.count;B++)o[B]=new T,c[B]=new T;let l=new T,h=new T,u=new T,d=new ee,p=new ee,f=new ee,v=new T,m=new T;function g(B,D,H){l.fromBufferAttribute(n,B),h.fromBufferAttribute(n,D),u.fromBufferAttribute(n,H),d.fromBufferAttribute(s,B),p.fromBufferAttribute(s,D),f.fromBufferAttribute(s,H),h.sub(l),u.sub(l),p.sub(d),f.sub(d);let W=1/(p.x*f.y-f.x*p.y);isFinite(W)&&(v.copy(h).multiplyScalar(f.y).addScaledVector(u,-p.y).multiplyScalar(W),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-f.x).multiplyScalar(W),o[B].add(v),o[D].add(v),o[H].add(v),c[B].add(m),c[D].add(m),c[H].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let B=0,D=_.length;B<D;++B){let H=_[B],W=H.start;for(let O=W,G=W+H.count;O<G;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let x=new T,M=new T,C=new T,R=new T;function N(B){C.fromBufferAttribute(i,B),R.copy(C);let D=o[B];x.copy(D),x.sub(C.multiplyScalar(C.dot(D))).normalize(),M.crossVectors(R,D);let H=M.dot(c[B])<0?-1:1;a.setXYZW(B,x.x,x.y,x.z,H)}for(let B=0,D=_.length;B<D;++B){let H=_[B],W=H.start;for(let O=W,G=W+H.count;O<G;O+=3)N(e.getX(O+0)),N(e.getX(O+1)),N(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new T,s=new T,a=new T,o=new T,c=new T,l=new T,h=new T,u=new T;if(e)for(let d=0,p=e.count;d<p;d+=3){let f=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,f),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,f),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),p=0,f=0;for(let v=0,m=c.length;v<m;v++){p=o.isInterleavedBufferAttribute?c[v]*o.data.stride+o.offset:c[v]*h;for(let g=0;g<h;g++)d[f++]=l[p++]}return new Nt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ql=new Oe,Jn=new ti,es=new $t,Yl=new T,ts=new T,ns=new T,is=new T,Ka=new T,rs=new T,Zl=new T,ss=new T,dt=class extends wt{constructor(e=new et,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){rs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Ka.fromBufferAttribute(u,e),a?rs.addScaledVector(Ka,h):rs.addScaledVector(Ka.sub(t),h))}t.add(rs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),es.copy(n.boundingSphere),es.applyMatrix4(s),Jn.copy(e.ray).recast(e.near),es.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(es,Yl)===null||Jn.origin.distanceToSquared(Yl)>(e.far-e.near)**2))return;ql.copy(s).invert(),Jn.copy(e.ray).applyMatrix4(ql),n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Jn)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let f=0,v=d.length;f<v;f++){let m=d[f],g=a[m.materialIndex];for(let _=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));_<x;_+=3)i=as(this,g,e,n,l,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let f=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);f<v;f+=3)i=as(this,a,e,n,l,h,u,o.getX(f),o.getX(f+1),o.getX(f+2)),i&&(i.faceIndex=Math.floor(f/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let f=0,v=d.length;f<v;f++){let m=d[f],g=a[m.materialIndex];for(let _=Math.max(m.start,p.start),x=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));_<x;_+=3)i=as(this,g,e,n,l,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let f=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);f<v;f+=3)i=as(this,a,e,n,l,h,u,f,f+1,f+2),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}};function as(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,ts),r.getVertexPosition(c,ns),r.getVertexPosition(l,is);let h=(function(u,d,p,f,v,m,g,_){let x;if(x=d.side===1?f.intersectTriangle(g,m,v,!0,_):f.intersectTriangle(v,m,g,d.side===0,_),x===null)return null;ss.copy(_),ss.applyMatrix4(u.matrixWorld);let M=p.ray.origin.distanceTo(ss);return M<p.near||M>p.far?null:{distance:M,point:ss.clone(),object:u}})(r,e,t,n,ts,ns,is,Zl);if(h){let u=new T;bn.getBarycoord(Zl,ts,ns,is,u),i&&(h.uv=bn.getInterpolatedAttribute(i,o,c,l,u,new ee)),s&&(h.uv1=bn.getInterpolatedAttribute(s,o,c,l,u,new ee)),a&&(h.normal=bn.getInterpolatedAttribute(a,o,c,l,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new T,materialIndex:0};bn.getNormal(ts,ns,is,d.normal),h.face=d,h.barycoord=u}return h}var Mt=class r extends et{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,p=0;function f(v,m,g,_,x,M,C,R,N,B,D){let H=M/N,W=C/B,O=M/2,G=C/2,z=R/2,Y=N+1,J=B+1,ie=0,Q=0,ge=new T;for(let we=0;we<J;we++){let ye=we*W-G;for(let Re=0;Re<Y;Re++){let oe=Re*H-O;ge[v]=oe*_,ge[m]=ye*x,ge[g]=z,l.push(ge.x,ge.y,ge.z),ge[v]=0,ge[m]=0,ge[g]=R>0?1:-1,h.push(ge.x,ge.y,ge.z),u.push(Re/N),u.push(1-we/B),ie+=1}}for(let we=0;we<B;we++)for(let ye=0;ye<N;ye++){let Re=d+ye+Y*we,oe=d+ye+Y*(we+1),he=d+(ye+1)+Y*(we+1),le=d+(ye+1)+Y*we;c.push(Re,oe,le),c.push(oe,he,le),Q+=6}o.addGroup(p,Q,D),p+=Q,d+=ie}f("z","y","x",-1,-1,n,t,e,a,s,0),f("z","y","x",1,-1,n,t,-e,a,s,1),f("x","z","y",1,1,e,n,t,i,a,2),f("x","z","y",1,-1,e,n,-t,i,a,3),f("x","y","z",1,-1,e,t,n,i,s,4),f("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function di(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Et(r){let e={};for(let t=0;t<r.length;t++){let n=di(r[t]);for(let i in n)e[i]=n[i]}return e}function ol(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var th={clone:di,merge:Et},Ft=class extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=di(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ui=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Fn=new T,Jl=new ee,Kl=new ee,yt=class extends Ui{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*xs*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*gs*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*xs*Math.atan(Math.tan(.5*gs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Jl,Kl),t.subVectors(Kl,Jl)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*gs*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ri=-90,bs=class extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new yt(Ri,1,e,t);i.layers=this.layers,this.add(i);let s=new yt(Ri,1,e,t);s.layers=this.layers,this.add(s);let a=new yt(Ri,1,e,t);a.layers=this.layers,this.add(a);let o=new yt(Ri,1,e,t);o.layers=this.layers,this.add(o);let c=new yt(Ri,1,e,t);c.layers=this.layers,this.add(c);let l=new yt(Ri,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==dr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},vr=class extends It{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ts=class extends Ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new vr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Mt(5,5,5),s=new Ft({name:"CubemapFromEquirect",uniforms:di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new dt(i,s),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=un),new bs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},_t=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},nu={type:"move"},Ni=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(l,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,f=.005;l.inputState.pinching&&d>p+f?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-f&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nu)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new _t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var ni=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var tp=new T;var np=new T,ip=new T,rp=new T,sp=new ee,ap=new ee,op=new Oe,lp=new T,cp=new T,hp=new T,up=new ee,dp=new ee,pp=new ee;var mp=new T,fp=new T;var gp=new T,_p=new Ke,vp=new Ke,xp=new T,yp=new Oe,Mp=new T,Sp=new $t,bp=new Oe,Tp=new ti;var wp=new Oe,Ep=new Oe;var Ap=new Oe,Cp=new Oe;var Rp=new Kt,Ip=new Oe,Pp=new dt,Lp=new $t;var $a=new T,iu=new T,ru=new Fe,ln=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=$a.subVectors(n,t).cross(iu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($a),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ru.getNormalMatrix(e),i=this.coplanarPoint($a).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Kn=new $t,su=new ee(.5,.5),os=new T,Gn=class{constructor(e=new ln,t=new ln,n=new ln,i=new ln,s=new ln,a=new ln){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],f=s[8],v=s[9],m=s[10],g=s[11],_=s[12],x=s[13],M=s[14],C=s[15];if(i[0].setComponents(l-a,p-h,g-f,C-_).normalize(),i[1].setComponents(l+a,p+h,g+f,C+_).normalize(),i[2].setComponents(l+o,p+u,g+v,C+x).normalize(),i[3].setComponents(l-o,p-u,g-v,C-x).normalize(),n)i[4].setComponents(c,d,m,M).normalize(),i[5].setComponents(l-c,p-d,g-m,C-M).normalize();else if(i[4].setComponents(l-c,p-d,g-m,C-M).normalize(),t===wn)i[5].setComponents(l+c,p+d,g+m,C+M).normalize();else{if(t!==dr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,m,M).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);let t=su.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(os.x=i.normal.x>0?e.max.x:e.min.x,os.y=i.normal.y>0?e.max.y:e.min.y,os.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(os)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},an=new Oe,on=new Gn,ws=class r{constructor(){this.coordinateSystem=wn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(an.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),on.setFromProjectionMatrix(an,i.coordinateSystem,i.reversedDepth),on.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(an.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),on.setFromProjectionMatrix(an,i.coordinateSystem,i.reversedDepth),on.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(an.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),on.setFromProjectionMatrix(an,i.coordinateSystem,i.reversedDepth),on.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(an.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),on.setFromProjectionMatrix(an,i.coordinateSystem,i.reversedDepth),on.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(an.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),on.setFromProjectionMatrix(an,i.coordinateSystem,i.reversedDepth),on.containsPoint(e))return!0}return!1}clone(){return new r}};var ho=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Dp=new Oe,Up=new Ue(1,1,1),Np=new Gn,Fp=new ws,Op=new Kt,Bp=new $t,zp=new T,Gp=new T,Vp=new T,kp=new ho,Hp=new dt;var Wp=new T,Xp=new T,jp=new Oe,qp=new ti,Yp=new $t,Zp=new T,Jp=new T;var Kp=new T,$p=new T;var Qp=new Oe,em=new ti,tm=new $t,nm=new T;var Ot=class extends It{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},xr=class extends It{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Br&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Di(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},yr=class extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Es=class r extends et{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,f=2*n+s,v=i+1,m=new T,g=new T;for(let _=0;_<=f;_++){let x=0,M=0,C=0,R=0;if(_<=n){let D=_/n,H=D*Math.PI/2;M=-h-e*Math.cos(H),C=e*Math.sin(H),R=-e*Math.cos(H),x=D*u}else if(_<=n+s){let D=(_-n)/s;M=D*t-h,C=e,R=0,x=u+D*d}else{let D=(_-n-s)/n,H=D*Math.PI/2;M=h+e*Math.sin(H),C=e*Math.cos(H),R=e*Math.sin(H),x=u+d+D*u}let N=Math.max(0,Math.min(1,x/p)),B=0;_===0?B=.5/i:_===f&&(B=-.5/i);for(let D=0;D<=i;D++){let H=D/i,W=H*Math.PI*2,O=Math.sin(W),G=Math.cos(W);g.x=-C*G,g.y=M,g.z=C*O,o.push(g.x,g.y,g.z),m.set(-C*G,R,C*O),m.normalize(),c.push(m.x,m.y,m.z),l.push(H+B,N)}if(_>0){let D=(_-1)*v;for(let H=0;H<i;H++){let W=D+H,O=D+H+1,G=_*v+H,z=_*v+H+1;a.push(W,O,G),a.push(O,z,G)}}}this.setIndex(a),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},ii=class r extends et{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new T,h=new ee;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ce(a,3)),this.setAttribute("normal",new Ce(o,3)),this.setAttribute("uv",new Ce(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},en=class r extends et{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],f=0,v=[],m=n/2,g=0;function _(x){let M=f,C=new ee,R=new T,N=0,B=x===!0?e:t,D=x===!0?1:-1;for(let W=1;W<=i;W++)u.push(0,m*D,0),d.push(0,D,0),p.push(.5,.5),f++;let H=f;for(let W=0;W<=i;W++){let O=W/i*c+o,G=Math.cos(O),z=Math.sin(O);R.x=B*z,R.y=m*D,R.z=B*G,u.push(R.x,R.y,R.z),d.push(0,D,0),C.x=.5*G+.5,C.y=.5*z*D+.5,p.push(C.x,C.y),f++}for(let W=0;W<i;W++){let O=M+W,G=H+W;x===!0?h.push(G,G+1,O):h.push(G+1,G,O),N+=3}l.addGroup(g,N,x===!0?1:2),g+=N}(function(){let x=new T,M=new T,C=0,R=(t-e)/n;for(let N=0;N<=s;N++){let B=[],D=N/s,H=D*(t-e)+e;for(let W=0;W<=i;W++){let O=W/i,G=O*c+o,z=Math.sin(G),Y=Math.cos(G);M.x=H*z,M.y=-D*n+m,M.z=H*Y,u.push(M.x,M.y,M.z),x.set(z,R,Y).normalize(),d.push(x.x,x.y,x.z),p.push(O,1-D),B.push(f++)}v.push(B)}for(let N=0;N<i;N++)for(let B=0;B<s;B++){let D=v[B][N],H=v[B+1][N],W=v[B+1][N+1],O=v[B][N+1];(e>0||B!==0)&&(h.push(D,H,O),C+=3),(t>0||B!==s-1)&&(h.push(H,W,O),C+=3)}l.addGroup(g,C,0),g+=C})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},As=class r extends en{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Vn=class r extends et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(p,f,v,m){let g=m+1,_=[];for(let x=0;x<=g;x++){_[x]=[];let M=p.clone().lerp(v,x/g),C=f.clone().lerp(v,x/g),R=g-x;for(let N=0;N<=R;N++)_[x][N]=N===0&&x===g?M:M.clone().lerp(C,N/R)}for(let x=0;x<g;x++)for(let M=0;M<2*(g-x)-1;M++){let C=Math.floor(M/2);M%2==0?(c(_[x][C+1]),c(_[x+1][C]),c(_[x][C])):(c(_[x][C+1]),c(_[x+1][C+1]),c(_[x+1][C]))}}function c(p){s.push(p.x,p.y,p.z)}function l(p,f){let v=3*p;f.x=e[v+0],f.y=e[v+1],f.z=e[v+2]}function h(p,f,v,m){m<0&&p.x===1&&(a[f]=p.x-1),v.x===0&&v.z===0&&(a[f]=m/2/Math.PI+.5)}function u(p){return Math.atan2(p.z,-p.x)}function d(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let f=new T,v=new T,m=new T;for(let g=0;g<t.length;g+=3)l(t[g+0],f),l(t[g+1],v),l(t[g+2],m),o(f,v,m,p)})(i),(function(p){let f=new T;for(let v=0;v<s.length;v+=3)f.x=s[v+0],f.y=s[v+1],f.z=s[v+2],f.normalize().multiplyScalar(p),s[v+0]=f.x,s[v+1]=f.y,s[v+2]=f.z})(n),(function(){let p=new T;for(let f=0;f<s.length;f+=3){p.x=s[f+0],p.y=s[f+1],p.z=s[f+2];let v=u(p)/2/Math.PI+.5,m=d(p)/Math.PI+.5;a.push(v,1-m)}(function(){let f=new T,v=new T,m=new T,g=new T,_=new ee,x=new ee,M=new ee;for(let C=0,R=0;C<s.length;C+=9,R+=6){f.set(s[C+0],s[C+1],s[C+2]),v.set(s[C+3],s[C+4],s[C+5]),m.set(s[C+6],s[C+7],s[C+8]),_.set(a[R+0],a[R+1]),x.set(a[R+2],a[R+3]),M.set(a[R+4],a[R+5]),g.copy(f).add(v).add(m).divideScalar(3);let N=u(g);h(_,R+0,f,N),h(x,R+2,v,N),h(M,R+4,m,N)}})(),(function(){for(let f=0;f<a.length;f+=6){let v=a[f+0],m=a[f+2],g=a[f+4],_=Math.max(v,m,g),x=Math.min(v,m,g);_>.9&&x<.1&&(v<.2&&(a[f+0]+=1),m<.2&&(a[f+2]+=1),g<.2&&(a[f+4]+=1))}})()})(),this.setAttribute("position",new Ce(s,3)),this.setAttribute("normal",new Ce(s.slice(),3)),this.setAttribute("uv",new Ce(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},Cs=class r extends Vn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},ls=new T,cs=new T,Qa=new T,hs=new bn,Rs=class extends et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(gs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let f=0;f<c;f+=3){a?(l[0]=a.getX(f),l[1]=a.getX(f+1),l[2]=a.getX(f+2)):(l[0]=f,l[1]=f+1,l[2]=f+2);let{a:v,b:m,c:g}=hs;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),hs.getNormal(Qa),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let x=(_+1)%3,M=u[_],C=u[x],R=hs[h[_]],N=hs[h[x]],B=`${M}_${C}`,D=`${C}_${M}`;D in d&&d[D]?(Qa.dot(d[D].normal)<=s&&(p.push(R.x,R.y,R.z),p.push(N.x,N.y,N.z)),d[D]=null):B in d||(d[B]={index0:l[_],index1:l[x],normal:Qa.clone()})}}for(let f in d)if(d[f]){let{index0:v,index1:m}=d[f];ls.fromBufferAttribute(o,v),cs.fromBufferAttribute(o,m),p.push(ls.x,ls.y,ls.z),p.push(cs.x,cs.y,cs.z)}this.setAttribute("position",new Ce(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Bt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ee:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],s=[],a=[],o=new T,c=new Oe;for(let p=0;p<=e;p++){let f=p/e;i[p]=this.getTangentAt(f,new T)}s[0]=new T,a[0]=new T;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(We(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,f))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(We(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let f=1;f<=e;f++)s[f].applyMatrix4(c.makeRotationAxis(i[f],p*f)),a[f].crossVectors(i[f],s[f])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Fi=class extends Bt{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ee){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Is=class extends Fi{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ll(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var us=new T,eo=new ll,to=new ll,no=new ll,St=class extends Bt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(us.subVectors(i[0],i[1]).add(i[0]),o=us);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(us.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=us),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,f=Math.pow(o.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(c),p);v<1e-4&&(v=1),f<1e-4&&(f=v),m<1e-4&&(m=v),eo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,f,v,m),to.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,f,v,m),no.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,f,v,m)}else this.curveType==="catmullrom"&&(eo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),to.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),no.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(eo.calc(h),to.calc(h),no.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $l(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function lr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function cr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var Mr=class extends Bt{constructor(e=new ee,t=new ee,n=new ee,i=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ee){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,i.x,s.x,a.x,o.x),cr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ps=class extends Bt{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,i.x,s.x,a.x,o.x),cr(e,i.y,s.y,a.y,o.y),cr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Sr=class extends Bt{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ls=class extends Bt{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},br=class extends Bt{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(lr(e,i.x,s.x,a.x),lr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tr=class extends Bt{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(lr(e,i.x,s.x,a.x),lr(e,i.y,s.y,a.y),lr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wr=class extends Bt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set($l(o,c.x,l.x,h.x,u.x),$l(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ee().fromArray(i))}return this}},Ds=Object.freeze({__proto__:null,ArcCurve:Is,CatmullRomCurve3:St,CubicBezierCurve:Mr,CubicBezierCurve3:Ps,EllipseCurve:Fi,LineCurve:Sr,LineCurve3:Ls,QuadraticBezierCurve:br,QuadraticBezierCurve3:Tr,SplineCurve:wr}),Us=class extends Bt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ds[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ds[i.type]().fromJSON(i))}return this}},kn=class extends Us{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Sr(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new br(this.currentPoint.clone(),new ee(e,t),new ee(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Mr(this.currentPoint.clone(),new ee(e,t),new ee(n,i),new ee(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new wr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Fi(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Hn=class extends kn{constructor(e){super(e),this.uuid=qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new kn().fromJSON(i))}return this}};function au(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Ql(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,p){let f=[];for(let v=0,m=u.length;v<m;v++){let g=Ql(h,u[v]*p,v<m-1?u[v+1]*p:h.length,p,!1);g===g.next&&(g.steiner=!0),f.push(mu(g))}f.sort(uu);for(let v=0;v<f.length;v++)d=du(f[v],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let p=r[d],f=r[d+1];p<o&&(o=p),f<c&&(c=f),p>h&&(h=p),f>u&&(u=f)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Er(s,a,t,o,c,l,0),a}function Ql(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=ec(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=ec(a/n|0,r[a],r[a+1],s);return s&&Oi(s,s.next)&&(Cr(s),s=s.next),s}function ri(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Oi(n,n.next)&&st(n.prev,n,n.next)!==0)n=n.next;else{if(Cr(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Er(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=uo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(p){let f,v=1;do{let m,g=p;p=null;let _=null;for(f=0;g;){f++;let x=g,M=0;for(let R=0;R<v&&(M++,x=x.nextZ,x);R++);let C=v;for(;M>0||C>0&&x;)M!==0&&(C===0||!x||g.z<=x.z)?(m=g,g=g.nextZ,M--):(m=x,x=x.nextZ,C--),_?_.nextZ=m:p=m,m.prevZ=_,_=m;g=x}_.nextZ=null,v*=2}while(f>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?lu(r,n,i,s):ou(r))e.push(c.i,r.i,l.i),Cr(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?Er(r=cu(ri(r),e),e,t,n,i,s,2):a===2&&hu(r,e,t,n,i,s):Er(ri(r),e,t,n,i,s,1);break}}}function ou(r){let e=r.prev,t=r,n=r.next;if(st(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),p=Math.max(o,c,l),f=n.next;for(;f!==e;){if(f.x>=h&&f.x<=d&&f.y>=u&&f.y<=p&&or(i,o,s,c,a,l,f.x,f.y)&&st(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function lu(r,e,t,n){let i=r.prev,s=r,a=r.next;if(st(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,p=Math.min(o,c,l),f=Math.min(h,u,d),v=Math.max(o,c,l),m=Math.max(h,u,d),g=uo(p,f,e,t,n),_=uo(v,m,e,t,n),x=r.prevZ,M=r.nextZ;for(;x&&x.z>=g&&M&&M.z<=_;){if(x.x>=p&&x.x<=v&&x.y>=f&&x.y<=m&&x!==i&&x!==a&&or(o,h,c,u,l,d,x.x,x.y)&&st(x.prev,x,x.next)>=0||(x=x.prevZ,M.x>=p&&M.x<=v&&M.y>=f&&M.y<=m&&M!==i&&M!==a&&or(o,h,c,u,l,d,M.x,M.y)&&st(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;x&&x.z>=g;){if(x.x>=p&&x.x<=v&&x.y>=f&&x.y<=m&&x!==i&&x!==a&&or(o,h,c,u,l,d,x.x,x.y)&&st(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;M&&M.z<=_;){if(M.x>=p&&M.x<=v&&M.y>=f&&M.y<=m&&M!==i&&M!==a&&or(o,h,c,u,l,d,M.x,M.y)&&st(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function cu(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Oi(n,i)&&ih(n,t,t.next,i)&&Ar(n,i)&&Ar(i,n)&&(e.push(n.i,t.i,i.i),Cr(t),Cr(t.next),t=r=i),t=t.next}while(t!==r);return ri(t)}function hu(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&fu(a,o)){let c=rh(a,o);return a=ri(a,a.next),c=ri(c,c.next),Er(a,e,t,n,i,s,0),void Er(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function uu(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function du(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Oi(i,a))return a;do{if(Oi(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let v=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(v<=o&&v>h&&(h=v,l=a.x<a.next.x?a:a.next,v===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,p=l.y,f=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&nh(c<p?o:h,c,d,p,c<p?h:o,c,a.x,a.y)){let v=Math.abs(c-a.y)/(o-a.x);Ar(a,i)&&(v<f||v===f&&(a.x>l.x||a.x===l.x&&pu(l,a)))&&(l=a,f=v)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=rh(t,r);return ri(n,n.next),ri(t,t.next)}function pu(r,e){return st(r.prev,r,e.prev)<0&&st(e.next,r,r.next)<0}function uo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function mu(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function nh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function or(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&nh(r,e,t,n,i,s,a,o)}function fu(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&ih(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(Ar(r,e)&&Ar(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(st(r.prev,r,e.prev)||st(r,e.prev,e))||Oi(r,e)&&st(r.prev,r,r.next)>0&&st(e.prev,e,e.next)>0)}function st(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Oi(r,e){return r.x===e.x&&r.y===e.y}function ih(r,e,t,n){let i=ps(st(r,e,t)),s=ps(st(r,e,n)),a=ps(st(t,n,r)),o=ps(st(t,n,e));return i!==s&&a!==o||!(i!==0||!ds(r,t,e))||!(s!==0||!ds(r,n,e))||!(a!==0||!ds(t,r,n))||!(o!==0||!ds(t,e,n))}function ds(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ps(r){return r>0?1:r<0?-1:0}function Ar(r,e){return st(r.prev,r,r.next)<0?st(r,e,r.next)>=0&&st(r,r.prev,e)>=0:st(r,e,r.prev)<0||st(r,r.next,e)<0}function rh(r,e){let t=po(r.i,r.x,r.y),n=po(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function ec(r,e,t,n){let i=po(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Cr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function po(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var mo=class{static triangulate(e,t,n=2){return au(e,t,n)}},cn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];tc(e),nc(n,e);let a=e.length;t.forEach(tc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,nc(n,t[c]);let o=mo.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function tc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function nc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var si=class r extends et{constructor(e=new Hn([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:gu,x,M,C,R,N,B=!1;g&&(x=g.getSpacedPoints(h),B=!0,d=!1,M=g.computeFrenetFrames(h,!1),C=new T,R=new T,N=new T),d||(m=0,p=0,f=0,v=0);let D=o.extractPoints(l),H=D.shape,W=D.holes;if(!cn.isClockWise(H)){H=H.reverse();for(let L=0,y=W.length;L<y;L++){let A=W[L];cn.isClockWise(A)&&(W[L]=A.reverse())}}function O(L){let y=10000000000000001e-36,A=L[0];for(let U=1;U<=L.length;U++){let P=U%L.length,q=L[P],V=q.x-A.x,k=q.y-A.y,se=V*V+k*k,pe=Math.max(Math.abs(q.x),Math.abs(q.y),Math.abs(A.x),Math.abs(A.y));se<=y*pe*pe?(L.splice(P,1),U--):A=q}}O(H),W.forEach(O);let G=W.length,z=H;for(let L=0;L<G;L++){let y=W[L];H=H.concat(y)}function Y(L,y,A){return y||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(y,A)}let J=H.length;function ie(L,y,A){let U,P,q,V=L.x-y.x,k=L.y-y.y,se=A.x-L.x,pe=A.y-L.y,re=V*V+k*k,_e=V*pe-k*se;if(Math.abs(_e)>Number.EPSILON){let Me=Math.sqrt(re),Ee=Math.sqrt(se*se+pe*pe),ze=y.x-k/Me,Xe=y.y+V/Me,je=((A.x-pe/Ee-ze)*pe-(A.y+se/Ee-Xe)*se)/(V*pe-k*se);U=ze+V*je-L.x,P=Xe+k*je-L.y;let me=U*U+P*P;if(me<=2)return new ee(U,P);q=Math.sqrt(me/2)}else{let Me=!1;V>Number.EPSILON?se>Number.EPSILON&&(Me=!0):V<-Number.EPSILON?se<-Number.EPSILON&&(Me=!0):Math.sign(k)===Math.sign(pe)&&(Me=!0),Me?(U=-k,P=V,q=Math.sqrt(re)):(U=V,P=k,q=Math.sqrt(re/2))}return new ee(U/q,P/q)}let Q=[];for(let L=0,y=z.length,A=y-1,U=L+1;L<y;L++,A++,U++)A===y&&(A=0),U===y&&(U=0),Q[L]=ie(z[L],z[A],z[U]);let ge=[],we,ye,Re=Q.concat();for(let L=0,y=G;L<y;L++){let A=W[L];we=[];for(let U=0,P=A.length,q=P-1,V=U+1;U<P;U++,q++,V++)q===P&&(q=0),V===P&&(V=0),we[U]=ie(A[U],A[q],A[V]);ge.push(we),Re=Re.concat(we)}if(m===0)ye=cn.triangulateShape(z,W);else{let L=[],y=[];for(let A=0;A<m;A++){let U=A/m,P=p*Math.cos(U*Math.PI/2),q=f*Math.sin(U*Math.PI/2)+v;for(let V=0,k=z.length;V<k;V++){let se=Y(z[V],Q[V],q);Ae(se.x,se.y,-P),U===0&&L.push(se)}for(let V=0,k=G;V<k;V++){let se=W[V];we=ge[V];let pe=[];for(let re=0,_e=se.length;re<_e;re++){let Me=Y(se[re],we[re],q);Ae(Me.x,Me.y,-P),U===0&&pe.push(Me)}U===0&&y.push(pe)}}ye=cn.triangulateShape(L,y)}let oe=ye.length,he=f+v;for(let L=0;L<J;L++){let y=d?Y(H[L],Re[L],he):H[L];B?(R.copy(M.normals[0]).multiplyScalar(y.x),C.copy(M.binormals[0]).multiplyScalar(y.y),N.copy(x[0]).add(R).add(C),Ae(N.x,N.y,N.z)):Ae(y.x,y.y,0)}for(let L=1;L<=h;L++)for(let y=0;y<J;y++){let A=d?Y(H[y],Re[y],he):H[y];B?(R.copy(M.normals[L]).multiplyScalar(A.x),C.copy(M.binormals[L]).multiplyScalar(A.y),N.copy(x[L]).add(R).add(C),Ae(N.x,N.y,N.z)):Ae(A.x,A.y,u/h*L)}for(let L=m-1;L>=0;L--){let y=L/m,A=p*Math.cos(y*Math.PI/2),U=f*Math.sin(y*Math.PI/2)+v;for(let P=0,q=z.length;P<q;P++){let V=Y(z[P],Q[P],U);Ae(V.x,V.y,u+A)}for(let P=0,q=W.length;P<q;P++){let V=W[P];we=ge[P];for(let k=0,se=V.length;k<se;k++){let pe=Y(V[k],we[k],U);B?Ae(pe.x,pe.y+x[h-1].y,x[h-1].x+A):Ae(pe.x,pe.y,u+A)}}}function le(L,y){let A=L.length;for(;--A>=0;){let U=A,P=A-1;P<0&&(P=L.length-1);for(let q=0,V=h+2*m;q<V;q++){let k=J*q,se=J*(q+1);b(y+U+k,y+P+k,y+P+se,y+U+se)}}}function Ae(L,y,A){c.push(L),c.push(y),c.push(A)}function Se(L,y,A){S(L),S(y),S(A);let U=i.length/3,P=_.generateTopUV(n,i,U-3,U-2,U-1);F(P[0]),F(P[1]),F(P[2])}function b(L,y,A,U){S(L),S(y),S(U),S(y),S(A),S(U);let P=i.length/3,q=_.generateSideWallUV(n,i,P-6,P-3,P-2,P-1);F(q[0]),F(q[1]),F(q[3]),F(q[1]),F(q[2]),F(q[3])}function S(L){i.push(c[3*L+0]),i.push(c[3*L+1]),i.push(c[3*L+2])}function F(L){s.push(L.x),s.push(L.y)}(function(){let L=i.length/3;if(d){let y=0,A=J*y;for(let U=0;U<oe;U++){let P=ye[U];Se(P[2]+A,P[1]+A,P[0]+A)}y=h+2*m,A=J*y;for(let U=0;U<oe;U++){let P=ye[U];Se(P[0]+A,P[1]+A,P[2]+A)}}else{for(let y=0;y<oe;y++){let A=ye[y];Se(A[2],A[1],A[0])}for(let y=0;y<oe;y++){let A=ye[y];Se(A[0]+J*h,A[1]+J*h,A[2]+J*h)}}n.addGroup(L,i.length/3-L,0)})(),(function(){let L=i.length/3,y=0;le(z,y),y+=z.length;for(let A=0,U=W.length;A<U;A++){let P=W[A];le(P,y),y+=P.length}n.addGroup(L,i.length/3-L,1)})()}this.setAttribute("position",new Ce(i,3)),this.setAttribute("uv",new Ce(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ds[i.type]().fromJSON(i)),new r(n,e.options)}},gu={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ee(s,a),new ee(o,c),new ee(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],f=e[3*i+2],v=e[3*s],m=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ee(a,1-c),new ee(l,1-u),new ee(d,1-f),new ee(v,1-g)]:[new ee(o,1-c),new ee(h,1-u),new ee(p,1-f),new ee(m,1-g)]}},Ns=class r extends Vn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Bi=class r extends et{constructor(e=[new ee(0,-.5),new ee(.5,0),new ee(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=We(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new T,d=new ee,p=new T,f=new T,v=new T,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,v.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,f.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),c.push(p.x,p.y,p.z),v.copy(f)}for(let _=0;_<=t;_++){let x=n+_*h*i,M=Math.sin(x),C=Math.cos(x);for(let R=0;R<=e.length-1;R++){u.x=e[R].x*M,u.y=e[R].y,u.z=e[R].x*C,a.push(u.x,u.y,u.z),d.x=_/t,d.y=R/(e.length-1),o.push(d.x,d.y);let N=c[3*R+0]*M,B=c[3*R+1],D=c[3*R+0]*C;l.push(N,B,D)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){let M=x+_*e.length,C=M,R=M+e.length,N=M+e.length+1,B=M+1;s.push(C,R,B),s.push(N,B,R)}this.setIndex(s),this.setAttribute("position",new Ce(a,3)),this.setAttribute("uv",new Ce(o,2)),this.setAttribute("normal",new Ce(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Fs=class r extends Vn{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},zt=class r extends et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,p=[],f=[],v=[],m=[];for(let g=0;g<h;g++){let _=g*d-a;for(let x=0;x<l;x++){let M=x*u-s;f.push(M,-_,0),v.push(0,0,1),m.push(x/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let x=_+l*g,M=_+l*(g+1),C=_+1+l*(g+1),R=_+1+l*g;p.push(x,M,R),p.push(M,C,R)}this.setIndex(p),this.setAttribute("position",new Ce(f,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Os=class r extends et{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new T,f=new ee;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){let g=s+m/n*a;p.x=u*Math.cos(g),p.y=u*Math.sin(g),c.push(p.x,p.y,p.z),l.push(0,0,1),f.x=(p.x/t+1)/2,f.y=(p.y/t+1)/2,h.push(f.x,f.y)}u+=d}for(let v=0;v<i;v++){let m=v*(n+1);for(let g=0;g<n;g++){let _=g+m,x=_,M=_+n+1,C=_+n+2,R=_+1;o.push(x,M,R),o.push(M,C,R)}}this.setIndex(o),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Bs=class r extends et{constructor(e=new Hn([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,f=d.holes;cn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,g=f.length;m<g;m++){let _=f[m];cn.isClockWise(_)===!0&&(f[m]=_.reverse())}let v=cn.triangulateShape(p,f);for(let m=0,g=f.length;m<g;m++){let _=f[m];p=p.concat(_)}for(let m=0,g=p.length;m<g;m++){let _=p[m];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],x=_[0]+u,M=_[1]+u,C=_[2]+u;n.push(x,M,C),c+=3}}this.setIndex(n),this.setAttribute("position",new Ce(i,3)),this.setAttribute("normal",new Ce(s,3)),this.setAttribute("uv",new Ce(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},zi=class r extends et{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new T,d=new T,p=[],f=[],v=[],m=[];for(let g=0;g<=n;g++){let _=[],x=g/n,M=0;g===0&&a===0?M=.5/t:g===n&&c===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){let R=C/t;u.x=-e*Math.cos(i+R*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+R*s)*Math.sin(a+x*o),f.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(R+M,1-x),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let x=h[g][_+1],M=h[g][_],C=h[g+1][_],R=h[g+1][_+1];(g!==0||a>0)&&p.push(x,M,R),(g!==n-1||c<Math.PI)&&p.push(M,C,R)}this.setIndex(p),this.setAttribute("position",new Ce(f,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},zs=class r extends Vn{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},dn=class r extends et{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new T,u=new T,d=new T;for(let p=0;p<=n;p++)for(let f=0;f<=i;f++){let v=f/i*s,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(f/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let f=1;f<=i;f++){let v=(i+1)*p+f-1,m=(i+1)*(p-1)+f-1,g=(i+1)*(p-1)+f,_=(i+1)*p+f;a.push(v,m,_),a.push(m,g,_)}this.setIndex(a),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Gs=class r extends et{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new T,d=new T,p=new T,f=new T,v=new T,m=new T,g=new T;for(let x=0;x<=n;++x){let M=x/n*s*Math.PI*2;_(M,s,a,e,p),_(M+.01,s,a,e,f),m.subVectors(f,p),g.addVectors(f,p),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize();for(let C=0;C<=i;++C){let R=C/i*Math.PI*2,N=-t*Math.cos(R),B=t*Math.sin(R);u.x=p.x+(N*g.x+B*v.x),u.y=p.y+(N*g.y+B*v.y),u.z=p.z+(N*g.z+B*v.z),c.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),l.push(d.x,d.y,d.z),h.push(x/n),h.push(C/i)}}for(let x=1;x<=n;x++)for(let M=1;M<=i;M++){let C=(i+1)*(x-1)+(M-1),R=(i+1)*x+(M-1),N=(i+1)*x+M,B=(i+1)*(x-1)+M;o.push(C,R,B),o.push(R,N,B)}function _(x,M,C,R,N){let B=Math.cos(x),D=Math.sin(x),H=C/M*x,W=Math.cos(H);N.x=R*(2+W)*.5*B,N.y=R*(2+W)*D*.5,N.z=R*Math.sin(H)*.5}this.setIndex(o),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},vt=class r extends et{constructor(e=new Tr(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new T,c=new T,l=new ee,h=new T,u=[],d=[],p=[],f=[];function v(m){h=e.getPointAt(m/t,h);let g=a.normals[m],_=a.binormals[m];for(let x=0;x<=i;x++){let M=x/i*Math.PI*2,C=Math.sin(M),R=-Math.cos(M);c.x=R*g.x+C*_.x,c.y=R*g.y+C*_.y,c.z=R*g.z+C*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)v(m);v(s===!1?t:0),(function(){for(let m=0;m<=t;m++)for(let g=0;g<=i;g++)l.x=m/t,l.y=g/i,p.push(l.x,l.y)})(),(function(){for(let m=1;m<=t;m++)for(let g=1;g<=i;g++){let _=(i+1)*(m-1)+(g-1),x=(i+1)*m+(g-1),M=(i+1)*m+g,C=(i+1)*(m-1)+g;f.push(_,x,C),f.push(x,M,C)}})()})(),this.setIndex(f),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ds[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Vs=class extends et{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new T,s=new T;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let p=d,f=d+u.count;p<f;p+=3)for(let v=0;v<3;v++){let m=o.getX(p+v),g=o.getX(p+(v+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,g),ic(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),ic(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ce(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function ic(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var im=Object.freeze({__proto__:null,BoxGeometry:Mt,CapsuleGeometry:Es,CircleGeometry:ii,ConeGeometry:As,CylinderGeometry:en,DodecahedronGeometry:Cs,EdgesGeometry:Rs,ExtrudeGeometry:si,IcosahedronGeometry:Ns,LatheGeometry:Bi,OctahedronGeometry:Fs,PlaneGeometry:zt,PolyhedronGeometry:Vn,RingGeometry:Os,ShapeGeometry:Bs,SphereGeometry:zi,TetrahedronGeometry:zs,TorusGeometry:dn,TorusKnotGeometry:Gs,TubeGeometry:vt,WireframeGeometry:Vs}),Rr=class extends An{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ue(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Wn=class extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gi=class extends Wn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ks=class extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hs=class extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ms(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function _u(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ai=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ws=class extends ai{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ao,endingEnd:ao}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case oo:s=e,o=2*t-n;break;case lo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case oo:a=e,c=2*n-t;break;case lo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(n-t)/(i-t),v=f*f,m=v*f,g=-d*m+2*d*v-d*f,_=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*f+1,x=(-1-p)*m+(1.5+p)*v+.5*f,M=p*m-p*v;for(let C=0;C!==o;++C)s[C]=g*a[h+C]+_*a[l+C]+x*a[c+C]+M*a[u+C];return s}},Xs=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},js=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ut=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ms(t,this.TimeBufferType),this.values=ms(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ms(e.times,Array),values:ms(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new js(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ws(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case hr:t=this.InterpolantFactoryMethodDiscrete;break;case vs:t=this.InterpolantFactoryMethodLinear;break;case fs:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hr;case this.InterpolantFactoryMethodLinear:return vs;case this.InterpolantFactoryMethodSmooth:return fs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&_u(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===fs,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let f=t[h+p];if(f!==t[u+p]||f!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Ut.prototype.ValueTypeName="",Ut.prototype.TimeBufferType=Float32Array,Ut.prototype.ValueBufferType=Float32Array,Ut.prototype.DefaultInterpolation=vs;var On=class extends Ut{constructor(e,t,n){super(e,t,n)}};On.prototype.ValueTypeName="bool",On.prototype.ValueBufferType=Array,On.prototype.DefaultInterpolation=hr,On.prototype.InterpolantFactoryMethodLinear=void 0,On.prototype.InterpolantFactoryMethodSmooth=void 0;var qs=class extends Ut{constructor(e,t,n,i){super(e,t,n,i)}};qs.prototype.ValueTypeName="color";var Ys=class extends Ut{constructor(e,t,n,i){super(e,t,n,i)}};Ys.prototype.ValueTypeName="number";var Zs=class extends ai{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Jt.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ir=class extends Ut{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Zs(this.times,this.values,this.getValueSize(),e)}};Ir.prototype.ValueTypeName="quaternion",Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Bn=class extends Ut{constructor(e,t,n){super(e,t,n)}};Bn.prototype.ValueTypeName="string",Bn.prototype.ValueBufferType=Array,Bn.prototype.DefaultInterpolation=hr,Bn.prototype.InterpolantFactoryMethodLinear=void 0,Bn.prototype.InterpolantFactoryMethodSmooth=void 0;var Js=class extends Ut{constructor(e,t,n,i){super(e,t,n,i)}};Js.prototype.ValueTypeName="vector";var Ks=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],f=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return f}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},sh=new Ks,$s=class{constructor(e){this.manager=e!==void 0?e:sh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};$s.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vi=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Pr=class extends Vi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},io=new Oe,rc=new T,sc=new T,Qs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=mn,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gn,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;rc.setFromMatrixPosition(e.matrixWorld),t.position.copy(rc),sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sc),t.updateMatrixWorld(),io.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(io,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ac=new Oe,ar=new T,ro=new T,fo=class extends Qs{constructor(){super(new yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ee(4,2),this._viewportCount=6,this._viewports=[new Ke(2,1,1,1),new Ke(0,1,1,1),new Ke(3,1,1,1),new Ke(1,1,1,1),new Ke(3,0,1,1),new Ke(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ar.setFromMatrixPosition(e.matrixWorld),n.position.copy(ar),ro.copy(n.position),ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ro),n.updateMatrixWorld(),i.makeTranslation(-ar.x,-ar.y,-ar.z),ac.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ac,n.coordinateSystem,n.reversedDepth)}},Lr=class extends Vi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new fo}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},oi=class extends Ui{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},go=class extends Qs{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dr=class extends Vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new go}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var rm=new Oe,sm=new Oe,am=new Oe;var ea=class extends yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var om=new T,lm=new Jt,cm=new T,hm=new T,um=new T;var dm=new T,pm=new Jt,mm=new T,fm=new T;var cl="\\[\\]\\.:\\/",vu=new RegExp("["+cl+"]","g"),so="[^"+cl+"]",xu="[^"+cl.replace("\\.","")+"]",yu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",so)+/(WCOD+)?/.source.replace("WCOD",xu)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",so)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",so)+"$"),Mu=["material","materials","bones","map"],tt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vu,"")}static parseTrackName(e){let t=yu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Mu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tt.Composite=class{constructor(r,e,t){let n=t||tt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray],tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gm=new Float32Array(1);var _m=new Oe;var vm=new ee;var xm=new T,ym=new T,Mm=new T,Sm=new T,bm=new T,Tm=new T,wm=new T;var Em=new T;var Am=new T,Cm=new Oe,Rm=new Oe;var Im=new T,Pm=new Ue,Lm=new Ue;var Dm=new T,Um=new T,Nm=new T;var Fm=new T,Om=new Ui;var Bm=new Kt;var zm=new T;function hl(r,e,t,n){let i=(function(s){switch(s){case mn:case bo:return{byteLength:1,components:1};case Xi:case To:case jn:return{byteLength:2,components:1};case ma:case fa:return{byteLength:2,components:4};case hi:case pa:case fn:return{byteLength:4,components:1};case wo:case Eo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Ao:case ga:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case tn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Rh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function bu(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],p=l[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,l[h]=p)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let p=l[u];r.bufferSubData(o,p.start*c.BYTES_PER_ELEMENT,c,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Be={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},de={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},gn={basic:{uniforms:Et([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Et([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Et([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Et([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Et([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Et([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Et([de.points,de.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Et([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Et([de.common,de.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Et([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Et([de.sprite,de.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Et([de.common,de.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Et([de.lights,de.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};gn.physical={uniforms:Et([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var Ma={r:0,b:0,g:0},pi=new Qt,Tu=new Oe;function wu(r,e,t,n,i,s,a){let o=new Ue(0),c,l,h=s===!0?0:1,u=null,d=0,p=null;function f(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function v(m,g){m.getRGB(Ma,ol(r)),n.buffers.color.setClear(Ma.r,Ma.g,Ma.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,v(o,h)},render:function(m){let g=!1,_=f(m);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(m,g){let _=f(g);_&&(_.isCubeTexture||_.mapping===Fr)?(l===void 0&&(l=new dt(new Mt(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:di(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(x,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),pi.copy(g.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),l.material.uniforms.envMap.value=_,l.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tu.makeRotationFromEuler(pi)),l.material.toneMapped=Je.getTransfer(_.colorSpace)!==Qe,u===_&&d===_.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new dt(new zt(2,2),new Ft({name:"BackgroundMaterial",uniforms:di(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Je.getTransfer(_.colorSpace)!==Qe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function Eu(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let _=[],x=[],M=[];for(let C=0;C<t;C++)_[C]=0,x[C]=0,M[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:x,attributeDivisors:M,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,x=g.length;_<x;_++)g[_]=0}function u(g){d(g,0)}function d(g,_){let x=s.newAttributes,M=s.enabledAttributes,C=s.attributeDivisors;x[g]=1,M[g]===0&&(r.enableVertexAttribArray(g),M[g]=1),C[g]!==_&&(r.vertexAttribDivisor(g,_),C[g]=_)}function p(){let g=s.newAttributes,_=s.enabledAttributes;for(let x=0,M=_.length;x<M;x++)_[x]!==g[x]&&(r.disableVertexAttribArray(x),_[x]=0)}function f(g,_,x,M,C,R,N){N===!0?r.vertexAttribIPointer(g,_,x,C,R):r.vertexAttribPointer(g,_,x,M,C,R)}function v(){m(),a=!0,s!==i&&(s=i,o(s.object))}function m(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,x,M,C){let R=!1,N=(function(B,D,H){let W=H.wireframe===!0,O=n[B.id];O===void 0&&(O={},n[B.id]=O);let G=O[D.id];G===void 0&&(G={},O[D.id]=G);let z=G[W];return z===void 0&&(z=l(r.createVertexArray()),G[W]=z),z})(M,x,_);s!==N&&(s=N,o(s.object)),R=(function(B,D,H,W){let O=s.attributes,G=D.attributes,z=0,Y=H.getAttributes();for(let J in Y)if(Y[J].location>=0){let ie=O[J],Q=G[J];if(Q===void 0&&(J==="instanceMatrix"&&B.instanceMatrix&&(Q=B.instanceMatrix),J==="instanceColor"&&B.instanceColor&&(Q=B.instanceColor)),ie===void 0||ie.attribute!==Q||Q&&ie.data!==Q.data)return!0;z++}return s.attributesNum!==z||s.index!==W})(g,M,x,C),R&&(function(B,D,H,W){let O={},G=D.attributes,z=0,Y=H.getAttributes();for(let J in Y)if(Y[J].location>=0){let ie=G[J];ie===void 0&&(J==="instanceMatrix"&&B.instanceMatrix&&(ie=B.instanceMatrix),J==="instanceColor"&&B.instanceColor&&(ie=B.instanceColor));let Q={};Q.attribute=ie,ie&&ie.data&&(Q.data=ie.data),O[J]=Q,z++}s.attributes=O,s.attributesNum=z,s.index=W})(g,M,x,C),C!==null&&e.update(C,r.ELEMENT_ARRAY_BUFFER),(R||a)&&(a=!1,(function(B,D,H,W){h();let O=W.attributes,G=H.getAttributes(),z=D.defaultAttributeValues;for(let Y in G){let J=G[Y];if(J.location>=0){let ie=O[Y];if(ie===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(ie=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(ie=B.instanceColor)),ie!==void 0){let Q=ie.normalized,ge=ie.itemSize,we=e.get(ie);if(we===void 0)continue;let ye=we.buffer,Re=we.type,oe=we.bytesPerElement,he=Re===r.INT||Re===r.UNSIGNED_INT||ie.gpuType===pa;if(ie.isInterleavedBufferAttribute){let le=ie.data,Ae=le.stride,Se=ie.offset;if(le.isInstancedInterleavedBuffer){for(let b=0;b<J.locationSize;b++)d(J.location+b,le.meshPerAttribute);B.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let b=0;b<J.locationSize;b++)u(J.location+b);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let b=0;b<J.locationSize;b++)f(J.location+b,ge/J.locationSize,Re,Q,Ae*oe,(Se+ge/J.locationSize*b)*oe,he)}else{if(ie.isInstancedBufferAttribute){for(let le=0;le<J.locationSize;le++)d(J.location+le,ie.meshPerAttribute);B.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let le=0;le<J.locationSize;le++)u(J.location+le);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let le=0;le<J.locationSize;le++)f(J.location+le,ge/J.locationSize,Re,Q,ge*oe,ge/J.locationSize*le*oe,he)}}else if(z!==void 0){let Q=z[Y];if(Q!==void 0)switch(Q.length){case 2:r.vertexAttrib2fv(J.location,Q);break;case 3:r.vertexAttrib3fv(J.location,Q);break;case 4:r.vertexAttrib4fv(J.location,Q);break;default:r.vertexAttrib1fv(J.location,Q)}}}}p()})(g,_,x,M),C!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(C).buffer))},reset:v,resetDefaultState:m,dispose:function(){v();for(let g in n){let _=n[g];for(let x in _){let M=_[x];for(let C in M)c(M[C].object),delete M[C];delete _[x]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let x in _){let M=_[x];for(let C in M)c(M[C].object),delete M[C];delete _[x]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let x=n[_];if(x[g.id]===void 0)continue;let M=x[g.id];for(let C in M)c(M[C].object),delete M[C];delete x[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function Au(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Cu(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===tn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==mn&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==fn&&!p)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Ru(r){let e=this,t=null,n=0,i=!1,s=!1,a=new ln,o=new Fe,c={value:null,needsUpdate:!1};function l(h,u,d,p){let f=h!==null?h.length:0,v=null;if(f!==0){if(v=c.value,p!==!0||v===null){let m=d+4*f,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<m)&&(v=new Float32Array(m));for(let _=0,x=d;_!==f;++_,x+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,x),v[x+3]=a.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,v}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,f=h.clipIntersection,v=h.clipShadows,m=r.get(h);if(!i||p===null||p.length===0||s&&!v)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,x=m.clippingState||null;c.value=x,x=l(p,u,_,d);for(let M=0;M!==_;++M)x[M]=t[M];m.clippingState=x,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=g}}}function Iu(r){let e=new WeakMap;function t(i,s){return s===ha?i.mapping=Wi:s===ua&&(i.mapping=li),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===ha||s===ua){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new Ts(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var ah=[.125,.215,.35,.446,.526,.582],Gr=20,ul=new oi,oh=new Ue,dl=null,pl=0,ml=0,fl=!1,fi=(1+Math.sqrt(5))/2,Yi=1/fi,lh=[new T(-fi,Yi,0),new T(fi,Yi,0),new T(-Yi,0,fi),new T(Yi,0,fi),new T(0,fi,-Yi),new T(0,fi,Yi),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Pu=new T,Ji=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Pu}=s;dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(dl,pl,ml),this._renderer.xr.enabled=fl,e.scissorTest=!1,Sa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:jn,format:tn,colorSpace:ei,depthBuffer:!1},i=ch(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ch(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+ah.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);c.push(p);let f=1/p;d>a-4?f=ah[d-a+4-1]:d===0&&(f=0),l.push(f);let v=1/(p-2),m=-v,g=1+v,_=[m,m,g,m,g,g,m,m,g,g,m,g],x=6,M=6,C=3,R=2,N=1,B=new Float32Array(C*M*x),D=new Float32Array(R*M*x),H=new Float32Array(N*M*x);for(let O=0;O<x;O++){let G=O%3*2/3-1,z=O>2?0:-1,Y=[G,z,0,G+2/3,z,0,G+2/3,z+1,0,G,z,0,G+2/3,z+1,0,G,z+1,0];B.set(Y,C*M*O),D.set(_,R*M*O);let J=[O,O,O,O,O,O];H.set(J,N*M*O)}let W=new et;W.setAttribute("position",new Nt(B,C)),W.setAttribute("uv",new Nt(D,R)),W.setAttribute("faceIndex",new Nt(H,N)),o.push(W),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(Gr),h=new T(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:Gr,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:wl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,ul)}_sceneToCubeUV(e,t,n,i,s){let a=new yt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(oh),l.toneMapping=Cn,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new zn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),p=new dt(new Mt,d),f=!1,v=e.background;v?v.isColor&&(d.color.copy(v),e.background=null,f=!0):(d.color.copy(oh),f=!0);for(let m=0;m<6;m++){let g=m%3;g===0?(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[m],s.y,s.z)):g===1?(a.up.set(0,0,o[m]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[m],s.z)):(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[m]));let _=this._cubeSize;Sa(i,g*_,m>2?_:0,_,_),l.setRenderTarget(i),f&&l.render(p,a),l.render(e,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Wi||e.mapping===li;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=uh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Sa(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,ul)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=lh[(i-s-1)%lh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new dt(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,f=s/p,v=isFinite(s)?1+Math.floor(3*f):Gr;v>Gr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let m=[],g=0;for(let M=0;M<Gr;++M){let C=M/f,R=Math.exp(-C*C/2);m.push(R),M===0?g+=R:M<v&&(g+=2*R)}for(let M=0;M<m.length;M++)m[M]=m[M]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=p,u.mipInt.value=_-n;let x=this._sizeLods[i];Sa(t,3*x*(i>_-4?i-_+4:0),4*(this._cubeSize-x),3*x,2*x),c.setRenderTarget(t),c.render(h,ul)}};function ch(r,e,t){let n=new Ht(r,e,t);return n.texture.mapping=Fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sa(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function hh(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function uh(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function wl(){return`

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
	`}function Lu(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===ha||s===ua,o=s===Wi||s===li;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Ji(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let f=0;f<p;f++)u[f]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new Ji(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Du(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Li("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Uu(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let v=h.array;d=h.version;for(let m=0,g=v.length;m<g;m+=3){let _=v[m+0],x=v[m+1],M=v[m+2];l.push(_,x,x,M,M,_)}}else{if(u===void 0)return;{let v=u.array;d=u.version;for(let m=0,g=v.length/3-1;m<g;m+=3){let _=m+0,x=m+1,M=m+2;l.push(_,x,x,M,M,_)}}}let p=new(al(l)?_r:gr)(l,1);p.version=d;let f=s.get(c);f&&e.remove(f),s.set(c,p)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Nu(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let p=0;p<l;p++)d+=c[p]*h[p];t.update(d,n,1)}}}function Fu(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Ou(r,e,t){let n=new WeakMap,i=new Ke;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let B=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",B)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),f===!0&&(_=3);let x=a.attributes.position.count*_,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let C=new Float32Array(x*M*4*h),R=new mr(C,x,M,h);R.type=fn,R.needsUpdate=!0;let N=4*_;for(let D=0;D<h;D++){let H=v[D],W=m[D],O=g[D],G=x*M*4*D;for(let z=0;z<H.count;z++){let Y=z*N;d===!0&&(i.fromBufferAttribute(H,z),C[G+Y+0]=i.x,C[G+Y+1]=i.y,C[G+Y+2]=i.z,C[G+Y+3]=0),p===!0&&(i.fromBufferAttribute(W,z),C[G+Y+4]=i.x,C[G+Y+5]=i.y,C[G+Y+6]=i.z,C[G+Y+7]=0),f===!0&&(i.fromBufferAttribute(O,z),C[G+Y+8]=i.x,C[G+Y+9]=i.y,C[G+Y+10]=i.z,C[G+Y+11]=O.itemSize===4?i.w:1)}}u={count:h,texture:R,size:new ee(x,M)},n.set(a,u),a.addEventListener("dispose",B)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let f=0;f<c.length;f++)d+=c[f];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Bu(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var Ih=new It,dh=new xr(1,1),Ph=new mr,Lh=new Ss,Dh=new vr,ph=[],mh=[],fh=new Float32Array(16),gh=new Float32Array(9),_h=new Float32Array(4);function Ki(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=ph[i];if(s===void 0&&(s=new Float32Array(i),ph[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function pt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function mt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function wa(r,e){let t=mh[e];t===void 0&&(t=new Int32Array(e),mh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function zu(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Gu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2fv(this.addr,e),mt(t,e)}}function Vu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;r.uniform3fv(this.addr,e),mt(t,e)}}function ku(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4fv(this.addr,e),mt(t,e)}}function Hu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;_h.set(n),r.uniformMatrix2fv(this.addr,!1,_h),mt(t,n)}}function Wu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;gh.set(n),r.uniformMatrix3fv(this.addr,!1,gh),mt(t,n)}}function Xu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;fh.set(n),r.uniformMatrix4fv(this.addr,!1,fh),mt(t,n)}}function ju(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function qu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2iv(this.addr,e),mt(t,e)}}function Yu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3iv(this.addr,e),mt(t,e)}}function Zu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4iv(this.addr,e),mt(t,e)}}function Ju(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ku(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2uiv(this.addr,e),mt(t,e)}}function $u(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3uiv(this.addr,e),mt(t,e)}}function Qu(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4uiv(this.addr,e),mt(t,e)}}function ed(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(dh.compareFunction=rl,s=dh):s=Ih,t.setTexture2D(e||s,i)}function td(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Lh,i)}function nd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Dh,i)}function id(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ph,i)}function rd(r,e){r.uniform1fv(this.addr,e)}function sd(r,e){let t=Ki(e,this.size,2);r.uniform2fv(this.addr,t)}function ad(r,e){let t=Ki(e,this.size,3);r.uniform3fv(this.addr,t)}function od(r,e){let t=Ki(e,this.size,4);r.uniform4fv(this.addr,t)}function ld(r,e){let t=Ki(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function cd(r,e){let t=Ki(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function hd(r,e){let t=Ki(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ud(r,e){r.uniform1iv(this.addr,e)}function dd(r,e){r.uniform2iv(this.addr,e)}function pd(r,e){r.uniform3iv(this.addr,e)}function md(r,e){r.uniform4iv(this.addr,e)}function fd(r,e){r.uniform1uiv(this.addr,e)}function gd(r,e){r.uniform2uiv(this.addr,e)}function _d(r,e){r.uniform3uiv(this.addr,e)}function vd(r,e){r.uniform4uiv(this.addr,e)}function xd(r,e,t){let n=this.cache,i=e.length,s=wa(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Ih,s[a])}function yd(r,e,t){let n=this.cache,i=e.length,s=wa(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Lh,s[a])}function Md(r,e,t){let n=this.cache,i=e.length,s=wa(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Dh,s[a])}function Sd(r,e,t){let n=this.cache,i=e.length,s=wa(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ph,s[a])}var _l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return zu;case 35664:return Gu;case 35665:return Vu;case 35666:return ku;case 35674:return Hu;case 35675:return Wu;case 35676:return Xu;case 5124:case 35670:return ju;case 35667:case 35671:return qu;case 35668:case 35672:return Yu;case 35669:case 35673:return Zu;case 5125:return Ju;case 36294:return Ku;case 36295:return $u;case 36296:return Qu;case 35678:case 36198:case 36298:case 36306:case 35682:return ed;case 35679:case 36299:case 36307:return td;case 35680:case 36300:case 36308:case 36293:return nd;case 36289:case 36303:case 36311:case 36292:return id}})(t.type)}},vl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return rd;case 35664:return sd;case 35665:return ad;case 35666:return od;case 35674:return ld;case 35675:return cd;case 35676:return hd;case 5124:case 35670:return ud;case 35667:case 35671:return dd;case 35668:case 35672:return pd;case 35669:case 35673:return md;case 5125:return fd;case 36294:return gd;case 36295:return _d;case 36296:return vd;case 35678:case 36198:case 36298:case 36306:case 35682:return xd;case 35679:case 36299:case 36307:return yd;case 35680:case 36300:case 36308:case 36293:return Md;case 36289:case 36303:case 36311:case 36292:return Sd}})(t.type)}},xl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function vh(r,e){r.seq.push(e),r.map[e.id]=e}function bd(r,e,t){let n=r.name,i=n.length;for(gl.lastIndex=0;;){let s=gl.exec(n),a=gl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){vh(t,l===void 0?new _l(o,r,e):new vl(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new xl(o),vh(t,h)),t=h}}}var Zi=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);bd(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function xh(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Td=0,yh=new Fe;function Mh(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let p=u;p<d;p++){let f=p+1;h.push(`${f===c?">":" "} ${f}: ${l[p]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function wd(r,e){let t=(function(n){Je._getMatrix(yh,Je.workingColorSpace,n);let i=`mat3( ${yh.elements.map(s=>s.toFixed(4))} )`;switch(Je.getTransfer(n)){case ur:return[i,"LinearTransferOETF"];case Qe:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ed(r,e){let t;switch(e){case Lc:t="Linear";break;case Dc:t="Reinhard";break;case Uc:t="Cineon";break;case ca:t="ACESFilmic";break;case Fc:t="AgX";break;case Oc:t="Neutral";break;case Nc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ba=new T;function Ad(){return Je.getLuminanceCoefficients(ba),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ba.x.toFixed(4)}, ${ba.y.toFixed(4)}, ${ba.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vr(r){return r!==""}function Sh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cd=/^[ \t]*#include +<([\w\d./]+)>/gm;function yl(r){return r.replace(Cd,Id)}var Rd=new Map;function Id(r,e){let t=Be[e];if(t===void 0){let n=Rd.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return yl(t)}var Pd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Th(r){return r.replace(Pd,Ld)}function Ld(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function wh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Dd(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(W){let O="SHADOWMAP_TYPE_BASIC";return W.shadowMapType===vo?O="SHADOWMAP_TYPE_PCF":W.shadowMapType===ta?O="SHADOWMAP_TYPE_PCF_SOFT":W.shadowMapType===pn&&(O="SHADOWMAP_TYPE_VSM"),O})(t),l=(function(W){let O="ENVMAP_TYPE_CUBE";if(W.envMap)switch(W.envMapMode){case Wi:case li:O="ENVMAP_TYPE_CUBE";break;case Fr:O="ENVMAP_TYPE_CUBE_UV"}return O})(t),h=(function(W){let O="ENVMAP_MODE_REFLECTION";return W.envMap&&W.envMapMode===li&&(O="ENVMAP_MODE_REFRACTION"),O})(t),u=(function(W){let O="ENVMAP_BLENDING_NONE";if(W.envMap)switch(W.combine){case Rc:O="ENVMAP_BLENDING_MULTIPLY";break;case Ic:O="ENVMAP_BLENDING_MIX";break;case Pc:O="ENVMAP_BLENDING_ADD"}return O})(t),d=(function(W){let O=W.envMapCubeUVHeight;if(O===null)return null;let G=Math.log2(O)-2,z=1/O;return{texelWidth:1/(3*Math.max(Math.pow(2,G),112)),texelHeight:z,maxMip:G}})(t),p=(function(W){return[W.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",W.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)})(t),f=(function(W){let O=[];for(let G in W){let z=W[G];z!==!1&&O.push("#define "+G+" "+z)}return O.join(`
`)})(s),v=i.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Vr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Vr).join(`
`),g.length>0&&(g+=`
`)):(m=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),g=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Cn?Ed("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,wd("linearToOutputTexel",t.outputColorSpace),Ad(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=yl(a),a=Sh(a,t),a=bh(a,t),o=yl(o),o=Sh(o,t),o=bh(o,t),a=Th(a),o=Th(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=_+m+a,M=_+g+o,C=xh(i,i.VERTEX_SHADER,x),R=xh(i,i.FRAGMENT_SHADER,M);function N(W){if(r.debug.checkShaderErrors){let O=i.getProgramInfoLog(v)||"",G=i.getShaderInfoLog(C)||"",z=i.getShaderInfoLog(R)||"",Y=O.trim(),J=G.trim(),ie=z.trim(),Q=!0,ge=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,C,R);else{let we=Mh(i,C,"vertex"),ye=Mh(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+Y+`
`+we+`
`+ye)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):J!==""&&ie!==""||(ge=!1);ge&&(W.diagnostics={runnable:Q,programLog:Y,vertexShader:{log:J,prefix:m},fragmentShader:{log:ie,prefix:g}})}i.deleteShader(C),i.deleteShader(R),B=new Zi(i,v),D=(function(O,G){let z={},Y=O.getProgramParameter(G,O.ACTIVE_ATTRIBUTES);for(let J=0;J<Y;J++){let ie=O.getActiveAttrib(G,J),Q=ie.name,ge=1;ie.type===O.FLOAT_MAT2&&(ge=2),ie.type===O.FLOAT_MAT3&&(ge=3),ie.type===O.FLOAT_MAT4&&(ge=4),z[Q]={type:ie.type,location:O.getAttribLocation(G,Q),locationSize:ge}}return z})(i,v)}let B,D;i.attachShader(v,C),i.attachShader(v,R),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return B===void 0&&N(this),B},this.getAttributes=function(){return D===void 0&&N(this),D};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=i.getProgramParameter(v,37297)),H},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Td++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=R,this}var Ud=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sl(e),t.set(e,n)),n}},Sl=class{constructor(e){this.id=Ud++,this.code=e,this.usedTimes=0}};function Nd(r,e,t,n,i,s,a){let o=new fr,c=new Ml,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,x,M){let C=x.fog,R=M.geometry,N=m.isMeshStandardMaterial?x.environment:null,B=(m.isMeshStandardMaterial?t:e).get(m.envMap||N),D=B&&B.mapping===Fr?B.image.height:null,H=f[m.type];m.precision!==null&&(p=i.getMaxPrecision(m.precision),p!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",p,"instead."));let W=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,O=W!==void 0?W.length:0,G,z,Y,J,ie=0;if(R.morphAttributes.position!==void 0&&(ie=1),R.morphAttributes.normal!==void 0&&(ie=2),R.morphAttributes.color!==void 0&&(ie=3),H){let ue=gn[H];G=ue.vertexShader,z=ue.fragmentShader}else G=m.vertexShader,z=m.fragmentShader,c.update(m),Y=c.getVertexShaderID(m),J=c.getFragmentShaderID(m);let Q=r.getRenderTarget(),ge=r.state.buffers.depth.getReversed(),we=M.isInstancedMesh===!0,ye=M.isBatchedMesh===!0,Re=!!m.map,oe=!!m.matcap,he=!!B,le=!!m.aoMap,Ae=!!m.lightMap,Se=!!m.bumpMap,b=!!m.normalMap,S=!!m.displacementMap,F=!!m.emissiveMap,L=!!m.metalnessMap,y=!!m.roughnessMap,A=m.anisotropy>0,U=m.clearcoat>0,P=m.dispersion>0,q=m.iridescence>0,V=m.sheen>0,k=m.transmission>0,se=A&&!!m.anisotropyMap,pe=U&&!!m.clearcoatMap,re=U&&!!m.clearcoatNormalMap,_e=U&&!!m.clearcoatRoughnessMap,Me=q&&!!m.iridescenceMap,Ee=q&&!!m.iridescenceThicknessMap,ze=V&&!!m.sheenColorMap,Xe=V&&!!m.sheenRoughnessMap,je=!!m.specularMap,me=!!m.specularColorMap,be=!!m.specularIntensityMap,Ge=k&&!!m.transmissionMap,lt=k&&!!m.thicknessMap,xe=!!m.gradientMap,Ze=!!m.alphaMap,I=m.alphaTest>0,j=!!m.alphaHash,ne=!!m.extensions,E=Cn;m.toneMapped&&(Q!==null&&Q.isXRRenderTarget!==!0||(E=r.toneMapping));let $={shaderID:H,shaderType:m.type,shaderName:m.name,vertexShader:G,fragmentShader:z,defines:m.defines,customVertexShaderID:Y,customFragmentShaderID:J,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:p,batching:ye,batchingColor:ye&&M._colorsTexture!==null,instancing:we,instancingColor:we&&M.instanceColor!==null,instancingMorph:we&&M.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Q===null?r.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ei,alphaToCoverage:!!m.alphaToCoverage,map:Re,matcap:oe,envMap:he,envMapMode:he&&B.mapping,envMapCubeUVHeight:D,aoMap:le,lightMap:Ae,bumpMap:Se,normalMap:b,displacementMap:d&&S,emissiveMap:F,normalMapObjectSpace:b&&m.normalMapType===Wc,normalMapTangentSpace:b&&m.normalMapType===Hc,metalnessMap:L,roughnessMap:y,anisotropy:A,anisotropyMap:se,clearcoat:U,clearcoatMap:pe,clearcoatNormalMap:re,clearcoatRoughnessMap:_e,dispersion:P,iridescence:q,iridescenceMap:Me,iridescenceThicknessMap:Ee,sheen:V,sheenColorMap:ze,sheenRoughnessMap:Xe,specularMap:je,specularColorMap:me,specularIntensityMap:be,transmission:k,transmissionMap:Ge,thicknessMap:lt,gradientMap:xe,opaque:m.transparent===!1&&m.blending===Ur&&m.alphaToCoverage===!1,alphaMap:Ze,alphaTest:I,alphaHash:j,combine:m.combine,mapUv:Re&&v(m.map.channel),aoMapUv:le&&v(m.aoMap.channel),lightMapUv:Ae&&v(m.lightMap.channel),bumpMapUv:Se&&v(m.bumpMap.channel),normalMapUv:b&&v(m.normalMap.channel),displacementMapUv:S&&v(m.displacementMap.channel),emissiveMapUv:F&&v(m.emissiveMap.channel),metalnessMapUv:L&&v(m.metalnessMap.channel),roughnessMapUv:y&&v(m.roughnessMap.channel),anisotropyMapUv:se&&v(m.anisotropyMap.channel),clearcoatMapUv:pe&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&v(m.sheenRoughnessMap.channel),specularMapUv:je&&v(m.specularMap.channel),specularColorMapUv:me&&v(m.specularColorMap.channel),specularIntensityMapUv:be&&v(m.specularIntensityMap.channel),transmissionMapUv:Ge&&v(m.transmissionMap.channel),thicknessMapUv:lt&&v(m.thicknessMap.channel),alphaMapUv:Ze&&v(m.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(b||A),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!R.attributes.uv&&(Re||Ze),fog:!!C,useFog:m.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ge,skinning:M.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:ie,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:E,decodeVideoTexture:Re&&m.map.isVideoTexture===!0&&Je.getTransfer(m.map.colorSpace)===Qe,decodeVideoTextureEmissive:F&&m.emissiveMap.isVideoTexture===!0&&Je.getTransfer(m.emissiveMap.colorSpace)===Qe,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Pt,flipSided:m.side===Gt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ne&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&m.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return $.vertexUv1s=l.has(1),$.vertexUv2s=l.has(2),$.vertexUv3s=l.has(3),l.clear(),$},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&((function(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapCubeUVHeight),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.morphAttributeCount),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)})(g,m),(function(_,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,m),g.push(r.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=f[m.type],_;if(g){let x=gn[g];_=th.clone(x.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let x=0,M=h.length;x<M;x++){let C=h[x];if(C.cacheKey===g){_=C,++_.usedTimes;break}}return _===void 0&&(_=new Dd(r,g,m,s),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes===0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){c.remove(m)},programs:h,dispose:function(){c.dispose()}}}function Fd(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Od(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Eh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ah(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Od),n.length>1&&n.sort(o||Eh),i.length>1&&i.sort(o||Eh)}}}function Bd(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Ah,r.set(e,[i])):t>=n.length?(i=new Ah,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function zd(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Ue};break;case"SpotLight":t={position:new T,direction:new T,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new T,halfWidth:new T,halfHeight:new T}}return r[e.id]=t,t}}}var Gd=0;function Vd(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function kd(r){let e=new zd,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new T);let i=new T,s=new Oe,a=new Oe;return{setup:function(o){let c=0,l=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let u=0,d=0,p=0,f=0,v=0,m=0,g=0,_=0,x=0,M=0,C=0;o.sort(Vd);for(let N=0,B=o.length;N<B;N++){let D=o[N],H=D.color,W=D.intensity,O=D.distance,G=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)c+=H.r*W,l+=H.g*W,h+=H.b*W;else if(D.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(D.sh.coefficients[z],W);C++}else if(D.isDirectionalLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Y=D.shadow,J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.directionalShadow[u]=J,n.directionalShadowMap[u]=G,n.directionalShadowMatrix[u]=D.shadow.matrix,m++}n.directional[u]=z,u++}else if(D.isSpotLight){let z=e.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(H).multiplyScalar(W),z.distance=O,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,n.spot[p]=z;let Y=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,Y.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[p]=Y.matrix,D.castShadow){let J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,n.spotShadow[p]=J,n.spotShadowMap[p]=G,_++}p++}else if(D.isRectAreaLight){let z=e.get(D);z.color.copy(H).multiplyScalar(W),z.halfWidth.set(.5*D.width,0,0),z.halfHeight.set(0,.5*D.height,0),n.rectArea[f]=z,f++}else if(D.isPointLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){let Y=D.shadow,J=t.get(D);J.shadowIntensity=Y.intensity,J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,J.shadowCameraNear=Y.camera.near,J.shadowCameraFar=Y.camera.far,n.pointShadow[d]=J,n.pointShadowMap[d]=G,n.pointShadowMatrix[d]=D.shadow.matrix,g++}n.point[d]=z,d++}else if(D.isHemisphereLight){let z=e.get(D);z.skyColor.copy(D.color).multiplyScalar(W),z.groundColor.copy(D.groundColor).multiplyScalar(W),n.hemi[v]=z,v++}}f>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let R=n.hash;R.directionalLength===u&&R.pointLength===d&&R.spotLength===p&&R.rectAreaLength===f&&R.hemiLength===v&&R.numDirectionalShadows===m&&R.numPointShadows===g&&R.numSpotShadows===_&&R.numSpotMaps===x&&R.numLightProbes===C||(n.directional.length=u,n.spot.length=p,n.rectArea.length=f,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+x-M,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,R.directionalLength=u,R.pointLength=d,R.spotLength=p,R.rectAreaLength=f,R.hemiLength=v,R.numDirectionalShadows=m,R.numPointShadows=g,R.numSpotShadows=_,R.numSpotMaps=x,R.numLightProbes=C,n.version=Gd++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,p=0,f=c.matrixWorldInverse;for(let v=0,m=o.length;v<m;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[l];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(f),l++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(f),u++}else if(g.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),a.identity(),s.copy(g.matrixWorld),s.premultiply(f),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),h++}else if(g.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(f),p++}}},state:n}}function Ch(r){let e=new kd(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Hd(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Ch(r),e.set(t,[s])):n>=i.length?(s=new Ch(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Wd(r,e,t){let n=new Gn,i=new ee,s=new ee,a=new Ke,o=new ks({depthPacking:kc}),c=new Hs,l={},h=t.maxTextureSize,u={[ki]:Gt,[Gt]:ki,[Pt]:Pt},d=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new et;f.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new dt(f,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vo;let g=this.type;function _(R,N){let B=e.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ht(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(N,null,B,d,v,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(N,null,B,p,v,null)}function x(R,N,B,D){let H=null,W=B.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(W!==void 0)H=W;else if(H=B.isPointLight===!0?c:o,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let O=H.uuid,G=N.uuid,z=l[O];z===void 0&&(z={},l[O]=z);let Y=z[G];Y===void 0&&(Y=H.clone(),z[G]=Y,N.addEventListener("dispose",C)),H=Y}return H.visible=N.visible,H.wireframe=N.wireframe,H.side=D===pn?N.shadowSide!==null?N.shadowSide:N.side:N.shadowSide!==null?N.shadowSide:u[N.side],H.alphaMap=N.alphaMap,H.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,H.map=N.map,H.clipShadows=N.clipShadows,H.clippingPlanes=N.clippingPlanes,H.clipIntersection=N.clipIntersection,H.displacementMap=N.displacementMap,H.displacementScale=N.displacementScale,H.displacementBias=N.displacementBias,H.wireframeLinewidth=N.wireframeLinewidth,H.linewidth=N.linewidth,B.isPointLight===!0&&H.isMeshDistanceMaterial===!0&&(r.properties.get(H).light=B),H}function M(R,N,B,D,H){if(R.visible===!1)return;if(R.layers.test(N.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&H===pn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,R.matrixWorld);let O=e.update(R),G=R.material;if(Array.isArray(G)){let z=O.groups;for(let Y=0,J=z.length;Y<J;Y++){let ie=z[Y],Q=G[ie.materialIndex];if(Q&&Q.visible){let ge=x(R,Q,D,H);R.onBeforeShadow(r,R,N,B,O,ge,ie),r.renderBufferDirect(B,null,O,ge,R,ie),R.onAfterShadow(r,R,N,B,O,ge,ie)}}}else if(G.visible){let z=x(R,G,D,H);R.onBeforeShadow(r,R,N,B,O,z,null),r.renderBufferDirect(B,null,O,z,R,null),R.onAfterShadow(r,R,N,B,O,z,null)}}let W=R.children;for(let O=0,G=W.length;O<G;O++)M(W[O],N,B,D,H)}function C(R){R.target.removeEventListener("dispose",C);for(let N in l){let B=l[N],D=R.target.uuid;D in B&&(B[D].dispose(),delete B[D])}}this.render=function(R,N,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let D=r.getRenderTarget(),H=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Xn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let G=g!==pn&&this.type===pn,z=g===pn&&this.type!==pn;for(let Y=0,J=R.length;Y<J;Y++){let ie=R[Y],Q=ie.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;i.copy(Q.mapSize);let ge=Q.getFrameExtents();if(i.multiply(ge),s.copy(Q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ge.x),i.x=s.x*ge.x,Q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ge.y),i.y=s.y*ge.y,Q.mapSize.y=s.y)),Q.map===null||G===!0||z===!0){let ye=this.type!==pn?{minFilter:hn,magFilter:hn}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Ht(i.x,i.y,ye),Q.map.texture.name=ie.name+".shadowMap",Q.camera.updateProjectionMatrix()}r.setRenderTarget(Q.map),r.clear();let we=Q.getViewportCount();for(let ye=0;ye<we;ye++){let Re=Q.getViewport(ye);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),O.viewport(a),Q.updateMatrices(ie,ye),n=Q.getFrustum(),M(N,B,Q.camera,ie,this.type)}Q.isPointLightShadow!==!0&&this.type===pn&&_(Q,B),Q.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(D,H,W)}}var Xd={[na]:ia,[ra]:oa,[sa]:la,[Nr]:aa,[ia]:na,[oa]:ra,[la]:sa,[aa]:Nr};function jd(r,e){let t=new function(){let y=!1,A=new Ke,U=null,P=new Ke(0,0,0,0);return{setMask:function(q){U===q||y||(r.colorMask(q,q,q,q),U=q)},setLocked:function(q){y=q},setClear:function(q,V,k,se,pe){pe===!0&&(q*=se,V*=se,k*=se),A.set(q,V,k,se),P.equals(A)===!1&&(r.clearColor(q,V,k,se),P.copy(A))},reset:function(){y=!1,U=null,P.set(-1,0,0,0)}}},n=new function(){let y=!1,A=!1,U=null,P=null,q=null;return{setReversed:function(V){if(A!==V){let k=e.get("EXT_clip_control");V?k.clipControlEXT(k.LOWER_LEFT_EXT,k.ZERO_TO_ONE_EXT):k.clipControlEXT(k.LOWER_LEFT_EXT,k.NEGATIVE_ONE_TO_ONE_EXT),A=V;let se=q;q=null,this.setClear(se)}},getReversed:function(){return A},setTest:function(V){V?he(r.DEPTH_TEST):le(r.DEPTH_TEST)},setMask:function(V){U===V||y||(r.depthMask(V),U=V)},setFunc:function(V){if(A&&(V=Xd[V]),P!==V){switch(V){case na:r.depthFunc(r.NEVER);break;case ia:r.depthFunc(r.ALWAYS);break;case ra:r.depthFunc(r.LESS);break;case Nr:r.depthFunc(r.LEQUAL);break;case sa:r.depthFunc(r.EQUAL);break;case aa:r.depthFunc(r.GEQUAL);break;case oa:r.depthFunc(r.GREATER);break;case la:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}P=V}},setLocked:function(V){y=V},setClear:function(V){q!==V&&(A&&(V=1-V),r.clearDepth(V),q=V)},reset:function(){y=!1,U=null,P=null,q=null,A=!1}}},i=new function(){let y=!1,A=null,U=null,P=null,q=null,V=null,k=null,se=null,pe=null;return{setTest:function(re){y||(re?he(r.STENCIL_TEST):le(r.STENCIL_TEST))},setMask:function(re){A===re||y||(r.stencilMask(re),A=re)},setFunc:function(re,_e,Me){U===re&&P===_e&&q===Me||(r.stencilFunc(re,_e,Me),U=re,P=_e,q=Me)},setOp:function(re,_e,Me){V===re&&k===_e&&se===Me||(r.stencilOp(re,_e,Me),V=re,k=_e,se=Me)},setLocked:function(re){y=re},setClear:function(re){pe!==re&&(r.clearStencil(re),pe=re)},reset:function(){y=!1,A=null,U=null,P=null,q=null,V=null,k=null,se=null,pe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,f=null,v=null,m=null,g=null,_=null,x=null,M=new Ue(0,0,0),C=0,R=!1,N=null,B=null,D=null,H=null,W=null,O=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,z=0,Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=z>=1):Y.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=z>=2);let J=null,ie={},Q=r.getParameter(r.SCISSOR_BOX),ge=r.getParameter(r.VIEWPORT),we=new Ke().fromArray(Q),ye=new Ke().fromArray(ge);function Re(y,A,U,P){let q=new Uint8Array(4),V=r.createTexture();r.bindTexture(y,V),r.texParameteri(y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let k=0;k<U;k++)y===r.TEXTURE_3D||y===r.TEXTURE_2D_ARRAY?r.texImage3D(A,0,r.RGBA,1,1,P,0,r.RGBA,r.UNSIGNED_BYTE,q):r.texImage2D(A+k,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,q);return V}let oe={};function he(y){o[y]!==!0&&(r.enable(y),o[y]=!0)}function le(y){o[y]!==!1&&(r.disable(y),o[y]=!1)}oe[r.TEXTURE_2D]=Re(r.TEXTURE_2D,r.TEXTURE_2D,1),oe[r.TEXTURE_CUBE_MAP]=Re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[r.TEXTURE_2D_ARRAY]=Re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),oe[r.TEXTURE_3D]=Re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),he(r.DEPTH_TEST),n.setFunc(Nr),S(!1),F(_o),he(r.CULL_FACE),b(Xn);let Ae={[Hi]:r.FUNC_ADD,[hc]:r.FUNC_SUBTRACT,[uc]:r.FUNC_REVERSE_SUBTRACT};Ae[dc]=r.MIN,Ae[pc]=r.MAX;let Se={[mc]:r.ZERO,[fc]:r.ONE,[gc]:r.SRC_COLOR,[vc]:r.SRC_ALPHA,[Tc]:r.SRC_ALPHA_SATURATE,[Sc]:r.DST_COLOR,[yc]:r.DST_ALPHA,[_c]:r.ONE_MINUS_SRC_COLOR,[xc]:r.ONE_MINUS_SRC_ALPHA,[bc]:r.ONE_MINUS_DST_COLOR,[Mc]:r.ONE_MINUS_DST_ALPHA,[wc]:r.CONSTANT_COLOR,[Ec]:r.ONE_MINUS_CONSTANT_COLOR,[Ac]:r.CONSTANT_ALPHA,[Cc]:r.ONE_MINUS_CONSTANT_ALPHA};function b(y,A,U,P,q,V,k,se,pe,re){if(y!==Xn){if(d===!1&&(he(r.BLEND),d=!0),y===cc)q=q||A,V=V||U,k=k||P,A===f&&q===g||(r.blendEquationSeparate(Ae[A],Ae[q]),f=A,g=q),U===v&&P===m&&V===_&&k===x||(r.blendFuncSeparate(Se[U],Se[P],Se[V],Se[k]),v=U,m=P,_=V,x=k),se.equals(M)!==!1&&pe===C||(r.blendColor(se.r,se.g,se.b,pe),M.copy(se),C=pe),p=y,R=!1;else if(y!==p||re!==R){if(f===Hi&&g===Hi||(r.blendEquation(r.FUNC_ADD),f=Hi,g=Hi),re)switch(y){case Ur:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xo:r.blendFunc(r.ONE,r.ONE);break;case yo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Mo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",y)}else switch(y){case Ur:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case yo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",y)}v=null,m=null,_=null,x=null,M.set(0,0,0),C=0,p=y,R=re}}else d===!0&&(le(r.BLEND),d=!1)}function S(y){N!==y&&(y?r.frontFace(r.CW):r.frontFace(r.CCW),N=y)}function F(y){y!==oc?(he(r.CULL_FACE),y!==B&&(y===_o?r.cullFace(r.BACK):y===lc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):le(r.CULL_FACE),B=y}function L(y,A,U){y?(he(r.POLYGON_OFFSET_FILL),H===A&&W===U||(r.polygonOffset(A,U),H=A,W=U)):le(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:he,disable:le,bindFramebuffer:function(y,A){return c[y]!==A&&(r.bindFramebuffer(y,A),c[y]=A,y===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=A),y===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=A),!0)},drawBuffers:function(y,A){let U=h,P=!1;if(y){U=l.get(A),U===void 0&&(U=[],l.set(A,U));let q=y.textures;if(U.length!==q.length||U[0]!==r.COLOR_ATTACHMENT0){for(let V=0,k=q.length;V<k;V++)U[V]=r.COLOR_ATTACHMENT0+V;U.length=q.length,P=!0}}else U[0]!==r.BACK&&(U[0]=r.BACK,P=!0);P&&r.drawBuffers(U)},useProgram:function(y){return u!==y&&(r.useProgram(y),u=y,!0)},setBlending:b,setMaterial:function(y,A){y.side===Pt?le(r.CULL_FACE):he(r.CULL_FACE);let U=y.side===Gt;A&&(U=!U),S(U),y.blending===Ur&&y.transparent===!1?b(Xn):b(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let P=y.stencilWrite;i.setTest(P),P&&(i.setMask(y.stencilWriteMask),i.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),i.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),L(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?he(r.SAMPLE_ALPHA_TO_COVERAGE):le(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:S,setCullFace:F,setLineWidth:function(y){y!==D&&(G&&r.lineWidth(y),D=y)},setPolygonOffset:L,setScissorTest:function(y){y?he(r.SCISSOR_TEST):le(r.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=r.TEXTURE0+O-1),J!==y&&(r.activeTexture(y),J=y)},bindTexture:function(y,A,U){U===void 0&&(U=J===null?r.TEXTURE0+O-1:J);let P=ie[U];P===void 0&&(P={type:void 0,texture:void 0},ie[U]=P),P.type===y&&P.texture===A||(J!==U&&(r.activeTexture(U),J=U),r.bindTexture(y,A||oe[y]),P.type=y,P.texture=A)},unbindTexture:function(){let y=ie[J];y!==void 0&&y.type!==void 0&&(r.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},updateUBOMapping:function(y,A){let U=a.get(A);U===void 0&&(U=new WeakMap,a.set(A,U));let P=U.get(y);P===void 0&&(P=r.getUniformBlockIndex(A,y.name),U.set(y,P))},uniformBlockBinding:function(y,A){let U=a.get(A).get(y);s.get(A)!==U&&(r.uniformBlockBinding(A,U,y.__bindingPointIndex),s.set(A,U))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(y){console.error("THREE.WebGLState:",y)}},scissor:function(y){we.equals(y)===!1&&(r.scissor(y.x,y.y,y.z,y.w),we.copy(y))},viewport:function(y){ye.equals(y)===!1&&(r.viewport(y.x,y.y,y.z,y.w),ye.copy(y))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},J=null,ie={},c={},l=new WeakMap,h=[],u=null,d=!1,p=null,f=null,v=null,m=null,g=null,_=null,x=null,M=new Ue(0,0,0),C=0,R=!1,N=null,B=null,D=null,H=null,W=null,we.set(0,0,r.canvas.width,r.canvas.height),ye.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function qd(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ee,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(b,S){return p?new OffscreenCanvas(b,S):pr("canvas")}function v(b,S,F){let L=1,y=Se(b);if((y.width>F||y.height>F)&&(L=F/Math.max(y.width,y.height)),L<1){if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let A=Math.floor(L*y.width),U=Math.floor(L*y.height);u===void 0&&(u=f(A,U));let P=S?f(A,U):u;return P.width=A,P.height=U,P.getContext("2d").drawImage(b,0,0,A,U),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+A+"x"+U+")."),P}return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),b}return b}function m(b){return b.generateMipmaps}function g(b){r.generateMipmap(b)}function _(b){return b.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?r.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(b,S,F,L,y=!1){if(b!==null){if(r[b]!==void 0)return r[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let A=S;if(S===r.RED&&(F===r.FLOAT&&(A=r.R32F),F===r.HALF_FLOAT&&(A=r.R16F),F===r.UNSIGNED_BYTE&&(A=r.R8)),S===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.R8UI),F===r.UNSIGNED_SHORT&&(A=r.R16UI),F===r.UNSIGNED_INT&&(A=r.R32UI),F===r.BYTE&&(A=r.R8I),F===r.SHORT&&(A=r.R16I),F===r.INT&&(A=r.R32I)),S===r.RG&&(F===r.FLOAT&&(A=r.RG32F),F===r.HALF_FLOAT&&(A=r.RG16F),F===r.UNSIGNED_BYTE&&(A=r.RG8)),S===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RG8UI),F===r.UNSIGNED_SHORT&&(A=r.RG16UI),F===r.UNSIGNED_INT&&(A=r.RG32UI),F===r.BYTE&&(A=r.RG8I),F===r.SHORT&&(A=r.RG16I),F===r.INT&&(A=r.RG32I)),S===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RGB8UI),F===r.UNSIGNED_SHORT&&(A=r.RGB16UI),F===r.UNSIGNED_INT&&(A=r.RGB32UI),F===r.BYTE&&(A=r.RGB8I),F===r.SHORT&&(A=r.RGB16I),F===r.INT&&(A=r.RGB32I)),S===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(A=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(A=r.RGBA16UI),F===r.UNSIGNED_INT&&(A=r.RGBA32UI),F===r.BYTE&&(A=r.RGBA8I),F===r.SHORT&&(A=r.RGBA16I),F===r.INT&&(A=r.RGBA32I)),S===r.RGB&&(F===r.UNSIGNED_INT_5_9_9_9_REV&&(A=r.RGB9_E5),F===r.UNSIGNED_INT_10F_11F_11F_REV&&(A=r.R11F_G11F_B10F)),S===r.RGBA){let U=y?ur:Je.getTransfer(L);F===r.FLOAT&&(A=r.RGBA32F),F===r.HALF_FLOAT&&(A=r.RGBA16F),F===r.UNSIGNED_BYTE&&(A=U===Qe?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(A=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(A=r.RGB5_A1)}return A!==r.R16F&&A!==r.R32F&&A!==r.RG16F&&A!==r.RG32F&&A!==r.RGBA16F&&A!==r.RGBA32F||e.get("EXT_color_buffer_float"),A}function M(b,S){let F;return b?S===null||S===hi||S===ji?F=r.DEPTH24_STENCIL8:S===fn?F=r.DEPTH32F_STENCIL8:S===Xi&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===hi||S===ji?F=r.DEPTH_COMPONENT24:S===fn?F=r.DEPTH_COMPONENT32F:S===Xi&&(F=r.DEPTH_COMPONENT16),F}function C(b,S){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==hn&&b.minFilter!==un?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function R(b){let S=b.target;S.removeEventListener("dispose",R),(function(F){let L=n.get(F);if(L.__webglInit===void 0)return;let y=F.source,A=d.get(y);if(A){let U=A[L.__cacheKey];U.usedTimes--,U.usedTimes===0&&B(F),Object.keys(A).length===0&&d.delete(y)}n.remove(F)})(S),S.isVideoTexture&&h.delete(S)}function N(b){let S=b.target;S.removeEventListener("dispose",N),(function(F){let L=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(L.__webglFramebuffer[A]))for(let U=0;U<L.__webglFramebuffer[A].length;U++)r.deleteFramebuffer(L.__webglFramebuffer[A][U]);else r.deleteFramebuffer(L.__webglFramebuffer[A]);L.__webglDepthbuffer&&r.deleteRenderbuffer(L.__webglDepthbuffer[A])}else{if(Array.isArray(L.__webglFramebuffer))for(let A=0;A<L.__webglFramebuffer.length;A++)r.deleteFramebuffer(L.__webglFramebuffer[A]);else r.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&r.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&r.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let A=0;A<L.__webglColorRenderbuffer.length;A++)L.__webglColorRenderbuffer[A]&&r.deleteRenderbuffer(L.__webglColorRenderbuffer[A]);L.__webglDepthRenderbuffer&&r.deleteRenderbuffer(L.__webglDepthRenderbuffer)}let y=F.textures;for(let A=0,U=y.length;A<U;A++){let P=n.get(y[A]);P.__webglTexture&&(r.deleteTexture(P.__webglTexture),a.memory.textures--),n.remove(y[A])}n.remove(F)})(S)}function B(b){let S=n.get(b);r.deleteTexture(S.__webglTexture);let F=b.source;delete d.get(F)[S.__cacheKey],a.memory.textures--}let D=0;function H(b,S){let F=n.get(b);if(b.isVideoTexture&&(function(L){let y=a.render.frame;h.get(L)!==y&&(h.set(L,y),L.update())})(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){let L=b.image;if(L===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(L.complete!==!1)return void ie(F,b,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+S)}let W={[Qn]:r.REPEAT,[Pi]:r.CLAMP_TO_EDGE,[_s]:r.MIRRORED_REPEAT},O={[hn]:r.NEAREST,[Bc]:r.NEAREST_MIPMAP_NEAREST,[Or]:r.NEAREST_MIPMAP_LINEAR,[un]:r.LINEAR,[da]:r.LINEAR_MIPMAP_NEAREST,[ci]:r.LINEAR_MIPMAP_LINEAR},G={[Xc]:r.NEVER,[Kc]:r.ALWAYS,[jc]:r.LESS,[rl]:r.LEQUAL,[qc]:r.EQUAL,[Jc]:r.GEQUAL,[Yc]:r.GREATER,[Zc]:r.NOTEQUAL};function z(b,S){if(S.type!==fn||e.has("OES_texture_float_linear")!==!1||S.magFilter!==un&&S.magFilter!==da&&S.magFilter!==Or&&S.magFilter!==ci&&S.minFilter!==un&&S.minFilter!==da&&S.minFilter!==Or&&S.minFilter!==ci||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(b,r.TEXTURE_WRAP_S,W[S.wrapS]),r.texParameteri(b,r.TEXTURE_WRAP_T,W[S.wrapT]),b!==r.TEXTURE_3D&&b!==r.TEXTURE_2D_ARRAY||r.texParameteri(b,r.TEXTURE_WRAP_R,W[S.wrapR]),r.texParameteri(b,r.TEXTURE_MAG_FILTER,O[S.magFilter]),r.texParameteri(b,r.TEXTURE_MIN_FILTER,O[S.minFilter]),S.compareFunction&&(r.texParameteri(b,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(b,r.TEXTURE_COMPARE_FUNC,G[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===hn||S.minFilter!==Or&&S.minFilter!==ci||S.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");r.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Y(b,S){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",R));let L=S.source,y=d.get(L);y===void 0&&(y={},d.set(L,y));let A=(function(U){let P=[];return P.push(U.wrapS),P.push(U.wrapT),P.push(U.wrapR||0),P.push(U.magFilter),P.push(U.minFilter),P.push(U.anisotropy),P.push(U.internalFormat),P.push(U.format),P.push(U.type),P.push(U.generateMipmaps),P.push(U.premultiplyAlpha),P.push(U.flipY),P.push(U.unpackAlignment),P.push(U.colorSpace),P.join()})(S);if(A!==b.__cacheKey){y[A]===void 0&&(y[A]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,F=!0),y[A].usedTimes++;let U=y[b.__cacheKey];U!==void 0&&(y[b.__cacheKey].usedTimes--,U.usedTimes===0&&B(S)),b.__cacheKey=A,b.__webglTexture=y[A].texture}return F}function J(b,S,F){return Math.floor(Math.floor(b/F)/S)}function ie(b,S,F){let L=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(L=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(L=r.TEXTURE_3D);let y=Y(b,S),A=S.source;t.bindTexture(L,b.__webglTexture,r.TEXTURE0+F);let U=n.get(A);if(A.version!==U.__version||y===!0){t.activeTexture(r.TEXTURE0+F);let P=Je.getPrimaries(Je.workingColorSpace),q=S.colorSpace===ui?null:Je.getPrimaries(S.colorSpace),V=S.colorSpace===ui||P===q?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);let k=v(S.image,!1,i.maxTextureSize);k=Ae(S,k);let se=s.convert(S.format,S.colorSpace),pe=s.convert(S.type),re,_e=x(S.internalFormat,se,pe,S.colorSpace,S.isVideoTexture);z(L,S);let Me=S.mipmaps,Ee=S.isVideoTexture!==!0,ze=U.__version===void 0||y===!0,Xe=A.dataReady,je=C(S,k);if(S.isDepthTexture)_e=M(S.format===zr,S.type),ze&&(Ee?t.texStorage2D(r.TEXTURE_2D,1,_e,k.width,k.height):t.texImage2D(r.TEXTURE_2D,0,_e,k.width,k.height,0,se,pe,null));else if(S.isDataTexture)if(Me.length>0){Ee&&ze&&t.texStorage2D(r.TEXTURE_2D,je,_e,Me[0].width,Me[0].height);for(let me=0,be=Me.length;me<be;me++)re=Me[me],Ee?Xe&&t.texSubImage2D(r.TEXTURE_2D,me,0,0,re.width,re.height,se,pe,re.data):t.texImage2D(r.TEXTURE_2D,me,_e,re.width,re.height,0,se,pe,re.data);S.generateMipmaps=!1}else Ee?(ze&&t.texStorage2D(r.TEXTURE_2D,je,_e,k.width,k.height),Xe&&(function(me,be,Ge,lt){let xe=me.updateRanges;if(xe.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,be.width,be.height,Ge,lt,be.data);else{xe.sort((E,$)=>E.start-$.start);let Ze=0;for(let E=1;E<xe.length;E++){let $=xe[Ze],ue=xe[E],ce=$.start+$.count,Ve=J(ue.start,be.width,4),Ie=J($.start,be.width,4);ue.start<=ce+1&&Ve===Ie&&J(ue.start+ue.count-1,be.width,4)===Ve?$.count=Math.max($.count,ue.start+ue.count-$.start):(++Ze,xe[Ze]=ue)}xe.length=Ze+1;let I=r.getParameter(r.UNPACK_ROW_LENGTH),j=r.getParameter(r.UNPACK_SKIP_PIXELS),ne=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,be.width);for(let E=0,$=xe.length;E<$;E++){let ue=xe[E],ce=Math.floor(ue.start/4),Ve=Math.ceil(ue.count/4),Ie=ce%be.width,$e=Math.floor(ce/be.width),ft=Ve;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ie),r.pixelStorei(r.UNPACK_SKIP_ROWS,$e),t.texSubImage2D(r.TEXTURE_2D,0,Ie,$e,ft,1,Ge,lt,be.data)}me.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,I),r.pixelStorei(r.UNPACK_SKIP_PIXELS,j),r.pixelStorei(r.UNPACK_SKIP_ROWS,ne)}})(S,k,se,pe)):t.texImage2D(r.TEXTURE_2D,0,_e,k.width,k.height,0,se,pe,k.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ee&&ze&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,_e,Me[0].width,Me[0].height,k.depth);for(let me=0,be=Me.length;me<be;me++)if(re=Me[me],S.format!==tn)if(se!==null)if(Ee){if(Xe)if(S.layerUpdates.size>0){let Ge=hl(re.width,re.height,S.format,S.type);for(let lt of S.layerUpdates){let xe=re.data.subarray(lt*Ge/re.data.BYTES_PER_ELEMENT,(lt+1)*Ge/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,lt,re.width,re.height,1,se,xe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,re.width,re.height,k.depth,se,re.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,me,_e,re.width,re.height,k.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?Xe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,re.width,re.height,k.depth,se,pe,re.data):t.texImage3D(r.TEXTURE_2D_ARRAY,me,_e,re.width,re.height,k.depth,0,se,pe,re.data)}else{Ee&&ze&&t.texStorage2D(r.TEXTURE_2D,je,_e,Me[0].width,Me[0].height);for(let me=0,be=Me.length;me<be;me++)re=Me[me],S.format!==tn?se!==null?Ee?Xe&&t.compressedTexSubImage2D(r.TEXTURE_2D,me,0,0,re.width,re.height,se,re.data):t.compressedTexImage2D(r.TEXTURE_2D,me,_e,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?Xe&&t.texSubImage2D(r.TEXTURE_2D,me,0,0,re.width,re.height,se,pe,re.data):t.texImage2D(r.TEXTURE_2D,me,_e,re.width,re.height,0,se,pe,re.data)}else if(S.isDataArrayTexture)if(Ee){if(ze&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,_e,k.width,k.height,k.depth),Xe)if(S.layerUpdates.size>0){let me=hl(k.width,k.height,S.format,S.type);for(let be of S.layerUpdates){let Ge=k.data.subarray(be*me/k.data.BYTES_PER_ELEMENT,(be+1)*me/k.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,be,k.width,k.height,1,se,pe,Ge)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,k.width,k.height,k.depth,se,pe,k.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,_e,k.width,k.height,k.depth,0,se,pe,k.data);else if(S.isData3DTexture)Ee?(ze&&t.texStorage3D(r.TEXTURE_3D,je,_e,k.width,k.height,k.depth),Xe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,k.width,k.height,k.depth,se,pe,k.data)):t.texImage3D(r.TEXTURE_3D,0,_e,k.width,k.height,k.depth,0,se,pe,k.data);else if(S.isFramebufferTexture){if(ze)if(Ee)t.texStorage2D(r.TEXTURE_2D,je,_e,k.width,k.height);else{let me=k.width,be=k.height;for(let Ge=0;Ge<je;Ge++)t.texImage2D(r.TEXTURE_2D,Ge,_e,me,be,0,se,pe,null),me>>=1,be>>=1}}else if(Me.length>0){if(Ee&&ze){let me=Se(Me[0]);t.texStorage2D(r.TEXTURE_2D,je,_e,me.width,me.height)}for(let me=0,be=Me.length;me<be;me++)re=Me[me],Ee?Xe&&t.texSubImage2D(r.TEXTURE_2D,me,0,0,se,pe,re):t.texImage2D(r.TEXTURE_2D,me,_e,se,pe,re);S.generateMipmaps=!1}else if(Ee){if(ze){let me=Se(k);t.texStorage2D(r.TEXTURE_2D,je,_e,me.width,me.height)}Xe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,se,pe,k)}else t.texImage2D(r.TEXTURE_2D,0,_e,se,pe,k);m(S)&&g(L),U.__version=A.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function Q(b,S,F,L,y,A){let U=s.convert(F.format,F.colorSpace),P=s.convert(F.type),q=x(F.internalFormat,U,P,F.colorSpace),V=n.get(S),k=n.get(F);if(k.__renderTarget=S,!V.__hasExternalTextures){let se=Math.max(1,S.width>>A),pe=Math.max(1,S.height>>A);y===r.TEXTURE_3D||y===r.TEXTURE_2D_ARRAY?t.texImage3D(y,A,q,se,pe,S.depth,0,U,P,null):t.texImage2D(y,A,q,se,pe,0,U,P,null)}t.bindFramebuffer(r.FRAMEBUFFER,b),le(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,L,y,k.__webglTexture,0,he(S)):(y===r.TEXTURE_2D||y>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,L,y,k.__webglTexture,A),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ge(b,S,F){if(r.bindRenderbuffer(r.RENDERBUFFER,b),S.depthBuffer){let L=S.depthTexture,y=L&&L.isDepthTexture?L.type:null,A=M(S.stencilBuffer,y),U=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=he(S);le(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,P,A,S.width,S.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,P,A,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,A,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,U,r.RENDERBUFFER,b)}else{let L=S.textures;for(let y=0;y<L.length;y++){let A=L[y],U=s.convert(A.format,A.colorSpace),P=s.convert(A.type),q=x(A.internalFormat,U,P,A.colorSpace),V=he(S);F&&le(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,V,q,S.width,S.height):le(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,V,q,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,q,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,b),!S.depthTexture||!S.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let F=n.get(S.depthTexture);F.__renderTarget=S,F.__webglTexture&&S.depthTexture.image.width===S.width&&S.depthTexture.image.height===S.height||(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);let L=F.__webglTexture,y=he(S);if(S.depthTexture.format===Br)le(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,L,0,y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,L,0);else{if(S.depthTexture.format!==zr)throw new Error("Unknown depthTexture format");le(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,L,0,y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,L,0)}}function ye(b){let S=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==b.depthTexture){let L=b.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),L){let y=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,L.removeEventListener("dispose",y)};L.addEventListener("dispose",y),S.__depthDisposeCallback=y}S.__boundDepthTexture=L}if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let L=b.texture.mipmaps;L&&L.length>0?we(S.__webglFramebuffer[0],b):we(S.__webglFramebuffer,b)}else if(F){S.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[L]),S.__webglDepthbuffer[L]===void 0)S.__webglDepthbuffer[L]=r.createRenderbuffer(),ge(S.__webglDepthbuffer[L],b,!1);else{let y=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer[L];r.bindRenderbuffer(r.RENDERBUFFER,A),r.framebufferRenderbuffer(r.FRAMEBUFFER,y,r.RENDERBUFFER,A)}}else{let L=b.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),ge(S.__webglDepthbuffer,b,!1);else{let y=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,A=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,A),r.framebufferRenderbuffer(r.FRAMEBUFFER,y,r.RENDERBUFFER,A)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let Re=[],oe=[];function he(b){return Math.min(i.maxSamples,b.samples)}function le(b){let S=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ae(b,S){let F=b.colorSpace,L=b.format,y=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==ei&&F!==ui&&(Je.getTransfer(F)===Qe?L===tn&&y===mn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=function(){let b=D;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),D+=1,b},this.resetTextureUnits=function(){D=0},this.setTexture2D=H,this.setTexture2DArray=function(b,S){let F=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version?ie(F,b,S):t.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+S)},this.setTexture3D=function(b,S){let F=n.get(b);b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version?ie(F,b,S):t.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+S)},this.setTextureCube=function(b,S){let F=n.get(b);b.version>0&&F.__version!==b.version?(function(L,y,A){if(y.image.length!==6)return;let U=Y(L,y),P=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+A);let q=n.get(P);if(P.version!==q.__version||U===!0){t.activeTexture(r.TEXTURE0+A);let V=Je.getPrimaries(Je.workingColorSpace),k=y.colorSpace===ui?null:Je.getPrimaries(y.colorSpace),se=y.colorSpace===ui||V===k?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let pe=y.isCompressedTexture||y.image[0].isCompressedTexture,re=y.image[0]&&y.image[0].isDataTexture,_e=[];for(let xe=0;xe<6;xe++)_e[xe]=pe||re?re?y.image[xe].image:y.image[xe]:v(y.image[xe],!0,i.maxCubemapSize),_e[xe]=Ae(y,_e[xe]);let Me=_e[0],Ee=s.convert(y.format,y.colorSpace),ze=s.convert(y.type),Xe=x(y.internalFormat,Ee,ze,y.colorSpace),je=y.isVideoTexture!==!0,me=q.__version===void 0||U===!0,be=P.dataReady,Ge,lt=C(y,Me);if(z(r.TEXTURE_CUBE_MAP,y),pe){je&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Xe,Me.width,Me.height);for(let xe=0;xe<6;xe++){Ge=_e[xe].mipmaps;for(let Ze=0;Ze<Ge.length;Ze++){let I=Ge[Ze];y.format!==tn?Ee!==null?je?be&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze,0,0,I.width,I.height,Ee,I.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze,Xe,I.width,I.height,0,I.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?be&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze,0,0,I.width,I.height,Ee,ze,I.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze,Xe,I.width,I.height,0,Ee,ze,I.data)}}}else{if(Ge=y.mipmaps,je&&me){Ge.length>0&&lt++;let xe=Se(_e[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Xe,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(re){je?be&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,_e[xe].width,_e[xe].height,Ee,ze,_e[xe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Xe,_e[xe].width,_e[xe].height,0,Ee,ze,_e[xe].data);for(let Ze=0;Ze<Ge.length;Ze++){let I=Ge[Ze].image[xe].image;je?be&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze+1,0,0,I.width,I.height,Ee,ze,I.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze+1,Xe,I.width,I.height,0,Ee,ze,I.data)}}else{je?be&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ee,ze,_e[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Xe,Ee,ze,_e[xe]);for(let Ze=0;Ze<Ge.length;Ze++){let I=Ge[Ze];je?be&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze+1,0,0,Ee,ze,I.image[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ze+1,Xe,Ee,ze,I.image[xe])}}}m(y)&&g(r.TEXTURE_CUBE_MAP),q.__version=P.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version})(F,b,S):t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+S)},this.rebindTextures=function(b,S,F){let L=n.get(b);S!==void 0&&Q(L.__webglFramebuffer,b,b.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&ye(b)},this.setupRenderTarget=function(b){let S=b.texture,F=n.get(b),L=n.get(S);b.addEventListener("dispose",N);let y=b.textures,A=b.isWebGLCubeRenderTarget===!0,U=y.length>1;if(U||(L.__webglTexture===void 0&&(L.__webglTexture=r.createTexture()),L.__version=S.version,a.memory.textures++),A){F.__webglFramebuffer=[];for(let P=0;P<6;P++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[P]=[];for(let q=0;q<S.mipmaps.length;q++)F.__webglFramebuffer[P][q]=r.createFramebuffer()}else F.__webglFramebuffer[P]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let P=0;P<S.mipmaps.length;P++)F.__webglFramebuffer[P]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(U)for(let P=0,q=y.length;P<q;P++){let V=n.get(y[P]);V.__webglTexture===void 0&&(V.__webglTexture=r.createTexture(),a.memory.textures++)}if(b.samples>0&&le(b)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let P=0;P<y.length;P++){let q=y[P];F.__webglColorRenderbuffer[P]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[P]);let V=s.convert(q.format,q.colorSpace),k=s.convert(q.type),se=x(q.internalFormat,V,k,q.colorSpace,b.isXRRenderTarget===!0),pe=he(b);r.renderbufferStorageMultisample(r.RENDERBUFFER,pe,se,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+P,r.RENDERBUFFER,F.__webglColorRenderbuffer[P])}r.bindRenderbuffer(r.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),ge(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(A){t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture),z(r.TEXTURE_CUBE_MAP,S);for(let P=0;P<6;P++)if(S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)Q(F.__webglFramebuffer[P][q],b,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+P,q);else Q(F.__webglFramebuffer[P],b,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+P,0);m(S)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(U){for(let P=0,q=y.length;P<q;P++){let V=y[P],k=n.get(V),se=r.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,k.__webglTexture),z(se,V),Q(F.__webglFramebuffer,b,V,r.COLOR_ATTACHMENT0+P,se,0),m(V)&&g(se)}t.unbindTexture()}else{let P=r.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(P=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(P,L.__webglTexture),z(P,S),S.mipmaps&&S.mipmaps.length>0)for(let q=0;q<S.mipmaps.length;q++)Q(F.__webglFramebuffer[q],b,S,r.COLOR_ATTACHMENT0,P,q);else Q(F.__webglFramebuffer,b,S,r.COLOR_ATTACHMENT0,P,0);m(S)&&g(P),t.unbindTexture()}b.depthBuffer&&ye(b)},this.updateRenderTargetMipmap=function(b){let S=b.textures;for(let F=0,L=S.length;F<L;F++){let y=S[F];if(m(y)){let A=_(b),U=n.get(y).__webglTexture;t.bindTexture(A,U),g(A),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(b){if(b.samples>0){if(le(b)===!1){let S=b.textures,F=b.width,L=b.height,y=r.COLOR_BUFFER_BIT,A=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=n.get(b),P=S.length>1;if(P)for(let V=0;V<S.length;V++)t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,U.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,U.__webglMultisampledFramebuffer);let q=b.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglFramebuffer);for(let V=0;V<S.length;V++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(y|=r.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(y|=r.STENCIL_BUFFER_BIT)),P){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,U.__webglColorRenderbuffer[V]);let k=n.get(S[V]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,k,0)}r.blitFramebuffer(0,0,F,L,0,0,F,L,y,r.NEAREST),c===!0&&(Re.length=0,oe.length=0,Re.push(r.COLOR_ATTACHMENT0+V),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Re.push(A),oe.push(A),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,oe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Re))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),P)for(let V=0;V<S.length;V++){t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.RENDERBUFFER,U.__webglColorRenderbuffer[V]);let k=n.get(S[V]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,U.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+V,r.TEXTURE_2D,k,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,U.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){let S=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=le}function Yd(r,e){return{convert:function(t,n=ui){let i,s=Je.getTransfer(n);if(t===mn)return r.UNSIGNED_BYTE;if(t===ma)return r.UNSIGNED_SHORT_4_4_4_4;if(t===fa)return r.UNSIGNED_SHORT_5_5_5_1;if(t===wo)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Eo)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===bo)return r.BYTE;if(t===To)return r.SHORT;if(t===Xi)return r.UNSIGNED_SHORT;if(t===pa)return r.INT;if(t===hi)return r.UNSIGNED_INT;if(t===fn)return r.FLOAT;if(t===jn)return r.HALF_FLOAT;if(t===zc)return r.ALPHA;if(t===Gc)return r.RGB;if(t===tn)return r.RGBA;if(t===Br)return r.DEPTH_COMPONENT;if(t===zr)return r.DEPTH_STENCIL;if(t===Ao)return r.RED;if(t===ga)return r.RED_INTEGER;if(t===Vc)return r.RG;if(t===Co)return r.RG_INTEGER;if(t===Ro)return r.RGBA_INTEGER;if(t===_a||t===va||t===xa||t===ya)if(s===Qe){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===_a)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===va)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===xa)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===ya)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===_a)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===va)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===xa)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===ya)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Io||t===Po||t===Lo||t===Do){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Io)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Po)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Lo)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Do)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Uo||t===No||t===Fo){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Uo||t===No)return s===Qe?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Fo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Oo||t===Bo||t===zo||t===Go||t===Vo||t===ko||t===Ho||t===Wo||t===Xo||t===jo||t===qo||t===Yo||t===Zo||t===Jo){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Oo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Bo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===zo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Go)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Vo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===ko)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ho)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Wo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Xo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===jo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===qo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Yo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Zo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Jo)return s===Qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ko||t===$o||t===Qo){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Ko)return s===Qe?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===$o)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Qo)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===el||t===tl||t===nl||t===il){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===el)return i.COMPRESSED_RED_RGTC1_EXT;if(t===tl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===nl)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===il)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===ji?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new yr(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ft({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new zt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tl=class extends En{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,f=null,v=typeof XRWebGLBinding<"u",m=new bl,g={},_=t.getContextAttributes(),x=null,M=null,C=[],R=[],N=new ee,B=null,D=new yt;D.viewport=new Ke;let H=new yt;H.viewport=new Ke;let W=[D,H],O=new ea,G=null,z=null;function Y(oe){let he=R.indexOf(oe.inputSource);if(he===-1)return;let le=C[he];le!==void 0&&(le.update(oe.inputSource,oe.frame,l||a),le.dispatchEvent({type:oe.type,data:oe.inputSource}))}function J(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",ie);for(let oe=0;oe<C.length;oe++){let he=R[oe];he!==null&&(R[oe]=null,C[oe].disconnect(he))}G=null,z=null,m.reset();for(let oe in g)delete g[oe];e.setRenderTarget(x),p=null,d=null,u=null,i=null,M=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}function ie(oe){for(let he=0;he<oe.removed.length;he++){let le=oe.removed[he],Ae=R.indexOf(le);Ae>=0&&(R[Ae]=null,C[Ae].disconnect(le))}for(let he=0;he<oe.added.length;he++){let le=oe.added[he],Ae=R.indexOf(le);if(Ae===-1){for(let b=0;b<C.length;b++){if(b>=R.length){R.push(le),Ae=b;break}if(R[b]===null){R[b]=le,Ae=b;break}}if(Ae===-1)break}let Se=C[Ae];Se&&Se.connect(le)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let he=C[oe];return he===void 0&&(he=new Ni,C[oe]=he),he.getTargetRaySpace()},this.getControllerGrip=function(oe){let he=C[oe];return he===void 0&&(he=new Ni,C[oe]=he),he.getGripSpace()},this.getHand=function(oe){let he=C[oe];return he===void 0&&(he=new Ni,C[oe]=he),he.getHandSpace()},this.setFramebufferScaleFactor=function(oe){s=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",J),i.addEventListener("inputsourceschange",ie),_.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(N),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,le=null,Ae=null;_.depth&&(Ae=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=_.stencil?zr:Br,le=_.stencil?ji:hi);let Se={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Se),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Ht(d.textureWidth,d.textureHeight,{format:tn,type:mn,depthTexture:new xr(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let he={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,he),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Ht(p.framebufferWidth,p.framebufferHeight,{format:tn,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Re.setContext(i),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let Q=new T,ge=new T;function we(oe,he){he===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(he.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;let he=oe.near,le=oe.far;m.texture!==null&&(m.depthNear>0&&(he=m.depthNear),m.depthFar>0&&(le=m.depthFar)),O.near=H.near=D.near=he,O.far=H.far=D.far=le,G===O.near&&z===O.far||(i.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,z=O.far),O.layers.mask=6|oe.layers.mask,D.layers.mask=3&O.layers.mask,H.layers.mask=5&O.layers.mask;let Ae=oe.parent,Se=O.cameras;we(O,Ae);for(let b=0;b<Se.length;b++)we(Se[b],Ae);Se.length===2?(function(b,S,F){Q.setFromMatrixPosition(S.matrixWorld),ge.setFromMatrixPosition(F.matrixWorld);let L=Q.distanceTo(ge),y=S.projectionMatrix.elements,A=F.projectionMatrix.elements,U=y[14]/(y[10]-1),P=y[14]/(y[10]+1),q=(y[9]+1)/y[5],V=(y[9]-1)/y[5],k=(y[8]-1)/y[0],se=(A[8]+1)/A[0],pe=U*k,re=U*se,_e=L/(-k+se),Me=_e*-k;if(S.matrixWorld.decompose(b.position,b.quaternion,b.scale),b.translateX(Me),b.translateZ(_e),b.matrixWorld.compose(b.position,b.quaternion,b.scale),b.matrixWorldInverse.copy(b.matrixWorld).invert(),y[10]===-1)b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse);else{let Ee=U+_e,ze=P+_e,Xe=pe-Me,je=re+(L-Me),me=q*P/ze*Ee,be=V*P/ze*Ee;b.projectionMatrix.makePerspective(Xe,je,me,be,Ee,ze),b.projectionMatrixInverse.copy(b.projectionMatrix).invert()}})(O,D,H):O.projectionMatrix.copy(D.projectionMatrix),(function(b,S,F){F===null?b.matrix.copy(S.matrixWorld):(b.matrix.copy(F.matrixWorld),b.matrix.invert(),b.matrix.multiply(S.matrixWorld)),b.matrix.decompose(b.position,b.quaternion,b.scale),b.updateMatrixWorld(!0),b.projectionMatrix.copy(S.projectionMatrix),b.projectionMatrixInverse.copy(S.projectionMatrixInverse),b.isPerspectiveCamera&&(b.fov=2*xs*Math.atan(1/b.projectionMatrix.elements[5]),b.zoom=1)})(oe,O,Ae)},this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||p!==null)return c},this.setFoveation=function(oe){c=oe,d!==null&&(d.fixedFoveation=oe),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=oe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(oe){return g[oe]};let ye=null,Re=new Rh;Re.setAnimationLoop(function(oe,he){if(h=he.getViewerPose(l||a),f=he,h!==null){let le=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Ae=!1;le.length!==O.cameras.length&&(O.cameras.length=0,Ae=!0);for(let b=0;b<le.length;b++){let S=le[b],F=null;if(p!==null)F=p.getViewport(S);else{let y=u.getViewSubImage(d,S);F=y.viewport,b===0&&(e.setRenderTargetTextures(M,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(M))}let L=W[b];L===void 0&&(L=new yt,L.layers.enable(b),L.viewport=new Ke,W[b]=L),L.matrix.fromArray(S.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(S.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(F.x,F.y,F.width,F.height),b===0&&(O.matrix.copy(L.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ae===!0&&O.cameras.push(L)}let Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let b=u.getDepthInformation(le[0]);b&&b.isValid&&b.texture&&m.init(b,i.renderState)}if(Se&&Se.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let b=0;b<le.length;b++){let S=le[b].camera;if(S){let F=g[S];F||(F=new yr,g[S]=F);let L=u.getCameraImage(S);F.sourceTexture=L}}}}for(let le=0;le<C.length;le++){let Ae=R[le],Se=C[le];Ae!==null&&Se!==void 0&&Se.update(Ae,he,l||a)}ye&&ye(oe,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),f=null}),this.setAnimationLoop=function(oe){ye=oe},this.dispose=function(){}}},mi=new Qt,Zd=new Oe;function Jd(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Gt&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Gt&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,mi.copy(c),mi.x*=-1,mi.y*=-1,mi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),i.envMapRotation.value.setFromMatrix4(Zd.makeRotationFromEuler(mi)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,ol(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Gt&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Kd(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,p,f){let v=u.value,m=d+"_"+p;if(f[m]===void 0)return f[m]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=f[m];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return f[m]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&((function(m){let g=m.uniforms,_=0,x=16;for(let C=0,R=g.length;C<R;C++){let N=Array.isArray(g[C])?g[C]:[g[C]];for(let B=0,D=N.length;B<D;B++){let H=N[B],W=Array.isArray(H.value)?H.value:[H.value];for(let O=0,G=W.length;O<G;O++){let z=l(W[O]),Y=_%x,J=Y%z.boundary,ie=Y+J;_+=J,ie!==0&&x-ie<z.storage&&(_+=x-ie),H.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=z.storage}}}let M=_%x;M>0&&(_+=x-M),m.__size=_,m.__cache={}})(u),p=(function(m){let g=(function(){for(let C=0;C<o;C++)if(a.indexOf(C)===-1)return a.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;let _=r.createBuffer(),x=m.__size,M=m.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,x,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,_),_})(u),i[u.id]=p,u.addEventListener("dispose",h));let f=d.program;n.updateUBOMapping(u,f);let v=e.render.frame;s[u.id]!==v&&((function(m){let g=i[m.id],_=m.uniforms,x=m.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let M=0,C=_.length;M<C;M++){let R=Array.isArray(_[M])?_[M]:[_[M]];for(let N=0,B=R.length;N<B;N++){let D=R[N];if(c(D,M,N,x)===!0){let H=D.__offset,W=Array.isArray(D.value)?D.value:[D.value],O=0;for(let G=0;G<W.length;G++){let z=W[G],Y=l(z);typeof z=="number"||typeof z=="boolean"?(D.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,H+O,D.__data)):z.isMatrix3?(D.__data[0]=z.elements[0],D.__data[1]=z.elements[1],D.__data[2]=z.elements[2],D.__data[3]=0,D.__data[4]=z.elements[3],D.__data[5]=z.elements[4],D.__data[6]=z.elements[5],D.__data[7]=0,D.__data[8]=z.elements[6],D.__data[9]=z.elements[7],D.__data[10]=z.elements[8],D.__data[11]=0):(z.toArray(D.__data,O),O+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,H,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Ta=class{constructor(e={}){let{canvas:t=$c(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let f=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,C=!1;this._outputColorSpace=ot;let R=0,N=0,B=null,D=-1,H=null,W=new Ke,O=new Ke,G=null,z=new Ue(0),Y=0,J=t.width,ie=t.height,Q=1,ge=null,we=null,ye=new Ke(0,0,J,ie),Re=new Ke(0,0,J,ie),oe=!1,he=new Gn,le=!1,Ae=!1,Se=new Oe,b=new T,S=new Ke,F={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},L=!1;function y(){return B===null?Q:1}let A,U,P,q,V,k,se,pe,re,_e,Me,Ee,ze,Xe,je,me,be,Ge,lt,xe,Ze,I,j,ne,E=n;function $(w,X){return t.getContext(w,X)}try{let w={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",$e,!1),E===null){let X="webgl2";if(E=$(X,w),E===null)throw $(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}function ue(){A=new Du(E),A.init(),I=new Yd(E,A),U=new Cu(E,A,e,I),P=new jd(E,A),U.reversedDepthBuffer&&d&&P.buffers.depth.setReversed(!0),q=new Fu(E),V=new Fd,k=new qd(E,A,P,V,U,I,q),se=new Iu(M),pe=new Lu(M),re=new bu(E),j=new Eu(E,re),_e=new Uu(E,re,q,j),Me=new Bu(E,_e,re,q),lt=new Ou(E,U,k),me=new Ru(V),Ee=new Nd(M,se,pe,A,U,j,me),ze=new Jd(M,V),Xe=new Bd,je=new Hd(A),Ge=new wu(M,se,pe,P,Me,p,c),be=new Wd(M,Me,U),ne=new Kd(E,q,U,P),xe=new Au(E,A,q),Ze=new Nu(E,A,q),q.programs=Ee.programs,M.capabilities=U,M.extensions=A,M.properties=V,M.renderLists=Xe,M.shadowMap=be,M.state=P,M.info=q}ue();let ce=new Tl(M,E);function Ve(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let w=q.autoReset,X=be.enabled,K=be.autoUpdate,te=be.needsUpdate,Z=be.type;ue(),q.autoReset=w,be.enabled=X,be.autoUpdate=K,be.needsUpdate=te,be.type=Z}function $e(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ft(w){let X=w.target;X.removeEventListener("dispose",ft),(function(K){(function(te){let Z=V.get(te).programs;Z!==void 0&&(Z.forEach(function(ae){Ee.releaseProgram(ae)}),te.isShaderMaterial&&Ee.releaseShaderCache(te))})(K),V.remove(K)})(X)}function At(w,X,K){w.transparent===!0&&w.side===Pt&&w.forceSinglePass===!1?(w.side=Gt,w.needsUpdate=!0,Hr(w,X,K),w.side=ki,w.needsUpdate=!0,Hr(w,X,K),w.side=Pt):Hr(w,X,K)}this.xr=ce,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){let w=A.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=A.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(w){w!==void 0&&(Q=w,this.setSize(J,ie,!1))},this.getSize=function(w){return w.set(J,ie)},this.setSize=function(w,X,K=!0){ce.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(J=w,ie=X,t.width=Math.floor(w*Q),t.height=Math.floor(X*Q),K===!0&&(t.style.width=w+"px",t.style.height=X+"px"),this.setViewport(0,0,w,X))},this.getDrawingBufferSize=function(w){return w.set(J*Q,ie*Q).floor()},this.setDrawingBufferSize=function(w,X,K){J=w,ie=X,Q=K,t.width=Math.floor(w*K),t.height=Math.floor(X*K),this.setViewport(0,0,w,X)},this.getCurrentViewport=function(w){return w.copy(W)},this.getViewport=function(w){return w.copy(ye)},this.setViewport=function(w,X,K,te){w.isVector4?ye.set(w.x,w.y,w.z,w.w):ye.set(w,X,K,te),P.viewport(W.copy(ye).multiplyScalar(Q).round())},this.getScissor=function(w){return w.copy(Re)},this.setScissor=function(w,X,K,te){w.isVector4?Re.set(w.x,w.y,w.z,w.w):Re.set(w,X,K,te),P.scissor(O.copy(Re).multiplyScalar(Q).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(w){P.setScissorTest(oe=w)},this.setOpaqueSort=function(w){ge=w},this.setTransparentSort=function(w){we=w},this.getClearColor=function(w){return w.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(w=!0,X=!0,K=!0){let te=0;if(w){let Z=!1;if(B!==null){let ae=B.texture.format;Z=ae===Ro||ae===Co||ae===ga}if(Z){let ae=B.texture.type,fe=ae===mn||ae===hi||ae===Xi||ae===ji||ae===ma||ae===fa,ve=Ge.getClearColor(),Te=Ge.getClearAlpha(),Pe=ve.r,De=ve.g,Le=ve.b;fe?(f[0]=Pe,f[1]=De,f[2]=Le,f[3]=Te,E.clearBufferuiv(E.COLOR,0,f)):(v[0]=Pe,v[1]=De,v[2]=Le,v[3]=Te,E.clearBufferiv(E.COLOR,0,v))}else te|=E.COLOR_BUFFER_BIT}X&&(te|=E.DEPTH_BUFFER_BIT),K&&(te|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",$e,!1),Ge.dispose(),Xe.dispose(),je.dispose(),V.dispose(),se.dispose(),pe.dispose(),Me.dispose(),j.dispose(),ne.dispose(),Ee.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",$i),ce.removeEventListener("sessionend",Qi),nn.stop()},this.renderBufferDirect=function(w,X,K,te,Z,ae){X===null&&(X=F);let fe=Z.isMesh&&Z.matrixWorld.determinant()<0,ve=(function(qe,rt,xt,He,Ne){rt.isScene!==!0&&(rt=F),k.resetTextureUnits();let Wt=rt.fog,Ea=He.isMeshStandardMaterial?rt.environment:null,Wr=B===null?M.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ei,Rn=(He.isMeshStandardMaterial?pe:se).get(He.envMap||Ea),rn=He.vertexColors===!0&&!!xt.attributes.color&&xt.attributes.color.itemSize===4,_i=!!xt.attributes.tangent&&(!!He.normalMap||He.anisotropy>0),_n=!!xt.morphAttributes.position,Aa=!!xt.morphAttributes.normal,vi=!!xt.morphAttributes.color,Pl=Cn;He.toneMapped&&(B!==null&&B.isXRRenderTarget!==!0||(Pl=M.toneMapping));let Ll=xt.morphAttributes.position||xt.morphAttributes.normal||xt.morphAttributes.color,Bh=Ll!==void 0?Ll.length:0,Ye=V.get(He),zh=g.state.lights;if(le===!0&&(Ae===!0||qe!==H)){let Vt=qe===H&&He.id===D;me.setState(He,qe,Vt)}let Xt=!1;He.version===Ye.__version?Ye.needsLights&&Ye.lightsStateVersion!==zh.state.version||Ye.outputColorSpace!==Wr||Ne.isBatchedMesh&&Ye.batching===!1?Xt=!0:Ne.isBatchedMesh||Ye.batching!==!0?Ne.isBatchedMesh&&Ye.batchingColor===!0&&Ne.colorTexture===null||Ne.isBatchedMesh&&Ye.batchingColor===!1&&Ne.colorTexture!==null||Ne.isInstancedMesh&&Ye.instancing===!1?Xt=!0:Ne.isInstancedMesh||Ye.instancing!==!0?Ne.isSkinnedMesh&&Ye.skinning===!1?Xt=!0:Ne.isSkinnedMesh||Ye.skinning!==!0?Ne.isInstancedMesh&&Ye.instancingColor===!0&&Ne.instanceColor===null||Ne.isInstancedMesh&&Ye.instancingColor===!1&&Ne.instanceColor!==null||Ne.isInstancedMesh&&Ye.instancingMorph===!0&&Ne.morphTexture===null||Ne.isInstancedMesh&&Ye.instancingMorph===!1&&Ne.morphTexture!==null||Ye.envMap!==Rn||He.fog===!0&&Ye.fog!==Wt?Xt=!0:Ye.numClippingPlanes===void 0||Ye.numClippingPlanes===me.numPlanes&&Ye.numIntersection===me.numIntersection?(Ye.vertexAlphas!==rn||Ye.vertexTangents!==_i||Ye.morphTargets!==_n||Ye.morphNormals!==Aa||Ye.morphColors!==vi||Ye.toneMapping!==Pl||Ye.morphTargetsCount!==Bh)&&(Xt=!0):Xt=!0:Xt=!0:Xt=!0:Xt=!0:(Xt=!0,Ye.__version=He.version);let qn=Ye.currentProgram;Xt===!0&&(qn=Hr(He,rt,Ne));let Dl=!1,er=!1,Ca=!1,ht=qn.getUniforms(),In=Ye.uniforms;if(P.useProgram(qn.program)&&(Dl=!0,er=!0,Ca=!0),He.id!==D&&(D=He.id,er=!0),Dl||H!==qe){P.buffers.depth.getReversed()&&qe.reversedDepth!==!0&&(qe._reversedDepth=!0,qe.updateProjectionMatrix()),ht.setValue(E,"projectionMatrix",qe.projectionMatrix),ht.setValue(E,"viewMatrix",qe.matrixWorldInverse);let Vt=ht.map.cameraPosition;Vt!==void 0&&Vt.setValue(E,b.setFromMatrixPosition(qe.matrixWorld)),U.logarithmicDepthBuffer&&ht.setValue(E,"logDepthBufFC",2/(Math.log(qe.far+1)/Math.LN2)),(He.isMeshPhongMaterial||He.isMeshToonMaterial||He.isMeshLambertMaterial||He.isMeshBasicMaterial||He.isMeshStandardMaterial||He.isShaderMaterial)&&ht.setValue(E,"isOrthographic",qe.isOrthographicCamera===!0),H!==qe&&(H=qe,er=!0,Ca=!0)}if(Ne.isSkinnedMesh){ht.setOptional(E,Ne,"bindMatrix"),ht.setOptional(E,Ne,"bindMatrixInverse");let Vt=Ne.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),ht.setValue(E,"boneTexture",Vt.boneTexture,k))}Ne.isBatchedMesh&&(ht.setOptional(E,Ne,"batchingTexture"),ht.setValue(E,"batchingTexture",Ne._matricesTexture,k),ht.setOptional(E,Ne,"batchingIdTexture"),ht.setValue(E,"batchingIdTexture",Ne._indirectTexture,k),ht.setOptional(E,Ne,"batchingColorTexture"),Ne._colorsTexture!==null&&ht.setValue(E,"batchingColorTexture",Ne._colorsTexture,k));let Ra=xt.morphAttributes;Ra.position===void 0&&Ra.normal===void 0&&Ra.color===void 0||lt.update(Ne,xt,qn),(er||Ye.receiveShadow!==Ne.receiveShadow)&&(Ye.receiveShadow=Ne.receiveShadow,ht.setValue(E,"receiveShadow",Ne.receiveShadow)),He.isMeshGouraudMaterial&&He.envMap!==null&&(In.envMap.value=Rn,In.flipEnvMap.value=Rn.isCubeTexture&&Rn.isRenderTargetTexture===!1?-1:1),He.isMeshStandardMaterial&&He.envMap===null&&rt.environment!==null&&(In.envMapIntensity.value=rt.environmentIntensity),er&&(ht.setValue(E,"toneMappingExposure",M.toneMappingExposure),Ye.needsLights&&(jt=Ca,(sn=In).ambientLightColor.needsUpdate=jt,sn.lightProbe.needsUpdate=jt,sn.directionalLights.needsUpdate=jt,sn.directionalLightShadows.needsUpdate=jt,sn.pointLights.needsUpdate=jt,sn.pointLightShadows.needsUpdate=jt,sn.spotLights.needsUpdate=jt,sn.spotLightShadows.needsUpdate=jt,sn.rectAreaLights.needsUpdate=jt,sn.hemisphereLights.needsUpdate=jt),Wt&&He.fog===!0&&ze.refreshFogUniforms(In,Wt),ze.refreshMaterialUniforms(In,He,Q,ie,g.state.transmissionRenderTarget[qe.id]),Zi.upload(E,Rl(Ye),In,k));var sn,jt;if(He.isShaderMaterial&&He.uniformsNeedUpdate===!0&&(Zi.upload(E,Rl(Ye),In,k),He.uniformsNeedUpdate=!1),He.isSpriteMaterial&&ht.setValue(E,"center",Ne.center),ht.setValue(E,"modelViewMatrix",Ne.modelViewMatrix),ht.setValue(E,"normalMatrix",Ne.normalMatrix),ht.setValue(E,"modelMatrix",Ne.matrixWorld),He.isShaderMaterial||He.isRawShaderMaterial){let Vt=He.uniformsGroups;for(let Ia=0,Gh=Vt.length;Ia<Gh;Ia++){let Ul=Vt[Ia];ne.update(Ul,qn),ne.bind(Ul,qn)}}return qn})(w,X,K,te,Z);P.setMaterial(te,fe);let Te=K.index,Pe=1;if(te.wireframe===!0){if(Te=_e.getWireframeAttribute(K),Te===void 0)return;Pe=2}let De=K.drawRange,Le=K.attributes.position,ke=De.start*Pe,nt=(De.start+De.count)*Pe;ae!==null&&(ke=Math.max(ke,ae.start*Pe),nt=Math.min(nt,(ae.start+ae.count)*Pe)),Te!==null?(ke=Math.max(ke,0),nt=Math.min(nt,Te.count)):Le!=null&&(ke=Math.max(ke,0),nt=Math.min(nt,Le.count));let at=nt-ke;if(at<0||at===1/0)return;let ct;j.setup(Z,te,ve,K,Te);let it=xe;if(Te!==null&&(ct=re.get(Te),it=Ze,it.setIndex(ct)),Z.isMesh)te.wireframe===!0?(P.setLineWidth(te.wireframeLinewidth*y()),it.setMode(E.LINES)):it.setMode(E.TRIANGLES);else if(Z.isLine){let qe=te.linewidth;qe===void 0&&(qe=1),P.setLineWidth(qe*y()),Z.isLineSegments?it.setMode(E.LINES):Z.isLineLoop?it.setMode(E.LINE_LOOP):it.setMode(E.LINE_STRIP)}else Z.isPoints?it.setMode(E.POINTS):Z.isSprite&&it.setMode(E.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Li("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),it.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(A.get("WEBGL_multi_draw"))it.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let qe=Z._multiDrawStarts,rt=Z._multiDrawCounts,xt=Z._multiDrawCount,He=Te?re.get(Te).bytesPerElement:1,Ne=V.get(te).currentProgram.getUniforms();for(let Wt=0;Wt<xt;Wt++)Ne.setValue(E,"_gl_DrawID",Wt),it.render(qe[Wt]/He,rt[Wt])}else if(Z.isInstancedMesh)it.renderInstances(ke,at,Z.count);else if(K.isInstancedBufferGeometry){let qe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,rt=Math.min(K.instanceCount,qe);it.renderInstances(ke,at,rt)}else it.render(ke,at)},this.compile=function(w,X,K=null){K===null&&(K=w),g=je.get(K),g.init(X),x.push(g),K.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),w!==K&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),g.setupLights();let te=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let ae=Z.material;if(ae)if(Array.isArray(ae))for(let fe=0;fe<ae.length;fe++){let ve=ae[fe];At(ve,K,Z),te.add(ve)}else At(ae,K,Z),te.add(ae)}),g=x.pop(),te},this.compileAsync=function(w,X,K=null){let te=this.compile(w,X,K);return new Promise(Z=>{function ae(){te.forEach(function(fe){V.get(fe).currentProgram.isReady()&&te.delete(fe)}),te.size!==0?setTimeout(ae,10):Z(w)}A.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Ct=null;function $i(){nn.stop()}function Qi(){nn.start()}let nn=new Rh;function gi(w,X,K,te){if(w.visible===!1)return;if(w.layers.test(X.layers)){if(w.isGroup)K=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(X);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||he.intersectsSprite(w)){te&&S.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Se);let ae=Me.update(w),fe=w.material;fe.visible&&m.push(w,ae,fe,K,S.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||he.intersectsObject(w))){let ae=Me.update(w),fe=w.material;if(te&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),S.copy(w.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),S.copy(ae.boundingSphere.center)),S.applyMatrix4(w.matrixWorld).applyMatrix4(Se)),Array.isArray(fe)){let ve=ae.groups;for(let Te=0,Pe=ve.length;Te<Pe;Te++){let De=ve[Te],Le=fe[De.materialIndex];Le&&Le.visible&&m.push(w,ae,Le,K,S.z,De)}}else fe.visible&&m.push(w,ae,fe,K,S.z,null)}}let Z=w.children;for(let ae=0,fe=Z.length;ae<fe;ae++)gi(Z[ae],X,K,te)}function El(w,X,K,te){let Z=w.opaque,ae=w.transmissive,fe=w.transparent;g.setupLightsView(K),le===!0&&me.setGlobalState(M.clippingPlanes,K),te&&P.viewport(W.copy(te)),Z.length>0&&kr(Z,X,K),ae.length>0&&kr(ae,X,K),fe.length>0&&kr(fe,X,K),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function Al(w,X,K,te){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[te.id]===void 0&&(g.state.transmissionRenderTarget[te.id]=new Ht(1,1,{generateMipmaps:!0,type:A.has("EXT_color_buffer_half_float")||A.has("EXT_color_buffer_float")?jn:mn,minFilter:ci,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));let Z=g.state.transmissionRenderTarget[te.id],ae=te.viewport||W;Z.setSize(ae.z*M.transmissionResolutionScale,ae.w*M.transmissionResolutionScale);let fe=M.getRenderTarget(),ve=M.getActiveCubeFace(),Te=M.getActiveMipmapLevel();M.setRenderTarget(Z),M.getClearColor(z),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),L&&Ge.render(K);let Pe=M.toneMapping;M.toneMapping=Cn;let De=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),g.setupLightsView(te),le===!0&&me.setGlobalState(M.clippingPlanes,te),kr(w,K,te),k.updateMultisampleRenderTarget(Z),k.updateRenderTargetMipmap(Z),A.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let ke=0,nt=X.length;ke<nt;ke++){let at=X[ke],ct=at.object,it=at.geometry,qe=at.material,rt=at.group;if(qe.side===Pt&&ct.layers.test(te.layers)){let xt=qe.side;qe.side=Gt,qe.needsUpdate=!0,Cl(ct,K,te,it,qe,rt),qe.side=xt,qe.needsUpdate=!0,Le=!0}}Le===!0&&(k.updateMultisampleRenderTarget(Z),k.updateRenderTargetMipmap(Z))}M.setRenderTarget(fe,ve,Te),M.setClearColor(z,Y),De!==void 0&&(te.viewport=De),M.toneMapping=Pe}function kr(w,X,K){let te=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,ae=w.length;Z<ae;Z++){let fe=w[Z],ve=fe.object,Te=fe.geometry,Pe=fe.group,De=fe.material;De.allowOverride===!0&&te!==null&&(De=te),ve.layers.test(K.layers)&&Cl(ve,X,K,Te,De,Pe)}}function Cl(w,X,K,te,Z,ae){w.onBeforeRender(M,X,K,te,Z,ae),w.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(M,X,K,te,w,ae),Z.transparent===!0&&Z.side===Pt&&Z.forceSinglePass===!1?(Z.side=Gt,Z.needsUpdate=!0,M.renderBufferDirect(K,X,te,Z,w,ae),Z.side=ki,Z.needsUpdate=!0,M.renderBufferDirect(K,X,te,Z,w,ae),Z.side=Pt):M.renderBufferDirect(K,X,te,Z,w,ae),w.onAfterRender(M,X,K,te,Z,ae)}function Hr(w,X,K){X.isScene!==!0&&(X=F);let te=V.get(w),Z=g.state.lights,ae=g.state.shadowsArray,fe=Z.state.version,ve=Ee.getParameters(w,Z.state,ae,X,K),Te=Ee.getProgramCacheKey(ve),Pe=te.programs;te.environment=w.isMeshStandardMaterial?X.environment:null,te.fog=X.fog,te.envMap=(w.isMeshStandardMaterial?pe:se).get(w.envMap||te.environment),te.envMapRotation=te.environment!==null&&w.envMap===null?X.environmentRotation:w.envMapRotation,Pe===void 0&&(w.addEventListener("dispose",ft),Pe=new Map,te.programs=Pe);let De=Pe.get(Te);if(De!==void 0){if(te.currentProgram===De&&te.lightsStateVersion===fe)return Il(w,ve),De}else ve.uniforms=Ee.getUniforms(w),w.onBeforeCompile(ve,M),De=Ee.acquireProgram(ve,Te),Pe.set(Te,De),te.uniforms=ve.uniforms;let Le=te.uniforms;return(w.isShaderMaterial||w.isRawShaderMaterial)&&w.clipping!==!0||(Le.clippingPlanes=me.uniform),Il(w,ve),te.needsLights=(function(ke){return ke.isMeshLambertMaterial||ke.isMeshToonMaterial||ke.isMeshPhongMaterial||ke.isMeshStandardMaterial||ke.isShadowMaterial||ke.isShaderMaterial&&ke.lights===!0})(w),te.lightsStateVersion=fe,te.needsLights&&(Le.ambientLightColor.value=Z.state.ambient,Le.lightProbe.value=Z.state.probe,Le.directionalLights.value=Z.state.directional,Le.directionalLightShadows.value=Z.state.directionalShadow,Le.spotLights.value=Z.state.spot,Le.spotLightShadows.value=Z.state.spotShadow,Le.rectAreaLights.value=Z.state.rectArea,Le.ltc_1.value=Z.state.rectAreaLTC1,Le.ltc_2.value=Z.state.rectAreaLTC2,Le.pointLights.value=Z.state.point,Le.pointLightShadows.value=Z.state.pointShadow,Le.hemisphereLights.value=Z.state.hemi,Le.directionalShadowMap.value=Z.state.directionalShadowMap,Le.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Le.spotShadowMap.value=Z.state.spotShadowMap,Le.spotLightMatrix.value=Z.state.spotLightMatrix,Le.spotLightMap.value=Z.state.spotLightMap,Le.pointShadowMap.value=Z.state.pointShadowMap,Le.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=De,te.uniformsList=null,De}function Rl(w){if(w.uniformsList===null){let X=w.currentProgram.getUniforms();w.uniformsList=Zi.seqWithValue(X.seq,w.uniforms)}return w.uniformsList}function Il(w,X){let K=V.get(w);K.outputColorSpace=X.outputColorSpace,K.batching=X.batching,K.batchingColor=X.batchingColor,K.instancing=X.instancing,K.instancingColor=X.instancingColor,K.instancingMorph=X.instancingMorph,K.skinning=X.skinning,K.morphTargets=X.morphTargets,K.morphNormals=X.morphNormals,K.morphColors=X.morphColors,K.morphTargetsCount=X.morphTargetsCount,K.numClippingPlanes=X.numClippingPlanes,K.numIntersection=X.numClipIntersection,K.vertexAlphas=X.vertexAlphas,K.vertexTangents=X.vertexTangents,K.toneMapping=X.toneMapping}nn.setAnimationLoop(function(w){Ct&&Ct(w)}),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(w){Ct=w,ce.setAnimationLoop(w),w===null?nn.stop():nn.start()},ce.addEventListener("sessionstart",$i),ce.addEventListener("sessionend",Qi),this.render=function(w,X){if(X!==void 0&&X.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(X),X=ce.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,X,B),g=je.get(w,x.length),g.init(X),x.push(g),Se.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),he.setFromProjectionMatrix(Se,wn,X.reversedDepth),Ae=this.localClippingEnabled,le=me.init(this.clippingPlanes,Ae),m=Xe.get(w,_.length),m.init(),_.push(m),ce.enabled===!0&&ce.isPresenting===!0){let ae=M.xr.getDepthSensingMesh();ae!==null&&gi(ae,X,-1/0,M.sortObjects)}gi(w,X,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(ge,we),L=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,L&&Ge.addToRenderList(m,w),this.info.render.frame++,le===!0&&me.beginShadows();let K=g.state.shadowsArray;be.render(K,w,X),le===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();let te=m.opaque,Z=m.transmissive;if(g.setupLights(),X.isArrayCamera){let ae=X.cameras;if(Z.length>0)for(let fe=0,ve=ae.length;fe<ve;fe++)Al(te,Z,w,ae[fe]);L&&Ge.render(w);for(let fe=0,ve=ae.length;fe<ve;fe++){let Te=ae[fe];El(m,w,Te,Te.viewport)}}else Z.length>0&&Al(te,Z,w,X),L&&Ge.render(w),El(m,w,X);B!==null&&N===0&&(k.updateMultisampleRenderTarget(B),k.updateRenderTargetMipmap(B)),w.isScene===!0&&w.onAfterRender(M,w,X),j.resetDefaultState(),D=-1,H=null,x.pop(),x.length>0?(g=x[x.length-1],le===!0&&me.setGlobalState(M.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(w,X,K){let te=V.get(w);te.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),V.get(w.texture).__webglTexture=X,V.get(w.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:K,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,X){let K=V.get(w);K.__webglFramebuffer=X,K.__useDefaultFramebuffer=X===void 0};let Nh=E.createFramebuffer();this.setRenderTarget=function(w,X=0,K=0){B=w,R=X,N=K;let te=!0,Z=null,ae=!1,fe=!1;if(w){let ve=V.get(w);if(ve.__useDefaultFramebuffer!==void 0)P.bindFramebuffer(E.FRAMEBUFFER,null),te=!1;else if(ve.__webglFramebuffer===void 0)k.setupRenderTarget(w);else if(ve.__hasExternalTextures)k.rebindTextures(w,V.get(w.texture).__webglTexture,V.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let De=w.depthTexture;if(ve.__boundDepthTexture!==De){if(De!==null&&V.has(De)&&(w.width!==De.image.width||w.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(w)}}let Te=w.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(fe=!0);let Pe=V.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Z=Array.isArray(Pe[X])?Pe[X][K]:Pe[X],ae=!0):Z=w.samples>0&&k.useMultisampledRTT(w)===!1?V.get(w).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[K]:Pe,W.copy(w.viewport),O.copy(w.scissor),G=w.scissorTest}else W.copy(ye).multiplyScalar(Q).floor(),O.copy(Re).multiplyScalar(Q).floor(),G=oe;if(K!==0&&(Z=Nh),P.bindFramebuffer(E.FRAMEBUFFER,Z)&&te&&P.drawBuffers(w,Z),P.viewport(W),P.scissor(O),P.setScissorTest(G),ae){let ve=V.get(w.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+X,ve.__webglTexture,K)}else if(fe){let ve=X;for(let Te=0;Te<w.textures.length;Te++){let Pe=V.get(w.textures[Te]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,K,ve)}}else if(w!==null&&K!==0){let ve=V.get(w.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,ve.__webglTexture,K)}D=-1},this.readRenderTargetPixels=function(w,X,K,te,Z,ae,fe,ve=0){if(!w||!w.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(Te=Te[fe]),Te){P.bindFramebuffer(E.FRAMEBUFFER,Te);try{let Pe=w.textures[ve],De=Pe.format,Le=Pe.type;if(!U.textureFormatReadable(De))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Le))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");X>=0&&X<=w.width-te&&K>=0&&K<=w.height-Z&&(w.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+ve),E.readPixels(X,K,te,Z,I.convert(De),I.convert(Le),ae))}finally{let Pe=B!==null?V.get(B).__webglFramebuffer:null;P.bindFramebuffer(E.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(w,X,K,te,Z,ae,fe,ve=0){if(!w||!w.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(Te=Te[fe]),Te){if(X>=0&&X<=w.width-te&&K>=0&&K<=w.height-Z){P.bindFramebuffer(E.FRAMEBUFFER,Te);let Pe=w.textures[ve],De=Pe.format,Le=Pe.type;if(!U.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ke=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,ke),E.bufferData(E.PIXEL_PACK_BUFFER,ae.byteLength,E.STREAM_READ),w.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+ve),E.readPixels(X,K,te,Z,I.convert(De),I.convert(Le),0);let nt=B!==null?V.get(B).__webglFramebuffer:null;P.bindFramebuffer(E.FRAMEBUFFER,nt);let at=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await Qc(E,at,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,ke),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,ae),E.deleteBuffer(ke),E.deleteSync(at),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,X=null,K=0){let te=Math.pow(2,-K),Z=Math.floor(w.image.width*te),ae=Math.floor(w.image.height*te),fe=X!==null?X.x:0,ve=X!==null?X.y:0;k.setTexture2D(w,0),E.copyTexSubImage2D(E.TEXTURE_2D,K,0,0,fe,ve,Z,ae),P.unbindTexture()};let Fh=E.createFramebuffer(),Oh=E.createFramebuffer();this.copyTextureToTexture=function(w,X,K=null,te=null,Z=0,ae=null){let fe,ve,Te,Pe,De,Le,ke,nt,at;ae===null&&(Z!==0?(Li("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=Z,Z=0):ae=0);let ct=w.isCompressedTexture?w.mipmaps[ae]:w.image;if(K!==null)fe=K.max.x-K.min.x,ve=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Pe=K.min.x,De=K.min.y,Le=K.isBox3?K.min.z:0;else{let rn=Math.pow(2,-Z);fe=Math.floor(ct.width*rn),ve=Math.floor(ct.height*rn),Te=w.isDataArrayTexture?ct.depth:w.isData3DTexture?Math.floor(ct.depth*rn):1,Pe=0,De=0,Le=0}te!==null?(ke=te.x,nt=te.y,at=te.z):(ke=0,nt=0,at=0);let it=I.convert(X.format),qe=I.convert(X.type),rt;X.isData3DTexture?(k.setTexture3D(X,0),rt=E.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(k.setTexture2DArray(X,0),rt=E.TEXTURE_2D_ARRAY):(k.setTexture2D(X,0),rt=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,X.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,X.unpackAlignment);let xt=E.getParameter(E.UNPACK_ROW_LENGTH),He=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Ne=E.getParameter(E.UNPACK_SKIP_PIXELS),Wt=E.getParameter(E.UNPACK_SKIP_ROWS),Ea=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,ct.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,ct.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Pe),E.pixelStorei(E.UNPACK_SKIP_ROWS,De),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Le);let Wr=w.isDataArrayTexture||w.isData3DTexture,Rn=X.isDataArrayTexture||X.isData3DTexture;if(w.isDepthTexture){let rn=V.get(w),_i=V.get(X),_n=V.get(rn.__renderTarget),Aa=V.get(_i.__renderTarget);P.bindFramebuffer(E.READ_FRAMEBUFFER,_n.__webglFramebuffer),P.bindFramebuffer(E.DRAW_FRAMEBUFFER,Aa.__webglFramebuffer);for(let vi=0;vi<Te;vi++)Wr&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,V.get(w).__webglTexture,Z,Le+vi),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,V.get(X).__webglTexture,ae,at+vi)),E.blitFramebuffer(Pe,De,fe,ve,ke,nt,fe,ve,E.DEPTH_BUFFER_BIT,E.NEAREST);P.bindFramebuffer(E.READ_FRAMEBUFFER,null),P.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||V.has(w)){let rn=V.get(w),_i=V.get(X);P.bindFramebuffer(E.READ_FRAMEBUFFER,Fh),P.bindFramebuffer(E.DRAW_FRAMEBUFFER,Oh);for(let _n=0;_n<Te;_n++)Wr?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,rn.__webglTexture,Z,Le+_n):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,rn.__webglTexture,Z),Rn?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,_i.__webglTexture,ae,at+_n):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,_i.__webglTexture,ae),Z!==0?E.blitFramebuffer(Pe,De,fe,ve,ke,nt,fe,ve,E.COLOR_BUFFER_BIT,E.NEAREST):Rn?E.copyTexSubImage3D(rt,ae,ke,nt,at+_n,Pe,De,fe,ve):E.copyTexSubImage2D(rt,ae,ke,nt,Pe,De,fe,ve);P.bindFramebuffer(E.READ_FRAMEBUFFER,null),P.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Rn?w.isDataTexture||w.isData3DTexture?E.texSubImage3D(rt,ae,ke,nt,at,fe,ve,Te,it,qe,ct.data):X.isCompressedArrayTexture?E.compressedTexSubImage3D(rt,ae,ke,nt,at,fe,ve,Te,it,ct.data):E.texSubImage3D(rt,ae,ke,nt,at,fe,ve,Te,it,qe,ct):w.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,ae,ke,nt,fe,ve,it,qe,ct.data):w.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,ae,ke,nt,ct.width,ct.height,it,ct.data):E.texSubImage2D(E.TEXTURE_2D,ae,ke,nt,fe,ve,it,qe,ct);E.pixelStorei(E.UNPACK_ROW_LENGTH,xt),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,He),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ne),E.pixelStorei(E.UNPACK_SKIP_ROWS,Wt),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Ea),ae===0&&X.generateMipmaps&&E.generateMipmap(rt),P.unbindTexture()},this.initRenderTarget=function(w){V.get(w).__webglFramebuffer===void 0&&k.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?k.setTextureCube(w,0):w.isData3DTexture?k.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?k.setTexture2DArray(w,0):k.setTexture2D(w,0),P.unbindTexture()},this.resetState=function(){R=0,N=0,B=null,P.reset(),j.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var Uh=(r,e,t)=>Math.max(e,Math.min(t,r));function Qd(r,e){let t=window.PokerGarage,n=new _t;r.add(n),n.scale.set(1.24,.86,.95);let i=(I,j,ne)=>new Gi({color:I,metalness:j,roughness:ne,clearcoat:j>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.item("wheels",e.wheels).color,.88,.2),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),p=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function f(I,j,ne=0,E=0,$=0,ue=n){let ce=new dt(I,j);return ce.position.set(ne,E,$),ce.castShadow=!0,ce.receiveShadow=!0,ue.add(ce),ce}let v=(I,j,ne,E,$,ue,ce)=>f(new Mt(I,j,ne),E,$,ue,ce);function m(I,j,ne,E,$,ue,ce="y"){let Ve=f(new en(I,I,j,64),ne,E,$,ue);return ce==="z"&&(Ve.rotation.x=Math.PI/2),ce==="x"&&(Ve.rotation.z=Math.PI/2),Ve}function g(I,j,ne,E,$,ue,ce="z"){let Ve=f(new dn(I,j,12,80),ne,E,$,ue);return ce==="y"&&(Ve.rotation.x=Math.PI/2),ce==="x"&&(Ve.rotation.y=Math.PI/2),Ve}function _(I,j,ne,E=Hn){let $=new E,ue=-I/2,ce=-j/2;return ne=Math.min(ne,j/2-.001),$.moveTo(ue+ne,ce),$.lineTo(ue+I-ne,ce),$.quadraticCurveTo(ue+I,ce,ue+I,ce+ne),$.lineTo(ue+I,ce+j-ne),$.quadraticCurveTo(ue+I,ce+j,ue+I-ne,ce+j),$.lineTo(ue+ne,ce+j),$.quadraticCurveTo(ue,ce+j,ue,ce+j-ne),$.lineTo(ue,ce+ne),$.quadraticCurveTo(ue,ce,ue+ne,ce),$}function x(I,j,ne,E,$,ue,ce=null,Ve=.025){let Ie=_(I,j,E);if(ce){let ft=_(ce[0],ce[1],ce[2],kn),At=new kn(ft.getPoints(40).map(Ct=>new ee(Ct.x+(ce[3]||0),Ct.y)));Ie.holes.push(At)}let $e=f(new si(Ie,{depth:ne,bevelEnabled:Ve>0,bevelSize:Ve,bevelThickness:Ve,bevelSegments:4,curveSegments:40}),$,0,ue,0);return $e.rotation.x=-Math.PI/2,$e}let M=[3.02,1.51,.65,-.28],C=_(4.96,2.44,1.15).getSpacedPoints(128),R=[],N=[],B=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[I,j]of B)for(let ne=0;ne<128;ne++){let E=C[ne];R.push(E.x*j,I,-E.y*j)}for(let I=0;I<3;I++)for(let j=0;j<128;j++){let ne=I*128+j,E=I*128+(j+1)%128;N.push(ne,E,ne+128,E,E+128,ne+128)}let D=new et;D.setAttribute("position",new Ce(R,3)),D.setIndex(N),D.computeVertexNormals(),s.side=Pt,f(D,s),x(5.03,2.51,.065,1.19,o,.58,null,.035),x(5.1,2.58,.09,1.22,o,1.25,M,.035);let H=new St(_(4.94,2.42,1.15).getPoints(40).map(I=>new T(I.x,1.44,-I.y)),!0,"centripetal");f(new vt(H,240,.125,16,!0),u);for(let I of[-1,1]){let j=Array.from({length:21},(ne,E)=>{let $=.26+E*.25/20;return new T(1.32+1.15*Math.cos($),1.44,I*(.06+1.15*Math.sin($)))});f(new vt(new St(j),32,.132,20,!1),o)}x(4.65,2.14,.035,1.03,o,1.39,M,.015),x(4.52,2.01,.025,.97,a,1.43,M,.01);let W=x(2.98,1.47,.025,.63,a,.94);W.position.x=-.28;let O=x(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);O.position.x=-.28;let G=x(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);G.position.x=-.28;for(let I of[-1,-.35,.35])for(let j of[-.75,.75])v(.011,.4,.009,h,I,1.2,j);function z(I,j){let ne=document.createElement("canvas");ne.width=ne.height=256;let E=ne.getContext("2d");E.fillStyle=I,E.fillRect(0,0,256,256);let $=17;for(let ce=0;ce<18e3;ce++)$=$*1664525+1013904223>>>0,E.fillStyle="rgba(0,0,0,"+j+")",E.fillRect($%256,($>>>8)%256,1,1);let ue=new Ot(ne);return ue.colorSpace=ot,ue.wrapS=ue.wrapT=Qn,ue}a.map=z("#e8e8e8",.035),a.bumpMap=z("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=z("#888888",.12),c.bumpScale=.003,u.bumpMap=z("#888888",.3),u.bumpScale=.001;function Y(I,j,ne,E,$,ue=!1,ce=n){let Ve=new Hn;Ve.moveTo(0,.5),Ve.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),Ve.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),Ve.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),Ve.bezierCurveTo(.48,.12,.12,.28,0,.5),Ve.moveTo(-.12,-.3),Ve.lineTo(0,-.06),Ve.lineTo(.12,-.3),Ve.closePath();let Ie=f(new si(Ve,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),j,ne,E,$,ce);return Ie.scale.setScalar(I),ue&&(Ie.rotation.y=Math.PI),Ie}let J=[],ie=[];for(let I of[-1.72,1.72])for(let j of[-1,1]){let ne=j*1.36,E=j*1.57,$=new _t;$.position.set(I,.81,ne),n.add($);let ue=n.children.length,ce=f(new Bi([new ee(.56,-.19),new ee(.61,-.245),new ee(.67,-.25),new ee(.76,-.19),new ee(.8,-.1),new ee(.8,.1),new ee(.76,.19),new ee(.67,.25),new ee(.61,.245),new ee(.56,.19)],80),c,I,.81,ne);ce.rotation.x=Math.PI/2;for(let Ie=-2;Ie<=2;Ie++)g(.798-Math.abs(Ie)*.012,.0035,h,I,.81,ne+Ie*.071);for(let Ie=0;Ie<28;Ie++){let $e=Ie*Math.PI/14,ft=Array.from({length:17},(At,Ct)=>{let $i=Ct/16,Qi=-.205+$i*.41,nn=.799-.044*Math.pow(Math.abs(Qi)/.205,3),gi=$e+.13*Math.sin($i*Math.PI);return new T(I+Math.sin(gi)*nn,.81+Math.cos(gi)*nn,ne+Qi)});f(new vt(new St(ft),20,.0045,5,!1),h)}for(let Ie of[-1,1])for(let $e of[.625,.654,.681])g($e,.0035,h,I,.81,ne+Ie*.244);m(.566,.04,l,I,.81,E,"z"),m(.515,.045,h,I,.81,E+j*.022,"z"),g(.548,.023,l,I,.81,E+j*.035),g(.505,.016,l,I,.81,E+j*.043),m(.14,.045,h,I,.81,E+j*.045,"z"),g(.14,.012,l,I,.81,E+j*.069);let Ve=Y(.2,l,I,.8,E+j*.075,j<0);ie.push(Ve);for(let Ie of t.wheelDesign()){let $e=new St(Ie.map(([ft,At])=>new T(I+ft,.81+At,E+j*(.04+.025*(1-Math.hypot(ft,At)/.51)))));J.push(f(new vt($e,20,.007,6,!1),l))}for(let Ie=0;Ie<20;Ie++){let $e=Ie*Math.PI/10;m(.006,.009,l,I+Math.sin($e)*.526,.81+Math.cos($e)*.526,E+j*.06,"z")}n.updateMatrixWorld(!0);for(let Ie of n.children.slice(ue))$.attach(Ie);$.scale.set(.88/1.24,.88/.86,1/.95),$.position.y=.715/.86}let Q=[];for(let I of[-1,1])Q.push(Y(.65,o,-1.12,.95,I*1.32,I<0)),v(1.35,.43,.04,o,.05,.94,I*1.3);for(let I of[-1,1]){let j=m(.275,.27,h,2.16,.945,I*.97,"z");g(.278,.035,o,2.16,.945,I*1.11)}for(let I of[-1.72,1.72])m(.07,2.8,h,I,.7,0,"z");v(3.6,.08,.8,h,0,.57,0);let ge=[];function we(I,j,ne){let E=document.createElement("canvas");E.width=I,E.height=j,ne(E.getContext("2d"),I,j);let $=new Ot(E);return $.colorSpace=ot,$.anisotropy=8,ge.push($),$}let ye=we(768,256,(I,j,ne)=>{I.fillStyle="#101b18",I.fillRect(0,0,j,ne),I.strokeStyle="#d9b35b",I.lineWidth=7,I.strokeRect(10,10,j-20,ne-20),I.fillStyle="#ebc66c",I.textAlign="center",I.font="italic 116px Georgia",I.fillText("Two Aces",j/2,137),I.font="38px Georgia",I.fillText("\u2660 Poker21 \u2660",j/2,209)}),Re=[];for(let I of[-1,1]){let j=new Gi({map:ye,metalness:.55,roughness:.2,clearcoat:1});Re.push(j);let ne=f(new zt(1.28,.4),j,.05,.94,I*1.326);I<0&&(ne.rotation.y=Math.PI)}for(let I of[-1,1])for(let j of[-.54,.64])for(let ne of[.78,1.1]){let E=m(.014,.018,o,j,ne,I*1.35,"z")}for(let I of[-1.7,-.35,1.48])for(let j of[-1.21,1.21]){let ne=m(.128,.13,o,I,1.44,j,"x")}for(let I of[-1.7,-.35,1.48])for(let j of[-1,1])g(.125,.004,h,I+.08,1.44,j*1.21,"x"),g(.125,.004,h,I-.08,1.44,j*1.21,"x");for(let I of[-1.7,-.35,1.48])for(let j of[-.96,.96])m(.135,.08,o,I,1.49,j),m(.108,.082,h,I,1.498,j),g(.125,.015,o,I,1.54,j,"y"),g(.111,.006,o,I,1.535,j,"y");let oe=[],he=[],le=["#ab2338","#1b684b","#2455a5"].map(I=>i(I,.08,.55)),Ae=i("#eee9d6",.04,.6);for(let[I,j,ne,E]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let $=0;$<E;$++){m(.104,.033,le[ne],I,1.49+$*.037,j);for(let ue=0;ue<6;ue++){let ce=ue*Math.PI/3,Ve=v(.024,.021,.012,Ae,I+Math.cos(ce)*.103,1.49+$*.037,j+Math.sin(ce)*.103);Ve.rotation.y=-ce,oe.push(Ve)}if($===E-1){let ue=new Wn({transparent:!0,roughness:.55}),ce=f(new zt(.17,.17),ue,I,1.509+$*.037,j);ce.rotation.x=-Math.PI/2,he.push({mat:ue,n:ne})}}let Se=new _t;Se.position.set(.89,1.96,0),Se.scale.set(1/1.24,1/.86,1/.95),Se.quaternion.setFromUnitVectors(new T(0,0,1),new T(.65,.68,.2).normalize()),n.add(Se);let b=u.clone();f(new dn(.53,.06,16,80),b,0,0,0,Se),f(new dn(.473,.014,10,64),o,0,0,-.02,Se);for(let I=0;I<3;I++){let j=[Math.PI/2,-Math.PI/2,Math.PI][I],ne=f(new Mt(.09,.39,.045),o,Math.sin(j)*.26,Math.cos(j)*.26,0,Se);ne.rotation.z=-j}for(let I of[-1,1]){let j=f(new Mt(.35,.075,.06),o,I*.265,0,0,Se);f(new Mt(.32,.035,.064),h,I*.265,0,.006,Se)}let S=f(new en(.195,.195,.075,64),o,0,0,.035,Se);S.rotation.x=Math.PI/2;let F=f(new ii(.177,64),new Wn({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Se);F.receiveShadow=!1,Y(.38,o,0,-.025,.105,!1,Se);let L={classic:new _t,sport:new _t,formula:new _t};for(let I of Se.children.slice())L.classic.add(I);Object.values(L).forEach(I=>Se.add(I));function y(I,j,ne,E){let $=new St(j.map(([ue,ce])=>new T(ue,ce,0)),!0);f(new vt($,72,ne,12,!0),E,0,0,0,I)}y(L.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,b);for(let I of[-1,1])f(new Mt(.35,.065,.045),l,I*.27,0,0,L.sport),f(new Mt(.065,.3,.045),l,I*.12,-.22,0,L.sport);f(new dn(.5,.018,8,64,.22),d,0,0,.005,L.sport),y(L.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,b),f(new Mt(.6,.23,.065),h,0,0,0,L.formula);for(let I of[-1,1])f(new zi(.035,12,8),d,I*.25,.055,.06,L.formula),f(new Mt(.08,.29,.025),l,I*.37,0,-.07,L.formula);for(let I of["sport","formula"]){let j=f(new en(.15,.15,.07,48),l,0,0,.035,L[I]);j.rotation.x=Math.PI/2,f(new ii(.13,48),h,0,0,.078,L[I]),Y(.25,l,0,-.018,.09,!1,L[I])}let A=v(.12,.49,.095,o,1.02,1.68,0);A.rotation.z=.45;let U=v(.075,.43,.1,h,1.02,1.685,0);U.rotation.z=.45;let P=-1.84,q=1.99,V=.74,k=new _t;k.position.set(P,q,0),n.add(k);let se=n.children.length;m(V,.51,o,P,q,0,"z"),m(.67,.54,h,P,q,0,"z");for(let I of[-1,1]){let j=I*.29;g(.72,.055,h,P,q,j),g(.75,.022,o,P,q,j+I*.03),g(.665,.012,d,P,q,j+I*.025);for(let ne=0;ne<14;ne++){let E=ne*Math.PI/7,$=[],ue=[];for(let Ie=0;Ie<=16;Ie++){let $e=Ie/16,ft=.22+$e*.44,At=E+.55*$e;for(let Ct of[-.15,.15])$.push(P+Math.sin(At+Ct)*ft,q+Math.cos(At+Ct)*ft,j+I*(.018+Math.sin($e*Math.PI)*.12))}for(let Ie=0;Ie<16;Ie++){let $e=Ie*2;ue.push($e,$e+1,$e+2,$e+1,$e+3,$e+2)}let ce=new et;ce.setAttribute("position",new Ce($,3)),ce.setIndex(ue),ce.computeVertexNormals(),p.side=Pt,f(ce,p);let Ve=new St(Array.from({length:17},(Ie,$e)=>{let ft=$e/16,At=.22+ft*.44,Ct=E+.55*ft-.15;return new T(P+Math.sin(Ct)*At,q+Math.cos(Ct)*At,j+I*(.025+Math.sin(ft*Math.PI)*.12))}));f(new vt(Ve,20,.009,6,!1),d)}m(.215,.07,o,P,q,j+I*.085,"z"),m(.18,.085,h,P,q,j+I*.11,"z")}for(let I=0;I<12;I++){let j=I*Math.PI/6,ne=v(.045,.15,.2,h,P+Math.cos(j)*.735,q+Math.sin(j)*.735,0);ne.rotation.z=j}n.updateMatrixWorld(!0);for(let I of n.children.slice(se))k.attach(I);k.rotation.set(0,1.24,0),k.scale.set(.96/1.24,.96/.86,.96/.95);let pe=k.clone(!0);n.add(pe);let re={classic:new _t,dual:new _t,titanium:new _t},_e=i("#a9b7c4",.92,.23),Me=i("#668bb5",.88,.25);Object.values(re).forEach(I=>n.add(I));for(let[I,j]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let ne of j){let E=I==="titanium"?Me:_e,$=f(new en(.105,.105,.5,32),E,-2.42,.76,ne,re[I]);$.rotation.z=Math.PI/2;let ue=f(new en(.079,.079,.012,32),h,-2.678,.76,ne,re[I]);ue.rotation.z=Math.PI/2;let ce=f(new dn(.094,.012,8,32),E,-2.69,.76,ne,re[I]);ce.rotation.y=Math.PI/2}for(let I of[-1,1]){let j=new St([new T(-2.16,1.46,I*.65),new T(-1.94,1.66,I*.69),new T(-1.3,1.59,I*.64),new T(-.98,1.47,I*.7)]);f(new vt(j,32,.022,8,!1),o),v(.34,.06,.14,o,-1.84,1.48,I*.4)}for(let I of[-1,1]){let j=new St([new T(-2.45,1.1,I*.7),new T(-2.43,1.36,I*.72),new T(-2.19,1.55,I*.7),new T(-1.9,1.55,I*.68)]);f(new vt(j,40,.075,14,!1),h),f(new vt(j,40,.019,10,!1),o);for(let ne of[-2.2,-1.96]){let E=new St([new T(ne,1.43,I*.48),new T(ne,1.63,I*.6),new T(ne+.24,1.57,I*.82)]);f(new vt(E,24,.017,8,!1),o)}}let Ee=[],ze=[];for(let I=0;I<=48;I++){let j=-.92+I*1.84/48;for(let ne of[.64,1.23])Ee.push(2.57-.28*(Math.sin(j)*1.25/1.1)**2,ne,Math.sin(j)*1.25)}for(let I=0;I<48;I++){let j=I*2;ze.push(j,j+2,j+1,j+1,j+2,j+3)}let Xe=new et;Xe.setAttribute("position",new Ce(Ee,3)),Xe.setIndex(ze),Xe.computeVertexNormals();let je=i("#00453f",.72,.14);je.clearcoat=1,je.side=Pt,f(Xe,je);for(let I of[.635,1.225]){let j=Array.from({length:65},(ne,E)=>{let $=-1.04+E*2.08/64;return new T(2.57-.28*($/1.1)**2,I,$)});f(new vt(new St(j),80,.034,12,!1),o)}for(let I of[-1,1]){let j=I*1,ne=2.57-.28*(j/1.1)**2,E=new St([new T(ne-.04,.635,j),new T(ne+.05,.78,j),new T(ne+.065,1.12,j),new T(ne-.04,1.25,j)]);f(new vt(E,32,.065,12,!1),o);for(let $ of[.91,1.065]){let ue=Array.from({length:16},(ce,Ve)=>{let Ie=I*(.51+Ve*.41/15);return new T(2.57-.28*(Ie/1.1)**2+.018,$,Ie)});f(new vt(new St(ue),24,.017,8,!1),d)}}let me=[];for(let I=0;I<2;I++){let j=new Ot(t.cardCanvas(e.cards,I));j.colorSpace=ot,j.anisotropy=16;let ne=new zn({map:j,transparent:!0,toneMapped:!1});me.push(ne);let E=1.43+I*.4,$=-.18+I*.23,ue=v(.506,.008,.676,i("#20252c",0,.95),E,1.474+I*.004,$);ue.rotation.y=-I*.13;let ce=f(new zt(.5,.67),ne,E,1.48+I*.004,$);ce.rotation.x=-Math.PI/2,ce.rotation.z=I*.13}let be=new Wn({map:new Ot(t.plateCanvas(e)),roughness:.6});for(let I of[-1,1]){let j=f(new zt(.79,.463),be,I*2.605,1.01,0);j.rotation.y=I*Math.PI/2}function Ge(I){Object.entries(L).forEach(([$,ue])=>ue.visible=$===(I.steering||"classic")),Object.entries(re).forEach(([$,ue])=>ue.visible=$===(I.exhaust||"classic"));let j=I.turbine==="twin",ne=j?.69:I.turbine==="boost"?1.08:.96;k.scale.set(ne/1.24,ne/.86,ne/.95),k.position.set(P,q+(j?-.12:0),j?-.57:0),pe.visible=j,pe.scale.copy(k.scale),pe.position.set(P,q-.12,.57);let E=I.badges||[];Re.forEach($=>{let ue=E.join("|");$.userData.badges!==ue&&($.map!==ye&&$.map?.dispose(),$.map=E.length?new Ot(t.badgePlaqueCanvas(E)):ye,$.map.colorSpace=ot,$.map.anisotropy=16,$.metalness=E.length?.08:.55,$.roughness=E.length?.65:.2,$.clearcoat=E.length?0:1,$.emissive.set(E.length?"#ffffff":"#000000"),$.emissiveMap=E.length?$.map:null,$.emissiveIntensity=E.length?.18:0,$.userData.badges=ue,$.needsUpdate=!0)}),s.color.set(t.item("paint",I.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.item("wheels",I.wheels).color),o.color.set(t.item("trim",I.trim).color),u.userData.style!==I.upholstery&&(u.map?.dispose(),u.map=new Ot(t.upholsteryCanvas(I.upholstery)),u.map.colorSpace=ot,u.map.wrapS=u.map.wrapT=Qn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=I.upholstery==="alcantara"?.9:.38,u.userData.style=I.upholstery,u.needsUpdate=!0),t.chipPalette(I.chips).forEach(($,ue)=>{le[ue].color.set($),le[ue].roughness=I.chips==="ceramic"?.25:.55}),oe.forEach($=>$.visible=I.chips!=="ceramic"),he.forEach(({mat:$,n:ue})=>{$.userData.style!==I.chips&&($.map?.dispose(),$.map=new Ot(t.chipCanvas(I.chips,ue)),$.map.colorSpace=ot,$.map.anisotropy=8,$.userData.style=I.chips,$.needsUpdate=!0)}),me.forEach(($,ue)=>{$.userData.style!==I.cards&&($.map?.dispose(),$.map=new Ot(t.cardCanvas(I.cards,ue)),$.map.colorSpace=ot,$.map.anisotropy=16,$.userData.style=I.cards,$.needsUpdate=!0)}),J.forEach($=>$.visible=!0),ie.forEach($=>$.visible=!0),d.color.set(t.item("light",I.light).color),d.emissive.copy(d.color),p.color.copy(d.color).multiplyScalar(.075),p.emissive.copy(d.color),p.emissiveIntensity=.045,be.userData.number!==I.number+I.region&&(be.map?.dispose(),be.map=new Ot(t.plateCanvas(I)),be.userData.number=I.number+I.region,be.needsUpdate=!0)}let lt=new Lr(d.color,.45,2,2);lt.position.set(-1.9,2,.48),n.add(lt);let xe=Ge;function Ze(I){xe(I),lt.color.copy(d.color)}return Ze(e),{car:n,update:Ze}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Ta({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=ot,n.toneMapping=ca,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=ta,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new ni,s=new yt(35,1,.1,60);i.add(new Pr("#c6d9ef","#44311e",1.25));for(let[G,z,Y,J,ie]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let Q=new Dr(G,z);Q.position.set(Y,J,ie),Q.castShadow=G==="#fff0d0",Q.shadow.bias=-2e-4,Q.shadow.normalBias=.025,Q.shadow.mapSize.set(2048,2048),Q.shadow.camera.left=-5,Q.shadow.camera.right=5,Q.shadow.camera.top=5,Q.shadow.camera.bottom=-5,i.add(Q)}let a=new ni;a.background=new Ue("#48505b");for(let[G,z,Y,J,ie,Q]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let ge=new dt(new Mt(J,ie,Q),new zn({color:"#ffffff"}));ge.position.set(G,z,Y),a.add(ge)}let o=new Ji(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(G=>{G.geometry?.dispose(),G.material?.dispose()}),o.dispose();let l=new dt(new zt(30,30),new Rr({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Qd(i,e);t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let u=!1,d=null,p=0,f=0,v=()=>{let G=r.clientWidth,z=r.clientHeight;G&&z&&(n.setSize(G,z,!1),s.aspect=G/z,s.updateProjectionMatrix())},m=new ResizeObserver(v);m.observe(r),v();let g=new Ht(1,1,{type:jn,depthBuffer:!0});g.samples=4;let _=new ni,x=new oi(-1,1,1,-1,0,1),M=new Ft({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:g.texture},stepSize:{value:new ee}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),C=new dt(new zt(2,2),M);_.add(C);function R(){let G=n.getDrawingBufferSize(new ee);(g.width!==G.x||g.height!==G.y)&&g.setSize(G.x,G.y),M.uniforms.stepSize.value.set(3/G.x,3/G.y),n.setRenderTarget(g),n.render(i,s),n.setRenderTarget(null),n.render(_,x)}let N=G=>{G.button&&G.button!==0||(t.manual=!0,d={id:G.pointerId,x:G.clientX,y:G.clientY},r.setPointerCapture(G.pointerId),G.preventDefault())},B=G=>{!d||d.id!==G.pointerId||(t.yaw-=(G.clientX-d.x)*.011,t.pitch=Uh(t.pitch+(G.clientY-d.y)*.009,-.24,1.35),d.x=G.clientX,d.y=G.clientY,G.preventDefault())},D=G=>{d&&d.id===G.pointerId&&(d=null,r.hasPointerCapture(G.pointerId)&&r.releasePointerCapture(G.pointerId))},H=G=>{let z={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};z[G.key]&&(t.manual=!0,t.yaw+=z[G.key][0],t.pitch=Uh(t.pitch+z[G.key][1],-.24,1.35),G.preventDefault())};r.addEventListener("keydown",H),r.addEventListener("pointerdown",N),r.addEventListener("pointermove",B),r.addEventListener("pointerup",D),r.addEventListener("pointercancel",D),r.addEventListener("lostpointercapture",D);function W(){if(u)return;u=!0,cancelAnimationFrame(p),m.disconnect(),r.removeEventListener("keydown",H),r.removeEventListener("pointerdown",N),r.removeEventListener("pointermove",B),r.removeEventListener("pointerup",D),r.removeEventListener("pointercancel",D),r.removeEventListener("lostpointercapture",D);let G=new Set,z=new Set,Y=new Set;i.traverse(J=>{J.geometry&&Y.add(J.geometry),J.material&&z.add(J.material)}),z.forEach(J=>{for(let ie of Object.values(J))ie&&ie.isTexture&&G.add(ie);J.dispose()}),G.forEach(J=>J.dispose()),Y.forEach(J=>J.dispose()),c.dispose(),g.dispose(),M.dispose(),C.geometry.dispose(),n.dispose(),n.domElement.remove()}function O(G){if(u)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){W();return}let z=f?Math.min(.05,(G-f)/1e3):0;if(f=G,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=z*.13);let Y=Math.max(9,3.6/(Math.tan(35*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Y,1.15+Math.sin(t.pitch)*Y,Math.cos(t.yaw)*Math.cos(t.pitch)*Y),s.lookAt(0,1.2,0),R(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}p=requestAnimationFrame(O)}return p=requestAnimationFrame(O),{update:h.update,dispose:W,state:t}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
