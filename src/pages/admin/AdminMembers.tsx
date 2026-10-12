import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  Gift,
  Phone,
  MessageCircle,
  Eye,
  Plus,
  X,
  CreditCard,
  ShieldCheck,
  Send,
  Calendar
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { SchemeSubscription } from '../../data/types';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminMembers: React.FC = () => {
  const { subscriptions, payInstallment, payments, addToast } = useGold();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals & Drawer State
  const [selectedMember, setSelectedMember] = useState<SchemeSubscription | null>(null);
  const [cashPayMember, setCashPayMember] = useState<SchemeSubscription | null>(null);
  const [cashReceiptRef, setCashReceiptRef] = useState('');
  const [cashProcessing, setCashProcessing] = useState(false);

  const filteredMembers = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.userPhone.includes(searchTerm) ||
      sub.subscriptionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = subscriptions.filter((s) => s.status === 'ACTIVE').length;
  const maturedCount = subscriptions.filter((s) => s.status === 'MATURED').length;
  const totalAccumulated = subscriptions.reduce((sum, s) => sum + s.totalPaid, 0);

  const handleCashPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashPayMember) return;
    setCashProcessing(true);

    try {
      await payInstallment(cashPayMember.id, cashPayMember.monthlyAmount, 'Cash');
      setCashPayMember(null);
      setCashReceiptRef('');
    } catch {
      addToast('Payment Error', 'Failed to record cash payment.', 'error');
    } finally {
      setCashProcessing(false);
    }
  };

  const handleSendReminder = (sub: SchemeSubscription) => {
    const cleanPhone = sub.userPhone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Namaste ${sub.userName}! This is a gentle reminder from Sri Ganesh Bangle Works regarding your Swarna Sanchay Scheme account ${sub.subscriptionNumber}. Your monthly instalment of ₹${sub.monthlyAmount.toLocaleString('en-IN')} (Month #${sub.installmentsPaid + 1}) is due on ${sub.nextDueDate}. You can pay online via UPI or visit our Pot Market atelier.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            SCHEME PASSBOOK REGISTRY
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Swarna Sanchay Members & Subscriptions
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Monitor 11+1 systematic accumulation progress, track maturity dates, and record in-store cash deposits.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-2">
          <span className="bg-[#1C1611] border border-[#3A2E1F] text-[#E5B544] text-xs font-semibold px-3 py-1.5 rounded-xs">
            Active: <strong>{activeCount}</strong> | Matured: <strong>{maturedCount}</strong>
          </span>
          <span className="bg-[#1C1611] border border-[#3A2E1F] text-[#FBF7F0] text-xs font-semibold px-3 py-1.5 rounded-xs">
            Total Fund: <strong>₹{(totalAccumulated / 100000).toFixed(2)}L</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search subscriber name, phone, A/C #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#14100C] border border-[#352B1E] rounded-xs pl-8 pr-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A7E70] absolute left-2.5 top-3" />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'ACTIVE', 'MATURED', 'OVERDUE', 'REDEEMED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                statusFilter === st
                  ? 'bg-[#2E2214] text-[#E5B544] border border-[#E5B544]'
                  : 'bg-[#16120E] text-[#A89D8F] border border-[#2D2419] hover:text-[#FBF7F0]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#261E15]">
              <tr>
                <th className="py-3 px-4">Account #</th>
                <th className="py-3 px-4">Subscriber</th>
                <th className="py-3 px-4">Monthly Amount</th>
                <th className="py-3 px-4">Tenure Progress</th>
                <th className="py-3 px-4">Total Deposited</th>
                <th className="py-3 px-4">Next Due / Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211A12] text-[#C5B8A8]">
              {filteredMembers.map((sub) => {
                const progressPct = Math.min(Math.round((sub.installmentsPaid / sub.tenureMonths) * 100), 100);

                return (
                  <tr key={sub.id} className="hover:bg-[#1A1612] transition-colors">
                    {/* Account Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                      {sub.subscriptionNumber}
                    </td>

                    {/* Subscriber Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#FBF7F0]">{sub.userName}</div>
                      <div className="text-[10px] text-[#8A7E70]">{sub.userPhone}</div>
                    </td>

                    {/* Monthly Amount */}
                    <td className="py-3.5 px-4 font-semibold text-[#FBF7F0]">
                      ₹{sub.monthlyAmount.toLocaleString('en-IN')}
                    </td>

                    {/* Progress */}
                    <td className="py-3.5 px-4 min-w-[160px]">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-[#E5B544]">
                          {sub.installmentsPaid} of {sub.tenureMonths} Paid
                        </span>
                        <span className="text-[#8A7E70]">{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#261E15] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5B544] transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </td>

                    {/* Total Deposited */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#FBF7F0]">
                      ₹{sub.totalPaid.toLocaleString('en-IN')}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {sub.status === 'MATURED' ? (
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                          Matured (Bonus Ready)
                        </span>
                      ) : sub.status === 'OVERDUE' ? (
                        <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                          Overdue ({sub.nextDueDate})
                        </span>
                      ) : (
                        <div>
                          <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-xs inline-block mb-0.5">
                            Active
                          </span>
                          <span className="text-[10px] text-[#8A7E70] block">Due: {sub.nextDueDate}</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Drawer */}
                        <button
                          onClick={() => setSelectedMember(sub)}
                          className="p-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#C5B8A8] hover:text-[#FBF7F0] border border-[#3A2E1F] rounded-xs transition-colors"
                          title="View Subscriber Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* WhatsApp Due Reminder */}
                        {sub.status === 'ACTIVE' && (
                          <button
                            onClick={() => handleSendReminder(sub)}
                            className="p-1.5 bg-[#162A1B] hover:bg-[#1E3B26] text-emerald-400 border border-emerald-800/60 rounded-xs transition-colors"
                            title="Send WhatsApp Due Reminder"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Cash Payment */}
                        {sub.status === 'ACTIVE' && (
                          <button
                            onClick={() => setCashPayMember(sub)}
                            className="px-2 py-1 bg-[#2E2214] hover:bg-[#3D2F1D] text-[#E5B544] border border-[#6E5325] rounded-xs text-[10px] font-bold uppercase transition-colors"
                            title="Record In-Store Cash Deposit"
                          >
                            Mark Cash
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Drawer Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16120E] border border-[#5E4A28] rounded-sm max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D2419]">
              <div>
                <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-widest block">
                  SUBSCRIBER DOSSIER
                </span>
                <h3 className="font-serif text-xl font-bold text-[#FBF7F0]">
                  {selectedMember.userName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-[#8A7E70] hover:text-[#FBF7F0] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Scheme Account</span>
                <strong className="text-sm font-mono text-[#D4AF37]">
                  {selectedMember.subscriptionNumber}
                </strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Plan Type</span>
                <strong className="text-sm text-[#FBF7F0]">{selectedMember.planName}</strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Registered Phone</span>
                <strong className="text-sm text-[#FBF7F0]">{selectedMember.userPhone}</strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Monthly Deposit</span>
                <strong className="text-sm font-serif text-[#E5B544]">
                  ₹{selectedMember.monthlyAmount.toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Tenure Completed</span>
                <strong className="text-sm text-[#FBF7F0]">
                  {selectedMember.installmentsPaid} of {selectedMember.tenureMonths} Months
                </strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Total Paid + Bonus</span>
                <strong className="text-sm font-serif text-[#E5B544]">
                  ₹{(selectedMember.totalPaid + selectedMember.bonusAmount).toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Nominee Name</span>
                <strong className="text-sm text-[#FBF7F0]">{selectedMember.nomineeName}</strong>
              </div>

              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs">
                <span className="text-[#8A7E70] block uppercase text-[10px]">Nominee Relation</span>
                <strong className="text-sm text-[#FBF7F0]">{selectedMember.nomineeRelation}</strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => handleSendReminder(selectedMember)}
                className="flex items-center gap-2 bg-[#162A1B] hover:bg-[#1E3B26] text-emerald-400 border border-emerald-700/60 px-4 py-2 rounded-xs text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Reminder</span>
              </button>

              <button
                onClick={() => setSelectedMember(null)}
                className="bg-[#241D15] hover:bg-[#33291F] text-[#C5B8A8] border border-[#3E3120] px-4 py-2 rounded-xs text-xs font-semibold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Cash Payment Modal */}
      {cashPayMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#16120E] border border-[#5E4A28] rounded-sm max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D2419]">
              <div>
                <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-widest block">
                  SHOWROOM CASH DEPOSIT
                </span>
                <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                  Record In-Store Payment
                </h3>
              </div>
              <button
                onClick={() => setCashPayMember(null)}
                className="text-[#8A7E70] hover:text-[#FBF7F0] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCashPayment} className="space-y-4 text-xs">
              <div className="bg-[#120F0D] border border-[#2B2317] p-3 rounded-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#8A7E70]">Subscriber:</span>
                  <strong className="text-[#FBF7F0]">{cashPayMember.userName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E70]">Account Number:</span>
                  <strong className="font-mono text-[#D4AF37]">{cashPayMember.subscriptionNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E70]">Recording Instalment:</span>
                  <strong className="text-[#E5B544]">Month #{cashPayMember.installmentsPaid + 1}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E70]">Amount Due:</span>
                  <strong className="text-sm font-serif text-[#FBF7F0]">
                    ₹{cashPayMember.monthlyAmount.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  Physical Cash Receipt / Voucher Ref #
                </label>
                <input
                  type="text"
                  placeholder="e.g. SGBW-POT-CASH-4912"
                  value={cashReceiptRef}
                  onChange={(e) => setCashReceiptRef(e.target.value)}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCashPayMember(null)}
                  className="px-4 py-2 bg-[#1A1612] border border-[#352B1E] text-[#C5B8A8] rounded-xs font-semibold"
                >
                  Cancel
                </button>
                <GoldButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={cashProcessing}
                >
                  {cashProcessing ? 'Recording...' : 'Confirm Cash Deposit'}
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
