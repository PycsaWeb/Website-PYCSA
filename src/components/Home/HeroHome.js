import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FadeInSection from '../FadeInSection.js';
import FadeInImage from '../FadeInImage.js';

export default function HeaderHome() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/assets/guard1.jpg"
          alt="Fondo abstracto de seguridad"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-60 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 lg:pt-18">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-10">
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left md:pb-20">
            <FadeInSection>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                <span className="block">
                  Protección avanzada y control total:
                </span>
                <span className="block text-brand-orange mt-1">
                  nuestra prioridad es tu tranquilidad.
                </span>
              </h1>
            </FadeInSection>
            <FadeInSection>
              <div className="mt-8 flex justify-center md:justify-start">
                <a
                  href="/Contact"
                  className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-brand-orange-dark transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
                >
                  CONTÁCTENOS
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </FadeInSection>
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 mt-10 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-lg ">
              <FadeInImage
                className="absolute inset-0 w-full h-full object-cover object-top"
                src="/assets/avatarmen.png"
                alt="Guardia de seguridad firme"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
