(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3670],{38011:function(e,t,a){Promise.resolve().then(a.bind(a,11091))},11091:function(e,t,a){"use strict";a.r(t),a.d(t,{DebugContracts:function(){return ey}});var s=a(57437),n=a(2265),r=a(75070);let l=n.forwardRef(function({title:e,titleId:t,...a},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:s,"aria-labelledby":t},a),e?n.createElement("title",{id:t},e):null,n.createElement("path",{fillRule:"evenodd",d:"M2 3.75A.75.75 0 012.75 3h11.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zM2 7.5a.75.75 0 01.75-.75h6.365a.75.75 0 010 1.5H2.75A.75.75 0 012 7.5zM14 7a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02l-1.95-2.1v6.59a.75.75 0 01-1.5 0V9.66l-1.95 2.1a.75.75 0 11-1.1-1.02l3.25-3.5A.75.75 0 0114 7zM2 11.25a.75.75 0 01.75-.75H7A.75.75 0 017 12H2.75a.75.75 0 01-.75-.75z",clipRule:"evenodd"}))}),i=(e,t,a)=>e+"_"+((null==t?void 0:t.name)||"input_".concat(a,"_"))+"_"+t.internalType+"_"+t.type,c=e=>{try{return JSON.parse(e),!0}catch(e){return!1}},o=e=>{if(0===e.trim().length||e.startsWith("0"))return!1;try{return BigInt(e),!0}catch(e){return!1}},d=e=>"string"==typeof e?o(e)?BigInt(e):c(e)?d(JSON.parse(e)):e:Array.isArray(e)?e.map(e=>d(e)):"object"==typeof e&&null!==e?Object.entries(e).reduce((e,t)=>{let[a,s]=t;return e[a]=d(s),e},{}):"true"===e||"1"===e||"0x1"===e||"0x01"===e||"0x0001"===e||"false"!==e&&"0"!==e&&"0x0"!==e&&"0x00"!==e&&"0x0000"!==e&&e,m=e=>Object.keys(e).map(t=>d(e[t])),p=e=>{let t={};return e.inputs&&e.inputs.forEach((a,s)=>{t[i(e.name,a,s)]=""}),t},u=e=>{let t={};return 0===e.components.length||e.components.forEach((a,s)=>{t[i(e.name||"tuple",a,s)]=""}),t},x=e=>{let t={};return 0===e.components.length||e.components.forEach((a,s)=>{t[i("0_"+e.name,a,s)]=""}),t},h=e=>{if(e.type.startsWith("tuple[")){let t=(e.type.match(/\[\]/g)||[]).length;return{...e,components:f(e.components,t,{internalType:e.internalType||"struct",name:e.name})}}return e.components?{...e,components:e.components.map(e=>h(e))}:e},f=(e,t,a)=>1!==t&&e?[{internalType:"".concat(a.internalType||"struct").replace(/\[\]/g,"")+"[]".repeat(t-1),name:"".concat(a.name||"tuple"),type:"tuple".concat("[]".repeat(t-1)),components:f(e,t-1,a)}]:[...e],b=e=>({...e,inputs:e.inputs.map(e=>h(e))});var j=a(89952);let y=e=>{var t;let{abiTupleParameter:a,setParentForm:r,parentStateObjectKey:l}=e,[c,o]=(0,n.useState)(()=>u(a));return(0,n.useEffect)(()=>{let e=Object.values(c),t={};a.components.forEach((a,s)=>{t[a.name||"input_".concat(s,"_")]=e[s]}),r(e=>({...e,[l]:JSON.stringify(t,j.PH)}))},[JSON.stringify(c,j.PH)]),(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"collapse collapse-arrow bg-base-200 pl-4 py-1.5 border-2 border-secondary",children:[(0,s.jsx)("input",{type:"checkbox",className:"min-h-fit peer"}),(0,s.jsx)("div",{className:"collapse-title p-0 min-h-fit peer-checked:mb-2 text-primary-content/50",children:(0,s.jsx)("p",{className:"m-0 p-0 text-[1rem]",children:a.internalType})}),(0,s.jsx)("div",{className:"ml-3 flex-col space-y-4 border-secondary/80 border-l-2 pl-4 collapse-content",children:null==a?void 0:null===(t=a.components)||void 0===t?void 0:t.map((e,t)=>{let n=i(a.name||"tuple",e,t);return(0,s.jsx)(N,{setForm:o,form:c,stateObjectKey:n,paramType:e},n)})})]})})},g=e=>{let{abiTupleParameter:t,setParentForm:a,parentStateObjectKey:r}=e,[l,c]=(0,n.useState)(()=>x(t)),[o,d]=(0,n.useState)([t.components]),m=(t.type.match(/\[\]/g)||[]).length;return(0,n.useEffect)(()=>{let e=Object.keys(l).reduce((e,t)=>{let[a,...s]=t.split("_"),n=s.join("_");return e[a]||(e[a]={}),e[a][n]=l[t],e},{}),s=[];Object.keys(e).forEach(a=>{let n=Object.values(e[a]),r={};t.components.forEach((e,t)=>{r[e.name||"input_".concat(t,"_")]=n[t]}),s.push(r)}),m>1&&(s=s.map(e=>e[t.components[0].name||"tuple"])),a(e=>({...e,[r]:JSON.stringify(s,j.PH)}))},[JSON.stringify(l,j.PH)]),(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"collapse collapse-arrow bg-base-200 pl-4 py-1.5 border-2 border-secondary",children:[(0,s.jsx)("input",{type:"checkbox",className:"min-h-fit peer"}),(0,s.jsx)("div",{className:"collapse-title p-0 min-h-fit peer-checked:mb-1 text-primary-content/50",children:(0,s.jsx)("p",{className:"m-0 text-[1rem]",children:t.internalType})}),(0,s.jsxs)("div",{className:"ml-3 flex-col space-y-2 border-secondary/70 border-l-2 pl-4 collapse-content",children:[o.map((e,a)=>(0,s.jsxs)("div",{className:"space-y-1",children:[(0,s.jsx)("span",{className:"badge bg-base-300 badge-sm",children:m>1?"".concat(a):"tuple[".concat(a,"]")}),(0,s.jsx)("div",{className:"space-y-4",children:e.map((e,n)=>{let r=i("".concat(a,"_").concat(t.name||"tuple"),e,n);return(0,s.jsx)(N,{setForm:c,form:l,stateObjectKey:r,paramType:e},r)})})]},a)),(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{className:"btn btn-sm btn-secondary",onClick:()=>{d(e=>{let a=[...e,t.components];return c(e=>{let s={...e};return t.components.forEach((e,n)=>{s[i("".concat(a.length-1,"_").concat(t.name||"tuple"),e,n)]=""}),s}),a})},children:"+"}),o.length>0&&(0,s.jsx)("button",{className:"btn btn-sm btn-secondary",onClick:()=>{c(e=>{let a={...e};return t.components.forEach((e,s)=>{let n=i("".concat(o.length-1,"_").concat(t.name||"tuple"),e,s);delete a[n]}),a}),d(e=>e.slice(0,-1))},children:"-"})]})]})]})})};var v=a(13927);let N=e=>{let{setForm:t,form:a,stateObjectKey:n,paramType:r}=e,l={name:n,value:null==a?void 0:a[n],placeholder:r.name?"".concat(r.type," ").concat(r.name):r.type,onChange:e=>{t(t=>({...t,[n]:e}))}};return(0,s.jsxs)("div",{className:"flex flex-col gap-1.5 w-full",children:[(0,s.jsxs)("div",{className:"flex items-center ml-2",children:[r.name&&(0,s.jsx)("span",{className:"text-xs font-medium mr-2 leading-none",children:r.name}),(0,s.jsx)("span",{className:"block text-xs font-extralight leading-none",children:r.type})]}),(()=>{switch(r.type){case"address":return(0,s.jsx)(v.Jg,{...l});case"bytes32":return(0,s.jsx)(v.uP,{...l});case"bytes":return(0,s.jsx)(v.pe,{...l});case"string":return(0,s.jsx)(v.MA,{...l});case"tuple":return(0,s.jsx)(y,{setParentForm:t,parentForm:a,abiTupleParameter:r,parentStateObjectKey:n});default:if(r.type.includes("int")&&!r.type.includes("["))return(0,s.jsx)(v.dh,{...l,variant:r.type});if(r.type.startsWith("tuple["))return(0,s.jsx)(g,{setParentForm:t,parentForm:a,abiTupleParameter:r,parentStateObjectKey:n});return(0,s.jsx)(v.MA,{...l})}})()]})},w=e=>{let{deployedContractData:t}=e;if(!t)return null;let a=(t.abi||[]).filter(e=>"function"===e.type).filter(e=>("view"===e.stateMutability||"pure"===e.stateMutability)&&e.inputs.length>0).map(e=>{var a;return{fn:e,inheritedFrom:null===(a=null==t?void 0:t.inheritedFunctions)||void 0===a?void 0:a[e.name]}}).sort((e,t)=>t.inheritedFrom?t.inheritedFrom.localeCompare(e.inheritedFrom):1);return a.length?(0,s.jsx)(s.Fragment,{children:a.map(e=>{let{fn:a,inheritedFrom:n}=e;return(0,s.jsx)(X,{abi:t.abi,contractAddress:t.address,abiFunction:a,inheritedFrom:n},a.name)})}):(0,s.jsx)(s.Fragment,{children:"No read methods"})},F=n.forwardRef(function({title:e,titleId:t,...a},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:s,"aria-labelledby":t},a),e?n.createElement("title",{id:t},e):null,n.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"}))}),k=e=>{let{inheritedFrom:t}=e;return(0,s.jsx)(s.Fragment,{children:t&&(0,s.jsx)("span",{className:"tooltip tooltip-top tooltip-accent px-2 md:break-normal","data-tip":"Inherited from: ".concat(t),children:(0,s.jsx)(F,{className:"h-4 w-4","aria-hidden":"true"})})})};var E=a(87364),C=a(45008),O=a(79352),S=a(20387);let _=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"base";if(null==e)return"";if("bigint"==typeof e)return(0,s.jsx)(M,{value:e});if("string"==typeof e){if((0,E.U)(e))return(0,s.jsx)(v.kL,{address:e,size:t});if((0,C.v)(e))return e}return Array.isArray(e)?(0,s.jsx)(R,{values:e,size:t}):"object"==typeof e?(0,s.jsx)(T,{struct:e,size:t}):JSON.stringify(e,j.PH,2)},M=e=>{let{value:t}=e,[a,r]=(0,n.useState)(!1),l=Number(t);return l<=Number.MAX_SAFE_INTEGER&&l>=Number.MIN_SAFE_INTEGER?String(t):(0,s.jsxs)("div",{className:"flex items-baseline",children:[a?"Ξ"+(0,O.d)(t):String(t),(0,s.jsx)("span",{className:"tooltip tooltip-secondary font-sans ml-2","data-tip":a?"Multiply by 1e18":"Divide by 1e18",children:(0,s.jsx)("button",{className:"btn btn-ghost btn-circle btn-xs",onClick:()=>r(!a),children:(0,s.jsx)(S.Z,{className:"h-3 w-3 opacity-65"})})})]})},P=e=>{let{name:t,value:a,size:n,leftPad:r=!0}=e;return(0,s.jsxs)("div",{className:"flex flex-row items-baseline ".concat(r?"ml-4":""),children:[(0,s.jsxs)("span",{className:"text-gray-500 dark:text-gray-400 mr-2",children:[t,":"]}),(0,s.jsx)("span",{className:"text-base-content",children:_(a,n)})]})},R=e=>{let{values:t,size:a}=e;return(0,s.jsxs)("div",{className:"flex flex-col gap-y-1",children:[t.length?"array":"[]",t.map((e,t)=>(0,s.jsx)(P,{name:"[".concat(t,"]"),value:e,size:a},t))]})},T=e=>{let{struct:t,size:a}=e;return(0,s.jsxs)("div",{className:"flex flex-col gap-y-1",children:["struct",Object.entries(t).map(e=>{let[t,n]=e;return(0,s.jsx)(P,{name:t,value:n,size:a},t)})]})};var A=a(73613),z=a(21637),H=a(84855),D=a(6613),I=a(41012);function q(e={}){let{abi:t,address:a,functionName:s,query:n={}}=e,r=(0,I.Z)(e),l=(0,D.x)({config:r}),i=function(e,t={}){return{async queryFn({queryKey:a}){let s=t.abi;if(!s)throw Error("abi is required");let{address:n,functionName:r,scopeKey:l,...i}=a[1];if(!n)throw Error("address is required");if(!r)throw Error("functionName is required");let c=i.args;return(0,A.L)(e,{abi:s,address:n,functionName:r,args:c,...i})},queryKey:function(e={}){let{abi:t,...a}=e;return["readContract",(0,z.OP)(a)]}(t)}}(r,{...e,chainId:e.chainId??l}),c=!!(a&&t&&s&&(n.enabled??!0));return(0,H.aM)({...n,...i,enabled:c,structuralSharing:n.structuralSharing??z.if})}let K=n.forwardRef(function({title:e,titleId:t,...a},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:s,"aria-labelledby":t},a),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}))});var J=a(65044),W=a(63262),B=a(62973);let G=e=>{let{contractAddress:t,abiFunction:a,refreshDisplayVariables:r,abi:l,inheritedFrom:i}=e,{targetNetwork:c}=(0,W.p)(),{data:o,isFetching:d,refetch:m,error:p}=q({address:t,functionName:a.name,abi:l,chainId:c.id,query:{retry:!1}}),{showAnimation:u}=(0,J.en)(o);return(0,n.useEffect)(()=>{m()},[m,r]),(0,n.useEffect)(()=>{if(p){let e=(0,B.Hr)(p);B.t6.error(e)}},[p]),(0,s.jsxs)("div",{className:"space-y-1 pb-2",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("h3",{className:"font-medium text-lg mb-0 break-all",children:a.name}),(0,s.jsx)("button",{className:"btn btn-ghost btn-xs",onClick:async()=>await m(),children:d?(0,s.jsx)("span",{className:"loading loading-spinner loading-xs"}):(0,s.jsx)(K,{className:"h-3 w-3 cursor-pointer","aria-hidden":"true"})}),(0,s.jsx)(k,{inheritedFrom:i})]}),(0,s.jsx)("div",{className:"text-gray-500 font-medium flex flex-col items-start",children:(0,s.jsx)("div",{children:(0,s.jsx)("div",{className:"break-all block transition bg-transparent ".concat(u?"bg-warning rounded-sm animate-pulse-fast":""),children:_(o)})})})]})},L=e=>{let{refreshDisplayVariables:t,deployedContractData:a}=e;if(!a)return null;let n=a.abi.filter(e=>"function"===e.type).filter(e=>("view"===e.stateMutability||"pure"===e.stateMutability)&&0===e.inputs.length).map(e=>{var t;return{fn:e,inheritedFrom:null===(t=null==a?void 0:a.inheritedFunctions)||void 0===t?void 0:t[e.name]}}).sort((e,t)=>t.inheritedFrom?t.inheritedFrom.localeCompare(e.inheritedFrom):1);return n.length?(0,s.jsx)(s.Fragment,{children:n.map(e=>{let{fn:n,inheritedFrom:r}=e;return(0,s.jsx)(G,{abi:a.abi,abiFunction:n,contractAddress:a.address,refreshDisplayVariables:t,inheritedFrom:r},n.name)})}):(0,s.jsx)(s.Fragment,{children:"No contract variables"})},Z=e=>{let{onChange:t,deployedContractData:a}=e;if(!a)return null;let n=a.abi.filter(e=>"function"===e.type).filter(e=>"view"!==e.stateMutability&&"pure"!==e.stateMutability).map(e=>{var t;return{fn:e,inheritedFrom:null===(t=null==a?void 0:a.inheritedFunctions)||void 0===t?void 0:t[e.name]}}).sort((e,t)=>t.inheritedFrom?t.inheritedFrom.localeCompare(e.inheritedFrom):1);return n.length?(0,s.jsx)(s.Fragment,{children:n.map((e,n)=>{let{fn:r,inheritedFrom:l}=e;return(0,s.jsx)(ex,{abi:a.abi,abiFunction:r,onChange:t,contractAddress:a.address,inheritedFrom:l},"".concat(r.name,"-").concat(n,"}"))})}):(0,s.jsx)(s.Fragment,{children:"No write methods"})},V=e=>{let{contractName:t,className:a=""}=e,[r,l]=(0,n.useReducer)(e=>!e,!1),{targetNetwork:i}=(0,W.p)(),{data:c,isLoading:o}=(0,J.$z)(t),d=(0,J.x8)();return o?(0,s.jsx)("div",{className:"mt-14",children:(0,s.jsx)("span",{className:"loading loading-spinner loading-lg"})}):c?(0,s.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0 ".concat(a),children:(0,s.jsxs)("div",{className:"col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10",children:[(0,s.jsxs)("div",{className:"col-span-1 flex flex-col",children:[(0,s.jsxs)("div",{className:"bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4",children:[(0,s.jsx)("div",{className:"flex",children:(0,s.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,s.jsx)("span",{className:"font-bold",children:t}),(0,s.jsx)(v.kL,{address:c.address}),(0,s.jsxs)("div",{className:"flex gap-1 items-center",children:[(0,s.jsx)("span",{className:"font-bold text-sm",children:"Balance:"}),(0,s.jsx)(v.yo,{address:c.address,className:"px-0 h-1.5 min-h-[0.375rem]"})]})]})}),i&&(0,s.jsxs)("p",{className:"my-0 text-sm",children:[(0,s.jsx)("span",{className:"font-bold",children:"Network"}),":"," ",(0,s.jsx)("span",{style:{color:d},children:i.name})]})]}),(0,s.jsx)("div",{className:"bg-base-300 rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-base-300",children:(0,s.jsx)(L,{refreshDisplayVariables:r,deployedContractData:c})})]}),(0,s.jsxs)("div",{className:"col-span-1 lg:col-span-2 flex flex-col gap-6",children:[(0,s.jsx)("div",{className:"z-10",children:(0,s.jsxs)("div",{className:"bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative",children:[(0,s.jsx)("div",{className:"h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300",children:(0,s.jsx)("div",{className:"flex items-center justify-center space-x-2",children:(0,s.jsx)("p",{className:"my-0 text-sm",children:"Read"})})}),(0,s.jsx)("div",{className:"p-5 divide-y divide-base-300",children:(0,s.jsx)(w,{deployedContractData:c})})]})}),(0,s.jsx)("div",{className:"z-10",children:(0,s.jsxs)("div",{className:"bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative",children:[(0,s.jsx)("div",{className:"h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300",children:(0,s.jsx)("div",{className:"flex items-center justify-center space-x-2",children:(0,s.jsx)("p",{className:"my-0 text-sm",children:"Write"})})}),(0,s.jsx)("div",{className:"p-5 divide-y divide-base-300",children:(0,s.jsx)(Z,{deployedContractData:c,onChange:l})})]})})]})]})}):(0,s.jsx)("p",{className:"text-3xl mt-14",children:'No contract found by the name of "'.concat(t,'" on chain "').concat(i.name,'"!')})},X=e=>{let{contractAddress:t,abiFunction:a,inheritedFrom:r,abi:l}=e,[c,o]=(0,n.useState)(()=>p(a)),[d,u]=(0,n.useState)(),{targetNetwork:x}=(0,W.p)(),{isFetching:h,refetch:f,error:j}=q({address:t,functionName:a.name,abi:l,args:m(c),chainId:x.id,query:{enabled:!1,retry:!1}});(0,n.useEffect)(()=>{if(j){let e=(0,B.Hr)(j);B.t6.error(e)}},[j]);let y=b(a).inputs.map((e,t)=>{let n=i(a.name,e,t);return(0,s.jsx)(N,{setForm:e=>{u(void 0),o(e)},form:c,stateObjectKey:n,paramType:e},n)});return(0,s.jsxs)("div",{className:"flex flex-col gap-3 py-5 first:pt-0 last:pb-1",children:[(0,s.jsxs)("p",{className:"font-medium my-0 break-words",children:[a.name,(0,s.jsx)(k,{inheritedFrom:r})]}),y,(0,s.jsxs)("div",{className:"flex flex-col md:flex-row justify-between gap-2 flex-wrap",children:[(0,s.jsx)("div",{className:"flex-grow w-full md:max-w-[80%]",children:null!=d&&(0,s.jsxs)("div",{className:"bg-secondary rounded-3xl text-sm px-4 py-1.5 break-words overflow-auto",children:[(0,s.jsx)("p",{className:"font-bold m-0 mb-1",children:"Result:"}),(0,s.jsx)("pre",{className:"whitespace-pre-wrap break-words",children:_(d,"sm")})]})}),(0,s.jsxs)("button",{className:"btn btn-secondary btn-sm self-end md:self-start",onClick:async()=>{let{data:e}=await f();u(e)},disabled:h,children:[h&&(0,s.jsx)("span",{className:"loading loading-spinner loading-xs"}),"Read \uD83D\uDCE1"]})]})]})};var $=a(86781),U=a(49186),Q=a(36108);let Y=e=>{let{txResult:t}=e,[a,r]=(0,n.useState)(!1);return(0,s.jsxs)("div",{className:"flex text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-0",children:[(0,s.jsx)("div",{className:"mt-1 pl-2",children:a?(0,s.jsx)(U.Z,{className:"ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer","aria-hidden":"true"}):(0,s.jsx)($.CopyToClipboard,{text:JSON.stringify(t,j.PH,2),onCopy:()=>{r(!0),setTimeout(()=>{r(!1)},800)},children:(0,s.jsx)(Q.Z,{className:"ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer","aria-hidden":"true"})})}),(0,s.jsxs)("div",{className:"flex-wrap collapse collapse-arrow",children:[(0,s.jsx)("input",{type:"checkbox",className:"min-h-0 peer"}),(0,s.jsx)("div",{className:"collapse-title text-sm min-h-0 py-1.5 pl-1",children:(0,s.jsx)("strong",{children:"Transaction Receipt"})}),(0,s.jsx)("div",{className:"collapse-content overflow-auto bg-secondary rounded-t-none rounded-3xl !pl-0",children:(0,s.jsx)("pre",{className:"text-xs",children:Object.entries(t).map(e=>{let[t,a]=e;return(0,s.jsx)(P,{name:t,value:a,size:"xs",leftPad:!1},t)})})})]})]})};var ee=a(79037),et=a(23588),ea=a(23570),es=a(46981),en=a(23437),er=a(71660),el=a(9031);async function ei(e,t){let a;let{abi:s,chainId:n,connector:r,...l}=t;a=t.account?t.account:(await (0,er.e)(e,{chainId:n,connector:r})).account;let i=e.getClient({chainId:n}),c=(0,es.s)(i,el.a,"simulateContract"),{result:o,request:d}=await c({...l,abi:s,account:a});return{chainId:i.chain.id,result:o,request:{__mode:"prepared",...d,chainId:n}}}async function ec(e,t){let a,s;let{account:n,chainId:r,connector:l,__mode:i,...c}=t;a="object"==typeof n&&"local"===n.type?e.getClient({chainId:r}):await (0,er.e)(e,{account:n,chainId:r,connector:l});let{connector:o}=(0,en.D)(e);if("prepared"===i||o?.supportsSimulation)s=c;else{let{request:t}=await ei(e,{...c,account:n,chainId:r});s=t}let d=(0,es.s)(a,ea.n,"writeContract");return await d({...s,...n?{account:n}:{},chain:r?{id:r}:null})}var eo=a(30838),ed=a(31764),em=a(37498),ep=a(98873);async function eu(e,t){let{chainId:a,timeout:s=0,...n}=t,r=e.getClient({chainId:a}),l=(0,es.s)(r,ed.e,"waitForTransactionReceipt"),i=await l({...n,timeout:s});if("reverted"===i.status){let e=(0,es.s)(r,em.f,"getTransaction"),t=await e({hash:i.transactionHash}),a=(0,es.s)(r,ep.R,"call"),s=await a({...t,gasPrice:"eip1559"!==t.type?t.gasPrice:void 0,maxFeePerGas:"eip1559"===t.type?t.maxFeePerGas:void 0,maxPriorityFeePerGas:"eip1559"===t.type?t.maxPriorityFeePerGas:void 0});throw Error(s?.data?(0,eo.rR)(`0x${s.data.substring(138)}`):"unknown reason")}return{...i,chainId:r.chain.id}}let ex=e=>{let{abi:t,abiFunction:a,onChange:r,contractAddress:l,inheritedFrom:c}=e,[o,d]=(0,n.useState)(()=>p(a)),[u,x]=(0,n.useState)(""),{chain:h}=(0,ee.m)(),f=(0,J.XO)(),{targetNetwork:j}=(0,W.p)(),y=!h||(null==h?void 0:h.id)!==j.id,{data:g,isPending:w,writeContractAsync:F}=function(e={}){var t;let{mutation:a}=e,s=(t=(0,I.Z)(e),{mutationFn:e=>ec(t,e),mutationKey:["writeContract"]}),{mutate:n,mutateAsync:r,...l}=(0,et.D)({...a,...s});return{...l,writeContract:n,writeContractAsync:r}}(),E=async()=>{if(F)try{await f(()=>F({address:l,functionName:a.name,abi:t,args:m(o),value:BigInt(u)})),r()}catch(e){console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error",e)}},[C,O]=(0,n.useState)(),{data:S}=function(e={}){let{hash:t,query:a={}}=e,s=(0,I.Z)(e),n=(0,D.x)({config:s}),r=function(e,t={}){return{async queryFn({queryKey:a}){let{hash:s,...n}=a[1];if(!s)throw Error("hash is required");return eu(e,{...n,onReplaced:t.onReplaced,hash:s})},queryKey:function(e={}){let{onReplaced:t,...a}=e;return["waitForTransactionReceipt",(0,z.OP)(a)]}(t)}}(s,{...e,chainId:e.chainId??n}),l=!!(t&&(a.enabled??!0));return(0,H.aM)({...a,...r,enabled:l})}({hash:g});(0,n.useEffect)(()=>{O(S)},[S]);let _=b(a).inputs.map((e,t)=>{let n=i(a.name,e,t);return(0,s.jsx)(N,{setForm:e=>{O(void 0),d(e)},form:o,stateObjectKey:n,paramType:e},n)}),M=0===_.length&&"payable"!==a.stateMutability;return(0,s.jsxs)("div",{className:"py-5 space-y-3 first:pt-0 last:pb-1",children:[(0,s.jsxs)("div",{className:"flex gap-3 ".concat(M?"flex-row justify-between items-center":"flex-col"),children:[(0,s.jsxs)("p",{className:"font-medium my-0 break-words",children:[a.name,(0,s.jsx)(k,{inheritedFrom:c})]}),_,"payable"===a.stateMutability?(0,s.jsxs)("div",{className:"flex flex-col gap-1.5 w-full",children:[(0,s.jsxs)("div",{className:"flex items-center ml-2",children:[(0,s.jsx)("span",{className:"text-xs font-medium mr-2 leading-none",children:"payable value"}),(0,s.jsx)("span",{className:"block text-xs font-extralight leading-none",children:"wei"})]}),(0,s.jsx)(v.dh,{value:u,onChange:e=>{O(void 0),x(e)},placeholder:"value (wei)"})]}):null,(0,s.jsxs)("div",{className:"flex justify-between gap-2",children:[!M&&(0,s.jsx)("div",{className:"flex-grow basis-0",children:C?(0,s.jsx)(Y,{txResult:C}):null}),(0,s.jsx)("div",{className:"flex ".concat(y&&"tooltip before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"),"data-tip":"".concat(y&&"Wallet not connected or in the wrong network"),children:(0,s.jsxs)("button",{className:"btn btn-secondary btn-sm",disabled:y||w,onClick:E,children:[w&&(0,s.jsx)("span",{className:"loading loading-spinner loading-xs"}),"Send \uD83D\uDCB8"]})})]})]}),M&&S?(0,s.jsx)("div",{className:"flex-grow basis-0",children:(0,s.jsx)(Y,{txResult:S})}):null]})};var eh=a(6103),ef=a(62209);let eb=(null===ef.r||void 0===ef.r?void 0:ef.r[eh.default.targetNetworks[0].id])||{},ej=Object.keys(eb);function ey(){let[e,t]=(0,r._)("scaffoldEth2.selectedContract",ej[0],{initializeWithValue:!1});return(0,n.useEffect)(()=>{ej.includes(e)||t(ej[0])},[e,t]),(0,s.jsx)("div",{className:"flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center",children:0===ej.length?(0,s.jsx)("p",{className:"text-3xl mt-14",children:"No contracts found!"}):(0,s.jsxs)(s.Fragment,{children:[ej.length>1&&(0,s.jsx)("div",{className:"flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap",children:ej.map(a=>(0,s.jsxs)("button",{className:"btn btn-secondary btn-sm font-light hover:border-transparent ".concat(a===e?"bg-base-300 hover:bg-base-300 no-animation":"bg-base-100 hover:bg-secondary"),onClick:()=>t(a),children:[a,eb[a].external&&(0,s.jsx)("span",{className:"tooltip tooltip-top tooltip-accent","data-tip":"External contract",children:(0,s.jsx)(l,{className:"h-4 w-4 cursor-pointer"})})]},a))}),ej.map(t=>(0,s.jsx)(V,{contractName:t,className:t===e?"":"hidden"},t))]})})}},89952:function(e,t,a){"use strict";a.d(t,{PH:function(){return s}});let s=(e,t)=>"bigint"==typeof t?t.toString():t}},function(e){e.O(0,[9472,7549,2395,4087,8187,2971,8822,1744],function(){return e(e.s=38011)}),_N_E=e.O()}]);