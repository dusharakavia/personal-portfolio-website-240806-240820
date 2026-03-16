import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { portfolio } from "./portfolioData";

/**
 * Smoothly scroll to a section by id and optionally manage focus for accessibility.
 */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  // Use scrollIntoView for smooth scrolling; CSS scroll-padding-top offsets sticky nav height.
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Move focus to the section for screen readers without forcing a hard jump.
  // tabindex is set on sections to make them programmatically focusable.
  window.setTimeout(() => el.focus({ preventScroll: true }), 350);
}

function useActiveSection(sectionIds, options = {}) {
  const { rootMargin = "-30% 0px -60% 0px" } = options;
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is intersecting and closest to top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin, threshold: [0.1, 0.2, 0.3] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}

// PUBLIC_INTERFACE
function App() {
  const sectionIds = useMemo(
    () => ["home", "about", "skills", "projects", "experience", "contact"],
    []
  );

  const activeSection = useActiveSection(sectionIds);

  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = "mobile-menu";
  const mobileBtnRef = useRef(null);

  useEffect(() => {
    // Close mobile menu on Escape for a11y.
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileBtnRef.current?.focus?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close mobile menu when resizing to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const year = new Date().getFullYear();

  const onNavClick = (id) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const onSubmitContact = (e) => {
    e.preventDefault();

    // No backend requested. Provide a deploy-ready mailto fallback.
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="appRoot">
      <a className="skipLink" href="#home">
        Skip to content
      </a>

      <header className="navbar" role="banner">
        <div className="container navInner">
          <a
            href="#home"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("home");
            }}
            aria-label={`${portfolio.identity.name} home`}
          >
            <span className="brandMark" aria-hidden="true" />
            <span className="brandName">
              {portfolio.identity.name}
              <small>{portfolio.identity.role}</small>
            </span>
          </a>

          <nav className="navLinks" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  "navLinkBtn " + (activeSection === item.id ? "navLinkBtnActive" : "")
                }
                onClick={() => onNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="navCtas">
            <a
              className="btn btnPrimary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavClick("contact");
              }}
            >
              Let’s talk
              <span aria-hidden="true">→</span>
            </a>

            <button
              ref={mobileBtnRef}
              type="button"
              className="iconBtn hamburger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobileMenu" id={mobileMenuId}>
          <div className="container mobileMenuInner" role="navigation" aria-label="Mobile">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  "navLinkBtn " + (activeSection === item.id ? "navLinkBtnActive" : "")
                }
                onClick={() => onNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <main id="main" role="main">
        {/* HERO */}
        <section
          id="home"
          className="hero"
          tabIndex={-1}
          aria-label="Hero"
        >
          <div className="container heroGrid">
            <div className="card heroCard">
              <div className="kicker">
                <span className="kickerDot" aria-hidden="true" />
                {portfolio.identity.availability} • {portfolio.identity.location}
              </div>

              <h1 className="heroTitle">
                {portfolio.identity.name}
                <br />
                <span style={{ color: "var(--primary)" }}>{portfolio.identity.role}</span>
              </h1>

              <p className="heroSubtitle">{portfolio.identity.tagline}</p>

              <div className="heroBadges" aria-label="Highlights">
                {portfolio.hero.badges.map((b) => (
                  <span key={b} className="badge">
                    {b}
                  </span>
                ))}
              </div>

              <div className="heroActions">
                <button
                  type="button"
                  className="btn btnPrimary"
                  onClick={() => onNavClick(portfolio.hero.primaryCta.targetId)}
                >
                  {portfolio.hero.primaryCta.label} <span aria-hidden="true">→</span>
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => onNavClick(portfolio.hero.secondaryCta.targetId)}
                >
                  {portfolio.hero.secondaryCta.label}
                </button>

                <a
                  className="btn"
                  href={portfolio.contact.links.find((l) => l.label === "Resume")?.href || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </a>
              </div>
            </div>

            <aside className="card heroAside" aria-label="Quick facts">
              <div className="portrait" aria-hidden="true" />

              <ul className="quickList">
                <li className="quickItem">
                  <span className="quickIcon" aria-hidden="true">
                    ✨
                  </span>
                  <span className="quickText">
                    <strong>Modern UI</strong>
                    <span>Clean layout, subtle gradients, strong hierarchy</span>
                  </span>
                </li>
                <li className="quickItem">
                  <span className="quickIcon" aria-hidden="true">
                    ♿
                  </span>
                  <span className="quickText">
                    <strong>Accessible</strong>
                    <span>Semantic sections, focus management, readable contrast</span>
                  </span>
                </li>
                <li className="quickItem">
                  <span className="quickIcon" aria-hidden="true">
                    🚀
                  </span>
                  <span className="quickText">
                    <strong>Deploy-ready</strong>
                    <span>CRA build output + basic SEO/meta configured</span>
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section" tabIndex={-1} aria-label="About">
          <div className="container">
            <h2 className="sectionTitle">About</h2>
            <p className="sectionLead">
              A quick introduction—what I value, how I work, and the kind of products I like to build.
            </p>

            <div className="aboutGrid">
              <div className="card aboutCard">
                {portfolio.about.paragraphs.map((p, idx) => (
                  <p className="aboutP" key={idx}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="aboutHighlights">
                {portfolio.about.highlights.map((h) => (
                  <div key={h.title} className="highlight">
                    <div className="highlightTitle">
                      <i aria-hidden="true">{h.icon}</i>
                      {h.title}
                    </div>
                    <p>{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section" tabIndex={-1} aria-label="Skills">
          <div className="container">
            <h2 className="sectionTitle">Skills</h2>
            <p className="sectionLead">
              A snapshot of my most-used tools and strengths. Replace these with your real skill set.
            </p>

            <div className="grid skillGrid">
              {portfolio.skills.map((s) => (
                <div key={s.category} className="card skillCard">
                  <div className="skillHeader">
                    <strong>{s.category}</strong>
                    <span>{s.level}</span>
                  </div>

                  <div className="skillList" aria-label={`${s.category} skills`}>
                    {s.items.map((it) => (
                      <span key={it} className="pill">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section" tabIndex={-1} aria-label="Projects">
          <div className="container">
            <h2 className="sectionTitle">Projects</h2>
            <p className="sectionLead">
              Selected work with short descriptions and links. Keep it focused and outcome-driven.
            </p>

            <div className="grid projectsGrid">
              {portfolio.projects.map((p) => (
                <article key={p.title} className="card projectCard">
                  <div className="projectTop">
                    <h3 className="projectTitle">{p.title}</h3>
                    <span className="pill" style={{ background: "rgba(6,182,212,0.12)", borderColor: "rgba(6,182,212,0.18)" }}>
                      Featured
                    </span>
                  </div>

                  <p className="projectDesc">{p.description}</p>

                  <div className="projectTags" aria-label="Project tags">
                    {p.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="projectLinks">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        className={l.label.toLowerCase().includes("github") ? "smallLink" : "link"}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} — ${l.label}`}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" tabIndex={-1} aria-label="Experience">
          <div className="container">
            <h2 className="sectionTitle">Experience</h2>
            <p className="sectionLead">
              Roles, responsibilities, and impact. Use measurable outcomes where possible.
            </p>

            <div className="timeline">
              {portfolio.experience.map((e) => (
                <div key={`${e.company}-${e.role}`} className="card timelineItem">
                  <div className="timelineHeader">
                    <h3 className="timelineRole">
                      {e.role} • {e.company}
                    </h3>
                    <div className="timelineMeta">
                      {e.timeframe} • {e.location}
                    </div>
                  </div>

                  <ul className="timelineBullets">
                    {e.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section" tabIndex={-1} aria-label="Contact">
          <div className="container">
            <h2 className="sectionTitle">Contact</h2>
            <p className="sectionLead">
              Send a message (mailto fallback) or reach me through the links.
            </p>

            <div className="contactGrid">
              <div className="card contactCard">
                <form className="form" onSubmit={onSubmitContact}>
                  <div className="field">
                    <label className="label" htmlFor="name">
                      Name
                    </label>
                    <input className="input" id="name" name="name" type="text" autoComplete="name" required />
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input className="input" id="email" name="email" type="email" autoComplete="email" required />
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="message">
                      Message
                    </label>
                    <textarea className="textarea" id="message" name="message" required />
                  </div>

                  <button type="submit" className="btn btnPrimary">
                    Send message <span aria-hidden="true">→</span>
                  </button>

                  <p style={{ margin: 0, color: "var(--muted)", fontWeight: 700, fontSize: 13 }}>
                    This form opens your default email client. Add a backend later if you want in-app submissions.
                  </p>
                </form>
              </div>

              <div className="card contactCard">
                <div className="contactLinks" aria-label="Contact links">
                  <div className="contactRow">
                    <span className="quickIcon" aria-hidden="true" style={{ background: "rgba(59,130,246,0.12)" }}>
                      ✉️
                    </span>
                    <div>
                      <strong>Email</strong>
                      <span>
                        <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
                      </span>
                    </div>
                  </div>

                  {portfolio.contact.links.map((l) => (
                    <div key={l.label} className="contactRow">
                      <span className="quickIcon" aria-hidden="true" style={{ background: "rgba(6,182,212,0.12)", borderColor: "rgba(6,182,212,0.18)" }}>
                        🔗
                      </span>
                      <div>
                        <strong>{l.label}</strong>
                        <span>
                          <a href={l.href} target="_blank" rel="noreferrer">
                            {l.href}
                          </a>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14 }}>
                  <button type="button" className="btn" onClick={() => onNavClick("home")}>
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer" role="contentinfo">
          <div className="container footerInner">
            <div>
              © {year} {portfolio.identity.name}. Built with React.
            </div>
            <div className="footerLinks" aria-label="Footer links">
              <a href="#projects" onClick={(e) => { e.preventDefault(); onNavClick("projects"); }}>
                Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick("contact"); }}>
                Contact
              </a>
              <a
                href={portfolio.contact.links.find((l) => l.label === "GitHub")?.href || "https://github.com"}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
