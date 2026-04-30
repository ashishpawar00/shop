import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppFloat = () => {
  const { language } = useLanguage();
  const phoneNumber = "919977938192";
  const localizedMessage =
    language === "hi"
      ? "नमस्ते! मुझे लक्ष्मी कृषि केंद्र के उत्पादों और फसल सहायता के बारे में जानकारी चाहिए।"
      : "Hello! I would like information about Laxmi Krashi Kendra products and crop support.";
  const message = encodeURIComponent(
    "नमस्ते! मैं लक्ष्मी कृषि केंद्र के उत्पादों के बारे में जानकारी चाहता/चाहती हूँ।"
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(localizedMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50"
      title={language === "hi" ? "व्हाट्सऐप पर बात करें" : "Chat on WhatsApp"}
      aria-label="WhatsApp पर संपर्क करें"
    >
      {/* Pulse ring animation */}
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></div>

      {/* Main button */}
      <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 hover:shadow-green-500/40">
        <FaWhatsapp size={28} />
      </div>

      {/* Tooltip */}
      <div className="hidden absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
        व्हाट्सएप पर बात करें
        <div className="absolute top-full right-6 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </a>
  );
};

const CleanWhatsAppFloat = () => {
  const { language } = useLanguage();
  const phoneNumber = '919977938192';
  const localizedMessage =
    language === 'hi'
      ? 'नमस्ते! मुझे लक्ष्मी कृषि केंद्र के उत्पादों और फसल सहायता के बारे में जानकारी चाहिए।'
      : 'Hello! I would like information about Laxmi Krashi Kendra products and crop support.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(localizedMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={language === 'hi' ? 'व्हाट्सऐप पर बात करें' : 'Chat on WhatsApp'}
      aria-label={language === 'hi' ? 'व्हाट्सऐप पर संपर्क करें' : 'Contact on WhatsApp'}
      className="group fixed bottom-6 right-6 z-50"
    >
      <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-30" />
      <div className="relative rounded-full bg-gradient-to-br from-green-500 to-green-600 p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40">
        <FaWhatsapp size={28} />
      </div>
    </a>
  );
};

export default CleanWhatsAppFloat;
