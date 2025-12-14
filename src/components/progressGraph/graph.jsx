import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiCode, FiStar, FiUsers, FiGitCommit } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const Graph = () => {
  const leetcodeUsername = "n0RAz1BSow";
  const githubUsername = "samiralam04";

  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [githubContributions, setGithubContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Slightly reduced stagger for faster appearance
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7, // Slightly increased duration for smoother animation
        ease: "easeOut",
        // Added spring physics for a subtle bounce
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!response.ok) throw new Error('GitHub user data fetch failed');
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        setError(err.message);
      }
    };


    const fetchGithubContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jasonliang.me/v1/${githubUsername}`);
        if (!response.ok) throw new Error('GitHub contributions fetch failed');
        const data = await response.json();
        // The structure of this API might vary, assuming totalContributions is directly available
        setGithubContributions(data.totalContributions || 0);
      } catch (err) {
        console.error("Failed to fetch GitHub contributions:", err);
        // Optionally set an error specifically for contributions
      }
    };


    const fetchLeetcodeData = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        if (!response.ok) throw new Error('LeetCode data fetch failed');
        const data = await response.json();
        setLeetcodeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
    fetchGithubContributions();
    fetchLeetcodeData();
  }, [githubUsername, leetcodeUsername]); // Added dependencies

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <Container
      id="coding-progress"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header variants={itemVariants}>
        <Subtitle className="gradient-text">
          <FiCode style={{ marginRight: '10px' }} />
          My Coding Journey
        </Subtitle>
        <Title>Development Activity</Title>
        <Description>
          Tracking my progress through consistent coding practice and contributions on various platforms.
        </Description>
      </Header>

      <GraphsSection>
        {/* LeetCode Card */}
        <GraphCard variants={itemVariants} whileHover="hover">
          <PlatformHeader>
            <FiCode size={24} />
            <GraphTitle>LeetCode Stats</GraphTitle>
          </PlatformHeader>
          <GraphImage
            src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&ext=heatmap`}
            alt="LeetCode Stats"
            loading="lazy"
            variants={{ hover: { scale: 1.02, rotate: 1 } }} // Subtle hover animation
          />
          {leetcodeData && (
            <StatsGrid>
              <StatItem>
                <StatValue>{leetcodeData.totalSolved || 'N/A'}</StatValue>
                <StatLabel>Problems Solved</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  {leetcodeData.acceptanceRate ? `${Math.round(leetcodeData.acceptanceRate)}%` : 'N/A'}
                </StatValue>
                <StatLabel>Acceptance Rate</StatLabel>
              </StatItem>
            </StatsGrid>
          )}
          <GraphLink
            href={`https://leetcode.com/${leetcodeUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            View Full Profile →
          </GraphLink>
        </GraphCard>

        {/* GitHub Profile + Overview Card */}
        <GraphCard variants={itemVariants} whileHover="hover">
          <PlatformHeader>
            <SiGithub size={24} />
            <GraphTitle>GitHub Profile</GraphTitle>
            <Badge>
              <FiStar size={14} />
              {githubData?.public_repos || '0'} Repos
            </Badge>
          </PlatformHeader>

          <ProfileInfo>
            <Avatar
              src={githubData?.avatar_url}
              alt={`${githubUsername}'s avatar`}
              whileHover={{ scale: 1.1, rotate: 5 }} // More pronounced avatar animation
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <ProfileName>{githubData?.name || githubUsername}</ProfileName>
            <ProfileBio>{githubData?.bio || 'Passionate developer and open-source enthusiast.'}</ProfileBio>
            <ProfileStats>
              <Stat>
                <StatNumber>{githubData?.followers || '0'}</StatNumber>
                <StatLabel><FiUsers style={{ verticalAlign: 'middle', marginRight: '5px' }} />Followers</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{githubData?.following || '0'}</StatNumber>
                <StatLabel><FiUsers style={{ verticalAlign: 'middle', marginRight: '5px' }} />Following</StatLabel>
              </Stat>
              {githubContributions > 0 && (
                <Stat>
                  <StatNumber>{githubContributions.toLocaleString()}</StatNumber>
                  <StatLabel><FiGitCommit style={{ verticalAlign: 'middle', marginRight: '5px' }} />Contributions</StatLabel>
                </Stat>
              )}
            </ProfileStats>
          </ProfileInfo>

          <GraphImage
            src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubUsername}&theme=github_dark`}
            alt="GitHub Contribution Graph"
            loading="lazy"
            variants={{ hover: { scale: 1.02, rotate: -1 } }} // Subtle hover animation
          />
          <GraphLink
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            View Full Profile →
          </GraphLink>
        </GraphCard>

        {/* GitHub Stats Card */}
        <GraphCard variants={itemVariants} whileHover="hover">
          <PlatformHeader>
            <FiGithub size={24} />
            <GraphTitle>GitHub Analytics</GraphTitle>
          </PlatformHeader>
          <StatsRow>
            <GraphImage
              src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=github_dark&hide_border=true&card_width=450`}
              alt="GitHub Stats"
              loading="lazy"
              variants={{ hover: { scale: 1.02 } }} // Subtle hover animation
            />
            <GraphImage
              src={`https://github-readme-streak-stats-eight.vercel.app?user=${githubUsername}&theme=dark&hide_border=true`}

              alt="GitHub Streak"
              loading="lazy"
              variants={{ hover: { scale: 1.02 } }} // Subtle hover animation
            />
          </StatsRow>
          <GraphLink
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            View Detailed Stats →
          </GraphLink>
        </GraphCard>
      </GraphsSection>
    </Container>
  );
};

export default Graph;

// --- Styled Components (No Changes Needed for these base styles, mostly for visual consistency) ---

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(96, 235, 228, 0.3);
  border-radius: 50%;
  border-top-color: #60ebe4;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ff6b6b;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Container = styled(motion.section)`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 0;
  text-align: center;
  overflow: hidden;
`;

const Header = styled(motion.div)`
  margin-bottom: 4rem;
  padding: 0 2rem;
`;

const Subtitle = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #60ebe4, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GraphsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  justify-content: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GraphCard = styled(motion.div)`
  background: rgba(30, 30, 40, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden; // Ensures background gradient stays within bounds

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(96, 235, 228, 0.1), rgba(58, 123, 213, 0.1));
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    border-color: rgba(96, 235, 228, 0.3);
    box-shadow: 0 12px 40px rgba(58, 123, 213, 0.15);
    &:before {
      opacity: 1;
    }
  }
`;

const PlatformHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
  color: #60ebe4;
`;

const GraphTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(90deg, #60ebe4, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GraphImage = styled(motion.img)` // Added motion to GraphImage
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  object-fit: cover; // Ensure image covers its area well
`;

const GraphLink = styled(motion.a)`
  display: inline-flex; // Changed to inline-flex for icon alignment
  align-items: center;
  color: #60ebe4;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  margin-top: auto;
  padding-top: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    color: #3a7bd5;
    text-decoration: underline; // Added underline for clear hover state
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  background: rgba(20, 20, 30, 0.5);
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #60ebe4;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const Badge = styled.div`
  background: rgba(96, 235, 228, 0.1);
  color: #60ebe4;
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  margin-left: auto;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled(motion.img)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 0.8rem;
  border: 3px solid #60ebe4; // Thicker border
  box-shadow: 0 0 15px rgba(96, 235, 228, 0.5); // Glow effect
`;

const ProfileName = styled.h4`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const ProfileBio = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 1rem;
  text-align: center;
  max-width: 300px; // Limit width for better readability
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem; // Slightly reduced gap
  flex-wrap: wrap; // Allow wrapping on smaller screens
  justify-content: center;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 1.4rem;
  color: #60ebe4;
  font-weight: 700;
`;