import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/Products/ProductCard';
import { FiSearch } from 'react-icons/fi';

export default function Products() {
  const { t } = useLanguage();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Sample products data - replace with actual API call
  const sampleProducts = [
    {
      id: 1,
      name: 'Hybrid Wheat Seeds',
      description: 'High-yield hybrid wheat seeds',
      category: 'seeds',
      price: 2500,
      unit: 'kg'
    },
    {
      id: 2,
      name: 'NPK Fertilizer',
      description: 'Balanced NPK fertilizer for plant growth',
      category: 'fertilizers',
      price: 1200,
      unit: 'kg'
    },
    {
      id: 3,
      name: 'Spray Pump',
      description: 'Manual spray pump for pesticides',
      category: 'hardware',
      price: 1800,
      unit: 'piece'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { value: '', label: t('all') },
    { value: 'seeds', label: t('seeds') },
    { value: 'fertilizers', label: t('fertilizers') },
    { value: 'pesticides', label: t('pesticides') },
    { value: 'hardware', label: t('hardware') }
  ];

  return (
    <>
      <Head>
        <title>उत्पाद - लक्ष्मी कृषि केंद्र</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('products')}
          </h1>
          <p className="text-gray-600">
            उच्च गुणवत्ता वाले कृषि उत्पादों की हमारी विस्तृत श्रृंखला देखें
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('search_products')}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">{t('filter_by_category')}</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('no_products')}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}