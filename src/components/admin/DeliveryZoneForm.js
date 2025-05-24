import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Lista de provincias de Panamá (puedes obtenerla dinámicamente si prefieres)
const panamaProvinces = [
  'Bocas del Toro',
  'Chiriquí',
  'Coclé',
  'Colón',
  'Darién',
  'Herrera',
  'Los Santos',
  'Panamá',
  'Panamá Oeste',
  'Veraguas',
  'Guna Yala', // Comarcas
  'Emberá-Wounaan',
  'Ngäbe-Buglé',
];

export default function DeliveryZoneForm({
  initialZoneData = null, // Renombrado
  onSubmit,
  isLoading,
  submitButtonText = 'Guardar Zona', // Renombrado
}) {
  const [formData, setFormData] = useState({
    province: '',
    area: '',
    cost: '',
    estimated_time: '',
  });
  const [formError, setFormError] = useState('');

  // Efecto para llenar el formulario si recibimos initialZoneData (modo edición)
  useEffect(() => {
    if (initialZoneData) {
      setFormData({
        province: initialZoneData.province || '',
        area: initialZoneData.area || '',
        cost: initialZoneData.cost?.toString() || '', // Convertir a string para input
        estimated_time: initialZoneData.estimated_time || '',
      });
    } else {
      // Resetear para modo agregar
      setFormData({
        province: '',
        area: '',
        cost: '',
        estimated_time: '',
      });
    }
    setFormError(''); // Limpiar errores al cambiar data inicial
  }, [initialZoneData]);

  // Manejador para cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(''); // Limpiar error al empezar a escribir
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validación básica
    if (!formData.province || formData.cost === '') {
      setFormError(
        'Por favor, completa los campos obligatorios: Provincia y Costo.'
      );
      return;
    }
    const costValue = parseFloat(formData.cost);
    if (isNaN(costValue) || costValue < 0) {
      setFormError(
        'El costo debe ser un número válido y no puede ser negativo.'
      );
      return;
    }

    try {
      await onSubmit(formData); // Llama a la función del padre (add o update)
      // Resetear formulario SOLO si estamos en modo AGREGAR (no hay initialData)
      if (!initialZoneData) {
        setFormData({
          province: '',
          area: '',
          cost: '',
          estimated_time: '',
        });
      }
      setFormError('');
    } catch (error) {
      console.error('Error en submit desde DeliveryZoneForm:', error);
      // Mostrar el mensaje de error que viene de la lógica de add/update
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
      {/* Provincia (Requerido) - Usando un Select */}
      <div>
        <label
          htmlFor="province"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Provincia <span className="text-red-500">*</span>
        </label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2 bg-white"
        >
          <option
            value=""
            disabled
          >
            Selecciona una provincia
          </option>
          {panamaProvinces.sort().map((prov) => (
            <option
              key={prov}
              value={prov}
            >
              {prov}
            </option>
          ))}
        </select>
      </div>

      {/* Área/Distrito (Opcional) */}
      <div>
        <label
          htmlFor="area"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Área / Distrito (Opcional)
        </label>
        <input
          type="text"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Ej: San Miguelito, David Centro"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
        />
        <p className="mt-1 text-xs text-gray-500">
          Deja en blanco si aplica a toda la provincia.
        </p>
      </div>

      {/* Fila para Costo y Tiempo Estimado */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Costo (Requerido) */}
        <div>
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Costo de Envío (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
              min="0"
              step="0.01" // Permite decimales
              placeholder="0.00"
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
              aria-describedby="price-currency"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span
                className="text-gray-500 sm:text-sm"
                id="price-currency"
              >
                USD
              </span>
            </div>
          </div>
        </div>

        {/* Tiempo Estimado (Opcional) */}
        <div>
          <label
            htmlFor="estimated_time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tiempo Estimado (Opcional)
          </label>
          <input
            type="text"
            id="estimated_time"
            name="estimated_time"
            value={formData.estimated_time}
            onChange={handleChange}
            placeholder="Ej: 24-48 horas, Mismo día"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm p-2"
          />
        </div>
      </div>

      {/* Mensaje de Error General del Formulario */}
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
      <div className="pt-4 flex justify-end">
        {' '}
        {/* Alineado a la derecha */}
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition duration-150 ease-in-out ${
            isLoading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              {/* Spinner SVG (igual que antes) */}
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
