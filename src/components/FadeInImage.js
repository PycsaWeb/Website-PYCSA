import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export default function FadeInImage({ src, alt, className = '' }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 1.05 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
}
