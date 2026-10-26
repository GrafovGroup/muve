// Keep the cache key shared across all page templates and icon formats.
import {brandVersion as version} from './brand.mjs';
export const faviconLinks=`<link rel="icon" href="/favicon.ico?v=${version}" sizes="16x16 32x32 48x48"><link rel="icon" href="/assets/favicon-32.png?v=${version}" type="image/png" sizes="32x32"><link rel="icon" href="/assets/favicon.svg?v=${version}" type="image/svg+xml" sizes="any"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=${version}" sizes="180x180">`;
