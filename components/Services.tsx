const services = [
  {
    icon: '🌐',
    title: 'Web Development & Design',
    desc: 'Building responsive, performant websites and web apps using modern technologies like HTML, CSS, JavaScript, and React.',
  },
  {
    icon: '🎨',
    title: 'Graphics Design',
    desc: 'Creating visually stunning brand identities, marketing materials, and digital assets using CorelDRAW and design principles.',
  },
  {
    icon: '📐',
    title: 'Problem Solving – Maths & CS',
    desc: 'Providing solutions to complex mathematical and computer science problems with a structured, analytical approach.',
  },
  {
    icon: '📊',
    title: 'Data Analysis with Excel',
    desc: 'Cleaning, analyzing, and visualizing data using Microsoft Excel to help you make informed, data-driven decisions.',
  },
  {
    icon: '📣',
    title: 'Advertisement',
    desc: 'Crafting compelling digital advertisement content and creatives that capture attention and drive meaningful engagement.',
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="services-header reveal">
          <h2 className="sub-title">Services</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '16px' }}>
            Here&apos;s what I can do for you
          </p>
        </div>

        <div className="services-list">
          {services.map((service, i) => (
            <div className="service-card reveal" key={i}>
              <span className="service-icon">{service.icon}</span>
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
              <a href="#contact">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
