import React from 'react';
import styled, { keyframes } from 'styled-components';
import SliderComp from './Slider';
import { Zoom, Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <Container id='project'>
        <BackgroundGradient />
        <ContentWrapper>
            <Zoom triggerOnce>
                <SectionHeader>
                    <Title>
                        Explore <span className="gradient-text">My Latest Creations</span>
                        <TitleUnderline />
                    </Title>
                    <Description>
                        Here, you'll find a showcase of my latest and most exciting work.
                        <br/><br/>
                        Explore what I've been building recently and see how I bring ideas to life with code.
                    </Description>
                </SectionHeader>
            </Zoom>
            <Fade triggerOnce delay={300}>
                <SliderComp/>
            </Fade>
        </ContentWrapper>
    </Container>
  );
};

export default Projects;

// Animations
const gradientShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
`;

// Styled Components
const Container = styled.section`
    width: 100%;
    padding: 6rem 0;
    position: relative;
    background: linear-gradient(135deg, rgb(11, 37, 79), rgb(7, 29, 56), rgb(9, 30, 48));
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            rgba(102, 126, 234, 0.1),
            rgba(118, 75, 162, 0.1),
            rgba(102, 126, 234, 0.1));
        background-size: 200% 100%;
        animation: ${gradientShift} 8s ease infinite;
        z-index: 0;
    }

    @media (max-width: 768px) {
        padding: 4rem 0;
    }
`;

const BackgroundGradient = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, rgba(96, 235, 228, 0.1) 0%, transparent 30%),
        radial-gradient(circle at 80% 70%, rgba(58, 123, 213, 0.1) 0%, transparent 30%);
    pointer-events: none;
    z-index: 1;
    animation: ${floatAnimation} 8s ease-in-out infinite alternate;
`;

const ContentWrapper = styled(motion.div)`
    width: 85%;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 2;

    @media (max-width: 1024px) {
        width: 90%;
    }

    @media (max-width: 768px) {
        width: 92%;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 4rem;
    position: relative;

    @media (max-width: 768px) {
        margin-bottom: 3rem;
    }
`;

const Title = styled.h2`
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    padding-bottom: 1rem;

    .gradient-text {
        background: linear-gradient(90deg, #60ebe4, #3a7bd5, #60ebe4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 200% 100%;
        animation: ${gradientShift} 6s ease infinite;
    }

    @media (max-width: 768px) {
        margin-bottom: 1rem;
        padding-bottom: 0.8rem;
    }
`;

const TitleUnderline = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    border-radius: 3px;

    @media (max-width: 768px) {
        width: 60px;
        height: 2px;
    }
`;

const Description = styled.p`
    max-width: 700px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 400;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
        width: 90%;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        line-height: 1.5;
    }
`;