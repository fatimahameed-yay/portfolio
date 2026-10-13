import React, { useEffect, useRef, useState } from "react";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.25 8h9.5m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const projects = [
  {
    name: "MyAEO",
    domain: "myaeo.app",
    url: "https://myaeo.app/",
    screenshot: "/screenshots/myAEO.png",
    category: "AI visibility",
    description:
      "A clear, data-led dashboard for tracking how brands appear across AI search.",
  },
  {
    name: "BooSend",
    domain: "boosend.ai",
    url: "https://boosend.ai/",
    screenshot: "/screenshots/boosend.png",
    category: "AI marketing",
    description:
      "A bold social-sales platform that brings Instagram outreach and automation into one flow.",
  },
  {
    name: "Notavo",
    domain: "notavo.ai",
    url: "https://notavo.ai/",
    screenshot: "/screenshots/notavo.png",
    category: "AI productivity",
    description:
      "A calmer way to turn calls into structured notes you can actually find again.",
  },
  {
    name: "Calzen",
    domain: "calzen.io",
    url: "https://calzen.io/",
    screenshot: "/screenshots/calzen.png",
    category: "SaaS · Scheduling",
    description:
      "A clean calendar experience that makes sharing availability and booking a meeting feel effortless.",
  },
  {
    name: "Teamcastle",
    domain: "teamcastle.io",
    url: "https://teamcastle.io/",
    screenshot: "/screenshots/teamcastle.png",
    category: "SaaS · Teamwork",
    description:
      "One friendly workspace that brings projects, communication, and team tools together.",
  },
  {
    name: "PowerBrix",
    domain: "powerbrix.ai",
    url: "https://powerbrix.ai/",
    screenshot: "/screenshots/powerbrix.png",
    livePreview: false,
    category: "AI · Private cloud",
    description:
      "A confident, privacy-first introduction to AI that runs on your own hardware.",
  },
  {
    name: "Virtuozo",
    domain: "virtuozo.app",
    url: "https://virtuozo.app/",
    screenshot: "/screenshots/virtuozo.png",
    category: "AI · Ad creative",
    description:
      "A safer, simpler flow for creating and managing AI-assisted Meta campaigns.",
  },
  {
    name: "ZorroMail",
    domain: "zorromail.app",
    url: "https://www.zorromail.app/",
    screenshot: "/screenshots/zorromail.png",
    category: "SaaS · Email",
    description:
      "A transparent email-services experience with flexible options and one clear bill.",
  },
  {
    name: "Liraa",
    domain: "liraa.ai",
    url: "https://liraa.ai/",
    screenshot: "/screenshots/liraa.png",
    category: "AI · Product",
    description:
      "A polished AI video experience for turning video into marketing-ready content.",
  },
];

const experience = [
  {
    role: "UI/UX Designer & Frontend Developer",
    company: "NCRA–UAV Lab",
    period: "Jun 2025 — Aug 2025",
    description:
      "Designed an end-to-end ground-control system experience, from user research and task flows to wireframes and high-fidelity prototypes. Built responsive React interfaces for live telemetry, dashboards, and operator tools.",
  },
  {
    role: "AI Application Developer",
    company: "BooSend · Freelance",
    period: "2025 — Present",
    description:
      "Designed and shipped an AI outreach product spanning a React Native app and marketing website, with user flows, wireframes, prototypes, and frontend implementation.",
  },
  {
    role: "AI Systems Researcher",
    company: "Independent",
    period: "2025",
    description:
      "Prototyped a real-time AI teaching avatar with multimodal interaction, exploring conversational UX, voice, and vision for scalable learning.",
  },
];

const capabilities = [
  {
    title: "Product & UI/UX",
    items: "User research · Wireframing · Interaction design · Prototyping · Usability testing · Responsive design",
  },
  {
    title: "Frontend",
    items: "React · Next.js · React Native · JavaScript · TypeScript · HTML5 · CSS3 · Tailwind CSS",
  },
  {
    title: "AI & engineering",
    items: "LLMs · Agentic pipelines · LangGraph · RAG · Python · FastAPI · REST APIs · PostgreSQL · MongoDB",
  },
];

function LiveProjectPreview({ project }) {
  const previewRef = useRef(null);
  const [previewWidth, setPreviewWidth] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = previewRef.current;
    if (!element || project.livePreview === false) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setPreviewWidth(entry.contentRect.width);
    });
    resizeObserver.observe(element);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        visibilityObserver.disconnect();
      },
      { rootMargin: "500px" },
    );
    visibilityObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const scale = previewWidth / 1440;

  return (
    <div
      className="project-preview"
      ref={previewRef}
      aria-label={`${project.name} website preview`}
    >
      <img
        className={`project-poster${loaded && project.livePreview !== false ? " is-hidden" : ""}`}
        src={project.screenshot}
        alt=""
        loading={project.livePreview === false ? "eager" : "lazy"}
      />
      {shouldLoad && project.livePreview !== false && (
        <iframe
          className={`project-live-frame${loaded ? " is-loaded" : ""}`}
          src={project.url}
          title={`${project.name} live website`}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          style={{
            width: "1440px",
            height: "900px",
            transform: `scale(${scale})`,
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
      <a
        className="preview-visit"
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} in a new tab`}
      >
        {project.livePreview !== false && <span className="live-indicator" />}
        {project.livePreview === false ? "Visit website" : "Live preview"}{" "}
        <ArrowIcon />
      </a>
    </div>
  );
}

function HeroVideo() {
  return (
    <video
      className="hero-video"
      src="/charater.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/avatar.png"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default function App() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const revealItems = document.querySelectorAll("[data-reveal]");
    revealItems.forEach((element) => {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <main className="portfolio">
      <section className="hero" id="home" aria-labelledby="intro-title">
        <HeroVideo />

        <header className="site-header">
          <a className="monogram" href="#home" aria-label="Fatima Hameed home">
            F<span>.</span>
          </a>
          <nav className="navigation" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <span className="availability">
            <span className="availability-dot" />
            Open to opportunities
          </span>
        </header>

        <section className="intro">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            UI/UX designer · Frontend developer
          </p>
          <p className="greeting">Hi, I&apos;m</p>
          <h1 id="intro-title">Fatima Hameed</h1>
          <p className="intro-copy">
            I turn thoughtful design into polished digital products — blending
            user-first interfaces with frontend that feels as good as it looks.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="/Fatima-Hameed-CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View my CV <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#work">
              Explore my work
            </a>
          </div>
        </section>

        <div className="hero-footer" aria-hidden="true">
          <span>Design with a little more feeling</span>
          <span className="footer-index">01 — PORTFOLIO</span>
          <span className="scroll-note">Scroll to explore ↓</span>
        </div>
      </section>

      <section className="content-section projects-section" id="work">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Things I&apos;ve helped bring to life<span>.</span></h2>
          </div>
          <p className="section-aside">
            A little product thinking, a lot of attention to detail.
          </p>
        </div>

        <div className="project-grid" data-reveal>
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <LiveProjectPreview project={project} />
              <div className="project-meta">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <span className="project-domain">{project.domain}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="research-projects">
          <div className="research-grid" data-reveal>
            <article>
              <span>AI · MULTI-AGENT SYSTEMS</span>
              <h3>AI Film Montage Pipeline</h3>
              <p>
                A multi-agent workflow that turns story prompts into
                storyboards, generated scenes, and a finished audiovisual
                montage.
              </p>
            </article>
            <article>
              <span>RESEARCH · RECOMMENDATION</span>
              <h3>Research Paper Discovery</h3>
              <p>
                A semantic paper-discovery experience using RAG and SBERT to
                surface relevant research across large academic collections.
              </p>
            </article>
            <article>
              <span>FULL-STACK · READING</span>
              <h3>Book Reading Platform</h3>
              <p>
                A full-stack reading app for progress tracking, bookmarks, and
                reader reviews, built around an accessible experience.
              </p>
            </article>
            <article>
              <span>REINFORCEMENT LEARNING · TORCS</span>
              <h3>Autonomous Racing Controller</h3>
              <p>
                A Q-learning controller trained to navigate a racing simulator,
                avoid collisions, and improve lap times.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section about-section" id="about">
        <div className="about-copy" data-reveal>
          <h2>Design-minded.<br />Curious by nature.</h2>
          <p>
            I&apos;m Fatima, a UI/UX designer and frontend developer based in
            Islamabad. I love making complex products feel clear, considered,
            and genuinely enjoyable to use.
          </p>
          <p>
            My work moves between user research, wireframes, prototypes, and
            production-ready interfaces. Lately, I&apos;ve been especially
            interested in AI products and the thoughtful experiences that make
            new technology feel human.
          </p>
          <a className="text-link" href="mailto:itsfatimahameed99@gmail.com">
            Have a project in mind? Let&apos;s talk <ArrowIcon />
          </a>
        </div>

        <div className="education-card" data-reveal>
          <span className="card-index">01 / EDUCATION</span>
          <h3>Building a strong foundation.</h3>
          <div className="education-item">
            <span className="education-year">Expected 2026</span>
            <h4>BS Computer Science</h4>
            <p>FAST-NUCES, Islamabad</p>
            <span className="education-honour">
              Dean&apos;s List · Federal Government Merit Scholar · Silver Medal
              Holder
            </span>
          </div>
          <div className="education-item">
            <span className="education-year">2022</span>
            <h4>F.Sc. — ICS</h4>
            <p>Fazia Inter College · 95%</p>
          </div>
        </div>
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Experience &amp; practice<span>.</span></h2>
          </div>
          <p className="section-aside">
            Thoughtful interfaces, grounded in how people actually work.
          </p>
        </div>

        <div className="experience-list" data-reveal>
          {experience.map((item, index) => (
            <article className="experience-item" key={item.role} data-reveal>
              <span className="experience-number">
                0{index + 1}
              </span>
              <div className="experience-main">
                <div className="experience-title">
                  <h3>{item.role}</h3>
                  <span>{item.company}</span>
                </div>
                <p>{item.description}</p>
              </div>
              <span className="experience-period">{item.period}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section skills-section">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Design meets detail<span>.</span></h2>
          </div>
        </div>
        <div className="capability-grid" data-reveal>
          {capabilities.map((capability, index) => (
            <article className="capability-card" key={capability.title}>
              <span className="card-index">0{index + 1}</span>
              <h3>{capability.title}</h3>
              <p>{capability.items}</p>
            </article>
          ))}
        </div>
        <p className="certifications">
          AWS Academy Cloud Foundations · Federal Government Merit Scholarship
          (2022–2026)
        </p>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-copy" data-reveal>
          <p className="contact-eyebrow">
            <span className="eyebrow-line" />
            HAVE A GOOD ONE IN MIND?
          </p>
          <h2>Let&apos;s make it<br />mean something<span>.</span></h2>
          <p className="contact-description">
            Have a product, prototype, or idea you care about? I&apos;d love to
            hear what you&apos;re building.
          </p>
        </div>
        <div className="contact-links" data-reveal>
          <a
            className="contact-email-link"
            href="mailto:itsfatimahameed99@gmail.com"
          >
            <span className="contact-email-copy">
              <span className="contact-link-label">GET IN TOUCH</span>
              <span className="contact-email">itsfatimahameed99@gmail.com</span>
            </span>
            <span className="contact-email-arrow"><ArrowIcon /></span>
          </a>
          <a
            className="contact-github"
            href="https://github.com/fatimahameed-yay"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-bottom">
          <a className="monogram" href="#home" aria-label="Back to top">
            F<span>.</span>
          </a>
          <span>Designed with care · Islamabad, Pakistan</span>
          <span>© 2026 Fatima Hameed</span>
        </div>
      </footer>
    </main>
  );
}
