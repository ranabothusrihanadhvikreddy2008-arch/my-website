import React, { useState } from 'react';
import { X, Sparkles, Scale, Percent } from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from './GoldButton';
import { Link } from 'react-router-dom';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const { goldRates } = useGold();
  const [tab, setTab] = useState<'scheme' | 'weight'>('scheme');

  // Scheme calculator state
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);

  // Weight calculator state
  const [weightGrams, setWeightGrams] = useState<number>(25);
  const [purity, setPurity] = useState<'22K' | '24K'>('22K');
  const [makingPercent, setMakingPercent] = useState<number>(12);

  if (!isOpen) return null;

  // Scheme calculations
  const totalDeposit = monthlyAmount * 11;
  const bonusAmount = monthlyAmount;
  const waivedChargesApprox = Math.round(monthlyAmount * 12 * 0.18);
  const totalJewelleryValue = totalDeposit + bonusAmount;

  // Weight calculations
  const ratePerGram = purity === '24K' ? goldRates.gold24k : goldRates.gold22k;
  const goldValue = Math.round(weightGrams * ratePerGram);
  const makingCharge = Math.round(goldValue * (makingPercent / 100));
  const subtotal = goldValue + makingCharge;
  const gst = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A89D8F] hover:text-[#FBF7F0] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sri Ganesh Precision Tools</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Interactive Bullion & Scheme Calculator
          </h3>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-[#100D0B] border border-[#2D2419] rounded-xs">
          <button
            onClick={() => setTab('scheme')}
            className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
              tab === 'scheme'
                ? 'bg-[#E5B544] text-[#0C0A09]'
                : 'text-[#A89D8F] hover:text-[#FBF7F0]'
            }`}
          >
            Swarna Sanchay (11+1)
          </button>
          <button
            onClick={() => setTab('weight')}
            className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
              tab === 'weight'
                ? 'bg-[#E5B544] text-[#0C0A09]'
                : 'text-[#A89D8F] hover:text-[#FBF7F0]'
            }`}
          >
            Gold Weight & Estimate
          </button>
        </div>

        {tab === 'scheme' ? (
          <div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-2">
                Select Monthly Installment Amount (₹)
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[2000, 5000, 10000, 20000, 50000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setMonthlyAmount(amt)}
                    className={`py-2 text-xs font-semibold rounded-xs border transition-colors ${
                      monthlyAmount === amt
                        ? 'border-[#E5B544] bg-[#291F13] text-[#E5B544]'
                        : 'border-[#302619] bg-[#14100C] text-[#A89D8F] hover:border-[#6E5325]'
                    }`}
                  >
                    ₹{(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full accent-[#E5B544] bg-[#2A2117] h-1.5 rounded-full cursor-pointer"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-[#120F0D] border border-[#352B1E] rounded-xs p-4 space-y-2.5 mb-6 text-sm">
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Your 11 Month Deposit:</span>
                <strong className="text-[#FBF7F0]">₹{totalDeposit.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Free 12th Month from Sri Ganesh:</span>
                <strong className="text-[#D4AF37]">+ ₹{bonusAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Making Charges Waived (up to 18%):</span>
                <strong className="text-emerald-400">~ ₹{waivedChargesApprox.toLocaleString('en-IN')} SAVED</strong>
              </div>
              <div className="pt-2 border-t border-[#261E15] flex justify-between items-center text-base font-bold">
                <span className="text-[#FBF7F0]">Total Jewellery Value:</span>
                <span className="text-xl text-[#E5B544]">₹{totalJewelleryValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/schemes" onClick={onClose} className="w-full">
                <GoldButton variant="primary" className="w-full">
                  Enroll in Swarna Sanchay
                </GoldButton>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                  Weight in Grams
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-sm text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                  <Scale className="w-4 h-4 text-[#8A7E70] absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                  Gold Purity
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['22K', '24K'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPurity(p)}
                      className={`py-2 text-xs font-bold rounded-xs border transition-colors ${
                        purity === p
                          ? 'border-[#E5B544] bg-[#291F13] text-[#E5B544]'
                          : 'border-[#302619] bg-[#14100C] text-[#A89D8F]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-[#C4B5A5] mb-1">
                <span>Making Charges (VA %):</span>
                <strong className="text-[#E5B544]">{makingPercent}%</strong>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="1"
                value={makingPercent}
                onChange={(e) => setMakingPercent(Number(e.target.value))}
                className="w-full accent-[#E5B544] bg-[#2A2117] h-1.5 rounded-full cursor-pointer"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-[#120F0D] border border-[#352B1E] rounded-xs p-4 space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Pure Gold Value ({weightGrams}g @ ₹{ratePerGram}/g):</span>
                <strong className="text-[#FBF7F0]">₹{goldValue.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Making Charges ({makingPercent}%):</span>
                <strong className="text-[#FBF7F0]">₹{makingCharge.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-[#C5B8A8]">
                <span>Govt. GST (3%):</span>
                <strong className="text-[#FBF7F0]">₹{gst.toLocaleString('en-IN')}</strong>
              </div>
              <div className="pt-2 border-t border-[#261E15] flex justify-between items-center text-base font-bold">
                <span className="text-[#FBF7F0]">Approx. Total Estimate:</span>
                <span className="text-xl text-[#E5B544]">₹{grandTotal.toLocaleString('en-IN')}*</span>
              </div>
            </div>

            <Link to="/catalog" onClick={onClose} className="w-full">
              <GoldButton variant="primary" className="w-full">
                Explore Matching Designs in Catalog
              </GoldButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
