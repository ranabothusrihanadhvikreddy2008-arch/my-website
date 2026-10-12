import { Enquiry } from './types';

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-01',
    customerName: 'Smt. Gayatri Rao',
    phone: '+91 98490 00000',
    email: 'gayatri.rao@gmail.com',
    productName: 'Kemp Temple Lakshmi Choker',
    showroomLocation: 'Hyderabad Flagship (Pot Market)',
    occasion: 'Bridal Wedding Trousseau (Heavy Sets)',
    notes: 'Looking for a matching pair of 48g kadas and maang tikka for Muhurtham date on Nov 24.',
    date: '2025-10-09 11:15 AM',
    status: 'New'
  },
  {
    id: 'enq-02',
    customerName: 'K. Sunder Rajan',
    phone: '+91 98860 11223',
    email: 'sunder.rajan@outlook.com',
    productName: 'Regal Mayur Filigree Kada (Pair)',
    showroomLocation: 'Bengaluru Flagship (Commercial St)',
    occasion: 'Daughter Wedding Gift',
    notes: 'Inquiring if custom sizing (2.6 size) is available for immediate trial this weekend.',
    date: '2025-10-09 10:40 AM',
    status: 'New'
  },
  {
    id: 'enq-03',
    customerName: 'Arundhati Sharma',
    phone: '+91 97011 88290',
    email: 'arundhati.s@gmail.com',
    productName: 'Guttapusalu Heritage Long Haar',
    showroomLocation: 'Hyderabad Flagship (Pot Market)',
    occasion: 'Engagement Ceremony',
    notes: 'Requested video consultation on WhatsApp to view pearls luster in daylight.',
    date: '2025-10-08 04:20 PM',
    status: 'Contacted'
  },
  {
    id: 'enq-04',
    customerName: 'Dr. V. Ramamoorthy',
    phone: '+91 94440 33412',
    productName: 'Gold Lakshmi Coin (999 Purity) 50g',
    showroomLocation: 'Bengaluru Flagship (Commercial St)',
    occasion: 'Dhanteras Advance Booking',
    notes: 'Wants to lock 24K bullion rate today for 50g bar pickup on Dhanteras morning.',
    date: '2025-10-08 02:10 PM',
    status: 'Contacted'
  },
  {
    id: 'enq-05',
    customerName: 'Praveen Varma',
    phone: '+91 98495 99014',
    productName: 'Imperial Nakshi Bridal Kada',
    showroomLocation: 'Hyderabad Flagship (Pot Market)',
    occasion: 'Bridal Wedding Trousseau',
    notes: 'Visited showroom yesterday. Finalizing advance deposit of ₹50,000.',
    date: '2025-10-07 06:45 PM',
    status: 'Converted'
  },
  {
    id: 'enq-06',
    customerName: 'Sunita Deshmukh',
    phone: '+91 98220 54129',
    productName: 'Padmavati Uncut Polki Choker',
    showroomLocation: 'Bengaluru Flagship (Commercial St)',
    occasion: 'Reception Jewellery',
    notes: 'Requires certificate of Russian emeralds authenticity.',
    date: '2025-10-07 01:15 PM',
    status: 'Contacted'
  },
  {
    id: 'enq-07',
    customerName: 'M. Krishna Murthy',
    phone: '+91 98480 77123',
    productName: 'Antique Gokhru Bangle Pair',
    showroomLocation: 'Hyderabad Flagship (Pot Market)',
    occasion: '60th Shashtiapthapoorthi',
    notes: 'Looking for 2.4 bangle size in traditional red antique polish.',
    date: '2025-10-06 11:30 AM',
    status: 'Contacted'
  },
  {
    id: 'enq-08',
    customerName: 'Shalini Reddy',
    phone: '+91 99891 22340',
    productName: 'Floral Kasu Mala (Long Haar)',
    showroomLocation: 'Hyderabad Flagship (Pot Market)',
    occasion: 'Bridal Trousseau',
    notes: 'Interested in Swarna Sanchay scheme maturity adjustment for this necklace.',
    date: '2025-10-06 09:50 AM',
    status: 'Converted'
  },
  // Additional realistic enquiries
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `enq-${(i + 9).toString().padStart(2, '0')}`,
    customerName: [
      'Radha Balasubramanian', 'Naveen Chandra', 'Harini Prasad', 'Satyanarayana Raju',
      'Geetha Madhuri', 'Vijay Bhaskar', 'Srilatha Chowdary', 'Kishore Kumar',
      'Anupama Menon', 'Ranganath Acharya', 'Usha Rani', 'Siddharth Varma'
    ][i],
    phone: `+91 98${400 + i * 23} ${10000 + i * 321}`,
    email: `customer${i + 9}@example.com`,
    productName: [
      'Royal Mayur Filigree Jhumkas', 'Devi Lakshmi Nakshi Kada', 'Navratna Polki Ring',
      'Lakshmi Gaja Bridal Vaddanam', 'Gajraj Antique Bangle Set', 'Traditional Mangalsutra Chain',
      'Sita Kalyanam Temple Necklace', 'Rudraksha Gold Mala 22K', 'Layered Chandbali Earrings',
      'Lord Balaji Temple Pendant', 'Nawabi Royal Rope Chain', 'Peacock Meenakari Jhumki'
    ][i],
    showroomLocation: (i % 2 === 0 ? 'Hyderabad Flagship (Pot Market)' : 'Bengaluru Flagship (Commercial St)') as any,
    occasion: ['Bridal Muhurtham', 'Festival Gift', 'Family Heirloom Redesign', 'Anniversary Celebration'][i % 4],
    notes: 'Requested call back from Senior Karigar with custom CAD weight estimates.',
    date: `2025-10-0${5 - Math.floor(i / 3)} 0${2 + (i % 8)}:30 PM`,
    status: (['New', 'Contacted', 'Converted', 'Closed'] as const)[i % 4]
  }))
];
