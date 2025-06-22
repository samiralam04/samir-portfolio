import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Card = ({ Icon, title, disc }) => {
    return (
        <Container 
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
            <IconWrapper 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Icon aria-hidden="true" />
            </IconWrapper>
            <Title id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                {title}
            </Title>
            <DescriptionWrapper>{disc}</DescriptionWrapper>
        </Container>
    );
};

export default Card;

// Animations
const gradientPulse = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
`;

// Styled Components
const Container = styled(motion.div)`
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            rgba(96, 235, 228, 0.05), 
            rgba(58, 123, 213, 0.05),
            rgba(96, 235, 228, 0.05));
        background-size: 200% 100%;
        animation: ${gradientPulse} 8s ease infinite;
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: -1;
    }

    &:hover {
        box-shadow: 0 15px 40px rgba(96, 235, 228, 0.2);
        border-color: rgba(96, 235, 228, 0.3);

        &::before {
            opacity: 1;
        }
    }

    &:focus-visible {
        outline: 2px solid #60ebe4;
        outline-offset: 2px;
    }

    @media (min-width: 768px) {
        padding: 2rem;
    }

    @media (max-width: 480px) {
        padding: 1.2rem;
    }
`;

const IconWrapper = styled(motion.span)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(90deg, 
        rgba(96, 235, 228, 0.1), 
        rgba(58, 123, 213, 0.1));
    margin-bottom: 1rem;
    color: #60ebe4;
    font-size: 2rem;
    position: relative;
    animation: ${floatAnimation} 4s ease-in-out infinite;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px dashed rgba(96, 235, 228, 0.3);
        animation: ${gradientPulse} 12s linear infinite;
    }

    @media (min-width: 768px) {
        width: 80px;
        height: 80px;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        font-size: 1.8rem;
    }
`;

const Title = styled.h2`
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: ${gradientPulse} 6s ease infinite;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, #60ebe4, #3a7bd5);
        transition: width 0.3s ease;
    }

    ${Container}:hover &::after {
        width: 60px;
    }

    @media (min-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const DescriptionWrapper = styled.div`
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    transition: color 0.3s ease;

    strong {
        color: #fff;
        font-weight: 500;
        background: linear-gradient(90deg, #60ebe4, #3a7bd5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    ${Container}:hover & {
        color: rgba(255, 255, 255, 0.85);
    }

    @media (min-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.6;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        line-height: 1.4;
    }
`;