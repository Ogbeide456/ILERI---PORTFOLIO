'use client';
import { useState, ReactNode } from 'react';

type TabId = 'skills' | 'experience' | 'education' | 'certifications' | 'more';

const tabs: { id: TabId; label: string }[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'more', label: 'More...' },
];

type TabItem = {
  title: string;
  subtitle: ReactNode;
};

function Tool({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <span className="skill-tool">
      {icon}
      {name}
    </span>
  );
}

const icons = {
  html: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Z" fill="#E34F26" />
      <path d="M12 4.38V20.48L16.8 19.15 18.23 4.38H12Z" fill="#EF652A" />
      <path d="M12 8.64H8.38L8.63 11.23H12V13.82H8.88L9.13 16.63 12 17.43V19.03L7.31 17.72 6.84 12.82 6.72 11.23 6.47 8.64 6.35 6.05H12V8.64ZM12 8.64H15.62L15.37 11.23H12V8.64ZM12 13.82V11.23H15.37L15.01 15.04 12 15.87V17.47L16.69 16.16 17.27 10.23 17.4 8.64 17.65 6.05H12V8.64Z" fill="#fff" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Z" fill="#1572B6" />
      <path d="M12 4.38V20.48L16.8 19.15 18.23 4.38H12Z" fill="#33A9DC" />
      <path d="M12 8.64H8.38L8.63 11.23H12V13.82H9.64L9.89 16.63 12 17.21V18.81L7.82 17.65 7.11 9.64 6.86 6.05H12V8.64ZM12 8.64H17.65L17.4 11.23H12V8.64ZM12 13.82V11.23H17.15L16.8 15.04 12 16.37V17.97L16.69 16.66 17.27 10.23 17.4 8.64 17.65 6.05H12V8.64Z" fill="#fff" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M6.5 17.2c.4.7 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.9v-6.3h-1.8v6.2c0 .5-.2.7-.6.7-.4 0-.6-.3-.8-.7l-.6.8zm7.2-.1c.5.8 1.4 1.3 2.5 1.3 1.5 0 2.5-.9 2.5-2.2 0-1.4-.9-1.9-2.2-2.4l-.5-.2c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.3-1 .8 0 1.3.4 1.7.9l1.2-.8c-.7-1-1.6-1.4-2.9-1.4-1.7 0-2.8 1.1-2.8 2.3 0 1.2.7 1.8 1.9 2.3l.5.2c.9.4 1.5.7 1.5 1.4 0 .7-.6 1.2-1.6 1.2-.9 0-1.6-.5-2.1-1.3l-1.3.6z" fill="#000" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M16.5 7.5v9h-1.5V9.4l-6.5 7.1H7V7.5h1.5v7.1l6.5-7.1h1.5z" fill="#fff" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#539E43" />
      <path d="M10.5 8.5v7h1.5v-4l2 4h1v-7h-1.5v4l-2-4h-1z" fill="#fff" />
    </svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FF6C37" />
      <path d="M17.5 11.2a4 4 0 0 0-3.8-3.2 4 4 0 0 0-3.9 3.2l-2.8-.8v2.4l2.5.7a4 4 0 0 0 3.7 2.5 4 4 0 0 0 3.8-2.5l2.5-.7v-2.4l-2-.8zm-4.3 3.3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#fff" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6v2h-1v4.5l4.6 7.7A2.5 2.5 0 0 1 16.5 21h-9a2.5 2.5 0 0 1-2.1-3.8L10 9.5V5H9V3z" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#2d3748" />
      <path d="M6 7h6.5v2H8.5v2h3.5v2H8.5v2h4V17H6V7zm8 0h2.4l1.6 4.5L19.6 7H22l-2.8 5 2.8 5h-2.4L18 12.5 16.4 17H14l2.8-5L14 7z" fill="#fff" />
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 1.5c-.3 0-.5.2-.6.4C10.5 4 7 8.5 7 13.5c0 3.8 2.5 6.8 5 8.5.3.2.7.2 1 0 2.5-1.7 5-4.7 5-8.5 0-5-3.5-9.5-4.4-11.6-.1-.2-.3-.4-.6-.4z" fill="#47A248" />
      <path d="M12 2.5v19c2.3-1.6 4.5-4.3 4.5-8 0-4.5-3-8.5-4.5-11z" fill="#499D4A" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M11.9 2c-3.1 0-5 .6-5 2.5v1.9h5.1v.6H4.8C3.1 7 2 8.4 2 10.9c0 2.3 1.2 3.8 3.1 3.8h1.2v-1.7c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.6-.9 2.6-2.4V4.5C17.3 2.6 15.2 2 11.9 2zM9.4 3.7a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#3776AB" />
      <path d="M12.1 22c3.1 0 5-.6 5-2.5v-1.9h-5.1v-.6h7.2c1.7 0 2.8-1.4 2.8-3.9 0-2.3-1.2-3.8-3.1-3.8h-1.2v1.7c0 1.8-1.5 3.3-3.3 3.3H9.3c-1.5 0-2.6.9-2.6 2.4v2.8c0 1.9 2.1 2.5 5.4 2.5zm2.5-1.7a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#FFD438" />
    </svg>
  ),
  c: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#00599C" />
      <path d="M15.5 8.5a4.5 4.5 0 1 0 0 7 1.2 1.2 0 1 1 1.4 2 6.9 6.9 0 1 1 0-11 1.2 1.2 0 0 1-1.4 2z" fill="#fff" />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#004482" />
      <path d="M12 8.5a4 4 0 1 0 0 7 1 1 0 1 1 1.2 1.8 6 6 0 1 1 0-10.6 1 1 0 0 1-1.2 1.8z" fill="#fff" />
      <path d="M15.5 10.5v3M14 12h3M19.5 10.5v3M18 12h3" stroke="#659AD2" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#239120" />
      <path d="M12 8.5a4 4 0 1 0 0 7 1 1 0 1 1 1.2 1.8 6 6 0 1 1 0-10.6 1 1 0 0 1-1.2 1.8z" fill="#fff" />
      <text x="14" y="15.5" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">#</text>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M8.5 16.5c2.5.4 6.5.4 9 0 0 0 1.2 1.2-1.5 2-3.8 1.1-7.2.2-7.5-2z" fill="#5382A1" />
      <path d="M7 19.5c3 .4 7 .4 10 0 0 0 .8.8-1 1.5-3.5 1-8.5.5-9-1.5z" fill="#E76F00" />
      <path d="M12.5 2c1.5 1.5 1 3-1 5-1.5 1.5-1 2.5.5 4-2-1-2-2.5 0-4.5 1.5-1.5 1-2.5.5-4.5z" fill="#5382A1" />
    </svg>
  ),
  vb: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#5C2D91" />
      <text x="12" y="16" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VB</text>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M21.7 10.7L13.3 2.3a1.8 1.8 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3L13.2 12a2.2 2.2 0 0 1-2.4-.5L7.4 14.8a2.2 2.2 0 1 1-1.3-1.3l3.3-3.3a2.2 2.2 0 0 1 .5-2.4L2.3 10.7a1.8 1.8 0 0 0 0 2.6l8.4 8.4a1.8 1.8 0 0 0 2.6 0l8.4-8.4a1.8 1.8 0 0 0 0-2.6z" fill="#F05032" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#fff" />
    </svg>
  ),
  excel: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#107C41" />
      <path d="M7 6.5h10v11H7z" fill="#fff" opacity="0.3" />
      <path d="M6 8l5 1.5v5L6 16V8z" fill="#21A366" />
      <path d="M12 9.5l6-1.5v8l-6-1.5v-5z" fill="#107C41" />
      <path d="M7 10.5l2.2 3.5H7.8l-1-1.8-1 1.8H4.5l2.2-3.5L4.7 7h1.4l.9 1.6.9-1.6h1.3L7 10.5z" fill="#fff" />
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00C4CC" />
      <path d="M12.5 7.5a4.5 4.5 0 0 0-4.5 4.5c0 3 2.5 4.5 4.5 4.5 2 0 3.5-1 4-2.5l-1.5-.5c-.3 1-1.2 1.5-2.5 1.5-1.5 0-3-1-3-3s1.5-3 3-3c1 0 2 .5 2.3 1.2l1.5-.7c-.6-1.3-2-2-3.8-2z" fill="#fff" />
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="0.8" />
      <path d="M6.5 7h4c1.8 0 3 1 3 2.6s-1.2 2.6-3 2.6H8.5V17H6.5V7zm2 3.7h1.8c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1H8.5v2.2zm7.7 2.1c-.8-.5-1.4-.8-1.4-1.4 0-.6.5-1 1.3-1 .8 0 1.4.3 1.7.8l1.3-.9c-.6-.9-1.6-1.3-3-1.3-1.8 0-2.9 1-2.9 2.4 0 1.3.9 1.9 2.2 2.4.9.4 1.3.7 1.3 1.3 0 .7-.6 1.1-1.5 1.1-.9 0-1.7-.5-2.1-1.3l-1.4.9c.7 1.2 1.8 1.8 3.5 1.8 2 0 3.1-1.1 3.1-2.5 0-1.4-.9-2-2.6-2.6z" fill="#31A8FF" />
    </svg>
  ),
  corel: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00B050" />
      <path d="M12 4a5.5 5.5 0 0 0-5.5 5.5c0 3 2.5 5.5 5.5 8.5 3-3 5.5-5.5 5.5-8.5A5.5 5.5 0 0 0 12 4zm0 2.5c1.7 0 3 1.3 3 3 0 1.8-1.5 3.5-3 5.5-1.5-2-3-3.7-3-5.5 0-1.7 1.3-3 3-3z" fill="#fff" />
    </svg>
  ),
  chatgpt: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10A37F" />
    </svg>
  ),
  llm: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 20z" fill="#8B5CF6" />
      <path d="M19 15l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z" fill="#A78BFA" />
    </svg>
  ),
};

const tabContent: Record<TabId, TabItem[]> = {
  skills: [
    {
      title: 'Front-End Web Development',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="HTML" icon={icons.html} />,{' '}
          <Tool name="CSS" icon={icons.css} />,{' '}
          <Tool name="JavaScript" icon={icons.js} />,{' '}
          <Tool name="NextJs" icon={icons.next} />,{' '}
          <Tool name="ReactJs" icon={icons.react} />
        </span>
      ),
    },
    {
      title: 'Back-End Web Development',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="NodeJs" icon={icons.node} />,{' '}
          <Tool name="Postman" icon={icons.postman} />,{' '}
          <Tool name="Flask" icon={icons.flask} /> and{' '}
          <Tool name="ExpressJs" icon={icons.express} />
        </span>
      ),
    },
    {
      title: 'Database',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="MongoDB" icon={icons.mongo} />
        </span>
      ),
    },
    {
      title: 'Programming',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="Python" icon={icons.python} />,{' '}
          <Tool name="JavaScript" icon={icons.js} />,{' '}
          <Tool name="C" icon={icons.c} />,{' '}
          <Tool name="C++" icon={icons.cpp} />,{' '}
          <Tool name="C#" icon={icons.csharp} />,{' '}
          <Tool name="Java" icon={icons.java} />,{' '}
          <Tool name="Visual BASIC" icon={icons.vb} />
        </span>
      ),
    },
    {
      title: 'Version Control',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="Git" icon={icons.git} />,{' '}
          <Tool name="GitHub" icon={icons.github} />
        </span>
      ),
    },
    {
      title: 'Data Analysis',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="Microsoft Excel" icon={icons.excel} />
        </span>
      ),
    },
    {
      title: 'Graphics Design',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="Canva" icon={icons.canva} />,{' '}
          <Tool name="Photoshop" icon={icons.photoshop} />,{' '}
          <Tool name="CorelDRAW" icon={icons.corel} />
        </span>
      ),
    },
    {
      title: 'Prompt Engineering',
      subtitle: (
        <span className="skill-tools-wrap">
          <Tool name="ChatGPT" icon={icons.chatgpt} /> &amp;{' '}
          <Tool name="LLMs" icon={icons.llm} />
        </span>
      ),
    },
    { title: 'Problem Solving', subtitle: 'Mathematics, Computer Science' },
    { title: 'Artificial Intelligence & Machine Learning', subtitle: 'Python, Scikit-learn, Neural Networks, Machine Learning' },
    { title: 'Supply Chain Management', subtitle: 'Logistics, Vendor Management, Production & Maintenance' },
  ],
  experience: [
    { title: '2022 – 2024', subtitle: 'Web Design & Development' },
    { title: 'Mar 2025 – Apr 2025', subtitle: 'Front End Development at Richfill MultiServices Enterprises' },
    { title: 'Apr 2025 – Sept 2025', subtitle: 'Supply Chain Management at Seplat Energy Plc' },
    { title: 'Dec 2023 – Mar 2024', subtitle: 'Prompt Engineering: Introduction to LLMs by OBTranslate' },
  ],
  education: [
    { title: '2022 – 2026', subtitle: 'B.Sc. Industrial Mathematics – Computer Science · Covenant University, Ota, Ogun State' },
    { title: '2016 – 2022', subtitle: 'Deeper Life High School, Lagos Campus, Mowe, Ogun State' },
    { title: '2012 – 2016', subtitle: 'Edidot School, Badore, Lagos' },
  ],
  certifications: [
    {
      title: 'Prompt Engineering: Introduction to LLMs by OBTranslate',
      subtitle: (
        <span className="cert-subtitle">
          <img
            src="/s5v43bfp.png"
            alt="Prompt Engineering: Introduction to LLMs by OBTranslate"
            className="cert-img"
          />
        </span>
      ),
    },
    {
      title: 'MongoDB- The Complete MongoDB Developers Course b Knowledge Nest',
      subtitle: (
        <span className="cert-subtitle">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E2DAQExo7zH55DyVQ/profile-treasury-image-shrink_800_800/B4EZ_7mjslKwAI-/0/1786632616980?e=1789686000&v=beta&t=qOqJoGAXF0jj81Z8qYQLlSYKObGlHx8kRFR7HgpgfUE"
            alt="MongoDB- The Complete MongoDB Developers Course Certificate"
            className="cert-img"
          />
        </span>
      ),
    },
    {
      title: 'LaunchPad 2026: Aerospace & Climate Innovation Bootcamp',
      subtitle: (
        <span className="cert-subtitle">
          <img
            src="/sx8qp7ik.png"
            alt="LaunchPad 2026: Aerospace & Climate Innovation Bootcamp Certificate"
            className="cert-img"
          />
        </span>
      ),
    },
  ],
  more: [
    {
      title: 'My CV',
      subtitle: (
        <div style={{ marginTop: '10px' }}>
          <a
            href="/ILERI CV2.docx"
            download="ILERI CV2.docx"
            className="btn-secondary"
          >
            <span>Download CV</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      ),
    },
  ],
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>('skills');

  return (
    <section id="about">
      <div className="container">
        <div className="about-row reveal">

          {/* Left column — avatar */}
          <div className="about-col-1">
            <div className="avatar-wrapper">
              <img
                src="/my-dp.jpg"
                alt="Ogbeide Samuel Ilerioluwakiye"
                className="avatar-img"
              />
            </div>
          </div>

          {/* Right column — content */}
          <div className="about-col-2">
            <h2 className="sub-title">About Me</h2>

            <p className="about-desc">
              I&apos;m a passionate Front-End Developer who pursued a BSc. degree in Industrial
              Mathematics – Computer Science at Covenant University. I love building
              clean, modern web interfaces and solving complex problems through code,
              design, and data.
            </p>

            {/* Tab navigation */}
            <div className="tab-titles">
              {tabs.map((tab) => (
                <p
                  key={tab.id}
                  className={`tab-links${activeTab === tab.id ? ' active-link' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </p>
              ))}
            </div>

            {/* Tab content */}
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={tab.id}
                className={`tab-contents${activeTab === tab.id ? ' active-tab' : ''}`}
              >
                <ul>
                  {tabContent[tab.id].map((item, i) => (
                    <li key={i}>
                      {item.title}
                      {typeof item.subtitle === 'string' ? (
                        <span className={tab.id === 'certifications' ? 'cert-subtitle' : undefined}>
                          {item.subtitle}
                        </span>
                      ) : (
                        item.subtitle
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
