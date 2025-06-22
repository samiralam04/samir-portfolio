import React from 'react';
import styled from 'styled-components';

const Project = (props) => {
    const { img, disc, href } = props.item;
    return (
        <Container className='project'>
            <ProjectImage src={img} alt="project" />
            <ProjectOverlay>
                <h3>Project Details</h3>
                <p>{disc}</p>
                <DemoButton href={href} target="_blank" rel="noopener noreferrer">
                    View Demo
                </DemoButton>
            </ProjectOverlay>
        </Container>
    );
};

export default Project;

const Container = styled.div`
    height: 16rem;
    margin: 0 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(96, 235, 228, 0.3);
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${Container}:hover & {
        transform: scale(1.1);
    }
`;

const ProjectOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(10, 10, 20, 0.9), transparent);
    color: white;
    transform: translateY(100%);
    transition: transform 0.4s ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(90deg, #60ebe4, #3a7bd5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    p {
        font-size: 0.85rem;
        line-height: 1.5;
    }

    ${Container}:hover & {
        transform: translateY(0);
    }
`;

const DemoButton = styled.a`
    display: inline-block;
    margin-top: 0.8rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
        background: linear-gradient(90deg, #3a7bd5, #60ebe4);
        box-shadow: 0 5px 15px rgba(96, 235, 228, 0.4);
    }
`;