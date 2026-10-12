import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
  Filter,
  User,
  Tag
} from 'lucide-react';
import { useGold } from '../../context/GoldContext';
import { Enquiry } from '../../data/types';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus } = useGold();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showroomFilter, setShowroomFilter] = useState('All');

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone.includes(searchTerm) ||
      (enq.productName && enq.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      enq.occasion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesShowroom = showroomFilter === 'All' || enq.showroomLocation.includes(showroomFilter);

    return matchesSearch && matchesStatus && matchesShowroom;
  });

  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const convertedCount = enquiries.filter((e) => e.status === 'Converted').length;

  const handleWhatsAppReply = (enq: Enquiry) => {
    const cleanPhone = enq.phone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Namaste ${enq.customerName}! Thank you for contacting Sri Ganesh Bangle Works regarding "${enq.productName || 'our Royal Temple Jewellery collection'}". Our Master Goldsmith at ${enq.showroomLocation} is pleased to assist you. When is a convenient time for a private consultation or viewing?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            CONCIERGE INQUIRY DESK
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Customer Consultations & Product Enquiries
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Manage inbound bridal trousseau consultations, custom nakshi requests, and private viewing appointments.
          </p>
        </div>

        {/* Counter Badges */}
        <div className="flex items-center gap-2">
          <span className="bg-[#2B1B12] border border-[#6E3C1B] text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-xs">
            New: <strong>{newCount}</strong>
          </span>
          <span className="bg-[#1C2018] border border-[#3E5224] text-[#A3E635] text-xs font-semibold px-3 py-1.5 rounded-xs">
            Contacted: <strong>{contactedCount}</strong>
          </span>
          <span className="bg-[#162A1B] border border-[#276738] text-[#34D399] text-xs font-semibold px-3 py-1.5 rounded-xs">
            Converted: <strong>{convertedCount}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search customer, phone, jewellery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#14100C] border border-[#352B1E] rounded-xs pl-8 pr-3 py-2 text-xs text-[#FBF7F0] focus:outline-none focus:border-[#E5B544]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A7E70] absolute left-2.5 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {['All', 'New', 'Contacted', 'Converted', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-[#2E2214] text-[#E5B544] border border-[#E5B544]'
                    : 'bg-[#16120E] text-[#A89D8F] border border-[#2D2419] hover:text-[#FBF7F0]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Showroom Filter */}
          <select
            value={showroomFilter}
            onChange={(e) => setShowroomFilter(e.target.value)}
            className="bg-[#14100C] border border-[#352B1E] text-xs text-[#FBF7F0] px-3 py-1.5 rounded-xs focus:outline-none focus:border-[#E5B544]"
          >
            <option value="All">All Showrooms</option>
            <option value="Hyderabad">Hyderabad (Pot Market)</option>
            <option value="Bengaluru">Bengaluru (Commercial St)</option>
          </select>
        </div>
      </div>

      {/* Enquiries Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEnquiries.map((enq) => {
          const statusColors: Record<string, string> = {
            New: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
            Contacted: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
            Converted: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
            Closed: 'bg-zinc-900 text-zinc-400 border-zinc-700'
          };

          return (
            <div
              key={enq.id}
              className="bg-[#14100D] border border-[#2D2419] rounded-sm p-5 space-y-4 hover:border-[#6E5325] transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top Row: Customer & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#FBF7F0]">
                      {enq.customerName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#8A7E70] mt-0.5">
                      <span className="font-mono text-[#C5B8A8]">{enq.phone}</span>
                      {enq.email && <span>• {enq.email}</span>}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase border ${
                      statusColors[enq.status] || 'bg-zinc-900'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                {/* Product / Requirement */}
                <div className="bg-[#18130E] border border-[#2B2317] p-3 rounded-xs space-y-1.5 text-xs">
                  {enq.productName && (
                    <div className="flex items-center gap-1.5 text-[#E5B544] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{enq.productName}</span>
                    </div>
                  )}

                  <div className="text-[#C5B8A8] flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-[#8A7E70] shrink-0" />
                    <span>Occasion: {enq.occasion}</span>
                  </div>

                  <div className="text-[#8A7E70] flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span>{enq.showroomLocation}</span>
                  </div>

                  {enq.notes && (
                    <p className="pt-1 border-t border-[#231A12] text-[#B3A696] text-[11px] leading-relaxed italic">
                      "{enq.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#7A6E60]">
                  <Clock className="w-3 h-3" />
                  <span>Submitted {enq.date}</span>
                </div>
              </div>

              {/* Action Buttons & Status Selector */}
              <div className="pt-3 border-t border-[#261E15] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a href={`tel:${enq.phone}`}>
                    <button
                      className="inline-flex items-center gap-1.5 bg-[#1F1710] hover:bg-[#2A2117] text-[#C5B8A8] hover:text-[#FBF7F0] border border-[#3A2E1F] px-2.5 py-1.5 rounded-xs text-xs font-semibold transition-colors"
                      title="Direct Phone Call"
                    >
                      <Phone className="w-3 h-3 text-[#D4AF37]" />
                      <span>Call</span>
                    </button>
                  </a>

                  <button
                    onClick={() => handleWhatsAppReply(enq)}
                    className="inline-flex items-center gap-1.5 bg-[#162A1B] hover:bg-[#1E3B26] text-emerald-400 border border-emerald-800/60 px-2.5 py-1.5 rounded-xs text-xs font-semibold transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[10px] text-[#8A7E70] uppercase">Status:</span>
                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])}
                    className="bg-[#14100C] border border-[#352B1E] text-xs text-[#FBF7F0] px-2 py-1 rounded-xs focus:outline-none focus:border-[#E5B544]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
