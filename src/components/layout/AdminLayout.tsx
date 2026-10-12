import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Gem,
  Coins,
  Users,
  CreditCard,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ExternalLink,
  Crown,
  Check,
  CheckCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGold } from '../../context/GoldContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadNotificationsCount, markNotificationAsRead, markAllNotificationsAsRead } = useGold();
  const location = useLocation();
  const navigate = useNavigate();

  // If user is not logged in as admin, redirect to Admin Terminal login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/logout');
  };

  const navLinks = [
    { label: 'Bullion Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Royal Products', path: '/admin/products', icon: <Gem className="w-4 h-4" /> },
    { label: 'Live Gold Rates', path: '/admin/gold-rates', icon: <Coins className="w-4 h-4" /> },
    { label: 'Scheme Members', path: '/admin/members', icon: <Users className="w-4 h-4" /> },
    { label: 'Transactions & CSV', path: '/admin/payments', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Customer Enquiries', path: '/admin/enquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Live Notifications', path: '/admin/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Showroom Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0A0807] text-[#FBF7F0] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 bg-[#120E0B] border-r border-[#261E15] flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Logo */}
          <div className="p-5 border-b border-[#261E15] flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#1C1611] border border-[#6E5325] flex items-center justify-center text-[#E5B544]">
                <Crown className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wider text-[#FBF7F0] uppercase">
                  Srihan Admin
                </span>
                <span className="text-[9px] tracking-widest text-[#9E8B75] uppercase font-semibold">
                  Bullion Terminal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#261D12] text-[#E5B544] border-l-2 border-[#E5B544]'
                      : 'text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#18130E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.path === '/admin/notifications' && unreadNotificationsCount > 0 && (
                    <span className="bg-[#E5B544] text-[#0C0A09] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#261E15] space-y-2">
          <Link
            to="/home"
            className="flex items-center justify-between px-3 py-2 text-xs text-[#A89D8F] hover:text-[#E5B544] bg-[#18130E] border border-[#2D2419] rounded-xs transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#A89D8F] hover:text-rose-400 hover:bg-[#18130E] rounded-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Bar */}
        <header className="bg-[#120E0B] border-b border-[#261E15] py-3 px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-[#8A7E70]">
            <span className="font-semibold text-[#D4AF37]">Secunderabad & Bengaluru Desk</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">IBJA Gateway Active</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Notification Center (Bell + Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1A1612] rounded-xs transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#E5B544] text-[#0C0A09] text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Center Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#16120E] border border-[#5E4A28] rounded-sm shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3.5 bg-[#1C1611] border-b border-[#2D2317] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FBF7F0]">
                        Live Notifications
                      </span>
                      <span className="text-[10px] bg-[#291F13] text-[#E5B544] px-1.5 py-0.5 rounded-xs border border-[#6E5325]">
                        {unreadNotificationsCount} new
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[#D4AF37] hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3 h-3" />
                        <span>Mark Read</span>
                      </button>
                      <button
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-[#8A7E70] hover:text-white p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Items List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#211A12]">
                    {notifications.slice(0, 6).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.actionUrl) {
                            navigate(notif.actionUrl);
                            setNotifDropdownOpen(false);
                          }
                        }}
                        className={`p-3 text-xs cursor-pointer hover:bg-[#201811] transition-colors ${
                          !notif.read ? 'bg-[#1C1611]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-[#FBF7F0]">{notif.title}</span>
                          <span className="text-[10px] text-[#7A6E60]">{notif.time}</span>
                        </div>
                        <p className="text-[#A89D8F] text-[11px] leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-[#120E0A] border-t border-[#261E15] text-center">
                    <Link
                      to="/admin/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs font-semibold text-[#E5B544] hover:underline"
                    >
                      View All Notifications Feed →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#201811] border border-[#6E5325] flex items-center justify-center text-[#E5B544] text-xs font-bold font-serif">
                S
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs font-bold text-[#FBF7F0] block leading-tight">
                  {user?.name || 'Srihan'}
                </span>
                <span className="text-[10px] text-[#8A7E70]">Principal Master</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
