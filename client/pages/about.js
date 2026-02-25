import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { FiPhone, FiMapPin, FiUsers, FiAward, FiShield, FiHeart } from "react-icons/fi";

export default function About() {
  const { language } = useLanguage();

  // Mission items data
  const missionItems = language === 'hi' ? [
    'किसानों को सर्वोत्तम गुणवत्ता के कृषि उत्पाद उपलब्ध कराना',
    'मुफ्त और विश्वसनीय कृषि सलाह प्रदान करना',
    'खेती की लागत कम करने में मदद करना',
    'आधुनिक कृषि तकनीकों से किसानों को परिचित कराना',
    'मिट्टी और फसल स्वास्थ्य में सुधार करना',
    'स्थायी और लाभदायक खेती को बढ़ावा देना'
  ] : [
    'Provide farmers with the best quality agricultural products',
    'Offer free and reliable agricultural advice',
    'Help reduce farming costs',
    'Introduce farmers to modern farming techniques',
    'Improve soil and crop health',
    'Promote sustainable and profitable farming'
  ];

  // Core values
  const coreValues = [
    {
      icon: <FiShield />,
      title: language === 'hi' ? 'ईमानदारी' : 'Honesty',
      description: language === 'hi' 
        ? 'हर उत्पाद के बारे में पूरी पारदर्शिता'
        : 'Complete transparency about every product'
    },
    {
      icon: <FiAward />,
      title: language === 'hi' ? 'गुणवत्ता' : 'Quality',
      description: language === 'hi' 
        ? 'केवल प्रमाणित और टेस्टेड उत्पाद'
        : 'Only certified and tested products'
    },
    {
      icon: <FiUsers />,
      title: language === 'hi' ? 'सेवा' : 'Service',
      description: language === 'hi' 
        ? 'बिक्री के बाद भी पूरी सहायता'
        : 'Complete support even after sales'
    },
    {
      icon: <FiHeart />,
      title: language === 'hi' ? 'समर्पण' : 'Dedication',
      description: language === 'hi' 
        ? 'हर किसान की सफलता के लिए प्रतिबद्ध'
        : 'Committed to every farmer\'s success'
    }
  ];

  // Milestones
  const milestones = [
    { year: '1998', event: language === 'hi' ? 'स्थापना' : 'Founded' },
    { year: '2005', event: language === 'hi' ? 'प्रमाणित विक्रेता' : 'Certified Dealer' },
    { year: '2010', event: language === 'hi' ? 'दूसरा स्टोर खोला' : 'Second Store Opened' },
    { year: '2015', event: language === 'hi' ? '5000+ किसान ग्राहक' : '5000+ Farmer Customers' },
    { year: '2023', event: language === 'hi' ? '25 वर्ष पूरे' : '25 Years Completed' }
  ];

  return (
    <>
      <Head>
        <title>{language === 'hi' ? 'हमारे बारे में - लक्ष्मी कृषि केंद्र' : 'About Us - Laxmi Krashi Kendra'}</title>
        <meta name="description" content={language === 'hi' 
          ? 'लक्ष्मी कृषि केंद्र - 25+ वर्षों से किसानों की सेवा। गुणवत्तापूर्ण बीज, उर्वरक, कीटनाशक और कृषि सलाह। सिराथा में स्थित।'
          : 'Laxmi Krashi Kendra - Serving farmers for 25+ years. Quality seeds, fertilizers, pesticides and agricultural advice. Located in Siratha.'} />
        <meta name="keywords" content={language === 'hi' 
          ? 'कृषि स्टोर, बीज, उर्वरक, कीटनाशक, किसान सहायता, सिराथा, कृषि सलाह'
          : 'agriculture store, seeds, fertilizers, pesticides, farmer help, siratha, crop advisory'} />
        <meta property="og:title" content="लक्ष्मी कृषि केंद्र - 25+ वर्षों का विश्वास" />
        <meta property="og:description" content="1998 से किसानों की सेवा में" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://laxmikrashikendra.com/about" />
      </Head>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                {language === 'hi' ? 'होम' : 'Home'}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li aria-current="page" className="text-green-600 font-semibold">
              {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold mb-6">
            🎉 {language === 'hi' ? '25+ वर्षों का विश्वास' : '25+ Years of Trust'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {language === 'hi' ? 'हमारी कहानी' : 'Our Story'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'hi' 
              ? '1998 से किसानों के साथ एक विश्वसनीय सफर'
              : 'A trusted journey with farmers since 1998'}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {language === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krashi Kendra'}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              {language === 'hi' 
                ? '1998 में स्थापित, लक्ष्मी कृषि केंद्र ने अपनी यात्रा एक छोटी सी दुकान के रूप में शुरू की। आज हम क्षेत्र के प्रमुख कृषि इनपुट स्टोर में से एक हैं।'
                : 'Established in 1998, Laxmi Krashi Kendra started its journey as a small shop. Today we are one of the leading agricultural input stores in the region.'}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              {language === 'hi' 
                ? 'हमारी सफलता का रहस्य है — ईमानदारी, गुणवत्ता और किसानों के प्रति समर्पण। हम केवल प्रमाणित और गुणवत्तापूर्ण उत्पाद ही बेचते हैं।'
                : 'The secret of our success is — honesty, quality and dedication to farmers. We sell only certified and quality products.'}
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-semibold">{language === 'hi' ? '5000+ संतुष्ट किसान' : '5000+ Happy Farmers'}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-semibold">{language === 'hi' ? '25+ वर्ष अनुभव' : '25+ Years Experience'}</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
              </h3>
            </div>

            <ul className="space-y-4" role="list">
              {missionItems.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-green-600 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">✓</span>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {language === 'hi' ? 'हमारे मूल्य' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-2xl mb-4 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {language === 'hi' ? 'हमारी यात्रा' : 'Our Journey'}
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-green-200 transform -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                      {milestone.year}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {milestone.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visit Us CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {language === 'hi' ? 'हमसे मिलें' : 'Visit Us'}
              </h2>
              <p className="text-green-100 mb-6 text-lg">
                {language === 'hi' 
                  ? 'हमारे अनुभवी टीम से कृषि सलाह लें या स्टोर पर आकर मिलें'
                  : 'Get agricultural advice from our experienced team or visit our store'}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <FiMapPin className="mr-3 text-green-300" size={20} />
                  <span>बस स्टैंड चौक, सिराथा, पिन कोड – 480334</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-3 text-green-300" size={20} />
                  <a href="tel:9977938192" className="hover:text-green-300 transition-colors">
                    9977938192
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-white/10 p-8 rounded-xl backdrop-blur-sm">
                <div className="text-6xl mb-4">🚜</div>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'hi' ? 'कार्य समय' : 'Business Hours'}
                </h3>
                <p className="text-green-100">
                  {language === 'hi' 
                    ? 'सोम–शनिवार: सुबह 9:00 – शाम 8:00'
                    : 'Mon–Sat: 9:00 AM – 8:00 PM'}
                </p>
                <p className="text-sm text-green-200 mt-2">
                  {language === 'hi' ? 'रविवार: सुबह 10:00 – शाम 6:00' : 'Sun: 10:00 AM – 6:00 PM'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="/contact"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </a>
            <a 
              href="tel:9977938192"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              {language === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}