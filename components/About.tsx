'use client';
import { useState } from 'react';

type TabId = 'skills' | 'experience' | 'education';

const tabs: { id: TabId; label: string }[] = [
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'  },
];

const tabContent: Record<TabId, { title: string; subtitle: string }[]> = {
  skills: [
    { title: 'Front-End Web Development',          subtitle: 'HTML, CSS, JavaScript and ReactJs' },
    { title: 'Data Analysis',                       subtitle: 'Microsoft Excel' },
    { title: 'Graphics Design',                     subtitle: 'CorelDRAW' },
    { title: 'Prompt Engineering',                  subtitle: 'ChatGPT & LLMs' },
    { title: 'Problem Solving',                     subtitle: 'Mathematics, Computer Science' },
  ],
  experience: [
    { title: '2022 – 2024',              subtitle: 'Web Design & Development' },
    { title: 'Dec 2023 – Mar 2024',      subtitle: 'Prompt Engineering: Introduction to LLMs by OBTranslate' },
  ],
  education: [
    { title: '2022 – 2026',  subtitle: 'B.Sc. Industrial Mathematics – Computer Science · Covenant University, Ota, Ogun State' },
    { title: '2016 – 2022',  subtitle: 'Deeper Life High School, Lagos Campus, Mowe, Ogun State' },
    { title: '2012 – 2016',  subtitle: 'Edidot School, Badore, Lagos' },
  ],
};

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>('skills');

  return (
    <section id="about">
      <div className="container">
        <div className="about-row reveal">

          {/* Left column — avatar */}
          <div className="about-col-1">
            <div className="avatar-wrapper">
              <div className="avatar-placeholder">🧑‍💻</div>
            </div>
          </div>

          {/* Right column — content */}
          <div className="about-col-2">
            <h2 className="sub-title">About Me</h2>

            <p className="about-desc">
              I&apos;m a passionate Front-End Developer currently studying Industrial
              Mathematics – Computer Science at Covenant University. I love building
              clean, modern web interfaces and solving complex problems through code,
              design, and data.
            </p>

            {/* Tab navigation */}
            <div className="tab-titles">
              {tabs.map((tab) => (
                <p
                  key={tab.id}
                  className={`tab-links${activeTab === tab.id ? ' active-link' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </p>
              ))}
            </div>

            {/* Tab content */}
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={tab.id}
                className={`tab-contents${activeTab === tab.id ? ' active-tab' : ''}`}
              >
                <ul>
                  {tabContent[tab.id].map((item, i) => (
                    <li key={i}>
                      {item.title}
                      <span>{item.subtitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
