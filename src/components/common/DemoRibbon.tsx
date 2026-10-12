import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Shield, User, RotateCcw } from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';

export const DemoRibbon: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { resetAllData } = useGold();
  const { user, loginAsDemoCustomer, loginAsDemoAdmin, logout } = useAuth();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-40 bg-[#1A1612] border border-[#6E5325] text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-xs shadow-lg hover:border-[#D4AF37] transition-colors"
        title="Show Demo Switcher"
      >
        Demo Controls
      </button>
    );
  }

  return (
    <div className="bg-[#1F1710] border-b border-[#4A3B24] text-[#E0D7C9] text-xs py-1.5 px-4 relative z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 text-[#E5B544] px-1.5 py-0.5 rounded-xs font-bold text-[10px] tracking-wider uppercase border border-[#8A6D3B]/40">
            <Sparkles className="w-3 h-3" />
            Demo – Static Data
          </span>
          <span className="hidden sm:inline text-[#A89D8F]">
            Interactive prototype for Sri Ganesh Jewellery.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px]">
            <Link
              to="/portal"
              className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
            >
              <User className="w-3 h-3" />
              <span>Customer Portal</span>
            </Link>
            <span className="text-[#594935]">|</span>
            <Link
              to="/admin"
              className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Panel</span>
            </Link>
          </div>

          <button
            onClick={resetAllData}
            title="Reset Mock Data to Initial State"
            className="text-[10px] text-[#A89D8F] hover:text-[#FBF7F0] flex items-center gap-1 hover:underline ml-1"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span className="hidden md:inline">Reset Data</span>
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-[#8A7E70] hover:text-[#FBF7F0] p-0.5 transition-colors"
            title="Dismiss Demo Ribbon"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
