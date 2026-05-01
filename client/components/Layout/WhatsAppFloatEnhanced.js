import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhatsAppFloatEnhanced() {
  const { language } = useLanguage();

  const phoneNumber = '919977938192';
  const localizedMessage =
    language === 'hi'
      ? '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0941\u091d\u0947 \u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930 \u0915\u0947 \u0909\u0924\u094d\u092a\u093e\u0926\u094b\u0902 \u0914\u0930 \u092b\u0938\u0932 \u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u093f\u090f\u0964'
      : 'Hello! I would like information about Laxmi Krashi Kendra products and crop support.';
  const hoverLabel = language === 'hi' ? 'WhatsApp \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902' : 'Chat on WhatsApp';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(localizedMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={hoverLabel}
      aria-label={hoverLabel}
      className="group fixed bottom-4 right-4 z-[70] flex items-center gap-2 md:bottom-6 md:right-6"
    >
      {/* Desktop hover label */}
      <span
        className="hidden rounded-full border border-line-soft/12 bg-slate-card/94 px-4 py-2 text-sm font-bold text-ink-primary shadow-xl transition-all duration-300 md:inline-flex md:translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
      >
        {hoverLabel}
      </span>

      {/* Green circle button */}
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent-emerald opacity-20 animate-ping" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110">
          <FaWhatsapp size={26} />
        </span>
      </span>
    </a>
  );
}
