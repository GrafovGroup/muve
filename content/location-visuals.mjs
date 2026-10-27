import {cityPhotos} from './city-photos.mjs';
import {servicePhotos,sitePhotos} from './photos.mjs';
const frAlt={
 'restaurant-event-moving':'Protection et déplacement temporaire du mobilier de restaurant',
 'retail-showroom-moving':'Emballage et transport du mobilier et des marchandises de commerce',
 'warehouse-inventory-relocation':'Préparation des stocks pour un transfert d’entrepôt',
 'office-moving':'Préparation du mobilier et des bacs pour un déménagement de bureaux',
 'corporate-relocation':'Préparation des biens pour une relocalisation des employés',
 'medical-office-moving':'Protection du mobilier pour un déménagement de clinique',
 'it-equipment-moving':'Protection du matériel informatique pour son transport',
 'commercial-storage':'Mobilier et matériel préparés pour l’entreposage commercial',
 'office-furniture-installation':'Assemblage et mise en place du mobilier de bureau',
 'office-decommissioning':'Tri et enlèvement du mobilier lors de la libération des locaux'
};
export function locationImage(slug,role='hero',lang='en',citySlug){
 const cityPhoto=!slug&&role==='hero'?cityPhotos[citySlug]:null;
 const p=cityPhoto||(slug?servicePhotos[slug][role]:sitePhotos.hero);
 const alt=cityPhoto?(lang==='fr'?p.altFR:p.alt):lang==='fr'?(frAlt[slug]||'Équipe chargeant du mobilier de bureau protégé'):p.alt;
 return `<img class="location-service-photo" src="/assets/photos/${p.name}-1536.webp" srcset="/assets/photos/${p.name}-768.webp 768w, /assets/photos/${p.name}-1536.webp 1536w" sizes="(max-width:760px) 100vw, ${role==='card'?'33':'50'}vw" width="1536" height="1024" alt="${alt}" ${role==='hero'?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
}
export function locationDetail(slug,lang='en'){
 return `<figure class="location-detail-photo">${locationImage(slug,'contact',lang)}<figcaption>${lang==='fr'?'Préparation, manutention et mise en place selon le mandat convenu.':'Preparation, handling and placement tailored to the agreed scope.'}</figcaption></figure>`;
}
