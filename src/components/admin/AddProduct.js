// src/components/admin/AddProduct.js
import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import ProductForm from './ProductForm';
import { uploadImage, deleteImage } from '../../supabaseUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct({ onProductAdded }) {
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (formData, imageFile) => {
    setLoading(true);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
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

      const { data, error: insertError } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (insertError) {
        if (imageUrl) {
          console.warn(
            'Error al insertar en DB después de subir imagen. Intentando borrar imagen:',
            imageUrl
          );
          await deleteImage(imageUrl).catch((e) =>
            console.error(
              'No se pudo borrar imagen después de error de inserción:',
              e
            )
          );
        }
        throw insertError;
      }

      console.log('Product added:', data);
      if (onProductAdded) {
        onProductAdded(data);
      }
      toast.success('¡Producto agregado exitosamente!', {
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
      console.error('Error adding product:', err);
      let friendlyError = `Error al agregar el producto: ${err.message}`;
      if (err.code === '23505' && err.message.includes('sku')) {
        friendlyError = `Error: El SKU '${formData.sku}' ya existe. Por favor, usa uno diferente.`;
      }
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Agregar Nuevo Producto
      </h2>
      <ProductForm
        onSubmit={handleAddProduct}
        isLoading={loading}
        submitButtonText="Agregar Producto"
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
