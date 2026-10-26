// Shared by the built Sites Worker and its routing tests; no Node runtime needed.
export function createHandler(redirects){
 return {
  async fetch(request,env){
   const url=new URL(request.url);
   if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
   let pathname;
   try{pathname=decodeURIComponent(url.pathname);}catch{return new Response('Invalid URL',{status:400});}
   const canonical=pathname.replace(/\/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'')||'/';
   const destination=redirects[canonical]||(canonical!==pathname?canonical:null);
   if(destination||url.hostname==='www.muve.ca'){
    url.pathname=destination||pathname;
    if(url.hostname==='www.muve.ca')url.hostname='muve.ca';
    return Response.redirect(url.href,301);
   }
   if(pathname.startsWith('/data/')||pathname.startsWith('/.')||pathname.includes('..'))return new Response('Not found',{status:404});
   const asset=await env.ASSETS.fetch(request);
   const headers=new Headers(asset.headers);
   headers.set('X-Content-Type-Options','nosniff');
   headers.set('Referrer-Policy','strict-origin-when-cross-origin');
   if(asset.ok&&pathname.endsWith('.webp'))headers.set('Content-Type','image/webp');
   return new Response(request.method==='HEAD'?null:asset.body,{status:asset.status,headers});
  }
 };
}
