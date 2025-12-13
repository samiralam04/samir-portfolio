import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from "react-icons/fa";
import { CgCodeSlash } from "react-icons/cg";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        <Logo href="#home">
          <LogoIcon>
            <CgCodeSlash />
          </LogoIcon>
          <span>Samir</span>
        </Logo>

        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#service">Services</NavLink>
          <NavLink href="#project">Projects</NavLink>
          <NavLink href="#coding-progress">Progress</NavLink>

        </NavLinks>

        <MobileMenuIcon onClick={() => setToggle(!toggle)}>
          {toggle ? <FaTimes /> : <FaBars />}
        </MobileMenuIcon>

        <AnimatePresence>
          {toggle && (
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <CloseButton onClick={() => setToggle(false)}>
                <FaTimes />
              </CloseButton>
              <MobileLinks>
                <MobileLink href="#home" onClick={() => setToggle(false)}>Home</MobileLink>
                <MobileLink href="#skills" onClick={() => setToggle(false)}>Skills</MobileLink>
                <MobileLink href="#service" onClick={() => setToggle(false)}>Services</MobileLink>
                <MobileLink href="#project" onClick={() => setToggle(false)}>Projects</MobileLink>
                <MobileLink href="#coding-progress" onClick={() => setToggle(false)}>Progress</MobileLink>

              </MobileLinks>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${props => props.$scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1280px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  font-family: 'Space Grotesk', sans-serif;
`;

const LogoIcon = styled.span`
  color: var(--accent-primary);
  font-size: 1.8rem;
  display: flex;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-primary);
  }

  &.cta {
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--accent-primary);
    border-radius: 4px;
    color: var(--accent-primary);

    &:hover {
      background: rgba(0, 255, 157, 0.1);
      box-shadow: 0 0 15px rgba(0, 255, 157, 0.2);
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--accent-primary);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
  
  &.cta::after {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  font-size: 1.8rem;
  color: var(--text-primary);
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-primary);
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`;

const MobileLink = styled.a`
  font-size: 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-primary);
  }
`;