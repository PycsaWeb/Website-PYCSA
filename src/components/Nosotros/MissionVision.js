import FadeInSection from '../FadeInSection.js'; // Ajusta la ruta si es necesario

export default function MissionVision() {
  return (
    <section className="pb-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeInSection>
          <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-brand mb-4">
              Nuestra{' '}
              <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
                Misión
              </span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Brindar servicios de seguridad confiables, personalizados y de
              alta calidad, protegiendo a nuestros clientes con profesionalismo,
              ética y tecnología de vanguardia. Nos comprometemos a generar un
              entorno seguro que permita el desarrollo tranquilo de personas,
              empresas e instituciones.
            </p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-brand mb-4">
              Nuestra{' '}
              <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
                Visión
              </span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ser la empresa de seguridad líder en el país, reconocida por
              nuestra excelencia operativa, innovación constante y la confianza
              que depositan en nosotros nuestros clientes. Aspiramos a marcar la
              diferencia en el sector, ofreciendo soluciones efectivas que
              evolucionen junto con las necesidades del mundo moderno.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
