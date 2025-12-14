import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  FaJava, FaJs, FaPython, FaHtml5, FaCss3Alt, FaPhp,
  FaReact, FaGitAlt, FaDocker, FaNodeJs
} from "react-icons/fa";
import {
  SiSpringboot, SiBootstrap, SiFlask,
  SiPostgresql, SiMysql, SiFirebase, SiCplusplus,
  SiTypescript, SiTailwindcss, SiMongodb
} from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

// --------- Skill Data -------------
const skillMap = {
  languages: [
    { icon: <FaJava />, title: "Java" },
    { icon: <FaJs />, title: "JavaScript" },
    { icon: <SiTypescript />, title: "TypeScript" },
    { icon: <FaPython />, title: "Python" },
    { icon: <SiCplusplus />, title: "C/C++" },
    { icon: <FaHtml5 />, title: "HTML5" },
    { icon: <FaCss3Alt />, title: "CSS3" },
    { icon: <FaPhp />, title: "PHP" }
  ],
  frameworks: [
    { icon: <FaReact />, title: "React.js" },
    { icon: <FaNodeJs />, title: "Node.js" },
    { icon: <SiSpringboot />, title: "Spring Boot" },
    { icon: <SiTailwindcss />, title: "Tailwind CSS" },
    { icon: <SiBootstrap />, title: "Bootstrap 5" },
    { icon: <SiFlask />, title: "Flask" },
    { icon: <FaJs />, title: "Express.js" }
  ],
  tools: [
    { icon: <SiPostgresql />, title: "PostgreSQL" },
    { icon: <SiMongodb />, title: "MongoDB" },
    { icon: <FaGitAlt />, title: "Git" },
    { icon: <FaDocker />, title: "Docker" },
    { icon: <SiFirebase />, title: "Firebase" },
    { icon: <SiMysql />, title: "MySQL" }
  ]
};

const tabList = [
  { label: "Languages", key: "languages" },
  { label: "Frameworks", key: "frameworks" },
  { label: "Tools", key: "tools" }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");
  const tabsRef = useRef([]);

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
      <ContentWrapper>
        <SectionHeader
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Greeting>My Expertise</Greeting>
          <Title>
            Technical <GradientText>Skills</GradientText>
          </Title>
          <Description>
            A curated list of technologies I use to build scalable and efficient digital solutions.
          </Description>
        </SectionHeader>

        <SkillsTabs
          role="tablist"
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabList.map((tab, idx) => (
            <TabButton
              ref={el => tabsRef.current[idx] = el}
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={handleTabKeyDown}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {tab.label}
              {activeTab === tab.key && <TabActiveIndicator layoutId="activeTab" />}
            </TabButton>
          ))}
        </SkillsTabs>

        <SkillsGridWrapper>
          <AnimatePresence mode="wait">
            <SkillsGrid
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {skillMap[activeTab].map((skill, i) => (
                <SkillCard
                  key={skill.title}
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    borderColor: "var(--accent-primary)",
                    boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)"
                  }}
                >
                  <IconWrapper>{skill.icon}</IconWrapper>
                  <SkillName>{skill.title}</SkillName>
                  <CardGlow />
                </SkillCard>
              ))}
            </SkillsGrid>
          </AnimatePresence>
        </SkillsGridWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default Skills;

const Container = styled.section`
  padding: 6rem 0;
  background: var(--bg-dark);
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Greeting = styled.h4`
  font-size: 1.2rem;
  color: var(--accent-primary);
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`;

const GradientText = styled.span`
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SkillsTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const TabButton = styled(motion.button)`
  position: relative;
  padding: 0.8rem 2rem;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
  transition: color 0.3s ease;
  overflow: hidden;

  &:hover {
    color: var(--accent-primary);
    border-color: var(--accent-primary);
  }
`;

const TabActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 255, 157, 0.05);
  z-index: -1;
`;

const SkillsGridWrapper = styled.div`
  min-height: 400px;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0, 255, 157, 0.05), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
`;

const SkillCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  overflow: hidden;

  &:hover ${CardGlow} {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  z-index: 1;

  ${SkillCard}:hover & {
    color: var(--accent-primary);
  }
`;

const SkillName = styled.h3`
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
  z-index: 1;
`;
