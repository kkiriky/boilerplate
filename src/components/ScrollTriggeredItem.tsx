import { Variants, motion } from 'framer-motion';

const variants: Variants = {
  hidden: { opacity: 0, translateY: 500 },
  visible: { opacity: 1, translateY: 0 },
};

export default function ScrollTriggeredItem() {
  return (
    <motion.div
      variants={variants}
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="box flex h-200 w-200 items-center justify-center bg-purple-400 text-32 text-white"
    >
      <h1>Item</h1>
    </motion.div>
  );
}
