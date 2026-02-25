import React from "react";
import Link from "next/link";
import { FiMapPin, FiPhone, FiClock, FiMessageCircle, FiMail, FiArrowUp } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const phoneNumber = "9977938192";

  // Back to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer data for better organization
  const footerData = {
    about: {
      title: language === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krashi Kendra',
      description: language === 'hi' 
        ? '25+ वर्षों से किसानों की सेवा में। गुणवत्तापूर्ण कृषि उत्पाद और विश्वसनीय सलाह।'
        : 'Serving farmers for 25+ years. Quality agricultural products and reliable advice.'
    },
    contact: [
      { 
        icon: FiMapPin, 
        text: language === 'hi' 
          ? 'बस स्टैंड चौक, सिराथा, पिन कोड – 480334'
          : 'Bus Stand Chowk, Siratha, Pin Code – 480334',
        href: 'https://maps.google.com/?q=Bus+Stand+Chowk+Siratha+480334',
        isLink: true,
        ariaLabel: language === 'hi' ? 'मैप पर देखें' : 'View on map'
      },
      { 
        icon: FiPhone, 
        text: phoneNumber,
        href: `tel:${phoneNumber}`,
        isLink: true,
        ariaLabel: language === 'hi' ? 'फोन करें' : 'Call us'
      },
      { 
        icon: FiMessageCircle, 
        text: language === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Contact on WhatsApp',
        href: `https://wa.me/91${phoneNumber}`,
        isLink: true,
        target: '_blank',
        ariaLabel: 'WhatsApp'
      },
      { 
        icon: FiClock, 
        text: language === 'hi' 
          ? 'सोम–शनिवार: सुबह 9:00 – शाम 8:00'
          : 'Mon–Sat: 9:00 AM – 8:00 PM'
      }
    ],
    quickLinks: [
      { label: language === 'hi' ? 'हमारे बारे में' : 'About Us', href: '/about' },
      { label: language === 'hi' ? 'सेवाएं' : 'Services', href: '/services' },
      { label: language === 'hi' ? 'फसल सलाह' : 'Crop Advisory', href: '/advisory' },
      { label: language === 'hi' ? 'गैलरी' : 'Gallery', href: '/gallery' },
      { label: language === 'hi' ? 'संपर्क करें' : 'Contact Us', href: '/contact' }
    ],
    products: [
      { label: language === 'hi' ? 'बीज' : 'Seeds', href: '/products?category=seeds' },
      { label: language === 'hi' ? 'उर्वरक' : 'Fertilizers', href: '/products?category=fertilizers' },
      { label: language === 'hi' ? 'कीटनाशक' : 'Pesticides', href: '/products?category=pesticides' },
      { label: language === 'hi' ? 'कृषि उपकरण' : 'Agricultural Tools', href: '/products?category=hardware' }
    ],
    socialLinks: [
      { icon: FaFacebook, href: '#', label: 'Facebook' },
      { icon: FaInstagram, href: '#', label: 'Instagram' },
      { icon: FaYoutube, href: '#', label: 'YouTube' }
    ]
  };

  // Contact Info Item Component
  const ContactItem = ({ item }) => {
    const content = (
      <div className={`flex items-start gap-3 ${item.isLink ? 'group cursor-pointer' : ''}`}>
        <div className={`mt-1 ${item.isLink ? 'text-green-400 group-hover:text-green-300 transition-colors' : 'text-gray-400'}`}>
          <item.icon />
        </div>
        <span className={`${item.isLink ? 'group-hover:text-white transition-colors' : ''}`}>
          {item.text}
        </span>
      </div>
    );

    if (item.isLink) {
      return (
        <a 
          href={item.href}
          target={item.target || '_self'}
          rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="block"
          aria-label={item.ariaLabel}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  // Footer Column Component
  const FooterColumn = ({ title, items, isLinks = true }) => (
    <div>
      <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-green-700 inline-block">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            {isLinks ? (
              <Link 
                href={item.href}
                className="text-gray-300 hover:text-green-300 hover:pl-2 transition-all duration-200 flex items-center group"
                aria-label={item.label}
              >
                <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity">→</span>
                {item.label}
              </Link>
            ) : (
              <ContactItem item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all duration-300 z-40 animate-bounce-slow"
        aria-label={language === 'hi' ? 'ऊपर जाएं' : 'Back to top'}
      >
        <FiArrowUp size={20} />
      </button>

      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">LK</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{footerData.about.title}</h3>
                  <p className="text-sm text-green-300">25+ {language === 'hi' ? 'वर्षों का विश्वास' : 'Years of Trust'}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {footerData.about.description}
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">{language === 'hi' ? 'प्रमाणित उत्पाद' : 'Certified Products'}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">{language === 'hi' ? 'विशेषज्ञ सलाह' : 'Expert Advice'}</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-semibold text-gray-400 mb-3">
                  {language === 'hi' ? 'हमें फॉलो करें' : 'Follow Us'}
                </h5>
                <div className="flex gap-3">
                  {footerData.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <FooterColumn 
              title={language === 'hi' ? 'संपर्क करें' : 'Contact Us'} 
              items={footerData.contact}
              isLinks={false}
            />

            {/* Quick Links */}
            <FooterColumn 
              title={language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'} 
              items={footerData.quickLinks}
            />

            {/* Products */}
            <FooterColumn 
              title={language === 'hi' ? 'उत्पाद' : 'Products'} 
              items={footerData.products}
            />
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-400">
                  © {currentYear} {footerData.about.title}. {language === 'hi' 
                    ? 'सर्वाधिकार सुरक्षित।' 
                    : 'All rights reserved.'}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {language === 'hi' 
                    ? 'कृषि इनपुट्स में 25+ वर्षों का विश्वास'
                    : '25+ Years of Trust in Agricultural Inputs'}
                </p>
              </div>
              
              <div className="flex gap-6">
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-green-300 text-sm transition-colors"
                  aria-label={language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                >
                  {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-green-300 text-sm transition-colors"
                  aria-label={language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
                >
                  {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
                </Link>
                <Link 
                  href="/sitemap" 
                  className="text-gray-400 hover:text-green-300 text-sm transition-colors"
                  aria-label="Sitemap"
                >
                  {language === 'hi' ? 'साइटमैप' : 'Sitemap'}
                </Link>
              </div>
            </div>

            {/* Trust Seals */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl mb-1">🔒</div>
                <p className="text-xs text-gray-400">{language === 'hi' ? 'सुरक्षित' : 'Secure'}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <p className="text-xs text-gray-400">{language === 'hi' ? 'रेटेड 4.8/5' : 'Rated 4.8/5'}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🚚</div>
                <p className="text-xs text-gray-400">{language === 'hi' ? 'मुफ्त डिलीवरी' : 'Free Delivery'}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Footer;