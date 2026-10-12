import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  GoldRates,
  SchemePlan,
  SchemeSubscription,
  PaymentTransaction,
  Enquiry,
  NotificationItem
} from '../data/types';
import { initialGoldRates } from '../data/goldRates';
import { initialProducts } from '../data/products';
import { initialSchemePlans } from '../data/schemes';
import { initialSchemeMembers } from '../data/members';
import { initialPayments } from '../data/payments';
import { initialEnquiries } from '../data/enquiries';
import { initialNotifications } from '../data/notifications';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface GoldContextType {
  goldRates: GoldRates;
  updateGoldRates: (newRates: Partial<GoldRates>) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFeatured: (id: string) => void;
  toggleProductStock: (id: string) => void;
  calculateProductPrice: (product: Product) => {
    goldValue: number;
    makingCharges: number;
    subtotal: number;
    gst: number;
    total: number;
  };
  schemePlans: SchemePlan[];
  subscriptions: SchemeSubscription[];
  addSubscription: (sub: Omit<SchemeSubscription, 'id' | 'subscriptionNumber' | 'totalPaid' | 'installmentsPaid'>) => SchemeSubscription;
  payInstallment: (subscriptionId: string, amount: number, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash') => Promise<PaymentTransaction>;
  payments: PaymentTransaction[];
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
}

const GoldContext = createContext<GoldContextType | undefined>(undefined);

export const GoldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [goldRates, setGoldRates] = useState<GoldRates>(() => {
    const saved = localStorage.getItem('sgbw_gold_rates');
    return saved ? JSON.parse(saved) : initialGoldRates;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const version = 'sgbw_v3_unique_images';
    const lastVersion = localStorage.getItem('sgbw_products_version');
    if (lastVersion !== version) {
      localStorage.setItem('sgbw_products', JSON.stringify(initialProducts));
      localStorage.setItem('sgbw_products_version', version);
      return initialProducts;
    }
    const saved = localStorage.getItem('sgbw_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((p) => p.id));
        const newItems = initialProducts.filter((p) => !existingIds.has(p.id));
        if (newItems.length > 0) {
          const merged = [...parsed, ...newItems];
          localStorage.setItem('sgbw_products', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const [schemePlans, setSchemePlans] = useState<SchemePlan[]>(() => {
    const saved = localStorage.getItem('sgbw_scheme_plans');
    return saved ? JSON.parse(saved) : initialSchemePlans;
  });

  const [subscriptions, setSubscriptions] = useState<SchemeSubscription[]>(() => {
    const version = localStorage.getItem('sgbw_subs_version_v3');
    if (version !== 'v3_srihan') {
      localStorage.setItem('sgbw_subs_version_v3', 'v3_srihan');
      localStorage.setItem('sgbw_subscriptions', JSON.stringify(initialSchemeMembers));
      return initialSchemeMembers;
    }
    const saved = localStorage.getItem('sgbw_subscriptions');
    return saved ? JSON.parse(saved) : initialSchemeMembers;
  });

  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('sgbw_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('sgbw_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('sgbw_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sgbw_gold_rates', JSON.stringify(goldRates));
  }, [goldRates]);

  useEffect(() => {
    localStorage.setItem('sgbw_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sgbw_scheme_plans', JSON.stringify(schemePlans));
  }, [schemePlans]);

  useEffect(() => {
    localStorage.setItem('sgbw_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('sgbw_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('sgbw_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('sgbw_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Live simulation of real-time events (admin notifications & toasts)
  useEffect(() => {
    const simulationPool = [
      {
        title: 'Payment Received',
        message: 'K. Ramesh Reddy paid ₹20,000 for instalment 10 via UPI',
        type: 'payment' as const,
        toastType: 'success' as const
      },
      {
        title: 'New Bridal Enquiry',
        message: 'New enquiry received for Kemp Temple Lakshmi Choker from Hyderabad Flagship',
        type: 'enquiry' as const,
        toastType: 'info' as const
      },
      {
        title: 'Swarna Sanchay Due Reminder',
        message: 'Instalment due tomorrow for 6 members (automated WhatsApp reminders sent)',
        type: 'scheme' as const,
        toastType: 'warning' as const
      },
      {
        title: 'Payment Alert',
        message: 'Payment retry pending for Lakshmi Prasanna (Instalment 3)',
        type: 'payment' as const,
        toastType: 'error' as const
      },
      {
        title: 'Bullion Benchmark Calibrated',
        message: 'IBJA gold rate synchronized with Hyderabad & Bengaluru bullion desks',
        type: 'rate' as const,
        toastType: 'info' as const
      }
    ];

    let index = 0;
    const interval = setInterval(() => {
      const event = simulationPool[index % simulationPool.length];
      index++;

      const newNotif: NotificationItem = {
        id: `notif-live-${Date.now()}`,
        title: event.title,
        message: event.message,
        time: 'Just now',
        type: event.type,
        read: false,
        actionUrl: event.type === 'payment' ? '/admin/payments' : event.type === 'enquiry' ? '/admin/enquiries' : '/admin/members'
      };

      setNotifications((prev) => [newNotif, ...prev]);
      addToast(event.title, event.message, event.toastType);
    }, 40000); // Trigger every 40s

    return () => clearInterval(interval);
  }, []);

  // Price Calculation helper
  const calculateProductPrice = (product: Product) => {
    const ratePerGram = product.purity === '24K' ? goldRates.gold24k : goldRates.gold22k;
    const goldValue = Math.round(product.netGoldWeight * ratePerGram);
    const makingCharges = Math.round(goldValue * (product.makingChargePercent / 100));
    const subtotal = goldValue + makingCharges;
    const gst = Math.round(subtotal * 0.03); // 3% Indian Gold GST
    const total = subtotal + gst;
    return { goldValue, makingCharges, subtotal, gst, total };
  };

  const updateGoldRates = (newRates: Partial<GoldRates>) => {
    setGoldRates((prev) => ({
      ...prev,
      ...newRates,
      lastUpdated: 'Just now (Admin Live Calibration)'
    }));
    addToast('Bullion Rate Calibrated', 'All catalog prices and market tickers have been dynamically updated.', 'success');
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Product Added', `${newProduct.name} is now live in the Royal Catalog.`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    addToast('Product Updated', 'Changes reflected immediately in catalog and detail views.', 'success');
  };

  const deleteProduct = (id: string) => {
    const toDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product Archived', `${toDelete?.name || 'Item'} removed from active listings.`, 'info');
  };

  const toggleProductFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const addSubscription = (data: Omit<SchemeSubscription, 'id' | 'subscriptionNumber' | 'totalPaid' | 'installmentsPaid'>) => {
    const newSub: SchemeSubscription = {
      ...data,
      id: `sub-${Date.now()}`,
      subscriptionNumber: `SSY-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      installmentsPaid: 1,
      totalPaid: data.monthlyAmount,
      bonusAmount: data.monthlyAmount,
      status: 'ACTIVE'
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    // Also record first payment
    const newPayment: PaymentTransaction = {
      id: `pay-${Date.now()}`,
      receiptNumber: `RCPT-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      subscriptionId: newSub.id,
      subscriptionNumber: newSub.subscriptionNumber,
      customerName: newSub.userName,
      customerPhone: newSub.userPhone,
      amount: newSub.monthlyAmount,
      installmentNumber: 1,
      paymentMethod: 'UPI',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS',
      transactionRef: `UPI/RZP/${Date.now().toString().slice(-8)}`
    };

    setPayments((prev) => [newPayment, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Scheme Enrolled',
      message: `${newSub.userName} enrolled in Swarna Sanchay (₹${newSub.monthlyAmount.toLocaleString('en-IN')}/mo)`,
      time: 'Just now',
      type: 'scheme',
      read: false,
      actionUrl: '/admin/members'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('Welcome to Swarna Sanchay', 'Your scheme has been activated and installment 1 confirmed!', 'success');
    return newSub;
  };

  const payInstallment = async (
    subscriptionId: string,
    amount: number,
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash'
  ): Promise<PaymentTransaction> => {
    const targetSub = subscriptions.find((s) => s.id === subscriptionId);
    const nextInstalmentNum = (targetSub?.installmentsPaid || 0) + 1;

    const receipt: PaymentTransaction = {
      id: `pay-${Date.now()}`,
      receiptNumber: `RCPT-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      subscriptionId,
      subscriptionNumber: targetSub?.subscriptionNumber || 'SSY-2025-XXXX',
      customerName: targetSub?.userName || 'Valued Customer',
      customerPhone: targetSub?.userPhone || '+91 98XXX XXXXX',
      amount,
      installmentNumber: nextInstalmentNum,
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUCCESS',
      transactionRef: `${paymentMethod.toUpperCase()}/RZP/${Date.now().toString().slice(-8)}`
    };

    setPayments((prev) => [receipt, ...prev]);

    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === subscriptionId) {
          const newPaidCount = sub.installmentsPaid + 1;
          const isMatured = newPaidCount >= sub.tenureMonths;
          return {
            ...sub,
            installmentsPaid: newPaidCount,
            totalPaid: sub.totalPaid + amount,
            status: isMatured ? 'MATURED' : 'ACTIVE',
            nextDueDate: isMatured ? 'Matured – Eligible for 12th Month Bonus' : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };
        }
        return sub;
      })
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Payment Received',
      message: `${receipt.customerName} paid ₹${amount.toLocaleString('en-IN')} for instalment ${nextInstalmentNum} via ${paymentMethod}`,
      time: 'Just now',
      type: 'payment',
      read: false,
      actionUrl: '/admin/payments'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('Payment Successful', `Instalment ${nextInstalmentNum} received. Official receipt generated.`, 'success');
    return receipt;
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: 'New'
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Priority Enquiry',
      message: `${newEnquiry.customerName} requested consultation for ${newEnquiry.productName || 'Custom Bridal Jewellery'}`,
      time: 'Just now',
      type: 'enquiry',
      read: false,
      actionUrl: '/admin/enquiries'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('Enquiry Received', 'Our Master Jeweller will contact you within 30 minutes!', 'success');
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    addToast('Status Updated', `Enquiry status changed to ${status}`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read', 'info');
  };

  const resetAllData = () => {
    localStorage.clear();
    setGoldRates(initialGoldRates);
    setProducts(initialProducts);
    setSchemePlans(initialSchemePlans);
    setSubscriptions(initialSchemeMembers);
    setPayments(initialPayments);
    setEnquiries(initialEnquiries);
    setNotifications(initialNotifications);
    addToast('Data Reset', 'Restored pristine demonstration mock data.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <GoldContext.Provider
      value={{
        goldRates,
        updateGoldRates,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductFeatured,
        toggleProductStock,
        calculateProductPrice,
        schemePlans,
        subscriptions,
        addSubscription,
        payInstallment,
        payments,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast,
        resetAllData
      }}
    >
      {children}
    </GoldContext.Provider>
  );
};

export const useGold = () => {
  const context = useContext(GoldContext);
  if (!context) {
    throw new Error('useGold must be used within a GoldProvider');
  }
  return context;
};
