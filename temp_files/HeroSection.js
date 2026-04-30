import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection({ lang = 'en' }) {
  const heroRef = useRef(null);

  // Parallax subtle effect on scroll
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = el.querySelector(`.${styles.heroBg}`);
      if (bg) bg.style.transform = `translateY(${scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`${styles.hero} blueprint-grid`} ref={heroRef}>

      {/* Background image layer */}
      <div className={styles.heroBg} />
      {/* Warm overlay */}
      <div className={styles.heroOverlay} />

      <div className={`container ${styles.heroContent}`}>

        {/* Left: Text content */}
        <div className={styles.heroLeft}>

          {/* Overline */}
          <div className={`overline reveal ${styles.heroOverline}`}>
            <span>
              {lang === 'hi' ? 'भारत का भरोसेमंद कृषि केंद्र' : 'India\'s Trusted Agri Centre'}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`${styles.heroHeadline} reveal reveal-delay-1`}>
            {lang === 'hi' ? (
              <>
                <span className={styles.heroHeadlineLight}>खेती को बनाएं</span>
                <br />
                <span className={styles.heroHeadlineStrong}>समृद्ध</span>
                <br />
                <span className={styles.heroHeadlineAccent}>और आसान</span>
              </>
            ) : (
              <>
                <span className={styles.heroHeadlineLight}>Grow Your</span>
                <br />
                <span className={styles.heroHeadlineStrong}>Farm's</span>
                <br />
                <span className={styles.heroHeadlineAccent}>Potential</span>
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <p className={`${styles.heroSubtext} reveal reveal-delay-2`}>
            {lang === 'hi'
              ? 'उन्नत बीज, खाद, कीटनाशक और कृषि उपकरण — सब कुछ एक जगह। किसानों की ज़रूरतें, हमारी प्राथमिकता।'
              : 'Premium seeds, fertilizers, pesticides & farm equipment — all in one place. Trusted by farmers across India since 1998.'}
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.heroCtas} reveal reveal-delay-3`}>
            <Link href="/products" className="btn btn-primary">
              {lang === 'hi' ? 'उत्पाद देखें' : 'Shop Products'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/about" className="btn btn-outline">
              {lang === 'hi' ? 'हमारे बारे में' : 'Our Story'}
            </Link>
          </div>

          {/* Stat pills */}
          <div className={`${styles.heroStats} reveal reveal-delay-4`}>
            {[
              { num: '25+',  label: lang === 'hi' ? 'वर्षों का अनुभव' : 'Years Experience' },
              { num: '5000+', label: lang === 'hi' ? 'किसान ग्राहक'    : 'Farmer Customers' },
              { num: '800+', label: lang === 'hi' ? 'उत्पाद'           : 'Products'         },
            ].map((stat, i) => (
              <div className={styles.heroStat} key={i}>
                <span className={styles.heroStatNum}>{stat.num}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual card */}
        <div className={`${styles.heroRight} reveal reveal-delay-2`}>
          <div className={styles.heroImageCard}>
            <div className={styles.heroImageInner}>
              {/* Placeholder image — replace with actual crop image */}
              <img
                src="/images/hero-farm.jpg"
                alt={lang === 'hi' ? 'कृषि क्षेत्र' : 'Farm field'}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className={styles.heroImageFallback}>
                <span className={styles.fallbackIcon}>🌾</span>
              </div>
            </div>
            {/* Floating badge */}
            <div className={styles.floatingBadge}>
              <span className={styles.floatingBadgeTop}>
                {lang === 'hi' ? 'ताज़ा स्टॉक' : 'Fresh Stock'}
              </span>
              <span className={styles.floatingBadgeBottom}>
                {lang === 'hi' ? 'रबी सीजन 2025' : 'Rabi Season 2025'}
              </span>
            </div>
          </div>

          {/* Corner label */}
          <div className={styles.cornerLabel}>
            <span>EST.</span>
            <span className={styles.cornerYear}>1998</span>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine}></span>
        <span className={styles.scrollText}>
          {lang === 'hi' ? 'नीचे स्क्रॉल करें' : 'Scroll'}
        </span>
      </div>
    </section>
  );
}
