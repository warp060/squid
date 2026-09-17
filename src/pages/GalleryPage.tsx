import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function GalleryPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="pt-20"
    >
      <Gallery />
    </motion.div>
  );
}
