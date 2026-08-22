// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Serverless AI Assistant API Endpoint (/api/ask-ai)
// Powered by Groq SDK with Anti-Scraping Throttling and Contextual Guardrails
// ─────────────────────────────────────────────────────────────────────────────

const Groq = require("groq-sdk");
const { formatForSystemPrompt } = require("./data/portfolio");

// ── Configuration ────────────────────────────────────────────────────────────

// Current fast & recommended conversational model on Groq
const MODEL = "openai/gpt-oss-20b";
const MAX_TOKENS = 600;
const TEMPERATURE = 0.6;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 12;

const ALLOWED_ORIGINS = [
  "https://samiralam04.github.io",
  "http://localhost:3000",
  "http://localhost:3001",
];

// In-memory rate limiting map for basic abuse & scraper protection (sliding window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25; // max 25 requests per minute per IP

function isRateLimited(clientIp) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW_MS,
  };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(clientIp, clientData);
    return false;
  }

  clientData.count += 1;
  rateLimitMap.set(clientIp, clientData);
  return clientData.count > MAX_REQUESTS_PER_WINDOW;
}

// ── System Prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Samir Alam's personal portfolio AI assistant.

You help visitors and recruiters understand Samir's education, technical skills, projects, and development journey.

RULES:
- Be friendly, concise, conversational, and technically knowledgeable.
- Use light emojis occasionally (👋 🚀 ✦ 😄) but do not overuse them.
- NEVER invent or fabricate information not present in the portfolio data below (no fabricated employers, salaries, awards, GPA, or projects).
- If asked about something not in the portfolio data, politely and naturally say you don't have that detail in Samir's portfolio and redirect to his projects, skills, or education.
- Keep responses concise: 2-3 short paragraphs max. Use bullet points (•) for lists.
- Handle conversational messages naturally (greetings, thanks, acknowledgements, farewells).
- When a visitor says "ok", "nice", "cool", "thanks", "sounds good", etc., respond naturally and concisely — do NOT treat them as unknown portfolio questions.
- If a project context is active, answer follow-up questions like "How does it work?", "What database does it use?", "Why PostgreSQL?", etc. specifically in the context of that project.
- Professional enough for recruiters.
- Do NOT use markdown title headers (##, ###). Use bullet points (•) and bold (**text**) for styling.

PORTFOLIO DATA:
${formatForSystemPrompt()}
`;

// ── CORS & Security Headers ──────────────────────────────────────────────────

function getOrigin(req) {
  return req.headers?.origin || req.headers?.Origin || "";
}

function getClientIp(req) {
  return (
    req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers?.["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function setSecurityAndCorsHeaders(res, origin) {
  const isLocalNetwork =
    /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(
      origin,
    );
  const allowed =
    ALLOWED_ORIGINS.includes(origin) || isLocalNetwork
      ? origin
      : ALLOWED_ORIGINS[0];

  res.setHeader("Access-Control-Allow-Origin", allowed);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
}

// ── Validation ───────────────────────────────────────────────────────────────

function validateRequest(body) {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }
  if (!body.message || typeof body.message !== "string") {
    return "Message is required and must be a string.";
  }
  const trimmed = body.message.trim();
  if (trimmed.length === 0) {
    return "Message cannot be empty.";
  }
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`;
  }
  if (body.history && !Array.isArray(body.history)) {
    return "History must be an array.";
  }
  return null; // valid
}

// ── Build Messages Array ─────────────────────────────────────────────────────

function buildMessages(body) {
  const messages = [];

  // 1. System prompt (includes portfolio knowledge)
  let systemContent = SYSTEM_PROMPT;

  // 2. Project context (if provided)
  if (body.context?.selectedProject) {
    systemContent += `\n\nCURRENT PROJECT CONTEXT:\nThe visitor is currently exploring the project "${body.context.selectedProject}". Answer follow-up questions like "How does it work?", "What database does it use?", "Why PostgreSQL?" in the context of this project.`;
  }

  messages.push({ role: "system", content: systemContent });

  // 3. Conversation history (capped)
  if (body.history && Array.isArray(body.history)) {
    const history = body.history.slice(-MAX_HISTORY_MESSAGES);
    for (const msg of history) {
      if (
        msg &&
        typeof msg.role === "string" &&
        typeof msg.content === "string"
      ) {
        const role =
          msg.role === "assistant" || msg.role === "ai" ? "assistant" : "user";
        messages.push({
          role: role,
          content: msg.content.slice(0, MAX_MESSAGE_LENGTH),
        });
      }
    }
  }

  // 4. Current user message
  messages.push({ role: "user", content: body.message.trim() });

  return messages;
}

// ── Main Handler ─────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  const origin = getOrigin(req);
  setSecurityAndCorsHeaders(res, origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  // Rate Limiting Check
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: "Too many requests. Please slow down and try again shortly.",
    });
  }

  // Check API key is configured
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not configured in environment variables.");
    return res.status(500).json({
      success: false,
      error:
        "The AI service is not configured. Please add GROQ_API_KEY to environment variables.",
    });
  }

  // Validate request body
  const validationError = validateRequest(req.body);
  if (validationError) {
    return res.status(400).json({
      success: false,
      error: validationError,
    });
  }

  try {
    // Initialize Groq client
    const groq = new Groq({
      apiKey: apiKey,
    });

    // Build messages array
    const messages = buildMessages(req.body);

    // Call Groq chat completions
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: messages,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    });

    const responseText =
      completion.choices?.[0]?.message?.content ||
      "I'm having trouble generating a response right now. Please try again.";

    return res.status(200).json({
      success: true,
      message: responseText.trim(),
    });
  } catch (error) {
    console.error("Groq API error:", error?.message || error);

    // Rate limit from Groq upstream
    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        error:
          "I'm receiving a lot of questions right now! Please try again in a moment.",
      });
    }

    // Generic friendly error without exposing secrets or stack traces
    return res.status(500).json({
      success: false,
      error: "The AI is temporarily unavailable. Please try again.",
    });
  }
};
