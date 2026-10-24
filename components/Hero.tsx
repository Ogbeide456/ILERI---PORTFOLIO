import { useState, useEffect } from 'react';
import Stats from './Stats';

/*
 * The hero heading is modelled as a list of "segments", each segment is either
 * plain text, a line-break, or a styled span.
 *
 * The typewriter cycles infinitely between heading variants:
 * - Variant 1: Name and Nigeria intro
 * - Variant 2: Crafting web experiences & clean code description
 *
 * Typing and backspacing speed: 0.03s (30ms) per character.
 */

type Segment =
  | { type: 'text'; value: string }
  | { type: 'br' }
  | { type: 'styled'; className: string; children: Segment[] };

// ─── Heading Cycling Variants ───
const headingVariants: Segment[][] = [
  // Variant 1: Name & Location Intro
  [
    { type: 'text', value: "Hi, My name is " },
    {
      type: 'styled',
      className: 'name-highlight',
      children: [{ type: 'text', value: 'Ogbeide Samuel Ilerioluwakiye' }],
    },
    { type: 'br' },
    { type: 'text', value: "and I\u2019m a Full-Stack Developer from " },
    {
      type: 'styled',
      className: 'flag-ng',
      children: [
        { type: 'styled', className: 'gh', children: [{ type: 'text', value: 'Ni' }] },
        { type: 'styled', className: 'jh', children: [{ type: 'text', value: 'ger' }] },
        { type: 'styled', className: 'gh', children: [{ type: 'text', value: 'ia' }] },
      ],
    },
  ],
  // Variant 2: Merged Description with Styled Highlight
  [
    { type: 'text', value: 'I craft ' },
    {
      type: 'styled',
      className: 'name-highlight',
      children: [{ type: 'text', value: 'beautiful, performant web experiences' }],
    },
    {
      type: 'text',
      value: ' using modern technologies. Passionate about clean code and great design.',
    },
  ],
  // Variant 3: Client Outreach
  [
    { type: 'text', value: 'If you need a ' },
    {
      type: 'styled',
      className: 'name-highlight',
      children: [{ type: 'text', value: 'quality, aesthetic and scalable' }],
    },
    {
      type: 'text',
      value: ' website for your brand, business or yourself, Feel free to reach out to me',
    },
  ],
  // Variant 4: Developer Collaboration
  [
    { type: 'text', value: 'For fellow developers or engineers like myself, let\u2019s collaborate and build ' },
    {
      type: 'styled',
      className: 'name-highlight',
      children: [{ type: 'text', value: 'amazing, effective and efficient' }],
    },
    {
      type: 'text',
      value: ' web solutions together',
    },
  ],
];

/** Count total printable characters across all segments */
function countChars(segs: Segment[]): number {
  let n = 0;
  for (const s of segs) {
    if (s.type === 'text') n += s.value.length;
    else if (s.type === 'styled') n += countChars(s.children);
    // 'br' adds 0 printable chars
  }
  return n;
}

/**
 * Recursively render segments, slicing visible text according to a
 * mutable offset tracker.
 */
function renderSegments(
  segs: Segment[],
  visible: number,
  offset: { current: number },
): React.ReactNode[] {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];

    if (s.type === 'br') {
      // Only show the line-break once the preceding text is fully typed
      if (offset.current <= visible) {
        out.push(<br key={`br-${i}`} />);
      }
      continue;
    }

    if (s.type === 'text') {
      const start = offset.current;
      offset.current += s.value.length;
      const charsToShow = Math.max(0, Math.min(s.value.length, visible - start));
      if (charsToShow > 0) {
        out.push(<span key={`t-${i}-${start}`}>{s.value.slice(0, charsToShow)}</span>);
      }
      continue;
    }

    // styled
    const childNodes = renderSegments(s.children, visible, offset);
    // Only render the wrapper if at least one child produced output
    if (childNodes.length > 0) {
      out.push(
        <span key={`s-${i}`} className={s.className}>
          {childNodes}
        </span>,
      );
    }
  }

  return out;
}

export default function Hero() {
  const [variantIndex, setVariantIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentVariant = headingVariants[variantIndex];
  const currentTotal = countChars(currentVariant);
  const reserveOffset = { current: 0 };
  const headingReserve = renderSegments(currentVariant, currentTotal, reserveOffset);

  // Cycling Typewriter & Backspace Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (visibleCount < currentTotal) {
        // Typing forward
        timer = setTimeout(() => {
          setVisibleCount((c) => c + 1);
        }, 20); // 0.02 seconds per character
      } else {
        // Finished typing current variant, pause before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (visibleCount > 0) {
        // Backspacing character by character
        timer = setTimeout(() => {
          setVisibleCount((c) => c - 1);
        }, 20); // 0.02 seconds per character
      } else {
        // Finished backspacing, brief pause, switch to next variant and type
        timer = setTimeout(() => {
          setIsDeleting(false);
          setVariantIndex((prev) => (prev + 1) % headingVariants.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [visibleCount, isDeleting, variantIndex, currentTotal]);

  const offset = { current: 0 };
  const rendered = renderSegments(currentVariant, visibleCount, offset);

  return (
    <section id="header">
      {/* Background decorations */}
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="container hero-container">
        {/* Left Column: Intro, Heading, CTA, and Stats */}
        <div className="header-text">
          <div className="badge">
            <span className="dot" />
            Available for work
          </div>

          <h1 className="hero-typing-heading">
            <span className="hero-heading-reserve" aria-hidden="true">
              {headingReserve}
            </span>
            <span className="hero-heading-current">
              {rendered}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </h1>

          <div className="hero-cta">
            <a href="#contact" className="btn-primary">
              Get in touch →
            </a>
            <a href="#portfolio" className="btn-secondary">
              View my work
            </a>
            <a href="/about#more" className="btn-secondary">
              View my CV
            </a>
          </div>

          {/* Integrated Horizontal Stats */}
          <Stats />
        </div>

        {/* Right Column: Hero Portrait Image Card with Tech Dock */}
        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            <img
              src="/18790.png"
              alt="Ogbeide Samuel Ilerioluwakiye"
              className="hero-portrait-img"
            />
            {/* Floating Tech Dock matching reference */}
            <div className="hero-tech-dock" aria-label="Core tech stack">
              {/* React */}
              <span className="hero-dock-icon" title="React">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
                </svg>
              </span>
              {/* Next.js */}
              <span className="hero-dock-icon" title="Next.js">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                  <path d="M16.5 7.5v9h-1.5V9.4l-6.5 7.1H7V7.5h1.5v7.1l6.5-7.1h1.5z" fill="#fff" />
                </svg>
              </span>
              {/* JavaScript */}
              <span className="hero-dock-icon" title="JavaScript">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <rect width="24" height="24" rx="3" fill="#F7DF1E" />
                  <path d="M6.5 17.2c.4.7 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.9v-6.3h-1.8v6.2c0 .5-.2.7-.6.7-.4 0-.6-.3-.8-.7l-.6.8zm7.2-.1c.5.8 1.4 1.3 2.5 1.3 1.5 0 2.5-.9 2.5-2.2 0-1.4-.9-1.9-2.2-2.4l-.5-.2c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.3-1 .8 0 1.3.4 1.7.9l1.2-.8c-.7-1-1.6-1.4-2.9-1.4-1.7 0-2.8 1.1-2.8 2.3 0 1.2.7 1.8 1.9 2.3l.5.2c.9.4 1.5.7 1.5 1.4 0 .7-.6 1.2-1.6 1.2-.9 0-1.6-.5-2.1-1.3l-1.3.6z" fill="#000" />
                </svg>
              </span>
              {/* Node.js */}
              <span className="hero-dock-icon" title="Node.js">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#539E43" />
                  <path d="M10.5 8.5v7h1.5v-4l2 4h1v-7h-1.5v4l-2-4h-1z" fill="#fff" />
                </svg>
              </span>
              {/* Python */}
              <span className="hero-dock-icon" title="Python">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M11.9 2c-3.1 0-5 .6-5 2.5v1.9h5.1v.6H4.8C3.1 7 2 8.4 2 10.9c0 2.3 1.2 3.8 3.1 3.8h1.2v-1.7c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.6-.9 2.6-2.4V4.5C17.3 2.6 15.2 2 11.9 2zM9.4 3.7a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#3776AB" />
                  <path d="M12.1 22c3.1 0 5-.6 5-2.5v-1.9h-5.1v-.6h7.2c1.7 0 2.8-1.4 2.8-3.9 0-2.3-1.2-3.8-3.1-3.8h-1.2v1.7c0 1.8-1.5 3.3-3.3 3.3H9.3c-1.5 0-2.6.9-2.6 2.4v2.8c0 1.9 2.1 2.5 5.4 2.5zm2.5-1.7a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#FFD438" />
                </svg>
              </span>
              {/* MongoDB */}
              <span className="hero-dock-icon" title="MongoDB">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M12 1.5c-.3 0-.5.2-.6.4C10.5 4 7 8.5 7 13.5c0 3.8 2.5 6.8 5 8.5.3.2.7.2 1 0 2.5-1.7 5-4.7 5-8.5 0-5-3.5-9.5-4.4-11.6-.1-.2-.3-.4-.6-.4z" fill="#47A248" />
                  <path d="M12 2.5v19c2.3-1.6 4.5-4.3 4.5-8 0-4.5-3-8.5-4.5-11z" fill="#499D4A" />
                </svg>
              </span>
              {/* Git */}
              <span className="hero-dock-icon" title="Git">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M21.7 10.7L13.3 2.3a1.8 1.8 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3L13.2 12a2.2 2.2 0 0 1-2.4-.5L7.4 14.8a2.2 2.2 0 1 1-1.3-1.3l3.3-3.3a2.2 2.2 0 0 1 .5-2.4L2.3 10.7a1.8 1.8 0 0 0 0 2.6l8.4 8.4a1.8 1.8 0 0 0 2.6 0l8.4-8.4a1.8 1.8 0 0 0 0-2.6z" fill="#F05032" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
