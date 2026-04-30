// client/components/Layout/Footer.js
import React from "react";
import Link from "next/link";
import { FiMapPin, FiPhone, FiClock, FiMail, FiArrowUp, FiSend } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const phoneNumber = "9977938192";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    quick: [
      { label: language === 'hi' ? 'होम' : 'Home', href: '/' },
      { label: language === 'hi' ? 'उत्पाद' : 'Products', href: '/products' },
      { label: language === 'hi' ? 'फसल डॉक्टर' : 'Crop Doctor', href: '/crop-doctor' },
      { label: language === 'hi' ? 'हमारे बारे में' : 'About', href: '/about' },
    ],
    support: [
      { label: language === 'hi' ? 'प्राइवेसी' : 'Privacy Policy', href: '/privacy' },
      { label: language === 'hi' ? 'शर्तें' : 'Terms of Service', href: '/terms' },
      { label: language === 'hi' ? 'संपर्क' : 'Contact Us', href: '/contact' },
    ]
  };

  return (
    <footer className="relative bg-slate-base pt-24 pb-12 overflow-hidden">
      {/* Scroll to top decorative */}
      <button 
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-card rounded-full flex items-center justify-center text-accent-emerald hover:text-white hover:scale-110 transition-all shadow-2xl z-10"
      >
        <FiArrowUp size={24} />
      </button>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent-emerald rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-500/20">L</div>
              <span className="text-2xl font-outfit font-bold text-white tracking-tight">Laxmi Krashi <span className="text-accent-emerald">Kendra</span></span>
            </div>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
              {language === 'hi' 
                ? 'सिराथा का सबसे भरोसेमंद कृषि केंद्र। हम 25+ वर्षों से किसानों को सही समाधान और उत्पाद प्रदान कर रहे हैं।' 
                : 'Siratha\'s most trusted agricultural hub. Providing farmers with right solutions and products for over 25+ years.'}
            </p>
            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaYoutube, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-slate-card rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-emerald hover:bg-slate-hover transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">{language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h4>
            <div className="flex flex-col gap-4">
              {footerLinks.quick.map((link, i) => (
                <Link key={i} href={link.href} className="text-slate-500 hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">{language === 'hi' ? 'संपर्क करें' : 'Contact us'}</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-accent-emerald"><FiMapPin size={20} /></div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {language === 'hi' ? 'बस स्टैंड चौक, सिराथा, मध्य प्रदेश - 480334' : 'Bus Stand Chowk, Siratha, Madhya Pradesh - 480334'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-accent-emerald"><FiPhone size={20} /></div>
                <p className="text-slate-400 font-bold">{phoneNumber}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-accent-emerald"><FiClock size={20} /></div>
                <p className="text-slate-400 text-sm">{language === 'hi' ? '9:00 AM - 8:00 PM (सोम-शनि)' : '9:00 AM - 8:00 PM (Mon-Sat)'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-24 pt-12 border-t border-slate-hover flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">
            © {currentYear} Laxmi Krashi Kendra. {language === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
          </p>
          <div className="flex gap-8">
            {footerLinks.support.map((link, i) => (
              <Link key={i} href={link.href} className="text-slate-600 hover:text-slate-300 text-xs uppercase tracking-widest">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const CleanFooter = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const phoneNumber = '9977938192';
  const quickLinks = [
    { label: t('nav_home'), href: '/' },
    { label: t('nav_products'), href: '/products' },
    { label: t('nav_crop_doctor'), href: '/crop-doctor' },
    { label: t('nav_about'), href: '/about' }
  ];
  const supportLinks = [
    { label: t('privacy'), href: '/privacy' },
    { label: t('terms'), href: '/terms' },
    { label: t('nav_contact'), href: '/contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-base pb-12 pt-24">
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-card text-accent-emerald shadow-2xl transition-all hover:scale-110 hover:text-white"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={24} />
      </button>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-emerald text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
                L
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-outfit">
                Laxmi Krashi <span className="text-accent-emerald">Kendra</span>
              </span>
            </div>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-slate-400">
              {language === 'hi'
                ? 'सिराथा का भरोसेमंद कृषि केंद्र। हम 25+ वर्षों से किसानों को सही उत्पाद, तेज सलाह और भरोसेमंद मार्गदर्शन दे रहे हैं।'
                : 'Siratha’s trusted agriculture center, helping farmers with dependable products, quick advice, and grounded local support for 25+ years.'}
            </p>

            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaYoutube, FaWhatsapp].map((Icon, index) => (
                <a
                  key={index}
                  href={index === 3 ? `https://wa.me/91${phoneNumber}` : '#'}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-card text-slate-400 transition-all hover:bg-slate-hover hover:text-accent-emerald"
                  aria-label="Social link"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-8 text-lg font-bold text-white">{t('quick_links')}</h4>
            <div className="flex flex-col gap-4">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-slate-500 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-8 text-lg font-bold text-white">{t('contact_us')}</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-accent-emerald">
                  <FiMapPin size={20} />
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  {language === 'hi'
                    ? 'बस स्टैंड चौक, सिराथा, मध्य प्रदेश - 480334'
                    : 'Bus Stand Chowk, Siratha, Madhya Pradesh - 480334'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-accent-emerald">
                  <FiPhone size={20} />
                </div>
                <p className="font-bold text-slate-400">{phoneNumber}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-accent-emerald">
                  <FiClock size={20} />
                </div>
                <p className="text-sm text-slate-400">
                  {language === 'hi' ? '9:00 AM - 8:00 PM (सोम-शनि)' : '9:00 AM - 8:00 PM (Mon-Sat)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-slate-hover pt-12 md:flex-row">
          <p className="text-sm text-slate-500">
            © {currentYear} Laxmi Krashi Kendra. {language === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
          </p>
          <div className="flex gap-8">
            {supportLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-xs uppercase tracking-widest text-slate-600 hover:text-slate-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;
