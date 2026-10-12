import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  PlusCircle,
  Gift,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Receipt,
  Download,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';
import { MockRazorpayModal } from '../../components/portal/MockRazorpayModal';
import { ReceiptModal } from '../../components/portal/ReceiptModal';
import { PaymentTransaction, SchemeSubscription } from '../../data/types';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { subscriptions, payments, payInstallment, addSubscription, schemePlans } = useGold();

  // Find user's subscriptions or fallback to the first active subscription for demonstration
  const userSubs = subscriptions.filter((s) => s.userId === user?.id || s.userName.toLowerCase().includes('srihan') || s.userName === user?.name);
  const activeSub: SchemeSubscription = userSubs[0] || subscriptions[1]; // e.g. Srihan sub-102 (7/11 paid)

  // Modals state
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Join Scheme Form state
  const [joinMonthly, setJoinMonthly] = useState<number>(5000);
  const [joinNomineeName, setJoinNomineeName] = useState('Raghavan Sundaram');
  const [joinNomineeRel, setJoinNomineeRel] = useState('Spouse');

  // Related payments for this subscription
  const subPayments = payments.filter((p) => p.subscriptionId === activeSub?.id || p.subscriptionNumber === activeSub?.subscriptionNumber);

  // Progress calculations
  const totalMonths = activeSub ? activeSub.tenureMonths : 11;
  const paidCount = activeSub ? activeSub.installmentsPaid : 0;
  const progressPercent = Math.min(Math.round((paidCount / totalMonths) * 100), 100);

  // Circular SVG progress ring parameters
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleJoinNewScheme = (e: React.FormEvent) => {
    e.preventDefault();
    addSubscription({
      userId: user?.id || 'user-new',
      userName: user?.name || 'Srihan',
      userPhone: user?.phone || '+91 95429 79999',
      planId: schemePlans[0].id,
      planName: schemePlans[0].name,
      monthlyAmount: joinMonthly,
      tenureMonths: 11,
      bonusAmount: joinMonthly,
      startDate: new Date().toISOString().split('T')[0],
      nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ACTIVE',
      nomineeName: joinNomineeName,
      nomineeRelation: joinNomineeRel
    });
    setIsJoinModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            SRIHAN CUSTOMER PORTAL & PASSBOOK
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF7F0] mt-0.5">
            Welcome back, {user?.name || 'Srihan'}
          </h1>
          <p className="text-xs text-[#9E9080] mt-1">
            Registered Mobile: {user?.phone || '+91 95429 79999'} • Pot Market Atelier KYC Verified
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#1C1611] hover:bg-[#281F17] text-[#D4AF37] border border-[#5E4A28] px-3.5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Join New Scheme</span>
          </button>
        </div>
      </div>

      {/* Active Scheme Main Card with Circular Progress Ring */}
      <div className="bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Info (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#261D12] text-[#E5B544] text-[10px] font-bold px-2 py-0.5 rounded-xs border border-[#6E5325] uppercase tracking-wider">
                {activeSub?.planName || 'Swarna Sanchay 11+1'}
              </span>
              <span className="text-xs text-[#A89D8F] font-mono">
                A/C: {activeSub?.subscriptionNumber}
              </span>
              <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                {activeSub?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] block">
                  Total Saved
                </span>
                <span className="text-2xl font-serif font-bold text-[#FBF7F0]">
                  ₹{activeSub?.totalPaid.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] block">
                  Monthly Installment
                </span>
                <span className="text-2xl font-serif font-bold text-[#E5B544]">
                  ₹{activeSub?.monthlyAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] block">
                  Next Due Date
                </span>
                <span className="text-base font-semibold text-[#FBF7F0] block mt-1">
                  {activeSub?.nextDueDate}
                </span>
              </div>
            </div>

            {/* Bonus Reminder */}
            <div className="bg-[#120F0D] border border-[#2D2419] p-3 rounded-xs text-xs text-[#C5B8A8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#E5B544]" />
                <span>Promised 12th Month Bonus from SGBW:</span>
              </div>
              <strong className="text-[#E5B544] font-bold text-sm">
                + ₹{activeSub?.bonusAmount.toLocaleString('en-IN')} Free
              </strong>
            </div>

            {/* Pay Now Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GoldButton
                variant="primary"
                size="md"
                onClick={() => setIsRazorpayOpen(true)}
                icon={<CreditCard className="w-4 h-4" />}
              >
                Pay Now (Instalment #{activeSub?.installmentsPaid + 1})
              </GoldButton>

              <Link to="/portal/payments">
                <GoldButton variant="outline" size="md">
                  View Passbook
                </GoldButton>
              </Link>
            </div>
          </div>

          {/* Right Circular Progress Ring (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#120E0A] rounded-sm border border-[#2B2317]">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-[#261E15] stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-[#E5B544] stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-serif font-bold text-[#FBF7F0]">
                  {paidCount} / {totalMonths}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#A89D8F] font-semibold">
                  Instalments
                </span>
              </div>
            </div>

            <span className="text-xs text-[#E5B544] font-semibold mt-3">
              {progressPercent}% Complete
            </span>
            <span className="text-[11px] text-[#8A7E70] mt-0.5">
              {totalMonths - paidCount} months remaining to unlock 12th Month Bonus
            </span>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#261E15]">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-base font-bold text-[#FBF7F0] uppercase tracking-wider">
              Recent Installment Payments
            </h3>
          </div>

          <Link
            to="/portal/payments"
            className="text-xs text-[#E5B544] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All ({subPayments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#261E15]">
              <tr>
                <th className="py-2.5 px-3">Receipt No</th>
                <th className="py-2.5 px-3">Instalment</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Payment Mode</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211A12] text-[#C5B8A8]">
              {subPayments.slice(0, 5).map((pay) => (
                <tr key={pay.id} className="hover:bg-[#1A1612] transition-colors">
                  <td className="py-3 px-3 font-mono text-[#D4AF37] font-semibold">
                    {pay.receiptNumber}
                  </td>
                  <td className="py-3 px-3">Month #{pay.installmentNumber}</td>
                  <td className="py-3 px-3 font-bold text-[#FBF7F0]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">{pay.paymentMethod}</td>
                  <td className="py-3 px-3">{pay.date}</td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                      {pay.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedReceipt(pay)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#E5B544] hover:underline"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock Razorpay Checkout Modal */}
      <MockRazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={activeSub?.monthlyAmount || 10000}
        subscriptionNumber={activeSub?.subscriptionNumber || 'SSY-2025-XXXX'}
        installmentNumber={(activeSub?.installmentsPaid || 0) + 1}
        onPaymentSuccess={async (method) => {
          return await payInstallment(activeSub.id, activeSub.monthlyAmount, method as any);
        }}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        payment={selectedReceipt}
      />

      {/* Join New Scheme Modal Flow */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                ENROLLMENT FLOW
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FBF7F0]">
                Join Swarna Sanchay Yojana
              </h3>
              <p className="text-xs text-[#9E9080] mt-1">
                Choose monthly savings amount and designate legal nominee.
              </p>
            </div>

            <form onSubmit={handleJoinNewScheme} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-2 font-semibold">
                  Select Monthly Installment
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[2000, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setJoinMonthly(amt)}
                      className={`py-2 text-xs font-bold rounded-xs border transition-colors ${
                        joinMonthly === amt
                          ? 'border-[#E5B544] bg-[#291F13] text-[#E5B544]'
                          : 'border-[#302619] bg-[#120F0D] text-[#8A7E70]'
                      }`}
                    >
                      ₹{(amt / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                  Nominee Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={joinNomineeName}
                  onChange={(e) => setJoinNomineeName(e.target.value)}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1 font-semibold">
                  Relationship to Subscriber *
                </label>
                <select
                  value={joinNomineeRel}
                  onChange={(e) => setJoinNomineeRel(e.target.value)}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                </select>
              </div>

              <div className="bg-[#120F0D] border border-[#2D2419] p-3 text-xs text-[#A89D8F] space-y-1">
                <div className="flex justify-between">
                  <span>11 Months Deposit:</span>
                  <strong className="text-[#FBF7F0]">₹{(joinMonthly * 11).toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>12th Month Bonus by SGBW:</span>
                  <strong className="text-[#E5B544]">+ ₹{joinMonthly.toLocaleString('en-IN')}</strong>
                </div>
                <div className="pt-1 border-t border-[#261E15] flex justify-between font-bold">
                  <span>Total Redeemable Gold Value:</span>
                  <span className="text-[#E5B544]">₹{(joinMonthly * 12).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="w-1/3 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#A89D8F] bg-[#120F0D] border border-[#352B1E] rounded-xs"
                >
                  Cancel
                </button>
                <GoldButton type="submit" variant="primary" className="w-2/3">
                  Activate & Pay Month 1
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
