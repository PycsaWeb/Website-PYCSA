import React from 'react';
import FadeInSection from '../FadeInSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faBuilding,
  faEnvelope,
  faPhone,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const mapEmbedUrl =
  'https://maps.google.com/maps?width=600&height=400&hl=en&q=Panama%20City&t=&z=14&ie=UTF8&iwloc=B&output=embed'; // Reemplaza con tu URL de embed
const mapLinkUrl = 'https://maps.app.goo.gl/HQjrX2XmPQnc3Ly96';

export default function ContactInfo() {
  return (
    <section
      id="contacto"
      className="bg-gray-50 py-16 md:py-24 px-4 md:px-[0]"
    >
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mapa */}
            <a
              href={mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-64 md:h-96 lg:h-full rounded-lg overflow-hidden shadow-lg group"
              aria-label="Ver ubicación en Google Maps"
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la Empresa en Google Maps"
                className="absolute inset-0 w-full h-full"
              ></iframe>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  className="h-12 w-12 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300" // Icono aparece al hacer hover
                />
              </div>
              <span className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                Panamá, Panamá (Click para ver mapa)
              </span>
            </a>
            {/* Información de Contacto */}
            <div className="space-y-8">
              <FadeInSection>
                <div>
                  <h2 className="text-3xl mb-3 md:text-4xl font-bold text-gray-800 relative inline-block">
                    <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
                      Ponte
                    </span>{' '}
                    en Contacto
                  </h2>
                </div>
              </FadeInSection>
              <FadeInSection>
                <p className="text-lg text-gray-600">
                  Estamos aquí para ayudarte con tus necesidades de seguridad.
                  Contáctanos a través de los siguientes medios:
                </p>
              </FadeInSection>
              <div className="space-y-6">
                <FadeInSection>
                  <div className="flex items-start space-x-4 group">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Nuestra Oficina
                      </h3>
                      <p className="text-gray-600">Panamá, Panamá</p>{' '}
                    </div>
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="flex items-start space-x-4 group">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Correo Electrónico
                      </h3>
                      <a
                        href="mailto:ventas@seguridadproteccionycontrol.com"
                        className="text-brand-orange hover:text-brand-orange-dark hover:underline transition-colors duration-300 break-all"
                      >
                        ventas@seguridadproteccionycontrol.com
                      </a>
                    </div>
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="flex items-start space-x-4 group">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Teléfonos
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href="tel:+50766152533"
                          className="hover:text-brand-orange-dark transition-colors duration-300 block" // block para mejor clic en móvil
                        >
                          +507 6615-2533 (Administración)
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a
                          href="tel:+50762335535"
                          className="hover:text-brand-orange-dark transition-colors duration-300 block"
                        >
                          +507 6233-5535 (Ventas)
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a
                          href="tel:+50761503513"
                          className="hover:text-brand-orange-dark transition-colors duration-300 block"
                        >
                          +507 6150-3513 (Operaciones)
                        </a>
                      </p>
                    </div>
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="flex items-start space-x-4 group">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Horario de Oficina
                      </h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9:00 AM - 5:00 PM
                      </p>
                      <p className="text-gray-600">
                        Sábados y Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </FadeInSection>
      </div>{' '}
    </section>
  );
}
