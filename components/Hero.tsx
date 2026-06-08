export default function Hero() {
  return (
    <section id="header">
      {/* Background decorations */}
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="container">
        <div className="header-text">
          <div className="badge">
            <span className="dot" />
            Available for work
          </div>

          <h1>
            Hi, I&apos;m{' '}
            <span className="name-highlight">
              Ogbeide Samuel
            </span>
            <br />
            and I&apos;m a Front-End Developer from{' '}
            <span className="flag-ng">
              <span className="gh">Ni</span>
              <span className="jh">ger</span>
              <span className="gh">ia</span>
            </span>
          </h1>

          <p className="hero-desc">
            I craft beautiful, performant web experiences using modern
            technologies. Passionate about clean code and great design.
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn-primary">
              Get in touch →
            </a>
            <a href="#portfolio" className="btn-secondary">
              View my work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
