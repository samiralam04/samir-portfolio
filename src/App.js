// ─────────────────────────────────────────────────────────────────────────────
// Copyright © 2026 Samir Alam. All Rights Reserved.
// Root Application Component
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import styled from "styled-components";

import Header from "./components/Banner/Header";
import ProfComponent from "./components/Banner/ProfComponent";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Services from "./components/Service/Services";
import Skills from "./components/skills/SkillsSection";
import Leetcode from "./components/progressGraph/graph";

import ScrollProgress from "./components/common/ScrollProgress";
import { AIProvider } from "./components/AI/AIContext";
import AIChat from "./components/AI/AIChat";
import AIFloatingButton from "./components/AI/AIFloatingButton";
import LegalModal from "./components/Legal/LegalModal";

function App() {
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <AIProvider>
      <Container>
        <ScrollProgress />
        <Banner>
          <Header />
          <ProfComponent />
        </Banner>
        <Skills />
        <Services />
        <Projects />
        <Leetcode />
        <Footer onOpenLegal={() => setLegalOpen(true)} />
        {/* Floating AI Button for mobile screens */}
        <AIFloatingButton />
        {/* AI Chat panel — rendered at root level to avoid stacking-context issues */}
        <AIChat />
        {/* Legal & Copyright Notice Modal */}
        <LegalModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} />
      </Container>
    </AIProvider>
  );
}

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
  position: relative;
  background-color: var(--bg-dark);
`;

const Banner = styled.div`
  background: var(--bg-dark);
  min-height: 100vh;
  position: relative;

  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 0;
  }
`;

export default App;
