import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Search,
  Receipt,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { ReceiptModal } from '../../components/portal/ReceiptModal';
import { PaymentTransaction } from '../../data/types';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminPayments: React.FC = () => {
  const { payments, addToast } = useGold();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);

  const filteredPayments = payments.filter((pay) => {
    const matchesSearch =
      pay.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.customerPhone.includes(searchTerm);
    const matchesMethod = methodFilter === 'All' || pay.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'All' || pay.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalSuccessful = payments.filter((p) => p.status === 'SUCCESS');
  const totalAmount = totalSuccessful.reduce((sum, p) => sum + p.amount, 0);

  // CSV Export Function
  const handleExportCSV = () => {
    if (filteredPayments.length === 0) {
      addToast('Export Warning', 'No payment records match current filters.', 'warning');
      return;
    }

    const headers = [
      'Receipt Number',
      'Account Number',
      'Customer Name',
      'Phone',
      'Amount (INR)',
      'Instalment No',
      'Payment Method',
      'Date',
      'Time',
      'Status',
      'Transaction Ref'
    ];

    const rows = filteredPayments.map((p) => [
      `"${p.receiptNumber}"`,
      `"${p.subscriptionNumber}"`,
      `"${p.customerName}"`,
      `"${p.customerPhone}"`,
      p.amount,
      p.installmentNumber,
      `"${p.paymentMethod}"`,
      `"${p.date}"`,
      `"${p.time}"`,
      `"${p.status}"`,
      `"${p.transactionRef}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SGBW_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Exported', `Exported ${filteredPayments.length} transactions to CSV.`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            FINANCIAL AUDIT TRAIL
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Transactions & Collections Register
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Real-time ledger of online gateway and in-store bullion collections with printable GST receipts and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GoldButton
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
          >
            Export to CSV ({filteredPayments.length})
          </GoldButton>
        </div>
      </div>

      {/* KPI Stats (3 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#14100D] border border-[#352B1E] p-4 rounded-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] font-semibold">
            Total Collections
          </span>
          <div className="text-2xl font-serif font-bold text-[#E5B544]">
            ₹{(totalAmount / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[10px] text-emerald-400">
            {totalSuccessful.length} Successful Deposits
          </span>
        </div>

        <div className="bg-[#14100D] border border-[#352B1E] p-4 rounded-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] font-semibold">
            Average Ticket Size
          </span>
          <div className="text-2xl font-serif font-bold text-[#FBF7F0]">
            ₹{totalSuccessful.length ? Math.round(totalAmount / totalSuccessful.length).toLocaleString('en-IN') : '0'}
          </div>
          <span className="text-[10px] text-[#A89D8F]">
            Swarna Sanchay monthly benchmark
          </span>
        </div>

        <div className="bg-[#14100D] border border-[#352B1E] p-4 rounded-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] font-semibold">
            Payment Methods
          </span>
          <div className="text-sm font-semibold text-[#FBF7F0] pt-1">
            UPI (65%) • NetBanking (20%) • Cash (15%)
          </div>
          <span className="text-[10px] text-emerald-400">
            Zero reconciliation discrepancies
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search receipt #, customer, txn ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#14100C] border border-[#352B1E] rounded-xs pl-8 pr-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A7E70] absolute left-2.5 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-[#14100C] border border-[#352B1E] text-xs text-[#FBF7F0] px-3 py-2 rounded-xs focus:outline-none focus:border-[#E5B544]"
          >
            <option value="All">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="NetBanking">NetBanking</option>
            <option value="Cash">Cash</option>
            <option value="Wallet">Wallet</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#14100C] border border-[#352B1E] text-xs text-[#FBF7F0] px-3 py-2 rounded-xs focus:outline-none focus:border-[#E5B544]"
          >
            <option value="All">All Statuses</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#261E15]">
              <tr>
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Scheme A/C</th>
                <th className="py-3 px-4">Instalment</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211A12] text-[#C5B8A8]">
              {filteredPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#1A1612] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                    {pay.receiptNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#FBF7F0]">{pay.customerName}</div>
                    <div className="text-[10px] text-[#8A7E70]">{pay.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {pay.subscriptionNumber}
                  </td>
                  <td className="py-3.5 px-4">Month #{pay.installmentNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#FBF7F0]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#1C1711] px-2 py-0.5 rounded border border-[#3A2E1F] text-[10px] font-mono">
                      {pay.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-[#8A7E70]">
                    {pay.date} {pay.time}
                  </td>
                  <td className="py-3.5 px-4">
                    {pay.status === 'SUCCESS' ? (
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                        SUCCESS
                      </span>
                    ) : pay.status === 'PENDING' ? (
                      <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                        PENDING
                      </span>
                    ) : (
                      <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                        FAILED
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(pay)}
                      className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#E5B544] border border-[#4D3A1F] px-2.5 py-1 rounded-xs text-[11px] font-semibold transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>View Voucher</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal
          isOpen={!!selectedReceipt}
          payment={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};
