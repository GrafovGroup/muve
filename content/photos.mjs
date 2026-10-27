import {additionalServices} from './additional-services.mjs';
// Each editorial photo has one page placement. Local project briefs use
// location and service details instead of repeating overview photography.
const photo = (name, alt) => ({ name, alt });

export const sitePhotos = {
  hero: photo('move-day-hero-branded-v2', 'Movers loading protected office furniture at an urban commercial building'),
  approach: photo('move-planning-branded-v1', 'An office manager and relocation coordinator reviewing a workplace floor plan'),
  homeContact: photo('home-move-advisor', 'A move advisor talking with a business customer by phone'),
  servicesContact: photo('services-discussion-branded-v1', 'A business customer discussing moving requirements with a move advisor'),
  gtaHero: photo('gta-moving-day-branded-v1', 'Movers taking workplace crates through a downtown Toronto building entrance'),
  gtaContact: photo('gta-access-assessment-branded-v1', 'A move supervisor and building manager reviewing a loading entrance'),
};

export const servicePhotos = {
  'office-moving': {
    home: photo('office-relocation-branded-v1', 'An organized office move with reusable crates in a sunlit workplace'),
    card: photo('office-service-card-branded-v1', 'A mover protecting a workstation for an office relocation'),
    hero: photo('office-night-sequence-v2', 'Office crates staged by department for an evening workplace move'),
    contact: photo('office-final-walkthrough-branded-v1', 'A move supervisor checking furniture placement with an office manager'),
  },
  'corporate-relocation': {
    home: photo('employee-relocation-branded-v1', 'Professionals arriving at an apartment with a relocation coordinator'),
    card: photo('employee-service-card-branded-v1', 'A relocation worker carrying household cartons into a new apartment'),
    hero: photo('employee-arrival-home-v2-branded-v1', 'Household belongings arriving at a brick townhouse for an employee relocation'),
    contact: photo('employee-delivery-detail', 'Household moving cartons and a carefully placed plant in a new home'),
  },
  'medical-office-moving': {
    home: photo('medical-relocation-branded-v1', 'Relocation staff handling protected equipment in a clinic'),
    card: photo('clinic-service-card-branded-v1', 'A mover preparing protected clinic furniture for transport'),
    hero: photo('clinic-room-sequence-v2', 'Clinic furnishings organised by room before a medical office relocation'),
    contact: photo('clinic-packing-detail', 'Hands securing a padded moving blanket around clinic office furniture'),
  },
  'it-equipment-moving': {
    home: photo('it-relocation-branded-v1', 'A specialist packing computer equipment in a protective transport case'),
    card: photo('technology-service-card', 'Protected monitors and computer cases staged for relocation'),
    hero: photo('it-antistatic-packing-v2', 'A technician securing a server component inside fitted antistatic transport packaging'),
    contact: photo('technology-inventory-detail-branded-v1', 'A relocation worker checking closed equipment cases against an inventory'),
  },
  'commercial-storage': {
    card: photo('storage-service', 'Furniture and moving crates organized on shelving in a commercial storage space'),
    hero: photo('storage-zoned-inventory-v2', 'Workplace furniture and crates separated into labelled storage bays'),
    contact: photo('storage-release-detail-branded-v1', 'A storage worker preparing a trolley for a scheduled furniture delivery'),
  },
  'office-furniture-installation': {
    card: photo('furniture-service-branded-v1', 'An installer assembling an office desk against an approved workplace layout'),
    hero: photo('furniture-detail-assembly-v2-branded-v1', 'An installer securing the frame of a commercial sit-stand desk'),
    contact: photo('furniture-finishing-detail-branded-v1', 'An installer checking the alignment of a completed office workstation'),
  },
  'office-decommissioning': {
    card: photo('decommissioning-service-branded-v1', 'Movers clearing labelled office furniture from a vacated workplace'),
    hero: photo('clearance-material-sorting-v2-branded-v1', 'Office furniture components separated for approved reuse and recycling collections'),
    contact: photo('clearance-handover-detail-branded-v1', 'A move supervisor checking an empty office before handover'),
  },
};

export function contactPhotoFor({ service, city, path = '/' } = {}) {
  if (path.startsWith('/locations/') && path !== '/locations/ontario/greater-toronto-area') return null;
  if (service) return service.photos.contact;
  if (path === '/') return sitePhotos.homeContact;
  if (path === '/locations/ontario/greater-toronto-area') return sitePhotos.gtaContact;
  if (city) {
    const choices = Object.values(servicePhotos);
    const index = [...city.slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % choices.length;
    return choices[index].contact;
  }
  return sitePhotos.servicesContact;
}

for(const service of additionalServices) servicePhotos[service.slug]=service.photos;
