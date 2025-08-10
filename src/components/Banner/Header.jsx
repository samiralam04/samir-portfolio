import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCode, FaBars, FaTimes } from "react-icons/fa";
import { motion } from 'framer-motion';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const checkIfMobile = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) setMenuOpen(false);
    }, []);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 10);
    }, []);

    useEffect(() => {
        checkIfMobile();
        
        let resizeTimeout;
        const resizeListener = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkIfMobile, 100);
        };

        window.addEventListener('resize', resizeListener);
        window.addEventListener('scroll', handleScroll);
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', resizeListener);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(resizeTimeout);
        };
    }, [checkIfMobile, handleScroll, menuOpen]);

    const handleNavClick = () => {
        if (isMobile) {
            setMenuOpen(false);
        }
    };

    return (
        <>
            <SkipLink href="#main">Skip to content</SkipLink>
            <BannerHeader $scrolled={scrolled} role="banner">
                <HeaderBackground />
                <NavContainer>
                    <LogoContainer
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        aria-label="Home"
                    >
                        <CodeSymbol aria-hidden="true">
                            <FaCode />
                        </CodeSymbol>
                        <LogoText>Samir</LogoText>
                    </LogoContainer>

                    <MobileMenuButton 
                        onClick={() => setMenuOpen(!menuOpen)}
                        whileTap={{ scale: 0.9 }}
                        $isMobile={isMobile}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </MobileMenuButton>

                    <NavLinks 
                        $isMobile={isMobile}
                        $menuOpen={menuOpen}
                        initial={{ x: '100%' }}
                        animate={{ 
                            x: isMobile ? (menuOpen ? 0 : '100%') : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        <NavItem>
                            <NavLink 
                                href="#home" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#home' ? 'page' : undefined}
                            >
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#skills" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#skills' ? 'page' : undefined}
                            >
                                Skills
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#service" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#service' ? 'page' : undefined}
                            >
                                Services
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#project" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#project' ? 'page' : undefined}
                            >
                                Projects
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#coding-progress" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#coding-progress' ? 'page' : undefined}
                            >
                                Progress
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#footer" 
                                onClick={handleNavClick}
                                aria-current={window.location.hash === '#footer' ? 'page' : undefined}
                            >
                                Contact
                            </NavLink>
                        </NavItem>
                    </NavLinks>

                    {isMobile && menuOpen && (
                        <Overlay 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            role="presentation"
                        />
                    )}
                </NavContainer>
            </BannerHeader>
        </>
    );
};

export default Header;

// Animations
const floatIn = keyframes`
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
`;

const gradientMove = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const sparkle = keyframes`
    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1) rotate(180deg); opacity: 1; }
`;

const slideIn = keyframes`
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const SkipLink = styled.a`
    position: absolute;
    top: -40px;
    left: 0;
    background: #4a90e2;
    color: white;
    padding: 8px;
    z-index: 10000;
    transition: top 0.3s ease;
    
    &:focus {
        top: 0;
    }
`;

const BannerHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    padding: 1rem 0;
    background: ${props => props.$scrolled 
        ? 'rgba(10, 15, 30, 0.95)' 
        : 'transparent'};
    backdrop-filter: ${props => props.$scrolled ? 'blur(20px)' : 'none'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: ${props => props.$scrolled 
        ? '1px solid rgba(255, 255, 255, 0.1)' 
        : '1px solid transparent'};
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.$scrolled 
            ? 'linear-gradient(90deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1))'
            : 'transparent'};
        background-size: 200% 100%;
        animation: ${gradientMove} 8s ease infinite;
        opacity: ${props => props.$scrolled ? 1 : 0};
        transition: opacity 0.4s ease;
    }
`;

const HeaderBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
`;

const NavContainer = styled.div`
    max-width: 1400px;
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
        padding: 0 1rem;
        width: 100%;
    }
`;

const LogoContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    z-index: 1001;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: #4a90e2;
        border-radius: 50%;
        top: -8px;
        right: -8px;
        animation: ${sparkle} 2s ease-in-out infinite;
    }
`;

const CodeSymbol = styled.div`
    font-size: 2rem;
    color: #4a90e2;
    display: flex;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${floatIn} 0.6s ease-out;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        width: 120%;
        height: 120%;
        background: radial-gradient(circle, rgba(74, 144, 226, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.3s ease;
        z-index: -1;
    }

    &:hover {
        transform: rotate(15deg) scale(1.1);
        color: #6a5acd;
        
        &::before {
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
`;

const LogoText = styled.span`
    font-size: 1.8rem;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    position: relative;
    background: linear-gradient(135deg, #4a90e2, #6a5acd, #4a90e2);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradientMove} 3s ease infinite;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: -8px;
        left: 0;
        background: linear-gradient(90deg, #4a90e2, #6a5acd);
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px;
    }

    &:hover::after {
        transform: scaleX(1);
    }
    
    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const NavLinks = styled(motion.ul)`
    display: flex;
    gap: 1.5rem;  // Reduced from 2.5rem
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        right: 0;
        width: 65%;  // Reduced from 75%
        height: 100vh;
        background: linear-gradient(135deg, 
            rgba(20, 25, 40, 0.98) 0%,
            rgba(30, 35, 50, 0.98) 100%);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: flex-start;  // Changed from center
        padding-top: 6rem;  // Added padding from top
        z-index: 1002;
        box-shadow: -10px 0 50px rgba(0, 0, 0, 0.5);
        gap: 0.8rem;  // Reduced gap between items
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(102, 126, 234, 0.1) 0%,
                rgba(118, 75, 162, 0.1) 100%);
            pointer-events: none;
        }
    }
    
    @media (max-width: 480px) {
        width: 70%;  // Adjusted for very small screens
    }
`;

const NavItem = styled.li`
    position: relative;
    animation: ${slideIn} 0.5s ease-out;
    animation-fill-mode: both;
    
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
    &:nth-child(5) { animation-delay: 0.5s; }
    &:nth-child(6) { animation-delay: 0.6s; }

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

const NavLink = styled.a`
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;  // Slightly reduced from 1.1rem
    font-family: 'Poppins', sans-serif;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.6rem 1rem;  // Reduced padding
    position: relative;
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background: linear-gradient(90deg, #4a90e2, #6a5acd);
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            rgba(74, 144, 226, 0.1), 
            rgba(106, 90, 205, 0.1));
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
        z-index: -1;
    }

    &:hover, &:focus {
        color: #fff;
        transform: translateY(-2px);
        text-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
        
        &::before {
            transform: scaleX(1);
        }
        
        &::after {
            transform: scaleX(1);
        }
    }

    &:focus-visible {
        outline: 2px solid #4a90e2;
        outline-offset: 4px;
        background: rgba(74, 144, 226, 0.2);
    }

    @media (max-width: 768px) {
        font-size: 1.1rem;  // Reduced from 1.4rem
        padding: 0.8rem 1.5rem;  // Reduced padding
        display: block;
        width: 100%;
        text-align: center;
        margin: 0.25rem 0;  // Reduced margin
        
        &:hover, &:focus {
            background: rgba(74, 144, 226, 0.2);
            transform: translateX(8px);  // Reduced movement
        }
    }
`;

const MobileMenuButton = styled(motion.button).attrs({ type: 'button' })`
    display: ${props => props.$isMobile ? 'flex' : 'none'};
    width: 44px;  // Reduced from 50px
    height: 44px;  // Reduced from 50px
    border-radius: 12px;
    background: linear-gradient(135deg, 
        rgba(74, 144, 226, 0.2),
        rgba(106, 90, 205, 0.2));
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1003;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    padding: 0;
    border: none;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
        transition: left 0.5s ease;
    }

    svg {
        font-size: 1.3rem;  // Reduced from 1.5rem
        color: #fff;
        transition: all 0.3s ease;
        z-index: 1;
    }

    &:hover {
        background: linear-gradient(135deg, 
            rgba(74, 144, 226, 0.4),
            rgba(106, 90, 205, 0.4));
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        
        &::before {
            left: 100%;
        }
        
        svg {
            color: #4a90e2;
            transform: rotate(180deg);
        }
    }
    
    &:active {
        transform: scale(0.95);
    }

    &:focus-visible {
        outline: 2px solid #4a90e2;
        outline-offset: 4px;
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.5),
        rgba(10, 15, 30, 0.7));
    z-index: 1001;
    pointer-events: auto;
    backdrop-filter: blur(5px);
`;