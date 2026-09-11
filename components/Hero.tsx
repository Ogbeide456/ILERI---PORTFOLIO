import { useState, useEffect } from 'react';

/*
 * The h1 is modelled as a list of "segments", each segment is either
 * plain text, a line-break, or a styled span.  We track a global
 * character counter and only render characters whose index < visibleCount.
 *
 * Typing speed: one character every 450 ms (0.45 s).
 */

type Segment =
  | { type: 'text'; value: string }
  | { type: 'br' }
  | { type: 'styled'; className: string; children: Segment[] };

const segments: Segment[] = [
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

const TOTAL_CHARS = countChars(segments);

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
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TOTAL_CHARS) return;

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 150); // 0.15 seconds per character

    return () => clearTimeout(timer);
  }, [visibleCount]);

  const offset = { current: 0 };
  const rendered = renderSegments(segments, visibleCount, offset);

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
            {rendered}
            {visibleCount < TOTAL_CHARS && (
              <span className="typewriter-cursor" aria-hidden="true" />
            )}
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
