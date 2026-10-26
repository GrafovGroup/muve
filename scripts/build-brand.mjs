import {writeFile} from 'node:fs/promises';
import {brandArtwork,brandMarkPaths} from '../content/brand.mjs';
import {createRequire} from 'node:module';

// The vector geometry is the source of truth for every logo and icon size.
const svg=(viewBox,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none"><title>Müve — M in Motion</title>${body}</svg>\n`;
await writeFile('assets/logo.svg',svg('0 0 1216 296',`<g fill="#224e40">${brandArtwork}</g>`));
await writeFile('assets/logo-light.svg',svg('0 0 1216 296',`<g fill="#f5f5ef">${brandArtwork}</g>`));
await writeFile('assets/logo-mark.svg',svg('0 0 387 296',`<g fill="#224e40">${brandMarkPaths}</g>`));
await writeFile('assets/favicon.svg',svg('0 0 64 64',`<rect width="64" height="64" rx="15" fill="#224e40"/><g fill="#d5eb6a" transform="translate(9 14.5) scale(.119)">${brandMarkPaths}</g>`));
console.log('Built M in Motion SVG logo and favicon assets.');

// Raster exports are checked in; regeneration optionally uses an installed Sharp module.
const sharpModule=process.argv.indexOf('--sharp-module');
if(sharpModule!==-1){
 const sharp=createRequire(import.meta.url)(process.argv[sharpModule+1]);
 await sharp('assets/favicon.svg',{density:384}).resize(32,32).png().toFile('assets/favicon-32.png');
 await sharp('assets/favicon.svg',{density:384}).resize(180,180).png().toFile('assets/apple-touch-icon.png');
 const sizes=[16,32,48];
 const images=await Promise.all(sizes.map(size=>sharp('assets/favicon.svg',{density:384}).resize(size,size).png().toBuffer()));
 const header=Buffer.alloc(6+16*sizes.length);
 header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);
 let offset=header.length;
 images.forEach((png,i)=>{
  const p=6+i*16;header[p]=sizes[i];header[p+1]=sizes[i];
  header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);
  header.writeUInt32LE(png.length,p+8);header.writeUInt32LE(offset,p+12);offset+=png.length;
 });
 await writeFile('favicon.ico',Buffer.concat([header,...images]));
 console.log('Rendered PNG, Apple touch icon, and 16/32/48px ICO.');
}
