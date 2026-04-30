import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

export default function Navbar({ cartCount = 0, user = null, lang = 'en', onLangToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/',           label: lang === 'hi' ? 'होम'         : 'Home'        },
    { href: '/products',   label: lang === 'hi' ? 'उत्पाद'      : 'Products'    },
    { href: '/categories', label: lang === 'hi' ? 'श्रेणियाँ'   : 'Categories'  },
    { href: '/about',      label: lang === 'hi' ? 'हमारे बारे में' : 'About'     },
    { href: '/contact',    label: lang === 'hi' ? 'संपर्क'       : 'Contact'     },
  ];

  return (
    <>
      {/* ── Info Bar (dark top strip) ── */}
      <div className={styles.infoBar}>
        <div className={`container ${styles.infoBarInner}`}>
          <span>
            {lang === 'hi'
              ? '🌾 किसानों के लिए बेहतरीन कृषि उत्पाद'
              : '🌾 Premium Agricultural Products for Indian Farmers'}
          </span>
          <div className={styles.infoBarRight}>
            <a href="tel:+911234567890">📞 +91 12345 67890</a>
            <span className={styles.infoDivider}>|</span>
            <a href="mailto:info@laxmikrashikendra.in">
              ✉ info@laxmikrashikendra.in
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navInner}`}>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>LKK</span>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>
                {lang === 'hi' ? 'लक्ष्मी कृषि केंद्र' : 'Laxmi Krashi Kendra'}
              </span>
              <span className={styles.logoSub}>
                {lang === 'hi' ? 'कृषि समाधान केंद्र' : 'Agricultural Solutions'}
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${router.pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
          <div className={styles.navActions}>
            {/* Language Toggle */}
            <button
              className={styles.langToggle}
              onClick={onLangToggle}
              aria-label="Toggle Language"
            >
              {lang === 'hi' ? 'EN' : 'हिं'}
            </button>

            {/* Search */}
            <Link href="/search" className={styles.iconBtn} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <Link href="/account" className={`btn btn-primary ${styles.authBtn}`}>
                {lang === 'hi' ? 'खाता' : 'Account'}
              </Link>
            ) : (
              <Link href="/login" className={`btn btn-outline ${styles.authBtn}`}>
                {lang === 'hi' ? 'लॉग इन' : 'Sign In'}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className={styles.navSpacer} />
    </>
  );
}
