import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <ProgressBar style={{ scaleX }} />
    );
};

export default ScrollProgress;

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-main);
  transform-origin: 0%;
  z-index: 9999;
  box-shadow: 0 0 10px var(--accent-primary);
`;
