'use client';
import { useEffect, useState, useRef, ReactNode } from 'react';

type TabId = 'skills' | 'experience' | 'education' | 'certifications' | 'more';

const tabs: { id: TabId; label: string }[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'more', label: 'More...' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   TIMELINE ICONS
───────────────────────────────────────────────────────────────────────────── */
const timelineIcons = {
  work: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  cert: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   SKILL LOGO SVG ICONS
───────────────────────────────────────────────────────────────────────────── */
export const icons = {
  html: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Z" fill="#E34F26" />
      <path d="M12 4.38V20.48L16.8 19.15 18.23 4.38H12Z" fill="#EF652A" />
      <path d="M12 8.64H8.38L8.63 11.23H12V13.82H8.88L9.13 16.63 12 17.43V19.03L7.31 17.72 6.84 12.82 6.72 11.23 6.47 8.64 6.35 6.05H12V8.64ZM12 8.64H15.62L15.37 11.23H12V8.64ZM12 13.82V11.23H15.37L15.01 15.04 12 15.87V17.47L16.69 16.16 17.27 10.23 17.4 8.64 17.65 6.05H12V8.64Z" fill="#fff" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4.14 2.82L5.86 20.35 12 22.06 18.14 20.35 19.86 2.82H4.14Z" fill="#1572B6" />
      <path d="M12 4.38V20.48L16.8 19.15 18.23 4.38H12Z" fill="#33A9DC" />
      <path d="M12 8.64H8.38L8.63 11.23H12V13.82H9.64L9.89 16.63 12 17.21V18.81L7.82 17.65 7.11 9.64 6.86 6.05H12V8.64ZM12 8.64H17.65L17.4 11.23H12V8.64ZM12 13.82V11.23H17.15L16.8 15.04 12 16.37V17.97L16.69 16.66 17.27 10.23 17.4 8.64 17.65 6.05H12V8.64Z" fill="#fff" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M6.5 17.2c.4.7 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.9v-6.3h-1.8v6.2c0 .5-.2.7-.6.7-.4 0-.6-.3-.8-.7l-.6.8zm7.2-.1c.5.8 1.4 1.3 2.5 1.3 1.5 0 2.5-.9 2.5-2.2 0-1.4-.9-1.9-2.2-2.4l-.5-.2c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.3-1 .8 0 1.3.4 1.7.9l1.2-.8c-.7-1-1.6-1.4-2.9-1.4-1.7 0-2.8 1.1-2.8 2.3 0 1.2.7 1.8 1.9 2.3l.5.2c.9.4 1.5.7 1.5 1.4 0 .7-.6 1.2-1.6 1.2-.9 0-1.6-.5-2.1-1.3l-1.3.6z" fill="#000" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M11.5 8.5H5.5V10h2.2v8h1.6v-8h2.2V8.5zm4.8 5.7c1-.3 1.6-.9 1.6-1.8 0-1.4-1.2-2.1-2.9-2.1-1.7 0-3 .9-3 2.5 0 1.2.9 1.8 2.2 2.2l.6.2c.9.3 1.3.6 1.3 1.1 0 .6-.5 1-1.4 1-1 0-1.6-.4-2-.9l-1.1 1c.7.9 1.7 1.4 3.1 1.4 2 0 3.2-1.1 3.2-2.6 0-1.2-.8-1.9-2.1-2.3l-.5-.2c-.8-.2-1.2-.5-1.2-1 0-.5.4-.9 1.2-.9.8 0 1.3.3 1.6.7l1.1-.9z" fill="#fff" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M16.5 7.5v9h-1.5V9.4l-6.5 7.1H7V7.5h1.5v7.1l6.5-7.1h1.5z" fill="#fff" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#539E43" />
      <path d="M10.5 8.5v7h1.5v-4l2 4h1v-7h-1.5v4l-2-4h-1z" fill="#fff" />
    </svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FF6C37" />
      <path d="M17.5 11.2a4 4 0 0 0-3.8-3.2 4 4 0 0 0-3.9 3.2l-2.8-.8v2.4l2.5.7a4 4 0 0 0 3.7 2.5 4 4 0 0 0 3.8-2.5l2.5-.7v-2.4l-2-.8zm-4.3 3.3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#fff" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6v2h-1v4.5l4.6 7.7A2.5 2.5 0 0 1 16.5 21h-9a2.5 2.5 0 0 1-2.1-3.8L10 9.5V5H9V3z" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#2d3748" />
      <path d="M6 7h6.5v2H8.5v2h3.5v2H8.5v2h4V17H6V7zm8 0h2.4l1.6 4.5L19.6 7H22l-2.8 5 2.8 5h-2.4L18 12.5 16.4 17H14l2.8-5L14 7z" fill="#fff" />
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 1.5c-.3 0-.5.2-.6.4C10.5 4 7 8.5 7 13.5c0 3.8 2.5 6.8 5 8.5.3.2.7.2 1 0 2.5-1.7 5-4.7 5-8.5 0-5-3.5-9.5-4.4-11.6-.1-.2-.3-.4-.6-.4z" fill="#47A248" />
      <path d="M12 2.5v19c2.3-1.6 4.5-4.3 4.5-8 0-4.5-3-8.5-4.5-11z" fill="#499D4A" />
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8.5" ry="3" fill="#00758F" />
      <path d="M3.5 5v5.5c0 1.66 3.81 3 8.5 3s8.5-1.34 8.5-3V5" stroke="#00758F" strokeWidth="1.2" fill="#005B70" />
      <path d="M3.5 10.5v5.5c0 1.66 3.81 3 8.5 3s8.5-1.34 8.5-3v-5.5" stroke="#00758F" strokeWidth="1.2" fill="#004354" />
      <path d="M3.5 16v3c0 1.66 3.81 3 8.5 3s8.5-1.34 8.5-3v-3" stroke="#00758F" strokeWidth="1.2" fill="#002D38" />
      <text x="12" y="14" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SQL</text>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M11.9 2c-3.1 0-5 .6-5 2.5v1.9h5.1v.6H4.8C3.1 7 2 8.4 2 10.9c0 2.3 1.2 3.8 3.1 3.8h1.2v-1.7c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.6-.9 2.6-2.4V4.5C17.3 2.6 15.2 2 11.9 2zM9.4 3.7a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#3776AB" />
      <path d="M12.1 22c3.1 0 5-.6 5-2.5v-1.9h-5.1v-.6h7.2c1.7 0 2.8-1.4 2.8-3.9 0-2.3-1.2-3.8-3.1-3.8h-1.2v1.7c0 1.8-1.5 3.3-3.3 3.3H9.3c-1.5 0-2.6.9-2.6 2.4v2.8c0 1.9 2.1 2.5 5.4 2.5zm2.5-1.7a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#FFD438" />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="#004482" />
      <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">C++</text>
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="#68217A" />
      <text x="12" y="15" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">C#</text>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#5382A1" />
      <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Java</text>
    </svg>
  ),
  visualBasic: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#5C2D91" />
      <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">VB</text>
    </svg>
  ),
  capcut: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#0F172A" />
      <path d="M7 8h9a3 3 0 0 1 0 6H9v3H7V8Zm2 2v2h7a1 1 0 1 0 0-2H9Z" fill="#fff" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M21.7 10.7L13.3 2.3a1.8 1.8 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3L13.2 12a2.2 2.2 0 0 1-2.4-.5L7.4 14.8a2.2 2.2 0 1 1-1.3-1.3l3.3-3.3a2.2 2.2 0 0 1 .5-2.4L2.3 10.7a1.8 1.8 0 0 0 0 2.6l8.4 8.4a1.8 1.8 0 0 0 2.6 0l8.4-8.4a1.8 1.8 0 0 0 0-2.6z" fill="#F05032" />
    </svg>
  ),
  excel: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#107C41" />
      <path d="M7 6.5h10v11H7z" fill="#fff" opacity="0.3" />
      <path d="M6 8l5 1.5v5L6 16V8z" fill="#21A366" />
      <path d="M12 9.5l6-1.5v8l-6-1.5v-5z" fill="#107C41" />
      <path d="M7 10.5l2.2 3.5H7.8l-1-1.8-1 1.8H4.5l2.2-3.5L4.7 7h1.4l.9 1.6.9-1.6h1.3L7 10.5z" fill="#fff" />
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00C4CC" />
      <path d="M12.5 7.5a4.5 4.5 0 0 0-4.5 4.5c0 3 2.5 4.5 4.5 4.5 2 0 3.5-1 4-2.5l-1.5-.5c-.3 1-1.2 1.5-2.5 1.5-1.5 0-3-1-3-3s1.5-3 3-3c1 0 2 .5 2.3 1.2l1.5-.7c-.6-1.3-2-2-3.8-2z" fill="#fff" />
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="0.8" />
      <path d="M6.5 7h4c1.8 0 3 1 3 2.6s-1.2 2.6-3 2.6H8.5V17H6.5V7zm2 3.7h1.8c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1H8.5v2.2zm7.7 2.1c-.8-.5-1.4-.8-1.4-1.4 0-.6.5-1 1.3-1 .8 0 1.4.3 1.7.8l1.3-.9c-.6-.9-1.6-1.3-3-1.3-1.8 0-2.9 1-2.9 2.4 0 1.3.9 1.9 2.2 2.4.9.4 1.3.7 1.3 1.3 0 .7-.6 1.1-1.5 1.1-.9 0-1.7-.5-2.1-1.3l-1.4.9c.7 1.2 1.8 1.8 3.5 1.8 2 0 3.1-1.1 3.1-2.5 0-1.4-.9-2-2.6-2.6z" fill="#31A8FF" />
    </svg>
  ),
  chatgpt: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10A37F" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   EDITABLE SKILLS & PROFICIENCY LEVELS
   ─────────────────────────────────────────────────────────────────────────────
   To modify your skills, years, proficiency ('Expert' | 'Advanced' | 'Intermediate'),
   or progress percentage (0 - 100), simply update the values below!
───────────────────────────────────────────────────────────────────────────── */
export type ProficiencyLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';

export interface SkillItem {
  name: string;
  years: string;
  level: ProficiencyLevel;
  percentage: number;
  icon: ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', years: '3+ years', level: 'Advanced', percentage: 85, icon: icons.react },
      { name: 'Next.js', years: '2+ years', level: 'Advanced', percentage: 81, icon: icons.next },
      { name: 'TypeScript', years: '2+ years', level: 'Advanced', percentage: 76, icon: icons.ts },
      { name: 'HTML5 & CSS3', years: '4+ years', level: 'Expert', percentage: 96, icon: icons.html },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', years: '3+ years', level: 'Advanced', percentage: 86, icon: icons.node },
      { name: 'Express.js', years: '3+ years', level: 'Advanced', percentage: 85, icon: icons.express },
      { name: 'Flask', years: '2+ years', level: 'Intermediate', percentage: 76, icon: icons.flask },
      { name: 'MongoDB', years: '2+ years', level: 'Advanced', percentage: 82, icon: icons.mongo },
      { name: 'SQL', years: '<1 year', level: 'Beginner', percentage: 25, icon: icons.sql },
    ],
  },
  {
    title: 'Programmming',
    skills: [
      { name: 'Python', years: '3+ years', level: 'Advanced', percentage: 75, icon: icons.python },
      { name: 'C++', years: '', level: 'Intermediate', percentage: 65, icon: icons.cpp },
      { name: 'C#', years: '', level: 'Intermediate', percentage: 50, icon: icons.csharp },
      { name: 'Java', years: '', level: 'Intermediate', percentage: 65, icon: icons.java },
      { name: 'Visual Basic', years: '', level: 'Intermediate', percentage: 75, icon: icons.visualBasic },
      { name: 'JavaScript', years: '4+ years', level: 'Expert', percentage: 88, icon: icons.js },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git & GitHub', years: '3+ years', level: 'Expert', percentage: 92, icon: icons.git },
      { name: 'Postman', years: '1+ year', level: 'Advanced', percentage: 77, icon: icons.postman },
      { name: 'Photoshop', years: '2+ years', level: 'Advanced', percentage: 80, icon: icons.photoshop },
      { name: 'Canva', years: '2+ years', level: 'Advanced', percentage: 90, icon: icons.canva },
      { name: 'CorelDraw', years: '6+ years', level: 'Expert', percentage: 90, icon: icons.canva },
      { name: 'ChatGPT & LLMs', years: '2+ years', level: 'Advanced', percentage: 80, icon: icons.chatgpt },
      { name: 'Microsoft Excel', years: '6+ years', level: 'Expert', percentage: 90, icon: icons.excel },
      { name: 'CapCut', years: '', level: 'Advanced', percentage: 83, icon: icons.capcut },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   EXPERIENCE DATA (TIMELINE LAYOUT)
───────────────────────────────────────────────────────────────────────────── */
export interface ExperienceItem {
  period: string;
  tag: string;
  role: string;
  company: string;
  logo: string;
  points: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: 'Mar 2025 – Apr 2025',
    tag: 'WORK',
    role: 'Front End Development',
    company: 'Richfill MultiServices Enterprises',
    logo: '/richfill logo.jpeg',
    points: [
      'Development and Design of a Property Plug Project demo web app which allows users to buy or sell real-estatee properties. I designed different webpages like the Sign-Up page, Login Page, User Dashboard,Reset Password Page, Forgot Password Page, etc.',
      'Collaborated on front-end workflows, translating layout requirements into interactive web components.',
      'Review of some websites e.g. Drive45mobility.com, Martech.ng, talkadoo.com, etc. and give feedback and documentation on the User Interface(UI), User Experience(UX), Functionalities and Usability improvements to be implemented on the websites.'
    ],
  },
  {
    period: 'Apr 2025 – Sept 2025',
    tag: 'WORK',
    role: 'Supply Chain Management',
    company: 'Seplat Energy Plc',
    logo: '/seplatenergylogo.jfif',
    points: [
      ' Provision of specialized contract and procurement support for the Production & Maintenance Categories ',
      'Contract Cost Breakdown Summary Analysis(Contract Lines and Contract Summary Sheet).',
      'Evaluation of vendors (technical and commercial)to ensure compliance with company standards and regulatory requirements.',
      'Ownership status vetting of vendors in a bidders list.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   EDUCATION DATA (TIMELINE LAYOUT)
───────────────────────────────────────────────────────────────────────────── */
export interface EducationItem {
  period: string;
  tag: string;
  degree: string;
  institution: string;
  logo: string;
  description: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: '2022 – 2026',
    tag: 'EDUCATION',
    degree: 'B.Sc. Industrial Mathematics – Computer Science',
    institution: 'Covenant University, Ota, Ogun State',
    logo: '/culogo.jpg',
    description: 'Learnt how to use mathematical models and techniques combined with computer science principles to solve real-life problems',
  },
  {
    period: '2016 – 2022',
    tag: 'EDUCATION',
    degree: 'West African Senior School Certificate (WASSCE)',
    institution: 'Deeper Life High School, Lagos Campus, Mowe, Ogun State',
    logo: '/dlhslogo.png',
    description: 'Completed secondary education with distinguished honors in pure sciences, mathematics, and computing.',
  },
  {
    period: '2012 – 2016',
    tag: 'EDUCATION',
    degree: 'Basic Education Certificate',
    institution: 'Edidot School, Badore, Lagos',
    logo: '/edidotlogo.jpg',
    description: 'Foundational education with strong focus on mathematics, basic science, english and computer literacy.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CERTIFICATIONS DATA
───────────────────────────────────────────────────────────────────────────── */
export interface CertItem {
  period: string;
  tag: string;
  title: string;
  issuer: string;
  img: string;
}

export const CERTIFICATIONS_DATA: CertItem[] = [
  {
    period: 'Dec 2023 – Mar 2024',
    tag: 'CERTIFICATION',
    title: 'Prompt Engineering: Introduction to LLMs by OBTranslate',
    issuer: 'OBTranslate',
    img: '/s5v43bfp.png',
  },
  {
    period: '2024',
    tag: 'CERTIFICATION',
    title: 'MongoDB – The Complete MongoDB Developers Course',
    issuer: 'Knowledge Nest',
    img: '/mongodbcert.jfif',
  },
  {
    period: '2026',
    tag: 'CERTIFICATION',
    title: 'LaunchPad 2026: Aerospace & Climate Innovation Bootcamp',
    issuer: 'LaunchPad',
    img: '/sx8qp7ik.png',
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>('skills');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const goToMore = () => {
    setActiveTab('more');
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollTo({
        left: tabsContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  const goToSkills = () => {
    setActiveTab('skills');
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (window.location.hash === '#more') {
      setActiveTab('more');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'more' && window.location.hash === '#more') {
      document.getElementById('more')?.scrollIntoView();
    }
  }, [activeTab]);

  return (
    <section id="about">
      <div className="container">
        <div className="about-row reveal">
          {/* Left column — avatar */}
          <div className="about-col-1">
            <div className="avatar-wrapper">
              <img
                src="/23109 (1).jpg"
                alt="Ogbeide Samuel Ilerioluwakiye"
                className="avatar-img"
              />
            </div>
          </div>

          {/* Right column — content */}
          <div className="about-col-2">
            <h2 className="sub-title">About Me</h2>

            <p className="about-desc">
              I&apos;m a passionate Full-Stack Software Developer who studied Industrial
              Mathematics – Computer Science at Covenant University. I love building
              clean, scalable web applications, designing aesthetic user experiences,
              and solving complex problems through code, data, and modern architecture.
            </p>

            {/* Tab navigation */}
            <div className="tab-titles" role="tablist" ref={tabsContainerRef}>
              {tabs.map((tab) => (
                <span key={tab.id} className="tab-item-inline">
                  <button
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`tab-links${activeTab === tab.id ? ' active-link' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>

                  {/* Fast-forward button (>>) on certifications tab for small phone screens */}
                  {tab.id === 'certifications' && (
                    <button
                      type="button"
                      className="tab-mobile-btn tab-mobile-ff"
                      onClick={goToMore}
                      title="Fast-forward to More tab"
                      aria-label="Fast-forward to More tab"
                    >
                      &gt;&gt;
                    </button>
                  )}

                  {/* Rewind button (<<) on more tab to go back to skills on small phone screens */}
                  {tab.id === 'more' && (
                    <button
                      type="button"
                      className="tab-mobile-btn tab-mobile-rewind"
                      onClick={goToSkills}
                      title="Rewind to Skills tab"
                      aria-label="Rewind to Skills tab"
                    >
                      &lt;&lt;
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* Tab contents */}
            <div className="tab-contents-container">
              {/* 1. SKILLS TAB */}
              {activeTab === 'skills' && (
                <div id="skills" className="tab-contents active-tab">
                  <div className="skills-grid">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <div key={idx} className="skill-category-card">
                        <div className="skill-category-header">
                          <span className="skill-category-accent" aria-hidden="true" />
                          <h3 className="skill-category-title">{cat.title}</h3>
                        </div>

                        <div className="skill-items-list">
                          {cat.skills.map((skill, sIdx) => {
                            const badgeClass =
                              skill.level === 'Expert'
                                ? 'badge-expert'
                                : skill.level === 'Advanced'
                                  ? 'badge-advanced'
                                  : skill.level === 'Beginner'
                                    ? 'badge-beginner'
                                    : 'badge-intermediate';

                            return (
                              <div key={sIdx} className="skill-row">
                                <div className="skill-row-top">
                                  <div className="skill-info">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <div className="skill-name-wrap">
                                      <span className="skill-name">{skill.name}</span>
                                      {skill.years && <span className="skill-years">{skill.years}</span>}
                                    </div>
                                  </div>
                                  <span className={`skill-badge ${badgeClass}`}>
                                    {skill.level}
                                  </span>
                                </div>
                                <div className="skill-bar-track" aria-hidden="true">
                                  <div
                                    className="skill-bar-fill"
                                    style={{ width: `${skill.percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <div id="experience" className="tab-contents active-tab">
                  <div className="timeline-wrapper">
                    <div className="timeline-spine" aria-hidden="true" />
                    {EXPERIENCE_DATA.map((item, idx) => (
                      <div key={idx} className="timeline-node">
                        <div className="timeline-icon-box">
                          {timelineIcons.work}
                        </div>
                        <div className="timeline-header">
                          <span className="timeline-date">{item.period}</span>
                          <span className="timeline-pill">{item.tag}</span>
                        </div>
                        <h3 className="timeline-title">{item.role}</h3>
                        <div className="timeline-org">
                          <img
                            src={item.logo}
                            alt={`${item.company} logo`}
                            className="timeline-org-logo"
                          />
                          <span>{item.company}</span>
                        </div>
                        <ul className="timeline-desc-list">
                          {item.points.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. EDUCATION TAB */}
              {activeTab === 'education' && (
                <div id="education" className="tab-contents active-tab">
                  <div className="timeline-wrapper">
                    <div className="timeline-spine" aria-hidden="true" />
                    {EDUCATION_DATA.map((item, idx) => (
                      <div key={idx} className="timeline-node">
                        <div className="timeline-icon-box">
                          {timelineIcons.education}
                        </div>
                        <div className="timeline-header">
                          <span className="timeline-date">{item.period}</span>
                          <span className="timeline-pill">{item.tag}</span>
                        </div>
                        <h3 className="timeline-title">{item.degree}</h3>
                        <div className="timeline-org">
                          <img
                            src={item.logo}
                            alt={`${item.institution} logo`}
                            className="timeline-org-logo"
                          />
                          <span>{item.institution}</span>
                        </div>
                        <p className="timeline-desc-text">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. CERTIFICATIONS TAB */}
              {activeTab === 'certifications' && (
                <div id="certifications" className="tab-contents active-tab">
                  <div className="timeline-wrapper">
                    <div className="timeline-spine" aria-hidden="true" />
                    {CERTIFICATIONS_DATA.map((item, idx) => (
                      <div key={idx} className="timeline-node">
                        <div className="timeline-icon-box">
                          {timelineIcons.cert}
                        </div>
                        <div className="timeline-header">
                          <span className="timeline-date">{item.period}</span>
                          <span className="timeline-pill">{item.tag}</span>
                        </div>
                        <h3 className="timeline-title">{item.title}</h3>
                        <div className="timeline-org">
                          <span>{item.issuer}</span>
                        </div>
                        <div className="timeline-cert-preview">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="cert-img"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. MORE TAB */}
              {activeTab === 'more' && (
                <div id="more" className="tab-contents active-tab">
                  <div className="cv-download-card">
                    <div className="cv-info">
                      <h3>Curriculum Vitae</h3>
                      <p>
                        Download my complete professional CV for full details on
                        my career history, project portfolio, educational
                        background, and technical capabilities.
                      </p>
                    </div>
                    <div className="cv-action">
                      <a
                        href="/ILERI CV2.docx"
                        download="ILERI CV2.docx"
                        className="btn-primary"
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
