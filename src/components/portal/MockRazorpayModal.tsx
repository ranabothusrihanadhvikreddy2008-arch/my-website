import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, CreditCard, Landmark, Wallet, Loader2, ShieldCheck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PaymentTransaction } from '../../data/types';

interface MockRazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  subscriptionNumber: string;
  installmentNumber: number;
  onPaymentSuccess: (method: 'UPI' | 'Card' | 'NetBanking' | 'Wallet') => Promise<PaymentTransaction>;
}

export const MockRazorpayModal: React.FC<MockRazorpayModalProps> = ({
  isOpen,
  onClose,
  amount,
  subscriptionNumber,
  installmentNumber,
  onPaymentSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'UPI' | 'Card' | 'NetBanking' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState('srihan@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('781');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  const [verificationStage, setVerificationStage] = useState<'idle' | 'authorizing' | 'verifying' | 'verified'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionReceipt, setTransactionReceipt] = useState<PaymentTransaction | null>(null);

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    setVerificationStage('authorizing');

    // Stage 1: Authorizing with Bank (900ms)
    setTimeout(() => {
      setVerificationStage('verifying');

      // Stage 2: Verifying with Sri Ganesh Vault Ledger (1000ms)
      setTimeout(async () => {
        try {
          const receipt = await onPaymentSuccess(activeTab);
          setTransactionReceipt(receipt);
          setVerificationStage('verified');
          setIsProcessing(false);
          setIsSuccess(true);

          // Fire festive golden confetti
          try {
            confetti({
              particleCount: 90,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#D4AF37', '#E5B544', '#10B981', '#FBF7F0']
            });
          } catch {
            // ignore if canvas not supported
          }
        } catch {
          setIsProcessing(false);
          setVerificationStage('idle');
        }
      }, 1000);
    }, 900);
  };

  const handleCompleteAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setVerificationStage('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14100D] border border-[#5E4A28] rounded-sm shadow-2xl overflow-hidden">
        {/* Razorpay Brand Header Banner */}
        <div className="bg-[#1C1611] border-b border-[#2D2317] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0A2540] flex items-center justify-center font-bold text-white text-xs">
              Rzp
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#FBF7F0]">
                  Sri Ganesh Jewellery
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1 rounded border border-emerald-800/40">
                  Verified Merchant
                </span>
              </div>
              <span className="text-[10px] text-[#A89D8F]">
                Scheme: {subscriptionNumber} • Instalment #{installmentNumber}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-[#8A7E70] hover:text-[#FBF7F0] p-1 disabled:opacity-30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Pill */}
        <div className="bg-[#18130E] border-b border-[#261E15] px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A89D8F]">
            Amount Payable
          </span>
          <span className="text-xl font-serif font-bold text-[#E5B544]">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        {isSuccess ? (
          /* Success Screen with Verified Badge */
          <div className="p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-600/60 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment 100% Verified & Authenticated</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FBF7F0] pt-1">
                Instalment #{installmentNumber} Credited!
              </h3>
              <p className="text-xs text-[#A89D8F]">
                Digital gold units have been successfully added to your Sri Ganesh Swarna Passbook.
              </p>
            </div>

            {transactionReceipt && (
              <div className="bg-[#18130F] border border-[#2D2419] rounded-xs p-4 text-xs text-left space-y-2 text-[#B3A696]">
                <div className="flex justify-between">
                  <span>Receipt Number:</span>
                  <strong className="text-[#FBF7F0] font-mono">{transactionReceipt.receiptNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Bank UTR / Ref:</span>
                  <strong className="text-[#D4AF37] font-mono">{transactionReceipt.transactionRef}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Timestamp:</span>
                  <span className="text-[#FBF7F0]">{transactionReceipt.date} • {transactionReceipt.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vault Allocation:</span>
                  <span className="text-emerald-400 font-semibold">22K Hallmark Physical Gold Allocated</span>
                </div>
                <div className="flex justify-between border-t border-[#261E15] pt-2 font-bold text-sm">
                  <span>Amount Paid & Verified:</span>
                  <span className="text-[#E5B544]">₹{transactionReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            <div className="bg-[#120F0C] border border-[#261F16] p-2.5 rounded-xs text-[11px] text-[#A89D8F] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Tax Invoice & SMS confirmation dispatched to your registered mobile.</span>
            </div>

            <button
              onClick={handleCompleteAndClose}
              className="w-full bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-bold py-2.5 text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              Done & View Updated Passbook
            </button>
          </div>
        ) : isProcessing ? (
          /* Multi-Stage Verification Loader */
          <div className="p-10 text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Loader2 className="w-14 h-14 text-[#E5B544] animate-spin" />
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] absolute" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#FBF7F0]">
                {verificationStage === 'authorizing'
                  ? 'Authorizing with Bank Gateway...'
                  : 'Verifying Payment & Digital Vault Ledger...'}
              </h4>
              <p className="text-xs text-[#8A7E70] max-w-xs mx-auto">
                {verificationStage === 'authorizing'
                  ? 'Securing bank authorization via 256-bit encrypted protocol. Please do not close.'
                  : 'Matching Bank UTR signature with Sri Ganesh Vault record & BIS 916 ledger...'}
              </p>
              <div className="w-48 h-1.5 bg-[#261E15] rounded-full mx-auto overflow-hidden mt-3">
                <div
                  className={`h-full bg-[#E5B544] transition-all duration-700 ease-out ${
                    verificationStage === 'authorizing' ? 'w-1/2' : 'w-11/12'
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Checkout Payment Method Selector */
          <div className="p-6 space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#100D0B] p-1 rounded-xs border border-[#261E15]">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: <Smartphone className="w-3.5 h-3.5" /> },
                { id: 'Card', label: 'Card', icon: <CreditCard className="w-3.5 h-3.5" /> },
                { id: 'NetBanking', label: 'NetBank', icon: <Landmark className="w-3.5 h-3.5" /> },
                { id: 'Wallet', label: 'Wallets', icon: <Wallet className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#E5B544] text-[#0C0A09]'
                      : 'text-[#A89D8F] hover:text-[#FBF7F0]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="space-y-4">
              {activeTab === 'UPI' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                      <div
                        key={app}
                        className="bg-[#18130F] border border-[#2D2419] p-2 text-center rounded-xs text-[11px] font-semibold text-[#C4B5A5] hover:border-[#E5B544] cursor-pointer"
                      >
                        {app}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-[#100D0B] border border-[#302619] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                      placeholder="username@bank"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#100D0B] border border-[#302619] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                        Expiry MM/YY
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#100D0B] border border-[#302619] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#100D0B] border border-[#302619] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'NetBanking' && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                    Select Your Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Canara Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 text-left rounded-xs border transition-colors ${
                          selectedBank === bank
                            ? 'bg-[#291F13] text-[#E5B544] border-[#E5B544]'
                            : 'bg-[#18130F] text-[#A89D8F] border-[#2D2419]'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Wallet' && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A89D8F] mb-1">
                    Select Digital Wallet
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Paytm', 'Mobikwik', 'Amazon Pay'].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-2.5 text-center rounded-xs border transition-colors ${
                          selectedWallet === wallet
                            ? 'bg-[#291F13] text-[#E5B544] border-[#E5B544]'
                            : 'bg-[#18130F] text-[#A89D8F] border-[#2D2419]'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-bold py-3 text-xs uppercase tracking-wider rounded-xs transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pay ₹{amount.toLocaleString('en-IN')} Securely</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A6E60]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Secured by 256-Bit Razorpay Bullion Gateway Encryption</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
