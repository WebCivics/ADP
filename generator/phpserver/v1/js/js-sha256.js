/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/js-sha256@0.11.0/src/sha256.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2024
 * @license MIT
 */
!function(){"use strict";var t="input is invalid type",i="object"==typeof window,h=i?window:{};h.JS_SHA256_NO_WINDOW&&(i=!1);var r=!i&&"object"==typeof self,s=!h.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s?h=global:r&&(h=self);var e=!h.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,n="function"==typeof define&&define.amd,o=!h.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,a="0123456789abcdef".split(""),f=[-2147483648,8388608,32768,128],u=[24,16,8,0],c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],y=["hex","array","digest","arrayBuffer"],p=[];!h.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!o||!h.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var l=function(t,i){return function(h){return new _(i,!0).update(h)[t]()}},d=function(t){var i=l("hex",t);s&&(i=A(i,t)),i.create=function(){return new _(t)},i.update=function(t){return i.create().update(t)};for(var h=0;h<y.length;++h){var r=y[h];i[r]=l(r,t)}return i},A=function(i,r){var s,e=require("crypto"),n=require("buffer").Buffer,o=r?"sha224":"sha256";s=n.from&&!h.JS_SHA256_NO_BUFFER_FROM?n.from:function(t){return new n(t)};return function(h){if("string"==typeof h)return e.createHash(o).update(h,"utf8").digest("hex");if(null==h)throw new Error(t);return h.constructor===ArrayBuffer&&(h=new Uint8Array(h)),Array.isArray(h)||ArrayBuffer.isView(h)||h.constructor===n?e.createHash(o).update(s(h)).digest("hex"):i(h)}},w=function(t,i){return function(h,r){return new v(h,i,!0).update(r)[t]()}},b=function(t){var i=w("hex",t);i.create=function(i){return new v(i,t)},i.update=function(t,h){return i.create(t).update(h)};for(var h=0;h<y.length;++h){var r=y[h];i[r]=w(r,t)}return i};function _(t,i){i?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function v(i,h,r){var s,e=typeof i;if("string"===e){var n,a=[],f=i.length,u=0;for(s=0;s<f;++s)(n=i.charCodeAt(s))<128?a[u++]=n:n<2048?(a[u++]=192|n>>>6,a[u++]=128|63&n):n<55296||n>=57344?(a[u++]=224|n>>>12,a[u++]=128|n>>>6&63,a[u++]=128|63&n):(n=65536+((1023&n)<<10|1023&i.charCodeAt(++s)),a[u++]=240|n>>>18,a[u++]=128|n>>>12&63,a[u++]=128|n>>>6&63,a[u++]=128|63&n);i=a}else{if("object"!==e)throw new Error(t);if(null===i)throw new Error(t);if(o&&i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(!(Array.isArray(i)||o&&ArrayBuffer.isView(i)))throw new Error(t)}i.length>64&&(i=new _(h,!0).update(i).array());var c=[],y=[];for(s=0;s<64;++s){var p=i[s]||0;c[s]=92^p,y[s]=54^p}_.call(this,h,r),this.update(y),this.oKeyPad=c,this.inner=!0,this.sharedMemory=r}_.prototype.update=function(i){if(!this.finalized){var h,r=typeof i;if("string"!==r){if("object"!==r)throw new Error(t);if(null===i)throw new Error(t);if(o&&i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(!(Array.isArray(i)||o&&ArrayBuffer.isView(i)))throw new Error(t);h=!0}for(var s,e,n=0,a=i.length,f=this.blocks;n<a;){if(this.hashed&&(this.hashed=!1,f[0]=this.block,this.block=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),h)for(e=this.start;n<a&&e<64;++n)f[e>>>2]|=i[n]<<u[3&e++];else for(e=this.start;n<a&&e<64;++n)(s=i.charCodeAt(n))<128?f[e>>>2]|=s<<u[3&e++]:s<2048?(f[e>>>2]|=(192|s>>>6)<<u[3&e++],f[e>>>2]|=(128|63&s)<<u[3&e++]):s<55296||s>=57344?(f[e>>>2]|=(224|s>>>12)<<u[3&e++],f[e>>>2]|=(128|s>>>6&63)<<u[3&e++],f[e>>>2]|=(128|63&s)<<u[3&e++]):(s=65536+((1023&s)<<10|1023&i.charCodeAt(++n)),f[e>>>2]|=(240|s>>>18)<<u[3&e++],f[e>>>2]|=(128|s>>>12&63)<<u[3&e++],f[e>>>2]|=(128|s>>>6&63)<<u[3&e++],f[e>>>2]|=(128|63&s)<<u[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=f[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},_.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>>2]|=f[3&i],this.block=t[16],i>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},_.prototype.hash=function(){var t,i,h,r,s,e,n,o,a,f=this.h0,u=this.h1,y=this.h2,p=this.h3,l=this.h4,d=this.h5,A=this.h6,w=this.h7,b=this.blocks;for(t=16;t<64;++t)i=((s=b[t-15])>>>7|s<<25)^(s>>>18|s<<14)^s>>>3,h=((s=b[t-2])>>>17|s<<15)^(s>>>19|s<<13)^s>>>10,b[t]=b[t-16]+i+b[t-7]+h<<0;for(a=u&y,t=0;t<64;t+=4)this.first?(this.is224?(e=300032,w=(s=b[0]-1413257819)-150054599<<0,p=s+24177077<<0):(e=704751109,w=(s=b[0]-210244248)-1521486534<<0,p=s+143694565<<0),this.first=!1):(i=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(e=f&u)^f&y^a,w=p+(s=w+(h=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&d^~l&A)+c[t]+b[t])<<0,p=s+(i+r)<<0),i=(p>>>2|p<<30)^(p>>>13|p<<19)^(p>>>22|p<<10),r=(n=p&f)^p&u^e,A=y+(s=A+(h=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7))+(w&l^~w&d)+c[t+1]+b[t+1])<<0,i=((y=s+(i+r)<<0)>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),r=(o=y&p)^y&f^n,d=u+(s=d+(h=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))+(A&w^~A&l)+c[t+2]+b[t+2])<<0,i=((u=s+(i+r)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(a=u&y)^u&p^o,l=f+(s=l+(h=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&A^~d&w)+c[t+3]+b[t+3])<<0,f=s+(i+r)<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+f<<0,this.h1=this.h1+u<<0,this.h2=this.h2+y<<0,this.h3=this.h3+p<<0,this.h4=this.h4+l<<0,this.h5=this.h5+d<<0,this.h6=this.h6+A<<0,this.h7=this.h7+w<<0},_.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,f=a[t>>>28&15]+a[t>>>24&15]+a[t>>>20&15]+a[t>>>16&15]+a[t>>>12&15]+a[t>>>8&15]+a[t>>>4&15]+a[15&t]+a[i>>>28&15]+a[i>>>24&15]+a[i>>>20&15]+a[i>>>16&15]+a[i>>>12&15]+a[i>>>8&15]+a[i>>>4&15]+a[15&i]+a[h>>>28&15]+a[h>>>24&15]+a[h>>>20&15]+a[h>>>16&15]+a[h>>>12&15]+a[h>>>8&15]+a[h>>>4&15]+a[15&h]+a[r>>>28&15]+a[r>>>24&15]+a[r>>>20&15]+a[r>>>16&15]+a[r>>>12&15]+a[r>>>8&15]+a[r>>>4&15]+a[15&r]+a[s>>>28&15]+a[s>>>24&15]+a[s>>>20&15]+a[s>>>16&15]+a[s>>>12&15]+a[s>>>8&15]+a[s>>>4&15]+a[15&s]+a[e>>>28&15]+a[e>>>24&15]+a[e>>>20&15]+a[e>>>16&15]+a[e>>>12&15]+a[e>>>8&15]+a[e>>>4&15]+a[15&e]+a[n>>>28&15]+a[n>>>24&15]+a[n>>>20&15]+a[n>>>16&15]+a[n>>>12&15]+a[n>>>8&15]+a[n>>>4&15]+a[15&n];return this.is224||(f+=a[o>>>28&15]+a[o>>>24&15]+a[o>>>20&15]+a[o>>>16&15]+a[o>>>12&15]+a[o>>>8&15]+a[o>>>4&15]+a[15&o]),f},_.prototype.toString=_.prototype.hex,_.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=[t>>>24&255,t>>>16&255,t>>>8&255,255&t,i>>>24&255,i>>>16&255,i>>>8&255,255&i,h>>>24&255,h>>>16&255,h>>>8&255,255&h,r>>>24&255,r>>>16&255,r>>>8&255,255&r,s>>>24&255,s>>>16&255,s>>>8&255,255&s,e>>>24&255,e>>>16&255,e>>>8&255,255&e,n>>>24&255,n>>>16&255,n>>>8&255,255&n];return this.is224||a.push(o>>>24&255,o>>>16&255,o>>>8&255,255&o),a},_.prototype.array=_.prototype.digest,_.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},v.prototype=new _,v.prototype.finalize=function(){if(_.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();_.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),_.prototype.finalize.call(this)}};var B=d();B.sha256=B,B.sha224=d(!0),B.sha256.hmac=b(),B.sha224.hmac=b(!0),e?module.exports=B:(h.sha256=B.sha256,h.sha224=B.sha224,n&&define((function(){return B})))}();
//# sourceMappingURL=/sm/47eef3eea27a0ec014f5ff25b997de581c3ce412a0f825bfd3ea80a3a439a248.map