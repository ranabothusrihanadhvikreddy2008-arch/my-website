import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { initialShowrooms } from '../../data/showrooms';
import { SectionHeading } from '../../components/common/SectionHeading';
import { GoldButton } from '../../components/common/GoldButton';

export const ShowroomsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="HERITAGE SANCTUMS"
          title="Flagship Showrooms & Private Suites"
          subtitle="Step into our Secunderabad and Bengaluru sanctums to consult with senior hereditary goldsmiths, experience live Karatmeter testing, and explore bridal trousseaus."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {initialShowrooms.map((showroom) => (
            <div
              key={showroom.id}
              className="bg-[#16120E] border border-[#4D3A1F] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl hover:border-[#D4AF37] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5B544] block mb-1">
                    ESTD. 1978 • {showroom.city}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#FBF7F0]">
                    {showroom.name}
                  </h3>
                </div>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase">
                  Open 10 AM – 9 PM
                </span>
              </div>

              {/* Address & Timings */}
              <div className="space-y-3 text-xs text-[#C5B8A8]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{showroom.address}</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{showroom.timings}</span>
                </div>
              </div>

              {/* Map Embed */}
              <div className="aspect-[16/8] rounded-xs overflow-hidden border border-[#2B2317] bg-[#120F0D]">
                <iframe
                  title={showroom.name}
                  src={showroom.mapEmbedUrl}
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80"
                  loading="lazy"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a href={`tel:${showroom.phone}`}>
                  <GoldButton variant="outline" size="sm" className="w-full" icon={<Phone className="w-3.5 h-3.5" />}>
                    Call Store
                  </GoldButton>
                </a>

                <a
                  href={`https://wa.me/${showroom.whatsapp}?text=Namaste%20Sri%20Ganesh%20Bangle%20Works,%20I%20would%20like%20to%20visit%20your%20${showroom.city}%20showroom.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoldButton
                    variant="whatsapp"
                    size="sm"
                    className="w-full"
                    icon={<MessageCircle className="w-3.5 h-3.5 fill-current" />}
                  >
                    WhatsApp
                  </GoldButton>
                </a>

                <a href={showroom.directionsUrl} target="_blank" rel="noopener noreferrer">
                  <GoldButton variant="primary" size="sm" className="w-full" icon={<Navigation className="w-3.5 h-3.5" />}>
                    Directions
                  </GoldButton>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
