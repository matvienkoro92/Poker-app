(()=>{var Ps=(r,e,t)=>Math.exp(-(((r-e)/t)**2));function Is(r="bodyNormal"){let e={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]},[t,n,i,s]=e[r]||e.bodyNormal;return(a,o,c,l)=>{if(l===1){let h=Ps(o,.25,.12),u=Ps(o,.405,.085);a*=1+(t-1)*(.55+.45*h)+s*u,c*=n,c+=s*u*(c>0?1:.15)}if(l===2){let h=(i-1)*Ps(o,.29,.13),u=Math.sign(a)*(.49+(o-.2)*1.05);a=u+(a-u)*(1+h),c*=1+h}if(l===4){let h=o<.55?0:Math.sign(a)*(.27+(o-.55)*.48),u=o<.55?(t-1)*.5:(i-1)*.4*Ps(o,.69,.16);a=h+(a-h)*(1+u),c*=1+u}return[a,o,c]}}var Jc=0,el=1,Kc=2;var tl=1,Ga=2,ri=3,Pr=0,Bn=1,Nt=2,Ui=0,Ms=1,nl=2,il=3,rl=4,$c=5,Ir=100,Qc=101,eh=102,th=103,nh=104,ih=200,rh=201,sh=202,ah=203,oh=204,lh=205,ch=206,hh=207,uh=208,dh=209,ph=210,mh=211,fh=212,gh=213,vh=214,ka=0,Va=1,Ha=2,Ss=3,Wa=4,Xa=5,ja=6,qa=7,_h=0,yh=1,xh=2,Si=0,Mh=1,Sh=2,Th=3,si=4,bh=5,wh=6,Eh=7,Ho="attached",Ah="detached",sl=300,Lr=301,qi=302,Ya=303,Za=304,Ts=306,Zn=1e3,vr=1001,aa=1002,ni=1003,Ch=1004;var bs=1005;var ii=1006,Ja=1007;var Yi=1008;var ai=1009,al=1010,ol=1011,Dr=1012,Ka=1013,Zi=1014,Hn=1015,Ni=1016,$a=1017,Qa=1018,Ur=1020,ll=35902,cl=35899,Rh=1021,Ph=1022,Wn=1023,ws=1026,Es=1027,eo=1028,to=1029,Ih=1030,hl=1031;var ul=1033,no=33776,io=33777,ro=33778,so=33779,dl=35840,pl=35841,ml=35842,fl=35843,gl=36196,vl=37492,_l=37496,yl=37808,xl=37809,Ml=37810,Sl=37811,Tl=37812,bl=37813,wl=37814,El=37815,Al=37816,Cl=37817,Rl=37818,Pl=37819,Il=37820,Ll=37821,Dl=36492,Ul=36494,Nl=36495,Fl=36283,Bl=36284,Ol=36285,zl=36286;var Jr=2300,oa=2301,ra=2302,Wo=2400,Xo=2401,jo=2402;var ao=3201;var Lh=0,Dh=1,Ji="",pt="srgb",ki="srgb-linear",Kr="linear",Rt="srgb";var Gi=7680;var Uh=512,Nh=513,Fh=514,Gl=515,Bh=516,Oh=517,zh=518,Gh=519,qo=35044;var kl="300 es",vi=2e3,$r=2001;var _i=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var sa=Math.PI/180,la=180/Math.PI;function Ki(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(pn[255&r]+pn[r>>8&255]+pn[r>>16&255]+pn[r>>24&255]+"-"+pn[255&e]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[63&t|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[255&n]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function dt(r,e,t){return Math.max(e,Math.min(t,r))}function Bu(r,e){return(r%e+e)%e}function uo(r,e,t){return(1-t)*r+t*e}function zr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function bn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}var ue=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],m=s[a+1],p=s[a+2],y=s[a+3];if(o===0)return e[t+0]=c,e[t+1]=l,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=m,e[t+2]=p,void(e[t+3]=y);if(u!==y||c!==d||l!==m||h!==p){let f=1-o,g=c*d+l*m+h*p+u*y,v=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let M=Math.sqrt(_),b=Math.atan2(M,g*v);f=Math.sin(f*b)/M,o=Math.sin(o*b)/M}let x=o*v;if(c=c*f+d*x,l=l*f+m*x,h=h*f+p*x,u=u*f+y*x,f===1-o){let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],m=s[a+2],p=s[a+3];return e[t]=o*p+h*u+c*m-l*d,e[t+1]=c*p+h*d+l*u-o*m,e[t+2]=l*p+h*m+o*d-c*u,e[t+3]=h*p-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),m=c(i/2),p=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"YXZ":this._x=d*h*u+l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"ZXY":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u-d*m*p;break;case"ZYX":this._x=d*h*u-l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u+d*m*p;break;case"YZX":this._x=d*h*u+l*m*p,this._y=l*m*u+d*h*p,this._z=l*h*p-d*m*u,this._w=l*h*u-d*m*p;break;case"XZY":this._x=d*h*u-l*m*p,this._y=l*m*u-d*h*p,this._z=l*h*p+d*m*u,this._w=l*h*u+d*m*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-i)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+l)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(s-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return po.copy(this).projectOnVector(e),this.sub(po)}reflect(e){return this.sub(po.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},po=new w,gc=new Dn,ot=class r{constructor(e,t,n,i,s,a,o,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],p=n[8],y=i[0],f=i[3],g=i[6],v=i[1],_=i[4],x=i[7],M=i[2],b=i[5],L=i[8];return s[0]=a*y+o*v+c*M,s[3]=a*f+o*_+c*b,s[6]=a*g+o*x+c*L,s[1]=l*y+h*v+u*M,s[4]=l*f+h*_+u*b,s[7]=l*g+h*x+u*L,s[2]=d*y+m*v+p*M,s[5]=d*f+m*_+p*b,s[8]=d*g+m*x+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,p=t*u+n*d+i*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(i*l-h*n)*y,e[2]=(o*n-i*a)*y,e[3]=d*y,e[4]=(h*t-i*c)*y,e[5]=(i*s-o*t)*y,e[6]=m*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},mo=new ot;function Vl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function kh(){let r=Qr("canvas");return r.style.display="block",r}var vc={};function _r(r){r in vc||(vc[r]=!0,console.warn(r))}function Vh(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var _c=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yc=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ou(){let r={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===Rt&&(i.r=gi(i.r),i.g=gi(i.g),i.b=gi(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(i.r=gr(i.r),i.g=gr(i.g),i.b=gr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return _r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return _r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ki]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:_c,fromXYZ:yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pt},outputColorSpaceConfig:{drawingBufferColorSpace:pt}},[pt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:_c,fromXYZ:yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pt}}}),r}var xt=Ou();function gi(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function gr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var rr,ca=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rr===void 0&&(rr=Qr("canvas")),rr.width=e.width,rr.height=e.height;let i=rr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=rr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*gi(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*gi(t[n]/255)):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zu=0,yr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(fo(i[a].image)):s.push(fo(i[a]))}else s=fo(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function fo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ca.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gu=0,go=new w,xn=class r extends _i{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Ki(),this.name="",this.source=new yr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zn:e.x=e.x-Math.floor(e.x);break;case vr:e.x=e.x<0?0:1;break;case aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Zn:e.y=e.y-Math.floor(e.y);break;case vr:e.y=e.y<0?0:1;break;case aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};xn.DEFAULT_IMAGE=null,xn.DEFAULT_MAPPING=sl,xn.DEFAULT_ANISOTROPY=1;var bt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],p=c[9],y=c[2],f=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+f)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,x=(m+1)/2,M=(g+1)/2,b=(h+d)/4,L=(u+y)/4,O=(p+f)/4;return _>x&&_>M?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=L/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=O/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=L/s,i=O/s),this.set(n,i,s,t),this}let v=Math.sqrt((f-p)*(f-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-p)/v,this.y=(u-y)/v,this.z=(d-h)/v,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ha=class extends _i{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new xn(i);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new yr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends ha{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},es=class extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ua=class extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ls.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ls.copy(n.boundingBox)),Ls.applyMatrix4(e.matrixWorld),this.union(Ls)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gr),Ds.subVectors(this.max,Gr),sr.subVectors(e.a,Gr),ar.subVectors(e.b,Gr),or.subVectors(e.c,Gr),bi.subVectors(ar,sr),wi.subVectors(or,ar),Fi.subVectors(sr,or);let t=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Fi.z,Fi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Fi.z,0,-Fi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Fi.y,Fi.x,0];return!!vo(t,sr,ar,or,Ds)&&(t=[1,0,0,0,1,0,0,0,1],!!vo(t,sr,ar,or,Ds)&&(Us.crossVectors(bi,wi),t=[Us.x,Us.y,Us.z],vo(t,sr,ar,or,Ds)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(jn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hi=[new w,new w,new w,new w,new w,new w,new w,new w],jn=new w,Ls=new cn,sr=new w,ar=new w,or=new w,bi=new w,wi=new w,Fi=new w,Gr=new w,Ds=new w,Us=new w,Bi=new w;function vo(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Bi.fromArray(r,s);let o=i.x*Math.abs(Bi.x)+i.y*Math.abs(Bi.y)+i.z*Math.abs(Bi.z),c=e.dot(Bi),l=t.dot(Bi),h=n.dot(Bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var ku=new cn,kr=new w,_o=new w,Un=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ku.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kr.subVectors(e,this.center);let t=kr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(kr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kr.copy(e.center).add(_o)),this.expandByPoint(kr.copy(e.center).sub(_o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ui=new w,yo=new w,Ns=new w,Ei=new w,xo=new w,Fs=new w,Mo=new w,Vi=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){yo.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(yo);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ns),o=Ei.dot(this.direction),c=-Ei.dot(Ns),l=Ei.lengthSq(),h=Math.abs(1-a*a),u,d,m,p;if(h>0)if(u=a*c-o,d=a*o-c,p=s*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(yo).addScaledVector(Ns,d),m}intersectSphere(e,t){ui.subVectors(e.center,this.origin);let n=ui.dot(this.direction),i=ui.dot(ui)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,i,s){xo.subVectors(t,e),Fs.subVectors(n,e),Mo.crossVectors(xo,Fs);let a,o=this.direction.dot(Mo);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Ei.subVectors(this.origin,e);let c=a*this.direction.dot(Fs.crossVectors(Ei,Fs));if(c<0)return null;let l=a*this.direction.dot(xo.cross(Ei));if(l<0||c+l>o)return null;let h=-a*Ei.dot(Mo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class r{constructor(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f)}set(e,t,n,i,s,a,o,c,l,h,u,d,m,p,y,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=m,g[7]=p,g[11]=y,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/lr.setFromMatrixColumn(e,0).length(),s=1/lr.setFromMatrixColumn(e,1).length(),a=1/lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+p*l,t[5]=d-y*l,t[9]=-o*c,t[2]=y-d*l,t[6]=p+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d+y*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-p,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,m=c*u,p=l*h,y=l*u;t[0]=d-y*o,t[4]=-a*u,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*h,t[9]=y-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,m=a*u,p=o*h,y=o*u;t[0]=c*h,t[4]=p*l-m,t[8]=d*l+y,t[1]=c*u,t[5]=y*l+d,t[9]=m*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=y-d*u,t[8]=p*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+p,t[10]=d-y*u}else if(e.order==="XZY"){let d=a*c,m=a*l,p=o*c,y=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+y,t[5]=a*h,t[9]=m*u-p,t[2]=p*u-m,t[6]=o*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vu,e,Hu)}lookAt(e,t,n){let i=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Ai.crossVectors(n,Pn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Ai.crossVectors(n,Pn)),Ai.normalize(),Bs.crossVectors(Pn,Ai),i[0]=Ai.x,i[4]=Bs.x,i[8]=Pn.x,i[1]=Ai.y,i[5]=Bs.y,i[9]=Pn.y,i[2]=Ai.z,i[6]=Bs.z,i[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],p=n[2],y=n[6],f=n[10],g=n[14],v=n[3],_=n[7],x=n[11],M=n[15],b=i[0],L=i[4],O=i[8],U=i[12],k=i[1],I=i[5],D=i[9],K=i[13],V=i[2],j=i[6],ie=i[10],de=i[14],le=i[3],be=i[7],te=i[11],ce=i[15];return s[0]=a*b+o*k+c*V+l*le,s[4]=a*L+o*I+c*j+l*be,s[8]=a*O+o*D+c*ie+l*te,s[12]=a*U+o*K+c*de+l*ce,s[1]=h*b+u*k+d*V+m*le,s[5]=h*L+u*I+d*j+m*be,s[9]=h*O+u*D+d*ie+m*te,s[13]=h*U+u*K+d*de+m*ce,s[2]=p*b+y*k+f*V+g*le,s[6]=p*L+y*I+f*j+g*be,s[10]=p*O+y*D+f*ie+g*te,s[14]=p*U+y*K+f*de+g*ce,s[3]=v*b+_*k+x*V+M*le,s[7]=v*L+_*I+x*j+M*be,s[11]=v*O+_*D+x*ie+M*te,s[15]=v*U+_*K+x*de+M*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14];return e[3]*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*m-n*c*m)+e[7]*(+t*c*m-t*l*d+s*a*d-i*a*m+i*l*h-s*c*h)+e[11]*(+t*l*u-t*o*m-s*a*u+n*a*m+s*o*h-n*l*h)+e[15]*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],p=e[12],y=e[13],f=e[14],g=e[15],v=u*f*l-y*d*l+y*c*m-o*f*m-u*c*g+o*d*g,_=p*d*l-h*f*l-p*c*m+a*f*m+h*c*g-a*d*g,x=h*y*l-p*u*l+p*o*m-a*y*m-h*o*g+a*u*g,M=p*u*c-h*y*c-p*o*d+a*y*d+h*o*f-a*u*f,b=t*v+n*_+i*x+s*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/b;return e[0]=v*L,e[1]=(y*d*s-u*f*s-y*i*m+n*f*m+u*i*g-n*d*g)*L,e[2]=(o*f*s-y*c*s+y*i*l-n*f*l-o*i*g+n*c*g)*L,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*m-n*c*m)*L,e[4]=_*L,e[5]=(h*f*s-p*d*s+p*i*m-t*f*m-h*i*g+t*d*g)*L,e[6]=(p*c*s-a*f*s-p*i*l+t*f*l+a*i*g-t*c*g)*L,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*m+t*c*m)*L,e[8]=x*L,e[9]=(p*u*s-h*y*s-p*n*m+t*y*m+h*n*g-t*u*g)*L,e[10]=(a*y*s-p*o*s+p*n*l-t*y*l-a*n*g+t*o*g)*L,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*m-t*o*m)*L,e[12]=M*L,e[13]=(h*y*i-p*u*i+p*n*d-t*y*d-h*n*f+t*u*f)*L,e[14]=(p*o*i-a*y*i-p*n*c+t*y*c+a*n*f-t*o*f)*L,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,p=s*u,y=a*h,f=a*u,g=o*u,v=c*l,_=c*h,x=c*u,M=n.x,b=n.y,L=n.z;return i[0]=(1-(y+g))*M,i[1]=(m+x)*M,i[2]=(p-_)*M,i[3]=0,i[4]=(m-x)*b,i[5]=(1-(d+g))*b,i[6]=(f+v)*b,i[7]=0,i[8]=(p+_)*L,i[9]=(f-v)*L,i[10]=(1-(d+y))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=lr.set(i[0],i[1],i[2]).length(),a=lr.set(i[4],i[5],i[6]).length(),o=lr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],qn.copy(this);let c=1/s,l=1/a,h=1/o;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=l,qn.elements[5]*=l,qn.elements[6]*=l,qn.elements[8]*=h,qn.elements[9]*=h,qn.elements[10]*=h,t.setFromRotationMatrix(qn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),m=(n+i)/(n-i),p,y;if(c)p=s/(a-s),y=a*s/(a-s);else if(o===vi)p=-(a+s)/(a-s),y=-2*a*s/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),y=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),m=-(n+i)/(n-i),p,y;if(c)p=1/(a-s),y=a/(a-s);else if(o===vi)p=-2/(a-s),y=-(a+s)/(a-s);else{if(o!==$r)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);p=-1/(a-s),y=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},lr=new w,qn=new Ye,Vu=new w(0,0,0),Hu=new w(1,1,1),Ai=new w,Bs=new w,Pn=new w,xc=new Ye,Mc=new Dn,Jn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mc.setFromEuler(this),this.setFromQuaternion(Mc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var ts=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Wu=0,Sc=new w,cr=new Dn,di=new Ye,Os=new w,Vr=new w,Xu=new w,ju=new Dn,Tc=new w(1,0,0),bc=new w(0,1,0),wc=new w(0,0,1),Ec={type:"added"},qu={type:"removed"},hr={type:"childadded",child:null},So={type:"childremoved",child:null},ln=class r extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new w,t=new Jn,n=new Dn,i=new w(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ye},normalMatrix:{value:new ot}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Tc,e)}rotateY(e){return this.rotateOnAxis(bc,e)}rotateZ(e){return this.rotateOnAxis(wc,e)}translateOnAxis(e,t){return Sc.copy(e).applyQuaternion(this.quaternion),this.position.add(Sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tc,e)}translateY(e){return this.translateOnAxis(bc,e)}translateZ(e){return this.translateOnAxis(wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Os.copy(e):Os.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Vr,Os,this.up):di.lookAt(Os,Vr,this.up),this.quaternion.setFromRotationMatrix(di),i&&(di.extractRotation(i.matrixWorld),cr.setFromRotationMatrix(di),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ec),hr.child=e,this.dispatchEvent(hr),hr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qu),So.child=e,this.dispatchEvent(So),So.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ec),hr.child=e,this.dispatchEvent(hr),hr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,Xu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,ju,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};ln.DEFAULT_UP=new w(0,1,0),ln.DEFAULT_MATRIX_AUTO_UPDATE=!0,ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Yn=new w,pi=new w,To=new w,mi=new w,ur=new w,dr=new w,Ac=new w,bo=new w,wo=new w,Eo=new w,Ao=new bt,Co=new bt,Ro=new bt,fi=class r{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Yn.subVectors(e,t),i.cross(Yn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Yn.subVectors(i,t),pi.subVectors(n,t),To.subVectors(e,t);let a=Yn.dot(Yn),o=Yn.dot(pi),c=Yn.dot(To),l=pi.dot(pi),h=pi.dot(To),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,m=(l*c-o*h)*d,p=(a*h-o*c)*d;return s.set(1-m-p,p,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,mi)!==null&&mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,mi.x),c.addScaledVector(a,mi.y),c.addScaledVector(o,mi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Ao.setScalar(0),Co.setScalar(0),Ro.setScalar(0),Ao.fromBufferAttribute(e,t),Co.fromBufferAttribute(e,n),Ro.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ao,s.x),a.addScaledVector(Co,s.y),a.addScaledVector(Ro,s.z),a}static isFrontFacing(e,t,n,i){return Yn.subVectors(n,t),pi.subVectors(e,t),Yn.cross(pi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),.5*Yn.cross(pi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;ur.subVectors(i,n),dr.subVectors(s,n),bo.subVectors(e,n);let c=ur.dot(bo),l=dr.dot(bo);if(c<=0&&l<=0)return t.copy(n);wo.subVectors(e,i);let h=ur.dot(wo),u=dr.dot(wo);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ur,a);Eo.subVectors(e,s);let m=ur.dot(Eo),p=dr.dot(Eo);if(p>=0&&m<=p)return t.copy(s);let y=m*l-c*p;if(y<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(dr,o);let f=h*p-m*u;if(f<=0&&u-h>=0&&m-p>=0)return Ac.subVectors(s,i),o=(u-h)/(u-h+(m-p)),t.copy(i).addScaledVector(Ac,o);let g=1/(f+y+d);return a=y*g,o=d*g,t.copy(n).addScaledVector(ur,a).addScaledVector(dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Po(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var Ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=xt.workingColorSpace){if(e=Bu(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Po(a,s,e+1/3),this.g=Po(a,s,e),this.b=Po(a,s,e-1/3)}return xt.colorSpaceToWorking(this,i),this}setStyle(e,t=pt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pt){let n=Hh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pt){return xt.workingToColorSpace(mn.copy(this),e),65536*Math.round(dt(255*mn.r,0,255))+256*Math.round(dt(255*mn.g,0,255))+Math.round(dt(255*mn.b,0,255))}getHexString(e=pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(mn.copy(this),t);let n=mn.r,i=mn.g,s=mn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=pt){xt.workingToColorSpace(mn.copy(this),e);let t=mn.r,n=mn.g,i=mn.b;return e!==pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(zs);let n=uo(Ci.h,zs.h,t),i=uo(Ci.s,zs.s,t),s=uo(Ci.l,zs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},mn=new Ze;Ze.NAMES=Hh;var Yu=0,yi=class extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},kn=class extends yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Qp=Zu();function Zu(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var $t=new w,Gs=new ue,Ju=0,wn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ju++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qo,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array),i=bn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array),i=bn(i,this.array),s=bn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qo&&(e.usage=this.usage),e}};var Hi=class extends wn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ns=class extends wn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Le=class extends wn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ku=0,zn=new Ye,Io=new ln,pr=new w,In=new cn,Hr=new cn,sn=new w,mt=class r extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vl(e)?ns:Hi)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,n){return zn.makeTranslation(e,t,n),this.applyMatrix4(zn),this}scale(e,t,n){return zn.makeScale(e,t,n),this.applyMatrix4(zn),this}lookAt(e){return Io.lookAt(e),Io.updateMatrix(),this.applyMatrix4(Io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Le(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];In.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let n=this.boundingSphere.center;if(In.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(In.min,Hr.min),In.expandByPoint(sn),sn.addVectors(In.max,Hr.max),In.expandByPoint(sn)):(In.expandByPoint(Hr.min),In.expandByPoint(Hr.max))}In.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)sn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(sn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)sn.fromBufferAttribute(o,l),c&&(pr.fromBufferAttribute(e,l),sn.add(pr)),i=Math.max(i,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new w,c[O]=new w;let l=new w,h=new w,u=new w,d=new ue,m=new ue,p=new ue,y=new w,f=new w;function g(O,U,k){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,k),d.fromBufferAttribute(s,O),m.fromBufferAttribute(s,U),p.fromBufferAttribute(s,k),h.sub(l),u.sub(l),m.sub(d),p.sub(d);let I=1/(m.x*p.y-p.x*m.y);isFinite(I)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(u,-m.y).multiplyScalar(I),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-p.x).multiplyScalar(I),o[O].add(y),o[U].add(y),o[k].add(y),c[O].add(f),c[U].add(f),c[k].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let O=0,U=v.length;O<U;++O){let k=v[O],I=k.start;for(let D=I,K=I+k.count;D<K;D+=3)g(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let _=new w,x=new w,M=new w,b=new w;function L(O){M.fromBufferAttribute(i,O),b.copy(M);let U=o[O];_.copy(U),_.sub(M.multiplyScalar(M.dot(U))).normalize(),x.crossVectors(b,U);let k=x.dot(c[O])<0?-1:1;a.setXYZW(O,_.x,_.y,_.z,k)}for(let O=0,U=v.length;O<U;++O){let k=v[O],I=k.start;for(let D=I,K=I+k.count;D<K;D+=3)L(e.getX(D+0)),L(e.getX(D+1)),L(e.getX(D+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wn(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new w,s=new w,a=new w,o=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,m=e.count;d<m;d+=3){let p=e.getX(d+0),y=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),m=0,p=0;for(let y=0,f=c.length;y<f;y++){m=o.isInterleavedBufferAttribute?c[y]*o.data.stride+o.offset:c[y]*h;for(let g=0;g<h;g++)d[p++]=l[m++]}return new wn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cc=new Ye,Oi=new Vi,ks=new Un,Rc=new w,Vs=new w,Hs=new w,Ws=new w,Lo=new w,Xs=new w,Pc=new w,js=new w,tt=class extends ln{constructor(e=new mt,t=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Xs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Lo.fromBufferAttribute(u,e),a?Xs.addScaledVector(Lo,h):Xs.addScaledVector(Lo.sub(t),h))}t.add(Xs)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),ks.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(ks,Rc)===null||Oi.origin.distanceToSquared(Rc)>(e.far-e.near)**2))return;Cc.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(Cc),n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Oi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=qs(this,g,e,n,l,h,u,o.getX(v),o.getX(v+1),o.getX(v+2)),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);p<y;p+=3)i=qs(this,a,e,n,l,h,u,o.getX(p),o.getX(p+1),o.getX(p+2)),i&&(i.faceIndex=Math.floor(p/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){let f=d[p],g=a[f.materialIndex];for(let v=Math.max(f.start,m.start),_=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));v<_;v+=3)i=qs(this,g,e,n,l,h,u,v,v+1,v+2),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=f.materialIndex,t.push(i))}else for(let p=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);p<y;p+=3)i=qs(this,a,e,n,l,h,u,p,p+1,p+2),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}};function qs(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Vs),r.getVertexPosition(c,Hs),r.getVertexPosition(l,Ws);let h=(function(u,d,m,p,y,f,g,v){let _;if(_=d.side===1?p.intersectTriangle(g,f,y,!0,v):p.intersectTriangle(y,f,g,d.side===0,v),_===null)return null;js.copy(v),js.applyMatrix4(u.matrixWorld);let x=m.ray.origin.distanceTo(js);return x<m.near||x>m.far?null:{distance:x,point:js.clone(),object:u}})(r,e,t,n,Vs,Hs,Ws,Pc);if(h){let u=new w;fi.getBarycoord(Pc,Vs,Hs,Ws,u),i&&(h.uv=fi.getInterpolatedAttribute(i,o,c,l,u,new ue)),s&&(h.uv1=fi.getInterpolatedAttribute(s,o,c,l,u,new ue)),a&&(h.normal=fi.getInterpolatedAttribute(a,o,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new w,materialIndex:0};fi.getNormal(Vs,Hs,Ws,d.normal),h.face=d,h.barycoord=u}return h}var $e=class r extends mt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,m=0;function p(y,f,g,v,_,x,M,b,L,O,U){let k=x/L,I=M/O,D=x/2,K=M/2,V=b/2,j=L+1,ie=O+1,de=0,le=0,be=new w;for(let te=0;te<ie;te++){let ce=te*I-K;for(let we=0;we<j;we++){let he=we*k-D;be[y]=he*v,be[f]=ce*_,be[g]=V,l.push(be.x,be.y,be.z),be[y]=0,be[f]=0,be[g]=b>0?1:-1,h.push(be.x,be.y,be.z),u.push(we/L),u.push(1-te/O),de+=1}}for(let te=0;te<O;te++)for(let ce=0;ce<L;ce++){let we=d+ce+j*te,he=d+ce+j*(te+1),ge=d+(ce+1)+j*(te+1),pe=d+(ce+1)+j*te;c.push(we,he,pe),c.push(he,ge,pe),le+=6}o.addGroup(m,le,U),m+=le,d+=de}p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Le(l,3)),this.setAttribute("normal",new Le(h,3)),this.setAttribute("uv",new Le(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $i(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function vn(r){let e={};for(let t=0;t<r.length;t++){let n=$i(r[t]);for(let i in n)e[i]=n[i]}return e}function Hl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}var Wh={clone:$i,merge:vn},fn=class extends yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},xr=class extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ri=new w,Ic=new ue,Lc=new ue,kt=class extends xr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*la*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*sa*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*la*Math.atan(Math.tan(.5*sa*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,Ic,Lc),t.subVectors(Lc,Ic)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*sa*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},mr=-90,da=class extends ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new kt(mr,1,e,t);i.layers=this.layers,this.add(i);let s=new kt(mr,1,e,t);s.layers=this.layers,this.add(s);let a=new kt(mr,1,e,t);a.layers=this.layers,this.add(a);let o=new kt(mr,1,e,t);o.layers=this.layers,this.add(o);let c=new kt(mr,1,e,t);c.layers=this.layers,this.add(c);let l=new kt(mr,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===vi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==$r)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},is=class extends xn{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pa=class extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new is(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new $e(5,5,5),s=new fn({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new tt(i,s),o=t.minFilter;return t.minFilter===Yi&&(t.minFilter=ii),new da(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ve=class extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}},$u={type:"move"},Mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,n),g=this._getHandJoint(l,y);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,p=.005;l.inputState.pinching&&d>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($u)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ve;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Mn=class extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var em=new w;var tm=new w,nm=new w,im=new w,rm=new ue,sm=new ue,am=new Ye,om=new w,lm=new w,cm=new w,hm=new ue,um=new ue,dm=new ue;var pm=new w,mm=new w;var Dc=new w,Uc=new bt,Nc=new bt,Qu=new w,Fc=new Ye,Ys=new w,Do=new Un,Bc=new Ye,Uo=new Vi,rs=class extends tt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ho,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new cn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ys),this.boundingBox.expandByPoint(Ys)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ys),this.boundingSphere.expandByPoint(Ys)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Do.copy(this.boundingSphere),Do.applyMatrix4(i),e.ray.intersectsSphere(Do)!==!1&&(Bc.copy(i).invert(),Uo.copy(e.ray).applyMatrix4(Bc),this.boundingBox!==null&&Uo.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,Uo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ho?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ah?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Uc.fromBufferAttribute(i.attributes.skinIndex,e),Nc.fromBufferAttribute(i.attributes.skinWeight,e),Dc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Nc.getComponent(s);if(a!==0){let o=Uc.getComponent(s);Fc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Qu.copy(Dc).applyMatrix4(Fc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Sr=class extends ln{constructor(){super(),this.isBone=!0,this.type="Bone"}},ss=class extends xn{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oc=new Ye,ed=new Ye,as=class r{constructor(e=[],t=[]){this.uuid=Ki(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:ed;Oc.multiplyMatrices(o,t[s]),Oc.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ss(t,e,e,Wn,Hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Sr),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},os=class extends wn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fr=new Ye,zc=new Ye,Zs=[],Gc=new cn,td=new Ye,Wr=new tt,Xr=new Un,ls=class extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new os(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,td)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Gc.copy(e.boundingBox).applyMatrix4(fr),this.boundingBox.union(Gc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Xr.copy(e.boundingSphere).applyMatrix4(fr),this.boundingSphere.union(Xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(n),e.ray.intersectsSphere(Xr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,fr),zc.multiplyMatrices(n,fr),Wr.matrixWorld=zc,Wr.raycast(e,Zs);for(let a=0,o=Zs.length;a<o;a++){let c=Zs[a];c.instanceId=s,c.object=this,t.push(c)}Zs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new os(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ss(new Float32Array(i*this.count),i,this.count,eo,Hn));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},No=new w,nd=new w,id=new ot,ei=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=No.subVectors(n,t).cross(nd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(No),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||id.getNormalMatrix(e),i=this.coplanarPoint(No).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},zi=new Un,rd=new ue(.5,.5),Js=new w,Li=class{constructor(e=new ei,t=new ei,n=new ei,i=new ei,s=new ei,a=new ei){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],m=s[7],p=s[8],y=s[9],f=s[10],g=s[11],v=s[12],_=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-a,m-h,g-p,M-v).normalize(),i[1].setComponents(l+a,m+h,g+p,M+v).normalize(),i[2].setComponents(l+o,m+u,g+y,M+_).normalize(),i[3].setComponents(l-o,m-u,g-y,M-_).normalize(),n)i[4].setComponents(c,d,f,x).normalize(),i[5].setComponents(l-c,m-d,g-f,M-x).normalize();else if(i[4].setComponents(l-c,m-d,g-f,M-x).normalize(),t===vi)i[5].setComponents(l+c,m+d,g+f,M+x).normalize();else{if(t!==$r)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,d,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);let t=rd.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Js.x=i.normal.x>0?e.max.x:e.min.x,Js.y=i.normal.y>0?e.max.y:e.min.y,Js.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Js)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},$n=new Ye,Qn=new Li,ma=class r{constructor(){this.coordinateSystem=vi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if($n.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Qn.setFromProjectionMatrix($n,i.coordinateSystem,i.reversedDepth),Qn.containsPoint(e))return!0}return!1}clone(){return new r}};var Yo=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},fm=new Ye,gm=new Ze(1,1,1),vm=new Li,_m=new ma,ym=new cn,xm=new Un,Mm=new w,Sm=new w,Tm=new w,bm=new Yo,wm=new tt;var Em=new w,Am=new w,Cm=new Ye,Rm=new Vi,Pm=new Un,Im=new w,Lm=new w;var Dm=new w,Um=new w;var Nm=new Ye,Fm=new Vi,Bm=new Un,Om=new w;var Et=class extends xn{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},cs=class extends xn{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==ws&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},hs=class extends xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Tr=class r extends mt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,m=2*u+d,p=2*n+s,y=i+1,f=new w,g=new w;for(let v=0;v<=p;v++){let _=0,x=0,M=0,b=0;if(v<=n){let U=v/n,k=U*Math.PI/2;x=-h-e*Math.cos(k),M=e*Math.sin(k),b=-e*Math.cos(k),_=U*u}else if(v<=n+s){let U=(v-n)/s;x=U*t-h,M=e,b=0,_=u+U*d}else{let U=(v-n-s)/n,k=U*Math.PI/2;x=h+e*Math.sin(k),M=e*Math.cos(k),b=e*Math.sin(k),_=u+d+U*u}let L=Math.max(0,Math.min(1,_/m)),O=0;v===0?O=.5/i:v===p&&(O=-.5/i);for(let U=0;U<=i;U++){let k=U/i,I=k*Math.PI*2,D=Math.sin(I),K=Math.cos(I);g.x=-M*K,g.y=x,g.z=M*D,o.push(g.x,g.y,g.z),f.set(-M*K,b,M*D),f.normalize(),c.push(f.x,f.y,f.z),l.push(k+O,L)}if(v>0){let U=(v-1)*y;for(let k=0;k<i;k++){let I=U+k,D=U+k+1,K=v*y+k,V=v*y+k+1;a.push(I,D,K),a.push(D,V,K)}}}this.setIndex(a),this.setAttribute("position",new Le(o,3)),this.setAttribute("normal",new Le(c,3)),this.setAttribute("uv",new Le(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Vn=class r extends mt{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new w,h=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let m=n+u/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Le(a,3)),this.setAttribute("normal",new Le(o,3)),this.setAttribute("uv",new Le(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Xe=class r extends mt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],m=[],p=0,y=[],f=n/2,g=0;function v(_){let x=p,M=new ue,b=new w,L=0,O=_===!0?e:t,U=_===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,f*U,0),d.push(0,U,0),m.push(.5,.5),p++;let k=p;for(let I=0;I<=i;I++){let D=I/i*c+o,K=Math.cos(D),V=Math.sin(D);b.x=O*V,b.y=f*U,b.z=O*K,u.push(b.x,b.y,b.z),d.push(0,U,0),M.x=.5*K+.5,M.y=.5*V*U+.5,m.push(M.x,M.y),p++}for(let I=0;I<i;I++){let D=x+I,K=k+I;_===!0?h.push(K,K+1,D):h.push(K+1,K,D),L+=3}l.addGroup(g,L,_===!0?1:2),g+=L}(function(){let _=new w,x=new w,M=0,b=(t-e)/n;for(let L=0;L<=s;L++){let O=[],U=L/s,k=U*(t-e)+e;for(let I=0;I<=i;I++){let D=I/i,K=D*c+o,V=Math.sin(K),j=Math.cos(K);x.x=k*V,x.y=-U*n+f,x.z=k*j,u.push(x.x,x.y,x.z),_.set(V,b,j).normalize(),d.push(_.x,_.y,_.z),m.push(D,1-U),O.push(p++)}y.push(O)}for(let L=0;L<i;L++)for(let O=0;O<s;O++){let U=y[O][L],k=y[O+1][L],I=y[O+1][L+1],D=y[O][L+1];(e>0||O!==0)&&(h.push(U,k,D),M+=3),(t>0||O!==s-1)&&(h.push(k,I,D),M+=3)}l.addGroup(g,M,0),g+=M})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Le(u,3)),this.setAttribute("normal",new Le(d,3)),this.setAttribute("uv",new Le(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},fa=class r extends Xe{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Di=class r extends mt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(m,p,y,f){let g=f+1,v=[];for(let _=0;_<=g;_++){v[_]=[];let x=m.clone().lerp(y,_/g),M=p.clone().lerp(y,_/g),b=g-_;for(let L=0;L<=b;L++)v[_][L]=L===0&&_===g?x:x.clone().lerp(M,L/b)}for(let _=0;_<g;_++)for(let x=0;x<2*(g-_)-1;x++){let M=Math.floor(x/2);x%2==0?(c(v[_][M+1]),c(v[_+1][M]),c(v[_][M])):(c(v[_][M+1]),c(v[_+1][M+1]),c(v[_+1][M]))}}function c(m){s.push(m.x,m.y,m.z)}function l(m,p){let y=3*m;p.x=e[y+0],p.y=e[y+1],p.z=e[y+2]}function h(m,p,y,f){f<0&&m.x===1&&(a[p]=m.x-1),y.x===0&&y.z===0&&(a[p]=f/2/Math.PI+.5)}function u(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}(function(m){let p=new w,y=new w,f=new w;for(let g=0;g<t.length;g+=3)l(t[g+0],p),l(t[g+1],y),l(t[g+2],f),o(p,y,f,m)})(i),(function(m){let p=new w;for(let y=0;y<s.length;y+=3)p.x=s[y+0],p.y=s[y+1],p.z=s[y+2],p.normalize().multiplyScalar(m),s[y+0]=p.x,s[y+1]=p.y,s[y+2]=p.z})(n),(function(){let m=new w;for(let p=0;p<s.length;p+=3){m.x=s[p+0],m.y=s[p+1],m.z=s[p+2];let y=u(m)/2/Math.PI+.5,f=d(m)/Math.PI+.5;a.push(y,1-f)}(function(){let p=new w,y=new w,f=new w,g=new w,v=new ue,_=new ue,x=new ue;for(let M=0,b=0;M<s.length;M+=9,b+=6){p.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),f.set(s[M+6],s[M+7],s[M+8]),v.set(a[b+0],a[b+1]),_.set(a[b+2],a[b+3]),x.set(a[b+4],a[b+5]),g.copy(p).add(y).add(f).divideScalar(3);let L=u(g);h(v,b+0,p,L),h(_,b+2,y,L),h(x,b+4,f,L)}})(),(function(){for(let p=0;p<a.length;p+=6){let y=a[p+0],f=a[p+2],g=a[p+4],v=Math.max(y,f,g),_=Math.min(y,f,g);v>.9&&_<.1&&(y<.2&&(a[p+0]+=1),f<.2&&(a[p+2]+=1),g<.2&&(a[p+4]+=1))}})()})(),this.setAttribute("position",new Le(s,3)),this.setAttribute("normal",new Le(s.slice(),3)),this.setAttribute("uv",new Le(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},ga=class r extends Di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ks=new w,$s=new w,Fo=new w,Qs=new fi,va=class extends mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(sa*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},m=[];for(let p=0;p<c;p+=3){a?(l[0]=a.getX(p),l[1]=a.getX(p+1),l[2]=a.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:y,b:f,c:g}=Qs;if(y.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Qs.getNormal(Fo),u[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,u[1]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let v=0;v<3;v++){let _=(v+1)%3,x=u[v],M=u[_],b=Qs[h[v]],L=Qs[h[_]],O=`${x}_${M}`,U=`${M}_${x}`;U in d&&d[U]?(Fo.dot(d[U].normal)<=s&&(m.push(b.x,b.y,b.z),m.push(L.x,L.y,L.z)),d[U]=null):O in d||(d[O]={index0:l[v],index1:l[_],normal:Fo.clone()})}}for(let p in d)if(d[p]){let{index0:y,index1:f}=d[p];Ks.fromBufferAttribute(o,y),$s.fromBufferAttribute(o,f),m.push(Ks.x,Ks.y,Ks.z),m.push($s.x,$s.y,$s.z)}this.setAttribute("position",new Le(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ue:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new w,i=[],s=[],a=[],o=new w,c=new Ye;for(let m=0;m<=e;m++){let p=m/e;i[m]=this.getTangentAt(p,new w)}s[0]=new w,a[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(dt(i[m-1].dot(i[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(o,p))}a[m].crossVectors(i[m],s[m])}if(t===!0){let m=Math.acos(dt(s[0].dot(s[e]),-1,1));m/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],m*p)),a[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},br=class extends Nn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},_a=class extends br{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Wl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,m=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,m*=h,i(a,o,d,m)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var ea=new w,Bo=new Wl,Oo=new Wl,zo=new Wl,Mt=class extends Nn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(ea.subVectors(i[0],i[1]).add(i[0]),o=ea);let u=i[l%s],d=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(ea.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=ea),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,p=Math.pow(o.distanceToSquared(u),m),y=Math.pow(u.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(c),m);y<1e-4&&(y=1),p<1e-4&&(p=y),f<1e-4&&(f=y),Bo.initNonuniformCatmullRom(o.x,u.x,d.x,c.x,p,y,f),Oo.initNonuniformCatmullRom(o.y,u.y,d.y,c.y,p,y,f),zo.initNonuniformCatmullRom(o.z,u.z,d.z,c.z,p,y,f)}else this.curveType==="catmullrom"&&(Bo.initCatmullRom(o.x,u.x,d.x,c.x,this.tension),Oo.initCatmullRom(o.y,u.y,d.y,c.y,this.tension),zo.initCatmullRom(o.z,u.z,d.z,c.z,this.tension));return n.set(Bo.calc(h),Oo.calc(h),zo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function kc(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Yr(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function Zr(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var us=class extends Nn{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ya=class extends Nn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zr(e,i.x,s.x,a.x,o.x),Zr(e,i.y,s.y,a.y,o.y),Zr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ds=class extends Nn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xa=class extends Nn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ps=class extends Nn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ms=class extends Nn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Yr(e,i.x,s.x,a.x),Yr(e,i.y,s.y,a.y),Yr(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fs=class extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(kc(o,c.x,l.x,h.x,u.x),kc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ue().fromArray(i))}return this}},Ma=Object.freeze({__proto__:null,ArcCurve:_a,CatmullRomCurve3:Mt,CubicBezierCurve:us,CubicBezierCurve3:ya,EllipseCurve:br,LineCurve:ds,LineCurve3:xa,QuadraticBezierCurve:ps,QuadraticBezierCurve3:ms,SplineCurve:fs}),Sa=class extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ma[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ma[i.type]().fromJSON(i))}return this}},gn=class extends Sa{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ds(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new ps(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new us(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new fs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new br(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ht=class extends gn{constructor(e){super(e),this.uuid=Ki(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new gn().fromJSON(i))}return this}};function sd(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Vc(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,d,m){let p=[];for(let y=0,f=u.length;y<f;y++){let g=Vc(h,u[y]*m,y<f-1?u[y+1]*m:h.length,m,!1);g===g.next&&(g.steiner=!0),p.push(pd(g))}p.sort(hd);for(let y=0;y<p.length;y++)d=ud(p[y],d);return d})(r,e,s,t)),r.length>80*t){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let m=r[d],p=r[d+1];m<o&&(o=m),p<c&&(c=p),m>h&&(h=m),p>u&&(u=p)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return gs(s,a,t,o,c,l,0),a}function Vc(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,d=c-l;u<c;u+=l)h+=(a[d]-a[u])*(a[u+1]+a[d+1]),d=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Hc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Hc(a/n|0,r[a],r[a+1],s);return s&&wr(s,s.next)&&(_s(s),s=s.next),s}function Wi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!wr(n,n.next)&&Vt(n.prev,n,n.next)!==0)n=n.next;else{if(_s(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function gs(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let d=c;do d.z===0&&(d.z=Zo(d.x,d.y,l,h,u)),d.prevZ=d.prev,d.nextZ=d.next,d=d.next;while(d!==c);d.prevZ.nextZ=null,d.prevZ=null,(function(m){let p,y=1;do{let f,g=m;m=null;let v=null;for(p=0;g;){p++;let _=g,x=0;for(let b=0;b<y&&(x++,_=_.nextZ,_);b++);let M=y;for(;x>0||M>0&&_;)x!==0&&(M===0||!_||g.z<=_.z)?(f=g,g=g.nextZ,x--):(f=_,_=_.nextZ,M--),v?v.nextZ=f:m=f,f.prevZ=v,v=f;g=_}v.nextZ=null,y*=2}while(p>1)})(d)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?od(r,n,i,s):ad(r))e.push(c.i,r.i,l.i),_s(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?gs(r=ld(Wi(r),e),e,t,n,i,s,2):a===2&&cd(r,e,t,n,i,s):gs(Wi(r),e,t,n,i,s,1);break}}}function ad(r){let e=r.prev,t=r,n=r.next;if(Vt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),d=Math.max(i,s,a),m=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=m&&qr(i,o,s,c,a,l,p.x,p.y)&&Vt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function od(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Vt(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,m=Math.min(o,c,l),p=Math.min(h,u,d),y=Math.max(o,c,l),f=Math.max(h,u,d),g=Zo(m,p,e,t,n),v=Zo(y,f,e,t,n),_=r.prevZ,x=r.nextZ;for(;_&&_.z>=g&&x&&x.z<=v;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&qr(o,h,c,u,l,d,_.x,_.y)&&Vt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=m&&x.x<=y&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&qr(o,h,c,u,l,d,x.x,x.y)&&Vt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=m&&_.x<=y&&_.y>=p&&_.y<=f&&_!==i&&_!==a&&qr(o,h,c,u,l,d,_.x,_.y)&&Vt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=m&&x.x<=y&&x.y>=p&&x.y<=f&&x!==i&&x!==a&&qr(o,h,c,u,l,d,x.x,x.y)&&Vt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ld(r,e){let t=r;do{let n=t.prev,i=t.next.next;!wr(n,i)&&jh(n,t,t.next,i)&&vs(n,i)&&vs(i,n)&&(e.push(n.i,t.i,i.i),_s(t),_s(t.next),t=r=i),t=t.next}while(t!==r);return Wi(t)}function cd(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&md(a,o)){let c=qh(a,o);return a=Wi(a,a.next),c=Wi(c,c.next),gs(a,e,t,n,i,s,0),void gs(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function hd(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function ud(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(wr(i,a))return a;do{if(wr(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let y=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(y<=o&&y>h&&(h=y,l=a.x<a.next.x?a:a.next,y===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,d=l.x,m=l.y,p=1/0;a=l;do{if(o>=a.x&&a.x>=d&&o!==a.x&&Xh(c<m?o:h,c,d,m,c<m?h:o,c,a.x,a.y)){let y=Math.abs(c-a.y)/(o-a.x);vs(a,i)&&(y<p||y===p&&(a.x>l.x||a.x===l.x&&dd(l,a)))&&(l=a,p=y)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=qh(t,r);return Wi(n,n.next),Wi(t,t.next)}function dd(r,e){return Vt(r.prev,r,e.prev)<0&&Vt(e.next,r,r.next)<0}function Zo(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function pd(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Xh(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function qr(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&Xh(r,e,t,n,i,s,a,o)}function md(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&jh(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(vs(r,e)&&vs(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(Vt(r.prev,r,e.prev)||Vt(r,e.prev,e))||wr(r,e)&&Vt(r.prev,r,r.next)>0&&Vt(e.prev,e,e.next)>0)}function Vt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function wr(r,e){return r.x===e.x&&r.y===e.y}function jh(r,e,t,n){let i=na(Vt(r,e,t)),s=na(Vt(r,e,n)),a=na(Vt(t,n,r)),o=na(Vt(t,n,e));return i!==s&&a!==o||!(i!==0||!ta(r,t,e))||!(s!==0||!ta(r,n,e))||!(a!==0||!ta(t,r,n))||!(o!==0||!ta(t,e,n))}function ta(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function na(r){return r>0?1:r<0?-1:0}function vs(r,e){return Vt(r.prev,r,r.next)<0?Vt(r,e,r.next)>=0&&Vt(r,r.prev,e)>=0:Vt(r,e,r.prev)<0||Vt(r,r.next,e)<0}function qh(r,e){let t=Jo(r.i,r.x,r.y),n=Jo(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Hc(r,e,t,n){let i=Jo(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function _s(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Jo(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Ko=class{static triangulate(e,t,n=2){return sd(e,t,n)}},ti=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Wc(e),Xc(n,e);let a=e.length;t.forEach(Wc);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Xc(n,t[c]);let o=Ko.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Wc(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Xc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Ut=class r extends mt{constructor(e=new Ht([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,m=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:m-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:fd,_,x,M,b,L,O=!1;g&&(_=g.getSpacedPoints(h),O=!0,d=!1,x=g.computeFrenetFrames(h,!1),M=new w,b=new w,L=new w),d||(f=0,m=0,p=0,y=0);let U=o.extractPoints(l),k=U.shape,I=U.holes;if(!ti.isClockWise(k)){k=k.reverse();for(let z=0,S=I.length;z<S;z++){let P=I[z];ti.isClockWise(P)&&(I[z]=P.reverse())}}function D(z){let S=10000000000000001e-36,P=z[0];for(let G=1;G<=z.length;G++){let F=G%z.length,ae=z[F],Y=ae.x-P.x,$=ae.y-P.y,xe=Y*Y+$*$,Fe=Math.max(Math.abs(ae.x),Math.abs(ae.y),Math.abs(P.x),Math.abs(P.y));xe<=S*Fe*Fe?(z.splice(F,1),G--):P=ae}}D(k),I.forEach(D);let K=I.length,V=k;for(let z=0;z<K;z++){let S=I[z];k=k.concat(S)}function j(z,S,P){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(S,P)}let ie=k.length;function de(z,S,P){let G,F,ae,Y=z.x-S.x,$=z.y-S.y,xe=P.x-z.x,Fe=P.y-z.y,ye=Y*Y+$*$,Pe=Y*Fe-$*xe;if(Math.abs(Pe)>Number.EPSILON){let Ge=Math.sqrt(ye),je=Math.sqrt(xe*xe+Fe*Fe),lt=S.x-$/Ge,_e=S.y+Y/Ge,Be=((P.x-Fe/je-lt)*Fe-(P.y+xe/je-_e)*xe)/(Y*Fe-$*xe);G=lt+Y*Be-z.x,F=_e+$*Be-z.y;let Me=G*G+F*F;if(Me<=2)return new ue(G,F);ae=Math.sqrt(Me/2)}else{let Ge=!1;Y>Number.EPSILON?xe>Number.EPSILON&&(Ge=!0):Y<-Number.EPSILON?xe<-Number.EPSILON&&(Ge=!0):Math.sign($)===Math.sign(Fe)&&(Ge=!0),Ge?(G=-$,F=Y,ae=Math.sqrt(ye)):(G=Y,F=$,ae=Math.sqrt(ye/2))}return new ue(G/ae,F/ae)}let le=[];for(let z=0,S=V.length,P=S-1,G=z+1;z<S;z++,P++,G++)P===S&&(P=0),G===S&&(G=0),le[z]=de(V[z],V[P],V[G]);let be=[],te,ce,we=le.concat();for(let z=0,S=K;z<S;z++){let P=I[z];te=[];for(let G=0,F=P.length,ae=F-1,Y=G+1;G<F;G++,ae++,Y++)ae===F&&(ae=0),Y===F&&(Y=0),te[G]=de(P[G],P[ae],P[Y]);be.push(te),we=we.concat(te)}if(f===0)ce=ti.triangulateShape(V,I);else{let z=[],S=[];for(let P=0;P<f;P++){let G=P/f,F=m*Math.cos(G*Math.PI/2),ae=p*Math.sin(G*Math.PI/2)+y;for(let Y=0,$=V.length;Y<$;Y++){let xe=j(V[Y],le[Y],ae);Z(xe.x,xe.y,-F),G===0&&z.push(xe)}for(let Y=0,$=K;Y<$;Y++){let xe=I[Y];te=be[Y];let Fe=[];for(let ye=0,Pe=xe.length;ye<Pe;ye++){let Ge=j(xe[ye],te[ye],ae);Z(Ge.x,Ge.y,-F),G===0&&Fe.push(Ge)}G===0&&S.push(Fe)}}ce=ti.triangulateShape(z,S)}let he=ce.length,ge=p+y;for(let z=0;z<ie;z++){let S=d?j(k[z],we[z],ge):k[z];O?(b.copy(x.normals[0]).multiplyScalar(S.x),M.copy(x.binormals[0]).multiplyScalar(S.y),L.copy(_[0]).add(b).add(M),Z(L.x,L.y,L.z)):Z(S.x,S.y,0)}for(let z=1;z<=h;z++)for(let S=0;S<ie;S++){let P=d?j(k[S],we[S],ge):k[S];O?(b.copy(x.normals[z]).multiplyScalar(P.x),M.copy(x.binormals[z]).multiplyScalar(P.y),L.copy(_[z]).add(b).add(M),Z(L.x,L.y,L.z)):Z(P.x,P.y,u/h*z)}for(let z=f-1;z>=0;z--){let S=z/f,P=m*Math.cos(S*Math.PI/2),G=p*Math.sin(S*Math.PI/2)+y;for(let F=0,ae=V.length;F<ae;F++){let Y=j(V[F],le[F],G);Z(Y.x,Y.y,u+P)}for(let F=0,ae=I.length;F<ae;F++){let Y=I[F];te=be[F];for(let $=0,xe=Y.length;$<xe;$++){let Fe=j(Y[$],te[$],G);O?Z(Fe.x,Fe.y+_[h-1].y,_[h-1].x+P):Z(Fe.x,Fe.y,u+P)}}}function pe(z,S){let P=z.length;for(;--P>=0;){let G=P,F=P-1;F<0&&(F=z.length-1);for(let ae=0,Y=h+2*f;ae<Y;ae++){let $=ie*ae,xe=ie*(ae+1);A(S+G+$,S+F+$,S+F+xe,S+G+xe)}}}function Z(z,S,P){c.push(z),c.push(S),c.push(P)}function Ce(z,S,P){E(z),E(S),E(P);let G=i.length/3,F=v.generateTopUV(n,i,G-3,G-2,G-1);W(F[0]),W(F[1]),W(F[2])}function A(z,S,P,G){E(z),E(S),E(G),E(S),E(P),E(G);let F=i.length/3,ae=v.generateSideWallUV(n,i,F-6,F-3,F-2,F-1);W(ae[0]),W(ae[1]),W(ae[3]),W(ae[1]),W(ae[2]),W(ae[3])}function E(z){i.push(c[3*z+0]),i.push(c[3*z+1]),i.push(c[3*z+2])}function W(z){s.push(z.x),s.push(z.y)}(function(){let z=i.length/3;if(d){let S=0,P=ie*S;for(let G=0;G<he;G++){let F=ce[G];Ce(F[2]+P,F[1]+P,F[0]+P)}S=h+2*f,P=ie*S;for(let G=0;G<he;G++){let F=ce[G];Ce(F[0]+P,F[1]+P,F[2]+P)}}else{for(let S=0;S<he;S++){let P=ce[S];Ce(P[2],P[1],P[0])}for(let S=0;S<he;S++){let P=ce[S];Ce(P[0]+ie*h,P[1]+ie*h,P[2]+ie*h)}}n.addGroup(z,i.length/3-z,0)})(),(function(){let z=i.length/3,S=0;pe(V,S),S+=V.length;for(let P=0,G=I.length;P<G;P++){let F=I[P];pe(F,S),S+=F.length}n.addGroup(z,i.length/3-z,1)})()}this.setAttribute("position",new Le(i,3)),this.setAttribute("uv",new Le(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ma[i.type]().fromJSON(i)),new r(n,e.options)}},fd={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new ue(s,a),new ue(o,c),new ue(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],m=e[3*i+1],p=e[3*i+2],y=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ue(a,1-c),new ue(l,1-u),new ue(d,1-p),new ue(y,1-g)]:[new ue(o,1-c),new ue(h,1-u),new ue(m,1-p),new ue(f,1-g)]}},Ta=class r extends Di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},xi=class r extends mt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=dt(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new w,d=new ue,m=new w,p=new w,y=new w,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,y.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(y.x,y.y,y.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,m.x=1*g,m.y=-f,m.z=0*g,p.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),c.push(m.x,m.y,m.z),y.copy(p)}for(let v=0;v<=t;v++){let _=n+v*h*i,x=Math.sin(_),M=Math.cos(_);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*M,a.push(u.x,u.y,u.z),d.x=v/t,d.y=b/(e.length-1),o.push(d.x,d.y);let L=c[3*b+0]*x,O=c[3*b+1],U=c[3*b+0]*M;l.push(L,O,U)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let x=_+v*e.length,M=x,b=x+e.length,L=x+e.length+1,O=x+1;s.push(M,b,O),s.push(L,O,b)}this.setIndex(s),this.setAttribute("position",new Le(a,3)),this.setAttribute("uv",new Le(o,2)),this.setAttribute("normal",new Le(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},Er=class r extends Di{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Zt=class r extends mt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,m=[],p=[],y=[],f=[];for(let g=0;g<h;g++){let v=g*d-a;for(let _=0;_<l;_++){let x=_*u-s;p.push(x,-v,0),y.push(0,0,1),f.push(_/o),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let _=v+l*g,x=v+l*(g+1),M=v+1+l*(g+1),b=v+1+l*g;m.push(_,x,b),m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Le(p,3)),this.setAttribute("normal",new Le(y,3)),this.setAttribute("uv",new Le(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},ba=class r extends mt{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),m=new w,p=new ue;for(let y=0;y<=i;y++){for(let f=0;f<=n;f++){let g=s+f/n*a;m.x=u*Math.cos(g),m.y=u*Math.sin(g),c.push(m.x,m.y,m.z),l.push(0,0,1),p.x=(m.x/t+1)/2,p.y=(m.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let y=0;y<i;y++){let f=y*(n+1);for(let g=0;g<n;g++){let v=g+f,_=v,x=v+n+1,M=v+n+2,b=v+1;o.push(_,x,b),o.push(x,M,b)}}this.setIndex(o),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(l,3)),this.setAttribute("uv",new Le(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Xi=class r extends mt{constructor(e=new Ht([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,d=h.extractPoints(t),m=d.shape,p=d.holes;ti.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,g=p.length;f<g;f++){let v=p[f];ti.isClockWise(v)===!0&&(p[f]=v.reverse())}let y=ti.triangulateShape(m,p);for(let f=0,g=p.length;f<g;f++){let v=p[f];m=m.concat(v)}for(let f=0,g=m.length;f<g;f++){let v=m[f];i.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=y.length;f<g;f++){let v=y[f],_=v[0]+u,x=v[1]+u,M=v[2]+u;n.push(_,x,M),c+=3}}this.setIndex(n),this.setAttribute("position",new Le(i,3)),this.setAttribute("normal",new Le(s,3)),this.setAttribute("uv",new Le(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Jt=class r extends mt{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new w,d=new w,m=[],p=[],y=[],f=[];for(let g=0;g<=n;g++){let v=[],_=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let b=M/t;u.x=-e*Math.cos(i+b*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+b*s)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),f.push(b+x,1-_),v.push(l++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let _=h[g][v+1],x=h[g][v],M=h[g+1][v],b=h[g+1][v+1];(g!==0||a>0)&&m.push(_,x,b),(g!==n-1||c<Math.PI)&&m.push(x,M,b)}this.setIndex(m),this.setAttribute("position",new Le(p,3)),this.setAttribute("normal",new Le(y,3)),this.setAttribute("uv",new Le(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},wa=class r extends Di{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},St=class r extends mt{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new w,u=new w,d=new w;for(let m=0;m<=n;m++)for(let p=0;p<=i;p++){let y=p/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(y),u.y=(e+t*Math.cos(f))*Math.sin(y),u.z=t*Math.sin(f),o.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let p=1;p<=i;p++){let y=(i+1)*m+p-1,f=(i+1)*(m-1)+p-1,g=(i+1)*(m-1)+p,v=(i+1)*m+p;a.push(y,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new Le(o,3)),this.setAttribute("normal",new Le(c,3)),this.setAttribute("uv",new Le(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Ea=class r extends mt{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new w,d=new w,m=new w,p=new w,y=new w,f=new w,g=new w;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;v(x,s,a,e,m),v(x+.01,s,a,e,p),f.subVectors(p,m),g.addVectors(p,m),y.crossVectors(f,g),g.crossVectors(y,f),y.normalize(),g.normalize();for(let M=0;M<=i;++M){let b=M/i*Math.PI*2,L=-t*Math.cos(b),O=t*Math.sin(b);u.x=m.x+(L*g.x+O*y.x),u.y=m.y+(L*g.y+O*y.y),u.z=m.z+(L*g.z+O*y.z),c.push(u.x,u.y,u.z),d.subVectors(u,m).normalize(),l.push(d.x,d.y,d.z),h.push(_/n),h.push(M/i)}}for(let _=1;_<=n;_++)for(let x=1;x<=i;x++){let M=(i+1)*(_-1)+(x-1),b=(i+1)*_+(x-1),L=(i+1)*_+x,O=(i+1)*(_-1)+x;o.push(M,b,O),o.push(b,L,O)}function v(_,x,M,b,L){let O=Math.cos(_),U=Math.sin(_),k=M/x*_,I=Math.cos(k);L.x=b*(2+I)*.5*O,L.y=b*(2+I)*U*.5,L.z=b*Math.sin(k)*.5}this.setIndex(o),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(l,3)),this.setAttribute("uv",new Le(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Tt=class r extends mt{constructor(e=new ms(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new w,c=new w,l=new ue,h=new w,u=[],d=[],m=[],p=[];function y(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let _=0;_<=i;_++){let x=_/i*Math.PI*2,M=Math.sin(x),b=-Math.cos(x);c.x=b*g.x+M*v.x,c.y=b*g.y+M*v.y,c.z=b*g.z+M*v.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)y(f);y(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=i;g++)l.x=f/t,l.y=g/i,m.push(l.x,l.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=i;g++){let v=(i+1)*(f-1)+(g-1),_=(i+1)*f+(g-1),x=(i+1)*f+g,M=(i+1)*(f-1)+g;p.push(v,_,M),p.push(_,x,M)}})()})(),this.setIndex(p),this.setAttribute("position",new Le(u,3)),this.setAttribute("normal",new Le(d,3)),this.setAttribute("uv",new Le(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Ma[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Aa=class extends mt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new w,s=new w;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start;for(let m=d,p=d+u.count;m<p;m+=3)for(let y=0;y<3;y++){let f=o.getX(m+y),g=o.getX(m+(y+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),jc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),jc(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Le(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function jc(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var zm=Object.freeze({__proto__:null,BoxGeometry:$e,CapsuleGeometry:Tr,CircleGeometry:Vn,ConeGeometry:fa,CylinderGeometry:Xe,DodecahedronGeometry:ga,EdgesGeometry:va,ExtrudeGeometry:Ut,IcosahedronGeometry:Ta,LatheGeometry:xi,OctahedronGeometry:Er,PlaneGeometry:Zt,PolyhedronGeometry:Di,RingGeometry:ba,ShapeGeometry:Xi,SphereGeometry:Jt,TetrahedronGeometry:wa,TorusGeometry:St,TorusKnotGeometry:Ea,TubeGeometry:Tt,WireframeGeometry:Aa}),ys=class extends yi{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ze(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var gt=class extends yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Sn=class extends gt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ar=class extends yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ca=class extends yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ia(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function gd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ji=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ra=class extends ji{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wo,endingEnd:Wo}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Xo:s=e,o=2*t-n;break;case jo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Xo:a=e,c=2*n-t;break;case jo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,p=(n-t)/(i-t),y=p*p,f=y*p,g=-d*f+2*d*y-d*p,v=(1+d)*f+(-1.5-2*d)*y+(-.5+d)*p+1,_=(-1-m)*f+(1.5+m)*y+.5*p,x=m*f-m*y;for(let M=0;M!==o;++M)s[M]=g*a[h+M]+v*a[l+M]+_*a[c+M]+x*a[u+M];return s}},Pa=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}},Ia=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ln=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ia(t,this.TimeBufferType),this.values=ia(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ia(e.times,Array),values:ia(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Pa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ra(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case oa:t=this.InterpolantFactoryMethodLinear;break;case ra:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return oa;case this.InterpolantFactoryMethodSmooth:return ra}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&gd(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ra,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,d=h+n;for(let m=0;m!==n;++m){let p=t[h+m];if(p!==t[u+m]||p!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Ln.prototype.ValueTypeName="",Ln.prototype.TimeBufferType=Float32Array,Ln.prototype.ValueBufferType=Float32Array,Ln.prototype.DefaultInterpolation=oa;var Pi=class extends Ln{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="bool",Pi.prototype.ValueBufferType=Array,Pi.prototype.DefaultInterpolation=Jr,Pi.prototype.InterpolantFactoryMethodLinear=void 0,Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var La=class extends Ln{constructor(e,t,n,i){super(e,t,n,i)}};La.prototype.ValueTypeName="color";var Da=class extends Ln{constructor(e,t,n,i){super(e,t,n,i)}};Da.prototype.ValueTypeName="number";var Ua=class extends ji{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Dn.slerpFlat(s,0,a,l-o,a,l,c);return s}},xs=class extends Ln{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ua(this.times,this.values,this.getValueSize(),e)}};xs.prototype.ValueTypeName="quaternion",xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends Ln{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string",Ii.prototype.ValueBufferType=Array,Ii.prototype.DefaultInterpolation=Jr,Ii.prototype.InterpolantFactoryMethodLinear=void 0,Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends Ln{constructor(e,t,n,i){super(e,t,n,i)}};Na.prototype.ValueTypeName="vector";var Fa=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let m=l[u],p=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Yh=new Fa,Ba=class{constructor(e){this.manager=e!==void 0?e:Yh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ba.DEFAULT_MATERIAL_NAME="__DEFAULT";var Cr=class extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Fn=class extends Cr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Go=new Ye,qc=new w,Yc=new w,Oa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Li,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;qc.setFromMatrixPosition(e.matrixWorld),t.position.copy(qc),Yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yc),t.updateMatrixWorld(),Go.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Go,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Zc=new Ye,jr=new w,ko=new w,$o=class extends Oa{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new bt(2,1,1,1),new bt(0,1,1,1),new bt(3,1,1,1),new bt(1,1,1,1),new bt(3,0,1,1),new bt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),jr.setFromMatrixPosition(e.matrixWorld),n.position.copy(jr),ko.copy(n.position),ko.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ko),n.updateMatrixWorld(),i.makeTranslation(-jr.x,-jr.y,-jr.z),Zc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zc,n.coordinateSystem,n.reversedDepth)}},Rr=class extends Cr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new $o}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Mi=class extends xr{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Qo=class extends Oa{constructor(){super(new Mi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},En=class extends Cr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new Qo}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Gm=new Ye,km=new Ye,Vm=new Ye;var za=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Hm=new w,Wm=new Dn,Xm=new w,jm=new w,qm=new w;var Ym=new w,Zm=new Dn,Jm=new w,Km=new w;var Xl="\\[\\]\\.:\\/",vd=new RegExp("["+Xl+"]","g"),Vo="[^"+Xl+"]",_d="[^"+Xl.replace("\\.","")+"]",yd=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Vo)+/(WCOD+)?/.source.replace("WCOD",_d)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vo)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vo)+"$"),xd=["material","materials","bones","map"],Dt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vd,"")}static parseTrackName(e){let t=yd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);xd.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Dt.Composite=class{constructor(r,e,t){let n=t||Dt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray],Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $m=new Float32Array(1);var Qm=new Ye;var ef=new ue;var tf=new w,nf=new w,rf=new w,sf=new w,af=new w,of=new w,lf=new w;var cf=new w;var hf=new w,uf=new Ye,df=new Ye;var pf=new w,mf=new Ze,ff=new Ze;var gf=new w,vf=new w,_f=new w;var yf=new w,xf=new xr;var Mf=new cn;var Sf=new w;function jl(r,e,t,n){let i=(function(s){switch(s){case ai:case al:return{byteLength:1,components:1};case Dr:case ol:case Ni:return{byteLength:2,components:1};case $a:case Qa:return{byteLength:2,components:4};case Zi:case Ka:case Hn:return{byteLength:4,components:1};case ll:case cl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case eo:case to:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case Wn:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function _u(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Sd(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<l.length;u++){let d=l[h],m=l[u];m.start<=d.start+d.count+1?d.count=Math.max(d.count,m.start+m.count-d.start):(++h,l[h]=m)}l.length=h+1;for(let u=0,d=l.length;u<d;u++){let m=l[u];r.bufferSubData(o,m.start*c.BYTES_PER_ELEMENT,c,m.start,m.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var ut={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Ne={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},oi={basic:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ze(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:vn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:vn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Ze(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:vn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:vn([Ne.points,Ne.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:vn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:vn([Ne.common,Ne.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:vn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:vn([Ne.sprite,Ne.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:vn([Ne.common,Ne.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:vn([Ne.lights,Ne.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};oi.physical={uniforms:vn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var oo={r:0,b:0,g:0},Qi=new Jn,Td=new Ye;function bd(r,e,t,n,i,s,a){let o=new Ze(0),c,l,h=s===!0?0:1,u=null,d=0,m=null;function p(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function y(f,g){f.getRGB(oo,Hl(r)),n.buffers.color.setClear(oo.r,oo.g,oo.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,y(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,y(o,h)},render:function(f){let g=!1,v=p(f);v===null?y(o,h):v&&v.isColor&&(y(v,1),g=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,g){let v=p(g);v&&(v.isCubeTexture||v.mapping===Ts)?(l===void 0&&(l=new tt(new $e(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:$i(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Qi.copy(g.backgroundRotation),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),l.material.uniforms.envMap.value=v,l.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Td.makeRotationFromEuler(Qi)),l.material.toneMapped=xt.getTransfer(v.colorSpace)!==Rt,u===v&&d===v.version&&m===r.toneMapping||(l.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new tt(new Zt(2,2),new fn({name:"BackgroundMaterial",uniforms:$i(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=xt.getTransfer(v.colorSpace)!==Rt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),u===v&&d===v.version&&m===r.toneMapping||(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}}}function wd(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let v=[],_=[],x=[];for(let M=0;M<t;M++)v[M]=0,_[M]=0,x[M]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:_,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,_=g.length;v<_;v++)g[v]=0}function u(g){d(g,0)}function d(g,v){let _=s.newAttributes,x=s.enabledAttributes,M=s.attributeDivisors;_[g]=1,x[g]===0&&(r.enableVertexAttribArray(g),x[g]=1),M[g]!==v&&(r.vertexAttribDivisor(g,v),M[g]=v)}function m(){let g=s.newAttributes,v=s.enabledAttributes;for(let _=0,x=v.length;_<x;_++)v[_]!==g[_]&&(r.disableVertexAttribArray(_),v[_]=0)}function p(g,v,_,x,M,b,L){L===!0?r.vertexAttribIPointer(g,v,_,M,b):r.vertexAttribPointer(g,v,_,x,M,b)}function y(){f(),a=!0,s!==i&&(s=i,o(s.object))}function f(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,v,_,x,M){let b=!1,L=(function(O,U,k){let I=k.wireframe===!0,D=n[O.id];D===void 0&&(D={},n[O.id]=D);let K=D[U.id];K===void 0&&(K={},D[U.id]=K);let V=K[I];return V===void 0&&(V=l(r.createVertexArray()),K[I]=V),V})(x,_,v);s!==L&&(s=L,o(s.object)),b=(function(O,U,k,I){let D=s.attributes,K=U.attributes,V=0,j=k.getAttributes();for(let ie in j)if(j[ie].location>=0){let de=D[ie],le=K[ie];if(le===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(le=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(le=O.instanceColor)),de===void 0||de.attribute!==le||le&&de.data!==le.data)return!0;V++}return s.attributesNum!==V||s.index!==I})(g,x,_,M),b&&(function(O,U,k,I){let D={},K=U.attributes,V=0,j=k.getAttributes();for(let ie in j)if(j[ie].location>=0){let de=K[ie];de===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(de=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(de=O.instanceColor));let le={};le.attribute=de,de&&de.data&&(le.data=de.data),D[ie]=le,V++}s.attributes=D,s.attributesNum=V,s.index=I})(g,x,_,M),M!==null&&e.update(M,r.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,U,k,I){h();let D=I.attributes,K=k.getAttributes(),V=U.defaultAttributeValues;for(let j in K){let ie=K[j];if(ie.location>=0){let de=D[j];if(de===void 0&&(j==="instanceMatrix"&&O.instanceMatrix&&(de=O.instanceMatrix),j==="instanceColor"&&O.instanceColor&&(de=O.instanceColor)),de!==void 0){let le=de.normalized,be=de.itemSize,te=e.get(de);if(te===void 0)continue;let ce=te.buffer,we=te.type,he=te.bytesPerElement,ge=we===r.INT||we===r.UNSIGNED_INT||de.gpuType===Ka;if(de.isInterleavedBufferAttribute){let pe=de.data,Z=pe.stride,Ce=de.offset;if(pe.isInstancedInterleavedBuffer){for(let A=0;A<ie.locationSize;A++)d(ie.location+A,pe.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let A=0;A<ie.locationSize;A++)u(ie.location+A);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let A=0;A<ie.locationSize;A++)p(ie.location+A,be/ie.locationSize,we,le,Z*he,(Ce+be/ie.locationSize*A)*he,ge)}else{if(de.isInstancedBufferAttribute){for(let pe=0;pe<ie.locationSize;pe++)d(ie.location+pe,de.meshPerAttribute);O.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let pe=0;pe<ie.locationSize;pe++)u(ie.location+pe);r.bindBuffer(r.ARRAY_BUFFER,ce);for(let pe=0;pe<ie.locationSize;pe++)p(ie.location+pe,be/ie.locationSize,we,le,be*he,be/ie.locationSize*pe*he,ge)}}else if(V!==void 0){let le=V[j];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(ie.location,le);break;case 3:r.vertexAttrib3fv(ie.location,le);break;case 4:r.vertexAttrib4fv(ie.location,le);break;default:r.vertexAttrib1fv(ie.location,le)}}}}m()})(g,v,_,x),M!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(M).buffer))},reset:y,resetDefaultState:f,dispose:function(){y();for(let g in n){let v=n[g];for(let _ in v){let x=v[_];for(let M in x)c(x[M].object),delete x[M];delete v[_]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let _ in v){let x=v[_];for(let M in x)c(x[M].object),delete x[M];delete v[_]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let _=n[v];if(_[g.id]===void 0)continue;let x=_[g.id];for(let M in x)c(x[M].object),delete x[M];delete _[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:m}}function Ed(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let c=0;for(let l=0;l<o;l++)c+=a[l];t.update(c,n,1)},this.renderMultiDrawInstances=function(s,a,o,c){if(o===0)return;let l=e.get("WEBGL_multi_draw");if(l===null)for(let h=0;h<s.length;h++)i(s[h],a[h],c[h]);else{l.multiDrawArraysInstancedWEBGL(n,s,0,a,0,c,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*c[u];t.update(h,n,1)}}}function Ad(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===Wn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let m=d===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==ai&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Hn&&!m)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function Cd(r){let e=this,t=null,n=0,i=!1,s=!1,a=new ei,o=new ot,c={value:null,needsUpdate:!1};function l(h,u,d,m){let p=h!==null?h.length:0,y=null;if(p!==0){if(y=c.value,m!==!0||y===null){let f=d+4*p,g=u.matrixWorldInverse;o.getNormalMatrix(g),(y===null||y.length<f)&&(y=new Float32Array(f));for(let v=0,_=d;v!==p;++v,_+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(y,_),y[_+3]=a.constant}c.value=y,c.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,y}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,d){let m=h.clippingPlanes,p=h.clipIntersection,y=h.clipShadows,f=r.get(h);if(!i||m===null||m.length===0||s&&!y)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,_=f.clippingState||null;c.value=_,_=l(m,u,v,d);for(let x=0;x!==v;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=g}}}function Rd(r){let e=new WeakMap;function t(i,s){return s===Ya?i.mapping=Lr:s===Za&&(i.mapping=qi),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===Ya||s===Za){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new pa(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}var Zh=[.125,.215,.35,.446,.526,.582],As=20,ql=new Mi,Jh=new Ze,Yl=null,Zl=0,Jl=0,Kl=!1,tr=(1+Math.sqrt(5))/2,Nr=1/tr,Kh=[new w(-tr,Nr,0),new w(tr,Nr,0),new w(-Nr,0,tr),new w(Nr,0,tr),new w(0,tr,-Nr),new w(0,tr,Nr),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Pd=new w,Br=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=Pd}=s;Yl=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yl,Zl,Jl),this._renderer.xr.enabled=Kl,e.scissorTest=!1,lo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Lr||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yl=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Ni,format:Wn,colorSpace:ki,depthBuffer:!1},i=$h(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$h(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+Zh.length;for(let d=0;d<u;d++){let m=Math.pow(2,h);c.push(m);let p=1/m;d>a-4?p=Zh[d-a+4-1]:d===0&&(p=0),l.push(p);let y=1/(m-2),f=-y,g=1+y,v=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,x=6,M=3,b=2,L=1,O=new Float32Array(M*x*_),U=new Float32Array(b*x*_),k=new Float32Array(L*x*_);for(let D=0;D<_;D++){let K=D%3*2/3-1,V=D>2?0:-1,j=[K,V,0,K+2/3,V,0,K+2/3,V+1,0,K,V,0,K+2/3,V+1,0,K,V+1,0];O.set(j,M*x*D),U.set(v,b*x*D);let ie=[D,D,D,D,D,D];k.set(ie,L*x*D)}let I=new mt;I.setAttribute("position",new wn(O,M)),I.setAttribute("uv",new wn(U,b)),I.setAttribute("faceIndex",new wn(k,L)),o.push(I),h>4&&h--}return{lodPlanes:o,sizeLods:c,sigmas:l}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(As),h=new w(0,1,0);return new fn({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:oc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,ql)}_sceneToCubeUV(e,t,n,i,s){let a=new kt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(Jh),l.toneMapping=Si,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null));let d=new kn({name:"PMREM.Background",side:Bn,depthWrite:!1,depthTest:!1}),m=new tt(new $e,d),p=!1,y=e.background;y?y.isColor&&(d.color.copy(y),e.background=null,p=!0):(d.color.copy(Jh),p=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[f]));let v=this._cubeSize;lo(i,g*v,f>2?v:0,v,v),l.setRenderTarget(i),p&&l.render(m,a),l.render(e,a)}m.geometry.dispose(),m.material.dispose(),l.toneMapping=u,l.autoClear=h,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Lr||e.mapping===qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=eu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;lo(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,ql)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Kh[(i-s-1)%Kh.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new tt(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,p=s/m,y=isFinite(s)?1+Math.floor(3*p):As;y>As&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<As;++x){let M=x/p,b=Math.exp(-M*M/2);f.push(b),x===0?g+=b:x<y&&(g+=2*b)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;u.envMap.value=e.texture,u.samples.value=y,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;let _=this._sizeLods[i];lo(t,3*_*(i>v-4?i-v+4:0),4*(this._cubeSize-_),3*_,2*_),c.setRenderTarget(t),c.render(h,ql)}};function $h(r,e,t){let n=new Gn(r,e,t);return n.texture.mapping=Ts,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Qh(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function eu(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function oc(){return`

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
	`}function Id(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===Ya||s===Za,o=s===Lr||s===qi;if(a||o){let c=e.get(i),l=c!==void 0?c.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==l)return t===null&&(t=new Br(r)),c=a?t.fromEquirectangular(i,c):t.fromCubemap(i,c),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),c.texture;if(c!==void 0)return c.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&(function(u){let d=0,m=6;for(let p=0;p<m;p++)u[p]!==void 0&&d++;return d===m})(h)?(t===null&&(t=new Br(r)),c=a?t.fromEquirectangular(i):t.fromCubemap(i),c.texture.pmremVersion=i.pmremVersion,e.set(i,c),i.addEventListener("dispose",n),c.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Ld(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Dd(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,d=0;if(h!==null){let y=h.array;d=h.version;for(let f=0,g=y.length;f<g;f+=3){let v=y[f+0],_=y[f+1],x=y[f+2];l.push(v,_,_,x,x,v)}}else{if(u===void 0)return;{let y=u.array;d=u.version;for(let f=0,g=y.length/3-1;f<g;f+=3){let v=f+0,_=f+1,x=f+2;l.push(v,_,_,x,x,v)}}}let m=new(Vl(l)?ns:Hi)(l,1);m.version=d;let p=s.get(c);p&&e.remove(p),s.set(c,m)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Ud(r,e,t){let n,i,s;function a(o,c,l){l!==0&&(r.drawElementsInstanced(n,c,i,o*s,l),t.update(c,n,l))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,c){r.drawElements(n,c,i,o*s),t.update(c,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,c,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,o,0,l);let h=0;for(let u=0;u<l;u++)h+=c[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,c,l,h){if(l===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,c[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,c,0,i,o,0,h,0,l);let d=0;for(let m=0;m<l;m++)d+=c[m]*h[m];t.update(d,n,1)}}}function Nd(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Fd(r,e,t){let n=new WeakMap,i=new bt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),p===!0&&(v=3);let _=a.attributes.position.count*v,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*x*4*h),b=new es(M,_,x,h);b.type=Hn,b.needsUpdate=!0;let L=4*v;for(let U=0;U<h;U++){let k=y[U],I=f[U],D=g[U],K=_*x*4*U;for(let V=0;V<k.count;V++){let j=V*L;d===!0&&(i.fromBufferAttribute(k,V),M[K+j+0]=i.x,M[K+j+1]=i.y,M[K+j+2]=i.z,M[K+j+3]=0),m===!0&&(i.fromBufferAttribute(I,V),M[K+j+4]=i.x,M[K+j+5]=i.y,M[K+j+6]=i.z,M[K+j+7]=0),p===!0&&(i.fromBufferAttribute(D,V),M[K+j+8]=i.x,M[K+j+9]=i.y,M[K+j+10]=i.z,M[K+j+11]=D.itemSize===4?i.w:1)}}u={count:h,texture:b,size:new ue(_,x)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let p=0;p<c.length;p++)d+=c[p];let m=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",m),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Bd(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,c=a.geometry,l=e.get(a,c);if(i.get(l)!==o&&(e.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return l},dispose:function(){i=new WeakMap}}}var yu=new xn,tu=new cs(1,1),xu=new es,Mu=new ua,Su=new is,nu=[],iu=[],ru=new Float32Array(16),su=new Float32Array(9),au=new Float32Array(4);function Or(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=nu[i];if(s===void 0&&(s=new Float32Array(i),nu[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function tn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function nn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ho(r,e){let t=iu[e];t===void 0&&(t=new Int32Array(e),iu[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Od(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function zd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2fv(this.addr,e),nn(t,e)}}function Gd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;r.uniform3fv(this.addr,e),nn(t,e)}}function kd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4fv(this.addr,e),nn(t,e)}}function Vd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;au.set(n),r.uniformMatrix2fv(this.addr,!1,au),nn(t,n)}}function Hd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;su.set(n),r.uniformMatrix3fv(this.addr,!1,su),nn(t,n)}}function Wd(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;ru.set(n),r.uniformMatrix4fv(this.addr,!1,ru),nn(t,n)}}function Xd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function jd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2iv(this.addr,e),nn(t,e)}}function qd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3iv(this.addr,e),nn(t,e)}}function Yd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4iv(this.addr,e),nn(t,e)}}function Zd(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Jd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2uiv(this.addr,e),nn(t,e)}}function Kd(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3uiv(this.addr,e),nn(t,e)}}function $d(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4uiv(this.addr,e),nn(t,e)}}function Qd(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(tu.compareFunction=Gl,s=tu):s=yu,t.setTexture2D(e||s,i)}function ep(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Mu,i)}function tp(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Su,i)}function np(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xu,i)}function ip(r,e){r.uniform1fv(this.addr,e)}function rp(r,e){let t=Or(e,this.size,2);r.uniform2fv(this.addr,t)}function sp(r,e){let t=Or(e,this.size,3);r.uniform3fv(this.addr,t)}function ap(r,e){let t=Or(e,this.size,4);r.uniform4fv(this.addr,t)}function op(r,e){let t=Or(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function lp(r,e){let t=Or(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function cp(r,e){let t=Or(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function hp(r,e){r.uniform1iv(this.addr,e)}function up(r,e){r.uniform2iv(this.addr,e)}function dp(r,e){r.uniform3iv(this.addr,e)}function pp(r,e){r.uniform4iv(this.addr,e)}function mp(r,e){r.uniform1uiv(this.addr,e)}function fp(r,e){r.uniform2uiv(this.addr,e)}function gp(r,e){r.uniform3uiv(this.addr,e)}function vp(r,e){r.uniform4uiv(this.addr,e)}function _p(r,e,t){let n=this.cache,i=e.length,s=ho(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||yu,s[a])}function yp(r,e,t){let n=this.cache,i=e.length,s=ho(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Mu,s[a])}function xp(r,e,t){let n=this.cache,i=e.length,s=ho(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Su,s[a])}function Mp(r,e,t){let n=this.cache,i=e.length,s=ho(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||xu,s[a])}var Ql=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Od;case 35664:return zd;case 35665:return Gd;case 35666:return kd;case 35674:return Vd;case 35675:return Hd;case 35676:return Wd;case 5124:case 35670:return Xd;case 35667:case 35671:return jd;case 35668:case 35672:return qd;case 35669:case 35673:return Yd;case 5125:return Zd;case 36294:return Jd;case 36295:return Kd;case 36296:return $d;case 35678:case 36198:case 36298:case 36306:case 35682:return Qd;case 35679:case 36299:case 36307:return ep;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return np}})(t.type)}},ec=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return ip;case 35664:return rp;case 35665:return sp;case 35666:return ap;case 35674:return op;case 35675:return lp;case 35676:return cp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return pp;case 5125:return mp;case 36294:return fp;case 36295:return gp;case 36296:return vp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return yp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return Mp}})(t.type)}},tc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},$l=/(\w+)(\])?(\[|\.)?/g;function ou(r,e){r.seq.push(e),r.map[e.id]=e}function Sp(r,e,t){let n=r.name,i=n.length;for($l.lastIndex=0;;){let s=$l.exec(n),a=$l.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){ou(t,l===void 0?new Ql(o,r,e):new ec(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new tc(o),ou(t,h)),t=h}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Sp(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function lu(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Tp=0,cu=new ot;function hu(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),d=Math.min(c+6,l.length);for(let m=u;m<d;m++){let p=m+1;h.push(`${p===c?">":" "} ${p}: ${l[m]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function bp(r,e){let t=(function(n){xt._getMatrix(cu,xt.workingColorSpace,n);let i=`mat3( ${cu.elements.map(s=>s.toFixed(4))} )`;switch(xt.getTransfer(n)){case Kr:return[i,"LinearTransferOETF"];case Rt:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wp(r,e){let t;switch(e){case Mh:t="Linear";break;case Sh:t="Reinhard";break;case Th:t="Cineon";break;case si:t="ACESFilmic";break;case wh:t="AgX";break;case Eh:t="Neutral";break;case bh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var co=new w;function Ep(){return xt.getLuminanceCoefficients(co),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${co.x.toFixed(4)}, ${co.y.toFixed(4)}, ${co.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cs(r){return r!==""}function uu(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function du(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ap=/^[ \t]*#include +<([\w\d./]+)>/gm;function nc(r){return r.replace(Ap,Rp)}var Cp=new Map;function Rp(r,e){let t=ut[e];if(t===void 0){let n=Cp.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return nc(t)}var Pp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pu(r){return r.replace(Pp,Ip)}function Ip(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function mu(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Lp(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(I){let D="SHADOWMAP_TYPE_BASIC";return I.shadowMapType===tl?D="SHADOWMAP_TYPE_PCF":I.shadowMapType===Ga?D="SHADOWMAP_TYPE_PCF_SOFT":I.shadowMapType===ri&&(D="SHADOWMAP_TYPE_VSM"),D})(t),l=(function(I){let D="ENVMAP_TYPE_CUBE";if(I.envMap)switch(I.envMapMode){case Lr:case qi:D="ENVMAP_TYPE_CUBE";break;case Ts:D="ENVMAP_TYPE_CUBE_UV"}return D})(t),h=(function(I){let D="ENVMAP_MODE_REFLECTION";return I.envMap&&I.envMapMode===qi&&(D="ENVMAP_MODE_REFRACTION"),D})(t),u=(function(I){let D="ENVMAP_BLENDING_NONE";if(I.envMap)switch(I.combine){case _h:D="ENVMAP_BLENDING_MULTIPLY";break;case yh:D="ENVMAP_BLENDING_MIX";break;case xh:D="ENVMAP_BLENDING_ADD"}return D})(t),d=(function(I){let D=I.envMapCubeUVHeight;if(D===null)return null;let K=Math.log2(D)-2,V=1/D;return{texelWidth:1/(3*Math.max(Math.pow(2,K),112)),texelHeight:V,maxMip:K}})(t),m=(function(I){return[I.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",I.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)})(t),p=(function(I){let D=[];for(let K in I){let V=I[K];V!==!1&&D.push("#define "+K+" "+V)}return D.join(`
`)})(s),y=i.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cs).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cs).join(`
`),g.length>0&&(g+=`
`)):(f=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),g=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?ut.tonemapping_pars_fragment:"",t.toneMapping!==Si?wp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,bp("linearToOutputTexel",t.outputColorSpace),Ep(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=nc(a),a=uu(a,t),a=du(a,t),o=nc(o),o=uu(o,t),o=du(o,t),a=pu(a),o=pu(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=v+f+a,x=v+g+o,M=lu(i,i.VERTEX_SHADER,_),b=lu(i,i.FRAGMENT_SHADER,x);function L(I){if(r.debug.checkShaderErrors){let D=i.getProgramInfoLog(y)||"",K=i.getShaderInfoLog(M)||"",V=i.getShaderInfoLog(b)||"",j=D.trim(),ie=K.trim(),de=V.trim(),le=!0,be=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(le=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,M,b);else{let te=hu(i,M,"vertex"),ce=hu(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+j+`
`+te+`
`+ce)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):ie!==""&&de!==""||(be=!1);be&&(I.diagnostics={runnable:le,programLog:j,vertexShader:{log:ie,prefix:f},fragmentShader:{log:de,prefix:g}})}i.deleteShader(M),i.deleteShader(b),O=new Fr(i,y),U=(function(D,K){let V={},j=D.getProgramParameter(K,D.ACTIVE_ATTRIBUTES);for(let ie=0;ie<j;ie++){let de=D.getActiveAttrib(K,ie),le=de.name,be=1;de.type===D.FLOAT_MAT2&&(be=2),de.type===D.FLOAT_MAT3&&(be=3),de.type===D.FLOAT_MAT4&&(be=4),V[le]={type:de.type,location:D.getAttribLocation(K,le),locationSize:be}}return V})(i,y)}let O,U;i.attachShader(y,M),i.attachShader(y,b),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y),this.getUniforms=function(){return O===void 0&&L(this),O},this.getAttributes=function(){return U===void 0&&L(this),U};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(y,37297)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tp++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=b,this}var Dp=0,ic=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new rc(e),t.set(e,n)),n}},rc=class{constructor(e){this.id=Dp++,this.code=e,this.usedTimes=0}};function Up(r,e,t,n,i,s,a){let o=new ts,c=new ic,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,_,x){let M=_.fog,b=x.geometry,L=f.isMeshStandardMaterial?_.environment:null,O=(f.isMeshStandardMaterial?t:e).get(f.envMap||L),U=O&&O.mapping===Ts?O.image.height:null,k=p[f.type];f.precision!==null&&(m=i.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));let I=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,D=I!==void 0?I.length:0,K,V,j,ie,de=0;if(b.morphAttributes.position!==void 0&&(de=1),b.morphAttributes.normal!==void 0&&(de=2),b.morphAttributes.color!==void 0&&(de=3),k){let yt=oi[k];K=yt.vertexShader,V=yt.fragmentShader}else K=f.vertexShader,V=f.fragmentShader,c.update(f),j=c.getVertexShaderID(f),ie=c.getFragmentShaderID(f);let le=r.getRenderTarget(),be=r.state.buffers.depth.getReversed(),te=x.isInstancedMesh===!0,ce=x.isBatchedMesh===!0,we=!!f.map,he=!!f.matcap,ge=!!O,pe=!!f.aoMap,Z=!!f.lightMap,Ce=!!f.bumpMap,A=!!f.normalMap,E=!!f.displacementMap,W=!!f.emissiveMap,z=!!f.metalnessMap,S=!!f.roughnessMap,P=f.anisotropy>0,G=f.clearcoat>0,F=f.dispersion>0,ae=f.iridescence>0,Y=f.sheen>0,$=f.transmission>0,xe=P&&!!f.anisotropyMap,Fe=G&&!!f.clearcoatMap,ye=G&&!!f.clearcoatNormalMap,Pe=G&&!!f.clearcoatRoughnessMap,Ge=ae&&!!f.iridescenceMap,je=ae&&!!f.iridescenceThicknessMap,lt=Y&&!!f.sheenColorMap,_e=Y&&!!f.sheenRoughnessMap,Be=!!f.specularMap,Me=!!f.specularColorMap,Te=!!f.specularIntensityMap,We=$&&!!f.transmissionMap,vt=$&&!!f.thicknessMap,Ae=!!f.gradientMap,nt=!!f.alphaMap,it=f.alphaTest>0,rn=!!f.alphaHash,hn=!!f.extensions,H=Si;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(H=r.toneMapping));let Ot={shaderID:k,shaderType:f.type,shaderName:f.name,vertexShader:K,fragmentShader:V,defines:f.defines,customVertexShaderID:j,customFragmentShaderID:ie,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:ce,batchingColor:ce&&x._colorsTexture!==null,instancing:te,instancingColor:te&&x.instanceColor!==null,instancingMorph:te&&x.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:ki,alphaToCoverage:!!f.alphaToCoverage,map:we,matcap:he,envMap:ge,envMapMode:ge&&O.mapping,envMapCubeUVHeight:U,aoMap:pe,lightMap:Z,bumpMap:Ce,normalMap:A,displacementMap:d&&E,emissiveMap:W,normalMapObjectSpace:A&&f.normalMapType===Dh,normalMapTangentSpace:A&&f.normalMapType===Lh,metalnessMap:z,roughnessMap:S,anisotropy:P,anisotropyMap:xe,clearcoat:G,clearcoatMap:Fe,clearcoatNormalMap:ye,clearcoatRoughnessMap:Pe,dispersion:F,iridescence:ae,iridescenceMap:Ge,iridescenceThicknessMap:je,sheen:Y,sheenColorMap:lt,sheenRoughnessMap:_e,specularMap:Be,specularColorMap:Me,specularIntensityMap:Te,transmission:$,transmissionMap:We,thicknessMap:vt,gradientMap:Ae,opaque:f.transparent===!1&&f.blending===Ms&&f.alphaToCoverage===!1,alphaMap:nt,alphaTest:it,alphaHash:rn,combine:f.combine,mapUv:we&&y(f.map.channel),aoMapUv:pe&&y(f.aoMap.channel),lightMapUv:Z&&y(f.lightMap.channel),bumpMapUv:Ce&&y(f.bumpMap.channel),normalMapUv:A&&y(f.normalMap.channel),displacementMapUv:E&&y(f.displacementMap.channel),emissiveMapUv:W&&y(f.emissiveMap.channel),metalnessMapUv:z&&y(f.metalnessMap.channel),roughnessMapUv:S&&y(f.roughnessMap.channel),anisotropyMapUv:xe&&y(f.anisotropyMap.channel),clearcoatMapUv:Fe&&y(f.clearcoatMap.channel),clearcoatNormalMapUv:ye&&y(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&y(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&y(f.iridescenceMap.channel),iridescenceThicknessMapUv:je&&y(f.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&y(f.sheenColorMap.channel),sheenRoughnessMapUv:_e&&y(f.sheenRoughnessMap.channel),specularMapUv:Be&&y(f.specularMap.channel),specularColorMapUv:Me&&y(f.specularColorMap.channel),specularIntensityMapUv:Te&&y(f.specularIntensityMap.channel),transmissionMapUv:We&&y(f.transmissionMap.channel),thicknessMapUv:vt&&y(f.thicknessMap.channel),alphaMapUv:nt&&y(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||P),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!b.attributes.uv&&(we||nt),fog:!!M,useFog:f.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:x.isSkinnedMesh===!0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:de,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&v.length>0,shadowMapType:r.shadowMap.type,toneMapping:H,decodeVideoTexture:we&&f.map.isVideoTexture===!0&&xt.getTransfer(f.map.colorSpace)===Rt,decodeVideoTextureEmissive:W&&f.emissiveMap.isVideoTexture===!0&&xt.getTransfer(f.emissiveMap.colorSpace)===Rt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Nt,flipSided:f.side===Bn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:hn&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(hn&&f.extensions.multiDraw===!0||ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)})(g,f),(function(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(r.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=p[f.type],v;if(g){let _=oi[g];v=Wh.clone(_.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let _=0,x=h.length;_<x;_++){let M=h[_];if(M.cacheKey===g){v=M,++v.usedTimes;break}}return v===void 0&&(v=new Lp(r,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){c.remove(f)},programs:h,dispose:function(){c.dispose()}}}function Np(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Fp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function fu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function gu(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,c,l,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:c,groupOrder:l,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=c,d.groupOrder=l,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.push(d):c.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,c,l,h,u){let d=s(a,o,c,l,h,u);c.transmission>0?n.unshift(d):c.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let c=r[a];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Fp),n.length>1&&n.sort(o||fu),i.length>1&&i.sort(o||fu)}}}function Bp(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new gu,r.set(e,[i])):t>=n.length?(i=new gu,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Op(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ze};break;case"SpotLight":t={position:new w,direction:new w,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new w,halfWidth:new w,halfHeight:new w}}return r[e.id]=t,t}}}var zp=0;function Gp(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function kp(r){let e=new Op,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let i=new w,s=new Ye,a=new Ye;return{setup:function(o){let c=0,l=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,d=0,m=0,p=0,y=0,f=0,g=0,v=0,_=0,x=0,M=0;o.sort(Gp);for(let L=0,O=o.length;L<O;L++){let U=o[L],k=U.color,I=U.intensity,D=U.distance,K=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)c+=k.r*I,l+=k.g*I,h+=k.b*I;else if(U.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(U.sh.coefficients[V],I);M++}else if(U.isDirectionalLight){let V=e.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let j=U.shadow,ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[u]=ie,n.directionalShadowMap[u]=K,n.directionalShadowMatrix[u]=U.shadow.matrix,f++}n.directional[u]=V,u++}else if(U.isSpotLight){let V=e.get(U);V.position.setFromMatrixPosition(U.matrixWorld),V.color.copy(k).multiplyScalar(I),V.distance=D,V.coneCos=Math.cos(U.angle),V.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),V.decay=U.decay,n.spot[m]=V;let j=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,j.updateMatrices(U),U.castShadow&&x++),n.spotLightMatrix[m]=j.matrix,U.castShadow){let ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[m]=ie,n.spotShadowMap[m]=K,v++}m++}else if(U.isRectAreaLight){let V=e.get(U);V.color.copy(k).multiplyScalar(I),V.halfWidth.set(.5*U.width,0,0),V.halfHeight.set(0,.5*U.height,0),n.rectArea[p]=V,p++}else if(U.isPointLight){let V=e.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),V.distance=U.distance,V.decay=U.decay,U.castShadow){let j=U.shadow,ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[d]=ie,n.pointShadowMap[d]=K,n.pointShadowMatrix[d]=U.shadow.matrix,g++}n.point[d]=V,d++}else if(U.isHemisphereLight){let V=e.get(U);V.skyColor.copy(U.color).multiplyScalar(I),V.groundColor.copy(U.groundColor).multiplyScalar(I),n.hemi[y]=V,y++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let b=n.hash;b.directionalLength===u&&b.pointLength===d&&b.spotLength===m&&b.rectAreaLength===p&&b.hemiLength===y&&b.numDirectionalShadows===f&&b.numPointShadows===g&&b.numSpotShadows===v&&b.numSpotMaps===_&&b.numLightProbes===M||(n.directional.length=u,n.spot.length=m,n.rectArea.length=p,n.point.length=d,n.hemi.length=y,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=M,b.directionalLength=u,b.pointLength=d,b.spotLength=m,b.rectAreaLength=p,b.hemiLength=y,b.numDirectionalShadows=f,b.numPointShadows=g,b.numSpotShadows=v,b.numSpotMaps=_,b.numLightProbes=M,n.version=zp++)},setupView:function(o,c){let l=0,h=0,u=0,d=0,m=0,p=c.matrixWorldInverse;for(let y=0,f=o.length;y<f;y++){let g=o[y];if(g.isDirectionalLight){let v=n.directional[l];v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),l++}else if(g.isSpotLight){let v=n.spot[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(g.isRectAreaLight){let v=n.rectArea[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),a.identity(),s.copy(g.matrixWorld),s.premultiply(p),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(p),h++}else if(g.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(p),m++}}},state:n}}function vu(r){let e=new kp(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function Vp(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new vu(r),e.set(t,[s])):n>=i.length?(s=new vu(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Hp(r,e,t){let n=new Li,i=new ue,s=new ue,a=new bt,o=new Ar({depthPacking:ao}),c=new Ca,l={},h=t.maxTextureSize,u={[Pr]:Bn,[Bn]:Pr,[Nt]:Nt},d=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:`void main() {
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
}`}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let p=new mt;p.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new tt(p,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let g=this.type;function v(b,L){let O=e.update(y);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Gn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(L,null,O,d,y,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(L,null,O,m,y,null)}function _(b,L,O,U){let k=null,I=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)k=I;else if(k=O.isPointLight===!0?c:o,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let D=k.uuid,K=L.uuid,V=l[D];V===void 0&&(V={},l[D]=V);let j=V[K];j===void 0&&(j=k.clone(),V[K]=j,L.addEventListener("dispose",M)),k=j}return k.visible=L.visible,k.wireframe=L.wireframe,k.side=U===ri?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:u[L.side],k.alphaMap=L.alphaMap,k.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,k.map=L.map,k.clipShadows=L.clipShadows,k.clippingPlanes=L.clippingPlanes,k.clipIntersection=L.clipIntersection,k.displacementMap=L.displacementMap,k.displacementScale=L.displacementScale,k.displacementBias=L.displacementBias,k.wireframeLinewidth=L.wireframeLinewidth,k.linewidth=L.linewidth,O.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(r.properties.get(k).light=O),k}function x(b,L,O,U,k){if(b.visible===!1)return;if(b.layers.test(L.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&k===ri)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let D=e.update(b),K=b.material;if(Array.isArray(K)){let V=D.groups;for(let j=0,ie=V.length;j<ie;j++){let de=V[j],le=K[de.materialIndex];if(le&&le.visible){let be=_(b,le,U,k);b.onBeforeShadow(r,b,L,O,D,be,de),r.renderBufferDirect(O,null,D,be,b,de),b.onAfterShadow(r,b,L,O,D,be,de)}}}else if(K.visible){let V=_(b,K,U,k);b.onBeforeShadow(r,b,L,O,D,V,null),r.renderBufferDirect(O,null,D,V,b,null),b.onAfterShadow(r,b,L,O,D,V,null)}}let I=b.children;for(let D=0,K=I.length;D<K;D++)x(I[D],L,O,U,k)}function M(b){b.target.removeEventListener("dispose",M);for(let L in l){let O=l[L],U=b.target.uuid;U in O&&(O[U].dispose(),delete O[U])}}this.render=function(b,L,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;let U=r.getRenderTarget(),k=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),D=r.state;D.setBlending(Ui),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let K=g!==ri&&this.type===ri,V=g===ri&&this.type!==ri;for(let j=0,ie=b.length;j<ie;j++){let de=b[j],le=de.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",de,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;i.copy(le.mapSize);let be=le.getFrameExtents();if(i.multiply(be),s.copy(le.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/be.x),i.x=s.x*be.x,le.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/be.y),i.y=s.y*be.y,le.mapSize.y=s.y)),le.map===null||K===!0||V===!0){let ce=this.type!==ri?{minFilter:ni,magFilter:ni}:{};le.map!==null&&le.map.dispose(),le.map=new Gn(i.x,i.y,ce),le.map.texture.name=de.name+".shadowMap",le.camera.updateProjectionMatrix()}r.setRenderTarget(le.map),r.clear();let te=le.getViewportCount();for(let ce=0;ce<te;ce++){let we=le.getViewport(ce);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),D.viewport(a),le.updateMatrices(de,ce),n=le.getFrustum(),x(L,O,le.camera,de,this.type)}le.isPointLightShadow!==!0&&this.type===ri&&v(le,O),le.needsUpdate=!1}g=this.type,f.needsUpdate=!1,r.setRenderTarget(U,k,I)}}var Wp={[ka]:Va,[Ha]:ja,[Wa]:qa,[Ss]:Xa,[Va]:ka,[ja]:Ha,[qa]:Wa,[Xa]:Ss};function Xp(r,e){let t=new function(){let S=!1,P=new bt,G=null,F=new bt(0,0,0,0);return{setMask:function(ae){G===ae||S||(r.colorMask(ae,ae,ae,ae),G=ae)},setLocked:function(ae){S=ae},setClear:function(ae,Y,$,xe,Fe){Fe===!0&&(ae*=xe,Y*=xe,$*=xe),P.set(ae,Y,$,xe),F.equals(P)===!1&&(r.clearColor(ae,Y,$,xe),F.copy(P))},reset:function(){S=!1,G=null,F.set(-1,0,0,0)}}},n=new function(){let S=!1,P=!1,G=null,F=null,ae=null;return{setReversed:function(Y){if(P!==Y){let $=e.get("EXT_clip_control");Y?$.clipControlEXT($.LOWER_LEFT_EXT,$.ZERO_TO_ONE_EXT):$.clipControlEXT($.LOWER_LEFT_EXT,$.NEGATIVE_ONE_TO_ONE_EXT),P=Y;let xe=ae;ae=null,this.setClear(xe)}},getReversed:function(){return P},setTest:function(Y){Y?ge(r.DEPTH_TEST):pe(r.DEPTH_TEST)},setMask:function(Y){G===Y||S||(r.depthMask(Y),G=Y)},setFunc:function(Y){if(P&&(Y=Wp[Y]),F!==Y){switch(Y){case ka:r.depthFunc(r.NEVER);break;case Va:r.depthFunc(r.ALWAYS);break;case Ha:r.depthFunc(r.LESS);break;case Ss:r.depthFunc(r.LEQUAL);break;case Wa:r.depthFunc(r.EQUAL);break;case Xa:r.depthFunc(r.GEQUAL);break;case ja:r.depthFunc(r.GREATER);break;case qa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}F=Y}},setLocked:function(Y){S=Y},setClear:function(Y){ae!==Y&&(P&&(Y=1-Y),r.clearDepth(Y),ae=Y)},reset:function(){S=!1,G=null,F=null,ae=null,P=!1}}},i=new function(){let S=!1,P=null,G=null,F=null,ae=null,Y=null,$=null,xe=null,Fe=null;return{setTest:function(ye){S||(ye?ge(r.STENCIL_TEST):pe(r.STENCIL_TEST))},setMask:function(ye){P===ye||S||(r.stencilMask(ye),P=ye)},setFunc:function(ye,Pe,Ge){G===ye&&F===Pe&&ae===Ge||(r.stencilFunc(ye,Pe,Ge),G=ye,F=Pe,ae=Ge)},setOp:function(ye,Pe,Ge){Y===ye&&$===Pe&&xe===Ge||(r.stencilOp(ye,Pe,Ge),Y=ye,$=Pe,xe=Ge)},setLocked:function(ye){S=ye},setClear:function(ye){Fe!==ye&&(r.clearStencil(ye),Fe=ye)},reset:function(){S=!1,P=null,G=null,F=null,ae=null,Y=null,$=null,xe=null,Fe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,x=new Ze(0,0,0),M=0,b=!1,L=null,O=null,U=null,k=null,I=null,D=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,V=0,j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(j)[1]),K=V>=1):j.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),K=V>=2);let ie=null,de={},le=r.getParameter(r.SCISSOR_BOX),be=r.getParameter(r.VIEWPORT),te=new bt().fromArray(le),ce=new bt().fromArray(be);function we(S,P,G,F){let ae=new Uint8Array(4),Y=r.createTexture();r.bindTexture(S,Y),r.texParameteri(S,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(S,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $=0;$<G;$++)S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?r.texImage3D(P,0,r.RGBA,1,1,F,0,r.RGBA,r.UNSIGNED_BYTE,ae):r.texImage2D(P+$,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ae);return Y}let he={};function ge(S){o[S]!==!0&&(r.enable(S),o[S]=!0)}function pe(S){o[S]!==!1&&(r.disable(S),o[S]=!1)}he[r.TEXTURE_2D]=we(r.TEXTURE_2D,r.TEXTURE_2D,1),he[r.TEXTURE_CUBE_MAP]=we(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[r.TEXTURE_2D_ARRAY]=we(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),he[r.TEXTURE_3D]=we(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),ge(r.DEPTH_TEST),n.setFunc(Ss),E(!1),W(el),ge(r.CULL_FACE),A(Ui);let Z={[Ir]:r.FUNC_ADD,[Qc]:r.FUNC_SUBTRACT,[eh]:r.FUNC_REVERSE_SUBTRACT};Z[th]=r.MIN,Z[nh]=r.MAX;let Ce={[ih]:r.ZERO,[rh]:r.ONE,[sh]:r.SRC_COLOR,[oh]:r.SRC_ALPHA,[ph]:r.SRC_ALPHA_SATURATE,[uh]:r.DST_COLOR,[ch]:r.DST_ALPHA,[ah]:r.ONE_MINUS_SRC_COLOR,[lh]:r.ONE_MINUS_SRC_ALPHA,[dh]:r.ONE_MINUS_DST_COLOR,[hh]:r.ONE_MINUS_DST_ALPHA,[mh]:r.CONSTANT_COLOR,[fh]:r.ONE_MINUS_CONSTANT_COLOR,[gh]:r.CONSTANT_ALPHA,[vh]:r.ONE_MINUS_CONSTANT_ALPHA};function A(S,P,G,F,ae,Y,$,xe,Fe,ye){if(S!==Ui){if(d===!1&&(ge(r.BLEND),d=!0),S===$c)ae=ae||P,Y=Y||G,$=$||F,P===p&&ae===g||(r.blendEquationSeparate(Z[P],Z[ae]),p=P,g=ae),G===y&&F===f&&Y===v&&$===_||(r.blendFuncSeparate(Ce[G],Ce[F],Ce[Y],Ce[$]),y=G,f=F,v=Y,_=$),xe.equals(x)!==!1&&Fe===M||(r.blendColor(xe.r,xe.g,xe.b,Fe),x.copy(xe),M=Fe),m=S,b=!1;else if(S!==m||ye!==b){if(p===Ir&&g===Ir||(r.blendEquation(r.FUNC_ADD),p=Ir,g=Ir),ye)switch(S){case Ms:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nl:r.blendFunc(r.ONE,r.ONE);break;case il:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case Ms:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case il:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}y=null,f=null,v=null,_=null,x.set(0,0,0),M=0,m=S,b=ye}}else d===!0&&(pe(r.BLEND),d=!1)}function E(S){L!==S&&(S?r.frontFace(r.CW):r.frontFace(r.CCW),L=S)}function W(S){S!==Jc?(ge(r.CULL_FACE),S!==O&&(S===el?r.cullFace(r.BACK):S===Kc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pe(r.CULL_FACE),O=S}function z(S,P,G){S?(ge(r.POLYGON_OFFSET_FILL),k===P&&I===G||(r.polygonOffset(P,G),k=P,I=G)):pe(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:ge,disable:pe,bindFramebuffer:function(S,P){return c[S]!==P&&(r.bindFramebuffer(S,P),c[S]=P,S===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=P),S===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=P),!0)},drawBuffers:function(S,P){let G=h,F=!1;if(S){G=l.get(P),G===void 0&&(G=[],l.set(P,G));let ae=S.textures;if(G.length!==ae.length||G[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,$=ae.length;Y<$;Y++)G[Y]=r.COLOR_ATTACHMENT0+Y;G.length=ae.length,F=!0}}else G[0]!==r.BACK&&(G[0]=r.BACK,F=!0);F&&r.drawBuffers(G)},useProgram:function(S){return u!==S&&(r.useProgram(S),u=S,!0)},setBlending:A,setMaterial:function(S,P){S.side===Nt?pe(r.CULL_FACE):ge(r.CULL_FACE);let G=S.side===Bn;P&&(G=!G),E(G),S.blending===Ms&&S.transparent===!1?A(Ui):A(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let F=S.stencilWrite;i.setTest(F),F&&(i.setMask(S.stencilWriteMask),i.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),i.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),z(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ge(r.SAMPLE_ALPHA_TO_COVERAGE):pe(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:W,setLineWidth:function(S){S!==U&&(K&&r.lineWidth(S),U=S)},setPolygonOffset:z,setScissorTest:function(S){S?ge(r.SCISSOR_TEST):pe(r.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=r.TEXTURE0+D-1),ie!==S&&(r.activeTexture(S),ie=S)},bindTexture:function(S,P,G){G===void 0&&(G=ie===null?r.TEXTURE0+D-1:ie);let F=de[G];F===void 0&&(F={type:void 0,texture:void 0},de[G]=F),F.type===S&&F.texture===P||(ie!==G&&(r.activeTexture(G),ie=G),r.bindTexture(S,P||he[S]),F.type=S,F.texture=P)},unbindTexture:function(){let S=de[ie];S!==void 0&&S.type!==void 0&&(r.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,P){let G=a.get(P);G===void 0&&(G=new WeakMap,a.set(P,G));let F=G.get(S);F===void 0&&(F=r.getUniformBlockIndex(P,S.name),G.set(S,F))},uniformBlockBinding:function(S,P){let G=a.get(P).get(S);s.get(P)!==G&&(r.uniformBlockBinding(P,G,S.__bindingPointIndex),s.set(P,G))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){te.equals(S)===!1&&(r.scissor(S.x,S.y,S.z,S.w),te.copy(S))},viewport:function(S){ce.equals(S)===!1&&(r.viewport(S.x,S.y,S.z,S.w),ce.copy(S))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},ie=null,de={},c={},l=new WeakMap,h=[],u=null,d=!1,m=null,p=null,y=null,f=null,g=null,v=null,_=null,x=new Ze(0,0,0),M=0,b=!1,L=null,O=null,U=null,k=null,I=null,te.set(0,0,r.canvas.width,r.canvas.height),ce.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function jp(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,E){return m?new OffscreenCanvas(A,E):Qr("canvas")}function y(A,E,W){let z=1,S=Ce(A);if((S.width>W||S.height>W)&&(z=W/Math.max(S.width,S.height)),z<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let P=Math.floor(z*S.width),G=Math.floor(z*S.height);u===void 0&&(u=p(P,G));let F=E?p(P,G):u;return F.width=P,F.height=G,F.getContext("2d").drawImage(A,0,0,P,G),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+P+"x"+G+")."),F}return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),A}return A}function f(A){return A.generateMipmaps}function g(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,E,W,z,S=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let P=E;if(E===r.RED&&(W===r.FLOAT&&(P=r.R32F),W===r.HALF_FLOAT&&(P=r.R16F),W===r.UNSIGNED_BYTE&&(P=r.R8)),E===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.R8UI),W===r.UNSIGNED_SHORT&&(P=r.R16UI),W===r.UNSIGNED_INT&&(P=r.R32UI),W===r.BYTE&&(P=r.R8I),W===r.SHORT&&(P=r.R16I),W===r.INT&&(P=r.R32I)),E===r.RG&&(W===r.FLOAT&&(P=r.RG32F),W===r.HALF_FLOAT&&(P=r.RG16F),W===r.UNSIGNED_BYTE&&(P=r.RG8)),E===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RG8UI),W===r.UNSIGNED_SHORT&&(P=r.RG16UI),W===r.UNSIGNED_INT&&(P=r.RG32UI),W===r.BYTE&&(P=r.RG8I),W===r.SHORT&&(P=r.RG16I),W===r.INT&&(P=r.RG32I)),E===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGB8UI),W===r.UNSIGNED_SHORT&&(P=r.RGB16UI),W===r.UNSIGNED_INT&&(P=r.RGB32UI),W===r.BYTE&&(P=r.RGB8I),W===r.SHORT&&(P=r.RGB16I),W===r.INT&&(P=r.RGB32I)),E===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(P=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(P=r.RGBA16UI),W===r.UNSIGNED_INT&&(P=r.RGBA32UI),W===r.BYTE&&(P=r.RGBA8I),W===r.SHORT&&(P=r.RGBA16I),W===r.INT&&(P=r.RGBA32I)),E===r.RGB&&(W===r.UNSIGNED_INT_5_9_9_9_REV&&(P=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(P=r.R11F_G11F_B10F)),E===r.RGBA){let G=S?Kr:xt.getTransfer(z);W===r.FLOAT&&(P=r.RGBA32F),W===r.HALF_FLOAT&&(P=r.RGBA16F),W===r.UNSIGNED_BYTE&&(P=G===Rt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(P=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(P=r.RGB5_A1)}return P!==r.R16F&&P!==r.R32F&&P!==r.RG16F&&P!==r.RG32F&&P!==r.RGBA16F&&P!==r.RGBA32F||e.get("EXT_color_buffer_float"),P}function x(A,E){let W;return A?E===null||E===Zi||E===Ur?W=r.DEPTH24_STENCIL8:E===Hn?W=r.DEPTH32F_STENCIL8:E===Dr&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Zi||E===Ur?W=r.DEPTH_COMPONENT24:E===Hn?W=r.DEPTH_COMPONENT32F:E===Dr&&(W=r.DEPTH_COMPONENT16),W}function M(A,E){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==ni&&A.minFilter!==ii?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){let E=A.target;E.removeEventListener("dispose",b),(function(W){let z=n.get(W);if(z.__webglInit===void 0)return;let S=W.source,P=d.get(S);if(P){let G=P[z.__cacheKey];G.usedTimes--,G.usedTimes===0&&O(W),Object.keys(P).length===0&&d.delete(S)}n.remove(W)})(E),E.isVideoTexture&&h.delete(E)}function L(A){let E=A.target;E.removeEventListener("dispose",L),(function(W){let z=n.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),n.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let P=0;P<6;P++){if(Array.isArray(z.__webglFramebuffer[P]))for(let G=0;G<z.__webglFramebuffer[P].length;G++)r.deleteFramebuffer(z.__webglFramebuffer[P][G]);else r.deleteFramebuffer(z.__webglFramebuffer[P]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[P])}else{if(Array.isArray(z.__webglFramebuffer))for(let P=0;P<z.__webglFramebuffer.length;P++)r.deleteFramebuffer(z.__webglFramebuffer[P]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let P=0;P<z.__webglColorRenderbuffer.length;P++)z.__webglColorRenderbuffer[P]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[P]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let S=W.textures;for(let P=0,G=S.length;P<G;P++){let F=n.get(S[P]);F.__webglTexture&&(r.deleteTexture(F.__webglTexture),a.memory.textures--),n.remove(S[P])}n.remove(W)})(E)}function O(A){let E=n.get(A);r.deleteTexture(E.__webglTexture);let W=A.source;delete d.get(W)[E.__cacheKey],a.memory.textures--}let U=0;function k(A,E){let W=n.get(A);if(A.isVideoTexture&&(function(z){let S=a.render.frame;h.get(z)!==S&&(h.set(z,S),z.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){let z=A.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(z.complete!==!1)return void de(W,A,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+E)}let I={[Zn]:r.REPEAT,[vr]:r.CLAMP_TO_EDGE,[aa]:r.MIRRORED_REPEAT},D={[ni]:r.NEAREST,[Ch]:r.NEAREST_MIPMAP_NEAREST,[bs]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[Ja]:r.LINEAR_MIPMAP_NEAREST,[Yi]:r.LINEAR_MIPMAP_LINEAR},K={[Uh]:r.NEVER,[Gh]:r.ALWAYS,[Nh]:r.LESS,[Gl]:r.LEQUAL,[Fh]:r.EQUAL,[zh]:r.GEQUAL,[Bh]:r.GREATER,[Oh]:r.NOTEQUAL};function V(A,E){if(E.type!==Hn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ii&&E.magFilter!==Ja&&E.magFilter!==bs&&E.magFilter!==Yi&&E.minFilter!==ii&&E.minFilter!==Ja&&E.minFilter!==bs&&E.minFilter!==Yi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,I[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,I[E.wrapT]),A!==r.TEXTURE_3D&&A!==r.TEXTURE_2D_ARRAY||r.texParameteri(A,r.TEXTURE_WRAP_R,I[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,D[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,D[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,K[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ni||E.minFilter!==bs&&E.minFilter!==Yi||E.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function j(A,E){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));let z=E.source,S=d.get(z);S===void 0&&(S={},d.set(z,S));let P=(function(G){let F=[];return F.push(G.wrapS),F.push(G.wrapT),F.push(G.wrapR||0),F.push(G.magFilter),F.push(G.minFilter),F.push(G.anisotropy),F.push(G.internalFormat),F.push(G.format),F.push(G.type),F.push(G.generateMipmaps),F.push(G.premultiplyAlpha),F.push(G.flipY),F.push(G.unpackAlignment),F.push(G.colorSpace),F.join()})(E);if(P!==A.__cacheKey){S[P]===void 0&&(S[P]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),S[P].usedTimes++;let G=S[A.__cacheKey];G!==void 0&&(S[A.__cacheKey].usedTimes--,G.usedTimes===0&&O(E)),A.__cacheKey=P,A.__webglTexture=S[P].texture}return W}function ie(A,E,W){return Math.floor(Math.floor(A/W)/E)}function de(A,E,W){let z=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(z=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(z=r.TEXTURE_3D);let S=j(A,E),P=E.source;t.bindTexture(z,A.__webglTexture,r.TEXTURE0+W);let G=n.get(P);if(P.version!==G.__version||S===!0){t.activeTexture(r.TEXTURE0+W);let F=xt.getPrimaries(xt.workingColorSpace),ae=E.colorSpace===Ji?null:xt.getPrimaries(E.colorSpace),Y=E.colorSpace===Ji||F===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let $=y(E.image,!1,i.maxTextureSize);$=Z(E,$);let xe=s.convert(E.format,E.colorSpace),Fe=s.convert(E.type),ye,Pe=_(E.internalFormat,xe,Fe,E.colorSpace,E.isVideoTexture);V(z,E);let Ge=E.mipmaps,je=E.isVideoTexture!==!0,lt=G.__version===void 0||S===!0,_e=P.dataReady,Be=M(E,$);if(E.isDepthTexture)Pe=x(E.format===Es,E.type),lt&&(je?t.texStorage2D(r.TEXTURE_2D,1,Pe,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,Pe,$.width,$.height,0,xe,Fe,null));else if(E.isDataTexture)if(Ge.length>0){je&&lt&&t.texStorage2D(r.TEXTURE_2D,Be,Pe,Ge[0].width,Ge[0].height);for(let Me=0,Te=Ge.length;Me<Te;Me++)ye=Ge[Me],je?_e&&t.texSubImage2D(r.TEXTURE_2D,Me,0,0,ye.width,ye.height,xe,Fe,ye.data):t.texImage2D(r.TEXTURE_2D,Me,Pe,ye.width,ye.height,0,xe,Fe,ye.data);E.generateMipmaps=!1}else je?(lt&&t.texStorage2D(r.TEXTURE_2D,Be,Pe,$.width,$.height),_e&&(function(Me,Te,We,vt){let Ae=Me.updateRanges;if(Ae.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,Te.width,Te.height,We,vt,Te.data);else{Ae.sort((H,Ot)=>H.start-Ot.start);let nt=0;for(let H=1;H<Ae.length;H++){let Ot=Ae[nt],yt=Ae[H],st=Ot.start+Ot.count,_n=ie(yt.start,Te.width,4),Ft=ie(Ot.start,Te.width,4);yt.start<=st+1&&_n===Ft&&ie(yt.start+yt.count-1,Te.width,4)===_n?Ot.count=Math.max(Ot.count,yt.start+yt.count-Ot.start):(++nt,Ae[nt]=yt)}Ae.length=nt+1;let it=r.getParameter(r.UNPACK_ROW_LENGTH),rn=r.getParameter(r.UNPACK_SKIP_PIXELS),hn=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,Te.width);for(let H=0,Ot=Ae.length;H<Ot;H++){let yt=Ae[H],st=Math.floor(yt.start/4),_n=Math.ceil(yt.count/4),Ft=st%Te.width,ci=Math.floor(st/Te.width),zt=_n;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ft),r.pixelStorei(r.UNPACK_SKIP_ROWS,ci),t.texSubImage2D(r.TEXTURE_2D,0,Ft,ci,zt,1,We,vt,Te.data)}Me.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,it),r.pixelStorei(r.UNPACK_SKIP_PIXELS,rn),r.pixelStorei(r.UNPACK_SKIP_ROWS,hn)}})(E,$,xe,Fe)):t.texImage2D(r.TEXTURE_2D,0,Pe,$.width,$.height,0,xe,Fe,$.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){je&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Be,Pe,Ge[0].width,Ge[0].height,$.depth);for(let Me=0,Te=Ge.length;Me<Te;Me++)if(ye=Ge[Me],E.format!==Wn)if(xe!==null)if(je){if(_e)if(E.layerUpdates.size>0){let We=jl(ye.width,ye.height,E.format,E.type);for(let vt of E.layerUpdates){let Ae=ye.data.subarray(vt*We/ye.data.BYTES_PER_ELEMENT,(vt+1)*We/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,vt,ye.width,ye.height,1,xe,Ae)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,ye.width,ye.height,$.depth,xe,ye.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Me,Pe,ye.width,ye.height,$.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?_e&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,ye.width,ye.height,$.depth,xe,Fe,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Me,Pe,ye.width,ye.height,$.depth,0,xe,Fe,ye.data)}else{je&&lt&&t.texStorage2D(r.TEXTURE_2D,Be,Pe,Ge[0].width,Ge[0].height);for(let Me=0,Te=Ge.length;Me<Te;Me++)ye=Ge[Me],E.format!==Wn?xe!==null?je?_e&&t.compressedTexSubImage2D(r.TEXTURE_2D,Me,0,0,ye.width,ye.height,xe,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,Me,Pe,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?_e&&t.texSubImage2D(r.TEXTURE_2D,Me,0,0,ye.width,ye.height,xe,Fe,ye.data):t.texImage2D(r.TEXTURE_2D,Me,Pe,ye.width,ye.height,0,xe,Fe,ye.data)}else if(E.isDataArrayTexture)if(je){if(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Be,Pe,$.width,$.height,$.depth),_e)if(E.layerUpdates.size>0){let Me=jl($.width,$.height,E.format,E.type);for(let Te of E.layerUpdates){let We=$.data.subarray(Te*Me/$.data.BYTES_PER_ELEMENT,(Te+1)*Me/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Te,$.width,$.height,1,xe,Fe,We)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,xe,Fe,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Pe,$.width,$.height,$.depth,0,xe,Fe,$.data);else if(E.isData3DTexture)je?(lt&&t.texStorage3D(r.TEXTURE_3D,Be,Pe,$.width,$.height,$.depth),_e&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,xe,Fe,$.data)):t.texImage3D(r.TEXTURE_3D,0,Pe,$.width,$.height,$.depth,0,xe,Fe,$.data);else if(E.isFramebufferTexture){if(lt)if(je)t.texStorage2D(r.TEXTURE_2D,Be,Pe,$.width,$.height);else{let Me=$.width,Te=$.height;for(let We=0;We<Be;We++)t.texImage2D(r.TEXTURE_2D,We,Pe,Me,Te,0,xe,Fe,null),Me>>=1,Te>>=1}}else if(Ge.length>0){if(je&&lt){let Me=Ce(Ge[0]);t.texStorage2D(r.TEXTURE_2D,Be,Pe,Me.width,Me.height)}for(let Me=0,Te=Ge.length;Me<Te;Me++)ye=Ge[Me],je?_e&&t.texSubImage2D(r.TEXTURE_2D,Me,0,0,xe,Fe,ye):t.texImage2D(r.TEXTURE_2D,Me,Pe,xe,Fe,ye);E.generateMipmaps=!1}else if(je){if(lt){let Me=Ce($);t.texStorage2D(r.TEXTURE_2D,Be,Pe,Me.width,Me.height)}_e&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,xe,Fe,$)}else t.texImage2D(r.TEXTURE_2D,0,Pe,xe,Fe,$);f(E)&&g(z),G.__version=P.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function le(A,E,W,z,S,P){let G=s.convert(W.format,W.colorSpace),F=s.convert(W.type),ae=_(W.internalFormat,G,F,W.colorSpace),Y=n.get(E),$=n.get(W);if($.__renderTarget=E,!Y.__hasExternalTextures){let xe=Math.max(1,E.width>>P),Fe=Math.max(1,E.height>>P);S===r.TEXTURE_3D||S===r.TEXTURE_2D_ARRAY?t.texImage3D(S,P,ae,xe,Fe,E.depth,0,G,F,null):t.texImage2D(S,P,ae,xe,Fe,0,G,F,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),pe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,z,S,$.__webglTexture,0,ge(E)):(S===r.TEXTURE_2D||S>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&S<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,z,S,$.__webglTexture,P),t.bindFramebuffer(r.FRAMEBUFFER,null)}function be(A,E,W){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let z=E.depthTexture,S=z&&z.isDepthTexture?z.type:null,P=x(E.stencilBuffer,S),G=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,F=ge(E);pe(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,F,P,E.width,E.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,F,P,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,P,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,G,r.RENDERBUFFER,A)}else{let z=E.textures;for(let S=0;S<z.length;S++){let P=z[S],G=s.convert(P.format,P.colorSpace),F=s.convert(P.type),ae=_(P.internalFormat,G,F,P.colorSpace),Y=ge(E);W&&pe(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,ae,E.width,E.height):pe(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Y,ae,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ae,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function te(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(E.depthTexture);W.__renderTarget=E,W.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);let z=W.__webglTexture,S=ge(E);if(E.depthTexture.format===ws)pe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,z,0);else{if(E.depthTexture.format!==Es)throw new Error("Unknown depthTexture format");pe(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0,S):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,z,0)}}function ce(A){let E=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let z=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),z){let S=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,z.removeEventListener("dispose",S)};z.addEventListener("dispose",S),E.__depthDisposeCallback=S}E.__boundDepthTexture=z}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");let z=A.texture.mipmaps;z&&z.length>0?te(E.__webglFramebuffer[0],A):te(E.__webglFramebuffer,A)}else if(W){E.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[z]),E.__webglDepthbuffer[z]===void 0)E.__webglDepthbuffer[z]=r.createRenderbuffer(),be(E.__webglDepthbuffer[z],A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer[z];r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}else{let z=A.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),be(E.__webglDepthbuffer,A,!1);else{let S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,P=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,P),r.framebufferRenderbuffer(r.FRAMEBUFFER,S,r.RENDERBUFFER,P)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let we=[],he=[];function ge(A){return Math.min(i.maxSamples,A.samples)}function pe(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Z(A,E){let W=A.colorSpace,z=A.format,S=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==ki&&W!==Ji&&(xt.getTransfer(W)===Rt?z===Wn&&S===ai||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),E}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=U;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),U+=1,A},this.resetTextureUnits=function(){U=0},this.setTexture2D=k,this.setTexture2DArray=function(A,E){let W=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version?de(W,A,E):t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+E)},this.setTexture3D=function(A,E){let W=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version?de(W,A,E):t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+E)},this.setTextureCube=function(A,E){let W=n.get(A);A.version>0&&W.__version!==A.version?(function(z,S,P){if(S.image.length!==6)return;let G=j(z,S),F=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+P);let ae=n.get(F);if(F.version!==ae.__version||G===!0){t.activeTexture(r.TEXTURE0+P);let Y=xt.getPrimaries(xt.workingColorSpace),$=S.colorSpace===Ji?null:xt.getPrimaries(S.colorSpace),xe=S.colorSpace===Ji||Y===$?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Fe=S.isCompressedTexture||S.image[0].isCompressedTexture,ye=S.image[0]&&S.image[0].isDataTexture,Pe=[];for(let Ae=0;Ae<6;Ae++)Pe[Ae]=Fe||ye?ye?S.image[Ae].image:S.image[Ae]:y(S.image[Ae],!0,i.maxCubemapSize),Pe[Ae]=Z(S,Pe[Ae]);let Ge=Pe[0],je=s.convert(S.format,S.colorSpace),lt=s.convert(S.type),_e=_(S.internalFormat,je,lt,S.colorSpace),Be=S.isVideoTexture!==!0,Me=ae.__version===void 0||G===!0,Te=F.dataReady,We,vt=M(S,Ge);if(V(r.TEXTURE_CUBE_MAP,S),Fe){Be&&Me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,vt,_e,Ge.width,Ge.height);for(let Ae=0;Ae<6;Ae++){We=Pe[Ae].mipmaps;for(let nt=0;nt<We.length;nt++){let it=We[nt];S.format!==Wn?je!==null?Be?Te&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt,0,0,it.width,it.height,je,it.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt,_e,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?Te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt,0,0,it.width,it.height,je,lt,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt,_e,it.width,it.height,0,je,lt,it.data)}}}else{if(We=S.mipmaps,Be&&Me){We.length>0&&vt++;let Ae=Ce(Pe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,vt,_e,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(ye){Be?Te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Pe[Ae].width,Pe[Ae].height,je,lt,Pe[Ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,_e,Pe[Ae].width,Pe[Ae].height,0,je,lt,Pe[Ae].data);for(let nt=0;nt<We.length;nt++){let it=We[nt].image[Ae].image;Be?Te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt+1,0,0,it.width,it.height,je,lt,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt+1,_e,it.width,it.height,0,je,lt,it.data)}}else{Be?Te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,je,lt,Pe[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,_e,je,lt,Pe[Ae]);for(let nt=0;nt<We.length;nt++){let it=We[nt];Be?Te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt+1,0,0,je,lt,it.image[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,nt+1,_e,je,lt,it.image[Ae])}}}f(S)&&g(r.TEXTURE_CUBE_MAP),ae.__version=F.version,S.onUpdate&&S.onUpdate(S)}z.__version=S.version})(W,A,E):t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+E)},this.rebindTextures=function(A,E,W){let z=n.get(A);E!==void 0&&le(z.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&ce(A)},this.setupRenderTarget=function(A){let E=A.texture,W=n.get(A),z=n.get(E);A.addEventListener("dispose",L);let S=A.textures,P=A.isWebGLCubeRenderTarget===!0,G=S.length>1;if(G||(z.__webglTexture===void 0&&(z.__webglTexture=r.createTexture()),z.__version=E.version,a.memory.textures++),P){W.__webglFramebuffer=[];for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer[F]=[];for(let ae=0;ae<E.mipmaps.length;ae++)W.__webglFramebuffer[F][ae]=r.createFramebuffer()}else W.__webglFramebuffer[F]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer=[];for(let F=0;F<E.mipmaps.length;F++)W.__webglFramebuffer[F]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(G)for(let F=0,ae=S.length;F<ae;F++){let Y=n.get(S[F]);Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture(),a.memory.textures++)}if(A.samples>0&&pe(A)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let F=0;F<S.length;F++){let ae=S[F];W.__webglColorRenderbuffer[F]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[F]);let Y=s.convert(ae.format,ae.colorSpace),$=s.convert(ae.type),xe=_(ae.internalFormat,Y,$,ae.colorSpace,A.isXRRenderTarget===!0),Fe=ge(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe,xe,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+F,r.RENDERBUFFER,W.__webglColorRenderbuffer[F])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),be(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(P){t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture),V(r.TEXTURE_CUBE_MAP,E);for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)le(W.__webglFramebuffer[F][ae],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,ae);else le(W.__webglFramebuffer[F],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);f(E)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let F=0,ae=S.length;F<ae;F++){let Y=S[F],$=n.get(Y),xe=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(xe,$.__webglTexture),V(xe,Y),le(W.__webglFramebuffer,A,Y,r.COLOR_ATTACHMENT0+F,xe,0),f(Y)&&g(xe)}t.unbindTexture()}else{let F=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(F=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(F,z.__webglTexture),V(F,E),E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)le(W.__webglFramebuffer[ae],A,E,r.COLOR_ATTACHMENT0,F,ae);else le(W.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,F,0);f(E)&&g(F),t.unbindTexture()}A.depthBuffer&&ce(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let W=0,z=E.length;W<z;W++){let S=E[W];if(f(S)){let P=v(A),G=n.get(S).__webglTexture;t.bindTexture(P,G),g(P),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(pe(A)===!1){let E=A.textures,W=A.width,z=A.height,S=r.COLOR_BUFFER_BIT,P=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,G=n.get(A),F=E.length>1;if(F)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);let ae=A.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(S|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(S|=r.STENCIL_BUFFER_BIT)),F){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,G.__webglColorRenderbuffer[Y]);let $=n.get(E[Y]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0)}r.blitFramebuffer(0,0,W,z,0,0,W,z,S,r.NEAREST),c===!0&&(we.length=0,he.length=0,we.push(r.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.resolveDepthBuffer===!1&&(we.push(P),he.push(P),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,he)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),F)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,G.__webglColorRenderbuffer[Y]);let $=n.get(E[Y]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,G.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.TEXTURE_2D,$,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=le,this.useMultisampledRTT=pe}function qp(r,e){return{convert:function(t,n=Ji){let i,s=xt.getTransfer(n);if(t===ai)return r.UNSIGNED_BYTE;if(t===$a)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Qa)return r.UNSIGNED_SHORT_5_5_5_1;if(t===ll)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===cl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===al)return r.BYTE;if(t===ol)return r.SHORT;if(t===Dr)return r.UNSIGNED_SHORT;if(t===Ka)return r.INT;if(t===Zi)return r.UNSIGNED_INT;if(t===Hn)return r.FLOAT;if(t===Ni)return r.HALF_FLOAT;if(t===Rh)return r.ALPHA;if(t===Ph)return r.RGB;if(t===Wn)return r.RGBA;if(t===ws)return r.DEPTH_COMPONENT;if(t===Es)return r.DEPTH_STENCIL;if(t===eo)return r.RED;if(t===to)return r.RED_INTEGER;if(t===Ih)return r.RG;if(t===hl)return r.RG_INTEGER;if(t===ul)return r.RGBA_INTEGER;if(t===no||t===io||t===ro||t===so)if(s===Rt){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===no)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===io)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===ro)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===so)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===no)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===io)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===ro)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===so)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===dl||t===pl||t===ml||t===fl){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===dl)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===pl)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===ml)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===fl)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===gl||t===vl||t===_l){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===gl||t===vl)return s===Rt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===_l)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===yl||t===xl||t===Ml||t===Sl||t===Tl||t===bl||t===wl||t===El||t===Al||t===Cl||t===Rl||t===Pl||t===Il||t===Ll){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===yl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===xl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Ml)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Sl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Tl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===bl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===wl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===El)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Al)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Cl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Rl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Pl)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Il)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Ll)return s===Rt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Dl||t===Ul||t===Nl){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===Dl)return s===Rt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ul)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Nl)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Fl||t===Bl||t===Ol||t===zl){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===Fl)return i.COMPRESSED_RED_RGTC1_EXT;if(t===Bl)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Ol)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===zl)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ur?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var sc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new hs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new fn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new Zt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ac=class extends _i{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,p=null,y=typeof XRWebGLBinding<"u",f=new sc,g={},v=t.getContextAttributes(),_=null,x=null,M=[],b=[],L=new ue,O=null,U=new kt;U.viewport=new bt;let k=new kt;k.viewport=new bt;let I=[U,k],D=new za,K=null,V=null;function j(he){let ge=b.indexOf(he.inputSource);if(ge===-1)return;let pe=M[ge];pe!==void 0&&(pe.update(he.inputSource,he.frame,l||a),pe.dispatchEvent({type:he.type,data:he.inputSource}))}function ie(){i.removeEventListener("select",j),i.removeEventListener("selectstart",j),i.removeEventListener("selectend",j),i.removeEventListener("squeeze",j),i.removeEventListener("squeezestart",j),i.removeEventListener("squeezeend",j),i.removeEventListener("end",ie),i.removeEventListener("inputsourceschange",de);for(let he=0;he<M.length;he++){let ge=b[he];ge!==null&&(b[he]=null,M[he].disconnect(ge))}K=null,V=null,f.reset();for(let he in g)delete g[he];e.setRenderTarget(_),m=null,d=null,u=null,i=null,x=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}function de(he){for(let ge=0;ge<he.removed.length;ge++){let pe=he.removed[ge],Z=b.indexOf(pe);Z>=0&&(b[Z]=null,M[Z].disconnect(pe))}for(let ge=0;ge<he.added.length;ge++){let pe=he.added[ge],Z=b.indexOf(pe);if(Z===-1){for(let A=0;A<M.length;A++){if(A>=b.length){b.push(pe),Z=A;break}if(b[A]===null){b[A]=pe,Z=A;break}}if(Z===-1)break}let Ce=M[Z];Ce&&Ce.connect(pe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let ge=M[he];return ge===void 0&&(ge=new Mr,M[he]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(he){let ge=M[he];return ge===void 0&&(ge=new Mr,M[he]=ge),ge.getGripSpace()},this.getHand=function(he){let ge=M[he];return ge===void 0&&(ge=new Mr,M[he]=ge),ge.getHandSpace()},this.setFramebufferScaleFactor=function(he){s=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(_=e.getRenderTarget(),i.addEventListener("select",j),i.addEventListener("selectstart",j),i.addEventListener("selectend",j),i.addEventListener("squeeze",j),i.addEventListener("squeezestart",j),i.addEventListener("squeezeend",j),i.addEventListener("end",ie),i.addEventListener("inputsourceschange",de),v.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(L),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,pe=null,Z=null;v.depth&&(Z=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=v.stencil?Es:ws,pe=v.stencil?Ur:Zi);let Ce={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ce),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Gn(d.textureWidth,d.textureHeight,{format:Wn,type:ai,depthTexture:new cs(d.textureWidth,d.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ge={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,ge),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Gn(m.framebufferWidth,m.framebufferHeight,{format:Wn,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),we.setContext(i),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let le=new w,be=new w;function te(he,ge){ge===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(ge.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;let ge=he.near,pe=he.far;f.texture!==null&&(f.depthNear>0&&(ge=f.depthNear),f.depthFar>0&&(pe=f.depthFar)),D.near=k.near=U.near=ge,D.far=k.far=U.far=pe,K===D.near&&V===D.far||(i.updateRenderState({depthNear:D.near,depthFar:D.far}),K=D.near,V=D.far),D.layers.mask=6|he.layers.mask,U.layers.mask=3&D.layers.mask,k.layers.mask=5&D.layers.mask;let Z=he.parent,Ce=D.cameras;te(D,Z);for(let A=0;A<Ce.length;A++)te(Ce[A],Z);Ce.length===2?(function(A,E,W){le.setFromMatrixPosition(E.matrixWorld),be.setFromMatrixPosition(W.matrixWorld);let z=le.distanceTo(be),S=E.projectionMatrix.elements,P=W.projectionMatrix.elements,G=S[14]/(S[10]-1),F=S[14]/(S[10]+1),ae=(S[9]+1)/S[5],Y=(S[9]-1)/S[5],$=(S[8]-1)/S[0],xe=(P[8]+1)/P[0],Fe=G*$,ye=G*xe,Pe=z/(-$+xe),Ge=Pe*-$;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ge),A.translateZ(Pe),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),S[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let je=G+Pe,lt=F+Pe,_e=Fe-Ge,Be=ye+(z-Ge),Me=ae*F/lt*je,Te=Y*F/lt*je;A.projectionMatrix.makePerspective(_e,Be,Me,Te,je,lt),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(D,U,k):D.projectionMatrix.copy(U.projectionMatrix),(function(A,E,W){W===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(W.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*la*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(he,D,Z)},this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||m!==null)return c},this.setFoveation=function(he){c=he,d!==null&&(d.fixedFoveation=he),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=he)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(D)},this.getCameraTexture=function(he){return g[he]};let ce=null,we=new _u;we.setAnimationLoop(function(he,ge){if(h=ge.getViewerPose(l||a),p=ge,h!==null){let pe=h.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Z=!1;pe.length!==D.cameras.length&&(D.cameras.length=0,Z=!0);for(let A=0;A<pe.length;A++){let E=pe[A],W=null;if(m!==null)W=m.getViewport(E);else{let S=u.getViewSubImage(d,E);W=S.viewport,A===0&&(e.setRenderTargetTextures(x,S.colorTexture,S.depthStencilTexture),e.setRenderTarget(x))}let z=I[A];z===void 0&&(z=new kt,z.layers.enable(A),z.viewport=new bt,I[A]=z),z.matrix.fromArray(E.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(E.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(W.x,W.y,W.width,W.height),A===0&&(D.matrix.copy(z.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Z===!0&&D.cameras.push(z)}let Ce=i.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let A=u.getDepthInformation(pe[0]);A&&A.isValid&&A.texture&&f.init(A,i.renderState)}if(Ce&&Ce.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let A=0;A<pe.length;A++){let E=pe[A].camera;if(E){let W=g[E];W||(W=new hs,g[E]=W);let z=u.getCameraImage(E);W.sourceTexture=z}}}}for(let pe=0;pe<M.length;pe++){let Z=b[pe],Ce=M[pe];Z!==null&&Ce!==void 0&&Ce.update(Z,ge,l||a)}ce&&ce(he,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),p=null}),this.setAnimationLoop=function(he){ce=he},this.dispose=function(){}}},er=new Jn,Yp=new Ye;function Zp(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Bn&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Bn&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,er.copy(c),er.x*=-1,er.y*=-1,er.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),i.envMapRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(er)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,Hl(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Bn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Jp(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(u,d,m,p){let y=u.value,f=d+"_"+m;if(p[f]===void 0)return p[f]=typeof y=="number"||typeof y=="boolean"?y:y.clone(),!0;{let g=p[f];if(typeof y=="number"||typeof y=="boolean"){if(g!==y)return p[f]=y,!0}else if(g.equals(y)===!1)return g.copy(y),!0}return!1}function l(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let m=d.program;n.uniformBlockBinding(u,m)},update:function(u,d){let m=i[u.id];m===void 0&&((function(f){let g=f.uniforms,v=0,_=16;for(let M=0,b=g.length;M<b;M++){let L=Array.isArray(g[M])?g[M]:[g[M]];for(let O=0,U=L.length;O<U;O++){let k=L[O],I=Array.isArray(k.value)?k.value:[k.value];for(let D=0,K=I.length;D<K;D++){let V=l(I[D]),j=v%_,ie=j%V.boundary,de=j+ie;v+=ie,de!==0&&_-de<V.storage&&(v+=_-de),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=V.storage}}}let x=v%_;x>0&&(v+=_-x),f.__size=v,f.__cache={}})(u),m=(function(f){let g=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=r.createBuffer(),_=f.__size,x=f.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,_,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,v),v})(u),i[u.id]=m,u.addEventListener("dispose",h));let p=d.program;n.updateUBOMapping(u,p);let y=e.render.frame;s[u.id]!==y&&((function(f){let g=i[f.id],v=f.uniforms,_=f.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let x=0,M=v.length;x<M;x++){let b=Array.isArray(v[x])?v[x]:[v[x]];for(let L=0,O=b.length;L<O;L++){let U=b[L];if(c(U,x,L,_)===!0){let k=U.__offset,I=Array.isArray(U.value)?U.value:[U.value],D=0;for(let K=0;K<I.length;K++){let V=I[K],j=l(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,k+D,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,D),D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)})(u),s[u.id]=y)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}var Xn=class{constructor(e={}){let{canvas:t=kh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let p=new Uint32Array(4),y=new Int32Array(4),f=null,g=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=pt;let b=0,L=0,O=null,U=-1,k=null,I=new bt,D=new bt,K=null,V=new Ze(0),j=0,ie=t.width,de=t.height,le=1,be=null,te=null,ce=new bt(0,0,ie,de),we=new bt(0,0,ie,de),he=!1,ge=new Li,pe=!1,Z=!1,Ce=new Ye,A=new w,E=new bt,W={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},z=!1;function S(){return O===null?le:1}let P,G,F,ae,Y,$,xe,Fe,ye,Pe,Ge,je,lt,_e,Be,Me,Te,We,vt,Ae,nt,it,rn,hn,H=n;function Ot(R,q){return t.getContext(R,q)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",_n,!1),t.addEventListener("webglcontextrestored",Ft,!1),t.addEventListener("webglcontextcreationerror",ci,!1),H===null){let q="webgl2";if(H=Ot(q,R),H===null)throw Ot(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}function yt(){P=new Ld(H),P.init(),it=new qp(H,P),G=new Ad(H,P,e,it),F=new Xp(H,P),G.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),ae=new Nd(H),Y=new Np,$=new jp(H,P,F,Y,G,it,ae),xe=new Rd(x),Fe=new Id(x),ye=new Sd(H),rn=new wd(H,ye),Pe=new Dd(H,ye,ae,rn),Ge=new Bd(H,Pe,ye,ae),vt=new Fd(H,G,$),Me=new Cd(Y),je=new Up(x,xe,Fe,P,G,rn,Me),lt=new Zp(x,Y),_e=new Bp,Be=new Vp(P),We=new bd(x,xe,Fe,F,Ge,m,c),Te=new Hp(x,Ge,G),hn=new Jp(H,ae,G,F),Ae=new Ed(H,P,ae),nt=new Ud(H,P,ae),ae.programs=je.programs,x.capabilities=G,x.extensions=P,x.properties=Y,x.renderLists=_e,x.shadowMap=Te,x.state=F,x.info=ae}yt();let st=new ac(x,H);function _n(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=ae.autoReset,q=Te.enabled,J=Te.autoUpdate,re=Te.needsUpdate,ne=Te.type;yt(),ae.autoReset=R,Te.enabled=q,Te.autoUpdate=J,Te.needsUpdate=re,Te.type=ne}function ci(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function zt(R){let q=R.target;q.removeEventListener("dispose",zt),(function(J){(function(re){let ne=Y.get(re).programs;ne!==void 0&&(ne.forEach(function(Se){je.releaseProgram(Se)}),re.isShaderMaterial&&je.releaseShaderCache(re))})(J),Y.remove(J)})(q)}function Wt(R,q,J){R.transparent===!0&&R.side===Nt&&R.forceSinglePass===!1?(R.side=Bn,R.needsUpdate=!0,Kn(R,q,J),R.side=Pr,R.needsUpdate=!0,Kn(R,q,J),R.side=Nt):Kn(R,q,J)}this.xr=st,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let R=P.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=P.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(ie,de,!1))},this.getSize=function(R){return R.set(ie,de)},this.setSize=function(R,q,J=!0){st.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(ie=R,de=q,t.width=Math.floor(R*le),t.height=Math.floor(q*le),J===!0&&(t.style.width=R+"px",t.style.height=q+"px"),this.setViewport(0,0,R,q))},this.getDrawingBufferSize=function(R){return R.set(ie*le,de*le).floor()},this.setDrawingBufferSize=function(R,q,J){ie=R,de=q,le=J,t.width=Math.floor(R*J),t.height=Math.floor(q*J),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(ce)},this.setViewport=function(R,q,J,re){R.isVector4?ce.set(R.x,R.y,R.z,R.w):ce.set(R,q,J,re),F.viewport(I.copy(ce).multiplyScalar(le).round())},this.getScissor=function(R){return R.copy(we)},this.setScissor=function(R,q,J,re){R.isVector4?we.set(R.x,R.y,R.z,R.w):we.set(R,q,J,re),F.scissor(D.copy(we).multiplyScalar(le).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(R){F.setScissorTest(he=R)},this.setOpaqueSort=function(R){be=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,J=!0){let re=0;if(R){let ne=!1;if(O!==null){let Se=O.texture.format;ne=Se===ul||Se===hl||Se===to}if(ne){let Se=O.texture.type,De=Se===ai||Se===Zi||Se===Dr||Se===Ur||Se===$a||Se===Qa,Ie=We.getClearColor(),ke=We.getClearAlpha(),Je=Ie.r,Qe=Ie.g,Ke=Ie.b;De?(p[0]=Je,p[1]=Qe,p[2]=Ke,p[3]=ke,H.clearBufferuiv(H.COLOR,0,p)):(y[0]=Je,y[1]=Qe,y[2]=Ke,y[3]=ke,H.clearBufferiv(H.COLOR,0,y))}else re|=H.COLOR_BUFFER_BIT}q&&(re|=H.DEPTH_BUFFER_BIT),J&&(re|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_n,!1),t.removeEventListener("webglcontextrestored",Ft,!1),t.removeEventListener("webglcontextcreationerror",ci,!1),We.dispose(),_e.dispose(),Be.dispose(),Y.dispose(),xe.dispose(),Fe.dispose(),Ge.dispose(),rn.dispose(),hn.dispose(),je.dispose(),st.dispose(),st.removeEventListener("sessionstart",Yt),st.removeEventListener("sessionend",Lt),Xt.stop()},this.renderBufferDirect=function(R,q,J,re,ne,Se){q===null&&(q=W);let De=ne.isMesh&&ne.matrixWorld.determinant()<0,Ie=(function(He,It,en,ht,et){It.isScene!==!0&&(It=W),$.resetTextureUnits();let Rn=It.fog,nr=ht.isMeshStandardMaterial?It.environment:null,T=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ki,C=(ht.isMeshStandardMaterial?Fe:xe).get(ht.envMap||nr),N=ht.vertexColors===!0&&!!en.attributes.color&&en.attributes.color.itemSize===4,Q=!!en.attributes.tangent&&(!!ht.normalMap||ht.anisotropy>0),B=!!en.morphAttributes.position,oe=!!en.morphAttributes.normal,X=!!en.morphAttributes.color,se=Si;ht.toneMapped&&(O!==null&&O.isXRRenderTarget!==!0||(se=x.toneMapping));let fe=en.morphAttributes.position||en.morphAttributes.normal||en.morphAttributes.color,qe=fe!==void 0?fe.length:0,me=Y.get(ht),Ue=g.state.lights;if(pe===!0&&(Z===!0||He!==k)){let Gt=He===k&&ht.id===U;Me.setState(ht,He,Gt)}let ee=!1;ht.version===me.__version?me.needsLights&&me.lightsStateVersion!==Ue.state.version||me.outputColorSpace!==T||et.isBatchedMesh&&me.batching===!1?ee=!0:et.isBatchedMesh||me.batching!==!0?et.isBatchedMesh&&me.batchingColor===!0&&et.colorTexture===null||et.isBatchedMesh&&me.batchingColor===!1&&et.colorTexture!==null||et.isInstancedMesh&&me.instancing===!1?ee=!0:et.isInstancedMesh||me.instancing!==!0?et.isSkinnedMesh&&me.skinning===!1?ee=!0:et.isSkinnedMesh||me.skinning!==!0?et.isInstancedMesh&&me.instancingColor===!0&&et.instanceColor===null||et.isInstancedMesh&&me.instancingColor===!1&&et.instanceColor!==null||et.isInstancedMesh&&me.instancingMorph===!0&&et.morphTexture===null||et.isInstancedMesh&&me.instancingMorph===!1&&et.morphTexture!==null||me.envMap!==C||ht.fog===!0&&me.fog!==Rn?ee=!0:me.numClippingPlanes===void 0||me.numClippingPlanes===Me.numPlanes&&me.numIntersection===Me.numIntersection?(me.vertexAlphas!==N||me.vertexTangents!==Q||me.morphTargets!==B||me.morphNormals!==oe||me.morphColors!==X||me.toneMapping!==se||me.morphTargetsCount!==qe)&&(ee=!0):ee=!0:ee=!0:ee=!0:ee=!0:(ee=!0,me.__version=ht.version);let ve=me.currentProgram;ee===!0&&(ve=Kn(ht,It,et));let ze=!1,Re=!1,Ee=!1,Oe=ve.getUniforms(),rt=me.uniforms;if(F.useProgram(ve.program)&&(ze=!0,Re=!0,Ee=!0),ht.id!==U&&(U=ht.id,Re=!0),ze||k!==He){F.buffers.depth.getReversed()&&He.reversedDepth!==!0&&(He._reversedDepth=!0,He.updateProjectionMatrix()),Oe.setValue(H,"projectionMatrix",He.projectionMatrix),Oe.setValue(H,"viewMatrix",He.matrixWorldInverse);let Gt=Oe.map.cameraPosition;Gt!==void 0&&Gt.setValue(H,A.setFromMatrixPosition(He.matrixWorld)),G.logarithmicDepthBuffer&&Oe.setValue(H,"logDepthBufFC",2/(Math.log(He.far+1)/Math.LN2)),(ht.isMeshPhongMaterial||ht.isMeshToonMaterial||ht.isMeshLambertMaterial||ht.isMeshBasicMaterial||ht.isMeshStandardMaterial||ht.isShaderMaterial)&&Oe.setValue(H,"isOrthographic",He.isOrthographicCamera===!0),k!==He&&(k=He,Re=!0,Ee=!0)}if(et.isSkinnedMesh){Oe.setOptional(H,et,"bindMatrix"),Oe.setOptional(H,et,"bindMatrixInverse");let Gt=et.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),Oe.setValue(H,"boneTexture",Gt.boneTexture,$))}et.isBatchedMesh&&(Oe.setOptional(H,et,"batchingTexture"),Oe.setValue(H,"batchingTexture",et._matricesTexture,$),Oe.setOptional(H,et,"batchingIdTexture"),Oe.setValue(H,"batchingIdTexture",et._indirectTexture,$),Oe.setOptional(H,et,"batchingColorTexture"),et._colorsTexture!==null&&Oe.setValue(H,"batchingColorTexture",et._colorsTexture,$));let dn=en.morphAttributes;dn.position===void 0&&dn.normal===void 0&&dn.color===void 0||vt.update(et,en,ve),(Re||me.receiveShadow!==et.receiveShadow)&&(me.receiveShadow=et.receiveShadow,Oe.setValue(H,"receiveShadow",et.receiveShadow)),ht.isMeshGouraudMaterial&&ht.envMap!==null&&(rt.envMap.value=C,rt.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1),ht.isMeshStandardMaterial&&ht.envMap===null&&It.environment!==null&&(rt.envMapIntensity.value=It.environmentIntensity),Re&&(Oe.setValue(H,"toneMappingExposure",x.toneMappingExposure),me.needsLights&&(Kt=Ee,(Pt=rt).ambientLightColor.needsUpdate=Kt,Pt.lightProbe.needsUpdate=Kt,Pt.directionalLights.needsUpdate=Kt,Pt.directionalLightShadows.needsUpdate=Kt,Pt.pointLights.needsUpdate=Kt,Pt.pointLightShadows.needsUpdate=Kt,Pt.spotLights.needsUpdate=Kt,Pt.spotLightShadows.needsUpdate=Kt,Pt.rectAreaLights.needsUpdate=Kt,Pt.hemisphereLights.needsUpdate=Kt),Rn&&ht.fog===!0&&lt.refreshFogUniforms(rt,Rn),lt.refreshMaterialUniforms(rt,ht,le,de,g.state.transmissionRenderTarget[He.id]),Fr.upload(H,Cn(me),rt,$));var Pt,Kt;if(ht.isShaderMaterial&&ht.uniformsNeedUpdate===!0&&(Fr.upload(H,Cn(me),rt,$),ht.uniformsNeedUpdate=!1),ht.isSpriteMaterial&&Oe.setValue(H,"center",et.center),Oe.setValue(H,"modelViewMatrix",et.modelViewMatrix),Oe.setValue(H,"normalMatrix",et.normalMatrix),Oe.setValue(H,"modelMatrix",et.matrixWorld),ht.isShaderMaterial||ht.isRawShaderMaterial){let Gt=ht.uniformsGroups;for(let Ti=0,mc=Gt.length;Ti<mc;Ti++){let Rs=Gt[Ti];hn.update(Rs,ve),hn.bind(Rs,ve)}}return ve})(R,q,J,re,ne);F.setMaterial(re,De);let ke=J.index,Je=1;if(re.wireframe===!0){if(ke=Pe.getWireframeAttribute(J),ke===void 0)return;Je=2}let Qe=J.drawRange,Ke=J.attributes.position,at=Qe.start*Je,At=(Qe.start+Qe.count)*Je;Se!==null&&(at=Math.max(at,Se.start*Je),At=Math.min(At,(Se.start+Se.count)*Je)),ke!==null?(at=Math.max(at,0),At=Math.min(At,ke.count)):Ke!=null&&(at=Math.max(at,0),At=Math.min(At,Ke.count));let ft=At-at;if(ft<0||ft===1/0)return;let Bt;rn.setup(ne,re,Ie,J,ke);let Ct=Ae;if(ke!==null&&(Bt=ye.get(ke),Ct=nt,Ct.setIndex(Bt)),ne.isMesh)re.wireframe===!0?(F.setLineWidth(re.wireframeLinewidth*S()),Ct.setMode(H.LINES)):Ct.setMode(H.TRIANGLES);else if(ne.isLine){let He=re.linewidth;He===void 0&&(He=1),F.setLineWidth(He*S()),ne.isLineSegments?Ct.setMode(H.LINES):ne.isLineLoop?Ct.setMode(H.LINE_LOOP):Ct.setMode(H.LINE_STRIP)}else ne.isPoints?Ct.setMode(H.POINTS):ne.isSprite&&Ct.setMode(H.TRIANGLES);if(ne.isBatchedMesh)if(ne._multiDrawInstances!==null)_r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount,ne._multiDrawInstances);else if(P.get("WEBGL_multi_draw"))Ct.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let He=ne._multiDrawStarts,It=ne._multiDrawCounts,en=ne._multiDrawCount,ht=ke?ye.get(ke).bytesPerElement:1,et=Y.get(re).currentProgram.getUniforms();for(let Rn=0;Rn<en;Rn++)et.setValue(H,"_gl_DrawID",Rn),Ct.render(He[Rn]/ht,It[Rn])}else if(ne.isInstancedMesh)Ct.renderInstances(at,ft,ne.count);else if(J.isInstancedBufferGeometry){let He=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,It=Math.min(J.instanceCount,He);Ct.renderInstances(at,ft,It)}else Ct.render(at,ft)},this.compile=function(R,q,J=null){J===null&&(J=R),g=Be.get(J),g.init(q),_.push(g),J.traverseVisible(function(ne){ne.isLight&&ne.layers.test(q.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),R!==J&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(q.layers)&&(g.pushLight(ne),ne.castShadow&&g.pushShadow(ne))}),g.setupLights();let re=new Set;return R.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let Se=ne.material;if(Se)if(Array.isArray(Se))for(let De=0;De<Se.length;De++){let Ie=Se[De];Wt(Ie,J,ne),re.add(Ie)}else Wt(Se,J,ne),re.add(Se)}),g=_.pop(),re},this.compileAsync=function(R,q,J=null){let re=this.compile(R,q,J);return new Promise(ne=>{function Se(){re.forEach(function(De){Y.get(De).currentProgram.isReady()&&re.delete(De)}),re.size!==0?setTimeout(Se,10):ne(R)}P.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let ct=null;function Yt(){Xt.stop()}function Lt(){Xt.start()}let Xt=new _u;function an(R,q,J,re){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ge.intersectsSprite(R)){re&&E.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ce);let Se=Ge.update(R),De=R.material;De.visible&&f.push(R,Se,De,J,E.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ge.intersectsObject(R))){let Se=Ge.update(R),De=R.material;if(re&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),E.copy(R.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),E.copy(Se.boundingSphere.center)),E.applyMatrix4(R.matrixWorld).applyMatrix4(Ce)),Array.isArray(De)){let Ie=Se.groups;for(let ke=0,Je=Ie.length;ke<Je;ke++){let Qe=Ie[ke],Ke=De[Qe.materialIndex];Ke&&Ke.visible&&f.push(R,Se,Ke,J,E.z,Qe)}}else De.visible&&f.push(R,Se,De,J,E.z,null)}}let ne=R.children;for(let Se=0,De=ne.length;Se<De;Se++)an(ne[Se],q,J,re)}function Qt(R,q,J,re){let ne=R.opaque,Se=R.transmissive,De=R.transparent;g.setupLightsView(J),pe===!0&&Me.setGlobalState(x.clippingPlanes,J),re&&F.viewport(I.copy(re)),ne.length>0&&un(ne,q,J),Se.length>0&&un(Se,q,J),De.length>0&&un(De,q,J),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function yn(R,q,J,re){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[re.id]===void 0&&(g.state.transmissionRenderTarget[re.id]=new Gn(1,1,{generateMipmaps:!0,type:P.has("EXT_color_buffer_half_float")||P.has("EXT_color_buffer_float")?Ni:ai,minFilter:Yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace}));let ne=g.state.transmissionRenderTarget[re.id],Se=re.viewport||I;ne.setSize(Se.z*x.transmissionResolutionScale,Se.w*x.transmissionResolutionScale);let De=x.getRenderTarget(),Ie=x.getActiveCubeFace(),ke=x.getActiveMipmapLevel();x.setRenderTarget(ne),x.getClearColor(V),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),z&&We.render(J);let Je=x.toneMapping;x.toneMapping=Si;let Qe=re.viewport;if(re.viewport!==void 0&&(re.viewport=void 0),g.setupLightsView(re),pe===!0&&Me.setGlobalState(x.clippingPlanes,re),un(R,J,re),$.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne),P.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let at=0,At=q.length;at<At;at++){let ft=q[at],Bt=ft.object,Ct=ft.geometry,He=ft.material,It=ft.group;if(He.side===Nt&&Bt.layers.test(re.layers)){let en=He.side;He.side=Bn,He.needsUpdate=!0,on(Bt,J,re,Ct,He,It),He.side=en,He.needsUpdate=!0,Ke=!0}}Ke===!0&&($.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne))}x.setRenderTarget(De,Ie,ke),x.setClearColor(V,j),Qe!==void 0&&(re.viewport=Qe),x.toneMapping=Je}function un(R,q,J){let re=q.isScene===!0?q.overrideMaterial:null;for(let ne=0,Se=R.length;ne<Se;ne++){let De=R[ne],Ie=De.object,ke=De.geometry,Je=De.group,Qe=De.material;Qe.allowOverride===!0&&re!==null&&(Qe=re),Ie.layers.test(J.layers)&&on(Ie,q,J,ke,Qe,Je)}}function on(R,q,J,re,ne,Se){R.onBeforeRender(x,q,J,re,ne,Se),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(x,q,J,re,R,Se),ne.transparent===!0&&ne.side===Nt&&ne.forceSinglePass===!1?(ne.side=Bn,ne.needsUpdate=!0,x.renderBufferDirect(J,q,re,ne,R,Se),ne.side=Pr,ne.needsUpdate=!0,x.renderBufferDirect(J,q,re,ne,R,Se),ne.side=Nt):x.renderBufferDirect(J,q,re,ne,R,Se),R.onAfterRender(x,q,J,re,ne,Se)}function Kn(R,q,J){q.isScene!==!0&&(q=W);let re=Y.get(R),ne=g.state.lights,Se=g.state.shadowsArray,De=ne.state.version,Ie=je.getParameters(R,ne.state,Se,q,J),ke=je.getProgramCacheKey(Ie),Je=re.programs;re.environment=R.isMeshStandardMaterial?q.environment:null,re.fog=q.fog,re.envMap=(R.isMeshStandardMaterial?Fe:xe).get(R.envMap||re.environment),re.envMapRotation=re.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,Je===void 0&&(R.addEventListener("dispose",zt),Je=new Map,re.programs=Je);let Qe=Je.get(ke);if(Qe!==void 0){if(re.currentProgram===Qe&&re.lightsStateVersion===De)return jt(R,Ie),Qe}else Ie.uniforms=je.getUniforms(R),R.onBeforeCompile(Ie,x),Qe=je.acquireProgram(Ie,ke),Je.set(ke,Qe),re.uniforms=Ie.uniforms;let Ke=re.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||(Ke.clippingPlanes=Me.uniform),jt(R,Ie),re.needsLights=(function(at){return at.isMeshLambertMaterial||at.isMeshToonMaterial||at.isMeshPhongMaterial||at.isMeshStandardMaterial||at.isShadowMaterial||at.isShaderMaterial&&at.lights===!0})(R),re.lightsStateVersion=De,re.needsLights&&(Ke.ambientLightColor.value=ne.state.ambient,Ke.lightProbe.value=ne.state.probe,Ke.directionalLights.value=ne.state.directional,Ke.directionalLightShadows.value=ne.state.directionalShadow,Ke.spotLights.value=ne.state.spot,Ke.spotLightShadows.value=ne.state.spotShadow,Ke.rectAreaLights.value=ne.state.rectArea,Ke.ltc_1.value=ne.state.rectAreaLTC1,Ke.ltc_2.value=ne.state.rectAreaLTC2,Ke.pointLights.value=ne.state.point,Ke.pointLightShadows.value=ne.state.pointShadow,Ke.hemisphereLights.value=ne.state.hemi,Ke.directionalShadowMap.value=ne.state.directionalShadowMap,Ke.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Ke.spotShadowMap.value=ne.state.spotShadowMap,Ke.spotLightMatrix.value=ne.state.spotLightMatrix,Ke.spotLightMap.value=ne.state.spotLightMap,Ke.pointShadowMap.value=ne.state.pointShadowMap,Ke.pointShadowMatrix.value=ne.state.pointShadowMatrix),re.currentProgram=Qe,re.uniformsList=null,Qe}function Cn(R){if(R.uniformsList===null){let q=R.currentProgram.getUniforms();R.uniformsList=Fr.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function jt(R,q){let J=Y.get(R);J.outputColorSpace=q.outputColorSpace,J.batching=q.batching,J.batchingColor=q.batchingColor,J.instancing=q.instancing,J.instancingColor=q.instancingColor,J.instancingMorph=q.instancingMorph,J.skinning=q.skinning,J.morphTargets=q.morphTargets,J.morphNormals=q.morphNormals,J.morphColors=q.morphColors,J.morphTargetsCount=q.morphTargetsCount,J.numClippingPlanes=q.numClippingPlanes,J.numIntersection=q.numClipIntersection,J.vertexAlphas=q.vertexAlphas,J.vertexTangents=q.vertexTangents,J.toneMapping=q.toneMapping}Xt.setAnimationLoop(function(R){ct&&ct(R)}),typeof self<"u"&&Xt.setContext(self),this.setAnimationLoop=function(R){ct=R,st.setAnimationLoop(R),R===null?Xt.stop():Xt.start()},st.addEventListener("sessionstart",Yt),st.addEventListener("sessionend",Lt),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(q),q=st.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,q,O),g=Be.get(R,_.length),g.init(q),_.push(g),Ce.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ge.setFromProjectionMatrix(Ce,vi,q.reversedDepth),Z=this.localClippingEnabled,pe=Me.init(this.clippingPlanes,Z),f=_e.get(R,v.length),f.init(),v.push(f),st.enabled===!0&&st.isPresenting===!0){let Se=x.xr.getDepthSensingMesh();Se!==null&&an(Se,q,-1/0,x.sortObjects)}an(R,q,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(be,te),z=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,z&&We.addToRenderList(f,R),this.info.render.frame++,pe===!0&&Me.beginShadows();let J=g.state.shadowsArray;Te.render(J,R,q),pe===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset();let re=f.opaque,ne=f.transmissive;if(g.setupLights(),q.isArrayCamera){let Se=q.cameras;if(ne.length>0)for(let De=0,Ie=Se.length;De<Ie;De++)yn(re,ne,R,Se[De]);z&&We.render(R);for(let De=0,Ie=Se.length;De<Ie;De++){let ke=Se[De];Qt(f,R,ke,ke.viewport)}}else ne.length>0&&yn(re,ne,R,q),z&&We.render(R),Qt(f,R,q);O!==null&&L===0&&($.updateMultisampleRenderTarget(O),$.updateRenderTargetMipmap(O)),R.isScene===!0&&R.onAfterRender(x,R,q),rn.resetDefaultState(),U=-1,k=null,_.pop(),_.length>0?(g=_[_.length-1],pe===!0&&Me.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(R,q,J){let re=Y.get(R);re.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,re.__autoAllocateDepthBuffer===!1&&(re.__useRenderToTexture=!1),Y.get(R.texture).__webglTexture=q,Y.get(R.depthTexture).__webglTexture=re.__autoAllocateDepthBuffer?void 0:J,re.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){let J=Y.get(R);J.__webglFramebuffer=q,J.__useDefaultFramebuffer=q===void 0};let wt=H.createFramebuffer();this.setRenderTarget=function(R,q=0,J=0){O=R,b=q,L=J;let re=!0,ne=null,Se=!1,De=!1;if(R){let Ie=Y.get(R);if(Ie.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(H.FRAMEBUFFER,null),re=!1;else if(Ie.__webglFramebuffer===void 0)$.setupRenderTarget(R);else if(Ie.__hasExternalTextures)$.rebindTextures(R,Y.get(R.texture).__webglTexture,Y.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Qe=R.depthTexture;if(Ie.__boundDepthTexture!==Qe){if(Qe!==null&&Y.has(Qe)&&(R.width!==Qe.image.width||R.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(R)}}let ke=R.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(De=!0);let Je=Y.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ne=Array.isArray(Je[q])?Je[q][J]:Je[q],Se=!0):ne=R.samples>0&&$.useMultisampledRTT(R)===!1?Y.get(R).__webglMultisampledFramebuffer:Array.isArray(Je)?Je[J]:Je,I.copy(R.viewport),D.copy(R.scissor),K=R.scissorTest}else I.copy(ce).multiplyScalar(le).floor(),D.copy(we).multiplyScalar(le).floor(),K=he;if(J!==0&&(ne=wt),F.bindFramebuffer(H.FRAMEBUFFER,ne)&&re&&F.drawBuffers(R,ne),F.viewport(I),F.scissor(D),F.setScissorTest(K),Se){let Ie=Y.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ie.__webglTexture,J)}else if(De){let Ie=q;for(let ke=0;ke<R.textures.length;ke++){let Je=Y.get(R.textures[ke]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+ke,Je.__webglTexture,J,Ie)}}else if(R!==null&&J!==0){let Ie=Y.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ie.__webglTexture,J)}U=-1},this.readRenderTargetPixels=function(R,q,J,re,ne,Se,De,Ie=0){if(!R||!R.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(ke=ke[De]),ke){F.bindFramebuffer(H.FRAMEBUFFER,ke);try{let Je=R.textures[Ie],Qe=Je.format,Ke=Je.type;if(!G.textureFormatReadable(Qe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(Ke))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");q>=0&&q<=R.width-re&&J>=0&&J<=R.height-ne&&(R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Ie),H.readPixels(q,J,re,ne,it.convert(Qe),it.convert(Ke),Se))}finally{let Je=O!==null?Y.get(O).__webglFramebuffer:null;F.bindFramebuffer(H.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(R,q,J,re,ne,Se,De,Ie=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(ke=ke[De]),ke){if(q>=0&&q<=R.width-re&&J>=0&&J<=R.height-ne){F.bindFramebuffer(H.FRAMEBUFFER,ke);let Je=R.textures[Ie],Qe=Je.format,Ke=Je.type;if(!G.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.bufferData(H.PIXEL_PACK_BUFFER,Se.byteLength,H.STREAM_READ),R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Ie),H.readPixels(q,J,re,ne,it.convert(Qe),it.convert(Ke),0);let At=O!==null?Y.get(O).__webglFramebuffer:null;F.bindFramebuffer(H.FRAMEBUFFER,At);let ft=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Vh(H,ft,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Se),H.deleteBuffer(at),H.deleteSync(ft),Se}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,q=null,J=0){let re=Math.pow(2,-J),ne=Math.floor(R.image.width*re),Se=Math.floor(R.image.height*re),De=q!==null?q.x:0,Ie=q!==null?q.y:0;$.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,De,Ie,ne,Se),F.unbindTexture()};let qt=H.createFramebuffer(),_t=H.createFramebuffer();this.copyTextureToTexture=function(R,q,J=null,re=null,ne=0,Se=null){let De,Ie,ke,Je,Qe,Ke,at,At,ft;Se===null&&(ne!==0?(_r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Se=ne,ne=0):Se=0);let Bt=R.isCompressedTexture?R.mipmaps[Se]:R.image;if(J!==null)De=J.max.x-J.min.x,Ie=J.max.y-J.min.y,ke=J.isBox3?J.max.z-J.min.z:1,Je=J.min.x,Qe=J.min.y,Ke=J.isBox3?J.min.z:0;else{let N=Math.pow(2,-ne);De=Math.floor(Bt.width*N),Ie=Math.floor(Bt.height*N),ke=R.isDataArrayTexture?Bt.depth:R.isData3DTexture?Math.floor(Bt.depth*N):1,Je=0,Qe=0,Ke=0}re!==null?(at=re.x,At=re.y,ft=re.z):(at=0,At=0,ft=0);let Ct=it.convert(q.format),He=it.convert(q.type),It;q.isData3DTexture?($.setTexture3D(q,0),It=H.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?($.setTexture2DArray(q,0),It=H.TEXTURE_2D_ARRAY):($.setTexture2D(q,0),It=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);let en=H.getParameter(H.UNPACK_ROW_LENGTH),ht=H.getParameter(H.UNPACK_IMAGE_HEIGHT),et=H.getParameter(H.UNPACK_SKIP_PIXELS),Rn=H.getParameter(H.UNPACK_SKIP_ROWS),nr=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Bt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Bt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Je),H.pixelStorei(H.UNPACK_SKIP_ROWS,Qe),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ke);let T=R.isDataArrayTexture||R.isData3DTexture,C=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){let N=Y.get(R),Q=Y.get(q),B=Y.get(N.__renderTarget),oe=Y.get(Q.__renderTarget);F.bindFramebuffer(H.READ_FRAMEBUFFER,B.__webglFramebuffer),F.bindFramebuffer(H.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let X=0;X<ke;X++)T&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(R).__webglTexture,ne,Ke+X),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(q).__webglTexture,Se,ft+X)),H.blitFramebuffer(Je,Qe,De,Ie,at,At,De,Ie,H.DEPTH_BUFFER_BIT,H.NEAREST);F.bindFramebuffer(H.READ_FRAMEBUFFER,null),F.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(ne!==0||R.isRenderTargetTexture||Y.has(R)){let N=Y.get(R),Q=Y.get(q);F.bindFramebuffer(H.READ_FRAMEBUFFER,qt),F.bindFramebuffer(H.DRAW_FRAMEBUFFER,_t);for(let B=0;B<ke;B++)T?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,N.__webglTexture,ne,Ke+B):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,N.__webglTexture,ne),C?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Q.__webglTexture,Se,ft+B):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Q.__webglTexture,Se),ne!==0?H.blitFramebuffer(Je,Qe,De,Ie,at,At,De,Ie,H.COLOR_BUFFER_BIT,H.NEAREST):C?H.copyTexSubImage3D(It,Se,at,At,ft+B,Je,Qe,De,Ie):H.copyTexSubImage2D(It,Se,at,At,Je,Qe,De,Ie);F.bindFramebuffer(H.READ_FRAMEBUFFER,null),F.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else C?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(It,Se,at,At,ft,De,Ie,ke,Ct,He,Bt.data):q.isCompressedArrayTexture?H.compressedTexSubImage3D(It,Se,at,At,ft,De,Ie,ke,Ct,Bt.data):H.texSubImage3D(It,Se,at,At,ft,De,Ie,ke,Ct,He,Bt):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Se,at,At,De,Ie,Ct,He,Bt.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Se,at,At,Bt.width,Bt.height,Ct,Bt.data):H.texSubImage2D(H.TEXTURE_2D,Se,at,At,De,Ie,Ct,He,Bt);H.pixelStorei(H.UNPACK_ROW_LENGTH,en),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ht),H.pixelStorei(H.UNPACK_SKIP_PIXELS,et),H.pixelStorei(H.UNPACK_SKIP_ROWS,Rn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,nr),Se===0&&q.generateMipmaps&&H.generateMipmap(It),F.unbindTexture()},this.initRenderTarget=function(R){Y.get(R).__webglFramebuffer===void 0&&$.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?$.setTextureCube(R,0):R.isData3DTexture?$.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?$.setTexture2DArray(R,0):$.setTexture2D(R,0),F.unbindTexture()},this.resetState=function(){b=0,L=0,O=null,F.reset(),rn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}};function Tu(r,e){let t=e.hair||"hairNatural",n=[];if(t==="hairNatural"||e.helmet&&e.helmet!=="none"||e.hat&&e.hat!=="none")return{dispose(){}};let i={hairSilver:"#a9a49c",hairBlond:"#bda16a",hairAfro:"#733c24",hairBlue:"#235a8f"},s=new gt({color:i[t]||"#30241d",roughness:.96}),a=new Ve;function o(c,l,h,u,d,m,p=0){let y=new Jt(1,12,10);n.push(y);let f=new tt(y,s);f.position.set(c,l,h),f.scale.set(u,d,m),f.rotation.z=p,a.add(f)}if(t!=="hairBald"){let c=t==="hairBuzz",l=t==="hairAfro",h=t==="hairMohawk"||t==="hairBlue",u=t==="hairDreads",d=t==="hairRocker";for(let m=0;m<7;m++)for(let p=0;p<12;p++){let y=p/12*Math.PI*2,f=m/7*Math.PI*.57;if(h&&Math.abs(Math.cos(y))>.27)continue;let g=Math.cos(y)*Math.sin(f)*.23,v=.1+Math.sin(y)*Math.sin(f)*.24,_=t==="hairCurly"||l,x=c?.026:_?.067:.045,M=c?.018:l?.12:h?.16:_?.065:.075,b=1.62+Math.cos(f)*.29;t==="hairPompadour"&&(M+=Math.max(0,Math.sin(y))*.1,b+=Math.max(0,Math.sin(y))*.04),(t==="hairSidePart"||t==="hairSilver")&&(b+=g*.16),(u||d)&&(M=m>3?.18:.065,b-=m>3?.07:0),o(g,b,v,x,M,x,t==="hairSidePart"?-.5:t==="hairSilver"?-.35:0)}}return r.bones.head.add(a),a.position.copy(r.bones.head.userData.rest?new w(...r.bones.head.userData.rest).negate():new w),{dispose(){a.removeFromParent(),n.forEach(c=>c.dispose()),s.dispose()}}}function bu(r,e,t){let n=[],i=[],s=Is(e.body),a=new gt({color:t.item("suit",e.suit).color,roughness:.93,metalness:0}),o=new gt({color:new Ze(t.item("suit",e.suit).color).multiplyScalar(.7),roughness:.9}),c=new gt({color:"#e8e5db",roughness:.88}),l=new gt({color:"#1b1f22",roughness:.8}),h=new gt({color:new Ze(t.item("pants",e.pants).color).multiplyScalar(.62),roughness:.95}),u=new gt({color:"#ad8c70",roughness:.72}),d=new gt({color:t.item("shoes",e.shoes).color,roughness:.62});i.push(a,o,c,l,d,h,u);function m(g,v,_){let x=g.getAttribute("position"),M=[],b=[];for(let L=0;L<x.count;L++){let O=s(x.getX(L),.5-x.getY(L)/3.825,x.getZ(L),_);x.setXYZ(L,O[0],(.5-O[1])*3.825,O[2]),M.push(.5+x.getX(L)/2.55,.5-x.getY(L)/3.825),b.push(_)}return g.setAttribute("bodyUv",new Le(M,2)),g.setAttribute("surface",new Le(b,1)),n.push(g),r.mesh(g,v)}function p(g,v,_,x=.003){let M=new Mt(g.map(b=>new w(...b)));return m(new Tt(M,24,x,6,!1),v,_)}function y(g,v,_){let x=new mt,M=g.flat();x.setAttribute("position",new Le(M,3));let b=[];for(let L=1;L<g.length-1;L++)b.push(0,L,L+1);return x.setIndex(b),x.computeVertexNormals(),v.side=Nt,m(x,v,_)}if(["classic","ruby","midnight"].includes(e.suit)){for(let g of[-1,1])p([[g*.2,1.05,-.207],[g*.35,.82,-.254],[g*.38,.38,-.244],[g*.3,.14,-.201]],o,1,.0025);p([[0,1.14,-.19],[0,.8,-.281],[0,.31,-.255],[0,.13,-.218]],o,1,.003);for(let g of[.37,.17]){let v=new Xe(.013,.013,.008,16);v.rotateX(Math.PI/2),v.translate(.04,g,.275),m(v,l,1)}}for(let g of[-1,1])for(let v=0;v<4;v++){let _=new Jt(1,10,8),x=.166+v*.019,M=[.039,.046,.043,.034][v],b=.54+v*.002;_.scale(.013,.022,.006),_.translate(g*(.5-(x+.009))*2.55,(.5-(b+M*.72))*3.825,.117),m(_,u,3)}for(let g of[-1,1]){let v=g*.45;y([[v-.064,-1.54,.113],[v+.064,-1.54,.113],[v+.077,-1.69,.315],[v-.077,-1.69,.315]],d,5);for(let _=0;_<5;_++){let x=-1.56-_*.026,M=.14+_*.043;p([[v-.062,x,M],[v,x-.008,M+.01],[v+.062,x-.014,M]],c,5,.0035),p([[v+.062,x,M+.001],[v,x-.008,M+.011],[v-.062,x-.014,M+.001]],c,5,.0035)}p([[v-.115,-1.77,.21],[v-.11,-1.77,.35],[v,-1.77,.38],[v+.11,-1.77,.35],[v+.115,-1.77,.21]],d,5,.003),p([[v-.08,-1.55,-.07],[v,-1.52,-.087],[v+.08,-1.55,-.07]],l,5,.006)}return{dispose(){n.forEach(g=>g.dispose()),i.forEach(g=>g.dispose())}}}var li=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)};function wu(r){let e=[],t={};function n(y,f,g,v,_=0){let x=new Sr;x.name=y;let M=f?f.userData.rest:[0,0,0];return x.position.set(g-M[0],v-M[1],_-M[2]),x.userData.rest=[g,v,_],(f||r).add(x),e.push(x),t[y]=x,x}let i=n("pelvis",null,0,0),s=n("spine",i,0,.3),a=n("chest",s,0,.91),o=n("neck",a,0,1.18),c=n("head",o,0,1.4,.1);for(let[y,f]of[["left",-1],["right",1]]){let g=n(y+"Shoulder",a,f*.49,1.09),v=n(y+"Elbow",g,f*.66,.57),_=n(y+"Wrist",v,f*.78,.04,.035),x=n(y+"Hand",_,f*.79,-.15,.07);for(let L=0;L<4;L++)n(y+"Finger"+L,x,f*(.5-(.175+L*.019))*2.55,-.17-L*.007,.07);n(y+"Thumb",x,f*.63,-.13,.11);let M=n(y+"Hip",i,f*.23,-.2,-.01),b=n(y+"Knee",M,f*.34,-.77,-.01);n(y+"Ankle",b,f*.44,-1.3,.08)}r.updateMatrixWorld(!0);let l=new as(e);function h(y,f,g){let v=f<.5?"left":"right",_=i,x=i,M=0;if(y===1)_=s,x=a,M=1-li(.25,.44,g);else if(y===2||y===9)g<.25?(_=a,x=t[v+"Shoulder"],M=li(.175,.245,g)):g<.4?(_=t[v+"Shoulder"],x=t[v+"Elbow"],M=li(.29,.38,g)):(_=t[v+"Elbow"],x=t[v+"Wrist"],M=li(.43,.49,g));else if(y===3){let b=f<.5?f:1-f;g>.54?(_=t[v+"Hand"],x=t[v+(b>.239?"Thumb":"Finger"+Math.max(0,Math.min(3,Math.round((b-.175)/.019))))],M=li(.54,.566,g)):(_=t[v+"Wrist"],x=t[v+"Hand"],M=li(.49,.53,g))}else y===4?g<.57?(_=i,x=t[v+"Hip"],M=li(.5,.57,g)):g<.76?(_=t[v+"Hip"],x=t[v+"Knee"],M=li(.66,.74,g)):(_=t[v+"Knee"],x=t[v+"Ankle"],M=li(.79,.84,g)):y===5||y===8?_=x=t[v+"Ankle"]:y===6?_=x=c:y===7&&(_=a,x=o,M=1-li(.17,.225,g));return{indices:[e.indexOf(_),e.indexOf(x),0,0],weights:[1-M,M,0,0]}}function u(y,f){let g=y.getAttribute("bodyUv"),v=y.getAttribute("surface"),_=[],x=[];for(let b=0;b<g.count;b++){let L=h(v.getX(b),g.getX(b),g.getY(b));_.push(...L.indices),x.push(...L.weights)}y.setAttribute("skinIndex",new Hi(_,4)),y.setAttribute("skinWeight",new Le(x,4));let M=new rs(y,f);return r.add(M),M.bind(l,new Ye),M.frustumCulled=!1,M}let d=0;function m(y,f,g){d+=(Number(f)-d)*(1-Math.exp(-Math.min(.1,g)*9));let v=Math.sin(y*1.55)*d;a.scale.set(1+v*.003,1+v*.003,1+v*.007),c.rotation.set(Math.sin(y*.57)*.01*d,Math.sin(y*.36)*.024*d,Math.sin(y*.41)*.008*d);for(let[_,x]of[["left",-1],["right",1]]){t[_+"Shoulder"].rotation.z=(Math.sin(y*.79+x*.5)*.009+x*.005)*d,t[_+"Elbow"].rotation.x=(Math.sin(y*.67+x*.4)*.012-.025)*d,t[_+"Hand"].rotation.x=Math.sin(y*.61+x)*.01*d;for(let M=0;M<4;M++)t[_+"Finger"+M].rotation.x=(.035+Math.sin(y*.53+M*.25+x)*.012)*d}r.updateMatrixWorld(!0),l.update()}function p(y,f){r.updateMatrixWorld(!0),t[f].attach(y)}return{skeleton:l,bones:t,mesh:u,update:m,attach:p,weights:h,dispose(){l.dispose()}}}function Eu(r,e="#c5b899"){let t=new Ve;t.name="wardrobe-wrist-watch",t.position.set(.79,.035,.04),t.rotation.z=-.12;let n=/gold|rose|bronze|DayDate|Skeleton/i.test(r),i=new gt({color:n?e:"#b7c2c9",metalness:.88,roughness:.24}),s=new gt({color:/roseDress|bronzePilot/.test(r)?"#51382c":"#171d22",roughness:.66,metalness:.1}),a=(x,M,b,L,O)=>{let U=new tt(x,M);return U.position.set(b,L,O),t.add(U),U},o=a(new St(.105,.016,12,64),/Dress|Pilot|smart/i.test(r)?s:i,0,0,0);if(o.rotation.x=Math.PI/2,o.scale.x=.78,!/Dress|Pilot|smart/i.test(r))for(let x=0;x<18;x++){let M=x*Math.PI/9,b=a(new $e(.026,.049,.016),i,Math.cos(M)*.083,0,Math.sin(M)*.105);b.rotation.y=-M}let c=a(new Xe(.078,.073,.022,64),i,0,0,.119);c.rotation.x=Math.PI/2;let l=a(new St(.069,.006,12,64),i,0,0,.136),h=document.createElement("canvas");h.width=h.height=512;let u=h.getContext("2d"),d=/green|Submariner|DayDate/i.test(r),m=/Daytona|square|rose/i.test(r),p=u.createRadialGradient(190,170,20,256,256,256);p.addColorStop(0,d?"#237050":m?"#fff7db":"#294559"),p.addColorStop(1,d?"#072b20":m?"#c7c4b4":"#06121c"),u.fillStyle=p,u.fillRect(0,0,512,512),u.translate(256,256);for(let x=0;x<60;x++)u.save(),u.rotate(x*Math.PI/30),u.strokeStyle=m?"#283333":"#f2dfb3",u.lineWidth=x%5?3:9,u.beginPath(),u.moveTo(0,-221),u.lineTo(0,x%5?-207:-184),u.stroke(),u.restore();let y=(x,M,b)=>{u.save(),u.rotate(x),u.strokeStyle=m?"#203337":"#f4e4bb",u.lineWidth=b,u.lineCap="round",u.beginPath(),u.moveTo(0,18),u.lineTo(0,-M),u.stroke(),u.restore()};y(-Math.PI/3,112,13),y(Math.PI/3,168,9),y(Math.PI*.1,183,3),u.fillStyle="#d7b66e",u.beginPath(),u.arc(0,0,14,0,Math.PI*2),u.fill(),u.font="bold 28px Arial",u.textAlign="center",u.fillStyle=m?"#334449":"#e3d6ac",u.fillText("\u2660",0,-80);let f=new Et(h);f.colorSpace=pt,f.anisotropy=4;let g=a(new Vn(.066,64),new gt({map:f,roughness:.34,metalness:.1}),0,0,.139),v=a(new Vn(.066,64),new Sn({color:"#e7f4ff",transparent:!0,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:!1}),0,0,.142),_=a(new Xe(.012,.012,.019,16),i,.085,0,.12);return _.rotation.z=Math.PI/2,{group:t,dispose(){let x=new Set;t.traverse(M=>{M.geometry?.dispose(),M.material&&x.add(M.material)});for(let M of x)M.dispose();f.dispose()}}}function Au(r="#d3b15b"){let e=new Ve;e.name="wardrobe-finger-ring",e.position.set(.731,-.225,.07);let t=new gt({color:"#c5a14d",metalness:.9,roughness:.24}),n=new gt({color:r,metalness:.25,roughness:.13}),i=new tt(new St(.026,.006,12,48),t);i.rotation.x=Math.PI/2,e.add(i);let s=new tt(new $e(.026,.026,.012),t);s.position.z=.028,e.add(s);let a=new tt(new Er(.017),n);return a.scale.z=.5,a.position.z=.039,e.add(a),{group:e,dispose(){e.traverse(o=>o.geometry?.dispose()),t.dispose(),n.dispose()}}}async function Cu(r,e,t={}){let n=window.PokerGarage,i=new Image;if(i.src="./assets/player-hall/standing-monkey-v1.webp",await i.decode(),await n.loadWardrobe(e),e.helmet&&e.helmet!=="none"){let _e=n.loadHelmet(!0,e.visor,!0,e.helmet);_e.naturalWidth||await new Promise((Be,Me)=>{_e.addEventListener("load",Be,{once:!0}),_e.addEventListener("error",Me,{once:!0})})}let s=n.renderCharacter(i,{...e,hair:"hairNatural",watch:"none",ring:"none"}),a=document.createElement("canvas");a.width=1024,a.height=1536;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,1536-s.height);let c=new Image;c.src="./assets/player-hall/character-3d/club-rear-v1.png",await c.decode();let l=document.createElement("canvas");l.width=1024,l.height=1536;let h=l.getContext("2d");h.drawImage(c,0,0,1024,1536);let u=new Image;u.src="./assets/player-hall/character-3d/club-side-v1.png",await u.decode();let d=document.createElement("canvas");d.width=1024,d.height=1536;let m=d.getContext("2d");m.drawImage(u,0,0,1024,1536);let p=m.getImageData(0,0,1024,1536).data,y=o.getImageData(0,0,1024,1536).data,f=h.getImageData(0,0,1024,1536).data;function g(_e,Be,Me){let Te=Math.max(0,Math.min(1535,Math.round(Me*1535))),We=Math.max(0,Math.min(1023,Math.round(Be*1023)));if(_e[(Te*1024+We)*4+3]>220)return Be;for(let vt=1;vt<180;vt++)for(let Ae of[We-vt,We+vt])if(Ae>=0&&Ae<1024&&_e[(Te*1024+Ae)*4+3]>220)return Ae/1023;return Be}let v=new Et(a),_=new Et(l),x=new Et(d);for(let _e of[v,_,x])_e.colorSpace=pt,_e.anisotropy=4;let M=n.wardrobeSubcategory("pants",e.pants)==="shorts",b=e.suit?.endsWith("Tank"),L=e.suit?.endsWith("Tee"),O=["classic","ruby","midnight"].includes(e.suit),U=!!e.helmet&&e.helmet!=="none",k=new fn({uniforms:{helmetColor:{value:new Ze(e.helmet==="formulaCrimson"?"#b82e38":e.helmet==="formulaGold"?"#e9dec3":"#ccd1d4")},helmetStripe:{value:new Ze(e.helmet==="formulaGold"?"#b48e3d":e.helmet==="formulaCrimson"?"#151b20":"#a50408")},idleTime:{value:0},idleStrength:{value:0},palmPattern:{value:e.suit==="palmTank"?1:0},hairChanged:{value:!U&&(!e.hat||e.hat==="none")&&e.hair&&e.hair!=="hairNatural"?1:0},helmetOn:{value:U?1:0},shorts:{value:M?1:0},sleeveEnd:{value:b?.165:L?.29:.49},club:{value:O?1:0},portrait:{value:v},rear:{value:_},profile:{value:x},jacketColor:{value:new Ze(n.item("suit",e.suit).color)},pantsColor:{value:new Ze(n.item("pants",e.pants).color)},shoeColor:{value:new Ze(n.item("shoes",e.shoes).color)}},side:Nt,vertexShader:`
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
}`}),I=new Ve,D=[],K=wu(I),V=Is(e.body);function j(_e,{rings:Be=70,sides:Me=80,muzzle:Te=!1,folds:We=0,z:vt=0,surface:Ae=0}={}){let nt=[],it=[],rn=[],hn=[],H=[],Ot=[],yt=[],st=[],_n=_e[0][0],Ft=_e.at(-1)[0];function ci(Wt){let ct=0;for(;ct<_e.length-2&&_e[ct+1][0]<Wt;)ct++;let Yt=_e[ct],Lt=_e[ct+1],Xt=Math.max(0,Math.min(1,(Wt-Yt[0])/(Lt[0]-Yt[0])));return Yt.map((an,Qt)=>{if(Qt===0)return Wt;let yn=_e[Math.max(0,ct-1)][Qt]||0,un=_e[Math.min(_e.length-1,ct+2)][Qt]||0,on=Lt[Qt]||0;return Math.max(Math.min(an,on),Math.min(Math.max(an,on),.5*(2*an+(-yn+on)*Xt+(2*yn-5*an+4*on-un)*Xt*Xt+(-yn+3*an-3*on+un)*Xt*Xt*Xt)))})}for(let Wt=0;Wt<=Be;Wt++){let ct=_n+(Ft-_n)*Wt/Be,[,Yt,Lt,Xt,an=0]=ci(ct),Qt=(Yt+Lt)/2,yn=(Lt-Yt)/2;for(let un=0;un<=Me;un++){let on=2*Math.PI*un/Me,Kn=Math.cos(on),Cn=Math.sin(on),jt=Qt+yn*Kn,wt=Ae===1||Ae===2&&ct<(b?.165:L?.29:.49)||Ae===4&&(!M||ct<.65),qt=Xt*(1+(wt?We:0)*Math.sin(ct*65+on*3)*Math.sin(Math.PI*Wt/Be)),_t=vt+an+qt*Cn;if(Te&&Cn>0){let Ie=(jt-.507)/.085;_t+=.17*Math.exp(-(Ie*Ie)-((ct-.126)/.031)**2)*Cn*Cn,_t+=.045*Math.exp(-(((jt-.505)/.05)**2)-((ct-.104)/.015)**2)*Cn,_t-=.028*(Math.exp(-(((jt-.466)/.024)**2))+Math.exp(-(((jt-.55)/.024)**2)))*Math.exp(-(((ct-.077)/.013)**2))*Cn}let R=V(((Ae===5?Qt+(jt-Qt)*.88:jt)-.5)*2.55,ct,Ae===5?_t*.84:_t,Ae);if(Te&&e.hair&&e.hair!=="hairNatural"&&ct<.065){let Ie=1-ct/.065;R[0]*=1-.12*Ie,R[2]=.1+(R[2]-.1)*(1-.1*Ie),R[1]+=.008*Ie}nt.push(R[0],(.5-R[1])*3.825,R[2]),Ot.push(jt,ct),yt.push(Ae);let q=jt,J=ct;Ae===3&&(q=(jt<.5?.2:.8)+(jt-(Yt+Lt)/2)*.45,J=Math.min(ct,.545)),it.push(g(y,q,J),1-J);let re=ct,ne=jt;Te?re=.008+(ct-.008)*.74:_n<.24&&Ft>.4&&Yt>.29&&Lt<.72&&(re=.14+(ct-.165)*1.08),_n>.82&&(ne=Qt+(jt-Qt)*.8),rn.push(g(f,ne,re),1-re);let Se=Te?ct*.92:ct,De=(Te?.45:.49)+_t*.4;if(_n>=.45&&Ft>.62&&ct>.49&&ct<.62&&(De=Math.min(De,.43)),hn.push(g(p,De,Se),1-Se),H.push(Cn),Wt<Be&&un<Me){let Ie=Wt*(Me+1)+un,ke=Ie+Me+1;st.push(Ie,Ie+1,ke,Ie+1,ke+1,ke)}}}for(let Wt of[0,Be]){let ct=Wt*(Me+1),Yt=nt.length/3;for(let[Lt,Xt]of[[nt,3],[it,2],[rn,2],[hn,2],[Ot,2]])for(let an=0;an<Xt;an++){let Qt=0;for(let yn=0;yn<Me;yn++)Qt+=Lt[(ct+yn)*Xt+an];Lt.push(Qt/Me)}yt.push(Ae),H.push(0);for(let Lt=0;Lt<Me;Lt++)Wt===0?st.push(Yt,ct+Lt+1,ct+Lt):st.push(Yt,ct+Lt,ct+Lt+1)}let zt=new mt;zt.setAttribute("bodyUv",new Le(Ot,2)),zt.setAttribute("surface",new Le(yt,1)),zt.setAttribute("position",new Le(nt,3)),zt.setAttribute("uv",new Le(it,2)),zt.setAttribute("rearUv",new Le(rn,2)),zt.setAttribute("profileUv",new Le(hn,2)),zt.setAttribute("frontWeight",new Le(H,1)),zt.setIndex(st),zt.computeVertexNormals(),K.mesh(zt,k),D.push(zt)}j([[.165,.435,.575,.1],[.19,b?.405:.35,b?.605:.65,b?.15:.21],[.245,b?.335:.313,b?.675:.69,.235],[.32,.33,.68,.225],[.4,.33,.67,.21],[.455,.33,.67,.195],[.475,.37,.63,.18]],{folds:.025,surface:1}),j([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7}),j(U?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.1,.397,.617,.32],[.15,.416,.6,.3],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!U,z:.1,rings:110,sides:112,surface:6}),U||(j([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6}),j([[.055,.614,.627,.008],[.064,.6,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6}));for(let _e of[-1,1]){let Be=Me=>_e<0?Me:Me.map(([Te,We,vt,Ae,nt])=>[Te,1-vt,1-We,Ae,nt||0]);j(Be([[.175,.318,.363,.065],[.2,.26,.35,.13],[.255,.22,.328,.145],[.305,.194,.305,.121,.005],[.34,.185,.283,.103,-.018],[.375,.17,.272,.132,.004],[.41,.153,.256,.128,.018],[.455,.149,.241,.1,.018],[.49,.158,.23,.079,.01]]),{z:-.025,folds:.025,rings:100,surface:2}),!L&&!b?j(Be([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2}):L&&j(Be([[.279,.205,.317,.143],[.288,.201,.314,.144]]),{z:-.025,rings:8,surface:2}),O&&j(Be([[.491,.156,.227,.084],[.5,.159,.225,.08]]),{z:.005,rings:8,surface:9}),j(Be([[.478,.168,.221,.055],[.493,.151,.23,.08],[.515,.151,.241,.082],[.531,.153,.245,.086],[.545,.165,.241,.066],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});for(let Me=0;Me<4;Me++){let Te=.166+Me*.019,We=.54+Me*.002,vt=[.039,.046,.043,.034][Me];j(Be([[We,Te,Te+.019,.024,0],[We+vt*.35,Te-.001,Te+.02,.025,.008],[We+vt*.72,Te+.001,Te+.018,.021,.026],[We+vt,Te+.005,Te+.014,.007,.035]]),{z:.07,rings:22,sides:24,surface:3})}j(Be([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3})}j([[.454,.36,.65,.17],[.48,.313,.69,.205],[.53,.3,.703,.215],[.58,.31,.69,.205],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});for(let _e of[-1,1]){let Be=Me=>_e<0?Me:Me.map(([Te,We,vt,Ae,nt])=>[Te,1-vt,1-We,Ae,nt||0]);j(Be([[.55,.296,.5,.2],[.61,.283,.468,.205],[.68,M?.302:.271,M?.428:.44,M?.14:.19],[.72,M?.292:.262,M?.416:.432,M?.155:.19],[.77,M?.286:.247,M?.396:.41,M?.135:.175],[.81,M?.294:.248,M?.387:.393,M?.115:.16],[.843,M?.3:.27,M?.379:.385,M?.095:.13],[.884,.304,.368,.078],[.92,.308,.361,.07]]),{z:-.01,folds:.012,rings:110,surface:4}),j(Be([[.893,.304,.352,.075,-.015],[.908,.284,.373,.12,.015],[.929,.269,.386,.215,.095],[.95,.263,.389,.275,.145],[.963,.265,.387,.281,.15],[.972,.272,.38,.267,.15]]),{z:.015,rings:54,surface:5}),j(Be([[.968,.269,.383,.269,.15],[.974,.265,.387,.277,.15],[.982,.267,.385,.272,.15],[.986,.276,.376,.251,.15]]),{z:.015,rings:14,surface:8})}let ie=bu(K,e,n),de=Tu(K,e),le=e.ring&&e.ring!=="none"?Au(n.item("ring",e.ring).color):null;le&&(I.add(le.group),K.attach(le.group,"rightHand"));let be=e.watch&&e.watch!=="none"?Eu(e.watch,n.item("watch",e.watch).color):null;be&&(I.add(be.group),K.attach(be.group,"rightWrist"));let te=new Mn;te.add(I);{te.add(new Fn("#fff0d4","#283849",2.1));let _e=new En("#fff0dc",3.5);_e.position.set(-2,4,5),te.add(_e);let Be=new En("#9cc3ed",1.2);Be.position.set(3,1,-2),te.add(Be)}let ce=new Xn({alpha:!0,antialias:!0});ce.setPixelRatio(Math.min(devicePixelRatio,2)),ce.outputColorSpace=pt,r.append(ce.domElement),ce.domElement.setAttribute("role","img"),ce.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u044B\u0439 \u041F\u043E\u043A\u0435\u0440\u043C\u0430\u043D\u043A\u0438: \u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C");let we=new Mi(-1.5,1.5,2.05,-2.05,.1,30);we.position.set(0,0,8);let he=t.yaw||0,ge=t.pitch||0,pe=null,Z,Ce=!1,A=!1,E=0,W=window.matchMedia?.("(prefers-reduced-motion: reduce)"),z="full",S=t.focusOrbit||null,P=2.05,G=0,F=0;function ae(_e){_e=_e==="watch"?"watch":"full",_e!==z&&(_e==="watch"?(S=S||{yaw:he,pitch:ge},t.focusOrbit=S,he=0,ge=0):S&&(he=S.yaw,ge=S.pitch,S=null,delete t.focusOrbit),t.yaw=he,t.pitch=ge,z=_e,r.dataset.focus=z)}function Y(_e){let Be=r.clientWidth/Math.max(1,r.clientHeight),Me=z==="watch",Te=Me?Math.max(.4,.3/Be):Math.max(2.4,1.17/Be),We=Me?.76*Math.cos(he)+.1*Math.sin(he):0,vt=Me?.04*Math.cos(ge)-(.1*Math.cos(he)-.76*Math.sin(he))*Math.sin(ge):-.22,Ae=1-Math.exp(-_e*12);P+=(Te-P)*Ae,G+=(We-G)*Ae,F+=(vt-F)*Ae,we.left=G-P*Be,we.right=G+P*Be,we.top=F+P,we.bottom=F-P,we.updateProjectionMatrix()}let $=()=>{!r.clientWidth||!r.clientHeight||(Y(1),ce.setSize(r.clientWidth,r.clientHeight,!1))},xe=new ResizeObserver($);xe.observe(r),$();let Fe=_e=>{A=!1,pe={id:_e.pointerId,x:_e.clientX,y:_e.clientY},r.setPointerCapture(_e.pointerId),_e.preventDefault()},ye=_e=>{!pe||pe.id!==_e.pointerId||(he+=(_e.clientX-pe.x)*.012,ge=Math.max(-.35,Math.min(.35,ge+(_e.clientY-pe.y)*.006)),pe.x=_e.clientX,pe.y=_e.clientY)},Pe=()=>{pe=null},Ge=_e=>{["ArrowLeft","ArrowRight"].includes(_e.key)&&(he+=_e.key==="ArrowLeft"?-.15:.15,_e.preventDefault())};r.addEventListener("pointerdown",Fe),r.addEventListener("pointermove",ye),r.addEventListener("pointerup",Pe),r.addEventListener("pointercancel",Pe),r.addEventListener("keydown",Ge);function je(_e=0){if(Ce)return;if(!r.isConnected){lt();return}A&&!pe&&E&&(he+=Math.min(.05,(_e-E)/1e3)*.35),k.uniforms.idleTime.value=_e/1e3,k.uniforms.idleStrength.value=!W?.matches&&!pe&&z==="full"?1:0;let Be=E?Math.min(.05,(_e-E)/1e3):.016;K.update(_e/1e3,k.uniforms.idleStrength.value,Be),Y(Be),E=_e,I.rotation.set(ge,he,0),t.yaw=he,t.pitch=ge,r.dataset.yaw=String(he),ce.render(te,we),Z=requestAnimationFrame(je)}return je(),{state:t,setFocus:ae,setYaw(_e){he=_e},setAutoRotate(_e){A=!!_e},dispose:lt};function lt(){if(!Ce){Ce=!0,cancelAnimationFrame(Z),xe.disconnect();for(let[_e,Be]of[["pointerdown",Fe],["pointermove",ye],["pointerup",Pe],["pointercancel",Pe],["keydown",Ge]])r.removeEventListener(_e,Be);for(let _e of D)_e.dispose();be?.dispose(),le?.dispose(),ie.dispose(),de.dispose(),K.dispose(),k.dispose(),v.dispose(),_.dispose(),x.dispose(),ce.dispose(),ce.forceContextLoss(),ce.domElement.remove()}}}window.pokerCreateCharacter3D=function(r,e,t={}){let n=window.PokerGarage,i=new Mn,s=new Ve;i.add(s);let a=new Xn({alpha:!0,antialias:!0});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.outputColorSpace=pt,a.toneMapping=si,r.append(a.domElement),a.domElement.setAttribute("role","img"),a.domElement.setAttribute("aria-label","3D-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C");let o=new kt(34,1,.1,40);i.add(new Fn("#dcecff","#50402b",2));for(let[Z,Ce,A,E]of[[3,6,5,4],[-3,3,-3,3]]){let W=new En("#fff0dd",E);W.position.set(Z,Ce,A),i.add(W)}let c=document.createElement("canvas");c.width=c.height=128;let l=c.getContext("2d");l.fillStyle="#999999",l.fillRect(0,0,128,128);for(let Z=0;Z<128;Z+=2)l.fillStyle=Z%4?"#808080":"#b0b0b0",l.fillRect(0,Z,128,1);for(let Z=0;Z<128;Z+=3)l.fillStyle="#888888",l.fillRect(Z,0,1,128);let h=new Et(c);h.wrapS=h.wrapT=Zn,h.repeat.set(8,8);let u=(Z,Ce=0,A=.7)=>new gt({color:Z,metalness:Ce,roughness:A}),d=u("#32251d"),m=u("#96715a"),p=u("#11161b"),y=u("#e0dfd4"),f=u("#d9ac4c",.8,.25),g=u("#a22c3b"),v=u("#171b20"),_=u("#171b20"),x=u("#826222",.9,.18);for(let Z of[g,v,p])Z.bumpMap=h,Z.bumpScale=.012;function M(Z,Ce,A,E,W,z,S,P=s){let G=new tt(new Jt(1,40,28),Z);return G.position.set(Ce,A,E),G.scale.set(W,z,S),P.add(G),G}function b(Z,Ce,A,E,W=E){let z=new w(...Ce),S=new w(...A),P=S.clone().sub(z),G=new tt(E>.1?new Tr((E+W)/2,Math.max(.01,P.length()-(E+W)),10,32):new Xe(W,E,P.length(),16),Z);return G.position.copy(z.add(S).multiplyScalar(.5)),G.quaternion.setFromUnitVectors(new w(0,1,0),P.normalize()),s.add(G),G}M(v,0,1.64,0,.47,.36,.26),M(g,0,2.32,0,.59,.65,.32),M(p,0,2.35,.29,.27,.49,.055);for(let Z of[-1,1]){b(v,[Z*.27,1.67,0],[Z*.29,.92,.015],.23,.25),M(v,Z*.29,.92,.015,.23,.24,.24),b(v,[Z*.29,.94,.015],[Z*.32,.28,0],.16,.22),b(y,[Z*.45,1.55,.03],[Z*.48,.36,.03],.025,.032),M(_,Z*.32,.18,.15,.22,.19,.39),M(y,Z*.32,.075,.15,.235,.065,.4),M(y,Z*.32,.27,.12,.135,.08,.2);for(let Ce=0;Ce<5;Ce++)b(y,[Z*.32-.1,.29,.08+Ce*.04],[Z*.32+.1,.29,.08+Ce*.04],.009);M(g,Z*.55,2.63,0,.26,.27,.29),b(g,[Z*.57,2.63,0],[Z*.76,2.12,.02],.19,.23),M(g,Z*.76,2.12,.02,.19,.2,.2),b(g,[Z*.76,2.12,.02],[Z*.88,1.65,.08],.13,.18),b(y,[Z*.71,2.6,.15],[Z*.99,1.72,.15],.035),M(p,Z*.88,1.67,.08,.145,.09,.15),M(d,Z*.89,1.48,.1,.16,.22,.12);for(let Ce=0;Ce<4;Ce++)M(m,Z*(.79+Ce*.065),1.36,.15,.035,.13,.045);M(m,Z*.75,1.48,.2,.06,.12,.06)}M(d,0,3.04,0,.25,.27,.24),M(d,0,3.39,0,.36,.43,.31);for(let Z of[-1,1])M(m,Z*.36,3.4,.01,.12,.17,.09),M(d,Z*.36,3.4,.065,.065,.1,.035),M(m,Z*.15,3.43,.258,.15,.12,.075),M(p,Z*.14,3.44,.32,.045,.035,.02),M(y,Z*.13,3.45,.335,.009,.01,.006),M(d,Z*.15,3.53,.28,.18,.05,.07);M(m,0,3.23,.27,.26,.18,.13),M(m,0,3.34,.34,.14,.08,.08),M(p,0,3.17,.375,.17,.017,.018),M(m,0,3.13,.36,.17,.035,.025);let L=new Ve;s.add(L),M(p,0,3.51,-.02,.41,.42,.35,L),M(f,0,3.64,.015,.07,.3,.36,L);for(let Z of[-1,1])M(p,Z*.32,3.29,.015,.1,.31,.24,L),M(f,Z*.39,3.43,.07,.025,.05,.05,L);let O=M(x,0,3.44,.27,.38,.19,.14,L);for(let Z of[-1,1])b(p,[Z*.28,2.88,.25],[Z*.1,2.58,.33],.035),b(p,[Z*.3,2.28,.3],[Z*.39,2.09,.26],.018);for(let Z=0;Z<6;Z++)M(f,0,2.03+Z*.14,.35,.015,.015,.01);let U=document.createElement("canvas");U.width=512,U.height=256;let k=U.getContext("2d"),I=new Et(U);I.colorSpace=pt;let D=new tt(new Zt(.28,.12),new gt({map:I,roughness:.9}));D.position.set(-.27,2.46,.317),s.add(D);let K=new Ve;for(let Z=0;Z<3;Z++)for(let Ce=0;Ce<5;Ce++){let A=new tt(new Zt(.048,.048),(Ce+Z)%2?p:y);A.position.set(-.36+Ce*.048,2.62+Z*.048,.318),K.add(A)}s.add(K);function V(Z){g.color.set(n.item("suit",Z.suit).color),v.color.set(n.item("pants",Z.pants).color),_.color.set(n.item("shoes",Z.shoes).color),L.visible=Z.helmet!=="none",O.position.y=Z.visor==="open"?3.71:3.44,O.rotation.x=Z.visor==="open"?-.8:0,D.visible=Z.patch!=="none",k.fillStyle="#22282b",k.fillRect(0,0,512,256),k.strokeStyle="#c9af74",k.lineWidth=12,k.strokeRect(8,8,496,240),k.fillStyle="#eee0b5",k.font="bold 72px Arial",k.textAlign="center",k.fillText(Z.patch==="name"?Z.patchText||"\u0412\u0410\u0428\u041D\u0418\u041A":Z.patch==="sevenTwo"?"7\u2660 2\u2665":"A\u2660 A\u2665",256,150,460),I.needsUpdate=!0}V(e),t.yaw??=0,t.pitch??=.07;let j=null,ie,de=!1;function le(){let Z=r.clientWidth,Ce=r.clientHeight;!Z||!Ce||(a.setSize(Z,Ce,!1),o.aspect=Z/Ce,o.updateProjectionMatrix())}let be=new ResizeObserver(le);be.observe(r),le();let te=Z=>{j={id:Z.pointerId,x:Z.clientX,y:Z.clientY},r.setPointerCapture(Z.pointerId),Z.preventDefault()},ce=Z=>{!j||j.id!==Z.pointerId||(t.yaw-=(Z.clientX-j.x)*.012,t.pitch=Math.max(-.3,Math.min(.5,t.pitch+(Z.clientY-j.y)*.006)),j.x=Z.clientX,j.y=Z.clientY)},we=()=>{j=null},he=Z=>{(Z.key==="ArrowLeft"||Z.key==="ArrowRight")&&(t.yaw+=Z.key==="ArrowLeft"?.15:-.15,Z.preventDefault())};r.addEventListener("pointerdown",te),r.addEventListener("pointermove",ce),r.addEventListener("pointerup",we),r.addEventListener("pointercancel",we),r.addEventListener("keydown",he);function ge(){if(de)return;de=!0,cancelAnimationFrame(ie),be.disconnect();for(let[Ce,A]of[["pointerdown",te],["pointermove",ce],["pointerup",we],["pointercancel",we],["keydown",he]])r.removeEventListener(Ce,A);let Z=new Set;i.traverse(Ce=>{Ce.geometry?.dispose(),Ce.material&&Z.add(Ce.material)});for(let Ce of Z)Ce.dispose();I.dispose(),h.dispose(),a.dispose(),a.domElement.remove()}function pe(){if(de)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){ge();return}let Z=Math.max(7.3,2.6/o.aspect);o.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*Z,1.95+Math.sin(t.pitch)*Z,Math.cos(t.yaw)*Math.cos(t.pitch)*Z),o.lookAt(0,1.95,0),a.render(i,o),r.dataset.yaw=String(t.yaw),ie=requestAnimationFrame(pe)}return pe(),{update:V,dispose:ge,state:t}};function cc(r){let e=new Ve;e.name="sport-brakes-"+r;let t=r==="stock",n=r==="ceramic",i=(U,k,I)=>new Sn({color:U,metalness:k,roughness:I,clearcoat:.3,clearcoatRoughness:.2}),s=i("#c1cad0",.88,.3),a=i("#202831",.65,.44),o=i(n?"#62676b":"#aab4bd",n?.3:.85,n?.7:.32),c=i(t?"#56616c":r==="red"?"#cf192c":r==="gold"?"#d6a43c":"#dfc550",.5,.29),l=(U,k,I=0,D=0,K=0)=>{let V=new tt(U,k);return V.position.set(I,D,K),V.castShadow=V.receiveShadow=!0,e.add(V),V},h=(U,k,I,D=!0)=>{let K=new gn;return K.absarc(k,I,U,0,Math.PI*2,D),K},u=t?.395:.437,d=new Ht;if(d.absarc(0,0,u,0,Math.PI*2,!1),d.holes.push(h(.181,0,0)),!t)for(let U=0;U<24;U++)for(let[k,I]of[[.28,0],[.36,.045]]){let D=U*Math.PI/12+I;d.holes.push(h(n?.009:.011,Math.cos(D)*k,Math.sin(D)*k))}for(let U of[0,.033])l(new Ut(d,{depth:.008,bevelEnabled:!1,curveSegments:t?64:12}),o,0,0,U);let m=new $e(.22,.014,.025),p=new ls(m,a,32),y=new Ye;for(let U=0;U<32;U++){let k=U*Math.PI/16;y.compose(new w(Math.cos(k)*.31,Math.sin(k)*.31,.021),new Dn().setFromAxisAngle(new w(0,0,1),k+.18),new w(1,1,1)),p.setMatrixAt(U,y)}e.add(p);let f=l(new Xe(.184,.16,.045,48),a,0,0,.018);f.rotation.x=Math.PI/2;let g=l(new Xe(.095,.11,.055,32),s,0,0,.035);g.rotation.x=Math.PI/2;for(let U=0;U<10;U++){let k=U*Math.PI/5,I=l(new Xe(.017,.017,.015,12),s,Math.cos(k)*.18,Math.sin(k)*.18,.05);I.rotation.x=Math.PI/2;let D=l(new Xe(.009,.009,.018,6),a,Math.cos(k)*.18,Math.sin(k)*.18,.058);D.rotation.x=Math.PI/2}for(let U of[.235,.26,.31,.335,.39,.414])if(U<u){let k=l(new St(U,.0012,3,96),a,0,0,.042);k.castShadow=!1}if(!t)for(let U=0;U<8;U++){let k=U*Math.PI/4,I=[.25,.29,.34,.395].map((K,V)=>new w(Math.cos(k+V*.075)*K,Math.sin(k+V*.075)*K,.043)),D=l(new Tt(new Mt(I),12,.0024,3,!1),a);D.castShadow=!1}let v=new Ht;v.moveTo(-.08,-.2),v.quadraticCurveTo(-.13,-.15,-.115,-.06),v.lineTo(-.115,.1),v.quadraticCurveTo(-.12,.19,-.05,.215),v.lineTo(.055,.19),v.quadraticCurveTo(.11,.14,.105,.06),v.lineTo(.105,-.1),v.quadraticCurveTo(.1,-.19,.04,-.21),v.closePath();let _=l(new Ut(v,{depth:.065,bevelEnabled:!0,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),c,.323,.005,.011);t&&_.scale.set(.8,.8,.8),l(new $e(.09,.31,.032),a,.27,0,.005);for(let U of[-.125,0,.125]){let k=l(new Xe(.055,.055,.028,24),c,.354,U,.07);k.rotation.x=Math.PI/2}for(let U of[-.155,.155]){let k=l(new Xe(.014,.014,.025,6),s,.325,U,.094);k.rotation.x=Math.PI/2}let x=document.createElement("canvas");x.width=128,x.height=384;let M=x.getContext("2d");M.fillStyle="#f5f0df",M.translate(64,192),M.rotate(-Math.PI/2),M.textAlign="center",M.font="italic bold 60px Arial",M.fillText(t?"P21":"P21 SPORT",0,20);let b=new Et(x);b.colorSpace=pt;let L=l(new Zt(.075,.24),new kn({map:b,transparent:!0,depthWrite:!1}),.329,0,.1);L.castShadow=!1;let O=l(new Xe(.012,.014,.047,6),s,.36,.217,.042);return O.rotation.z=.2,e}var lc;function Ru(r,e){if(!r.isConnected)return;if(!lc){let a=new Xn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=pt,a.toneMapping=si,a.toneMappingExposure=1.15;let o=new Mn;o.add(new Fn("#eaf1ff","#342a22",2));for(let[l,h,u,d]of[[2,3,4,4],[-3,0,2,2]]){let m=new En("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new kt(30,1,.1,10);c.position.set(.65,.35,2.1),c.lookAt(.025,0,0),lc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=lc;s[e]||(s[e]=cc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}function Pu(r){let e=new Ve;e.name="tyre-"+r;let t=new gt({color:"#15181b",roughness:.86}),n=new gt({color:"#050708",roughness:.96}),i=new gt({color:r==="soft"?"#e63e3b":r==="medium"?"#ecc84e":r==="wet"?"#528edd":"#e8e8dc",roughness:.6}),s=(l,h)=>{let u=new tt(l,h);return u.castShadow=u.receiveShadow=!0,e.add(u),u},a=s(new xi([new ue(.56,-.19),new ue(.63,-.25),new ue(.72,-.23),new ue(.79,-.15),new ue(.8,-.1),new ue(.8,.1),new ue(.79,.15),new ue(.72,.23),new ue(.63,.25),new ue(.56,.19)],96),t);a.rotation.x=Math.PI/2;for(let l of[-1,1]){let h=s(new St(.69,.009,8,80),i);h.position.z=l*.247;for(let u=0;u<16;u++){let d=u*Math.PI/8,m=s(new $e(.018,.036,.006),i);m.position.set(Math.sin(d)*.71,Math.cos(d)*.71,l*.246),m.rotation.z=-d}}let o=r==="wet";if(o||r==="semi"){for(let l=0;l<(o?44:22);l++){let h=l*2*Math.PI/(o?44:22),u=Array.from({length:16},(d,m)=>{let p=-.2+m/15*.4,y=.8-.045*(Math.abs(p)/.2)**3,f=h+(o?.18:.08)*Math.sin(m/15*Math.PI);return new w(Math.sin(f)*y,Math.cos(f)*y,p)});s(new Tt(new Mt(u),20,o?.007:.0045,5,!1),n)}for(let l of o?[-.14,-.045,.045,.14]:[-.08,.08]){let h=s(new St(.798,.004,8,80),n);h.position.z=l}}return e}function Iu(r,e=1.1){let t={value:0};function n(i){i.uniforms.formulaBodyMode=t,i.vertexShader=`attribute float chassisX;varying float vChassisX;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vChassisX=chassisX;`),i.fragmentShader=`uniform float formulaBodyMode;varying float vChassisX;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`void main() {
if(formulaBodyMode>.5&&vChassisX>`+e.toFixed(3)+")discard;")}for(let i of r){if(!i.geometry||!i.material)continue;i.updateMatrix();let s=i.geometry.getAttribute("position"),a=[],o=new w;for(let u=0;u<s.count;u++)o.fromBufferAttribute(s,u).applyMatrix4(i.matrix),a.push(o.x);i.geometry.setAttribute("chassisX",new Le(a,1));let c=i.material,l=c.clone();for(let u of["color","emissive"])c[u]&&(l[u]=c[u]);l.onBeforeCompile=n,l.customProgramCacheKey=()=>"formula-body-transition-v1",i.material=l,i.onBeforeRender=()=>{for(let u of["map","bumpMap","normalMap","roughness","metalness","emissiveIntensity"])l[u]!==c[u]&&(l[u]=c[u],(u.endsWith("Map")||u==="map")&&(l.needsUpdate=!0))};let h=new Ar({depthPacking:ao});h.onBeforeCompile=n,h.customProgramCacheKey=()=>"formula-body-transition-depth-v1",i.customDepthMaterial=h}return{set(i){t.value=i?1:0}}}function Lu(r,e){let{paint:t,carbon:n,metal:i,accent:s}=e,a=r!=="formula",o=r==="formulaElite",c=new Ve;c.name="front-wing-"+r;let l=o?3.56:a?3.32:3.1,h=a?4:2,u=(M,b,L)=>{let O=new tt(M,b);return O.name=L,O.castShadow=O.receiveShadow=!0,c.add(O),O};for(let M=0;M<h;M++){let b=[],L=[];for(let I=0;I<=72;I++){let D=I/72*2-1,K=D*l/2,V=(M?a?.36:.46:.76)*(1-.22*D*D),j=(M?2.86+M*.055:3.02)-.13*D*D,ie=.43+M*.095+.1*Math.pow(Math.abs(D),3);for(let de=0;de<=28;de++){let le=de/28*Math.PI*2,be=Math.cos(le);b.push(j+be*V/2,ie+.035*(1-be*be)+Math.sin(le)*(M?.024:.035),K)}if(I<72)for(let de=0;de<28;de++){let le=I*29+de,be=le+28+1;L.push(le,le+1,be,le+1,be+1,be)}}let k=new mt;k.setAttribute("position",new Le(b,3)),k.setIndex(L),k.computeVertexNormals(),u(k,M===0?n:t,"wing-element-"+M)}let d=[[1.06,1.06,1.22,.49],[1.3,1.1,1.04,.45],[1.65,1.13,.64,.37],[2.02,1.08,.43,.28],[2.39,.95,a?.34:.3,.2],[2.77,.79,a?.25:.2,.13],[3.13,.66,a?.19:.12,.075],[3.27,.64,a?.16:.075,.045]],m=[0,1,2,3].map(M=>new Mt(d.map((b,L)=>new w(b[M],L,0)),!1,"catmullrom",.35)),p=[],y=[],f=96,g=48;for(let M=0;M<=f;M++){let b=M/f,[L,O,U,k]=m.map(I=>I.getPoint(b).x);for(let I=0;I<=g;I++){let D=I/g*Math.PI*2,K=Math.cos(D),V=Math.sin(D),j=a?.7:.82;p.push(L,O+Math.sign(V)*Math.pow(Math.abs(V),j)*k,Math.sign(K)*Math.pow(Math.abs(K),j)*U)}if(M<f)for(let I=0;I<g;I++){let D=M*(g+1)+I,K=D+1;y.push(D,D+g+1,K,K,D+g+1,K+g+1)}}let v=y.length;for(let M of[0,f]){let b=M*(g+1);for(let L=1;L<g-1;L++)M===0?y.push(b,b+L,b+L+1):y.push(b,b+L+1,b+L)}let _=new mt;_.setAttribute("position",new Le(p,3)),_.setIndex(y),_.computeVertexNormals();let x=Math.floor(f*.89)*g*6;_.addGroup(0,x,0),_.addGroup(x,v-x,a?1:0),_.addGroup(v,y.length-v,0),u(_,[t,s],"tapered-nose");for(let M of[-1,1]){let b=u(new $e(.19,.22,.035),n,"nose-pylon");b.position.set(3.02,.53,M*.1),b.rotation.z=-.15;let L=new Ht;L.moveTo(2.57,.38),L.lineTo(3.43,.38),L.quadraticCurveTo(3.53,.42,3.43,.61),L.lineTo(3.14,a?.95:.82),L.quadraticCurveTo(2.79,a?.97:.84,2.61,.69),L.closePath();let O=u(new Ut(L,{depth:.035,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),a?t:n,"endplate");O.position.z=M*l/2-.017,u(new $e(.81,.025,.18),n,"endplate-foot").position.set(3.02,.39,M*(l/2+.055));let k=new Mt([[2.65,.7],[2.9,a?.94:.81],[3.13,a?.94:.81],[3.4,.61]].map(([I,D])=>new w(I,D,M*(l/2+.025))));if(u(new Tt(k,28,.009,6,!1),s,"endplate-trim"),a)for(let I=0;I<3;I++){let D=u(new $e(.27,.13,.018),n,"flow-fin");D.position.set(2.86+I*.07,.58+I*.07,M*(1.1+I*.1)),D.rotation.z=.15}}return c}function hc(r,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new cn;function i(s){if(s.visible){s.geometry&&(s.geometry.boundingBox||s.geometry.computeBoundingBox(),n.union(s.geometry.boundingBox.clone().applyMatrix4(new Ye().multiplyMatrices(t,s.matrixWorld))));for(let a of s.children)i(a)}}for(let s of r)i(s);return n}function uc(r,{paint:e,carbon:t,metal:n}){let i=new Ve;i.name="rear-wing-"+r;let s=new Ve;s.name="rear-wing-airfoils",i.add(s);let a=r==="formulaPro",o=r.startsWith("formula"),c=r==="double"||a,l=r==="lip"?1.43:r==="sport"?1.78:a?2.3:2.08,h=a?2.48:o?2.36:r==="gt"||c?2.16:1.8,u=o?.54:r==="lip"?.24:.38;function d(g,v,_,x,M,b,L=i){let O=new tt(g,v);return O.name=_,O.position.set(x,M,b),O.castShadow=O.receiveShadow=!0,L.add(O),O}function m(g,v,_,x,M){let b=new Ht;b.moveTo(-x*.5,0),b.bezierCurveTo(-x*.52,.055,-x*.12,.07,x*.5,.008),b.quadraticCurveTo(x*.05,-.025,-x*.5,0);let L=new Ut(b,{depth:_,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});L.translate(0,0,-_/2);let O=d(L,M,"rear-wing-blade",g,v,0,s);O.rotation.z=-.08}if(m(0,l,h,u,o||r==="sport"?t:n),c&&m(.025,l+.23,h*.96,u*.7,t),a&&m(-.05,l-.18,h,.3,e),r!=="lip")for(let g of[-1,1])d(new $e(u+.1,c?.42:.24,.035),o?e:t,"rear-wing-endplate",0,l+(c?.11:.05),g*h/2,s);let p=[];for(let g of[-.72,.72]){d(new $e(.24,.055,.18),t,"rear-frame-bracket",-2.29,1,g);for(let x of[-2.36,-2.22])d(new Xe(.018,.018,.012,6),n,"rear-frame-bolt",x,1.034,g);let v=d(new $e(1,.075,.085),t,"rearward-mount-arm",0,1.015,g),_=d(new $e(.085,1,.075),t,"rear-wing-upright",0,0,g);p.push({lower:v,post:_,z:g})}let y=hc([s],i).max.x;function f(g){let v=Math.min(-2.85,g&&!g.isEmpty()?g.min.x-.24-y:-2.85);s.position.x=v;for(let{lower:_,post:x}of p)_.position.x=(-2.29+v)/2,_.scale.x=Math.abs(v+2.29),x.position.set(v,(l-.04+1.015)/2,x.position.z),x.scale.y=l-.04-1.015;i.userData.turbineClearance=.24,i.userData.wingRearX=v,i.updateMatrixWorld(!0)}return f(),i.userData.fitTurbines=f,i}function Du(r="classic"){let e=new Ve;e.name="pedal-assembly-"+r;let t=r==="formula",n=r!=="classic",i=new gt({color:t?"#b7a16c":"#a8b4bf",metalness:.82,roughness:.3}),s=new gt({color:"#161d23",roughness:.83,metalness:.15}),a=new gt({color:"#0c1116",roughness:.95});function o(c,l,h,u,d,m,p=e){let y=new tt(c,l);return y.name=h,y.position.set(u,d,m),y.castShadow=y.receiveShadow=!0,p.add(y),y}o(new $e(.66,.035,.77),t?s:i,"floor-mount",.94,1.035,0);for(let c of[.67,1.2])for(let l of[-.32,.32])o(new Xe(.016,.016,.012,6),i,"mount-bolt",c,1.058,l);for(let[c,l,h]of[["brake",-.22,t?.25:.23],["accelerator",.22,.15]]){let u=o(new Xe(.037,.037,h+.06,20),i,c+"-hinge",.72,1.09,l);u.rotation.x=Math.PI/2;let d=new w(.72,1.09,l),m=new w(1.1,1.31,l),p=m.clone().sub(d),y=d.clone().add(m).multiplyScalar(.5);o(new $e(.055,p.length(),.035),i,c+"-lever",...y.toArray()).quaternion.setFromUnitVectors(new w(0,1,0),p.normalize());let g=c==="brake"?.24:.32,v=new Ht,_=h/2,x=g/2,M=.025;if(v.moveTo(-_+M,-x),v.lineTo(_-M,-x),v.quadraticCurveTo(_,-x,_,-x+M),v.lineTo(_,x-M),v.quadraticCurveTo(_,x,_-M,x),v.lineTo(-_+M,x),v.quadraticCurveTo(-_,x,-_,x-M),v.lineTo(-_,-x+M),v.quadraticCurveTo(-_,-x,-_+M,-x),n)for(let O of[-.065,0,.065])for(let U of c==="brake"?[-.055,.055]:[0]){let k=new gn;k.absarc(U,O,.014,0,Math.PI*2,!0),v.holes.push(k)}let b=o(new Ut(v,{depth:.025,bevelEnabled:!0,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),n?i:a,c+"-face",1.115,1.32,l);b.rotation.y=-Math.PI/2,b.rotation.z=-.18;for(let O of n?[-.1,.1]:[-.09,-.045,0,.045,.09])o(new $e(h*.76,.009,.007),n?a:i,c+"-grip",0,O,-.007,b);let L=Array.from({length:65},(O,U)=>{let k=U/64,I=k*Math.PI*12;return new w(.77+k*.23,1.095+k*.15+Math.sin(I)*.018,l+.045+Math.cos(I)*.018)});if(o(new Tt(new Mt(L),64,.004,6,!1),i,c+"-return-spring",0,0,0),t){let O=o(new Xe(.025,.025,.25,16),s,c+"-hydraulic-cylinder",.95,1.14,l-.055);O.rotation.z=-1.05}}return e}function pc(r){let e=new Ve;e.name="sport-seat-"+r;let t=(I,D=.8,K=0)=>new Sn({color:I,roughness:D,metalness:K,clearcoat:K?.4:.08}),n=r==="emerald",i=r==="ivory",s={red:["#a91e32","#151b22","#e26970"],carbon:["#303943","#151b22","#89959f"],emerald:["#146453","#124336","#c7b574"],ivory:["#d8c8a6","#847352","#f6e7bd"]}[r]||["#303943","#151b22","#89959f"],a=t(s[0],n?.55:.8),o=t(s[1],n?.52:.8),c=t("#10151c",.32,.35),l=t(s[2]),h=t("#acb5be",.28,.85),u=t("#cfb579",.95),d=t("#070b10"),m=document.createElement("canvas");m.width=m.height=64;let p=m.getContext("2d");p.fillStyle="#30343b",p.fillRect(0,0,64,64);for(let I=0;I<64;I+=8)for(let D=0;D<64;D+=8)p.fillStyle=(D+I)%16?"#121820":"#626973",p.fillRect(D,I,7,3),p.fillStyle="#252b33",p.fillRect(D,I+4,3,4);let y=new Et(m);y.wrapS=y.wrapT=Zn,y.repeat.set(3,5),y.colorSpace=pt,c.map=y,c.bumpMap=y,c.bumpScale=.004;let f=(I,D,K=0,V=0,j=0,ie=e)=>{let de=new tt(I,D);return de.position.set(K,V,j),de.castShadow=de.receiveShadow=!0,ie.add(de),de},g=(I,D,K,V,j,ie,de,le,be=e)=>{let te=new Ht,ce=-I/2,we=-D/2;return V=Math.min(V,I/2,D/2,K/2),te.moveTo(ce+V,we),te.lineTo(ce+I-V,we),te.quadraticCurveTo(ce+I,we,ce+I,we+V),te.lineTo(ce+I,we+D-V),te.quadraticCurveTo(ce+I,we+D,ce+I-V,we+D),te.lineTo(ce+V,we+D),te.quadraticCurveTo(ce,we+D,ce,we+D-V),te.lineTo(ce,we+V),te.quadraticCurveTo(ce,we,ce+V,we),f(new Ut(te,{depth:K-2*V,bevelEnabled:!0,bevelSize:V,bevelThickness:V,bevelSegments:4,curveSegments:12}),j,ie,de,le-K/2+V,be)},v=(I,D,K,V=e)=>f(new Tt(new Mt(I.map(j=>new w(...j))),32,D,6,!1),K,0,0,0,V),_=new Ve;_.rotation.x=-.14,_.position.set(0,.2,0),e.add(_);let x=new Ht;x.moveTo(-.29,0),x.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65),x.lineTo(-.47,.92),x.quadraticCurveTo(-.46,1.02,-.34,1.11),x.lineTo(-.28,1.21),x.lineTo(-.26,1.48),x.quadraticCurveTo(0,1.62,.26,1.48),x.lineTo(.28,1.21),x.lineTo(.34,1.11),x.quadraticCurveTo(.46,1.02,.47,.92),x.lineTo(.43,.65),x.bezierCurveTo(.39,.42,.38,.2,.29,0),x.closePath();for(let I of[-.135,.135]){let D=new gn;D.moveTo(I-.075,1.24),D.lineTo(I+.075,1.24),D.lineTo(I+.075,1.34),D.lineTo(I-.075,1.34),D.closePath(),x.holes.push(D)}f(new Ut(x,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),c,0,0,-.09,_),f(new Ut(x,{depth:.025,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),a,0,.02,.012,_).scale.set(.96,.97,1),g(.41,.18,.095,.025,a,0,1.43,.035,_),g(.46,.5,.12,.035,o,0,.85,.065,_),g(.45,.31,.17,.04,o,0,.4,.1,_);for(let I of[-1,1]){let D=g(.17,.42,.19,.055,a,I*.34,.98,.1,_);D.rotation.z=I*.28,D.rotation.y=-I*.25;let K=g(.13,.55,.23,.045,a,I*.3,.49,.14,_);K.rotation.z=-I*.12,v([[I*.27,.18,.28],[I*.34,.52,.28],[I*.4,.93,.24],[I*.3,1.17,.2]],.005,l,_);let V=I*.135;for(let j of[1.235,1.345])g(.16,.014,.022,.004,h,V,j,.015,_);for(let j of[V-.08,V+.08])g(.014,.12,.022,.004,h,j,1.29,.015,_)}let b=g(n?.86:.77,.045,.84,.012,c,0,.435,.34);b.name="seat-base";let L=g(n?.61:.54,.12,i?.74:.67,.03,o,0,.535,.39);L.name="seat-cushion",g(.54,.15,.17,.045,a,0,.52,.77);for(let I of[.2,.33,.46,.59])v([[-.23,.625,I],[0,.635,I+.015],[.23,.625,I]],.003,l);if(n){for(let I of[-1,1])g(.14,.13,.64,.04,a,I*.45,.65,.32),g(.045,.23,.1,.01,h,I*.45,.48,.16);for(let I=.45;I<1.1;I+=.15)for(let D of[-.1,.1])v([[D-.1,I,.18],[D,I+.07,.18],[D+.1,I,.18]],.003,l,_)}i&&(g(.47,.1,.22,.035,a,0,.56,.86),v([[-.24,.62,.88],[0,.64,.9],[.24,.62,.88]],.004,l));for(let I of[-1,1]){let D=g(.16,.26,.74,.055,a,I*(n?.365:.325),.54,.39);D.rotation.z=-I*.12,v([[I*.26,.63,.03],[I*.26,.66,.35],[I*.26,.63,.73]],.005,l),g(.075,.075,.82,.015,h,I*.28,-.015,.34);for(let K of[.02,.65])g(.13,.09,.12,.015,c,I*.28,-.055,K),f(new Xe(.022,.022,.015,12),h,I*.28,-.002,K)}for(let I=.3;I<1.08;I+=.11)v([[-.19,I,.16],[0,I-.015,.17],[.19,I,.16]],.0025,l,_);for(let I of[-1,1]){let D=[[I*.135,1.5,-.13],[I*.135,1.15,-.03],[I*.13,.78,.08],[I*.1,.66,.4]],K=[],V=[];D.forEach(([le,be,te],ce)=>{K.push(le-.033,be,te,le+.033,be,te),ce&&V.push(ce*2-2,ce*2-1,ce*2,ce*2-1,ce*2+1,ce*2)});let j=new mt;j.setAttribute("position",new Le(K,3)),j.setIndex(V),j.computeVertexNormals();let ie=u.clone();ie.side=Nt,f(j,ie);let de=g(.27,.055,.025,.008,u,I*.18,.64,.45);de.rotation.z=-I*.2}let O=f(new Xe(.065,.065,.035,24),h,0,.66,.48);O.rotation.x=Math.PI/2;let U=f(new Xe(.037,.037,.04,24),t("#b52332",.4),0,.66,.5);U.rotation.x=Math.PI/2,e.updateMatrixWorld(!0);let k=new cn().setFromObject(b).min.y;for(let I of e.children)I.position.y-=k;return e.userData.floorContact=0,e}var dc;function Uu(r,e){if(!r.isConnected||e==="none")return;if(!dc){let a=new Xn({alpha:!0,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});a.setSize(512,512),a.setPixelRatio(1),a.outputColorSpace=pt,a.toneMapping=si,a.toneMappingExposure=1.25;let o=new Mn;o.add(new Fn("#eaf1ff","#3e3028",2));for(let[l,h,u,d]of[[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){let m=new En("#ffffff",d);m.position.set(l,h,u),o.add(m)}let c=new kt(30,1,.1,20);c.position.set(1.8,1.55,3.6),c.lookAt(0,.78,.12),dc={renderer:a,scene:o,camera:c,models:{}}}let{renderer:t,scene:n,camera:i,models:s}=dc;s[e]||(s[e]=pc(e),n.add(s[e]));for(let[a,o]of Object.entries(s))o.visible=a===e;t.render(n,i),r.width=r.height=512,r.getContext("2d").drawImage(t.domElement,0,0)}window.pokerCreateReferenceCharacter3D=Cu;window.pokerPaintBrakePreview=Ru;window.pokerPaintSeatPreview=Uu;var Nu=(r,e,t)=>Math.max(e,Math.min(t,r));function Kp(r,e){let t=window.PokerGarage,n=new Ve;r.add(n),n.scale.set(1.24,.86,.95);let i=(T,C,N)=>new Sn({color:T,metalness:C,roughness:N,clearcoat:C>.3?.65:.12,clearcoatRoughness:.12}),s=i(t.item("paint",e.paint).color,.55,.24),a=i(t.item("paint",e.paint).color,0,.93),o=i("#e5aa28",1,.135),c=i("#171a1e",.04,.76),l=i(t.wheelPaintColor(e),0,.95),h=i("#0d1417",.35,.3),u=i("#060809",.12,.36),d=i(t.item("light",e.light).color,.45,.2),m=i("#123e47",.86,.22);d.emissive.copy(d.color),d.emissiveIntensity=2;function p(T,C,N=0,Q=0,B=0,oe=n){let X=new tt(T,C);return X.position.set(N,Q,B),X.castShadow=!0,X.receiveShadow=!0,oe.add(X),X}let y=(T,C,N,Q,B,oe,X)=>p(new $e(T,C,N),Q,B,oe,X);function f(T,C,N,Q,B,oe,X="y"){let se=p(new Xe(T,T,C,64),N,Q,B,oe);return X==="z"&&(se.rotation.x=Math.PI/2),X==="x"&&(se.rotation.z=Math.PI/2),se}function g(T,C,N,Q,B,oe,X="z"){let se=p(new St(T,C,12,80),N,Q,B,oe);return X==="y"&&(se.rotation.x=Math.PI/2),X==="x"&&(se.rotation.y=Math.PI/2),se}function v(T,C,N,Q=Ht){let B=new Q,oe=-T/2,X=-C/2;return N=Math.min(N,C/2-.001),B.moveTo(oe+N,X),B.lineTo(oe+T-N,X),B.quadraticCurveTo(oe+T,X,oe+T,X+N),B.lineTo(oe+T,X+C-N),B.quadraticCurveTo(oe+T,X+C,oe+T-N,X+C),B.lineTo(oe+N,X+C),B.quadraticCurveTo(oe,X+C,oe,X+C-N),B.lineTo(oe,X+N),B.quadraticCurveTo(oe,X,oe+N,X),B}function _(T,C,N,Q,B,oe,X=null,se=.025){let fe=v(T,C,Q);if(X){let me=v(X[0],X[1],X[2],gn),Ue=new gn(me.getPoints(40).map(ee=>new ue(ee.x+(X[3]||0),ee.y)));fe.holes.push(Ue)}let qe=p(new Ut(fe,{depth:N,bevelEnabled:se>0,bevelSize:se,bevelThickness:se,bevelSegments:4,curveSegments:40}),B,0,oe,0);return qe.rotation.x=-Math.PI/2,qe}let x=[],M=n.children.length,b=[3.02,1.51,.65,-.28],L=v(4.96,2.44,1.15).getSpacedPoints(128),O=[],U=[],k=[[.6,.94],[.7,.97],[1.02,1],[1.22,.99]];for(let[T,C]of k)for(let N=0;N<128;N++){let Q=L[N];O.push(Q.x*C,T,-Q.y*C)}for(let T=0;T<3;T++)for(let C=0;C<128;C++){let N=T*128+C,Q=T*128+(C+1)%128;U.push(N,Q,N+128,Q,Q+128,N+128)}let I=new mt;I.setAttribute("position",new Le(O,3)),I.setIndex(U),I.computeVertexNormals(),s.side=Nt,p(I,s),_(5.03,2.51,.065,1.19,o,.58,null,.035),_(5.1,2.58,.09,1.22,o,1.25,b,.035);let D=new Mt(v(4.94,2.42,1.15).getPoints(40).map(T=>new w(T.x,1.44,-T.y)),!0,"centripetal");p(new Tt(D,240,.125,16,!0),u);for(let T of[-1,1]){let C=Array.from({length:21},(N,Q)=>{let B=.26+Q*.25/20;return new w(1.32+1.15*Math.cos(B),1.44,T*(.06+1.15*Math.sin(B)))});p(new Tt(new Mt(C),32,.132,20,!1),o)}_(4.65,2.14,.035,1.03,o,1.39,b,.015),_(4.52,2.01,.025,.97,a,1.43,b,.01),x.push(...n.children.slice(M));let K=_(2.98,1.47,.025,.63,a,.94);K.position.x=-.28;let V=new Sn({transparent:!0,alphaTest:.025,depthWrite:!1,metalness:.15,roughness:.48,clearcoat:.25,side:Nt,polygonOffset:!0,polygonOffsetFactor:-1}),j=new Xi(v(2.9,1.4,.6)),ie=j.attributes.position,de=j.attributes.uv;for(let T=0;T<ie.count;T++)de.setXY(T,(ie.getX(T)+1.45)/2.9,(ie.getY(T)+.7)/1.4);let le=p(j,V,-.28,1.005,0);le.rotation.x=-Math.PI/2,le.castShadow=!1;let be=V.clone(),te=[];for(let T of[-1,1]){let C=p(new Zt(3.05,.3),be,0,1.04,T*1.329);T<0&&(C.rotation.y=Math.PI),C.castShadow=!1,te.push(C)}function ce(T){let C=T.vinyl||"none";le.visible=C!=="none",te.forEach(Q=>Q.visible=C!=="none");let N=C+":"+(T.vinylText||"");if(V.userData.id!==N){V.map?.dispose(),be.map?.dispose(),V.map=new Et(t.vinylCanvas(C,!1,T.vinylText)),be.map=new Et(t.vinylCanvas(C,!0,T.vinylText));for(let Q of[V,be]){Q.map.colorSpace=pt,Q.map.anisotropy=16;let B=Q.map;B.image.addEventListener("vinyl-ready",()=>{B.needsUpdate=!0},{once:!0}),Q.needsUpdate=!0,Q.userData.id=N}}}let we=_(3.13,1.62,.018,.7,o,1.46,[3.02,1.51,.65,0],.006);we.position.x=-.28;let he=_(3.08,1.57,.46,.68,s,.96,[3.02,1.51,.65,0],.005);he.position.x=-.28;for(let T of[-1,-.35,.35])for(let C of[-.75,.75])y(.011,.4,.009,h,T,1.2,C);function ge(T,C){let N=document.createElement("canvas");N.width=N.height=256;let Q=N.getContext("2d");Q.fillStyle=T,Q.fillRect(0,0,256,256);let B=17;for(let X=0;X<18e3;X++)B=B*1664525+1013904223>>>0,Q.fillStyle="rgba(0,0,0,"+C+")",Q.fillRect(B%256,(B>>>8)%256,1,1);let oe=new Et(N);return oe.colorSpace=pt,oe.wrapS=oe.wrapT=Zn,oe}a.map=ge("#e8e8e8",.035),a.bumpMap=ge("#888888",.5),a.bumpScale=.0015,a.clearcoat=0,c.bumpMap=ge("#888888",.12),c.bumpScale=.003,u.bumpMap=ge("#888888",.3),u.bumpScale=.001;function pe(T,C,N,Q,B,oe=!1,X=n){let se=new Ht;se.moveTo(0,.5),se.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1),se.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06),se.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1),se.bezierCurveTo(.48,.12,.12,.28,0,.5),se.moveTo(-.12,-.3),se.lineTo(0,-.06),se.lineTo(.12,-.3),se.closePath();let fe=p(new Ut(se,{depth:.018,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),C,N,Q,B,X);return fe.scale.setScalar(T),oe&&(fe.rotation.y=Math.PI),fe}let Z=[],Ce=[],A=[],E=null;for(let T of[-1.72,1.72])for(let C of[-1,1]){let N=C*1.36,Q=C*1.57,B=new Ve;B.position.set(T,.81,N),n.add(B),B.userData.groundWheel=!0;let oe=n.children.length,X=p(new xi([new ue(.56,-.19),new ue(.61,-.245),new ue(.67,-.25),new ue(.76,-.19),new ue(.8,-.1),new ue(.8,.1),new ue(.76,.19),new ue(.67,.25),new ue(.61,.245),new ue(.56,.19)],80),c,T,.81,N);X.rotation.x=Math.PI/2;for(let me=-2;me<=2;me++)g(.798-Math.abs(me)*.012,.0035,h,T,.81,N+me*.071);for(let me=0;me<28;me++){let Ue=me*Math.PI/14,ee=Array.from({length:17},(ve,ze)=>{let Re=ze/16,Ee=-.205+Re*.41,Oe=.799-.044*Math.pow(Math.abs(Ee)/.205,3),rt=Ue+.13*Math.sin(Re*Math.PI);return new w(T+Math.sin(rt)*Oe,.81+Math.cos(rt)*Oe,N+Ee)});p(new Tt(new Mt(ee),20,.0045,5,!1),h)}for(let me of[-1,1])for(let Ue of[.625,.654,.681])g(Ue,.0035,h,T,.81,N+me*.244);let se=n.children.slice(oe);g(.548,.023,l,T,.81,Q+C*.035),g(.505,.016,l,T,.81,Q+C*.043),f(.14,.045,h,T,.81,Q+C*.045,"z"),g(.14,.012,l,T,.81,Q+C*.069);let fe=pe(.2,l,T,.8,Q+C*.075,C<0);Ce.push(fe);for(let me of t.wheelDesign()){let Ue=new Mt(me.map(([ee,ve])=>new w(T+ee,.81+ve,Q+C*(.04+.025*(1-Math.hypot(ee,ve)/.51)))));Z.push(p(new Tt(Ue,20,.007,6,!1),l))}for(let me=0;me<20;me++){let Ue=me*Math.PI/10;f(.006,.009,l,T+Math.sin(Ue)*.526,.81+Math.cos(Ue)*.526,Q+C*.06,"z")}n.updateMatrixWorld(!0);for(let me of n.children.slice(oe))B.attach(me);B.scale.set(.88/1.24,.88/.86,1/.95),B.position.y=.715/.86;let qe={standard:se};for(let me of["soft","medium","hard","semi","wet"]){let Ue=Pu(me);Ue.visible=!1,B.add(Ue),qe[me]=[Ue]}A.push({wheelGroup:B,x:T,out:Q,sign:C,tyres:qe})}let W=[];for(let T of[-1,1])W.push(y(1.35,.43,.04,o,.05,.94,T*1.3));for(let T of[-1,1]){let C=f(.275,.27,h,2.16,.945,T*.97,"z");g(.278,.035,o,2.16,.945,T*1.11)}for(let T of[-1.72,1.72])f(.07,2.8,h,T,.7,0,"z");y(3.6,.08,.8,h,0,.57,0);let z=[];function S(T,C,N){let Q=document.createElement("canvas");Q.width=T,Q.height=C,N(Q.getContext("2d"),T,C);let B=new Et(Q);return B.colorSpace=pt,B.anisotropy=8,z.push(B),B}let P=S(768,256,(T,C,N)=>{T.fillStyle="#101b18",T.fillRect(0,0,C,N),T.strokeStyle="#d9b35b",T.lineWidth=7,T.strokeRect(10,10,C-20,N-20),T.fillStyle="#ebc66c",T.textAlign="center",T.font="italic 116px Georgia",T.fillText("Two Aces",C/2,137),T.font="38px Georgia",T.fillText("\u2660 Poker21 \u2660",C/2,209)}),G=[];for(let T of[-1,1]){let C=new Sn({map:P,metalness:.55,roughness:.2,clearcoat:1});G.push(C);let N=p(new Zt(1.28,.4),C,.05,.94,T*1.326);C.userData.plane=N,T<0&&(N.rotation.y=Math.PI)}let F=[];for(let T of[-1,1])for(let C=0;C<3;C++){let N=new Ve;N.position.set((C-1)*.7+.05,1,T*1.365),T<0&&(N.rotation.y=Math.PI),n.add(N);let Q=p(new $e(.1,.1,.025),o,0,0,0,N),B=new gt({transparent:!0,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),oe=p(new Zt(.65,.65),B,0,0,.035,N);oe.castShadow=!1,oe.receiveShadow=!1,F.push({group:N,mat:B,back:Q,n:C})}for(let T of[-1,1])for(let C of[-.54,.64])for(let N of[.78,1.1]){let Q=f(.014,.018,o,C,N,T*1.35,"z")}let ae=n.children.length;for(let T of[-1.7,-.35,1.48])for(let C of[-1.21,1.21]){let N=f(.128,.13,o,T,1.44,C,"x")}for(let T of[-1.7,-.35,1.48])for(let C of[-1,1])g(.125,.004,h,T+.08,1.44,C*1.21,"x"),g(.125,.004,h,T-.08,1.44,C*1.21,"x");for(let T of[-1.7,-.35,1.48])for(let C of[-.96,.96])f(.135,.08,o,T,1.49,C),f(.108,.082,h,T,1.498,C),g(.125,.015,o,T,1.54,C,"y"),g(.111,.006,o,T,1.535,C,"y");let Y=[],$=[],xe=["#ab2338","#1b684b","#2455a5"].map(T=>i(T,.08,.55)),Fe=i("#eee9d6",.04,.6);for(let[T,C,N,Q]of[[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let B=0;B<Q;B++){f(.104,.033,xe[N],T,1.49+B*.037,C);for(let oe=0;oe<6;oe++){let X=oe*Math.PI/3,se=y(.024,.021,.012,Fe,T+Math.cos(X)*.103,1.49+B*.037,C+Math.sin(X)*.103);se.rotation.y=Math.PI/2-X,se.castShadow=!1,se.receiveShadow=!1,Y.push(se)}if(B===Q-1){let oe=new gt({transparent:!0,alphaTest:.1,roughness:.65}),X=p(new Zt(.208,.208),oe,T,1.511+B*.037,C);X.rotation.x=-Math.PI/2,X.castShadow=!1,X.receiveShadow=!1,$.push({mat:oe,n:N})}}x.push(...n.children.slice(ae));let ye=new Ve;ye.position.set(.89,1.96,0),ye.scale.set(1/1.24,1/.86,1/.95),n.add(ye);let Pe=new Ve;ye.add(Pe);let Ge=new w((.89-1.3)*1.24,(1.96-1.48)*.86,0).normalize(),je=new w(0,0,1),lt=new w().crossVectors(Ge,je).normalize();Pe.quaternion.setFromRotationMatrix(new Ye().makeBasis(je,lt,Ge));let _e=u.clone();p(new St(.53,.06,16,80),_e,0,0,0,Pe),p(new St(.473,.014,10,64),o,0,0,-.02,Pe);for(let T of[Math.PI]){let C=p(new $e(.09,.39,.045),o,Math.sin(T)*.26,Math.cos(T)*.26,0,Pe);C.rotation.z=-T}for(let T of[-1,1]){let C=p(new $e(.35,.075,.06),o,T*.265,0,0,Pe);p(new $e(.32,.035,.064),h,T*.265,0,.006,Pe)}let Be=p(new Xe(.195,.195,.075,64),o,0,0,.035,Pe);Be.rotation.x=Math.PI/2;let Me=p(new Vn(.177,64),new gt({color:"#040607",metalness:.08,roughness:.4}),0,0,.085,Pe);Me.receiveShadow=!1,pe(.38,o,0,-.025,.105,!1,Pe);let Te={classic:new Ve,sport:new Ve,formula:new Ve};for(let T of Pe.children.slice())Te.classic.add(T);Object.values(Te).forEach(T=>Pe.add(T));function We(T,C,N,Q){let B=new Mt(C.map(([oe,X])=>new w(oe,X,0)),!0);p(new Tt(B,72,N,12,!0),Q,0,0,0,T)}We(Te.sport,[[-.31,-.4],[.31,-.4],[.5,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.5,-.18]],.062,_e);for(let T of[-1,1])p(new $e(.35,.065,.045),l,T*.27,0,0,Te.sport),p(new $e(.065,.3,.045),l,T*.12,-.22,0,Te.sport);p(new St(.5,.018,8,64,.22),d,0,0,.005,Te.sport),We(Te.formula,[[-.48,-.26],[-.54,.17],[-.4,.27],[-.27,.14],[.27,.14],[.4,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,_e),p(new $e(.6,.23,.065),h,0,0,0,Te.formula);for(let T of[-1,1])p(new Jt(.035,12,8),d,T*.25,.055,.06,Te.formula),p(new $e(.08,.29,.025),l,T*.37,0,-.07,Te.formula);for(let T of["sport","formula"]){let C=p(new Xe(.15,.15,.07,48),l,0,0,.035,Te[T]);C.rotation.x=Math.PI/2,p(new Vn(.13,48),h,0,0,.078,Te[T]),pe(.25,l,0,-.018,.09,!1,Te[T])}for(let[T,C]of Object.entries(t.steeringDesigns)){let N=new Ve;Pe.add(N),Te[T]=N;let Q=i(C.color,T==="woodHeritage"?.3:.55,.35);C.shape==="round"?p(new St(.53,.065,16,80),Q,0,0,0,N):C.shape==="flat"?We(N,[[-.32,-.4],[.32,-.4],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,Q):re([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,Q,N);for(let oe=0;oe<C.spokes;oe++){let X=oe*Math.PI*2/C.spokes,se=p(new $e(.39,.065,.05),l,Math.cos(X)*.25,Math.sin(X)*.25,.015,N);se.rotation.z=X}let B=p(new Xe(.15,.15,.075,40),h,0,0,.05,N);B.rotation.x=Math.PI/2,pe(.23,l,0,-.015,.095,!1,N),p(new $e(.045,.09,.025),i("#ed5555",.1,.6),0,.51,.06,N)}let vt=i("#b9ab8a",.15,.8),Ae=i("#171c20",.02,.85);for(let[T,C]of Object.entries(Te)){let N=T==="classic"?.53:T==="sport"?.51:.47;for(let B of[-1,1]){if(T!=="formula"){let oe=p(new St(N,.072,12,30,.64),Ae,0,0,.003,C);oe.rotation.z=B<0?Math.PI-.32:-.32}for(let oe=0;oe<9;oe++){let X=(B<0?Math.PI:0)-.28+oe*.07;p(new Jt(.007,6,4),vt,Math.cos(X)*(N-.045),Math.sin(X)*(N-.045),.063,C)}}let Q=p(new $e(.065,.1,.035),T==="classic"?o:d,0,T==="formula"?.16:.51,.045,C);for(let B=0;B<6;B++){let oe=B*Math.PI/3,X=p(new Xe(.012,.012,.012,6),l,Math.cos(oe)*.13,Math.sin(oe)*.13,.099,C);X.rotation.x=Math.PI/2}}let nt=new w(1.3,1.48,0),it=new w(.89,1.96,0),rn=it.clone().sub(nt),hn=nt.clone().add(it).multiplyScalar(.5),H=y(.12,rn.length(),.095,o,...hn.toArray());H.quaternion.setFromUnitVectors(new w(0,1,0),rn.normalize()),y(.075,H.geometry.parameters.height-.04,.1,h,...hn.toArray()).quaternion.copy(H.quaternion);let yt=-1.84,st=1.99,_n=.74,Ft=new Ve;Ft.name="garage-turbine-primary",Ft.position.set(yt,st,0),n.add(Ft);let ci=n.children.length;f(_n,.51,o,yt,st,0,"z"),f(.67,.54,h,yt,st,0,"z");for(let T of[-1,1]){let C=T*.29;g(.72,.055,h,yt,st,C),g(.75,.022,o,yt,st,C+T*.03),g(.665,.012,d,yt,st,C+T*.025);for(let N=0;N<14;N++){let Q=N*Math.PI/7,B=[],oe=[];for(let fe=0;fe<=16;fe++){let qe=fe/16,me=.22+qe*.44,Ue=Q+.55*qe;for(let ee of[-.15,.15])B.push(yt+Math.sin(Ue+ee)*me,st+Math.cos(Ue+ee)*me,C+T*(.018+Math.sin(qe*Math.PI)*.12))}for(let fe=0;fe<16;fe++){let qe=fe*2;oe.push(qe,qe+1,qe+2,qe+1,qe+3,qe+2)}let X=new mt;X.setAttribute("position",new Le(B,3)),X.setIndex(oe),X.computeVertexNormals(),m.side=Nt,p(X,m);let se=new Mt(Array.from({length:17},(fe,qe)=>{let me=qe/16,Ue=.22+me*.44,ee=Q+.55*me-.15;return new w(yt+Math.sin(ee)*Ue,st+Math.cos(ee)*Ue,C+T*(.025+Math.sin(me*Math.PI)*.12))}));p(new Tt(se,20,.009,6,!1),d)}f(.215,.07,o,yt,st,C+T*.085,"z"),f(.18,.085,h,yt,st,C+T*.11,"z")}for(let T=0;T<12;T++){let C=T*Math.PI/6,N=y(.045,.15,.2,h,yt+Math.cos(C)*.735,st+Math.sin(C)*.735,0);N.rotation.z=C}n.updateMatrixWorld(!0);for(let T of n.children.slice(ci))Ft.attach(T);Ft.rotation.set(0,Math.PI/2,0),Ft.scale.set(.96/1.24,.96/.86,.96/.95);let zt=Ft.clone(!0);zt.name="garage-turbine-secondary",n.add(zt);let Wt=new Ve;Ft.add(Wt);let ct=i("#829aaa",.92,.24);for(let T of[-.24,-.08,.08,.24])p(new St(.765,.028,10,80),ct,0,0,T,Wt);for(let T=0;T<8;T++){let C=T*Math.PI/4,N=p(new Xe(.025,.025,.025,6),ct,Math.sin(C)*.73,Math.cos(C)*.73,.35,Wt);N.rotation.x=Math.PI/2}let Yt={classic:new Ve,dual:new Ve,titanium:new Ve},Lt=i("#a9b7c4",.92,.23),Xt=i("#668bb5",.88,.25);Object.values(Yt).forEach(T=>n.add(T));for(let[T,C]of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(let N of C){let Q=T==="titanium"?Xt:Lt,B=p(new Xe(.105,.105,.5,32),Q,-2.42,.76,N,Yt[T]);B.rotation.z=Math.PI/2;let oe=p(new Xe(.079,.079,.012,32),h,-2.678,.76,N,Yt[T]);oe.rotation.z=Math.PI/2;let X=p(new St(.094,.012,8,32),Q,-2.69,.76,N,Yt[T]);X.rotation.y=Math.PI/2}for(let[T,C]of Object.entries(Yt)){let N=T==="classic"?[0]:[-.67,.67];for(let B of N){let oe=p(new Xe(.18,.18,.52,40),Lt,-2.19,.76,B,C);oe.rotation.z=Math.PI/2;for(let X of[-2.36,-2.04]){let se=p(new St(.184,.016,8,40),h,X,.76,B,C);se.rotation.y=Math.PI/2,p(new $e(.07,.19,.07),Lt,X,.94,B,C)}}let Q=T==="classic"?[0]:T==="dual"?[-.67,.67]:[-.83,-.57,.57,.83];for(let B of Q){let oe=p(new Xe(.077,.077,.11,32,1,!0),i("#151c23",.35,.65),-2.63,.76,B,C);oe.rotation.z=Math.PI/2;let X=p(new St(.107,.018,10,40),T==="titanium"?Xt:Lt,-2.57,.76,B,C);if(X.rotation.y=Math.PI/2,T==="titanium")for(let[se,fe]of[[-2.65,"#6575ba"],[-2.61,"#9f746a"],[-2.58,"#c0a474"]]){let qe=p(new St(.106,.008,6,40),i(fe,.85,.3),se,.76,B,C);qe.rotation.y=Math.PI/2}}}for(let T of[-1,1]){let C=new Mt([new w(-2.16,1.46,T*.65),new w(-1.94,1.66,T*.69),new w(-1.3,1.59,T*.64),new w(-.98,1.47,T*.7)]);p(new Tt(C,32,.022,8,!1),o),y(.34,.06,.14,o,-1.84,1.48,T*.4)}for(let T of[-1,1]){let C=new Mt([new w(-2.45,1.1,T*.7),new w(-2.43,1.36,T*.72),new w(-2.19,1.55,T*.7),new w(-1.9,1.55,T*.68)]);p(new Tt(C,40,.075,14,!1),h),p(new Tt(C,40,.019,10,!1),o);for(let N of[-2.2,-1.96]){let Q=new Mt([new w(N,1.43,T*.48),new w(N,1.63,T*.6),new w(N+.24,1.57,T*.82)]);p(new Tt(Q,24,.017,8,!1),o)}}let an=n.children.length,Qt=[],yn=[],un=[];for(let T=0;T<=48;T++){let C=-.92+T*1.84/48;for(let N of[.64,1.23])yn.push(2.57-.28*(Math.sin(C)*1.25/1.1)**2,N,Math.sin(C)*1.25)}for(let T=0;T<48;T++){let C=T*2;un.push(C,C+2,C+1,C+1,C+2,C+3)}let on=new mt;on.setAttribute("position",new Le(yn,3)),on.setIndex(un),on.computeVertexNormals();let Kn=i("#00453f",.72,.14);Kn.clearcoat=1,Kn.side=Nt,p(on,Kn);for(let T of[.635,1.225]){let C=Array.from({length:65},(N,Q)=>{let B=-1.04+Q*2.08/64;return new w(2.57-.28*(B/1.1)**2,T,B)});p(new Tt(new Mt(C),80,.034,12,!1),o)}for(let T of[-1,1]){let C=T*1,N=2.57-.28*(C/1.1)**2,Q=new Mt([new w(N-.04,.635,C),new w(N+.05,.78,C),new w(N+.065,1.12,C),new w(N-.04,1.25,C)]);p(new Tt(Q,32,.065,12,!1),o);for(let B of[.91,1.065]){let oe=Array.from({length:16},(X,se)=>{let fe=T*(.51+se*.41/15);return new w(2.57-.28*(fe/1.1)**2+.018,B,fe)});Qt.push(p(new Tt(new Mt(oe),24,.017,8,!1),d))}}let Cn=[];for(let T=0;T<2;T++){let C=new Et(t.cardCanvas(e.cards,T));C.colorSpace=pt,C.anisotropy=16;let N=new kn({map:C,transparent:!0,toneMapped:!1});Cn.push(N);let Q=1.65,B=T?.34:-.34,oe=y(.47,.008,.63,i("#ddd9cf",0,.95),Q,1.474+T*.003,B);oe.rotation.y=-(T?-.08:.08);let X=p(new Zt(.5,.67),N,Q,1.48+T*.003,B);X.rotation.x=-Math.PI/2,X.rotation.z=T?-.08:.08,X.castShadow=!1,X.receiveShadow=!1}x.push(...n.children.slice(an));let jt=new gt({map:new Et(t.plateCanvas(e)),roughness:.6});for(let T of[-1,1]){let C=p(new Zt(.79,.463),jt,T*2.605,1.01,0);C.rotation.y=T*Math.PI/2,T>0&&x.push(C)}let wt={},qt=i("#7d8c98",.82,.28),_t=i("#202a32",.45,.38),R=i("#a7c6d5",.98,.055),q=i("#182029",.35,.48);q.bumpMap=ge("#888888",.2),q.bumpScale=.001;function J(T,C,N,Q,B,oe,X,se,fe){let qe=new Ut(v(T,C,Q),{depth:N,bevelEnabled:!0,bevelSize:Math.min(.012,N*.2),bevelThickness:Math.min(.012,N*.2),bevelSegments:3,curveSegments:12});return qe.translate(0,0,-N/2),p(qe,B,oe,X,se,fe)}function re(T,C,N,Q){return p(new Tt(new Mt(T.map(B=>new w(...B))),40,C,12,!1),N,0,0,0,Q)}function ne(T,C,N,Q){let B=p(new Xe(.014,.014,.014,6),qt,T,C,N,Q);B.rotation.x=Math.PI/2}function Se(T,C,N,Q,B,oe){let X=new Ht;X.moveTo(-Q*.5,0),X.bezierCurveTo(-Q*.52,.055,-Q*.12,.07,Q*.5,.008),X.quadraticCurveTo(Q*.05,-.025,-Q*.5,0);let se=new Ut(X,{depth:N,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});se.translate(0,0,-N/2);let fe=p(se,B,T,C,0,oe);return fe.rotation.z=-.08,fe}for(let T of["mirrors","frontBumper","rearBumper","sideSkirts","spoiler"]){wt[T]={};for(let C of T==="spoiler"?["lip","sport","gt","double"]:["club","sport","round","rally","aero"]){let N=new Ve;n.add(N),wt[T][C]=N;let Q=["sport","aero"].includes(C)?q:qt;if(T==="spoiler"){n.remove(N);let B=uc(C,{paint:s,carbon:q,metal:qt});n.add(B),wt.spoiler[C]=B;continue}if(T==="mirrors")for(let B of[-1,1]){let oe=C==="aero",X=oe?1.77:1.86,se=B*(oe?1.47:1.53),fe=.77;J(.18,.08,.15,.035,_t,.64,1.46,B*1.19,N),re([[.64,1.47,B*1.19],[.62,1.62,B*1.32],[fe,X-.07,se]],oe?.023:.029,Q,N);let qe=p(new Jt(.046,16,12),_t,fe,X-.065,se,N);if(C==="round"){p(new Jt(1,32,20),qt,fe,X,se,N).scale.set(.065,.15,.15);let Ue=p(new Vn(.13,48),R,fe-.056,X,se,N);Ue.rotation.y=-Math.PI/2,Ue.castShadow=!1;let ee=p(new St(.136,.009,8,48),qt,fe-.06,X,se,N);ee.rotation.y=Math.PI/2}else{let me=oe?.31:C==="sport"?.35:.38,Ue=oe?.16:.22,ee=J(me,Ue,.095,.065,C==="club"?_t:q,fe,X,se,N);ee.rotation.y=Math.PI/2;let ve=p(new Xi(v(me-.045,Ue-.035,.05)),R,fe-.061,X,se,N);ve.rotation.y=-Math.PI/2,ve.castShadow=!1,ve.receiveShadow=!1;let ze=v(me-.028,Ue-.018,.055).getPoints(24).map(Re=>[fe-.058,X+Re.y,se+Re.x]);ze.push(ze[0]),re(ze,.006,qt,N)}}else if(T==="sideSkirts")for(let B of[-1,1]){let oe=J(2.3,C==="aero"?.17:.12,C==="rally"?.27:.13,.05,Q,0,.59,B*1.24,N);if(C==="rally")for(let X of[-.84,-.42,0,.42,.84]){let se=J(.13,.018,.25,.018,_t,X,.67,B*1.24,N)}else re([[-1.08,.54,B*1.3],[0,.53,B*1.32],[1.08,.54,B*1.3]],.009,d,N);for(let X of[-.87,.87])J(.12,.14,.16,.025,_t,X,.65,B*1.2,N),ne(X,.61,B*1.33,N);if(C==="aero")for(let X of[-.95,.95]){let se=J(.24,.12,.025,.025,q,X,.57,B*1.35,N);se.rotation.z=X>0?.2:-.2}}else{let B=T==="frontBumper"?1:-1,oe=[[B*2.26,.66,-.92],[B*2.58,.65,-.7],[B*2.67,.65,0],[B*2.58,.65,.7],[B*2.26,.66,.92]];re(oe,C==="sport"?.061:.047,Q,N);for(let X of[-.67,.67]){re([[B*2.31,.74,X],[B*2.5,.68,X]],.032,_t,N);let se=J(.16,.12,.13,.035,_t,B*2.51,.67,X,N)}if(C==="aero"){let X=J(.38,.045,1.94,.07,q,B*2.48,.5,0,N);for(let se of[-.7,-.27,.27,.7])J(.27,.12,.022,.025,_t,B*2.48,.55,se,N);re([[B*2.4,.52,-.91],[B*2.64,.52,0],[B*2.4,.52,.91]],.008,qt,N)}if(C==="rally")for(let X of[-.72,.72])re([[B*2.53,.65,X-.14],[B*2.56,.94,X-.14],[B*2.55,1.04,X],[B*2.56,.94,X+.14],[B*2.53,.65,X+.14]],.036,qt,N);if(C==="sport")for(let X of[-.67,.67]){let se=J(.2,.13,.14,.045,_t,B*2.56,.66,X,N)}if(T==="rearBumper"&&C==="aero")for(let X of[-.7,-.35,0,.35,.7]){let se=J(.27,.15,.025,.025,q,-2.46,.48,X,N);se.rotation.z=.12}}}}let De=i("#b9e4f5",.28,.17);De.emissive.set("#b9e4f5"),De.emissiveIntensity=1.8;let Ie=i("#ffdda0",.2,.2);Ie.emissive.set("#ffe0a8"),Ie.emissiveIntensity=1.25;for(let T of["frontBumper","rearBumper"])for(let[C,N,Q]of[["streetLow",2.1,.12],["driftWide",2.3,.16],["trackGT",2.22,.19]]){let B=new Ve;n.add(B),wt[T][C]=B;let oe=T==="frontBumper"?1:-1,X=C==="trackGT"?.34:.29,se=.59,fe=v(N,X,.1);for(let[Re,Ee]of[[0,.94],[-.79,.32],[.79,.32]]){let Oe=v(Ee,.115,.045,gn);fe.holes.push(new gn(Oe.getPoints(24).map(rt=>new ue(rt.x+Re,rt.y))))}let qe=new Ut(fe,{depth:Q,bevelEnabled:!0,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32}),me=qe.attributes.position;for(let Re=0;Re<me.count;Re++){let Ee=me.getX(Re),Oe=me.getY(Re),rt=me.getZ(Re);me.setXYZ(Re,oe*(2.43+rt-.24*(Ee/(N/2))**2),se+Oe,Ee)}qe.computeVertexNormals(),p(qe,s,0,0,0,B);for(let[Re,Ee]of[[0,.94],[-.79,.32],[.79,.32]]){let Oe=oe*(2.43-.24*(Re/(N/2))**2);J(.025,.14,Ee+.02,.04,h,Oe,se,Re,B);for(let rt of[-.032,.012,.045])J(.012,.006,Ee-.035,.003,_t,Oe+oe*.022,se+rt,Re,B)}let Ue=Array.from({length:41},(Re,Ee)=>{let Oe=-N/2+Ee*N/40;return[oe*(2.44+Q+.045-.24*(Oe/(N/2))**2),se-X/2-.025,Oe]});re(Ue,C==="trackGT"?.028:.019,q,B);let ee=new mt,ve=[],ze=[];for(let[Re,Ee,Oe]of Ue)ve.push(Re,Ee,Oe,Re-oe*.17,Ee+.005,Oe);for(let Re=0;Re<40;Re++){let Ee=Re*2;ze.push(Ee,Ee+1,Ee+2,Ee+1,Ee+3,Ee+2)}if(ee.setAttribute("position",new Le(ve,3)),ee.setIndex(ze),ee.computeVertexNormals(),p(ee,q,0,0,0,B),T==="rearBumper")for(let Re=0;Re<(C==="trackGT"?5:3);Re++){let Ee=(Re-(C==="trackGT"?2:1))*.3,Oe=J(.24,.075,.014,.008,q,-2.48,se-X/2-.035,Ee,B);Oe.rotation.z=-.12}else if(C==="trackGT")for(let Re of[-.92,.92]){let Ee=J(.18,.05,.018,.008,q,2.43,se-X/2,Re,B);Ee.rotation.z=.08}}for(let T of["formula","formulaPro","formulaElite"]){let C=Lu(T,{paint:s,carbon:q,metal:qt,accent:o});n.add(C),wt.frontBumper[T]=C}for(let T of["rearBumper","sideSkirts","spoiler"])for(let C of["formula","formulaPro"]){let N=new Ve;N.name=T+"-"+C,n.add(N),wt[T][C]=N;let Q=C==="formulaPro";if(T==="rearBumper"){J(.48,.16,Q?2.3:2.05,.03,q,-2.47,.45,0,N);for(let B=-3;B<=3;B++){let oe=J(.64,.23,.025,.01,q,-2.48,.44,B*.3,N);oe.rotation.z=-.15}for(let B of[-1,1])re([[-2.2,.54,B*1],[-2.65,.62,B*1.1]],.025,s,N)}else if(T==="sideSkirts")for(let B of[-1,1]){let oe=J(2.35,Q?.42:.33,.34,.08,s,-.15,.83,B*1.3,N);oe.rotation.z=-.045,J(2.65,.055,.48,.025,q,-.06,.58,B*1.3,N),J(.07,.21,.24,.035,h,.96,.87,B*1.3,N);for(let X=0;X<(Q?3:1);X++)J(.35,.11,.025,.01,q,.48-X*.32,.65,B*1.53,N)}else{n.remove(N);let B=uc(C,{paint:s,carbon:q,metal:qt});n.add(B),wt.spoiler[C]=B}}wt.headlights={};for(let T of["round","projector","rally","matrix"]){let C=new Ve;n.add(C),wt.headlights[T]=C;for(let N of[-1,1]){let Q=N*.74,B=2.57-.28*(Q/1.1)**2+.07,oe=1.075;if(T==="matrix"){let X=J(.4,.2,.075,.045,_t,B,oe,Q,C);X.rotation.y=Math.PI/2;let se=J(.35,.15,.01,.035,h,B+.05,oe,Q,C);se.rotation.y=Math.PI/2;for(let fe=0;fe<4;fe++){let qe=J(.06,.1,.012,.017,De,B+.065,oe,Q-.128+fe*.085,C);qe.rotation.y=Math.PI/2,qe.castShadow=!1}}else{let X=T==="rally"?.16:T==="round"?.14:.135,se=p(new Xe(X+.027,X+.02,.095,48),_t,B,oe,Q,C);se.rotation.z=Math.PI/2;let fe=p(new St(X+.008,.01,10,48),qt,B+.054,oe,Q,C);fe.rotation.y=Math.PI/2;let qe=p(new Jt(1,32,20),T==="round"||T==="rally"?Ie:De,B+.055,oe,Q,C);if(qe.scale.set(.025,X,X),qe.castShadow=!1,T==="projector"){let me=p(new St(X*.8,.008,8,48),De,B+.076,oe,Q,C);me.rotation.y=Math.PI/2,p(new Jt(1,24,16),R,B+.081,oe,Q,C).scale.set(.022,X*.53,X*.53)}if(T==="rally")for(let me of[-.07,0,.07]){let Ue=Math.sqrt(X*X-me*me);re([[B+.09,oe-Ue,Q+me],[B+.1,oe,Q+me],[B+.09,oe+Ue,Q+me]],.009,_t,C)}}}}for(let[T,C]of Object.entries(t.streetHeadlights)){let N=new Ve;n.add(N),wt.headlights[T]=N;let Q=i(C.color,.12,.22);Q.emissive.set(C.color),Q.emissiveIntensity=C.smoke?.35:1.1;let B=i(C.smoke?"#1c3348":"#83b6d5",.45,.12);for(let oe of[-1,1]){let X=oe*.72,se=2.57-.28*(X/1.1)**2+.07,fe=1.075;if(C.shape==="sportHousing"){let Ue=new Ht;Ue.moveTo(-.29,.12),Ue.lineTo(.23,.09),Ue.quadraticCurveTo(.32,.02,.26,-.13),Ue.lineTo(-.25,-.14),Ue.closePath();let ee=p(new Ut(Ue,{depth:.09,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),_t,se+.02,fe,X,N);ee.rotation.y=Math.PI/2;for(let ve=0;ve<2;ve++){let ze=X+(ve-.5)*.24;if(p(new Jt(1,24,16),B,se+.13,fe,ze,N).scale.set(.022,.067,.067),C.signature==="rings"){let Ee=p(new St(.086,.01,10,48),Q,se+.155,fe,ze,N);Ee.rotation.y=Math.PI/2}if(C.signature==="doubleL"&&re([[se+.155,fe+.075,ze-.085],[se+.155,fe-.075,ze-.085],[se+.155,fe-.075,ze+.075]],.012,Q,N),C.signature==="pixels")for(let Ee=0;Ee<3;Ee++)p(new $e(.014,.026,.026),Q,se+.155,fe+.09,ze-.055+Ee*.055,N)}C.signature==="arc"&&re([[se+.155,fe-.09,X-.25],[se+.155,fe+.1,X-.25],[se+.155,fe+.12,X],[se+.155,fe+.07,X+.25]],.012,Q,N);continue}let qe=J(.47,.25,.1,.04,_t,se,fe,X,N);qe.rotation.y=Math.PI/2;for(let Ue of[-.18,.18]){p(new $e(.1,.07,.035),qt,se-.035,fe-.15,X+Ue,N);let ee=p(new Xe(.012,.012,.018,12),o,se+.02,fe-.13,X+Ue,N);ee.rotation.z=Math.PI/2}if(["doubleU","brow","triBeam"].includes(C.shape)){let Ue=C.shape==="doubleU"?2:1;for(let ee=0;ee<Ue;ee++){let ve=X+(ee-(Ue-1)/2)*.21;if(p(new Jt(1,24,16),B,se+.073,fe,ve,N).scale.set(.019,.067,.067),C.shape==="doubleU")re([[se+.1,fe+.075,ve-.08],[se+.1,fe-.04,ve-.08],[se+.1,fe-.08,ve-.045],[se+.1,fe-.08,ve+.045],[se+.1,fe-.04,ve+.08],[se+.1,fe+.075,ve+.08]],.01,Q,N);else if(C.shape==="brow"){re([[se+.1,fe+.055,ve-.19],[se+.1,fe+.093,ve-.14],[se+.1,fe+.093,ve+.19]],.011,Q,N);let Re=p(new St(.068,.006,8,32),Q,se+.095,fe-.015,ve,N);Re.rotation.y=Math.PI/2}else for(let Re=0;Re<3;Re++){let Ee=Re*Math.PI*2/3-Math.PI/2;re([[se+.102,fe+Math.sin(Ee)*.025,ve+Math.cos(Ee)*.025],[se+.102,fe+Math.sin(Ee)*.1,ve+Math.cos(Ee)*.1]],.011,Q,N)}}continue}if(C.shape==="bar"){for(let[Ue,ee,ve]of[[.035,.41,.025],[-.045,.33,.012]]){let ze=J(ee,ve,.014,.006,Q,se+.064,fe+Ue,X,N);ze.rotation.y=Math.PI/2,ze.castShadow=!1}continue}if(C.shape==="square"){let Ue=J(.37,.17,.024,.015,Q,se+.065,fe,X,N);Ue.rotation.y=Math.PI/2;for(let ee=0;ee<7;ee++)p(new $e(.006,.16,.004),B,se+.082,fe,X-.15+ee*.05,N);continue}let me=C.count===3?.062:C.count===2?.087:.106;for(let Ue=0;Ue<C.count;Ue++){let ee=X+(Ue-(C.count-1)/2)*(C.count===3?.14:.205),ve=p(new Xe(me+.014,me+.02,.09,C.shape==="hex"?6:40),h,se+.035,fe,ee,N);ve.rotation.z=Math.PI/2;let ze=p(new St(me,.009,8,C.shape==="hex"?6:48),Q,se+.09,fe,ee,N);ze.rotation.y=Math.PI/2,ze.castShadow=!1;let Re=p(new Jt(1,24,16),C.projector?B:Q,se+.077,fe,ee,N);if(Re.scale.set(.018,me*.74,me*.74),Re.castShadow=!1,C.projector&&p(new Jt(1,16,12),Q,se+.092,fe,ee,N).scale.set(.006,me*.31,me*.31),C.cross||C.guard)for(let Ee of[-1,1])re([[se+.11,fe-me*.74,ee-Ee*me*.74],[se+.115,fe,ee],[se+.11,fe+me*.74,ee+Ee*me*.74]],.009,_t,N)}}}let ke={};for(let T of["club","sport","rally","chrome"]){let C=[];ke[T]=C;for(let{wheelGroup:N,sign:Q}of A){let B=new Ve;N.add(B),C.push(B);let oe=T==="rally"?.91:.87,X=T==="rally"?.64:T==="sport"?.49:.57,se=T==="sport"?1:1.23,fe=[],qe=[];for(let ve=0;ve<=48;ve++){let ze=-se+ve*se*2/48;for(let Re of[-X/2,X/2])fe.push(Math.sin(ze)*oe,Math.cos(ze)*oe,Re)}for(let ve=0;ve<48;ve++){let ze=ve*2;qe.push(ze,ze+1,ze+2,ze+1,ze+3,ze+2)}let me=new mt;me.setAttribute("position",new Le(fe,3)),me.setIndex(qe),me.computeVertexNormals();let ee=(T==="chrome"?qt:T==="club"?s:q).clone();ee.side=Nt,p(me,ee,0,0,0,B);for(let ve of[-1,1]){let ze=Array.from({length:49},(Re,Ee)=>{let Oe=-se+Ee*se*2/48;return[Math.sin(Oe)*oe,Math.cos(Oe)*oe,ve*X/2]});re(ze,.012,T==="chrome"?qt:_t,B)}for(let ve of[-1,1])re([[0,0,-Q*.28],[ve*.28,.42,-Q*.31],[ve*.49,.68,-Q*.31]],.022,_t,B),ne(ve*.49,.68,-Q*.32,B);if(T==="rally"){let ve=J(.13,.25,X*.9,.025,_t,-.83,.2,0,B)}B.userData.shell=ee}}wt.windshield={};for(let[T,C,N,Q]of[["deflector",.3,"#b6e3eb",.18],["sport",.59,"#a9d5e7",.23],["touring",.88,"#c1e3ed",.17],["smoke",.7,"#455f7a",.4],["iridium",.82,"#8b8dc3",.3],["highClear",1.15,"#c5e8ef",.18],["highSmoke",1.28,"#597187",.38],["grandTour",1.5,"#b8e0e9",.2],["highIridium",1.4,"#9d91ce",.3]]){let oe=function(Re,Ee){let Oe=.92*(1-.13*Ee),rt=1-Re*Re;return[1.97+.23*rt-C*.32*Ee,1.5+C*Ee*(.84+.16*rt),Re*Oe]},B=new Ve;n.add(B),wt.windshield[T]=B;let X=[],se=[],fe=40,qe=16;for(let Re=0;Re<=qe;Re++)for(let Ee=0;Ee<=fe;Ee++)X.push(...oe(-1+Ee*2/fe,Re/qe));for(let Re=0;Re<qe;Re++)for(let Ee=0;Ee<fe;Ee++){let Oe=Re*(fe+1)+Ee;se.push(Oe,Oe+1,Oe+fe+1,Oe+1,Oe+fe+2,Oe+fe+1)}let me=new mt;me.setAttribute("position",new Le(X,3)),me.setIndex(se),me.computeVertexNormals();let Ue=new Sn({color:N,metalness:.05,roughness:.075,transparent:!0,opacity:Q,depthWrite:!1,side:Nt,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});B.userData.glass=Ue,B.userData.originalTint={color:N,opacity:Q};let ee=p(me,Ue,0,0,0,B);ee.castShadow=!1,ee.receiveShadow=!1,ee.renderOrder=3;let ve=["smoke","highSmoke"].includes(T)?_t:qt;for(let Re of[0,1])re(Array.from({length:41},(Ee,Oe)=>oe(-1+Oe/20,Re)),Re===0?.017:.009,ve,B);for(let Re of[-1,1]){re(Array.from({length:17},(rt,dn)=>oe(Re,dn/16)),.011,ve,B);let Ee=oe(Re,0);J(.19,.055,.14,.025,_t,Ee[0],Ee[1]-.025,Ee[2],B);let Oe=p(new Xe(.013,.013,.018,6),qt,Ee[0]+.04,Ee[1]+.014,Ee[2],B)}let ze=new kn({color:"#ddf4ff",transparent:!0,opacity:.2,depthWrite:!1});for(let Re of[-.77,-.69]){let Ee=Array.from({length:13},(rt,dn)=>{let Pt=oe(Re,.18+dn*.058);return Pt[0]+=.004,Pt}),Oe=re(Ee,.003,ze,B);Oe.castShadow=!1,Oe.receiveShadow=!1,Oe.renderOrder=4}}let Je=new Ve;for(let T of n.children.slice())T.userData.groundWheel||Je.add(T);n.add(Je);let Qe=i("#b8c7d6",.72,.27),Ke=new Ve,at=[];n.add(Ke);for(let T of[-1.72,1.72])for(let C of[-1,1]){let N=new Ve;N.position.set(T,.52,C*1.12),Ke.add(N);let Q=Array.from({length:193},(Ue,ee)=>{let ve=ee/192,ze=ve*Math.PI*14;return new w(Math.cos(ze)*.071,.055+ve*.36,Math.sin(ze)*.071)}),B=p(new Tt(new Mt(Q),192,.014,10,!1),Qe,0,0,0,N);p(new Xe(.039,.039,.23,24),_t,0,.14,0,N);let oe=p(new Xe(.018,.018,.28,20),qt,0,.34,0,N),X=new Ve;X.position.y=.47,N.add(X);for(let[Ue,ee]of[[N,.04],[X,-.015]])p(new Xe(.095,.095,.026,32),qt,0,ee,0,Ue),p(new Xe(.068,.068,.018,24),_t,0,ee+.02,0,Ue);p(new $e(.14,.075,.18),_t,0,.025,C*.035,N),p(new $e(.16,.075,.22),_t,0,0,-C*.075,X);let se=new w(T,.56,C*1.12),fe=new w(T,.81,C*1.43),qe=fe.clone().sub(se);p(new Xe(.026,.026,qe.length(),16),_t,...se.clone().add(fe).multiplyScalar(.5).toArray(),Ke).quaternion.setFromUnitVectors(new w(0,1,0),qe.normalize()),at.push({coil:B,rod:oe,upper:X})}wt.brakes={};for(let T of["stock","red","gold","ceramic"]){let C=new Ve;n.add(C),wt.brakes[T]=C;for(let{wheelGroup:N,sign:Q}of A){let B=cc(T);B.position.z=Q*.165,Q<0&&(B.rotation.y=Math.PI),N.add(B),C.userData.brakeAssemblies??=[],C.userData.brakeAssemblies.push(B)}}wt.nitrous={};let At=document.createElement("canvas");At.width=512,At.height=256;let ft=At.getContext("2d");ft.fillStyle="#101923",ft.fillRect(0,0,512,256),ft.strokeStyle="#e8e1cc",ft.lineWidth=8,ft.strokeRect(10,10,492,236),ft.fillStyle="#f5f2e8",ft.textAlign="center",ft.font="italic bold 106px Arial",ft.fillText("N\u2082O",256,117),ft.font="bold 24px Arial",ft.fillText("NITROUS OXIDE",256,159),ft.fillStyle="#d9b36b",ft.font="bold 18px Arial",ft.fillText("RACING SYSTEM \xB7 2.5 LB",256,195);for(let T=0;T<42;T++)ft.fillRect(165+T*4,212,T%3+1,17);let Bt=new Et(At);Bt.colorSpace=pt,Bt.anisotropy=8;let Ct=document.createElement("canvas");Ct.width=Ct.height=128;let He=Ct.getContext("2d");He.fillStyle="#eee9dc",He.fillRect(0,0,128,128),He.translate(64,64),He.strokeStyle="#17202a";for(let T=0;T<=20;T++){let C=-Math.PI*.8+T*Math.PI*1.6/20;He.lineWidth=T%5?2:4,He.beginPath(),He.moveTo(Math.sin(C)*43,-Math.cos(C)*43),He.lineTo(Math.sin(C)*(T%5?49:53),-Math.cos(C)*(T%5?49:53)),He.stroke()}He.fillStyle="#293541",He.textAlign="center",He.font="bold 14px Arial",He.fillText("PSI",0,30),He.strokeStyle="#c92737",He.lineWidth=4,He.beginPath(),He.moveTo(-9,12),He.lineTo(26,-31),He.stroke(),He.fillStyle="#25313a",He.beginPath(),He.arc(0,0,6,0,Math.PI*2),He.fill();let It=new Et(Ct);It.colorSpace=pt;for(let T of["blue","twin","triple"]){let C=new Ve;C.name="nitrous-"+T,n.add(C),wt.nitrous[T]=C;let N=i(t.item("nitrous",T).color,.65,.27),Q=T==="triple"?3:T==="twin"?2:1,B=1.49,oe=-1.3,X=.37,se=i("#b4924f",.8,.3),fe=i("#a5b2bd",.85,.24),qe=i("#1b2028",.08,.85),me=i("#ab2635",.35,.4);for(let Ue of[-1.52,-1.13]){J(.095,.05,Q*X+.04,.015,h,Ue,1.29,0,C);for(let ee of[-1,1]){let ve=ee*(Q*X/2-.02);p(new Xe(.024,.024,.023,6),fe,Ue,1.327,ve,C)}}for(let Ue=0;Ue<Q;Ue++){let ee=(Ue-(Q-1)/2)*X,ve=[[0,-.4],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.2],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385]].map(([Tn,On])=>new ue(Tn,On)),ze=p(new xi(ve,40),N,oe,B,ee,C);ze.rotation.z=-Math.PI/2;for(let Tn of[-1.52,-1.13]){J(.11,.095,.27,.025,qe,Tn,1.35,ee,C);let On=p(new St(.152,.013,8,40),fe,Tn,B,ee,C);On.rotation.y=Math.PI/2,J(.08,.025,.055,.008,fe,Tn,B+.155,ee,C),p(new Xe(.013,.013,.018,6),h,Tn,B+.179,ee,C)}let Re=[],Ee=[],Oe=[];for(let Tn=0;Tn<2;Tn++)for(let On=0;On<=16;On++){let fc=-.91+On*1.82/16;if(Re.push(oe+(Tn?.12:-.12),B+Math.cos(fc)*.147,ee+Math.sin(fc)*.147),Ee.push(Tn,On/16),Tn&&On){let ir=17+On;Oe.push(ir-18,ir-17,ir,ir-18,ir,ir-1)}}let rt=new mt;rt.setAttribute("position",new Le(Re,3)),rt.setAttribute("uv",new Le(Ee,2)),rt.setIndex(Oe),rt.computeVertexNormals();let dn=new Sn({map:Bt,roughness:.55,metalness:.05,side:Nt});p(rt,dn,0,0,0,C);let Pt=p(new Xe(.046,.046,.055,24),se,-.89,B,ee,C);Pt.rotation.z=Math.PI/2,J(.075,.07,.065,.012,se,-.845,B,ee,C),p(new Xe(.016,.016,.065,16),fe,-.845,B+.045,ee,C);let Kt=p(new St(.052,.012,8,24),me,-.845,B+.092,ee,C);Kt.rotation.x=Math.PI/2;for(let Tn of[0,Math.PI/3,Math.PI*2/3]){let On=J(.106,.014,.014,.004,me,-.845,B+.092,ee,C);On.rotation.y=Tn}let Gt=new Ve;Gt.position.set(-.84,B+.065,ee+.075),Gt.rotation.x=-Math.PI*.32,C.add(Gt);let Ti=p(new Xe(.057,.057,.03,32),fe,0,0,0,Gt);Ti.rotation.x=Math.PI/2;let mc=p(new Vn(.047,32),new kn({map:It}),0,0,.017,Gt),Rs=p(new Xe(.024,.024,.055,6),se,-.79,B,ee,C);Rs.rotation.z=Math.PI/2,re([[-.76,B,ee],[-.7,B-.02,ee],[-.71,1.3,ee],[-.91,1.24,ee]],.014,qe,C);let Fu=p(new Xe(.021,.021,.055,12),fe,-.74,B,ee,C);Fu.rotation.z=Math.PI/2}J(.07,.07,Q*X,.015,se,-.91,1.24,0,C),re([[-.91,1.24,0],[-.66,1.16,.12],[-.2,1.1,.39],[.46,1.11,.49]],.016,qe,C)}wt.pedals={};for(let T of["classic","aluminium","formula"]){let C=Du(T);n.add(C),wt.pedals[T]=C}wt.seat={};for(let T of["red","carbon","emerald","ivory"]){let C=pc(T);C.rotation.y=Math.PI/2,C.position.set(-.8,1,0),n.add(C),wt.seat[T]=C}let en=Iu(x);function ht(T){let C=["formula","formulaPro","formulaElite"].includes(T.frontBumper);en.set(C),ce(T);let N=t.glassTints[T.glassTint]||t.glassTints.original;for(let ee of Object.values(wt.windshield)){let ve=ee.userData.originalTint;ee.userData.glass.color.set(N.opacity===null?ve.color:N.color),ee.userData.glass.opacity=N.opacity??ve.opacity}let Q=(t.wheelDiameters[T.wheelSize]||16)/16,B=(Q-1)*(.715/.86),oe={standard:1,wide:1.25,ultra:1.45}[T.tyreWidth]||1;for(let{wheelGroup:ee,sign:ve,tyres:ze}of A){ee.scale.set(.88/1.24*Q,.88/.86*Q,oe/.95),ee.position.y=.715/.86*Q,ee.position.z=ve*(1.36+.25*(oe-1));for(let[Re,Ee]of Object.entries(ze))for(let Oe of Ee)Oe.visible=Re===(T.tyres||"standard")}let X=B+({standard:0,raised:.2,comfort:.12,high:.38,rally:.48,extreme:.6}[T.suspension]||0);for(let[ee,ve]of Object.entries(wt))if(ee!=="brakes")for(let ze of Object.values(ve))ze.parent===n&&(ze.userData.mountBaseY??=ze.position.y,ze.position.y=ze.userData.mountBaseY+X);Qt.forEach(ee=>ee.visible=!T.headlights||T.headlights==="classic");for(let[ee,ve]of Object.entries(ke))for(let ze of ve)ze.visible=T.fenders===ee,ee==="club"&&ze.userData.shell.color.set(t.item("paint",T.paint).color);Qe.color.set(t.item("suspension",T.suspension).color),Je.position.y=X,Ke.visible=X>0,at.forEach(({coil:ee,rod:ve,upper:ze})=>{ee.scale.y=1+X/.415,ve.scale.y=1+X/.28,ve.position.y=.34+X/2,ze.position.y=.47+X});for(let[ee,ve]of Object.entries(wt))for(let[ze,Re]of Object.entries(ve))Re.visible=(ee==="pedals"?T.pedals||"classic":T[ee])===ze;C&&Object.values(wt.headlights).forEach(ee=>ee.visible=!1);for(let[ee,ve]of Object.entries(wt.brakes))for(let ze of ve.userData.brakeAssemblies||[])ze.visible=(T.brakes||"stock")===ee;Object.entries(Te).forEach(([ee,ve])=>ve.visible=ee===(T.steering||"classic")),Object.entries(Yt).forEach(([ee,ve])=>ve.visible=ee===(T.exhaust||"classic")),Wt.visible=T.turbine==="boost";let se=["twin","twinBig"].includes(T.turbine),fe=T.turbine==="twinBig",qe=fe?.9:se?.52:T.turbine==="boost"?.96:.9;Ft.scale.set(qe/1.24,qe/.86,qe/.95),Ft.position.set(yt,st+(fe?.06:se?-.2:-.04),se?fe?-.7:-.44:0),zt.visible=se,zt.scale.copy(Ft.scale),zt.position.set(yt,st+(fe?.06:-.2),fe?.7:.44);let me=hc([Ft,zt],Je);for(let ee of Object.values(wt.spoiler))ee.userData.fitTurbines(me);let Ue=T.badges||[];if(W.forEach(ee=>ee.visible=!Ue.length),G.forEach(ee=>ee.userData.plane.visible=!Ue.length),F.forEach(({group:ee,mat:ve,back:ze,n:Re})=>{let Ee=Ue[Re];ee.visible=!!Ee;let Oe=Ee+":"+(T.prizeTotal||0);if(!Ee||ve.userData.badge===Oe)return;let rt=new Ht,dn=.65/512,Pt=(Kt,Gt)=>[(Kt-256)*dn,(256-Gt)*dn];if(Ee==="millionaire"||Ee==="day-hero")rt.absarc(0,0,204*dn,0,Math.PI*2,!1);else if(Ee==="rating-top10"){for(let Kt=0;Kt<6;Kt++){let Gt=Kt*Math.PI/3-Math.PI/2,Ti=Pt(256+Math.cos(Gt)*215,256+Math.sin(Gt)*215);Kt?rt.lineTo(...Ti):rt.moveTo(...Ti)}rt.closePath()}else rt.moveTo(...Pt(80,88)),rt.quadraticCurveTo(...Pt(256,0),...Pt(432,88)),rt.lineTo(...Pt(420,296)),rt.quadraticCurveTo(...Pt(390,400),...Pt(256,465)),rt.quadraticCurveTo(...Pt(122,400),...Pt(92,296)),rt.closePath();ze.geometry.dispose(),ze.geometry=new Ut(rt,{depth:.025,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24}),ve.map?.dispose(),ve.map=new Et(t.badgeCanvas(Ee,T)),ve.map.colorSpace=pt,ve.map.anisotropy=16,ve.emissive.set("#ffffff"),ve.emissiveMap=ve.map,ve.emissiveIntensity=.35,ve.userData.badge=Oe,ve.needsUpdate=!0}),s.color.set(t.item("paint",T.paint).color),a.color.copy(s.color).multiplyScalar(.45),l.color.set(t.wheelPaintColor(T)),E!==T.wheels){for(let ee of Z)ee.removeFromParent(),ee.geometry.dispose();Z.length=0,n.updateMatrixWorld(!0);for(let{wheelGroup:ee,x:ve,out:ze,sign:Re}of A)for(let Ee of t.wheelDesign(T.wheels)){let Oe=new Mt(Ee.map(([dn,Pt])=>new w(dn,Pt,Re*(.25+.025*(1-Math.hypot(dn,Pt)/.51))))),rt=p(new Tt(Oe,20,{bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[T.wheels]||(["fiveSpoke","legend"].includes(T.wheels)?.023:.009),8,!1),l,0,0,0,ee);Z.push(rt)}E=T.wheels}o.color.set(t.item("trim",T.trim).color),o.roughness=["brushedSteel","gunmetal","satinNickel"].includes(T.trim)?.48:["cobalt","anodizedRed","champagne"].includes(T.trim)?.3:.135,o.metalness=.95,u.userData.style!==T.upholstery&&(u.map?.dispose(),u.map=new Et(t.upholsteryCanvas(T.upholstery)),u.map.colorSpace=pt,u.map.wrapS=u.map.wrapT=Zn,u.map.repeat.set(12,2),u.color.set("#ffffff"),u.roughness=["alcantara","blueSuede","greenSuede"].includes(T.upholstery)?.95:T.upholstery==="carbonWeave"?.28:.38,u.userData.style=T.upholstery,u.needsUpdate=!0),t.chipPalette(T.chips).forEach((ee,ve)=>{xe[ve].color.set(ee),xe[ve].roughness=T.chips==="ceramic"?.25:.55}),Y.forEach(ee=>ee.visible=T.chips!=="ceramic"),$.forEach(({mat:ee,n:ve})=>{ee.userData.style!==T.chips&&(ee.map?.dispose(),ee.map=new Et(t.chipCanvas(T.chips,ve)),ee.map.colorSpace=pt,ee.map.anisotropy=8,ee.userData.style=T.chips,ee.needsUpdate=!0)}),Cn.forEach((ee,ve)=>{ee.userData.style!==T.cards&&(ee.map?.dispose(),ee.map=new Et(t.cardCanvas(T.cards,ve)),ee.map.colorSpace=pt,ee.map.anisotropy=16,ee.userData.style=T.cards,ee.needsUpdate=!0)}),Z.forEach(ee=>ee.visible=!0),Ce.forEach(ee=>ee.visible=!0),d.color.set(t.item("light",T.light).color),d.emissive.copy(d.color),m.color.copy(d.color).multiplyScalar(.075),m.emissive.copy(d.color),m.emissiveIntensity=.045,jt.userData.number!==T.number+T.region&&(jt.map?.dispose(),jt.map=new Et(t.plateCanvas(T)),jt.userData.number=T.number+T.region,jt.needsUpdate=!0)}for(let T of[-1,1])re([[-1.64,.43,T*.94],[0,.4,T*1.02],[1.66,.43,T*.94]],.027,d,Je),re([[T*1.91,.43,-.66],[T*2.05,.43,0],[T*1.91,.43,.66]],.023,d,Je);let et=new Rr(d.color,.45,2,2);et.position.set(-1.9,2,.48),Je.add(et);let Rn=ht;function nr(T){Rn(T),et.color.copy(d.color)}return nr(e),{car:n,update:nr}}window.pokerCreateGarage3D=function(r,e,t={}){let n;try{n=new Xn({alpha:!0,antialias:!0,powerPreference:"low-power"})}catch{return r.textContent="3D-\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435",null}n.setPixelRatio(t.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=pt,n.toneMapping=si,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Ga,r.appendChild(n.domElement),n.domElement.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043C\u0430\u0448\u0438\u043D\u0430: \u043F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),n.domElement.setAttribute("role","img");let i=new Mn,s=new kt(t.snapshotOnly?25:35,1,.1,60);s.zoom=t.previewScale||1,i.add(new Fn("#c6d9ef","#44311e",1.25));for(let[te,ce,we,he,ge]of[["#fff0d0",4,1,6,5],["#9dcfff",2,-4,3,-3],["#ffffff",1.5,0,5,-4]]){let pe=new En(te,ce);pe.position.set(we,he,ge),pe.castShadow=te==="#fff0d0",pe.shadow.bias=-2e-4,pe.shadow.normalBias=.025,pe.shadow.mapSize.set(2048,2048),pe.shadow.camera.left=-5,pe.shadow.camera.right=5,pe.shadow.camera.top=5,pe.shadow.camera.bottom=-5,i.add(pe)}let a=new Mn;a.background=new Ze("#48505b");for(let[te,ce,we,he,ge,pe]of[[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){let Z=new tt(new $e(he,ge,pe),new kn({color:"#ffffff"}));Z.position.set(te,ce,we),a.add(Z)}let o=new Br(n),c=o.fromScene(a,.05);i.environment=c.texture,i.environmentIntensity=1.5,a.traverse(te=>{te.geometry?.dispose(),te.material?.dispose()}),o.dispose();let l=new tt(new Zt(30,30),new ys({opacity:.34}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,i.add(l);let h=Kp(i,e),u=new fn({transparent:!0,depthWrite:!1,side:Nt,toneMapped:!1,uniforms:{color:{value:new Ze(window.PokerGarage.item("light",e.light).color)},strength:{value:1}},vertexShader:"varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}"}),d=new tt(new Zt(7.5,4.5),u);d.rotation.x=-Math.PI/2,d.position.y=.014,d.renderOrder=1,i.add(d);let m=[];for(let te of[-.9,.9]){let ce=new Rr(u.uniforms.color.value,1.8,3,2);ce.position.set(0,.32,te),i.add(ce),m.push(ce)}let p=r.closest(".player-hall__room");t.night??=p?.dataset.theme==="midnight";function y(te){t.night=!!te;for(let ce of i.children)ce.isHemisphereLight&&(ce.intensity=te?.26:1.25),ce.isDirectionalLight&&(ce.userData.dayIntensity??=ce.intensity,ce.intensity=ce.userData.dayIntensity*(te?.13:1));i.environmentIntensity=te?.24:1.5,u.uniforms.strength.value=te?1.35:.95}y(t.night);let f=te=>{p&&y(p.dataset.theme==="midnight")};window.addEventListener("poker-garage-lighting",f);let g=te=>{h.update(te),u.uniforms.color.value.set(window.PokerGarage.item("light",te.light).color),m.forEach(ce=>ce.color.copy(u.uniforms.color.value))};t.yaw??=.9,t.pitch??=.25,t.manual??=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let v=!1,_=null,x=0,M=0,b=()=>{let te=r.clientWidth,ce=r.clientHeight;te&&ce&&(n.setSize(te,ce,!1),s.aspect=te/ce,s.updateProjectionMatrix())},L=new ResizeObserver(b);L.observe(r),b();let O=new Gn(1,1,{type:Ni,depthBuffer:!0});O.samples=4;let U=new Mn,k=new Mi(-1,1,1,-1,0,1),I=new fn({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!0,uniforms:{source:{value:O.texture},stepSize:{value:new ue}},vertexShader:"varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`}),D=new tt(new Zt(2,2),I);U.add(D);function K(){let te=n.getDrawingBufferSize(new ue);(O.width!==te.x||O.height!==te.y)&&O.setSize(te.x,te.y),I.uniforms.stepSize.value.set(3/te.x,3/te.y),n.setRenderTarget(O),n.render(i,s),n.setRenderTarget(null),n.render(U,k)}let V=te=>{te.button&&te.button!==0||(t.manual=!0,_={id:te.pointerId,x:te.clientX,y:te.clientY},r.setPointerCapture(te.pointerId),te.preventDefault())},j=te=>{!_||_.id!==te.pointerId||(t.yaw-=(te.clientX-_.x)*.011,t.pitch=Nu(t.pitch+(te.clientY-_.y)*.009,-.24,1.35),_.x=te.clientX,_.y=te.clientY,te.preventDefault())},ie=te=>{_&&_.id===te.pointerId&&(_=null,r.hasPointerCapture(te.pointerId)&&r.releasePointerCapture(te.pointerId))},de=te=>{let ce={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};ce[te.key]&&(t.manual=!0,t.yaw+=ce[te.key][0],t.pitch=Nu(t.pitch+ce[te.key][1],-.24,1.35),te.preventDefault())};r.addEventListener("keydown",de),r.addEventListener("pointerdown",V),r.addEventListener("pointermove",j),r.addEventListener("pointerup",ie),r.addEventListener("pointercancel",ie),r.addEventListener("lostpointercapture",ie);function le(){if(v)return;v=!0,window.removeEventListener("poker-garage-lighting",f),cancelAnimationFrame(x),L.disconnect(),r.removeEventListener("keydown",de),r.removeEventListener("pointerdown",V),r.removeEventListener("pointermove",j),r.removeEventListener("pointerup",ie),r.removeEventListener("pointercancel",ie),r.removeEventListener("lostpointercapture",ie);let te=new Set,ce=new Set,we=new Set;i.traverse(he=>{he.geometry&&we.add(he.geometry),he.material&&ce.add(he.material)}),ce.forEach(he=>{for(let ge of Object.values(he))ge&&ge.isTexture&&te.add(ge);he.dispose()}),te.forEach(he=>he.dispose()),we.forEach(he=>he.dispose()),c.dispose(),O.dispose(),I.dispose(),D.geometry.dispose(),n.dispose(),t.snapshotOnly&&n.forceContextLoss(),n.domElement.remove()}function be(te){if(v)return;if(!r.isConnected||r.closest("dialog")&&!r.closest("dialog").open){le();return}let ce=M?Math.min(.05,(te-M)/1e3):0;if(M=te,!document.hidden&&r.getBoundingClientRect().bottom>0){t.manual||(t.yaw+=ce*.13);let we=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*we,1.15+Math.sin(t.pitch)*we,Math.cos(t.yaw)*Math.cos(t.pitch)*we),s.lookAt(0,1.2,0),K(),r.dataset.yaw=t.yaw.toFixed(4),r.dataset.pitch=t.pitch.toFixed(4),r.dataset.manual=String(t.manual)}x=requestAnimationFrame(be)}return t.snapshotOnly||(x=requestAnimationFrame(be)),{update:g,setNight:y,dispose:le,state:t,snapshot(){let te=Math.max(t.snapshotOnly?13:9,3.6/(Math.tan(s.fov*Math.PI/360)*s.aspect));s.position.set(Math.sin(t.yaw)*Math.cos(t.pitch)*te,1.15+Math.sin(t.pitch)*te,Math.cos(t.yaw)*Math.cos(t.pitch)*te),s.lookAt(0,1.2,0),K();let ce=document.createElement("canvas");return ce.width=n.domElement.width,ce.height=n.domElement.height,ce.getContext("2d").drawImage(n.domElement,0,0),ce}}};})();
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
