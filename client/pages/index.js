// client/pages/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { FiPhone, FiMessageCircle, FiMapPin, FiCheck, FiTruck, FiShield, FiUsers, FiShoppingCart, FiPlus } from 'react-icons/fi';
import { MdLocalFlorist, MdAgriculture, MdWaterDrop } from 'react-icons/md';
import { API_URL } from '@/lib/api';

export default function Home() {
  const { t, language } = useLanguage();
  const { addToCart, cart } = useCart();

  // Phone number
  const phoneNumber = '9977938192';

  // Real products from API
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products?limit=8&featured=true`)
      .then(r => r.json())
      .then(data => {
        setProducts(data.products || []);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id, _id: product._id,
      name: product.nameHindi || product.name,
      nameHindi: product.nameHindi,
      price: product.price || 0,
      image: product.image || '',
      category: product.category || '',
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };
  const isInCart = (id) => cart.some(item => item.id === id);

  // Featured products (placeholder if API empty)
  const featuredProducts = [
    {
      id: 1,
      name: language === 'hi' ? 'हाइब्रिड गेहूं बीज' : 'Hybrid Wheat Seeds',
      category: 'seeds',
      icon: '🌾',
      description: language === 'hi' ? 'उच्च उपज वाले हाइब्रिड बीज' : 'High yield hybrid seeds'
    },
    {
      id: 2,
      name: language === 'hi' ? 'एनपीके उर्वरक' : 'NPK Fertilizer',
      category: 'fertilizers',
      icon: '🧪',
      description: language === 'hi' ? 'संतुलित पोषक तत्व' : 'Balanced nutrients'
    },
    {
      id: 3,
      name: language === 'hi' ? 'कीटनाशक स्प्रे' : 'Pesticide Spray',
      category: 'pesticides',
      icon: '🐛',
      description: language === 'hi' ? 'प्रभावी कीट नियंत्रण' : 'Effective pest control'
    },
    {
      id: 4,
      name: language === 'hi' ? 'स्प्रे पम्प' : 'Spray Pump',
      category: 'hardware',
      icon: '🔧',
      description: language === 'hi' ? 'आधुनिक स्प्रे उपकरण' : 'Modern spraying equipment'
    }
  ];

  // Why Choose Us features
  const features = [
    {
      icon: <FiCheck className="text-3xl" />,
      title: language === 'hi' ? '25+ वर्षों का अनुभव' : '25+ Years Experience',
      description: language === 'hi' ? 'दो दशकों से अधिक समय से किसानों की सेवा' : 'Serving farmers for over two decades'
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: language === 'hi' ? 'गुणवत्ता की गारंटी' : 'Quality Guarantee',
      description: language === 'hi' ? 'प्रमाणित और गुणवत्तापूर्ण उत्पाद' : 'Certified and quality products'
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: language === 'hi' ? 'विशेषज्ञ सलाह' : 'Expert Advice',
      description: language === 'hi' ? 'अनुभवी कृषि विशेषज्ञों से मार्गदर्शन' : 'Guidance from experienced agricultural experts'
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: language === 'hi' ? 'निःशुल्क डिलीवरी' : 'Free Delivery',
      description: language === 'hi' ? 'स्थानीय क्षेत्र में निःशुल्क वितरण' : 'Free delivery in local area'
    }
  ];

  // Services
  const services = [
    {
      icon: <MdAgriculture className="text-4xl" />,
      title: language === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      description: language === 'hi' ? 'मौसम और मिट्टी के अनुसार सलाह' : 'Season and soil specific advice'
    },
    {
      icon: <MdLocalFlorist className="text-4xl" />,
      title: language === 'hi' ? 'बीज चयन' : 'Seed Selection',
      description: language === 'hi' ? 'उपयुक्त बीज चुनने में मदद' : 'Help in choosing suitable seeds'
    },
    {
      icon: <MdWaterDrop className="text-4xl" />,
      title: language === 'hi' ? 'उर्वरक मार्गदर्शन' : 'Fertilizer Guidance',
      description: language === 'hi' ? 'सही मात्रा और प्रकार का मार्गदर्शन' : 'Guidance on right quantity and type'
    }
  ];

  return (
    <>
      <Head>
        <title>{language === 'hi' ? 'लक्ष्मी कृषि केंद्र - 25+ वर्षों का विश्वास' : 'Laxmi Krashi Kendra - 25+ Years of Trust'}</title>
        <meta name="description" content={language === 'hi' ? 'लक्ष्मी कृषि केंद्र - फर्टिलाइजर, बीज, कीटनाशक और कृषि हार्डवेयर स्टोर' : 'Laxmi Krashi Kendra - Fertilizer, Seeds, Pesticides & Agricultural Hardware Store'} />
        <meta name="keywords" content={language === 'hi' ? 'कृषि, बीज, उर्वरक, कीटनाशक, किसान, खेती' : 'agriculture, seeds, fertilizer, pesticide, farmer, farming'} />
      </Head>

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <span className="text-sm font-semibold">🎉 {language === 'hi' ? '25+ वर्षों का विश्वास' : '25+ Years of Trust'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {language === 'hi' ? (
                  <>
                    आपका विश्वसनीय<br />
                    <span className="text-yellow-300">कृषि साथी</span>
                  </>
                ) : (
                  <>
                    Your Trusted<br />
                    <span className="text-yellow-300">Agriculture Partner</span>
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-green-100 mb-8">
                {language === 'hi'
                  ? 'गुणवत्तापूर्ण बीज, उर्वरक, कीटनाशक और कृषि उपकरण'
                  : 'Quality Seeds, Fertilizers, Pesticides & Farming Equipment'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center bg-white text-green-700 px-6 py-4 rounded-lg font-bold hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  <FiPhone className="mr-3" size={20} />
                  {language === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
                </a>

                <a
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white px-6 py-4 rounded-lg font-bold hover:bg-green-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  <FiMessageCircle className="mr-3" size={20} />
                  {language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center border-2 border-white text-white px-6 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
                >
                  <FiMapPin className="mr-3" size={20} />
                  {language === 'hi' ? 'स्टोर पर आएं' : 'Visit Store'}
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                  <span>{language === 'hi' ? '5000+ संतुष्ट किसान' : '5000+ Happy Farmers'}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                  <span>{language === 'hi' ? 'प्रमाणित उत्पाद' : 'Certified Products'}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                  <span>{language === 'hi' ? '24/7 सहायता' : '24/7 Support'}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-8xl mb-6">🚜</div>
                  <h3 className="text-2xl font-bold mb-4">
                    {language === 'hi' ? 'किसानों की पहली पसंद' : 'Farmers\' First Choice'}
                  </h3>
                  <p className="text-green-100 mb-6">
                    {language === 'hi'
                      ? 'हमारे विशेषज्ञ आपकी फसल को स्वस्थ और उत्पादक बनाने में मदद करते हैं'
                      : 'Our experts help make your crops healthy and productive'}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm">{language === 'hi' ? 'बीज प्रकार' : 'Seed Types'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">30+</div>
                      <div className="text-sm">{language === 'hi' ? 'उर्वरक' : 'Fertilizers'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">25+</div>
                      <div className="text-sm">{language === 'hi' ? 'वर्ष अनुभव' : 'Years Exp'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {language === 'hi' ? 'हमें क्यों चुनें?' : 'Why Choose Us?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'hi'
                ? '25 वर्षों से हम किसानों के विश्वास का प्रतीक हैं'
                : 'For 25 years, we have been a symbol of farmers\' trust'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
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

      {/* ========== FEATURED PRODUCTS FROM DATABASE ========== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {language === 'hi' ? '🛒 हमारे उत्पाद' : '🛒 Our Products'}
              </h2>
              <p className="text-gray-600">
                {language === 'hi'
                  ? 'सीधे कार्ट में जोड़ें और ऑर्डर करें'
                  : 'Add to cart directly and place your order'}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition group"
            >
              {language === 'hi' ? 'सभी उत्पाद देखें' : 'View All Products'}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Loading */}
          {loadingProducts && (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* No products */}
          {!loadingProducts && products.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {language === 'hi' ? 'जल्द उत्पाद आ रहे हैं!' : 'Products coming soon!'}
              </h3>
              <p className="text-gray-500 mb-4">
                {language === 'hi' ? 'हम अपने उत्पाद जोड़ रहे हैं' : 'We are adding our products'}
              </p>
              <a href={`https://wa.me/91${phoneNumber}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
                <FiMessageCircle /> {language === 'hi' ? 'WhatsApp पर ऑर्डर करें' : 'Order on WhatsApp'}
              </a>
            </div>
          )}

          {/* Product Grid */}
          {!loadingProducts && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => {
                const inCart = isInCart(product._id);
                const justAdded = addedId === product._id;
                return (
                  <div key={product._id} className="bg-white rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                    {/* Product Image */}
                    <div className="relative h-40 md:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      {product.image?.startsWith('http') ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="text-5xl">
                          {product.category === 'seeds' ? '🌾' : product.category === 'fertilizers' ? '🧪' : product.category === 'pesticides' ? '🐛' : product.category === 'hardware' ? '🔧' : '📦'}
                        </span>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-green-700 capitalize">{product.category}</span>
                      {product.featured && <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-white rounded-full text-xs font-bold">⭐</span>}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight mb-1 line-clamp-2 group-hover:text-green-600 transition">
                        {product.nameHindi || product.name}
                      </h3>
                      {product.brand && <p className="text-xs text-gray-400 mb-2">{product.brand}</p>}

                      <div className="flex items-center justify-between mt-auto mb-3">
                        {product.price ? (
                          <span className="text-lg md:text-xl font-bold text-green-600">₹{product.price}</span>
                        ) : (
                          <span className="text-sm text-gray-400">{language === 'hi' ? 'मूल्य पूछें' : 'Ask price'}</span>
                        )}
                        {product.unit && <span className="text-xs text-gray-400">/{product.unit}</span>}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.inStock === false}
                        className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all
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

          {/* How to Order */}
          {!loadingProducts && products.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl border p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                {language === 'hi' ? '🛍️ ऑर्डर कैसे करें?' : '🛍️ How to Order?'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { step: '1', icon: '🛒', title: language === 'hi' ? 'उत्पाद चुनें' : 'Select Products', desc: language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to cart' },
                  { step: '2', icon: '📋', title: language === 'hi' ? 'पता भरें' : 'Fill Address', desc: language === 'hi' ? 'डिलीवरी पता दें' : 'Delivery address' },
                  { step: '3', icon: '💰', title: language === 'hi' ? 'भुगतान चुनें' : 'Choose Payment', desc: language === 'hi' ? 'COD या UPI' : 'COD or UPI' },
                  { step: '4', icon: '✅', title: language === 'hi' ? 'ऑर्डर हो गया!' : 'Order Placed!', desc: language === 'hi' ? 'ट्रैक करें' : 'Track order' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-green-50">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-xs font-bold text-green-600 mb-1">Step {item.step}</div>
                    <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {language === 'hi' ? 'हमारी सेवाएं' : 'Our Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'केवल उत्पाद नहीं, संपूर्ण कृषि समाधान'
                : 'Not just products, complete farming solutions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  {language === 'hi' ? 'सेवा के बारे में' : 'About Service'}
                  <span className="ml-2">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUSINESS HOURS & CONTACT ========== */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {language === 'hi' ? 'कार्य समय' : 'Business Hours'}
              </h2>

              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{language === 'hi' ? 'सोमवार - शनिवार' : 'Monday - Saturday'}</span>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm">🕘</span>
                  </div>
                  <p className="text-green-100">9:00 AM - 8:00 PM</p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{language === 'hi' ? 'रविवार' : 'Sunday'}</span>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm">🕚</span>
                  </div>
                  <p className="text-green-100">10:00 AM - 6:00 PM</p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{language === 'hi' ? 'तुरंत सहायता' : 'Emergency Support'}</span>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm">📞</span>
                  </div>
                  <p className="text-green-100">
                    {language === 'hi' ? '24/7 व्हाट्सएप सहायता' : '24/7 WhatsApp Support'}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
              </h2>

              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <FiPhone className="text-green-300 mr-3" size={24} />
                    <span className="font-semibold">{language === 'hi' ? 'फोन नंबर' : 'Phone Number'}</span>
                  </div>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-2xl font-bold hover:text-green-300 transition"
                  >
                    {phoneNumber}
                  </a>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <FiMessageCircle className="text-green-300 mr-3" size={24} />
                    <span className="font-semibold">{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                  </div>
                  <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold hover:text-green-300 transition"
                  >
                    {phoneNumber}
                  </a>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <FiMapPin className="text-green-300 mr-3" size={24} />
                    <span className="font-semibold">{language === 'hi' ? 'पता' : 'Address'}</span>
                  </div>
                  <p className="text-lg">
                    {language === 'hi'
                      ? 'मुख्य बाजार, कृषि नगर, तहसील, जिला'
                      : 'Main Market, Krishi Nagar, Tehsil, District'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'hi'
                ? 'आज ही अपनी फसल को स्वस्थ बनाएं'
                : 'Make Your Crops Healthy Today'}
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
              {language === 'hi'
                ? 'हमारे विशेषज्ञ आपको सही उत्पाद और सलाह देंगे'
                : 'Our experts will guide you to the right products and advice'}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-lg text-lg"
              >
                <FiPhone className="mr-3" size={24} />
                {language === 'hi' ? 'मुफ्त सलाह के लिए कॉल करें' : 'Call for Free Advice'}
              </a>

              <a
                href="/contact"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 text-lg"
              >
                <FiMapPin className="mr-3" size={24} />
                {language === 'hi' ? 'स्टोर का पता देखें' : 'View Store Location'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUICK CONTACT ========== */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'तुरंत सहायता चाहिए?' : 'Need Immediate Help?'}
              </h3>
              <p className="text-gray-600">
                {language === 'hi'
                  ? 'हमारे विशेषज्ञ से बात करें'
                  : 'Talk to our expert now'}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <FiPhone className="mr-2" />
                {language === 'hi' ? `कॉल: ${phoneNumber}` : `Call: ${phoneNumber}`}
              </a>

              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
              >
                <FiMessageCircle className="mr-2" />
                {language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}