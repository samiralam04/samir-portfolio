import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaJava, FaJs, FaPython, FaHtml5, FaCss3Alt, FaPhp,
  FaReact, FaGitAlt, FaDocker
} from "react-icons/fa";
import {
  SiSpringboot, SiBootstrap, SiFlask,
  SiPostgresql, SiMysql, SiFirebase, SiCplusplus
} from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

// --------- Skill Data -------------
const skillMap = {
  languages: [
    { icon: <FaJava />, title: "Java" },
    { icon: <FaJs />, title: "JavaScript" },
    { icon: <FaPython />, title: "Python" },
    { icon: <SiCplusplus />, title: "C/C++" },
    { icon: <FaHtml5 />, title: "HTML5" },
    { icon: <FaCss3Alt />, title: "CSS3" },
    { icon: <FaPhp />, title: "PHP" }
  ],
  frameworks: [
    { icon: <FaReact />, title: "React.js" },
    { icon: <SiSpringboot />, title: "Spring Boot" },
    { icon: <SiBootstrap />, title: "Bootstrap 5" },
    { icon: <SiFlask />, title: "Flask" },
    { icon: <FaJs />, title: "Chart.js" },
    { icon: <FaJava />, title: "Servlets" }
  ],
  tools: [
    { icon: <SiPostgresql />, title: "PostgreSQL" },
    { icon: <FaGitAlt />, title: "Git" },
    { icon: <FaDocker />, title: "Docker" },
    { icon: <FaJava />, title: "Apache Tomcat" },
    { icon: <FaPython />, title: "Selenium" },
    { icon: <FaJava />, title: "JMeter" },
    { icon: <SiFirebase />, title: "Firebase" }
  ]
};

const tabList = [
  { label: "Languages", key: "languages" },
  { label: "Frameworks", key: "frameworks" },
  { label: "Tools", key: "tools" }
];

// ----------- Animation Keyframes ------------

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(3deg); } /* Slightly reduced float, added rotation */
`;

// ----------- Helper for Animated Particle bg ------------
const COLORS = [
  "rgba(96,235,228,0.23)", "rgba(58,123,213,0.16)",
  "rgba(118,75,162,0.19)", "rgba(102,126,234,0.2)"
];
const Particles = () => (
  <ParticlesWrapper>
    {[...Array(20)].map((_, i) => {
      const color = COLORS[(Math.random() * COLORS.length) | 0];
      const size = 22 + Math.random() * 63;
      return (
        <Particle
          key={i}
          style={{
            top: `${Math.random() * 95}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${3.2 + Math.random() * 7.8}s`,
            animationDelay: `-${Math.random() * 6}s`,
            opacity: 0.10 + Math.random() * 0.22,
            background: `radial-gradient(circle, ${color} 0%, transparent 100%)`,
            filter: `blur(${1.5 + Math.random() * 3.5}px)`
          }}
        />
      );
    })}
  </ParticlesWrapper>
);

// ----------- Main Component ------------

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");
  const [switchAnim, setSwitchAnim] = useState(false);

  const tabsRef = useRef([]);

  useEffect(() => {
    setSwitchAnim(true);
    const timeout = setTimeout(() => setSwitchAnim(false), 350);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  function handleTabKeyDown(e) {
    const idx = tabList.findIndex(tab => tab.key === activeTab);
    if (e.key === "ArrowRight") {
      const next = tabsRef.current[(idx + 1) % tabList.length];
      next && next.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = tabsRef.current[(idx - 1 + tabList.length) % tabList.length];
      prev && prev.focus();
    }
  }

  return (
    <Container id="skills">
      <BackgroundGradient />
      <Particles />
      <ContentWrapper
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SectionHeader
          as={motion.div}
          initial={{ opacity: 0, y: -45, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 15 }} 
        >
          <Title>
            My <span className="gradient-text">Technical Skills</span>
            <TitleUnderline />
          </Title>
          <Description>
            Here you'll find the technologies I'm proficient in, organized by category.
            Each skill represents an area where I've invested significant time and effort to master.
          </Description>
        </SectionHeader>

        <SkillsTabs
          role="tablist"
          aria-label="Technical Skills"
          as={motion.div}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, type: "spring", stiffness: 90 }} 
        >
          {tabList.map((tab, idx) => (
            <TabButton
              ref={el => tabsRef.current[idx] = el}
              key={tab.key}
              role="tab"
              tabIndex={activeTab === tab.key ? 0 : -1}
              aria-selected={activeTab === tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={handleTabKeyDown}
              whileTap={{ scale: 0.92 }} 
              whileHover={{ y: -5, borderColor: "#60ebe4", boxShadow: "0 8px 20px 2px rgba(96,235,228,0.18)" }} 
              type="button"
              aria-controls={`tabpanel-${tab.key}`}
              layout
            >
              {tab.label}
              {activeTab === tab.key && <TabRipple layoutId="ripple" />}
            </TabButton>
          ))}
        </SkillsTabs>

        <SkillsContainerSwitch>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 45 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50, pointerEvents: "none" }} 
              transition={{
                duration: switchAnim ? 0.38 : 0.3, // Slightly longer transition
                ease: [0.4, 0.0, 0.2, 1] // More standard ease-in-out
              }}
              style={{ width: "100%" }}
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={activeTab}
            >
              <SkillsContainer>
                {skillMap[activeTab].map((skill, i) => (
                  <SkillCard
                    as={motion.div}
                    key={skill.title}
                    initial={{ opacity: 0, y: 35, scale: 0.9, rotate: -6 }} 
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{
                      delay: 0.06 * i + 0.08, // Increased delay for staggered effect
                      duration: 0.65, // Longer duration for smoother bounce
                      type: "spring",
                      bounce: 0.45 // More pronounced bounce
                    }}
                    whileHover={{
                      scale: 1.1, // More pronounced scale on hover
                      boxShadow: "0 12px 38px 8px rgba(96,235,228,0.28)", // Stronger shadow
                      y: -12, // More lift
                      rotate: 3 // More rotation
                    }}
                    whileFocus={{
                      scale: 1.08, // Consistent focus scale
                      boxShadow: "0 0 0 8px rgb(96 235 228 / 22%)" // Slightly softer focus ring
                    }}
                    tabIndex={0}
                    aria-label={skill.title}
                  >
                    <AnimatedIcon
                      as={motion.div}
                      whileHover={{
                        rotate: [0, -8, 8, -7, 5, 0], // More dynamic icon wiggle
                        scale: 1.2
                      }}
                      transition={{ duration: 0.95, times: [0, 0.3, 0.6, 0.7, 0.85, 1] }}
                    >
                      {skill.icon}
                    </AnimatedIcon>
                    <SkillTitle>{skill.title}</SkillTitle>
                  </SkillCard>
                ))}
              </SkillsContainer>
            </motion.div>
          </AnimatePresence>
        </SkillsContainerSwitch>
      </ContentWrapper>
    </Container>
  );
};

// ----------- Styled Components ------------

const Container = styled.section`
  width: 100vw;
  padding: clamp(3.5rem, 7vw, 6rem) 0; /* Increased vertical padding for more space */
  min-height: 70vh; /* Slightly increased min-height */
  background: linear-gradient(
    135deg,
    rgb(11, 37, 79), rgb(7, 29, 56) 60%, rgb(9, 30, 48)
  );
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
      rgba(102,126,234,0.11), rgba(118,75,162,0.08),
      rgba(102,126,234,0.11)
    );
    background-size: 200% 100%;
    animation: ${gradientShift} 9.8s linear infinite;
    z-index: 0;
  }
`;

const ParticlesWrapper = styled.div`
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 999px;
  animation: ${particleFloat} infinite alternate;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%,rgba(96,235,228,0.16) 0%,transparent 29%),
    radial-gradient(circle at 70% 80%,rgba(58,123,213,0.13) 0%,transparent 37%);
  animation: ${particleFloat} 10.8s ease-in-out infinite alternate;
`;

const ContentWrapper = styled(motion.div)`
  width: 92%;
  max-width: 1320px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
  padding: 0.5rem 0 0 0;
  @media (max-width: 768px) {
    width: 98%;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(1.8rem, 5vw, 3rem); /* Increased bottom margin */
  position: relative;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.2rem); /* Slightly larger font */
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem; /* Increased bottom margin */
  position: relative;
  display: inline-block;
  padding-bottom: 1rem;
  text-shadow: 0 3px 12px rgba(9,30,48,0.21);

  .gradient-text {
    background: linear-gradient(90deg, #60ebe4, #3a7bd5, #60ebe4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: ${gradientShift} 6.5s ease infinite;
  }
`;
const TitleUnderline = styled.div`
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 70px; height: 3px;
  background: linear-gradient(90deg, #60ebe4, #3a7bd5);
  border-radius: 3px;
  @media (max-width: 768px) {
    width: 45px; height: 2.2px;
  }
`;
const Description = styled.p`
  max-width: 650px; /* Slightly wider description for better flow */
  margin: 0 auto;
  color: rgba(255,255,255,0.88); /* Slightly brighter text */
  line-height: 1.75; /* Increased line height for better readability */
  font-size: clamp(1rem, 2.1vw, 1.18rem); /* Slightly larger font */
  font-weight: 400;
  position: relative;
  letter-spacing: 0.01em;

  &::before {
    content: '';
    position: absolute;
    top: -1.4rem; /* Adjusted position */
    left: 50%;
    transform: translateX(-50%);
    width: 28px; height: 2.5px; /* Slightly larger separator */
    background: rgba(255,255,255,0.18); /* Slightly more prominent separator */
  }
  @media (max-width: 768px) {
    width: 92%;
    font-size: 0.98rem;
    line-height: 1.65;
  }
  @media (max-width: 480px) {
    font-size: 0.92rem;
    line-height: 1.55;
  }
`;

const SkillsTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: clamp(1.3rem, 3.5vw, 2.2rem); /* Increased bottom margin */
  gap: 1.2rem; /* Slightly increased gap between tabs */
  flex-wrap: wrap;
  z-index: 6;
`;

const TabButton = styled(motion.button)`
  position: relative;
  padding: 0.8rem 1.8rem; /* Increased padding */
  background: ${p=>p.active
    ?'linear-gradient(90deg,#60ebe4 30%,#3a7bd5 70%)'
    :'rgba(20,50,90,0.6)'}; /* Slightly darker non-active background */
  border: 2.2px solid ${p=>p.active?'transparent':'rgba(96,235,228,0.4)'}; /* Slightly more prominent border */
  color: ${p=>p.active ? '#0b254f' : '#60ebe4'};
  font-weight: 600;
  border-radius: 30px; /* Slightly more rounded */
  cursor: pointer;
  font-size: 1.05rem; /* Slightly larger font */
  letter-spacing: 0.03em; /* Increased letter-spacing */
  box-shadow: 0 0 8px 2px rgba(58,123,213,0.1); /* Slightly more prominent shadow */
  outline: none;
  overflow: hidden;
  min-width: 110px; /* Slightly increased min-width */

  transition: all 0.25s cubic-bezier(.25, .8, .25, 1); /* Smoother transition */

  &:hover,&:focus{
    border-color: #60ebe4;
    background: linear-gradient(90deg,#60ebe4 15%,#3a7bd5 85%); /* Adjusted gradient */
    color:#0c294f;
    box-shadow: 0 6px 20px 3px rgba(96,235,228,0.22); /* Stronger hover shadow */
    outline: 2px solid #60ebe4;
    outline-offset: 2px; /* Increased outline offset */
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.95rem;
    min-width: 80px;
  }
`;

const TabRipple = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(96,235,228,0.28), /* Slightly more prominent ripple */
    rgba(58,123,213,0.15)
  );
  border-radius: 30px;
  pointer-events: none;
  z-index:1;
`;

const SkillsContainerSwitch = styled.div`
  min-height: 310px; /* Increased min-height for more vertical space */
  width:100%;
  position:relative;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Slightly larger minmax */
  gap: 1.25rem; /* Increased gap between cards */
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  @media (max-width: 520px) {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 0.7rem;
  }
`;

const SkillCard = styled.div`
  background: rgba(255,255,255,0.085); /* Slightly brighter background */
  backdrop-filter: blur(10px); /* Increased blur for more depth */
  padding: 1.6rem 1rem 1rem 1rem; /* Increased padding */
  border-radius: 16px; /* Slightly more rounded */
  text-align: center;
  border: 1.2px solid rgba(96, 235, 228, 0.12); /* Slightly thicker border */
  outline:none;
  user-select: none;
  transition: all 0.28s cubic-bezier(.4, 0, .2, 1); /* Smoother transition */

  &:focus {
    box-shadow: 0 0 0 6px rgb(96 235 228 / 32%); /* More prominent focus ring */
    border-color: #60ebe4;
    outline: none;
    transform: scale(1.07); /* Consistent scale */
  }
  &:hover {
    background: rgba(96,235,228,0.18); /* Slightly more prominent hover background */
    box-shadow: 0 14px 30px rgba(58,123,213,0.25); /* Stronger hover shadow */
    border-color: rgba(96,235,228,0.22);
  }
`;

const AnimatedIcon = styled.div`
  font-size: 2.3rem; /* Slightly larger icon */
  margin-bottom: 0.9rem; /* Increased margin */
  color: #60ebe4;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.25s; /* Smoother transition */

  svg { width: 1em; height: 1em; }
  ${SkillCard}:hover &,
  ${SkillCard}:focus & { transform: scale(1.2) } /* More pronounced scale on hover/focus */
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.15rem; /* Slightly larger font */
  margin: 0;
  color: rgba(255,255,255,0.96); /* Slightly brighter text */
  font-weight: 500;
  letter-spacing:0.015em; /* Slightly increased letter-spacing */
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default Skills;