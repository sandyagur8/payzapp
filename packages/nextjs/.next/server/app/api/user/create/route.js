"use strict";(()=>{var e={};e.id=1772,e.ids=[1772],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},59796:e=>{e.exports=require("zlib")},97434:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>I,originalPathname:()=>q,patchFetch:()=>j,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>x,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>m});var s={};t.r(s),t.d(s,{GET:()=>c,POST:()=>p});var o=t(95419),a=t(69108),i=t(99678),u=t(78070),n=t(2499);async function p(e){let{email:r,walletAddress:t,phoneNumber:s,isMerchant:o,name:a}=await e.json();if(!r||!t||!s)return u.Z.json({error:"Missing required fields"},{status:400});try{let{data:e,error:i}=await n.O.from("users").insert({email:r,wallet_address:t,phone_number:s,is_merchant:o,name:a}).select();if(i)throw i;return u.Z.json(e[0],{status:200})}catch(e){return console.error("Error creating/updating user:",e),u.Z.json({error:"Internal server error"},{status:500})}}async function c(){return u.Z.json({error:"Method not allowed"},{status:405})}let l=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/user/create/route",pathname:"/api/user/create",filename:"route",bundlePath:"app/api/user/create/route"},resolvedPagePath:"/home/sandyagur/Desktop/payzapp/packages/nextjs/app/api/user/create/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:h,serverHooks:x,headerHooks:I,staticGenerationBailout:m}=l,q="/api/user/create/route";function j(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:h})}},2499:(e,r,t)=>{t.d(r,{O:()=>s});let s=(0,t(37861).eI)("https://vfxfcdlgnqcoeaohyqlv.supabase.co/","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGZjZGxnbnFjb2Vhb2h5cWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTYwOTMsImV4cCI6MjA0MDI3MjA5M30.YPSDzisgs9O7xlas2Oer_T_fzcVzDCbEjj1virVPqMI")}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[1638,6206,7861],()=>t(97434));module.exports=s})();