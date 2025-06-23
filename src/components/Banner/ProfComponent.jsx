import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiCodeSSlashLine, RiLightbulbFlashLine, RiEmotionHappyLine, RiDoubleQuotesL } from "react-icons/ri";
import { TbBrandTypescript, TbBrandJavascript, TbBrandReact, TbBrandNodejs } from "react-icons/tb";
import { FiAward, } from "react-icons/fi";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import profilePic from './profile.png';

const programmingQuotes = [
  {
    text: "Frontend brings the look. Backend brings the logic. Full stack brings the solution.",
    icon: <TbBrandReact /> 
  },
  {
    text: "A good UI catches the eye. A good API captures the heart.",
    icon: <TbBrandJavascript /> 
  },
  {
    text: "Full stack is not a role, it's a mindset: design, build, fix, repeat.",
    icon: <RiLightbulbFlashLine /> 
  },
  {
    text: "Behind every pixel is a function. Behind every function is a developer who didn't sleep.",
    icon: <TbBrandNodejs /> 
  },
  {
    text: "Writing clean code is not a skill, it's a habit.",
    icon: <RiCodeSSlashLine /> 
  },
  {
    text: "If (bug) then debug(); else celebrate();",
    icon: <RiEmotionHappyLine /> 
  },
  {
    text: "The real deploy is the friends we made along the Git push.",
    icon: <FaGithub /> 
  },
  {
    text: "Code is poetry, but production is war.",
    icon: <TbBrandTypescript /> 
    }
];

function ProfComponent() {
  const [currentQuote, setCurrentQuote] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % programmingQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundWrapper>
      <AnimatedBackground />
      <Container id="home">
        <LeftSection>
          <Slide direction="left" triggerOnce>
            <Texts>
              <WelcomeText>
                <HandWave>👋</HandWave>
                <motion.h4
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Hello, <span className="gradient-accent">I'm</span>
                </motion.h4>
              </WelcomeText>
              
              <NameSection>
                <motion.h1 
                  className="gradient-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: 0.3,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  Samir Alam
                </motion.h1>
                <motion.h2 
                  className="role-text"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.4,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  whileHover={{
                    x: [0, 5, -5, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  Full Stack Developer
                </motion.h2>
              </NameSection>
              
              <PhilosophySection>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.5,
                      type: "spring",
                      damping: 10,
                      stiffness: 100
                    }
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <PhilosophyText>
                    <PhilosophyIcon>
                      <FiAward className="award-icon" />
                    </PhilosophyIcon>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Great things aren't built in a day—they're refined through effort and dedication.
                    </motion.span>
                  </PhilosophyText>
                </motion.div>
              </PhilosophySection>
              
              <QuoteSection>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <QuoteContainer>
                    <QuoteBorderTop />
                    <QuoteBorderBottom />
                    <motion.div
                      key={currentQuote}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <QuoteContent>
                        <QuoteIcon>
                          <Fade>
                            {programmingQuotes[currentQuote].icon}
                          </Fade>
                        </QuoteIcon>
                        <QuoteText>
                          {programmingQuotes[currentQuote].text}
                        </QuoteText>
                      </QuoteContent>
                    </motion.div>
                    <QuoteProgress>
                      {programmingQuotes.map((_, index) => (
                        <QuoteDot 
                          key={index} 
                          $active={index === currentQuote}
                          onClick={() => setCurrentQuote(index)}
                          aria-label={`View quote ${index + 1}`}
                          whileHover={{ scale: 1.5 }}
                          whileTap={{ scale: 0.8 }}
                        />
                      ))}
                    </QuoteProgress>
                  </QuoteContainer>
                </motion.div>
              </QuoteSection>
              
              <ActionSection>
                <ResumeButton 
                  href="https://drive.google.com/file/d/1fgQlYBq4doeB4ZmEtjtq4rpAnjZInBx4/view?usp=drive_link" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 8px 30px rgba(102, 126, 234, 0.7)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.9,
                      type: "spring"
                    }
                  }}
                  aria-label="Download Resume"
                >
                  <FaFileDownload />
                  <span>Download Resume</span>
                  <ButtonHoverEffect />
                </ResumeButton>
              </ActionSection>
              
              <SocialSection>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { delay: 1 }
                  }}
                >
                  <SocialLabel>Connect with me</SocialLabel>
                </motion.div>
                <SocialIcons>
                  <Zoom cascade damping={0.1} duration={300} delay={1000}>
                    <SocialIcon 
                      href="mailto:samiralam7005@gmail.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        y: -8, 
                        scale: 1.1,
                        backgroundColor: "rgba(234, 67, 53, 0.8)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      $color="#EA4335"
                      aria-label="Email me"
                    >
                      <HiMail />
                    </SocialIcon>
                    <SocialIcon 
                      href="https://github.com/samiralam04" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        y: -8, 
                        scale: 1.1,
                        backgroundColor: "rgba(51, 51, 51, 0.8)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      $color="#333"
                      aria-label="My GitHub profile"
                    >
                      <FaGithub />
                    </SocialIcon>
                    <SocialIcon 
                      href="https://www.linkedin.com/in/samir-alam-3756582b6" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        y: -8, 
                        scale: 1.1,
                        backgroundColor: "rgba(10, 102, 194, 0.8)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      $color="#0A66C2"
                      aria-label="My LinkedIn profile"
                    >
                      <FaLinkedin />
                    </SocialIcon>
                  </Zoom>
                </SocialIcons>
              </SocialSection>
            </Texts>
          </Slide>
        </LeftSection>
        
        <RightSection>
          <Slide direction="right" triggerOnce>
            <ProfileContainer>
              <ProfileImageWrapper>
                <ProfileImage 
                  src={profilePic} 
                  alt="Samir Alam - Full Stack Developer" 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                />
                <ImageGlow />
                <FloatingOrbits>
                  <Orbit $size="100px" $delay="0s" $color="#667eea" />
                  <Orbit $size="150px" $delay="0.2s" $color="#764ba2" />
                  <Orbit $size="200px" $delay="0.4s" $color="#4a90e2" />
                </FloatingOrbits>
              </ProfileImageWrapper>
            </ProfileContainer>
          </Slide>
        </RightSection>
      </Container>
    </BackgroundWrapper>
  );
}

export default ProfComponent;

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

const orbitAnimation = keyframes`
  0% { transform: rotate(0deg) translateX(${props => props.$size}) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(${props => props.$size}) rotate(-360deg); }
`;

const backgroundAnimation = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const buttonHover = keyframes`
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(100%) skewX(-20deg); }
`;

const iconPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const iconFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(5deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(-3px) rotate(-3deg); }
`;

// Styled Components
const BackgroundWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(11, 37, 79),rgb(7, 29, 56),rgb(9, 30, 48));
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 70% 70%, rgba(75, 108, 162, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 50% 20%, rgba(74, 144, 226, 0.1) 0%, transparent 20%);
  transform: translate(-50%, -50%);
  animation: ${backgroundAnimation} 60s linear infinite;
  z-index: 0;
`;


const Container = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  padding: 6rem 2rem 1rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: auto;
  align-items: center;
  color: white;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 4rem 1.5rem 1rem;
  }

  @media (max-width: 768px) {
    grid-template-rows: auto auto;
    gap: 1.5rem;
    padding: 3rem 1rem 0;
  }
`;

const continuousZoom = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
`;



const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${continuousZoom} 10s ease-in-out infinite;

  @media (max-width: 1024px) {
    order: 2;
    text-align: center;
    padding-bottom: 1rem;
  }
`;


const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 1024px) {
    order: 1;
    padding-bottom: 1rem;
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 0;
`;

const WelcomeText = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h4 {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    
    .gradient-accent {
      background: linear-gradient(90deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const HandWave = styled.div`
  font-size: 2rem;
  animation: ${waveAnimation} 2s ease infinite;
  transform-origin: 70% 70%;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-family: 'Inter', 'Poppins', sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
   
    background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
  }
  
  .role-text {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
  }
`;

const PhilosophySection = styled.div`
  position: relative;
`;

const PhilosophyText = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 400;
  position: relative;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    text-align: center;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PhilosophyIcon = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
  
  svg {
    font-size: 1.5rem;
    color: #667eea;
  }
  
  .award-icon {
    position: absolute;
    top: -22px;
    right: -8px;
    font-size: 0.8rem;
    color: #60ebe4;
    z-index: 3;
    animation: ${iconPulse} 3s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  
  @media (max-width: 1024px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const QuoteSection = styled.div`
  margin: 1rem 0;
`;

const QuoteContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const QuoteBorderTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 0 0 3px 3px;
`;

const QuoteBorderBottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px 3px 0 0;
`;

const QuoteContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const QuoteIcon = styled.div`
  font-size: 1.8rem;
  color: #667eea;
  margin-top: 0.3rem;
  flex-shrink: 0;
  animation: ${iconFloat} 4s ease-in-out infinite;
`;

const QuoteText = styled.p`
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const QuoteProgress = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
`;

const QuoteDot = styled(motion.button).attrs({ type: 'button' })`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.$active ? '#667eea' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  padding: 0;
  
  &:hover {
    background: #667eea;
  }

  &:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const ButtonHoverEffect = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, rgb(96, 235, 228), rgb(58, 123, 213));
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: none;
  cursor: pointer;
  
  &:hover {
    ${ButtonHoverEffect} {
      transform: translateX(100%);
    }
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    align-items: center;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const SocialLabel = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 500;
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(96, 235, 228, 0.3);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  max-width: 28rem;
  height: auto;
  border-radius: 30px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 60px rgba(43, 8, 89, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 1024px) {
    max-width: 24rem;
  }
  
  @media (max-width: 768px) {
    max-width: 20rem;
  }
`;

const ImageGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: linear-gradient(135deg, #667EEA, #764BA2);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(40px);
  z-index: 1;
  animation: ${glowPulse} 4s ease-in-out infinite;
`;

const FloatingOrbits = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Orbit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.$size};
  height: ${props => props.$size};
  border: 2px dashed ${props => props.$color || 'rgba(102, 126, 234, 0.5)'};
  border-radius: 50%;
  transform-origin: center;
  animation: ${orbitAnimation} 20s linear infinite;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0.6;
`;