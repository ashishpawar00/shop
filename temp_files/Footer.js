import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({ lang = 'en' }) {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { href: '/products/seeds',        label: lang === 'hi' ? 'बीज'               : 'Seeds'           },
    { href: '/products/fertilizers',  label: lang === 'hi' ? 'खाद एवं उर्वरक'  : 'Fertilizers'     },
    { href: '/products/pesticides',   label: lang === 'hi' ? 'कीटनाशक'          : 'Pesticides'       },
    { href: '/products/equipment',    label: lang === 'hi' ? 'कृषि उपकरण'        : 'Farm Equipment'  },
    { href: '/products/irrigation',   label: lang === 'hi' ? 'सिंचाई उत्पाद'     : 'Irrigation'      },
    { href: '/products/organic',      label: lang === 'hi' ? 'जैविक उत्पाद'      : 'Organic Products'},
  ];

  const companyLinks = [
    { href: '/about',   label: lang === 'hi' ? 'हमारे बारे में' : 'About Us'      },
    { href: '/contact', label: lang === 'hi' ? 'संपर्क'          : 'Contact'       },
    { href: '/blog',    label: lang === 'hi' ? 'ब्लॉग'           : 'Farm Blog'     },
    { href: '/careers', label: lang === 'hi' ? 'करियर'           : 'Careers'       },
    { href: '/press',   label: lang === 'hi' ? 'प्रेस'           : 'Press'         },
  ];

  const supportLinks = [
    { href: '/faq',       label: lang === 'hi' ? 'प्रश्नोत्तर'        : 'FAQ'              },
    { href: '/shipping',  label: lang === 'hi' ? 'शिपिंग नीति'        : 'Shipping Policy'  },
    { href: '/returns',   label: lang === 'hi' ? 'वापसी नीति'         : 'Return Policy'    },
    { href: '/privacy',   label: lang === 'hi' ? 'गोपनीयता नीति'      : 'Privacy Policy'   },
    { href: '/terms',     label: lang === 'hi' ? 'नियम और शर्तें'     : 'Terms of Service' },
  ];

  return (
    <footer className={styles.footer}>

      {/* ── Pre-Footer CTA Band ── */}
      <div className={styles.ctaBand}>
        <div className={`container ${styles.ctaBandInner}`}>
          <div className={styles.ctaText}>
            <div className="overline overline--light">
              <span>{lang === 'hi' ? 'आज ही शुरू करें' : 'Start Today'}</span>
            </div>
            <h2 className={styles.ctaHeading}>
              {lang === 'hi'
                ? 'आपके खेत के लिए सही उत्पाद'
                : 'Right Products for Your Farm'}
            </h2>
            <p>
              {lang === 'hi'
                ? 'हमारे विशेषज्ञों से मुफ़्त परामर्श लें और अपनी फसल का उत्पादन बढ़ाएं।'
                : 'Get free expert consultation and maximise your crop yield this season.'}
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/products" className="btn btn-olive-outline">
              {lang === 'hi' ? 'उत्पाद देखें' : 'Browse Products'}
            </Link>
            <Link href="/contact" className="btn btn-outline-light">
              {lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className={styles.footerMain}>
        <div className={`container ${styles.footerGrid}`}>

          {/* Brand column */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.footerLogoMark}>LKK</span>
              <span className={styles.footerLogoText}>
                {lang === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krashi Kendra'}
              </span>
            </div>
            <p className={styles.footerTagline}>
              {lang === 'hi'
                ? '१९९८ से किसानों की सेवा में। गुणवत्ता, विश्वास और समर्पण — हमारे तीन मूल्य।'
                : 'Serving Indian farmers since 1998 with quality, trust, and dedication.'}
            </p>

            {/* Certifications */}
            <div className={styles.certs}>
              {['ISO 9001', 'APEDA', 'Govt. Reg.'].map(c => (
                <span key={c} className={styles.certBadge}>{c}</span>
              ))}
            </div>

            {/* Social links */}
            <div className={styles.socialLinks}>
              {[
                { label: 'Facebook',  href: '#', icon: 'f' },
                { label: 'Instagram', href: '#', icon: 'ig'},
                { label: 'YouTube',   href: '#', icon: 'yt'},
                { label: 'WhatsApp',  href: '#', icon: 'wa'},
              ].map(s => (
                <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products column */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              {lang === 'hi' ? 'उत्पाद' : 'Products'}
            </h4>
            <ul className={styles.footerLinks}>
              {productLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              {lang === 'hi' ? 'कंपनी' : 'Company'}
            </h4>
            <ul className={styles.footerLinks}>
              {companyLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              {lang === 'hi' ? 'सहायता' : 'Support'}
            </h4>
            <ul className={styles.footerLinks}>
              {supportLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
            {/* Contact info */}
            <div className={styles.contactInfo}>
              <p>📞 +91 12345 67890</p>
              <p>✉ info@laxmikrashikendra.in</p>
              <p>⏰ {lang === 'hi' ? 'सोम–शनि, 9:00–18:00' : 'Mon–Sat, 9am–6pm'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bottom Bar ── */}
      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <span className={styles.copyright}>
            © {currentYear} Laxmi Krashi Kendra.{' '}
            {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </span>
          <span className={styles.footerBottomRight}>
            {lang === 'hi'
              ? 'भारत में 🌾 के साथ बनाया गया'
              : 'Made with 🌾 in India'}
          </span>
        </div>
      </div>
    </footer>
  );
}
