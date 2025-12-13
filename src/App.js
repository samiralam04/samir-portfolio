// import { useState, useEffect } from 'react';
import styled from "styled-components";

import Header from "./components/Banner/Header";
import ProfComponent from "./components/Banner/ProfComponent";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Services from "./components/Service/Services";
import Skills from "./components/skills/SkillsSection";
import Leetcode from "./components/progressGraph/graph";
import Bot from './components/Bot/Bot';

import ScrollProgress from './components/common/ScrollProgress';

function App() {
  return (
    <Container>
      
      <ScrollProgress />
      <Bot />
      <Banner>
        <Header />
        <ProfComponent />
      </Banner>
      <Skills />
      <Services />
      <Projects />
      <Leetcode />
      <Footer />
    </Container>
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