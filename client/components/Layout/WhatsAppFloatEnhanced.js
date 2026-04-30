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
      ? '\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0941\u091d\u0947 \u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930 \u0915\u0947 \u0909\u0924\u094d\u092a\u093e\u0926\u094b\u0902 \u0914\u0930 \u092b\u0938\u0932 \u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u093f\u090f\u0964'
      : 'Hello! I would like information about Laxmi Krashi Kendra products and crop support.';
  const hoverLabel = language === 'hi' ? 'WhatsApp \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902' : 'Chat on WhatsApp';
  const mobileLabel = language === 'hi' ? '\u0939\u092e\u0938\u0947 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902' : 'Chat with us';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(localizedMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={hoverLabel}
      aria-label={hoverLabel}
      className="group fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-2 md:bottom-6 md:right-6"
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
        className={`inline-flex max-w-[11rem] rounded-full border px-3 py-2 text-xs font-bold shadow-xl md:hidden ${
          isLight
            ? 'border-line-soft/12 bg-white/96 text-ink-primary'
            : 'border-line-soft/12 bg-slate-card/94 text-ink-primary'
        }`}
      >
        {mobileLabel}
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
        <span className="absolute inset-0 rounded-full bg-accent-emerald opacity-30 animate-ping" />
        <span className="absolute inset-[6px] rounded-full bg-accent-emerald/30 blur-md" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/45 md:h-16 md:w-16">
          <FaWhatsapp size={26} className="md:text-[30px]" />
        </span>
      </span>
    </a>
  );
}
