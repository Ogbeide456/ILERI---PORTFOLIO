import { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

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

      {/* Music player in header section */}
      <MusicPlayer />

      <div className="container">
        <div className="header-text">
          <div className="badge">
            <span className="dot" />
            Available for work
          </div>

          <h1 className="hero-typing-heading">
            {rendered}
            <span className="typewriter-cursor" aria-hidden="true" />
          </h1>

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
