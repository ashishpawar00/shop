import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiHeart, FiMapPin, FiShield, FiUsers } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const COPY = {
  en: {
    title: 'About Laxmi Krashi Kendra',
    eyebrow: 'Since 1998',
    headline: 'A trusted farm store built around advice, not just inventory.',
    intro:
      'Laxmi Krashi Kendra has spent more than two decades helping local farmers make clearer crop decisions with practical guidance, dependable inputs, and direct follow-up.',
    storyTitle: 'How we work',
    storyBody:
      'We combine field understanding, store-backed recommendations, and faster support channels so farmers spend less time guessing and more time acting.',
    milestones: [
      { year: '1998', title: 'Store opened in Siratha', body: 'We started with a simple goal: keep genuine farm inputs and honest guidance available locally.' },
      { year: '2010', title: 'Advisory became core', body: 'Crop discussions, dosage guidance, and practical recommendations became part of every visit.' },
      { year: 'Today', title: 'Digital plus local support', body: 'Farmers can now reach us through Crop Doctor, WhatsApp, and the store without losing continuity.' }
    ],
    valuesTitle: 'What farmers rely on here',
    values: [
      { title: 'Honest guidance', body: 'Recommendations are shaped by field reality, not pressure to sell extra products.', icon: FiShield },
      { title: 'Verified products', body: 'The store focuses on dependable, relevant inputs that farmers can buy with confidence.', icon: FiAward },
      { title: 'Practical follow-up', body: 'Questions after purchase are treated as part of the service, not an afterthought.', icon: FiUsers },
      { title: 'Long-term trust', body: 'Relationships matter here, so every recommendation is meant to protect yield and reputation together.', icon: FiHeart }
    ],
    stats: [
      { value: '25+', label: 'Years serving farms' },
      { value: '10,000+', label: 'Farmers supported' },
      { value: '500+', label: 'Products available' }
    ],
    quote: 'Farm progress should feel clearer, faster, and less risky for every family we serve.',
    quoteBy: 'Laxmi Krashi Kendra, Siratha',
    ctaTitle: 'Need support for the next crop decision?',
    ctaBody: 'Talk to the team, browse trusted inputs, or start with a crop check right away.',
    ctaPrimary: 'Contact us',
    ctaSecondary: 'Browse products',
    serviceArea: 'Serving Siratha and nearby farming communities'
  },
  hi: {
    title: 'लक्ष्मी कृषि केंद्र के बारे में',
    eyebrow: '1998 से',
    headline: 'सिर्फ उत्पाद नहीं, भरोसेमंद सलाह के साथ काम करने वाला कृषि केंद्र।',
    intro:
      'लक्ष्मी कृषि केंद्र पिछले 25+ वर्षों से किसानों को व्यावहारिक सलाह, भरोसेमंद कृषि उत्पाद और तेज फॉलो-अप के साथ बेहतर फैसले लेने में मदद कर रहा है।',
    storyTitle: 'हम कैसे काम करते हैं',
    storyBody:
      'हम खेत की ज़रूरत, दुकान का अनुभव और तेज संपर्क साधनों को एक साथ जोड़ते हैं ताकि किसान कम उलझें और जल्दी सही कदम उठा सकें।',
    milestones: [
      { year: '1998', title: 'सिराथा में शुरुआत', body: 'एक छोटे से स्टोर से शुरुआत हुई, लक्ष्य था सही कृषि उत्पाद और ईमानदार सलाह स्थानीय स्तर पर उपलब्ध कराना।' },
      { year: '2010', title: 'सलाह हमारी पहचान बनी', body: 'फसल, मात्रा, मौसम और दवा चयन पर सीधी सलाह हर किसान बातचीत का हिस्सा बनी।' },
      { year: 'आज', title: 'डिजिटल और स्थानीय सहायता', body: 'अब किसान Crop Doctor, WhatsApp और स्टोर विजिट के बीच लगातार सहायता पा सकते हैं।' }
    ],
    valuesTitle: 'किसान यहाँ किस बात पर भरोसा करते हैं',
    values: [
      { title: 'ईमानदार मार्गदर्शन', body: 'सलाह ज़मीन की स्थिति के हिसाब से दी जाती है, सिर्फ बिक्री बढ़ाने के लिए नहीं।', icon: FiShield },
      { title: 'भरोसेमंद उत्पाद', body: 'स्टोर में वही इनपुट रखे जाते हैं जिन पर किसान व्यावहारिक तौर पर भरोसा कर सकें।', icon: FiAward },
      { title: 'फॉलो-अप सहायता', body: 'खरीद के बाद के सवाल भी सेवा का हिस्सा माने जाते हैं, अलग समस्या नहीं।', icon: FiUsers },
      { title: 'लंबे समय का विश्वास', body: 'हर सलाह का मकसद उपज और रिश्ते दोनों को सुरक्षित रखना है।', icon: FiHeart }
    ],
    stats: [
      { value: '25+', label: 'सालों का अनुभव' },
      { value: '10,000+', label: 'किसानों की सहायता' },
      { value: '500+', label: 'उत्पाद उपलब्ध' }
    ],
    quote: 'हर किसान परिवार के लिए खेती का अगला फैसला साफ, तेज और कम जोखिम वाला होना चाहिए।',
    quoteBy: 'लक्ष्मी कृषि केंद्र, सिराथा',
    ctaTitle: 'अगले फसल निर्णय में सहायता चाहिए?',
    ctaBody: 'टीम से बात करें, भरोसेमंद उत्पाद देखें या सीधे फसल जांच से शुरुआत करें।',
    ctaPrimary: 'संपर्क करें',
    ctaSecondary: 'उत्पाद देखें',
    serviceArea: 'सिराथा और आसपास के किसान समुदायों के लिए सेवा'
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.intro} />
      </Head>

      <div className="bg-slate-base text-ink-primary">
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <section className="relative overflow-hidden rounded-[2rem] border border-line-soft/10 bg-slate-card/78 px-6 py-10 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-emerald/60 to-transparent" />
            <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-accent-emerald/10 blur-3xl" />
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-end">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }}>
                <p className="mb-5 inline-flex items-center rounded-full border border-accent-emerald/20 bg-accent-emerald/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-accent-emerald">
                  {copy.eyebrow}
                </p>
                <h1 className={`max-w-3xl font-outfit text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>
                  {copy.headline}
                </h1>
                <p className={`mt-6 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink-secondary">
                  <span className="inline-flex items-center rounded-full border border-line-soft/10 bg-slate-base/70 px-4 py-2">
                    <FiMapPin className="mr-2 text-accent-emerald" />
                    {copy.serviceArea}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
              >
                {copy.stats.map(stat => (
                  <div key={stat.label} className="rounded-[1.75rem] border border-line-soft/10 bg-slate-base/72 p-5 shadow-lg shadow-black/5">
                    <p className="font-outfit text-3xl font-bold text-accent-emerald sm:text-4xl">{stat.value}</p>
                    <p className={`mt-2 text-sm leading-6 text-ink-secondary ${isHindi ? 'font-hindi' : ''}`}>{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.45 }}>
              <div className="rounded-[2rem] border border-line-soft/10 bg-slate-card/70 p-6 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">{copy.storyTitle}</p>
                <p className={`mt-4 max-w-2xl text-lg leading-8 text-ink-secondary ${isHindi ? 'font-hindi' : ''}`}>{copy.storyBody}</p>
                <div className="mt-8 space-y-6">
                  {copy.milestones.map(item => (
                    <div key={item.year} className="grid gap-3 border-t border-line-soft/10 pt-6 sm:grid-cols-[92px_1fr]">
                      <div className="font-outfit text-2xl font-bold text-accent-emerald">{item.year}</div>
                      <div>
                        <h3 className={`text-xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{item.title}</h3>
                        <p className={`mt-2 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.45, delay: 0.06 }}>
              <div className="rounded-[2rem] border border-line-soft/10 bg-slate-card/70 p-6 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">{copy.valuesTitle}</p>
                <div className="mt-6 grid gap-4">
                  {copy.values.map(value => {
                    const Icon = value.icon;
                    return (
                      <div key={value.title} className="rounded-[1.5rem] border border-line-soft/10 bg-slate-base/72 p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h3 className={`text-lg font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{value.title}</h3>
                            <p className={`mt-2 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{value.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-accent-emerald/15 bg-accent-emerald/8 p-5">
                  <p className={`text-lg leading-8 text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{copy.quote}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-accent-emerald">{copy.quoteBy}</p>
                </div>
              </div>
            </motion.div>
          </section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-16 overflow-hidden rounded-[2rem] border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 sm:py-14"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Next step</p>
                <h2 className={`mt-4 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaTitle}</h2>
                <p className={`mt-4 max-w-xl text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  {copy.ctaPrimary}
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  {copy.ctaSecondary}
                </Link>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
}
