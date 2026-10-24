'use client';
import { useTheme } from './ThemeContext';

export default function Marquee() {
  const { theme } = useTheme();

  const message = 'Note: This web app is currently under construction 🚧. Stay tuned for latest updates.';

  // Repeat the message enough times to fill the viewport and create seamless loop
  const repetitions = 6;

  return (
    <div className={`marquee-wrapper ${theme}`} id="marquee-banner">
      <div className="marquee-track" aria-label="Scrolling announcement banner">
        {Array.from({ length: repetitions }).map((_, i) => (
          <span className="marquee-text" key={i}>
            {message}
            <span className="marquee-separator">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
