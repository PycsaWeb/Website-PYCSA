// src/components/admin/ServicesList.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faImage,
  faStar,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function ServicesList({
  services,
  onEdit,
  onDelete,
  isLoading,
}) {
  if (isLoading && services.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando servicios...
      </div>
    );
  }

  if (!isLoading && services.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay servicios para mostrar. ¡Agrega uno nuevo!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Gestionar Servicios
      </h2>
      {isLoading && services.length > 0 && (
        <p className="mb-4 text-sm text-blue-500">Actualizando lista...</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen Principal (mostramos la primera si existe) */}
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {service.image_urls && service.image_urls.length > 0 ? (
                  <img
                    src={service.image_urls[0]}
                    alt={service.name_service}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2x"
                    />
                    Sin Imagen
                  </span>
                )}
                {/* Indicador de múltiples imágenes */}
                {service.image_urls && service.image_urls.length > 1 && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-80">
                    {service.image_urls.length} imgs
                  </span>
                )}
                {/* Indicador de destacado */}
                {service.is_featured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full opacity-90 flex items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="mr-1"
                    />{' '}
                    Destacado
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4 flex-grow">
                <h3
                  className="text-lg font-semibold text-gray-800 mb-1 truncate"
                  title={service.name_service}
                >
                  {service.name_service}
                </h3>
                <p
                  className="text-sm text-gray-600 mb-2 h-10 overflow-hidden"
                  title={service.short_description || ''}
                >
                  {service.short_description || (
                    <span className="italic">Sin descripción corta</span>
                  )}
                </p>
                <div className="text-xs text-gray-500 flex items-center mb-2">
                  <FontAwesomeIcon
                    icon={faListAlt}
                    className="mr-1.5"
                  />
                  <span>
                    {service.details?.length || 0} Detalles/Protocolos
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(service)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs font-medium transition duration-150 flex items-center space-x-1"
                  aria-label={`Editar ${service.name_service}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDelete(service.id, service.image_urls)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-medium transition duration-150 flex items-center space-x-1"
                  aria-label={`Borrar ${service.name_service}`}
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
