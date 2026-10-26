// Each service has its own decision points, workflow, and enquiry brief.
export const serviceEditorial={
 'office-moving':{
  scopeTitle:'A floor plan becomes a move sequence.',
  processTitle:'Keep the working day in view.',
  steps:[
   ['Map the departments','Identify the teams that need to reopen first. Link desks, crates, shared equipment, and meeting rooms to the destination plan before packing begins.'],
   ['Reserve the working window','Match the loading sequence to the access available at both buildings. A phased move can separate teams or floors when the entire office cannot close at once.'],
   ['Place, check, reopen','Furniture goes to its assigned position, with labelled contents delivered alongside it. Your office contact checks placement while your IT team completes technical setup.']
  ],
  contactTitle:'Let’s plan your office move.',
  contactIntro:'Tell us the office locations, approximate number of workstations, and the date your team needs to be operational. Note any floors or departments that must move separately.',
  contactNote:'Floor plans, access windows, and reopening priorities help us scope the work.',
  regionTitle:'Office moves across Canada.',
  regionIntro:'Choose the municipality for your workplace. The local brief helps connect department sequencing to the pickup and delivery addresses.',
  requestLabel:'Request an office move plan',
  faqTitle:'Planning around your workplace.',
  extraQuestion:'What should we include for an office-moving quote?',
  extraAnswer:'Start with workstation counts, furniture quantities, both addresses, floor levels, and loading access. Add packing requirements, the target reopening date, and any temporary storage or phased delivery needs.',
  localFocus:'Workstation count, department priorities, and the first day in the new office',
  localPrompt:'Separate the desks and shared areas that must be ready first from furniture that can arrive in a later phase.'
 },
 'corporate-relocation':{
  scopeTitle:'One household. Two points of contact.',
  processTitle:'Connect the home move to the new role.',
  steps:[
   ['Agree the employer’s scope','HR confirms the approved packing, transport, storage, and unpacking services. Identify who authorizes changes and which costs need separate employee approval.'],
   ['Build the household schedule','The employee supplies the household inventory, property access, and possession dates. Packing and delivery are planned around those dates and the work start date.'],
   ['Settle the delivery details','Confirm who will receive the shipment, where rooms and larger pieces are located, and which essentials need to be unpacked first. Record any outstanding delivery items.']
  ],
  contactTitle:'Plan an employee’s next chapter.',
  contactIntro:'Share the origin and destination, household size, employer-approved services, and preferred arrival date. Identify whether you are the employee or the HR contact.',
  contactNote:'A summary of the approved benefits is enough; keep private employment records out of the form.',
  regionTitle:'Employee moves between Canadian communities.',
  regionIntro:'Select the employee’s destination or origin municipality to start the household relocation brief. Include both ends of the route when requesting availability.',
  requestLabel:'Discuss an employee relocation',
  faqTitle:'For HR teams and relocating employees.',
  extraQuestion:'What if the employee cannot move into the new home immediately?',
  extraAnswer:'Give us the move-out date and expected possession date. We can review temporary storage and a later household delivery, with access, timing, and charges confirmed in the proposal.',
  localFocus:'Household inventory, possession dates, and employer authorization',
  localPrompt:'Keep the household delivery date separate from the employment start date, particularly when temporary accommodation is involved.'
 },
 'medical-office-moving':{
  scopeTitle:'Separate ordinary contents from clinical equipment.',
  processTitle:'Prepare for the practice’s return to use.',
  steps:[
   ['Review each room','Your clinical contact identifies the furniture and equipment to move, along with anything needing manufacturer instructions or a specialist handling plan.'],
   ['Release the agreed contents','Confirm that each room’s contents are ready for collection. Keep patient records and regulated materials under the arrangements approved by the practice.'],
   ['Deliver for the next stage','Room groups arrive in the order agreed with your clinical team. Qualified specialists handle commissioning or validation before affected equipment returns to service.']
  ],
  contactTitle:'Scope your clinic relocation.',
  contactIntro:'Tell us the type of practice, number of rooms, and intended closure and reopening dates. List large or delicate equipment by general description without including patient information.',
  contactNote:'Flag equipment that needs manufacturer attendance or specialist transport before the schedule is agreed.',
  regionTitle:'Clinic relocation planning across Canada.',
  regionIntro:'Choose the practice location to prepare a room-by-room brief. Equipment responsibilities and the return-to-use sequence should be agreed alongside building access.',
  requestLabel:'Request a clinic move review',
  faqTitle:'Before releasing clinical rooms.',
  extraQuestion:'How can we reduce disruption to patient appointments?',
  extraAnswer:'Identify the rooms that must reopen first, the last appointment in each area, and any commissioning dependencies. We can then assess whether separate packing and delivery phases fit the practice’s access and operating schedule.',
  localFocus:'Room inventory, equipment owners, and clinical reopening dependencies',
  localPrompt:'Identify which rooms can be released together and which items need a manufacturer or other qualified specialist before transport.'
 },
 'it-equipment-moving':{
  scopeTitle:'The physical move follows your change plan.',
  processTitle:'Track the equipment through each handover.',
  steps:[
   ['Reconcile the asset list','Match the agreed equipment to destination labels and receiving contacts. Record handling requirements before selecting protective packing and transit arrangements.'],
   ['Move within the approved window','Your technical team releases the equipment after its shutdown procedures. Müve packs and transports the agreed assets in the sequence needed at the destination.'],
   ['Hand over for reconnection','The receiving contact checks the delivered assets against the inventory. Your IT team takes over reconnection and functional checks, with any transport exceptions recorded.']
  ],
  contactTitle:'Build your equipment transport brief.',
  contactIntro:'Provide equipment types, approximate quantities, rack or case dimensions, and the approved move window. Name the technical contact responsible for shutdown and receiving.',
  contactNote:'Do not send passwords, credentials, backups, or confidential asset records through this form.',
  regionTitle:'Technology moves between Canadian workplaces.',
  regionIntro:'Select a site location, then identify the equipment owner and receiving team. Physical transport should fit the technical change window for both ends of the move.',
  requestLabel:'Plan IT equipment transport',
  faqTitle:'A clear boundary between transport and IT.',
  extraQuestion:'Can equipment be delivered in a particular order?',
  extraAnswer:'Yes, the proposed sequence can distinguish infrastructure, shared devices, and user workstations. Your IT team should specify receiving priorities and readiness conditions so packing and loading can follow that order.',
  localFocus:'Asset quantities, transit protection, and the technical change window',
  localPrompt:'Assign a receiving person to each equipment group and identify the assets that the technical team needs first.'
 },
 'commercial-storage':{
  scopeTitle:'Store for the order you’ll need things back.',
  processTitle:'Make the next delivery part of the storage plan.',
  steps:[
   ['Group the inventory','Separate furniture for immediate reuse from later project phases. Record condition, dimensions, and handling needs so the storage arrangement fits the goods.'],
   ['Confirm the storage terms','Agree the location, conditions, access rules, release authorization, and expected duration. Identify any items that need an environment outside ordinary commercial storage.'],
   ['Schedule each release','Give each delivery group a destination and receiving date. Check access and any assembly needs before booking its return to the workplace.']
  ],
  contactTitle:'Find the right storage arrangement.',
  contactIntro:'Describe what needs storing, approximate quantities or dimensions, collection dates, and the expected storage period. Tell us whether you will need access or staged deliveries.',
  contactNote:'Identify temperature, security, or handling requirements so the proposed storage terms can address them.',
  regionTitle:'Collection and redelivery for your location.',
  regionIntro:'Choose the workplace municipality for collection or return delivery. The storage facility and access terms are confirmed in the proposal rather than inferred from the city page.',
  requestLabel:'Request a storage plan',
  faqTitle:'Access, timing, and release.',
  extraQuestion:'How is commercial storage priced?',
  extraAnswer:'The inventory volume, duration, handling needs, collection and delivery work, and frequency of access affect the proposal. Staged releases or additional visits should be identified before storage begins.',
  localFocus:'Inventory volume, storage duration, and release priorities',
  localPrompt:'Separate items needed for the first delivery from later releases, and name the person who can authorize access.'
 },
 'office-furniture-installation':{
  scopeTitle:'From component lists to usable workstations.',
  processTitle:'Build to the layout you approved.',
  steps:[
   ['Check the system and parts','Share furniture models, quantities, drawings, and manufacturer instructions. Missing fixings or incompatible components are identified before an assembly date is confirmed.'],
   ['Stage and assemble','Group components by destination area and leave a workable assembly space. The agreed desks, tables, storage, and seating are assembled and positioned to the layout.'],
   ['Walk the completed floor','Check furniture placement and record outstanding components or adjustments. Separately scoped electrical, structural, or specialist fixing work remains with the appointed trades.']
  ],
  contactTitle:'Bring your furniture layout to life.',
  contactIntro:'Tell us the furniture systems, quantities, delivery status, and target installation date. Note whether you need disassembly, reassembly, new furniture assembly, or a combination.',
  contactNote:'Product details, available parts, and the approved layout help us identify assembly dependencies.',
  regionTitle:'Workplace installations by location.',
  regionIntro:'Select the installation municipality and prepare the furniture schedule. Site access, assembly space, and the approved layout shape the installation sequence.',
  requestLabel:'Scope a furniture installation',
  faqTitle:'Before the components arrive.',
  extraQuestion:'What if some parts are missing or damaged?',
  extraAnswer:'Identify known shortages when sharing the furniture schedule. We can record affected workstations and discuss the assembly sequence, but compatible replacement parts and manufacturer requirements must be resolved before those pieces can be completed.',
  localFocus:'Product models, available components, and the approved layout',
  localPrompt:'Record which furniture is already on site, what still needs delivery, and where assembly can take place without blocking circulation.'
 },
 'office-decommissioning':{
  scopeTitle:'Decide each destination before removal.',
  processTitle:'Clear the floor with an accountable inventory.',
  steps:[
   ['Approve the disposition list','Mark each item for retention, relocation, donation, recycling, or disposal. Your authorized contact approves these decisions before items leave the premises.'],
   ['Coordinate the collections','Confirm recipient acceptance and the transport arrangements for each inventory group. Keep data-bearing assets with the documented instructions of your IT owner.'],
   ['Close out the clearance','Review the removed items and agreed collection records with your premises contact. Walk the cleared areas and distinguish completed removals from any separate reinstatement work.']
  ],
  contactTitle:'Plan your premises handback.',
  contactIntro:'Share the office size, furniture and equipment to remove, and the handover deadline. Identify items to retain and any donation, recycling, or disposal preferences for review.',
  contactNote:'Include landlord handover requirements that affect removal access; remediation and building reinstatement need a separate scope.',
  regionTitle:'Office clearances across Canadian locations.',
  regionIntro:'Choose the premises location to assemble a clearance brief. Collection destinations and the handover deadline drive the removal sequence.',
  requestLabel:'Request a clearance scope',
  faqTitle:'Removal decisions and handover records.',
  extraQuestion:'Does decommissioning include returning the unit to its original condition?',
  extraAnswer:'The standard removal scope covers the approved furniture, equipment, and materials. Building repairs, remediation, structural changes, and other reinstatement work must be identified and separately agreed with the appropriate specialists.',
  localFocus:'Approved item destinations, collection access, and the handback deadline',
  localPrompt:'Confirm which goods must stay until the final working day and which can be removed ahead of the main clearance.'
 }
};
