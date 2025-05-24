// src/components/Blog/Pagination.js
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageNumbers = () => {
    return pages;
  };

  return (
    <motion.div
      className="flex justify-center mt-10 md:mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition duration-200 ease-in-out`}
        >
          <span className="sr-only">Anterior</span>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="h-5 w-5"
          />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-orange
                            ${
                              currentPage === page
                                ? 'z-10 bg-brand-orange border-brand-orange text-white font-semibold'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition duration-200 ease-in-out"
        >
          <span className="sr-only">Siguiente</span>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-5 w-5"
          />
        </button>
      </nav>
    </motion.div>
  );
}
