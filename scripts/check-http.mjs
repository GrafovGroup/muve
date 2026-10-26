import assert from 'node:assert/strict';
import {redirects} from '../content/redirects.mjs';
const origin=process.env.TEST_ORIGIN||'http://localhost:4173';
for(const [old,target] of Object.entries(redirects)){const r=await fetch(origin+old+'?source=test',{redirect:'manual'});assert.equal(r.status,301);assert.equal(new URL(r.headers.get('location'),origin).href,new URL(target+'?source=test',origin).href);}
for(const [alias,target] of [['/index.html','/'],['/locations/','/locations'],['/locations/ontario/toronto/office-moving/index.html','/locations/ontario/toronto/office-moving']]){const r=await fetch(origin+alias,{redirect:'manual'});assert([301,307,308].includes(r.status),'Canonical alias redirect');assert.equal(new URL(r.headers.get('location'),origin).href,new URL(target,origin).href);}
const local=await fetch(origin+'/locations/ontario/toronto/office-moving');assert.equal(local.status,200);assert((await local.text()).includes('Office movers<br>in Toronto.'));
const photo=await fetch(origin+'/assets/photos/office-relocation-768.webp');assert.equal(photo.status,200);assert(['image/webp','application/octet-stream'].includes(photo.headers.get('content-type')));const image=Buffer.from(await photo.arrayBuffer());assert.equal(image.toString('ascii',0,4),'RIFF');assert.equal(image.toString('ascii',8,12),'WEBP');
assert.equal((await fetch(origin+'/data/enquiries.ndjson')).status,404);
assert.equal((await fetch(origin+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,405);
console.log('PASS: legacy 301s, canonical aliases, real service page, valid WebP image bytes, private historical enquiry storage, and retired local submission endpoint.');
