import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeliveryZoneList({
  deliveryZones,
  onEdit,
  onDelete,
  isLoading, // Para mostrar spinner de carga inicial
  isOperating, // Para deshabilitar botones durante recarga/operación
}) {
  // Formatear costo a moneda
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '-';
    return `$${parseFloat(value).toFixed(2)}`;
  };

  // Variantes para la animación de la lista
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Animar cada item con un pequeño retraso
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }, // Animación al borrar
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-3 text-gray-600">Cargando zonas...</p>
      </div>
    );
  }

  if (!deliveryZones || deliveryZones.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700">
          No hay zonas de entrega
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Aún no has agregado ninguna zona de entrega. ¡Empieza agregando una!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Zonas de Entrega Registradas
      </h2>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Provincia
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Área / Distrito
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Costo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tiempo Estimado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white divide-y divide-gray-200"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {deliveryZones.map((zone) => (
                  <motion.tr
                    key={zone.id}
                    variants={itemVariants}
                    exit="exit" // Usar la variante de salida al eliminar
                    layout // Animar cambios de posición (layout)
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {zone.province}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {zone.area || (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      {formatCurrency(zone.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {zone.estimated_time || (
                        <span className="text-gray-400 italic">
                          No especificado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button
                        onClick={() => onEdit(zone)}
                        disabled={isOperating} // Deshabilitar si algo se está cargando/operando
                        className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button
                        onClick={() => onDelete(zone.id)}
                        disabled={isOperating} // Deshabilitar si algo se está cargando/operando
                        className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
                        title="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
