import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { keyframes } from "styled-components";

const data = [
  {
    img: "https://img.freepik.com/free-vector/confirmed-attendance-concept-illustration_114360-7745.jpg?t=st=1743274092~exp=1743277692~hmac=1bca00d61734dbdf22f5b044eb8385231a66c9b5a0e64530941ae367e7f18907&w=1380",
    disc: "Student Attendance Management System using Java, Servlets, and PostgreSQL to streamline attendance tracking with automated notifications and role-based access.",
    href: "https://github.com/samiralam04/RollWise",
  },
  {
    img: "https://img.freepik.com/premium-vector/lettering-modern-hand-written-text-sticker-planner-bright-text-planning-concept-vector-illustration_565728-492.jpg",
    disc: "A minimalist To-Do List built with HTML, CSS, and JavaScript, facilitating efficient task management with intuitive design and dynamic functionality.",
    href: " https://samiralam04.github.io/To-Do-List/",
  },
  {
    img: "https://mvd.kerala.gov.in/sites/default/files/citizen_corner/dashboards.jpg",
    disc: "A visually engaging dashboard developed with HTML, CSS, and JavaScript, utilizing the Spotify Student API to display trending song details. Users can explore up-to-date information on popular tracks, enhancing their music discovery experience.",
    href: "https://samiralam04.github.io/Spotify_Dashboard/",
  },
  {
    img: "https://mms.businesswire.com/media/20201216005187/en/846780/23/Storyboard_Official_Logo_%281%29.jpg",
    disc: "A versatile platform allowing users to write, edit, and manage their stories. Features include uploading thumbnail images, reading and deleting stories, and downloading them as PDFs.",
    href: "https://samiralam04.github.io/Story-Board/",
  },
  {
    img: "https://png.pngtree.com/png-clipart/20200710/original/pngtree-fitness-vector-logo-design-template-design-for-gym-and-fitness-vector-png-image_4246869.jpg",
    disc: "The Gym Landing Page, crafted with HTML/CSS, presents a fictional gym with intuitive navigation and vibrant visuals, providing easy access to membership details and class schedules. Demonstrating front-end proficiency.",
    href: " https://samiralam04.github.io/The-Fitness-Club/",
  },
  {
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/8eec89176281219.Y3JvcCw4MDgsNjMyLDAsMA.png",
    disc: " Tiny URL Shortener, A Java servlet-based application that shortens long URLs. It includes user registration, login, and session management, with all data stored securely in a PostgreSQL database.",
    href: "https://github.com/samiralam04/TinyUrl",
  },
  {
    img: "https://www.logoai.com/uploads/output/2022/10/17/9135d68826af2d0802c03554d508446e.jpg",
    disc: " A React.js and Firebase-based chat app with real-time messaging, user photo uploads, and blocking features. Designed for desktop use, it enhances security with .env-managed API keys and offers a streamlined user experience. ",
    href: "https://samiralam04.github.io/Real-Time-chatApp/",
  },
];

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const settings = {
  className: "center",
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  centerPadding: "0",
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px",
      },
    },
  ],
};

const SliderComp = () => {
  const sliderRef = useRef(null);
  
  return (
    <SliderContainer>
      <StyledSlider ref={sliderRef} {...settings}>
        {data.map((item, i) => (
          <SlideWrapper key={i}>
            <Project item={item} />
          </SlideWrapper>
        ))}
      </StyledSlider>
      
      <NavButtonLeft 
        onClick={() => sliderRef.current?.slickPrev()} 
        aria-label="Previous slide"
      >
        <IoIosArrowBack />
      </NavButtonLeft>
      <NavButtonRight 
        onClick={() => sliderRef.current?.slickNext()} 
        aria-label="Next slide"
      >
        <IoIosArrowForward />
      </NavButtonRight>
    </SliderContainer>
  );
}

export default SliderComp;

const SliderContainer = styled.div`
  position: relative;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 1400px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 15px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    
    &:not(.slick-center) {
      opacity: 0.7;
      transform: scale(0.95);
    }
    
    &.slick-center {
      opacity: 1;
      transform: scale(1);
      
      & > div {
        animation: ${floatAnimation} 3s ease-in-out infinite;
      }
    }
  }

  .slick-list {
    margin: 0 -15px;
    padding: 30px 0;
    overflow: visible;
  }
`;

const SlideWrapper = styled.div`
  animation: ${slideIn} 0.6s ease forwards;
  padding: 10px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(58, 123, 213, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: 1px solid rgba(96, 235, 228, 0.3);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #60ebe4, #3a7bd5);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(96, 235, 228, 0.4);
    
    svg {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: 0.3rem;
  
  @media (max-width: 1200px) {
    left: 5px;
  }
  
  @media (max-width: 768px) {
    left: 5px;
  }
`;

const NavButtonRight = styled(NavButton)`
  right: 0.3rem;
  
  @media (max-width: 1200px) {
    right: 5px;
  }
  
  @media (max-width: 768px) {
    right: 5px;
  }
`