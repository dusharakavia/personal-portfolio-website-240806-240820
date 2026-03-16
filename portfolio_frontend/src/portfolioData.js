/**
 * Centralized editable content for the portfolio.
 * Replace placeholder values with your real details.
 */

export const portfolio = {
  seo: {
    title: "Your Name — Portfolio",
    description:
      "One-page personal portfolio featuring projects, skills, experience, and contact information.",
    url: "https://example.com",
  },
  identity: {
    name: "Your Name",
    role: "Frontend Engineer",
    tagline: "Building clean, accessible, high-performance web experiences.",
    location: "City, Country",
    availability: "Open to opportunities",
  },
  hero: {
    badges: ["React", "TypeScript", "UI Engineering", "Performance"],
    primaryCta: { label: "View Projects", targetId: "projects" },
    secondaryCta: { label: "Contact", targetId: "contact" },
  },
  about: {
    paragraphs: [
      "I’m a developer who enjoys turning complex problems into simple, delightful user experiences. I focus on building responsive, accessible interfaces and scalable UI systems.",
      "I care deeply about clarity: clean component architecture, thoughtful UX, and performance. I also enjoy collaborating with designers and product teams to ship polished features.",
    ],
    highlights: [
      {
        icon: "⚡",
        title: "Performance-minded",
        text: "Fast load times, smooth interactions, and measurable improvements.",
      },
      {
        icon: "🎨",
        title: "Design-aware",
        text: "Consistent spacing, typography, and visual hierarchy—without heavy frameworks.",
      },
      {
        icon: "🧩",
        title: "Component systems",
        text: "Reusable patterns and maintainable architecture for long-term velocity.",
      },
    ],
  },
  skills: [
    {
      category: "Frontend",
      level: "Advanced",
      items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Accessibility (a11y)"],
    },
    {
      category: "UI & Styling",
      level: "Advanced",
      items: ["Responsive Design", "CSS Architecture", "Design Systems", "Animations"],
    },
    {
      category: "Tooling",
      level: "Proficient",
      items: ["Git", "ESLint", "Testing Library", "CI/CD Basics"],
    },
  ],
  projects: [
    {
      title: "Project Alpha",
      description:
        "A modern web app demonstrating a clean component architecture, responsive layout, and strong UX fundamentals.",
      tags: ["React", "CSS", "SPA"],
      links: [
        { label: "Live Demo", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/example" },
      ],
    },
    {
      title: "Project Beta",
      description:
        "A dashboard-style UI with cards, filters, and data visualization-ready layout patterns.",
      tags: ["UI", "Components", "Responsive"],
      links: [
        { label: "Case Study", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/example" },
      ],
    },
    {
      title: "Project Gamma",
      description:
        "A lightweight landing page template optimized for performance, accessibility, and SEO basics.",
      tags: ["SEO", "Performance", "Accessibility"],
      links: [
        { label: "Live Demo", href: "https://example.com" },
        { label: "GitHub", href: "https://github.com/example" },
      ],
    },
  ],
  experience: [
    {
      company: "Company Name",
      role: "Frontend Engineer",
      timeframe: "2023 — Present",
      location: "Remote",
      bullets: [
        "Built reusable UI components and improved page performance through targeted optimizations.",
        "Collaborated with design and product to ship features with clear UX and strong accessibility.",
        "Introduced consistent patterns for state, layout, and styling to speed up iteration.",
      ],
    },
    {
      company: "Previous Company",
      role: "Software Engineer",
      timeframe: "2021 — 2023",
      location: "City",
      bullets: [
        "Delivered customer-facing features across multiple releases.",
        "Improved developer experience with tooling and documentation updates.",
        "Contributed to UI polish and responsive behaviors across the product.",
      ],
    },
  ],
  contact: {
    email: "you@example.com",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/your-profile" },
      { label: "GitHub", href: "https://github.com/your-handle" },
      { label: "Resume", href: "https://example.com/resume.pdf" },
    ],
  },
};
