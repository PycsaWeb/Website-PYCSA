//src/components/admin/AdminServicesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../SupabaseClient';
import AddServices from './AddServices';
import ServicesList from './ServicesList';
import EditServiceModal from './EditServiceModal';
import { deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    imageUrl: null,
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(`Error al cargar servicios: ${err.message}`);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleServiceAdded = (newService) => {
    setServices((prev) => [newService, ...prev]);
  };

  // Callback cuando un servicio se actualiza
  const handleServiceUpdated = (updatedService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    setEditingService(null);
  };

  const handleDeleteService = (serviceId, imageUrls) => {
    setDeleteConfirmation({ id: serviceId, imageUrls: imageUrls });
    setError('');
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.id) return;

    const { id: serviceId, imageUrls } = deleteConfirmation;
    setLoading(true);
    setError('');

    try {
      // 1. Borrar registro de la base de datos
      const { error: dbError } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (dbError) {
        throw dbError;
      }

      // 2. Si la DB se borró bien, borrar imágenes del Storage
      if (imageUrls && imageUrls.length > 0) {
        console.log(
          `Borrando ${imageUrls.length} imágenes del Storage para el servicio ${serviceId}...`
        );
        const deletePromises = imageUrls.map((url) =>
          deleteImage(url).catch((e) => {
            console.error(`Error al borrar imagen ${url} del Storage:`, e);
          })
        );
        await Promise.all(deletePromises);
      }

      // 3. Actualizar el estado local para quitar el servicio de la lista
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
      console.log(
        `Servicio ${serviceId} y sus imágenes asociadas borrados exitosamente.`
      );
    } catch (error) {
      console.error('Error completo durante el proceso de borrado:', error);
      setError(`Error al borrar el servicio: ${error.message}`);
      fetchServices();
    } finally {
      setLoading(false);
      setDeleteConfirmation({ id: null, imageUrl: null });
    }
  };

  // Cancelar borrado
  const cancelDelete = () => {
    setDeleteConfirmation({ id: null, imageUrls: null });
  };

  // Abrir modal de edición
  const handleEditClick = (serviceToEdit) => {
    setEditingService(serviceToEdit);
  };

  // Cerrar modal de edición
  const handleCloseModal = () => {
    setEditingService(null);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Mostrar error general de carga */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {error}
          <button
            onClick={fetchServices}
            className="ml-4 font-semibold text-red-800 underline"
          >
            Reintentar
          </button>
        </motion.div>
      )}

      {/* Sección para agregar */}
      <AddServices onServicesAdded={handleServiceAdded} />

      <hr className="my-8 md:my-12 border-t border-gray-300" />

      {/* Sección para listar y gestionar */}
      <ServicesList
        services={services}
        onEdit={handleEditClick} // Pasa la función para abrir el modal
        onDelete={handleDeleteService} // Pasa la función de borrado
        isLoading={loading && services.length === 0} // Mostrar 'cargando' inicial
      />

      {/* Modal de Edición (condicional) */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={handleCloseModal} // Pasa la función para cerrar
          onServiceUpdated={handleServiceUpdated} // Pasa la función de actualización
        />
      )}

      {/* Modal/Confirmación de Borrado */}
      <AnimatePresence>
        {deleteConfirmation.id && (
          <motion.div
            key="delete-confirm-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="delete-confirm-modal"
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Confirmar Borrado
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                ¿Estás seguro de que quieres borrar este producto? Esta acción
                no se puede deshacer.
              </p>
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  disabled={loading}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                    loading
                      ? 'bg-red-300 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  } disabled:opacity-50 flex items-center`}
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {loading ? 'Borrando...' : 'Borrar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
