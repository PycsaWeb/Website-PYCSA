import FadeInSection from '../FadeInSection.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function CallToAction({ contactUrl }) {
  return (
    <section className="bg-brand py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {' '}
            {/* Texto blanco para contraste */}
            ¿Busca una solución confiable en seguridad?
          </h2>
        </FadeInSection>
        <FadeInSection>
          <p className="text-lg mb-8">
            {' '}
            {/* Texto blanco */}
            En Protección y Control S.A. estamos listos para proteger, controlar
            y servir. Contáctenos y diseñemos juntos el sistema de seguridad
            ideal para su propiedad o empresa.
          </p>
        </FadeInSection>
        <FadeInSection>
          <a
            href="/Contact"
            className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white text-brand bg-orange-500 hover:bg-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
          >
            CONTÁCTENOS AHORA
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
