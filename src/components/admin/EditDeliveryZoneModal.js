import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import DeliveryZoneForm from './DeliveryZoneForm';
import { motion, AnimatePresence } from 'framer-motion';
//import { toast } from 'react-toastify';

export default function EditDeliveryZoneModal({
  zone,
  onClose,
  onDeliveryZoneUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateDeliveryZone = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        province: formData.province,
        area: formData.area || null,
        cost: parseFloat(formData.cost),
        estimated_time: formData.estimated_time || null,
      };

      // Actualizar en la base de datos
      const { data, error: updateError } = await supabase
        .from('delivery_zones')
        .update(updatedData)
        .eq('id', zone.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      console.log('Delivery Zone updated:', data);
      if (onDeliveryZoneUpdated) {
        onDeliveryZoneUpdated(data);
      }
      // toast.success('¡Zona actualizada!');
      onClose();
    } catch (err) {
      console.error('Error updating delivery zone:', err);
      const friendlyError = `Error al actualizar la zona: ${err.message}`;
      setError(friendlyError);
      // toast.error(friendlyError);
      throw new Error(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: '-50px', opacity: 0 },
    visible: {
      y: '0',
      opacity: 1,
      transition: { delay: 0.1, type: 'spring', stiffness: 100 },
    },
    exit: { y: '50px', opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop-edit"
        className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          key="modal-edit"
          className="bg-gray-50 rounded-lg shadow-xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Editar Zona: {zone.province} {zone.area ? `- ${zone.area}` : ''}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              {/* Icono SVG de cierre (igual que antes) */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 md:p-8 overflow-y-auto flex-grow">
            {/* Mensaje de error específico del modal */}
            {error && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"
              >
                {error}
              </motion.div>
            )}
            <DeliveryZoneForm
              initialZoneData={zone}
              onSubmit={handleUpdateDeliveryZone}
              isLoading={loading}
              submitButtonText="Guardar Cambios"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
