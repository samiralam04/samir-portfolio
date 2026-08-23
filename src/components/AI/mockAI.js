// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// mockAI.js — Hybrid AI service (Real Groq Backend + Smart Local Fallback)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE BASE (Used for local fallback & fast keyword matching)
// ─────────────────────────────────────────────────────────────────────────────

const KNOWLEDGE = {
  projects: [
    {
      name: "MindFlow",
      key: "mindflow",
      aliases: ["mind flow", "physiological analytics", "cognitive load"],
      tech: [
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
      database: "FastAPI / WebSocket Stream",
      frontend: "React 19 & Vite",
      backend: "Python (FastAPI, PyTorch, MediaPipe, OpenCV)",
      scraping: false,
      description:
        "MindFlow is a state-of-the-art, real-time physiological analytics platform that tracks and predicts cognitive load, fatigue, and behavioral states using a standard webcam feed. By combining computer vision (MediaPipe, OpenCV) with deep temporal modeling (BiLSTM + Attention in PyTorch), the system provides high-fidelity insights into mental effort and cognitive performance via an asynchronous FastAPI WebSocket stream and React 19 telemetry dashboard.",
      backendStrength: true,
      howWorks:
        "MindFlow captures 30 FPS physiological telemetry (EAR, gaze pitch/yaw, head pose, eyebrow tension, eye openness) via OpenCV and MediaPipe. A deep BiLSTM Attention model analyzes 5-second temporal windows to predict cognitive load and maps scores to behavioral states (Relaxed, Focused, Elevated Load, Overloaded, Fatigued, Distracted). A React 19 dashboard renders live telemetry charts, state indicators, and session replay.",
    },
    {
      name: "Developer Portfolio & AI Assistant",
      key: "portfolio",
      aliases: [
        "developer portfolio",
        "ai assistant",
        "meet my ai",
        "portfolio website",
      ],
      tech: [
        "React 18",
        "Groq SDK",
        "Vercel Serverless",
        "Framer Motion",
        "Styled Components",
        "Three.js",
        "GitHub API",
        "LeetCode API",
      ],
      database: "Vercel Serverless / Groq Cloud",
      frontend: "React 18 & Styled Components",
      backend: "Node.js (Vercel Serverless Functions)",
      scraping: false,
      description:
        "Futuristic personal developer portfolio with Cyber-Minimalist dark theme, real-time GitHub & LeetCode coding stats, interactive 3D elements, and 'Meet My AI' — an integrated conversational AI assistant powered by Groq LLM and Vercel Serverless Functions.",
      backendStrength: true,
      howWorks:
        "Built with React 18 and Framer Motion, featuring real-time API integrations with GitHub and LeetCode. The 'Meet My AI' assistant connects via a secure Vercel serverless function to Groq Cloud for ultra-low latency contextual chat.",
    },
    {
      name: "SkyWings Airline Management System",
      key: "skywings",
      aliases: [
        "skywings",
        "airline management",
        "flight booking",
        "flight reservation",
        "sky wings",
      ],
      tech: [
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
      ],
      database: "PostgreSQL",
      frontend: "React 18 (Vite) & Tailwind CSS",
      backend: "Java 17 & Spring Boot 3 (Spring Security, Spring Data JPA)",
      scraping: false,
      description:
        "SkyWings is a full-stack airline management and flight reservation platform. Built with Java 17, Spring Boot 3, and React 18 with Tailwind CSS. It features flight search with smart airport suggestions, passenger booking workflows, secure JWT authentication, role-based admin dashboard, and PostgreSQL database.",
      backendStrength: true,
      whyDatabase:
        "PostgreSQL with Spring Data JPA provides robust relational mapping for flights, passenger reservations, user profiles, and airport schedules with ACID guarantees.",
      howWorks:
        "Users search for flights with origin, destination, and date filters with smart airport suggestions. Passengers can select seats, fill details, and book tickets with JWT-secured authentication. Administrators have role-based access to manage flight schedules, view passenger rosters, and control bookings.",
    },
    {
      name: "RollWise",
      key: "rollwise",
      tech: ["Java", "Servlets", "PostgreSQL"],
      database: "PostgreSQL",
      frontend: null,
      backend: "Java Servlets",
      scraping: false,
      description:
        "RollWise is a Student Attendance Management System built with Java Servlets and PostgreSQL. It features role-based access control for teachers and administrators, automated attendance tracking, and streamlined reporting. It demonstrates Samir's strong command of backend Java development and relational database design.",
      backendStrength: true,
      whyDatabase:
        "PostgreSQL was chosen for RollWise because attendance and user data is structured and relational by nature. PostgreSQL's ACID compliance and support for complex joins made it ideal for managing student records, teacher roles, and attendance logs reliably.",
      howWorks:
        "RollWise works as a Java Servlet web application. Teachers log in with role-based credentials and mark attendance for their classes. The system stores records in PostgreSQL, supports querying attendance by date/class/student, and generates reports automatically. Role-based access ensures administrators and teachers see only what's relevant to them.",
    },
    {
      name: "AI Resume Chatbot",
      key: "ai resume",
      aliases: ["resume chatbot", "resume bot", "chatbot"],
      tech: ["AI/LLM", "PDF parsing", "Python"],
      database: null,
      frontend: null,
      backend: "Python",
      scraping: false,
      description:
        "AI Resume Chatbot is a full-stack AI-powered application that parses PDF resumes and lets recruiters interactively chat with an LLM about the candidate's experience, skills, and background. It demonstrates Samir's ability to integrate modern AI/LLM capabilities into practical applications.",
      backendStrength: false,
      howWorks:
        "The application accepts a PDF resume upload, parses the content, and feeds it as context to an LLM. Recruiters can then ask questions in natural language — like 'What is their experience with Python?' or 'Do they have leadership experience?' — and get accurate answers derived from the resume content.",
    },
    {
      name: "Story Board",
      key: "story board",
      aliases: ["storyboard"],
      tech: ["React", "Firebase"],
      database: "Firebase",
      frontend: "React",
      backend: "Firebase",
      scraping: false,
      description:
        "Story Board is a versatile storytelling platform where users can write, edit, and manage their stories. Key features include uploading thumbnail images, reading and deleting stories, and downloading them as PDFs. It's built with React and Firebase, showcasing Samir's frontend skills and real-time database integration.",
      backendStrength: false,
      whyDatabase:
        "Firebase was used for Story Board because it provides a real-time NoSQL database with built-in authentication and file storage — perfect for a content platform where users write and manage their own stories without needing a traditional server.",
      howWorks:
        "Users create an account, write stories in a rich editor, upload thumbnail images, and manage their story library. Stories are stored in Firebase Firestore, images in Firebase Storage. Users can also download stories as PDF files directly from the browser.",
    },
    {
      name: "Tiny URL",
      key: "tiny url",
      aliases: ["tinyurl", "url shortener", "url shortening"],
      tech: ["Java", "Servlets", "PostgreSQL"],
      database: "PostgreSQL",
      frontend: null,
      backend: "Java Servlets",
      scraping: false,
      description:
        "Tiny URL is a Java servlet-based URL shortening application. It features full user registration, login, and session management, with all data stored securely in a PostgreSQL database. This project demonstrates Samir's backend proficiency — from HTTP session handling to relational database design.",
      backendStrength: true,
      whyDatabase:
        "PostgreSQL stores the URL mappings, user accounts, and session data reliably. Its indexing ensures fast lookup when redirecting a short URL to its original destination.",
      howWorks:
        "A user registers, logs in, and submits a long URL. The server generates a unique short code, stores the mapping in PostgreSQL, and returns the short URL. When anyone visits the short link, the server looks up the mapping and redirects instantly. Session management ensures users can manage their own link history.",
    },
    {
      name: "Real-Time Chat App",
      key: "real-time chat",
      aliases: ["chat app", "realtime chat", "real time chat"],
      tech: ["React.js", "Firebase"],
      database: "Firebase",
      frontend: "React.js",
      backend: "Firebase",
      scraping: false,
      description:
        "A real-time chat application built with React.js and Firebase. Features include real-time messaging, user photo uploads, and a user-blocking system. API keys are secured via environment variables. The project highlights Samir's ability to build responsive, real-time collaborative experiences.",
      backendStrength: false,
      whyDatabase:
        "Firebase Realtime Database powers the messaging — it pushes new messages to connected clients instantly without polling, which is exactly what a chat application needs.",
      howWorks:
        "Users sign up, choose a contact, and start chatting in real time. Messages are synced instantly via Firebase. Users can upload profile photos stored in Firebase Storage, and block other users to restrict incoming messages. API keys are kept secure via environment variables.",
    },
    {
      name: "Product Data Explorer",
      key: "product data explorer",
      aliases: ["data explorer", "product explorer"],
      tech: ["Next.js", "Playwright", "PostgreSQL"],
      database: "PostgreSQL",
      frontend: "Next.js",
      backend: "Node.js / Playwright",
      scraping: true,
      description:
        "Product Data Explorer is a full-stack data scraping and exploration platform. It scrapes book data from World of Books using Playwright for browser automation, processes it through background jobs, deduplicates records, and stores them in PostgreSQL. A modern Next.js interface allows users to browse and filter the cleaned product data. This is Samir's most architecturally advanced project — demonstrating skills in background job processing, web scraping, database design, and full-stack development.",
      backendStrength: true,
      architecture:
        "The architecture consists of three layers:\n\n• Scraping Layer — Playwright headless browser automation scrapes book listings and product details from World of Books.\n• Processing Layer — Background jobs handle deduplication, data cleaning, and storage into a PostgreSQL database.\n• Presentation Layer — A Next.js frontend fetches and displays the clean data with filtering and analytics features.\n\nThis separation of concerns makes the system scalable and maintainable.",
      whyDatabase:
        "PostgreSQL was chosen for its robust support for complex queries, ACID compliance, and its ability to handle structured product data with multiple attributes. Its powerful indexing made deduplication queries efficient at scale.",
      howWorks:
        "Playwright launches a headless browser that navigates World of Books, extracts book listings, prices, and product details, and passes the raw data to background processing jobs. Those jobs clean, deduplicate, and store the data in PostgreSQL. The Next.js frontend then queries the database and presents the clean data in a browsable, filterable interface.",
      whyPlaywright:
        "Playwright was chosen because World of Books renders content with JavaScript — simple HTTP scrapers can't access the final DOM. Playwright controls a real browser headlessly, so it can interact with JavaScript-rendered pages, click through pagination, and extract accurate, complete product data.",
    },
  ],

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
      "Node.js",
      "Spring Boot",
      "Tailwind CSS",
      "Bootstrap 5",
      "Flask",
      "Express.js",
    ],
    tools: ["PostgreSQL", "MongoDB", "Git", "Docker", "Firebase", "MySQL"],
  },

  education: {
    degree: "Master of Computer Applications (MCA) – Specialisation in Gen AI",
    institution: "SRM Institute of Science and Technology (SRM IST)",
    current: "Currently pursuing MCA (Gen AI) at SRM IST",
    previous: "Bachelor of Computer Applications (BCA) – Hindustan Institute of Technology and Science",
  },

  samir: {
    name: "Samir Alam",
    role: "Full Stack Developer",
    summary:
      "Samir Alam is a Full Stack Developer with a strong foundation in both Java backend development and modern React frontends. He has built 6 real-world projects spanning attendance systems, AI-powered tools, real-time applications, and data engineering. He is currently pursuing his MCA with a specialisation in Generative AI at SRM Institute of Science and Technology (SRM IST) and is passionate about building clean, maintainable software.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAST LOCAL CONVERSATIONAL POOLS
// ─────────────────────────────────────────────────────────────────────────────

const RESPONSES = {
  greeting: [
    "Hey! 👋 I'm Samir's AI assistant. What would you like to know about his work?",
    "Hello! ✦ Feel free to ask me about Samir's projects, skills, or development journey.",
    "Hey there! 🚀 I'm here to help you explore Samir's portfolio. What are you curious about?",
    "Hi! 👋 I can tell you about Samir's projects, tech stack, education, or development journey.",
  ],
  thanks: [
    "You're welcome! 😊 Want to explore another project?",
    "Anytime! ✦ Let me know what else you'd like to know.",
    "Happy to help! 🚀 Is there anything else you'd like to explore?",
    "You're welcome! Feel free to ask about any of Samir's other projects or skills.",
  ],
  farewell: [
    "See you! 👋 Feel free to come back anytime to explore Samir's work.",
    "Bye! 🚀 Hope you enjoyed exploring the portfolio.",
    "Take care! 👋 Come back if you have more questions about Samir's projects.",
  ],
  positive: [
    "Glad you liked it! 😄 Want to explore another project?",
    "✦ There's more to explore — just ask!",
    "Thanks! 🚀 If you'd like, I can tell you about another part of Samir's work.",
    "😄 Glad to hear it! Want to dive deeper or check out another project?",
  ],
  howAreYou: [
    "I'm doing great! ✦ Ready to tell you about Samir's work. What would you like to explore?",
    "All good here! 😄 What would you like to know about Samir's projects?",
  ],
  whatCanYouDo: [
    "I can tell you about Samir's projects, technical skills, education, and development journey. You can also click ✦ Ask AI on any project card for a focused conversation about that specific project.",
  ],
  whoAreYou: [
    "I'm Samir's AI portfolio assistant. ✦ Think of me as a quick way to explore his work without digging through every section.",
    "I'm the AI assistant for Samir Alam's portfolio. Ask me about his projects, skills, education, or development journey.",
  ],
  fallback: [
    "That's an interesting one! 😄 I currently know most about Samir's projects, skills, education, and development journey. Try asking me about one of those.",
    "I'm mainly here to help you explore Samir's portfolio. ✦ You can ask about his projects, technologies, education, or development experience.",
    "I may not have that detail yet, but I can tell you about Samir's projects, skills, or development journey.",
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalizeMessage(msg) {
  return msg
    .toLowerCase()
    .trim()
    .replace(/[!?.]+$/, "")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL FALLBACK GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

function matchesProject(norm, project) {
  if (norm.includes(project.key)) return true;
  if (project.aliases) return project.aliases.some((a) => norm.includes(a));
  return false;
}

function findProject(norm) {
  return KNOWLEDGE.projects.find((p) => matchesProject(norm, p));
}

function formatSkills() {
  const { languages, frameworks, tools } = KNOWLEDGE.skills;
  return (
    `Here's a breakdown of Samir's technical skills:\n\n` +
    `Languages:\n${languages.map((l) => `• ${l}`).join("\n")}\n\n` +
    `Frameworks & Libraries:\n${frameworks.map((f) => `• ${f}`).join("\n")}\n\n` +
    `Databases & Tools:\n${tools.map((t) => `• ${t}`).join("\n")}`
  );
}

function formatAllProjects() {
  return (
    `Samir has built 6 projects:\n\n` +
    KNOWLEDGE.projects
      .map((p) => `• ${p.name} — ${p.tech.join(", ")}`)
      .join("\n") +
    `\n\nWould you like to know more about any specific project?`
  );
}

function formatEducation() {
  const { degree, institution, current } = KNOWLEDGE.education;
  return (
    `Samir's educational background:\n\n` +
    `• ${degree}\n  ${institution}\n\n` +
    `• ${current}\n\n` +
    `His academic foundation in Computer Applications gives him a solid grounding in algorithms, data structures, databases, and software engineering principles.`
  );
}

function formatBackendProjects() {
  const bp = KNOWLEDGE.projects.filter((p) => p.backendStrength);
  return (
    `Samir's strongest backend projects are:\n\n` +
    bp.map((p) => `• ${p.name} (${p.tech.join(", ")})`).join("\n") +
    `\n\nProduct Data Explorer is arguably the most advanced — combining Playwright scraping, background jobs, PostgreSQL, and a Next.js frontend. RollWise and Tiny URL showcase deep Java backend skills with PostgreSQL.`
  );
}

function whySamir() {
  return (
    `Here's why Samir stands out as a developer:\n\n` +
    `• Full-stack range — comfortable from Java Servlets to React frontends\n` +
    `• Real projects — 6 deployed/production-ready projects, not just tutorials\n` +
    `• Backend depth — PostgreSQL, session management, background job processing\n` +
    `• AI curiosity — already building LLM-powered tools like the AI Resume Chatbot\n` +
    `• Clean code mindset — thoughtful about architecture and maintainability\n` +
    `• Continuous learner — currently pursuing MCA while shipping real projects\n\n` +
    `He brings both technical depth and a genuine passion for building software.`
  );
}

function answerAboutProject(norm, project) {
  if (
    norm.includes("architect") ||
    norm.includes("how does") ||
    norm.includes("how it work") ||
    norm.includes("explain")
  ) {
    const answer =
      project.architecture || project.howWorks || project.description;
    return { answer, topic: "architecture" };
  }

  if (
    norm.includes("tech") ||
    norm.includes("technolog") ||
    norm.includes("stack") ||
    norm.includes("built with")
  ) {
    const answer = `${project.name} was built using:\n\n${project.tech.map((t) => `• ${t}`).join("\n")}\n\n${project.description}`;
    return { answer, topic: "technology" };
  }

  if (
    norm.includes("database") ||
    norm.includes("db") ||
    norm.includes("sql") ||
    norm.includes("postgres") ||
    norm.includes("mongo") ||
    (norm.includes("firebase") && project.database)
  ) {
    if (project.database) {
      const base = `${project.name} uses **${project.database}** for data storage.`;
      const extra = project.whyDatabase ? `\n\n${project.whyDatabase}` : "";
      return { answer: base + extra, topic: "database" };
    }
    return { answer: project.description, topic: "database" };
  }

  if (
    norm.includes("why postgres") ||
    norm.includes("why sql") ||
    norm.includes("why database") ||
    (norm.startsWith("why") && norm.length < 10)
  ) {
    const answer =
      project.whyDatabase ||
      `${project.database || "PostgreSQL"} was selected based on the data requirements of ${project.name}.`;
    return { answer, topic: "database" };
  }

  if (norm.includes("playwright") || norm.includes("scrap")) {
    if (project.scraping && project.whyPlaywright) {
      return { answer: project.whyPlaywright, topic: "scraping" };
    }
  }

  return { answer: project.description, topic: "overview" };
}

function getLocalFallbackResponse(norm, ctx) {
  // ── Conversational intents (must be checked before keyword matching) ─────
  if (
    norm === "hi" ||
    norm === "hey" ||
    norm === "hello" ||
    norm === "hii" ||
    norm === "hiii" ||
    norm.startsWith("hi ") ||
    norm.startsWith("hey ") ||
    norm.startsWith("hello ")
  ) {
    return { response: pick(RESPONSES.greeting), contextUpdate: {} };
  }
  if (
    norm.includes("thank") ||
    norm === "ty" ||
    norm === "thx" ||
    norm === "thanks"
  ) {
    return { response: pick(RESPONSES.thanks), contextUpdate: {} };
  }
  if (
    norm === "bye" ||
    norm === "goodbye" ||
    norm === "see you" ||
    norm === "cya" ||
    norm.includes("good bye")
  ) {
    return { response: pick(RESPONSES.farewell), contextUpdate: {} };
  }
  if (norm.includes("how are you") || norm === "how r u" || norm === "how r you") {
    return { response: pick(RESPONSES.howAreYou), contextUpdate: {} };
  }
  if (
    norm.includes("what can you do") ||
    norm.includes("what do you do") ||
    norm.includes("what can u do") ||
    norm.includes("help")
  ) {
    return { response: pick(RESPONSES.whatCanYouDo), contextUpdate: {} };
  }
  if (
    norm.includes("who are you") ||
    norm.includes("who r you") ||
    norm.includes("who is this") ||
    norm.includes("who made you")
  ) {
    return { response: pick(RESPONSES.whoAreYou), contextUpdate: {} };
  }
  if (
    norm === "ok" ||
    norm === "okay" ||
    norm === "cool" ||
    norm === "nice" ||
    norm === "great" ||
    norm === "awesome" ||
    norm === "wow" ||
    norm === "sounds good" ||
    norm === "got it" ||
    norm === "interesting"
  ) {
    return { response: pick(RESPONSES.positive), contextUpdate: {} };
  }
  // ── End conversational intents ────────────────────────────────────────────

  const mentioned = findProject(norm);
  if (mentioned) {
    const { answer, topic } = answerAboutProject(norm, mentioned);
    return {
      response: answer,
      contextUpdate: { lastProject: mentioned.name, lastTopic: topic },
    };
  }

  const activeProjectName = ctx.selectedProject || ctx.lastProject;
  if (activeProjectName) {
    const activeProject = KNOWLEDGE.projects.find(
      (p) => p.name.toLowerCase() === activeProjectName.toLowerCase(),
    );
    if (activeProject) {
      const { answer, topic } = answerAboutProject(norm, activeProject);
      return {
        response: answer,
        contextUpdate: { lastProject: activeProject.name, lastTopic: topic },
      };
    }
  }

  if (norm.includes("project")) {
    return {
      response: formatAllProjects(),
      contextUpdate: { lastTopic: "overview" },
    };
  }
  if (
    norm.includes("skill") ||
    norm.includes("technolog") ||
    norm.includes("tech")
  ) {
    return { response: formatSkills(), contextUpdate: { lastTopic: "skills" } };
  }
  if (
    norm.includes("education") ||
    norm.includes("degree") ||
    norm.includes("college") ||
    norm.includes("mca") ||
    norm.includes("bca")
  ) {
    return {
      response: formatEducation(),
      contextUpdate: { lastTopic: "education" },
    };
  }
  if (norm.includes("backend") || norm.includes("strongest")) {
    return {
      response: formatBackendProjects(),
      contextUpdate: { lastTopic: "backend" },
    };
  }
  if (
    (norm.includes("why") &&
      (norm.includes("hire") || norm.includes("consider"))) ||
    norm.includes("why samir")
  ) {
    return { response: whySamir(), contextUpdate: { lastTopic: "overview" } };
  }

  return { response: pick(RESPONSES.fallback), contextUpdate: {} };
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKEND API CALLER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves the backend API URL.
 * Defaults to process.env.REACT_APP_AI_API_URL or '/api/ask-ai'.
 */
function getApiEndpoint() {
  const envUrl = process.env.REACT_APP_AI_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    const trimmed = envUrl.trim();
    // If testing on a phone / mobile device via LAN IP (e.g. 192.168.x.x), replace localhost with current host
    if (
      typeof window !== "undefined" &&
      window.location &&
      trimmed.includes("localhost")
    ) {
      const currentHost = window.location.hostname;
      if (
        currentHost &&
        currentHost !== "localhost" &&
        currentHost !== "127.0.0.1"
      ) {
        return trimmed.replace("localhost", currentHost);
      }
    }
    return trimmed;
  }
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}/api/ask-ai`;
  }
  return "/api/ask-ai";
}

/**
 * Calls the backend API endpoint (/api/ask-ai).
 */
async function callBackendApi(message, context, history) {
  const endpoint = getApiEndpoint();

  const formattedHistory = (history || []).slice(-12).map((msg) => ({
    role: msg.role === "ai" ? "assistant" : "user",
    content: msg.content,
  }));

  const payload = {
    message,
    context: {
      selectedProject: context.selectedProject || context.lastProject || null,
      lastTopic: context.lastTopic || null,
    },
    history: formattedHistory,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data.success && data.message) {
      return data.message;
    }
    throw new Error(data.error || "Empty response from AI");
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORTED FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get an AI response for a message with conversation context and history.
 *
 * @param {string} message - User message
 * @param {object} ctx - Conversation context { selectedProject, lastProject, lastTopic }
 * @param {Array} history - Previous conversation messages
 * @returns {Promise<{ response: string, contextUpdate: object }>}
 */
export async function getAIResponse(message, ctx = {}, history = []) {
  const norm = normalizeMessage(message);
  let contextUpdate = {};

  // Always send directly to Real Groq Backend API
  try {
    const apiResponse = await callBackendApi(message, ctx, history);

    // Track active project if mentioned in query
    const mentioned = findProject(norm);
    if (mentioned) {
      contextUpdate.lastProject = mentioned.name;
    }

    return { response: apiResponse, contextUpdate };
  } catch (apiError) {
    console.warn(
      "Backend API request failed, using intelligent local fallback:",
      apiError.message,
    );

    // Simulate brief processing for offline local fallback
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
    return getLocalFallbackResponse(norm, ctx);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT INTRO & SUGGESTIONS (Static metadata helpers)
// ─────────────────────────────────────────────────────────────────────────────

export function getProjectIntroMessage(projectName) {
  const project = KNOWLEDGE.projects.find(
    (p) => p.name.toLowerCase() === projectName.toLowerCase(),
  );
  if (!project) return null;
  return `📌 We're looking at **${project.name}**.\n\n${project.description}`;
}

export function getProjectSuggestions(projectName) {
  const lower = projectName.toLowerCase();
  const suggestions = {
    mindflow: [
      "How does MindFlow track cognitive load?",
      "Explain the BiLSTM + Attention ML architecture",
      "What computer vision features are extracted?",
      "How does baseline calibration work?",
      "What technologies were used in MindFlow?",
    ],
    skywings: [
      "How does flight search & booking work in SkyWings?",
      "How is Spring Boot Security & JWT implemented?",
      "What is the database schema for flights & passengers?",
      "What features are available in the Admin dashboard?",
      "What technologies were used in SkyWings?",
    ],
    "product data explorer": [
      "How does this project work?",
      "Explain the architecture",
      "Why is PostgreSQL used?",
      "What is Playwright used for?",
      "What technologies were used?",
    ],
    rollwise: [
      "What does RollWise do?",
      "How is role-based access implemented?",
      "Why Java Servlets?",
      "What technologies were used?",
    ],
    "ai resume chatbot": [
      "How does the resume parsing work?",
      "What AI/LLM is used?",
      "What technologies were used?",
      "What problem does this solve?",
    ],
    "story board": [
      "What can users do on Story Board?",
      "How are PDFs generated?",
      "Why Firebase for this project?",
      "What technologies were used?",
    ],
    "tiny url": [
      "How does the URL shortening work?",
      "How is session management handled?",
      "What technologies were used?",
    ],
    "real-time chat app": [
      "How is real-time messaging implemented?",
      "How does user blocking work?",
      "Why Firebase for this project?",
      "What technologies were used?",
    ],
  };

  return (
    suggestions[lower] || [
      "How does this project work?",
      "What technologies were used?",
      "What features does it have?",
    ]
  );
}
