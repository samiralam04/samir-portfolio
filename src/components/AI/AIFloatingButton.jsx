// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Floating AI Button for Mobile Screens — Sleek Cyber-Minimalist Design
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { RiSparklingFill } from "react-icons/ri";
import { useAI } from "./AIContext";

const AIFloatingButton = () => {
  const { isOpen, openAI } = useAI();

  return (
    <AnimatePresence>
      {!isOpen && (
        <FloatingContainer
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <FloatingButton
            onClick={openAI}
            aria-label="Open ZoRo AI Assistant"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
          >
            <IconWrapper>
              <RiSparklingFill />
              <StatusDot />
            </IconWrapper>
            <ButtonText>Ask ZoRo</ButtonText>
            <GlowOverlay />
          </FloatingButton>
        </FloatingContainer>
      )}
    </AnimatePresence>
  );
};

export default AIFloatingButton;

// ── Animations ─────────────────────────────────────────────────────────────

const subtleGlow = keyframes`
  0%, 100% {
    box-shadow: 0 4px 18px rgba(0, 255, 157, 0.22), 0 0 10px rgba(99, 102, 241, 0.15);
    border-color: rgba(0, 255, 157, 0.35);
  }
  50% {
    box-shadow: 0 6px 26px rgba(0, 255, 157, 0.42), 0 0 18px rgba(99, 102, 241, 0.3);
    border-color: rgba(0, 255, 157, 0.7);
  }
`;

const dotPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.75;
  }
`;

const iconSparkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.12) rotate(6deg);
  }
`;

// ── Styled Components ───────────────────────────────────────────────────────

const FloatingContainer = styled(motion.div)`
  position: fixed;
  left: 20px;
  bottom: 25px;
  z-index: 1500;
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`;

const FloatingButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.15rem 0.65rem 0.85rem;
  background: rgba(12, 14, 18, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 157, 0.35);
  border-radius: 9999px;
  color: var(--text-primary);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  animation: ${subtleGlow} 3.5s infinite ease-in-out;
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--accent-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(99, 102, 241, 0.25));
  border: 1px solid rgba(0, 255, 157, 0.25);
  color: var(--accent-primary);
  font-size: 1.05rem;
  flex-shrink: 0;

  svg {
    animation: ${iconSparkle} 3s ease-in-out infinite;
  }
`;

const StatusDot = styled.span`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 6px var(--accent-primary);
  animation: ${dotPulse} 2s infinite ease-in-out;
`;

const ButtonText = styled.span`
  background: linear-gradient(135deg, #ffffff 0%, var(--accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 0.92rem;
`;

const GlowOverlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, rgba(0, 255, 157, 0.12), transparent 70%);
  pointer-events: none;
`;
