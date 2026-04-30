// client/contexts/LanguageContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Create context
const LanguageContext = createContext();

// Translations
const translations = {
  hi: {
    'nav_home': 'होम',
    'nav_about': 'हमारे बारे में',
    'nav_products': 'उत्पाद',
    'nav_services': 'सेवाएं',
    'nav_advisory': 'फसल सलाह',
    'nav_gallery': 'गैलरी',
    'nav_contact': 'संपर्क करें',
    'hero_title': '25+ वर्षों का विश्वास',
    'hero_subtitle': 'लक्ष्मी कृषि केंद्र - आपका विश्वसनीय कृषि इनपुट स्टोर',
    'hero_cta_call': 'अभी कॉल करें',
    'hero_cta_whatsapp': 'व्हाट्सएप जानकारी',
    'hero_cta_visit': 'स्टोर पर आएं',
    'why_choose_us': 'हमें क्यों चुनें?',
    'years_experience': '25+ वर्षों का अनुभव',
    'view_all': 'सभी देखें',
    'products': 'उत्पाद',
    'seeds': 'बीज',
    'fertilizers': 'उर्वरक',
    'pesticides': 'कीटनाशक',
    'hardware': 'कृषि उपकरण',
    'contact_us': 'हमसे संपर्क करें',
    'search_products': 'उत्पाद खोजें...'
  },
  en: {
    'nav_home': 'Home',
    'nav_about': 'About Us',
    'nav_products': 'Products',
    'nav_services': 'Services',
    'nav_advisory': 'Crop Advisory',
    'nav_gallery': 'Gallery',
    'nav_contact': 'Contact',
    'hero_title': '25+ Years of Trust',
    'hero_subtitle': 'Laxmi Krashi Kendra - Your Trusted Agricultural Input Store',
    'hero_cta_call': 'Call Now',
    'hero_cta_whatsapp': 'WhatsApp Enquiry',
    'hero_cta_visit': 'Visit Store',
    'why_choose_us': 'Why Choose Us?',
    'years_experience': '25+ Years Experience',
    'view_all': 'View All',
    'products': 'Products',
    'seeds': 'Seeds',
    'fertilizers': 'Fertilizers',
    'pesticides': 'Pesticides',
    'hardware': 'Agricultural Hardware',
    'contact_us': 'Contact Us',
    'search_products': 'Search products...'
  }
};

const normalizedTranslations = {
  hi: {
    nav_home: 'होम',
    nav_about: 'हमारे बारे में',
    nav_products: 'उत्पाद',
    nav_services: 'सेवाएं',
    nav_advisory: 'फसल सलाह',
    nav_gallery: 'गैलरी',
    nav_contact: 'संपर्क करें',
    nav_crop_doctor: 'क्रॉप डॉक्टर',
    login: 'लॉगिन',
    create_account: 'खाता बनाएं',
    hero_title: '25+ वर्षों का विश्वास',
    hero_subtitle: 'लक्ष्मी कृषि केंद्र - आपका भरोसेमंद कृषि इनपुट स्टोर',
    hero_cta_call: 'अभी कॉल करें',
    hero_cta_whatsapp: 'व्हाट्सऐप जानकारी',
    hero_cta_visit: 'स्टोर पर आएं',
    why_choose_us: 'हमें क्यों चुनें?',
    years_experience: '25+ वर्षों का अनुभव',
    view_all: 'सभी देखें',
    products: 'उत्पाद',
    seeds: 'बीज',
    fertilizers: 'उर्वरक',
    pesticides: 'कीटनाशक',
    hardware: 'कृषि उपकरण',
    contact_us: 'हमसे संपर्क करें',
    search_products: 'उत्पाद खोजें...',
    quick_links: 'त्वरित लिंक',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    trusted_store: 'सिराथा का भरोसेमंद कृषि केंद्र'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_products: 'Products',
    nav_services: 'Services',
    nav_advisory: 'Crop Advisory',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    nav_crop_doctor: 'Crop Doctor',
    login: 'Login',
    create_account: 'Create Account',
    hero_title: '25+ Years of Trust',
    hero_subtitle: 'Laxmi Krashi Kendra - Your trusted agricultural input store',
    hero_cta_call: 'Call Now',
    hero_cta_whatsapp: 'WhatsApp Enquiry',
    hero_cta_visit: 'Visit Store',
    why_choose_us: 'Why Choose Us?',
    years_experience: '25+ Years Experience',
    view_all: 'View All',
    products: 'Products',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    hardware: 'Agricultural Hardware',
    contact_us: 'Contact Us',
    search_products: 'Search products...',
    quick_links: 'Quick Links',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    trusted_store: 'Siratha’s trusted agriculture center'
  }
};

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedLanguage = window.localStorage.getItem('language');
    if (storedLanguage === 'hi' || storedLanguage === 'en') {
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = lang => {
    if (lang !== 'hi' && lang !== 'en') return;

    setLanguage(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', lang);
    }
  };

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      t: key => normalizedTranslations[language]?.[key] || normalizedTranslations.en[key] || key
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
