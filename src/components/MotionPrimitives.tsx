import { ReactNode } from 'react';
import { motion } from 'motion/react';

export const ARCHITECTURAL_EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Subtle architectural entrance using compositor-only properties (opacity + transform).
 * Settles promptly and stays visible once revealed.
 */
export function ArchitecturalReveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.48, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGrid({
  children,
  className = '',
  trigger = 'inView',
}: {
  children: ReactNode;
  className?: string;
  trigger?: 'inView' | 'mount';
}) {
  return (
    <motion.div
      initial="hidden"
      {...(trigger === 'mount'
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.08 },
          })}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: ARCHITECTURAL_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
