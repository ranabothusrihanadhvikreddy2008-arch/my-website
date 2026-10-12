import React, { useState } from 'react';
import { Sparkles, Calendar, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { GoldButton } from '../../components/common/GoldButton';
import { BookViewingModal } from '../../components/common/BookViewingModal';

export const CustomBridal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FBF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="HERITAGE ATELIER"
          title="Bespoke Temple Jewellery & Bridal Trousseaus"
          subtitle="Sculpting custom heirloom ornaments in consultation with our 4th-generation master karigars."
        />

        {/* Process Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Design Consultation',
              desc: 'Bring your antique family heirloom, sketch, or Pinterest moodboard to our private suite.'
            },
            {
              step: '02',
              title: '3D CAD Blueprint',
              desc: 'Receive microscopic 3D renders with exact weight distribution and gemstone prong engineering.'
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

        {/* CTA Banner */}
        <div className="bg-[#18130F] border border-[#5E4A28] rounded-sm p-8 sm:p-12 text-center space-y-5 shadow-2xl max-w-4xl mx-auto">
          <Sparkles className="w-8 h-8 text-[#E5B544] mx-auto" />
          <h2 className="text-3xl font-serif font-bold text-[#FBF7F0]">
            Consult with our Master Karigar Today
          </h2>
          <p className="text-sm text-[#C5B8A8] max-w-xl mx-auto leading-relaxed">
            Reserve a 45-minute one-on-one session at our Hyderabad (Pot Market) or Bengaluru (Commercial Street) sanctum.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <GoldButton
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Private Consultation
            </GoldButton>
            <a href="tel:+919542979999">
              <GoldButton variant="outline" size="lg" icon={<Phone className="w-4 h-4" />}>
                Direct Karigar Line
              </GoldButton>
            </a>
          </div>
        </div>
      </div>

      <BookViewingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
