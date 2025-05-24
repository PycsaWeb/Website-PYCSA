import React, { useEffect, useState } from 'react';
import FadeInSection from '../FadeInSection';
import { supabase } from '../../SupabaseClient';

export default function QuoteForm({
  formRef,
  formData,
  handleInputChange,
  acceptedTerms,
  handleCheckboxChange,
  isFormValid,
  enviarCorreo,
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices() {
      const { data: services, error } = await supabase
        .from('services')
        .select('*');

      if (error) {
        console.error('Error al obtener los servicios:', error);
      } else {
        setServices(services);
      }
    }

    getServices();
  }, []);

  return (
    <div className="lg:w-7/12">
      <div className="bg-gray-50 p-6 sm:p-8 md:p-10 border-t-4 border-b-4 border-brand-orange rounded-lg shadow-lg">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
              SOLICITA
            </span>{' '}
            TU COTIZACIÓN
          </h2>
        </FadeInSection>
        <form
          id="contact-form-section"
          ref={formRef}
          onSubmit={enviarCorreo}
          className="space-y-5"
        >
          <FadeInSection>
            <div>
              <label className="sr-only">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre Completo *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out"
              />
            </div>
          </FadeInSection>
          <FadeInSection>
            <div>
              <label
                htmlFor="correo"
                className="sr-only"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                id="correo"
                value={formData.correo}
                onChange={handleInputChange}
                placeholder="Correo Electrónico *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out"
              />
            </div>
          </FadeInSection>
          <FadeInSection>
            <div>
              <label
                htmlFor="telefono"
                className="sr-only"
              >
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Teléfono *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out"
              />
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FadeInSection>
              <div>
                <label
                  htmlFor="provincia"
                  className="sr-only"
                >
                  Provincia
                </label>
                <input
                  type="text"
                  name="provincia"
                  id="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  placeholder="Provincia *"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out"
                />
              </div>
            </FadeInSection>
            <FadeInSection>
              <div>
                <label
                  htmlFor="distrito"
                  className="sr-only"
                >
                  Distrito
                </label>
                <input
                  type="text"
                  name="distrito"
                  id="distrito"
                  value={formData.distrito}
                  onChange={handleInputChange}
                  placeholder="Distrito *"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out"
                />
              </div>
            </FadeInSection>
          </div>
          <FadeInSection>
            <div>
              <label
                htmlFor="tipoServicio"
                className="sr-only"
              >
                Tipo de Servicio
              </label>
              <select
                name="tipoServicio"
                id="tipoServicio"
                value={formData.tipoServicio}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out text-gray-700"
              >
                <option value="">Selecciona un servicio *</option>
                {services.map((service, index) => (
                  <option
                    key={index}
                    value={service.name_service}
                  >
                    {service.name_service}
                  </option>
                ))}
              </select>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div>
              <label
                htmlFor="detalles"
                className="sr-only"
              >
                Detalles Adicionales
              </label>
              <textarea
                name="detalles"
                id="detalles"
                rows="4"
                value={formData.detalles}
                onChange={handleInputChange}
                placeholder="Detalles adicionales (Opcional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-200 ease-in-out resize-none"
              ></textarea>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={acceptedTerms}
                onChange={handleCheckboxChange}
                required
                className="h-5 w-5 text-brand-orange accent-brand-orange border-gray-300 rounded focus:ring-brand-orange"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600"
              >
                {' '}
                He leído y acepto las{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:underline font-medium"
                >
                  Políticas de Privacidad
                </a>{' '}
                *
              </label>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3 px-6 rounded-md text-white font-semibold text-lg transition duration-300 ease-in-out ${
                  isFormValid
                    ? 'bg-brand-orange hover:bg-brand-orange-dark shadow-md transform hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed opacity-70'
                }`}
              >
                ENVIAR COTIZACIÓN
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
          </FadeInSection>
        </form>
      </div>
    </div>
  );
}
