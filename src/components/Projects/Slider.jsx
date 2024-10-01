import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

let data = [
  {
    img: "https://www.logoai.com/uploads/output/2022/10/17/9135d68826af2d0802c03554d508446e.jpg",
    disc: " A React.js and Firebase-based chat app with real-time messaging, user photo uploads, and blocking features. Designed for desktop use, it enhances security with .env-managed API keys and offers a streamlined user experience. ",
    href: "https://samiralam04.github.io/Real-Time-chatApp/",
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
];

var settings = {
  className: "center",
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};
const SliderComp = () => {
  const arrowRef = useRef(null);
  let sliderProject = "";
  sliderProject = data.map((item, i) => <Project item={item} key={i} />);
  return (
    <Container>
      <Slider ref={arrowRef} {...settings}>
        {sliderProject}
      </Slider>
      <Buttons>
        <button onClick={() => arrowRef.current.slickPrev()} className="back">
          <IoIosArrowBack />
        </button>
        <button onClick={() => arrowRef.current.slickNext()} className="next">
          <IoIosArrowForward />
        </button>
      </Buttons>
    </Container>
  );
};

export default SliderComp;

const Container = styled.div`
  position: relative;
`;

const Buttons = styled.div`
  button {
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    color: #60ebe4;
    border: none;
    position: absolute;
    top: 45%;
    right: -1rem;
  }

  .back {
    left: -1rem;
  }
`;
