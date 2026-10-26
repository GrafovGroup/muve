import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const {pages}=JSON.parse(await readFile('.generated-pages.json','utf8'));
const english=pages.filter(p=>p!=='fr'&&!p.startsWith('fr/'));
for(const p of english){
 const pair='fr'+(p?'/'+p:'');assert(pages.includes(pair));
 const en=await readFile((p?p+'/':'')+'index.html','utf8');
 const fr=await readFile(pair+'/index.html','utf8');
 assert(fr.includes('<html lang="fr-CA">'));
 for(const html of [en,fr]){assert(html.includes(`hreflang="en-CA" href="https://muve.ca/${p}"`));assert(html.includes(`hreflang="fr-CA" href="https://muve.ca/${pair}"`));assert(html.includes('href="tel:+18336986883"'));}
 assert(en.includes(`class="language-switch" href="/${pair}"`));assert(fr.includes(`class="language-switch" href="/${p}"`));
 if(p!=='privacy'){assert(fr.includes('name="language" value="fr-CA"'));assert(fr.includes('J’accepte d’être contacté'));assert(fr.includes(`name="sourcePage" value="/${pair}"`));}
 const visible=fr.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,'');
 assert(!/Your name|Request a move|Explore services|COMMERCIAL RELOCATION|All rights reserved|What are you moving|Business moves/.test(visible),`English UI on ${pair}`);
}
console.log(`PASS: ${english.length} EN/FR pairs, reciprocal language links, metadata, localized forms, phone links and French UI.`);
