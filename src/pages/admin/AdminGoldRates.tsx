import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminGoldRates: React.FC = () => {
  const { goldRates, updateGoldRates } = useGold();

  const [form22k, setForm22k] = useState<number>(goldRates.gold22k);
  const [form22kChange, setForm22kChange] = useState<number>(goldRates.gold22kChange);
  const [form24k, setForm24k] = useState<number>(goldRates.gold24k);
  const [form24kChange, setForm24kChange] = useState<number>(goldRates.gold24kChange);
  const [formSilver, setFormSilver] = useState<number>(goldRates.silver);
  const [formSilverChange, setFormSilverChange] = useState<number>(goldRates.silverChange);

  const [calcWeight, setCalcWeight] = useState<number>(10);
  const [calcPurity, setCalcPurity] = useState<'22K' | '24K' | 'Silver'>('22K');
  const [calcMaking, setCalcMaking] = useState<number>(12);

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoldRates({
      gold22k: Number(form22k),
      gold22kChange: Number(form22kChange),
      gold24k: Number(form24k),
      gold24kChange: Number(form24kChange),
      silver: Number(formSilver),
      silverChange: Number(formSilverChange),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST'
    });
  };

  const handleResetToIBJA = () => {
    setForm22k(6845);
    setForm22kChange(15);
    setForm24k(7467);
    setForm24kChange(20);
    setFormSilver(94);
    setFormSilverChange(0.5);
    updateGoldRates({
      gold22k: 6845,
      gold22kChange: 15,
      gold24k: 7467,
      gold24kChange: 20,
      silver: 94,
      silverChange: 0.5,
      lastUpdated: '10:30 AM IST (IBJA Official)'
    });
  };

  // Sandbox price calculation
  const currentRate =
    calcPurity === '24K' ? goldRates.gold24k : calcPurity === '22K' ? goldRates.gold22k : goldRates.silver;
  const rawMetalValue = calcWeight * currentRate;
  const makingValue = Math.round(rawMetalValue * (calcMaking / 100));
  const subtotal = rawMetalValue + makingValue;
  const gst = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + gst;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            BULLION DESK TERMINAL
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Live Gold & Bullion Rate Management
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Calibrate official market board rates. Changes instantly update the top ticker, product catalog estimates, and scheme valuations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToIBJA}
            className="flex items-center gap-1.5 bg-[#1C1611] hover:bg-[#281F17] text-[#A89D8F] hover:text-[#FBF7F0] border border-[#3A2E1F] px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Official IBJA</span>
          </button>
        </div>
      </div>

      {/* Live Market Cards (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 22K Gold */}
        <div className="bg-[#16120E] border border-[#4D3A1F] rounded-sm p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              22K Hallmarked Gold (916)
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-xs font-mono font-bold">
              +{goldRates.gold22kChange} today
            </span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#FBF7F0]">
            ₹{goldRates.gold22k.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-sans text-[#8A7E70] font-normal">/ gram</span>
          </div>
          <div className="pt-2 border-t border-[#261E15] text-[11px] text-[#A89D8F] flex justify-between">
            <span>8 Grams (1 Sovereign):</span>
            <strong className="text-[#FBF7F0]">
              ₹{(goldRates.gold22k * 8).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* 24K Pure Gold */}
        <div className="bg-[#16120E] border border-[#4D3A1F] rounded-sm p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              24K 99.9% Pure Bullion (999)
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-xs font-mono font-bold">
              +{goldRates.gold24kChange} today
            </span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#FBF7F0]">
            ₹{goldRates.gold24k.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-sans text-[#8A7E70] font-normal">/ gram</span>
          </div>
          <div className="pt-2 border-t border-[#261E15] text-[11px] text-[#A89D8F] flex justify-between">
            <span>10 Grams Bullion Bar:</span>
            <strong className="text-[#FBF7F0]">
              ₹{(goldRates.gold24k * 10).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* 999 Fine Silver */}
        <div className="bg-[#16120E] border border-[#4D3A1F] rounded-sm p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              999 Fine Pure Silver
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-xs font-mono font-bold">
              +{goldRates.silverChange} today
            </span>
          </div>
          <div className="text-3xl font-serif font-bold text-[#FBF7F0]">
            ₹{goldRates.silver.toFixed(2)}{' '}
            <span className="text-xs font-sans text-[#8A7E70] font-normal">/ gram</span>
          </div>
          <div className="pt-2 border-t border-[#261E15] text-[11px] text-[#A89D8F] flex justify-between">
            <span>1 Kilogram Silver Bar:</span>
            <strong className="text-[#FBF7F0]">
              ₹{(goldRates.silver * 1000).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
      </div>

      {/* Rate Calibration Form & Sandbox Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#14100D] border border-[#352B1E] rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#261E15]">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#E5B544]" />
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                Calibrate Current Bullion Board Rates
              </h3>
            </div>
            <span className="text-[11px] text-[#8A7E70] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              <span>{goldRates.lastUpdated}</span>
            </span>
          </div>

          <form onSubmit={handleSaveRates} className="space-y-6">
            {/* 22K Inputs */}
            <div className="bg-[#18130E] border border-[#2B2317] p-4 rounded-xs space-y-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                22 Karat (916 Hallmarked) Gold
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Rate per Gram (₹)
                  </label>
                  <input
                    type="number"
                    value={form22k}
                    onChange={(e) => setForm22k(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Daily Fluctuation (₹)
                  </label>
                  <input
                    type="number"
                    value={form22kChange}
                    onChange={(e) => setForm22kChange(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 24K Inputs */}
            <div className="bg-[#18130E] border border-[#2B2317] p-4 rounded-xs space-y-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                24 Karat (999 Pure Bullion) Gold
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Rate per Gram (₹)
                  </label>
                  <input
                    type="number"
                    value={form24k}
                    onChange={(e) => setForm24k(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Daily Fluctuation (₹)
                  </label>
                  <input
                    type="number"
                    value={form24kChange}
                    onChange={(e) => setForm24kChange(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Silver Inputs */}
            <div className="bg-[#18130E] border border-[#2B2317] p-4 rounded-xs space-y-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                999 Fine Pure Silver
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Rate per Gram (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formSilver}
                    onChange={(e) => setFormSilver(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                    Daily Fluctuation (₹)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formSilverChange}
                    onChange={(e) => setFormSilverChange(Number(e.target.value))}
                    className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-sm font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <GoldButton type="submit" variant="primary" size="lg" className="w-full">
                Broadcast Updated Rates Across Website & Catalog
              </GoldButton>
            </div>
          </form>
        </div>

        {/* Right Column: Live Price Simulator Sandbox (5 cols) */}
        <div className="lg:col-span-5 bg-[#14100D] border border-[#352B1E] rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#261E15]">
            <Calculator className="w-4 h-4 text-[#E5B544]" />
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
              Instant Valuation Sandbox
            </h3>
          </div>

          <p className="text-xs text-[#9E9080]">
            Simulate exact retail price calculations using currently active calibrated board rates.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Metal / Purity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['22K', '24K', 'Silver'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCalcPurity(p)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border transition-colors ${
                      calcPurity === p
                        ? 'bg-[#2E2214] text-[#E5B544] border-[#E5B544]'
                        : 'bg-[#18130E] text-[#A89D8F] border-[#2D2419]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Gross Net Weight (Grams)
              </label>
              <input
                type="number"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Making / Wastage Charge ({calcMaking}%)
              </label>
              <input
                type="range"
                min="0"
                max="25"
                value={calcMaking}
                onChange={(e) => setCalcMaking(Number(e.target.value))}
                className="w-full accent-[#E5B544]"
              />
            </div>

            {/* Calculated Breakdown Card */}
            <div className="bg-[#1A1510] border border-[#4A3B24] p-4 rounded-xs space-y-2 text-xs">
              <div className="flex justify-between text-[#A89D8F]">
                <span>Metal Purity Value ({calcWeight}g @ ₹{currentRate}):</span>
                <span>₹{rawMetalValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#A89D8F]">
                <span>Making Charges ({calcMaking}% VA):</span>
                <span>₹{makingValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#A89D8F]">
                <span>GST (3% Indian Bullion Tax):</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-[#352B1E] flex justify-between items-center text-sm font-bold text-[#FBF7F0]">
                <span className="text-[#E5B544]">Approx Retail Price:</span>
                <span className="text-lg font-serif text-[#E5B544]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
