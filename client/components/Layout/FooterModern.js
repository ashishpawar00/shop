import React from 'react';
import Link from 'next/link';
import { FiArrowUp, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: '#' },
  { icon: FaInstagram, href: '#' },
  { icon: FaYoutube, href: '#' }
];

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
          gallery: 'गैलरी',
          cropDoctor: 'क्रॉप डॉक्टर',
          about: 'हमारे बारे में',
          contact: 'संपर्क करें',
          quickLinks: 'त्वरित लिंक',
          support: 'सहायता',
          rights: 'सभी अधिकार सुरक्षित।',
          description: 'स्थानीय खेती की समझ, भरोसेमंद उत्पाद, और तेज सलाह के साथ लक्ष्मी कृषि केंद्र किसानों का काम आसान बनाता है।',
          address: 'बस स्टैंड चौक, सिराथा, मध्य प्रदेश - 480334',
          hours: 'सुबह 9:00 बजे - रात 8:00 बजे (सोम-शनि)'
        }
      : {
          home: 'Home',
          products: 'Products',
          services: 'Services',
          advisory: 'Advisory',
          gallery: 'Gallery',
          cropDoctor: 'Crop Doctor',
          about: 'About',
          contact: 'Contact us',
          quickLinks: 'Quick Links',
          support: 'Support',
          rights: 'All rights reserved.',
          description: 'Grounded farm advice, trusted product access, and quick local support from one dependable agriculture desk.',
          address: 'Bus Stand Chowk, Siratha, Madhya Pradesh - 480334',
          hours: '9:00 AM - 8:00 PM (Mon-Sat)'
        };

  const quickLinks = [
    { label: labels.home, href: '/' },
    { label: labels.products, href: '/products' },
    { label: labels.services, href: '/services' },
    { label: labels.cropDoctor, href: '/crop-doctor' },
    { label: labels.advisory, href: '/advisory' },
    { label: labels.gallery, href: '/gallery' },
    { label: labels.about, href: '/about' }
  ];

  const supportLinks = [{ label: labels.contact, href: '/contact' }];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-base pb-12 pt-24">
      <button
        type="button"
        onClick={scrollToTop}
        className={`absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-accent-emerald shadow-2xl transition-all hover:scale-110 hover:text-white ${
          isLight
            ? 'border-line-soft/10 bg-white shadow-slate-900/10 hover:bg-accent-emerald'
            : 'border-line-soft/10 bg-slate-card hover:bg-accent-emerald'
        }`}
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
              <span className="font-outfit text-2xl font-bold tracking-tight text-ink-primary">
                Laxmi Krashi <span className="text-accent-emerald">Kendra</span>
              </span>
            </div>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-ink-muted">{labels.description}</p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, index) => (
                <a
                  key={`${href}-${index}`}
                  href={href}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border text-ink-muted transition-all hover:border-accent-emerald/45 hover:text-accent-emerald ${
                    isLight ? 'border-line-soft/10 bg-white' : 'border-line-soft/10 bg-slate-card'
                  }`}
                  aria-label="Social link"
                >
                  <Icon size={20} />
                </a>
              ))}
              <a
                href={`https://wa.me/91${phoneNumber}`}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border text-ink-muted transition-all hover:border-accent-emerald/45 hover:text-accent-emerald ${
                  isLight ? 'border-line-soft/10 bg-white' : 'border-line-soft/10 bg-slate-card'
                }`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-8 font-outfit text-lg font-bold text-ink-primary">{labels.quickLinks}</h4>
            <div className="flex flex-col gap-4">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-ink-muted transition-colors hover:text-accent-emerald">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-8 font-outfit text-lg font-bold text-ink-primary">{labels.support}</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-accent-emerald">
                  <FiMapPin size={20} />
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">{labels.address}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-accent-emerald">
                  <FiPhone size={20} />
                </div>
                <p className="font-bold text-ink-primary">{phoneNumber}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-accent-emerald">
                  <FiClock size={20} />
                </div>
                <p className="text-sm text-ink-muted">{labels.hours}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {supportLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                      isLight
                        ? 'border-line-soft/10 bg-white text-ink-secondary hover:border-accent-emerald/45 hover:text-accent-emerald'
                        : 'border-line-soft/10 bg-slate-card text-ink-secondary hover:border-accent-emerald/45 hover:text-accent-emerald'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-line-soft/10 pt-12 md:flex-row">
          <p className="text-sm text-ink-muted">
            © {currentYear} Laxmi Krashi Kendra. {labels.rights}
          </p>
          <div className="flex gap-8">
            <Link href="/advisory" className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent-emerald">
              {labels.advisory}
            </Link>
            <Link href="/gallery" className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent-emerald">
              {labels.gallery}
            </Link>
            <Link href="/contact" className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent-emerald">
              {labels.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
