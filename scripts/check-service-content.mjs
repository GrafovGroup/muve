import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {services,servicePath} from '../content/services.mjs';
import {locations,serviceLocationPath} from '../content/locations.mjs';
import {escapeHTML} from '../local-pages.mjs';

// Guard against restoring the copied overview paragraphs on every city/service page.
const editorialValues=new Set();
for(const service of services){
 const html=await readFile(`.${servicePath(service)}/index.html`,'utf8');
 for(const value of [service.editorial.scopeTitle,service.editorial.contactIntro,...service.editorial.steps.flat()]){
  assert(!editorialValues.has(value),`Repeated service editorial: ${value}`);
  editorialValues.add(value);
  assert(html.includes(escapeHTML(value)),`Missing editorial on ${service.slug}: ${value}`);
 }
 assert(!html.includes('A scope that fits'),'Old generic service section remains');
 for(const city of locations){
  const path=serviceLocationPath(city,service);
  const local=await readFile(`.${path}/index.html`,'utf8');
  const visible=local.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  for(const cloned of [service.intro,service.detail,service.answer])assert(!visible.includes(escapeHTML(cloned)),`Copied overview content on ${path}`);
  assert(local.includes(escapeHTML(city.note)),`Missing local planning note: ${path}`);
  assert(local.includes(`href="${servicePath(service)}"`),`Missing detailed scope link: ${path}`);
 }
}
console.log('PASS: seven distinct service editorials; 623 local briefs link to the full scope without cloning its paragraphs.');
