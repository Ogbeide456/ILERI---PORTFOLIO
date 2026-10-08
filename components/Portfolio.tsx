import Link from 'next/link';
import { projects } from '../lib/projects';

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

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="portfolio-card reveal" key={project.title}>
              <div className="portfolio-media">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="portfolio-card-body">
                <h3 className="portfolio-card-title">{project.title}</h3>
                <p className="portfolio-card-description">{project.description}</p>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="portfolio-view-more"
                >
                  View More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
