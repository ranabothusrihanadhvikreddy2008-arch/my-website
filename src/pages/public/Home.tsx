import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
  Gem,
  Scale,
  RefreshCw,
  Send
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from '../../components/common/GoldButton';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProductCard } from '../../components/common/ProductCard';
import { GoldRateTicker } from '../../components/common/GoldRateTicker';
import { initialCategories } from '../../data/categories';
import { initialTestimonials } from '../../data/testimonials';
import { initialShowrooms } from '../../data/showrooms';

export const Home: React.FC = () => {
  const { products, goldRates, addEnquiry } = useGold();

  // Swarna Sanchay Scheme Interactive Calculator state on Home page (Screen 1 Source of Truth)
  const [calculatorMonthly, setCalculatorMonthly] = useState<number>(10000);

  // Concierge Form state
  const [conciergeForm, setConciergeForm] = useState({
    name: '',
    phone: '',
    showroomLocation: 'Hyderabad Flagship (Pot Market)' as const,
    occasion: 'Bridal Wedding Trousseau (Heavy Sets)',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter 4 featured trending products for Screen 1
  const trendingProducts = products.filter((p) => p.featured).slice(0, 4);

  // Scheme Calculations
  const deposit11Months = calculatorMonthly * 11;
  const free12thMonth = calculatorMonthly;
  const makingChargesWaived = Math.round(calculatorMonthly * 12 * 0.18);
  const totalValue = deposit11Months + free12thMonth;

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      customerName: conciergeForm.name,
      phone: conciergeForm.phone,
      showroomLocation: conciergeForm.showroomLocation,
      occasion: conciergeForm.occasion,
      notes: conciergeForm.notes
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setConciergeForm({
        name: '',
        phone: '',
        showroomLocation: 'Hyderabad Flagship (Pot Market)',
        occasion: 'Bridal Wedding Trousseau (Heavy Sets)',
        notes: ''
      });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0]">
      {/* 1. HERO SECTION (Screen 1 Pixel Match) */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#261E15]">
        {/* Ambient Warm Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Sovereign Temple Jewellery Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-[#5E4A28] bg-[#16120E] px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#E5B544] uppercase">
                  SOUTH INDIA'S SOVEREIGN TEMPLE JEWELLERY HOUSE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FBF7F0] leading-[1.12] tracking-wide">
                Timeless Gold.<br />
                <span className="italic font-normal text-[#E5B544] font-serif">
                  Trusted Craftsmanship.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#C5B8A8] max-w-xl font-normal leading-relaxed">
                Four decades of handcrafted temple jewellery, heirloom bridal bangles, and sacred gold masterworks hallmarked for three generations of discerning families.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/catalog">
                  <GoldButton variant="primary" size="lg">
                    Explore Royal Catalog
                  </GoldButton>
                </Link>
                <Link to="/schemes">
                  <GoldButton variant="outline" size="lg">
                    Join Swarna Sanchay Scheme
                  </GoldButton>
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-[#261E15] flex flex-wrap items-center gap-6 text-xs text-[#A89D8F]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% BIS 916 Hallmarked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#D4AF37]" />
                  <span>Zero Compromise Purity</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
                  <span>Lifetime Buyback Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Media Signature Card (Screen 1 Match) */}
            <div className="lg:col-span-5">
              <div className="relative group bg-gradient-to-b from-[#1C1611] to-[#120F0D] border-2 border-[#8A6D3B] hover:border-[#E5B544] rounded-sm p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]">
                {/* Decorative Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#E5B544] pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#E5B544] pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#E5B544] pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#E5B544] pointer-events-none" />

                <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-[#0C0A09]">
                  <img
                    src="/hero_gold_jewellery.jpg"
                    alt="Royal Heritage Temple Nakshi Choker & Kada - Sri Ganesh Jewellery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 bg-[#120F0D]/90 backdrop-blur-md border border-[#8A6D3B] text-[#E5B544] text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Royal Masterpiece</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-[#E5B544] text-[#0C0A09] text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest rounded-xs shadow-md">
                    BIS 916
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#E5B544] bg-[#120F0D]/85 backdrop-blur-sm px-3 py-1.5 rounded-xs border border-[#4A3B24]">
                    <span>✦ Seated Lakshmi Choker & Twin Kadas</span>
                    <span className="font-mono font-bold text-[#FBF7F0]">46.2g + 62.0g Net</span>
                  </div>
                </div>

                <div className="pt-4 pb-1 px-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#FBF7F0] group-hover:text-[#E5B544] transition-colors">
                      Imperial Nakshi Choker & Bridal Kadas
                    </h3>
                    <p className="text-xs text-[#A89D8F] mt-0.5">
                      22K Hallmarked • Traditional Pot Market Atelier (Since 1978)
                    </p>
                  </div>
                  <Link
                    to="/catalog"
                    className="flex items-center gap-1.5 bg-[#261E14] hover:bg-[#E5B544] text-[#E5B544] hover:text-[#0C0A09] text-xs font-bold px-3 py-2 rounded-xs border border-[#5E4A28] transition-all"
                    title="View Design in Catalog"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME MARKET TICKER */}
      <GoldRateTicker />

      {/* 3. ROYAL CATEGORIES (Screen 1 Match) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GENERATIONS OF ARTISTRY"
          title="Royal Categories"
          subtitle="Curated handcrafted creations sculpted by hereditary goldsmiths of South India."
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {initialCategories.map((category) => (
            <Link
              key={category.id}
              to={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="group relative bg-[#1A1612] border border-[#352B1E] hover:border-[#8A6D3B] rounded-sm overflow-hidden p-3 transition-all duration-300 hover:shadow-luxury-card hover:-translate-y-1"
            >
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-[#120F0D] mb-3.5">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-2 right-2 bg-[#120F0D]/90 border border-[#4A3B24] text-[#E5B544] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                  {category.itemCount}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-[#FBF7F0] group-hover:text-[#E5B544] transition-colors leading-snug">
                  {category.name}
                </h3>
                <p className="text-xs text-[#9E9080] mt-1 line-clamp-1">
                  {category.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. TRENDING SIGNATURE MASTERPIECES (Screen 1 Match) */}
      <section className="py-16 bg-[#0E0C09] border-y border-[#261E15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
                  HEIRLOOM CREATIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#FBF7F0]">
                Trending Signature Masterpieces
              </h2>
            </div>
            <div className="text-xs text-[#A89D8F]">
              Calculated at live 22k rate ₹{goldRates.gold22k.toLocaleString('en-IN')}/g + transparent wastage
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} variant="trending" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/catalog">
              <GoldButton variant="outline" size="md">
                View Full Hallmarked Catalog ({products.length} Designs)
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SRI GANESH SWARNA SANCHAY YOJANA (Screen 1 Match) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#18130F] border border-[#4D3A1F] rounded-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Scheme Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-[#6E5325] bg-[#120E0A] px-3.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-[#E5B544]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#E5B544] uppercase">
                  SRI GANESH SWARNA SANCHAY YOJANA
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF7F0] leading-tight">
                Pay for 11 Months.<br />
                <span className="text-[#E5B544]">We Gift the 12th Month Free!</span>
              </h2>

              <p className="text-sm sm:text-base text-[#C5B8A8] max-w-xl leading-relaxed">
                Secure pure gold steadily for your daughter's wedding or upcoming auspicious festivals. Enjoy <strong className="text-[#FBF7F0]">0% Making Charges (up to 18%)</strong> upon maturity.
              </p>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#120F0D] border border-[#2D2419] p-4 rounded-xs">
                  <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-wider block">
                    STEP 01
                  </span>
                  <h4 className="text-sm font-bold text-[#FBF7F0] mt-1">Select Amount</h4>
                  <p className="text-xs text-[#9E9080] mt-1">₹2,000 to ₹50,000 / month</p>
                </div>

                <div className="bg-[#120F0D] border border-[#2D2419] p-4 rounded-xs">
                  <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-wider block">
                    STEP 02
                  </span>
                  <h4 className="text-sm font-bold text-[#FBF7F0] mt-1">Pay 11 Months</h4>
                  <p className="text-xs text-[#9E9080] mt-1">Online UPI, Net Banking or In-Store</p>
                </div>

                <div className="bg-[#120F0D] border border-[#2D2419] p-4 rounded-xs">
                  <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-wider block">
                    STEP 03
                  </span>
                  <h4 className="text-sm font-bold text-[#FBF7F0] mt-1">12th Month on Us</h4>
                  <p className="text-xs text-[#9E9080] mt-1">Redeem pure jewellery with zero VA</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/schemes">
                  <GoldButton variant="primary" size="lg">
                    Enroll in Swarna Sanchay Today
                  </GoldButton>
                </Link>
                <a
                  href="https://wa.me/919542979999?text=Please%20send%20me%20the%20Swarna%20Sanchay%20Gold%20Scheme%20PDF%20Brochure"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoldButton variant="outline" size="lg">
                    Get WhatsApp Brochure
                  </GoldButton>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Benefit Calculator (Screen 1 Match) */}
            <div className="lg:col-span-5 bg-[#14100C] border border-[#5E4A28] rounded-xs p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#2E2417] mb-5">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold tracking-wider uppercase text-[#FBF7F0]">
                    Scheme Benefit Calculator
                  </h3>
                </div>
                <span className="bg-[#291F13] text-[#E5B544] text-[10px] font-bold px-2 py-0.5 rounded-xs border border-[#6E5325]">
                  11 + 1 Bonus
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-2">
                  Monthly Installment Amount (₹)
                </label>
                <select
                  value={calculatorMonthly}
                  onChange={(e) => setCalculatorMonthly(Number(e.target.value))}
                  className="w-full bg-[#120F0D] border border-[#3E301F] rounded-xs px-3.5 py-2.5 text-sm font-bold text-[#E5B544] focus:outline-none focus:border-[#E5B544]"
                >
                  <option value={2000}>₹2,000 per month</option>
                  <option value={5000}>₹5,000 per month</option>
                  <option value={10000}>₹10,000 per month</option>
                  <option value={20000}>₹20,000 per month</option>
                  <option value={50000}>₹50,000 per month</option>
                </select>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 py-3 border-y border-[#261E15] text-xs">
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Your 11 Month Deposit:</span>
                  <strong className="text-[#FBF7F0] font-semibold">
                    ₹{deposit11Months.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Free 12th Month from Sri Ganesh:</span>
                  <strong className="text-[#E5B544] font-semibold">
                    + ₹{free12thMonth.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Making Charges Waived (up to 18%):</span>
                  <strong className="text-emerald-400 font-semibold">
                    ~ ₹{makingChargesWaived.toLocaleString('en-IN')} SAVED
                  </strong>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-baseline mb-4">
                <span className="text-xs uppercase tracking-wider text-[#A89D8F] font-semibold">
                  Total Jewellery Value:
                </span>
                <span className="text-2xl font-serif font-bold text-[#E5B544]">
                  ₹{totalValue.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[10px] text-[#7A6E60] italic leading-tight">
                * Redemptions valid across all 22K/916 jewellery categories. Hallmarking fee included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY FAMILIES CHOOSE US SINCE 1978 (Screen 1 Match) */}
      <section className="py-20 bg-[#0E0C09] border-t border-[#261E15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="GENERATIONS OF INTEGRITY"
            title="Why Families Choose Us Since 1978"
            subtitle="South India's benchmark in ethical jewellery, transparent scales, and heirloom value."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* 1. BIS 916 Hallmark */}
            <div className="bg-[#16120E] border border-[#352B1E] p-5 rounded-sm space-y-3 hover:border-[#8A6D3B] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#201811] border border-[#5E4A28] flex items-center justify-center text-[#E5B544]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#FBF7F0]">
                BIS 916 Hallmark
              </h4>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                100% government accredited HUID laser engraved hallmark certifying exact 91.6% pure fine gold.
              </p>
            </div>

            {/* 2. Conflict-Free Gold */}
            <div className="bg-[#16120E] border border-[#352B1E] p-5 rounded-sm space-y-3 hover:border-[#8A6D3B] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#201811] border border-[#5E4A28] flex items-center justify-center text-[#E5B544]">
                <Gem className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#FBF7F0]">
                Conflict-Free Gold
              </h4>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Sourced strictly through regulated bullion channels with zero compromise on ethical trade.
              </p>
            </div>

            {/* 3. Karatmeter Tested */}
            <div className="bg-[#16120E] border border-[#352B1E] p-5 rounded-sm space-y-3 hover:border-[#8A6D3B] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#201811] border border-[#5E4A28] flex items-center justify-center text-[#E5B544]">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#FBF7F0]">
                Karatmeter Tested
              </h4>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Live XRF optical Karatmeter testing and 4-decimal electronic scales right in front of your eyes.
              </p>
            </div>

            {/* 4. Lifetime Buyback */}
            <div className="bg-[#16120E] border border-[#352B1E] p-5 rounded-sm space-y-3 hover:border-[#8A6D3B] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#201811] border border-[#5E4A28] flex items-center justify-center text-[#E5B544]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#FBF7F0]">
                Lifetime Buyback
              </h4>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Guaranteed lifetime exchange with 100% credit on gold bullion weight at the prevailing market board rate.
              </p>
            </div>

            {/* 5. 46+ Years Family Trust */}
            <div className="bg-[#16120E] border border-[#352B1E] p-5 rounded-sm space-y-3 hover:border-[#8A6D3B] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#201811] border border-[#5E4A28] flex items-center justify-center text-[#E5B544]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#FBF7F0]">
                46+ Years Trust
              </h4>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                Serving three generations of South Indian families for weddings, baby namings, and Dhanteras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Screen 1 Match) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="VOICES OF PRESTIGE"
          title="Cherished by Royal Brides & Families"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialTestimonials.slice(0, 3).map((test) => (
            <div
              key={test.id}
              className="bg-[#16120E] border border-[#382D1E] p-6 rounded-sm space-y-4 hover:border-[#8A6D3B] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#E5B544]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#C5B8A8] italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#261E15]">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#5E4A28]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#FBF7F0]">{test.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#A89D8F] mt-0.5">
                    <span>{test.role} • {test.city}</span>
                  </div>
                  <span className="inline-block mt-1 text-[9px] text-[#E5B544] font-semibold bg-[#261D12] px-1.5 py-0.2 rounded-xs border border-[#59421B]">
                    ✓ {test.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SHOWROOMS & PRIORITY CONCIERGE CONTACT (Screen 1 Match) */}
      <section id="showrooms" className="py-20 bg-[#0E0C09] border-t border-[#261E15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FLAGSHIP DESTINATIONS"
            title="Visit Our Heritage Showrooms"
            subtitle="Walk in to experience private bridal suites, live karat testing, and consultations with senior karigars."
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Showroom Cards & Map (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Hyderabad Flagship */}
              <div className="bg-[#16120E] border border-[#382D1E] rounded-sm p-6 hover:border-[#8A6D3B] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                      Hyderabad Flagship
                    </h3>
                    <p className="text-xs text-[#A89D8F] mt-1">
                      48, Jewellers Street, Pot Market, Secunderabad & Hyderabad, Telangana 500003.
                    </p>
                  </div>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider shrink-0">
                    Open 10 AM – 9 PM
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#261E15]">
                  <a
                    href="tel:+919542979999"
                    className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#E5B544] border border-[#4A3B24] px-3.5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 95429 79999</span>
                  </a>
                  <a
                    href="https://wa.me/919542979999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-emerald-400 border border-[#2E4A28] px-3.5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Store</span>
                  </a>
                </div>
              </div>

              {/* Bengaluru Flagship */}
              <div className="bg-[#16120E] border border-[#382D1E] rounded-sm p-6 hover:border-[#8A6D3B] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                      Bengaluru Flagship
                    </h3>
                    <p className="text-xs text-[#A89D8F] mt-1">
                      112, Commercial Street / Jewellers Lane, Shivajinagar, Bengaluru, Karnataka 560001.
                    </p>
                  </div>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider shrink-0">
                    Open 10 AM – 9 PM
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#261E15]">
                  <a
                    href="tel:+919989171916"
                    className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#E5B544] border border-[#4A3B24] px-3.5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 99891 71916</span>
                  </a>
                  <a
                    href="https://wa.me/919989171916"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-emerald-400 border border-[#2E4A28] px-3.5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Store</span>
                  </a>
                </div>
              </div>

              {/* Interactive Map Card Preview (Screen 1 Match) */}
              <div className="bg-[#16120E] border border-[#382D1E] rounded-sm p-4 relative overflow-hidden">
                <div className="aspect-[16/7] rounded-xs overflow-hidden relative bg-[#1A1612]">
                  <iframe
                    title="Sri Ganesh Showrooms Location"
                    src="https://maps.google.com/maps?q=Pot+Market+Secunderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0C0A09]/80 via-transparent to-transparent" />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#E5B544] font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>Valet Parking Available at Both Sanctums</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Pot+Market+Secunderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-xs font-bold px-3 py-1.5 rounded-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Priority Concierge Booking Form (Screen 1 Match) */}
            <div className="lg:col-span-5 bg-[#16120E] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-[#E5B544] uppercase tracking-[0.2em] block mb-1">
                  PRIORITY CONCIERGE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF7F0]">
                  Book Custom Consultation or Enquiry
                </h3>
                <p className="text-xs text-[#9E9080] mt-1.5 leading-relaxed">
                  Our Master Jeweller will contact you within 30 minutes with design sketches and rate lock details.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-[#FBF7F0]">
                    Consultation Request Lodged!
                  </h4>
                  <p className="text-xs text-[#B3A696] max-w-xs mx-auto">
                    We have notified our Hyderabad & Bengaluru priority desks. Our Karigar will connect with you via WhatsApp immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smt. Gayatri Rao"
                      value={conciergeForm.name}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, name: e.target.value })}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98490 00000"
                      value={conciergeForm.phone}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, phone: e.target.value })}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Preferred Showroom Location
                    </label>
                    <select
                      value={conciergeForm.showroomLocation}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, showroomLocation: e.target.value as any })}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    >
                      <option value="Hyderabad Flagship (Pot Market)">Hyderabad Flagship (Pot Market)</option>
                      <option value="Bengaluru Flagship (Commercial St)">Bengaluru Flagship (Commercial St)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Jewellery Requirement / Occasion
                    </label>
                    <select
                      value={conciergeForm.occasion}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, occasion: e.target.value })}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    >
                      <option value="Bridal Wedding Trousseau (Heavy Sets)">Bridal Wedding Trousseau (Heavy Sets)</option>
                      <option value="Antique Nakshi Bangles & Kadas">Antique Nakshi Bangles & Kadas</option>
                      <option value="Kasu Mala & Temple Haram Sets">Kasu Mala & Temple Haram Sets</option>
                      <option value="Swarna Sanchay Scheme Enrollment">Swarna Sanchay Scheme Enrollment</option>
                      <option value="24K Investment Gold Bullion">24K Investment Gold Bullion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1">
                      Specific Design Preferences or Budget (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us if you have a specific gold weight in mind, event date, or temple reference designs..."
                      value={conciergeForm.notes}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, notes: e.target.value })}
                      className="w-full bg-[#120F0D] border border-[#3A2E1F] rounded-xs px-3.5 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>

                  <GoldButton
                    type="submit"
                    variant="primary"
                    className="w-full pt-3 pb-3"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Priority Request & WhatsApp Connect
                  </GoldButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
