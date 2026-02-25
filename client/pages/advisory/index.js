import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  FiCalendar, 
  FiTag, 
  FiUser, 
  FiArrowRight, 
  FiBookOpen, 
  FiVideo, 
  FiDownload,
  FiMessageCircle
} from "react-icons/fi";
import { MdAgriculture, MdWaterDrop, MdPestControl } from "react-icons/md";

export default function Advisory() {
  const { language } = useLanguage();
  
  // Sample advisory articles
  const advisoryArticles = [
    {
      id: 1,
      title: language === 'hi' ? 'गेहूं की खेती में ध्यान रखने योग्य बातें' : 'Important Tips for Wheat Cultivation',
      category: language === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      description: language === 'hi' 
        ? 'गेहूं की उन्नत खेती के लिए समय, मिट्टी और उर्वरक प्रबंधन की पूरी जानकारी।'
        : 'Complete guide on timing, soil and fertilizer management for advanced wheat cultivation.',
      date: '15 मार्च 2024',
      readTime: '5 मिनट',
      image: '🌾',
      tags: ['wheat', 'cultivation', 'tips']
    },
    {
      id: 2,
      title: language === 'hi' ? 'खरीफ फसलों के लिए सबसे अच्छे बीज' : 'Best Seeds for Kharif Crops',
      category: language === 'hi' ? 'बीज प्रबंधन' : 'Seed Management',
      description: language === 'hi'
        ? 'खरीफ सीजन में धान, मक्का और सोयाबीन के लिए उपयुक्त बीजों का चयन।'
        : 'Selection of suitable seeds for paddy, maize and soybean in Kharif season.',
      date: '10 मार्च 2024',
      readTime: '4 मिनट',
      image: '🌱',
      tags: ['seeds', 'kharif', 'selection']
    },
    {
      id: 3,
      title: language === 'hi' ? 'कीटनाशक का सही उपयोग कैसे करें' : 'How to Use Pesticides Correctly',
      category: language === 'hi' ? 'कीट प्रबंधन' : 'Pest Management',
      description: language === 'hi'
        ? 'फसलों को कीटों से बचाने के लिए सही समय और सही मात्रा में कीटनाशक का उपयोग।'
        : 'Using pesticides at the right time and in the right quantity to protect crops from pests.',
      date: '5 मार्च 2024',
      readTime: '6 मिनट',
      image: '🐛',
      tags: ['pesticides', 'safety', 'pest-control']
    },
    {
      id: 4,
      title: language === 'hi' ? 'जैविक खेती के फायदे और तरीके' : 'Benefits and Methods of Organic Farming',
      category: language === 'hi' ? 'जैविक खेती' : 'Organic Farming',
      description: language === 'hi'
        ? 'रासायनिक उर्वरकों के बिना प्राकृतिक तरीके से खेती करने के लाभ और तकनीक।'
        : 'Benefits and techniques of farming naturally without chemical fertilizers.',
      date: '28 फरवरी 2024',
      readTime: '7 मिनट',
      image: '🍃',
      tags: ['organic', 'natural', 'sustainable']
    }
  ];

  // Advisory categories
  const categories = [
    {
      icon: <MdAgriculture className="text-3xl" />,
      title: language === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      count: '12+',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <MdWaterDrop className="text-3xl" />,
      title: language === 'hi' ? 'सिंचाई प्रबंधन' : 'Irrigation Management',
      count: '8+',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <MdPestControl className="text-3xl" />,
      title: language === 'hi' ? 'कीट नियंत्रण' : 'Pest Control',
      count: '15+',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: language === 'hi' ? 'मिट्टी स्वास्थ्य' : 'Soil Health',
      count: '10+',
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  // Popular tags
  const popularTags = [
    'wheat', 'rice', 'cotton', 'vegetables', 'fertilizer', 
    'irrigation', 'organic', 'seeds', 'monsoon', 'harvest'
  ];

  return (
    <>
      <Head>
        <title>{language === 'hi' ? 'कृषि सलाह - लक्ष्मी कृषि केंद्र' : 'Crop Advisory - Laxmi Krashi Kendra'}</title>
        <meta name="description" content={language === 'hi' 
          ? 'फसल, मिट्टी और मौसम से जुड़ी विशेषज्ञ सलाह। निःशुल्क कृषि मार्गदर्शन।'
          : 'Expert advice on crops, soil and weather. Free agricultural guidance.'} />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'hi' ? 'कृषि विशेषज्ञ सलाह' : 'Agricultural Expert Advice'}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              {language === 'hi' 
                ? '25+ वर्षों के अनुभव से चुनी गई फसल सलाह और आधुनिक कृषि तकनीकें'
                : 'Crop advice and modern farming techniques selected from 25+ years of experience'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#latest-advice"
                className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                {language === 'hi' ? 'सलाह पढ़ें' : 'Read Advice'}
              </a>
              <a 
                href="tel:9977938192"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                {language === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            {language === 'hi' ? 'सलाह के प्रकार' : 'Types of Advice'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} text-white rounded-2xl mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'hi' 
                    ? `${category.count} लेख और गाइड`
                    : `${category.count} articles & guides`}
                </p>
                <Link 
                  href={`/advisory/category/${category.title.toLowerCase().replace(' ', '-')}`}
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  {language === 'hi' ? 'सभी देखें' : 'View All'}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Advisory Articles */}
      <section id="latest-advice" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {language === 'hi' ? 'नवीनतम सलाह' : 'Latest Advice'}
              </h2>
              <p className="text-gray-600 mt-2">
                {language === 'hi' 
                  ? 'विशेषज्ञों द्वारा तैयार की गई नवीनतम कृषि सलाह'
                  : 'Latest agricultural advice prepared by experts'}
              </p>
            </div>
            <Link 
              href="/advisory/all"
              className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center"
            >
              {language === 'hi' ? 'सभी सलाह देखें' : 'View All Advice'}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {advisoryArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiCalendar className="mr-2" />
                      {article.date}
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <div className="text-4xl mr-4">{article.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiBookOpen className="mr-2" />
                      {article.readTime} {language === 'hi' ? 'पढ़ने का समय' : 'read'}
                    </div>
                    <div className="flex items-center space-x-2">
                      {article.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href={`/advisory/${article.id}`}
                    className="mt-6 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    {language === 'hi' ? 'पूरा पढ़ें' : 'Read Full Article'}
                    <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Consultation */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {language === 'hi' ? 'निःशुल्क विशेषज्ञ परामर्श' : 'Free Expert Consultation'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'hi' 
                    ? 'हमारे अनुभवी कृषि विशेषज्ञ आपकी फसल, मिट्टी और मौसम संबंधी समस्याओं का समाधान बताएंगे।'
                    : 'Our experienced agricultural experts will provide solutions to your crop, soil and weather related problems.'}
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    language === 'hi' ? 'फसल रोग की पहचान और उपचार' : 'Crop disease identification and treatment',
                    language === 'hi' ? 'मिट्टी परीक्षण सलाह' : 'Soil testing advice',
                    language === 'hi' ? 'उर्वरक और कीटनाशक सिफारिश' : 'Fertilizer and pesticide recommendations',
                    language === 'hi' ? 'मौसम आधारित खेती योजना' : 'Weather-based farming plan'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                        ✓
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="tel:9977938192"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
                  >
                    <FiUser className="mr-2" />
                    {language === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
                  </a>
                  <a 
                    href="https://wa.me/919977938192"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center"
                  >
                    <FiMessageCircle className="mr-2" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-8 text-center">
                <div className="text-6xl mb-6">👨‍🌾</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {language === 'hi' ? 'किसान हेल्पलाइन' : 'Farmer Helpline'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'hi' 
                    ? 'सोमवार से शनिवार, सुबह 9:00 से शाम 8:00 तक'
                    : 'Monday to Saturday, 9:00 AM to 8:00 PM'}
                </p>
                <div className="text-3xl font-bold text-green-700 mb-2">
                  9977938192
                </div>
                <p className="text-sm text-gray-500">
                  {language === 'hi' ? 'निःशुल्क कॉल' : 'Toll Free Call'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            {language === 'hi' ? 'मुफ्त संसाधन' : 'Free Resources'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: language === 'hi' ? 'फसल कैलेंडर' : 'Crop Calendar',
                description: language === 'hi' 
                  ? 'सभी मौसमी फसलों के लिए बुवाई और कटाई का समय'
                  : 'Sowing and harvesting time for all seasonal crops',
                icon: <FiCalendar className="text-3xl" />
              },
              {
                title: language === 'hi' ? 'वीडियो गाइड' : 'Video Guides',
                description: language === 'hi' 
                  ? 'कृषि तकनीकों के व्यावहारिक वीडियो प्रदर्शन'
                  : 'Practical video demonstrations of farming techniques',
                icon: <FiVideo className="text-3xl" />
              },
              {
                title: language === 'hi' ? 'डाउनलोड करें' : 'Downloads',
                description: language === 'hi' 
                  ? 'मुफ्त PDF गाइड, चार्ट और पोस्टर'
                  : 'Free PDF guides, charts and posters',
                icon: <FiDownload className="text-3xl" />
              }
            ].map((resource, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-xl mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <button className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                  {language === 'hi' ? 'अभी एक्सेस करें' : 'Access Now'}
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {language === 'hi' ? 'लोकप्रिय विषय' : 'Popular Topics'}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, index) => (
              <Link
                key={index}
                href={`/advisory/tag/${tag}`}
                className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                {language === 'hi' 
                  ? (tag === 'wheat' ? 'गेहूं' :
                     tag === 'rice' ? 'धान' :
                     tag === 'cotton' ? 'कपास' :
                     tag === 'vegetables' ? 'सब्जियां' :
                     tag === 'fertilizer' ? 'उर्वरक' :
                     tag === 'irrigation' ? 'सिंचाई' :
                     tag === 'organic' ? 'जैविक' :
                     tag === 'seeds' ? 'बीज' :
                     tag === 'monsoon' ? 'मानसून' :
                     tag === 'harvest' ? 'कटाई' : tag)
                  : tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}