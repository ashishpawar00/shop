import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FiCheckCircle, FiPhone, FiShield } from 'react-icons/fi';
import styles from './Lanyard.module.css';

export default function Lanyard({
  badgeName = 'Laxmi Krashi Kendra',
  role = 'AI crop care and farm support',
  phone = '9977938192',
  note = 'Placeholder badge until final lanyard assets are added.'
}) {
  const tiltXValue = useMotionValue(0);
  const tiltYValue = useMotionValue(0);
  const liftValue = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(30);

  const rotateX = useSpring(tiltXValue, { stiffness: 180, damping: 20, mass: 0.9 });
  const rotateY = useSpring(tiltYValue, { stiffness: 180, damping: 20, mass: 0.9 });
  const y = useSpring(liftValue, { stiffness: 180, damping: 18, mass: 0.9 });
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.76), transparent 42%)`;

  const handlePointerMove = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const yPosition = (event.clientY - rect.top) / rect.height;

    tiltXValue.set((0.5 - yPosition) * 18);
    tiltYValue.set((x - 0.5) * 22);
    liftValue.set(-10);
    shineX.set(x * 100);
    shineY.set(yPosition * 100);
  };

  const handlePointerLeave = () => {
    tiltXValue.set(0);
    tiltYValue.set(0);
    liftValue.set(0);
    shineX.set(50);
    shineY.set(30);
  };

  return (
    <div className={styles.scene}>
      <div className={styles.hook} />
      <div className={styles.strapAnchor} aria-hidden="true">
        <span className={styles.strapLeft} />
        <span className={styles.strapRight} />
      </div>

      <motion.article
        className={styles.cardShell}
        style={{ rotateX, rotateY, y }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div className={styles.shine} style={{ backgroundImage: shine }} />

        <div className={styles.cardHeader}>
          <span className={styles.statusPill}>
            <FiShield />
            Verified support
          </span>
          <span className={styles.cardId}>LK-25</span>
        </div>

        <div className={styles.logoMark}>LK</div>

        <h3 className={styles.badgeName}>{badgeName}</h3>
        <p className={styles.badgeRole}>{role}</p>

        <div className={styles.badgeMeta}>
          <span>25+ years</span>
          <span>Farmer-first</span>
          <span>Fast response</span>
        </div>

        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <FiCheckCircle />
            Diagnosis, inputs, and follow-up in one place
          </div>
          <div className={styles.infoItem}>
            <FiPhone />
            Call or WhatsApp: {phone}
          </div>
        </div>

        <p className={styles.note}>{note}</p>
      </motion.article>
    </div>
  );
}
