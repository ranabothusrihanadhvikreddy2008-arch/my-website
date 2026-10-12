import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from './GoldButton';

interface BookViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string;
  defaultOccasion?: string;
}

export const BookViewingModal: React.FC<BookViewingModalProps> = ({
  isOpen,
  onClose,
  defaultLocation = 'Hyderabad Flagship (Pot Market)',
  defaultOccasion = 'Bridal Wedding Trousseau (Heavy Sets)'
}) => {
  const { addEnquiry } = useGold();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    showroomLocation: defaultLocation as any,
    occasion: defaultOccasion,
    notes: '',
    dateSlot: 'Tomorrow, 11:30 AM'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user.name,
        phone: prev.phone || user.phone,
        email: prev.email || user.email
      }));
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addEnquiry({
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        showroomLocation: formData.showroomLocation,
        occasion: `${formData.occasion} (Viewing Slot: ${formData.dateSlot})`,
        notes: formData.notes
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A89D8F] hover:text-[#FBF7F0] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-950 border border-emerald-600 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#FBF7F0]">
              Sanctum Viewing Reserved!
            </h3>
            <p className="text-xs text-[#B3A696] max-w-xs mx-auto">
              Our Senior Karigar and Flagship Manager have confirmed your slot at {formData.showroomLocation}. A confirmation email and WhatsApp message have been dispatched directly to {formData.email || user?.email || 'your contact'}.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Private Viewing Suite</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#FBF7F0]">
                Book Showroom Viewing
              </h3>
              <p className="text-xs text-[#A89D8F] mt-1">
                Experience heritage nakshi masterworks in private luxury suites with certified live Karatmeter testing.
              </p>
            </div>

            {/* Email & Login Order Notice */}
            {user ? (
              <div className="mb-4 p-2.5 bg-emerald-950/40 border border-emerald-800/80 rounded-xs flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Logged in as <strong>{user.name}</strong> ({user.email}). Viewing confirmation and bullion slip will be sent directly to your email.
                </span>
              </div>
            ) : (
              <div className="mb-4 p-2.5 bg-[#1C1610] border border-[#6E5325] rounded-xs flex items-start justify-between gap-2 text-xs text-[#C5B8A8]">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#E5B544] shrink-0 mt-0.5" />
                  <span>
                    <strong>Important:</strong> Sign in or enter your email so that booking confirmations, gold invoices, and bullion dispatch updates are sent directly to your email.
                  </span>
                </div>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="text-[10px] bg-[#2E2214] hover:bg-[#E5B544] text-[#E5B544] hover:text-[#0C0A09] font-bold px-2 py-1 rounded-xs border border-[#8A6D3B] uppercase tracking-wider shrink-0 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smt. Gayatri Rao"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-sm text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-sm text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-sm text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                    Showroom Location
                  </label>
                  <select
                    value={formData.showroomLocation}
                    onChange={(e) => setFormData({ ...formData, showroomLocation: e.target.value as any })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Hyderabad Flagship (Pot Market)">Hyderabad (Pot Market)</option>
                    <option value="Bengaluru Flagship (Commercial St)">Bengaluru (Commercial St)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                    Occasion / Requirement
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Bridal Wedding Trousseau (Heavy Sets)">Bridal Wedding Trousseau</option>
                    <option value="Antique Nakshi Bangles (Pairs / Sets)">Antique Nakshi Bangles</option>
                    <option value="Heritage Kasu Malas & Harams">Heritage Kasu Malas & Harams</option>
                    <option value="Swarna Sanchay Scheme Consultation">Swarna Sanchay Consultation</option>
                    <option value="Old Gold Melting & Recasting">Old Gold Melting & Recasting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                  Specific Notes or Custom Design References (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us if you have a target gold weight in mind or specific Muhurtham dates..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <GoldButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming Suite Slot...' : 'Confirm Private Viewing & WhatsApp Sync'}
              </GoldButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
