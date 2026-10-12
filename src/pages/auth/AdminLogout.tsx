import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Home as HomeIcon, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminLogout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="min-h-screen bg-[#080706] text-[#FBF7F0] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-b from-[#16120D] to-[#0D0A08] border-2 border-[#8A6D3B] rounded-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-center space-y-6 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E5B544]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#E5B544]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#E5B544]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E5B544]" />

        {/* Security Lock Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#20170F] border border-[#A68038] text-[#E5B544] mb-1 shadow-gold-glow">
          <Lock className="w-8 h-8" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block">
            ADMINISTRATIVE TERMINAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
            Terminal Session Closed
          </h1>
          <p className="text-xs text-[#A89D8F] max-w-xs mx-auto leading-relaxed">
            Staff credentials and administrative privileges have been revoked for this session. Inventory database and rate modification keys are securely locked.
          </p>
        </div>

        {/* Security badge */}
        <div className="inline-flex items-center gap-2 bg-[#1B140D] border border-[#4A381E] px-3.5 py-1.5 rounded-full text-[11px] text-[#D4AF37]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Vault Locked • TLS 1.3 Certified</span>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Link to="/admin/login" className="block w-full">
            <GoldButton variant="primary" className="w-full" size="lg">
              Re-authenticate as Bullion Master
            </GoldButton>
          </Link>

          <Link to="/home" className="block w-full">
            <GoldButton variant="outline" className="w-full" size="md">
              Return to Public Storefront
            </GoldButton>
          </Link>

          <div className="pt-2">
            <Link
              to="/portal/login"
              className="text-xs text-[#A89D8F] hover:text-[#E5B544] hover:underline"
            >
              Need Customer Passbook? Switch to Customer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
