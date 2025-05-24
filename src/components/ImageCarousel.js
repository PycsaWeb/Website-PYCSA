// src/components/ImageCarousel.js
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = page % images.length;

  const paginate = useCallback(
    (newDirection) => {
      setPage(([currentPage, _]) => {
        let newIndex = (currentPage + newDirection) % images.length;
        if (newIndex < 0) {
          newIndex += images.length;
        }
        return [newIndex, newDirection];
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [paginate, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-gray-300 flex items-center justify-center text-gray-500">
        Sin imágenes
      </div>
    );
  }

  return (
    <div className="relative w-full h-[63vh] lg:h-[58vh] aspect-video overflow-hidden bg-gray-200">
      <AnimatePresence
        initial={false}
        custom={direction}
      >
        <motion.img
          key={page}
          src={images[imageIndex]}
          alt={`Imagen ${imageIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute h-full w-full object-cover object-top"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>

      {/* Botones de Navegación (solo si hay más de 1 imagen) */}
      {images.length > 1 && (
        <>
          <motion.button
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
            onClick={() => paginate(-1)}
            aria-label="Imagen anterior"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </motion.button>
          <motion.button
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
            onClick={() => paginate(1)}
            aria-label="Siguiente imagen"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </motion.button>
        </>
      )}

      {/* Indicadores de Puntos (solo si hay más de 1 imagen) */}
      {images.length > 1 && (
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full cursor-pointer ${
                i === imageIndex ? 'bg-white scale-110' : 'bg-white/50'
              }`}
              onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
              initial={{ scale: 1 }}
              animate={{ scale: i === imageIndex ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
