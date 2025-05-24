import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrashAlt,
  faImage,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

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

export default function BlogForm({
  initialData = null,
  onSubmit,
  isLoading,
  submitButtonText = 'Guardar Blog',
}) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: '',
    category: '',
  });
  const [info, setInfo] = useState([]);
  const [currentInfoItem, setCurrentInfoItem] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [originalImageUrls, setOriginalImageUrls] = useState([]);
  const [keptImageUrls, setKeptImageUrls] = useState([]);
  const [imageError, setImageError] = useState('');
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef(null);

  // Efecto para llenar el formulario (modo edición o reseteo)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        excerpt: initialData.excerpt || '',
        date: initialData.date || '',
        category: initialData.category || '',
      });
      setInfo(initialData.info || []);
      const currentUrls = initialData.image_urls || [];
      setImagePreviews(currentUrls);
      setOriginalImageUrls(currentUrls);
      setKeptImageUrls(currentUrls);
      setImageFiles([]);
      setCurrentInfoItem('');
    } else {
      setFormData({ title: '', excerpt: '', date: '', category: '' });
      setInfo([]);
      setCurrentInfoItem('');
      setImageFiles([]);
      setImagePreviews([]);
      setOriginalImageUrls([]);
      setKeptImageUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    setImageError('');
    setFormError('');
  }, [initialData]);

  // Manejador genérico para inputs de texto, fecha, etc.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  // --- Manejo de Info (Array de Texto) ---
  const handleInfoChange = (e) => {
    setCurrentInfoItem(e.target.value);
  };

  const handleAddInfoItem = () => {
    if (currentInfoItem.trim()) {
      setInfo((prev) => [...prev, currentInfoItem.trim()]);
      setCurrentInfoItem('');
    }
  };

  const handleRemoveInfoItem = (indexToRemove) => {
    setInfo((prev) => prev.filter((_, index) => index !== indexToRemove));
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
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const validFiles = [];
    const newPreviews = [];
    let validationError = false;

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageError(`Archivo '${file.name}' tiene un tipo no permitido.`);
        validationError = true;
        break;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setImageError(
          `Archivo '${file.name}' excede el tamaño máximo de ${MAX_FILE_SIZE_MB}MB.`
        );
        validationError = true;
        break;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    // Si hubo un error de validación en el bucle
    if (validationError) {
      // Limpiar previews temporales si se crearon antes del error
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Si todas son válidas, actualizar estado
    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    // Limpiar el input para permitir seleccionar los mismos archivos si se eliminan
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /*const handleRemoveImage = (indexToRemove) => {
    const urlToRemove = imagePreviews[indexToRemove];
    // Revocar URL si es un blob (imagen nueva no subida)
    if (urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove);
    }
    // Actualizar previews
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    // Determinar si era una URL existente o un archivo nuevo
    if (originalImageUrls.includes(urlToRemove)) {
      setKeptImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
    } else {
      const fileIndexToRemove = imageFiles.findIndex((file) => {
        const currentBlobPreviews = imagePreviews.filter((p) =>
          p.startsWith('blob:')
        );
        const originalBlobPreviews = imagePreviews
          .slice(originalImageUrls.length)
          .filter((p) => p.startsWith('blob:'));
        const blobIndex = originalBlobPreviews.indexOf(urlToRemove);
        return blobIndex !== -1 && blobIndex < imageFiles.length;
      });
      const relativeIndex = indexToRemove - keptImageUrls.length;
      if (relativeIndex >= 0 && relativeIndex < imageFiles.length) {
        setImageFiles((prevFiles) =>
          prevFiles.filter((_, i) => i !== relativeIndex)
        );
      } else {
        console.warn(
          'Could not reliably determine which file to remove for preview:',
          urlToRemove
        );
        // Como fallback, si solo queda un archivo nuevo, lo quitamos
        if (
          imageFiles.length === 1 &&
          imagePreviews.filter((p) => p.startsWith('blob:')).length === 0
        ) {
          setImageFiles([]);
        }
      }
    }
    setImageError('');
  };*/

  const handleRemoveImage = (indexToRemove) => {
    const currentImagePreviews = [...imagePreviews];
    const urlToRemove = currentImagePreviews[indexToRemove];

    // Revocar URL si es un blob (imagen nueva no subida)
    if (urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove);
    }

    // Actualizar previews primero
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));

    // Verificar si era una URL original
    if (originalImageUrls.includes(urlToRemove)) {
      setKeptImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
    } else {
      // Imagen nueva (blob)
      const newBlobPreviews = currentImagePreviews.filter((p) =>
        p.startsWith('blob:')
      );
      const removedBlobIndex = newBlobPreviews.indexOf(urlToRemove);

      if (removedBlobIndex !== -1) {
        setImageFiles((prevFiles) =>
          prevFiles.filter((_, i) => i !== removedBlobIndex)
        );
      } else {
        console.warn(
          'No se pudo encontrar el archivo correspondiente a:',
          urlToRemove
        );
      }
    }

    setImageError('');
  };

  // Determina cuántas imágenes más se pueden subir
  const canUploadMore = imagePreviews.length < MAX_IMAGES;

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setImageError('');

    // Validaciones básicas
    if (!formData.title.trim()) {
      setFormError('El título del blog es obligatorio.');
      return;
    }
    if (!formData.date) {
      setFormError('La fecha del blog es obligatoria.');
      return;
    }
    if (!formData.category.trim()) {
      setFormError('La categoría del blog es obligatoria.');
      return;
    }
    if (info.length === 0) {
      setFormError('Añade al menos un párrafo de información.');
      return;
    }
    if (imagePreviews.length === 0) {
      setFormError('Añade al menos una imagen.');
      return;
    }

    // Preparar datos para enviar
    const dataToSend = {
      ...formData,
      info: info,
    };

    const urlsToRemove = originalImageUrls.filter(
      (url) => !keptImageUrls.includes(url)
    );

    try {
      await onSubmit(dataToSend, imageFiles, urlsToRemove);

      if (!initialData) {
        setFormData({ title: '', excerpt: '', date: '', category: '' });
        setInfo([]);
        setCurrentInfoItem('');
        setImageFiles([]);
        setImagePreviews([]);
        setOriginalImageUrls([]);
        setKeptImageUrls([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setFormError('');
        setImageError('');
      }
    } catch (error) {
      console.error('Error en submit desde BlogForm:', error);
      setFormError(error.message || 'Ocurrió un error al guardar el blog.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200"
    >
      {/* Título del Blog (Requerido) */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Título del Blog <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
      </div>

      {/* Extracto (Opcional) */}
      <div>
        <label
          htmlFor="excerpt"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Extracto (Resumen corto, opcional)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          value={formData.excerpt}
          onChange={handleChange}
          maxLength={200}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
        <p className="mt-1 text-xs text-gray-500">
          Breve descripción para vistas previas (máx. 200 caracteres).
        </p>
      </div>

      {/* Fecha (Requerido) */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Fecha del Blog <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
      </div>

      {/* Categoría (Requerido) */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Categoría <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="Ej: Noticias, Tips, Eventos"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
      </div>

      {/* Info (Array de Texto, Requerido al menos 1) */}
      <div>
        <label
          htmlFor="currentInfoItem"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contenido del Blog (Párrafos) <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2 mt-1">
          <textarea
            id="currentInfoItem"
            value={currentInfoItem}
            onChange={handleInfoChange}
            placeholder="Escribe un párrafo del contenido aquí..."
            rows={3}
            className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
          <button
            type="button"
            onClick={handleAddInfoItem}
            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium transition duration-150 flex items-center space-x-1 self-end"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Añadir Párrafo</span>
          </button>
        </div>
        {info.length > 0 && (
          <ul className="mt-3 space-y-2 border border-gray-200 p-3 rounded-md bg-gray-50 max-h-60 overflow-y-auto">
            {info.map((item, index) => (
              <li
                key={index}
                className="text-sm text-gray-800 flex justify-between items-start group bg-white p-2 rounded border border-gray-100"
              >
                <p className="flex-grow mr-2 whitespace-pre-wrap">{item}</p>{' '}
                <button
                  type="button"
                  onClick={() => handleRemoveInfoItem(index)}
                  className="ml-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xs flex-shrink-0"
                  aria-label={`Eliminar párrafo ${index + 1}`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Añade el contenido principal del blog, párrafo por párrafo. Se
          requiere al menos uno.
        </p>
      </div>

      {/* Input para Imágenes (Múltiples, hasta MAX_IMAGES) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imágenes (Hasta {MAX_IMAGES}) <span className="text-red-500">*</span>
        </label>
        {/* Previews de Imágenes */}
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          {imagePreviews.map((previewSrc, index) => (
            <div
              key={index}
              className="relative group aspect-w-1 aspect-h-1"
            >
              <img
                src={previewSrc}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-md border border-gray-200"
                onError={(e) => (e.target.src = '/placeholder-image.png')}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity text-xs"
                aria-label={`Eliminar imagen ${index + 1}`}
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ))}
          {/* Botón/Input para añadir más imágenes */}
          {canUploadMore && (
            <label
              htmlFor="imageFiles"
              className={`relative flex flex-col items-center justify-center w-full h-full rounded-md border-2 border-dashed ${
                imageError ? 'border-red-400' : 'border-gray-300'
              } hover:border-orange-400 cursor-pointer bg-gray-50 p-4 text-center aspect-w-1 aspect-h-1`}
            >
              <FontAwesomeIcon
                icon={faImage}
                className="text-gray-400 text-3xl mb-2"
              />
              <span className="text-sm text-gray-500">Añadir Imagen</span>
              <span className="text-xs text-gray-400">
                (Max {MAX_FILE_SIZE_MB}MB)
              </span>
              <input
                id="imageFiles"
                name="imageFiles"
                type="file"
                multiple
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isLoading}
              />
            </label>
          )}
        </div>
        {imageError && (
          <p className="text-sm text-red-600 mt-1">{imageError}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Formatos aceptados: JPG, PNG, WEBP, GIF. Tamaño máximo:{' '}
          {MAX_FILE_SIZE_MB}MB por imagen. Se requiere al menos una.
        </p>
      </div>

      {/* Mensaje de error general del formulario */}
      {formError && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {formError}
        </p>
      )}

      {/* Botón de Envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isLoading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange'
          } transition duration-150`}
        >
          {isLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            />
          )}
          {isLoading ? 'Guardando...' : submitButtonText}
        </button>
      </div>
    </motion.form>
  );
}
