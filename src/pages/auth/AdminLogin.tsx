import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  KeyRound,
  Mail,
  ArrowRight,
  UserCheck,
  Crown,
  Landmark,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const { login, loginAsDemoAdmin, checkEmailExists } = useAuth();

  const [email, setEmail] = useState('admin@sgbw.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(true); // "show the password don't hide" - default visible!
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Live admin email existence check
  const [emailCheck, setEmailCheck] = useState<{
    checked: boolean;
    exists: boolean;
    message: string;
    userName?: string;
  }>({
    checked: true,
    exists: true,
    message: 'Verified: Principal Bullion Master account found',
    userName: 'Srihan'
  });

  useEffect(() => {
    if (!email.trim()) {
      setEmailCheck({ checked: false, exists: false, message: '' });
      return;
    }
    const res = checkEmailExists(email, 'admin');
    setEmailCheck({
      checked: true,
      exists: res.exists,
      message: res.message,
      userName: res.user?.name || 'Srihan'
    });
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const result = await login(email, password, 'admin');
      if (result.success) {
        navigate(redirect);
      } else {
        setErrorMsg(result.message || 'Invalid bullion administrator credentials.');
      }
    } catch {
      setErrorMsg('Terminal connection failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdmin = () => {
    loginAsDemoAdmin();
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-[#080706] text-[#FBF7F0] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-b from-[#16120D] to-[#0D0A08] border-2 border-[#8A6D3B] rounded-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6 relative overflow-hidden">
        {/* Subtle security mesh corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E5B544]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E5B544]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#E5B544]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E5B544]" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1C150E] border border-[#8A6D3B] text-[#E5B544] mb-1 shadow-gold-glow">
            <Lock className="w-6 h-6 text-[#E5B544]" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block">
              SRIHAN ADMIN TERMINAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
              Staff & Vault Login
            </h1>
          </div>
          <p className="text-xs text-[#9E9080]">
            Authorized Goldsmith & Bullion Controller Terminal.
          </p>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-between bg-[#110D09] border border-[#3A2A16] p-2.5 rounded-xs text-[11px] text-[#A89D8F]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Restricted Access Terminal</span>
          </div>
          <span className="text-emerald-400 font-mono font-semibold">IBJA Gateway</span>
        </div>

        {/* 1-Click Master Access for Srihan */}
        <div className="bg-[#1C150D] border border-[#5A4320] rounded-xs p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#E5B544]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Master Admin Credentials</span>
            </span>
            <span className="text-[10px] text-[#A89D8F] font-mono">Principal Bullion Master</span>
          </div>

          <div className="text-[11px] text-[#A89D8F] space-y-1">
            <p>
              Login as <strong>Srihan</strong> (Principal Bullion Controller & Goldsmith).
            </p>
            <div className="text-[10px] font-mono text-[#E5B544]">
              <span>admin@sgbw.com • admin123</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdmin}
            className="w-full py-2 px-3 bg-[#2A1D0E] hover:bg-[#E5B544] text-[#E5B544] hover:text-[#0C0A09] border border-[#7D5C26] text-xs font-bold rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Crown className="w-4 h-4" />
            <span>Sign In as Srihan (1-Click Admin Master)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xs">
            {errorMsg}
          </div>
        )}

        {/* Admin Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                Admin Terminal Email
              </label>
              <span className="text-[10px] text-[#A89D8F] flex items-center gap-1">
                <Search className="w-3 h-3 text-[#E5B544]" />
                <span>Bullion Master Check</span>
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sgbw.com"
                className={`w-full bg-[#100D0A] border rounded-xs pl-9 pr-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none transition-colors ${
                  emailCheck.checked
                    ? emailCheck.exists
                      ? 'border-emerald-600 focus:border-emerald-500'
                      : 'border-rose-600 focus:border-rose-500'
                    : 'border-[#3A2E1F] focus:border-[#E5B544]'
                }`}
              />
              <Mail className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
            </div>

            {/* Email Existence Live Status Badge */}
            {emailCheck.checked && (
              <div
                className={`mt-1.5 p-2 rounded-xs text-[11px] flex items-center justify-between gap-2 border ${
                  emailCheck.exists
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {emailCheck.exists ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span className="truncate">
                    {emailCheck.exists
                      ? `✓ Authorized Terminal Account: ${emailCheck.userName || 'Srihan'}`
                      : `✕ Unauthorized: "${email}" is not an administrative email`}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                  Staff Security Key / Password
                </label>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded-xs">
                  {showPassword ? 'Password Visible' : 'Password Hidden'}
                </span>
              </div>

              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#E5B544] hover:text-[#F3C658] flex items-center gap-1 cursor-pointer font-medium"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
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
                className="w-full bg-[#100D0A] border border-[#3A2E1F] rounded-xs pl-9 pr-24 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544] font-mono tracking-wider"
              />
              <KeyRound className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2 px-2 py-1 bg-[#1A140F] hover:bg-[#281F16] border border-[#5E4A28] rounded-xs text-[#E5B544] flex items-center gap-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3 h-3 text-[#E5B544]" />
                    <span>Shown</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 text-[#8A7E70]" />
                    <span className="text-[#A89D8F]">Hidden</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#7A6E60] mt-1">
              <span>Security Key: admin123</span>
              <span className="text-emerald-400 font-mono">Plain text visible by default</span>
            </div>
          </div>

          <GoldButton
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Validating Srihan...' : 'Authenticate & Open Srihan Terminal'}
          </GoldButton>
        </form>

        {/* Links */}
        <div className="space-y-3 pt-3 border-t border-[#261E15] text-center text-xs">
          <div className="flex items-center justify-center gap-1 text-[#8A7E70]">
            <span>Looking for Scheme Passbook?</span>
            <Link to="/portal/login" className="text-[#E5B544] hover:underline font-semibold">
              Srihan Customer Portal Login
            </Link>
          </div>

          <div>
            <Link to="/home" className="text-[#A89D8F] hover:text-[#FBF7F0] text-[11px] hover:underline">
              ← Return to Sri Ganesh Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
