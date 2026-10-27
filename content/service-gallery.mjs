import {locationImage} from './location-visuals.mjs';
const scenes = {
 'office-furniture-installation': [
  ['workstation-installation','Workstations & privacy screens','Assemble desks and fit compatible screens to the agreed floor plan. Confirm furniture systems, components and installation requirements before booking.','Postes de travail et cloisons','Assemblage des bureaux et pose de cloisons compatibles selon le plan convenu. Les systèmes, les pièces et les exigences sont confirmés avant la réservation.','Installers fitting privacy screens to office bench desks','Installateurs fixant des cloisons à des bureaux partagés'],
  ['boardroom-assembly','Boardroom furniture assembly','Assembly and placement of conference tables and seating, with a final check of connections and alignment.','Assemblage du mobilier de réunion','Assemblage et mise en place des tables et des sièges, puis vérification des fixations et de l’alignement.','Installers securing the base of a conference table','Installateurs fixant la base d’une table de conférence']
 ],
 'office-moving': [
  ['office-furniture-protection','Furniture protection & preparation','Prepare cabinets and workplace furniture for handling with suitable padding and restraints, based on the agreed inventory.','Protection et préparation du mobilier','Préparation des armoires et du mobilier pour la manutention avec des couvertures et des sangles adaptées à l’inventaire convenu.','Movers securing a protective blanket around an office cabinet','Déménageurs protégeant une armoire de bureau avec une couverture et des sangles'],
  ['office-setup-handover','Placement & office setup','Position desks, chairs and storage according to the layout, then review the physical setup before handover. IT reconnection is scoped separately.','Mise en place et aménagement','Disposition des bureaux, des sièges et des rangements selon le plan, puis vérification avant la remise des lieux. Le raccordement informatique fait l’objet d’un mandat distinct.','Workers positioning office seating and checking a workplace floor plan','Installateurs plaçant un siège et vérifiant le plan d’aménagement']
 ]
};
const additionalScenes = {
  "office-furniture-installation": [
    [
      "reception-installation",
      "Reception-desk installation",
      "Assemble and position reception furniture to suit the approved entrance layout, with components and access checked before installation.",
      "Installation de comptoirs de réception",
      "Assemblage et mise en place du mobilier selon le plan d’accueil approuvé, après vérification des pièces et des accès.",
      "Installers assembling a reception desk",
      "Installateurs assemblant un comptoir de réception"
    ]
  ],
  "commercial-storage": [
    [
      "storage-intake",
      "Inventory & storage intake",
      "Check the agreed furniture inventory and protective packing as items arrive for storage.",
      "Inventaire et réception",
      "Vérification de l’inventaire convenu et des protections à l’arrivée du mobilier en entreposage.",
      "Workers checking wrapped furniture at warehouse intake",
      "Équipe vérifiant du mobilier emballé à la réception"
    ],
    [
      "storage-furniture-bays",
      "Organized furniture storage",
      "Group furniture and equipment for the agreed storage period and retrieval plan. Storage location, conditions and access are confirmed in your proposal.",
      "Entreposage organisé du mobilier",
      "Regroupement du mobilier et du matériel selon la durée et le plan de récupération convenus. Le lieu, les conditions et les accès sont précisés dans la proposition.",
      "Worker checking office furniture in organized storage bays",
      "Employé vérifiant du mobilier de bureau dans des zones d’entreposage"
    ],
    [
      "storage-dispatch",
      "Scheduled release & delivery",
      "Prepare the selected items for delivery around the receiving site’s access window and installation sequence.",
      "Sortie et livraison planifiées",
      "Préparation des articles sélectionnés selon la plage d’accès du lieu de livraison et la séquence d’installation.",
      "Movers checking straps around furniture before dispatch",
      "Déménageurs vérifiant les sangles du mobilier avant son expédition"
    ]
  ],
  "office-moving": [
    [
      "office-crate-packing",
      "Workstation packing",
      "Pack agreed desk contents into reusable crates and group them by destination to simplify placement after the move.",
      "Emballage des postes de travail",
      "Emballage du contenu convenu dans des bacs réutilisables, regroupés par destination pour faciliter la mise en place.",
      "Movers packing office supplies into reusable crates",
      "Déménageurs emballant des fournitures dans des bacs réutilisables"
    ],
    [
      "commercial-loading",
      "Loading-dock coordination",
      "Stage moving crates for loading around the agreed dock access, elevator bookings and transport sequence.",
      "Coordination du quai de chargement",
      "Préparation des bacs selon les accès au quai, les réservations d’ascenseur et la séquence de transport convenus.",
      "Movers guiding secured office crates at a loading dock",
      "Déménageurs guidant des bacs de bureau attachés au quai de chargement"
    ]
  ],
  "it-equipment-moving": [
    [
      "monitor-packing",
      "Monitor & equipment protection",
      "Use suitable protective packaging for the agreed computer inventory. Your IT team handles backups and prepares equipment for disconnection.",
      "Protection des écrans et du matériel",
      "Emballage adapté à l’inventaire informatique convenu. Votre équipe informatique effectue les sauvegardes et prépare la déconnexion.",
      "Worker packing a monitor into a foam-lined transport case",
      "Employé emballant un écran dans une caisse de transport rembourrée"
    ],
    [
      "equipment-delivery",
      "Equipment delivery & staging",
      "Check transport cases against the inventory and place them in the agreed staging area. Reconnection and testing remain separately scoped.",
      "Livraison et mise en attente du matériel",
      "Vérification des caisses selon l’inventaire et dépôt dans la zone convenue. Le raccordement et les essais font l’objet d’un mandat distinct.",
      "Workers checking computer transport cases on delivery",
      "Équipe vérifiant les caisses de transport informatique à la livraison"
    ]
  ],
  "office-decommissioning": [
    [
      "office-disassembly",
      "Furniture disassembly",
      "Dismantle agreed furniture systems and group reusable components for their next destination.",
      "Démontage du mobilier",
      "Démontage des systèmes de mobilier convenus et regroupement des pièces réutilisables pour leur prochaine destination.",
      "Workers dismantling a supported office desk frame",
      "Équipe démontant la structure d’un bureau sur des tréteaux"
    ],
    [
      "reuse-furniture-sorting",
      "Furniture reuse & sorting",
      "Separate items for approved reuse, storage or collection. Destinations and acceptance requirements are confirmed before removal.",
      "Tri et réemploi du mobilier",
      "Séparation des articles destinés au réemploi, à l’entreposage ou à la collecte autorisée. Les destinations et les conditions d’acceptation sont confirmées avant l’enlèvement.",
      "Workers sorting reusable office chairs and storage pedestals",
      "Équipe triant des sièges et des caissons de bureau réutilisables"
    ]
  ]
};
for (const [slug, items] of Object.entries(additionalScenes)) (scenes[slug] ||= []).push(...items);
const newScenes = [["cubicle-reconfiguration", "Cubicle reconfiguration", "Reconfigure compatible panels and workstations to the approved layout.", "Reconfiguration des postes", "Réorganisation des cloisons et postes compatibles selon le plan approuvé.", "Installers connecting office partition panels", "Installateurs assemblant des cloisons de bureau", "office-furniture-installation"], ["breakout-area-setup", "Breakout-area setup", "Position lounge seating and tables for the agreed shared-space layout.", "Aménagement des espaces de détente", "Mise en place des sièges et tables selon le plan convenu.", "Movers positioning seating in an office lounge", "Déménageurs installant des sièges dans un espace de détente", "office-furniture-installation"], ["filing-room-relocation", "Filing-room relocation", "Pack and move agreed archive cartons by destination. Record handling and access requirements before the move.", "Déménagement des salles de classement", "Emballage et transport des boîtes d’archives par destination, selon les exigences de manutention et d’accès convenues.", "Movers checking archive cartons on a trolley", "Déménageurs vérifiant des boîtes d’archives sur un chariot", "office-moving"], ["office-library-packing", "Office-library packing", "Pack books in manageable cartons and group them for placement at the destination.", "Emballage des bibliothèques de bureau", "Emballage des livres dans des cartons maniables et regroupement selon leur destination.", "Workers packing books from office shelving", "Équipe emballant les livres d’une bibliothèque de bureau", "office-moving"], ["floor-doorway-protection", "Floor & doorway protection", "Prepare suitable floor runners and doorway padding for the agreed moving route and building requirements.", "Protection des sols et des portes", "Préparation de protections adaptées au trajet de déménagement et aux exigences de l’immeuble.", "Movers installing a floor runner and padded doorway protection", "Déménageurs installant des protections de sol et de porte", "office-moving"], ["phased-office-move", "Phased office moves", "Group crates by work area and coordinate the agreed sequence around access windows and team schedules.", "Déménagement de bureaux par étapes", "Regroupement des bacs par zone et coordination selon les accès et les horaires convenus.", "Relocation coordinators checking a floor plan beside staged moving crates", "Équipe vérifiant un plan près de bacs préparés pour un déménagement", "office-moving"]];
for (const item of newScenes) (scenes[item[7]] ||= []).push(item.slice(0,7));
export function serviceGallery(slug,lang='en') {
 if(slug==='restaurant-event-moving') return restaurantGallery(lang,true);
 return standardServiceGallery(slug,lang)+(slug==='commercial-storage'?restaurantGallery(lang):'');
}
function standardServiceGallery(slug,lang='en') {
 const items=scenes[slug];if(!items)return `<section class="section service-gallery"><h2>${lang==='fr'?'Une préparation adaptée à vos biens.':'Preparation shaped around your belongings.'}</h2><div class="supplemental-service-photo">${locationImage(slug,'card',lang)}</div></section>`;
 const fr=lang==='fr';
 return `<section id="service-scenes" class="section service-gallery"><span class="eyebrow">${fr?'Les détails de votre projet':'The details of your project'}</span><h2>${fr?'Votre projet, étape par étape.':'Your project, step by step.'}</h2><div class="service-gallery-grid">${items.map(([name,title,copy,titleFR,copyFR,alt,altFR])=>`<figure><img src="/assets/photos/${name}-v1-1536.webp" srcset="/assets/photos/${name}-v1-768.webp 768w, /assets/photos/${name}-v1-1536.webp 1536w" sizes="(max-width: 760px) 100vw, 50vw" width="1536" height="1024" loading="lazy" decoding="async" alt="${fr?altFR:alt}"><figcaption><h3>${fr?titleFR:title}</h3><p>${fr?copyFR:copy}</p></figcaption></figure>`).join('')}</div></section>`;
}

export function homeGallery(lang='en') {
 const fr=lang==='fr';
 const selected=newScenes.filter(x=>['cubicle-reconfiguration','floor-doorway-protection','phased-office-move'].includes(x[0]));
 return `<section class="wrap section home-service-gallery" id="moving-in-detail"><div class="section-head"><div><span class="eyebrow">${fr?'Du premier carton à la mise en place':'From the first crate to the final setup'}</span><h2>${fr?'Chaque détail du déménagement.':'See what goes into your move.'}</h2></div><p>${fr?'Découvrez les services qui préparent votre équipe à son prochain espace.':'Explore the practical services that get your team ready for its next space.'}</p></div><div class="home-scene-grid">${selected.map(([name,title,copy,titleFR,copyFR,alt,altFR,slug])=>`<a class="home-scene" href="${fr?'/fr':''}/services/${slug}#service-scenes"><img src="/assets/photos/${name}-v1-768.webp" srcset="/assets/photos/${name}-v1-768.webp 768w, /assets/photos/${name}-v1-1536.webp 1536w" sizes="(max-width:760px) 100vw, 33vw" width="1536" height="1024" loading="lazy" decoding="async" alt="${fr?altFR:alt}"><div><h3>${fr?titleFR:title}</h3><p>${fr?copyFR:copy}</p><span class="text-link">${fr?'Découvrir le service':'Explore the service'} ↗</span></div></a>`).join('')}</div></section>`;
}

function restaurantGallery(lang='en',compact=false) {
 const fr=lang==='fr';
 const items=[
 ['restaurant-furniture-protection','Protect the furniture','Wrap tables, chairs and bar stools before handling, with an agreed inventory and collection schedule.','Protéger le mobilier','Protection des tables, chaises et tabourets selon un inventaire et un horaire de collecte convenus.','Movers wrapping a restaurant dining table in protective blankets','Déménageurs enveloppant une table de restaurant dans des couvertures de protection'],
 ['restaurant-event-clearance','Make room for your event','Remove the agreed loose furniture to create open floor space for a reception, launch or private event.','Libérer l’espace pour votre événement','Retrait du mobilier mobile convenu pour libérer la salle en vue d’une réception, d’un lancement ou d’un événement privé.','Movers removing padded chairs from a restaurant to clear the event space','Déménageurs retirant des chaises protégées pour libérer une salle de restaurant'],
 ['restaurant-temporary-storage','Store until you need it back','Coordinate temporary holding or off-site storage for the agreed period, with furniture grouped for return.','Entreposer jusqu’au retour','Organisation d’un entreposage temporaire sur place ou hors site pour la période convenue, avec regroupement du mobilier pour le retour.','Workers checking protected restaurant furniture in a storage bay','Équipe vérifiant du mobilier de restaurant protégé dans une zone d’entreposage'],
 ['restaurant-furniture-return','Restore the dining room','Schedule return delivery and furniture placement to your agreed layout before regular dining resumes.','Remettre la salle en place','Planification du retour et de la remise en place selon le plan convenu avant la reprise du service.','Movers positioning a restaurant table and chairs after an event','Déménageurs remettant une table et des chaises en place après un événement']
 ];
 return `<section id="restaurant-event-relocation" class="section service-gallery"><span class="eyebrow">${fr?'Restaurants et événements privés':'Restaurants & private events'}</span><h2>${fr?'Déplacement temporaire du mobilier pour vos événements.':'Restaurant furniture moves for events.'}</h2><p>${fr?'Libérez votre salle sans vous séparer de votre mobilier. Müve coordonne la protection, l’enlèvement temporaire, l’entreposage et le retour des tables, chaises et tabourets. Les accès, les quantités, la durée et les créneaux de retour sont confirmés au devis.':'Open up your dining room without parting with your furniture. Müve coordinates protection, temporary removal, storage and return of tables, chairs and bar stools. Access, quantities, storage duration and return windows are confirmed in your quote.'}</p><div class="service-gallery-grid">${items.filter((_,i)=>!compact||i===0||i===2).map(([name,title,copy,titleFR,copyFR,alt,altFR])=>`<figure><img src="/assets/photos/${name}-v1-1536.webp" srcset="/assets/photos/${name}-v1-768.webp 768w, /assets/photos/${name}-v1-1536.webp 1536w" sizes="(max-width:760px) 100vw, 50vw" width="1536" height="1024" loading="lazy" decoding="async" alt="${fr?altFR:alt}"><figcaption><h3>${fr?titleFR:title}</h3><p>${fr?copyFR:copy}</p></figcaption></figure>`).join('')}</div><a class="text-link" href="#move-form">${fr?'PLANIFIER LE DÉPLACEMENT DU MOBILIER':'PLAN YOUR RESTAURANT FURNITURE MOVE'} ↗</a></section>`;
}
