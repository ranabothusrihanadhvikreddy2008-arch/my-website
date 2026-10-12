export interface Product {
  id: string;
  name: string;
  category: string;
  grossWeight: number; // in grams
  netGoldWeight: number; // in grams
  purity: '22K' | '24K' | '18K';
  hallmark: string; // 'BIS 916' | '999 Pure' | 'BIS 750'
  makingChargePercent: number; // e.g. 12%
  badge?: 'BESTSELLER' | 'BRIDAL HERITAGE' | 'MASTERPIECE' | 'TRENDING' | 'CLASSIC' | 'NEW' | 'AUSPICIOUS' | 'ROYAL HEIRLOOM' | 'AWARD WINNER' | 'SACRED WEDDING' | 'BRIDAL SIGNATURE' | 'HERITAGE LEGACY';
  craftsmanship: 'Nakshi Temple Work' | 'Antique Matte Finish' | 'Kundan Polki Uncut' | 'Meenakari Enamel' | 'Lightweight Italian Wire';
  occasion: 'Bridal / Muhurtham' | 'Festive / Pooja' | 'Daily Elegance' | 'Gifting & Auspicious';
  description: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  stones?: string;
  customizable: boolean;
}

export interface GoldRates {
  gold22k: number; // per gram
  gold22kChange: number; // change today (+15)
  gold24k: number; // per gram
  gold24kChange: number;
  silver: number; // per gram
  silverChange: number;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: string;
  subtitle: string;
  image: string;
}

export interface SchemePlan {
  id: string;
  name: string;
  code: string;
  durationMonths: number;
  bonusMonths: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  description: string;
  makingChargesWaivedPercent: number;
  features: string[];
}

export interface SchemeSubscription {
  id: string;
  subscriptionNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  planId: string;
  planName: string;
  monthlyAmount: number;
  tenureMonths: number;
  installmentsPaid: number;
  totalPaid: number;
  bonusAmount: number;
  startDate: string;
  nextDueDate: string;
  maturityDate: string;
  status: 'ACTIVE' | 'MATURED' | 'REDEEMED' | 'OVERDUE';
  nomineeName: string;
  nomineeRelation: string;
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  subscriptionId: string;
  subscriptionNumber: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  installmentNumber: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Wallet';
  date: string;
  time: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  transactionRef: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productName?: string;
  showroomLocation: 'Hyderabad Flagship (Pot Market)' | 'Bengaluru Flagship (Commercial St)';
  occasion: string;
  notes?: string;
  date: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'payment' | 'enquiry' | 'scheme' | 'system' | 'rate';
  read: boolean;
  actionUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  badge: string;
  rating: number;
  avatar: string;
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  pinCode: string;
  phone: string;
  whatsapp: string;
  timings: string;
  mapEmbedUrl: string;
  directionsUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
}
