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

function App() {


  return (
    <Container>
       <Bot />
      <Banner>
        <Header />
        <ProfComponent />
      </Banner>
      <Skills />
      <Services />
      <LightColor>
        <Projects />
      </LightColor>
      <Leetcode />
      <LightColor>
        <Footer />
      </LightColor>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
`;



const Banner = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  height: 100vh;
  
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 0;
  }
`;

const LightColor = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%;
`;

export default App;