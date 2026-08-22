// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// AI Message Bubble & Text Formatter Component
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled, { keyframes } from 'styled-components';
import zoroAvatar from './zoro.png';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — simple inline formatting without a markdown library
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converts plain text with \n and bullet markers (•) into React elements.
 * Handles: paragraphs, bullet lists, bold (**text**).
 */
function renderContent(text) {
  const segments = text.split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < segments.length; i++) {
    const line = segments[i];

    // Blank line → spacer
    if (line.trim() === '') {
      elements.push(<br key={key++} />);
      continue;
    }

    // Bullet line
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      elements.push(
        <BulletLine key={key++}>
          <BulletDot>▸</BulletDot>
          <span>{renderInline(line.replace(/^[\s•-]+/, ''))}</span>
        </BulletLine>
      );
      continue;
    }

    // Regular paragraph line
    elements.push(
      <TextLine key={key++}>{renderInline(line)}</TextLine>
    );
  }

  return elements;
}

/** Handles **bold** markers inline */
function renderInline(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const AIMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <MessageWrapper $isUser={isUser}>
      {!isUser && (
        <ZoroBubbleAvatar src={zoroAvatar} alt="ZoRo" aria-hidden="true" />
      )}
      <BubbleOuter $isUser={isUser}>
        {!isUser && <SenderLabel>ZoRo</SenderLabel>}
        <Bubble $isUser={isUser}>
          {renderContent(message.content)}
        </Bubble>
      </BubbleOuter>
    </MessageWrapper>
  );
};

export default AIMessage;

// ─────────────────────────────────────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
  animation: ${fadeIn} 0.3s ease forwards;
  justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.25rem;
`;

const ZoroBubbleAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--accent-primary);
  box-shadow: 0 0 8px rgba(0, 255, 157, 0.3);
  flex-shrink: 0;
`;

const BubbleOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  max-width: 82%;
`;

const SenderLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent-primary);
  text-transform: uppercase;
  padding-left: 0.25rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const Bubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: ${(props) =>
    props.$isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  font-size: 0.9rem;
  line-height: 1.6;
  word-break: break-word;
  font-family: 'Inter', sans-serif;

  ${(props) =>
    props.$isUser
      ? `
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.25) 0%,
      rgba(0, 255, 157, 0.15) 100%
    );
    border: 1px solid rgba(0, 255, 157, 0.25);
    color: var(--text-primary);
    box-shadow: 0 2px 12px rgba(0, 255, 157, 0.08);
  `
      : `
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: rgba(248, 250, 252, 0.92);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `}
`;

const TextLine = styled.span`
  display: block;
`;

const BulletLine = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  margin: 0.1rem 0;
`;

const BulletDot = styled.span`
  color: var(--accent-primary);
  font-size: 0.75rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
`;
