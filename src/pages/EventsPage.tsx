import { motion } from 'framer-motion';
import Events from '../components/Events';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function EventsPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="pt-20"
    >
      <Events />
    </motion.div>
  );
}
