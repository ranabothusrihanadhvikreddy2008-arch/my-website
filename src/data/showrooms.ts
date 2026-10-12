import { Showroom } from './types';

export const initialShowrooms: Showroom[] = [
  {
    id: 'hyd-flagship',
    name: 'Hyderabad Flagship (Pot Market)',
    city: 'Secunderabad & Hyderabad',
    address: '48, Jewellers Street, Pot Market, Secunderabad & Hyderabad, Telangana 500003.',
    pinCode: '500003',
    phone: '+91 95429 79999',
    whatsapp: '919542979999',
    timings: 'Open 10:00 AM – 9:00 PM (All 7 Days)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Pot+Market+Secunderabad&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://maps.google.com/?q=Pot+Market+Secunderabad'
  },
  {
    id: 'blr-flagship',
    name: 'Bengaluru Flagship (Commercial St)',
    city: 'Bengaluru',
    address: '112, Commercial Street / Jewellers Lane, Shivajinagar, Bengaluru, Karnataka 560001.',
    pinCode: '560001',
    phone: '+91 98860 67890',
    whatsapp: '919886067890',
    timings: 'Open 10:00 AM – 9:00 PM (All 7 Days)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Commercial+Street+Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://maps.google.com/?q=Commercial+Street+Bangalore'
  }
];
