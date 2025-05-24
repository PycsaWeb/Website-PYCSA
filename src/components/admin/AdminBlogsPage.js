import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../SupabaseClient';
import AddBlog from './AddBlog';
import BlogsList from './BlogsList';
import EditBlogModal from './EditBlogModal';
import { deleteImage } from '../../supabaseUtils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    imageUrls: [],
  });

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(`Error al cargar blogs: ${err.message}`);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleBlogAdded = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleBlogUpdated = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
    setEditingBlog(null);
  };

  const handleDeleteBlog = (blogId, imageUrls) => {
    setDeleteConfirmation({ id: blogId, imageUrls: imageUrls || [] });
    setError('');
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.id) return;

    const { id: blogId, imageUrls } = deleteConfirmation;
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (dbError) {
        throw dbError;
      }

      if (imageUrls && imageUrls.length > 0) {
        console.log(
          `Borrando ${imageUrls.length} imágenes del Storage para el blog ${blogId}...`
        );
        const deletePromises = imageUrls.map((url) =>
          deleteImage(url).catch((e) => {
            console.error(`Error al borrar imagen ${url} del Storage:`, e);
          })
        );
        await Promise.allSettled(deletePromises);
      }

      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      console.log(
        `Blog ${blogId} y sus imágenes asociadas borrados exitosamente.`
      );
    } catch (error) {
      console.error('Error completo durante el proceso de borrado:', error);
      setError(`Error al borrar el blog: ${error.message}`);
      fetchBlogs();
    } finally {
      setLoading(false);
      setDeleteConfirmation({ id: null, imageUrls: [] });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ id: null, imageUrls: [] });
  };

  const handleEditClick = (blogToEdit) => {
    setEditingBlog(blogToEdit);
  };

  const handleCloseModal = () => {
    setEditingBlog(null);
  };

  return (
    <div className="p-4 md:p-8">
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {error}
          <button
            onClick={fetchBlogs}
            className="ml-4 font-semibold text-red-800 underline"
          >
            Reintentar
          </button>
        </motion.div>
      )}
      <AddBlog onBlogAdded={handleBlogAdded} />
      <hr className="my-8 md:my-12 border-t border-gray-300" />
      <BlogsList
        blogs={blogs}
        onEdit={handleEditClick}
        onDelete={handleDeleteBlog}
        isLoading={loading && blogs.length === 0}
      />
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={handleCloseModal}
          onBlogUpdated={handleBlogUpdated}
        />
      )}
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
                ¿Estás seguro de que quieres borrar esta entrada de blog? Esta
                acción no se puede deshacer.
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
