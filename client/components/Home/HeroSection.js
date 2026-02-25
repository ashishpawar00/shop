import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiPhone, FiMessageCircle, FiMapPin } from 'react-icons/fi';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={\`tel:\${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}\`}
              className="btn-primary inline-flex items-center"
            >
              <FiPhone className="mr-2" />
              {t('hero_cta_call')}
            </a>
            <a 
              href={\`https://wa.me/\${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <FiMessageCircle className="mr-2" />
              {t('hero_cta_whatsapp')}
            </a>
            <a 
              href="/contact"
              className="btn-secondary inline-flex items-center"
            >
              <FiMapPin className="mr-2" />
              {t('hero_cta_visit')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
