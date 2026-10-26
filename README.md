# Müve — commercial relocation

A responsive B2B moving services website with 737 canonical pages across 89 Canadian markets and seven services based on the June 22, 2026 conversation **Müve.ca Commercial Launch Guide**:
https://chatgpt.com/c/6a393890-8968-83ea-bd8f-8e4d29cb05af

## Operating market

The user confirmed Canada-wide local and interprovincial enquiries on October 3, 2026. The homepage and core service pages target Canada; the location directory shows all 89 cities by default. Toronto and the GTA remain the operating base, and the regional hub retains all 25 municipalities across Toronto, Peel, York, Halton, and Durham. `content/market.mjs` is the source of truth for national positioning, featured locations, and GTA boundaries. Services, routes, dates, storage, installation, and remote/northern transport are confirmed per project. City pages describe service areas, not staffed branches. Existing URLs and redirects are preserved.

## Run

Requires Node.js 20 or newer; no package installation is needed.

```sh
node build.mjs
node server.mjs
```

Open http://localhost:4173. Set `PORT` to change the port. `build.mjs` generates the homepage, seven service pages, national and provincial location directories, 89 city hubs, 623 local service pages, and a Toronto & GTA regional hub, privacy page, redirects, and sitemap. Edit `content/services.mjs` and `content/locations.mjs` for service and location content, then rebuild. `local-pages.mjs` contains local page templates. Shared styles, interaction code, and the original SVG office illustration are in `assets/`.

## Service URLs

Core service pages use `/services/<service-slug>`, for example `/services/office-moving`. `servicePath()` in `content/services.mjs` is the shared source for service links, metadata, sitemap entries, and enquiry attribution. The former root-level service URLs redirect permanently to the corresponding nested URL, preserving query parameters. City/service pages retain their `/locations/<province>/<city>/<service-slug>` routes.

## Enquiries

All enquiry forms POST directly to `https://formspree.io/f/xoeqyprr`. The site uses plain HTML with a tailored vanilla JavaScript AJAX handler; no React package, API secret, or Node submission backend is needed. JavaScript sends `FormData` with `Accept: application/json`, shows pending/success/error states, prevents duplicate submissions while sending, and preserves entered details on failure. The HTML action provides a fallback without JavaScript. A 30-second timeout never automatically retries an uncertain submission.

Submissions include the contact fields, service, route, date, team size, notes/checklist, contact consent, originating page, and landing city. Formspree receives a `subject` field for the notification title and its `_gotcha` honeypot field. The public contact email is `info@muve.ca`. Notification recipients, spam settings, domain restrictions, and retention are managed in the Formspree dashboard; confirm the intended recipient there and check an actual notification before launch. Website code cannot verify inbox delivery. No CRM is configured.

New enquiries are no longer saved to the local server. Any historical `data/enquiries.ndjson` file is left untouched, stays private, and should not be included in a static deployment.

Run `npm run check` for site, photo, service-content, and mocked form-flow checks. The form tests cover success, errors, connection failures/timeouts, validation, and duplicate prevention without making live submissions.

On September 9, 2026, a clearly labelled test enquiry was submitted from the Toronto office-moving page through the browser. Formspree returned a successful response, the site displayed its confirmation, and no browser errors were reported. The checklist was added to the enquiry before submission. This verifies submission acceptance, not delivery to the recipient’s inbox.

## Deployment handoff

The site is hosted publicly on OpenAI Sites at https://muve-ca.dimagrafov.chatgpt.site. Muve.ca and www.muve.ca are registered with Sites; DNS validation is pending. See DNS-SETUP.md for the exact records and existing mail DNS. The user confirmed receipt of the Formspree test notification.

Run `node scripts/build-sites.mjs` to prepare `dist/client` and the small routing Worker in `dist/server`. The Worker handles permanent legacy redirects and canonicalization for requests passed through to it, and enforces private-file boundaries. The Sites asset layer can answer before the Worker: canonical file aliases may use HTTP 307, and WebP assets may have application/octet-stream headers. Browser image decoding and the actual WebP bytes are verified by the deployment checks. Sites static-only hosting does not apply `_redirects` or `_headers` files; keep the Worker in the deployment archive. Package only `.openai/hosting.json` and `dist`, after committing and pushing the exact source state to the Sites repository. Never upload private enquiry records as public assets. The server intentionally binds to loopback. The user confirmed that Müve should be presented as the moving service company. Partner sourcing is deferred. The public experience uses direct service language while retaining accurate qualifications for technical work and location-specific availability. `(833) 698-MUVE (6883)` is the project-specific business number, with `+18336986883` used consistently in call links and structured data. The public copy makes no invented fleet, certification, client, or review claims. Location availability and specialist work are qualified at project scoping.

Google Fonts supplies fonts, and enquiry submissions are sent to Formspree. Fonts fall back to local system fonts. No analytics or ad cookies are included.

## Brand assets

The selected logo is **A / M in Motion**. `content/brand.mjs` holds the shared vector artwork used by the header, footer, and error page. The outlined Müve wordmark and geometric M are independent of web-font loading. `assets/logo.svg`, `assets/logo-light.svg`, and `assets/logo-mark.svg` provide reusable exports; browser icons use the lime M on forest green.

Run `node scripts/build-brand.mjs` to regenerate the SVGs. To also render the checked-in PNG, Apple icon, and multi-size ICO, pass `--sharp-module` followed by the path to an installed Sharp package. Bump `brandVersion` when changing the artwork, then rebuild the site to refresh icon and stylesheet cache keys.

## Photography edition

The image-led core site uses 31 editorial photographs, with each photograph appearing once across the entire site. Seven replacement service hero photographs show distinct settings and activities. The homepage, services overview, seven service pages, and GTA hub retain their photography. City hubs and city/service briefs use project-detail panels, local planning notes, and interactive enquiry checklists instead of repeating those photos. `content/photos.mjs` defines the assignments. These generated scenes illustrate service categories and do not depict actual company staff, clients, or completed projects.

The production assets are in `assets/photos/`, with 768px and 1536px WebP versions; unused earlier photos remain available there. Exact prompts and generation source paths are preserved in `assets/photo-prompts.json` and `assets/service-photo-prompts-v2.json`. Run `node scripts/check-photos.mjs` to enforce image-size limits and detect duplicate photo content across every generated page. The hero loads with high priority; other images lazy-load, have descriptive alt text, and reserve layout space. The original SVG illustration remains available in `assets/office.svg`.

`content/service-editorial.mjs` supplies distinct headings, workflows, questions, and enquiry introductions for the seven services; `service-pages.mjs` renders the main service overviews. City/service pages link to these complete scopes and keep their own local planning brief rather than copying the overview paragraphs. `scripts/check-service-content.mjs` guards against restoring those cloned paragraphs on all 623 local service pages. Shared navigation, form labels, and service-specific checklist requirements remain consistent across the site.
