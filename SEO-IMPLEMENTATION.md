# Service-by-city search structure

Implemented September 9, 2026. The site remains local at http://localhost:4173; these pages have not been deployed, crawled, or indexed on Muve.ca.

## Scope

The planning directory covers **89 selected Canadian markets**, across all 10 provinces and 3 territories. This is not an exhaustive list of Canadian municipalities. The content model supports adding further cities and towns without changing the URL scheme or templates.

Seven service categories produce **623 city/service pages**. National and provincial directories, city hubs, service hubs, the homepage, and privacy page bring the total to **737 canonical pages**. Six previous city URLs redirect permanently to the appropriate city hub and are excluded from the sitemap.

Services: office relocation, employer-sponsored employee relocation, medical/clinic relocation, IT equipment relocation, commercial storage, office furniture installation, and office decommissioning. Industrial rigging, hazardous goods, cross-border transport, clinical validation, and IT technical work are not represented as standard included services.

## Confirmed first operating market

The user selected **Toronto and the GTA**. The homepage and core service pages now target this market. The location directory defaults to its 25 municipalities and can be switched to all locations or outside-GTA coverage enquiries. A dedicated hub at `/locations/ontario/greater-toronto-area` groups Toronto, Peel, York, Halton, and Durham. Fourteen missing GTA municipalities were added to the original 75-market dataset.

The organization and national service metadata describe the Toronto/GTA operating area. Local Service markup includes `areaServed` only for the primary municipalities; other location pages state that availability needs a route review. Hamilton, Barrie, Guelph, and Kitchener are not categorized as GTA. All specialist scopes and project schedules remain subject to confirmation.

The market definition follows the user’s decision; municipality grouping references [Ontario Creates’ GTA map](https://www.ontariocreates.ca/uploads/gta_map.pdf), [Durham’s municipality directory](https://www.durham.ca/en/regional-government/local-municipalities.aspx), and [York’s municipality list](https://www.york.ca/environment/water-and-wastewater/municipal-water-supply).

## Routes and internal navigation

- `/services` → national service pages, preserving the original service URLs.
- `/locations` → city search with province and service filters; all city links are present in HTML, with outside-GTA cards hidden until the coverage filter is changed.
- `/locations/ontario` → province directory.
- `/locations/ontario/toronto` → city hub with all seven local services.
- `/locations/ontario/toronto/office-moving` → service-specific local scope, checklist, FAQs, related services, and enquiry.

Each core service page prioritizes GTA links and keeps province-grouped links for other coverage enquiries in an expandable section. Breadcrumbs and related links connect each local page back to its city, province, national service, and other local services. Every canonical page is reachable through ordinary HTML links from the homepage.

## Content and conversions

The user confirmed direct service positioning: Müve is the moving company customers work with for packing, transport, storage, and setup. Service descriptions, FAQs, and local templates use this language; partner sourcing is deferred. The confirmed public contact address is `info@muve.ca`, included in contact sections, the footer, privacy contact details, and organization metadata. Enquiry forms submit directly to the configured Formspree endpoint, with notification recipients managed in Formspree.

Local pages combine a distinct city planning note, province/territory route considerations, service-specific inclusions and specialist boundaries, a five-item interactive brief checklist, and service FAQs. The checklist adds selected requirements to the same-page enquiry without erasing existing notes. City and service fields are prefilled; the visitor can edit the route. Enquiries retain the landing city and originating page for conversion attribution.

City notes are original scoping prompts, not claims about municipal regulations, local offices, completed jobs, or available crews. Northern, island, specialist, and interprovincial routes are subject to feasibility. All location pages keep the established image-led design, using service illustrations rather than claiming the images depict a particular city or completed client job. Main-page image placements now use 31 distinct photographs, including 26 newly generated scenes. City landing pages share their relevant service imagery without repeating a photo within a page. Open Graph images follow the first on-page photo, and the build checks compare image file contents to catch duplicate photos.

## Search metadata

Each page has a unique title, meta description, H1, self-referencing canonical URL, and Open Graph URL. Local service pages have Service and BreadcrumbList JSON-LD. No fake branch addresses, ratings, reviews, or certifications are used. `Service` markup describes the page; it does not imply eligibility for a particular Google rich result.

The XML sitemap lists canonical pages only. The Node server returns HTTP 301 for the six legacy city URLs and normalizes trailing slashes and explicit `index.html` aliases. Static fallback redirect documents have destination canonicals and `noindex,follow`. A static deployment should translate the redirect map into its host’s native redirects and allow direct Formspree submissions; no enquiry backend is required.

## Sources and editorial basis

Google describes city doorway pages and scaled content with little user value as spam patterns. The implementation uses a browseable hierarchy, substantive service scopes, local planning considerations, and a usable enquiry on each landing page. These features are design decisions, not a guarantee that any page will be indexed or rank. Continue strengthening pages with verified local delivery information and real project evidence as it becomes available.

- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google breadcrumb structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Statistics Canada geographical reference maps](https://www.statcan.gc.ca/en/subjects/standard/sgc/2021/map-information)
- [Statistics Canada municipal and metropolitan geography](https://www12.statcan.gc.ca/census-recensement/2021/geo/maps-cartes/referencemaps-cartesdereference/sgc-cgt/map-eng.cfm?SGC=01_B&wbdisable=true)
- [Statistics Canada northern community geography](https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-x/2021002/98-200-x2021002-eng.cfm)

Geographic references inform market naming and province/territory grouping. No population figures or claims of current local service availability are inferred from census data. The selected markets are not a ranking by population or revenue.

## Verification and next operational step

Run `node build.mjs` and `node scripts/check-site.mjs`. Checks cover all 737 pages, unique metadata, complete matrix generation, image variants, structured-data parsing, canonicals, sitemap membership, internal anchors, full link-graph reachability, service prefills, and enquiry attribution fields. Browser QA covers city/province/service filters, accent handling, mobile layouts, and checklist-to-enquiry persistence.

After domain deployment, confirm HTTPS and canonical host handling, install the production redirects, submit the sitemap through the owner’s Search Console account, and inspect representative URLs. Public deployment and Search Console submission have not been performed. The site is currently English-only; no French URLs or hreflang alternates are claimed.
