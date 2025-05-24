// src/components/admin/ProductList.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ProductList({ products, onEdit, onDelete, isLoading }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando productos...
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay productos para mostrar. ¡Agrega uno nuevo!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Gestionar Productos
      </h2>
      {isLoading && products.length > 0 && (
        <p className="mb-4 text-sm text-blue-500">Actualizando lista...</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {' '}
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen */}
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // Placeholder si no hay imagen
                  <span className="text-gray-400 text-sm">
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2x"
                    />
                    Sin Imagen
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4 flex-grow">
                {product.is_featured && (
                  <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                    Destacado
                  </span>
                )}
                <h3
                  className="text-lg font-semibold text-gray-800 mb-1 truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p
                  className="text-sm text-gray-600 mb-2 truncate"
                  title={product.short_description || ''}
                >
                  {product.short_description || (
                    <span className="italic">Sin descripción corta</span>
                  )}
                </p>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-bold text-orange-600 text-base">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  SKU: {product.sku || 'N/A'}
                </p>
                <p className="text-xs text-gray-500">
                  Categoría: {product.category || 'N/A'}
                </p>
              </div>

              {/* Acciones */}
              <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs font-medium transition duration-150 flex items-center space-x-1"
                  aria-label={`Editar ${product.name}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDelete(product.id, product.image_url)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-medium transition duration-150 flex items-center space-x-1"
                  aria-label={`Borrar ${product.name}`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span>Borrar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
