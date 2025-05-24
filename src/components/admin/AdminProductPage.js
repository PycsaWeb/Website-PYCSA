// src/components/admin/AdminProductPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../SupabaseClient';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import EditProductModal from './EditProductModal';
import { deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    imageUrl: null,
  });

  // Cargar productos al montar
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos. Intenta recargar.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Manejador cuando se agrega un nuevo producto (desde AddProduct)
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    // fetchProducts(); //Recargar toda la lista si prefieres consistencia total
  };

  // Manejador cuando se actualiza un producto (desde EditProductModal)
  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  // Abrir el modal de edición
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setError('');
  };

  // Cerrar el modal de edición
  const handleCloseModal = () => {
    setEditingProduct(null);
  };

  // Iniciar proceso de borrado (pide confirmación)
  const handleDeleteClick = (productId, imageUrl) => {
    setDeleteConfirmation({ id: productId, imageUrl: imageUrl });
    setError('');
  };

  // Confirmar y ejecutar borrado
  const confirmDelete = async () => {
    if (!deleteConfirmation.id) return;

    const { id: productId, imageUrl } = deleteConfirmation;
    setLoading(true);
    setError('');

    try {
      // 1. Borrar de la base de datos
      const { error: dbError } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (dbError) throw dbError;

      // 2. Si se borró de la DB, borrar imagen del Storage (si existe)
      if (imageUrl) {
        await deleteImage(imageUrl).catch((storageError) => {
          console.error(
            `Producto ${productId} borrado de DB, pero hubo error borrando imagen ${imageUrl}:`,
            storageError
          );
        });
      }

      // 3. Actualizar estado local
      setProducts(products.filter((p) => p.id !== productId));
      console.log(`Producto ${productId} borrado.`);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error al borrar el producto.');
    } finally {
      setLoading(false);
      setDeleteConfirmation({ id: null, imageUrl: null });
    }
  };

  // Cancelar borrado
  const cancelDelete = () => {
    setDeleteConfirmation({ id: null, imageUrl: null });
  };

  return (
    <div className="p-4 md:p-8">
      {/* Mensaje de error general del Dashboard */}
      {error && !editingProduct && !deleteConfirmation.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {error}
          <button
            onClick={fetchProducts}
            className="ml-4 font-semibold text-red-800 underline"
          >
            Reintentar
          </button>
        </motion.div>
      )}

      {/* Sección para Agregar Producto */}
      <AddProduct onProductAdded={handleProductAdded} />

      <hr className="my-8 md:my-12 border-t border-gray-300" />

      {/* Sección para Listar/Editar/Borrar Productos */}
      <ProductList
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        isLoading={loading && products.length > 0}
      />

      {/* Modal de Edición */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={handleCloseModal}
          onProductUpdated={handleProductUpdated}
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
