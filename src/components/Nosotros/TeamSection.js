import FadeInSection from '../FadeInSection.js'; // Ajusta la ruta si es necesario

// Recibe teamMembers como prop
export default function TeamSection({ teamMembers }) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Conoce a{' '}
            <span className="inline-block border-b-4 border-brand-orange pb-3 leading-none">
              Nuestro Equipo
            </span>
          </h2>
        </FadeInSection>
        <FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-lightbg p-6 rounded-lg shadow-lg flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={member.image} // Asume que /assets está en la carpeta public
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-brand text-sm">{member.title}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
