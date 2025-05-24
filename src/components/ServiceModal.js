import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ServiceModal({
  isOpen,
  onClose,
  serviceData,
  onSelectServiceInForm,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSelectClick = () => {
    onSelectServiceInForm(serviceData.name_service);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && serviceData && (
        <motion.div
          key="modal-backdrop"
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={handleBackgroundClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          tabIndex="-1"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            key="modal"
            className="bg-white rounded-lg shadow-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3
                id="modal-title"
                className="text-xl font-semibold text-gray-800"
              >
                {serviceData.name_service}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="m-0 p-0 overflow-y-auto">
              {serviceData.image_urls && serviceData.image_urls.length > 0 && (
                <div className="flex-shrink-0 overflow-hidden">
                  {' '}
                  <ImageCarousel images={serviceData.image_urls} />
                </div>
              )}
              <div className="flex justify-center py-2">
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
              </div>
              <div className="pt-0 pb-6 px-6 md:px-8 md:pb-8 text-gray-700 leading-relaxed">
                <p className="mb-4 whitespace-pre-line">
                  {serviceData.description}
                </p>
                {serviceData.details && serviceData.details.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      Incluye:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {serviceData.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                        >
                          <i className="fas fa-check-circle text-brand-orange mt-1 mr-2 text-sm"></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="border-t p-4 flex justify-center">
              <button
                onClick={handleSelectClick}
                className="bg-brand-orange text-white font-bold px-6 py-3 rounded-md hover:bg-brand-orange-dark transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 shadow hover:shadow-lg"
              >
                Solicitar este Servicio
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
