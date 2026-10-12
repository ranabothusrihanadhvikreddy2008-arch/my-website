import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Calendar,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Search,
  User as UserIcon,
  Crown,
  Lock,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { BookViewingModal } from '../common/BookViewingModal';

export const Navbar: React.FC = () => {
  const { goldRates } = useGold();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Showroom Home', path: '/home' },
    { name: 'Masterpiece Collections', path: '/catalog' },
    { name: 'Swarna Sanchay', path: '/schemes' },
    { name: 'Heritage Atelier', path: '/custom-bridal' },
    { name: 'Bridal Guild', path: '/catalog?category=bridal' },
    { name: 'Showrooms', path: '/showrooms' }
  ];

  const marqueeItems = [
    'Antique Bangles & Kadas',
    'Temple Lakshmi Chokers',
    'Chains & Mangalsutra',
    'Kasu & Mango Malas',
    'Earrings & Jhumkas',
    'Royal Bridal Vaddanam',
    'HUID Laser Hallmarked 916',
    '100% Karatmeter Certified Bullion'
  ];

  const handleLogout = () => {
    const isUserAdmin = user?.role === 'admin';
    logout();
    setUserDropdownOpen(false);
    navigate(isUserAdmin ? '/admin/logout' : '/portal/logout');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0C0A09]/95 backdrop-blur-md border-b border-[#2D2419]">
        {/* Top Utility Ticker Bar (Screen 1 Source of Truth) */}
        <div className="bg-[#120F0D] border-b border-[#261E15] text-[11px] text-[#A89D8F] py-1.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-medium text-[#C4B5A5]">
                Live Bullion:{' '}
                <strong className="text-[#D4AF37]">
                  22K (916) ₹{goldRates.gold22k.toLocaleString('en-IN')}/g
                </strong>{' '}
                | <strong className="text-[#D4AF37]">24K ₹{goldRates.gold24k.toLocaleString('en-IN')}/g</strong>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[#9E8B75] tracking-widest uppercase text-[10px] font-semibold">
              <span>✦ ESTD. 1978</span>
              <span>•</span>
              <span>HYDERABAD & BENGALURU SANCTUM ✦</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/919542979999"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[#E5B544] hover:text-[#F3C658] transition-colors"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>Direct Karigar WhatsApp</span>
              </a>

              <Link
                to="/showrooms"
                className="inline-flex items-center gap-1 hover:text-[#FBF7F0] transition-colors"
              >
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden xs:inline">Store Sanctums</span>
              </Link>

              <span className="inline-flex items-center gap-1 bg-[#261D12] text-[#E5B544] px-1.5 py-0.5 rounded-xs border border-[#6E5325] text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                <span>BIS 916</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Royal Crest */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#2E2214] via-[#1B140D] to-[#0D0A08] border-2 border-[#8A6D3B] flex items-center justify-center text-[#E5B544] shadow-md group-hover:border-[#E5B544] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5B544] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-pulse pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.14em] text-[#FBF7F0] group-hover:text-[#E5B544] transition-colors uppercase leading-tight">
                Sri Ganesh Jewellery
              </span>
              <span className="text-[9px] tracking-[0.24em] text-[#C4A052] font-semibold uppercase leading-tight flex items-center gap-1">
                <span>Tradition Crafted in Gold</span>
                <span>•</span>
                <span className="text-[#E5B544]">Purity Certified 916</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#E5B544]'
                      : 'text-[#D0C4B4] hover:text-[#E5B544]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5B544] shadow-[0_0_8px_#E5B544]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Unique Portal Access & User Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Catalog Quick Search */}
            <Link
              to="/catalog"
              className="p-2 text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1A1612] rounded-xs transition-colors hidden sm:flex"
              title="Search Masterpieces"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Portal Actions: Customer Portal + Admin Terminal */}
            {user ? (
              /* Signed In Profile Button + Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-xs border transition-all cursor-pointer ${
                    user.role === 'admin'
                      ? 'bg-[#20170F] text-[#E5B544] border-[#8A6D3B] hover:border-[#D4AF37]'
                      : 'bg-[#18130E] text-[#D4AF37] border-[#5E4A28] hover:border-[#E5B544]'
                  }`}
                >
                  {user.role === 'admin' ? (
                    <Crown className="w-3.5 h-3.5 text-[#E5B544]" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  )}
                  <span className="font-semibold uppercase tracking-wider text-[11px] max-w-[120px] truncate hidden sm:inline">
                    {user.name.split(' ')[0]} ({user.role === 'admin' ? 'Admin' : 'Member'})
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#14100D] border border-[#5E4A28] rounded-sm shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="pb-2.5 mb-2.5 border-b border-[#261E15]">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#E5B544] block">
                        {user.role === 'admin' ? 'Bullion Master Account' : 'Swarna Sanchay Passbook'}
                      </span>
                      <p className="text-xs font-bold text-[#FBF7F0] truncate mt-0.5">{user.name}</p>
                      <p className="text-[11px] text-[#8A7E70] truncate">{user.email || user.phone}</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to={user.role === 'admin' ? '/admin' : '/portal'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 text-xs text-[#FBF7F0] hover:text-[#E5B544] hover:bg-[#1E1711] rounded-xs transition-colors"
                      >
                        <span className="font-semibold">
                          {user.role === 'admin' ? 'Admin Terminal' : 'Passbook Dashboard'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A7E70]" />
                      </Link>

                      {user.role === 'admin' ? (
                        <Link
                          to="/admin/gold-rates"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1E1711] rounded-xs transition-colors"
                        >
                          <span>Live Rates Desk</span>
                        </Link>
                      ) : (
                        <Link
                          to="/portal/payments"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1E1711] rounded-xs transition-colors"
                        >
                          <span>Payment Receipts</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xs transition-colors pt-2 border-t border-[#261E15] mt-1 cursor-pointer"
                      >
                        <span className="font-bold uppercase tracking-wider">Sign Out</span>
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Signed Out: Separate Customer and Admin portal buttons */
              <div className="flex items-center gap-2">
                {/* Customer Portal Button */}
                <Link
                  to="/portal/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#FBF7F0] bg-[#18130E] hover:bg-[#251D16] border border-[#5E4A28] hover:border-[#D4AF37] rounded-xs transition-all shadow-sm"
                  title="Swarna Sanchay Scheme Member Passbook"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">User Portal</span>
                  <span className="sm:hidden">Portal</span>
                </Link>

                {/* Admin Terminal Button */}
                <Link
                  to="/admin/login"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#A89D8F] hover:text-[#E5B544] bg-[#120E0B] hover:bg-[#1C1611] border border-[#3A2E1F] hover:border-[#8A6D3B] rounded-xs transition-all hidden md:flex"
                  title="Staff & Goldsmith Admin Terminal"
                >
                  <Lock className="w-3.5 h-3.5 text-[#8A6D3B]" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            )}

            {/* Book Viewing Button */}
            <button
              onClick={() => setIsViewingModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-xs font-bold px-3.5 py-2 rounded-xs uppercase tracking-wider transition-all duration-200 border border-[#ECC870] shadow-sm hover:shadow-gold-glow cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#E5B544] hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Curated Salons Ticker / Marquee (Screen 1 Pattern) */}
        <div className="bg-[#100D0A] border-t border-[#211A12] py-1.5 px-4 overflow-hidden text-[10px] uppercase tracking-widest text-[#9E8B75]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="text-[#D4AF37] font-bold shrink-0 mr-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Curated Salons:</span>
            </span>
            <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-4 text-[#8C7D6B]">
              {marqueeItems.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-4">
                  <Link
                    to="/catalog"
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {item}
                  </Link>
                  <span className="text-[#4A3B28]">✦</span>
                </span>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0 ml-3 text-[#D4AF37] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HUID Certified</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#14110E] border-b border-[#3D3020] px-5 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            <div className="flex flex-col space-y-3 pb-4 border-b border-[#2B2217]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-[#FBF7F0] hover:text-[#E5B544] py-1 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#6E5325]" />
                </Link>
              ))}
            </div>

            {/* Portal Direct Access on Mobile */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5B544] block">
                PORTALS & TERMINALS
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to={user?.role === 'customer' ? '/portal' : '/portal/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-1 bg-[#1A140E] border border-[#5E4A28] hover:border-[#E5B544] text-[#FBF7F0] p-3 rounded-xs text-center transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#E5B544]" />
                  <span className="text-xs font-bold uppercase tracking-wider">User Portal</span>
                  <span className="text-[9px] text-[#A89D8F]">Scheme Passbook</span>
                </Link>

                <Link
                  to={user?.role === 'admin' ? '/admin' : '/admin/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-1 bg-[#14100C] border border-[#423320] hover:border-[#8A6D3B] text-[#FBF7F0] p-3 rounded-xs text-center transition-colors"
                >
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Admin Portal</span>
                  <span className="text-[9px] text-[#A89D8F]">Bullion & Rates</span>
                </Link>
              </div>

              {user && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out ({user.name.split(' ')[0]})</span>
                </button>
              )}
            </div>

            {/* Book Viewing Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsViewingModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-bold py-3 text-xs uppercase tracking-wider rounded-xs shadow-gold-glow cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Showroom Viewing Slot</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Book Viewing Modal */}
      <BookViewingModal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
      />
    </>
  );
};
