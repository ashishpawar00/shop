// client/pages/products/index.js
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import {
  FiFilter, FiSearch, FiGrid, FiList, FiChevronDown,
  FiPackage, FiTag, FiShoppingCart, FiCheck, FiPlus
} from 'react-icons/fi';
import { TbTractor, TbSeeding } from 'react-icons/tb';
import { GiPlantWatering } from 'react-icons/gi';

import { API_URL } from '@/lib/api';

export default function Products() {
  const { language } = useLanguage();
  const { addToCart, cart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [addedId, setAddedId] = useState(null); // flash "Added" animation

  const categories = [
    { value: 'all', label: language === 'hi' ? 'सभी श्रेणियाँ' : 'All Categories', icon: <FiPackage /> },
    { value: 'seeds', label: language === 'hi' ? 'बीज' : 'Seeds', icon: <TbSeeding /> },
    { value: 'fertilizers', label: language === 'hi' ? 'उर्वरक / रसायन' : 'Fertilizer / Chemical', icon: <GiPlantWatering /> },
    { value: 'pesticides', label: language === 'hi' ? 'कीटनाशक' : 'Pesticides', icon: <FiTag /> },
    { value: 'hardware', label: language === 'hi' ? 'उपकरण / हार्डवेयर' : 'Hardware Items', icon: <TbTractor /> },
  ];

  // Fetch from real API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (search) params.set('search', search);
      if (sortBy === 'price_low') params.set('sortBy', 'price_low');
      else if (sortBy === 'price_high') params.set('sortBy', 'price_high');
      else if (sortBy === 'popular') params.set('sortBy', 'popular');
      else if (sortBy === 'name') params.set('sortBy', 'name');
      params.set('page', page);
      params.set('limit', 20);

      const res = await fetch(`${API_URL}/products?${params}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error('Fetch error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, search, sortBy, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Read initial category from URL
  useEffect(() => {
    if (router.query.category) setCategory(router.query.category);
    if (router.query.search) setSearch(router.query.search);
  }, [router.query]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      _id: product._id,
      name: product.nameHindi || product.name,
      nameHindi: product.nameHindi,
      price: product.price || 0,
      image: product.image || '',
      category: product.category || '',
      emoji: product.category === 'seeds' ? '🌾' : product.category === 'fertilizers' ? '🧪' : product.category === 'pesticides' ? '🐛' : product.category === 'hardware' ? '🔧' : '📦'
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <>
      <Head>
        <title>{language === 'hi' ? 'उत्पाद — लक्ष्मी कृषि केंद्र' : 'Products — Laxmi Krishi Kendra'}</title>
        <meta name="description" content="Quality agricultural products — seeds, fertilizers, pesticides, hardware" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'hi' ? '🌾 कृषि उत्पाद' : '🌾 Agricultural Products'}
            </h1>
            <p className="text-green-200 max-w-md mx-auto">
              {language === 'hi' ? 'बीज, उर्वरक, कीटनाशक और हार्डवेयर — सब कुछ एक जगह' : 'Seeds, fertilizers, pesticides & hardware — all in one place'}
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto flex">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={language === 'hi' ? 'उत्पाद खोजें...' : 'Search products...'}
                className="flex-1 px-5 py-3 rounded-l-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button type="submit" className="px-6 py-3 bg-white text-green-800 rounded-r-xl font-semibold hover:bg-green-50 transition">
                <FiSearch size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6 flex flex-wrap items-center gap-3">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.value} onClick={() => { setCategory(cat.value); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${category === cat.value ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Sort */}
              <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}
                className="px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="newest">{language === 'hi' ? 'नवीनतम' : 'Newest'}</option>
                <option value="price_low">{language === 'hi' ? 'कम दाम' : 'Price: Low'}</option>
                <option value="price_high">{language === 'hi' ? 'ज्यादा दाम' : 'Price: High'}</option>
                <option value="name">{language === 'hi' ? 'नाम' : 'Name'}</option>
                <option value="popular">{language === 'hi' ? 'लोकप्रिय' : 'Popular'}</option>
              </select>

              {/* View mode */}
              <div className="flex border rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-400'}`}><FiGrid size={16} /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-400'}`}><FiList size={16} /></button>
              </div>

              <span className="text-sm text-gray-500">{totalCount} {language === 'hi' ? 'उत्पाद' : 'products'}</span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* No products */}
          {!loading && products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
              </h3>
              <p className="text-gray-500 mb-4">
                {language === 'hi' ? 'अलग फ़िल्टर या खोज शब्द आज़माएं' : 'Try different filters or search terms'}
              </p>
              <button onClick={() => { setCategory('all'); setSearch(''); setPage(1); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
              >
                {language === 'hi' ? 'सब दिखाएं' : 'Show All'}
              </button>
            </div>
          )}

          {/* Grid View */}
          {!loading && products.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => {
                const inCart = isInCart(product._id);
                const justAdded = addedId === product._id;
                return (
                  <div key={product._id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all group">
                    {/* Image */}
                    <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      {product.image?.startsWith('http') ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="text-5xl">
                          {product.category === 'seeds' ? '🌾' : product.category === 'fertilizers' ? '🧪' : product.category === 'pesticides' ? '🐛' : product.category === 'hardware' ? '🔧' : '📦'}
                        </span>
                      )}
                      {/* Category badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-green-700 capitalize">{product.category}</span>
                      {product.featured && <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-white rounded-full text-xs font-bold">⭐ Featured</span>}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">{product.nameHindi || product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.name !== product.nameHindi ? product.name : ''}</p>
                      {product.brand && <p className="text-xs text-gray-400 mb-2">{product.brand}</p>}

                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          {product.price ? (
                            <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                          ) : (
                            <span className="text-sm text-gray-400">{language === 'hi' ? 'मूल्य पूछें' : 'Ask price'}</span>
                          )}
                          {product.unit && <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>}
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${product.inStock !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {product.inStock !== false ? (language === 'hi' ? 'उपलब्ध' : 'In Stock') : (language === 'hi' ? 'स्टॉक नहीं' : 'Out of Stock')}
                        </span>
                      </div>

                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.inStock === false}
                        className={`w-full mt-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all
                          ${justAdded ? 'bg-green-100 text-green-700 scale-95' : inCart ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100' : 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg active:scale-95'}
                          ${product.inStock === false ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        {justAdded ? (<><FiCheck size={16} /> {language === 'hi' ? 'जोड़ा गया!' : 'Added!'}</>) :
                          inCart ? (<><FiShoppingCart size={14} /> {language === 'hi' ? 'कार्ट में है' : 'In Cart'} +</>) :
                            (<><FiPlus size={14} /> {language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}</>)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {!loading && products.length > 0 && viewMode === 'list' && (
            <div className="space-y-3">
              {products.map(product => {
                const inCart = isInCart(product._id);
                const justAdded = addedId === product._id;
                return (
                  <div key={product._id} className="bg-white rounded-xl border p-4 flex items-center gap-4 hover:shadow-md transition">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {product.image?.startsWith('http') ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{product.category === 'seeds' ? '🌾' : product.category === 'fertilizers' ? '🧪' : '📦'}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{product.nameHindi || product.name}</h3>
                      <p className="text-xs text-gray-500">{product.brand} • {product.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-green-600 text-lg">₹{product.price || '—'}</p>
                    </div>
                    <button onClick={() => handleAddToCart(product)} disabled={product.inStock === false}
                      className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition
                        ${justAdded ? 'bg-green-100 text-green-700' : inCart ? 'bg-green-50 text-green-600 border' : 'bg-green-600 text-white hover:bg-green-700'}
                        ${product.inStock === false ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {justAdded ? '✓' : inCart ? (<><FiShoppingCart size={14} className="inline mr-1" /> +</>) : (language === 'hi' ? '+ कार्ट' : '+ Cart')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
                >{i + 1}</button>
              ))}
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              {language === 'hi' ? '🌾 कोई उत्पाद नहीं मिला?' : "🌾 Can't find a product?"}
            </h2>
            <p className="text-green-100 mb-4">
              {language === 'hi' ? 'हमें WhatsApp पर बताएं, हम आपके लिए ढूंढेंगे' : 'Tell us on WhatsApp, we will find it for you'}
            </p>
            <a href="https://wa.me/919977938192?text=मुझे%20एक%20उत्पाद%20चाहिए" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:shadow-xl transition"
            >
              <FiShoppingCart /> {language === 'hi' ? 'WhatsApp पर बताएं' : 'Contact on WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}