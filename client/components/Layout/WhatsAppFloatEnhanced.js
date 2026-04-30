import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function WhatsAppFloatEnhanced() {
  const { language } = useLanguage();
  const { isLight } = useTheme();
  const phoneNumber = '919977938192';
  const localizedMessage =
    language === 'hi'
      ? 'नमस्ते! मुझे लक्ष्मी कृषि केंद्र के उत्पादों और फसल सहायता के बारे में जानकारी चाहिए।'
      : 'Hello! I would like information about Laxmi Krashi Kendra products and crop support.';
  const hoverLabel = language === 'hi' ? 'WhatsApp पर बात करें' : 'Chat on WhatsApp';
  const mobileLabel = language === 'hi' ? 'हमसे बात करें' : 'Chat with us';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(localizedMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={hoverLabel}
      aria-label={hoverLabel}
      className="group fixed bottom-5 right-4 z-[70] flex items-center gap-3 md:bottom-6 md:right-6"
    >
      <span
        className={`hidden rounded-full border px-4 py-2 text-sm font-bold shadow-xl transition-all duration-300 md:inline-flex md:translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 ${
          isLight
            ? 'border-line-soft/12 bg-white/96 text-ink-primary'
            : 'border-line-soft/12 bg-slate-card/94 text-ink-primary'
        }`}
      >
        {hoverLabel}
      </span>

      <span
        className={`inline-flex rounded-full border px-4 py-3 text-sm font-bold shadow-xl md:hidden ${
          isLight
            ? 'border-line-soft/12 bg-white/96 text-ink-primary'
            : 'border-line-soft/12 bg-slate-card/94 text-ink-primary'
        }`}
      >
        {mobileLabel}
      </span>

      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent-emerald opacity-30 animate-ping" />
        <span className="absolute inset-[6px] rounded-full bg-accent-emerald/30 blur-md" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/45">
          <FaWhatsapp size={30} />
        </span>
      </span>
    </a>
  );
}
