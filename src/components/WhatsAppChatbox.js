import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const whatsappContacts = [
  {
    id: 'ventas',
    name: 'Ventas',
    number: '+50762335535',
    message: 'Hola, estoy interesado/a en sus productos/servicios.',
    icon: 'fas fa-shopping-cart',
  },
  {
    id: 'admin',
    name: 'Administración',
    number: '+50762335535',
    message: 'Hola, necesito ayuda con...',
    icon: 'fas fa-headset',
  },
  {
    id: 'operaciones',
    name: 'Operaciones',
    number: '+50761503513',
    message: 'Hola, tengo una consulta general.',
    icon: 'fas fa-gears',
  },
  {
    id: 'empleo',
    name: 'Empleo',
    number: '+50761503513',
    message: 'Hola, tengo una consulta general.',
    icon: 'fas fa-user-gear',
  },
];

const BUTTON_SIZE = 64;
const CHATBOX_WIDTH = 380;
const CHATBOX_HEIGHT = 410;

const WhatsAppChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbox = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsOpen(!isOpen);
  };

  const containerVariants = {
    closed: {
      width: `${BUTTON_SIZE}px`,
      height: `${BUTTON_SIZE}px`,
      borderRadius: '50%',
      backgroundColor: '#F97316',
      border: '2px solid white',
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
    open: {
      width: `${CHATBOX_WIDTH}px`,
      height: `${CHATBOX_HEIGHT}px`,
      borderRadius: '0.5rem',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.1, ease: 'linear' },
      transitionEnd: {
        display: 'none',
      },
    },
    visible: {
      opacity: 1,
      display: 'flex',
      transition: { duration: 0.2, delay: 0.2, ease: 'linear' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 + 0.2, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-10 flex items-center justify-center"
      style={{
        width: isOpen ? `${CHATBOX_WIDTH}px` : `${BUTTON_SIZE}px`,
        height: isOpen ? `${CHATBOX_HEIGHT}px` : `${BUTTON_SIZE}px`,
        cursor: !isOpen ? 'pointer' : 'default',
        maxWidth: `90%`,
      }}
      variants={containerVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onClick={!isOpen ? toggleChatbox : undefined}
      aria-label={isOpen ? 'Chatbox abierto' : 'Abrir chat'}
    >
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.div
            key="icon"
            variants={contentVariants}
            initial="visible"
            exit="hidden"
            className="text-white text-2xl"
          >
            <i className="fas fa-comments"></i>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="content"
            className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              onClick={toggleChatbox}
              className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Cerrar chat"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="p-4 pt-5 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              {' '}
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Contáctanos por <span className="text-[#25d366]">WhatsApp</span>
              </h3>
              <p className="text-sm text-gray-600 text-center mt-1">
                Elige un departamento:
              </p>
            </div>

            <div className="flex-grow p-4 flex flex-col space-y-3 overflow-y-auto">
              {' '}
              {whatsappContacts.map((contact, index) => {
                const encodedMessage = encodeURIComponent(contact.message);
                const whatsappLink = `https://wa.me/${contact.number}?text=${encodedMessage}`;

                return (
                  <motion.a
                    key={contact.id}
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white hover:bg-orange-50 rounded-md transition-colors duration-200 ease-in-out shadow-sm border border-gray-200 group"
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i
                      className={`${contact.icon} text-xl text-orange-600 mr-3 w-6 text-center group-hover:scale-110 transition-transform`}
                    ></i>
                    <span className="text-gray-700 font-medium group-hover:text-orange-700">
                      {contact.name}
                    </span>
                    <i className="fas fa-arrow-right text-orange-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                  </motion.a>
                );
              })}
            </div>

            <div className="p-2 bg-gray-50 border-t border-gray-200 text-center flex-shrink-0">
              <p className="text-xs text-gray-500">
                Serás redirigido a{' '}
                <span className="text-[#25d366]">WhatsApp</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WhatsAppChatbox;
