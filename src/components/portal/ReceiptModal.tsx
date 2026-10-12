import React from 'react';
import { X, Printer, Download, Crown, ShieldCheck } from 'lucide-react';
import { PaymentTransaction } from '../../data/types';
import { GoldButton } from '../common/GoldButton';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentTransaction | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, payment }) => {
  if (!isOpen || !payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14100C] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2D2419] mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5B544]">
            Official Deposit Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-[#A89D8F] hover:text-[#FBF7F0] hover:bg-[#1E1711] rounded-xs transition-colors flex items-center gap-1 text-xs"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8A7E70] hover:text-[#FBF7F0]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div id="printable-receipt" className="bg-[#FAF7F2] text-[#1C1611] p-6 sm:p-8 rounded-xs shadow-inner space-y-6 border border-[#D5C7B2]">
          {/* Header */}
          <div className="text-center border-b border-[#D5C7B2] pb-5 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-[#9E7B35]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#1C1611]">
                Sri Ganesh Bangle Works
              </h2>
            </div>
            <p className="text-[10px] tracking-widest uppercase text-[#736352] font-semibold">
              Master Goldsmiths • Purity Certified 916 • Estd. 1978
            </p>
            <p className="text-[10px] text-[#8C7A68]">
              Pot Market, Secunderabad (500003) & Commercial St, Bengaluru (560001)
            </p>
            <div className="inline-block bg-[#EFE8DD] px-2.5 py-0.5 rounded text-[9px] font-bold text-[#5C4933] border border-[#D1C2AD] mt-1">
              GSTIN: 36AAACG1978B1Z4 • BIS REG: HM-916-TEL-0442
            </div>
          </div>

          {/* Receipt Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#736352] block text-[10px] uppercase font-bold">Subscriber Name</span>
              <strong className="text-sm font-semibold">{payment.customerName}</strong>
              <span className="block text-[11px] text-[#736352]">{payment.customerPhone}</span>
            </div>

            <div className="text-right">
              <span className="text-[#736352] block text-[10px] uppercase font-bold">Receipt Number</span>
              <strong className="text-sm font-mono font-bold text-[#9E7B35]">{payment.receiptNumber}</strong>
              <span className="block text-[10px] text-[#736352]">{payment.date} at {payment.time}</span>
            </div>
          </div>

          {/* Scheme Details Box */}
          <div className="border border-[#D5C7B2] rounded-xs overflow-hidden text-xs">
            <div className="bg-[#EFE8DD] px-3 py-1.5 font-bold flex justify-between border-b border-[#D5C7B2]">
              <span>Description</span>
              <span>Details</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between">
                <span>Scheme Plan:</span>
                <strong className="font-medium">Swarna Sanchay Yojana (11 + 1 Bonus)</strong>
              </div>
              <div className="flex justify-between">
                <span>Passbook A/C Number:</span>
                <span className="font-mono">{payment.subscriptionNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Instalment Number:</span>
                <strong>Instalment {payment.installmentNumber} of 11</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span>{payment.paymentMethod} ({payment.transactionRef})</span>
              </div>
              <div className="pt-2 border-t border-[#D5C7B2] flex justify-between text-sm font-bold">
                <span>Instalment Amount Received:</span>
                <span className="text-[#9E7B35]">₹{payment.amount.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
          </div>

          {/* Verification & Signatory */}
          <div className="pt-4 border-t border-[#D5C7B2] flex items-center justify-between text-[10px] text-[#736352]">
            <div className="space-y-1">
              <div className="flex items-center gap-1 font-bold text-[#5C4933]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Bullion Weight Backed</span>
              </div>
              <p>Computer generated valid receipt. No physical signature required.</p>
            </div>

            <div className="text-center">
              <div className="font-serif italic font-bold text-xs text-[#382C1E]">
                Srihari Achary
              </div>
              <span className="border-t border-[#A89886] block pt-0.5 text-[9px] uppercase">
                Authorized Signatory
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1612] text-[#A89D8F] text-xs font-semibold uppercase tracking-wider rounded-xs hover:text-white"
          >
            Close
          </button>
          <GoldButton variant="primary" size="sm" onClick={handlePrint} icon={<Printer className="w-3.5 h-3.5" />}>
            Print Official Receipt
          </GoldButton>
        </div>
      </div>
    </div>
  );
};
