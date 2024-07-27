import React, { useRef } from 'react'
import Slider from 'react-slick';
import Project from './Project';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';

let data = [
    {
        img : "https://png.pngtree.com/png-clipart/20200710/original/pngtree-fitness-vector-logo-design-template-design-for-gym-and-fitness-vector-png-image_4246869.jpg",
        disc : "The Gym Landing Page, crafted with HTML/CSS, presents a fictional gym with intuitive navigation and vibrant visuals, providing easy access to membership details and class schedules. Demonstrating front-end proficiency.",
        
        href:" https://samiralam04.github.io/The-Fitness-Club/"
    },
    {
        img : "https://img.freepik.com/premium-vector/lettering-modern-hand-written-text-sticker-planner-bright-text-planning-concept-vector-illustration_565728-492.jpg",
        disc : "A minimalist To-Do List built with HTML, CSS, and JavaScript, facilitating efficient task management with intuitive design and dynamic functionality.",
        href:" https://samiralam04.github.io/To-Do-List/"
    },
    {
        img : "https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg",
        disc : " Stay tuned for our upcoming projects, where creativity meets functionality in every pixel. Unveiling soon – innovative designs that redefine the digital experience! ",
        href:"#"
    },
    {
        img : "https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg",
        disc : " Stay tuned for our upcoming projects, where creativity meets functionality in every pixel. Unveiling soon – innovative designs that redefine the digital experience! ",
        href:"#"
    },
    {
        img : "https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg",
        disc : " Stay tuned for our upcoming projects, where creativity meets functionality in every pixel. Unveiling soon – innovative designs that redefine the digital experience! ",
        href:"#"
    }
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
    arrows : false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode : false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode : false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode : false
        }
      }
    ]
  };
const SliderComp = () => {
  const arrowRef = useRef(null);
    let sliderProject = "";
    sliderProject = data.map((item, i) => (
        <Project item = {item} key={i}/>
    ))
  return (
    <Container>
      <Slider ref={arrowRef} {...settings}>
      {sliderProject}
      </Slider>
      <Buttons>
        <button 
        onClick={() => arrowRef.current.slickPrev()}
        className='back'><IoIosArrowBack/></button>
        <button 
        onClick={() => arrowRef.current.slickNext()}
        className='next'><IoIosArrowForward/></button>
      </Buttons>
    </Container>
  )
}

export default SliderComp;

const Container = styled.div`
  position: relative;
`

const Buttons = styled.div`
  button{
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.100);
    cursor: pointer;
    color: #60ebe4;
    border: none;
    position: absolute;
    top: 45%;
    right: -1rem;
  }

  .back{
    left: -1rem;
  }
`