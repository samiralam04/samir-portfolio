import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiStar } from "react-icons/fi";
import { motion } from 'framer-motion';

const ClientSlider = ({ item }) => {
    const stars = Array(5).fill(0);
    
    return (
        <TestimonialCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <ClientHeader>
                <ClientImage 
                    src={item.img_url} 
                    alt={item.name} 
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                <ClientInfo>
                    <ClientName>{item.name}</ClientName>
                    <ClientPosition>{item.position}</ClientPosition>
                    <StarsContainer>
                        {stars.map((_, i) => (
                            <Star 
                                key={i} 
                                filled={i < item.stars}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            />
                        ))}
                    </StarsContainer>
                </ClientInfo>
            </ClientHeader>
            <TestimonialText>{item.disc}</TestimonialText>
            <TestimonialGlow />
        </TestimonialCard>
    );
};

export default ClientSlider;

// Animations
const glowPulse = keyframes`
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
`;

const gradientShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

// Styled Components
const TestimonialCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    height: auto;
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
        background: linear-gradient(135deg, 
            rgba(96, 235, 228, 0.05), 
            rgba(58, 123, 213, 0.05));
        z-index: -1;
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &:hover {
        box-shadow: 0 15px 40px rgba(96, 235, 228, 0.3);
        border-color: rgba(96, 235, 228, 0.4);

        &::before {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const ClientHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1.2rem;
`;

const ClientImage = styled(motion.img)`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(96, 235, 228, 0.5);
    box-shadow: 0 5px 20px rgba(96, 235, 228, 0.3);
    transition: all 0.3s ease;
    z-index: 1;

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

const ClientInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ClientName = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
    background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: ${gradientShift} 6s ease infinite;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const ClientPosition = styled.p`
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0.3rem 0;
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

const StarsContainer = styled.div`
    display: flex;
    gap: 0.3rem;
    margin-top: 0.5rem;
`;

const Star = styled(motion(FiStar))`
    color: ${props => props.filled ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'};
    font-size: 1.2rem;
    fill: ${props => props.filled ? '#FFD700' : 'transparent'};
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const TestimonialText = styled.p`
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    line-height: 1.7;
    margin: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.6;
    }
`;

const TestimonialGlow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(96, 235, 228, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    pointer-events: none;
    animation: ${glowPulse} 4s ease-in-out infinite;

    ${TestimonialCard}:hover & {
        opacity: 0.3;
    }
`;