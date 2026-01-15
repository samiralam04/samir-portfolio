import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Content>
                <Image src={process.env.PUBLIC_URL + '/images/404.png'} alt="404 Not Found" />
                <Title>404</Title>
                <Subtitle>Looks like you're lost!</Subtitle>
                <HomeButton onClick={() => navigate('/')}>
                    Go Back Home
                </HomeButton>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-dark); /* Using variable from global css/theme */
  color: white; /* Assuming dark theme based on other files */
  padding: 1rem;
`;

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 600px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px; /* Optional rounded corners */
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  color: #01be96; /* Matching the green from ProfComponent or similar accent */
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 0;
  opacity: 0.9;
`;

const HomeButton = styled.button`
  padding: 12px 30px;
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  font-weight: 500;
  
  &:hover {
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
    color: #01be96;
    transform: translateY(-5px);
  }
`;

export default NotFound;
