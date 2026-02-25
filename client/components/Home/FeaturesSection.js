import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiStar, FiCheckCircle } from 'react-icons/fi';
import { MdSupportAgent, MdLocalShipping } from 'react-icons/md';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FiStar className="text-3xl" />,
      title: t('years_experience'),
      description: t('years_desc')
    },
    {
      icon: <MdSupportAgent className="text-3xl" />,
      title: t('honest_advice'),
      description: t('honest_desc')
    },
    {
      icon: <FiCheckCircle className="text-3xl" />,
      title: t('quality_products'),
      description: t('quality_desc')
    },
    {
      icon: <MdLocalShipping className="text-3xl" />,
      title: t('farmer_support'),
      description: t('farmer_desc')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {t('why_choose_us')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-green-50 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
