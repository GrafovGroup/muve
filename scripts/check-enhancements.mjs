import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {pages}=JSON.parse(await readFile('.generated-pages.json','utf8'));
const plain=s=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
let faqPages=0;
for(const route of pages){
 const html=await readFile((route?route+'/':'')+'index.html','utf8');
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m=>JSON.parse(m[1]));
 const page=schemas.filter(s=>s['@type']==='WebPage');assert.equal(page.length,1,route);assert.equal(page[0].url,'https://muve.ca/'+route);
 const visible=[...html.matchAll(/<details>\s*<summary>(.*?)<\/summary>\s*<p>(.*?)<\/p>\s*<\/details>/gs)].map(m=>[plain(m[1]),plain(m[2])]);
 const faq=schemas.filter(s=>s['@type']==='FAQPage');
 if(visible.length){faqPages++;assert.equal(faq.length,1,route);assert.deepEqual(faq[0].mainEntity.map(q=>[q.name,q.acceptedAnswer.text]),visible,route);}
 assert(html.includes('summary_large_image'));
 if(html.includes('id="move-form"'))assert(html.includes(`name="language" value="${route==='fr'||route.startsWith('fr/')?'fr-CA':'en-CA'}"`));
}
console.log(`PASS: ${pages.length} page entities and social tags; ${faqPages} FAQ schemas exactly match visible questions and answers.`);
