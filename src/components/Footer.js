import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-orange text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-300 pb-2 inline-block">
              Protección y Control, S.A.
            </h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              Tu socio confiable en soluciones de seguridad. Protegiendo lo que
              más importa con tecnología y personal experto.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-300 pb-2 inline-block">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#servicios"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="/Blog"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Blog/Noticias
                </a>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-orange-100 hover:text-black hover:underline transition duration-300"
                >
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-orange-300 pb-2 inline-block">
              Síguenos
            </h3>
            <p className="text-orange-100 mb-4 text-sm">
              Mantente al día con nuestras novedades.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-orange-100 hover:text-black transform hover:scale-110 transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-orange-100 hover:text-black transform hover:scale-110 transition duration-300"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-orange-100 hover:text-black transform hover:scale-110 transition duration-300"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="https://www.instagram.com/proteccion_controlsa/"
                aria-label="Instagram"
                className="text-orange-100 hover:text-black transform hover:scale-110 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-400 pt-8 mt-8 text-center">
          <p className="text-sm text-orange-100">
            &copy; {currentYear} Protección y Control, S.A. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
