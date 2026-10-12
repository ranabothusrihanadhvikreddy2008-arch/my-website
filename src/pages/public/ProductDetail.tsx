import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  Scale,
  Award,
  Gem,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';
import { GoldButton } from '../../components/common/GoldButton';
import { ProductCard } from '../../components/common/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, goldRates, calculateProductPrice, addEnquiry } = useGold();

  const product = products.find((p) => p.id === id) || products[0];
  const { user } = useAuth();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  useEffect(() => {
    if (user && isCallbackModalOpen) {
      setCallbackName((prev) => prev || user.name);
      setCallbackPhone((prev) => prev || user.phone);
      setCallbackEmail((prev) => prev || user.email);
    }
  }, [user, isCallbackModalOpen]);

  const priceBreakup = calculateProductPrice(product);
  const ratePerGram = product.purity === '24K' ? goldRates.gold24k : goldRates.gold22k;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Namaste Sri Ganesh Jewellery! I am interested in inquiring about "${product.name}" (${product.purity} ${product.hallmark}, Weight: ${product.grossWeight}g, Approx Price: ₹${priceBreakup.total.toLocaleString('en-IN')}). Please arrange a Karigar consultation.`
  );

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      customerName: callbackName,
      phone: callbackPhone,
      email: callbackEmail || user?.email,
      productName: product.name,
      showroomLocation: 'Hyderabad Flagship (Pot Market)',
      occasion: `Immediate Product Inquiry for ${product.name}`,
      notes: `Requested priority callback for ${product.name} (${product.grossWeight}g). Email dispatch to: ${callbackEmail || user?.email || 'N/A'}`
    });
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setIsCallbackModalOpen(false);
      if (!user) {
        setCallbackName('');
        setCallbackPhone('');
        setCallbackEmail('');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8A7E70] mb-8">
          <Link to="/home" className="hover:text-[#D4AF37] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-[#D4AF37] transition-colors">
            Curated Collections
          </Link>
          <span>/</span>
          <span className="text-[#C5B8A8] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Hero Layout: Gallery (left) + Specs & Pricing (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#16120E] border border-[#4A3B26] p-2 shadow-2xl">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-xs"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-950/90 text-red-300 border border-red-700/60 text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              <span className="absolute top-4 right-4 bg-[#241D12]/95 border border-[#6E5325] text-[#E5B544] text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider">
                {product.purity} {product.hallmark}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-[#E5B544] shadow-gold-glow'
                        : 'border-[#2D2419] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Hallmarking Trust Callout Card */}
            <div className="bg-[#14100C] border border-[#352B1E] rounded-sm p-4 space-y-2 mt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E5B544]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Govt. Accredited BIS 916 & HUID Guarantee</span>
              </div>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                This item is assayed with an optical Karatmeter. Each piece is hallmarked with a unique 6-digit alphanumeric HUID number verifiable directly on the Bureau of Indian Standards BIS Care App.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Specs, Dynamic Price Breakup, CTAs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                {product.category} • {product.craftsmanship}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FBF7F0]">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#B3A696] mt-2.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Estimated Price Display */}
            <div className="bg-[#16120E] border border-[#4A3B26] rounded-xs p-5 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] block">
                    Estimated Live Price (Today @ ₹{ratePerGram}/g):
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#E5B544]">
                    ₹{priceBreakup.total.toLocaleString('en-IN')}*
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                    In Stock
                  </span>
                  <span className="block text-[10px] text-[#8A7E70] mt-1">
                    *Incl. 3% GST & Making Charges
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakup Table (Required) */}
            <div className="bg-[#120F0D] border border-[#2D2419] rounded-xs overflow-hidden">
              <div className="bg-[#18130F] px-4 py-2.5 border-b border-[#2D2419] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                  Transparent Price Breakup
                </span>
                <span className="text-[10px] text-[#8A7E70]">Zero Hidden Markups</span>
              </div>
              <div className="p-4 space-y-2.5 text-xs text-[#A89D8F]">
                <div className="flex justify-between">
                  <span>Net Gold Value ({product.netGoldWeight}g @ ₹{ratePerGram}/g):</span>
                  <strong className="text-[#FBF7F0]">₹{priceBreakup.goldValue.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Making Charges / Wastage ({product.makingChargePercent}% VA):</span>
                  <strong className="text-[#FBF7F0]">₹{priceBreakup.makingCharges.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal Value:</span>
                  <strong className="text-[#FBF7F0]">₹{priceBreakup.subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Govt. Hallmarking & GST (3%):</span>
                  <strong className="text-[#FBF7F0]">₹{priceBreakup.gst.toLocaleString('en-IN')}</strong>
                </div>
                <div className="pt-2 border-t border-[#261E15] flex justify-between text-sm font-bold text-[#E5B544]">
                  <span>Total Payable:</span>
                  <span>₹{priceBreakup.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Full Product Specifications */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                Specifications & Provenance
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Gross Weight</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.grossWeight} grams</strong>
                </div>
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Net Gold Weight</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.netGoldWeight} grams</strong>
                </div>
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Gold Purity</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.purity} ({product.hallmark})</strong>
                </div>
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Making Charges</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.makingChargePercent}%</strong>
                </div>
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs col-span-2">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Gemstones / Pearls</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.stones || 'None (Pure Gold)'}</strong>
                </div>
                <div className="bg-[#14100C] border border-[#2B2317] p-3 rounded-xs col-span-2">
                  <span className="text-[#8A7E70] block text-[10px] uppercase">Occasion & Style</span>
                  <strong className="text-[#FBF7F0] font-semibold">{product.occasion} • {product.craftsmanship}</strong>
                </div>
              </div>
            </div>

            {/* CTAs (Required: Call to Enquire, Enquire on WhatsApp, Request Callback) */}
            <div className="space-y-3 pt-4 border-t border-[#261E15]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/919542979999?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <GoldButton
                    variant="whatsapp"
                    size="md"
                    className="w-full"
                    icon={<MessageCircle className="w-4 h-4 fill-current" />}
                  >
                    Enquire on WhatsApp
                  </GoldButton>
                </a>

                <a href="tel:+919542979999" className="w-full">
                  <GoldButton
                    variant="outline"
                    size="md"
                    className="w-full"
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Call to Enquire
                  </GoldButton>
                </a>
              </div>

              <button
                onClick={() => setIsCallbackModalOpen(true)}
                className="w-full py-2.5 bg-[#14100C] hover:bg-[#1E1711] border border-[#5E4A28] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Request Concierge Callback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#261E15]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  CURATED RECOMMENDATIONS
                </span>
                <h3 className="text-2xl font-serif text-[#FBF7F0] mt-1">
                  Related Masterpieces in {product.category}
                </h3>
              </div>
              <Link to="/catalog">
                <GoldButton variant="outline" size="sm">
                  View All
                </GoldButton>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} variant="catalog" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Request Callback Modal */}
      {isCallbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 shadow-2xl">
            {callbackSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                  Callback Requested!
                </h3>
                <p className="text-xs text-[#A89D8F]">
                  Our master karigar will call you on {callbackPhone} regarding {product.name}. An official inquiry summary and price quote have been sent directly to {callbackEmail || user?.email || 'your email'}.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FBF7F0] mb-1">
                  Request Priority Callback
                </h3>
                <p className="text-xs text-[#9E9080] mb-3">
                  For: <strong className="text-[#E5B544]">{product.name}</strong> ({product.grossWeight}g)
                </p>

                {/* Direct Email Delivery Notice */}
                {user ? (
                  <div className="mb-3.5 p-2 bg-emerald-950/40 border border-emerald-800/80 rounded-xs text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Signed in as <strong>{user.email}</strong>. Quotation and Karigar notes will be sent directly to your email.</span>
                  </div>
                ) : (
                  <div className="mb-3.5 p-2 bg-[#1C1610] border border-[#6E5325] rounded-xs text-[11px] text-[#C5B8A8] flex items-center justify-between gap-2">
                    <span>Sign in or enter email below so order estimates reach your email directly.</span>
                    <Link to="/login" className="text-[10px] text-[#E5B544] font-bold uppercase hover:underline shrink-0">Sign In</Link>
                  </div>
                )}

                <form onSubmit={handleCallbackSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smt. Radhika"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Email Address (For Direct Invoice Delivery)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={callbackEmail}
                      onChange={(e) => setCallbackEmail(e.target.value)}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCallbackModalOpen(false)}
                      className="w-1/3 py-2 text-xs font-semibold uppercase tracking-wider text-[#A89D8F] bg-[#14100C] border border-[#352B1E] rounded-xs"
                    >
                      Cancel
                    </button>
                    <GoldButton type="submit" variant="primary" className="w-2/3">
                      Submit Request
                    </GoldButton>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
