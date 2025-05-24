import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import BlogForm from './BlogForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBlog({ onBlogAdded }) {
  const [loading, setLoading] = useState(false);

  const handleAddBlog = async (formData, imageFiles) => {
    setLoading(true);
    let uploadedUrls = [];

    try {
      if (!imageFiles || imageFiles.length === 0) {
        throw new Error('Se requieren imágenes para la nueva entrada de blog.');
      }
      uploadedUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file))
      );

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt || null,
        info: formData.info,
        date: formData.date,
        category: formData.category,
        image_urls: uploadedUrls,
      };

      const { data, error: insertError } = await supabase
        .from('blogs')
        .insert([blogData])
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

      console.log('Blog added:', data);
      if (onBlogAdded) {
        onBlogAdded(data);
      }
      toast.success('¡Entrada de blog agregada exitosamente!', {
        position: 'bottom-right',
        theme: 'light',
      });
      return data;
    } catch (err) {
      console.error('Error adding blog:', err);
      const friendlyError = `Error al agregar el blog: ${
        err.message || 'Ocurrió un error inesperado.'
      }`;
      toast.error(friendlyError, {
        position: 'bottom-right',
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
        Agregar Nueva Entrada de Blog
      </h2>
      <BlogForm
        onSubmit={handleAddBlog}
        isLoading={loading}
        submitButtonText="Agregar Blog"
      />
      <ToastContainer />
    </div>
  );
}
