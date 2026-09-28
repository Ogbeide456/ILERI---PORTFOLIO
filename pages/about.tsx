import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutSection from '../components/About';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Ogbeide Samuel Ilerioluwakiye</title>
        <meta
          name="description"
          content="Learn more about Ogbeide Samuel Ilerioluwakiye, a full-stack software developer and creative problem solver from Nigeria."
        />
      </Head>

      <Navbar />
      <main>
        <div style={{ paddingTop: 'var(--nav-height)' }}>
          <AboutSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
