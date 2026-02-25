import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductsSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t('seeds'),
      description: 'हाईब्रिड और देसी बीज',
      count: '50+'
    },
    {
      title: t('fertilizers'),
      description: 'जैविक और रासायनिक उर्वरक',
      count: '30+'
    },
    {
      title: t('pesticides'),
      description: 'कीटनाशक और फफूंदनाशक',
      count: '40+'
    },
    {
      title: t('hardware'),
      description: 'कृषि उपकरण और मशीनरी',
      count: '20+'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            {t('products')}
          </h2>
          <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
            {t('view_all')} →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 opacity-20 mb-4">
                  {category.count}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
                <Link 
                  href={\`/products?category=\${category.title.toLowerCase()}\`}
                  className="inline-block mt-4 text-green-600 hover:text-green-700"
                >
                  {t('view_details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
