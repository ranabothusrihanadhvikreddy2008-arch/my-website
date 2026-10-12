import React, { useState } from 'react';
import { ShieldCheck, User, MapPin, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const CustomerProfile: React.FC = () => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Srihan',
    email: user?.email || 'srihan@example.com',
    phone: user?.phone || '+91 95429 79999',
    panNumber: user?.panNumber || 'ABCDE1234F',
    aadhaarNumber: user?.aadhaarNumber || 'XXXX-XXXX-9841',
    address: user?.address || 'Indiranagar, Bengaluru, Karnataka 560038'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          VERIFIED IDENTITY
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#FBF7F0] mt-0.5">
          Subscriber Profile & KYC Status
        </h1>
        <p className="text-xs text-[#9E9080] mt-1">
          Government-mandated bullion customer identity compliance under BIS hallmarking standards.
        </p>
      </div>

      <div className="bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2D2419]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#201811] border border-[#6E5325] flex items-center justify-center text-[#E5B544] font-serif font-bold text-lg">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">{formData.name}</h3>
              <span className="text-xs text-[#A89D8F]">{formData.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold px-3 py-1 rounded-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>KYC Verified</span>
          </div>
        </div>

        {isSaved && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-700 text-emerald-300 text-xs rounded-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                Full Name (as per Aadhaar/PAN)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                PAN Card Number
              </label>
              <input
                type="text"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                Aadhaar (Masked)
              </label>
              <input
                type="text"
                disabled
                value={formData.aadhaarNumber}
                className="w-full bg-[#100D0B] border border-[#261E15] rounded-xs px-3 py-2 text-xs text-[#7A6E60]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
              Delivery / Billing Address
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <GoldButton type="submit" variant="primary" size="md">
              Save Profile Updates
            </GoldButton>
          </div>
        </form>
      </div>
    </div>
  );
};
