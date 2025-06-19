import React from "react";
import styled from "styled-components";
import {  AiOutlineInstagram } from "react-icons/ai";
import { GiEarthAmerica,  } from "react-icons/gi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import profilePic from './dp.png';

function ProfComponent() {
  return (
    <Container id="home">
      <Slide direction="left">
        <Texts>
          <h4>
            Hello <span className="green">I'am</span>
          </h4>
          <h1 className="green">Samir Alam</h1>
          <h3>Aspiring Full Stack Developer.</h3>
          <h4>
          Great things aren't built in a day—they're refined through effort and dedication.
          </h4>
          <a href="https://drive.google.com/file/d/1QAqFrk8zpH_1E6SDF1FraQidqOIizQ5t/view?usp=drive_link"target="_blank">
          <button>Check My Resume </button></a>
          <Social>
            <p>Check out my</p>
            <div className="social-icons">
              <span>
                <a href="https://www.instagram.com/samir.__.04"target="_blank">
                  <AiOutlineInstagram />
                </a>
              </span>
              <span>
                <a href="https://samiralam04.github.io/samir-portfolio/">
                
                  <GiEarthAmerica />
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/in/samir-alam-3756582b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"target="_blank">
                  <FaLinkedinIn />
                </a>
              </span>
              <span>
                <a href="https://github.com/samiralam04"target="_blank">
                  <FaGithub /> 
                </a>
              </span>
            </div>
          </Social>
        </Texts>
      </Slide>
      <Slide direction="right">
        <Profile>
        <img src={profilePic} alt="profile" />
        

        </Profile>
      </Slide>
    </Container>
  );
}

export default ProfComponent;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 3rem;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;
  align-items: center; /* Ensure vertical alignment */
  
  @media (max-width: 1024px) { /* Better breakpoint for laptops */
    flex-direction: row;
    gap: 1.5rem;
    padding-top: 2rem;
  }

  @media (max-width: 768px) { /* Tablet sizes */
    width: 85%;
    flex-direction: column-reverse; /* Better flow on mobile */
    align-items: flex-start;
    gap: 1rem;
    padding-top: 1.5rem;
  }

  @media (max-width: 480px) { /* Mobile sizes */
    width: 90%;
    padding-top: 1rem;
  }
`;

const Texts = styled.div`
  flex: 1;
  
  h4 {
    padding: 0.5rem 0;
    font-weight: 500;
    margin-top: 1.5rem;
    font-size: clamp(0.9rem, 2vw, 1.1rem); /* Fluid typography */
  }
  
  h1 {
    font-size: clamp(1.8rem, 4vw, 2.5rem); /* Responsive font size */
    font-family: "Secular One", sans-serif;
    letter-spacing: 1.5px;
    line-height: 1.2;
    margin: 0.5rem 0;
  }
  
  h3 {
    font-weight: 500;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    padding: 0.5rem 0;
    text-transform: capitalize;
  }
  
  p {
    font-weight: 300;
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    line-height: 1.6;
    margin: 1rem 0;
  }

  button {
    padding: 0.7rem 2rem;
    margin: 2rem 0;
    cursor: pointer;
    background-color: #60ebe4;
    border: none;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 4px; /* Slight rounding for modern look */
    filter: drop-shadow(0px 10px 10px #01be9551);
    transition: filter 0.3s ease;
    
    &:hover {
      filter: drop-shadow(0px 10px 10px #01be9570);
    }
    
    @media (max-width: 768px) {
      margin: 1.5rem 0;
      width: 100%;
    }
  }
`;

const Social = styled.div`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap; /* Allow wrapping on small screens */
  
  p {
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    margin: 0;
  }

  .social-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    
    span {
      width: 2.3rem;
      height: 2rem;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      background-color: #60ebe4;
      position: relative;
      transition: transform 400ms ease-in-out;
      
      &:hover {
        transform: rotate(360deg);
      }
      
      @media (max-width: 480px) {
        width: 2rem;
        height: 1.7rem;
      }
    }

    a {
      color: #fff;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.9rem;
      
      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }
  }
`;

const Profile = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    max-width: 25rem;
    height: auto;
    filter: drop-shadow(0px 10px 10px #01be9570);
    transition: transform 400ms ease-in-out;
    
    @media (max-width: 1024px) {
      max-width: 20rem;
    }
    
    @media (max-width: 768px) {
      max-width: 18rem;
      margin: 0 auto;
      padding-top: 2rem;
    }
    
    @media (max-width: 480px) {
      max-width: 100%;
      padding-top: 1rem;
    }
  }

  &:hover img {
    transform: translateY(-10px);
  }
`