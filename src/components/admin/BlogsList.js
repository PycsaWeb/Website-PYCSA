import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

// Formateador de fecha simple
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString + 'T00:00:00'); // Asegurar que se interprete como local
    return date.toLocaleDateString('es-ES', {
      // Ajusta 'es-ES' a tu localidad si es diferente
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error('Error formatting date:', dateString, e);
    return dateString; // Devolver original si falla
  }
};

export default function BlogsList({ blogs, onEdit, onDelete, isLoading }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-4xl text-orange-600"
        />
        <p className="mt-2 text-gray-500">Cargando blogs...</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-4xl text-amber-500 mb-3"
        />
        <p className="text-gray-600 font-medium">
          No se encontraron entradas de blog.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Intenta agregar una nueva entrada usando el formulario de arriba.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Entradas de Blog Existentes
      </h2>
      <motion.ul
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogs.map((blog) => (
          <motion.li
            key={blog.id}
            variants={itemVariants}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden"
          >
            <div className="flex-grow w-full mb-3 sm:mb-0 sm:mr-4">
              <h3
                className="text-lg font-semibold text-orange-700 truncate"
                title={blog.title}
              >
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Categoría:</span>{' '}
                {blog.category || 'N/A'}
                <span className="mx-2 text-gray-300">|</span>
                <span className="font-medium">Fecha:</span>{' '}
                {formatDate(blog.date)}
              </p>
              {blog.excerpt && (
                <p
                  className="text-sm text-gray-600 mt-1 italic truncate"
                  title={blog.excerpt}
                >
                  "{blog.excerpt}"
                </p>
              )}
              {blog.image_urls && blog.image_urls.length > 0 && (
                <div className="mt-2 flex space-x-2">
                  {blog.image_urls.slice(0, 3).map(
                    (
                      url,
                      index // Mostrar max 3 previews pequeñas
                    ) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Thumb ${index}`}
                        className="w-10 h-10 object-cover rounded border border-gray-300"
                      />
                    )
                  )}
                  {blog.image_urls.length > 3 && (
                    <span className="text-xs text-gray-400 self-end">
                      +{blog.image_urls.length - 3} más
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex-shrink-0 flex space-x-2">
              <button
                onClick={() => onEdit(blog)}
                className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-150"
                aria-label={`Editar ${blog.title}`}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="mr-1"
                />{' '}
                Editar
              </button>
              <button
                onClick={() => onDelete(blog.id, blog.image_urls)}
                className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-150"
                aria-label={`Borrar ${blog.title}`}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="mr-1"
                />{' '}
                Borrar
              </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
