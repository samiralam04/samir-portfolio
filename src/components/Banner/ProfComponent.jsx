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
          <h3>UX/UI Designer, graphic designer and  Web Developer.</h3>
          <h4>
          It's not at all important to get it right the first time. It's vitally important to get it right the last time.
          </h4>
          <a href="https://drive.google.com/file/d/1Cj32H70qFurds5K2YUN9cu6cS2pAp_KQ/view?usp=drivesdk"target="_blank">
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
                <a href="/">
                  <GiEarthAmerica />
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/in/samir-alam-3756582b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"target="_blank">
                  <FaLinkedinIn />
                </a>
              </span>
              <span>
                <a href="https://github.com/samiralam04?tab=repositories"target="_blank">
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
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
const Texts = styled.div`
  flex: 1;
   h4 {
  padding-top:60px;
   padding: 1rem 0;
   font-weight: 500;
   }
  h1 {
    padding-top:30px;
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    letter-spacing: 2px;
   
  }
  h3 {
    padding-top:20px;
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 1.2rem;
    text-transform: capitalize;
  }
  p {
    padding-top:70px;
    font-weight: 300;
  }

  button {
   
    padding: 0.7rem 2rem;
    margin-top: 4rem;
    cursor: pointer;
    background-color: #60ebe4;
    border: none;
    color: #fff;
    font-weight: 500;
    filter: drop-shadow(0px 10px 10px #01be9551);
    :hover {
      filter: drop-shadow(0px 10px 10px #01be9570);
    }
  }
`;
const Social = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  p {
    font-size: 0.9rem;
    @media (max-width: 690px) {
      font-size: 0.7rem;
    }
  }

  .social-icons {
    padding-top:70px;
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      width: 2.3rem;
      height: 2rem;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      background-color: #60ebe4;
      position: relative;
      transition: transform 400ms ease-in-out;
      :hover {
        transform: rotate(360deg);
      }
    }

    a {
      color: #fff;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
const Profile = styled.div`
  img {
   padding-top: 8rem;
   
    width: 20rem;
    filter: drop-shadow(0px 10px 10px #01be9570);
    transition: transform 400ms ease-in-out;
    @media (max-width: 790px) {
      width: 20rem;
    }

    @media (max-width: 660px) {
      width: 18rem;
    }

    @media (max-width: 640px) {
      width: 100%;
    }
  }

  :hover img {
    transform: translateY(-10px);
  }
`;
