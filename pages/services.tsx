import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesSection from '../components/Services';
import RevealObserver from '../components/RevealObserver';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services | Ogbeide Samuel Ilerioluwakiye</title>
        <meta name="description" content="Explore the web development, design, data analysis, and problem-solving services offered by Ogbeide Samuel Ilerioluwakiye." />
      </Head>
      <RevealObserver />
      <Navbar />
      <main>
        <div style={{ paddingTop: 'var(--nav-height)' }}>
          <ServicesSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
