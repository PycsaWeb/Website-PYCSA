// src/components/Blog/HeroBlog.js
import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBlog() {
  return (
    <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20 md:py-28 px-4 text-center border-b border-gray-700 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 bg-fixed"
        style={{
          backgroundImage: "url('/assets/HeroBlog.png')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>{' '}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Infórmate y Protégete{' '}
          <span className="block sm:inline-block mt-2 sm:mt-0">
            con Nuestro{' '}
            <span className="relative inline-block">
              <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-orange/80 transform -skew-x-12"></span>{' '}
              <span className="relative">Blog</span>
            </span>
          </span>
        </h1>
        <motion.p
          className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Consejos, noticias y análisis sobre seguridad privada para proteger lo
          que más importa.
        </motion.p>
      </motion.div>
    </div>
  );
}
