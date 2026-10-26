import test from 'node:test';
import assert from 'node:assert/strict';
import {createHandler} from '../sites-worker.mjs';
import {redirects} from '../content/redirects.mjs';
const handler=createHandler(redirects);
const request=path=>new Request('https://muve.ca'+path);
test('all legacy routes and aliases permanently redirect with query attribution',async()=>{
 for(const [from,to] of Object.entries(redirects))for(const suffix of ['','/','/index.html','.html']){
  const response=await handler.fetch(request(from+suffix+'?source=qa'),{});
  assert.equal(response.status,301);
  assert.equal(response.headers.get('location'),'https://muve.ca'+to+'?source=qa');
 }
 for(const path of ['/locations/','/locations/index.html','/locations.html']){
  const response=await handler.fetch(request(path),{});
  assert.equal(response.headers.get('location'),'https://muve.ca/locations');
 }
});
test('www redirects to the apex and preserves route and query',async()=>{
 const response=await handler.fetch(new Request('https://www.muve.ca/services?source=test'),{});
 assert.equal(response.status,301);
 assert.equal(response.headers.get('location'),'https://muve.ca/services?source=test');
});
test('serves assets with correct WebP type and security headers',async()=>{
 const response=await handler.fetch(request('/assets/photos/move.webp'),{ASSETS:{fetch:async()=>new Response('image',{headers:{'Content-Type':'application/octet-stream'}})}});
 assert.equal(response.status,200);
 assert.equal(response.headers.get('content-type'),'image/webp');
 assert.equal(response.headers.get('x-content-type-options'),'nosniff');
});
test('rejects local submission APIs and private files',async()=>{
 assert.equal((await handler.fetch(new Request('https://muve.ca/api/enquiries',{method:'POST'}),{})).status,405);
 assert.equal((await handler.fetch(request('/data/enquiries.ndjson'),{})).status,404);
 assert.equal((await handler.fetch(request('/.openai/hosting.json'),{})).status,404);
});
