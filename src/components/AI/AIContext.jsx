// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// AI Context Provider & State Management
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getAIResponse, getProjectIntroMessage } from './mockAI';

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const AIContext = createContext(null);

let messageIdCounter = 0;
function nextId() {
  return ++messageIdCounter;
}

function createMessage(role, content) {
  return { id: nextId(), role, content, timestamp: Date.now() };
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export const AIProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Lightweight conversation context — tracked as a ref so sendMessage closure
  // always has the latest value without needing to re-create the callback.
  const convCtxRef = useRef({
    selectedProject: null,   // project set by "Ask AI" card button
    lastProject: null,        // last project discussed in conversation
    lastTopic: null,          // last topic: "overview"|"technology"|"database"|...
  });

  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Convenience getter for components that need to read the project
  const [selectedProject, setSelectedProject] = useState(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key closes panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const openAI = useCallback(() => {
    // Don't clear messages — preserve session conversation
    convCtxRef.current = { ...convCtxRef.current, selectedProject: null };
    setSelectedProject(null);
    setIsOpen(true);
  }, []);

  const openAIWithProject = useCallback(async (projectName) => {
    // Update context
    convCtxRef.current = {
      ...convCtxRef.current,
      selectedProject: projectName,
      lastProject: projectName,
    };
    setSelectedProject(projectName);
    setIsOpen(true);

    // Auto-inject an AI intro message for this project
    const intro = getProjectIntroMessage(projectName);
    if (intro) {
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 700));
      setIsTyping(false);
      setMessages((prev) => [...prev, createMessage('ai', intro)]);
    }
  }, []);

  const closeAI = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSelectedProject(null);
    setIsTyping(false);
    convCtxRef.current = { selectedProject: null, lastProject: null, lastTopic: null };
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      // Add user message immediately
      setMessages((prev) => [...prev, createMessage('user', trimmed)]);
      setIsTyping(true);

      try {
        // Pass current context snapshot and conversation history
        const currentCtx = { ...convCtxRef.current };
        const result = await getAIResponse(trimmed, currentCtx, messagesRef.current);

        // Support both old string format and new { response, contextUpdate } format
        const responseText = typeof result === 'string' ? result : result.response;
        const contextUpdate = typeof result === 'object' && result.contextUpdate
          ? result.contextUpdate
          : {};

        // Merge context update back in
        convCtxRef.current = { ...convCtxRef.current, ...contextUpdate };

        // Keep selectedProject reactive state in sync if it changed
        if (contextUpdate.lastProject) {
          // Only override the reactive selectedProject if a card context isn't active,
          // otherwise keep the card's project as the primary selectedProject.
          if (!convCtxRef.current.selectedProject) {
            setSelectedProject(contextUpdate.lastProject);
          }
        }

        setMessages((prev) => [...prev, createMessage('ai', responseText)]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          createMessage('ai', 'Something went wrong. Please try again.'),
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping]
  );

  const value = {
    isOpen,
    selectedProject,
    messages,
    isTyping,
    openAI,
    closeAI,
    openAIWithProject,
    sendMessage,
    clearChat,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export const useAI = () => {
  const ctx = useContext(AIContext);
  if (!ctx) {
    throw new Error('useAI must be used inside <AIProvider>');
  }
  return ctx;
};
