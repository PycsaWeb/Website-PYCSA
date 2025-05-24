import Header from '../components/Header';
import Footer from '../components/Footer';
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
      <MissionVision />
      <HistorySection />
      <TeamSection teamMembers={teamMembers} />
      <CallToAction />
      <Footer />
      <WhatsAppChatbox />
    </div>
  );
}
