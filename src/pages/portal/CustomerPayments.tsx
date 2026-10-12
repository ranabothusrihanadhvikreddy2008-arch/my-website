import React, { useState } from 'react';
import { Download, Printer, Search, Receipt, ShieldCheck } from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { ReceiptModal } from '../../components/portal/ReceiptModal';
import { PaymentTransaction } from '../../data/types';

export const CustomerPayments: React.FC = () => {
  const { user } = useAuth();
  const { payments } = useGold();
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter payments for this subscriber
  const userPayments = payments.filter((p) => {
    const matchesUser =
      p.customerName.toLowerCase().includes(user?.name.toLowerCase() || 'srihan') ||
      p.customerPhone.includes(user?.phone?.slice(-5) || '79999') ||
      p.customerName.toLowerCase().includes('srihan');
    if (!matchesUser && !searchTerm) return true; // show all available in demo if filter empty
    if (searchTerm) {
      return (
        p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.transactionRef.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            TAX INVOICES & PASSBOOK
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Payment Receipts & History
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            View and print verified GST deposit vouchers for your bullion scheme.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search receipt no or ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#14100C] border border-[#352B1E] rounded-xs pl-8 pr-3 py-1.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A7E70] absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#261E15]">
              <tr>
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Scheme Account</th>
                <th className="py-3 px-4">Instalment</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211A12] text-[#C5B8A8]">
              {userPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#1A1612] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                    {pay.receiptNumber}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {pay.subscriptionNumber}
                  </td>
                  <td className="py-3.5 px-4">Month #{pay.installmentNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-[#FBF7F0]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#1C1711] px-2 py-0.5 rounded border border-[#3A2E1F] text-[10px]">
                      {pay.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-[#8A7E70]">
                    {pay.date} {pay.time}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                      {pay.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(pay)}
                      className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#E5B544] border border-[#4D3A1F] px-2.5 py-1 rounded-xs text-[11px] font-semibold transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        payment={selectedReceipt}
      />
    </div>
  );
};
