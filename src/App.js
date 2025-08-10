import { useState, useEffect } from 'react';
import styled from "styled-components";
import Loader from "./components/Loader";
import Header from "./components/Banner/Header";
import ProfComponent from "./components/Banner/ProfComponent";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Services from "./components/Service/Services";
import Skills from "./components/skills/SkillsSection";
import Leetcode from "./components/progressGraph/graph";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets (extend if actually loading resources)
    const timer = setTimeout(() => setIsLoading(false), 4200); // Adjusted timing
    
    return () => {
      clearTimeout(timer);
      // Clean up Three.js resources if needed
      if (typeof window !== 'undefined') {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, []);

  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Container>
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

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
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