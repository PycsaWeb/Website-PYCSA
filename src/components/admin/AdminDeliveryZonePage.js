import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../SupabaseClient';
import AddDeliveryZone from './AddDeliveryZone';
import DeliveryZoneList from './DeliveryZoneList';
import EditDeliveryZoneModal from './EditDeliveryZoneModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDeliveryZonePage() {
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingZone, setEditingZone] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const fetchDeliveryZones = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('delivery_zones')
        .select('*')
        .order('province', { ascending: true })
        .order('area', { ascending: true });

      if (fetchError) throw fetchError;
      setDeliveryZones(data || []);
    } catch (err) {
      console.error('Error fetching delivery zones:', err);
      setError('No se pudieron cargar las zonas de entrega. Intenta recargar.');
      toast.error('Error al cargar las zonas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveryZones();
  }, [fetchDeliveryZones]);

  const handleDeliveryZoneAdded = (newZone) => {
    // setDeliveryZones((prevZones) => [newZone, ...prevZones]); // Añadir al principio
    fetchDeliveryZones();
    toast.success('¡Zona de entrega agregada exitosamente!');
  };

  const handleDeliveryZoneUpdated = (updatedZone) => {
    setDeliveryZones((prevZones) =>
      prevZones.map((z) => (z.id === updatedZone.id ? updatedZone : z))
    );
    setEditingZone(null);
    toast.success('¡Zona de entrega actualizada exitosamente!');
  };

  // Abrir el modal de edición
  const handleEditClick = (zone) => {
    setEditingZone(zone);
    setError('');
  };

  // Cerrar el modal de edición
  const handleCloseModal = () => {
    setEditingZone(null);
  };

  // Iniciar proceso de borrado (pide confirmación)
  const handleDeleteClick = (zoneId) => {
    setDeleteConfirmationId(zoneId);
    setError('');
  };

  // Confirmar y ejecutar borrado
  const confirmDelete = async () => {
    if (!deleteConfirmationId) return;

    const zoneId = deleteConfirmationId;
    setLoading(true);
    toast.info('Borrando zona...', { autoClose: 1500 });

    try {
      const { error: dbError } = await supabase
        .from('delivery_zones')
        .delete()
        .eq('id', zoneId);

      if (dbError) throw dbError;

      setDeliveryZones(deliveryZones.filter((z) => z.id !== zoneId));
      console.log(`Zona de entrega ${zoneId} borrada.`);
      toast.success(`Zona de entrega ${zoneId} borrada.`);
    } catch (err) {
      console.error('Error deleting delivery zone:', err);
      setError('Error al borrar la zona de entrega.');
      toast.error(`Error al borrar la zona: ${err.message}`);
    } finally {
      setLoading(false);
      setDeleteConfirmationId(null);
    }
  };

  // Cancelar borrado
  const cancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Gestionar Zonas de Entrega
      </h1>

      {/* Mensaje de error general */}
      {error && !editingZone && !deleteConfirmationId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {error}
          <button
            onClick={fetchDeliveryZones}
            className="ml-4 font-semibold text-red-800 underline"
          >
            Reintentar
          </button>
        </motion.div>
      )}

      {/* Sección para Agregar Zona */}
      <AddDeliveryZone onDeliveryZoneAdded={handleDeliveryZoneAdded} />

      <hr className="my-8 md:my-12 border-t border-gray-300" />

      {/* Sección para Listar/Editar/Borrar Zonas */}
      <DeliveryZoneList
        deliveryZones={deliveryZones}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        isLoading={loading && !deliveryZones.length}
        isOperating={loading}
      />

      {/* Modal de Edición */}
      {editingZone && (
        <EditDeliveryZoneModal
          zone={editingZone}
          onClose={handleCloseModal}
          onDeliveryZoneUpdated={handleDeliveryZoneUpdated}
        />
      )}

      {/* Modal/Confirmación de Borrado */}
      <AnimatePresence>
        {deleteConfirmationId && (
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
                ¿Estás seguro de que quieres borrar esta zona de entrega? Esta
                acción no se puede deshacer.
              </p>
              {/* {error && <p className="text-sm text-red-600 mb-4">{error}</p>} */}
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
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
