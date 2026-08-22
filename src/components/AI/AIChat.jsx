// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// AI Chat Panel Component ("Meet My AI")
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useAI } from "./AIContext";
import AIMessage from "./AIMessage";
import AIInput from "./AIInput";
import AISuggestions from "./AISuggestions";
import { getProjectSuggestions } from "./mockAI";
import zoroAvatar from "./zoro.png";

const AIChat = () => {
  const { isOpen, closeAI, selectedProject, messages, isTyping, clearChat } =
    useAI();

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message or when typing indicator appears
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const hasMessages = messages.length > 0;
  const projectSuggestions = selectedProject
    ? getProjectSuggestions(selectedProject)
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeAI}
          aria-modal="true"
          role="dialog"
          aria-label="Samir's AI Assistant"
        >
          <Panel
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ─────────────────────────────────────────────── */}
            <PanelHeader>
              <HeaderLeft>
                <AvatarWrapper>
                  <ZoroAvatar src={zoroAvatar} alt="ZoRo" />
                  <AvatarActiveDot />
                </AvatarWrapper>
                <HeaderTitleGroup>
                  <HeaderTitle>ZoRo</HeaderTitle>
                  <HeaderStatus>
                    <StatusDot aria-hidden="true" />
                    <span>Online</span>
                  </HeaderStatus>
                </HeaderTitleGroup>
              </HeaderLeft>

              <HeaderActions>
                {hasMessages && (
                  <ClearButton
                    onClick={clearChat}
                    aria-label="Clear conversation"
                    title="Clear conversation"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiTrash2 />
                  </ClearButton>
                )}
                <CloseButton
                  onClick={closeAI}
                  aria-label="Close AI panel"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </CloseButton>
              </HeaderActions>
            </PanelHeader>

            {/* ── Project context banner ─────────────────────────────── */}
            <AnimatePresence>
              {selectedProject && (
                <ContextBanner
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContextPin aria-hidden="true">📌</ContextPin>
                  <ContextText>
                    <ContextLabel>PROJECT CONTEXT</ContextLabel>
                    <ContextProject>{selectedProject}</ContextProject>
                  </ContextText>
                </ContextBanner>
              )}
            </AnimatePresence>

            {/* ── Messages area (Scrollable) ─────────────────────────── */}
            <MessagesArea>
              {!hasMessages && (
                <WelcomeScreen
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <WelcomeEmoji aria-hidden="true">👋</WelcomeEmoji>
                  <WelcomeHeading>Hi! I'm Samir's AI assistant.</WelcomeHeading>
                  <WelcomeSubtext>
                    I can tell you about his projects, technical skills,
                    education, and development journey.
                  </WelcomeSubtext>
                  <WelcomeDivider />
                  <AISuggestions suggestions={projectSuggestions} />
                </WelcomeScreen>
              )}

              {hasMessages && (
                <MessageList>
                  {messages.map((msg) => (
                    <AIMessage key={msg.id} message={msg} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </MessageList>
              )}
            </MessagesArea>

            {/* ── Sticky Input (Locked at bottom) ───────────────────── */}
            <AIInput />
          </Panel>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default AIChat;

// ── Typing Indicator Component ───────────────────────────────────────────────

const TypingIndicator = () => (
  <TypingWrapper aria-live="polite" aria-label="AI is thinking">
    <TypingAvatar aria-hidden="true">✦</TypingAvatar>
    <TypingBubble>
      <TypingDot $delay="0s" />
      <TypingDot $delay="0.18s" />
      <TypingDot $delay="0.36s" />
    </TypingBubble>
  </TypingWrapper>
);

// ─────────────────────────────────────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────────────────────────────────────

const dotPulse = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1);   opacity: 1; }
`;

const statusPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0.4); }
  50%      { box-shadow: 0 0 0 4px rgba(0, 255, 157, 0); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  overscroll-behavior: none;
`;

const Panel = styled(motion.aside)`
  position: relative;
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  background: rgba(10, 10, 15, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(0, 255, 157, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow:
    -8px 0 40px rgba(0, 0, 0, 0.6),
    -1px 0 0 rgba(0, 255, 157, 0.08);

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    border-left: none;
    border-top: 1px solid rgba(0, 255, 157, 0.15);
  }
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.1rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.25);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ZoroAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--accent-primary);
  box-shadow: 0 0 10px rgba(0, 255, 157, 0.35);
  display: block;
`;

const AvatarActiveDot = styled.span`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00ff9d;
  border: 2px solid #0d0e12;
  box-shadow: 0 0 6px #00ff9d;
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const HeaderTitle = styled.h2`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
`;

const HeaderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--accent-primary);
  font-family: "Space Grotesk", sans-serif;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
  animation: ${statusPulse} 2s infinite ease-in-out;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 1px;
  }
`;

const ClearButton = styled(IconButton)`
  &:hover {
    color: #f87171;
    border-color: rgba(248, 113, 113, 0.3);
  }
`;

const CloseButton = styled(IconButton)`
  &:hover {
    color: var(--accent-primary);
    border-color: rgba(0, 255, 157, 0.3);
  }
`;

const ContextBanner = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1.1rem;
  background: rgba(0, 255, 157, 0.05);
  border-bottom: 1px solid rgba(0, 255, 157, 0.1);
  flex-shrink: 0;
  overflow: hidden;
`;

const ContextPin = styled.span`
  font-size: 0.85rem;
  flex-shrink: 0;
`;

const ContextText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
`;

const ContextLabel = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--accent-primary);
  text-transform: uppercase;
  font-family: "Space Grotesk", sans-serif;
`;

const ContextProject = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  font-family: "Space Grotesk", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessagesArea = styled.div`
  flex: 1 1 0%;
  min-height: 0;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
  }
`;

const WelcomeScreen = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-bottom: 0.5rem;
`;

const WelcomeEmoji = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

const WelcomeHeading = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
`;

const WelcomeSubtext = styled.p`
  font-size: 0.87rem;
  color: rgba(248, 250, 252, 0.65);
  line-height: 1.55;
  margin: 0;
  font-family: "Inter", sans-serif;
`;

const WelcomeDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: 0.4rem 0;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

// ── Typing indicator ──────────────────────────────────────────────────────────

const TypingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const TypingAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    var(--accent-primary),
    var(--accent-secondary)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #0a0a0a;
  font-weight: 700;
  flex-shrink: 0;
`;

const TypingBubble = styled.div`
  padding: 0.65rem 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px 14px 14px 3px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TypingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
  animation: ${dotPulse} 1.2s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay};
`;
