import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Calendar,
  Phone,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Gem,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../../components/common/SectionHeading';
import { GoldButton } from '../../components/common/GoldButton';
import { useGold } from '../../context/GoldContext';
import { useAuth } from '../../context/AuthContext';

export const CustomBridal: React.FC = () => {
  const { goldRates, addEnquiry } = useGold();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [customerName, setCustomerName] = useState(user?.name || 'Srihan');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 99891 71916');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'srihan@example.com');
  const [showroomLocation, setShowroomLocation] = useState<'Hyderabad Flagship (Pot Market)' | 'Bengaluru Flagship (Commercial St)'>(
    'Hyderabad Flagship (Pot Market)'
  );

  const [category, setCategory] = useState('Royal Chokers');
  const [purity, setPurity] = useState<'22K' | '24K' | '18K'>('22K');
  const [targetWeight, setTargetWeight] = useState<number>(45);
  const [gemstones, setGemstones] = useState('Untreated Burmese Kemp Rubies & Basra Pearls');
  const [occasion, setOccasion] = useState('Bridal / Muhurtham');
  const [requiredDate, setRequiredDate] = useState('2026-11-20');
  const [measurements, setMeasurements] = useState('Necklace 16 inch / Bangle Size 2.6');
  const [notes, setNotes] = useState('Looking for deep Nakshi antique temple finish with Lakshmi centerpiece.');

  // Image Upload State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  // Submission & Success Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Sample Inspiration Presets
  const inspirationPresets = [
    {
      title: 'Lakshmi Temple Choker',
      image: '/images/products/temple_lakshmi_choker.jpg',
      category: 'Royal Chokers',
      weight: 48,
      purity: '22K' as const
    },
    {
      title: 'Regal Mayur Kada Pair',
      image: '/images/products/regal_mayur_kada.jpg',
      category: 'Bridal Kadas',
      weight: 62,
      purity: '22K' as const
    },
    {
      title: 'Guttapusalu Long Haar',
      image: '/images/products/guttapusalu_long_haar.jpg',
      category: 'Temple Necklaces',
      weight: 85,
      purity: '22K' as const
    },
    {
      title: 'Gajalakshmi Vaddanam',
      image: '/images/products/gajalakshmi_vaddanam.jpg',
      category: 'Bridal Sets',
      weight: 150,
      purity: '22K' as const
    },
    {
      title: 'Antique Elephant Bangles',
      image: '/images/products/antique_elephant_bangles.jpg',
      category: 'Antique Bangles',
      weight: 84,
      purity: '22K' as const
    }
  ];

  // Price Calculation
  const activeRate = purity === '24K' ? goldRates.gold24k : purity === '22K' ? goldRates.gold22k : Math.round(goldRates.gold24k * 0.75);
  const estimatedGoldValue = Math.round(targetWeight * activeRate);
  const estimatedMaking = Math.round(estimatedGoldValue * 0.13); // 13% handcrafted making
  const estimatedGst = Math.round((estimatedGoldValue + estimatedMaking) * 0.03);
  const estimatedTotal = estimatedGoldValue + estimatedMaking + estimatedGst;

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleSelectPreset = (preset: typeof inspirationPresets[0]) => {
    setUploadedImage(preset.image);
    setImageFileName(preset.title);
    setCategory(preset.category);
    setTargetWeight(preset.weight);
    setPurity(preset.purity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = `CUST-${Date.now().toString().slice(-4)}`;

    setTimeout(() => {
      addEnquiry({
        customerName,
        phone: customerPhone,
        email: customerEmail,
        productName: `Custom Bespoke: ${category} (${targetWeight}g ${purity})`,
        showroomLocation,
        occasion,
        notes: `Measurements: ${measurements}. Gemstones: ${gemstones}. Target Date: ${requiredDate}. Karigar Notes: ${notes}`,
        type: 'CUSTOM_DESIGN',
        customDesignImage: uploadedImage || '/images/products/temple_lakshmi_choker.jpg',
        customCategory: category,
        customPurity: purity,
        customWeightGrams: targetWeight,
        customGemstones: gemstones,
        estimatedBudget: `₹${estimatedTotal.toLocaleString('en-IN')}`
      });

      setSubmittedRef(refId);
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#E5B544', '#10B981', '#FBF7F0']
        });
      } catch {
        // canvas fallback
      }
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sri Ganesh Jewellery,\nI want to place a custom jewellery order:\n• Reference ID: ${submittedRef || 'New Design'}\n• Category: ${category}\n• Purity: ${purity}\n• Weight: ${targetWeight}g\n• Gemstones: ${gemstones}\n• Occasion: ${occasion}\n• Estimated Value: ₹${estimatedTotal.toLocaleString('en-IN')}\n\nPlease share the CAD 3D blueprint.`
  );

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <SectionHeading
          eyebrow="BESPOKE ATELIER & 3D STUDIO"
          title="Custom Jewellery Design Studio"
          subtitle="Upload your sketches, heirloom photographs, or Pinterest boards. Our 4th-generation master karigars craft 3D CAD blueprints and sculpt them in pure hallmarked gold."
        />

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#14100D] border border-[#3E301F] rounded-sm p-6 sm:p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#261E15]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E5B544]" />
                <h2 className="text-xl font-serif font-bold text-[#FBF7F0]">
                  1. Upload Your Design & Reference Photo
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#241A10] px-2.5 py-1 rounded-xs border border-[#4E391C]">
                LIVE CAD STUDIO
              </span>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#E5B544] bg-[#241A10]'
                  : uploadedImage
                  ? 'border-emerald-600/80 bg-[#12100E]'
                  : 'border-[#42331F] hover:border-[#8A6D3B] bg-[#16120E]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadedImage ? (
                <div className="space-y-4">
                  <div className="relative max-w-xs mx-auto overflow-hidden rounded-sm border border-[#5E4A28] shadow-lg group">
                    <img
                      src={uploadedImage}
                      alt="Uploaded custom design"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <span className="text-xs text-[#FBF7F0] font-semibold bg-[#261E15] px-3 py-1.5 rounded-xs">
                        Change Photo
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {imageFileName || 'Design Image Ready'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                        setImageFileName('');
                      }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 bg-[#261616] px-2.5 py-1 rounded-xs border border-red-900/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-4">
                  <div className="w-12 h-12 bg-[#261D12] border border-[#5E4A28] rounded-full flex items-center justify-center mx-auto text-[#E5B544]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FBF7F0]">
                      Click to upload sketch or drag & drop image
                    </h3>
                    <p className="text-xs text-[#8A7E70] mt-1">
                      Supports JPG, PNG, WEBP from your phone camera, sketches, or gallery (up to 10MB)
                    </p>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-[#D4AF37] bg-[#241B10] px-3 py-1 rounded-xs border border-[#4D391B]">
                    Select Image File
                  </span>
                </div>
              )}
            </div>

            {/* Inspiration Preset Quick Pick */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#A89D8F] uppercase tracking-wider block">
                Or pick an artisan inspiration style from our master vault:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {inspirationPresets.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="p-1.5 bg-[#18130F] border border-[#2D2419] hover:border-[#E5B544] rounded-xs text-left group transition-all"
                  >
                    <img
                      src={preset.image}
                      alt={preset.title}
                      className="w-full h-16 object-cover rounded-xs mb-1.5 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[10px] font-semibold text-[#E5B544] block line-clamp-1">
                      {preset.title}
                    </span>
                    <span className="text-[9px] text-[#8A7E70] block">
                      {preset.weight}g • {preset.purity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Specifications Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-[#261E15]">
              <div className="flex items-center gap-2 pb-2">
                <Gem className="w-5 h-5 text-[#E5B544]" />
                <h2 className="text-xl font-serif font-bold text-[#FBF7F0]">
                  2. Customize Specifications & Metal Data
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Jewellery Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Royal Chokers">Royal Chokers</option>
                    <option value="Temple Necklaces">Temple Necklaces (Long Haar / Kasu Mala)</option>
                    <option value="Bridal Kadas">Bridal Kadas & Openable Bangles</option>
                    <option value="Antique Bangles">Antique Bangles (Set of 2 / 4)</option>
                    <option value="Chains & Mangalsutra">Chains & Traditional Mangalsutra</option>
                    <option value="Earrings & Jhumkas">Earrings & Jhumkas</option>
                    <option value="Bridal Sets">Bridal Sets & Vaddanam (Waistbelt)</option>
                    <option value="Solitaire & Polki Rings">Statement Cocktail & Polki Rings</option>
                  </select>
                </div>

                {/* Metal Purity */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Gold Karat & Hallmark
                  </label>
                  <select
                    value={purity}
                    onChange={(e) => setPurity(e.target.value as any)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="22K">22K Gold (BIS 916 Hallmark) - ₹{goldRates.gold22k}/g</option>
                    <option value="24K">24K Gold (999 Pure Bullion) - ₹{goldRates.gold24k}/g</option>
                    <option value="18K">18K Diamond Setting (BIS 750) - ₹{Math.round(goldRates.gold24k * 0.75)}/g</option>
                  </select>
                </div>

                {/* Target Weight */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold uppercase tracking-wider text-[#C4B5A5]">
                      Target Gross Weight: <strong className="text-[#E5B544] text-sm">{targetWeight} Grams</strong>
                    </label>
                    <span className="text-[#8A7E70] text-[11px]">
                      (~{(targetWeight / 8).toFixed(1)} Sovereigns / Pavans)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="1"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="w-full accent-[#E5B544] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6E6050] font-mono">
                    <span>10g (Light)</span>
                    <span>50g (Traditional)</span>
                    <span>100g (Heavy Bridal)</span>
                    <span>200g (Imperial Haar)</span>
                  </div>
                </div>

                {/* Gemstones */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Gemstones & Craftsmanship
                  </label>
                  <select
                    value={gemstones}
                    onChange={(e) => setGemstones(e.target.value)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Untreated Burmese Kemp Rubies & Basra Pearls">Untreated Burmese Kemp Rubies & Basra Pearls</option>
                    <option value="Zambian Emerald Cabochons & Polki">Zambian Emerald Cabochons & Polki</option>
                    <option value="Syndicate Uncut Diamonds (Polki Jadau)">Syndicate Uncut Diamonds (Polki Jadau)</option>
                    <option value="Certified Vedic Navratna Gems">Certified Vedic Navratna Gems</option>
                    <option value="Pure Solid Gold (Zero Gemstones)">Pure Solid Gold (Zero Gemstones)</option>
                  </select>
                </div>

                {/* Measurements */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Measurements / Size
                  </label>
                  <input
                    type="text"
                    value={measurements}
                    onChange={(e) => setMeasurements(e.target.value)}
                    placeholder="e.g. Bangle 2.6, Ring 14, Necklace 18 inch"
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                {/* Occasion & Required Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                    Required Delivery Date
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2.5 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  />
                </div>
              </div>

              {/* Special Karigar Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4B5A5] mb-1.5">
                  Detailed Karigar Instructions & Family Heirloom Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your design specifications, motif preferences, engraving initials, or heirloom reuse..."
                  className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs p-3 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              {/* Customer Contact Details */}
              <div className="pt-4 border-t border-[#261E15] space-y-4">
                <span className="text-xs font-bold text-[#E5B544] uppercase tracking-wider block">
                  3. Customer Verification Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#A89D8F] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A89D8F] mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A89D8F] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#A89D8F] mb-1">Preferred Atelier / Showroom</label>
                  <select
                    value={showroomLocation}
                    onChange={(e) => setShowroomLocation(e.target.value as any)}
                    className="w-full bg-[#100D0B] border border-[#3E301F] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="Hyderabad Flagship (Pot Market)">Hyderabad Flagship (Pot Market, Secunderabad)</option>
                    <option value="Bengaluru Flagship (Commercial St)">Bengaluru Flagship (Commercial St / Jewellers Lane)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-bold py-3.5 text-xs uppercase tracking-wider rounded-xs transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating 3D CAD Blueprint Order...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Custom Jewellery Design Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Live Estimate & Process Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Quotation Summary Card */}
            <div className="bg-[#18130F] border border-[#5E4A28] rounded-sm p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#2D2316]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#E5B544]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FBF7F0]">
                    Live Transparent Price Quotation
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  IBJA LIVE
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#C5B8A8]">
                <div className="flex justify-between">
                  <span>Selected Purity & Rate:</span>
                  <strong className="text-[#FBF7F0]">
                    {purity} @ ₹{activeRate.toLocaleString('en-IN')}/g
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Gross Gold Weight:</span>
                  <strong className="text-[#FBF7F0]">{targetWeight} grams</strong>
                </div>

                <div className="flex justify-between">
                  <span>Raw Bullion Value:</span>
                  <span className="text-[#FBF7F0]">₹{estimatedGoldValue.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Karigar Making & Nakshi (13%):</span>
                  <span className="text-[#FBF7F0]">₹{estimatedMaking.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Indian Hallmarking GST (3%):</span>
                  <span className="text-[#FBF7F0]">₹{estimatedGst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-[#3A2D1B] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#A89D8F] block">
                      Estimated Total Investment
                    </span>
                    <span className="text-[10px] text-[#7A6E5E]">Includes HUID hallmark certificate</span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-[#E5B544]">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="bg-[#120F0C] border border-[#2D2316] p-3 rounded-xs text-[11px] text-[#8A7E70] space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Price Protection Guarantee</span>
                </div>
                <p>
                  Your gold rate is locked the moment your CAD blueprint is approved. Zero unexpected surcharges.
                </p>
              </div>
            </div>

            {/* Karigar Craftsmanship Assurance */}
            <div className="bg-[#14100D] border border-[#2E2417] rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#E5B544]">
                <Award className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FBF7F0]">
                  Sri Ganesh Atelier Standards
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#9E9080]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FBF7F0] block">Laser HUID Hallmarking</strong>
                    <span>Every custom piece undergoes X-ray spectrometry karatmeter testing.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FBF7F0] block">48-Hour 3D CAD Blueprint</strong>
                    <span>Receive rotatable 3D render images before casting begins.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FBF7F0] block">Heirloom Gold Exchange Available</strong>
                    <span>Bring your old family gold for 100% melting purity value credit.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#261E15] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#A89D8F]">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Atelier Desk:</span>
                </div>
                <a
                  href="tel:+919989171916"
                  className="text-xs font-bold text-[#E5B544] hover:underline"
                >
                  +91 99891 71916
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Process Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          {[
            {
              step: '01',
              title: 'Upload & Consultation',
              desc: 'Upload your sketch, design photo, or heirloom reference. Our karigar team reviews purity and weight.'
            },
            {
              step: '02',
              title: '3D CAD Blueprint',
              desc: 'Receive microscopic 3D renders with exact gemstone prong engineering and weight target approval.'
            },
            {
              step: '03',
              title: 'Hand Chisel & Nakshi',
              desc: 'Hereditary Telangana silversmiths sculpt deities and motifs using traditional pitch-block chisels.'
            },
            {
              step: '04',
              title: 'HUID Hallmark & Delivery',
              desc: 'Karatmeter optical testing, laser HUID engraving, and tamper-proof delivery in velvet royal chests.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#16120E] border border-[#352B1E] p-6 rounded-sm space-y-3 relative hover:border-[#8A6D3B] transition-colors"
            >
              <span className="text-xs font-bold text-[#E5B544] tracking-widest uppercase">
                PHASE {item.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
                {item.title}
              </h3>
              <p className="text-xs text-[#9E9080] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#14100D] border border-[#5E4A28] rounded-sm p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                CUSTOM ATELIER ORDER INITIATED
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FBF7F0]">
                Design Submitted Successfully!
              </h3>
              <p className="text-xs text-[#A89D8F] max-w-md mx-auto">
                Thank you, <strong>{customerName}</strong>. Your custom jewellery design and reference images have been routed to our master karigars.
              </p>
            </div>

            <div className="bg-[#18130F] border border-[#2D2419] rounded-xs p-4 text-xs text-left space-y-2 text-[#B3A696]">
              <div className="flex justify-between">
                <span>Order Reference:</span>
                <strong className="text-[#E5B544] font-mono text-sm">{submittedRef}</strong>
              </div>
              <div className="flex justify-between">
                <span>Jewellery Type:</span>
                <span className="text-[#FBF7F0]">{category} ({targetWeight}g {purity})</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Value:</span>
                <strong className="text-[#D4AF37]">₹{estimatedTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Selected Showroom:</span>
                <span className="text-[#FBF7F0]">{showroomLocation}</span>
              </div>
              <div className="flex justify-between border-t border-[#261E15] pt-2">
                <span>CAD Blueprint ETA:</span>
                <span className="text-emerald-400 font-semibold">Within 4 Business Hours</span>
              </div>
            </div>

            <div className="bg-[#120F0C] border border-[#2D2316] p-3 rounded-xs text-[11px] text-[#A89D8F] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Confirmation sent to {customerEmail} & WhatsApp ({customerPhone})</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/919989171916?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1B2E1E] hover:bg-[#233B27] text-emerald-400 border border-emerald-700/60 font-semibold py-2.5 text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 99891 71916)</span>
              </a>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="flex-1 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-bold py-2.5 text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Done & Return to Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
