export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-logo">
              <a href="/" className="nav-logo">
                OS<span>.</span>
              </a>
            </p>
            <p className="footer-tagline">
              Let&apos;s build something great together.
            </p>

            <div className="footer-social">
              <a href="https://github.com/Ogbeide456" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.74.084-.724.084-.724 1.203.085 1.838 1.236 1.838 1.236 1.07 1.837 2.808 1.306 3.49.998.108-.776.419-1.306.762-1.606-2.664-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.525.117-3.176 0 0 1.008-.322 3.301 1.23A11.43 11.43 0 0 1 12 5.67c1.021 0 2.043.136 3.002.401 2.293-1.552 3.3-1.23 3.3-1.23.653 1.651.241 2.873.117 3.176.77.84 1.236 1.91 1.236 3.221 0 4.606-2.807 5.622-5.478 5.922.431.372.812 1.108.812 2.236v3.313c0 .319.194.694.799.576A12.01 12.01 0 0 0 24 12c0-6.627-5.373-12-12-12Z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/samuel-ogbeide-a99988284/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.851 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.606 0 4.267 2.373 4.267 5.457v6.284ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm-1.777 2.33h3.554v12.842H3.56V9.763Zm0 0"/>
                </svg>
              </a>

              <a href="https://x.com/OgbeideSpezial" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.626L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/ileri9806/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.694-4.919-4.919C2.175 15.584 2.163 15.204 2.163 12c0-3.205.012-3.584.07-4.849.148-3.228 1.667-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163Zm0 1.8c-3.163 0-3.509.012-4.739.068-2.477.112-3.672 1.307-3.784 3.784-.056 1.23-.068 1.576-.068 4.739s.012 3.509.068 4.739c.112 2.477 1.307 3.672 3.784 3.784 1.23.056 1.576.068 4.739.068s3.509-.012 4.739-.068c2.477-.112 3.672-1.307 3.784-3.784.056-1.23.068-1.576.068-4.739s-.012-3.509-.068-4.739c-.112-2.477-1.307-3.672-3.784-3.784C15.509 3.975 15.163 3.963 12 3.963Zm0 3.192A4.845 4.845 0 1 1 12 16.845 4.845 4.845 0 0 1 12 7.155Zm0 1.8A3.045 3.045 0 1 0 12 15.045 3.045 3.045 0 0 0 12 8.955Zm5.34-2.67a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/about">About Me</a>
            <a href="/services">Services</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <a href="mailto:ileriunique40@gmail.com">ileriunique40@gmail.com</a>
            <a href="tel:+2348128358675">+234 812 835 8675</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} <span>Ogbeide Samuel Ilerioluwakiye</span>. Crafted with ❤️ using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
