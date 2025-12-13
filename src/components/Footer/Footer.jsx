import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  MdAlternateEmail,
  MdSchool,
  MdLocationOn,
  MdSend
} from "react-icons/md";
import { FaUser, FaGithub, FaLinkedin, FaInstagram, FaSlack } from "react-icons/fa";
import {
  HiOutlinePhone,
  HiOutlineMailOpen
} from "react-icons/hi";
import {
  AiOutlineArrowUp,
  AiOutlineMessage
} from "react-icons/ai";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { motion, AnimatePresence } from "framer-motion";
import dp from './profile.png';

// Animations
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
  from { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(96, 235, 228, 0.3);
  border-radius: 50%;
  border-top-color: var(--accent-primary);
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1rem;
`;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const apiKey = process.env.REACT_APP_API_KEY || "YOUR_ACCESS_KEY_HERE"; // Fallback or handle env
    const formDataObj = new FormData(event.target);
    formDataObj.append("access_key", apiKey);
    formDataObj.append("subject", `${formDataObj.get('name')} sent you a message from your portfolio!`);
    const json = JSON.stringify(Object.fromEntries(formDataObj));

    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        setFormData({ name: '', email: '', message: '' });
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FooterContainer id="footer">
      <ContentWrapper>
        {/* Profile Section */}
        <ProfileSection>
          <Slide direction="left" triggerOnce>
            <SectionTitle>
              <GradientText>Let's Connect</GradientText>
            </SectionTitle>
          </Slide>

          <InfoBlock>
            <Slide direction="left" triggerOnce>
              <InfoTitle>
                <InfoIcon><MdSchool /></InfoIcon>
                Education
              </InfoTitle>
              <InfoText>Bachelor of Computer Applications (BCA)</InfoText>
            </Slide>
          </InfoBlock>

          <ContactBlock>
            <Slide direction="left" triggerOnce>
              <InfoTitle>
                <InfoIcon><HiOutlinePhone /></InfoIcon>
                Contact me
              </InfoTitle>
            </Slide>
            <ContactItem>
              <ContactIcon><HiOutlinePhone /></ContactIcon>
              <Slide direction="left" triggerOnce>
                <ContactLink href="tel:+917604986674">+91 76049 86674</ContactLink>
              </Slide>
            </ContactItem>
            <ContactItem>
              <Slide direction="left" triggerOnce>
                <ContactIcon><HiOutlineMailOpen /></ContactIcon>
              </Slide>
              <Slide triggerOnce>
                <ContactLink href="mailto:samiralam7005@gmail.com">samiralam7005@gmail.com</ContactLink>
              </Slide>
            </ContactItem>
            <ContactItem>
              <Slide direction="left" triggerOnce>
                <ContactIcon><MdLocationOn /></ContactIcon>
              </Slide>
              <Slide triggerOnce>
                <ContactText>India</ContactText>
              </Slide>
            </ContactItem>
          </ContactBlock>

          <SocialBlock>
            <Slide direction="left" triggerOnce>
              <InfoTitle>
                <InfoIcon><FaUser /></InfoIcon>
                Social Profiles
              </InfoTitle>
            </Slide>
            <SocialIcons>
              <SocialIcon>
                <Zoom triggerOnce>
                  <SocialLink
                    href="https://github.com/samiralam04"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    whileHover={{ y: -5 }}
                  >
                    <FaGithub />
                  </SocialLink>
                </Zoom>
              </SocialIcon>
              <SocialIcon>
                <Zoom triggerOnce>
                  <SocialLink
                    href="https://www.linkedin.com/in/samir-alam-3756582b6"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    whileHover={{ y: -5 }}
                  >
                    <FaLinkedin />
                  </SocialLink>
                </Zoom>
              </SocialIcon>
              <SocialIcon>
                <Zoom triggerOnce>
                  <SocialLink
                    href="https://www.instagram.com/samir.__.04"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    whileHover={{ y: -5 }}
                  >
                    <FaInstagram />
                  </SocialLink>
                </Zoom>
              </SocialIcon>
            </SocialIcons>
          </SocialBlock>

          <Fade triggerOnce>
            <ScrollUpButton
              onClick={scrollUp}
              aria-label="Scroll to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineArrowUp />
            </ScrollUpButton>
          </Fade>
        </ProfileSection>

        {/* Contact Form */}
        <FormSection>
          <Slide direction="right" triggerOnce>
            <ContactForm onSubmit={onSubmit}>
              <FormTitle>Send me a message</FormTitle>
              <FormSubtitle>I'll respond as soon as possible</FormSubtitle>

              <InputGroup>
                <InputIcon><FaUser /></InputIcon>
                <InputField
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputIcon><MdAlternateEmail /></InputIcon>
                <InputField
                  type="email"
                  placeholder="example@domain.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup className="message">
                <InputIcon className="messageIcon"><AiOutlineMessage /></InputIcon>
                <TextArea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MdSend /> Send Message
              </SubmitButton>
            </ContactForm>
          </Slide>
        </FormSection>
      </ContentWrapper>

      {/* Loading Popup */}
      <AnimatePresence>
        {loading && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <LoadingSpinner />
              <ModalTitle>Sending your message...</ModalTitle>
              <ModalText>Please wait while we deliver your message.</ModalText>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SuccessIcon>✓</SuccessIcon>
              <ModalTitle>Message Sent!</ModalTitle>
              <ModalText>Thank you for reaching out. I'll get back to you soon.</ModalText>
              <ModalButton
                onClick={() => setShowPopup(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Copyright */}
      <CopyrightSection>
        <CopyrightText>
          <LogoImage src={dp} alt="Samir Alam" />
          © {new Date().getFullYear()} Samir Alam. All Rights Reserved.
        </CopyrightText>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  position: relative;
  padding: 6rem 0 0;
  background: var(--bg-dark);
  overflow: hidden;
`;



const ContentWrapper = styled.div`
  width: 85%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const ProfileSection = styled.div`
  flex: 1;
  padding: 2rem 0;
  max-width: 500px;
  @media (max-width: 768px) { max-width: 100%; }
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.2;
  color: var(--text-primary);
  @media (max-width: 768px) { font-size: 2rem; }
`;

const GradientText = styled.span`
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: ${gradient} 6s ease infinite;
`;

const InfoBlock = styled.div` padding: 1rem 0; `;

const InfoTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoIcon = styled.span`
  color: var(--accent-primary);
  font-size: 1.2rem;
  display: flex;
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-left: 1.7rem;
`;

const ContactBlock = styled.div` margin: 2rem 0; `;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const ContactIcon = styled(InfoIcon)` min-width: 20px; `;

const ContactLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  word-break: break-all;
  
  &:hover {
    color: var(--accent-primary);
    text-decoration: underline;
  }
`;

const ContactText = styled.span` color: var(--text-secondary); `;

const SocialBlock = styled.div` margin: 2rem 0; `;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const SocialIcon = styled(motion.div)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: var(--gradient-main);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(96, 235, 228, 0.3);
    border-color: transparent;
  }
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ScrollUpButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background: var(--gradient-main);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  color: #000;
  transition: all 0.3s ease;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(96, 235, 228, 0.3);
  border: none;
  outline: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(96, 235, 228, 0.4);
  }

  @media (max-width: 768px) {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    margin-top: 0;
    z-index: 10;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem 0;
  max-width: 500px;
  @media (max-width: 768px) { max-width: 100%; }
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(96, 235, 228, 0.1);
    border-color: var(--accent-primary);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const FormSubtitle = styled.p`
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.2);

  &:focus-within {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(96, 235, 228, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  &.message { height: 150px; }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.03);
  
  &.messageIcon {
    align-items: flex-start;
    padding-top: 1rem;
  }
  
  ${InputGroup}:focus-within & {
    color: var(--accent-primary);
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 60px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  font-family: inherit;

  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 1rem 60px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  resize: none;
  font-family: inherit;

  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-main);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(96, 235, 228, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(96, 235, 228, 0.5);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: rgba(10, 10, 10, 0.95);
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(96, 235, 228, 0.2);
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--accent-primary);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1rem;
  animation: ${pulse} 1.5s infinite;
`;

const ModalTitle = styled.h2`
  color: var(--accent-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ModalText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ModalButton = styled(motion.button)`
  padding: 0.7rem 1.5rem;
  background: var(--gradient-main);
  color: #000;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CopyrightSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
  text-align: center;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const CopyrightText = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const LogoImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;