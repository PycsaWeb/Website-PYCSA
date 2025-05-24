// src/components/admin/EditServiceModal.js
import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import ServicesForm from './ServicesForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditServiceModal({
  service,
  onClose,
  onServiceUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateService = async (formData, newImageFiles, urlsToRemove) => {
    setLoading(true);
    setError(null);

    let uploadedNewUrls = [];
    let finalImageUrls = [...(service.image_urls || [])];

    try {
      // 1. Subir las nuevas imágenes seleccionadas
      if (newImageFiles && newImageFiles.length > 0) {
        uploadedNewUrls = await Promise.all(
          newImageFiles.map((file) => uploadImage(file))
        );
      }

      // 2. Calcular el array final de URLs
      finalImageUrls = finalImageUrls.filter(
        (url) => !urlsToRemove.includes(url)
      );
      // Añadir las nuevas subidas
      finalImageUrls = [...finalImageUrls, ...uploadedNewUrls];
      finalImageUrls = finalImageUrls.slice(0, MAX_IMAGES);

      // 3. Preparar datos para actualizar
      const updatedData = {
        name_service: formData.name_service,
        description: formData.description || null,
        short_description: formData.short_description || null,
        details: formData.details,
        image_urls: finalImageUrls,
        is_featured: formData.is_featured,
      };

      // 4. Actualizar en la base de datos
      const { data, error: updateError } = await supabase
        .from('services')
        .update(updatedData)
        .eq('id', service.id)
        .select()
        .single();

      if (updateError) {
        if (uploadedNewUrls.length > 0) {
          console.warn(
            'Error al actualizar DB después de subir nuevas imágenes. Intentando borrar las imágenes NUEVAS:',
            uploadedNewUrls
          );
          await Promise.all(
            uploadedNewUrls.map((url) =>
              deleteImage(url).catch((e) =>
                console.error(`No se pudo borrar imagen nueva ${url}:`, e)
              )
            )
          );
        }
        throw updateError;
      }

      if (urlsToRemove.length > 0) {
        console.log(
          'Actualización de DB exitosa. Borrando imágenes antiguas del Storage:',
          urlsToRemove
        );
        await Promise.all(
          urlsToRemove.map((url) =>
            deleteImage(url).catch((e) =>
              console.error(
                `No se pudo borrar imagen antigua ${url} del storage:`,
                e
              )
            )
          )
        );
      }

      console.log('Service updated:', data);
      if (onServiceUpdated) {
        onServiceUpdated(data);
      }
      onClose();
    } catch (err) {
      console.error('Error updating service:', err);
      let friendlyError = `Error al actualizar el servicio: ${err.message}`;
      setError(friendlyError);
      // return Promise.reject(new Error(friendlyError));
    } finally {
      setLoading(false);
    }
    if (error) {
      throw new Error(error);
    }
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
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
        key="backdrop"
        className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          className="bg-gray-100 rounded-lg shadow-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Editar Servicio: {service.name_service}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              {/* Icono de cierre */}
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
            <ServicesForm
              initialData={service}
              onSubmit={handleUpdateService}
              isLoading={loading}
              submitButtonText="Guardar Cambios"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
const MAX_IMAGES = 3;
