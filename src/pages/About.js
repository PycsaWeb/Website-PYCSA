import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeInSection from '../components/FadeInSection';
import AboutHero from '../components/Nosotros/AboutHero';
import MissionVision from '../components/Nosotros/MissionVision';
import HistorySection from '../components/Nosotros/HistorySection';
import TeamSection from '../components/Nosotros/TeamSection';
import CallToAction from '../components/Nosotros/CallToAction';
import WhatsAppChatbox from '../components/WhatsAppChatbox';

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: 'Ellery Fernandez',
      title: 'Director / Presidente - Tesorero',
      image: '/assets/avatarwoman.png',
    },
    {
      id: 2,
      name: 'Nombre Apellido',
      title: 'Administración',
      image: '/assets/avatarmen.png',
    },
    {
      id: 3,
      name: 'Lilia Matteo De Ardila',
      title: 'Director',
      image: '/assets/avatarwoman.png',
    },
  ];
  return (
    <div className="m-0 p-0">
      <Header />
      <AboutHero />
      <FadeInSection>
        <div className="flex justify-center py-4">
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
      </FadeInSection>
      <MissionVision />
      <HistorySection />
      <TeamSection teamMembers={teamMembers} />
      <CallToAction />
      <Footer />
      <WhatsAppChatbox />
    </div>
  );
}
