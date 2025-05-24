// src/components/admin/ServicesForm.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Configuración de validación de imagen (se mantiene)
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_IMAGES = 3;

export default function ServicesForm({
  initialData = null,
  onSubmit,
  isLoading,
  submitButtonText = 'Guardar Servicio',
}) {
  const [formData, setFormData] = useState({
    name_service: '',
    description: '',
    short_description: '',
    is_featured: false,
  });
  const [details, setDetails] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [imageError, setImageError] = useState('');
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef(null);

  // Efecto para llenar el formulario si recibimos initialData (modo edición)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name_service: initialData.name_service || '',
        description: initialData.description || '',
        short_description: initialData.short_description || '',
        is_featured: initialData.is_featured || false,
      });
      setDetails(initialData.details || []);
      const currentUrls = initialData.image_urls || [];
      setExistingImageUrls(currentUrls);
      setImagePreviews(currentUrls);
      setImageFiles([]);
      setCurrentDetail('');
    } else {
      // Resetear para modo 'Agregar Nuevo'
      setFormData({
        name_service: '',
        description: '',
        short_description: '',
        is_featured: false,
      });
      setDetails([]);
      setCurrentDetail('');
      setImageFiles([]);
      setImagePreviews([]);
      setExistingImageUrls([]);
    }
    setImageError('');
    setFormError('');
  }, [initialData]);

  // Manejador para cambios en inputs de texto, checkbox, etc.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormError('');
  };

  // --- Manejo de Detalles (Protocolos) ---
  const handleDetailChange = (e) => {
    setCurrentDetail(e.target.value);
  };

  const handleAddDetail = () => {
    if (currentDetail.trim()) {
      setDetails((prev) => [...prev, currentDetail.trim()]);
      setCurrentDetail('');
    }
  };

  const handleRemoveDetail = (indexToRemove) => {
    setDetails((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- Manejo de Imágenes Múltiples ---
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageError('');

    const currentTotalImages = imagePreviews.length;
    const availableSlots = MAX_IMAGES - currentTotalImages;

    if (files.length === 0) return;

    if (files.length > availableSlots) {
      setImageError(
        `Puedes subir ${
          availableSlots > 0
            ? `hasta ${availableSlots} imágenes más`
            : 'ninguna imagen más'
        } (límite de ${MAX_IMAGES}).`
      );
      // Limpiar selección si excede
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      // Validar tipo
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageError(`Archivo '${file.name}' tiene un tipo no permitido.`);
        // Limpiar selección si hay inválido
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      // Validar tamaño
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setImageError(
          `Archivo '${file.name}' excede el tamaño máximo de ${MAX_FILE_SIZE_MB}MB.`
        );
        // Limpiar selección si hay inválido
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    // Limpiar el input para permitir seleccionar los mismos archivos si se eliminan y se vuelven a añadir
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove, isExistingUrl) => {
    const urlToRemove = imagePreviews[indexToRemove];

    if (!isExistingUrl && urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove);
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));

    if (isExistingUrl) {
      setExistingImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
    } else {
      setImageFiles((prevFiles) => {
        const newFileIndexToRemove = indexToRemove - existingImageUrls.length;
        if (
          newFileIndexToRemove >= 0 &&
          newFileIndexToRemove < prevFiles.length
        ) {
          return prevFiles.filter((_, i) => i !== newFileIndexToRemove);
        }
        return prevFiles;
      });
    }
  };

  // Determina cuántas imágenes más se pueden subir
  const canUploadMore = imagePreviews.length < MAX_IMAGES;

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setImageError('');

    if (!formData.name_service) {
      setFormError('Por favor, completa el nombre del servicio.');
      return;
    }
    if (details.length === 0) {
      setFormError('Por favor, añade al menos un detalle o protocolo.');
      return;
    }
    if (imagePreviews.length === 0) {
      setFormError('Por favor, añade al menos una imagen.');
      return;
    }

    // Preparar datos para enviar
    const dataToSend = {
      ...formData,
      details: details,
    };

    // Determinar qué URLs existentes se deben eliminar
    const urlsToRemove =
      initialData?.image_urls?.filter(
        (url) => !existingImageUrls.includes(url)
      ) || [];

    try {
      // Pasamos los datos del formulario, los nuevos archivos, y las URLs a borrar
      await onSubmit(dataToSend, imageFiles, urlsToRemove);

      // Limpiar formulario solo si NO estamos editando (initialData es null)
      if (!initialData) {
        setFormData({
          name_service: '',
          description: '',
          short_description: '',
          is_featured: false,
        });
        setDetails([]);
        setCurrentDetail('');
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImageUrls([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
      setFormError('');
      setImageError('');
    } catch (error) {
      console.error('Error en submit desde ServicesForm:', error);
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
      {/* Nombre del Servicio (Requerido) */}
      <div>
        <label
          htmlFor="name_service"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre del Servicio <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name_service"
          name="name_service"
          value={formData.name_service}
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

      {/* Detalles / Protocolos (Requerido al menos 1) */}
      <div>
        <label
          htmlFor="currentDetail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Detalles / Protocolos <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="text"
            id="currentDetail"
            value={currentDetail}
            onChange={handleDetailChange}
            placeholder="Ej: 1. Limpieza inicial"
            className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
          <button
            type="button"
            onClick={handleAddDetail}
            className="px-3 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-md text-sm font-medium transition duration-150 flex items-center space-x-1"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Añadir</span>
          </button>
        </div>
        {details.length > 0 && (
          <ul className="mt-3 list-decimal list-inside space-y-1 pl-2 border border-gray-200 p-3 rounded-md bg-gray-50 max-h-40 overflow-y-auto">
            {details.map((detail, index) => (
              <li
                key={index}
                className="text-sm text-gray-800 flex justify-between items-center group"
              >
                <span>{detail}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  className="ml-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  aria-label={`Eliminar detalle ${index + 1}`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Añade los pasos o características importantes del servicio. Se
          requiere al menos uno.
        </p>
      </div>

      {/* Input para Imágenes (Múltiples, hasta 3) */}
      <div>
        <label
          htmlFor="imageFiles"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Imágenes (Hasta {MAX_IMAGES}) <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {imagePreviews.map((previewSrc, index) => {
            const isExisting = existingImageUrls.includes(previewSrc);
            return (
              <div
                key={index}
                className="relative group h-24 w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400 border"
              >
                <img
                  src={previewSrc}
                  alt={`Previsualización ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, isExisting)}
                  className="absolute top-1 right-1 bg-red-600 bg-opacity-70 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            );
          })}
          {/* Placeholder para subir más si hay espacio */}
          {canUploadMore && (
            <label
              htmlFor="imageFilesInput"
              className="relative flex flex-col items-center justify-center h-24 w-full rounded-md border-2 border-dashed border-gray-300 hover:border-brand-orange cursor-pointer bg-gray-50 text-gray-500 hover:text-brand-orange"
            >
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
              />
              <span className="text-xs mt-1">
                Añadir ({imagePreviews.length}/{MAX_IMAGES})
              </span>
              <input
                type="file"
                id="imageFilesInput"
                name="imageFiles"
                multiple
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          )}
        </div>
        {/* Mensaje de error de imagen */}
        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Se requiere al menos 1 imagen. Tamaño máximo: {MAX_FILE_SIZE_MB}MB.
          Tipos: JPG, PNG, GIF, WebP.
        </p>
      </div>

      {/* Servicio Destacado */}
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
          Marcar como servicio destacado
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
