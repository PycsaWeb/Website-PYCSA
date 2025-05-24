import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '../SupabaseClient.js';
import ServiceModal from './ServiceModal.js';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faBars,
  faXmark,
  faChevronDown,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isServicesMenuOpen) {
      setIsServicesMenuOpen(false);
    }
  };

  const toggleServicesMenu = (e) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setIsServicesMenuOpen(!isServicesMenuOpen);
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    toggleMobileMenu();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleSelectServiceFromModal = (serviceTitle) => {
    closeModal();
    navigate('/', {
      state: { tipoServicio: serviceTitle, scrollToForm: true },
    });
  };

  const location = useLocation();
  const currentPage = location.pathname;

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/About' },
    { name: 'Servicios', href: '/#servicios', sublinks: services },
    { name: 'Blog', href: '/Blog' },
    { name: 'Contacto', href: '/Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 shadow-md"
    >
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceData={selectedService}
        onSelectServiceInForm={handleSelectServiceFromModal}
      />
      <div className="bg-brand-orange text-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center py-1 text-xs sm:text-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="tel:+50762335535"
              className="flex items-center hover:text-black transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faPhone}
                className="mr-1 sm:mr-2"
              />
              <span className="hidden sm:inline">+507 6233-5535</span>
            </a>
            <a
              href="mailto:ventas@seguridadproteccionycontrol.com"
              className="flex items-center hover:text-black transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-1 sm:mr-2"
              />
              <span className="hidden sm:inline">
                ventas@seguridadproteccionycontrol.com
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Panama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-black transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-1 sm:mr-2"
              />
              <span className="hidden md:inline">Panamá, Panamá</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 p-1"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 p-1"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 p-1"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href="https://www.instagram.com/proteccion_controlsa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 p-1"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <nav className="relative bg-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center py-3">
          <a
            href="/"
            className="flex items-center space-x-2 group"
          >
            <img
              src="/assets/logo-remove.png"
              alt="Logo Protección y Control"
              className="h-10 sm:h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div>
              <span className="block text-black font-bold text-base sm:text-lg lg:text-xl leading-tight">
                PROTECCIÓN Y
              </span>
              <span className="block text-brand-orange font-bold text-base sm:text-lg lg:text-xl leading-tight">
                CONTROL, S.A.
              </span>
            </div>
          </a>
          <div className="hidden lg:flex items-center space-x-5 lg:space-x-7">
            {navLinks.map((link, index) =>
              link.sublinks ? (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                >
                  <a
                    href={link.linkUrl}
                    className={`pb-8 px-1 font-medium relative group-hover:text-brand-orange hover:text-brand-orange transition-colors duration-200`}
                  >
                    {link.name}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="ml-1 text-xs transform group-hover:rotate-180 transition-transform duration-300"
                    />
                  </a>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-5 w-48 bg-white rounded-b-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-2">
                    <div className="h-1 bg-brand-orange origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    {link.sublinks.map((sublink) => (
                      <button
                        key={sublink.name_service}
                        onClick={() => openModal(sublink)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100 hover:text-brand-orange transition-colors duration-200"
                      >
                        {sublink.name_service}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`
                    py-2 px-1 font-medium relative group 
                    ${
                      currentPage === link.href
                        ? ' text-brand-orange border-b-2 border-brand-orange '
                        : ' hover:text-brand-orange '
                    }
                  `}
                >
                  {link.name}
                </a>
              )
            )}
            <a
              href="/"
              className="btn-gradient-hover"
            >
              <FontAwesomeIcon
                icon={faStore}
                className="text-lg"
              />
              ShopPycsa
            </a>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="text-gray-700 hover:text-brand-orange focus:outline-none focus:text-brand-orange transition-colors duration-300 p-2"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-2 overflow-hidden"
              style={{ top: 'calc(100% - 1px)' }}
            >
              <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
                {navLinks.map((link, index) =>
                  link.sublinks ? (
                    <div key={index}>
                      <button
                        onClick={toggleServicesMenu}
                        className={`
                      w-full text-left py-2 px-3 block rounded-md text-base font-medium flex justify-between items-center
                      ${
                        currentPage === link.linkUrl
                          ? 'bg-orange-50 text-brand-orange'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-brand-orange'
                      }
                       transition-colors duration-200
                    `}
                      >
                        {link.name}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`ml-1 text-xs transform transition-transform duration-300 ${
                            isServicesMenuOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isServicesMenuOpen ? 'max-h-60' : 'max-h-0'
                        }`}
                      >
                        <div className="pl-6 pt-1 pb-2 flex flex-col space-y-1">
                          {link.sublinks.map((sublink) => (
                            <button
                              key={sublink.name_service}
                              onClick={() => openModal(sublink)}
                              className="block w-full px-3 py-2 rounded-md text-sm text-start font-medium text-gray-600 hover:bg-gray-100 hover:text-brand-orange transition-colors duration-200"
                            >
                              {sublink.name_service}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={toggleMobileMenu}
                      className={`
                     py-2 px-3 block rounded-md text-base font-medium
                     ${
                       currentPage === link.href
                         ? 'bg-orange-50 text-brand-orange'
                         : 'text-gray-700 hover:bg-gray-100 hover:text-brand-orange'
                     }
                     transition-colors duration-200
                   `}
                    >
                      {link.name}
                    </a>
                  )
                )}
                <a
                  href="/"
                  className="btn-gradient-hover"
                >
                  <FontAwesomeIcon
                    icon={faStore}
                    className="text-lg"
                  />
                  ShopPycsa
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
