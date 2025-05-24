// src/components/admin/ProductForm.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Configuración de validación de imagen
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export default function ProductForm({
  initialData = null,
  onSubmit,
  isLoading,
  submitButtonText = 'Guardar Producto',
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    is_featured: false,
    image_url: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [formError, setFormError] = useState('');

  // Efecto para llenar el formulario si recibimos initialData (modo edición)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        short_description: initialData.short_description || '',
        price: initialData.price?.toString() || '',
        category: initialData.category || '',
        stock: initialData.stock?.toString() || '',
        sku: initialData.sku || '',
        is_featured: initialData.is_featured || false,
        image_url: initialData.image_url || null,
      });
      setImagePreview(initialData.image_url || null);
      setImageFile(null);
      setImageError('');
    } else {
      setFormData({
        name: '',
        description: '',
        short_description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
        is_featured: false,
        image_url: null,
      });
      setImageFile(null);
      setImagePreview(null);
      setImageError('');
      setFormError('');
    }
  }, [initialData]);

  // Manejador para cambios en inputs de texto, número, etc.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormError('');
  };

  // Manejador para el input de archivo (imagen)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');
    setImageFile(null);
    setImagePreview(formData.image_url);

    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageError(
          `Tipo de archivo no permitido. Aceptados: ${ACCEPTED_IMAGE_TYPES.join(
            ', '
          )}`
        );
        e.target.value = '';
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setImageError(
          `El archivo es demasiado grande. Máximo: ${MAX_FILE_SIZE_MB}MB`
        );
        e.target.value = '';
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || formData.price === '' || formData.stock === '') {
      setFormError(
        'Por favor, completa los campos obligatorios: Nombre, Precio y Stock.'
      );
      return;
    }
    if (parseFloat(formData.price) < 0 || parseInt(formData.stock, 10) < 0) {
      setFormError('El precio y el stock no pueden ser negativos.');
      return;
    }

    try {
      await onSubmit(formData, imageFile);
      if (!initialData) {
        setFormData({
          name: '',
          description: '',
          short_description: '',
          price: '',
          category: '',
          stock: '',
          sku: '',
          is_featured: false,
          image_url: null,
        });
        setImageFile(null);
        setImagePreview(null);
        const fileInput = document.getElementById('imageFile');
        if (fileInput) fileInput.value = '';
      }
      setImageError('');
      setFormError('');
    } catch (error) {
      console.error('Error en submit desde ProductForm:', error);
      setFormError(error.message || 'Ocurrió un error al guardar.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md"
    >
      {/* Nombre (Requerido) */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre del Producto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
      </div>

      {/* Descripción Corta */}
      <div>
        <label
          htmlFor="short_description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descripción Corta (Opcional)
        </label>
        <input
          type="text"
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          maxLength={150}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
        <p className="mt-1 text-xs text-gray-500">
          Ideal para tarjetas o listas (máx. 150 caracteres).
        </p>
      </div>

      {/* Descripción Larga */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descripción Detallada (Opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
      </div>

      {/* Fila para Precio y Stock */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Precio */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Precio (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>
        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
        </div>
      </div>

      {/* Fila para Categoría y SKU */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoría (Opcional)
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ej: Cámaras"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
        </div>
        {/* SKU */}
        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            SKU (Código único, opcional)
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Ej: CAM-IP-001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
        </div>
      </div>

      {/* Input para Imagen */}
      <div>
        <label
          htmlFor="imageFile"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Imagen Principal{' '}
          {initialData ? '(Opcional: Cambiar imagen)' : '(Opcional)'}
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {/* Previsualización */}
          <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Previsualización"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg
                className="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {' '}
                {/* Placeholder Icon */}
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </div>
        {/* Mensaje de error de imagen */}
        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Tamaño máximo: {MAX_FILE_SIZE_MB}MB. Tipos aceptados: JPG, PNG, GIF,
          WebP.
        </p>
      </div>

      {/* Producto Destacado */}
      <div className="flex items-center">
        <input
          id="is_featured"
          name="is_featured"
          type="checkbox"
          checked={formData.is_featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-brand-orange"
        />
        <label
          htmlFor="is_featured"
          className="ml-2 block text-sm text-gray-900"
        >
          Marcar como producto destacado
        </label>
      </div>

      {/* Mensaje de Error General */}
      {formError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm"
        >
          {formError}
        </motion.div>
      )}

      {/* Botón de Envío */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition duration-150 ease-in-out ${
            isLoading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Guardando...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </motion.form>
  );
}
