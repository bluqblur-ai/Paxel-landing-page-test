(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.ZineJS={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.defineProperty,n=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},r=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r};function i(e,t={}){let{direction:n=`ltr`,mode:r=`cover`}=t;if(e<=0)return[];let i=t=>t>=0&&t<e?t:null,a=[];if(r===`single`)for(let t=0;t<e;t++)a.push({left:null,right:t});else if(r===`double`)for(let t=0;t<e;t+=2)a.push({left:i(t),right:i(t+1)});else if(r===`cover`){a.push({left:null,right:0});for(let t=1;t<e;t+=2)a.push({left:i(t),right:i(t+1)})}else if(a.push({left:null,right:0}),e>1){for(let t=1;t<=e-2;t+=2)a.push({left:i(t),right:t+1<=e-2?i(t+1):null});a.push({left:e-1,right:null})}return n===`rtl`?a.map(e=>({left:e.right,right:e.left})):a}function a(e,t){return e<t}function o(e,t,n){let r=[],i=Math.max(0,e-n),a=Math.min(t-1,e+n);for(let e=i;e<=a;e++)r.push(e);return r}var s=class{#e;#t=new Set;constructor(e=2){this.#e=e}get mounted(){return[...this.#t].sort((e,t)=>e-t)}update(e,t){let n=new Set(o(e,t,this.#e)),r=[...n].filter(e=>!this.#t.has(e)).sort((e,t)=>e-t),i=[...this.#t].filter(e=>!n.has(e)).sort((e,t)=>e-t);for(let e of i)this.#t.delete(e);for(let e of r)this.#t.add(e);return{toMount:r,toEvict:i}}},c=class{#e=new Map;on(e,t){let n=this.#e.get(e);return n||(n=new Set,this.#e.set(e,n)),n.add(t),()=>this.off(e,t)}off(e,t){this.#e.get(e)?.delete(t)}emit(e,...t){let n=t[0],r=this.#e.get(e);if(r)for(let e of[...r])e(n)}clear(){this.#e.clear()}},l={idle:{grab:`dragging`,panStart:`zoomed-panning`,flip:`animating`},dragging:{release:`animating`},animating:{settle:`idle`},"zoomed-panning":{panEnd:`idle`}};function u(e,t){return l[e][t]??null}var d=class{#e;constructor(e=`idle`){this.#e=e}get state(){return this.#e}send(e){let t=u(this.#e,e);return t!==null&&(this.#e=t),t}},f=.3,p=class{#e;#t=null;#n=null;#r=null;#i=null;constructor(e={}){this.#e=e}get active(){return this.#t!==null}down(e,t,n,r){if(this.#t!==null)return;this.#t=e;let i={x:t,y:n,t:r};this.#n=i,this.#r=i,this.#i=i,this.#e.onStart?.({x:t,y:n,t:r})}move(e,t,n,r){e!==this.#t||this.#n===null||(this.#r=this.#i,this.#i={x:t,y:n,t:r},this.#e.onMove?.({x:t,y:n,dx:t-this.#n.x,dy:n-this.#n.y}))}up(e,t,n,r){this.#a(e,t,n,r,!1)}cancel(e,t,n,r){this.#a(e,t,n,r,!0)}#a(e,t,n,r,i){if(e!==this.#t||this.#n===null)return;let a=this.#n,o=this.#i??a,s=this.#r??a,c=o.t-s.t,l=c>0?(o.x-s.x)/c:0,u=c>0?(o.y-s.y)/c:0,d=Math.hypot(l,u);this.#o(),this.#e.onEnd?.({x:t,y:n,dx:t-a.x,dy:n-a.y,dt:r-a.t,vx:l,vy:u,swipe:!i&&d>f,canceled:i})}#o(){this.#t=null,this.#n=null,this.#r=null,this.#i=null}};function m(e,t){let{pointer:n,pinch:r}=t,i=e=>{let t=e;n?.down(t.pointerId,t.clientX,t.clientY,t.timeStamp),r?.down(t.pointerId,t.clientX,t.clientY)},a=e=>{let t=e;n?.move(t.pointerId,t.clientX,t.clientY,t.timeStamp),r?.move(t.pointerId,t.clientX,t.clientY)},o=e=>{let t=e;n?.up(t.pointerId,t.clientX,t.clientY,t.timeStamp),r?.up(t.pointerId)},s=e=>{let t=e;n?.cancel(t.pointerId,t.clientX,t.clientY,t.timeStamp),r?.cancel(t.pointerId)};return e.addEventListener(`pointerdown`,i),e.addEventListener(`pointermove`,a),e.addEventListener(`pointerup`,o),e.addEventListener(`pointercancel`,s),()=>{e.removeEventListener(`pointerdown`,i),e.removeEventListener(`pointermove`,a),e.removeEventListener(`pointerup`,o),e.removeEventListener(`pointercancel`,s)}}function h(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}var g=class{#e;#t=new Map;#n=0;#r=!1;constructor(e={}){this.#e=e}get pinching(){return this.#r}down(e,t,n){if(!(this.#t.has(e)||this.#t.size>=2)&&(this.#t.set(e,{x:t,y:n}),this.#t.size===2)){let{a:e,b:t}=this.#a();this.#n=h(e,t),this.#r=!0,this.#e.onPinchStart?.({centerX:(e.x+t.x)/2,centerY:(e.y+t.y)/2,distance:this.#n})}}move(e,t,n){let r=this.#t.get(e);if(!r||(r.x=t,r.y=n,!this.#r))return;let{a:i,b:a}=this.#a();this.#e.onPinchMove?.({centerX:(i.x+a.x)/2,centerY:(i.y+a.y)/2,scale:this.#n>0?h(i,a)/this.#n:1})}up(e){this.#i(e)}cancel(e){this.#i(e)}#i(e){this.#t.delete(e)&&this.#r&&this.#t.size<2&&(this.#r=!1,this.#n=0,this.#e.onPinchEnd?.())}#a(){let e=[...this.#t.values()],t=e[0],n=e[1];if(!t||!n)throw Error(`pinch requires two active pointers`);return{a:t,b:n}}},_=`page`,v=!1;function y(){return v?!1:(v=!0,!0)}function b(){v=!1}function x(e){let t=new URLSearchParams(e.replace(/^#/,``)).get(_);if(t===null)return null;let n=Number(t);return Number.isInteger(n)&&n>=1?n-1:null}function S(e,t){let n=new URLSearchParams(e.replace(/^#/,``));return n.set(_,String(t+1)),`#${n.toString()}`}function C(e,t){let n=null,r=()=>{let r=x(e.location.hash);r===null||r===n||(n=r,t(r))};return e.addEventListener(`hashchange`,r),{push(t){if(t===n)return;n=t;let r=S(e.location.hash,t);r!==e.location.hash&&e.history?.replaceState?.(e.history.state,``,r)},stop(){e.removeEventListener(`hashchange`,r)}}}var w,T,E,D=n((()=>{w=[`cone`,`simple`],T=[`roll`,`leaf`,`flick`,`silk`],E=`cone`}));function ee(e){let t=e<0?0:e>1?1:e,n=Math.sin(t*Math.PI);return{angle:t*Math.PI,curl:n,shadowAlpha:n}}var te=n((()=>{})),ne=r({CssRenderer:()=>oe});function re(e){return e.left===null==(e.right===null)?0:e.right===null?1:-1}function ie(e){let t=e===`forward`?`to right`:`to left`;return[`linear-gradient(${t}, rgba(0,0,0,0.6), rgba(0,0,0,0.15) 40%, rgba(0,0,0,0) 60%)`,`linear-gradient(${t}, transparent 40%, rgba(255,255,255,0.32) 66%, transparent 90%)`,`linear-gradient(${t}, transparent 66%, rgba(0,0,0,0.35))`].join(`,`)}var ae,oe,se=n((()=>{te(),ae=180/Math.PI,oe=class{#e=null;#t;#n;#r;#i;#a;#o;#s;#c;#l;#u=0;#d=0;#f=0;#p=0;#m=!1;#h=0;mount(e){let t=e.ownerDocument;return this.#e=e,this.#t=t.createElement(`div`),this.#t.className=`zine-clip`,this.#t.style.cssText=`position:relative;width:100%;height:100%;overflow:hidden;`,this.#n=t.createElement(`div`),this.#n.className=`zine-viewport`,this.#n.style.cssText=`position:absolute;inset:0;transform-origin:0 0;`,this.#r=t.createElement(`div`),this.#r.className=`zine-book`,this.#r.style.cssText=`position:absolute;inset:0;perspective:2000px;transform-style:preserve-3d;`,this.#i=this.#x(t,`zine-page-left`,`left:0;`),this.#a=this.#x(t,`zine-page-right`,`right:0;`),this.#o=t.createElement(`div`),this.#o.className=`zine-leaf`,this.#o.style.cssText=`position:absolute;top:0;width:50%;height:100%;transform-style:preserve-3d;display:none;`,this.#s=t.createElement(`canvas`),this.#s.className=`zine-leaf-front`,this.#s.style.cssText=`position:absolute;inset:0;width:100%;height:100%;backface-visibility:hidden;`,this.#c=t.createElement(`canvas`),this.#c.className=`zine-leaf-back`,this.#c.style.cssText=`position:absolute;inset:0;width:100%;height:100%;backface-visibility:hidden;transform:rotateY(180deg);`,this.#l=t.createElement(`div`),this.#l.className=`zine-leaf-shadow`,this.#l.style.cssText=`position:absolute;inset:0;opacity:0;pointer-events:none;`,this.#l.style.background=ie(`forward`),this.#o.append(this.#s,this.#c,this.#l),this.#r.append(this.#i,this.#a,this.#o),this.#n.append(this.#r),this.#t.append(this.#n),e.append(this.#t),Promise.resolve()}destroy(){this.#t?.remove(),this.#e=null}renderSpread(e,t,n){n?.fill?(this.#i.style.width=`100%`,this.#a.style.display=`none`,this.#S(this.#i,t.right??t.left)):(this.#i.style.width=`50%`,this.#a.style.display=``,this.#S(this.#i,t.left),this.#S(this.#a,t.right)),this.#m=n?.fill??!1,this.#h=this.#m?0:re(t),this.#_(t),this.#v(),this.#g(this.#h),this.#o.style.display=`none`,this.#o.style.transform=``,this.#l.style.opacity=`0`}beginFlip(e,t,n,r){r?.fill?(this.#i.style.width=`100%`,this.#a.style.display=`none`,this.#o.style.width=`100%`,this.#o.style.left=`0`,this.#o.style.transformOrigin=n===`forward`?`left center`:`right center`,this.#S(this.#i,t.right??t.left),this.#S(this.#s,e.right??e.left),this.#S(this.#c,t.right??t.left)):(this.#i.style.width=`50%`,this.#a.style.display=``,this.#o.style.width=`50%`,n===`forward`?(this.#S(this.#i,e.left),this.#S(this.#a,t.right),this.#S(this.#s,e.right),this.#S(this.#c,t.left),this.#o.style.left=`50%`,this.#o.style.transformOrigin=`left center`):(this.#S(this.#a,e.right),this.#S(this.#i,t.left),this.#S(this.#s,e.left),this.#S(this.#c,t.right),this.#o.style.left=`0`,this.#o.style.transformOrigin=`right center`)),this.#u=r?.fill?0:re(e),this.#d=r?.fill?0:re(t),this.#m=r?.fill??!1,this.#_(t),this.#v(),this.#g(this.#u),this.#o.style.display=`block`,this.#o.style.transform=`rotateY(0deg)`,this.#l.style.background=ie(n),this.#l.style.opacity=`0`}setFlipProgress(e,t){let n=ee(e),r=n.angle*ae;this.#g(this.#u+(this.#d-this.#u)*e),this.#o.style.display=`block`,this.#o.style.transform=`rotateY(${t===`forward`?-r:r}deg)`,this.#l.style.opacity=String(n.shadowAlpha)}#g(e){let t=e*(this.#p/4);this.#r.style.transform=t?`translateX(${t}px)`:``}#_(e){let t=e.left??e.right;t&&t.height&&(this.#f=t.width/t.height)}#v(){let e=this.#y();this.#p=e.width;let t=this.#r.style;t.inset=`auto`,t.left=`${e.x}px`,t.top=`${e.y}px`,t.width=`${e.width}px`,t.height=`${e.height}px`}#y(){let e=this.#e?.clientWidth??0,t=this.#e?.clientHeight??0;if(this.#f<=0||e<=0||t<=0)return{x:0,y:0,width:e,height:t};let n=(this.#m?1:2)*this.#f,r=e,i=t;return n>e/t?i=e/n:r=t*n,{x:(e-r)/2,y:(t-i)/2,width:r,height:i}}#b(){let e=this.#y();return this.#h===0?e:{x:e.x+e.width/4,y:e.y,width:e.width/2,height:e.height}}setViewTransform(e,t,n){this.#n.style.transform=`translate(${t}px, ${n}px) scale(${e})`}measure(){let e=this.#e,t=e?.clientWidth??0,n=e?.clientHeight??0,r=this.#f>0,i=r?this.#y():void 0,a=r?this.#b():void 0,o=a?e=>({x:a.x*e,y:a.y*e,width:a.width*e,height:a.height*e}):void 0;return{containerWidth:t,containerHeight:n,pageWidth:t/2,pageHeight:n,book:i,content:a,screenAt:o}}#x(e,t,n){let r=e.createElement(`canvas`);return r.className=t,r.style.cssText=`position:absolute;top:0;width:50%;height:100%;${n}`,r}#S(e,t){let n=e.getContext(`2d`);if(t===null){n?.clearRect(0,0,e.width,e.height);return}e.width=t.width,e.height=t.height,n?.drawImage(t,0,0)}}}));function ce(e,t){let n=e+1,r=t+1,i=n*r,a=new Float32Array(i*2);for(let i=0;i<r;i++)for(let r=0;r<n;r++){let o=i*n+r;a[o*2]=r/e,a[o*2+1]=i/t}return{cols:e,rows:t,uvs:a,positions:new Float32Array(i*3),normals:new Float32Array(i*3)}}function O(e){let t=e.cols+1,n=e.rows+1,r=e.positions,i=e.normals;for(let e=0;e<n;e++)for(let a=0;a<t;a++){let o=a>0?a-1:a,s=a<t-1?a+1:a,c=e>0?e-1:e,l=e<n-1?e+1:e,u=(e*t+s)*3,d=(e*t+o)*3,f=(l*t+a)*3,p=(c*t+a)*3,m=r[u]-r[d],h=r[u+1]-r[d+1],g=r[u+2]-r[d+2],_=r[f]-r[p],v=r[f+1]-r[p+1],y=r[f+2]-r[p+2],b=h*y-g*v,x=g*_-m*y,S=m*v-h*_,C=Math.hypot(b,x,S)||1;b/=C,x/=C,S/=C;let w=(e*t+a)*3;i[w]=b,i[w+1]=x,i[w+2]=S}}var k=n((()=>{}));function le(e,t,n,r,i){let a=e.cols+1,o=e.rows+1,s=e.positions,c=!!i.fill,l=Math.sin(Math.PI*r)**.85,u=c?de:ue,d=Math.PI/2-l*(Math.PI/2-u),f=Math.sin(d),p=Math.cos(d),m=1/Math.max(f,1e-6),h=c?me:fe,g=n*(h+((c?he:pe)-h)*l),_=(i.y-.5)*2,v=_>=0,y=Math.min(1,Math.abs(_)/ge),b=1-y,x=v?n+g:-g,S=Math.hypot(t,.5*n-x),C=Math.max(S*f,t/Math.PI),w=c?r**+_e:r,T=-Math.PI*w,E=Math.cos(T),D=Math.sin(T);if(l<1e-4){for(let r=0;r<o;r++){let i=r/e.rows*n;for(let n=0;n<a;n++){let o=n/e.cols*t,c=(r*a+n)*3;s[c]=o*E,s[c+1]=i,s[c+2]=-o*D}}O(e);return}for(let r=0;r<o;r++){let i=r/e.rows*n;for(let o=0;o<a;o++){let c=o/e.cols*t,l=c,u=i,d=0;if(y>1e-5){let e=v?n-i:i,t=-g,r=Math.hypot(c,e-t);if(r>1e-8){let e=r*f,i=Math.asin(Math.min(1,Math.max(0,c/r)))*m,a=1-Math.cos(i),o=r+t-e*a*f;l=e*Math.sin(i),u=v?n-o:o,d=e*a*p}}let h=l,_=u,x=d;if(b>1e-5){let e=c/C,t=C*Math.sin(e),n=C*(1-Math.cos(e));h=y*l+b*t,_=y*u+b*i,x=y*d+b*n}let S=(r*a+o)*3;s[S]=h*E+x*D,s[S+1]=_,s[S+2]=-h*D+x*E}}O(e)}var ue,de,fe,pe,me,he,ge,_e,ve=n((()=>{k(),ue=30*Math.PI/180,de=44*Math.PI/180,fe=1.35,pe=.7,me=1.85,he=1.15,ge=.42,_e=1.08}));function ye(e,t,n,r){let i=e.cols+1,a=e.rows+1,o=e.positions,s=r*Math.PI,c=Math.cos(s),l=Math.sin(s);for(let r=0;r<i;r++){let s=r/e.cols*t,u=s*c,d=s*l;for(let t=0;t<a;t++){let a=(t*i+r)*3;o[a]=u,o[a+1]=t/e.rows*n,o[a+2]=d}}O(e)}var be=n((()=>{k()}));function xe(e){if(typeof e!=`string`)return e;let t=A[e];if(t)return t;throw T.includes(e)?Error(`Zine: the '${e}' curl is not bundled. Import it and pass the model: import { ${e} } from '@zinejs/core/curls'  →  curl: ${e}`):Error(`Zine: unknown curl ${JSON.stringify(e)}.`)}var Se,Ce,A,we=n((()=>{ve(),be(),D(),Se={deform:le,anchored:!0},Ce={deform:ye,anchored:!1,flat:!0,gloss:!1},A={cone:Se,simple:Ce}}));function Te(e){let t=e.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!1,stencil:!1,preserveDrawingBuffer:!0});if(t===null)throw Error(`WebglRenderer: could not create a WebGL2 context.`);return t}var Ee=n((()=>{}));function De(e,t,n){let r=e.createProgram();if(r===null)throw Error(`WebglRenderer: could not create a program.`);let i=Oe(e,e.VERTEX_SHADER,t),a=Oe(e,e.FRAGMENT_SHADER,n);if(e.attachShader(r,i),e.attachShader(r,a),e.linkProgram(r),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(r,e.LINK_STATUS)){let t=e.getProgramInfoLog(r);throw e.deleteProgram(r),Error(`WebglRenderer: program link failed: ${t??`unknown error`}`)}return r}function Oe(e,t,n){let r=e.createShader(t);if(r===null)throw Error(`WebglRenderer: could not create a shader.`);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`WebglRenderer: shader compile failed: ${t??`unknown error`}`)}return r}var ke=n((()=>{}));function Ae(e){let t=e.createTexture();if(t===null)throw Error(`WebglRenderer: could not create a texture.`);return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),t}function je(e,t,n){e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)}var Me=n((()=>{})),Ne=r({WebglRenderer:()=>We});function j(e){return e.left===null==(e.right===null)?0:e.right===null?1:-1}var Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge=n((()=>{k(),we(),D(),Ee(),ke(),Me(),Pe=`#version 300 es
in vec2 aUnit;
uniform vec2 uViewport;
uniform vec4 uRect;
uniform vec3 uView;
out vec2 vUv;
void main() {
  vec2 px = uRect.xy + aUnit * uRect.zw;
  px = px * uView.x + uView.yz;
  vec2 clip = px / uViewport * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vUv = aUnit;
}`,Fe=`#version 300 es
precision mediump float;
in vec2 vUv;
uniform sampler2D uTex;
uniform float uGutterSide; // +1 = spine at right edge, -1 = at left edge, 0 = none
out vec4 outColor;
void main() {
  vec4 c = texture(uTex, vUv);
  if (uGutterSide != 0.0) {
    float d = uGutterSide > 0.0 ? (1.0 - vUv.x) : vUv.x;
    c.rgb *= mix(0.72, 1.0, smoothstep(0.0, 0.10, d));
  }
  outColor = c;
}`,Ie=`#version 300 es
in vec3 aPos;    // leaf-local device px: x = bent offset from spine, y 0..H, z depth
in vec3 aNormal;
in vec2 aUv;
uniform vec2 uViewport;
uniform vec3 uView;   // scale, tx, ty
uniform float uOriginX; // spine x in device px
uniform float uDir;     // +1 leaf to the right of spine, -1 to the left
uniform float uLeafW;   // leaf width in device px (perspective scale)
out vec2 vUv;
out float vFacing;
out float vU;
void main() {
  float bookX = uOriginX + uDir * aPos.x;
  float bookY = aPos.y;
  float Z = aPos.z;
  // Eye distance, in leaf widths. Keeps the perspective resolution-independent. 5.3 puts the
  // roll's deepest point ~14% larger than flat; stronger than that (a nearer eye) balloons the
  // turning sheet and reads more like a fisheye than a page lifting.
  float D = uLeafW * 5.3;
  float persp = D / max(D - Z, 1.0);
  float cx = uViewport.x * 0.5;
  float cy = uViewport.y * 0.5;
  float px = cx + (bookX - cx) * persp;
  float py = cy + (bookY - cy) * min(persp, 1.0); // Y only shrinks (top-safe)
  vec2 p = vec2(px, py) * uView.x + uView.yz;
  vec2 clip = p / uViewport * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vUv = aUv;
  vFacing = aNormal.z;
  vU = aUv.x;
}`,Le=`#version 300 es
precision mediump float;
in vec2 vUv;
in float vFacing;
in float vU;
uniform sampler2D uFront;
uniform sampler2D uBack;
uniform highp float uDir;
uniform float uGloss; // 0 disables the specular highlight (e.g. the flat 'simple' curl)
uniform float uAlpha; // leaf opacity; a lone page dissolves into the page landing beneath it
uniform float uCrease; // spine-crease strength: 1 matches a spread's gutter; ramps from 0 for a lone leaf
out vec4 outColor;
void main() {
  // The turn mesh carries its own facing in the normal; the front points at the viewer
  // (normal.z > 0) until the leaf passes vertical, for both flip directions. u->x still
  // flips with uDir so a left-hand leaf reads spine-inward.
  bool showFront = vFacing > 0.0;
  float fx = uDir > 0.0 ? vUv.x : 1.0 - vUv.x;
  vec4 c = showFront ? texture(uFront, vec2(fx, vUv.y)) : texture(uBack, vec2(1.0 - fx, vUv.y));

  // Fold shading: the sheet darkens sharply where it curves away from the viewer, so the
  // rolled edge reads as a deep crease with a soft highlight riding the ridge.
  float diff = clamp(abs(vFacing), 0.0, 1.0);
  float lit = mix(0.42, 1.0, diff);
  // Spine crease matches the gutter shadow on a spread. A lone page has no gutter, so uCrease
  // ramps it in from 0 as the leaf lifts — otherwise a still-flat leaf paints a shadow band on
  // the anchor edge before the turn even begins.
  lit *= mix(1.0, mix(0.7, 1.0, smoothstep(0.0, 0.12, vU)), uCrease);

  // Glossy specular: brightest where the surface tilts ~30 deg from facing the viewer,
  // so a thin glossy highlight rides across the sheet as it rolls.
  float spec = pow(max(cos(acos(diff) - 0.52), 0.0), 220.0) * 0.22 * uGloss;

  c.rgb = clamp(c.rgb * lit + spec, 0.0, 1.0);
  // Premultiplied alpha (blendFunc ONE, ONE_MINUS_SRC_ALPHA): scale colour as well as alpha,
  // or fading would brighten the sheet additively instead of dissolving it.
  outColor = vec4(c.rgb * uAlpha, c.a * uAlpha);
}`,Re=28,ze=36,Be=.7,Ve=.8,He=4e3,Ue=256*1024*1024,We=class{#e=null;#t=null;#n=null;#r=null;#i=null;#a=null;#o=null;#s=null;#c=null;#l=0;#u=ce(Re,ze);#d=new Map;#f=0;#p=null;#m={};#h={};#g={scale:1,tx:0,ty:0};#_=1;#v=null;#y=!1;#b=null;#x=0;#S=A[E];#C={y:.5};#w=0;#T=0;#E=0;#D=0;#O=0;#k=0;#A=!1;#j=!1;#M=null;#N=null;mount(e){this.#e=e;let t=e.ownerDocument,n=t.createElement(`canvas`);return n.style.cssText=`display:block;width:100%;height:100%;`,e.append(n),this.#t=n,n.addEventListener(`webglcontextlost`,this.#L),n.addEventListener(`webglcontextrestored`,this.#R),t.addEventListener(`visibilitychange`,this.#z),this.#n=Te(n),this.#H(),Promise.resolve()}destroy(){this.#V();let e=this.#t;e!==null&&(e.removeEventListener(`webglcontextlost`,this.#L),e.removeEventListener(`webglcontextrestored`,this.#R),e.ownerDocument.removeEventListener(`visibilitychange`,this.#z));let t=this.#n;if(t!==null){for(let e of this.#d.values())t.deleteTexture(e.tex);this.#p!==null&&t.deleteTexture(this.#p),this.#a!==null&&t.deleteVertexArray(this.#a),this.#o!==null&&t.deleteVertexArray(this.#o),this.#r!==null&&t.deleteProgram(this.#r),this.#i!==null&&t.deleteProgram(this.#i),t.getExtension(`WEBGL_lose_context`)?.loseContext()}e?.remove(),this.#d.clear(),this.#f=0,this.#p=null,this.#e=null,this.#t=null,this.#n=null,this.#v=null,this.#b=null}onFatal(e){this.#N=e}renderSpread(e,t,n){this.#v=t,this.#y=n?.fill??!1,this.#b=null,this.#P(t),this.#G()}#P(e){let t=e.left??e.right;t&&t.height&&(this.#D=t.width/t.height)}beginFlip(e,t,n,r){let i=r?.fill??!1;this.#x=0,r?.curl&&(this.#S=xe(r.curl)),r?.anchor&&(this.#C=r.anchor),this.#T=i?0:j(e),this.#E=i?0:j(t),this.#P(t),i?this.#b={underLeft:null,underRight:null,underFull:t.right??t.left,front:e.right??e.left,back:e.right??e.left,dir:n===`forward`?1:-1,fill:!0}:n===`forward`?this.#b={underLeft:e.left,underRight:t.right,underFull:null,front:e.right,back:t.left,dir:1,fill:!1}:this.#b={underLeft:t.left,underRight:e.right,underFull:null,front:e.left,back:t.right,dir:-1,fill:!1},this.#G()}setFlipProgress(e,t){this.#x=e,this.#G()}setViewTransform(e,t,n){this.#g={scale:e,tx:t,ty:n},this.#G()}measure(){let e=this.#e,t=e?.clientWidth??0,n=e?.clientHeight??0,r=this.#D>0,i=r?this.#F():void 0,a=r?this.#I():void 0,o=a?e=>{let t=this.#w/this.#_;return{x:(a.x-t)*e+t,y:a.y*e,width:a.width*e,height:a.height*e}}:void 0;return{containerWidth:t,containerHeight:n,pageWidth:t/2,pageHeight:n,book:i,content:a,screenAt:o}}#F(){let e=this.#e,t=e?.clientWidth??0,n=e?.clientHeight??0;if(this.#D<=0||t<=0||n<=0)return{x:0,y:0,width:t,height:n};let r=(this.#y?1:2)*this.#D,i=t,a=n;return r>t/n?a=t/r:i=n*r,{x:(t-i)/2,y:(n-a)/2,width:i,height:a}}#I(){let e=this.#F();return!this.#y&&this.#v!==null&&j(this.#v)!==0?{x:e.x+e.width/4,y:e.y,width:e.width/2,height:e.height}:e}#L=e=>{e.preventDefault(),this.#A=!0,this.#M===null&&(this.#M=setTimeout(()=>this.#B(),He))};#R=()=>{this.#V(),this.#A=!1,this.#H(),this.#G()};#z=()=>{this.#t?.ownerDocument.visibilityState===`visible`&&this.#G()};#B(){this.#j||(this.#j=!0,this.#N?.())}#V(){this.#M!==null&&(clearTimeout(this.#M),this.#M=null)}#H(){let e=this.#n;if(e!==null){this.#r=De(e,Pe,Fe),this.#i=De(e,Ie,Le);for(let t of[`uViewport`,`uRect`,`uView`,`uTex`,`uGutterSide`])this.#m[t]=e.getUniformLocation(this.#r,t);for(let t of[`uViewport`,`uView`,`uOriginX`,`uDir`,`uLeafW`,`uFront`,`uBack`,`uGloss`,`uAlpha`,`uCrease`])this.#h[t]=e.getUniformLocation(this.#i,t);this.#a=this.#U(e,this.#r),this.#W(e,this.#i),this.#d.clear(),this.#f=0,this.#p=this.#te(e),e.useProgram(this.#r),e.uniform1i(this.#m.uTex??null,0),e.useProgram(this.#i),e.uniform1i(this.#h.uFront??null,0),e.uniform1i(this.#h.uBack??null,1),e.clearColor(0,0,0,0),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA)}}#U(e,t){let n=e.createVertexArray(),r=e.createBuffer();if(n===null||r===null)throw Error(`WebglRenderer: could not create buffers.`);e.bindVertexArray(n),e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW);let i=e.getAttribLocation(t,`aUnit`);return e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),n}#W(e,t){let n=[];for(let e=0;e<ze;e++)for(let t=0;t<Re;t++){let r=e*29+t,i=r+1,a=r+29,o=a+1;n.push(r,a,i,i,a,o)}this.#l=n.length;let r=e.createVertexArray();this.#s=e.createBuffer(),this.#c=e.createBuffer();let i=e.createBuffer(),a=e.createBuffer();if(r===null||this.#s===null||this.#c===null||i===null||a===null)throw Error(`WebglRenderer: could not create mesh buffers.`);e.bindVertexArray(r),e.bindBuffer(e.ARRAY_BUFFER,this.#s),e.bufferData(e.ARRAY_BUFFER,this.#u.positions,e.DYNAMIC_DRAW);let o=e.getAttribLocation(t,`aPos`);e.enableVertexAttribArray(o),e.vertexAttribPointer(o,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,this.#c),e.bufferData(e.ARRAY_BUFFER,this.#u.normals,e.DYNAMIC_DRAW);let s=e.getAttribLocation(t,`aNormal`);e.enableVertexAttribArray(s),e.vertexAttribPointer(s,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,this.#u.uvs,e.STATIC_DRAW);let c=e.getAttribLocation(t,`aUv`);e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(n),e.STATIC_DRAW),e.bindVertexArray(null),this.#o=r}#G(){let e=this.#n,t=this.#t;e===null||t===null||this.#A||e.isContextLost()||(this.#ne(),e.clear(e.COLOR_BUFFER_BIT),this.#K(),this.#b===null?this.#v!==null&&this.#q():this.#J())}#K(){let e=this.#n,t=this.#t,n=t.width,r=t.height;if(this.#D>0){let e=(this.#y?1:2)*this.#D;e>n/r?(this.#O=n,this.#k=Math.round(n/e)):(this.#k=r,this.#O=Math.round(r*e))}else this.#O=n,this.#k=r;let i=Math.round((n-this.#O)/2),a=Math.round((r-this.#k)/2);e.viewport(i,a,this.#O,this.#k)}#q(){let e=this.#O,t=this.#k,n=this.#v;this.#w=this.#y?0:j(n)*(e/4),this.#X(),this.#y?this.#Z({x:0,y:0,w:e,h:t},n.right??n.left):(this.#Z({x:0,y:0,w:e/2,h:t},n.left,+!!n.right),this.#Z({x:e/2,y:0,w:e/2,h:t},n.right,n.left?-1:0))}#J(){let e=this.#n,t=this.#O,n=this.#k,r=this.#b;if(this.#w=r.fill?0:(this.#T+(this.#E-this.#T)*this.#x)*(t/4),this.#X(),r.fill?this.#Z({x:0,y:0,w:t,h:n},r.underFull):(this.#Z({x:0,y:0,w:t/2,h:n},r.underLeft,1),this.#Z({x:t/2,y:0,w:t/2,h:n},r.underRight,-1)),r.front===null&&r.back===null)return;let i=r.fill?t:t/2,a=r.fill?r.dir>0?0:t:t/2;this.#S.deform(this.#u,i,n,this.#x,{y:this.#C.y,fill:r.fill}),e.bindBuffer(e.ARRAY_BUFFER,this.#s),e.bufferSubData(e.ARRAY_BUFFER,0,this.#u.positions),e.bindBuffer(e.ARRAY_BUFFER,this.#c),e.bufferSubData(e.ARRAY_BUFFER,0,this.#u.normals),this.#Q(e.TEXTURE0,r.front),this.#Q(e.TEXTURE1,r.back),e.activeTexture(e.TEXTURE0),e.useProgram(this.#i),e.bindVertexArray(this.#o),e.uniform2f(this.#h.uViewport??null,t,n),e.uniform3f(this.#h.uView??null,this.#g.scale,this.#g.tx*this.#_+this.#w,this.#g.ty*this.#_),e.uniform1f(this.#h.uOriginX??null,a),e.uniform1f(this.#h.uDir??null,r.dir),e.uniform1f(this.#h.uLeafW??null,i),e.uniform1f(this.#h.uGloss??null,this.#S.gloss===!1?0:1),e.uniform1f(this.#h.uAlpha??null,r.fill?this.#Y():1),e.uniform1f(this.#h.uCrease??null,r.fill?Math.min(1,this.#x/.2):1),e.drawElements(e.TRIANGLES,this.#l,e.UNSIGNED_SHORT,0)}#Y(){let e=this.#S.flat?Be:Ve,t=(this.#x-e)/(1-e);return t<=0?1:t>=1?0:(1-t)**1.5}#X(){let e=this.#n;e.useProgram(this.#r),e.bindVertexArray(this.#a),e.activeTexture(e.TEXTURE0),e.uniform2f(this.#m.uViewport??null,this.#O,this.#k),e.uniform3f(this.#m.uView??null,this.#g.scale,this.#g.tx*this.#_+this.#w,this.#g.ty*this.#_)}#Z(e,t,n=0){let r=this.#n;t!==null&&(this.#Q(r.TEXTURE0,t),r.uniform4f(this.#m.uRect??null,e.x,e.y,e.w,e.h),r.uniform1f(this.#m.uGutterSide??null,n),r.drawArrays(r.TRIANGLE_STRIP,0,4))}#Q(e,t){let n=this.#n;n.activeTexture(e),n.bindTexture(n.TEXTURE_2D,t===null?this.#p:this.#$(t))}#$(e){let t=this.#n,n=this.#d.get(e);if(n!==void 0)return this.#d.delete(e),this.#d.set(e,n),n.tex;let r=Ae(t);je(t,r,e);let i=e,a=i.width*i.height*4;return this.#d.set(e,{tex:r,bytes:a}),this.#f+=a,this.#ee(),r}#ee(){let e=this.#n;for(let[t,n]of this.#d){if(this.#f<=Ue||this.#d.size<=4)break;this.#d.delete(t),this.#f-=n.bytes,e.deleteTexture(n.tex)}}#te(e){let t=Ae(e);return e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),t}#ne(){let e=this.#n,t=this.#t,n=this.#e;if(e===null||t===null||n===null)return;this.#_=typeof devicePixelRatio==`number`?devicePixelRatio:1;let r=Math.max(1,Math.round(n.clientWidth*this.#_)),i=Math.max(1,Math.round(n.clientHeight*this.#_));(t.width!==r||t.height!==i)&&(t.width=r,t.height=i,e.viewport(0,0,r,i))}}})),Ke={css:async()=>new(await(Promise.resolve().then(()=>(se(),ne)))).CssRenderer,webgl2:async()=>new(await(Promise.resolve().then(()=>(Ge(),Ne)))).WebglRenderer},qe=!0;function Je(e){return typeof e==`object`&&!!e&&!Array.isArray(e)&&typeof e.mount==`function`}function Ye(e){return e.gpu&&qe?[`webgl2`,`css`]:[`css`]}function Xe(){return{gpu:Ze()}}function Ze(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}async function Qe(e=`auto`,t=Xe()){if(Je(e))return e;let n=Array.isArray(e)?e:e===`auto`?Ye(t):[e];for(let e of n){if(e===`webgl2`&&!t.gpu)continue;let n=Ke[e];if(n)return n()}throw n.length===1&&n[0]===`webgl2`&&!t.gpu?Error(`renderer: 'webgl2' was forced but this device has no WebGL2. Use 'css' or 'auto'.`):Error(`renderer: none of [${n.join(`, `)}] could be loaded — use 'css' or 'auto'.`)}function $e(e,t){let n=typeof t.frontCover==`string`,r=typeof t.backCover==`string`,i=t.pages!=null&&Object.keys(t.pages).length>0;return!n&&!r&&!i?e:new tt(e,t)}function et(e){return fetch(e).then(t=>{if(!t.ok)throw Error(`zine: could not load image "${e}" (HTTP ${t.status}).`);return t.blob()}).then(e=>createImageBitmap(e))}var tt=class{#e;#t;#n;#r;#i=new Map;#a=new Map;open;onPageUpdate;onProgress;getText;getDownload;getOutline;constructor(e,t){this.#e=e,this.#t=typeof t.frontCover==`string`?t.frontCover:null,this.#n=typeof t.backCover==`string`?t.backCover:null,this.#r=t.pages??{},typeof e.open==`function`?this.open=async()=>{await e.open(),this.#o()}:this.#o(),typeof e.onPageUpdate==`function`&&(this.onPageUpdate=t=>{e.onPageUpdate(e=>t(e+(this.#t===null?0:1)))}),typeof e.onProgress==`function`&&(this.onProgress=t=>e.onProgress(t)),typeof e.getText==`function`&&(this.getText=async t=>{let n=this.#t===null?0:1;if(this.#t!==null&&t===0||this.#n!==null&&t===this.pageCount-1)return``;let r=t-n;return this.#i.has(r)?``:e.getText(r)}),typeof e.getDownload==`function`&&(this.getDownload=()=>e.getDownload()),typeof e.getOutline==`function`&&(this.getOutline=async()=>{let t=await e.getOutline(),n=this.#t===null?0:1;if(n===0)return t;let r=e=>e.map(e=>({...e,page:e.page===null?null:e.page+n,children:r(e.children)}));return r(t)})}get pageCount(){return this.#e.pageCount+(this.#t===null?0:1)+(this.#n===null?0:1)}get(e,t){let n=this.#t===null?0:1;if(this.#t!==null&&e===0)return this.#s(this.#t);if(this.#n!==null&&e===this.pageCount-1)return this.#s(this.#n);let r=e-n,i=this.#i.get(r);return i===void 0?this.#e.get(r,t):this.#s(i)}prefetch(e){let t=this.#t===null?0:1,n=[];for(let r of e)if(this.#t!==null&&r===0)this.#s(this.#t).catch(()=>{});else if(this.#n!==null&&r===this.pageCount-1)this.#s(this.#n).catch(()=>{});else{let e=r-t,i=this.#i.get(e);i===void 0?n.push(e):this.#s(i).catch(()=>{})}this.#e.prefetch(n)}destroy(){this.#e.destroy();for(let e of this.#a.values())e.then(e=>e.close()).catch(()=>{});this.#a.clear()}#o(){let e=this.#e.pageCount;this.#i.clear();for(let[t,n]of Object.entries(this.#r)){let r=Number(t),i=r<0?e+r:r;Number.isInteger(i)&&i>=0&&i<e&&this.#i.set(i,n)}}#s(e){let t=this.#a.get(e);return t===void 0&&(t=et(e).catch(t=>{throw this.#a.delete(e),t}),this.#a.set(e,t)),t}},nt=r({CSS:()=>N,mountLoading:()=>it});function rt(e){if(e.getElementById(M))return;let t=e.createElement(`style`);t.id=M,t.textContent=N,(e.head??e.documentElement)?.appendChild(t)}function it(e){let t=e.ownerDocument;rt(t);let n=t.createElement(`div`);n.className=`zine-loading`,n.setAttribute(`role`,`status`),n.setAttribute(`aria-live`,`polite`);let r=t.createElement(`div`);r.className=`zine-loading-spinner`,r.setAttribute(`aria-hidden`,`true`);let i=t.createElement(`div`);i.className=`zine-loading-text`,i.textContent=`Opening document…`;let a=t.createElement(`div`);a.className=`zine-loading-bar`,a.style.display=`none`;let o=t.createElement(`div`);o.className=`zine-loading-fill`,a.appendChild(o),n.append(r,i,a),e.appendChild(n);let s=null,c=typeof globalThis.getComputedStyle==`function`?globalThis.getComputedStyle(e):null;(!c||c.position===`static`||c.position===``)&&(s=e.style.position,e.style.position=`relative`);let l=!1,u=setTimeout(()=>{l=!0,n.classList.add(`zine-loading-shown`)},at);return{update(e){if(e.total>0){let t=Math.min(100,Math.round(e.loaded/e.total*100));i.textContent=`Downloading document… ${t}%`,a.style.display=``,o.style.width=`${t}%`}else i.textContent=`Downloading document… ${ot(e.loaded)}`,a.style.display=`none`},preparing(){i.textContent=`Preparing pages…`,a.style.display=`none`},destroy(){l||clearTimeout(u),n.remove(),s!==null&&(e.style.position=s)}}}var M,at,N,ot,st=n((()=>{M=`zine-loading-style`,at=150,N=`
.zine-loading {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  font: 500 14px/1.4 system-ui, sans-serif;
  color: var(--zine-loading-fg, light-dark(#3f3f46, #d4d4d8));
  background: var(--zine-loading-bg, light-dark(#fafafa, #0c0c11));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 150ms ease;
}
.zine-loading-shown { opacity: 1; }
.zine-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--zine-loading-track, light-dark(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.14)));
  border-top-color: var(--zine-loading-accent, light-dark(#0284c7, #7dd3fc));
  border-radius: 50%;
  animation: zine-loading-spin 0.8s linear infinite;
}
@keyframes zine-loading-spin { to { transform: rotate(360deg); } }
.zine-loading-text { font-variant-numeric: tabular-nums; }
.zine-loading-bar {
  width: min(240px, 70%);
  height: 6px;
  background: var(--zine-loading-track, light-dark(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.14)));
  border-radius: 3px;
  overflow: hidden;
}
.zine-loading-fill {
  width: 0;
  height: 100%;
  background: var(--zine-loading-accent, light-dark(#0284c7, #7dd3fc));
  border-radius: 3px;
  transition: width 150ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .zine-loading { transition: none; }
  .zine-loading-spinner { animation-duration: 2s; }
  .zine-loading-fill { transition: none; }
}
`,ot=e=>`${(e/1024/1024).toFixed(1)} MB`}));function P(e,t){let n=e.createElementNS(`http://www.w3.org/2000/svg`,`svg`);return n.setAttribute(`viewBox`,`0 0 24 24`),n.setAttribute(`fill`,`none`),n.setAttribute(`stroke`,`currentColor`),n.setAttribute(`stroke-width`,`1.75`),n.setAttribute(`stroke-linecap`,`round`),n.setAttribute(`stroke-linejoin`,`round`),n.setAttribute(`aria-hidden`,`true`),n.setAttribute(`focusable`,`false`),n.innerHTML=t,n}var F,I=n((()=>{F={prev:`<path d="m15 18-6-6 6-6"/>`,next:`<path d="m9 18 6-6-6-6"/>`,first:`<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>`,last:`<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>`,zoomIn:`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>`,zoomOut:`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/>`,search:`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,share:`<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>`,menu:`<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>`,fullscreen:`<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>`,exitFullscreen:`<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>`,thumbnails:`<path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/>`,outline:`<path d="M21 12h-8"/><path d="M21 6h-8"/><path d="M21 18h-8"/><path d="M3 6v4c0 1.1.9 2 2 2h3"/><path d="M3 10v6c0 1.1.9 2 2 2h3"/>`,twoPages:`<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>`,onePage:`<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/>`,print:`<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14" rx="1"/>`,download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>`,close:`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`}}));function L(e){return R.set(e.id,e),e}function ct(e){return R.get(e)}function lt(e){if(typeof e==`string`){let t=R.get(e);if(!t)throw Error(`controls: unknown control '${e}'. Register it with defineControl() or pass a definition object.`);return t}let t=R.get(e.id);return t?{...t,...e}:e}var R,z,B=n((()=>{R=new Map,z=[`prev`,`pageInput`,`next`,`|`,`zoomOut`,`zoomIn`,`search`,`share`,`menu`,`fullscreen`]})),V,ut,dt=n((()=>{V=encodeURIComponent,ut=[{id:`facebook`,label:`Facebook`,icon:`<path fill="currentColor" stroke="none" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"/>`,href:e=>`https://www.facebook.com/sharer/sharer.php?u=${V(e)}`},{id:`x`,label:`X (Twitter)`,icon:`<path fill="currentColor" stroke="none" d="M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.82-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.32l4.36 5.77L17.53 3Zm-1.07 16.17h1.69L7.62 4.73H5.8l10.66 14.44Z"/>`,href:(e,t)=>`https://twitter.com/intent/tweet?url=${V(e)}&text=${V(t)}`},{id:`linkedin`,label:`LinkedIn`,icon:`<path fill="currentColor" stroke="none" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>`,href:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${V(e)}`},{id:`whatsapp`,label:`WhatsApp`,icon:`<path fill="currentColor" stroke="none" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm5.8 14.06c-.25.7-1.44 1.33-1.99 1.38-.53.05-1.02.24-3.44-.72-2.9-1.14-4.73-4.1-4.87-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.26-.28.57-.35.76-.35h.55c.17 0 .42-.07.65.5.24.58.8 2 .87 2.14.07.14.12.31.02.5-.09.19-.14.3-.28.47l-.42.48c-.14.14-.28.29-.12.57.16.28.7 1.16 1.51 1.88 1.04.93 1.91 1.21 2.19 1.35.28.15.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.25.1 1.63.77 1.9.91.29.14.48.21.55.33.07.11.07.67-.18 1.37Z"/>`,href:(e,t)=>`https://api.whatsapp.com/send?text=${V(`${t} ${e}`)}`},{id:`pinterest`,label:`Pinterest`,icon:`<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.78-.17-1.98.03-2.83.19-.78 1.2-4.98 1.2-4.98s-.3-.61-.3-1.52c0-1.42.82-2.48 1.85-2.48.87 0 1.3.66 1.3 1.44 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.83 0 3.23-1.93 3.23-4.7 0-2.46-1.77-4.18-4.29-4.18-2.92 0-4.64 2.19-4.64 4.46 0 .88.34 1.83.76 2.35a.3.3 0 0 1 .07.29l-.28 1.16c-.05.19-.15.23-.34.14-1.28-.6-2.08-2.47-2.08-3.98 0-3.24 2.35-6.21 6.79-6.21 3.56 0 6.33 2.54 6.33 5.93 0 3.54-2.23 6.39-5.32 6.39-1.04 0-2.02-.54-2.35-1.18l-.64 2.44c-.23.89-.86 2.01-1.28 2.69A10 10 0 1 0 12 2Z"/>`,href:(e,t)=>`https://pinterest.com/pin/create/button/?url=${V(e)}&description=${V(t)}`},{id:`email`,label:`Email`,icon:`<path fill="currentColor" stroke="none" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-7.47 4.67a1 1 0 0 1-1.06 0L4 8.24V6.4l8 5 8-5v1.84Z"/>`,href:(e,t)=>`mailto:?subject=${V(t)}&body=${V(e)}`}]}));function ft(e){let t=new Uint8Array([1]);for(let n=0;n<e;n++){let e=new Uint8Array(t.length+1);for(let r=0;r<t.length;r++)e[r]=e[r]^t[r],e[r+1]=e[r+1]^q(t[r],G[n]);t=e}return t}function pt(e,t){let n=ft(t),r=new Uint8Array(t);for(let i of e){let e=i^r[0];if(r.copyWithin(0,1),r[t-1]=0,e!==0)for(let i=0;i<t;i++)r[i]=r[i]^q(n[i+1],e)}return r}function mt(e){let t=0|e,n=t;for(let e=0;e<10;e++)n=n<<1^(n>>>9)*1335;return(t<<10|n)^21522}function H(e,t,n){for(let r=-1;r<=7;r++)for(let i=-1;i<=7;i++){let a=t+i,o=n+r;if(a<0||o<0||a>=e.size||o>=e.size)continue;let s=Math.max(Math.abs(i-3),Math.abs(r-3));J(e,a,o,s!==2&&s<=3)}}function ht(e){let t=new TextEncoder().encode(e),n=U.findIndex(e=>t.length+2<=e)+1;if(n===0)throw Error(`qr: ${t.length} bytes is too long for this encoder (max 214).`);let r=U[n-1],i=[],a=(e,t)=>{for(let n=t-1;n>=0;n--)i.push(e>>>n&1)};a(4,4),a(t.length,n<10?8:16);for(let e of t)a(e,8);for(a(0,Math.min(4,r*8-i.length));i.length%8;)i.push(0);let o=new Uint8Array(r);for(let e=0;e<i.length;e+=8){let t=0;for(let n=0;n<8;n++)t=t<<1|i[e+n];o[e/8]=t}for(let e=i.length/8,t=0;e<r;e++,t++)o[e]=t%2==0?236:17;let s=vt[n-1],c=_t[n-1],l=Math.floor(r/s),u=r%s,d=[],f=[];for(let e=0,t=0;e<s;e++){let n=l+ +(e>=s-u),r=o.subarray(t,t+n);t+=n,d.push(r),f.push(pt(r,c))}let p=[];for(let e=0;e<l+1;e++)for(let t of d)e<t.length&&p.push(t[e]);for(let e=0;e<c;e++)for(let t of f)p.push(t[e]);let m=n*4+17,h={size:m,modules:new Uint8Array(m*m),reserved:new Uint8Array(m*m)};H(h,0,0),H(h,m-7,0),H(h,0,m-7);for(let e=8;e<m-8;e++){let t=e%2==0;J(h,e,6,t),J(h,6,e,t)}for(let e of W[n-1])for(let t of W[n-1])if(!(e<9&&t<9||e<9&&t>m-10||e>m-10&&t<9))for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++)J(h,e+r,t+n,Math.max(Math.abs(r),Math.abs(n))!==1);J(h,8,m-8,!0);for(let e=0;e<9;e++)e!==6&&(J(h,e,8,!1),J(h,8,e,!1));for(let e=0;e<8;e++)J(h,m-1-e,8,!1),J(h,8,m-1-e,!1);J(h,8,m-8,!0);let g=0,_=p.length*8;for(let e=m-1;e>=1;e-=2){e===6&&(e=5);for(let t=0;t<m;t++)for(let n=0;n<2;n++){let r=e-n,i=e+1&2?t:m-1-t;if(h.reserved[i*m+r])continue;let a=!1;g<_&&(a=(p[g>>>3]>>>7-(g&7)&1)==1,g++),(r+i)%2==0&&(a=!a),J(h,r,i,a,!1)}}let v=mt(0);for(let e=0;e<15;e++){let t=(v>>>e&1)==1,n=e<6?e:e<8?e+1:8,r=e<8?8:e<9?7:14-e;J(h,n,8,t),J(h,8,r,t),e<8?J(h,m-1-e,8,t):J(h,8,m-15+e,t)}return J(h,8,m-8,!0),{size:m,modules:h.modules}}function gt(e,t){let{size:n,modules:r}=ht(e),i=``;for(let e=0;e<n;e++)for(let t=0;t<n;t++)r[e*n+t]&&(i+=`M${t} ${e}h1v1h-1z`);let a=n+4;return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 ${a} ${a}" shape-rendering="crispEdges"><rect width="${a}" height="${a}" fill="#fff"/><g transform="translate(2 2)" fill="#000">${`<path d="${i}"/>`}</g></svg>`}var U,_t,vt,W,G,K,q,J,yt=n((()=>{U=[16,28,44,64,86,108,124,154,182,216],_t=[10,16,26,18,24,16,18,22,22,26],vt=[1,1,1,2,2,4,4,4,5,5],W=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50]],G=new Uint8Array(512),K=new Uint8Array(256);for(let e=0,t=1;e<255;e++)G[e]=t,K[t]=e,t<<=1,t&256&&(t^=285);for(let e=255;e<512;e++)G[e]=G[e-255];q=(e,t)=>e===0||t===0?0:G[(K[e]+K[t])%255],J=(e,t,n,r,i=!0)=>{e.modules[n*e.size+t]=+!!r,i&&(e.reserved[n*e.size+t]=1)}}));function bt(e){if(e.getElementById(xt))return;let t=e.createElement(`style`);t.id=xt,t.textContent=St,(e.head??e.documentElement)?.appendChild(t)}function Y(e,t){t!==`auto`&&(e.style.colorScheme=t)}var xt,St,Ct=n((()=>{xt=`zine-controls-style`,St=`
/* Docked mode wraps the book so the bar can sit beside it without shrinking the container,
   whose measured box the renderer and hit-testing both depend on.
   The wrapper deliberately does not stretch or grow its children: the container keeps whatever
   width, aspect-ratio and auto-margins the consumer's own CSS gave it. */
.zine-controls-wrap { display: flex; }
/* Stacked: children keep their own width (so a percentage or auto-margin still resolves against
   the wrapper) and take only the height they ask for. */
.zine-controls-wrap-top,
.zine-controls-wrap-bottom { flex-direction: column; align-items: stretch; }
/* Side by side: the bar is only as wide as its buttons, and both are vertically centred. */
.zine-controls-wrap-left,
.zine-controls-wrap-right { flex-direction: row; align-items: center; }
/* min-height:0 matters as much as min-width here. A flex item's automatic minimum size floors it
   at its content, so once the canvas has grown for a taller layout the book cannot shrink back —
   its aspect-ratio is restored but ignored, leaving the extra height behind. */
.zine-controls-wrap > * { flex: 0 0 auto; min-width: 0; min-height: 0; }

.zine-controls {
  position: relative;
  display: flex;
  gap: 4px;
  padding: 5px;
  z-index: 2;
  box-sizing: border-box;
  font: 500 12px/1.2 system-ui, sans-serif;
  color: var(--zine-controls-fg, light-dark(#18181b, #f4f4f5));
  touch-action: auto;
  -webkit-user-select: none;
  user-select: none;
}
.zine-controls-docked { flex: 0 0 auto; justify-content: center; align-items: center; }
.zine-controls-floating {
  position: absolute;
  /* Transparent to the book except on the buttons themselves, so gaps stay draggable. */
  pointer-events: none;
}
.zine-controls-bar {
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 3px;
  border-radius: 8px;
  pointer-events: auto;
  background: var(--zine-controls-bg, light-dark(rgba(255, 255, 255, 0.94), rgba(24, 24, 27, 0.82)));
  backdrop-filter: blur(8px);
}
/* Floating: lifted off the page it covers. Docked: flat, with an outline so it reads as a
   control strip rather than a shadow hanging in empty space. */
.zine-controls-floating .zine-controls-bar { box-shadow: 0 2px 12px rgba(0, 0, 0, 0.28); }
.zine-controls-docked .zine-controls-bar {
  border: 1px solid var(--zine-controls-hover, light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.14)));
}
.zine-controls-floating.zine-controls-bottom { inset: auto 0 0 0; justify-content: center; }
.zine-controls-floating.zine-controls-top    { inset: 0 0 auto 0; justify-content: center; }
.zine-controls-floating.zine-controls-left   { inset: 0 auto 0 0; align-items: center; }
.zine-controls-floating.zine-controls-right  { inset: 0 0 0 auto; align-items: center; }
/* A bar on a vertical edge stacks its buttons, docked or floating. */
.zine-controls-left .zine-controls-bar,
.zine-controls-right .zine-controls-bar { flex-direction: column; }

.zine-controls-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}
.zine-controls-btn svg { width: 15px; height: 15px; }
.zine-controls-btn:hover:not(:disabled) { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14))); }
.zine-controls-btn:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: 1px;
}
.zine-controls-btn:disabled { opacity: 0.38; cursor: default; }
/* A button mid-slow-action (fetching a file to save or print): a spinner, kept full-strength
   rather than dimmed so it reads as "working", not "disabled". */
.zine-controls-btn.zine-controls-busy { opacity: 1; cursor: default; position: relative; }
.zine-controls-btn.zine-controls-busy::after {
  content: '';
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  opacity: 0.7;
  animation: zine-controls-spin 0.7s linear infinite;
}
/* Icon-only bar button: hide the glyph and center the spinner over its place. */
.zine-controls-btn.zine-controls-busy > svg { visibility: hidden; }
.zine-controls-btn.zine-controls-busy::after {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -7px 0 0 -7px;
}
/* Menu item (glyph + label): let the glyph and label stand, and trail the spinner after them. */
.zine-controls-menu .zine-controls-btn.zine-controls-busy > svg { visibility: visible; }
.zine-controls-menu .zine-controls-btn.zine-controls-busy::after { position: static; }
@keyframes zine-controls-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .zine-controls-btn.zine-controls-busy::after { animation-duration: 1.6s; }
}
/* A custom widget cannot always be disabled itself, so it is marked instead and reads the same. */
.zine-controls-off { opacity: 0.38; }
.zine-controls-off[aria-disabled='true'] { pointer-events: none; }
.zine-controls-btn[aria-pressed="true"],
.zine-controls-btn[aria-expanded="true"] { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14))); }

.zine-controls-sep {
  width: 1px;
  align-self: stretch;
  margin: 3px 3px;
  background: currentColor;
  opacity: 0.22;
}
.zine-controls-left .zine-controls-sep,
.zine-controls-right .zine-controls-sep { width: auto; height: 1px; margin: 3px 3px; }

.zine-controls-page {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0 3px;
  pointer-events: auto;
  white-space: nowrap;
}
.zine-controls-page input {
  width: 2.2em;
  padding: 2px 3px;
  border: 1px solid var(--zine-controls-hover, light-dark(rgba(0,0,0,0.14), rgba(255,255,255,0.2)));
  border-radius: 4px;
  background: light-dark(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25));
  color: inherit;
  font: inherit;
  text-align: center;
  -moz-appearance: textfield;
}
.zine-controls-page input::-webkit-outer-spin-button,
.zine-controls-page input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.zine-controls-page input:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: 0;
}

.zine-controls-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 152px;
  padding: 4px;
  border-radius: 8px;
  pointer-events: auto;
  background: var(--zine-controls-bg, light-dark(rgba(255, 255, 255, 0.94), rgba(24, 24, 27, 0.94)));
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(8px);
}
.zine-controls-menu .zine-controls-btn {
  width: 100%;
  height: auto;
  gap: 8px;
  padding: 6px 8px;
  justify-content: flex-start;
}

/* Search shares the rail: a query field pinned at the top over a scrolling list of hits. */
.zine-search { gap: 0; overflow: hidden; }
.zine-search-input {
  flex: 0 0 auto;
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--zine-controls-hover, light-dark(rgba(0,0,0,0.14), rgba(255,255,255,0.2)));
  border-radius: 6px;
  background: light-dark(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25));
  color: inherit;
  font: inherit;
  box-sizing: border-box;
}
/* Replace the browser's default (white) focus ring with the accent ring the other controls use. */
.zine-search-input:focus-visible {
  outline: none;
  border-color: var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  box-shadow: 0 0 0 1px var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
}
.zine-search-hits {
  flex: 1 1 auto;
  overflow-y: auto;
  /* Chain overscroll up to the page: once the list is at its end (or too short to scroll at all),
     a further wheel scrolls the page behind, the same as scrolling over the book itself does. */
  overscroll-behavior: auto;
  margin-top: 5px;
  scrollbar-width: thin;
}
.zine-search-hit {
  display: block;
  width: 100%;
  padding: 6px 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}
.zine-search-hit:hover { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14))); }
.zine-search-hit:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: -2px;
}
.zine-search-page { display: block; font-size: 0.9em; opacity: 0.85; }
.zine-search-hit small {
  display: block;
  margin-top: 2px;
  opacity: 0.62;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

/* Page-turn arrows flanking the book. Like the docked toolbar and the side panels, they sit
   outside the container so they never shrink the book or intercept its gestures. */
.zine-arrows-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}
.zine-arrows-wrap > *:not(.zine-arrow) { flex: 1 1 auto; min-width: 0; min-height: 0; }
.zine-arrow {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: none;
  /* Light on a light page, dark on a dark one. The shadow below carries the contrast. */
  color: var(--zine-controls-fg, light-dark(#f4f4f5, #18181b));
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  /* No grey tap box on touch; the :active tint below is the press feedback instead. */
  -webkit-tap-highlight-color: transparent;
}
.zine-arrow svg {
  width: 36px;
  height: 36px;
  stroke-width: 2.25;
  /* No backing disc, so a subtle offset shadow keeps the chevron from disappearing into a
     matching background. It contrasts the fill: a light chevron (light mode) casts a soft dark
     shadow, a dark chevron (dark mode) a soft light one, offset rather than a glowing halo. */
  filter: drop-shadow(0 1px 2px light-dark(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.35)));
}
/* Feedback intensifies the chevron toward its extreme (white in light mode, black in dark)
   rather than tinting it, so no new colour is introduced. Not tied to --zine-controls-fg: that
   sets the resting fill, and hover has to differ from it to read as feedback. :active clears on
   release, so tap and click feel the same; :hover is behind (hover: hover) so it never sticks on
   touch. */
.zine-arrow:active:not(:disabled) { color: light-dark(#ffffff, #000000); }
@media (hover: hover) {
  .zine-arrow:hover:not(:disabled) { color: light-dark(#ffffff, #000000); }
}
.zine-arrow:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: 2px;
  border-radius: 8px;
}
/* Nothing to turn to: invisible, but still occupying its slot so the book does not slide across
   as the reader reaches a cover. */
.zine-arrow-hidden { visibility: hidden; }
/* Device-scoped arrows (controls.arrows: 'desktop' | 'mobile'). The split follows the same 640px
   breakpoint as the flank/overlay layouts below, so the arrows appear and disappear live as the
   window crosses it. */
@media (max-width: 640px) {
  .zine-arrows-desktop > .zine-arrow { display: none; }
}
@media (min-width: 641px) {
  .zine-arrows-mobile > .zine-arrow { display: none; }
}
/* Too narrow to flank without squeezing the pages, so overlay the arrows on the book's edges
   instead. The wrap sits outside the container, so painting them over it leaves the container's
   measured box (which sizes the book and maps taps) untouched. */
@media (max-width: 640px) {
  .zine-arrows-wrap { position: relative; }
  .zine-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    /* Sit back over the page so the reader can look at the book. */
    opacity: 0.7;
  }
  .zine-arrow:first-child { left: -2px; }
  .zine-arrow:last-child { right: -2px; }
}
@media (prefers-reduced-motion: no-preference) {
  .zine-arrow { transition: background 120ms ease; }
}

/* Side panels (thumbnails, outline, search). The rail wraps the book and its docked toolbar so it
   sits beside them as a flex sibling. On a wide screen the book shrinks to make room (below); on a
   narrow one the rail becomes a drawer over the book.
   align-items:flex-start, not stretch: the book sizes its height from its width through its own
   aspect-ratio, and that height is 'auto' from flex's point of view, so a stretch would override it
   and blow the book (and the rail matched to it) up to the flex line's cross size. Left as auto, the
   book keeps its aspect height and the holder alone stretches down to meet it (below). */
.zine-panel-wrap { display: flex; align-items: flex-start; gap: 8px; position: relative; }

/* The book-side slot (the bare container, or the docked-toolbar wrapper around it) yields space to
   the fixed-width rail instead of overflowing: flex-shrink lets it fall below its own width, and
   min-width:0 removes the automatic content floor that would otherwise stop it. The book only
   actually shrinks if its width is elastic (a %, max-width, or the demo's min(...) with a % term);
   a hard-coded pixel width has nothing for the % to resolve smaller against. */
.zine-panel-wrap > *:not(.zine-panel-holder):not(.zine-panel-scrim) {
  flex: 0 1 auto;
  min-width: 0;
}
/* With a docked toolbar the book lives inside .zine-controls-wrap, whose children are pinned
   flex:0 0 auto (so the bar keeps its size). Inside a panel wrap the book child — everything but
   the bar itself — must instead be allowed to shrink, so left/right docking flanks like the rest.
   Top/bottom docking already shrinks through the container's own % width. */
.zine-panel-wrap .zine-controls-wrap > *:not(.zine-controls) {
  flex: 0 1 auto;
  min-width: 0;
  min-height: 0;
}
@media (prefers-reduced-motion: no-preference) {
  .zine-panel-wrap > *:not(.zine-panel-holder):not(.zine-panel-scrim) {
    transition: flex-basis 160ms ease, width 160ms ease;
  }
}

/* The holder stretches to the book's height; the rail is absolutely positioned inside it so a
   long list scrolls rather than growing the row and running past the bottom of the book. */
.zine-panel-holder {
  position: relative;
  flex: 0 0 auto;
  align-self: stretch;
  min-height: 0;
}
/* The scrim dims the book behind the narrow-screen drawer. It exists on every screen but only
   shows under the breakpoint below, so on a wide screen it takes no flex slot and never intercepts
   a click. */
.zine-panel-scrim { display: none; }
.zine-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  /* Chain overscroll up to the page: once the list is at its end (or too short to scroll at all),
     a further wheel scrolls the page behind, the same as scrolling over the book itself does. */
  overscroll-behavior: auto;
  /* Reserve the scrollbar's lane whether or not it is showing, so rows never sit under the bar
     and the close button (inset past this lane below) has a fixed edge to clear. */
  scrollbar-gutter: stable;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 8px;
  background: var(--zine-controls-bg, light-dark(rgba(255, 255, 255, 0.94), rgba(24, 24, 27, 0.82)));
  color: var(--zine-controls-fg, light-dark(#18181b, #f4f4f5));
  font: 500 11px/1.2 system-ui, sans-serif;
  scrollbar-width: thin;
  touch-action: auto;
  -webkit-user-select: none;
  user-select: none;
}
/* The rail sits flush against the book's reading-start edge (left, or right in RTL), so its outer
   corners there would round away from that edge and leave a gap. Square them; keep the interior
   corners, which face the page, rounded. */
.zine-panel { border-radius: 0 8px 8px 0; }
.zine-panel-wrap-rtl .zine-panel { border-radius: 8px 0 0 8px; }
/* Overlay fallback, used when the container has no parent to wrap. */
.zine-panel-overlay { position: absolute; inset: 0 auto 0 0; z-index: 3; }
.zine-panel-active { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.18))); }
.zine-panel-note { padding: 8px; opacity: 0.66; line-height: 1.4; }
/* Discoverable dismiss, floated in the rail's trailing-top (interior) corner, away from the book.
   It sits in the holder above the scrolling list so the list scrolls under it. A translucent
   backdrop keeps the glyph legible over a thumbnail or a line of text. */
.zine-panel-close {
  position: absolute;
  top: 6px;
  /* Inset past the reserved scrollbar gutter so the button never overlaps the bar. */
  right: 12px;
  z-index: 1;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  /* Opaque so a light thumbnail underneath never shows through and dims the glyph. */
  background: light-dark(#f4f4f5, #27272a);
  color: inherit;
  cursor: pointer;
}
.zine-panel-close svg { width: 15px; height: 15px; }
/* Opaque hover, not the translucent hover token: a see-through backdrop over a light thumbnail
   would wash the glyph out. Solid neutrals keep the X readable in both themes over anything. */
.zine-panel-close:hover { background: light-dark(#e4e4e7, #3f3f46); }
.zine-panel-close:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: -2px;
}
.zine-panel-wrap-rtl .zine-panel-close { right: auto; left: 12px; }
/* End the search field just before the close button rather than running under it, so the two sit
   side by side and the field's border reads cleanly. The button's inner edge is ~30px from the
   panel's content edge (24px wide, its right edge 6px in once the reserved scrollbar gutter is
   accounted for), so 30px leaves them flush with a hair of breathing room. width:auto lets the
   column's stretch fill the rest, so the margin shortens the field instead of overflowing 100%. */
.zine-search .zine-search-input { width: auto; align-self: stretch; margin-right: 30px; }
.zine-panel-wrap-rtl .zine-search .zine-search-input { margin-right: 0; margin-left: 30px; }

/* Overlay panels (outline, search) on a wide screen: float over the book's start edge instead of
   flanking it, so the book never resizes. The wrap drops to a block, laying the book out exactly as
   it was before the panel opened; the holder sits absolute over it at full book height, with a
   shadow so it reads as lifted off the page. thumbnails is not overlaid — it stays a flex flank and
   shrinks the book only when the two will not otherwise both fit. */
@media (min-width: 641px) {
  .zine-panel-wrap-overlay { display: block; }
  .zine-panel-wrap-overlay .zine-panel-holder {
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 4;
    box-shadow: 0 0 24px light-dark(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.55));
  }
  .zine-panel-wrap-overlay.zine-panel-wrap-rtl .zine-panel-holder { inset: 0 0 0 auto; }
  /* Opaque over the page it floats on, unlike a flanking rail that sits against empty margin. */
  .zine-panel-wrap-overlay .zine-panel {
    background: var(--zine-controls-bg, light-dark(#ffffff, #18181b));
  }
  /* A click-away layer over the book, so pressing the page behind the floating rail closes it the
     way tapping the scrim does on a narrow screen. Transparent here — the wide-screen rail only
     covers an edge, so there is no need to dim the page the reader is still looking at. It sits
     under the holder (z-index) so the rail's own rows still take their clicks. */
  .zine-panel-wrap-overlay .zine-panel-scrim {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 3;
    background: transparent;
  }
}
@media (min-width: 641px) and (prefers-reduced-motion: no-preference) {
  .zine-panel-wrap-overlay .zine-panel-holder { animation: zine-drawer-in 180ms ease; }
  .zine-panel-wrap-overlay.zine-panel-wrap-rtl .zine-panel-holder { animation-name: zine-drawer-in-rtl; }
}

/* Narrow screen: no room to flank, so the rail becomes a drawer over the book and the scrim dims
   the page behind it. The wrap is position:relative, so the absolute holder and scrim below are
   measured against it — i.e. against the book's own box. */
@media (max-width: 640px) {
  /* No flanking here — the rail and scrim both overlay absolutely — so drop the flex row entirely.
     As a plain block wrap the book keeps the exact box it had before a panel opened (its own width,
     margin and aspect-ratio height); a flex row would instead re-resolve the book's width and, with
     it, its aspect-derived height, enlarging the canvas and pushing the page down. */
  .zine-panel-wrap {
    display: block;
  }
  .zine-panel-holder {
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 4;
    /* Cap the drawer so it never eats the whole book; its inline width still applies under this. */
    max-width: 80%;
    box-shadow: 0 0 24px light-dark(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
  }
  /* RTL reads from the right, so the drawer enters from there. */
  .zine-panel-wrap-rtl .zine-panel-holder { inset: 0 0 0 auto; }
  /* Opaque over the page, unlike the wide-screen rail which can sit against empty margin. */
  .zine-panel {
    background: var(--zine-controls-bg, light-dark(#ffffff, #18181b));
  }
  .zine-panel-scrim {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 3;
    background: rgba(0, 0, 0, 0.4);
  }
}
@media (max-width: 640px) and (prefers-reduced-motion: no-preference) {
  .zine-panel-holder { animation: zine-drawer-in 180ms ease; }
  .zine-panel-wrap-rtl .zine-panel-holder { animation-name: zine-drawer-in-rtl; }
  .zine-panel-scrim { animation: zine-scrim-in 180ms ease; }
}
@keyframes zine-drawer-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes zine-drawer-in-rtl { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes zine-scrim-in { from { opacity: 0; } to { opacity: 1; } }

.zine-thumbs { align-items: center; }

.zine-thumbs-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  width: 100%;
  padding: 4px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  box-sizing: border-box;
}
.zine-thumbs-row:hover { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14))); }
.zine-thumbs-row:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: -2px;
}
.zine-thumbs-row.zine-panel-active .zine-thumbs-cell {
  outline: 1px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
}

/* Outline: a single column of headings, indented by depth. */
/* No gap: a hairline between rows is the separator instead, so a title that wraps to two lines
   still reads as one entry rather than blending into its neighbours. */
.zine-outline { gap: 0; }
.zine-outline-row {
  display: block;
  width: 100%;
  padding: 6px 8px;
  border: 0;
  border-bottom: 1px solid var(--zine-controls-divider, light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.1)));
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  line-height: 1.35;
  cursor: pointer;
  box-sizing: border-box;
  overflow-wrap: anywhere;
}
.zine-outline-row:last-child { border-bottom: 0; }
.zine-outline-row:hover:not(:disabled) {
  background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14)));
}
.zine-outline-row:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: -2px;
}
/* A heading whose destination could not be resolved: shown, but nothing to click through to. */
.zine-outline-row:disabled { opacity: 0.5; cursor: default; }

.zine-thumbs-cell {
  flex: 1 1 0;
  min-width: 0;
  min-height: 24px;
  display: flex;
  background: light-dark(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.3));
  border-radius: 2px;
  overflow: hidden;
}
/* A lone page in a book that pairs elsewhere (a cover, a back page) keeps one page's width and
   centres, instead of stretching across both columns. */
.zine-thumbs-row-lone .zine-thumbs-cell { flex: 0 0 calc(50% - 1px); }
.zine-thumbs-img { display: block; width: 100%; height: auto; }
.zine-thumbs-caption { flex: 1 0 100%; text-align: center; opacity: 0.7; }

/* Share dialog. Centred over the page rather than in the side rail: a QR and six destinations
   need more room than the rail gives, and sharing is a brief interruption, not a browsing mode. */
.zine-share-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.55);
  font: 500 13px/1.4 system-ui, sans-serif;
  color: var(--zine-controls-fg, light-dark(#18181b, #f4f4f5));
}
.zine-share {
  width: min(320px, 100%);
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: var(--zine-share-bg, light-dark(#ffffff, #1c1c20));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  box-sizing: border-box;
}
.zine-share-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.zine-share-head strong { font-size: 15px; }
.zine-share-close {
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.zine-share-close svg { width: 16px; height: 16px; }
.zine-share-close:hover { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.08), rgba(255,255,255,0.14))); }

.zine-share-qr {
  align-self: center;
  line-height: 0;
  padding: 8px;
  border-radius: 8px;
  background: #fff;
}
.zine-share-qr svg { display: block; }

.zine-share-link { display: flex; gap: 6px; }
.zine-share-link input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 7px 9px;
  border: 1px solid var(--zine-controls-hover, light-dark(rgba(0,0,0,0.14), rgba(255,255,255,0.2)));
  border-radius: 7px;
  background: light-dark(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.3));
  color: inherit;
  font: inherit;
}
.zine-share-copy {
  flex: 0 0 auto;
  min-width: 74px;
  padding: 7px 12px;
  border: 0;
  border-radius: 7px;
  background: var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  color: light-dark(#ffffff, #06202c);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.zine-share-socials { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.zine-share-social {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: light-dark(rgba(0, 0, 0, 0.06), rgba(255, 255, 255, 0.08));
  color: inherit;
  text-decoration: none;
}
.zine-share-social svg { width: 19px; height: 19px; }
.zine-share-social:hover { background: var(--zine-controls-hover, light-dark(rgba(0,0,0,0.12), rgba(255,255,255,0.18))); }
.zine-share-close:focus-visible,
.zine-share-copy:focus-visible,
.zine-share-social:focus-visible,
.zine-share-link input:focus-visible {
  outline: 2px solid var(--zine-controls-accent, light-dark(#0284c7, #7dd3fc));
  outline-offset: 2px;
}

@media (prefers-reduced-motion: no-preference) {
  .zine-controls-btn { transition: background 120ms ease; }
}
`})),wt=r({ShareDialog:()=>Dt}),Tt,Et,Dt,Ot=n((()=>{I(),dt(),yt(),Ct(),Tt=132,Et=1600,Dt=class{#e;#t;#n;#r;#i=null;#a;constructor(e,t,n=`auto`){let r=t.ownerDocument;this.#e=r,this.#r=r.activeElement;let i=e.pageLink(),a=r.title||`Flipbook`;this.#t=r.createElement(`div`),this.#t.className=`zine-share-backdrop`,Y(this.#t,n),this.#t.addEventListener(`pointerdown`,e=>{e.target===this.#t&&this.close()}),this.#n=r.createElement(`div`),this.#n.className=`zine-share`,this.#n.setAttribute(`role`,`dialog`),this.#n.setAttribute(`aria-modal`,`true`),this.#n.setAttribute(`aria-label`,`Share`),this.#t.appendChild(this.#n);let o=r.createElement(`div`);o.className=`zine-share-head`;let s=r.createElement(`strong`);s.textContent=`Share`;let c=r.createElement(`button`);c.type=`button`,c.className=`zine-share-close`,c.setAttribute(`aria-label`,`Close`),c.appendChild(P(r,F.close)),c.addEventListener(`click`,()=>this.close()),o.append(s,c),this.#n.append(o,this.#s(r,i),this.#l(r,i,a));let l=this.#o(r,i);l&&this.#n.insertBefore(l,this.#n.children[1]),t.ownerDocument.body.appendChild(this.#t),this.#a=e=>{e.key===`Escape`&&this.close(),e.key===`Tab`&&this.#u(e)},this.#t.addEventListener(`keydown`,this.#a),c.focus()}#o(e,t){if(!t)return null;try{let n=e.createElement(`div`);return n.className=`zine-share-qr`,n.innerHTML=gt(t,Tt),n.setAttribute(`aria-label`,`QR code for this page`),n.setAttribute(`role`,`img`),n}catch{return null}}#s(e,t){let n=e.createElement(`div`);n.className=`zine-share-link`;let r=e.createElement(`input`);r.type=`text`,r.readOnly=!0,r.value=t,r.setAttribute(`aria-label`,`Link to this page`),r.addEventListener(`focus`,()=>r.select());let i=e.createElement(`button`);return i.type=`button`,i.className=`zine-share-copy`,i.textContent=`Copy`,i.addEventListener(`click`,()=>{this.#c(t,i)}),n.append(r,i),n}async#c(e,t){try{await navigator.clipboard?.writeText(e),t.textContent=`Copied`}catch{t.textContent=`Press Ctrl+C`}this.#i&&clearTimeout(this.#i),this.#i=setTimeout(()=>{t.textContent=`Copy`},Et)}#l(e,t,n){let r=e.createElement(`div`);r.className=`zine-share-socials`;for(let i of ut){let a=e.createElement(`a`);a.className=`zine-share-social`,a.href=i.href(t,n),a.title=i.label,a.setAttribute(`aria-label`,`Share on ${i.label}`),i.id!==`email`&&(a.target=`_blank`,a.rel=`noopener noreferrer`),a.appendChild(P(e,i.icon)),r.appendChild(a)}return r}#u(e){let t=[...this.#n.querySelectorAll(`button, a[href], input`)].filter(e=>!e.hasAttribute(`disabled`));if(t.length===0)return;let n=t[0],r=t.at(-1),i=this.#e.activeElement;e.shiftKey&&i===n?(r.focus(),e.preventDefault()):!e.shiftKey&&i===r&&(n.focus(),e.preventDefault())}close(){this.destroy()}destroy(){this.#i&&clearTimeout(this.#i),this.#i=null,this.#t.removeEventListener(`keydown`,this.#a),this.#t.remove(),this.#r?.focus?.()}}}));function kt(){L({id:`prev`,title:`Previous page`,icon:F.prev,isDisabled:e=>!e.zine.canFlipPrev(),action:e=>e.zine.flipPrev()}),L({id:`next`,title:`Next page`,icon:F.next,isDisabled:e=>!e.zine.canFlipNext(),action:e=>e.zine.flipNext()});let e=e=>e.zine.getDirection()===`rtl`;L({id:`first`,title:`First page`,icon:t=>e(t)?F.last:F.first,isDisabled:e=>!e.zine.canFlipPrev(),action:e=>{e.zine.flipTo(0),e.close()}}),L({id:`last`,title:`Last page`,icon:t=>e(t)?F.first:F.last,isDisabled:e=>!e.zine.canFlipNext(),action:e=>{e.zine.flipTo(e.zine.getPageCount()-1),e.close()}}),L({id:`zoomIn`,title:`Zoom in`,icon:F.zoomIn,isDisabled:e=>e.zine.getZoom()>=e.zine.getMaxZoom()-1e-6,action:e=>e.zine.setZoom(e.zine.getZoom()*At)}),L({id:`zoomOut`,title:`Zoom out`,icon:F.zoomOut,isDisabled:e=>e.zine.getZoom()<=1.000001,action:e=>e.zine.setZoom(e.zine.getZoom()/At)}),L({id:`fullscreen`,title:`Fullscreen`,icon:F.fullscreen,isVisible:e=>typeof e.zine.container.requestFullscreen==`function`,isActive:jt,action:e=>{let t=e.zine.container.ownerDocument;jt(e)?t?.exitFullscreen?.():e.zine.container.requestFullscreen?.(),e.close()}}),L({id:`share`,title:`Share`,icon:F.share,action:e=>{e.close(),Promise.resolve().then(()=>(Ot(),wt)).then(({ShareDialog:t})=>new t(e.zine,e.zine.container,e.colorScheme)).catch(()=>{navigator.clipboard?.writeText(e.zine.pageLink()).catch(()=>{})})}}),L({id:`download`,title:`Download PDF`,icon:F.download,isVisible:e=>e.zine.canDownload(),action:async e=>{await e.zine.download(),e.close()}}),L({id:`spread`,title:e=>e.zine.isSinglePage()?`Show two pages`:`Show one page`,icon:e=>e.zine.isSinglePage()?F.twoPages:F.onePage,isVisible:e=>!e.zine.isResponsiveSingle(),action:e=>{e.zine.toggleSpreadMode(),e.close()}}),L({id:`print`,title:`Print`,icon:F.print,isVisible:e=>e.zine.canPrint(),action:async e=>{await e.zine.print(),e.close()}}),L({id:`menu`,title:`More`,icon:F.menu,children:[`first`,`last`,`spread`,`thumbnails`,`outline`,`print`,`download`]})}var At,jt,Mt=n((()=>{I(),B(),At=Math.SQRT2,jt=e=>e.zine.container.ownerDocument?.fullscreenElement===e.zine.container})),X,Z=n((()=>{I(),X=class{root;#e;#t=null;#n=null;#r=null;#i=null;#a;#o=null;#s=null;constructor(e,t,n){this.#a=e,this.#e=e.createElement(`div`),this.#e.className=`zine-panel-holder`,this.#e.style.width=`${n.width}px`,this.#o=n.pageBox??null,this.root=e.createElement(`div`),this.root.className=`zine-panel ${n.className}`,this.root.setAttribute(`role`,`listbox`),this.root.setAttribute(`aria-label`,n.label),this.#e.appendChild(this.root);for(let e of[`pointerdown`,`pointerup`,`pointermove`,`click`,`dblclick`,`wheel`])this.root.addEventListener(e,e=>e.stopPropagation());this.#u(e,t,n.rtl??!1,n.overlay??!1),n.onDismiss&&this.#d(e,n.onDismiss),this.#c(t)}#c(e){this.#o&&(this.#l(),!(typeof ResizeObserver>`u`)&&(this.#s=new ResizeObserver(()=>this.#l()),this.#s.observe(e)))}#l(){let e=this.#o?.();e&&(this.#e.style.top=`${e.y}px`,this.#e.style.bottom=`auto`,this.#e.style.height=`${e.height}px`)}setWidth(e){this.#e.style.width=`${e}px`}#u(e,t,n,r){if(!t.parentNode){this.#e.classList.add(`zine-panel-overlay`),t.appendChild(this.#e);return}let i=t.closest(`.zine-controls-wrap`)??t,a=e.createElement(`div`);a.className=`zine-panel-wrap`,n&&a.classList.add(`zine-panel-wrap-rtl`),r&&a.classList.add(`zine-panel-wrap-overlay`),i.parentNode.insertBefore(a,i),a.append(this.#e,i),this.#t=a}#d(e,t){let n=e.createElement(`button`);if(n.type=`button`,n.className=`zine-panel-close`,n.setAttribute(`aria-label`,`Close`),n.appendChild(P(e,F.close)),n.addEventListener(`click`,e=>{e.stopPropagation(),t()}),this.#e.appendChild(n),this.#r=n,this.#t){let n=e.createElement(`div`);n.className=`zine-panel-scrim`,this.#t.insertBefore(n,this.#e);for(let e of[`pointerdown`,`click`])n.addEventListener(e,e=>{e.stopPropagation(),t()});this.#n=n}this.#i=e=>{e.key===`Escape`&&t()},e.addEventListener(`keydown`,this.#i)}destroy(){this.#s?.disconnect(),this.#s=null,this.#i&&=(this.#a.removeEventListener(`keydown`,this.#i),null),this.#n?.remove(),this.#n=null,this.#r=null,this.#e.remove();let e=this.#t;if(e?.parentNode){for(;e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.remove()}this.#t=null}}})),Nt,Pt,Ft=n((()=>{Z(),Nt=78,Pt=class{root;#e;#t;#n;#r=[];#i=null;#a=[];constructor(e,t,n={}){this.#e=e;let r=t.ownerDocument;this.#t=r,this.#n=new X(r,t,{className:`zine-thumbs`,label:`Pages`,width:90,onDismiss:n.onDismiss,rtl:e.getDirection()===`rtl`,pageBox:()=>e.getPageBox()}),this.root=this.#n.root,this.#o(),this.#a.push(e.on(`pageChanged`,()=>this.#l())),this.#l()}#o(){let e=this.#e.getSpreads(),t=this.#e.getDirection()===`rtl`,n=e.some(e=>e.left!==null&&e.right!==null);this.#n.root.classList.toggle(`zine-thumbs-solo`,!n),n&&this.#n.setWidth(170);for(let[r,i]of e.entries()){let e=this.#t.createElement(`button`);e.type=`button`,e.className=`zine-thumbs-row`,e.setAttribute(`role`,`option`),t&&(e.style.flexDirection=`row-reverse`);let a=[i.left,i.right].filter(e=>e!==null);n&&a.length===1&&e.classList.add(`zine-thumbs-row-lone`);for(let t of a){let n=this.#t.createElement(`span`);n.className=`zine-thumbs-cell`,n.dataset.page=String(t),e.appendChild(n)}let o=[...a].sort((e,t)=>e-t).map(e=>e+1);e.setAttribute(`aria-label`,o.length>1?`Pages ${o[0]}–${o.at(-1)}`:`Page ${o[0]??``}`);let s=this.#t.createElement(`span`);s.className=`zine-thumbs-caption`,s.textContent=o.join(`–`),e.appendChild(s),e.addEventListener(`click`,()=>{a.length>0&&this.#e.flipTo(Math.min(...a))}),this.#n.root.appendChild(e),this.#r.push({el:e,spread:r,pages:a})}this.#s()}#s(){let e=[...this.#n.root.querySelectorAll(`.zine-thumbs-cell[data-page]`)];if(typeof IntersectionObserver>`u`){for(let t of e)this.#c(t);return}this.#i=new IntersectionObserver((e,t)=>{for(let n of e)n.isIntersecting&&(t.unobserve(n.target),this.#c(n.target))},{root:this.#n.root,rootMargin:`200px`});for(let t of e)this.#i.observe(t)}async#c(e){let t=Number(e.dataset.page),n=await this.#e.getPageImage(t);if(!n||!e.isConnected)return;let r=n.width,i=n.height;if(!r||!i)return;let a=Math.min(2,globalThis.devicePixelRatio||1),o=this.#t.createElement(`canvas`);o.width=Math.max(1,Math.round(Nt*a)),o.height=Math.max(1,Math.round(Nt*i/r*a)),o.className=`zine-thumbs-img`;let s=o.getContext(`2d`);if(s){try{s.drawImage(n,0,0,o.width,o.height)}catch{return}e.replaceChildren(o)}}#l(){let e=this.#e.getPage();for(let{el:t,pages:n}of this.#r){let r=n.includes(e);t.classList.toggle(`zine-panel-active`,r),t.setAttribute(`aria-selected`,String(r)),r&&t.scrollIntoView?.({block:`nearest`})}}destroy(){for(let e of this.#a)e();this.#a=[],this.#i?.disconnect(),this.#i=null,this.#n.destroy()}}})),It,Lt,Rt,zt=n((()=>{Z(),It=208,Lt=12,Rt=class{root;#e;#t;#n;#r=[];#i=[];#a;constructor(e,t,n={}){this.#e=e;let r=t.ownerDocument;this.#t=r,this.#a=n.onDismiss,this.#n=new X(r,t,{className:`zine-outline`,label:`Outline`,width:It,onDismiss:n.onDismiss,rtl:e.getDirection()===`rtl`,overlay:!0,pageBox:()=>e.getPageBox()}),this.root=this.#n.root,this.#o(`Loading…`),this.#s(),this.#i.push(e.on(`pageChanged`,()=>this.#l()))}#o(e){let t=this.#t.createElement(`div`);t.className=`zine-panel-note`,t.textContent=e,this.#n.root.replaceChildren(t)}async#s(){let e=await this.#e.getOutline();if(this.#n.root.isConnected){if(e.length===0){this.#o(`This document has no outline.`);return}this.#n.root.replaceChildren(),this.#c(e,0),this.#l()}}#c(e,t){for(let n of e){let e=this.#t.createElement(`button`);if(e.type=`button`,e.className=`zine-outline-row`,e.setAttribute(`role`,`option`),e.style.paddingLeft=`${8+t*Lt}px`,e.textContent=n.title,e.title=n.title,n.page===null)e.disabled=!0;else{let t=n.page;e.setAttribute(`aria-label`,`${n.title}, page ${t+1}`),e.addEventListener(`click`,()=>{this.#e.flipTo(t),this.#a?.()}),this.#r.push({el:e,page:t})}this.#n.root.appendChild(e),n.children.length>0&&this.#c(n.children,t+1)}}#l(){let e=this.#e.getPage(),t=null,n=-1;for(let{el:r,page:i}of this.#r)r.classList.remove(`zine-panel-active`),r.removeAttribute(`aria-selected`),i<=e&&i>=n&&(t=r,n=i);t&&(t.classList.add(`zine-panel-active`),t.setAttribute(`aria-selected`,`true`),t.scrollIntoView?.({block:`nearest`}))}destroy(){for(let e of this.#i)e();this.#i=[],this.#n.destroy()}}})),Bt,Vt,Ht,Ut,Wt=n((()=>{Z(),Bt=208,Vt=180,Ht=2,Ut=class{root;#e;#t;#n;#r;#i;#a=0;#o=null;#s;constructor(e,t,n={}){this.#e=e;let r=t.ownerDocument;this.#t=r,this.#s=n.onDismiss,this.#n=new X(r,t,{className:`zine-search`,label:`Search results`,width:Bt,onDismiss:n.onDismiss,rtl:e.getDirection()===`rtl`,overlay:!0,pageBox:()=>e.getPageBox()}),this.root=this.#n.root,this.#r=r.createElement(`input`),this.#r.type=`search`,this.#r.className=`zine-search-input`,this.#r.placeholder=`Search…`,this.#r.setAttribute(`aria-label`,`Search the document`),this.#r.addEventListener(`input`,()=>{this.#o&&clearTimeout(this.#o),this.#o=setTimeout(()=>void this.#l(),Vt)}),this.#r.addEventListener(`keydown`,e=>{e.key===`Enter`&&(this.#o&&clearTimeout(this.#o),this.#l())}),this.#i=r.createElement(`div`),this.#i.className=`zine-search-hits`,this.#n.root.append(this.#r,this.#i),this.#r.focus()}#c(e){let t=this.#t.createElement(`div`);t.className=`zine-panel-note`,t.textContent=e,this.#i.replaceChildren(t)}async#l(){let e=this.#r.value.trim(),t=++this.#a;if(e.length<Ht){this.#i.replaceChildren();return}this.#c(`Searching…`);let n=await this.#e.search(e);if(!(t!==this.#a||!this.#n.root.isConnected)){if(n.length===0){this.#c(`No matches for “${e}”`);return}this.#i.replaceChildren(...n.map(e=>{let t=this.#t.createElement(`button`);t.type=`button`,t.className=`zine-search-hit`,t.setAttribute(`role`,`option`),t.setAttribute(`aria-label`,`Page ${e.page+1}: ${e.excerpt}`);let n=this.#t.createElement(`span`);n.className=`zine-search-page`,n.textContent=`Page ${e.page+1}`;let r=this.#t.createElement(`small`);return r.textContent=e.excerpt,t.append(n,r),t.addEventListener(`click`,()=>{this.#e.flipTo(e.page),this.#s?.()}),t}))}}destroy(){this.#o&&clearTimeout(this.#o),this.#o=null,this.#a++,this.#n.destroy()}}})),Gt,Kt=n((()=>{I(),Ct(),Gt=class{#e;#t;#n;#r=null;#i;#a=[];constructor(e,t,n=`auto`,r=null){this.#e=e,this.#i=r;let i=t.ownerDocument,a=e.getDirection()===`rtl`;if(this.#t=this.#o(i,a?F.next:F.prev,`Previous page`,()=>e.flipPrev()),this.#n=this.#o(i,a?F.prev:F.next,`Next page`,()=>e.flipNext()),this.#s(i,t),this.#r)Y(this.#r,n);else for(let e of[this.#t,this.#n])Y(e,n);this.#a.push(e.on(`pageChanged`,({page:e})=>this.#c(e))),this.#a.push(e.on(`flipEnd`,()=>this.#c())),this.#c()}#o(e,t,n,r){let i=e.createElement(`button`);i.type=`button`,i.className=`zine-arrow`,i.title=n,i.setAttribute(`aria-label`,n),i.appendChild(P(e,t)),i.addEventListener(`click`,r);for(let e of[`pointerdown`,`pointerup`,`click`])i.addEventListener(e,e=>e.stopPropagation());return i}#s(e,t){let n=t.closest(`.zine-panel-wrap`)??t.closest(`.zine-controls-wrap`)??t,r=n.parentNode;if(!r)return;let i=e.createElement(`div`);i.className=`zine-arrows-wrap`,this.#i&&i.classList.add(`zine-arrows-${this.#i}`),r.insertBefore(i,n),i.append(this.#t,n,this.#n),this.#r=i}#c(e){let{prev:t,next:n}=this.#l(e);for(let[e,r]of[[this.#t,t],[this.#n,n]])e.disabled=!r,e.classList.toggle(`zine-arrow-hidden`,!r)}#l(e){if(e!==void 0){let t=this.#e.getSpreads(),n=t.findIndex(t=>t.left===e||t.right===e);if(n>=0)return{prev:n>0,next:n+1<t.length}}return{prev:this.#e.canFlipPrev(),next:this.#e.canFlipNext()}}destroy(){for(let e of this.#a)e();this.#a=[],this.#t.remove(),this.#n.remove();let e=this.#r;if(e?.parentNode){for(;e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.remove()}this.#r=null}}}));function qt(e){kt(),L({id:`thumbnails`,title:()=>e.openPanel()===`thumbnails`?`Hide thumbnails`:`Show thumbnails`,icon:F.thumbnails,isVisible:e=>e.zine.isDocument(),isActive:()=>e.openPanel()===`thumbnails`,action:t=>{e.togglePanel(`thumbnails`),t.close()}}),L({id:`outline`,title:()=>e.openPanel()===`outline`?`Hide outline`:`Show outline`,icon:F.outline,isVisible:()=>e.hasOutline(),isActive:()=>e.openPanel()===`outline`,action:t=>{e.togglePanel(`outline`),t.close()}}),L({id:`pageInput`,title:`Page`,render:()=>e.makePageInput()}),L({id:`search`,title:()=>e.openPanel()===`search`?`Hide search`:`Search`,icon:F.search,isVisible:e=>e.zine.canSearch(),isActive:()=>e.openPanel()===`search`,action:()=>e.togglePanel(`search`)})}var Jt,Yt,Xt,Zt=n((()=>{I(),B(),Mt(),Ct(),Ft(),zt(),Wt(),Kt(),Jt={thumbnails:Pt,outline:Rt,search:Ut},Yt=[`pointerdown`,`pointerup`,`pointermove`,`click`,`dblclick`,`wheel`,`keydown`],Xt=class{#e;#t;#n;#r;#i=[];#a=null;#o=[];#s=null;#c=null;#l;#u=null;#d=null;#f=null;#p=null;#m;#h;constructor(e,t,n){this.#e=e,this.#l=t;let r=t.ownerDocument;this.#t=r,bt(r),this.#m=n.colorScheme??`auto`;let i=n.position??`bottom`;this.#h=i;let a=n.docked??!0;this.#n=r.createElement(`div`),this.#n.className=[`zine-controls`,`zine-controls-${i}`,a?`zine-controls-docked`:`zine-controls-floating`,n.className].filter(Boolean).join(` `),this.#n.setAttribute(`role`,`toolbar`),this.#n.setAttribute(`aria-label`,`Flipbook controls`),Y(this.#n,this.#m),this.#r=r.createElement(`div`),this.#r.className=`zine-controls-bar`,this.#n.appendChild(this.#r),this.#n.addEventListener(`keydown`,e=>this.#k(e));for(let e of Yt)this.#n.addEventListener(e,e=>this.#_(e));this.#g(t,i,a);let o=()=>this.#A();this.#o.push(e.on(`pageChanged`,o)),this.#o.push(e.on(`zoomChanged`,o)),this.#o.push(e.on(`flipEnd`,o));let s=e=>{if(!this.#a)return;let t=e.target;this.#a.el.contains(t)||this.#a.trigger.contains(t)||this.#O()};r.addEventListener(`pointerdown`,s,!0),this.#o.push(()=>r.removeEventListener(`pointerdown`,s,!0))}#g(e,t,n){if(!n){e.appendChild(this.#n);return}let r=e.parentNode;if(!r){this.#n.classList.replace(`zine-controls-docked`,`zine-controls-floating`),e.appendChild(this.#n);return}let i=this.#t.createElement(`div`);i.className=`zine-controls-wrap zine-controls-wrap-${t}`,r.insertBefore(i,e),i.appendChild(e),t===`top`||t===`left`?i.insertBefore(this.#n,e):i.appendChild(this.#n),this.#c=i}mount(e){this.#y(e.items??z);let t=e.arrows??!0;t!==!1&&(this.#p=new Gt(this.#e,this.#l,this.#m,t===!0?null:t)),this.#A(),this.#N()}destroy(){for(let e of this.#o)e();this.#o=[],this.#O(),this.#u?.destroy(),this.#u=null,this.#d=null,this.#n.remove();let e=this.#c;e?.parentNode&&(e.parentNode.insertBefore(e.firstChild,e),e.remove()),this.#c=null,this.#p?.destroy(),this.#p=null}#_(e){e.stopPropagation()}#v(e=()=>this.#O()){return{zine:this.#e,close:e,colorScheme:this.#m}}#y(e){for(let t of e){if(t===`|`){let e=this.#t.createElement(`div`);e.className=`zine-controls-sep`,this.#r.appendChild(e);continue}let e=lt(t),n;e.render?(n=e.render(this.#v()),this.#i.push({el:n,def:e})):n=this.#S(e,`zine-controls-btn`),this.#r.appendChild(n)}}#b(e){return typeof e.title==`function`?e.title(this.#v()):e.title}#x(e){return typeof e.icon==`function`?e.icon(this.#v()):e.icon}#S(e,t,n=!1){let r=this.#t.createElement(`button`),i=this.#b(e),a=this.#x(e);if(r.type=`button`,r.className=t,r.title=i,r.setAttribute(`aria-label`,i),a&&r.appendChild(P(this.#t,a)),n||!a){let e=this.#t.createElement(`span`);e.className=`zine-controls-label`,e.textContent=i,r.appendChild(e)}return r.addEventListener(`click`,()=>this.#C(e,r)),this.#i.push({el:r,def:e}),r}#C(e,t){if(e.isDisabled?.(this.#v()))return;if(e.children){this.#a?.trigger===t?this.#O():this.#T(e,t);return}if(t.classList.contains(`zine-controls-busy`))return;let n=e.action?.(this.#v());n&&typeof n.then==`function`&&(this.#w(t,!0),n.finally(()=>{this.#w(t,!1),this.#A()})),this.#A()}#w(e,t){e.classList.toggle(`zine-controls-busy`,t),e.setAttribute(`aria-busy`,String(t)),e.disabled=t}#T(e,t){this.#O();let n=this.#t.createElement(`div`);n.className=`zine-controls-menu`,n.setAttribute(`role`,`menu`);let r=this.#v();for(let t of e.children??[]){if(t===`|`)continue;let e=lt(t);if(e.isVisible&&!e.isVisible(r))continue;let i;e.render?(i=e.render(this.#v()),this.#i.push({el:i,def:e})):i=this.#S(e,`zine-controls-btn`,!0),i.setAttribute(`role`,`menuitem`),n.appendChild(i)}this.#E(n,t),this.#A(),n.querySelector(`button`)?.focus()}#E(e,t){this.#n.appendChild(e),this.#a={el:e,trigger:t},t.setAttribute(`aria-expanded`,`true`),this.#D(e,t)}#D(e,t){let n=this.#n.getBoundingClientRect(),r=t.getBoundingClientRect(),i=e.getBoundingClientRect();if(!n.width||!i.width)return;let a=r.left-n.left+r.width/2-i.width/2;a=Math.max(4,Math.min(a,n.width-i.width-4)),e.style.left=`${a}px`;let o=r.bottom-n.top+6,s=r.top-n.top-i.height-6;e.style.top=`${this.#h===`bottom`||s>=0?s:o}px`}#O(){if(!this.#a)return;let{el:e,trigger:t}=this.#a;this.#a=null,t.removeAttribute(`aria-expanded`),this.#i=this.#i.filter(t=>!e.contains(t.el)),e.remove(),this.#t.activeElement&&e.contains(this.#t.activeElement)&&t.focus()}#k(e){if(e.key===`Escape`&&this.#a){let{trigger:t}=this.#a;this.#O(),t.focus(),e.preventDefault();return}let t=[...this.#n.querySelectorAll(`button, input`)],n=t.indexOf(this.#t.activeElement);if(n<0||this.#t.activeElement instanceof HTMLInputElement)return;let r=e.key===`ArrowRight`||e.key===`ArrowDown`?1:e.key===`ArrowLeft`||e.key===`ArrowUp`?-1:0;r!==0&&(t[(n+r+t.length)%t.length]?.focus(),e.preventDefault())}#A(){let e=this.#v();for(let{el:t,def:n}of this.#i){let r=n.children?this.#M(n,e):n.isVisible?.(e);r!==void 0&&(t.style.display=r?``:`none`);let i=t.classList.contains(`zine-controls-busy`),a=(n.isDisabled?.(e)??!1)||i;for(let e of this.#j(t))e.disabled=a;if(this.#j(t).length||t.setAttribute(`aria-disabled`,String(a)),t.classList.toggle(`zine-controls-off`,a),n.isActive&&t.setAttribute(`aria-pressed`,String(n.isActive(e))),typeof n.title==`function`){let r=n.title(e);t.title=r,t.setAttribute(`aria-label`,r);let i=t.querySelector(`.zine-controls-label`);i&&(i.textContent=r)}typeof n.icon==`function`&&t.querySelector(`svg`)?.replaceWith(P(this.#t,n.icon(e)))}this.#s&&this.#t.activeElement!==this.#s&&(this.#s.value=String(this.#e.getPage()+1))}#j(e){return e instanceof HTMLButtonElement||e instanceof HTMLInputElement?[e]:[...e.querySelectorAll(`button, input`)]}#M(e,t){return e.isVisible&&!e.isVisible(t)?!1:(e.children??[]).some(e=>{if(e===`|`)return!1;let n=lt(e);return!n.isVisible||n.isVisible(t)})}makePageInput(){let e=this.#t.createElement(`div`);e.className=`zine-controls-page`;let t=this.#t.createElement(`input`);t.type=`number`,t.min=`1`,t.max=String(this.#e.getPageCount()),t.value=String(this.#e.getPage()+1),t.setAttribute(`aria-label`,`Page number`);let n=this.#t.createElement(`span`);n.textContent=`/ ${this.#e.getPageCount()}`;let r=!1,i=()=>{if(r)return;r=!0;let e=Number(t.value),n=Math.max(0,this.#e.getPageCount()-1),i=Number.isFinite(e)?Math.min(Math.max(Math.round(e)-1,0),n):this.#e.getPage();i===this.#e.getPage()?t.value=String(this.#e.getPage()+1):this.#e.flipTo(i)};return t.addEventListener(`focus`,()=>{r=!1}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&(i(),t.blur())}),t.addEventListener(`blur`,i),e.append(t,n),this.#s=t,e}openPanel(){return this.#d}hasOutline(){return this.#f===!0}#N(){this.#f!==null||!this.#e.canOutline()||(this.#f=!1,this.#e.getOutline().then(e=>{if(e.length===0)return;this.#f=!0,this.#A();let t=this.#a;if(t){let e=this.#i.find(e=>e.el===t.trigger)?.def;this.#O(),e&&this.#T(e,t.trigger)}}))}togglePanel(e){let t=this.#d;this.#u?.destroy(),this.#u=null,this.#d=null,t!==e&&(this.#u=new Jt[e](this.#e,this.#l,{onDismiss:()=>this.togglePanel(e)}),Y(this.#u.root,this.#m),this.#d=e),this.#A()}}})),Qt=r({DEFAULT_ITEMS:()=>z,ICONS:()=>F,createIcon:()=>P,defineControl:()=>L,getControl:()=>ct,mountControls:()=>$t});function $t(e,t,n={}){let r=new Xt(e,t,n);return qt(r),r.mount(n),()=>r.destroy()}var en=n((()=>{Zt(),B(),I()}));D();var tn=.25,nn=.0015,rn=6,an=250,on=24,sn=2*an,cn=1.55,ln=32,un=60,dn=2.5,fn=1.5,pn=120,mn=.85,hn=.72;function gn(e,t,n){let r=Math.max(0,t-ln),i=Math.min(e.length,t+n+ln),a=e.slice(r,i).replace(/\s+/g,` `).trim();return`${r>0?`…`:``}${a}${i<e.length?`…`:``}`}var _n=class{#e;#t;#n=new c;#r=new s(2);#i=new d;#a;#o;#s;#c;#l=1;#u;#d;#f;#p;#m;#h=!1;#g=null;#_=!1;#v;#y=``;#b;#x;#S;#C=null;#w=null;#T=[];#E=0;#D=0;#O={left:null,right:null};#k;#A;#j;#M;#N;#P=null;#F=!1;#I=1;#L=0;#R=0;#z=null;#B=!1;#V=!1;#H=null;#U=null;#W=null;#G=null;#K=null;#q=null;#J=null;#Y=0;#X=null;#Z=!1;#Q=1;#$=!1;#ee=null;#te=null;#ne=null;#re=null;#ie=null;#ae=null;#oe=-1/0;#se=null;#ce=null;#le=new Set;#ue;#de=null;#fe;#pe=null;#me=null;#he=`download`;#ge=1;#_e=0;#ve=null;#ye;debug={setFlipProgress:(e,t)=>{this.#z?.setFlipProgress(e,t)}};constructor(e,t){Sn(e,t),this.#e=e,t.width!==void 0&&(e.style.width=`${t.width}px`),t.height!==void 0&&(e.style.height=`${t.height}px`),this.#t=$e(t.source,{frontCover:t.frontCover,backCover:t.backCover,pages:t.pages});let n=t.direction??`ltr`;this.#a=n,this.#x=(t.deepLink??!0)&&y(),this.#S=t.disableContextMenu??!1,this.#o=t.spreadMode??`cover`,this.#s=this.#o,this.#c=t.curl??`cone`,this.#u=t.clickToFlip??`edge`,this.#d=t.clickZoneSize??64,this.#m=t.singlePageThreshold??640,this.#v=t.responsiveSpread??!0,this.#ue=t.controls??!0,this.#fe=t.loading??!0,this.#b=t.startPage,typeof this.#t.open!=`function`&&this.#Nt(),this.#k=t.flipDuration??800,this.#A=t.zoom?.enabled??!0,this.#j=t.zoom?.wheel??!0;let r=t.zoom?.doubleClick,i=r===!1?[]:[...r??[1,2,4]].sort((e,t)=>e-t);this.#M=i.length>0?i:null,this.#N=t.zoom?.max??4;let a=this.#A&&this.#M!==null,o=t.zoom?.doubleClickInFlipZone??this.#u===`half`;this.#f=this.#u!==`off`&&a&&o&&t.clickFlipDelay!==0,this.#p=this.#f?t.clickFlipDelay??an:0,this.#ye=this.#et(t.renderer??`auto`)}get ready(){return this.#ye}getPageCount(){return this.#t.pageCount}getPage(){return this.#D}get container(){return this.#e}getPageBox(){return this.#z?.measure().book??null}getSpreads(){return this.#T}getSpreadIndex(){return this.#E}getDirection(){return this.#a}getSpreadMode(){return this.#o}isSinglePage(){return this.#h}setSpreadMode(e){e!==this.#o&&(this.#o=e,this.#_=!1,this.#_t(),this.#vt())}toggleSpreadMode(){this.setSpreadMode(this.#o===`single`?this.#s===`single`?`double`:this.#s:`single`)}getResponsiveSpread(){return this.#v}isResponsiveSingle(){return this.#_&&this.#o!==`single`}setResponsiveSpread(e){if(e!==this.#v){if(this.#v=e,e){let e=this.#z?.measure().containerWidth;if(e===void 0)return;this.#_=!1,this.#gt(e)}else{if(!this.#_)return;this.#_=!1,this.#_t()}this.#vt()}}getPageImage(e){return this.#At(e)}canFlipNext(){return this.#E+1<this.#T.length}canFlipPrev(){return this.#E>0}getMaxZoom(){return this.#N}canSearch(){return typeof this.#t.getText==`function`}canDownload(){return typeof this.#t.getDownload==`function`}isDocument(){return typeof this.#t.getOutline==`function`||typeof this.#t.getText==`function`}canPrint(){return typeof this.#t.getDownload==`function`&&this.#e.ownerDocument?.defaultView?.navigator?.pdfViewerEnabled!==!1}async print(){let e=await this.getSourceFile(),t=this.#e.ownerDocument;if(!e||!t)return!1;let{url:n,revoke:r}=await this.#be(e,t),i=t.createElement(`iframe`);return i.style.cssText=`position:fixed;right:0;bottom:0;width:1px;height:1px;opacity:0;border:0;`,i.setAttribute(`aria-hidden`,`true`),i.src=n,new Promise(e=>{let a=!1,o=t=>{a||(a=!0,setTimeout(()=>{i.remove(),r&&URL.revokeObjectURL(n)},6e4),e(t))};i.addEventListener(`load`,()=>{try{let e=i.contentWindow;if(!e)return o(!1);e.focus(),e.print(),o(!0)}catch{o(!1)}}),i.addEventListener(`error`,()=>o(!1)),t.body.appendChild(i)})}canOutline(){return typeof this.#t.getOutline==`function`}getOutline(){if(!this.#ce){let e=this.#t.getOutline;this.#ce=typeof e==`function`?Promise.resolve(e.call(this.#t)).catch(()=>[]):Promise.resolve([])}return this.#ce}async getSourceFile(){let e=this.#t.getDownload;return typeof e==`function`?await e.call(this.#t)??null:null}async download(){let e=await this.getSourceFile();if(!e)return!1;let t=this.#e.ownerDocument;if(!t)return!1;let{url:n,revoke:r}=await this.#be(e,t),i=t.createElement(`a`);return i.href=n,i.download=e.filename,i.rel=`noopener`,t.body.appendChild(i),i.click(),i.remove(),r&&setTimeout(()=>URL.revokeObjectURL(n),1e4),!0}async#be(e,t){if(e.revoke||!this.#xe(e.url,t))return{url:e.url,revoke:e.revoke??!1};try{let t=await(await fetch(e.url)).blob();return{url:URL.createObjectURL(t),revoke:!0}}catch{return{url:e.url,revoke:!1}}}#xe(e,t){let n=t.defaultView?.location?.href;if(!n)return!1;try{return new URL(e,n).origin!==new URL(n).origin}catch{return!1}}async search(e,t={}){let n=this.#t.getText,r=e.trim().toLowerCase();if(typeof n!=`function`||r===``)return[];let i=t.limit??50,a=[];for(let e=0;e<this.#t.pageCount&&a.length<i;e++){let t;try{t=await n.call(this.#t,e)}catch(t){this.#n.emit(`sourceError`,{index:e,error:t});continue}let i=t.toLowerCase().indexOf(r);i<0||a.push({page:e,excerpt:gn(t,i,r.length)})}return a}flipNext(){this.#Se(1)}flipPrev(){this.#Se(-1)}#Se(e){this.#Ce(()=>this.#Oe(this.#E+e))}flipTo(e){let t=Q(e,0,Math.max(0,this.#t.pageCount-1));this.#Ce(()=>this.#Oe(this.#Mt(t)))}#Ce(e){this.#i.state===`idle`?e():this.#J?(this.#q=null,this.#we(),e()):this.#q=e}#we(){let e=this.#J;e&&(this.#J=null,this.#H!==null&&(cancelAnimationFrame(this.#H),this.#H=null),this.#z?.setFlipProgress(e.toT,e.direction),e.onDone())}#Te(){let e=this.#q;if(!e){this.#Et();return}this.#q=null,e()}getZoom(){return this.#I}setZoom(e,t){if(!this.#z||!this.#A)return;let n=Q(e,1,this.#N),r=this.#z.measure(),i=r.screenAt?.(this.#I),a=t??(i?{x:i.x+this.#L+i.width/2,y:i.y+this.#R+i.height/2}:null)??{x:r.containerWidth/2,y:r.containerHeight/2},o=this.#I,s=n===1?0:a.x-n/o*(a.x-this.#L),c=n===1?0:a.y-n/o*(a.y-this.#R);[s,c]=this.#De(s,c,n,r.containerWidth,r.containerHeight),this.#I=n,this.#L=s,this.#R=c,this.#z.setViewTransform(n,s,c),o>1!=n>1&&this.#Ee(),this.#St(),this.#n.emit(`zoomChanged`,{scale:n})}resetZoom(){this.setZoom(1)}#Ee(){this.#e.style.touchAction=this.#I>1?`none`:`pan-y`}#De(e,t,n,r,i){let a=typeof devicePixelRatio==`number`&&devicePixelRatio>0?devicePixelRatio:1,o=e=>Math.round(e*a)/a||0,s=this.#z?.measure().screenAt?.(n)??{x:0,y:0,width:r*n,height:i*n},[c,l]=vn(s.x,s.width,r),[u,d]=vn(s.y,s.height,i);return[o(Q(e,c,l)),o(Q(t,u,d))]}on(e,t){return this.#n.on(e,t)}destroy(){this.#V=!0,this.#H!==null&&cancelAnimationFrame(this.#H),this.#J=null,this.#q=null,this.#Ge(),this.#P?.disconnect(),this.#C?.stop(),this.#C=null,this.#w?.(),this.#x&&b(),this.#de?.(),this.#it(),this.#se?.(),this.#ne?.(),this.#ie?.(),this.#re?.(),this.#te?.(),this.#ve!==null&&clearTimeout(this.#ve),this.#_e++,this.#z?.destroy(),this.#z=null,this.#t.destroy(),this.#n.clear()}#Oe(e){if(e<0||e>=this.#T.length||e===this.#E||this.#i.send(`flip`)===null)return;let t=e>this.#E?`forward`:`backward`,n=this.#Ne(e);this.#n.emit(`flipStart`,{from:this.#D,to:n}),this.#ke(e,t,n,++this.#Y)}async#ke(e,t,n,r){let i=this.#T[e],a=i?await this.#kt(i):{left:null,right:null};r===this.#Y&&(this.#z?.beginFlip(this.#O,a,t,{fill:this.#h,curl:this.#mt(),anchor:{y:this.#l}}),this.#Ae(0,1,t,()=>this.#Me(e,n,a),()=>this.#je(n)))}#Ae(e,t,n,r,i){let a=this.#pt()*Math.abs(t-e);if(a<=0){this.#z?.setFlipProgress(t,n),r();return}let o={toT:t,direction:n,onDone:r};this.#J=o;let s=performance.now(),c=!1,l=u=>{if(this.#J!==o)return;let d=Math.min(1,(u-s)/a),f=this.#h?bn(d):yn(d);i&&!c&&f>=(this.#h?hn:mn)&&(c=!0,i()),d<1?(this.#z?.setFlipProgress(e+(t-e)*f,n),this.#H=requestAnimationFrame(l)):(this.#z?.setFlipProgress(t,n),this.#H=null,this.#J=null,r())};this.#H=requestAnimationFrame(l)}#je(e){this.#D!==e&&(this.#D=e,this.#ft(),this.#n.emit(`pageChanged`,{page:e}))}#Me(e,t,n){let r=this.#T[e];this.#E=e,this.#O=n,r&&this.#yt(r,n),this.#jt(),this.#i.send(`settle`),this.#oe=performance.now(),this.#je(t),this.#n.emit(`flipEnd`,{page:t}),this.#Te()}#Ne(e){let t=this.#T[e];if(!t)return this.#D;let n=[t.left,t.right].filter(e=>e!==null);return n.length>0?Math.min(...n):this.#D}#Pe(e,t){if(this.#Z||!this.#z)return;if(this.#Ge(),this.#I>1){if(this.#i.send(`panStart`)===null)return;this.#X={baseTx:this.#L,baseTy:this.#R};return}let n=this.#Ve(),r=this.#He(e,t);this.#G=r;let i=Math.min(n.width,n.height)*tn,a=r.x>=0&&r.x<=n.width&&r.y>=0&&r.y<=n.height,o=r.x<=i||r.x>=n.width-i,s=a&&o;if(this.#i.state!==`idle`){if(!this.#J||!s){this.#W=null;return}this.#we()}if(!s)return;this.#l=Q(r.y/n.height,0,1);let c=r.x>n.width/2,l=this.#a===`rtl`?!c:c,u=this.#E+(l?1:-1);u<0||u>=this.#T.length||(this.#W={direction:l?`forward`:`backward`,targetIndex:u,toPage:this.#Ne(u),width:n.width})}#Fe(){let e=this.#W;e&&(this.#W=null,this.#i.send(`grab`)!==null&&(this.#U={direction:e.direction,targetIndex:e.targetIndex,toPage:e.toPage,toContent:{left:null,right:null},width:e.width,t:0},this.#n.emit(`flipStart`,{from:this.#D,to:e.toPage}),this.#Ie(e.targetIndex,e.direction)))}async#Ie(e,t){let n=this.#T[e],r=n?await this.#kt(n):{left:null,right:null};this.#U?.targetIndex===e&&(this.#U.toContent=r,this.#z?.beginFlip(this.#O,r,t,{fill:this.#h,curl:this.#mt(),anchor:{y:this.#l}}),this.#z?.setFlipProgress(this.#U.t,t))}#Le(e,t){if(this.#Z)return;if(this.#X){if(!this.#z)return;let n=this.#z.measure(),[r,i]=this.#De(this.#X.baseTx+e,this.#X.baseTy+t,this.#I,n.containerWidth,n.containerHeight);this.#L=r,this.#R=i,this.#z.setViewTransform(this.#I,r,i),this.#St();return}this.#W&&Math.hypot(e,t)>rn&&this.#Fe();let n=this.#U;n&&(n.t=Q((n.direction===`forward`?-e:e)/n.width,0,1),this.#z?.setFlipProgress(n.t,n.direction))}#Re(e){if(this.#Z)return;if(this.#X){this.#X=null,this.#i.send(`panEnd`);return}let t=this.#U;if(!t){this.#W=null,this.#ze(e)||this.#Be(e);return}this.#U=null,this.#i.send(`release`);let n=e.swipe&&Math.abs(e.vx)>Math.abs(e.vy),r=t.direction===`forward`?e.vx<0:e.vx>0,i=n&&r,a=n&&!r;i||t.t>=.5&&!a?this.#Ae(t.t,1,t.direction,()=>this.#Me(t.targetIndex,t.toPage,t.toContent),()=>this.#je(t.toPage)):this.#Ae(t.t,0,t.direction,()=>this.#Ke())}#ze(e){if(this.#I>1||!e.swipe||Math.abs(e.dx)<=Math.abs(e.dy))return!1;let t=this.#a===`rtl`?e.dx>0:e.dx<0,n=t?`forward`:`backward`;if(!this.#We(n))return!1;let r=t?1:-1;return this.#Ce(()=>this.#Oe(this.#E+r)),!0}#Be(e){if(this.#u===`off`||this.#I>1||!this.#G||Math.abs(e.dx)>rn||Math.abs(e.dy)>rn)return;let t=this.#Ue(this.#G);if(!t||!this.#We(t))return;this.#l=Q(this.#G.y/this.#Ve().height,0,1);let n=t===`forward`?1:-1,r=()=>this.#Oe(this.#E+n);if(this.#Ge(),this.#p<=0){this.#Ce(r);return}this.#K=setTimeout(()=>{this.#K=null,this.#Ce(r)},this.#p)}#Ve(){let e=this.#z.measure();return e.content??e.book??{x:0,y:0,width:e.containerWidth,height:e.containerHeight}}#He(e,t){let n=this.#e.getBoundingClientRect(),r=this.#Ve();return{x:e-n.left-r.x,y:t-n.top-r.y}}#Ue(e){if(!this.#z)return null;let t=this.#Ve().width,n;if(n=this.#u===`half`?e.x>t/2?`right`:`left`:e.x<=this.#d?`left`:e.x>=t-this.#d?`right`:null,!n)return null;let r=this.#a===`rtl`?`left`:`right`;return n===r?`forward`:`backward`}#We(e){let t=this.#E+(e===`forward`?1:-1);return t>=0&&t<this.#T.length}#Ge(){this.#K!==null&&(clearTimeout(this.#K),this.#K=null)}#Ke(){let e=this.#T[this.#E];e&&this.#yt(e,this.#O),this.#i.send(`settle`),this.#n.emit(`flipEnd`,{page:this.#D}),this.#Te()}#qe(){if(this.#W=null,this.#Ge(),this.#U){this.#U=null,this.#i.send(`release`),this.#i.send(`settle`);let e=this.#T[this.#E];e&&this.#yt(e,this.#O)}else this.#X&&(this.#X=null,this.#i.send(`panEnd`));this.#Z=!0,this.#Q=this.#I}#Je(e,t,n){if(!this.#Z)return;let r=this.#e.getBoundingClientRect();this.setZoom(this.#Q*n,{x:e-r.left,y:t-r.top})}#Ye(){this.#Z=!1}#Xe(){if(!this.#S)return;let e=e=>e.preventDefault();this.#e.addEventListener(`contextmenu`,e),this.#re=()=>this.#e.removeEventListener(`contextmenu`,e)}#Ze(){let e=e=>{if(!this.#j||!this.#A||!(e.ctrlKey||e.metaKey))return;e.preventDefault();let t=this.#e.getBoundingClientRect(),n=Math.exp(-e.deltaY*nn);this.setZoom(this.#I*n,{x:e.clientX-t.left,y:e.clientY-t.top})};this.#e.addEventListener(`wheel`,e,{passive:!1}),this.#ne=()=>this.#e.removeEventListener(`wheel`,e)}#Qe(){let e=e=>{let t=this.#M;if(!this.#A||t===null||!this.#z)return;let n=performance.now(),r=this.#ae;if(!(r!==null&&n-r.t<=an&&Math.hypot(e.clientX-r.x,e.clientY-r.y)<=on)){this.#ae={t:n,x:e.clientX,y:e.clientY};return}this.#ae=null,this.#$e(e.clientX,e.clientY,t)};this.#e.addEventListener(`click`,e),this.#ie=()=>this.#e.removeEventListener(`click`,e)}#$e(e,t,n){if(this.#I<=1&&this.#u!==`off`&&!this.#f){let n=this.#He(e,t),r=this.#Ue(n);if(r!==null&&this.#We(r)||this.#i.state===`animating`||performance.now()-this.#oe<=sn)return}this.#Ge();let r=n.find(e=>e>this.#I+1e-6)??n[0]??this.#I,i=this.#e.getBoundingClientRect();this.setZoom(r,{x:e-i.left,y:t-i.top})}async#et(e){let t=Qe(e);if(this.#t.onProgress?.(e=>this.#tt(e)),typeof this.#t.open==`function`){this.#nt();try{await this.#t.open(),this.#Nt()}catch(e){throw this.#it(),e}this.#rt(`preparing`)}this.#t.prefetch([this.#D]);let n=await t,r=await this.#at(n);this.#z=r,this.#t.onPageUpdate?.(e=>this.#xt(e)),this.#gt(r.measure().containerWidth);let i=new p({onStart:e=>this.#Pe(e.x,e.y),onMove:e=>this.#Le(e.dx,e.dy),onEnd:e=>this.#Re(e)}),a=new g({onPinchStart:()=>this.#qe(),onPinchMove:e=>this.#Je(e.centerX,e.centerY,e.scale),onPinchEnd:()=>this.#Ye()});this.#te=m(this.#e,{pointer:i,pinch:a}),this.#Ee(),this.#Ze(),this.#Qe(),this.#Xe(),this.#st(),this.#se=this.#ut(),await this.#vt(),this.#it(),this.#Dt(),this.#jt(),this.#ft(),this.#lt(),await this.#ct(),this.#n.emit(`ready`)}#tt(e){this.#me=e,this.#n.emit(`progress`,e),this.#pe?.update(e)}async#nt(){if(this.#fe===!1||this.#V)return;let e=this.#e;if(!(!e.ownerDocument||typeof e.appendChild!=`function`))try{let{mountLoading:t}=await Promise.resolve().then(()=>(st(),nt));if(this.#he===`done`||this.#V)return;this.#pe=t(e),this.#me&&this.#pe.update(this.#me),this.#he===`preparing`&&this.#pe.preparing()}catch{}}#rt(e){this.#he!==`done`&&(this.#he=e,this.#pe?.preparing())}#it(){this.#he=`done`,this.#pe?.destroy(),this.#pe=null}async#at(e){try{return await e.mount(this.#e),e.onFatal?.(()=>{this.#ot()}),e}catch{e.destroy();let t=await Qe(`css`);return await t.mount(this.#e),this.#B=!0,this.#n.emit(`rendererFallback`,{from:`webgl2`,to:`css`}),t}}async#ot(){if(this.#B||this.#V)return;this.#B=!0,this.#z?.destroy(),this.#z=null;let e=await Qe(`css`);if(this.#V){e.destroy();return}await e.mount(this.#e),this.#z=e,this.#gt(e.measure().containerWidth),await this.#vt(),this.#n.emit(`rendererFallback`,{from:`webgl2`,to:`css`})}#st(){if(typeof matchMedia!=`function`)return;let e=matchMedia(`(prefers-reduced-motion: reduce)`);this.#$=e.matches,e.addEventListener?.(`change`,e=>{this.#$=e.matches})}async#ct(){if(this.#ue===!1||this.#V)return;let e=this.#e;if(!(!e.ownerDocument||typeof e.appendChild!=`function`))try{let{mountControls:t}=await Promise.resolve().then(()=>(en(),Qt));if(this.#V)return;let n=this.#ue===!0?{}:this.#ue;this.#de=t(this,e,n)}catch{}}#lt(){if(!this.#x||globalThis.location===void 0)return;let e=globalThis;this.#C=C(e,e=>{e!==this.#D&&this.flipTo(e)}),this.#C.push(this.#D),this.#w=this.#n.on(`pageChanged`,({page:e})=>{this.#C?.push(e)})}pageLink(e=this.#D){let t=globalThis.location?.href??``;if(!t)return``;let n=new URL(t);return n.hash=S(n.hash,Q(e,0,Math.max(0,this.#t.pageCount-1))),n.toString()}#ut(){let e=this.#e,t=e.ownerDocument;if(!t||typeof e.setAttribute!=`function`)return null;e.hasAttribute(`tabindex`)||(e.tabIndex=0),e.setAttribute(`aria-roledescription`,`flipbook`);let n=e=>this.#dt(e);e.addEventListener(`keydown`,n);let r=t.createElement(`div`);return r.setAttribute(`aria-live`,`polite`),r.setAttribute(`aria-atomic`,`true`),r.style.cssText=`position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;`,e.appendChild(r),this.#ee=r,()=>{e.removeEventListener(`keydown`,n),r.remove(),this.#ee=null}}#dt(e){let t=this.#a===`rtl`?`ArrowLeft`:`ArrowRight`;switch(e.key){case`ArrowRight`:case`ArrowLeft`:e.key===t?this.flipNext():this.flipPrev(),e.preventDefault();break;case`Home`:this.flipTo(0),e.preventDefault();break;case`End`:this.flipTo(this.#t.pageCount-1),e.preventDefault();break;default:break}}#ft(){this.#ee&&(this.#ee.textContent=`Page ${this.#D+1} of ${this.#t.pageCount}`)}#pt(){return this.#$?pn:this.#k*(this.#h?cn:1)}#mt(){return this.#$?`simple`:this.#c}update(){!this.#z||this.#i.state!==`idle`||(this.#gt(this.#z.measure().containerWidth),this.#vt())}#ht(){return this.#_||this.#o===`single`?`single`:this.#o}#gt(e){let t=this.#v&&a(e,this.#m);t!==this.#_&&(this.#_=t,this.#_t())}#_t(){let e=this.#ht(),t=e!==this.#g;this.#g=e,this.#h=e===`single`,this.#T=i(this.#t.pageCount,{direction:this.#a,mode:e}),this.#E=this.#Mt(this.#D),t&&this.#n.emit(`spreadChanged`,{mode:e,singlePage:this.#h})}async#vt(){let e=this.#T[this.#E];!e||!this.#z||(this.#O=await this.#kt(e),this.#yt(e,this.#O))}#yt(e,t){this.#z?.renderSpread(e,t,{fill:this.#h}),this.#bt(),this.#ge=1,this.#St()}#bt(){let e=this.#z?.measure().book;if(!e||e.width<=0||e.height<=0)return;let t=(e.width/e.height).toFixed(4);t!==this.#y&&(this.#y=t,this.#e.style.aspectRatio=t)}#xt(e){if(this.#i.state!==`idle`){this.#le.add(e);return}let t=this.#T[this.#E];t&&(t.left===e||t.right===e)&&this.#vt()}#St(){this.#ve!==null&&clearTimeout(this.#ve);let e=this.#wt();if(e!==this.#ge){if(e===1){this.#_e++,this.#ge=1,this.#vt();return}this.#ve=setTimeout(()=>{this.#ve=null,this.#Tt()},un)}}#Ct(){let e=this.#z?.measure(),t=e?.content??e?.book;if(!t||t.width<=0)return 1;let n=this.#O,r=+!!n.left+ +!!n.right;if(r===0)return 1;let i=t.width/r,a=typeof devicePixelRatio==`number`&&devicePixelRatio>0?devicePixelRatio:1,o=0;for(let e of[n.left,n.right]){if(!e||e.width<=0)continue;let t=e.width/this.#ge;o=Math.max(o,i*a/t)}return o===0?1:o}#wt(){let e=Math.max(1,fn/(typeof devicePixelRatio==`number`&&devicePixelRatio>0?devicePixelRatio:1)),t=this.#I<=1?1:this.#I,n=this.#Ct()*Math.max(t,e);return n<=1.001?1:Math.min(Math.ceil(n*2)/2,dn)}async#Tt(){let e=this.#T[this.#E];if(!this.#z||!e)return;let t=this.#wt();if(t===1||t===this.#ge||this.#i.state!==`idle`)return;let n=++this.#_e,r={x:0,y:0,width:1,height:1},i=await Promise.all([e.left,e.right].map(async e=>{if(e===null)return null;try{return await this.#t.get(e,{scale:t,region:r})}catch(t){return this.#n.emit(`sourceError`,{index:e,error:t}),null}}));if(n!==this.#_e||this.#wt()!==t||this.#i.state!==`idle`)return;let a=i[0]??null,o=i[1]??null;a===this.#O.left&&o===this.#O.right||(this.#ge=t,this.#O={left:a,right:o},this.#z.renderSpread(e,this.#O,{fill:this.#h}))}#Et(){if(this.#le.size===0)return;let e=this.#T[this.#E],t=e!==void 0&&[e.left,e.right].some(e=>e!==null&&this.#le.has(e));this.#le.clear(),t&&this.#vt()}#Dt(){typeof ResizeObserver>`u`||(this.#P=new ResizeObserver(()=>this.#Ot()),this.#P.observe(this.#e))}#Ot(){this.#F||(this.#F=!0,requestAnimationFrame(()=>{this.#F=!1,this.update()}))}async#kt(e){let[t,n]=await Promise.all([this.#At(e.left),this.#At(e.right)]);return{left:t,right:n}}async#At(e){if(e===null)return null;try{return await this.#t.get(e)}catch(t){return this.#n.emit(`sourceError`,{index:e,error:t}),null}}#jt(){let{toMount:e}=this.#r.update(this.#E,this.#T.length),t=[];for(let n of e){let e=this.#T[n];e?.left!=null&&t.push(e.left),e?.right!=null&&t.push(e.right)}this.#t.prefetch(t)}#Mt(e){let t=this.#T.findIndex(t=>t.left===e||t.right===e);return t===-1?0:t}#Nt(){let e=this.#t.pageCount;if(!Number.isInteger(e)||e<1)throw Error(`Zine: source has ${e} pages; a Source must have at least 1 page.`);let t=this.#b;if(t!==void 0&&(!Number.isInteger(t)||t<0||t>=e))throw Error(`Zine: startPage ${JSON.stringify(t)} is out of range for a ${e}-page book (valid 0..${e-1}).`);let n=this.#ht();this.#h=n===`single`,this.#T=i(e,{direction:this.#a,mode:n});let r=this.#x?x(globalThis.location?.hash??``):null;this.#D=Q(r??t??0,0,e-1),this.#E=this.#Mt(this.#D)}};function Q(e,t,n){return e<t?t:e>n?n:e}function vn(e,t,n){if(t<=n){let r=(n-t)/2-e;return[r,r]}return[n-(e+t),-e]}function yn(e){return e<.5?2*e*e:1-(-2*e+2)**2/2}function bn(e){return 1-(1-yn(e))**1.3}function xn(e){return e===null?`null`:Array.isArray(e)?`array`:typeof e}function Sn(e,t){if(typeof e!=`object`||!e||typeof e.appendChild!=`function`||typeof e.addEventListener!=`function`)throw Error(`Zine: container must be a DOM element; received ${xn(e)}.`);if(typeof t!=`object`||!t)throw Error("Zine: an options object with a `source` is required.");let n=t,r=n.source;if(typeof r!=`object`||!r||typeof r.get!=`function`||typeof r.pageCount!=`number`)throw Error("Zine: `source` is required and must be a Source, e.g. new ImageSource(urls).");let i=n.startPage;if(i!==void 0&&(typeof i!=`number`||!Number.isInteger(i)||i<0))throw Error(`Zine: startPage must be a non-negative integer; got ${JSON.stringify(i)}.`);let a=n.direction;if(a!==void 0&&a!==`ltr`&&a!==`rtl`)throw Error(`Zine: direction must be 'ltr' or 'rtl'; got ${JSON.stringify(a)}.`);let o=n.clickToFlip;if(o!==void 0&&![`edge`,`half`,`off`].includes(o))throw Error(`Zine: clickToFlip must be 'edge', 'half', or 'off'; got ${JSON.stringify(o)}.`);let s=n.curl;if(s!==void 0){if(typeof s==`object`&&s){if(typeof s.deform!=`function`)throw Error(`Zine: a curl model must have a deform() function.`)}else if(T.includes(s))throw Error(`Zine: the '${String(s)}' curl is not bundled. Import it and pass the model: import { ${String(s)} } from '@zinejs/core/curls'  →  curl: ${String(s)}`);else if(!w.includes(s))throw Error(`Zine: curl must be ${w.join(` or `)}, or a model imported from '@zinejs/core/curls' (${T.join(`, `)}); got ${JSON.stringify(s)}.`)}for(let e of[`deepLink`,`disableContextMenu`,`responsiveSpread`,`loading`])if(n[e]!==void 0&&typeof n[e]!=`boolean`)throw Error(`Zine: ${e} must be a boolean; got ${xn(n[e])}.`);let c=n.controls;if(c!==void 0&&typeof c!=`boolean`&&(typeof c!=`object`||!c))throw Error(`Zine: controls must be a boolean or an options object; got ${xn(c)}.`);let l=c?.position;if(l!==void 0&&![`top`,`bottom`,`left`,`right`].includes(l))throw Error(`Zine: controls.position must be 'top', 'bottom', 'left', or 'right'; got ${JSON.stringify(l)}.`);let u=c?.colorScheme;if(u!==void 0&&![`light`,`dark`,`auto`].includes(u))throw Error(`Zine: controls.colorScheme must be 'light', 'dark', or 'auto'; got ${JSON.stringify(u)}.`);let d=c?.arrows;if(d!==void 0&&typeof d!=`boolean`&&![`desktop`,`mobile`].includes(d))throw Error(`Zine: controls.arrows must be a boolean, 'desktop', or 'mobile'; got ${JSON.stringify(d)}.`);let f=n.spreadMode;if(f!==void 0&&![`double`,`single`,`cover`,`book`].includes(f))throw Error(`Zine: spreadMode must be 'double', 'single', 'cover', or 'book'; got ${JSON.stringify(f)}.`);for(let e of[`frontCover`,`backCover`]){let t=n[e];if(t!==void 0&&typeof t!=`string`)throw Error(`Zine: ${e} must be an image URL string; got ${JSON.stringify(t)}.`)}let p=n.pages;if(p!==void 0&&(typeof p!=`object`||!p||Array.isArray(p)))throw Error(`Zine: pages must be an object mapping page indices to image URLs.`);$(n.width,`width`,1),$(n.height,`height`,1),$(n.flipDuration,`flipDuration`,0),$(n.clickZoneSize,`clickZoneSize`,0),$(n.clickFlipDelay,`clickFlipDelay`,0),$(n.singlePageThreshold,`singlePageThreshold`,0),Cn(n.zoom),wn(n.renderer)}function $(e,t,n){if(e!==void 0&&(typeof e!=`number`||!Number.isFinite(e)||e<n))throw Error(`Zine: ${t} must be a number >= ${n}; got ${JSON.stringify(e)}.`)}function Cn(e){if(e===void 0)return;if(typeof e!=`object`||!e||Array.isArray(e))throw Error(`Zine: zoom must be an object, e.g. { max: 4 }.`);let t=e;if(t.enabled!==void 0&&typeof t.enabled!=`boolean`)throw Error(`Zine: zoom.enabled must be a boolean; got ${JSON.stringify(t.enabled)}.`);if(t.wheel!==void 0&&typeof t.wheel!=`boolean`)throw Error(`Zine: zoom.wheel must be a boolean; got ${JSON.stringify(t.wheel)}.`);if(t.doubleClickInFlipZone!==void 0&&typeof t.doubleClickInFlipZone!=`boolean`)throw Error(`Zine: zoom.doubleClickInFlipZone must be a boolean; got ${JSON.stringify(t.doubleClickInFlipZone)}.`);if(t.doubleClick!==void 0&&t.doubleClick!==!1){let e=t.doubleClick;if(!Array.isArray(e)||e.some(e=>typeof e!=`number`||!Number.isFinite(e)||e<1))throw Error(`Zine: zoom.doubleClick must be false or an array of zoom levels >= 1, e.g. [1, 2, 4].`)}$(t.max,`zoom.max`,1)}function wn(e){if(e!==void 0){if(typeof e==`string`){if(e!==`auto`&&e!==`css`&&e!==`webgl2`)throw Error(`Zine: renderer '${e}' is not recognized; use 'auto', 'css', 'webgl2', an array of those, or a custom Renderer.`);return}if(Array.isArray(e)){for(let t of e)if(t!==`css`&&t!==`webgl2`)throw Error(`Zine: renderer order array may only contain 'css' or 'webgl2'; got ${JSON.stringify(t)}.`);return}if(!(typeof e==`object`&&e&&typeof e.mount==`function`))throw Error(`Zine: renderer must be 'auto', 'css', 'webgl2', an array of those, or a custom Renderer instance.`)}}var Tn=class{pageCount;fit;#e;#t;#n=new Map;constructor(e,t={}){this.#e=e,this.pageCount=e.length,this.#t=t.preload??1,this.fit=t.fit??`contain`}get(e){let t=this.#r(e);for(let t=1;t<=this.#t;t++)this.prefetch([e-t,e+t]);return t}prefetch(e){for(let t of e)t>=0&&t<this.pageCount&&this.#r(t).catch(()=>{})}destroy(){for(let e of this.#n.values())e.then(e=>e.close()).catch(()=>{});this.#n.clear()}#r(e){let t=this.#n.get(e);if(t)return t;let n=this.#e[e];if(n===void 0)return Promise.reject(RangeError(`ImageSource: page ${e} is out of range (0..${this.pageCount-1}).`));let r=(async()=>{let t=await fetch(n);if(!t.ok)throw Error(`ImageSource: failed to fetch page ${e} (${n}) — HTTP ${t.status}.`);return createImageBitmap(await t.blob())})().catch(t=>{throw this.#n.delete(e),t});return this.#n.set(e,r),r}};B(),D(),e.CURL_TYPES=w,e.DEFAULT_ITEMS=z,e.IMPORTABLE_CURLS=T,e.ImageSource=Tn,e.Zine=_n,e.defineControl=L,e.getControl=ct});
//# sourceMappingURL=index.umd.js.map