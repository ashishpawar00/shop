import React from 'react';
import Link from 'next/link';
import { FiArrowUp, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function FooterModern() {
  const { language } = useLanguage();
  const { isLight } = useTheme();
  const currentYear = new Date().getFullYear();
  const phoneNumber = '9977938192';

  const labels =
    language === 'hi'
      ? {
          home: 'होम',
          products: 'उत्पाद',
          services: 'सेवाएं',
          advisory: 'सलाह',
          cropDoctor: 'क्रॉप डॉक्टर',
          about: 'हमारे बारे में',
          contact: 'संपर्क करें',
          quickLinks: 'त्वरित लिंक',
          support: 'सहायता',
          rights: 'सभी अधिकार सुरक्षित।',
          description: 'भरोसेमंद उत्पाद और तेज सलाह के साथ किसानों का साथी।',
          address: 'बस स्टैंड चौक, सिराथा, म.प्र. - 480334',
          hours: 'सुबह 9 - रात 8 (सोम-शनि)'
        }
      : {
          home: 'Home',
          products: 'Products',
          services: 'Services',
          advisory: 'Advisory',
          cropDoctor: 'Crop Doctor',
          about: 'About',
          contact: 'Contact us',
          quickLinks: 'Quick Links',
          support: 'Support',
          rights: 'All rights reserved.',
          description: 'Trusted farm advice, product access, and quick local support.',
          address: 'Bus Stand Chowk, Siratha, MP - 480334',
          hours: '9 AM - 8 PM (Mon-Sat)'
        };

  const quickLinks = [
    { label: labels.home, href: '/' },
    { label: labels.products, href: '/products' },
    { label: labels.services, href: '/services' },
    { label: labels.cropDoctor, href: '/crop-doctor' },
    { label: labels.advisory, href: '/advisory' },
    { label: labels.about, href: '/about' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-base pb-6 pt-10 md:pb-12 md:pt-24">
      <button
        type="button"
        onClick={scrollToTop}
        className={`absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-accent-emerald shadow-2xl transition-all hover:scale-110 hover:text-white md:h-16 md:w-16 ${
          isLight
            ? 'border-line-soft/10 bg-white shadow-slate-900/10 hover:bg-accent-emerald'
            : 'border-line-soft/10 bg-slate-card hover:bg-accent-emerald'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2.5 md:mb-8 md:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-emerald text-lg font-bold text-white shadow-lg shadow-emerald-500/20 md:h-12 md:w-12 md:rounded-xl md:text-2xl">
                L
              </div>
              <span className="font-outfit text-lg font-bold tracking-tight text-ink-primary md:text-2xl">
                Laxmi Krashi <span className="text-accent-emerald">Kendra</span>
              </span>
            </div>

            <p className="mb-3 max-w-md text-sm leading-relaxed text-ink-muted md:mb-8 md:text-lg">{labels.description}</p>

            <a
              href={`https://wa.me/91${phoneNumber}`}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-ink-muted transition-all hover:border-accent-emerald/45 hover:text-accent-emerald md:h-12 md:w-12 ${
                isLight ? 'border-line-soft/10 bg-white' : 'border-line-soft/10 bg-slate-card'
              }`}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>

          {/* Quick Links — 2-col grid on mobile */}
          <div>
            <h4 className="mb-2.5 font-outfit text-sm font-bold text-ink-primary md:mb-8 md:text-lg">{labels.quickLinks}</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1 md:gap-y-4">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-ink-muted transition-colors hover:text-accent-emerald">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-2.5 font-outfit text-sm font-bold text-ink-primary md:mb-8 md:text-lg">{labels.support}</h4>
            <div className="space-y-2.5 md:space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-accent-emerald">
                  <FiMapPin size={16} />
                </div>
                <p className="text-xs leading-relaxed text-ink-muted md:text-sm">{labels.address}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-accent-emerald">
                  <FiPhone size={16} />
                </div>
                <p className="text-sm font-bold text-ink-primary">{phoneNumber}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-accent-emerald">
                  <FiClock size={16} />
                </div>
                <p className="text-xs text-ink-muted md:text-sm">{labels.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line-soft/10 pt-4 md:mt-24 md:flex-row md:gap-8 md:pt-12">
          <p className="text-xs text-ink-muted md:text-sm">
            © {currentYear} Laxmi Krashi Kendra. {labels.rights}
          </p>
          <div className="flex gap-6 md:gap-8">
            <Link href="/contact" className="text-[10px] uppercase tracking-widest text-ink-muted hover:text-accent-emerald md:text-xs">
              {labels.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
