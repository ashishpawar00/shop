import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCamera, FiGrid, FiImage, FiMapPin, FiMessageCircle, FiUsers } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const COPY = {
  en: {
    title: 'Gallery | Laxmi Krashi Kendra',
    description: 'A visual look at the store, products, field activity, and farmers connected to Laxmi Krashi Kendra.',
    eyebrow: 'Store and field gallery',
    headline: 'A closer look at the store, products, and local farming support around it.',
    intro:
      'This gallery gives farmers a quick visual sense of what the store carries, how support happens on the ground, and the kind of real farm context behind our recommendations.',
    all: 'All',
    store: 'Store',
    products: 'Products',
    field: 'Field',
    farmers: 'Farmers',
    available: 'items shown',
    emptyTitle: 'More visuals are being added',
    emptyBody: 'This section will keep growing as more store, field, and farmer moments are documented.',
    shareTitle: 'Want to share your field result?',
    shareBody: 'Farmers can send crop photos, product-use results, or store visit moments on WhatsApp for a chance to be featured.',
    shareCta: 'Send on WhatsApp',
    visitCta: 'Contact the team'
  },
  hi: {
    title: 'गैलरी | लक्ष्मी कृषि केंद्र',
    description: 'दुकान, उत्पाद, खेत गतिविधि और किसानों के साथ जुड़ी झलकियां देखें।',
    eyebrow: 'दुकान और खेत गैलरी',
    headline: 'दुकान, उत्पाद और स्थानीय खेती सहायता की असली झलक एक जगह।',
    intro:
      'इस गैलरी से किसान जल्दी समझ सकते हैं कि स्टोर में क्या उपलब्ध है, जमीन पर सहायता कैसे होती है, और हमारी सलाह के पीछे कैसा वास्तविक खेती संदर्भ काम करता है।',
    all: 'सभी',
    store: 'दुकान',
    products: 'उत्पाद',
    field: 'खेत',
    farmers: 'किसान',
    available: 'आइटम दिख रहे हैं',
    emptyTitle: 'और तस्वीरें जल्द जोड़ी जाएंगी',
    emptyBody: 'दुकान, खेत और किसान अनुभवों की नई झलकियां धीरे-धीरे इस सेक्शन में जोड़ी जाती रहेंगी।',
    shareTitle: 'क्या आप अपनी खेत की तस्वीर साझा करना चाहते हैं?',
    shareBody: 'किसान फसल की फोटो, उत्पाद के परिणाम या स्टोर विजिट की झलक WhatsApp पर भेज सकते हैं।',
    shareCta: 'WhatsApp पर भेजें',
    visitCta: 'टीम से संपर्क करें'
  }
};

const GALLERY_ITEMS = {
  en: [
    { id: 'store-front', category: 'store', title: 'Storefront and walk-in support', note: 'Farmers usually start here for dosage confirmation and product pickup.', icon: FiMapPin },
    { id: 'seed-wall', category: 'products', title: 'Seed and crop input shelves', note: 'Fast comparison between commonly requested products for the season.', icon: FiGrid },
    { id: 'crop-check', category: 'field', title: 'Field photo review and diagnosis', note: 'Crop photos are checked before recommending the next product step.', icon: FiCamera },
    { id: 'farmer-chat', category: 'farmers', title: 'Farmer follow-up conversations', note: 'Advice often continues over call or WhatsApp after the first visit.', icon: FiUsers },
    { id: 'hardware-corner', category: 'products', title: 'Tools and support items', note: 'Practical add-ons that help with spraying, mixing, and handling.', icon: FiImage },
    { id: 'field-visit', category: 'field', title: 'Ground-level crop context', note: 'Local conditions matter, so observations are tied back to real field use.', icon: FiMapPin }
  ],
  hi: [
    { id: 'store-front', category: 'store', title: 'दुकान और सीधी सहायता', note: 'अक्सर किसान यहीं से मात्रा की पुष्टि और उत्पाद लेने की शुरुआत करते हैं।', icon: FiMapPin },
    { id: 'seed-wall', category: 'products', title: 'बीज और कृषि इनपुट शेल्फ', note: 'मौसम के हिसाब से ज्यादा पूछे जाने वाले उत्पादों की जल्दी तुलना हो पाती है।', icon: FiGrid },
    { id: 'crop-check', category: 'field', title: 'फोटो से फसल जांच', note: 'अगला उत्पाद सुझाव देने से पहले फसल की फोटो देखी जाती है।', icon: FiCamera },
    { id: 'farmer-chat', category: 'farmers', title: 'किसानों से फॉलो-अप बातचीत', note: 'पहली विजिट के बाद भी कॉल या WhatsApp पर सहायता जारी रहती है।', icon: FiUsers },
    { id: 'hardware-corner', category: 'products', title: 'उपकरण और सहायक सामग्री', note: 'स्प्रे, मिश्रण और उपयोग से जुड़े व्यावहारिक सामान भी उपलब्ध रहते हैं।', icon: FiImage },
    { id: 'field-visit', category: 'field', title: 'खेत की वास्तविक स्थिति', note: 'स्थानीय परिस्थितियों को देखकर सलाह को जमीन से जोड़ा जाता है।', icon: FiMapPin }
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function GalleryPage() {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const items = GALLERY_ITEMS[language] || GALLERY_ITEMS.en;
  const isHindi = language === 'hi';
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(
    () => [
      { id: 'all', label: copy.all },
      { id: 'store', label: copy.store },
      { id: 'products', label: copy.products },
      { id: 'field', label: copy.field },
      { id: 'farmers', label: copy.farmers }
    ],
    [copy]
  );

  const filteredItems = activeCategory === 'all' ? items : items.filter(item => item.category === activeCategory);

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>

      <div className="bg-slate-base text-ink-primary">
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 px-6 py-10 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-10 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.eyebrow}</p>
            <h1 className={`mt-5 max-w-4xl font-outfit text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>{copy.headline}</h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 text-ink-muted sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>
          </motion.section>

          <section className="mt-10">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const active = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-4 py-3 text-sm font-bold transition ${
                      active
                        ? 'border-accent-emerald bg-accent-emerald text-white'
                        : 'border-line-soft/10 bg-slate-card/76 text-ink-secondary hover:border-accent-emerald/30 hover:text-ink-primary'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-sm font-medium text-ink-muted">
              {filteredItems.length} {copy.available}
            </p>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="overflow-hidden rounded-[1.75rem] border border-line-soft/10 bg-slate-card/76 shadow-xl shadow-black/8 backdrop-blur-xl"
                >
                  <div className="relative flex h-56 items-end overflow-hidden bg-gradient-to-br from-accent-emerald/12 via-slate-base/60 to-slate-card/95 p-6">
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent-emerald/12 blur-3xl" />
                    <div className="relative">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-emerald/12 text-accent-emerald">
                        <Icon size={26} />
                      </div>
                      <span className="inline-flex rounded-full border border-accent-emerald/15 bg-accent-emerald/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-accent-emerald">
                        {categories.find(category => category.id === item.category)?.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className={`text-2xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{item.title}</h2>
                    <p className={`mt-3 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{item.note}</p>
                  </div>
                </motion.article>
              );
            })}
          </section>

          {filteredItems.length === 0 ? (
            <section className="mt-10 rounded-[2rem] border border-line-soft/10 bg-slate-card/76 p-10 text-center shadow-xl shadow-black/8 backdrop-blur-xl">
              <h2 className={`text-2xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyTitle}</h2>
              <p className={`mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyBody}</p>
            </section>
          ) : null}

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Community</p>
                <h2 className={`mt-4 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.shareTitle}</h2>
                <p className={`mt-4 text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.shareBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="https://wa.me/919977938192" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  <FiMessageCircle className="mr-2" />
                  {copy.shareCta}
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  {copy.visitCta}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
