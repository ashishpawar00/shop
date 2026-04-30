import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiClock, FiMessageCircle, FiPhone, FiShield, FiShoppingCart, FiZap } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const COPY = {
  en: {
    title: 'Services | Laxmi Krashi Kendra',
    eyebrow: 'Field support services',
    headline: 'Practical farm help built around diagnosis, action, and follow-up.',
    intro:
      'These services are designed for the way farmers actually work: quick crop understanding, clear next steps, dependable products, and direct human support when needed.',
    cards: [
      {
        title: 'Photo-based crop checks',
        description: 'Review field photos to spot disease, stress, and visible warning signs quickly.',
        outcome: 'Farmers catch fungal issues around 3 days earlier on average.',
        tag: 'AI + store context',
        icon: FiZap
      },
      {
        title: 'Clear next actions',
        description: 'Turn a crop issue into treatment, prevention, and dosage guidance without guesswork.',
        outcome: 'Cuts down wrong treatment or dosage choices before they reach the field.',
        tag: 'Grounded recommendations',
        icon: FiShield
      },
      {
        title: 'Trusted input selection',
        description: 'Choose fertilizers, crop protection, and support products linked to the diagnosis.',
        outcome: 'Reduces wrong product purchases by up to 60% on repeat buying cycles.',
        tag: 'Backed by the store',
        icon: FiShoppingCart
      },
      {
        title: 'WhatsApp and call follow-up',
        description: 'Get help after the first recommendation when conditions change or doubts remain.',
        outcome: 'Get a response within 2 hours on WhatsApp for most follow-up questions.',
        tag: 'Built for mobile use',
        icon: FiMessageCircle
      },
      {
        title: 'Less drift, better decisions',
        description: 'Keep diagnosis, advice, and buying steps aligned inside one flow.',
        outcome: 'Saves time otherwise lost between multiple shops, calls, and mixed recommendations.',
        tag: 'Operational clarity',
        icon: FiBarChart2
      },
      {
        title: 'Act before conditions worsen',
        description: 'Move earlier while crop stress is still manageable and yield can still be protected.',
        outcome: 'Helps farmers act before weather shifts make damage harder to contain.',
        tag: 'Time protects yield',
        icon: FiClock
      }
    ],
    processTitle: 'How support usually moves',
    process: [
      { step: '01', title: 'Share the crop issue', body: 'Send a photo, call the store, or describe the field problem.' },
      { step: '02', title: 'Get a practical recommendation', body: 'The next action is explained in simple terms with product guidance if needed.' },
      { step: '03', title: 'Follow up and adjust', body: 'If the field response changes, the team can continue support through call or WhatsApp.' }
    ],
    ctaTitle: 'Need help right now?',
    ctaBody: 'Start with a crop diagnosis or contact the team directly for product and field guidance.',
    ctaPrimary: 'Start crop diagnosis',
    ctaSecondary: 'Contact support'
  },
  hi: {
    title: 'सेवाएं | लक्ष्मी कृषि केंद्र',
    eyebrow: 'खेती सहायता सेवाएं',
    headline: 'निदान, अगला कदम और फॉलो-अप को एक साथ रखने वाली व्यावहारिक कृषि सहायता।',
    intro:
      'ये सेवाएं किसान के असली कामकाज को ध्यान में रखकर बनाई गई हैं: फसल की तेज समझ, साफ अगला कदम, सही उत्पाद और जरूरत पड़ने पर सीधे मानवीय सहायता।',
    cards: [
      {
        title: 'फोटो आधारित फसल जांच',
        description: 'फसल की फोटो देखकर रोग, तनाव और शुरुआती संकेत जल्दी समझे जाते हैं।',
        outcome: 'कई किसान फंगल समस्या के संकेत लगभग 3 दिन पहले पकड़ लेते हैं।',
        tag: 'AI + स्टोर अनुभव',
        icon: FiZap
      },
      {
        title: 'साफ अगला कदम',
        description: 'फसल समस्या को उपचार, रोकथाम और मात्रा की स्पष्ट सलाह में बदला जाता है।',
        outcome: 'गलत दवा या मात्रा चुनने की संभावना काफी कम हो जाती है।',
        tag: 'व्यावहारिक सलाह',
        icon: FiShield
      },
      {
        title: 'भरोसेमंद इनपुट चयन',
        description: 'निदान के हिसाब से सही उर्वरक, सुरक्षा उत्पाद और जरूरी इनपुट चुने जाते हैं।',
        outcome: 'दोबारा खरीद में गलत उत्पाद खरीदने की संभावना बहुत कम हो जाती है।',
        tag: 'दुकान द्वारा समर्थित',
        icon: FiShoppingCart
      },
      {
        title: 'WhatsApp और कॉल फॉलो-अप',
        description: 'पहली सलाह के बाद भी जरूरत पड़ने पर सीधे टीम से जुड़ सकते हैं।',
        outcome: 'अधिकांश सवालों पर WhatsApp में 2 घंटे के भीतर जवाब मिल जाता है।',
        tag: 'मोबाइल के लिए आसान',
        icon: FiMessageCircle
      },
      {
        title: 'कम भटकाव, बेहतर निर्णय',
        description: 'निदान, सलाह और खरीद को एक ही फ्लो में रखने से निर्णय तेज होते हैं।',
        outcome: 'अलग-अलग दुकानों और मिश्रित सलाह के बीच लगने वाला समय बचता है।',
        tag: 'साफ प्रक्रिया',
        icon: FiBarChart2
      },
      {
        title: 'स्थिति बिगड़ने से पहले कार्रवाई',
        description: 'जब नुकसान बढ़ने से पहले मौका हो, तब जल्दी कदम उठाने में मदद मिलती है।',
        outcome: 'मौसम बदलने से पहले उपचार शुरू करना आसान हो जाता है।',
        tag: 'समय उपज बचाता है',
        icon: FiClock
      }
    ],
    processTitle: 'सहायता का सामान्य तरीका',
    process: [
      { step: '01', title: 'फसल की समस्या साझा करें', body: 'फोटो भेजें, कॉल करें या खेत की समस्या बताएं।' },
      { step: '02', title: 'व्यावहारिक सलाह लें', body: 'अगला कदम सरल शब्दों में समझाया जाता है और जरूरत हो तो उत्पाद भी सुझाए जाते हैं।' },
      { step: '03', title: 'फॉलो-अप और सुधार', body: 'खेत की स्थिति बदलने पर कॉल या WhatsApp से आगे की सहायता मिलती है।' }
    ],
    ctaTitle: 'अभी सहायता चाहिए?',
    ctaBody: 'फसल जांच से शुरुआत करें या सीधे टीम से बात करें।',
    ctaPrimary: 'फसल जांच शुरू करें',
    ctaSecondary: 'संपर्क करें'
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
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
          <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 px-6 py-10 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-10 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.eyebrow}</p>
            <h1 className={`mt-5 max-w-4xl font-outfit text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl lg:text-6xl ${isHindi ? 'font-hindi' : ''}`}>{copy.headline}</h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 text-ink-muted sm:text-lg ${isHindi ? 'font-hindi' : ''}`}>{copy.intro}</p>
          </motion.section>

          <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {copy.cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group rounded-[1.75rem] border border-line-soft/10 bg-slate-card/76 p-6 shadow-xl shadow-black/8 backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-emerald/10 text-accent-emerald">
                    <Icon size={22} />
                  </div>
                  <h2 className={`mt-5 text-2xl font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{card.title}</h2>
                  <p className={`mt-3 text-sm leading-7 text-ink-secondary ${isHindi ? 'font-hindi' : ''}`}>{card.description}</p>
                  <p className={`mt-5 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{card.outcome}</p>
                  <div className="mt-5 inline-flex rounded-full border border-accent-emerald/15 bg-accent-emerald/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-accent-emerald">
                    {card.tag}
                  </div>
                </motion.article>
              );
            })}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-line-soft/10 bg-slate-card/78 p-6 shadow-xl shadow-black/8 backdrop-blur-xl sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-emerald">{copy.processTitle}</p>
              <div className="mt-6 space-y-5">
                {copy.process.map(item => (
                  <div key={item.step} className="rounded-[1.5rem] border border-line-soft/10 bg-slate-base/72 p-5">
                    <div className="flex items-start gap-4">
                      <div className="font-outfit text-2xl font-bold text-accent-emerald">{item.step}</div>
                      <div>
                        <h3 className={`text-lg font-semibold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{item.title}</h3>
                        <p className={`mt-2 text-sm leading-7 text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.45, delay: 0.06 }} className="rounded-[2rem] border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald to-emerald-600 p-6 text-white shadow-2xl shadow-emerald-900/20 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/90">Support</p>
              <h2 className={`mt-5 font-outfit text-3xl font-semibold tracking-tight sm:text-4xl ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaTitle}</h2>
              <p className={`mt-4 max-w-xl text-base leading-8 text-emerald-50/85 ${isHindi ? 'font-hindi' : ''}`}>{copy.ctaBody}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/crop-doctor" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:scale-[1.02]">
                  {copy.ctaPrimary}
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  <FiPhone className="mr-2" />
                  {copy.ctaSecondary}
                </Link>
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-white/15 bg-white/8 p-5">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="mt-1 text-emerald-100" />
                  <p className={`text-sm leading-7 text-emerald-50/90 ${isHindi ? 'font-hindi' : ''}`}>
                    {language === 'hi'
                      ? 'जब फसल, मौसम या खरीद का फैसला तुरंत लेना हो, तब एक ही संपर्क बिंदु सबसे ज्यादा मदद करता है।'
                      : 'When crop, weather, and buying decisions all need attention at once, one reliable support point makes the workflow much easier.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
}
