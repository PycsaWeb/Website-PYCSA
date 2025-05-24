import React, { useEffect, useState } from 'react';
import FadeInSection from '../FadeInSection';
import { supabase } from '../../SupabaseClient';

export default function ServicesList({ openModal }) {
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
    <section
      id="servicios"
      className="py-12 md:py-20 bg-gray-100 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 max-w-screen-xl">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
            <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
              Nuestros
            </span>{' '}
            Servicios
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <FadeInSection key={index}>
              <div
                className="relative block w-full h-96 rounded-xl overflow-hidden shadow-lg
                           transform transition-transform duration-500 ease-in-out hover:-translate-y-2
                           group cursor-pointer"
                aria-label={`Leer más sobre ${service.name_service}`}
                onClick={() => openModal(service)}
              >
                <img
                  src={service.image_urls[0]}
                  alt={service.name_service}
                  className="absolute inset-0 w-full h-full object-cover object-top
                                     transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-black opacity-20
                                     transition-opacity duration-500 ease-in-out group-hover:opacity-30"
                ></div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                  <h3 className="text-2xl font-bold mb-2 text-brand-orange leading-tight">
                    {service.name_service}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {service.short_description}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
