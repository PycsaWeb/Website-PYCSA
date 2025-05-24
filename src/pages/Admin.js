// src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import { supabase } from '../SupabaseClient';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intenta obtener la sesión inicial
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la sesión inicial:', error);
        setLoading(false);
      });

    // Escucha cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('Auth state changed:', _event, session);
        setSession(session);
      }
    );

    // Limpiar el listener al desmontar el componente
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
        console.log('Auth listener unsubscribed');
      }
    };
  }, []);

  // Estado de Carga Inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Verificando sesión...
      </div>
    );
  }

  return (
    <>
      {!session ? (
        <AdminLogin />
      ) : (
        <AdminLayout
          key={session.user.id}
          user={session.user}
        />
      )}
    </>
  );
}
