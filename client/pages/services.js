import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import {
  FiPhone,
  FiMessageCircle,
  FiCheckCircle,
  FiArrowRight,
  FiDroplet,
  FiShield,
  FiTruck,
  FiStar,
} from "react-icons/fi";
import {
  MdAgriculture,
  MdWaterDrop,
  MdPestControl,
  MdLocalFlorist,
  MdSupportAgent,
  MdBiotech,
} from "react-icons/md";

export default function Services() {
  const { language } = useLanguage();

  const phoneNumber = "9977938192";

  // Services data
  const services = [
    {
      icon: <MdAgriculture className="text-4xl" />,
      emoji: "🌱",
      title: language === "hi" ? "फसल सलाह सेवा" : "Crop Advisory Service",
      description:
        language === "hi"
          ? "मौसम, मिट्टी और फसल के अनुसार विशेषज्ञ सलाह। सही बीज, उर्वरक और कीटनाशक का चयन करने में मदद।"
          : "Expert advice based on season, soil and crop. Help in selecting the right seeds, fertilizers and pesticides.",
      features:
        language === "hi"
          ? [
            "मिट्टी परीक्षण मार्गदर्शन",
            "मौसम आधारित खेती सलाह",
            "फसल चक्र योजना",
          ]
          : [
            "Soil testing guidance",
            "Weather-based farming advice",
            "Crop rotation planning",
          ],
      color: "from-green-500 to-emerald-600",
      bgLight: "from-green-50 to-emerald-50",
    },
    {
      icon: <MdBiotech className="text-4xl" />,
      emoji: "🧪",
      title:
        language === "hi" ? "उर्वरक मार्गदर्शन" : "Fertilizer Guidance",
      description:
        language === "hi"
          ? "सही मात्रा में खाद का उपयोग कैसे करें, जैविक और रासायनिक उर्वरक का संतुलित उपयोग।"
          : "How to use fertilizer in the right quantity, balanced use of organic and chemical fertilizers.",
      features:
        language === "hi"
          ? [
            "जैविक उर्वरक सलाह",
            "NPK संतुलन मार्गदर्शन",
            "लागत बचत सुझाव",
          ]
          : [
            "Organic fertilizer advice",
            "NPK balance guidance",
            "Cost saving tips",
          ],
      color: "from-blue-500 to-cyan-600",
      bgLight: "from-blue-50 to-cyan-50",
    },
    {
      icon: <MdPestControl className="text-4xl" />,
      emoji: "🐛",
      title: language === "hi" ? "कीट नियंत्रण" : "Pest Control",
      description:
        language === "hi"
          ? "फसलों को कीट व रोग से सुरक्षित रखने के उपाय। सही समय पर सही कीटनाशक का चयन।"
          : "Measures to protect crops from pests and diseases. Selection of the right pesticide at the right time.",
      features:
        language === "hi"
          ? [
            "रोग पहचान सहायता",
            "स्प्रे शेड्यूल",
            "जैविक कीट नियंत्रण",
          ]
          : [
            "Disease identification help",
            "Spray schedule",
            "Organic pest control",
          ],
      color: "from-orange-500 to-red-500",
      bgLight: "from-orange-50 to-red-50",
    },
    {
      icon: <MdLocalFlorist className="text-4xl" />,
      emoji: "🌾",
      title: language === "hi" ? "बीज चयन सहायता" : "Seed Selection Help",
      description:
        language === "hi"
          ? "हाइब्रिड और देसी बीजों में से आपकी जमीन और जलवायु के लिए सर्वोत्तम बीज चुनें।"
          : "Choose the best seed for your land and climate from hybrid and indigenous seeds.",
      features:
        language === "hi"
          ? [
            "हाइब्रिड बीज सलाह",
            "अंकुरण दर गारंटी",
            "मौसम अनुसार चयन",
          ]
          : [
            "Hybrid seed advice",
            "Germination rate guarantee",
            "Season-wise selection",
          ],
      color: "from-amber-500 to-yellow-600",
      bgLight: "from-amber-50 to-yellow-50",
    },
    {
      icon: <FiTruck className="text-4xl" />,
      emoji: "🛠️",
      title:
        language === "hi"
          ? "कृषि उपकरण सलाह"
          : "Agricultural Equipment Advice",
      description:
        language === "hi"
          ? "स्प्रे पंप, पाइप, ड्रिप सिस्टम और अन्य उपकरणों का सही चयन और उपयोग।"
          : "Correct selection and use of spray pumps, pipes, drip systems and other equipment.",
      features:
        language === "hi"
          ? [
            "उपकरण चयन सहायता",
            "ड्रिप सिंचाई सलाह",
            "रखरखाव मार्गदर्शन",
          ]
          : [
            "Equipment selection help",
            "Drip irrigation advice",
            "Maintenance guidance",
          ],
      color: "from-purple-500 to-violet-600",
      bgLight: "from-purple-50 to-violet-50",
    },
    {
      icon: <MdSupportAgent className="text-4xl" />,
      emoji: "📞",
      title:
        language === "hi" ? "24/7 किसान सहायता" : "24/7 Farmer Support",
      description:
        language === "hi"
          ? "कॉल या व्हाट्सएप पर तुरंत सहायता। फसल की समस्या हो या उत्पाद जानकारी — हम हमेशा उपलब्ध हैं।"
          : "Instant support on call or WhatsApp. Whether it's a crop problem or product information — we're always available.",
      features:
        language === "hi"
          ? [
            "तुरंत व्हाट्सएप सपोर्ट",
            "निःशुल्क फोन परामर्श",
            "स्टोर पर मिलें",
          ]
          : [
            "Instant WhatsApp support",
            "Free phone consultation",
            "Meet at store",
          ],
      color: "from-teal-500 to-green-600",
      bgLight: "from-teal-50 to-green-50",
    },
  ];

  // Why choose us stats
  const stats = [
    {
      number: "25+",
      label: language === "hi" ? "वर्ष अनुभव" : "Years Experience",
      icon: <FiStar />,
    },
    {
      number: "5000+",
      label: language === "hi" ? "संतुष्ट किसान" : "Happy Farmers",
      icon: <FiCheckCircle />,
    },
    {
      number: "100+",
      label: language === "hi" ? "उत्पाद" : "Products",
      icon: <FiDroplet />,
    },
    {
      number: "24/7",
      label: language === "hi" ? "सहायता" : "Support",
      icon: <FiShield />,
    },
  ];

  return (
    <>
      <Head>
        <title>
          {language === "hi"
            ? "हमारी सेवाएं — लक्ष्मी कृषि केंद्र"
            : "Our Services — Laxmi Krashi Kendra"}
        </title>
        <meta
          name="description"
          content={
            language === "hi"
              ? "लक्ष्मी कृषि केंद्र की सभी सेवाएं — फसल सलाह, उर्वरक मार्गदर्शन, कीट नियंत्रण, बीज चयन और 24/7 किसान सहायता।"
              : "All services of Laxmi Krashi Kendra — Crop advisory, fertilizer guidance, pest control, seed selection and 24/7 farmer support."
          }
        />
        <meta
          name="keywords"
          content={
            language === "hi"
              ? "कृषि सेवा, फसल सलाह, उर्वरक, कीटनाशक, बीज, किसान सहायता"
              : "agricultural service, crop advisory, fertilizer, pesticide, seeds, farmer support"
          }
        />
      </Head>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-green-600 transition-colors"
              >
                {language === "hi" ? "होम" : "Home"}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li
              aria-current="page"
              className="text-green-600 font-semibold"
            >
              {language === "hi" ? "सेवाएं" : "Services"}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold">
                🌾{" "}
                {language === "hi"
                  ? "किसानों के लिए सम्पूर्ण समाधान"
                  : "Complete Solutions for Farmers"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {language === "hi" ? (
                <>
                  हमारी{" "}
                  <span className="text-yellow-300">सेवाएं</span>
                </>
              ) : (
                <>
                  Our{" "}
                  <span className="text-yellow-300">Services</span>
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
              {language === "hi"
                ? "केवल उत्पाद नहीं, संपूर्ण कृषि समाधान — 25+ वर्षों के अनुभव के साथ"
                : "Not just products, complete farming solutions — with 25+ years of experience"}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="text-green-300 flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stat.number}
                  </div>
                  <div className="text-sm text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {language === "hi"
                ? "हम क्या सेवाएं प्रदान करते हैं"
                : "What Services We Provide"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "hi"
                ? "हमारे अनुभवी विशेषज्ञों से निःशुल्क सलाह और मार्गदर्शन"
                : "Free advice and guidance from our experienced experts"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-green-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Card Header */}
                <div
                  className={`bg-gradient-to-br ${service.bgLight} p-6 border-b border-gray-100`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700"
                      >
                        <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card CTA */}
                  <a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group/link"
                  >
                    {language === "hi"
                      ? "अभी सम्पर्क करें"
                      : "Contact Now"}
                    <FiArrowRight className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {language === "hi"
                ? "हम कैसे काम करते हैं"
                : "How We Work"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "hi"
                ? "3 आसान चरणों में अपनी समस्या का समाधान पाएं"
                : "Get your problem solved in 3 easy steps"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title:
                  language === "hi"
                    ? "हमें बताएं"
                    : "Tell Us",
                description:
                  language === "hi"
                    ? "कॉल, व्हाट्सएप या स्टोर पर आकर अपनी समस्या बताएं"
                    : "Tell us your problem via call, WhatsApp or visit our store",
                icon: "📞",
              },
              {
                step: "02",
                title:
                  language === "hi"
                    ? "विशेषज्ञ सलाह"
                    : "Expert Advice",
                description:
                  language === "hi"
                    ? "हमारे अनुभवी विशेषज्ञ आपकी समस्या का विश्लेषण करेंगे"
                    : "Our experienced experts will analyze your problem",
                icon: "👨‍🌾",
              },
              {
                step: "03",
                title:
                  language === "hi"
                    ? "समाधान पाएं"
                    : "Get Solution",
                description:
                  language === "hi"
                    ? "सही उत्पाद और उपयोग विधि के साथ पूरा समाधान"
                    : "Complete solution with the right product and usage method",
                icon: "✅",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
              >
                {/* Step Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-bold px-4 py-1 rounded-full">
                    {language === "hi" ? "चरण" : "Step"}{" "}
                    {item.step}
                  </div>
                </div>

                <div className="text-5xl mb-6 mt-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>

                {/* Connecting line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-green-300 text-3xl transform -translate-y-1/2 z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="text-5xl mb-6">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {language === "hi"
                  ? "अपनी फसल की समस्या का समाधान चाहिए?"
                  : "Need a Solution for Your Crop Problem?"}
              </h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                {language === "hi"
                  ? "हमारे विशेषज्ञ 25+ वर्षों के अनुभव के साथ आपकी हर कृषि समस्या का समाधान देंगे — बिल्कुल निःशुल्क!"
                  : "Our experts will provide solutions for all your agricultural problems with 25+ years of experience — absolutely free!"}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg hover:-translate-y-1"
                >
                  <FiPhone className="mr-3" size={22} />
                  {language === "hi"
                    ? "अभी कॉल करें"
                    : "Call Now"}
                </a>

                <a
                  href={`https://wa.me/91${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-400 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg hover:-translate-y-1"
                >
                  <FiMessageCircle className="mr-3" size={22} />
                  WhatsApp
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 text-lg"
                >
                  <FiArrowRight className="mr-3" size={22} />
                  {language === "hi"
                    ? "पूछताछ फॉर्म भरें"
                    : "Fill Enquiry Form"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
