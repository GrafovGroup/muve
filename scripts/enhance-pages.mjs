import {readFile,writeFile} from 'node:fs/promises';
const base='https://muve.ca';
const text=s=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
const json=x=>JSON.stringify(x).replaceAll('<','\\u003c');
export async function enhancePages(){
 const {pages}=JSON.parse(await readFile('.generated-pages.json','utf8'));
 for(const route of pages){
  const file=(route?route+'/':'')+'index.html';let html=await readFile(file,'utf8');
  const fr=route==='fr'||route.startsWith('fr/'),lang=fr?'fr-CA':'en-CA',url=base+'/'+route;
  const core=fr?route.replace(/^fr\/?/,''):route;
  // Answer copy is visible and sourced into JSON-LD below, avoiding divergent hidden FAQs.
  if(core===''||/^services\/[^/]+$/.test(core)){
   const questions=fr?[
    ['Quels renseignements préparer pour une soumission?','Indiquez les villes de départ et d’arrivée, les dates souhaitées et les biens à déplacer. Précisez les étages, les ascenseurs, les quais de chargement, les restrictions d’accès et les besoins d’emballage ou d’entreposage. Un inventaire approximatif suffit pour commencer.'],
    ['Que se passe-t-il après ma demande?','Müve examine votre projet, précise avec vous les renseignements manquants et confirme la disponibilité. Le mandat, le trajet, les responsabilités et les services inclus sont définis dans la proposition avant la réservation.'],
    ['Puis-je demander un service sans déménagement complet?','Oui. Vous pouvez demander de l’entreposage commercial, de l’installation de mobilier ou de la libération de locaux. Indiquez l’adresse du projet dans les deux champs si les travaux se déroulent au même endroit. La disponibilité et le mandat seront confirmés.']
   ]:[
    ['What should I prepare for a commercial moving quote?','Share your origin and destination cities, preferred dates, and the items being moved. Include floors, elevators, loading docks, access restrictions, and any packing or storage needs. An approximate inventory is enough to start the conversation.'],
    ['What happens after I request a move plan?','Müve reviews your project, clarifies any missing details with you, and confirms availability. The proposal sets out the scope, route, responsibilities, and included services before you book.'],
    ['Can I request a service without a complete move?','Yes. You can enquire about commercial storage, furniture installation, or office decommissioning. Enter the project address in both location fields when the work takes place at one site. Availability and the scope of work will be confirmed.']
   ];
   const section=`<section class="wrap section quote-guide"><span class="eyebrow">${fr?'Préparer votre projet':'Plan your project'}</span><h2>${fr?'Une demande claire. Un plan adapté.':'A clearer brief. A better move plan.'}</h2>${questions.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;
   html=html.replace('<section class="enquiry section"',section+'<section class="enquiry section"');
  }
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m=>JSON.parse(m[1]));
  const extra=[];
  if(!schemas.some(s=>s['@type']==='WebPage'))extra.push({'@context':'https://schema.org','@type':'WebPage','@id':url+'#webpage',url,name:text(html.match(/<title>(.*?)<\/title>/s)[1]),inLanguage:lang,isPartOf:{'@id':base+'/#website'},about:{'@id':base+'/#organization'}});
  if(!core)extra.push({'@context':'https://schema.org','@type':'WebSite','@id':base+'/#website',url:base+'/',name:'Müve',alternateName:'Müve.ca',inLanguage:['en-CA','fr-CA'],publisher:{'@id':base+'/#organization'}});
  const faqs=[...html.matchAll(/<details>\s*<summary>(.*?)<\/summary>\s*<p>(.*?)<\/p>\s*<\/details>/gs)].map(m=>({'@type':'Question',name:text(m[1]),acceptedAnswer:{'@type':'Answer',text:text(m[2])}}));
  if(faqs.length&&!schemas.some(s=>s['@type']==='FAQPage'))extra.push({'@context':'https://schema.org','@type':'FAQPage','@id':url+'#questions',inLanguage:lang,mainEntity:faqs});
  const image=html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  html=html.replace('</head>',`<meta name="twitter:card" content="summary_large_image"><meta property="og:site_name" content="Müve"><meta name="robots" content="max-image-preview:large">${image?`<meta name="twitter:image" content="${image}">`:''}<script type="application/ld+json">${json(extra)}</script></head>`);
  if(!fr)html=html.replace('<input type="hidden" name="subject"','<input type="hidden" name="language" value="en-CA"><input type="hidden" name="subject"');
  html=html.replaceAll('muve-bilingual-1','muve-optimization-2').replaceAll('app.js?v=bilingual-1','app.js?v=optimization-2');
  // The French hero receives the same responsive image selection as English.
  if(fr)html=html.replace('class="hero-photo" src="/assets/photos/move-day-hero-branded-v2-1536.webp"','class="hero-photo" srcset="/assets/photos/move-day-hero-branded-v2-768.webp 768w, /assets/photos/move-day-hero-branded-v2-1536.webp 1536w" sizes="100vw" src="/assets/photos/move-day-hero-branded-v2-1536.webp"');
  await writeFile(file,html);
 }
 console.log(`Enhanced ${pages.length} pages with language attribution, social metadata, page entities and visible-answer schemas.`);
}
