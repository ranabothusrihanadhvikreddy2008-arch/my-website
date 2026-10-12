import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, Award, ShieldCheck, MapPin } from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';

export const CustomerRedeem: React.FC = () => {
  const { user } = useAuth();
  const { subscriptions } = useGold();

  const userSub = subscriptions.find((s) => s.userId === user?.id || s.userName === user?.name) || subscriptions[0];
  const [selectedShowroom, setSelectedShowroom] = useState('Hyderabad Flagship (Pot Market)');
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const totalValue = (userSub?.totalPaid || 110000) + (userSub?.bonusAmount || 10000);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherClaimed(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          LOYALTY MATURITY DESK
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0] mt-0.5">
          Scheme Maturity & Jewellery Redemption
        </h1>
        <p className="text-xs text-[#9E9080] mt-1">
          Redeem your accumulated gold deposits with zero making charges and your full 12th month bonus!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scheme Status (7 cols) */}
        <div className="lg:col-span-7 bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#2D2419]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                {userSub?.planName}
              </h3>
              <span className="text-xs text-[#A89D8F] font-mono">
                A/C: {userSub?.subscriptionNumber}
              </span>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase">
              {userSub?.status === 'MATURED' ? 'Eligible for Redemption' : 'Active (Bonus Accruing)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-[#120F0D] border border-[#2B2317] p-3.5 rounded-xs">
              <span className="text-[#8A7E70] block uppercase text-[10px]">Your Deposits (11 Months)</span>
              <strong className="text-xl font-serif font-bold text-[#FBF7F0]">
                ₹{userSub?.totalPaid.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="bg-[#120F0D] border border-[#2B2317] p-3.5 rounded-xs">
              <span className="text-[#8A7E70] block uppercase text-[10px]">12th Month Sri Ganesh Bonus</span>
              <strong className="text-xl font-serif font-bold text-[#E5B544]">
                + ₹{userSub?.bonusAmount.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-xs text-[#C5B8A8]">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0% Making Charges (VA up to 18%) completely waived across any 22K jewellery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5B8A8]">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Redeemable across Nakshi bangles, temple harams, chokers, or 999 coins</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5B8A8]">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complimentary private bridal suite consultation with senior master karigar</span>
            </div>
          </div>

          <div className="p-4 bg-[#18130E] border border-[#3E301F] rounded-xs flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-[#C5B8A8]">
              Total Redeemable Jewellery Value:
            </span>
            <span className="text-2xl font-serif font-bold text-[#E5B544]">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Right Column: Voucher Claim Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#14100C] border border-[#4D3A1F] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
            Generate Redemption Voucher
          </h3>
          <p className="text-xs text-[#9E9080]">
            Lock your bonus voucher to present at your preferred flagship sanctum.
          </p>

          {voucherClaimed ? (
            <div className="bg-[#19140F] border border-emerald-600/60 rounded-xs p-5 space-y-3 text-center animate-in zoom-in-95">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#FBF7F0]">
                Voucher Generated!
              </h4>
              <p className="text-xs text-[#C5B8A8]">
                Voucher Code: <strong className="text-[#E5B544] font-mono">SGBW-REDEEM-2025-998</strong>
              </p>
              <p className="text-[11px] text-[#8A7E70]">
                Present this voucher along with original photo ID at {selectedShowroom}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                  Preferred Pickup Showroom
                </label>
                <select
                  value={selectedShowroom}
                  onChange={(e) => setSelectedShowroom(e.target.value)}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                >
                  <option value="Hyderabad Flagship (Pot Market)">Hyderabad (Pot Market)</option>
                  <option value="Bengaluru Flagship (Commercial St)">Bengaluru (Commercial St)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                  Registered Subscriber
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.name || 'Srihan'}
                  className="w-full bg-[#100D0B] border border-[#2D2419] rounded-xs px-3 py-2 text-xs text-[#8A7E70]"
                />
              </div>

              <GoldButton type="submit" variant="primary" className="w-full">
                Generate Digital Redemption Voucher
              </GoldButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
