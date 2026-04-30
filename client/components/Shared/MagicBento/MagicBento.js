import { motion } from 'framer-motion';
import styles from './MagicBento.module.css';

const defaultItems = [
  {
    label: 'Diagnosis',
    title: 'Fast crop checks',
    description: 'Upload a crop photo and get disease guidance with practical next steps.',
    footer: 'AI + expert-backed support'
  },
  {
    label: 'Inputs',
    title: 'Trusted farm products',
    description: 'Find fertilizers, pesticides, and essentials chosen for local growing conditions.',
    footer: 'Store verified'
  },
  {
    label: 'Support',
    title: 'Guidance farmers can act on',
    description: 'Get clear treatment suggestions, follow-up help, and quick WhatsApp contact.',
    footer: 'Built for mobile-first use'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: index => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

function updateGlowPosition(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${x}%`);
  card.style.setProperty('--glow-y', `${y}%`);
}

function resetGlowPosition(event) {
  event.currentTarget.style.setProperty('--glow-x', '50%');
  event.currentTarget.style.setProperty('--glow-y', '50%');
}

export default function MagicBento({
  items = defaultItems,
  className = '',
  disableAnimations = false
}) {
  return (
    <div className={`${styles.magicBentoContainer} ${className}`}>
      <div className={`${styles.cardGrid} ${styles.bentoSection}`}>
        {items.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            className={`${styles.magicBentoCard} ${item.featured ? styles.featuredCard : ''}`}
            style={{
              '--card-accent': item.accent ?? '34, 197, 94',
              background: item.background ?? undefined
            }}
            initial={disableAnimations ? false : 'hidden'}
            whileInView={disableAnimations ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.25 }}
            variants={disableAnimations ? undefined : cardVariants}
            custom={index}
            onPointerMove={updateGlowPosition}
            onPointerLeave={resetGlowPosition}
          >
            <div className={styles.glowLayer} />
            <div className={styles.magicBentoCardHeader}>
              <span className={styles.magicBentoCardLabel}>{item.label}</span>
              {item.icon ? <span className={styles.magicBentoCardIcon}>{item.icon}</span> : null}
            </div>

            <div className={styles.magicBentoCardContent}>
              <h3 className={styles.magicBentoCardTitle}>{item.title}</h3>
              <p className={styles.magicBentoCardDescription}>{item.description}</p>
            </div>

            {item.outcome ? <p className={styles.magicBentoCardOutcome}>{item.outcome}</p> : null}
            {item.footer ? <div className={styles.magicBentoCardFooter}>{item.footer}</div> : null}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
