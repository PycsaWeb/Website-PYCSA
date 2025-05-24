import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import BlogForm from './BlogForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_IMAGES = 3;

export default function EditBlogModal({ blog, onClose, onBlogUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateBlog = async (formData, newImageFiles, urlsToRemove) => {
    setLoading(true);
    setError(null);

    let uploadedNewUrls = [];
    let finalImageUrls = [...(blog.image_urls || [])];

    try {
      if (newImageFiles && newImageFiles.length > 0) {
        uploadedNewUrls = await Promise.all(
          newImageFiles.map((file) => uploadImage(file))
        );
      }

      finalImageUrls = finalImageUrls.filter(
        (url) => !urlsToRemove.includes(url)
      );
      finalImageUrls = [...finalImageUrls, ...uploadedNewUrls];
      finalImageUrls = finalImageUrls.slice(0, MAX_IMAGES);

      const updatedData = {
        title: formData.title,
        excerpt: formData.excerpt || null,
        info: formData.info,
        date: formData.date,
        category: formData.category,
        image_urls: finalImageUrls,
      };

      const { data, error: updateError } = await supabase
        .from('blogs')
        .update(updatedData)
        .eq('id', blog.id)
        .select()
        .single();

      if (updateError) {
        if (uploadedNewUrls.length > 0) {
          console.warn(
            'Error al actualizar DB después de subir nuevas imágenes. Intentando borrar las imágenes NUEVAS:',
            uploadedNewUrls
          );
          await Promise.allSettled(
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
        await Promise.allSettled(
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

      console.log('Blog updated:', data);
      if (onBlogUpdated) {
        onBlogUpdated(data);
      }
      onClose();
    } catch (err) {
      console.error('Error updating blog:', err);
      let friendlyError = `Error al actualizar el blog: ${err.message}`;
      setError(friendlyError);
      throw new Error(friendlyError);
    } finally {
      setLoading(false);
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
              Editar Blog: {blog.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
              disabled={loading}
            >
              {/* Icono de cierre SVG sin cambios */}
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
            {/* Mostrar error de actualización aquí */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <BlogForm
              initialData={blog}
              onSubmit={handleUpdateBlog}
              isLoading={loading}
              submitButtonText="Guardar Cambios"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
