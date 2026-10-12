import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Crown,
  Sparkles,
  ShieldCheck,
  KeyRound,
  Phone,
  Mail,
  ArrowRight,
  UserCheck,
  Lock,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const CustomerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/portal';
  const { login, loginAsDemoCustomer, checkEmailExists } = useAuth();

  const [identifier, setIdentifier] = useState('srihan@example.com');
  const [secret, setSecret] = useState('customer123');
  const [useOtp, setUseOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // "show the password don't hide" - default visible!
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Live email existence check
  const [emailCheck, setEmailCheck] = useState<{
    checked: boolean;
    exists: boolean;
    message: string;
    userName?: string;
  }>({
    checked: true,
    exists: true,
    message: 'Verified: Account exists for Srihan',
    userName: 'Srihan'
  });

  useEffect(() => {
    if (!identifier.trim()) {
      setEmailCheck({ checked: false, exists: false, message: '' });
      return;
    }
    const res = checkEmailExists(identifier, 'customer');
    setEmailCheck({
      checked: true,
      exists: res.exists,
      message: res.message,
      userName: res.user?.name || 'Srihan'
    });
  }, [identifier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const result = await login(identifier, secret, 'customer');
      if (result.success) {
        navigate(redirect);
      } else {
        setErrorMsg(result.message || 'Invalid customer credentials');
      }
    } catch {
      setErrorMsg('Login failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCustomer = () => {
    loginAsDemoCustomer();
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-b from-[#18130E] to-[#100D0A] border-2 border-[#6E5325] rounded-sm p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle decorative gold corner notches */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#201811] border border-[#E5B544] text-[#E5B544] mb-1 shadow-gold-glow">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block">
              SRIHAN CUSTOMER PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
              Passbook Login
            </h1>
          </div>
          <p className="text-xs text-[#9E9080]">
            Swarna Sanchay Digital Passbook & Monthly Accumulation Sanctum.
          </p>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-between bg-[#140F0B] border border-[#3A2E1F] p-2.5 rounded-xs text-[11px] text-[#C4B5A5]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted Vault</span>
          </div>
          <span className="text-[#E5B544] font-semibold">BIS 916 Compliant</span>
        </div>

        {/* 1-Click Interactive Demo Access for Srihan */}
        <div className="bg-[#1A140F] border border-[#523F23] rounded-xs p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#E5B544]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Customer Demo Access</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">1-Click</span>
          </div>

          <div className="text-[11px] text-[#A89D8F] space-y-1">
            <p>
              Pre-filled with Subscriber <strong>Srihan</strong>.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37]">
              <span>OTP: 123456</span>
              <span>•</span>
              <span>Pass: customer123</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickCustomer}
            className="w-full py-2 px-3 bg-[#2E2214] hover:bg-[#E5B544] text-[#E5B544] hover:text-[#0C0A09] border border-[#6E5325] text-xs font-bold rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In as Srihan (1-Click Customer Passbook)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xs">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                Registered Mobile Number or Email
              </label>
              <span className="text-[10px] text-[#A89D8F] flex items-center gap-1">
                <Search className="w-3 h-3 text-[#E5B544]" />
                <span>Live Verification</span>
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+91 95429 79999 or srihan@example.com"
                className={`w-full bg-[#120F0D] border rounded-xs pl-9 pr-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none transition-colors ${
                  emailCheck.checked
                    ? emailCheck.exists
                      ? 'border-emerald-600 focus:border-emerald-500'
                      : 'border-rose-600 focus:border-rose-500'
                    : 'border-[#3A2E1F] focus:border-[#E5B544]'
                }`}
              />
              <Phone className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
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
                      ? `✓ Account Exists: ${emailCheck.userName || 'Srihan'}`
                      : `✕ Not Found: "${identifier}" is not registered`}
                  </span>
                </div>

                {!emailCheck.exists && (
                  <Link
                    to="/login"
                    className="text-[10px] bg-rose-900/60 hover:bg-rose-800 text-white font-bold px-2 py-0.5 rounded-xs shrink-0"
                  >
                    Register
                  </Link>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                  {useOtp ? 'Mock OTP (123456)' : 'Account Password'}
                </label>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded-xs">
                  {showPassword ? 'Password Visible' : 'Password Hidden'}
                </span>
              </div>

              <div className="flex items-center gap-3">
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

                <button
                  type="button"
                  onClick={() => {
                    setUseOtp(!useOtp);
                    setSecret(useOtp ? 'customer123' : '123456');
                  }}
                  className="text-[11px] text-[#A89D8F] hover:text-[#FBF7F0] hover:underline cursor-pointer"
                >
                  {useOtp ? 'Use Password' : 'Login with OTP (123456)'}
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type={showPassword || useOtp ? 'text' : 'password'}
                required
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs pl-9 pr-24 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544] font-mono tracking-wider"
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
            <div className="text-[10px] text-[#7A6E60] mt-1">
              Hint: customer123 (or OTP 123456) • Plain text visible by default
            </div>
          </div>

          <GoldButton
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Authenticating Srihan...' : 'Sign In to Srihan Passbook'}
          </GoldButton>
        </form>

        {/* Portal Switch & Footer */}
        <div className="space-y-3 pt-3 border-t border-[#261E15] text-center text-xs">
          <div className="flex items-center justify-center gap-1 text-[#8A7E70]">
            <span>Store Administrator or Goldsmith?</span>
            <Link to="/admin/login" className="text-[#E5B544] hover:underline font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Srihan Admin Terminal Login</span>
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
