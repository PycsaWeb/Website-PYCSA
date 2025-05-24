// src/components/admin/EditProductModal.js
import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import ProductForm from './ProductForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditProductModal({
  product,
  onClose,
  onProductUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateProduct = async (formData, imageFile) => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl = product.image_url;
      let oldImageUrlToDelete = null;

      // 1. Si se seleccionó un NUEVO archivo de imagen
      if (imageFile) {
        if (product.image_url) {
          oldImageUrlToDelete = product.image_url;
        }
        imageUrl = await uploadImage(imageFile);
      }

      // 2. Preparar datos para actualizar
      const updatedData = {
        name: formData.name,
        description: formData.description || null,
        short_description: formData.short_description || null,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        category: formData.category || null,
        stock: parseInt(formData.stock, 10),
        sku: formData.sku || null,
        is_featured: formData.is_featured,
      };

      // 3. Actualizar en la base de datos
      const { data, error: updateError } = await supabase
        .from('products')
        .update(updatedData)
        .eq('id', product.id)
        .select()
        .single();

      if (updateError) {
        if (imageFile && imageUrl && imageUrl !== product.image_url) {
          console.warn(
            'Error al actualizar DB después de subir nueva imagen. Intentando borrar la imagen NUEVA:',
            imageUrl
          );
          await deleteImage(imageUrl).catch((e) =>
            console.error(
              'No se pudo borrar la imagen nueva tras error de update:',
              e
            )
          );
        }
        throw updateError;
      }

      // 4. Si la actualización fue exitosa y subimos una nueva imagen, borrar la vieja
      if (oldImageUrlToDelete) {
        console.log(
          'Actualización de DB exitosa. Intentando borrar imagen antigua:',
          oldImageUrlToDelete
        );
        await deleteImage(oldImageUrlToDelete).catch((e) => {
          console.error('No se pudo borrar la imagen antigua del storage:', e);
        });
      }

      console.log('Product updated:', data);
      if (onProductUpdated) {
        onProductUpdated(data);
      }
      onClose();
    } catch (err) {
      console.error('Error updating product:', err);
      let friendlyError = `Error al actualizar el producto: ${err.message}`;
      if (err.code === '23505' && err.message.includes('sku')) {
        friendlyError = `Error: El SKU '${formData.sku}' ya existe. Por favor, usa uno diferente.`;
      }
      setError(friendlyError);
      throw new Error(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  // Backdrop Variants para Framer Motion
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Modal Variants para Framer Motion
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
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Editar Producto: {product.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
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
            {error && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"
              >
                {error}
              </motion.div>
            )}
            <ProductForm
              initialData={product}
              onSubmit={handleUpdateProduct}
              isLoading={loading}
              submitButtonText="Guardar Cambios"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
