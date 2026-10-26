import {services,servicePath} from './services.mjs';

export const redirects={
 ...Object.fromEntries(services.map(service=>['/'+service.slug,servicePath(service)])),
 '/toronto-commercial-movers':'/locations/ontario/toronto',
 '/vancouver-office-moving':'/locations/british-columbia/vancouver',
 '/calgary-commercial-movers':'/locations/alberta/calgary',
 '/montreal-office-relocation':'/locations/quebec/montreal',
 '/ottawa-office-movers':'/locations/ontario/ottawa',
 '/edmonton-commercial-movers':'/locations/alberta/edmonton'
};
