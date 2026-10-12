import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <aside aria-label="Quick Contact Actions" className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919542979999?text=Namaste%20Sri%20Ganesh%20Bangle%20Works!%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
          WhatsApp Us
        </span>
      </a>

      {/* Mobile Floating Call Button */}
      <a
        href="tel:+919542979999"
        aria-label="Call Store Sanctum"
        className="sm:hidden flex items-center justify-center bg-[#E5B544] text-[#0C0A09] w-12 h-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#ECC870]"
        title="Call Store Sanctum"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>
    </aside>
  );
};
