import React from 'react';
import FadeInSection from '../FadeInSection'; // Ajusta la ruta si es necesario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faUserShield,
  faBuildingShield,
} from '@fortawesome/free-solid-svg-icons';

export default function ValuesAndRecruitment() {
  return (
    <div className="lg:w-5/12 flex flex-col justify-center mb-12 lg:mb-0">
      <FadeInSection>
        <div className="flex items-start mb-6">
          <FontAwesomeIcon
            icon={faBuildingShield}
            className="text-brand-orange text-3xl mr-4 mt-1 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              CONFIANZA
            </h3>
            <p className="text-gray-600">
              Cumplimos normas y garantizamos una protección continua.
            </p>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="flex items-start mb-6">
          <FontAwesomeIcon
            icon={faHandshake}
            className="text-brand-orange text-3xl mr-4 mt-1 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              COMPROMISO
            </h3>
            <p className="text-gray-600">
              Comprometidos a ofrecer un servicio de seguridad integral.
            </p>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="flex items-start mb-10">
          <FontAwesomeIcon
            icon={faUserShield}
            className="text-brand-orange text-3xl mr-4 mt-1 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              PREVENCIÓN
            </h3>
            <p className="text-gray-600">
              Implementamos medidas proactivas antes de cualquier incidente.
            </p>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            ¿ESTÁS EN BUSCA DE NUEVAS OPORTUNIDADES?
          </h4>
          <a
            href="/Contact"
            className="inline-block bg-brand-orange text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-brand-orange-dark transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            ¡ÚNETE A NUESTRO EQUIPO!
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
