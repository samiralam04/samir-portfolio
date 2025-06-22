import React, { useRef } from 'react';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiStar } from "react-icons/fi";

// Import your existing ClientSlider component
import ClientSlider from './ClientSlider';

const clients = [
    {
        name: "Ayush Nair",
        position: "UX/UI Designer",
        img_url: "https://i.pinimg.com/564x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg",
        stars: 3,
        disc: `Your frontend expertise and attention to detail transformed our platform, enhancing UI/UX and boosting user engagement. Exceptional work!.`
    },
    {
        name: "Neeraj",
        position: "Web Developer",
        img_url: "https://i.pinimg.com/564x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg",
        stars: 4,
        disc: `Your graphic designs brought our brand to life! Each illustration and logo perfectly captured our identity, leaving a lasting impression.`
    },
    {
        name: "Dharshan Shrinivash",
        position: "Python Developer",
        img_url: "https://i.pinimg.com/564x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg",
        stars: 5,
        disc: `Outstanding web design skills! Your websites are not just visually stunning but also intuitive, providing an unforgettable online experience.`
    },
    {
        name: "Akash",
        position: "HTML Developer",
        img_url: "https://i.pinimg.com/564x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg",
        stars: 5,
        disc: `Impeccable creativity and professionalism! Working with you has been a breeze, and your dedication to quality truly sets you apart.`
    },
];

const settings = {
    dots: true,
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
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 530,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Clients = () => {
    const arrowRef = useRef(null);
    
    const clientDisc = clients.map((item, i) => (
        <ClientSlider item={item} key={i} />
    ));

    return (
        <Container id='client'>
            <Header>
                <Subtitle className="gradient-text">Testimonials</Subtitle>
                <Title>What Clients Say</Title>
            </Header>
            
            <Testimonials>
                <Slider ref={arrowRef} {...settings}>
                    {clientDisc}
                </Slider>
                <NavigationButtons>
                    <NavButton onClick={() => arrowRef.current.slickPrev()}>
                        <IoIosArrowBack />
                    </NavButton>
                    <NavButton onClick={() => arrowRef.current.slickNext()}>
                        <IoIosArrowForward />
                    </NavButton>
                </NavigationButtons>
            </Testimonials>
        </Container>
    );
};

export default Clients;

// Styled Components (only for Clients.jsx)
const Container = styled.section`
    width: 85%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 6rem 0;
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
        width: 90%;
        padding: 4rem 0;
    }
`;

const Header = styled.div`
    margin-bottom: 3rem;
    position: relative;
    z-index: 2;
`;

const Subtitle = styled.span`
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-bottom: 0.5rem;
`;

const Title = styled.h1`
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    color: #fff;
    margin-top: 0.5rem;
    text-transform: capitalize;
`;

const Testimonials = styled.div`
    position: relative;
    padding: 2rem 0;

    .slick-list {
        padding: 20px 0;
        margin: 0 -10px;
    }

    .slick-slide > div {
        padding: 0 10px;
    }

    .slick-dots {
        position: absolute;
        bottom: -30px;
        left: 0;
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .slick-dots li {
        margin: 0 5px;
    }

    .slick-dots li button {
        width: 12px;
        height: 4px;
        padding: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        transition: all 0.3s ease;
        border: none;
        color: transparent;
        overflow: hidden;
    }

    .slick-dots li.slick-active button {
        width: 20px;
        background: linear-gradient(90deg, #60ebe4, #3a7bd5);
    }

    @media (max-width: 768px) {
        .slick-dots {
            bottom: -25px;
        }
    }
`;

const NavigationButtons = styled.div`
    position: absolute;
    right: 0;
    bottom: -50px;
    display: flex;
    gap: 1rem;
    z-index: 10;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavButton = styled.button`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(96, 235, 228, 0.1);
    backdrop-filter: blur(5px);
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    &:hover {
        background: linear-gradient(90deg, #60ebe4, #3a7bd5);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(96, 235, 228, 0.3);
    }
`;
