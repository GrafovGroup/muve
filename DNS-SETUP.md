# Muve.ca domain connection

The website is public at https://muve.ca, https://www.muve.ca, and https://muve-ca.dimagrafov.chatgpt.site. Both custom hostnames are active with HTTPS. The site includes the selected M in Motion logo, connected Formspree enquiry forms, and the updated service photography and copy.

## Where to add the records

The nameserver change to WHC is visible at the .ca registry and on Google and Cloudflare DNS. The active nameservers are `parking1.whc.ca` and `parking2.whc.ca`. All seven website records below were verified on both public resolvers on September 9, 2026 (Toronto time). On September 11, the apex A records, www CNAME, and both apex ownership TXT records were rechecked and remained correct. The apex initially returned a hosting-platform 404 while www worked. Refreshing the existing Sites domain validation completed activation; its SSL and provider statuses now report active. The apex homepage, services directory, office-moving page, stylesheet, and 737-URL sitemap return HTTP 200. Both configured apex IPv4 targets serve the services page successfully. No website source or DNS changes were needed.

A nameserver change does not copy the old DNS zone. Ensure the records required by your active email provider are also present at WHC. The previous Spaceship forwarding records are recorded below for reference; confirm that the forwarding service remains configured and supports the new DNS setup. [Spaceship’s nameserver guidance](https://www.spaceship.com/knowledgebase/connect-domain-custom-nameservers/) explains that service records must be recreated at the new DNS provider.

## Records

Host names below are relative to the muve.ca zone. Use the default TTL or 600 seconds if offered. Add both A records. Do not include quotation marks around TXT values.

| Type | Host/name | Value |
| --- | --- | --- |
| `A` | `@` | `162.159.143.30` |
| `A` | `@` | `172.66.3.26` |
| `CNAME` | `www` | `custom-domains.chatgpt.site` |
| `TXT` | `_openai-site-verification` | `openai-site-verification=8A1hNiuFOzH_NHI9CWHaue1E0TFGuYBdmM4dMEHH3N4` |
| `TXT` | `_cf-custom-hostname` | `3040d0a8-4ac5-4932-8eea-7c63408d4cce` |
| `TXT` | `_openai-site-verification.www` | `openai-site-verification=07qMEOYwsoGALhWq7yDYevLNK1DZboagiQ-ec00qmkE` |
| `TXT` | `_cf-custom-hostname.www` | `d3d0789e-f3a0-4eaa-abb4-0db2045d609d` |

Retain existing unrelated records. If an A, AAAA, or CNAME already occupies the exact website host, replace only conflicting website records with the targets above. Preserve or recreate the MX, SPF, DKIM, DMARC, and verification records required by your active email provider, and retain the intended email forwarding rules. Do not create a second SPF policy if one already exists.

## Existing email DNS observed before connection

- MX, priority 0: `mx1.efwd.spaceship.net`
- MX, priority 0: `mx2.efwd.spaceship.net`
- SPF TXT at @: `v=spf1 include:spf.efwd.spaceship.net ~all`

The domain connection is complete. Google and Bing's next sitemap-fetch results still need a separate check; the canonical sitemap is now publicly reachable over HTTPS. The www pages serve HTTP 200 with canonical links to the apex.
