'use client';

import { useEffect, useState } from 'react';

type Project = {
  emoji: string;
  image?: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  sourceCode?: string; // GitHub repo URL — paste the link here for each project
};

const projects: Project[] = [
  {
    emoji: '',
    image:
      'https://media.licdn.com/dms/image/v2/D4E2DAQFnN3DW779NAQ/profile-treasury-image-shrink_1920_1920/B4EZ4dK2JoG8Ac-/0/1778605843485?e=1789387200&v=beta&t=EDbTro8hktqxpXMmjY2EIGynOKh31UkQ0bBw68EZDAo',
    title: 'Property Plug Project',
    desc: 'This is a platform that allows users to either buy, sell, or rent out real estate properties depending on their role as a landlord, tenant, or general user.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://psychological-bronze-mqy1naebp2.edgeone.app/landingpageregistereduser.html',
    sourceCode: 'https://github.com/Ogbeide456/PROPERTY-PLUG-PROJECT', // ← Paste GitHub repo URL here
  },
  {
    emoji: '',
    image: '/screenshot-1788785589556.png',
    title: 'Academic Performance Predictor Web App',
    desc: 'A machine learning–driven web application developed to estimate students’ Grade Point Average (GPA) based on key academic, behavioural, and lifestyle factors',
    tags: ['Python', 'Flask', 'Scikit-Learn', 'NumPy', 'Pandas', 'Joblib', 'Plotly', 'Streamlit', 'HTML', 'CSS'],
    link: 'https://academic-performance-predictor2026.streamlit.app/',
    sourceCode: 'https://github.com/Ogbeide456/ACADEMIC-PERFORMANCE-PREDICTOR', // ← Paste GitHub repo URL here
  },
  {
    emoji: '',
    title: 'Emotion Detector Web App',
    desc: 'A pure CSS/JS animated flame effect demonstrating creative front-end animation techniques.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '../flameanimation.html',
    sourceCode: '', // ← Paste GitHub repo URL here
  },
  {
    emoji: '📍',
    title: 'Geolocation App',
    desc: "A browser geolocation app that retrieves and displays the user's current coordinates.",
    tags: ['HTML', 'JavaScript', 'Geolocation API'],
    link: '../geolocation.html',
    sourceCode: '', // ← Paste GitHub repo URL here
  },
  {
    emoji: '🔺',
    title: 'Shapes & Canvas',
    desc: 'An HTML Canvas project showcasing geometric shape rendering and visual experimentation.',
    tags: ['HTML', 'Canvas', 'JavaScript'],
    link: '../shapes.html',
    sourceCode: '', // ← Paste GitHub repo URL here
  },
  {
    emoji: '👨‍💻',
    title: 'Software Dev Page',
    desc: 'A demo software developer landing page with structured layout and content.',
    tags: ['HTML', 'CSS'],
    link: '../softwaredev.html',
    sourceCode: '', // ← Paste GitHub repo URL here
  },
];

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} />;
  }
  return <span className="portfolio-emoji" aria-hidden="true">{project.emoji}</span>;
}

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  return (
    <section id="portfolio">
      <div className="container">
        <div className="services-header reveal">
          <h2 className="sub-title">Portfolio</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '16px' }}>
            A selection of my recent projects
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <article className="portfolio-card reveal" key={project.title}>
              <button
                type="button"
                className="portfolio-media"
                aria-label={`View details for ${project.title}`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <ProjectMedia project={project} />
              </button>
              <h3 className="portfolio-card-title">{project.title}</h3>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className="portfolio-modal-backdrop"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="portfolio-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-modal-close"
              aria-label="Close project details"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            <div className="portfolio-modal-media">
              <ProjectMedia project={activeProject} />
            </div>

            <div className="portfolio-modal-body">
              <h3 id="portfolio-modal-title">{activeProject.title}</h3>
              <p>{activeProject.desc}</p>

              <div className="portfolio-modal-tags">
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <a
                href={activeProject.link}
                className="portfolio-modal-link"
                {...(activeProject.link.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                View project
              </a> <br />

              {activeProject.sourceCode && (
                <a
                  href={activeProject.sourceCode}
                  className="portfolio-modal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
