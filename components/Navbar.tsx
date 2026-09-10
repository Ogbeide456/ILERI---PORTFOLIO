'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when a nav link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="container">
        <a href="#header" className="nav-logo">
          OS<span>.</span>
        </a>

        {/* Hamburger button — visible on mobile */}
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul>
            <li><a href="#header" onClick={handleLinkClick}>HOME</a></li>
            <li><a href="#about" onClick={handleLinkClick}>ABOUT ME</a></li>
            <li><a href="#services" onClick={handleLinkClick}>SERVICES</a></li>
            <li><a href="#portfolio" onClick={handleLinkClick}>PORTFOLIO</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
