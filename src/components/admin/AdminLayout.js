// src/components/admin/AdminLayout.js
import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import AdminProductPage from './AdminProductPage';
import AdminServicesPage from './AdminServicesPage';
import AdminDeliveryZone from './AdminDeliveryZonePage';
import AdminBlogPage from './AdminBlogsPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faArrowLeft,
  faShippingFast,
  faStore,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';

export default function AdminLayout({ user }) {
  const [selectedPage, setSelectedPage] = useState(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión.');
    } else {
      console.log('Cerró sesión exitosamente');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-700">
            Panel de Administración
          </span>
          <div className="flex items-center space-x-4">
            {/* Botón Atrás solo si hay página seleccionada */}
            {selectedPage && (
              <button
                onClick={() => setSelectedPage(null)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow transition duration-150"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Atrás</span>
              </button>
            )}

            {/* Info de usuario */}
            {user && (
              <span className="text-sm text-gray-500 hidden md:block">
                Logueado como: {user.email}
              </span>
            )}

            {/* Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition duration-150"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
        {!selectedPage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedPage('products')}
            >
              <FontAwesomeIcon
                icon={faStore}
                size="3x"
                className="text-orange-500 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Gestionar Productos
              </h3>
              <p className="text-gray-500 text-center">
                Añade, edita o elimina productos fácilmente.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedPage('services')}
            >
              <FontAwesomeIcon
                icon={faUserGear}
                size="3x"
                className="text-orange-500 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Gestionar Servicios
              </h3>
              <p className="text-gray-500 text-center">
                Controla los servicios que ofreces en tu tienda.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedPage('deliveryzone')}
            >
              <FontAwesomeIcon
                icon={faShippingFast}
                size="3x"
                className="text-orange-500 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Gestionar Delivery
              </h3>
              <p className="text-gray-500 text-center">
                Controla los precios de Delivery.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedPage('blog')}
            >
              <FontAwesomeIcon
                icon={faBlogger}
                size="3x"
                className="text-orange-500 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Gestionar Tu Blog
              </h3>
              <p className="text-gray-500 text-center">
                Agrega y edita tu Blog.
              </p>
            </motion.div>
          </div>
        ) : (
          <>
            {selectedPage === 'products' && <AdminProductPage />}
            {selectedPage === 'services' && <AdminServicesPage />}
            {selectedPage === 'deliveryzone' && <AdminDeliveryZone />}
            {selectedPage === 'blog' && <AdminBlogPage />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Tu Tienda - Panel Admin
        </p>
      </footer>
    </div>
  );
}
