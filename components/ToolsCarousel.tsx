import React from 'react';

type ToolItem = {
  name: string;
  icon: React.ReactNode;
};

const toolsList: ToolItem[] = [
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.875 14.885-6.62-8.544V16.89H8.75V7.115h1.615l6.53 8.44V7.115h1.5V16.885h-1.52Z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M3 3h18v18H3V3Zm8.8 9.8h-2.1v6.7H7.7v-6.7H5.6V11h6.2v1.8Zm3.3 2.1c.4.3.9.5 1.5.5.6 0 1-.2 1-.6 0-.4-.4-.6-1.1-.9l-.7-.3c-1.2-.5-1.9-1.2-1.9-2.3 0-1.4 1.1-2.4 2.8-2.4 1.1 0 2 .3 2.6.8l-.7 1.6c-.5-.4-1.1-.6-1.8-.6-.6 0-1 .2-1 .6 0 .4.3.6 1 .9l.7.3c1.4.5 2 1.3 2 2.4 0 1.5-1.2 2.5-3 2.5-1.3 0-2.3-.4-3-1l.7-1.5Z" />
      </svg>
    ),
  },
  {
    name: 'React.js',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'HTML',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Zm13.51 5.82H8.38l.25 2.59H17.4l-.58 6.42L12 18.99v.04l-4.69-1.31-.32-3.61h2.24l.16 1.8 2.61.71 2.61-.71.36-4.08H6.47l-.75-7.46H18v2.27Z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5c-.3 0-.5.2-.6.4C10.5 4 7 8.5 7 13.5c0 3.8 2.5 6.8 5 8.5.3.2.7.2 1 0 2.5-1.7 5-4.7 5-8.5 0-5-3.5-9.5-4.4-11.6-.1-.2-.3-.4-.6-.4Zm0 2v16.8c-2.1-1.5-4.1-4-4.1-7.4 0-4.1 2.7-7.9 4.1-9.4Z" />
      </svg>
    ),
  },
  {
    name: 'CSS',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Zm13.51 5.82H8.38l.25 2.59h8.77l-.58 6.42L12 18.99v.04l-4.69-1.31-.32-3.61h2.24l.16 1.8 2.61.71 2.61-.71.36-4.08H6.86L6.47 6.05H18v2.59Z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M3 3h18v18H3V3Zm6.2 14.8c1.3 0 2.1-.7 2.1-2.1v-6.9H9.3v6.7c0 .5-.3.7-.7.7-.4 0-.6-.3-.8-.7l-1.3.8c.6 1 1.4 1.5 2.7 1.5Zm7.4 0c1.8 0 2.9-1 2.9-2.5 0-1.5-1-2.1-2.5-2.7l-.6-.2c-.9-.4-1.3-.7-1.3-1.3 0-.6.5-1 1.4-1 .9 0 1.5.4 1.9 1l1.3-.9c-.7-1.1-1.8-1.6-3.2-1.6-1.9 0-3.1 1.2-3.1 2.6 0 1.4.9 2 2.2 2.5l.6.2c1 .4 1.6.8 1.6 1.5 0 .8-.7 1.3-1.8 1.3-1 0-1.8-.5-2.3-1.4l-1.4.8c.7 1.4 2 2.1 3.3 2.1Z" />
      </svg>
    ),
  },
  {
    name: 'JSX',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="4" stroke="currentColor" fill="none" />
        <path d="M6 8l3 4-3 4M14 8l4 8M18 8l-4 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2Zm-1.5 6.5v7h1.5v-4l2 4h1v-7h-1.5v4l-2-4h-1Z" />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M4 6h7.5v2.2H6.8v2.2h4v2.2h-4v2.4h5V17H4V6Zm9.5 0h2.6l1.8 5 1.8-5h2.6l-3.2 5.5 3.4 5.5h-2.7L18 11.8 16.2 17h-2.7l3.3-5.5-3.3-5.5Z" />
      </svg>
    ),
  },
  {
    name: 'EmailJS',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 14l2.5-3.5h3L16 14l2.5 3.5h-3L13 14Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.5 9.2a4 4 0 0 0-3.8-3.2 4 4 0 0 0-3.9 3.2l-2.8-.8v2.4l2.5.7a4 4 0 0 0 3.7 2.5 4 4 0 0 0 3.8-2.5l2.5-.7v-2.4l-2-.8Zm-4.3 3.3a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M21.7 10.7L13.3 2.3a1.8 1.8 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3L13.2 12a2.2 2.2 0 0 1-2.4-.5L7.4 14.8a2.2 2.2 0 1 1-1.3-1.3l3.3-3.3a2.2 2.2 0 0 1 .5-2.4L2.3 10.7a1.8 1.8 0 0 0 0 2.6l8.4 8.4a1.8 1.8 0 0 0 2.6 0l8.4-8.4a1.8 1.8 0 0 0 0-2.6Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
        <path d="M12 3l10 18H2L12 3Z" />
      </svg>
    ),
  },
];

export default function ToolsCarousel() {
  return (
    <div className="toolsntechnologies reveal">
      <div className="container">
        <p className="tools-heading">
          Tools and technologies used in building and deploying this website:
        </p>
      </div>

      <div className="carousel-wrapper" aria-label="Tools and technologies logo carousel">
        <div className="carousel-track">
          {/* First set of logos */}
          {toolsList.map((tool, index) => (
            <div className="carousel-item" key={`orig-${index}`}>
              <span className="carousel-icon">{tool.icon}</span>
              <span className="carousel-name">{tool.name}</span>
            </div>
          ))}

          {/* Duplicated set for seamless infinite scroll */}
          {toolsList.map((tool, index) => (
            <div className="carousel-item" key={`dup-${index}`} aria-hidden="true">
              <span className="carousel-icon">{tool.icon}</span>
              <span className="carousel-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
