import React, { useState } from 'react';
import {
  Settings,
  Store,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Save,
  Crown
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminSettings: React.FC = () => {
  const { addToast } = useGold();

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sgbw_admin_settings');
    return saved
      ? JSON.parse(saved)
      : {
        storeName: 'Sri Ganesh Jewellery',
        tagline: 'Tradition Crafted in Gold • Purity Certified 916',
        foundedYear: '1978',
        bisRegistration: 'BIS-HYD-916-449102',
        huidAccreditation: 'HUID/GOI/TEL/7718',
        hyderabadAddress:
          '48, Jewellers Street, Pot Market, Secunderabad & Hyderabad, Telangana 500003',
        hyderabadPhone1: '+91 9542979999',
        hyderabadPhone2: '+91 (040) 2770-9812',
        hyderabadWhatsapp: '+91 9542979999',
        hyderabadTimings: 'All 7 Days: 10:00 AM – 9:00 PM',
        bengaluruAddress:
          '112, Commercial Street / Jewellers Lane, Shivajinagar, Bengaluru, Karnataka 560001',
        bengaluruPhone1: '+91 95',
        bengaluruPhone2: '+91 (080) 4112-5501',
        bengaluruWhatsapp: '+91 9542979999',
        bengaluruTimings: 'All 7 Days: 10:30 AM – 8:30 PM',
        ibjaBenchmark: 'Active (Daily 10:30 AM Sync)',
        gstRate: '3%'
      };
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sgbw_admin_settings', JSON.stringify(settings));
    setIsSaved(true);
    addToast('Settings Saved', 'Flagship showroom and contact parameters updated successfully.', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            BUSINESS PARAMETERS & SANCTUM PROFILES
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Showroom & Atelier Settings
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Manage store addresses, click-to-call numbers, WhatsApp lines, and official hallmarking credentials.
          </p>
        </div>

        {isSaved && (
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved to Local Storage</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Business Identity & Hallmarking */}
        <div className="bg-[#14100D] border border-[#352B1E] rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#261E15]">
            <Crown className="w-4 h-4 text-[#E5B544]" />
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
              Brand Identity & Hallmarking Registrations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Store Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                BIS Hallmarking License #
              </label>
              <input
                type="text"
                value={settings.bisRegistration}
                onChange={(e) => setSettings({ ...settings, bisRegistration: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                HUID Laser Engraving Registration
              </label>
              <input
                type="text"
                value={settings.huidAccreditation}
                onChange={(e) => setSettings({ ...settings, huidAccreditation: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs font-mono text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hyderabad Flagship */}
        <div className="bg-[#14100D] border border-[#352B1E] rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#261E15]">
            <Store className="w-4 h-4 text-[#E5B544]" />
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
              Secunderabad / Hyderabad Flagship (Pot Market Sanctum)
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                value={settings.hyderabadAddress}
                onChange={(e) => setSettings({ ...settings, hyderabadAddress: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  Primary Mobile
                </label>
                <input
                  type="text"
                  value={settings.hyderabadPhone1}
                  onChange={(e) => setSettings({ ...settings, hyderabadPhone1: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  Landline Phone
                </label>
                <input
                  type="text"
                  value={settings.hyderabadPhone2}
                  onChange={(e) => setSettings({ ...settings, hyderabadPhone2: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  WhatsApp Concierge Line
                </label>
                <input
                  type="text"
                  value={settings.hyderabadWhatsapp}
                  onChange={(e) => setSettings({ ...settings, hyderabadWhatsapp: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Store Timings
              </label>
              <input
                type="text"
                value={settings.hyderabadTimings}
                onChange={(e) => setSettings({ ...settings, hyderabadTimings: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bengaluru Flagship */}
        <div className="bg-[#14100D] border border-[#352B1E] rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#261E15]">
            <Store className="w-4 h-4 text-[#E5B544]" />
            <h3 className="font-serif text-lg font-bold text-[#FBF7F0]">
              Bengaluru Flagship (Commercial Street Sanctum)
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                value={settings.bengaluruAddress}
                onChange={(e) => setSettings({ ...settings, bengaluruAddress: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  Primary Mobile
                </label>
                <input
                  type="text"
                  value={settings.bengaluruPhone1}
                  onChange={(e) => setSettings({ ...settings, bengaluruPhone1: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  Landline Phone
                </label>
                <input
                  type="text"
                  value={settings.bengaluruPhone2}
                  onChange={(e) => setSettings({ ...settings, bengaluruPhone2: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                  WhatsApp Concierge Line
                </label>
                <input
                  type="text"
                  value={settings.bengaluruWhatsapp}
                  onChange={(e) => setSettings({ ...settings, bengaluruWhatsapp: e.target.value })}
                  className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A89D8F] mb-1 font-semibold">
                Store Timings
              </label>
              <input
                type="text"
                value={settings.bengaluruTimings}
                onChange={(e) => setSettings({ ...settings, bengaluruTimings: e.target.value })}
                className="w-full bg-[#120F0D] border border-[#3D3020] rounded-xs px-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <GoldButton
            type="submit"
            variant="primary"
            size="lg"
            icon={<Save className="w-4 h-4" />}
          >
            Save Showroom Settings
          </GoldButton>
        </div>
      </form>
    </div>
  );
};
