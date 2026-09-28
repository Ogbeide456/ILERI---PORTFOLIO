import React, { useEffect, useRef, useState } from 'react';

/*
 * The stats section is a section that displays the number of people who have visited the website, the number of tools, technologies and packages used in building this website, and the number of hours spent on building this project.
 * 
 * It is a section that displays the number of people who have visited the website, the number of tools, technologies and packages used in building this website, and the number of hours spent on building this project.
 */
interface StatConfig {
  id: number;
  targetNum: number;
  suffix: string;
  isK: boolean;
  text: string;
}
//This is the interface for the stats section

const STATS_DATA: StatConfig[] = [
  {
    id: 1,
    targetNum: 30,
    suffix: '+',
    isK: false,
    text: 'People have visited this website',
  },
  {
    id: 2,
    targetNum: 50,
    suffix: '+',
    isK: false,
    text: 'Tools, technologies and packages were used in building this website',
  },
  {
    id: 3,
    targetNum: 5,
    suffix: 'k+',
    isK: true,
    text: 'Hours was spent on building this project',
  },
];
//This is the function for the stats section
export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null); //This is the ref for the stats section
  const [hasStarted, setHasStarted] = useState(false); //This is the state for the stats section
  const [displayValues, setDisplayValues] = useState<string[]>(['00', '00', '00']); //This is the state for the stats section

  //This is the effect for the stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.25 } //This is the threshold for the stats section // The threshold is set to 0.25, which means that the stats section will be animated when it is 25% visible in the viewport
    );

    //This is the observer for the stats section
    const currentElem = sectionRef.current; //This is the ref for the stats section
    if (currentElem) {
      observer.observe(currentElem); //This is the observer for the stats section
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds animation duration
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutExpo / easeOutCubic curve for a natural deceleration
      const ease = 1 - Math.pow(1 - progress, 3);

      const newValues = STATS_DATA.map((item) => {
        if (progress >= 1) {
          return `${item.targetNum}${item.suffix}`;
        }

        if (item.isK) {
          // For 5k+, count smoothly from 0.0 up to 5 with 1 decimal place, then append k+
          const currentVal = ease * item.targetNum;
          if (currentVal < 0.1) {
            return '00';
          }
          const formatted = currentVal.toFixed(1);
          return `${formatted.endsWith('.0') ? parseInt(formatted, 10) : formatted}k+`;
        } else {
          // For integer targets (30+, 50+)
          const currentVal = Math.floor(ease * item.targetNum);
          if (currentVal === 0) {
            return '00';
          }
          return `${currentVal}+`;
        }
      });

      setDisplayValues(newValues);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounters);
      } else {
        // Guarantee exact target strings at completion
        setDisplayValues(STATS_DATA.map((item) => `${item.targetNum}${item.suffix}`));
      }
    };

    animationFrameId = requestAnimationFrame(updateCounters);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted]);

  return (
    <section id="stats" ref={sectionRef} className="stats-section reveal">
      <div className="container">
        <div className="stats-wrapper">
          {STATS_DATA.map((stat, index) => (
            <div key={stat.id} className="stat-card">
              <span className="stat-number">{displayValues[index]}</span>
              <p className="stat-text">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
