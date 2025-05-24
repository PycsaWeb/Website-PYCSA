import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceModal from '../components/ServiceModal';
import HeroHome from '../components/Home/HeroHome';

import ValuesAndRecruitment from '../components/Home/ValuesAndRecruitment';
import QuoteForm from '../components/Home/QuoteForm';
import ServicesList from '../components/Home/ServicesList';
import ContactInfo from '../components/Home/ContactInfo';
import WhatsAppChatbox from '../components/WhatsAppChatbox';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // --- Estado del Formulario ---
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    provincia: '',
    distrito: '',
    tipoServicio: '',
    detalles: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Efecto para forzar scroll al inicio al cargar/recargar
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Efecto para scroll por Hash (#) en la URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) {
          setTimeout(
            () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
            100
          );
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [location.hash]);

  // Efecto para validación del formulario
  useEffect(() => {
    const { nombre, correo, telefono, provincia, distrito, tipoServicio } =
      formData;
    const isValid =
      nombre &&
      correo &&
      telefono &&
      provincia &&
      distrito &&
      tipoServicio &&
      acceptedTerms;
    setIsFormValid(isValid);
  }, [formData, acceptedTerms]);

  // Efecto para pre-llenar/scroll al formulario desde otras páginas/modal
  useEffect(() => {
    const { tipoServicio: serviceFromState, scrollToForm } =
      location.state || {};

    if (serviceFromState) {
      setFormData((prev) => ({
        ...prev,
        tipoServicio: serviceFromState,
      }));
    }

    if ((scrollToForm || serviceFromState) && location.key !== 'default') {
      const timer = setTimeout(() => {
        const formSection = document.getElementById('contact-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const firstInput = formSection.querySelector(
            'input, select, textarea'
          );
          if (firstInput) firstInput.focus();
        }
        navigate(location.pathname, { replace: true, state: {} });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, location.key, navigate]);

  // --- Manejadores (Handlers) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  // --- Funciones del Modal ---
  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Maneja la selección de servicio desde el modal y hace scroll al form
  const handleSelectServiceFromModal = (serviceTitle) => {
    setFormData((prevState) => ({
      ...prevState,
      tipoServicio: serviceTitle,
    }));
    closeModal();

    setTimeout(() => {
      const formSection = document.getElementById('contact-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const serviceSelect = formSection.querySelector('#tipoServicio');
        if (serviceSelect) serviceSelect.focus();
      }
    }, 150);
  };

  // --- Envío de Formulario ---
  const enviarCorreo = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const sendingToast = toast.info('Enviando mensaje...', {
      autoClose: false,
      position: 'bottom-right',
    });

    emailjs
      .sendForm(
        'service_xr3qzsd',
        'template_iv54z3l',
        formRef.current,
        'mksq5NdtYAr2m_Nuc'
      )
      .then(
        (result) => {
          console.log('Correo enviado:', result.text);
          toast.dismiss(sendingToast);
          toast.success('📨 Cotización enviado con éxito!', {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // Resetea el formulario y el estado
          formRef.current.reset();
          setFormData({
            nombre: '',
            correo: '',
            telefono: '',
            provincia: '',
            distrito: '',
            tipoServicio: '',
            detalles: '',
          });
          setAcceptedTerms(false);
        },
        (error) => {
          console.log('Error:', error.text);
          toast.dismiss(sendingToast);
          toast.error(
            '🚫 Hubo un error al enviar el mensaje. Intenta de nuevo.',
            {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
      );
  };

  return (
    <div className="m-0 p-0 flex flex-col min-h-screen">
      {' '}
      <Header />
      <main className="flex-grow">
        {' '}
        <HeroHome />
        {/* Sección combinada de Valores/Reclutamiento y Formulario */}
        <section className="bg-white py-16 md:py-24 ">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
              {/* Componente de Valores y Reclutamiento */}
              <ValuesAndRecruitment />

              {/* Componente del Formulario de Cotización */}
              <QuoteForm
                formRef={formRef}
                formData={formData}
                handleInputChange={handleInputChange}
                acceptedTerms={acceptedTerms}
                handleCheckboxChange={handleCheckboxChange}
                isFormValid={isFormValid}
                enviarCorreo={enviarCorreo}
              />
            </div>
          </div>
        </section>
        {/* Componente de Lista de Servicios */}
        <ServicesList openModal={openModal} />
        {/* Componente de Información de Contacto y Mapa */}
        <ContactInfo />
      </main>{' '}
      <Footer />
      {/* Componente Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceData={selectedService}
        onSelectServiceInForm={handleSelectServiceFromModal}
      />
      {/* Contenedor para Notificaciones Toast */}
      <ToastContainer theme="colored" /> <WhatsAppChatbox />
    </div>
  );
}
