import React, { useEffect, useRef, useState } from 'react';

/*
 * Stats component displaying key portfolio metrics:
 * - People visited this website
 * - Tools, technologies & packages used
 * - Hours spent building projects
 *
 * Restructured into a clean horizontal row with dividers matching the modern reference layout.
 */
interface StatConfig {
  id: number;
  targetNum: number;
  suffix: string;
  isK: boolean;
  line1: string;
  line2: string;
}

const STATS_DATA: StatConfig[] = [
  {
    id: 1,
    targetNum: 30,
    suffix: '+',
    isK: false,
    line1: 'People',
    line2: 'Visited',
  },
  {
    id: 2,
    targetNum: 50,
    suffix: '+',
    isK: false,
    line1: 'Tools &',
    line2: 'Technologies',
  },
  {
    id: 3,
    targetNum: 5,
    suffix: 'k+',
    isK: true,
    line1: 'Hours',
    line2: 'Spent',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState<string[]>(['00', '00', '00']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setDisplayValues(['00', '00', '00']);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const newValues = STATS_DATA.map((item) => {
        if (progress >= 1) {
          return `${item.targetNum}${item.suffix}`;
        }

        if (item.isK) {
          const currentVal = ease * item.targetNum;
          if (currentVal < 0.1) return '00';
          const formatted = currentVal.toFixed(1);
          return `${formatted.endsWith('.0') ? parseInt(formatted, 10) : formatted}k+`;
        } else {
          const currentVal = Math.floor(ease * item.targetNum);
          if (currentVal === 0) return '00';
          return `${currentVal}+`;
        }
      });

      setDisplayValues(newValues);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounters);
      } else {
        setDisplayValues(STATS_DATA.map((item) => `${item.targetNum}${item.suffix}`));
      }
    };

    animationFrameId = requestAnimationFrame(updateCounters);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  return (
    <div id="stats" ref={sectionRef} className="hero-stats-row" aria-label="Portfolio statistics">
      {STATS_DATA.map((stat, index) => (
        <React.Fragment key={stat.id}>
          {index > 0 && <div className="hero-stat-divider" aria-hidden="true" />}
          <div className="hero-stat-item">
            <span className="hero-stat-number">{displayValues[index]}</span>
            <span className="hero-stat-label">
              <span className="hero-stat-line">{stat.line1}</span>
              <span className="hero-stat-line">{stat.line2}</span>
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
