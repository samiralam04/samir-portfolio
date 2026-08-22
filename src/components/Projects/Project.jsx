// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Project Card Showcase Component with AI Deep Dive Trigger
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAI } from "../AI/AIContext";

const Project = (props) => {
  const { img, disc, href, name } = props.item;
  const { openAIWithProject } = useAI();

  const handleAskAI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (name) {
      openAIWithProject(name);
    }
  };

  return (
    <Container className="project">
      <ProjectImage
        src={img}
        alt={name ? `${name} project screenshot` : "project"}
      />
      <ProjectOverlay>
        <h3>Project Details</h3>
        <p>{disc}</p>
        <ButtonRow>
          <DemoButton href={href} target="_blank" rel="noopener noreferrer">
            View Demo
          </DemoButton>
          {name && (
            <AskAIButton
              onClick={handleAskAI}
              aria-label={`Ask ZoRo about ${name}`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              ✦ Ask ZoRo
            </AskAIButton>
          )}
        </ButtonRow>
      </ProjectOverlay>
    </Container>
  );
};

export default Project;

const Container = styled.div`
  height: 16rem;
  margin: 0 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.2rem;
  background: linear-gradient(
    to top,
    rgba(10, 10, 20, 0.97),
    rgba(10, 10, 20, 0.6),
    transparent
  );
  color: var(--text-primary);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    background: var(--gradient-main);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.45;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  ${Container}:hover & {
    transform: translateY(0);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const DemoButton = styled.a`
  display: inline-block;
  padding: 0.42rem 0.85rem;
  background: var(--gradient-main);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  border: none;

  &:hover {
    background: var(--gradient-hover);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  }
`;

const AskAIButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.85rem;
  background: rgba(0, 255, 157, 0.08);
  color: var(--accent-primary);
  border: 1px solid rgba(0, 255, 157, 0.35);
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: "Space Grotesk", sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(0, 255, 157, 0.16);
    border-color: var(--accent-primary);
    box-shadow: 0 0 14px rgba(0, 255, 157, 0.3);
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
`;
