import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Ogbeide Samuel Ilerioluwakiye</title>
        <meta
          name="description"
          content="Contact Ogbeide Samuel Ilerioluwakiye to discuss web design, development, data projects, and collaborations."
        />
      </Head>

      <Navbar />
      <main>
        <div style={{ paddingTop: 'var(--nav-height)' }}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
