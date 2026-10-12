import React from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  Gift,
  User as UserIcon,
  LogOut,
  ArrowLeft,
  Crown,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PortalLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // If customer is not logged in, redirect to Customer Portal login
  if (!user) {
    return <Navigate to="/portal/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/portal/logout');
  };

  const navItems = [
    { label: 'Passbook Overview', path: '/portal', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Payment Receipts', path: '/portal/payments', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Redeem Bonus', path: '/portal/redeem', icon: <Gift className="w-4 h-4" /> },
    { label: 'My KYC & Nominee', path: '/portal/profile', icon: <UserIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#14100D] border-b border-[#2D2419] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/home"
              className="text-xs text-[#A89D8F] hover:text-[#E5B544] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Royal Storefront</span>
            </Link>

            <span className="text-[#3E3120]">|</span>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#201811] border border-[#6E5325] flex items-center justify-center text-[#E5B544]">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-sm text-[#FBF7F0] uppercase tracking-wider hidden sm:inline">
                User Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-[#FBF7F0] block leading-tight">
                {user?.name || 'Srihan'}
              </span>
              <span className="text-[10px] text-[#A89D8F]">
                {user?.phone || '+91 95429 79999'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1611] hover:bg-[#281F17] text-[#A89D8F] hover:text-[#FBF7F0] text-xs font-semibold rounded-xs border border-[#3A2E1F] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-[#100D0B] border-b border-[#261E15] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none py-2 text-xs">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 py-2 px-3 rounded-xs font-semibold uppercase tracking-wider shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#291F13] text-[#E5B544] border border-[#6E5325]'
                    : 'text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#16120E]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
