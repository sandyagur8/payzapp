(()=>{var e={};e.id=5180,e.ids=[5180],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14752:e=>{"use strict";e.exports=require("pino-pretty")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},98188:e=>{"use strict";e.exports=require("module")},41808:e=>{"use strict";e.exports=require("net")},6005:e=>{"use strict";e.exports=require("node:crypto")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},73128:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>d,originalPathname:()=>p,pages:()=>u,routeModule:()=>x,tree:()=>l});var s=r(50482),a=r(69108),o=r(62563),n=r.n(o),i=r(68300),c={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>i[e]);r.d(t,c);let l=["",{children:["blockexplorer",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,10890)),"/home/sandyagur/Desktop/payzapp/packages/nextjs/app/blockexplorer/page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,53532)),"/home/sandyagur/Desktop/payzapp/packages/nextjs/app/blockexplorer/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,47436)),"/home/sandyagur/Desktop/payzapp/packages/nextjs/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],u=["/home/sandyagur/Desktop/payzapp/packages/nextjs/app/blockexplorer/page.tsx"],p="/blockexplorer/page",d={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/blockexplorer/page",pathname:"/blockexplorer",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},70641:(e,t,r)=>{Promise.resolve().then(r.bind(r,61369))},61369:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var s=r(95344),a=r(3729),o=r(22254),n=r(46071),i=r(9728),c=r(28655),l=r(63813);let u=()=>{let[e,t]=(0,a.useState)(""),r=(0,o.useRouter)(),u=(0,l.t)({chainId:c.c.id}),p=async t=>{if(t.preventDefault(),(0,n.v)(e))try{if(await u?.getTransaction({hash:e})){r.push(`/blockexplorer/transaction/${e}`);return}}catch(e){console.error("Failed to fetch transaction:",e)}if((0,i.U)(e)){r.push(`/blockexplorer/address/${e}`);return}};return(0,s.jsxs)("form",{onSubmit:p,className:"flex items-center justify-end mb-5 space-x-3 mx-5",children:[s.jsx("input",{className:"border-primary bg-base-100 text-base-content p-2 mr-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent",type:"text",value:e,placeholder:"Search by hash or address",onChange:e=>t(e.target.value)}),s.jsx("button",{className:"btn btn-sm btn-primary",type:"submit",children:"Search"})]})};r(51923),r(68012),r(4276),r(62970);var p=r(8946),d=r(11704),x=r(80502),m=r(29759),b=r(57738);let h=()=>{let{blocks:e,transactionReceipts:t,currentPage:r,totalBlocks:o,setCurrentPage:n,error:i}=(0,x.lp)(),{targetNetwork:l}=(0,m.p)(),[h,g]=(0,a.useState)(!0),[f,y]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{l.id!==c.c.id&&g(!1)},[l.id]),(0,a.useEffect)(()=>{l.id===c.c.id&&i&&y(!0)},[l.id,i]),(0,a.useEffect)(()=>{h||b.t6.error((0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{className:"font-bold mt-0 mb-1",children:[s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:" targeNetwork "})," is not localhost"]}),(0,s.jsxs)("p",{className:"m-0",children:["- You are on ",s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:l.name})," .This block explorer is only for ",s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:"localhost"}),"."]}),(0,s.jsxs)("p",{className:"mt-1 break-normal",children:["- You can use"," ",s.jsx("a",{className:"text-accent",href:l.blockExplorers?.default.url,children:l.blockExplorers?.default.name})," ","instead"]})]}))},[h,l.blockExplorers?.default.name,l.blockExplorers?.default.url,l.name]),(0,a.useEffect)(()=>{f&&b.t6.error((0,s.jsxs)(s.Fragment,{children:[s.jsx("p",{className:"font-bold mt-0 mb-1",children:"Cannot connect to local provider"}),(0,s.jsxs)("p",{className:"m-0",children:["- Did you forget to run ",s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:"yarn chain"})," ?"]}),(0,s.jsxs)("p",{className:"mt-1 break-normal",children:["- Or you can change ",s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:"targetNetwork"})," in"," ",s.jsx("code",{className:"italic bg-base-300 text-base font-bold",children:"scaffold.config.ts"})]})]}))},[f]),(0,s.jsxs)("div",{className:"container mx-auto my-10",children:[s.jsx(u,{}),s.jsx(d.g,{blocks:e,transactionReceipts:t}),s.jsx(p.E,{currentPage:r,totalItems:Number(o),setCurrentPage:n})]})}},10890:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>a,default:()=>n});let s=(0,r(86843).createProxy)(String.raw`/home/sandyagur/Desktop/payzapp/packages/nextjs/app/blockexplorer/page.tsx`),{__esModule:a,$$typeof:o}=s,n=s.default}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,1658,7878,1934],()=>r(73128));module.exports=s})();