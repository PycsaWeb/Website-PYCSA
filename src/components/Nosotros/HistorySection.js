import FadeInSection from '../FadeInSection.js'; // Ajusta la ruta si es necesario

export default function HistorySection() {
  return (
    <section className="bg-lightbg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Nuestra{' '}
            <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
              Historia
            </span>
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <FadeInSection>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Nuestra empresa nació con un propósito claro: proteger lo que
                más importa. Fundada por un grupo de profesionales con amplia
                experiencia en seguridad privada y pública, decidimos unir
                fuerzas para ofrecer un servicio diferente, más cercano,
                confiable y adaptado a los desafíos actuales.{' '}
              </p>
            </FadeInSection>
            <FadeInSection>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Lo que comenzó como un pequeño equipo con una gran visión,
                rápidamente fue creciendo gracias a la confianza de nuestros
                clientes y al compromiso de ofrecer excelencia en cada
                operación.{' '}
              </p>
            </FadeInSection>
            <FadeInSection>
              <p className="text-gray-700 leading-relaxed text-lg">
                Con el paso del tiempo, nos hemos consolidado como una empresa
                sólida, con tecnología de punta, protocolos eficaces y un equipo
                humano que es nuestro mayor valor. Seguimos evolucionando cada
                día, con la misma pasión y convicción que nos impulsó desde el
                principio: cuidar de ti y de lo que más valoras.
              </p>
            </FadeInSection>
          </div>
          <FadeInSection>
            <div className="hidden md:block">
              <img
                src="/assets/HistoriaNosotros.jpg"
                alt="Nuestra Historia"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
