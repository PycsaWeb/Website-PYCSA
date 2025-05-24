import React from 'react';
import Header from '../components/Header'; // O el path correcto
import Footer from '../components/Footer.js';

const TermsOfService = () => {
  return (
    <div className="m-0 p-0">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-brand-orange mb-8 text-center">
          Términos de Servicio
        </h1>

        {/* Fecha de última actualización */}
        <p className="text-gray-600 text-sm mb-8 text-center">
          Última actualización: miércoles, 23 de abril del 2025
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p>
              Bienvenido/a a Protección y Control, S.A. Al acceder y utilizar
              nuestros servicios, usted acepta cumplir y estar sujeto a los
              siguientes Términos de Servicio. Si no está de acuerdo con alguna
              parte de estos términos, por favor, no utilice nuestros servicios.
            </p>
            <p>
              Estos términos aplican a todos los visitantes, usuarios y otras
              personas que deseen acceder o utilizar el servicio.
            </p>
          </section>

          {/* Descripción del Servicio */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Descripción del Servicio
            </h2>
            <p>
              Protección y Control, S.A. proporciona servicios de seguridad
              privada, incluyendo seguridad física (guardias de seguridad),
              vigilancia electrónica (CCTV y alarmas), respuesta rápida
              (unidades móviles), seguridad para eventos especiales, escolta y
              protección personal (VIPS o ejecutivos), consultoría y análisis de
              riesgo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Uso del Sitio Web y Formularios
            </h2>
            <p>
              Al utilizar nuestro sitio web y enviar información a través de
              formularios, usted se compromete a:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Proporcionar información veraz, precisa y completa en cualquier
                formulario.
              </li>
              <li>
                Utilizar el sitio web y sus funcionalidades (incluyendo el
                formulario de contacto) únicamente para fines lícitos y de
                acuerdo con estos Términos.
              </li>
              <li>
                No utilizar el sitio web de manera que pueda dañar,
                deshabilitar, sobrecargar o perjudicar la infraestructura del
                sitio o interferir con el uso y disfrute del sitio por parte de
                terceros.
              </li>
              <li>
                No intentar obtener acceso no autorizado a cualquier parte del
                sitio web o a sistemas o redes conectadas al mismo.
              </li>
            </ul>
          </section>

          {/* Obligaciones del Usuario */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Obligaciones del Usuario
            </h2>
            <p>Como usuario de nuestros servicios, usted se compromete a:</p>
            <ul className="list-disc ml-6">
              <li>
                Proporcionar información precisa y completa al solicitar o
                utilizar nuestros servicios.
              </li>
              <li>
                No utilizar nuestros servicios para fines ilegales o no
                autorizados.
              </li>
              <li>
                No interferir con el correcto funcionamiento de los servicios o
                la infraestructura de nuestra empresa.
              </li>
              <li>Cumplir con todas las leyes y regulaciones aplicables.</li>
            </ul>
          </section>

          {/* Propiedad Intelectual */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Propiedad Intelectual
            </h2>
            <p>
              El contenido, las características y la funcionalidad originales de
              nuestro sitio web y los materiales relacionados con nuestros
              servicios son y seguirán siendo propiedad exclusiva de [Nombre de
              tu Empresa de Seguridad] y sus licenciantes. El sitio web y su
              contenido están protegidos por derechos de autor, marcas
              registradas y otras leyes tanto de [Tu País] como de otros países.
            </p>
          </section>

          {/* Limitación de Responsabilidad */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Limitación de Responsabilidad
            </h2>
            <p>
              La información en este sitio web se proporciona "tal cual" sin
              garantías de ningún tipo. Si bien nos esforzamos por mantener la
              información actualizada y precisa, no garantizamos su
              exhaustividad o exactitud. El uso del sitio web es bajo su propio
              riesgo.
            </p>
            <p>
              En la medida máxima permitida por la ley aplicable, en ningún caso
              Protección y Control, S.A. Ni sus directores, empleados, socios,
              agentes, proveedores o afiliados, serán responsables de daños
              indirectos, incidentales, especiales, consecuentes o punitivos,
              incluyendo, sin limitación, pérdida de beneficios, datos, uso,
              buena voluntad u otras pérdidas intangibles, resultantes de (i) su
              acceso o uso o incapacidad para acceder o utilizar el sitio web;
              (ii) cualquier conducta o contenido de terceros en el sitio web;
              (iii) cualquier contenido obtenido del sitio web; y (iv) acceso,
              uso o alteración no autorizados de sus transmisiones o contenido,
              ya sea basado en garantía, contrato, agravio (incluida la
              negligencia) o cualquier otra teoría legal, hayamos sido o no
              informados de la posibilidad de tales daños.
            </p>
            <p>
              La limitación de responsabilidad con respecto a los servicios de
              seguridad contratados formalmente se establecerá en el contrato de
              servicios específico.
            </p>
          </section>

          {/* Terminación */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Terminación
            </h2>
            <p>
              Podemos terminar o suspender su acceso a nuestro servicio de
              inmediato, sin previo aviso ni responsabilidad, por cualquier
              motivo, incluido, entre otros, si usted incumple los Términos.
            </p>
            <p>
              Todas las disposiciones de los Términos que por su naturaleza
              deberían sobrevivir a la terminación sobrevivirán a la
              terminación, incluidas, entre otras, las disposiciones de
              propiedad, exenciones de garantía, indemnización y limitaciones de
              responsabilidad.
            </p>
          </section>

          {/* Ley Aplicable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Ley Aplicable
            </h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              de Panamá, sin tener en cuenta sus disposiciones sobre conflictos
              de leyes.
            </p>
          </section>

          {/* Cambios en los Términos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Cambios
            </h2>
            <p>
              Nos reservamos el derecho, a nuestra entera discreción, de
              modificar o reemplazar estos Términos en cualquier momento. Si una
              revisión es importante, intentaremos proporcionar un aviso
              razonable antes de que los nuevos términos entren en vigencia. Lo
              que constituye un cambio importante se determinará a nuestra
              entera discreción.
            </p>
            <p>
              Al continuar accediendo o utilizando nuestro sitio web o servicios
              después de que esas revisiones entren en vigencia, usted acepta
              estar sujeto a los términos revisados. Si no acepta los nuevos
              términos, deje de usar el sitio web y contacte para dar de baja
              cualquier servicio contratado si es aplicable.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Contacto
            </h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos de Servicio, por
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

export default TermsOfService;
