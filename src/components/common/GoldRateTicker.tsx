import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock } from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { CalculatorModal } from './CalculatorModal';

export const GoldRateTicker: React.FC = () => {
  const { goldRates } = useGold();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const sovereignValue = goldRates.gold22k * 8;
  const bullionBarValue = goldRates.gold24k * 10;
  const silverKgValue = Math.round(goldRates.silver * 1000);

  return (
    <>
      <section className="w-full bg-[#14110E] border-y border-[#2D2419] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Ticker Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#261F16]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D4AF37]">
                  REAL-TIME MARKET TICKER <span className="text-[#8A7E70] font-normal">• Hyderabad & Bengaluru Bullion Desks</span>
                </h3>
              </div>
              <p className="text-xs text-[#9E9080] mt-1">
                Directly benchmarked against certified IBJA rates with zero hidden markups.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#A89D8F]">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Updated {goldRates.lastUpdated}</span>
              </div>

              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-xs font-semibold px-3 py-1.5 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculator Access</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {/* 22K Hallmarked Gold */}
            <div className="bg-[#1A1612] border border-[#382D1E] rounded-sm p-4 relative overflow-hidden group hover:border-[#8A6D3B] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-[#C4B5A5] uppercase">
                  22K HALLMARKED GOLD
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-xs border border-emerald-800/50">
                  <TrendingUp className="w-3 h-3" />
                  +₹{goldRates.gold22kChange} today
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
                  ₹{goldRates.gold22k.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#8A7E70]">/ gram</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#261E15] flex items-center justify-between text-xs text-[#A89D8F]">
                <span>8 Grams (1 Sovereign / Pavan):</span>
                <strong className="text-[#D4AF37] font-semibold">₹{sovereignValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* 24K Bullion */}
            <div className="bg-[#1A1612] border border-[#382D1E] rounded-sm p-4 relative overflow-hidden group hover:border-[#8A6D3B] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-[#C4B5A5] uppercase">
                  24K 99.9% PURE BULLION
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-xs border border-emerald-800/50">
                  <TrendingUp className="w-3 h-3" />
                  +₹{goldRates.gold24kChange} today
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
                  ₹{goldRates.gold24k.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#8A7E70]">/ gram</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#261E15] flex items-center justify-between text-xs text-[#A89D8F]">
                <span>10 Grams (Bullion Bar):</span>
                <strong className="text-[#D4AF37] font-semibold">₹{bullionBarValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* 999 Fine Silver */}
            <div className="bg-[#1A1612] border border-[#382D1E] rounded-sm p-4 relative overflow-hidden group hover:border-[#8A6D3B] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-[#C4B5A5] uppercase">
                  999 FINE SILVER
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-xs border border-emerald-800/50">
                  <TrendingUp className="w-3 h-3" />
                  +₹{goldRates.silverChange.toFixed(2)} today
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0]">
                  ₹{goldRates.silver.toFixed(2)}
                </span>
                <span className="text-xs text-[#8A7E70]">/ gram</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#261E15] flex items-center justify-between text-xs text-[#A89D8F]">
                <span>1 Kilogram Silver Bar:</span>
                <strong className="text-[#D4AF37] font-semibold">₹{silverKgValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Calculator Modal */}
      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </>
  );
};
