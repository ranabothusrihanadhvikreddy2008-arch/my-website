import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CreditCard,
  MessageSquare,
  Gift,
  Coins,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { NotificationItem } from '../../data/types';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminNotifications: React.FC = () => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addToast
  } = useGold();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredNotifications = notifications.filter((notif) => {
    if (categoryFilter === 'Unread') return !notif.read;
    if (categoryFilter !== 'All') return notif.type === categoryFilter;
    return true;
  });

  const handleSimulateEvent = () => {
    const randomEvents = [
      {
        title: 'Instant UPI Payment',
        message: 'B. Srilakshmi completed Month 6 installment of ₹10,000 via PhonePe UPI',
        type: 'payment' as const
      },
      {
        title: 'Priority Temple Haar Enquiry',
        message: 'New consultation request from Smt. Anuradha for Floral Kasu Mala (Long Haar)',
        type: 'enquiry' as const
      },
      {
        title: 'New Swarna Sanchay Registration',
        message: 'S. Mahesh enrolled for 11+1 Scheme at Bengaluru Flagship (₹15,000/mo)',
        type: 'scheme' as const
      }
    ];

    const pick = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    const newNotif: NotificationItem = {
      id: `notif-manual-${Date.now()}`,
      title: pick.title,
      message: pick.message,
      time: 'Just now',
      type: pick.type,
      read: false,
      actionUrl: pick.type === 'payment' ? '/admin/payments' : pick.type === 'enquiry' ? '/admin/enquiries' : '/admin/members'
    };

    // Update state via context through toast
    addToast(pick.title, pick.message, 'success');
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'enquiry':
        return <MessageSquare className="w-4 h-4 text-[#E5B544]" />;
      case 'scheme':
        return <Gift className="w-4 h-4 text-purple-400" />;
      case 'rate':
        return <Coins className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            LIVE DISPATCH FEED
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            System Notifications & Alerts
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Real-time activity dispatch feed for online deposits, enquiries, and scheme due alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateEvent}
            className="flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#E5B544] border border-[#6E5325] px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Real-Time Event</span>
          </button>

          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 bg-[#16120E] hover:bg-[#201811] text-[#A89D8F] hover:text-[#FBF7F0] border border-[#352B1E] px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'All', label: 'All Alerts' },
          { id: 'Unread', label: `Unread (${unreadNotificationsCount})` },
          { id: 'payment', label: 'Payments' },
          { id: 'enquiry', label: 'Enquiries' },
          { id: 'scheme', label: 'Scheme' },
          { id: 'rate', label: 'Bullion Rates' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors shrink-0 ${
              categoryFilter === tab.id
                ? 'bg-[#2E2214] text-[#E5B544] border border-[#E5B544]'
                : 'bg-[#14100D] text-[#8A7E70] border border-[#261E15] hover:text-[#FBF7F0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center bg-[#14100D] border border-[#261E15] rounded-sm text-[#8A7E70] text-xs">
            No notifications in this filter category.
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-sm border transition-all flex items-start justify-between gap-4 ${
                !notif.read
                  ? 'bg-[#18130E] border-[#5E4A28] shadow-md'
                  : 'bg-[#120F0D] border-[#261E15] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#1C1611] border border-[#3A2E1F] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#FBF7F0]">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#E5B544] shrink-0" />
                    )}
                    <span className="text-[10px] text-[#7A6E60] font-mono">• {notif.time}</span>
                  </div>

                  <p className="text-xs text-[#A89D8F] leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markNotificationAsRead(notif.id)}
                    className="p-1.5 text-[#8A7E70] hover:text-[#E5B544] hover:bg-[#1C1611] rounded-xs transition-colors"
                    title="Mark as Read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                {notif.actionUrl && (
                  <button
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      navigate(notif.actionUrl!);
                    }}
                    className="p-1.5 text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1C1611] rounded-xs transition-colors"
                    title="Navigate to Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
