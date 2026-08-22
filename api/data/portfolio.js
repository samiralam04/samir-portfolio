// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Portfolio Knowledge Base & System Prompt Generator
// ─────────────────────────────────────────────────────────────────────────────

const portfolio = {
  // ── Profile Overview ────────────────────────────────────────────────────────
  name: "Samir Alam",
  role: "Full Stack Developer & AI Engineer",
  summary:
    "Samir Alam is a Full Stack Developer and AI Engineer with a strong foundation in Java backend development, modern React frontends, and applied Deep Learning/Computer Vision systems. He has built production-grade projects spanning physiological analytics, attendance systems, AI-powered tools, real-time collaboration, and data engineering. He is currently pursuing his MCA and is passionate about building high-performance, maintainable software.",

  // ── Contact & Socials ───────────────────────────────────────────────────────
  contact: {
    email: "samiralam7005@gmail.com",
    phone: "+91 76049 86674",
    location: "India",
    github: "https://github.com/samiralam04",
    linkedin: "https://www.linkedin.com/in/samir-alam-3756582b6",
    instagram: "https://www.instagram.com/samir.__.04",
    portfolio: "https://samiralam04.github.io",
  },

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "SRM Institute of Science and Technology, Kattankulathur",
      status: "Currently pursuing",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Hindustan Institute of Technology and Science",
      status: "Completed",
    },
  ],

  // ── Technical Skills ───────────────────────────────────────────────────────
  skills: {
    languages: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "C/C++",
      "HTML5",
      "CSS3",
      "PHP",
    ],
    frameworks: [
      "React.js",
      "Next.js",
      "FastAPI",
      "PyTorch",
      "MediaPipe",
      "OpenCV",
      "Node.js",
      "Spring Boot",
      "Tailwind CSS",
      "Bootstrap 5",
      "Flask",
      "Express.js",
    ],
    tools: [
      "PostgreSQL",
      "MongoDB",
      "Git",
      "Docker",
      "Firebase",
      "MySQL",
      "Pandas",
      "NumPy",
      "Zustand",
      "Recharts",
      "Groq Cloud",
      "Vercel Serverless",
      "Three.js",
    ],
  },

  // ── Featured & Real-World Projects ─────────────────────────────────────────
  projects: [
    {
      name: "MindFlow",
      category: "AI / Computer Vision & Deep Learning",
      description:
        "Real-time physiological analytics platform that tracks and predicts cognitive load, fatigue, and behavioral states using a standard webcam feed. Combines computer vision (MediaPipe, OpenCV) with deep temporal modeling (BiLSTM + Attention in PyTorch) and asynchronous WebSockets in FastAPI with a React 19 dashboard.",
      technologies: [
        "Python",
        "FastAPI",
        "PyTorch",
        "MediaPipe",
        "OpenCV",
        "React 19",
        "Vite",
        "Zustand",
        "Recharts",
        "Tailwind CSS",
      ],
      highlights: [
        "Real-time physiological telemetry stream: EAR (Eye Aspect Ratio), gaze pitch/yaw, head pose, eyebrow tension, eye openness at 30 FPS",
        "Deep temporal inference: BiLSTM + Attention neural network analyzing 5-second temporal windows for cognitive load prediction",
        "Behavioral Intelligence Engine: Maps scores to states (Relaxed, Focused, Elevated Load, Overloaded, Fatigued, Distracted) with hysteresis-aware state machine",
        "Personalized baseline calibration to compensate for physiological variance",
        "Multi-factor pseudo-labeling data pipeline with research-grade dataset analytics and session replay",
        "Asynchronous WebSocket stream and high-performance dark-themed telemetry dashboard",
      ],
      links: {
        github: "https://github.com/samiralam04/MindFlow",
      },
    },
    {
      name: "SkyWings Airline Management System",
      category: "Full Stack / Java & Spring Boot",
      description:
        "Comprehensive full-stack airline management and flight reservation platform built with Java 17, Spring Boot 3 (Web, JPA, Security), and React 18 (Vite). Features flight search with smart airport suggestions, passenger booking workflows, secure JWT user authentication, role-based admin dashboard, and PostgreSQL database.",
      technologies: [
        "Java 17",
        "Spring Boot 3",
        "Spring Security",
        "Spring Data JPA",
        "PostgreSQL",
        "React 18",
        "Vite",
        "Tailwind CSS",
        "Axios",
        "JWT",
        "Maven",
      ],
      highlights: [
        "Smart flight search by origin, destination, and date with airport suggestions",
        "Complete flight booking workflow and passenger management",
        "Secure JWT authentication and role-based access control (User/Admin)",
        "Admin dashboard for managing flight schedules, routes, and bookings",
        "Relational database design with PostgreSQL and Spring Data JPA",
        "Modern responsive UI built with React 18, Vite, and Tailwind CSS",
      ],
      links: {
        github: "https://github.com/samiralam04/SkyWings",
      },
    },
    {
      name: "Product Data Explorer",
      category: "Full Stack / Data Engineering & Web Scraping",
      description:
        "Full-stack data scraping and exploration platform. Scrapes book data from World of Books using Playwright for browser automation, processes it through background jobs, deduplicates records, stores them in PostgreSQL, and presents clean data via a Next.js interface.",
      technologies: [
        "Next.js",
        "Playwright",
        "PostgreSQL",
        "Node.js",
        "Tailwind CSS",
      ],
      highlights: [
        "Playwright browser automation for scraping JavaScript-rendered content",
        "Background job processing for data extraction and cleaning",
        "Intelligent deduplication algorithms at scale",
        "Relational PostgreSQL database schema design",
        "Next.js frontend with dynamic filtering, sorting, and analytics",
        "End-to-end full-stack data pipeline architecture",
      ],
      links: {
        github: "https://github.com/samiralam04/Data-explorer",
      },
    },
    {
      name: "Portfolio & AI Assistant",
      category: "Full Stack / AI Integration & Web3D",
      description:
        "Futuristic personal developer portfolio with Cyber-Minimalist dark theme, real-time GitHub & LeetCode coding stats, interactive 3D elements, and 'Meet My AI' — an integrated conversational AI assistant powered by Groq LLM and Vercel Serverless Functions.",
      technologies: [
        "React 18",
        "Groq SDK",
        "Vercel Serverless",
        "Framer Motion",
        "Styled Components",
        "Three.js",
        "GitHub API",
        "LeetCode API",
      ],
      highlights: [
        "'Meet My AI' assistant powered by Groq for context-aware portfolio exploration and natural conversation",
        "Secure serverless API deployed on Vercel with CORS protection and anti-hallucination guardrails",
        "Mobile floating AI widget with glowing animations and sticky bottom input",
        "Live GitHub and LeetCode stats integration for real-time problem-solving and repository tracking",
        "Custom Cyber-Minimalist design system with glassmorphism and neon gradients",
      ],
      links: {
        github: "https://github.com/samiralam04/samir-portfolio",
        live: "https://samiralam04.github.io",
      },
    },
    {
      name: "RollWise",
      category: "Backend & Full Stack / Java Servlets",
      description:
        "Student Attendance Management System built with Java Servlets and PostgreSQL. Features role-based access control for teachers and administrators, automated attendance tracking, and streamlined reporting.",
      technologies: [
        "Java",
        "Servlets",
        "PostgreSQL",
        "HTML5",
        "CSS3",
        "Bootstrap 5",
      ],
      highlights: [
        "Role-based access control for administrators and teachers",
        "Automated attendance tracking and record keeping",
        "Automated attendance reporting and summaries",
        "Pure Java backend servlet architecture",
        "Relational database schema designed with PostgreSQL",
      ],
      links: {
        github: "https://github.com/samiralam04/RollWise",
      },
    },
    {
      name: "AI Resume Chatbot",
      category: "AI & NLP / Document Parsing",
      description:
        "Resume parser with an LLM-powered chat interface. Parses PDF resumes and lets recruiters interactively ask questions about a candidate's experience using a modern LLM.",
      technologies: ["Python", "AI/LLM", "PDF Parsing", "React.js", "FastAPI"],
      highlights: [
        "Interactive PDF resume parsing and text extraction",
        "Context-augmented LLM-powered Q&A interface",
        "Natural language interface tailored for recruiter inquiries",
        "Full-stack AI integration with low latency",
      ],
      links: {
        github: "https://github.com/samiralam04/ai-resume-chatbot",
      },
    },
    {
      name: "Story Board",
      category: "Frontend & Full Stack / Content Platform",
      description:
        "Application for writing, editing, managing, and exporting stories as PDF. Features include uploading thumbnail images, reading and deleting stories, and downloading them as PDFs.",
      technologies: [
        "React.js",
        "Firebase Firestore",
        "Firebase Storage",
        "JavaScript",
        "CSS3",
      ],
      highlights: [
        "Rich text story writing and editing interface",
        "Thumbnail image uploads stored in Firebase Storage",
        "Client-side PDF compilation and download",
        "Real-time database sync via Firebase Firestore",
      ],
      links: {
        live: "https://samiralam04.github.io/Story-Board/",
      },
    },
    {
      name: "Real-Time Chat App",
      category: "Frontend & Real-Time / WebSockets",
      description:
        "Chat application with real-time messaging, photo uploads, user blocking, and Firebase backend. API keys secured via environment variables.",
      technologies: [
        "React.js",
        "Firebase Realtime DB",
        "Firebase Storage",
        "CSS3",
      ],
      highlights: [
        "Instant real-time messaging powered by Firebase",
        "Profile photo and attachment uploads",
        "User blocking and privacy controls",
        "Secure credential management via environment variables",
      ],
      links: {
        live: "https://samiralam04.github.io/Real-Time-chatApp/",
      },
    },
    {
      name: "Tiny URL",
      category: "Backend / URL Shortening Service",
      description:
        "URL shortening application with user authentication, login, and session management. Generates unique short codes and redirects visitors to the original long URL.",
      technologies: ["Java", "Servlets", "PostgreSQL", "HTML5", "CSS3"],
      highlights: [
        "Fast URL shortening with collision-resistant unique short codes",
        "User registration, authentication, and HTTP session management",
        "High-performance lookup index in PostgreSQL",
        "Full link management dashboard for registered users",
      ],
      links: {
        github: "https://github.com/samiralam04/TinyUrl",
      },
    },
  ],
};

/**
 * Formats the portfolio data into a readable string for the system prompt.
 */
function formatForSystemPrompt() {
  let text = "";

  text += `NAME: ${portfolio.name}\n`;
  text += `ROLE: ${portfolio.role}\n`;
  text += `SUMMARY: ${portfolio.summary}\n\n`;

  if (portfolio.contact) {
    text += `CONTACT & PROFILES:\n`;
    text += `- Email: ${portfolio.contact.email}\n`;
    text += `- Phone: ${portfolio.contact.phone}\n`;
    text += `- Location: ${portfolio.contact.location}\n`;
    text += `- GitHub: ${portfolio.contact.github}\n`;
    text += `- LinkedIn: ${portfolio.contact.linkedin}\n`;
    text += `- Portfolio Website: ${portfolio.contact.portfolio}\n\n`;
  }

  text += `EDUCATION:\n`;
  for (const edu of portfolio.education) {
    text += `- ${edu.degree} at ${edu.institution} (${edu.status})\n`;
  }
  text += `\n`;

  text += `SKILLS:\n`;
  text += `  Languages: ${portfolio.skills.languages.join(", ")}\n`;
  text += `  Frameworks/Libraries: ${portfolio.skills.frameworks.join(", ")}\n`;
  text += `  Databases/Tools: ${portfolio.skills.tools.join(", ")}\n\n`;

  text += `PROJECTS:\n`;
  for (const project of portfolio.projects) {
    text += `\n  ${project.name} [${project.category}]\n`;
    text += `  Description: ${project.description}\n`;
    text += `  Technologies: ${project.technologies.join(", ")}\n`;
    text += `  Key highlights: ${project.highlights.join("; ")}\n`;
    if (project.links?.github) text += `  GitHub: ${project.links.github}\n`;
    if (project.links?.live) text += `  Live: ${project.links.live}\n`;
  }

  return text;
}

module.exports = { portfolio, formatForSystemPrompt };
