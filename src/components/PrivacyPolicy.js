import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer.js';

const PrivacyPolicy = () => {
  return (
    <div className="m-0 p-0">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-brand-orange mb-8 text-center">
          Política de Privacidad
        </h1>

        {/* Fecha de última actualización */}
        <p className="text-gray-600 text-sm mb-8 text-center">
          Última actualización: miércoles, 23 de abril del 2025
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introducción
            </h2>
            <p>
              En Protección y Control, S.A. Nos tomamos muy en serio su
              privacidad. Esta Política de Privacidad describe cómo recopilamos,
              utilizamos y protegemos la información que usted nos proporciona
              al utilizar nuestros servicios.
            </p>
            <p>
              Al utilizar nuestros servicios, usted acepta la recopilación y uso
              de información de acuerdo con esta política.
            </p>
          </section>

          {/* Información Recopilada */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Información que Recopilamos
            </h2>
            <p>
              Solo recopilamos la información que usted nos proporciona
              voluntariamente al completar y enviar nuestro formulario de
              contacto. Esta información puede incluir:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Su nombre.</li>
              <li>Su dirección de correo electrónico.</li>
              <li>Su número de teléfono (si lo proporciona).</li>
              <li>El contenido de su mensaje o consulta.</li>
              {/* Añade cualquier otro campo específico que tenga tu formulario */}
            </ul>
            <p className="mt-4">
              No recopilamos automáticamente ninguna otra información (como
              datos de uso, ubicación o a través de cookies no esenciales) al
              navegar por nuestro sitio web.
            </p>
          </section>

          {/* Uso de la Información */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Cómo Utilizamos su Información
            </h2>
            <p>
              Utilizamos la información recopilada a través del formulario de
              contacto **única y exclusivamente** para los siguientes fines:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Responder a su consulta o mensaje.</li>
              <li>
                Proporcionarle la información solicitada sobre nuestros
                servicios.
              </li>
              <li>Gestionar su solicitud de contacto o presupuesto.</li>
            </ul>
            <p className="mt-4">
              No utilizamos su información para fines de marketing no
              solicitados ni para ningún otro propósito no relacionado con la
              respuesta a su contacto.
            </p>
          </section>

          {/* Compartir Información */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Compartir su Información
            </h2>
            <p>
              No vendemos, comercializamos ni alquilamos su información personal
              a terceros.
            </p>
            <p>
              Podemos compartir su información **únicamente** con aquellos
              empleados o colaboradores internos de Protección y Control, S.A.
              Que necesiten conocer esa información para procesar y responder a
              su solicitud de contacto.
            </p>
            <p>
              Podríamos divulgar su información si así lo exige la ley o en
              respuesta a procesos legales válidos (por ejemplo, una orden
              judicial o una solicitud de una autoridad gubernamental).
            </p>
          </section>

          {/* Retención de Datos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Retención de Datos
            </h2>
            <p>
              Retenemos la información enviada a través del formulario de
              contacto solo durante el tiempo necesario para responder a su
              consulta y gestionar su solicitud. Una vez que su solicitud ha
              sido atendida y no se requiere más comunicación relacionada,
              eliminaremos o anonimizaremos sus datos de contacto y mensaje de
              forma segura en un plazo razonable, a menos que una obligación
              legal nos exija retenerla por más tiempo.
            </p>
          </section>

          {/* Seguridad de los Datos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Seguridad de los Datos
            </h2>
            <p>
              Nos esforzamos por proteger la información que nos envía a través
              del formulario de contacto implementando medidas de seguridad
              razonables para evitar el acceso no autorizado, la divulgación, la
              alteración o la destrucción. Sin embargo, ninguna transmisión por
              Internet o almacenamiento electrónico es completamente seguro.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Uso de Cookies
            </h2>
            <p>
              Confirmamos que **no utilizamos cookies ni tecnologías de
              seguimiento similares** en nuestro sitio web para recopilar
              información personal o rastrear su actividad. Nuestro sitio web
              está diseñado para ser funcional sin necesidad de cookies no
              esenciales.
            </p>
            {/*<p className="italic text-sm text-gray-600 mt-2">
              (Nota: Si tu plataforma de hosting o alguna librería de React que
              uses *automáticamente* establece alguna cookie estrictamente
              necesaria para el funcionamiento técnico básico del sitio,
              deberías mencionarlo aquí, indicando que son esenciales y no se
              usan para seguimiento o análisis).
            </p>*/}
          </section>

          {/* Enlaces a Otros Sitios */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Enlaces a Otros Sitios
            </h2>
            <p>
              Nuestro sitio web puede contener enlaces a otros sitios que no son
              operados por nosotros. Si hace clic en un enlace de un tercero,
              será dirigido al sitio de ese tercero. Le recomendamos
              encarecidamente que revise la Política de Privacidad de cada sitio
              que visite.
            </p>
            <p>
              No tenemos control ni asumimos ninguna responsabilidad por el
              contenido, las políticas de privacidad o las prácticas de los
              sitios o servicios de terceros.
            </p>
          </section>

          {/* Privacidad de los Niños */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Privacidad de los Niños
            </h2>
            <p>
              Nuestro sitio web no se dirige a personas menores de 18 años. No
              recopilamos a sabiendas información de identificación personal de
              ninguna persona menor de 18 años a través de nuestro formulario de
              contacto. Si usted es padre/madre o tutor y cree que su hijo nos
              ha proporcionado datos a través del formulario, por favor
              contáctenos.
            </p>
          </section>

          {/* Cambios en la Política */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Cambios en Esta Política de Privacidad
            </h2>
            <p>
              Podemos actualizar nuestra Política de Privacidad de vez en
              cuando. Le notificaremos cualquier cambio publicando la Política
              de Privacidad actualizada en esta página.
            </p>
            <p>
              Se le recomienda revisar esta Política de Privacidad
              periódicamente para cualquier cambio. Los cambios a esta Política
              de Privacidad son efectivos cuando se publican en esta página.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              11. Contacto
            </h2>
            <p>
              Si tiene alguna pregunta sobre esta Política de Privacidad, por
              favor contáctenos:
            </p>
            <p>
              ventas@seguridadproteccionycontrol.com
              <br />
              +507 6615-2533
              <br />
              Panamá, Panamá
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
