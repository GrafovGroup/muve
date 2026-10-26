import {faviconLinks} from '../content/favicon.mjs';
import {brandLogo,brandVersion} from '../content/brand.mjs';
import {copyFile,mkdir,readdir,readFile,rm,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHandler} from '../sites-worker.mjs';
import '../build.mjs';

// Publish only generated public content; never copy the project or enquiry records.
const output=path.resolve('dist/client');
await rm(path.resolve('dist'),{recursive:true,force:true});
await mkdir(output,{recursive:true});
const manifest=JSON.parse(await readFile('.generated-pages.json','utf8'));
for(const route of manifest.pages){
 // Flat HTML assets keep the existing extensionless, slash-free canonical URLs.
 const destination=path.join(output,route?route+'.html':'index.html');
 await mkdir(path.dirname(destination),{recursive:true});
 await copyFile((route?route+'/':'')+'index.html',destination);
}
async function copyAssets(directory){
 for(const item of await readdir(directory,{withFileTypes:true})){
  const file=path.join(directory,item.name);
  if(item.isDirectory())await copyAssets(file);
  else if(item.isFile()&&/\.(css|js|svg|webp|png|jpg|jpeg|woff2?)$/.test(item.name)){
   await mkdir(path.dirname(path.join(output,file)),{recursive:true});
   await copyFile(file,path.join(output,file));
  }
 }
}
await copyAssets('assets');
for(const file of ['robots.txt','sitemap.xml','favicon.ico'])await copyFile(file,path.join(output,file));
await writeFile(path.join(output,'404.html'),`<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Müve</title>${faviconLinks}<link rel="stylesheet" href="/assets/style.css?v=${brandVersion}-services-2-layout-1-header-2-canada-1"></head><body><main class="wrap section"><a class="logo" href="/" aria-label="Müve home">${brandLogo}</a><div class="inner-hero"><h1>Let’s get you moving.</h1><p>We couldn’t find that page. Explore our moving services or tell us about your project.</p><a class="btn" href="/services">Explore our services ↗</a></div></main></body></html>`);
await mkdir('dist/server',{recursive:true});
await writeFile('dist/server/index.js',`const createHandler=${createHandler.toString()};\nexport default createHandler(${JSON.stringify(manifest.redirects)});\n`);
await writeFile('dist/server/wrangler.json',JSON.stringify({name:'muve-ca',main:'index.js',compatibility_date:'2026-09-09',assets:{directory:'../client',binding:'ASSETS',run_worker_first:true}},null,2));
assert(manifest.pages.length>0);
console.log(`Sites output ready: ${manifest.pages.length} pages, canonical and legacy redirects, public assets only.`);
