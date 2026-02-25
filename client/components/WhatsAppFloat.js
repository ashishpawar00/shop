import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const WhatsAppFloat = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent('Hello! I would like to know more about your products.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
        <FiMessageCircle size={24} />
      </div>
    </a>
  );
};

export default WhatsAppFloat;