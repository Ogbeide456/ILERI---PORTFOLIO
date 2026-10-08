import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RevealObserver from '../../components/RevealObserver';
import { projects, type Project } from '../../lib/projects';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((project) => ({
    params: { slug: project.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const slug = params?.slug;
  const project =
    typeof slug === 'string'
      ? projects.find((item) => item.slug === slug)
      : undefined;

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{project.title} | Ogbeide Samuel Ilerioluwakiye</title>
        <meta name="description" content={project.summary} />
      </Head>
      <RevealObserver />
      <Navbar />
      <main className="project-detail-page">
        <section className="project-detail-hero">
          <div className="container">
            <Link href="/#portfolio" className="project-back-link">
              ← All projects
            </Link>
            <p className="project-detail-eyebrow">
              <span aria-hidden="true" /> Portfolio project
            </p>
            <h1>{project.title}</h1>
            <p className="project-detail-lead">{project.description}</p>
            <div className="project-detail-actions">
              <a
                href={project.link}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project <span aria-hidden="true">↗</span>
              </a>
              <a
                href={project.sourceCode}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </a>
            </div>
            <div className="project-detail-image">
              <img src={project.image} alt={`${project.title} preview`} />
            </div>
          </div>
        </section>

        <section className="project-detail-content">
          <div className="container project-detail-grid">
            <div className="project-detail-sections">
              <section className="project-detail-section">
                <h2>Summary</h2>
                <p>{project.summary}</p>
              </section>
              <section className="project-detail-section">
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </section>
              <section className="project-detail-section">
                <h2>What I built</h2>
                <p>{project.built}</p>
              </section>
              <section className="project-detail-section">
                <h2>What it taught me</h2>
                <ul>
                  {project.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="project-detail-stack">
              <h2>Stack</h2>
              <ul>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="project-detail-cta">
          <div className="container">
            <div className="project-detail-cta-card">
              <h2>Want to explore the project?</h2>
              <p>Visit the project or browse its source code.</p>
              <div className="project-detail-actions">
                <a
                  href={project.link}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={project.sourceCode}
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
