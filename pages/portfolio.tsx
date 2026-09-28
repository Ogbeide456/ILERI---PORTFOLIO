import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioSection from '../components/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio | Ogbeide Samuel Ilerioluwakiye</title>
        <meta
          name="description"
          content="Browse selected projects and digital products created by Ogbeide Samuel Ilerioluwakiye."
        />
      </Head>

      <Navbar />
      <main style={{ paddingTop: '110px' }}>
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
