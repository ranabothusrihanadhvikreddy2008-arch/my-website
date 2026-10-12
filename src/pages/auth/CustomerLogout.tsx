import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Crown, ArrowRight, User, Home as HomeIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const CustomerLogout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform cleanup upon mounting
    logout();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-gradient-to-b from-[#18130E] to-[#100D0A] border-2 border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Subtle decorative gold corner notches */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-600/60 text-emerald-400 mb-1">
          <CheckCircle className="w-8 h-8" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#E5B544] uppercase block">
            SWARNA SANCHAY PASSBOOK
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
            Signed Out Successfully
          </h1>
          <p className="text-xs text-[#A89D8F] max-w-xs mx-auto leading-relaxed">
            Your customer session has been safely closed. Your gold accumulation, passbook units, and nominee details remain secure.
          </p>
        </div>

        {/* Security badge */}
        <div className="inline-flex items-center gap-2 bg-[#1A140F] border border-[#3E301B] px-3.5 py-1.5 rounded-full text-[11px] text-[#D4AF37]">
          <ShieldCheck className="w-4 h-4" />
          <span>Session Terminated • 256-Bit SSL Protected</span>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Link to="/portal/login" className="block w-full">
            <GoldButton variant="primary" className="w-full" size="lg">
              Sign In to Passbook Again
            </GoldButton>
          </Link>

          <Link to="/catalog" className="block w-full">
            <GoldButton variant="outline" className="w-full" size="md">
              Explore Royal Jewellery Catalog
            </GoldButton>
          </Link>

          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 text-xs text-[#A89D8F] hover:text-[#FBF7F0] hover:underline pt-2"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Return to Storefront Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
