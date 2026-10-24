'use client';
import { useTheme } from './ThemeContext';

export default function Marquee() {
  const { theme } = useTheme();

  const message = 'Note: This web app is still under construction 🚧. Stay tuned for latest updates.';
  const repeatCount = 6;

  const renderItems = () =>
    Array.from({ length: repeatCount }, (_, i) => (
      <span className="marquee-item" key={i}>
        <span className="marquee-text">{message}</span>
        <span className="marquee-separator" aria-hidden="true">•</span>
      </span>
    ));

  return (
    <aside
      className={`marquee-wrapper ${theme}`}
      id="marquee-banner"
      role="region"
      aria-label="Under construction announcement"
    >
      <div className="marquee-track">
        <div className="marquee-group">
          {renderItems()}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {renderItems()}
        </div>
      </div>
    </aside>
  );
}
