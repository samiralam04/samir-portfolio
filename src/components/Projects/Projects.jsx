import React from 'react';
import styled from 'styled-components';
import SliderComp from './Slider';
import { Zoom, Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <Container id='project'>
            <ContentWrapper>
                <Zoom triggerOnce>
                    <SectionHeader>
                        <Title>
                            Explore <span className="gradient-text">My Latest Creations</span>
                            <TitleUnderline />
                        </Title>
                        <Description>
                            Here, you'll find a showcase of my latest and most exciting work.
                            <br /><br />
                            Explore what I've been building recently and see how I bring ideas to life with code.
                        </Description>
                    </SectionHeader>
                </Zoom>
                <Fade triggerOnce delay={300}>
                    <SliderComp />
                </Fade>
            </ContentWrapper>
        </Container>
    );
};

export default Projects;

// Animations


// Styled Components
const Container = styled.section`
    width: 100%;
    padding: 6rem 0;
    position: relative;
    background: var(--bg-dark);
    overflow: hidden;



    @media (max-width: 768px) {
        padding: 4rem 0;
    }
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
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    padding-bottom: 1rem;

    .gradient-text {
        background: var(--gradient-main);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
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
    background: var(--gradient-main);
    border-radius: 3px;

    @media (max-width: 768px) {
        width: 60px;
        height: 2px;
    }
`;

const Description = styled.p`
    max-width: 700px;
    margin: 0 auto;
    color: var(--text-secondary);
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
        background: var(--glass-border);
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