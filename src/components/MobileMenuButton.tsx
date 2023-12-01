import { motion, SVGMotionProps } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggleMenu: () => void;
}

export default function MobileMenuButton({
  isOpen,
  onToggleMenu,
}: MobileMenuButtonProps) {
  return (
    <motion.button
      onClick={onToggleMenu}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className="xl:hidden"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: 'M 3 4 L 21 4' },
            open: { d: 'M 5 19 L 19 5' },
          }}
        />
        <Path
          d="M 3 12 L 21 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 3 20 L 21 20' },
            open: { d: 'M 5 5 L 19 19' },
          }}
        />
      </svg>
    </motion.button>
  );
}

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#000"
    strokeLinecap="round"
    {...props}
  />
);
