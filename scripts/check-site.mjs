import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {services,servicePath} from '../content/services.mjs';
import {locations,provinces,locationPath,serviceLocationPath} from '../content/locations.mjs';
import {escapeHTML} from '../local-pages.mjs';
const manifest=JSON.parse(await readFile('.generated-pages.json','utf8'));
assert.equal(new Set(locations.map(c=>locationPath(c))).size,locations.length,'Location paths must be unique');
for(const p of provinces)assert(locations.some(c=>c.province===p.slug),`Missing ${p.name}`);
const docs=new Map(),titles=new Set(),descriptions=new Set();
for(const route of manifest.pages){
 const path='/'+route, html=await readFile((route?route+'/':'')+'index.html','utf8');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 assert(title&&description,`Missing metadata: ${path}`);assert(!titles.has(title),`Duplicate title: ${title}`);titles.add(title);assert(!descriptions.has(description),`Duplicate description: ${path}`);descriptions.add(description);
 assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`H1: ${path}`);
 assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],'https://muve.ca'+path,`Canonical: ${path}`);
 assert(!html.includes('content="noindex'),'Canonical page must be indexable: '+path);
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 if(ids.has('move-form')){
  const form=html.match(/<form\b[^>]*id="move-form"[^>]*>(.*?)<\/form>/s)?.[0];
  assert(form?.includes('action="https://formspree.io/f/xoeqyprr" method="POST"'),`Formspree action and HTML fallback: ${path}`);
  for(const name of ['name','company','email','phone','service','from','to','date','size','details','consent','subject','_gotcha','sourcePage','landingCity'])assert.equal((form.match(new RegExp(`name="${name}"`,'g'))||[]).length,1,`Single form field ${name}: ${path}`);
  assert(form.includes(`name="sourcePage" value="${escapeHTML(path)}"`),`Form attribution: ${path}`);
  for(const name of ['name','company','email','service','from','to','consent'])assert(new RegExp(`<(?:input|select)\\b[^>]*name="${name}"[^>]*\\brequired\\b`).test(form),`Required enquiry field ${name}: ${path}`);
 }
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(m[1]);
 for(const m of html.matchAll(/<img\b([^>]+)>/g)){assert(/\balt=".+?"/.test(m[1]),`Missing alt: ${path}`);for(const asset of [...m[1].matchAll(/(?:src="|, |srcset=")([^" ,]+\.webp)/g)].map(x=>x[1]))await access('.'+asset);}
 docs.set(path,{html,ids,links:[...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1]).filter(x=>x.startsWith('/')||x.startsWith('#'))});
}
for(const service of services){
 const path=servicePath(service),old='/'+service.slug,doc=docs.get(path);
 assert.equal(path,`/services/${service.slug}`);
 assert(doc,`Missing nested service page: ${path}`);
 assert(!docs.has(old),`Former service URL must not remain canonical: ${old}`);
 assert.equal(manifest.redirects[old],path,`Missing permanent service redirect: ${old}`);
 const schemas=[...doc.html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m=>JSON.parse(m[1]));
 const schema=schemas.find(item=>item['@type']==='Service');
 assert.equal(schema.url,'https://muve.ca'+path);
 assert.equal(schema['@id'],'https://muve.ca'+path+'#service');
 assert(doc.html.includes(`<meta property="og:url" content="https://muve.ca${path}">`),`Social URL: ${path}`);
}
for(const [path,doc] of docs)for(const link of doc.links){const [pathname,anchor]=link.split('#');const dest=pathname||path;assert(docs.has(dest),`Broken internal link: ${path} → ${link}`);if(anchor)assert(docs.get(dest).ids.has(anchor),`Broken anchor: ${path} → ${link}`);}
const reached=new Set();function visit(path){if(reached.has(path))return;reached.add(path);for(const link of docs.get(path).links)visit(link.split('#')[0]||path);}visit('/');assert.equal(reached.size,docs.size,'Every canonical page should be reachable from homepage links');
for(const c of locations)for(const s of services){const path=serviceLocationPath(c,s),doc=docs.get(path);assert(doc,`Missing matrix page: ${path}`);assert(doc.html.includes(`<option selected>${escapeHTML(s.formValue)}</option>`),`Service prefill: ${path}`);assert(doc.html.includes(`name="landingCity" value="${escapeHTML(c.name)}"`),`City attribution: ${path}`);assert(doc.html.includes(`name="sourcePage" value="${path}"`),`Page attribution: ${path}`);assert(doc.html.includes('"@type":"Service"')&&doc.html.includes('"@type":"BreadcrumbList"'),`Structured data: ${path}`);assert.equal((doc.html.match(/class="move-checklist"/g)||[]).length,1,`Checklist: ${path}`);}
const sitemap=await readFile('sitemap.xml','utf8');const listed=[...sitemap.matchAll(/<loc>https:\/\/muve.ca([^<]*)<\/loc>/g)].map(m=>m[1]);assert.equal(listed.length,docs.size);assert.deepEqual(new Set(listed),new Set(docs.keys()));for(const old of Object.keys(manifest.redirects))assert(!listed.includes(old),'Legacy URLs excluded from sitemap');
console.log(`PASS: ${docs.size} pages, ${locations.length} cities × ${services.length} services; unique metadata, canonical URLs, valid structured data, complete sitemap, reachable link graph, image paths, and enquiry context.`);
// National service areas must agree with visible availability and retain GTA geography.
const {primaryLocations,isPrimaryLocation,primaryMarket}=await import('../content/market.mjs');
assert.equal(primaryLocations.length,25,'The GTA operating base retains 25 municipalities');
for(const slug of ['hamilton','barrie','guelph','kitchener'])assert(!isPrimaryLocation(locations.find(c=>c.slug===slug)),`${slug} is outside the GTA`);
assert(docs.has(primaryMarket.path),'GTA regional hub is generated and linked');
const readSchemas=html=>[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m=>JSON.parse(m[1]));
for(const [path,doc] of docs){
 const organization=readSchemas(doc.html).find(x=>x['@type']==='Organization');
 assert.deepEqual(organization.areaServed,{'@type':'Country',name:'Canada'},`National organization coverage: ${path}`);
 assert.equal(organization.telephone,'+18336986883',`Business phone retained: ${path}`);
 assert(doc.html.includes(path.startsWith('/fr')?'<a href="/fr/locations">Régions</a>':'<a href="/locations">Locations</a>'),`National navigation: ${path}`);
}
for(const s of services){
 const doc=docs.get(servicePath(s));
 const service=readSchemas(doc.html).find(x=>x['@type']==='Service');
 assert.deepEqual(service.areaServed,{'@type':'Country',name:'Canada'});
 assert(doc.html.includes('Service availability depends on the location'),`Core service qualifications: ${s.slug}`);
}
for(const c of locations){
 const local=docs.get(serviceLocationPath(c,services[0]));
 const service=readSchemas(local.html).find(x=>x['@type']==='Service');
 const province=provinces.find(p=>p.slug===c.province);
 assert.deepEqual(service.areaServed,{'@type':'Place',name:`${c.name}, ${province.name}, Canada`},`Local service area: ${c.name}`);
 assert(local.html.includes(isPrimaryLocation(c)?'Toronto and GTA operating base':'confirm service availability for your route'),`Visible availability: ${c.name}`);
}
const directory=docs.get('/locations').html;
assert(directory.includes('<select id="market-filter"><option value="">All Canadian locations</option>'),'All Canada is the default region');
const cards=[...directory.matchAll(/<a class="location-result"[^>]*>/g)].map(m=>m[0]);
assert.equal(cards.length,locations.length,'Every city is in the directory');
assert(cards.every(card=>!card.includes(' hidden')),'All city links are visible without JavaScript');
assert(!directory.includes('coverage review'),'No obsolete GTA-only coverage labels');
console.log('PASS: national directory defaults, country/city service areas, business phone, and 25 GTA operating-base municipalities.');
