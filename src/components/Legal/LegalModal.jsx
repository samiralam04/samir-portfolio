// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Legal & Intellectual Property Notice Modal Component
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCopyright, MdOutlineGavel, MdOutlinePolicy } from "react-icons/md";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.2 } },
};

const LegalModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            {/* Header */}
            <Header>
              <TitleGroup>
                <Badge>
                  <IoShieldCheckmarkOutline />
                  <span>IP & Copyright Notice</span>
                </Badge>
                <Title id="legal-modal-title">Legal & Ownership Information</Title>
              </TitleGroup>
              <CloseButton onClick={onClose} aria-label="Close legal modal">
                <IoClose />
              </CloseButton>
            </Header>

            {/* Body */}
            <Body>
              <Section>
                <SectionHeader>
                  <MdOutlineCopyright className="icon" />
                  <h3>Copyright & Intellectual Property</h3>
                </SectionHeader>
                <Text>
                  <strong>Copyright © 2026 Samir Alam. All Rights Reserved.</strong>
                </Text>
                <Text>
                  The source code, user interface, design system, written project descriptions,
                  biographical text, 3D elements, animations, and custom visual assets in this
                  portfolio are the proprietary intellectual property of <strong>Samir Alam</strong>.
                </Text>
              </Section>

              <Section>
                <SectionHeader>
                  <MdOutlinePolicy className="icon" />
                  <h3>Permitted Use</h3>
                </SectionHeader>
                <List>
                  <li>Viewing and browsing the live portfolio website for evaluation and recruitment.</li>
                  <li>Reviewing the public GitHub repository solely for reference and educational study.</li>
                  <li>Sharing direct links to the official portfolio and official repository.</li>
                </List>
              </Section>

              <Section>
                <SectionHeader>
                  <MdOutlineGavel className="icon" />
                  <h3>Prohibited Without Prior Written Consent</h3>
                </SectionHeader>
                <List className="prohibited">
                  <li>Cloning, scraping, or republishing this portfolio as your own work.</li>
                  <li>Redistributing, sublicensing, or selling substantial portions of this codebase.</li>
                  <li>Removing author attribution, metadata, copyright notices, or headers.</li>
                  <li>Re-hosting private serverless APIs or AI prompt architectures without authorization.</li>
                </List>
              </Section>

              <Section>
                <SectionHeader>
                  <span className="icon">📦</span>
                  <h3>Third-Party Open Source Software</h3>
                </SectionHeader>
                <Text>
                  External dependencies and libraries (React, Framer Motion, Three.js, Styled Components,
                  React Icons, Groq SDK) remain governed by their respective open-source licenses
                  (MIT, Apache 2.0, BSD). No claim of proprietary ownership is made over external libraries.
                </Text>
              </Section>
            </Body>

            {/* Footer */}
            <ModalFooter>
              <ContactNote>
                For licensing inquiries:{" "}
                <a href="mailto:samiralam7005@gmail.com">samiralam7005@gmail.com</a>
              </ContactNote>
              <GotItButton onClick={onClose} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Understood
              </GotItButton>
            </ModalFooter>
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;

// ── Styled Components ────────────────────────────────────────────────────────

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
`;

const ModalContainer = styled(motion.div)`
  background: #0d0e12;
  border: 1px solid rgba(0, 255, 157, 0.2);
  border-radius: 20px;
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 157, 0.1);
  overflow: hidden;
  color: var(--text-primary);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.75rem 2rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-primary);
  background: rgba(0, 255, 157, 0.08);
  border: 1px solid rgba(0, 255, 157, 0.25);
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  width: fit-content;
`;

const Title = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const Body = styled.div`
  padding: 1.5rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: var(--accent-primary);
    font-size: 1.15rem;
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
  }
`;

const Text = styled.p`
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin: 0;

  strong {
    color: var(--text-primary);
  }
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  li {
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--text-secondary);
  }

  &.prohibited li {
    color: #fca5a5;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContactNote = styled.span`
  font-size: 0.82rem;
  color: var(--text-muted);

  a {
    color: var(--accent-primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const GotItButton = styled(motion.button)`
  background: var(--gradient-main);
  color: #000;
  border: none;
  font-weight: 600;
  font-size: 0.88rem;
  padding: 0.6rem 1.4rem;
  border-radius: 30px;
  cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 255, 157, 0.25);
`;
