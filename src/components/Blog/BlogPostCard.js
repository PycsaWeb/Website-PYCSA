// src/components/Blog/BlogPostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTag,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date + 'T00:00:00').toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Fecha desconocida';

  return (
    <motion.div
      className="m-0 p-0 h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="group bg-white rounded-lg shadow-md overflow-hidden h-full transition duration-300 ease-in-out hover:shadow-xl flex flex-col">
        <Link
          to={`/blog/${post.id}`}
          className="block"
        >
          {' '}
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={post.imageUrl || '/assets/logo.png'}
              alt={`Imagen para ${post.title}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>{' '}
          </div>
        </Link>

        <div className="p-6 flex flex-col flex-grow">
          {' '}
          {post.category && (
            <Link
              // to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
              to="/blog"
              className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-orange hover:text-brand-orange-dark transition duration-200 ease-in-out mb-2 self-start" // self-start para que no ocupe todo el ancho
            >
              <FontAwesomeIcon
                icon={faTag}
                className="mr-1"
              />
              {post.category}
            </Link>
          )}
          <Link to={`/blog/${post.id}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 transition duration-200 ease-in-out group-hover:text-brand-orange">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>{' '}
          <div className="text-gray-500 text-xs mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            {' '}
            <span className="flex items-center">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-1.5"
              />
              {formattedDate}
            </span>
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark font-semibold transition duration-300 ease-in-out group" // Mueve el group aquí
            >
              Leer Más
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 transform transition duration-300 ease-in-out group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
