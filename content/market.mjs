// Canada-wide local and interprovincial enquiries; Toronto/GTA remains the operating base.
import {locations} from './locations.mjs';
export const nationalMarket={name:'Canada',description:'Müve handles local and interprovincial commercial moves and employee relocations across Canada, with Toronto and the GTA as our operating base. Services, routes, and dates are confirmed for each project.',availability:'Service availability depends on the location, route, dates, and handling requirements. Storage, installation, specialist work, and remote or northern transport are confirmed in your proposal.'};
export const primaryMarket={name:'Toronto & the GTA',path:'/locations/ontario/greater-toronto-area',description:'Müve provides commercial moving, packing, storage, and setup in Toronto and the Greater Toronto Area. Contact us to confirm service availability for other Canadian routes.'};
export const marketRegions=[
 {name:'Toronto',slugs:['toronto']},
 {name:'Peel Region',slugs:['mississauga','brampton','caledon']},
 {name:'York Region',slugs:['vaughan','markham','richmond-hill','newmarket','aurora','king','east-gwillimbury','whitchurch-stouffville','georgina']},
 {name:'Halton Region',slugs:['oakville','burlington','milton','halton-hills']},
 {name:'Durham Region',slugs:['pickering','ajax','whitby','oshawa','clarington','uxbridge','scugog','brock']}
];
const slugs=new Set(marketRegions.flatMap(r=>r.slugs));
export const isPrimaryLocation=c=>c.province==='ontario'&&slugs.has(c.slug);
export const primaryLocations=marketRegions.flatMap(r=>r.slugs.map(slug=>{const c=locations.find(c=>c.province==='ontario'&&c.slug===slug);if(!c)throw Error('Missing GTA location: '+slug);return c;}));
const featuredSlugs=['toronto','ottawa','montreal','quebec-city','vancouver','calgary','edmonton','winnipeg','halifax'];
export const featuredLocations=featuredSlugs.map(slug=>{const city=locations.find(c=>c.slug===slug);if(!city)throw Error('Missing featured location: '+slug);return city;});
export const orderedLocations=[...featuredLocations,...locations.filter(c=>!featuredSlugs.includes(c.slug)).sort((a,b)=>a.name.localeCompare(b.name,'en-CA'))];
export const marketLabel=()=> 'Availability by project';
export const marketNote=c=>isPrimaryLocation(c)?`Müve serves ${c.name} as part of our Toronto and GTA operating base, for local moves and relocations to other Canadian destinations. We confirm services, building access, and scheduling for your project.`:`Plan a local move in ${c.name} or an interprovincial relocation with Müve. Share both addresses, your preferred dates, and the services needed so we can confirm service availability for your route. ${['yukon','northwest-territories','nunavut'].includes(c.province)?'Northern transport depends on access, season, and handling requirements.':''}`.trim();
