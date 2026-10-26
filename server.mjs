import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {redirects} from './content/redirects.mjs';
const root=process.cwd(), port=Number(process.env.PORT||4173);
const types={'.ico':'image/x-icon','.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff'); res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 const url=new URL(req.url,'http://localhost');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{res.writeHead(400);return res.end();}
 if(pathname.includes('..')||pathname.startsWith('/data')||pathname.startsWith('/.')){res.writeHead(404);return res.end('Not found');}
 const normalized=pathname.replace(/\/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'')||'/';
 const redirect=redirects[normalized]||(normalized!==pathname?normalized:null);
 if(redirect&&!redirect.startsWith('//')){res.writeHead(301,{Location:redirect+url.search});return res.end();}
 let file=pathname==='/'?'index.html':pathname.slice(1);if(!path.extname(file))file+='/index.html';
 if(!Object.hasOwn(types,path.extname(file))){res.writeHead(404);return res.end('Not found');}
 try{const content=await readFile(path.join(root,file));res.setHeader('Content-Type',types[path.extname(file)]);res.end(req.method==='HEAD'?undefined:content);}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end('<h1>Page not found</h1><a href="/">Return to Müve</a>');}
}).listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Müve ready at http://localhost:${port}`));
