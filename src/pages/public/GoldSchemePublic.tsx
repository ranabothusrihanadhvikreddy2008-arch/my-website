import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Percent,
  Gift,
  ArrowRight,
  Scale
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from '../../components/common/GoldButton';
import { SectionHeading } from '../../components/common/SectionHeading';
import { schemeFaqs } from '../../data/schemes';

export const GoldSchemePublic: React.FC = () => {
  const { schemePlans } = useGold();
  const [selectedPlan] = useState(schemePlans[0]);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [openTerms, setOpenTerms] = useState<boolean>(false);

  // Calculations
  const deposit11Months = monthlyAmount * 11;
  const free12thBonus = monthlyAmount;
  const makingChargesSaved = Math.round(monthlyAmount * 12 * 0.18);
  const totalJewelleryValue = deposit11Months + free12thBonus;

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 border border-[#6E5325] bg-[#16120E] px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#E5B544]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#E5B544] uppercase">
              SRI GANESH SWARNA SANCHAY YOJANA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF7F0] leading-tight">
            Pay for 11 Months.<br />
            <span className="text-[#E5B544]">We Gift the 12th Month Free!</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C5B8A8] leading-relaxed">
            South India’s most trusted systematic gold accumulation plan. Steady monthly deposits backed by physical BIS 916 hallmarked reserves, zero making charges on maturity, and a guaranteed 100% bonus month by Sri Ganesh Jewellery.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/portal">
              <GoldButton variant="primary" size="lg">
                Enroll Online Now
              </GoldButton>
            </Link>
            <a
              href="https://wa.me/919542979999?text=Hello%20Sri%20Ganesh%20Jewellery,%20please%20send%20me%20details%20on%20Swarna%20Sanchay%20Gold%20Scheme."
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoldButton variant="outline" size="lg">
                WhatsApp Scheme Desk
              </GoldButton>
            </a>
          </div>
        </div>

        {/* 2. Interactive Calculator Section */}
        <div className="bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] block mb-1">
                  CUSTOMIZE YOUR ACCUMULATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FBF7F0]">
                  Calculate Your Swarna Sanchay Returns
                </h3>
                <p className="text-xs text-[#9E9080] mt-1">
                  Choose your convenient monthly installment between ₹2,000 and ₹50,000.
                </p>
              </div>

              {/* Amount Selector Pills */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-2">
                  Select Monthly Installment
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

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                {[
                  'You pay 11 monthly installments on or before your due date',
                  'Sri Ganesh Jewellery pays your 12th installment in full',
                  'Zero making charges (up to 18% VA) waived upon maturity',
                  'Redeem against any 22K hallmarked necklace, kada, choker, or bangle'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#B3A696]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E5B544] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-6 bg-[#120F0D] border border-[#3E301F] rounded-xs p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#261E15]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                  Maturity Benefit Statement
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-xs border border-emerald-800">
                  11 + 1 Sri Ganesh Plan
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#A89D8F]">
                <div className="flex justify-between py-1">
                  <span>Your 11 Month Deposit ({monthlyAmount.toLocaleString('en-IN')} × 11):</span>
                  <strong className="text-[#FBF7F0] font-semibold text-sm">
                    ₹{deposit11Months.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex justify-between py-1 border-t border-[#211A12]">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#E5B544]" />
                    <span>12th Month Bonus from Sri Ganesh:</span>
                  </span>
                  <strong className="text-[#E5B544] font-semibold text-sm">
                    + ₹{free12thBonus.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex justify-between py-1 border-t border-[#211A12]">
                  <span className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Making Charges Waived (up to 18%):</span>
                  </span>
                  <strong className="text-emerald-400 font-semibold text-sm">
                    ~ ₹{makingChargesSaved.toLocaleString('en-IN')} SAVED
                  </strong>
                </div>

                <div className="pt-4 border-t border-[#2E2417] flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-[#C5B8A8] font-bold">
                    Total Redeemable Jewellery Value:
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#E5B544]">
                    ₹{totalJewelleryValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/portal" className="w-full">
                  <GoldButton variant="primary" size="lg" className="w-full">
                    Proceed to Enroll & Pay 1st Month (₹{monthlyAmount.toLocaleString('en-IN')})
                  </GoldButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. How It Works (3 Steps) */}
        <div>
          <SectionHeading
            eyebrow="TRANSPARENT WORKFLOW"
            title="How Swarna Sanchay Works"
            subtitle="Three seamless steps to building your royal jewellery collection."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#16120E] border border-[#352B1E] p-6 rounded-sm space-y-3 relative">
              <span className="text-xs font-bold text-[#E5B544] uppercase tracking-wider block">
                STEP 01
              </span>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                Choose Amount & Enroll
              </h3>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Enroll with basic KYC (Aadhaar/PAN) online or at our Pot Market or Commercial Street sanctums. Choose your monthly deposit from ₹2,000 to ₹50,000.
              </p>
            </div>

            <div className="bg-[#16120E] border border-[#352B1E] p-6 rounded-sm space-y-3 relative">
              <span className="text-xs font-bold text-[#E5B544] uppercase tracking-wider block">
                STEP 02
              </span>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                Pay 11 Easy Instalments
              </h3>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Pay every month through UPI (GPay, PhonePe, Paytm), Net Banking, Card, or in cash at the store. Instant digital receipts generated with live passbook sync.
              </p>
            </div>

            <div className="bg-[#16120E] border border-[#352B1E] p-6 rounded-sm space-y-3 relative">
              <span className="text-xs font-bold text-[#E5B544] uppercase tracking-wider block">
                STEP 03
              </span>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                12th Month Gift & Redeem
              </h3>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Sri Ganesh adds the complete 12th installment as your loyalty gift. Walk into our showrooms and redeem pure 916 gold jewellery with zero making charges!
              </p>
            </div>
          </div>
        </div>

        {/* 4. Terms & Conditions and FAQs Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#FBF7F0] mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {schemeFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#14100C] border border-[#2D2419] rounded-xs overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs font-semibold text-[#FBF7F0] hover:text-[#E5B544] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8A7E70] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#E5B544]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#9E9080] leading-relaxed border-t border-[#211A12]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terms & Conditions Accordion (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#FBF7F0] mb-4">
              Rules & Regulations
            </h3>

            <div className="bg-[#14100C] border border-[#2D2419] rounded-xs p-5 space-y-3 text-xs text-[#9E9080]">
              <div className="flex items-center gap-2 text-[#E5B544] font-bold pb-2 border-b border-[#211A12]">
                <ShieldCheck className="w-4 h-4" />
                <span>Swarna Sanchay Scheme Charter</span>
              </div>
              <ul className="space-y-2.5 list-disc list-inside leading-relaxed text-[#A89D8F]">
                <li>Duration of the scheme is strictly 11 calendar months plus 1 bonus month.</li>
                <li>Monthly installments must be credited between the 1st and 10th of every month.</li>
                <li>The subscriber is entitled to redeem jewellery immediately upon completion of 12 months.</li>
                <li>Making charges / VA is completely waived up to 18% across 22K jewellery. For specialized uncut polki diamond work exceeding 18%, only the excess difference is payable.</li>
                <li>Redemptions are valid in physical hallmark gold at both Hyderabad & Bengaluru flagships. Per RBI/bullion guidelines, cash refund is prohibited.</li>
                <li>In event of premature closure before 11 months, bonus instalment is forfeited, but 100% of deposited gold principal is preserved.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
