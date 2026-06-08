export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <p>
          © {year} <span>Ogbeide Samuel Ilerioluwakiye</span>. Crafted with ❤️ using Next.js
        </p>
      </div>
    </footer>
  );
}
