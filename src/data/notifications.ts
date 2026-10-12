import { NotificationItem } from './types';

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Payment Received',
    message: 'K. Ramesh Reddy paid ₹20,000 for instalment 9 via NetBanking',
    time: '2 mins ago',
    type: 'payment',
    read: false,
    actionUrl: '/admin/payments'
  },
  {
    id: 'notif-2',
    title: 'New Bridal Enquiry',
    message: 'Smt. Gayatri Rao submitted an enquiry for Kemp Temple Lakshmi Choker',
    time: '15 mins ago',
    type: 'enquiry',
    read: false,
    actionUrl: '/admin/enquiries'
  },
  {
    id: 'notif-3',
    title: 'Payment Alert',
    message: 'Payment failed for Lakshmi Prasanna (Instalment 3 - UPI timeout)',
    time: '45 mins ago',
    type: 'payment',
    read: false,
    actionUrl: '/admin/members'
  },
  {
    id: 'notif-4',
    title: 'Scheme Due Alert',
    message: 'Swarna Sanchay instalments due tomorrow for 6 members',
    time: '2 hours ago',
    type: 'scheme',
    read: false,
    actionUrl: '/admin/members'
  },
  {
    id: 'notif-5',
    title: 'New Subscription',
    message: 'Hema Malini Iyer enrolled in Swarna Sanchay (₹5,000/month)',
    time: '3 hours ago',
    type: 'scheme',
    read: false,
    actionUrl: '/admin/members'
  },
  {
    id: 'notif-6',
    title: 'Payment Received',
    message: 'Ananya S. Rao paid ₹15,000 for instalment 7 via UPI',
    time: '4 hours ago',
    type: 'payment',
    read: true,
    actionUrl: '/admin/payments'
  },
  {
    id: 'notif-7',
    title: 'Bullion Board Updated',
    message: 'IBJA 22K benchmark gold rate calibrated to ₹6,845 / gram (+₹15 today)',
    time: '5 hours ago',
    type: 'rate',
    read: true,
    actionUrl: '/admin/gold-rates'
  },
  {
    id: 'notif-8',
    title: 'Scheme Matured',
    message: 'Rajalakshmi Raghavan completed 11 instalments. Total bonus credited: ₹10,000',
    time: '1 day ago',
    type: 'scheme',
    read: true,
    actionUrl: '/admin/members'
  },
  {
    id: 'notif-9',
    title: 'WhatsApp Callback',
    message: 'K. Sunder Rajan requested sizing consultation for Regal Mayur Filigree Kada',
    time: '1 day ago',
    type: 'enquiry',
    read: true,
    actionUrl: '/admin/enquiries'
  },
  {
    id: 'notif-10',
    title: 'Payment Received',
    message: 'Venkata Sai Kumar paid ₹50,000 for instalment 8 via UPI',
    time: '1 day ago',
    type: 'payment',
    read: true,
    actionUrl: '/admin/payments'
  },
  {
    id: 'notif-11',
    title: 'Inventory Alert',
    message: 'Devi Lakshmi Nakshi Kada (Pair) stock flagged low (1 pair left)',
    time: '2 days ago',
    type: 'system',
    read: true,
    actionUrl: '/admin/products'
  },
  {
    id: 'notif-12',
    title: 'Enquiry Converted',
    message: 'Praveen Varma confirmed booking for Imperial Nakshi Bridal Kada',
    time: '2 days ago',
    type: 'enquiry',
    read: true,
    actionUrl: '/admin/enquiries'
  },
  {
    id: 'notif-13',
    title: 'Payment Received',
    message: 'Srinivas Goud paid ₹25,000 for instalment 5 via Card',
    time: '2 days ago',
    type: 'payment',
    read: true,
    actionUrl: '/admin/payments'
  },
  {
    id: 'notif-14',
    title: 'New Scheme Member',
    message: 'Chaitanya Varma joined Swarna Sanchay Scheme (₹10,000/mo)',
    time: '3 days ago',
    type: 'scheme',
    read: true,
    actionUrl: '/admin/members'
  },
  {
    id: 'notif-15',
    title: 'System Backup',
    message: 'Automated cryptographic backup of bullion transactions completed',
    time: '4 days ago',
    type: 'system',
    read: true,
    actionUrl: '/admin'
  }
];
