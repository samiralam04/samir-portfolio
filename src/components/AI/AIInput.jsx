// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// AI Message Input Component
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useAI } from "./AIContext";

const AIInput = () => {
  const { sendMessage, isTyping, isOpen } = useAI();
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input when panel opens or when typing completes
  useEffect(() => {
    if (isOpen && !isTyping) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  const handleSend = () => {
    if (!value.trim() || isTyping) return;
    sendMessage(value);
    setValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputWrapper>
      <StyledInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isTyping ? "AI is thinking…" : "Ask anything about Samir…"}
        readOnly={isTyping}
        aria-label="Ask a question about Samir"
        maxLength={500}
        autoComplete="off"
      />
      <SendButton
        onClick={handleSend}
        disabled={!value.trim() || isTyping}
        aria-label="Send message"
        whileHover={value.trim() && !isTyping ? { scale: 1.08 } : {}}
        whileTap={value.trim() && !isTyping ? { scale: 0.94 } : {}}
      >
        <FiSend />
      </SendButton>
    </InputWrapper>
  );
};

export default AIInput;

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.1rem;
  padding-bottom: max(0.9rem, env(safe-area-inset-bottom));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 12, 16, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 40;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.7);
`;

const StyledInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.7rem 1rem;
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  font-size: 0.92rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  min-width: 0;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: rgba(0, 255, 157, 0.4);
    box-shadow: 0 0 0 3px rgba(0, 255, 157, 0.08);
  }

  &[readonly] {
    opacity: 0.7;
    cursor: wait;
  }
`;

const SendButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) =>
    props.disabled
      ? "rgba(255,255,255,0.05)"
      : "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"};
  border: none;
  color: ${(props) => (props.disabled ? "var(--text-muted)" : "#0a0a0a")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 0 14px rgba(0, 255, 157, 0.25)"};

  svg {
    font-size: 1.05rem;
  }
`;
