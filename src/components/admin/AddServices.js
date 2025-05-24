// src/components/admin/AddServices.js
import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import ServicesForm from './ServicesForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddServices({ onServicesAdded }) {
  const [loading, setLoading] = useState(false);

  const handleAddServices = async (formData, imageFiles) => {
    setLoading(true);
    let uploadedUrls = [];

    try {
      if (!imageFiles || imageFiles.length === 0) {
        throw new Error('Se requieren imágenes para el nuevo servicio.');
      }
      uploadedUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file))
      );

      const servicesData = {
        name_service: formData.name_service,
        description: formData.description || null,
        short_description: formData.short_description || null,
        details: formData.details,
        image_urls: uploadedUrls,
        is_featured: formData.is_featured,
      };

      const { data, error: insertError } = await supabase
        .from('services')
        .insert([servicesData])
        .select()
        .single();

      if (insertError) {
        if (uploadedUrls.length > 0) {
          console.warn(
            'Error al insertar en DB después de subir imágenes. Intentando borrar imágenes:',
            uploadedUrls
          );
          await Promise.allSettled(
            uploadedUrls.map((url) =>
              deleteImage(url).catch((e) =>
                console.error(`No se pudo borrar imagen ${url}:`, e)
              )
            )
          );
        }
        throw insertError;
      }

      console.log('Service added:', data);
      if (onServicesAdded) {
        onServicesAdded(data);
      }
      toast.success('¡Servicio agregado exitosamente!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      console.error('Error adding service:', err);
      const friendlyError = `Error al agregar el servicio: ${
        err.message || 'Ocurrió un error inesperado.'
      }`;
      toast.error(friendlyError, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      throw new Error(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Agregar Nuevo Servicio
      </h2>
      <ServicesForm
        onSubmit={handleAddServices}
        isLoading={loading}
        submitButtonText="Agregar Servicio"
        onError={(errorMessage) => console.log('Error en form:', errorMessage)}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
