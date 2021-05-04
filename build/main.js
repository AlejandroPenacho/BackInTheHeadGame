(()=>{"use strict";var t={632:(t,e,i)=>{function o(){}function n(t){return t()}function s(){return Object.create(null)}function l(t){t.forEach(n)}function r(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function h(t){return 0===Object.keys(t).length}function c(t,e){t.appendChild(e)}function d(t,e,i){t.insertBefore(e,i||null)}function p(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function y(){return f(" ")}function v(t,e,i,o){return t.addEventListener(e,i,o),()=>t.removeEventListener(e,i,o)}function g(t,e,i){null==i?t.removeAttribute(e):t.getAttribute(e)!==i&&t.setAttribute(e,i)}function m(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function $(t,e){t.value=null==e?"":e}function b(t,e,i,o){t.style.setProperty(e,i,o?"important":"")}let x;function k(t){x=t}i.r(e),i.d(e,{default:()=>ft}),new Set,new Set;const w=[],M=[],z=[],C=[],P=Promise.resolve();let S=!1;function _(t){z.push(t)}function j(t){C.push(t)}let K=!1;const I=new Set;function F(){if(!K){K=!0;do{for(let t=0;t<w.length;t+=1){const e=w[t];k(e),q(e.$$)}for(k(null),w.length=0;M.length;)M.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];I.has(e)||(I.add(e),e())}z.length=0}while(w.length);for(;C.length;)C.pop()();S=!1,K=!1,I.clear()}}function q(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const E=new Set;let T;function L(t,e){t&&t.i&&(E.delete(t),t.i(e))}function B(t,e,i,o){if(t&&t.o){if(E.has(t))return;E.add(t),T.c.push((()=>{E.delete(t),o&&(i&&t.d(1),o())})),t.o(e)}}const A="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;let G;function O(t,e,i){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=i,i(t.$$.ctx[o]))}function W(t){t&&t.c()}function V(t,e,i,o){const{fragment:s,on_mount:a,on_destroy:h,after_update:c}=t.$$;s&&s.m(e,i),o||_((()=>{const e=a.map(n).filter(r);h?h.push(...e):l(e),t.$$.on_mount=[]})),c.forEach(_)}function R(t,e){const i=t.$$;null!==i.fragment&&(l(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function H(t,e,i,n,r,a,h=[-1]){const c=x;k(t);const d=t.$$={fragment:null,ctx:null,props:a,update:o,not_equal:r,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:e.context||[]),callbacks:s(),dirty:h,skip_bound:!1};let u=!1;if(d.ctx=i?i(t,e.props||{},((e,i,...o)=>{const n=o.length?o[0]:i;return d.ctx&&r(d.ctx[e],d.ctx[e]=n)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](n),u&&function(t,e){-1===t.$$.dirty[0]&&(w.push(t),S||(S=!0,P.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),i})):[],d.update(),u=!0,l(d.before_update),d.fragment=!!n&&n(d.ctx),e.target){if(e.hydrate){const t=(f=e.target,Array.from(f.childNodes));d.fragment&&d.fragment.l(t),t.forEach(p)}else d.fragment&&d.fragment.c();e.intro&&L(t.$$.fragment),V(t,e.target,e.anchor,e.customElement),F()}var f;k(c)}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),"function"==typeof HTMLElement&&(G=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(n).filter(r);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,i){this[t]=i}disconnectedCallback(){l(this.$$.on_disconnect)}$destroy(){R(this,1),this.$destroy=o}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}$set(t){this.$$set&&!h(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class N{$destroy(){R(this,1),this.$destroy=o}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}$set(t){this.$$set&&!h(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function D(t){let e;return{c(){e=u("div"),b(e,"height",t[0].foot.width+"px"),b(e,"width",t[0].foot.length+"px"),b(e,"transform","translate("+t[1][0]+"px, "+t[1][1]+"px)  translate(-50%,-50%) rotate("+t[1][2]+"deg)"),g(e,"class","svelte-9lir44")},m(t,i){d(t,e,i)},p(t,[i]){1&i&&b(e,"height",t[0].foot.width+"px"),1&i&&b(e,"width",t[0].foot.length+"px"),2&i&&b(e,"transform","translate("+t[1][0]+"px, "+t[1][1]+"px)  translate(-50%,-50%) rotate("+t[1][2]+"deg)")},i:o,o,d(t){t&&p(e)}}}function J(t,e,i){let o,{player:n}=e;return t.$$set=t=>{"player"in t&&i(0,n=t.player)},t.$$.update=()=>{1&t.$$.dirty&&i(1,o=n.getFootPosition())},[n,o]}const U=class extends N{constructor(t){var e;super(),document.getElementById("svelte-9lir44-style")||((e=u("style")).id="svelte-9lir44-style",e.textContent="div.svelte-9lir44{background-color:darkgoldenrod;position:absolute;border-radius:15px}",c(document.head,e)),H(this,t,J,D,a,{player:0})}};function Q(t){let e,i,o,n,s;return n=new U({props:{player:t[0]}}),{c(){e=u("div"),o=y(),W(n.$$.fragment),g(e,"style",i="transform: translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%);\n            height: "+t[0].size+"px;\n            width: "+t[0].size+"px;\n            border-radius : "+t[0].size/2+"px;\n            background-color : "+t[0].color),g(e,"class","svelte-1ybaz7a")},m(t,i){d(t,e,i),d(t,o,i),V(n,t,i),s=!0},p(t,[o]){(!s||1&o&&i!==(i="transform: translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%);\n            height: "+t[0].size+"px;\n            width: "+t[0].size+"px;\n            border-radius : "+t[0].size/2+"px;\n            background-color : "+t[0].color))&&g(e,"style",i);const l={};1&o&&(l.player=t[0]),n.$set(l)},i(t){s||(L(n.$$.fragment,t),s=!0)},o(t){B(n.$$.fragment,t),s=!1},d(t){t&&p(e),t&&p(o),R(n,t)}}}function X(t,e,i){let{player:o}=e;return t.$$set=t=>{"player"in t&&i(0,o=t.player)},[o]}const Y=class extends N{constructor(t){var e;super(),document.getElementById("svelte-1ybaz7a-style")||((e=u("style")).id="svelte-1ybaz7a-style",e.textContent="div.svelte-1ybaz7a{position:absolute;border-radius:25px}",c(document.head,e)),H(this,t,X,Q,a,{player:0})}};function Z(t){let e;return{c(){e=u("div"),b(e,"height",t[0].size+"px"),b(e,"width",t[0].size+"px"),b(e,"border-radius",t[0].size/2+"px"),b(e,"transform","translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%)"),g(e,"class","svelte-1bhxjt8")},m(t,i){d(t,e,i)},p(t,[i]){1&i&&b(e,"height",t[0].size+"px"),1&i&&b(e,"width",t[0].size+"px"),1&i&&b(e,"border-radius",t[0].size/2+"px"),1&i&&b(e,"transform","translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%)")},i:o,o,d(t){t&&p(e)}}}function tt(t,e,i){let{data:o}=e;return t.$$set=t=>{"data"in t&&i(0,o=t.data)},[o]}const et=class extends N{constructor(t){var e;super(),document.getElementById("svelte-1bhxjt8-style")||((e=u("style")).id="svelte-1bhxjt8-style",e.textContent="div.svelte-1bhxjt8{position:absolute;background-color:palevioletred}",c(document.head,e)),H(this,t,tt,Z,a,{data:0})}};var it=i(768);function ot(t){let e,i;return{c(){e=u("div"),i=u("div"),g(i,"class","high-bar svelte-qypcyl"),b(i,"border-radius",t[1]),b(i,"transform","translate("+t[2]+"px, 0px)"),b(i,"height",t[0].barWidth+"px"),b(i,"width",t[0].width+t[0].barWidth/2+"px"),g(e,"class","interior svelte-qypcyl"),b(e,"height",t[0].height+"px"),b(e,"width",t[0].width+"px"),b(e,"transform","translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%)")},m(t,o){d(t,e,o),c(e,i)},p(t,[o]){2&o&&b(i,"border-radius",t[1]),4&o&&b(i,"transform","translate("+t[2]+"px, 0px)"),1&o&&b(i,"height",t[0].barWidth+"px"),1&o&&b(i,"width",t[0].width+t[0].barWidth/2+"px"),1&o&&b(e,"height",t[0].height+"px"),1&o&&b(e,"width",t[0].width+"px"),1&o&&b(e,"transform","translate("+t[0].position[0]+"px, "+t[0].position[1]+"px) translate(-50%, -50%)")},i:o,o,d(t){t&&p(e)}}}function nt(t,e,i){let o,n,s,{data:l}=e;return l.side==it.MF.left?(o=0,n="0px 10px 10px 0px",s=0):(n="10px 0px 0px 10px",s=-10),t.$$set=t=>{"data"in t&&i(0,l=t.data)},[l,n,s]}const st=class extends N{constructor(t){var e;super(),document.getElementById("svelte-qypcyl-style")||((e=u("style")).id="svelte-qypcyl-style",e.textContent="div.interior.svelte-qypcyl{background-color:greenyellow;position:absolute}div.high-bar.svelte-qypcyl{background-color:darkred;position:absolute}",c(document.head,e)),H(this,t,nt,ot,a,{data:0})}};function lt(t){let e,i,n,s,r,a,h,f,m,b,x,k,w,M,z,C,P,S,_,j,K;return{c(){e=u("div"),i=u("h5"),i.textContent="Keys",n=y(),s=u("div"),r=u("div"),a=u("p"),a.textContent="Left: ",h=u("input"),f=y(),m=u("div"),b=u("p"),b.textContent="Right: ",x=u("input"),k=y(),w=u("div"),M=u("p"),M.textContent="Jump: ",z=u("input"),C=y(),P=u("div"),S=u("p"),S.textContent="Kick: ",_=u("input"),g(a,"class","svelte-hsunnl"),g(h,"class","svelte-hsunnl"),g(r,"class","row svelte-hsunnl"),g(b,"class","svelte-hsunnl"),g(x,"class","svelte-hsunnl"),g(m,"class","row svelte-hsunnl"),g(M,"class","svelte-hsunnl"),g(z,"class","svelte-hsunnl"),g(w,"class","row svelte-hsunnl"),g(S,"class","svelte-hsunnl"),g(_,"class","svelte-hsunnl"),g(P,"class","row svelte-hsunnl"),g(s,"class","container svelte-hsunnl"),g(e,"class","main svelte-hsunnl")},m(o,l){d(o,e,l),c(e,i),c(e,n),c(e,s),c(s,r),c(r,a),c(r,h),$(h,t[0].left),c(s,f),c(s,m),c(m,b),c(m,x),$(x,t[0].right),c(s,k),c(s,w),c(w,M),c(w,z),$(z,t[0].jump),c(s,C),c(s,P),c(P,S),c(P,_),$(_,t[0].kick),j||(K=[v(h,"input",t[2]),v(x,"input",t[3]),v(z,"input",t[4]),v(_,"input",t[5])],j=!0)},p(t,[e]){1&e&&h.value!==t[0].left&&$(h,t[0].left),1&e&&x.value!==t[0].right&&$(x,t[0].right),1&e&&z.value!==t[0].jump&&$(z,t[0].jump),1&e&&_.value!==t[0].kick&&$(_,t[0].kick)},i:o,o,d(t){t&&p(e),j=!1,l(K)}}}function rt(t,e,i){let{defaultKey:o}=e,{key:n={left:o.left,right:o.right,jump:o.jump,kick:o.kick}}=e;return t.$$set=t=>{"defaultKey"in t&&i(1,o=t.defaultKey),"key"in t&&i(0,n=t.key)},[n,o,function(){n.left=this.value,i(0,n)},function(){n.right=this.value,i(0,n)},function(){n.jump=this.value,i(0,n)},function(){n.kick=this.value,i(0,n)}]}const at=class extends N{constructor(t){var e;super(),document.getElementById("svelte-hsunnl-style")||((e=u("style")).id="svelte-hsunnl-style",e.textContent="div.main.svelte-hsunnl{background-color:khaki;padding:20px}div.container.svelte-hsunnl{display:flex;flex-direction:column}div.row.svelte-hsunnl{display:flex;justify-content:space-between}input.svelte-hsunnl{width:80px}p.svelte-hsunnl{padding-top:9px;padding-bottom:9px;margin:0px}",c(document.head,e)),H(this,t,rt,lt,a,{defaultKey:1,key:0})}},{document:ht}=A;function ct(t,e,i){const o=t.slice();return o[17]=e[i],o}function dt(t){let e,i;return e=new Y({props:{player:t[17]}}),{c(){W(e.$$.fragment)},m(t,o){V(e,t,o),i=!0},p(t,i){const o={};1&i&&(o.player=t[17]),e.$set(o)},i(t){i||(L(e.$$.fragment,t),i=!0)},o(t){B(e.$$.fragment,t),i=!1},d(t){R(e,t)}}}function pt(t){let e,i,o,n,s,r,a,h,$,b,x,k,w,z,C,P,S,_,K,I,F,q,E,A=t[2][0]+"",G=t[2][1]+"";i=new st({props:{data:t[3][0]}}),n=new st({props:{data:t[3][1]}});let H=t[0],N=[];for(let e=0;e<H.length;e+=1)N[e]=dt(ct(t,H,e));const D=t=>B(N[t],1,1,(()=>{N[t]=null}));function J(e){t[5](e)}w=new et({props:{data:t[1]}});let U={defaultKey:it.pK.left.keybinding};function Q(e){t[6](e)}void 0!==t[0][0].keybinding&&(U.key=t[0][0].keybinding),P=new at({props:U}),M.push((()=>O(P,"key",J)));let X={defaultKey:it.pK.right.keybinding};return void 0!==t[0][1].keybinding&&(X.key=t[0][1].keybinding),K=new at({props:X}),M.push((()=>O(K,"key",Q))),{c(){e=u("div"),W(i.$$.fragment),o=y(),W(n.$$.fragment),s=y(),r=u("div"),a=u("p"),h=f(A),$=f("-"),b=f(G),x=y();for(let t=0;t<N.length;t+=1)N[t].c();k=y(),W(w.$$.fragment),z=y(),C=u("div"),W(P.$$.fragment),_=y(),W(K.$$.fragment),g(r,"class","score svelte-mb3l1a"),g(e,"class","mainScene svelte-mb3l1a"),g(C,"class","control svelte-mb3l1a")},m(l,p){d(l,e,p),V(i,e,null),c(e,o),V(n,e,null),c(e,s),c(e,r),c(r,a),c(a,h),c(a,$),c(a,b),c(e,x);for(let t=0;t<N.length;t+=1)N[t].m(e,null);c(e,k),V(w,e,null),d(l,z,p),d(l,C,p),V(P,C,null),c(C,_),V(K,C,null),F=!0,q||(E=[v(e,"click",t[4]("scene")),v(C,"click",t[4]("control"))],q=!0)},p(t,[i]){if((!F||4&i)&&A!==(A=t[2][0]+"")&&m(h,A),(!F||4&i)&&G!==(G=t[2][1]+"")&&m(b,G),1&i){let o;for(H=t[0],o=0;o<H.length;o+=1){const n=ct(t,H,o);N[o]?(N[o].p(n,i),L(N[o],1)):(N[o]=dt(n),N[o].c(),L(N[o],1),N[o].m(e,k))}for(T={r:0,c:[],p:T},o=H.length;o<N.length;o+=1)D(o);T.r||l(T.c),T=T.p}const o={};2&i&&(o.data=t[1]),w.$set(o);const n={};!S&&1&i&&(S=!0,n.key=t[0][0].keybinding,j((()=>S=!1))),P.$set(n);const s={};!I&&1&i&&(I=!0,s.key=t[0][1].keybinding,j((()=>I=!1))),K.$set(s)},i(t){if(!F){L(i.$$.fragment,t),L(n.$$.fragment,t);for(let t=0;t<H.length;t+=1)L(N[t]);L(w.$$.fragment,t),L(P.$$.fragment,t),L(K.$$.fragment,t),F=!0}},o(t){B(i.$$.fragment,t),B(n.$$.fragment,t),N=N.filter(Boolean);for(let t=0;t<N.length;t+=1)B(N[t]);B(w.$$.fragment,t),B(P.$$.fragment,t),B(K.$$.fragment,t),F=!1},d(t){t&&p(e),R(i),R(n),function(t,e){for(let i=0;i<t.length;i+=1)t[i]&&t[i].d(e)}(N,t),R(w),t&&p(z),t&&p(C),R(P),R(K),q=!1,l(E)}}}function ut(t,e,i){let o,n,s=new it.qR,l={},r=[new it.zk(it.MF.left),new it.zk(it.MF.right)],a=[new it._2(s,it.MF.left),new it._2(s,it.MF.right)],h=new it.af,c=[0,0],d=!1,p="scene";return document.onkeydown=function(t){if(t.repeat)t.preventDefault();else{n=t.key,"F12"!==n&&"F5"!==n&&"scene"===p&&t.preventDefault(),l[n]=!0;for(let t=0;t<s.nPlayers;t++)r[t].checkPressedKeys(l)}},document.onkeyup=function(t){let e=t.key;l[e]=!1;for(let t=0;t<s.nPlayers;t++)r[t].checkPressedKeys(l)},h=h,requestAnimationFrame((function t(e){o||(o=e);let n=(e-o)/1e3;o=e;for(let t=0;t<s.nPlayers;t++){let e=r[t];e.integrateTime(n,s.gravity),e.position[0]=Math.min(Math.max(e.position[0],e.size/2),s.scenarioSize[0]-e.size/2),e.position[1]>=s.scenarioSize[1]-e.size/2&&e.velocity[1]>0&&(e.velocity[1]=0,e.position[1]=s.scenarioSize[1]-e.size/2,e.touchingGround=!0)}r[0].computeCharacterCollision(r[1]),i(0,r),h.integrateTime(n,s.gravity),h.position[0]>s.scenarioSize[0]-h.size/2&&h.velocity[0]>0&&i(1,h.velocity[0]*=-1,h),h.position[0]<h.size/2&&h.velocity[0]<0&&i(1,h.velocity[0]*=-1,h),h.position[1]>s.scenarioSize[1]-h.size/2&&h.velocity[1]>0&&(h.velocity[1]<150?i(1,h.velocity[1]=0,h):i(1,h.velocity[1]*=-.8,h),i(1,h.position[1]=s.scenarioSize[1]-h.size/2,h)),h.position[1]<h.size/2&&h.velocity[1]<0&&i(1,h.velocity[1]*=-1,h),h.position[0]<a[0].position[0]+a[0].width/2&&h.position[1]>a[0].position[1]-a[0].height/2&&!d&&(d=!0,i(2,c[1]+=1,c),setTimeout((()=>{i(1,h.velocity=[0,0],h),i(1,h.position=[s.scenarioSize[0]/2,200],h),d=!1}),500)),h.position[0]>a[1].position[0]-a[1].width/2&&h.position[1]>a[1].position[1]-a[1].height/2&&!d&&(d=!0,i(2,c[0]+=1,c),setTimeout((()=>{i(1,h.velocity=[0,0],h),i(1,h.position=[s.scenarioSize[0]/2,200],h),d=!1}),500)),function(){for(let t=0;t<s.nPlayers;t++)r[t].computeBallCollision(h);for(let t=0;t<2;t++){let e=a[t];e.computeCircleCollision(h);for(let t=0;t<s.nPlayers;t++){let i=r[t];e.computeCircleCollision(i)}}}(),i(1,h),requestAnimationFrame(t)})),[r,h,c,a,function(t){return()=>{p=t}},function(e){t.$$.not_equal(r[0].keybinding,e)&&(r[0].keybinding=e,i(0,r))},function(e){t.$$.not_equal(r[1].keybinding,e)&&(r[1].keybinding=e,i(0,r))}]}const ft=class extends N{constructor(t){var e;super(),ht.getElementById("svelte-mb3l1a-style")||((e=u("style")).id="svelte-mb3l1a-style",e.textContent="div.mainScene.svelte-mb3l1a{background-color:darkblue;width:1000px;height:600px;margin:auto;-moz-user-select:none;-webkit-user-select:none;cursor:pointer;position:relative}div.score.svelte-mb3l1a{width:100%;margin:auto;display:flex;font-size:80px;color:white;position:absolute;justify-content:center}div.control.svelte-mb3l1a{display:flex;justify-content:space-between;margin:auto;width:1000px}",c(ht.head,e)),H(this,t,ut,pt,a,{})}}},768:(t,e)=>{var i;function o(t,e){return[t[0]*Math.cos(e*Math.PI/180)-t[1]*Math.sin(e*Math.PI/180),t[0]*Math.sin(e*Math.PI/180)+t[1]*Math.cos(e*Math.PI/180)]}e._2=e.zk=e.af=e.qR=e.pK=e.MF=void 0,function(t){t[t.left=0]="left",t[t.right=1]="right"}(i=e.MF||(e.MF={})),e.pK={left:{color:"orange",position:[200,500],keybinding:{jump:"s",left:"z",right:"c",kick:"b"}},right:{color:"cyan",position:[800,500],keybinding:{jump:"ArrowUp",left:"ArrowLeft",right:"ArrowRight",kick:"l"}}};e.qR=function(){this.scenarioSize=[1e3,600],this.gravity=900,this.nPlayers=2};var n=function(){function t(){this.position=[500,200],this.velocity=[0,0],this.size=50,this.dragCoefficient=3e-5}return t.prototype.integrateTime=function(t,e){this.position[0]+=this.velocity[0]*t,this.position[1]+=this.velocity[1]*t,this.velocity[1]+=e*t,this.velocity[0]-=this.dragCoefficient*this.velocity[0]*Math.abs(this.velocity[0]),this.velocity[1]-=this.dragCoefficient*this.velocity[1]*Math.abs(this.velocity[1])},t}();e.af=n;var s=function(){function t(t){t===i.left?(this.position=e.pK.left.position,this.keybinding=e.pK.left.keybinding,this.color=e.pK.left.color):(this.position=e.pK.right.position,this.keybinding=e.pK.right.keybinding,this.color=e.pK.right.color),this.side=t,this.velocity=[0,0],this.desiredVelocity=0,this.touchingGround=!1,this.size=70,this.maxSpeed=200,this.jumpSpeed=600,this.foot=new l(t)}return t.prototype.getFootPosition=function(){var t,e;this.side===i.left?(t=this.foot.theta-this.foot.alpha,e=this.foot.theta):(t=-this.foot.theta+this.foot.alpha+180,e=-this.foot.theta);var o=this.position,n=[(this.size/2-this.foot.width/2)*Math.sin(e*Math.PI/180),(this.size/2-this.foot.width/2)*Math.cos(e*Math.PI/180)],s=[(this.foot.length/2-this.foot.width/2)*Math.cos(t*Math.PI/180),-(this.foot.length/2-this.foot.width/2)*Math.sin(t*Math.PI/180)];return[o[0]+n[0]+s[0],o[1]+n[1]+s[1],-t]},t.prototype.computeBallCollision=function(t){this.computeHeadCollision(t),this.computeFootCollision(t)},t.prototype.computeHeadCollision=function(t){var e=t.position[0]-this.position[0],i=t.position[1]-this.position[1],o=t.velocity[0]-this.velocity[0],n=t.velocity[1]-this.velocity[1],s=[e,i],l=Math.pow(Math.pow(e,2)+Math.pow(i,2),.5),r=(o*s[0]+n*s[1])/l;l<=this.size/2+t.size/2&&r<0&&(t.velocity[0]-=2*r*s[0]/l,t.velocity[1]-=2*r*s[1]/l)},t.prototype.computeFootCollision=function(t){var e=this.getFootPosition(),i=e[0],n=e[1],s=e[2];s=-s;var l,r=[t.position[0]-i,t.position[1]-n],a=o(r,s),h=o(t.velocity,s),c=o(this.velocity,s);if(a[0]<=this.foot.rectLength/2&&a[0]>=-this.foot.rectLength/2){if(a[1]<=this.foot.width/2+t.size/2&&a[1]>=0)l=[0,1];else{if(!(a[1]>=-(this.foot.width/2+t.size/2)&&a[1]<=0))return;l=[0,-1]}var d=[(this.size/2-this.foot.width/2)*Math.sin(this.foot.alpha)+a[0],(this.size/2-this.foot.width/2)*Math.cos(this.foot.alpha)+a[1]*l[1]],p=(this.foot.thetadot,c[0],(-d[0]*this.foot.thetadot+c[1])*l[1]-h[1]*l[1]);if(p>0){var u=2*p,f=o(l,-s);t.velocity[0]+=u*f[0],t.velocity[1]+=u*f[1]}}else{var y;if(Math.pow(a[0]-this.foot.rectLength/2,2)+Math.pow(a[1],2)<=Math.pow(this.foot.width/2+t.size/2,2))y=[this.foot.rectLength/2,0];else{if(!(Math.pow(a[0]+this.foot.rectLength/2,2)+Math.pow(a[1],2)<=Math.pow(this.foot.width/2+t.size/2,2)))return;y=[-this.foot.rectLength/2,0]}var v=o(y,-s);v=[v[0]+i,v[1]+n],r=[t.position[0]-v[0],t.position[1]-v[1]];var g=[this.foot.thetadot*(v[1]-this.position[1])+this.velocity[0],-this.foot.thetadot*(v[0]-this.position[0])+this.velocity[1]],m=Math.pow(Math.pow(r[0],2)+Math.pow(r[1],2),.5),$=[r[0]/m,r[1]/m],b=[t.velocity[0]-g[0],t.velocity[1]-g[1]],x=b[0]*$[0]+b[1]*$[1];x<0&&(t.velocity[0]-=2*x*$[0],t.velocity[1]-=2*x*$[1])}},t.prototype.computeCharacterCollision=function(t){var e=this,i=[t.position[0]-this.position[0],t.position[1]-this.position[1]],o=Math.pow(Math.pow(i[0],2)+Math.pow(i[1],2),.5);if(!(o>this.size/2+t.size/2)){var n=[i[0]/o,i[1]/o];n[1]<0?(t.touchingGround=!0,setTimeout((function(){t.touchingGround=!1}),200)):n[1]>0&&(this.touchingGround=!0,setTimeout((function(){e.touchingGround=!1}),200));var s=[t.velocity[0]-this.velocity[0],t.velocity[1]-this.velocity[1]],l=s[0]*n[0]+s[1]*n[1];l>=0||(this.velocity[0]+=l*n[0],this.velocity[1]+=l*n[1],t.velocity[0]-=l*n[0],t.velocity[1]-=l*n[1])}},t.prototype.checkPressedKeys=function(t){t[this.keybinding.right]&&(this.velocity[0]=this.maxSpeed,this.desiredVelocity=this.maxSpeed),t[this.keybinding.left]&&(this.velocity[0]=-this.maxSpeed,this.desiredVelocity=-this.maxSpeed),t[this.keybinding.right]||t[this.keybinding.left]||(this.velocity[0]=0,this.desiredVelocity=0),t[this.keybinding.jump]&&this.touchingGround&&(this.velocity[1]=-this.jumpSpeed,this.touchingGround=!1),t[this.keybinding.kick]&&this.foot.theta<90&&(this.foot.theta=Math.min(this.foot.theta,90),this.side==i.left?this.foot.thetadot=2*Math.PI:this.foot.thetadot=-2*Math.PI),!t[this.keybinding.kick]&&this.foot.theta>0&&(this.foot.theta=Math.max(this.foot.theta,0),this.side==i.left?this.foot.thetadot=-4*Math.PI:this.foot.thetadot=4*Math.PI),(!t[this.keybinding.kick]&&0===this.foot.theta||t[this.keybinding.kick]&&90===this.foot.theta)&&(this.foot.thetadot=0)},t.prototype.integrateTime=function(t,e){this.position[0]+=this.velocity[0]*t,this.position[1]+=this.velocity[1]*t,this.side==i.left?this.foot.theta+=180*this.foot.thetadot/Math.PI*t:this.foot.theta-=180*this.foot.thetadot/Math.PI*t,this.foot.theta=Math.min(Math.max(this.foot.theta,0),90),this.velocity[1]+=e*t,this.desiredVelocity!==this.velocity[0]&&this.touchingGround&&(0===this.desiredVelocity?this.velocity[0]*=.6:this.velocity[0]=this.desiredVelocity)},t}();e.zk=s;var l=function(t){this.theta=0,this.thetadot=0,this.alpha=15,this.length=80,this.width=30,this.rectLength=this.length-this.width},r=function(){function t(t,e){this.width=80,this.height=200,this.barWidth=20,this.side=e,e===i.left?this.position=[this.width/2,t.scenarioSize[1]-this.height/2]:this.position=[t.scenarioSize[0]-this.width/2,t.scenarioSize[1]-this.height/2]}return t.prototype.computeCircleCollision=function(t){var e,o,n;o=this.width,this.width,e=[this.position[0],this.position[1]-this.height/2+this.barWidth/2],n=this.side===i.left?[this.position[0]+this.width/2,e[1]]:[this.position[0]-this.width/2,e[1]];var s=t.position[1]-e[1];if(t.position[0]<=e[0]+o/2&&t.position[0]>=e[0]-o/2){if(Math.abs(s)>t.size/2+this.barWidth/2)return;if(t.velocity[1]*s>=0)return;t.velocity[1]*=-1}else{var l=t.position[0]-n[0],r=Math.pow(Math.pow(l,2)+Math.pow(s,2),.5);if(!(r>t.size/2+this.barWidth/2)){var a=[l/r,s/r],h=t.velocity[0]*a[0]+t.velocity[1]*a[1];h<0&&(t.velocity[0]-=2*h*a[0],t.velocity[1]-=2*h*a[1])}}},t}();e._2=r}},e={};function i(o){var n=e[o];if(void 0!==n)return n.exports;var s=e[o]={exports:{}};return t[o](s,s.exports,i),s.exports}i.d=(t,e)=>{for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},new(i(632).default)({target:document.body,props:{name:"world"}})})();