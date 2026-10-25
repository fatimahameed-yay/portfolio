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
    livePreview: false,
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
    company: "NCRA-UAV Lab",
    description:
      "Designed workflows and built responsive React dashboards for live telemetry and operator tools.",
  },
  {
    role: "Frontend Engineer",
    company: "Mentor LLC",
    description:
      "Developed responsive web interfaces and frontend features for Mentor LLC.",
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
            <a href="#experience">Experience</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>
          <span className="availability">
            <span className="availability-dot" />
            Open to opportunities
          </span>
        </header>

        <section className="intro">
          <p className="eyebrow">
            UI/UX designer · Frontend developer
          </p>
          <p className="greeting">Hi, I&apos;m</p>
          <h1 id="intro-title">Fatima Hameed</h1>
          <p className="intro-copy">
            I turn thoughtful design into polished digital products, blending
            user-first interfaces with frontend that feels as good as it looks.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#contact"
            >
              Let&apos;s connect <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#work">
              Explore my work
            </a>
          </div>
        </section>

        <div className="hero-footer" aria-hidden="true">
          <span>Design with a little more feeling</span>
          <span className="footer-index">01 - PORTFOLIO</span>
          <span className="scroll-note">Scroll to explore ↓</span>
        </div>
      </section>

      <section className="content-section projects-section" id="work">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Projects I&apos;ve given a new identity to<span>.</span></h2>
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
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Experience<span>.</span></h2>
          </div>
          <p className="section-aside">
            Frontend engineering and product design.
          </p>
        </div>

        <div className="experience-list" data-reveal>
          {experience.map((item, index) => (
            <article className="experience-item" key={item.role}>
              <span className="experience-number">0{index + 1}</span>
              <div className="experience-main">
                <div className="experience-title">
                  <h3>{item.role}</h3>
                  <span>{item.company}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="frontend-stack" data-reveal>
          <span>FRONTEND</span>
          <p>React · Next.js · TypeScript · JavaScript · HTML · CSS · Tailwind</p>
        </div>
        <div className="experience-certifications" data-reveal>
          <h3>CERTIFICATIONS</h3>
          <ul>
            <li>
              <img
                src="/aws-certified-cloud-practitioner.png"
                alt="AWS Certified Cloud Practitioner badge"
                loading="lazy"
              />
              <span>AWS Certified Cloud Practitioner</span>
            </li>
            <li>
              <img
                src="/aws-certified-ai-practitioner.png"
                alt="AWS Certified AI Practitioner badge"
                loading="lazy"
              />
              <span>AWS Certified AI Practitioner</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section reviews-section" id="reviews">
        <div className="section-heading" data-reveal>
          <div>
            <h2>Reviews<span>.</span></h2>
          </div>
        </div>
        <blockquote className="review-placeholder" data-reveal>
          <span className="review-quote-mark" aria-hidden="true">“</span>
          <div>
            <p>A thoughtful review will be featured here soon.</p>
            <cite>Placeholder testimonial</cite>
          </div>
        </blockquote>
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
