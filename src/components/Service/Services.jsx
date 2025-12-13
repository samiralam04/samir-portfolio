import React from "react";
import styled from "styled-components";
import { MdDevices, MdWeb, MdStorage, MdCode } from "react-icons/md";
import { motion } from "framer-motion";

const Services = () => {
  const cards = [
    {
      icon: <MdWeb />,
      title: "Frontend Development",
      description: "Crafting responsive, interactive, and pixel-perfect user interfaces using React, modern CSS, and Framer Motion."
    },
    {
      icon: <MdStorage />,
      title: "Backend Development",
      description: "Building robust server-side logic, APIs, and database architectures with Node.js, Spring Boot, and PostgreSQL."
    },
    {
      icon: <MdCode />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code with a focus on best practices and modern development standards."
    }
  ];

  return (
    <Container id="service">
      <HeaderWrapper>
        <Greeting>What I Do</Greeting>
        <Title>My <GradientText>Services</GradientText></Title>
      </HeaderWrapper>

      <CardsContainer>
        {cards.map((card, index) => (
          <GlassCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <IconBox>
              {card.icon}
            </IconBox>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <CardBorder />
          </GlassCard>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default Services;

const Container = styled.section`
  padding: 6rem 0;
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Greeting = styled.h4`
  font-size: 1.2rem;
  color: var(--accent-primary);
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--text-primary);
`;

const GradientText = styled.span`
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CardBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
`;

const GlassCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconBox = styled.div`
  font-size: 3rem;
  color: var(--accent-secondary);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${GlassCard}:hover & {
    color: var(--accent-primary);
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 1rem;
`;
