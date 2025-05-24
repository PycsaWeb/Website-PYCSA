// src/components/Contact/ContactPage.js
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppChatbox from '../components/WhatsAppChatbox';
import emailjs from '@emailjs/browser';
import FadeInSection from '../components/FadeInSection';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const HeroContact = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20 md:py-28 px-4 text-center border-b border-gray-700 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('/assets/HeroContact.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Ponte en{' '}
          <span className="relative inline-block">
            <span className="absolute bottom-0 left-0 w-full h-2 bg-brand-orange/80 transform -skew-x-12"></span>
            <span className="relative">Contacto</span>
          </span>
        </h1>
        <motion.p
          className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Estamos aquí para responder tus preguntas y ofrecerte las mejores
          soluciones de seguridad.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'circOut' },
    },
  };

  const mapVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const templateParams = {
      nombre: formData.get('name'),
      correo: formData.get('email'),
      telefono: formData.get('phone') || 'No proporcionado',
      asunto: formData.get('subject'),
      mensaje: formData.get('message'),
    };

    const serviceID = 'service_xr3qzsd';
    const templateID = 'template_u9n90c8';
    const publicKey = 'mksq5NdtYAr2m_Nuc';

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Correo enviado con éxito:', response);
        toast.success('Mensaje enviado exitosamente!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        toast.error(
          'Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.',
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          }
        );
      });
  };

  return (
    <div className="m-0 p-0">
      <Header />
      <div className="bg-gray-50 text-gray-800">
        <HeroContact />
        <motion.div
          variants={itemVariants}
          className="flex justify-center py-4"
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center -space-y-6">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-orange-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ))}
          </div>
        </motion.div>
        <section className="pb-16 md:pb-24 text-gray-700">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-10">
              <FadeInSection>
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200"
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-l-4 border-brand-orange pl-4">
                    Información de Contacto
                  </h2>
                  <div className="space-y-5 text-gray-600">
                    <div className="flex items-start space-x-4">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-brand-orange text-xl mt-1 flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">Dirección</h3>
                        <p>Ciudad de Panamá, Panamá</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-brand-orange text-xl flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">Teléfono</h3>
                        <div className="flex flex-col">
                          <a
                            href="tel:+50762335535"
                            className="text-gray-700 hover:text-brand-orange transition duration-300"
                          >
                            +507 6233-5535 (Ventas)
                          </a>
                          <a
                            href="tel:+50761503513"
                            className="text-gray-700 hover:text-brand-orange transition duration-300"
                          >
                            +507 6150-3513 (Operaciones)
                          </a>
                          <a
                            href="tel:+50761503513"
                            className="text-gray-700 hover:text-brand-orange transition duration-300"
                          >
                            +507 6615-2533 (Administración)
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-brand-orange text-xl flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Correo Electrónico
                        </h3>
                        <a
                          href="mailto:ventas@seguridadproteccionycontrol.com"
                          className="text-gray-700 hover:text-brand-orange transition duration-300 break-all"
                        >
                          ventas@seguridadproteccionycontrol.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-brand-orange text-xl mt-1 flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Horario de Oficina
                        </h3>
                        <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                        <p>Sábados: 9:00 AM - 1:00 PM (Opcional)</p>{' '}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
              <FadeInSection>
                <motion.div
                  variants={mapVariants}
                  className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 p-4 sm:p-6"
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Nuestra Ubicación
                  </h3>
                  <div className="overflow-hidden rounded-md">
                    {' '}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.7979990999!2d-79.59131631640628!3d8.993798200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f139f4b9a9%3A0x6a1d32b6f3d6e5e4!2sPanama%20City%2C%20Panama!5e0!3m2!1sen!2sus!4v1678886543210!5m2!1sen!2sus"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de la Empresa"
                    ></iframe>
                  </div>
                </motion.div>
              </FadeInSection>
            </div>
            <FadeInSection>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200"
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 border-l-4 border-brand-orange pl-4">
                  Envíanos un Mensaje
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-300"
                      placeholder="Tu nombre"
                    />
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-300"
                      placeholder="tu@email.com"
                    />
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono (Opcional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-300"
                      placeholder="+507 1234-5678"
                    />
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Asunto
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-300"
                      placeholder="Motivo de tu consulta"
                    />
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition duration-300"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </motion.div>

                  <motion.div
                    variants={formItemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-brand-orange transition duration-300 ease-in-out transform"
                    >
                      Enviar Mensaje
                      <i className="fas fa-paper-plane ml-2"></i>
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </FadeInSection>
          </motion.div>
        </section>
      </div>
      <Footer />
      <ToastContainer />
      <WhatsAppChatbox />
    </div>
  );
}
