import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0807] border-t border-[#261E15] text-[#A89D8F] text-xs pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#211A12]">
          {/* Brand & Hallmarking */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0] tracking-wider uppercase">
              Sri Ganesh Jewellery
            </h3>
            <p className="text-xs text-[#9E9080] leading-relaxed">
              Established in 1978. Four decades of unbroken purity, royal heritage craftsmanship, and certified 916 temple jewellery hallmarked for three generations.
            </p>

            {/* Certification Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-[#14100C] border border-[#3A2E1F] p-2 text-center rounded-xs">
                <span className="block text-[11px] font-bold text-[#D4AF37]">BIS 916</span>
                <span className="text-[9px] text-[#8A7E70]">Hallmarked</span>
              </div>
              <div className="bg-[#14100C] border border-[#3A2E1F] p-2 text-center rounded-xs">
                <span className="block text-[11px] font-bold text-[#D4AF37]">HUID</span>
                <span className="text-[9px] text-[#8A7E70]">Certified</span>
              </div>
              <div className="bg-[#14100C] border border-[#3A2E1F] p-2 text-center rounded-xs">
                <span className="block text-[11px] font-bold text-[#D4AF37]">IBJA</span>
                <span className="text-[9px] text-[#8A7E70]">Member</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FBF7F0] mb-4">
              Royal Collections
            </h4>
            <ul className="space-y-2.5">
              {[
                'Antique Nakshi Bangles',
                'Temple Lakshmi Malas',
                'Polki Bridal Chokers',
                'Traditional Vanki Rings',
                'Mayur Filigree Kadas',
                '999 Sacred Bullion Coins'
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/catalog"
                    className="hover:text-[#E5B544] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#6E5325]">›</span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Purity & Schemes */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FBF7F0] mb-4">
              Purity & Schemes
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Swarna Sanchay 11+1 Yojana', path: '/schemes' },
                { name: 'Live Gold Rate Board', path: '/catalog' },
                { name: 'XRF Karatmeter Testing', path: '/custom-bridal' },
                { name: 'Lifetime Buyback Guarantee', path: '/schemes' },
                { name: 'Old Gold Exchange Policy', path: '/custom-bridal' },
                { name: 'Custom Bridal Booking', path: '/showrooms' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#E5B544] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#6E5325]">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showrooms & Concierge */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#FBF7F0] mb-4">
              Heritage Showrooms
            </h4>

            {/* Hyderabad */}
            <div className="space-y-1">
              <span className="text-[#FBF7F0] font-semibold block text-xs">
                Secunderabad / Hyderabad
              </span>
              <p className="text-[11px] text-[#8A7E70]">
                48, Jewellers St, Pot Market, Secunderabad 500003
              </p>
              <a
                href="tel:+919542979999"
                className="text-[#D4AF37] hover:underline block text-xs font-semibold"
              >
                +91 95429 79999
              </a>
            </div>

            {/* Bengaluru */}
            <div className="space-y-1 pt-1">
              <span className="text-[#FBF7F0] font-semibold block text-xs">
                Commercial St / Bengaluru
              </span>
              <p className="text-[11px] text-[#8A7E70]">
                112, Jewellers Lane, Shivajinagar 560001
              </p>
              <a
                href="tel:+919886067890"
                className="text-[#D4AF37] hover:underline block text-xs font-semibold"
              >
                +91 98860 67890
              </a>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#8A7E70] pt-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>All 7 Days: 10:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A6E60]">
          <div>
            © 1978–2026 Sri Ganesh Jewellery Pvt. Ltd. All Rights Reserved. Master Goldsmiths of South India.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/schemes" className="hover:text-[#D4AF37] transition-colors">
              Privacy Charter
            </Link>
            <span>•</span>
            <Link to="/catalog" className="hover:text-[#D4AF37] transition-colors">
              Hallmark Verification
            </Link>
            <span>•</span>
            <Link to="/schemes" className="hover:text-[#D4AF37] transition-colors">
              Terms of Bullion
            </Link>
            <span>•</span>
            <Link to="/catalog" className="hover:text-[#D4AF37] transition-colors">
              Making Charge Transparency
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
