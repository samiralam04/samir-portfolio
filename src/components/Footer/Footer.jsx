import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin, AiOutlineArrowUp } from "react-icons/ai";
import { BsSlack } from "react-icons/bs";
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { FaInstagram } from "react-icons/fa";
import dp from './dp.png';

// Loading Spinner Component
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(96, 235, 228, 0.3);
  border-radius: 50%;
  border-top-color: #60ebe4;
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1rem;
`;

const Footer = () => {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false); // Success message
  const [loading, setLoading] = useState(false);     // Loading state

  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const apiKey = process.env.REACT_APP_API_KEY;
    const formDataObj = new FormData(event.target);
    formDataObj.append("access_key", apiKey);
    formDataObj.append("subject", `${formDataObj.get('name')} sent you a message from your portfolio!`);
    const json = JSON.stringify(Object.fromEntries(formDataObj));

    // Show loading popup
    setLoading(true);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    setLoading(false); // Hide loading popup

    if (res.success) {
      console.log("Success", res);

      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setShowPopup(true); // Show thank you popup
    }
  };

  return (
    <>
      <Container id="footer">
        {/* Left Profile Section */}
        <Profile>
          <Slide direction="left" delay={1}>
            <h1>Portfolio</h1>
          </Slide>
          <div className="address">
            <Slide direction="left"><h1>Education:</h1></Slide>
            <Slide direction="left"><p>Bachelor of Computer Applications (BCA)</p></Slide>
          </div>
          <div className="links">
            <Slide direction="left"><h1>Contact me directly:</h1></Slide>
            <div>
              <span><FiPhoneCall /></span>
              <Slide direction="left"><a href="tel:+917604986674">+917604986674</a></Slide>
            </div>
            <div>
              <Slide direction="left"><span><HiOutlineMailOpen /></span></Slide>
              <Slide><a href="mailto:samiralam7005@gmail.com">samiralam7005@gmail.com</a></Slide>
            </div>
          </div>
          <div className="profiles">
            <Slide direction="left"><h1>Check my profiles</h1></Slide>
            <div className="icons">
              <Zoom><span><a href="https://github.com/samiralam04" target="_blank"><AiFillGithub /></a></span></Zoom>
              <Zoom><span><a href="https://www.linkedin.com/in/samir-alam-3756582b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><AiFillLinkedin /></a></span></Zoom>
              <Zoom><span><a href="https://www.instagram.com/samir.__.04" target="_blank"><FaInstagram /></a></span></Zoom>
              <Zoom><span><a href="#"><BsSlack /></a></span></Zoom>
            </div>
          </div>
          <Fade>
            <ArrowUp onClick={scrollUp}><AiOutlineArrowUp /></ArrowUp>
          </Fade>
        </Profile>

        {/* Contact Form Section */}
        <Slide direction="right">
          <FormContainer onSubmit={onSubmit}>
            <div className="name">
              <span><CgProfile /></span>
              <input
                type="text" placeholder="Enter Your Name" required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <span><MdAlternateEmail /></span>
              <input
                type="email" placeholder="example@domain.com" required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="message">
              <span className="messageIcon"><FiMessageSquare /></span>
              <textarea
                name="message" placeholder="Your message..." style={{ paddingTop: '40px' }} required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit Form</button>
          </FormContainer>
        </Slide>

        {/* Loading Popup */}
        {loading && (
          <Popup>
            <PopupContent>
              <LoadingSpinner />
              <h2>Sending...</h2>
              <p>Please wait while your message is being sent.</p>
            </PopupContent>
          </Popup>
        )}

        {/* Success Message Popup */}
        {showPopup && (
          <Popup>
            <PopupContent>
              <h2>Thank you!</h2>
              <p>Your form has been submitted successfully.</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </PopupContent>
          </Popup>
        )}
      </Container>

      {/* Copyright */}
      <Copyright>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <img src={dp} alt="Logo" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
          © 2024 Samir Alam. All Rights Reserved.
        </p>
      </Copyright>
    </>
  );
};

export default Footer;

const Copyright = styled.div`
  background-color:var(---background); 
  color: #fff;
  text-align: center; 
  padding: 1rem 0; 
  font-size: 0.9rem; 
`;

const Container = styled.div`
  margin-top: 2rem;
  position: relative;
  padding: 2rem 0;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 3rem;
  }
`;
const Profile = styled.div`
  flex: 1;
  .address {
    padding: 1rem 0;
    h1 {
      font-size: 1.2rem;
    }

    p {
      width: 60%;
      padding-top: 0.5rem;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }

  .links {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: lightgray;
        :hover {
          color: #60ebe4;
        }
      }
    }
  }
  }

  .profiles {
    h1 {
      font-size: 1.2rem;
      padding: 1rem 0;
    }

    .icons {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50px;

        :hover {
          background-color: #60ebe4;
        }

        a {
          margin-top: 0.2rem;
          color: #fff;
        }
      }
    }
  }
`;
const ArrowUp = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #60ebe4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  @media (max-width: 650px) {
    position: absolute;
    right: 3rem;
    top: 16rem;
  }
`;

const FormContainer = styled.form`
  flex: 1;

  h1 {
    font-size: 1.3rem;
    padding-bottom: 0.7rem;
  }

  .name,
  .email,
  .message {
    width: 450px; /* Keep the original width */
    display: flex;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 0.5rem;

    input,
    textarea {
      width: 100%; /* Set width to 100% to fill the parent container */
      border: none;
      outline: none;
      color: #fff;
      background-color: transparent;
      padding: 1rem 0.5rem;
      margin-bottom: 0.5rem;
    }

    span {
      background-color: #3e3e3e;
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -5px;
    }

    .messageIcon {
      align-items: center;
      svg {
        font-size: 1rem;
      }
      padding-top: 0.5rem;
    }
  }

  button {
    width: 450px; /* Keep the original width */
    height: 2rem;
    background-color: #60ebe4;
    border: none;
    border-radius: 5px;
    filter: drop-shadow(0px 4px 5px #01be9551);
    cursor: pointer;
    align-self: center;

    &:hover {
      filter: drop-shadow(0px 6px 9px #01be9551);
    }
  }

  @media (max-width: 768px) { /* Adjust based on your desired breakpoint */
    .name,
    .email,
    .message,
    button {
      width: 100%; /* Set width to 100% for smaller screens */
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #494D5F;
  padding: 3rem;
  border-radius: 5px;
  text-align: center;
  max-width: 300px;
  width: 90%;

  h2 {
    margin-bottom: 1rem;
    color: #60ebe4;
  }

  p {
    margin-bottom: 1.5rem;
    color: #fff;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #60ebe4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #4bc3c0;
    }
  }
`;