import { motion } from 'framer-motion';

const SuccessMessage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      Submission successful!
    </motion.div>
  );
};
