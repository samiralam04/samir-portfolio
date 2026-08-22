// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// AI Contextual Suggestions Component
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAI } from './AIContext';

// Default global suggestions (shown when no project context)
const GLOBAL_SUGGESTIONS = [
  'What projects has Samir built?',
  'Tell me about Product Data Explorer',
  'What technologies does Samir know?',
  "Tell me about Samir's education",
  'Which project demonstrates his backend skills?',
  'Why should I consider Samir for a developer role?',
];

const AISuggestions = ({ suggestions }) => {
  const { sendMessage, isTyping } = useAI();
  const items = suggestions || GLOBAL_SUGGESTIONS;

  return (
    <SuggestionsWrapper>
      <SuggestionsLabel>Try asking:</SuggestionsLabel>
      <PillGrid>
        {items.map((text, i) => (
          <SuggestionPill
            key={i}
            onClick={() => !isTyping && sendMessage(text)}
            disabled={isTyping}
            aria-label={`Ask: ${text}`}
            whileHover={!isTyping ? { y: -2, scale: 1.02 } : {}}
            whileTap={!isTyping ? { scale: 0.97 } : {}}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
          >
            {text}
          </SuggestionPill>
        ))}
      </PillGrid>
    </SuggestionsWrapper>
  );
};

export default AISuggestions;

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const SuggestionsWrapper = styled.div`
  padding: 0.5rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SuggestionsLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
`;

const PillGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const SuggestionPill = styled(motion.button)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.55rem 0.9rem;
  color: rgba(248, 250, 252, 0.8);
  font-size: 0.83rem;
  font-family: 'Inter', sans-serif;
  text-align: left;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
  line-height: 1.4;

  &:hover:not(:disabled) {
    border-color: rgba(0, 255, 157, 0.4);
    background: rgba(0, 255, 157, 0.05);
    box-shadow: 0 0 12px rgba(0, 255, 157, 0.1);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
`;
