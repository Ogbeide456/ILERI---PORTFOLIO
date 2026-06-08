const projects = [
  {
    emoji: '🏦',
    title: 'Loan Calculator',
    desc: 'An interactive loan calculator that computes monthly repayments, total interest and amortization schedule.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '../Loancalculator.html',
  },
  {
    emoji: '🕐',
    title: 'Digital Clock',
    desc: 'A real-time digital clock with live time display and elegant styling.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '../digitalclock.html',
  },
  {
    emoji: '🔥',
    title: 'Flame Animation',
    desc: 'A pure CSS/JS animated flame effect demonstrating creative front-end animation techniques.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '../flameanimation.html',
  },
  {
    emoji: '📍',
    title: 'Geolocation App',
    desc: 'A browser geolocation app that retrieves and displays the user\'s current coordinates.',
    tags: ['HTML', 'JavaScript', 'Geolocation API'],
    link: '../geolocation.html',
  },
  {
    emoji: '🔺',
    title: 'Shapes & Canvas',
    desc: 'An HTML Canvas project showcasing geometric shape rendering and visual experimentation.',
    tags: ['HTML', 'Canvas', 'JavaScript'],
    link: '../shapes.html',
  },
  {
    emoji: '👨‍💻',
    title: 'Software Dev Page',
    desc: 'A demo software developer landing page with structured layout and content.',
    tags: ['HTML', 'CSS'],
    link: '../softwaredev.html',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="services-header reveal">
          <h2 className="sub-title">Portfolio</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '16px' }}>
            A selection of my recent projects
          </p>
        </div>

        <div className="services-list">
          {projects.map((project, i) => (
            <div className="service-card reveal" key={i}>
              <span className="service-icon">{project.emoji}</span>
              <h2>{project.title}</h2>
              <p>{project.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(0,208,132,0.1)',
                      border: '1px solid rgba(0,208,132,0.25)',
                      color: 'var(--accent)',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '50px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link}>View project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
