import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, X, Clock, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from './GoldButton';

// 10 minutes in milliseconds
const TEN_MINUTES_MS = 10 * 60 * 1000;
const STORAGE_KEY = 'sgbw_periodic_login_timestamp';

export const PeriodicLoginModal: React.FC = () => {
  const { user, login } = useAuth();
  const { addToast } = useGold();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if current page is already an authentication page
  const isAuthPage = [
    '/login',
    '/portal/login',
    '/admin/login',
    '/logout',
    '/portal/logout',
    '/admin/logout'
  ].includes(location.pathname);

  // Initialize and check 10-minute cadence
  useEffect(() => {
    // If user is already logged in, do not prompt at all
    if (user) {
      setIsOpen(false);
      return;
    }

    // Set initial timestamp if none exists
    const storedTime = sessionStorage.getItem(STORAGE_KEY);
    if (!storedTime) {
      sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    // Interval to check every 15 seconds if 10 minutes have elapsed
    const interval = setInterval(() => {
      if (user) return;

      const lastPrompt = parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
      const now = Date.now();

      if (now - lastPrompt >= TEN_MINUTES_MS) {
        // If not on an auth route, show popup
        const currentIsAuth = [
          '/login',
          '/portal/login',
          '/admin/login',
          '/logout',
          '/portal/logout',
          '/admin/logout'
        ].includes(window.location.pathname);

        if (!currentIsAuth) {
          setIsOpen(true);
          sessionStorage.setItem(STORAGE_KEY, now.toString());
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [user]);

  // Handle dismiss (postpone for next 10 minutes)
  const handleDismiss = () => {
    setIsOpen(false);
    setErrorMsg('');
    sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  // Handle direct login from inside popup
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email or mobile number.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      // Attempt login as customer first, if that fails, try admin
      let res = await login(identifier, password, 'customer');
      if (!res.success) {
        res = await login(identifier, password, 'admin');
      }

      if (res.success) {
        setIsOpen(false);
        addToast(
          'Welcome Back!',
          'You are now signed in. All order invoices & updates will be sent directly to your email.',
          'success'
        );
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        setErrorMsg(res.message || 'Invalid email or password. Please verify your credentials.');
      }
    } catch {
      setErrorMsg('An error occurred during authentication. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything if user is logged in, if modal is closed, or if on auth pages
  if (user || !isOpen || isAuthPage) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#120E0B] border-2 border-[#8A6D3B] rounded-sm p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden space-y-5">
        {/* Gold Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E5B544] pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E5B544] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#E5B544] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E5B544] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-[#A89D8F] hover:text-[#FBF7F0] bg-[#1C1611] hover:bg-[#2A1F16] border border-[#423320] p-1.5 rounded-xs transition-colors cursor-pointer"
          title="Remind me in 10 minutes"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Brand Crest */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#2E2214] to-[#120E0B] border border-[#E5B544] text-[#E5B544] shadow-gold-glow">
            <Mail className="w-6 h-6 text-[#E5B544]" />
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block">
              SRI GANESH JEWELLERY • DIRECT MAIL ALERTS
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF7F0] mt-1">
              Sign In to Receive Order Updates
            </h2>
          </div>
        </div>

        {/* Core Value Notice: Direct Email for Orders */}
        <div className="bg-[#1C150D] border border-[#6E5325] p-3.5 rounded-xs space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#E5B544] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why login is important for your orders:</span>
          </div>
          <p className="text-[#C4B5A5] leading-relaxed text-[11px]">
            When you purchase gold, book bridal consultations, or pay scheme instalments, signing in guarantees that official <strong>BIS 916 Hallmark invoices</strong>, booking confirmations, and <strong>dispatch tracking receipts are delivered directly to your verified email address</strong>.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-medium pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Instant Digital Invoices • Zero Missed Deliveries</span>
          </div>
        </div>

        {/* Error notification if login fails */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick In-Modal Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
              Registered Email or Mobile
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or mobile (+91 95429 79999)"
                className="w-full bg-[#16110D] border border-[#3A2E1F] focus:border-[#E5B544] rounded-xs pl-9 pr-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none transition-colors"
              />
              <Mail className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                Password / OTP
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#E5B544] hover:text-[#F3C658] flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#16110D] border border-[#3A2E1F] focus:border-[#E5B544] rounded-xs pl-9 pr-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none font-mono tracking-wider transition-colors"
              />
              <Lock className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
            </div>
          </div>

          <GoldButton
            type="submit"
            variant="primary"
            className="w-full"
            size="md"
            disabled={loading}
          >
            {loading ? 'Verifying & Signing In...' : 'Sign In to Connect Email & Order'}
          </GoldButton>
        </form>

        {/* Modal Footer Controls */}
        <div className="pt-2 border-t border-[#261E15] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#A89D8F]">
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:w-auto text-[11px] hover:text-[#E5B544] flex items-center justify-center gap-1.5 transition-colors py-1 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#E5B544]" />
            <span>Remind me in 10 minutes</span>
          </button>

          <div className="flex items-center gap-2 text-[11px]">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-[#E5B544] hover:underline font-semibold"
            >
              Full Login Page
            </Link>
            <span>•</span>
            <Link
              to="/login?tab=register"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#FBF7F0] hover:underline"
            >
              New Register
            </Link>
          </div>
        </div>

        {/* Test Credential Quick Hint */}
        <div className="text-[10px] font-mono text-[#736352] text-center pt-1">
          Test Customer: srihan@example.com • customer123 (or OTP: 123456)
        </div>
      </div>
    </div>
  );
};
