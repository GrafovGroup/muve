# Müve.ca — bilingual website backup

Sites source: d5a196019fb26bbcc02543cb31d380b7526ab048, deployed version 13.

## Restore

Use Node.js 22+. No third-party build dependencies required.

- `npm run build`: generate 737 English and 737 French pages, sitemap and deployment output in dist/.
- `npm run check`: validate links, metadata, language pairs, service content, assets and simulated form handling.
- `npm run dev`: preview locally.

Complete templates, bilingual content, images, logos, scripts and hosting configuration are included. Generated HTML and build output are recreated by the build. Credentials and submitted inquiries are excluded.

## Changes — October 26, 2026

Centered single-line mobile phone link with the main action below. French /fr pages, equivalent-page language switches, localized forms and status messages, canonical metadata and reciprocal hreflang. Existing Formspree endpoint retained.

Checks passed: 1,474 pages and 15 form/routing tests. Visual mobile QA was blocked by browser preview access. Live inbox delivery was not tested.
