import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeroSection from '../components/Home/HeroSection';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import styles from './index.module.css';

// ─── Scroll Reveal Hook ──────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Sample data (replace with API calls) ────────────────
const FEATURED_PRODUCTS = [
  { id: 1, name: 'Hybrid Wheat Seeds',    nameHi: 'हाइब्रिड गेहूँ बीज',  category: 'Seeds',       categoryHi: 'बीज',        price: '₹450',  img: '/images/products/wheat.jpg'  },
  { id: 2, name: 'NPK Fertilizer 20-20-20', nameHi: 'NPK उर्वरक 20-20-20', category: 'Fertilizers', categoryHi: 'उर्वरक',     price: '₹850',  img: '/images/products/npk.jpg'    },
  { id: 3, name: 'Bio Pesticide Spray',   nameHi: 'जैव कीटनाशक स्प्रे',  category: 'Pesticides',  categoryHi: 'कीटनाशक',   price: '₹320',  img: '/images/products/pest.jpg'   },
  { id: 4, name: 'Drip Irrigation Kit',   nameHi: 'ड्रिप सिंचाई किट',    category: 'Irrigation',  categoryHi: 'सिंचाई',     price: '₹2,400', img: '/images/products/drip.jpg'  },
];

const CATEGORIES = [
  { id: 1, name: 'Seeds',         nameHi: 'बीज',           icon: '🌱', href: '/products/seeds',       count: 120 },
  { id: 2, name: 'Fertilizers',   nameHi: 'उर्वरक',        icon: '🧪', href: '/products/fertilizers', count: 85  },
  { id: 3, name: 'Pesticides',    nameHi: 'कीटनाशक',       icon: '🛡', href: '/products/pesticides',  count: 64  },
  { id: 4, name: 'Equipment',     nameHi: 'कृषि उपकरण',    icon: '🚜', href: '/products/equipment',   count: 43  },
  { id: 5, name: 'Irrigation',    nameHi: 'सिंचाई',         icon: '💧', href: '/products/irrigation',  count: 38  },
  { id: 6, name: 'Organic',       nameHi: 'जैविक उत्पाद',  icon: '🌿', href: '/products/organic',     count: 56  },
];

const WHY_US = [
  {
    num: '01', icon: '✅',
    title: 'Certified Quality',       titleHi: 'प्रमाणित गुणवत्ता',
    body:  'All products meet ICAR and government quality standards.',
    bodyHi:'सभी उत्पाद ICAR और सरकारी गुणवत्ता मानकों को पूरा करते हैं।'
  },
  {
    num: '02', icon: '🚚',
    title: 'Fast Rural Delivery',     titleHi: 'तेज़ ग्रामीण डिलीवरी',
    body:  'Doorstep delivery across 500+ districts in India.',
    bodyHi:'भारत के 500+ जिलों में घर-पहुँच डिलीवरी।'
  },
  {
    num: '03', icon: '💬',
    title: 'Expert Agri Advice',      titleHi: 'विशेषज्ञ कृषि सलाह',
    body:  'Free crop consultancy from our on-call agronomists.',
    bodyHi:'हमारे कृषि विशेषज्ञों से मुफ़्त फसल परामर्श।'
  },
  {
    num: '04', icon: '💰',
    title: 'Best Price Guarantee',    titleHi: 'सर्वोत्तम मूल्य गारंटी',
    body:  'Competitive pricing with seasonal discounts for farmers.',
    bodyHi:'किसानों के लिए मौसमी छूट के साथ प्रतिस्पर्धी मूल्य।'
  },
];

export default function HomePage() {
  const [lang, setLang] = useState('en');
  const [cartCount, setCartCount] = useState(0);

  useScrollReveal();

  const t = (en, hi) => lang === 'hi' ? hi : en;

  return (
    <>
      <Head>
        <title>Laxmi Krashi Kendra — Premium Agricultural Products</title>
        <meta name="description" content="India's trusted agricultural products store. Seeds, fertilizers, pesticides, and farm equipment." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        cartCount={cartCount}
        lang={lang}
        onLangToggle={() => setLang(l => l === 'en' ? 'hi' : 'en')}
      />

      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <HeroSection lang={lang} />

      <hr />

      {/* ══════════════════════════════════════════
          2. STATS BAND
      ══════════════════════════════════════════ */}
      <section className={styles.statsBand}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { num: '25+',    label: t('Years of Experience',   'वर्षों का अनुभव')     },
              { num: '5,000+', label: t('Farmer Customers',      'किसान ग्राहक')        },
              { num: '800+',   label: t('Products Available',    'उत्पाद उपलब्ध')       },
              { num: '500+',   label: t('Districts Served',      'जिलों में सेवा')       },
            ].map((s, i) => (
              <div className={`${styles.statItem} reveal reveal-delay-${i + 1}`} key={i}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* ══════════════════════════════════════════
          3. CATEGORIES GRID
      ══════════════════════════════════════════ */}
      <section className={`${styles.categoriesSection} blueprint-grid`}>
        <div className="container">
          <div className={`section-heading section-heading--centered reveal`}>
            <div className="overline">
              <span>{t('Browse by Category', 'श्रेणी के अनुसार देखें')}</span>
            </div>
            <h2>{t('Everything Your Farm Needs', 'खेत की हर ज़रूरत')}</h2>
            <p>{t(
              'From soil preparation to harvest — find the right products for every stage of farming.',
              'मिट्टी की तैयारी से कटाई तक — खेती के हर चरण के लिए सही उत्पाद।'
            )}</p>
          </div>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat, i) => (
              <Link
                href={cat.href}
                key={cat.id}
                className={`${styles.catCard} reveal reveal-delay-${(i % 3) + 1}`}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catName}>{t(cat.name, cat.nameHi)}</span>
                <span className={styles.catCount}>{cat.count} {t('products', 'उत्पाद')}</span>
                <span className={styles.catArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* ══════════════════════════════════════════
          4. FEATURED PRODUCTS
      ══════════════════════════════════════════ */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <div>
              <div className="overline overline--only-left">
                <span>{t('Featured Products', 'चुनिंदा उत्पाद')}</span>
              </div>
              <h2>{t('Top Picks This Season', 'इस सीजन के टॉप उत्पाद')}</h2>
            </div>
            <Link href="/products" className="btn btn-outline">
              {t('View All', 'सभी देखें')}
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {FEATURED_PRODUCTS.map((p, i) => (
              <Link
                href={`/products/${p.id}`}
                key={p.id}
                className={`product-card ${styles.productCard} reveal reveal-delay-${i + 1}`}
              >
                <div className="product-card__image-wrap">
                  <img
                    src={p.img}
                    alt={t(p.name, p.nameHi)}
                    onError={(e) => {
                      e.target.parentNode.style.background = 'var(--color-parchment)';
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="product-card__body">
                  <p className="product-card__category">{t(p.category, p.categoryHi)}</p>
                  <h3 className="product-card__name">{t(p.name, p.nameHi)}</h3>
                  <p className="product-card__price">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. DARK SECTION — WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className={`${styles.whySection} section-dark`}>
        <div className="container">
          <div className={`section-heading reveal`}>
            <div className="overline overline--light">
              <span>{t('Why Choose Us', 'हमें क्यों चुनें')}</span>
            </div>
            <h2>{t('Trusted by Farmers\nAcross India', 'भारत के किसानों का\nभरोसेमंद साथी')}</h2>
          </div>

          <div className={styles.whyGrid}>
            {WHY_US.map((item, i) => (
              <div
                key={item.num}
                className={`${styles.whyCard} feature-card reveal reveal-delay-${i + 1}`}
              >
                <div className={`feature-card__number ${styles.whyCardNum}`}>{item.num}</div>
                <div className="feature-card__icon">{item.icon}</div>
                <h3 className="feature-card__title">{t(item.title, item.titleHi)}</h3>
                <p className="feature-card__body">{t(item.body, item.bodyHi)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. SEASONAL OFFER BAND (dark contrast)
      ══════════════════════════════════════════ */}
      <section className={styles.offerBand}>
        <div className="container">
          <div className={`${styles.offerInner} blueprint-grid`}>
            <div className={`${styles.offerText} reveal`}>
              <span className={styles.offerTag}>
                {t('Limited Time Offer', 'सीमित समय का ऑफर')}
              </span>
              <h2 className={styles.offerHeading}>
                {t('Rabi Season 2025\nSpecial Discounts', 'रबी सीजन 2025\nविशेष छूट')}
              </h2>
              <p>
                {t(
                  'Get up to 20% off on all seed varieties and fertilizers this rabi season.',
                  'इस रबी सीजन सभी बीज और उर्वरकों पर 20% तक की छूट पाएं।'
                )}
              </p>
              <Link href="/offers" className="btn btn-primary">
                {t('Shop Offers', 'ऑफर देखें')}
              </Link>
            </div>
            <div className={`${styles.offerBadgeWrap} reveal reveal-delay-2`}>
              <div className={styles.offerBadge}>
                <span className={styles.offerBadgeNum}>20%</span>
                <span className={styles.offerBadgeLabel}>{t('OFF', 'छूट')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className={`${styles.testimonialsSection} bg-parchment`}>
        <div className="container">
          <div className={`section-heading section-heading--centered reveal`}>
            <div className="overline">
              <span>{t('Farmer Stories', 'किसानों की बातें')}</span>
            </div>
            <h2>{t('What Our Farmers Say', 'हमारे किसान क्या कहते हैं')}</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: t(
                  '"The wheat seeds I bought gave me 40% more yield than before. Excellent quality!"',
                  '"मैंने जो गेहूँ के बीज खरीदे, उनसे पहले से 40% अधिक उत्पादन हुआ। शानदार गुणवत्ता!"'
                ),
                name:    'Ramesh Kumar',
                nameHi:  'रमेश कुमार',
                place:   'Haryana',
                placeHi: 'हरियाणा',
              },
              {
                quote: t(
                  '"Fast delivery right to my village. The fertilizers work brilliantly on my cotton."',
                  '"मेरे गाँव तक तेज़ डिलीवरी। कपास पर उर्वरक का बहुत अच्छा असर हुआ।"'
                ),
                name:    'Sunita Patel',
                nameHi:  'सुनीता पटेल',
                place:   'Gujarat',
                placeHi: 'गुजरात',
              },
              {
                quote: t(
                  '"The agronomist advice I got over the phone saved my rice crop from pest damage."',
                  '"फोन पर मिली कृषि सलाह ने मेरी धान की फसल को कीट से बचाया।"'
                ),
                name:    'Mohan Singh',
                nameHi:  'मोहन सिंह',
                place:   'Punjab',
                placeHi: 'पंजाब',
              },
            ].map((t_, i) => (
              <div key={i} className={`${styles.testimonialCard} reveal reveal-delay-${i + 1}`}>
                <div className={styles.testimonialQuoteMark}>"</div>
                <p className={styles.testimonialQuote}>{t_['quote']}</p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.testimonialName}>{t(t_['name'], t_['nameHi'])}</span>
                  <span className={styles.testimonialPlace}>{t(t_['place'], t_['placeHi'])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* ══════════════════════════════════════════
          8. NEWSLETTER / CTA SECTION
      ══════════════════════════════════════════ */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={`${styles.newsletterInner} reveal`}>
            <div className="overline overline--only-left">
              <span>{t('Stay Updated', 'अपडेट रहें')}</span>
            </div>
            <h2>{t('Get Agri Tips & Seasonal Deals', 'कृषि टिप्स और मौसमी डील पाएं')}</h2>
            <p>{t(
              'Join 10,000+ farmers who get weekly crop advice and exclusive offers.',
              '10,000+ किसानों के साथ जुड़ें जो साप्ताहिक फसल सलाह और विशेष ऑफर पाते हैं।'
            )}</p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder={t('Your email address', 'आपका ईमेल पता')}
                className={styles.newsletterInput}
              />
              <button className="btn btn-primary">
                {t('Subscribe', 'सब्सक्राइब करें')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  );
}
