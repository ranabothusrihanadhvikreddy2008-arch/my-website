import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  KeyRound,
  Sparkles,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lock,
  Crown,
  Phone,
  Mail,
  Search,
  UserPlus,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const redirect = searchParams.get('redirect');
  const {
    login,
    loginAsDemoCustomer,
    loginAsDemoAdmin,
    user,
    logout,
    checkEmailExists,
    registeredUsers,
    register
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'customer' | 'admin' | 'register'>(
    roleParam === 'admin' ? 'admin' : 'customer'
  );
  const [identifier, setIdentifier] = useState(
    activeTab === 'admin' ? 'admin@sgbw.com' : 'srihan@example.com'
  );
  const [secret, setSecret] = useState(activeTab === 'admin' ? 'admin123' : 'customer123');
  const [useOtp, setUseOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // "show the password don't hide" - default visible!
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Email verification state
  const [emailCheckState, setEmailCheckState] = useState<{
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

  // Directory drawer toggle
  const [showDirectory, setShowDirectory] = useState(false);

  // Registration state
  const [regName, setRegName] = useState('Srihan');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+91 95429 79999');
  const [regLoading, setRegLoading] = useState(false);

  // Live verification when identifier or tab changes
  useEffect(() => {
    if (!identifier.trim()) {
      setEmailCheckState({
        checked: false,
        exists: false,
        message: ''
      });
      return;
    }

    if (activeTab === 'register') return;

    const res = checkEmailExists(identifier, activeTab === 'admin' ? 'admin' : 'customer');
    setEmailCheckState({
      checked: true,
      exists: res.exists,
      message: res.message,
      userName: res.user?.name || 'Srihan'
    });
  }, [identifier, activeTab]);

  const handleTabSwitch = (tab: 'customer' | 'admin' | 'register') => {
    setActiveTab(tab);
    setErrorMsg('');
    setSuccessMsg('');
    if (tab === 'admin') {
      setIdentifier('admin@sgbw.com');
      setSecret('admin123');
      setUseOtp(false);
    } else if (tab === 'customer') {
      setIdentifier('srihan@example.com');
      setSecret('customer123');
    }
  };

  const handleManualVerify = () => {
    setErrorMsg('');
    const res = checkEmailExists(identifier, activeTab === 'admin' ? 'admin' : 'customer');
    setEmailCheckState({
      checked: true,
      exists: res.exists,
      message: res.message,
      userName: res.user?.name || 'Srihan'
    });
    if (!res.exists) {
      setErrorMsg(`Verification Result: Email "${identifier}" does NOT exist in registered records.`);
    } else {
      setSuccessMsg(`Verification Result: ${res.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const result = await login(
        identifier,
        secret,
        activeTab === 'admin' ? 'admin' : 'customer'
      );
      if (result.success) {
        if (activeTab === 'admin' || identifier.toLowerCase() === 'admin@sgbw.com') {
          navigate(redirect || '/admin');
        } else {
          navigate(redirect || '/portal');
        }
      } else {
        setErrorMsg(result.message || 'Invalid credentials');
      }
    } catch {
      setErrorMsg('Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setRegLoading(true);

    try {
      const res = await register({
        name: regName || 'Srihan',
        email: regEmail,
        phone: regPhone
      });
      if (res.success) {
        navigate(redirect || '/portal');
      } else {
        setErrorMsg(res.message || 'Registration failed');
      }
    } catch {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-b from-[#18130E] to-[#100D0A] border-2 border-[#6E5325] rounded-sm p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle decorative gold corner notches */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/home" className="inline-block group">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block group-hover:text-[#F3C658] transition-colors">
              SRI GANESH BANGLE WORKS • ESTD 1978
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
            Portal Authentication
          </h1>
          <p className="text-xs text-[#9E9080]">
            Verified database login for Srihan Customer Portal & Admin Terminal.
          </p>
        </div>

        {/* Active Session Notice if already logged in */}
        {user && (
          <div className="p-3 bg-[#1C150E] border border-[#A68038]/60 rounded-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#E5B544] font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Session: Srihan</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded-xs">
                {user.role === 'admin' ? 'Srihan Admin' : 'Srihan Member'}
              </span>
            </div>
            <p className="text-xs text-[#FBF7F0]">
              Logged in as <strong>{user.name || 'Srihan'}</strong> ({user.email})
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Link
                to={user.role === 'admin' ? '/admin' : '/portal'}
                className="flex-1 py-1.5 px-3 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-xs font-bold uppercase tracking-wider rounded-xs text-center transition-colors shadow-sm"
              >
                Go to {user.role === 'admin' ? 'Srihan Admin Terminal' : 'Srihan Passbook'} →
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="py-1.5 px-3 bg-[#261D12] hover:bg-rose-950/40 text-[#A89D8F] hover:text-rose-300 border border-[#423320] text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Portal Switcher Tabs: Customer, Admin, Register */}
        <div className="grid grid-cols-3 p-1 bg-[#120F0D] border border-[#3A2E1F] rounded-xs gap-1">
          <button
            type="button"
            onClick={() => handleTabSwitch('customer')}
            className={`py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'customer'
                ? 'bg-[#E5B544] text-[#0C0A09] shadow-sm'
                : 'text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1A1510]'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Srihan Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('admin')}
            className={`py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#E5B544] text-[#0C0A09] shadow-sm'
                : 'text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1A1510]'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>Srihan Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('register')}
            className={`py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-[#E5B544] text-[#0C0A09] shadow-sm'
                : 'text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1A1510]'
            }`}
          >
            <UserPlus className="w-3 h-3" />
            <span>Register</span>
          </button>
        </div>

        {/* 1-Click Interactive Demo Access for Srihan */}
        {activeTab !== 'register' && (
          <div className="bg-[#1A140F] border border-[#523F23] rounded-xs p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#E5B544]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeTab === 'customer' ? 'Srihan Customer Pass' : 'Srihan Admin Terminal Pass'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">1-Click Fast Pass</span>
            </div>

            <p className="text-[11px] text-[#A89D8F]">
              {activeTab === 'customer' ? (
                <>Pre-filled for registered subscriber <strong>Srihan</strong> (Swarna Sanchay Passbook: SSY-2025-1102).</>
              ) : (
                <>Pre-filled for bullion master <strong>Srihan</strong> (Principal Controller Terminal).</>
              )}
            </p>

            <button
              type="button"
              onClick={() => {
                if (activeTab === 'customer') {
                  loginAsDemoCustomer();
                  navigate(redirect || '/portal');
                } else {
                  loginAsDemoAdmin();
                  navigate(redirect || '/admin');
                }
              }}
              className="w-full py-2 px-3 bg-[#2E2214] hover:bg-[#E5B544] text-[#E5B544] hover:text-[#0C0A09] border border-[#6E5325] text-xs font-bold rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Crown className="w-4 h-4" />
              <span>Sign In as Srihan ({activeTab === 'customer' ? 'Customer Portal' : 'Admin Terminal'}) (1-Click)</span>
            </button>
          </div>
        )}

        {/* Global Notifications: Error or Success */}
        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xs flex items-start gap-2">
            <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <div className="flex-1 leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <div className="flex-1 leading-relaxed">{successMsg}</div>
          </div>
        )}

        {/* TAB 1 & 2: LOGIN FORM WITH EMAIL VERIFIER & UNMASKED PASSWORD */}
        {activeTab !== 'register' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                  {activeTab === 'customer' ? 'Srihan Customer Email or Mobile' : 'Srihan Admin Terminal Email'}
                </label>

                {/* Explicit Verify Email Button */}
                <button
                  type="button"
                  onClick={handleManualVerify}
                  className="text-[11px] text-[#E5B544] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  title="Verify whether this email exists in our records"
                >
                  <Search className="w-3 h-3" />
                  <span>Verify Email</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={activeTab === 'admin' ? 'email' : 'text'}
                  required
                  placeholder={activeTab === 'admin' ? 'admin@sgbw.com' : 'srihan@example.com'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`w-full bg-[#120F0D] border rounded-xs pl-9 pr-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none transition-colors ${
                    emailCheckState.checked
                      ? emailCheckState.exists
                        ? 'border-emerald-600 focus:border-emerald-500'
                        : 'border-rose-600 focus:border-rose-500'
                      : 'border-[#3A2E1F] focus:border-[#E5B544]'
                  }`}
                />
                {activeTab === 'customer' ? (
                  <Phone className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
                ) : (
                  <Mail className="w-4 h-4 text-[#8A7E70] absolute left-3 top-3" />
                )}
              </div>

              {/* LIVE EMAIL EXISTENCE STATUS BADGE */}
              {emailCheckState.checked && (
                <div
                  className={`mt-1.5 p-2 rounded-xs text-[11px] flex items-center justify-between gap-2 border ${
                    emailCheckState.exists
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {emailCheckState.exists ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span className="truncate">
                      {emailCheckState.exists
                        ? `✓ Account Exists: ${emailCheckState.userName || 'Srihan'}`
                        : `✕ Not Found: "${identifier}" is not registered`}
                    </span>
                  </div>

                  {!emailCheckState.exists && (
                    <button
                      type="button"
                      onClick={() => {
                        setRegEmail(identifier);
                        setActiveTab('register');
                      }}
                      className="text-[10px] bg-rose-900/60 hover:bg-rose-800 text-white font-bold px-2 py-0.5 rounded-xs shrink-0 cursor-pointer"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* PASSWORD FIELD WITH "SHOW THE PASSWORD DON'T HIDE" TOGGLE (DEFAULT VISIBLE!) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#C4B5A5]">
                    {activeTab === 'customer' && useOtp ? 'Mock OTP (123456)' : 'Security Password'}
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded-xs">
                    {showPassword ? 'Password Visible' : 'Password Hidden'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Eye Toggle: Show/Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#E5B544] hover:text-[#F3C658] flex items-center gap-1 cursor-pointer font-medium"
                    title={showPassword ? 'Hide password characters' : 'Show password characters'}
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

                  {activeTab === 'customer' && (
                    <button
                      type="button"
                      onClick={() => {
                        setUseOtp(!useOtp);
                        setSecret(useOtp ? 'customer123' : '123456');
                      }}
                      className="text-[11px] text-[#A89D8F] hover:text-[#FBF7F0] hover:underline cursor-pointer"
                    >
                      {useOtp ? 'Use Password' : 'Use OTP (123456)'}
                    </button>
                  )}
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

                {/* Right button inside input for immediate visibility indicator */}
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
                <span>Demo key: {activeTab === 'admin' ? 'admin123' : 'customer123 (or OTP 123456)'}</span>
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
              {loading
                ? 'Authenticating Srihan...'
                : `Enter ${activeTab === 'customer' ? 'Srihan Customer Passbook' : 'Srihan Admin Terminal'}`}
            </GoldButton>
          </form>
        ) : (
          /* TAB 3: REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-in fade-in duration-200">
            <div className="p-2.5 bg-[#1C1610] border border-[#6E5325] rounded-xs text-[11px] text-[#C4B5A5]">
              Register your email with Sri Ganesh Bangle Works to activate your digital gold passbook and start tracking Swarna Sanchay schemes.
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                placeholder="Srihan"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="srihan@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 95429 79999"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <GoldButton
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={regLoading}
            >
              {regLoading ? 'Registering...' : 'Create & Verify Passbook for Srihan'}
            </GoldButton>
          </form>
        )}

        {/* REGISTERED EMAILS DIRECTORY ACCORDION */}
        <div className="border border-[#2D2317] rounded-xs overflow-hidden bg-[#120E0A]">
          <button
            type="button"
            onClick={() => setShowDirectory(!showDirectory)}
            className="w-full p-2.5 text-xs text-[#C4B5A5] hover:text-[#E5B544] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-[#E5B544]" />
              <span>Registered Accounts Database ({registeredUsers.length} total)</span>
            </span>
            {showDirectory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showDirectory && (
            <div className="p-3 border-t border-[#261E15] space-y-2 text-xs max-h-48 overflow-y-auto">
              <p className="text-[11px] text-[#8A7E70]">
                Click any account to autofill and verify:
              </p>
              <div className="space-y-1.5">
                {registeredUsers.map((regUser) => (
                  <div
                    key={regUser.id}
                    onClick={() => {
                      setActiveTab(regUser.role === 'admin' ? 'admin' : 'customer');
                      setIdentifier(regUser.email);
                      setSecret(regUser.role === 'admin' ? 'admin123' : 'customer123');
                    }}
                    className="p-1.5 bg-[#1A140F] hover:bg-[#251D14] border border-[#3D3020] rounded-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-[#FBF7F0] block leading-tight">
                        {regUser.email}
                      </span>
                      <span className="text-[10px] text-[#A89D8F]">
                        {regUser.name} • {regUser.role === 'admin' ? 'Admin Master' : 'Customer'}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded-xs">
                      Existing
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guest Access to Storefront */}
        <div className="pt-2 border-t border-[#261E15] space-y-2">
          <Link
            to="/home"
            className="w-full py-2.5 px-3 bg-[#16120E] hover:bg-[#221A13] text-[#E5B544] hover:text-[#F3C658] border border-[#5E4A28] text-xs font-semibold rounded-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore 22K Masterpiece Showroom as Guest →</span>
          </Link>

          <div className="text-center text-xs text-[#8A7E70] pt-1">
            <Link to="/home" className="text-[#A89D8F] hover:text-[#FBF7F0] hover:underline text-[11px]">
              ← Return to Sri Ganesh Storefront Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
