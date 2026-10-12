import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../../data/types';
import { useGold } from '../../context/GoldContext';

interface ProductCardProps {
  product: Product;
  variant?: 'catalog' | 'trending';
  onEnquireClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'catalog',
  onEnquireClick
}) => {
  const { calculateProductPrice } = useGold();
  const priceInfo = calculateProductPrice(product);

  const badgeColorMap: Record<string, string> = {
    'BESTSELLER': 'bg-emerald-950 text-emerald-300 border-emerald-700/60',
    'BRIDAL HERITAGE': 'bg-amber-950 text-amber-300 border-amber-700/60',
    'MASTERPIECE': 'bg-rose-950 text-rose-300 border-rose-700/60',
    'TRENDING': 'bg-red-950 text-red-300 border-red-700/60',
    'CLASSIC': 'bg-amber-900/60 text-amber-200 border-amber-600/50',
    'NEW': 'bg-yellow-950 text-yellow-300 border-yellow-700/60',
    'AUSPICIOUS': 'bg-amber-950 text-amber-300 border-amber-700/60',
    'ROYAL HEIRLOOM': 'bg-purple-950 text-purple-300 border-purple-700/60',
    'AWARD WINNER': 'bg-yellow-900/80 text-yellow-300 border-yellow-600/60',
    'SACRED WEDDING': 'bg-amber-950 text-amber-300 border-amber-700/60',
    'BRIDAL SIGNATURE': 'bg-rose-950 text-rose-300 border-rose-700/60'
  };

  const badgeClass = product.badge
    ? badgeColorMap[product.badge] || 'bg-neutral-900 text-yellow-300 border-yellow-700/50'
    : '';

  const whatsappMessage = encodeURIComponent(
    `Namaste Sri Ganesh Jewellery! I am interested in inquiring about "${product.name}" (${product.purity} ${product.hallmark}, Approx. Wt: ${product.grossWeight}g). Please share price quote and customization details.`
  );

  return (
    <div className="group flex flex-col bg-[#1A1612] border border-[#352B1E] hover:border-[#8A6D3B]/80 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-luxury-card hover:-translate-y-0.5">
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-[#120F0D] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase border ${badgeClass}`}
            >
              {product.badge}
            </span>
          ) : <span />}

          <span className="bg-[#241D12]/90 backdrop-blur-sm border border-[#6E5325] text-[#E5B544] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
            {product.purity} {product.purity === '24K' ? '999' : '916'}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Gross Weight & Making charges Row */}
          <div className="flex items-center justify-between text-xs text-[#A89D8F] mb-1.5 font-medium border-b border-[#2B2317] pb-1.5">
            <span>Gross Wt: <strong className="text-[#E0D7C9]">{product.grossWeight}g</strong></span>
            <span>Making: <strong className="text-[#E0D7C9]">{product.makingChargePercent}%</strong></span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="group-hover:text-[#E5B544] transition-colors">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-[#FBF7F0] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-[#9E9080] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Box */}
        <div className="pt-2 border-t border-[#2B2317] flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A7E70] block">
              Approx Today:
            </span>
            <span className="text-base sm:text-lg font-bold text-[#D4AF37] tracking-tight">
              ₹{priceInfo.total.toLocaleString('en-IN')}*
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#A89D8F] bg-[#14110E] px-2 py-1 rounded-xs border border-[#302619]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium">{product.purity === '24K' ? 'Assay Certified' : 'BIS Hallmarked'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-1 pt-1">
          <a
            href={`https://wa.me/919542979999?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] text-xs font-semibold py-2 px-2 rounded-xs uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-1.5 bg-[#14110E] hover:bg-[#201A14] text-[#E0D7C9] hover:text-white border border-[#423321] hover:border-[#8A6D3B] text-xs font-semibold py-2 px-2 rounded-xs uppercase tracking-wider transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
