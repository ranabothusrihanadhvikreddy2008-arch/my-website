import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  ShieldCheck,
  Calendar,
  Phone,
  LayoutGrid,
  List,
  ChevronDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { ProductCard } from '../../components/common/ProductCard';
import { GoldButton } from '../../components/common/GoldButton';
import { CalculatorModal } from '../../components/common/CalculatorModal';
import { BookViewingModal } from '../../components/common/BookViewingModal';

export const Catalog: React.FC = () => {
  const { products, goldRates, calculateProductPrice } = useGold();
  const [searchParams] = useSearchParams();

  // Search & Filter State
  const initialCategoryParam = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryParam);
  const [selectedPurity, setSelectedPurity] = useState<string[]>([]);
  const [selectedWeightRange, setSelectedWeightRange] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedCraftsmanship, setSelectedCraftsmanship] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const itemsPerPage = 12;

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPurity([]);
    setSelectedWeightRange([]);
    setSelectedPriceRange([]);
    setSelectedOccasion('All');
    setSelectedCraftsmanship([]);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'All') {
        const catLower = selectedCategory.toLowerCase();
        const prodCatLower = product.category.toLowerCase();
        if (catLower === 'bangles' || catLower.includes('bangle') || catLower.includes('kada')) {
          if (!prodCatLower.includes('bangle') && !prodCatLower.includes('kada')) {
            return false;
          }
        } else if (catLower === 'necklaces' || catLower.includes('necklace')) {
          if (
            !prodCatLower.includes('necklace') &&
            !prodCatLower.includes('choker') &&
            !prodCatLower.includes('haar') &&
            !prodCatLower.includes('mala') &&
            !prodCatLower.includes('pendant')
          ) {
            return false;
          }
        } else if (catLower === 'chains' || catLower.includes('chain') || catLower.includes('mangalsutra')) {
          if (!prodCatLower.includes('chain') && !prodCatLower.includes('mangalsutra')) {
            return false;
          }
        } else if (catLower === 'earrings' || catLower.includes('earring') || catLower.includes('jhumka') || catLower.includes('chandbali')) {
          if (!prodCatLower.includes('earring') && !prodCatLower.includes('jhumka') && !prodCatLower.includes('chandbali')) {
            return false;
          }
        } else if (catLower === 'bridal' || catLower.includes('bridal set')) {
          if (
            !prodCatLower.includes('bridal') &&
            !prodCatLower.includes('set') &&
            !prodCatLower.includes('vaddanam') &&
            !prodCatLower.includes('vanki') &&
            !prodCatLower.includes('choker') &&
            !prodCatLower.includes('haar') &&
            product.occasion !== 'Bridal / Muhurtham'
          ) {
            return false;
          }
        } else {
          const cleanCat = catLower.replace(/&/g, '').trim();
          const words = cleanCat.split(/\s+/).filter((w) => w.length > 2);
          const hasMatch = words.some((w) => prodCatLower.includes(w));
          if (!hasMatch && !prodCatLower.includes(catLower)) {
            return false;
          }
        }
      }

      // Purity
      if (selectedPurity.length > 0 && !selectedPurity.includes(product.purity)) {
        return false;
      }

      // Weight range
      if (selectedWeightRange.length > 0) {
        const w = product.grossWeight;
        const matchesWeight = selectedWeightRange.some((range) => {
          if (range === 'under-10g') return w < 10;
          if (range === '10g-25g') return w >= 10 && w <= 25;
          if (range === '25g-50g') return w > 25 && w <= 50;
          if (range === '50g-100g') return w > 50 && w <= 100;
          if (range === '100g+') return w > 100;
          return true;
        });
        if (!matchesWeight) return false;
      }

      // Price Range
      if (selectedPriceRange.length > 0) {
        const price = calculateProductPrice(product).total;
        const matchesPrice = selectedPriceRange.some((range) => {
          if (range === 'under-50k') return price < 50000;
          if (range === '50k-150k') return price >= 50000 && price <= 150000;
          if (range === '150k-300k') return price > 150000 && price <= 300000;
          if (range === '300k-500k') return price > 300000 && price <= 500000;
          if (range === 'above-500k') return price > 500000;
          return true;
        });
        if (!matchesPrice) return false;
      }

      // Occasion
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) {
        return false;
      }

      // Craftsmanship
      if (selectedCraftsmanship.length > 0 && !selectedCraftsmanship.includes(product.craftsmanship)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = calculateProductPrice(a).total;
      const priceB = calculateProductPrice(b).total;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'weight-low') return a.grossWeight - b.grossWeight;
      if (sortBy === 'weight-high') return b.grossWeight - a.grossWeight;
      return 0; // popularity / default
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPurity,
    selectedWeightRange,
    selectedPriceRange,
    selectedOccasion,
    selectedCraftsmanship,
    sortBy,
    goldRates
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleArrayFilter = (
    currentList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (currentList.includes(value)) {
      setList(currentList.filter((item) => item !== value));
    } else {
      setList([...currentList, value]);
    }
  };

  const handleDownloadBrochure = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `SRI GANESH JEWELLERY - ROYAL JEWELLERY CATALOG\nEstd 1978 • Pot Market Secunderabad & Commercial St Bengaluru\n\nLive 22K Rate: ₹${goldRates.gold22k}/g\nLive 24K Rate: ₹${goldRates.gold24k}/g\n\nTotal Designs in Catalog: ${products.length}\nAll pieces certified BIS 916 Hallmarked with Laser HUID.`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Sri_Ganesh_Jewellery_Catalog_2025.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0]">
      {/* 1. Live Gold Rate Sub-banner (Screen 2 Match) */}
      <div className="bg-[#14100C] border-b border-[#2D2419] py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-[#E5B544]">
              Live Gold Rate Today: ₹{goldRates.gold22k.toLocaleString('en-IN')}/g (22K 916) | ₹{goldRates.gold24k.toLocaleString('en-IN')}/g (24K 999)
            </span>
            <p className="text-[11px] text-[#9E9080] mt-0.5">
              All catalog prices are dynamically calculated with transparent making charges and BIS Hallmark guarantee.
            </p>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="self-start sm:self-auto bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-[11px] font-bold px-3 py-1.5 rounded-xs uppercase tracking-wider transition-colors shrink-0"
          >
            View Rate Break...
          </button>
        </div>
      </div>

      {/* 2. Page Header & PDF Brochure (Screen 2 Match) */}
      <div className="py-8 border-b border-[#261E15] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF7F0] tracking-wide">
              Curated Royal Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#B3A696] mt-2 max-w-2xl leading-relaxed">
              Handcrafted South Indian temple jewellery, antique kadas, bridal harams, and fine gold ornaments.
            </p>
            <div className="mt-4">
              <button
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2 bg-[#1A1612] hover:bg-[#251F19] text-[#D4AF37] border border-[#5E4A28] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Quick Category Filters (Screen 2 Match) */}
      <div className="py-5 bg-[#100D0B] border-b border-[#261E15] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Big Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bangles, temple sets, kadas, chokers, necklaces, rings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18130F] border border-[#3A2E1F] rounded-xs pl-11 pr-4 py-3 text-sm text-[#FBF7F0] placeholder-[#7A6E60] focus:outline-none focus:border-[#E5B544] transition-colors"
            />
            <Search className="w-5 h-5 text-[#8A7E70] absolute left-3.5 top-3.5" />
          </div>

          {/* Quick Category Dropdown Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { label: 'All', value: 'All' },
              { label: 'Bangles & Kadas', value: 'Bangles' },
              { label: 'Necklaces', value: 'Necklaces' },
              { label: 'Chains & Mangalsutra', value: 'Chains' },
              { label: 'Earrings & Jhumkas', value: 'Earrings' },
              { label: 'Bridal Sets', value: 'Bridal' }
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 border ${
                  selectedCategory === cat.value
                    ? 'bg-[#E5B544] text-[#0C0A09] border-[#E5B544]'
                    : 'bg-[#18130F] text-[#A89D8F] border-[#302619] hover:border-[#6E5325]'
                }`}
              >
                <span>{cat.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Main Body: Left Sidebar Filters + Product Grid (Screen 2 Match) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#261E15] mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
              Explore Gold Masterpieces
            </span>
            <h2 className="text-sm font-semibold tracking-wider text-[#C4B5A5] uppercase mt-0.5">
              SHOWING {paginatedProducts.length} OF {filteredProducts.length} EXCLUSIVE HALLMARKED DESIGNS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#A89D8F]">
              <span className="uppercase tracking-wider font-semibold">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="bg-[#18130F] border border-[#3A2E1F] text-[#FBF7F0] text-xs rounded-xs px-2.5 py-1.5 focus:outline-none focus:border-[#E5B544]"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="weight-low">Weight: Light to Heavy</option>
                <option value="weight-high">Weight: Heavy to Light</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2 Columns: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters (Screen 2 Match) */}
          <aside className="lg:col-span-3 bg-[#14100C] border border-[#2D2419] rounded-sm p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#261E15]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FBF7F0]">
                Filter Selection
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#E5B544] hover:underline font-semibold uppercase tracking-wider flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET ALL</span>
              </button>
            </div>

            {/* GOLD PURITY (BIS) */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                GOLD PURITY (BIS)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { label: '22K (916 Hallmarked)', value: '22K', count: 24 },
                  { label: '24K (999 Pure Bullion)', value: '24K', count: 2 },
                  { label: '18K (Diamond Jewellery)', value: '18K', count: 0 }
                ].map((item) => (
                  <label key={item.value} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPurity.includes(item.value)}
                        onChange={() => toggleArrayFilter(selectedPurity, setSelectedPurity, item.value)}
                        className="rounded-xs accent-[#E5B544] bg-[#120F0D] border-[#3A2E1F]"
                      />
                      <span className="text-[#A89D8F] group-hover:text-[#FBF7F0]">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#6E5D4B]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* NET WEIGHT (GRAMS) */}
            <div className="space-y-2.5 pt-4 border-t border-[#261E15]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                NET WEIGHT (GRAMS)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Under 10 grams', value: 'under-10g', count: 4 },
                  { label: '10g - 25g', value: '10g-25g', count: 8 },
                  { label: '25g - 50g', value: '25g-50g', count: 8 },
                  { label: '50g - 100g', value: '50g-100g', count: 4 },
                  { label: '100g+ Heavy Bridal', value: '100g+', count: 2 }
                ].map((item) => (
                  <label key={item.value} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedWeightRange.includes(item.value)}
                        onChange={() => toggleArrayFilter(selectedWeightRange, setSelectedWeightRange, item.value)}
                        className="rounded-xs accent-[#E5B544] bg-[#120F0D] border-[#3A2E1F]"
                      />
                      <span className="text-[#A89D8F] group-hover:text-[#FBF7F0]">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#6E5D4B]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE (₹) */}
            <div className="space-y-2.5 pt-4 border-t border-[#261E15]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                PRICE RANGE (₹)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Under ₹50,000', value: 'under-50k', count: 2 },
                  { label: '₹50,000 - ₹1.5 Lakh', value: '50k-150k', count: 7 },
                  { label: '₹1.5L - ₹3.0 Lakh', value: '150k-300k', count: 9 },
                  { label: '₹3.0L - ₹5.0 Lakh', value: '300k-500k', count: 5 },
                  { label: 'Above ₹5 Lakh', value: 'above-500k', count: 3 }
                ].map((item) => (
                  <label key={item.value} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPriceRange.includes(item.value)}
                        onChange={() => toggleArrayFilter(selectedPriceRange, setSelectedPriceRange, item.value)}
                        className="rounded-xs accent-[#E5B544] bg-[#120F0D] border-[#3A2E1F]"
                      />
                      <span className="text-[#A89D8F] group-hover:text-[#FBF7F0]">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#6E5D4B]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* OCCASION */}
            <div className="space-y-2.5 pt-4 border-t border-[#261E15]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                OCCASION
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  'All',
                  'Bridal / Muhurtham',
                  'Festive / Pooja',
                  'Daily Elegance',
                  'Gifting & Auspicious'
                ].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`py-1.5 px-2 text-left rounded-xs border transition-colors ${
                      selectedOccasion === occ
                        ? 'bg-[#2B2014] text-[#E5B544] border-[#E5B544]'
                        : 'bg-[#18130F] text-[#8C7E6F] border-[#2D2317] hover:border-[#5E4A28]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* CRAFTSMANSHIP */}
            <div className="space-y-2.5 pt-4 border-t border-[#261E15]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C4B5A5]">
                CRAFTSMANSHIP
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  'Nakshi Temple Work',
                  'Antique Matte Finish',
                  'Kundan Polki Uncut',
                  'Meenakari Enamel',
                  'Lightweight Italian Wire'
                ].map((craft) => (
                  <label key={craft} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCraftsmanship.includes(craft)}
                      onChange={() => toggleArrayFilter(selectedCraftsmanship, setSelectedCraftsmanship, craft)}
                      className="rounded-xs accent-[#E5B544] bg-[#120F0D] border-[#3A2E1F]"
                    />
                    <span className="text-[#A89D8F] group-hover:text-[#FBF7F0]">{craft}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Trust Box (Screen 2 Bottom Sidebar Card) */}
            <div className="pt-4 border-t border-[#261E15]">
              <div className="bg-[#100D0A] border border-[#3A2E1F] p-3.5 rounded-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E5B544]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Transparent Billing</span>
                </div>
                <p className="text-[11px] text-[#8A7E70] leading-relaxed">
                  Every piece includes standard gold weight certificate, gemstone certificate & laser engraved HUID seal.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-8">
            {paginatedProducts.length === 0 ? (
              <div className="bg-[#14100C] border border-[#2D2419] p-12 text-center rounded-sm space-y-3">
                <Sparkles className="w-10 h-10 text-[#8A7E70] mx-auto" />
                <h3 className="font-serif text-xl text-[#FBF7F0]">No Masterpieces Found</h3>
                <p className="text-xs text-[#A89D8F] max-w-sm mx-auto">
                  Try clearing some filter criteria or search terms to view our extensive hallmarked collection.
                </p>
                <GoldButton variant="outline" size="sm" onClick={handleResetFilters}>
                  Clear All Filters
                </GoldButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="catalog" />
                ))}
              </div>
            )}

            {/* Pagination (Screen 2 Match) */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-[#261E15] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89D8F]">
                <div>
                  Showing {(currentPage - 1) * itemsPerPage + 1} –{' '}
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
                  {filteredProducts.length} items
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1.5 bg-[#18130F] border border-[#302619] rounded-xs disabled:opacity-40 hover:border-[#6E5325] text-[#FBF7F0]"
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-1.5 rounded-xs font-bold border transition-colors ${
                        currentPage === idx + 1
                          ? 'bg-[#E5B544] text-[#0C0A09] border-[#E5B544]'
                          : 'bg-[#18130F] text-[#A89D8F] border-[#302619] hover:border-[#6E5325]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1.5 bg-[#18130F] border border-[#302619] rounded-xs disabled:opacity-40 hover:border-[#6E5325] text-[#FBF7F0]"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 5. BESPOKE CRAFTSMANSHIP DESK BANNER (Screen 2 Bottom Match) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16120E] border border-[#4D3A1F] rounded-sm p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-[#6E5325] bg-[#120E0A] px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B544]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#E5B544] uppercase">
                BESPOKE CRAFTSMANSHIP DESK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FBF7F0] leading-tight">
              Have a Custom Bridal or Temple Jewellery Design in Mind?
            </h2>

            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
              Bring your grandmother's heirlooms or reference sketches. Our master goldsmiths in Telangana provide 3D CAD blueprints, transparent gold purity melting evaluations, and customized weight targets.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <GoldButton
                variant="primary"
                size="md"
                onClick={() => setIsViewingModalOpen(true)}
                icon={<Calendar className="w-4 h-4" />}
              >
                Book Studio Appointment
              </GoldButton>

              <a href="tel:+919542979999">
                <GoldButton
                  variant="outline"
                  size="md"
                  icon={<Phone className="w-4 h-4" />}
                >
                  Call Master Craftsman
                </GoldButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <BookViewingModal isOpen={isViewingModalOpen} onClose={() => setIsViewingModalOpen(false)} />
    </div>
  );
};
